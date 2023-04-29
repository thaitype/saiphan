// Generated file - do not edit manually!
// Done by command spnx

import { typedWrap, JobDetailCallback } from 'saiphan';

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
    outputs: [],
  }),
  deploy: typedWrap({
    availableNeeds: ['prepare', 'build'],
    needs: ['build'],
    outputs: ['userId'], // used by needs
  }),
  build: typedWrap({
    availableNeeds: ['prepare', 'deploy'],
    needs: ['prepare'],
    outputs: [],
  }),
};

/**
 * Define type
 */
type TEnv = keyof typeof env;
type TJob = typeof jobs;
type TAvailableNeeds<T extends keyof TJob> = TJob[T]['availableNeeds'][number];
type TNeeds<T extends keyof TJob> = TJob[T]['needs'][number];
type TOutputs<T extends keyof TJob> = TJob[T]['outputs'][number];
/**
 * Add type to Job
 */
declare module 'saiphan' {
  interface Job {
    prepare: JobDetailCallback<TEnv, TAvailableNeeds<'prepare'>, TNeeds<'prepare'>, TOutputs<'prepare'>>;
    deploy: JobDetailCallback<TEnv, TAvailableNeeds<'deploy'>, TNeeds<'deploy'>, TOutputs<'deploy'>>;
    build: JobDetailCallback<TEnv, TAvailableNeeds<'build'>, TNeeds<'build'>, TOutputs<'build'>>;
  }
}

export default {
  env,
  jobs,
};
