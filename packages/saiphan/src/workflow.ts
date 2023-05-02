// https://github.com/cicadahq/cicada
// https://dagger.io/blog/nodejs-sdk

import { stripIndent } from 'common-tags';
import {
  AllowType,
  WorkflowJobDetailBase,
  WorkflowOption,
  WorkflowStep,
} from './types';
import * as Exp from './expression';

export function wrapVariable(variable: string) {
  return `\${{ ${variable} }}`;
}

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

export function workflowHelper<TEnv, TNeeds extends string>(
  option: WorkflowOption<any>
) {
  return {
    // jobs: (jobs: WorkflowJob<any>) => jobs,
    // TODO: Transform to AST later
    env: (key: TEnv) => wrapVariable(`env.${String(key)}`),
    secrets: (key: string) => wrapVariable(`secrets.${String(key)}`),

    // stepUses: <const TUses extends string>(stepConfig: WorkflowStepUses<TUses>)=> stepConfig,
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
    needs: (needAction: TNeeds) => ({
      toString: () => `needs.${needAction}`,
      input: [needAction],
      type: 'Needs',
      eval: ()=> 'undefined mock data',
    } as Exp.ExpNeeds<TNeeds>),

    // github: (key?: string) => (key ? `github.${String(key)}` : 'github'),
    github: (key?: string) => ({
      toString: () => ['github', key].join('.'),
      input: [key],
      type: 'Github',
      eval: ()=> 'undefined mock data',
    } as Exp.ExpGithub),

    // --------------------------------------------------------------------------------
    // Github Expression
    // --------------------------------------------------------------------------------
    exp: (exp: Exp.Expression) => wrapVariable(exp.toString()),
    /**
     * Expression Equal Factory Function
     *
     * @example
     *
     * ```ts
     * const exp = t.equal(t.string('my-value'), t.string('my-value'))
     * exp.eval() // Result: true
     * ```
     * @param args
     * @returns ExpEqual
     */
    equal: (...args: Exp.ExpEqual['input']) =>
      ({
        type: 'Equal',
        input: [args[0], args[1]],
        eval: () => args[0].eval() === args[1].eval(),
        toString: () => `(${args[0].toString()} == ${args[1].toString()})`,
      } as Exp.ExpEqual),
    /**
     * Expression String Factory Function
     *
     * @example
     *
     * ```ts
     * const exp = t.string('my-value');
     * exp.eval() // Result: my-value
     * ```
     *
     * @param args string
     * @returns ExpString
     */
    string: (...args: Exp.ExpString['input']) =>
      ({
        toString: () => `"${args[0]}"`,
        input: [args[0]],
        type: 'String',
        eval: () => args[0],
      } as Exp.ExpString),

    /**
     * Expression Boolean Factory Function
     *
     * @example
     *
     * ```ts
     * t.boolean(true)
     * ```
     *
     * @param args boolean
     * @returns ExpBoolean
     */
    boolean: (...args: Exp.ExpBoolean['input']) =>
      ({
        toString: () => `${args[0]}`,
        input: [args[0]],
        type: 'Boolean',
        eval: () => args[0],
      } as Exp.ExpBoolean),
    /**
     * Expression Contain Factory Function
     *
     * @example
     *
     * ```ts
     * const exp = t.contain(t.string('Hello World'), t.string('hello'))
     * exp.eval() // Result: true
     * ```
     *
     * @param args boolean
     * @returns ExpBoolean
     */
    contain: (...args: Exp.ExpContain['input']) =>
      ({
        toString: () =>
          `contains(${args[0].toString()}, ${args[1].toString()})`,
        input: [args[0], args[1]],
        type: 'Contain',
        eval: () => args[0].eval().includes(args[1].eval()),
      } as Exp.ExpContain),
    always: () =>
      ({
        toString: () => 'always()',
        type: 'Always',
        eval: () => true,
        input: [],
      } as Exp.ExpAlways),


    and: (...args: string[]) => `(${args.join(' && ')})`,
    or: (...args: string[]) => `(${args.join(' || ')})`,
    // --------------------------------------------------------------------------------
    // Helper
    // --------------------------------------------------------------------------------
    multiline: (text: string) => stripIndent`|\n${text}`,
  };
}

export type JobDetailCallback<
  TEnv = string,
  TAvailableNeeds = string,
  TNeeds extends string = string,
  TWorkflowSteps extends WorkflowStep[] = WorkflowStep[]
> = (workflow: ReturnType<typeof workflowHelper<TEnv, TNeeds>>) => {
  steps: TWorkflowSteps;
} & WorkflowJobDetailBase<TAvailableNeeds>;

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
