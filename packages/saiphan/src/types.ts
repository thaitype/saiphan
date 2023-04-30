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

export interface WorkflowJobDetailBase<TAvailableNeeds> {
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
}

export interface WorkflowJobDetail<TAvailableNeeds>
  extends WorkflowJobDetailBase<TAvailableNeeds> {
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

type WithDefault = Record<string, string | undefined>;

export interface WorkflowStepUses<
  TUsesActions extends string = string,
  TWith extends WithDefault = WithDefault
> extends WorkflowStepBase {
  uses: TUsesActions;
  with?: TWith & WithDefault;
}
