// https://github.com/cicadahq/cicada
// https://dagger.io/blog/nodejs-sdk

import { TypedWorkflowJob } from './spnx.types';

// import { TypedWorkflow } from "./spnx.types";
export * from './spnx.types';

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

function stepOutputs(stepId: string, key: string) {
  return `\${{ steps.${stepId}.outputs.${key} }}`;
}

function wrapVariable(variable: string) {
  return `\${{ ${variable} }}`;
}

export function workflowHelper<TAvailableNeeds>(option: WorkflowOption<any>) {
  return {
    // jobs: (jobs: WorkflowJob<any>) => jobs,
    // TODO: Transform to AST later
    env: (key: string) => wrapVariable(`env.${String(key)}`),
    secrets: (key: string) => wrapVariable(`secrets.${String(key)}`),
    github: (key?: string) => (key ? `github.${String(key)}` : 'github'),
    // Reference inside job
    steps: (id: string) => ({
      outputs: (outputKey: string) => stepOutputs(id, outputKey),
    }),
    needs: (jobId: TAvailableNeeds) => wrapVariable(`needs.${String(jobId)}`),
    // Github Expression
    equal: (left: AllowType, right: AllowType) => `${left} == ${right}`,
    // TODO: Check arg is string or variable
    contain: (left: AllowType, right: AllowType) => `contains(${left}, ${right})`,
    always: () => 'always()',
    and: (...args: string[]) => `(${args.join(' && ')})`,
    or: (...args: string[]) => `(${args.join(' || ')})`,
    // helper
    var: wrapVariable,
  };
}

export type JobDetailCallback<TAvailableNeeds = any> =  (workflow: ReturnType<typeof workflowHelper<TAvailableNeeds>>) => WorkflowJobDetail<any>;
type A = () => void;

export interface Job extends Record<string, JobDetailCallback> {
  // aaa: (workflow: ReturnType<typeof workflowHelper<any>>) => WorkflowJobDetail<any>;
}

export class Workflow<TTypedWorkflow> {
  public job: Job;
  private jobs2: any = {};
  constructor(private typedWorkflow: any, private option: any) {}

  addJob<TJobId extends keyof any, TAvailableNeeds extends string, TNeeds extends string>(
    jobId: TJobId,
    typedWorkflow: TypedWorkflowJob<TAvailableNeeds, TNeeds>,
    myCallback: JobDetailCallback<TAvailableNeeds>,
  ) {
    this.jobs2[jobId] = myCallback(workflowHelper<TAvailableNeeds>(this.option));
    return this;
  }
}

export function initWorkflow<T>(typedWorkflow: T, option: any) {
  return new Workflow<T>(typedWorkflow, option);
}
