import { initWorkflow } from 'saiphan';
import '../.spn/example.actions.type';

// typed-actions helper.
const workflow = initWorkflow({
  name: 'my-workflow',
  on: {
    pullRequest: {
      types: ['opened', 'synchronize'],
      branches: ['preview/develop'],
    },
  },
  env: {
    state_name: 'my-state',
    artifact_web_name: 'web_api',
    app_name: 'web-api',
    slot_name: 'preview',
    resource_group: 'my-resource-group',
  },
});

workflow.job.prepare = (t) => ({
  runsOn: 'ubuntu-latest',
  outputs: {
    taskType: 'build',
  },
  steps: [
    {
      name: 'Checkout',
      uses: 'actions/checkout@v2',
      with: {
        ref: 'develop',
        aaa: 'efef',
      }
    },
    {
      name: 'Set up Node.js',
      uses: 'actions/setup-node@v1',
    }
  ],
});

// This way may use `spn.ts` to add type checking.
workflow.job.build = (t) => ({
  if: t.equal(t.contain(t.github('event.pull_request.title'), '"'), false),
  needs: ['prepare'],
  outputs: {
    userId: '1234',
  },
  runsOn: 'ubuntu-latest',
  steps: [
    {
      name: 'Checkout',
      run: `echo 'Hello World!' ${t.var(t.github())} ${t.needs('prepare')}`,
    },
  ],
});

workflow.job.deploy = (t) => ({
  // if: `contains(github.event.pull_request.title, '"') == true`,
  if: t.equal(t.contain(t.github('event.pull_request.title'), '"'), true),
  runsOn: 'ubuntu-latest',
  needs: ['build', 'prepare'],
  steps: [
    {
      run: `echo 'Hello World!' ${t.needs('build.outputs.userId')} ${t.needs('prepare.outputs.taskType')}`,
    },
    {
      name: 'Download artifact from build job',
      uses: 'actions/download-artifact@v2',
      with: {
        name: t.env('artifact_web_name'), // Compile to '${{ env.artifact_web_name }}'
      },
    },
    {
      name: 'Get Publish Profile',
      id: 'get-publish-profile',
      uses: 'mildronize/actions-az-cli/webapp/deployment/list-publishing-profiles@v1',
      with: {
        azure_credentials: t.secrets('AZURE_CREDENTIAL'), // Compile to '${{ secrets.AZURE_CREDENTIAL }}'
        name: t.env('app_name'), // Compile to '${{ env.name }}'
        slot: t.env('slot_name'), // Compile to '${{ env.slot_name }}'
        resource_group: t.env('resource_group'), // Compile to '${{ env.resource_group }}'
      },
    },
    {
      name: 'Deploy to Azure Web App',
      id: 'deploy-to-webapp',
      uses: 'azure/webapps-deploy@v2',
      with: {
        'app-name': t.env('app_name'), // compile to '${{ env.app_name }}'
        'publish-profile': t.steps('get-publish-profile').outputs('publish_profile'), // Compile to '${{ steps.get-publish-profile.outputs.publish_profile }}'
        package: '.',
        'slot-name': t.env('slot_name'), // compile to '${{ env.slot_name }}'
      },
    },
    {
      name: `Save stats ${t.env('state_name')}`, // Compile to 'Save stats ${{ env.name }}'
      if: t.always(),
      run: t.multiline(/* bash */ `
        # Multi-line support (common-tags npm)
        node ./save-stats.js
        `),
    },
  ],
});



workflow.log();

export default workflow;
