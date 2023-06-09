// https://github.com/cicadahq/cicada
// https://dagger.io/blog/nodejs-sdk

import { stripIndent } from 'common-tags';
import { AllowType, WorkflowEvent, WorkflowJobDetailBase, WorkflowOption, WorkflowStep } from './types';
import * as Exp from './expression';
import { NestedKeyOf, getNestedValue, stringify, unwrapParentheses, unwrapVariable, wrapVariable } from './utils';
import { initContextGithub } from './context';
import { initContextGithubEvent } from './events';

/**
 * The value of a specific output.
 * @param stepId
 * @param key
 * @returns
 */

function stepOutputs(stepId: string, key: string) {
  return wrapVariable(`steps.${stepId}.outputs.${key}`);
}

export function workflowHelper<TEnv, TNeeds extends string>(option: WorkflowOption<any>, data: WorkflowData) {
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

    // --------------------------------------------------------------------------------
    //
    // Expression contexts
    //
    // --------------------------------------------------------------------------------
    /**
     * This context is only populated for workflow runs that have dependent jobs, and changes for each job in a workflow run. You can access this context from any job or step in a workflow. This object contains all the properties listed below.
     *
     * @ref https://docs.github.com/en/actions/learn-github-actions/contexts#needs-context
     * @param jobId
     * @returns
     */
    needs: (needAction: TNeeds) =>
      ({
        input: [needAction],
        type: 'Needs',
        eval: () => {
          throw new Error(`Needs.eval() is not implemented, params: ${needAction}`);
        },
        toString: () => wrapVariable(`needs.${needAction}`),
        stringify: () => unwrapVariable(`needs.${needAction}`),
      } satisfies Exp.ExpNeeds<TNeeds>),

    /**
     * Information about the workflow run.
     * For more information, see [github context](https://docs.github.com/en/actions/learn-github-actions/contexts#github-context).
     * @param args
     * @returns
     */
    github: (...args: Exp.ExpGithub<NestedKeyOf<ReturnType<typeof initContextGithub>>>['input']) =>
      ({
        input: [args[0]],
        type: 'Github',
        eval: () => getNestedValue(data.github, args[0] as string),
        toString: () => wrapVariable(['github', args[0]].join('.')),
        stringify: () => unwrapVariable(['github', args[0]].join('.')),
      } satisfies Exp.ExpGithub),

    // --------------------------------------------------------------------------------
    //
    // Github Expression
    // Available expression contexts: `github`, `inputs`, `vars`, `needs`
    //
    // --------------------------------------------------------------------------------
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
        eval: () => {
          const getValue = (arg: Exp.ExpEqual['input'][number]) =>
            typeof arg === 'string' ? stringify(arg) : typeof arg === 'boolean' ? arg : arg.eval();
          return getValue(args[0]) === getValue(args[1]);
        },
        toString: () => wrapVariable(`(${args[0].toString()} == ${args[1].toString()})`),
        stringify: () => {
          const getValue = (arg: Exp.ExpEqual['input'][number]) =>
            typeof arg === 'string' ? stringify(arg) : typeof arg === 'boolean' ? arg : arg.stringify();
          return unwrapVariable(`(${getValue(args[0])} == ${getValue(args[1])})`);
        },
      } satisfies Exp.ExpEqual),
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
     * @param args_0 ExpressionString | ExpGithub | ExpNeeds | string
     * @param args_1 ExpressionString | ExpGithub | ExpNeeds | string
     * @returns ExpContain
     */
    contain: (...args: Exp.ExpContain['input']) =>
      ({
        input: [args[0], args[1]],
        type: 'Contain',
        eval: () => {
          const getValue = (arg: Exp.ExpContain['input'][number]) => (typeof arg === 'string' ? arg : arg.eval());
          return getValue(args[0]).includes(getValue(args[1]));
        },

        toString: () => wrapVariable(`contains(${args[0].toString()}, ${args[1].toString()})`),
        stringify: () => {
          const getValue = (arg: Exp.ExpContain['input'][number]) =>
            typeof arg === 'string' ? stringify(arg) : arg.stringify();
          return unwrapVariable(`contains(${getValue(args[0])}, ${getValue(args[1])})`);
        },
      } satisfies Exp.ExpContain),
    and: (...args: string[]) => `(${args.join(' && ')})`,
    or: (...args: string[]) => `(${args.join(' || ')})`,
    // --------------------------------------------------------------------------------
    //
    // Expression Functions
    // Available expression functions: `always`, `failure`, `cancelled`, `success`
    //
    // --------------------------------------------------------------------------------
    always: () =>
      ({
        type: 'Always',
        eval: () => true,
        input: [],
        toString: () => wrapVariable('always()'),
        stringify: () => unwrapVariable('always()'),
      } satisfies Exp.ExpAlways),
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

interface WorkflowData {
  env?: unknown;
  jobs?: unknown;
  github?: any;
}

export class Workflow<TEnv extends Record<string, string>> {
  public job: Job = {};
  public name?: string;
  public on: WorkflowEvent;
  public env?: TEnv;

  constructor(private option: WorkflowOption<TEnv>, public data: WorkflowData) {
    this.name = option.name;
    this.on = option.on;
    this.env = option.env;
  }

  public getJob(key: string) {
    const callback = this.job[key];
    return callback(workflowHelper(this.option, this.data));
  }

  public log() {
    console.log('GitHub Action Workflow Info:');
    console.log(JSON.stringify(this.option, null, 2));
    console.log('=============================');
    console.log('Jobs Info:');
    for (const jobId of Object.keys(this.job)) {
      const job = this.getJob(jobId);
      console.log(`Job If: ${unwrapParentheses(job.if?.stringify())}`);
      console.log(`Job: ${jobId}`);
      console.log(JSON.stringify(job, null, 2));
      console.log('-----------------------------');
    }
  }
}

export function initWorkflow<TEnv extends Record<string, string>>(option: WorkflowOption<TEnv>): Workflow<TEnv>;
export function initWorkflow<TEnv extends Record<string, string>>(
  data: WorkflowData,
  option: WorkflowOption<TEnv>
): Workflow<TEnv>;

export function initWorkflow<TEnv extends Record<string, string>>(
  optionOrData: WorkflowOption<TEnv> | WorkflowData,
  option?: WorkflowOption<TEnv>
) {
  if('on' in optionOrData) {
    return new Workflow(optionOrData, {
      github: initContextGithub(),
    });
  }
  if(!option) {
    throw new Error('Invalid option');
  }
  return new Workflow(option, optionOrData);
}
