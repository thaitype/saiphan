// Generated file - do not edit manually!
// Done by command spnx

import { typedWrap, JobDetailCallback, WorkflowJobDetail, workflowHelper, WorkflowStep, WorkflowJobDetailBase, WorkflowStepBase, WorkflowStepRun, WorkflowStepUses } from 'saiphan';

const env = ['state_name', 'artifact_web_name', 'app_name', 'slot_name', 'resource_group'];

const jobs = {
  prepare: typedWrap({
    availableNeeds: ['build', 'deploy'],
    needs: [],
  }),
  deploy: typedWrap({
    availableNeeds: ['prepare', 'build'],
    needs: ['build', 'build.result', 'build.outputs.userId', 'prepare', 'prepare.result', 'prepare.outputs.taskType'],
  }),
  build: typedWrap({
    availableNeeds: ['prepare', 'deploy'],
    needs: ['prepare', 'prepare.result'],
  }),
};

/**
 * Define type
 */
type TEnv = typeof env[number];
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
    prepare: JobDetailCallback<
      TEnv,
      TAvailableNeeds<'prepare'>,
      TNeeds<'prepare'>,
      [
        WorkflowStepUses<
          'actions/checkout@v2',
          {
            ref?: string;
          }
        >,
        ...WorkflowStep[]
      ]
    >;

    deploy: JobDetailCallback<TEnv, TAvailableNeeds<'deploy'>, TNeeds<'deploy'>, [...WorkflowStep[]]>;
    build: JobDetailCallback<TEnv, TAvailableNeeds<'build'>, TNeeds<'build'>, [...WorkflowStep[]]>;
  }
}

export default {
  env,
  jobs,
};
