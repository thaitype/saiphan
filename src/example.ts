import { defineWorkflow, initWorkflow, jobs } from './main';

const w = initWorkflow({
  name: 'my-workflow',
  on: {
    pullRequest: {
      types: ['opened', 'synchronize'],
      branches: ['preview/develop'],
    },
  },
  env: {
    artifact_web_name: 'web_api',
    name: 'web-api',
    slot_name: 'preview',
    resource_group: 'my-resource-group',
  },
});

const workflow = defineWorkflow(w);

const workflows = jobs({
  error: {
    if: `contains(github.event.pull_request.title, '"') == true`,
    runsOn: 'ubuntu-latest',
    steps: [
      {
        run: "echo 'Hello World!'",
      },
      {
        name: 'Download artifact from build job',
        uses: 'actions/download-artifact@v2',
        with: {
          name: '${{ env.artifact_web_name }}',
        },
      },
      {
        name: 'Get Publish Profile',
        id: 'get-publish-profile',
        uses: 'mildronize/actions-az-cli/webapp/deployment/list-publishing-profiles@v1',
        with: {
          azure_credentials: '${{ secrets.AZURE_CREDENTIAL }}',
          name: '${{ env.name }}',
          slot: '${{ env.slot_name }}',
          resource_group: '${{ env.resource_group }}',
        },
      },
      {
        name: 'Deploy to Azure Web App',
        id: 'deploy-to-webapp',
        uses: 'azure/webapps-deploy@v2',
        with: {
          'app-name': '${{ matrix.app_name }}',
          'publish-profile': '${{ steps.get-publish-profile.outputs.publish_profile }}',
          package: '.',
          'slot-name': '${{ matrix.slot_name }}',
        },
      },
    ],
  },
  build: {
    if: `contains(github.event.pull_request.title, '"') == false`,
    runsOn: 'ubuntu-latest',
    steps: [
      {
        name: 'Checkout',
        run: "echo 'Hello World!'",
      },
    ],
  },
});

export default workflows;
