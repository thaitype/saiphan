// https://github.com/cicadahq/cicada
// https://dagger.io/blog/nodejs-sdk

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

export interface WorkflowJob {
  [key: string]: WorkflowJobDetail;
}

export interface WorkflowJobDetail {
  if: string;
  runsOn: string;
  needs?: string[];
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

export function initWorkflow<TEnv extends Record<string, string>>(typedWorkflow: any, option: WorkflowOption<TEnv>) {
  return {
    jobs: (jobs: WorkflowJob) => jobs,
    // TODO: Transform to AST later
    env: (key: keyof TEnv) => `\${{ env.${String(key)} }}`,
    secrets: (key: string) => `\${{ secrets.${String(key)} }}`,
    github: (key: string) => `\${{ github.${String(key)} }}`,
    steps: (id: string) => ({
      outputs: (outputKey: string) => stepOutputs(id, outputKey)
    }),
    // Github Expression
    equal: (left: AllowType, right: AllowType) => `${left} == ${right}`,
    contain: (left: AllowType, right: AllowType) => `contains(${left}, ${right})`,
    always: () => 'always()',
  };
}
