// https://github.com/cicadahq/cicada
// https://dagger.io/blog/nodejs-sdk

import { TypedWorkflowJob } from './spnx.types';
import { stripIndent } from 'common-tags';

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

/**
 * The value of a specific output.
 * @param stepId
 * @param key
 * @returns
 */

function stepOutputs(stepId: string, key: string) {
  return `\${{ steps.${stepId}.outputs.${key} }}`;
}

function wrapVariable(variable: string) {
  return `\${{ ${variable} }}`;
}

export function workflowHelper<TEnv, TAvailableNeeds, TNeeds>(
  option: WorkflowOption<any>
) {
  return {
    // jobs: (jobs: WorkflowJob<any>) => jobs,
    // TODO: Transform to AST later
    env: (key: TEnv) => wrapVariable(`env.${String(key)}`),
    secrets: (key: string) => wrapVariable(`secrets.${String(key)}`),
    github: (key?: string) => (key ? `github.${String(key)}` : 'github'),
    /**
     * This context changes for each step in a job.
     * You can access this context from any step in a job.
     * This object contains all the properties listed below.
     *
     * @note Reference inside job
     * @ref https://docs.github.com/en/actions/learn-github-actions/contexts#steps-context
     * @param stepId
     * @returns
     */
    steps: (stepId: string) => ({
      /**
       * The set of outputs defined for the step.
       * For more information, see ["Metadata syntax for GitHub Actions."](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#outputs-for-docker-container-and-javascript-actions)
       * @param outputKey
       * @returns
       */
      outputs: (outputKey: string) => stepOutputs(stepId, outputKey),
      /**
       * The result of a completed step after [continue-on-error](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepscontinue-on-error) is applied.
       * Possible values are `success`, `failure`, `cancelled`, or `skipped`.
       * When a `continue-on-error` step fails, the outcome is `failure`, but the final `conclusion` is `success`.
       */
      conclusion: wrapVariable(`steps.${stepId}.conclusion`),
      /**
       * The result of a completed step before [continue-on-error](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepscontinue-on-error) is applied.
       * Possible values are `success`, `failure`, `cancelled`, or `skipped`.
       * When a `continue-on-error` step fails, the outcome is `failure`, but the final `conclusion` is `success`.
       */
      outcome: wrapVariable(`steps.${stepId}.outcome`),
    }),
    needs: (jobId: TNeeds) => wrapVariable(`needs.${String(jobId)}`),
    // Github Expression
    equal: (left: AllowType, right: AllowType) => `${left} == ${right}`,
    // TODO: Check arg is string or variable
    contain: (left: AllowType, right: AllowType) =>
      `contains(${left}, ${right})`,
    always: () => 'always()',
    and: (...args: string[]) => `(${args.join(' && ')})`,
    or: (...args: string[]) => `(${args.join(' || ')})`,
    // helper
    var: wrapVariable,
    multiline: (text: string) => stripIndent`|\n${text}`,
  };
}

export type JobDetailCallback<TEnv = string, TAvailableNeeds = string, TNeeds = string> = (
  workflow: ReturnType<typeof workflowHelper<TEnv, TAvailableNeeds, TNeeds>>
) => WorkflowJobDetail<TAvailableNeeds>;

export interface Job extends Record<string, JobDetailCallback> {}

export class Workflow {
  public job: Job = {};
  constructor(private option: WorkflowOption<any>) {}

  public log() {
    console.log('GitHub Action Workflow Info:');
    console.log(JSON.stringify(this.option, null, 2));
    console.log('=============================');
    console.log('Jobs Info:');
    for (const [jobId, callback] of Object.entries(this.job)) {
      console.log(`Job: ${jobId}`);
      console.log(
        JSON.stringify(callback(workflowHelper(this.option)), null, 2)
      );
      console.log('-----------------------------');
    }
  }
}

export function initWorkflow(option: WorkflowOption<any>) {
  return new Workflow(option);
}
