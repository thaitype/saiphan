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

// export interface WorkflowJob<TNeeds> {
//   [key: string]: WorkflowJobDetail<TNeeds>;
// }

export interface WorkflowJobDetail<TAvailableNeeds> {
  if?: string;
  runsOn: string;
  needs?: TAvailableNeeds[];
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
  'continue-on-error'?: boolean;
}

export interface WorkflowStepRun extends WorkflowStepBase {
  run: string;
  'working-directory'?: string;
}

export interface WorkflowStepUses extends WorkflowStepBase {
  uses: string;
  with?: Record<string, string | undefined>;
}
