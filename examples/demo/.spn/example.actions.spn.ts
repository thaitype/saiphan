// Generated file - do not edit manually!
// Done by command spnx

import { TypedWorkflowJob, typedWrap } from 'saiphan';

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

export default {
  jobs,
};
