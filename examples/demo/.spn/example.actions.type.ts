// Generated file - do not edit manually!
// Done by command spnx

import { typedWrap, JobDetailCallback, WorkflowJobDetail, workflowHelper, WorkflowStep, WorkflowJobDetailBase, WorkflowStepBase, WorkflowStepRun, WorkflowStepUses } from 'saiphan';

const env = {
  state_name: 'my-state',
  artifact_web_name: 'web_api',
  app_name: 'web-api',
  slot_name: 'preview',
  resource_group: 'my-resource-group',
};

const jobs = {
  prepare: typedWrap({
    availableNeeds: ['build', 'deploy'],
    needs: [],
  }),
  deploy: typedWrap({
    availableNeeds: ['prepare', 'build'],
    needs: [
      'build',
      'build.result',
      'build.outputs.userId',
      'prepare',
      'prepare.result',
      'prepare.outputs.taskType'
    ],
  }),
  build: typedWrap({
    availableNeeds: ['prepare', 'deploy'],
    needs: ['prepare', 'prepare.result'],
  }),
};

/**
 * Define type
 */
type TEnv = keyof typeof env;
type TJob = typeof jobs;
type TAvailableNeeds<T extends keyof TJob> = TJob[T]['availableNeeds'][number];
type TNeeds<T extends keyof TJob> = TJob[T]['needs'][number];
/**
 * Add type to Job
 */
declare module 'saiphan' {
  interface Job {
    /**
     * "With" Prop general type
     */
    // prepare: JobDetailCallback<TEnv, TAvailableNeeds<'prepare'>, TNeeds<'prepare'>>;
    /**
     * Support "With" Props with Github Actions
     */
    // prepare: (
    //   workflow: ReturnType<
    //     typeof workflowHelper<TEnv, TNeeds<'prepare'>>
    //   >
    // ) => {
    //   steps: [
    //     WorkflowStepUses<'actions/checkout@v2', {
    //       ref?: string
    //     }>
    //   ];
    // } & WorkflowJobDetailBase<TAvailableNeeds<'prepare'>>,

    deploy: JobDetailCallback<TEnv, TAvailableNeeds<'deploy'>, TNeeds<'deploy'>>;
    build: JobDetailCallback<TEnv, TAvailableNeeds<'build'>, TNeeds<'build'>>;
  }
}

export default {
  env,
  jobs,
};
