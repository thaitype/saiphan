// https://github.com/cicadahq/cicada
// https://dagger.io/blog/nodejs-sdk

export type PullRequestEvent = {
  pullRequest: {
    types: string[];
    branches: string[];
  };
};

export type PushEvent = {
  push: {
    types: string[];
    branches: string[];
  };
};

export interface WorkflowOption {
  name: string;
  on: PullRequestEvent | PushEvent;
}

export function initWorkflow(option: WorkflowOption) {
  return {
    jobs: (jobs: any) => {},
  };
}

const w = initWorkflow({
  name: 'my-workflow',
  on: {
    pullRequest: {
      types: ['opened', 'synchronize'],
      branches: ['preview/develop'],
    },
  },
});

const workflows = w.jobs({
  error: {
    if: `contains(github.event.pull_request.title, '"') == true`,
    runsOn: 'ubuntu-latest',
    steps: [
      {
        name: 'Checkout',
        run: "echo 'Hello World!'",
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
