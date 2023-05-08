import test from 'ava';
import workflow from './basic.actions';
// import '../.spn/complex.actions.type';
import { NestedKeyOf, initContextGithub, initContextGithubEvent } from 'saiphan';

// When run the unit test, the workflow will perform expression `.eval()` function
// declare function getData<T extends Object>(object: T, attr: NestedKeyOf<T>): any;

// const data = {
//   github: initContextGithub({}, initContextGithubEvent.pullRequest()),
// };

// workflow.

// getData(data.github, 'event.number');

test('basic actions', (t) => {
  t.not(workflow, undefined);
  t.is(workflow.name, 'my-workflow');
  if ('pullRequest' in workflow.on) {
    t.deepEqual(workflow.on?.pullRequest?.types, ['opened']);
  }
  t.deepEqual(Object.keys(workflow.job), ['happyJob']);
});

test('Test github expression', (t) => {
  t.is(workflow.getJob('happyJob')?.if?.eval(), true);
});

// The test helper should provide a way to mock the `github` context
