// https://github.com/cicadahq/cicada
// https://dagger.io/blog/nodejs-sdk

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

export function initWorkflow<T extends Record<string, string>>(option: WorkflowOption<T>) {
  return option;
}

export const jobs = (jobs: WorkflowJob) => jobs;

export function defineWorkflow(w: ReturnType<typeof initWorkflow>) {
  return {
    // env: w.jobs(),
  };
}

export class Job {}
