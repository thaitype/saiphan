// Generated file - do not edit manually!
// Done by command spnx

import { TypedWorkflowJob, typedWrap, Job, JobDetailCallback } from 'saiphan';

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

declare module 'saiphan' {
  interface Job {
    prepare: JobDetailCallback<(typeof jobs)['prepare']['availableNeeds'][number]>;
    deploy: JobDetailCallback<(typeof jobs)['deploy']['availableNeeds'][number]>;
  }
}

export default {
  jobs,
};
