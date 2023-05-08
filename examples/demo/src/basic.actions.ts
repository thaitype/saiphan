
// saiphan@0.0.0
import { initWorkflow } from 'saiphan';

const workflow = initWorkflow({
  name: 'my-workflow',
  on: {
    pullRequest: {
      types: ['opened'],
    },
  },
});

workflow.job.happyJob = (t) => ({
  runsOn: 'ubuntu-latest',
  if: t.equal(t.contain(t.github('event.pull_request.title'), 'Happy PR'), true),
  steps: [
    {
      run: 'echo "Hello Happy Job!"',
    },
  ],
});

workflow.log();

export default workflow;
