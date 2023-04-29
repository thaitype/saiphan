// Generated file - do not edit manually!
// Done by command spnx

export default {
  jobs: {
    prepare: {
      availableNeeds: ['build', 'deploy'],
      needs: [],
    },
    deploy: {
      availableNeeds: ['prepare', 'build'],
      needs: ['build'],
    },
    build: {
      availableNeeds: ['prepare', 'deploy'],
      needs: ['prepare'],
    },
  }
};
