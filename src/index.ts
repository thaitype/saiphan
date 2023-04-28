export function sum(num1: number, num2: number): number {
  return num1 + num2;
}

// https://github.com/cicadahq/cicada
// https://dagger.io/blog/nodejs-sdk

type PullRequestEvent = {
  pullRequest: {
    types: string[];
    branches: string[];
  };
};

type PushEvent = {
  push: {
    types: string[];
    branches: string[];
  };
};

interface WorkflowOption {
  name: string;
  on: PullRequestEvent | PushEvent;
}

function initWorkflow(option: WorkflowOption) {
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
