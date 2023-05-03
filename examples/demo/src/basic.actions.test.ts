import test from 'ava';
import workflow from './basic.actions';

test('basic actions', (t) => {
  t.not(workflow, undefined);
  t.is(workflow.name, 'my-workflow');
  if ('pullRequest' in workflow.on) {
    t.deepEqual(workflow.on?.pullRequest?.types, ['opened']);
  }
  t.deepEqual(Object.keys(workflow.job), ['happyJob']);
});
