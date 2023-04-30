// Generated file - do not edit manually!
// Done by command spnx

import { TypedWorkflow, TypedWorkflowJob, JobDetailCallback } from 'saiphan';

const env = ['state_name', 'artifact_web_name', 'app_name', 'slot_name', 'resource_group'] as const;

const jobs = {
  prepare: {
    availableNeeds: ['build', 'deploy'],
    needs: {},
  },
  deploy: {
    availableNeeds: ['prepare', 'build'],
    needs: {
      build: {
        outputs: ['userId'],
      },
      prepare: {
        outputs: ['taskType'],
      }
    },
  },
  build: {
    availableNeeds: ['prepare', 'deploy'],
    needs: {
      prepare: {
        outputs: [],
      },
    },
  },
} as const;

// const jobs = {
//   prepare: typedWrap({
//     availableNeeds: ['build', 'deploy'],
//     needs: [],
//     outputs: [],
//   }),
//   deploy: typedWrap({
//     availableNeeds: ['prepare', 'build'],
//     needs: ['build'],
//     outputs: ['userId'], // used by needs
//   }),
//   build: typedWrap({
//     availableNeeds: ['prepare', 'deploy'],
//     needs: ['prepare'],
//     outputs: [],
//   }),
// } as const;

/**
 * Define type
 */
type TEnv = typeof env[number];
type TJob = typeof jobs;
type TAvailableNeeds<T extends keyof TJob> = TJob[T]['availableNeeds'][number];
type TNeeds<T extends keyof TJob> = keyof  TJob[T]['needs'];
type TNeedsProp<T extends keyof TJob> = TJob[T]['needs'][TNeeds<T>];
// @ts-ignore
type TOutputs<T extends keyof TJob> = TNeedsProp<T>['outputs'][number];

type A = TAvailableNeeds<'prepare'>;
  // ^?

type B = TNeeds<'deploy'>;
  // ^?

type C = TNeedsProp<'deploy'>;
  // ^?

type D = TOutputs<'deploy'>;
  // ^?
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
