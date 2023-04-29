// https://github.com/cicadahq/cicada
// https://dagger.io/blog/nodejs-sdk

import { TypedWorkflowJob } from './spnx.types';
import { stripIndent } from 'common-tags';
import {AllowType, WorkflowJobDetail, WorkflowOption, } from './types';


/**
 * The value of a specific output.
 * @param stepId
 * @param key
 * @returns
 */

function stepOutputs(stepId: string, key: string) {
  return wrapVariable(`steps.${stepId}.outputs.${key}`);
}
/**
 * The value of a specific output for a job that the current job depends on.
 * @param jobId
 * @param key
 * @returns
 */
function needsOutputs(jobId: string, key: string) {
  return wrapVariable(`needs.${jobId}.outputs.${key}`);
}

function wrapVariable(variable: string) {
  return `\${{ ${variable} }}`;
}

export function workflowHelper<TEnv, TAvailableNeeds, TNeeds extends string>(
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
    /**
     * This context is only populated for workflow runs that have dependent jobs, and changes for each job in a workflow run. You can access this context from any job or step in a workflow. This object contains all the properties listed below.
     *
     * @ref https://docs.github.com/en/actions/learn-github-actions/contexts#needs-context
     * @param jobId
     * @returns
     */
    needs: (jobId: TNeeds) => ({
      /**
       * The set of outputs of a job that the current job depends on.
       * @param outputKey
       * @returns
       */
      outputs: (outputKey: string) => needsOutputs(jobId, outputKey),
      /**
       * The result of a job that the current job depends on.
       * Possible values are `success`, `failure`, `cancelled`, or `skipped`.
       */
      result: wrapVariable(`needs.${jobId}.result`),
    }),
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

export type JobDetailCallback<TEnv = string, TAvailableNeeds = string, TNeeds extends string = string> = (
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
