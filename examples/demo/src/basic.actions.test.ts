import test from 'ava';
import workflow from './basic.actions';
import _ from 'lodash';

test('basic actions', (t) => {
  t.not(workflow, undefined);
  t.is(workflow.name, 'my-workflow');
  if ('pullRequest' in workflow.on) {
    t.deepEqual(workflow.on?.pullRequest?.types, ['opened']);
  }
  t.deepEqual(Object.keys(workflow.job), ['happyJob']);
});

test('Test github expression', (t) => {
  _.set(workflow.data, 'github.event.pull_request.title', 'Happy PR');
  t.is(workflow.getJob('happyJob')?.if?.eval(), true);
});

