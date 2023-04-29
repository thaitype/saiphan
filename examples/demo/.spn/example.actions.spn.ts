// Generated file - do not edit manually!
// Done by command spnx

import { TypedWorkflowJob, typedWrap, Job, JobDetailCallback } from 'saiphan';


// const prepare =  typedWrap({
//   availableNeeds: ['build', 'deploy'],
//   needs: [],
// });

// const deploy = typedWrap({
//   availableNeeds: ['prepare', 'build'],
//   needs: ['build'],
// });

// const build = typedWrap({
//   availableNeeds: ['prepare', 'deploy'],
//   needs: ['prepare'],
// });
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


declare module "saiphan" {
  interface Job {
    prepare: JobDetailCallback<typeof jobs['prepare']['availableNeeds'][number]>;
  }
}

//  TypedWorkflowJob<typeof jobs['prepare']['availableNeeds'][number], typeof jobs['prepare']['needs'][number]>;
//

export default {
  jobs
};


