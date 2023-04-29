// Generated file - do not edit manually!
// Done by command spnx

import { TypedWorkflowJob, typedWrap, Job, JobDetailCallback } from 'saiphan';

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
    needs: ['build'],
  }),
  build: typedWrap({
    availableNeeds: ['prepare', 'deploy'],
    needs: ['prepare'],
  }),
};

/**
 * Define type
 */
type TEnv = keyof typeof env;
type TJob = typeof jobs;
type TAvailableNeeds<T extends keyof TJob> = TJob[T]['availableNeeds'][number];

/**
 * Add type to Job
 */
declare module 'saiphan' {
  interface Job {
    prepare: JobDetailCallback<TEnv, TAvailableNeeds<'prepare'>>;
    deploy: JobDetailCallback<TEnv, TAvailableNeeds<'deploy'>>;
  }
}

export default {
  env,
  jobs,
};
