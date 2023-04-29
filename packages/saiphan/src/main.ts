// https://github.com/cicadahq/cicada
// https://dagger.io/blog/nodejs-sdk

import { TypedWorkflow } from "./spnx.types";

export type AllowType = string | boolean;

export type PullRequestEvent = {
  pullRequest: {
    types: string[];
    branches: string[];
  };
};

export type PushEvent = {
  push: {
    types: string[];
    branches: string[];
  };
};

export interface WorkflowOption<T extends Record<string, string>> {
  name?: string;
  on: PullRequestEvent | PushEvent;
  env?: T;
}

export interface WorkflowJob<TNeeds extends keyof any> {
  [key: string]: WorkflowJobDetail<TNeeds>;
}

export interface WorkflowJobDetail<TNeeds extends keyof any> {
  if?: string;
  runsOn: string;
  needs?: TNeeds[];
  timeoutMinutes?: number;
  environment?: {
    name?: string;
    url?: string;
  };
  strategy?: {
    failFast: boolean;
    matrix?: any;
  };
  outputs?: Record<string, string>;
  steps: WorkflowStep[];
}

export type WorkflowStep = WorkflowStepRun | WorkflowStepUses;

export interface WorkflowStepBase {
  name?: string;
  if?: string;
  id?: string;
  env?: Record<string, string>;
}

export interface WorkflowStepRun extends WorkflowStepBase {
  run: string;
}

export interface WorkflowStepUses extends WorkflowStepBase {
  uses: string;
  with?: Record<string, string>;
}

function stepOutputs(stepId: string, key: string){
  return `\${{ steps.${stepId}.outputs.${key} }}`;
}

function wrapVariable(variable: string) {
  return `\${{ ${variable} }}`;
}

export function workflowHelper<
  TEnv extends Record<string, string>,
  TJobId extends string
>(typedWorkflow: TypedWorkflow<TJobId>, option: WorkflowOption<TEnv>) {
  return {
    jobs: (jobs: WorkflowJob<TJobId>) => jobs,
    // TODO: Transform to AST later
    env: (key: keyof TEnv) => wrapVariable(`env.${String(key)}`),
    secrets: (key: string) => wrapVariable(`secrets.${String(key)}`),
    github: (key?: string) => key ? `github.${String(key)}` : 'github',
    // Reference inside job
    steps: (id: string) => ({
      outputs: (outputKey: string) => stepOutputs(id, outputKey)
    }),
    needs: (jobId: TJobId) => wrapVariable(`needs.${String(jobId)}`),
    // Github Expression
    equal: (left: AllowType, right: AllowType) => `${left} == ${right}`,
    // TODO: Check arg is string or variable
    contain: (left: AllowType, right: AllowType) => `contains(${left}, ${right})`,
    always: () => 'always()',
    and: (...args: string[]) => `(${args.join(' && ')})`,
    or: (...args: string[]) => `(${args.join(' || ')})`,
    // helper
    var: wrapVariable,
  }
}

type Callback = (workflow: ReturnType<typeof workflowHelper>) => WorkflowJobDetail<any>;

export class Workflow {
  private jobs: any = {};
  constructor(private typedWorkflow: any, private option: any) {}

  addJob<TJobId extends keyof any>(jobId: TJobId, job: Callback ){

    this.jobs[jobId] = job(workflowHelper(this.typedWorkflow, this.option));
    return this;
  }

}

export function initWorkflow(typedWorkflow: any, option: any){
  return new Workflow(typedWorkflow, option);
}
