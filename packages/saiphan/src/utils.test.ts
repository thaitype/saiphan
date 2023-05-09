import test from 'ava';
import { getNestedValue, isWrapVariable, stringify, unwrapParentheses, unwrapVariable, wrapVariable } from './utils';

test('test wrapVariable', (t) => {
  t.is(wrapVariable('test'), '${{ test }}');
  t.is(wrapVariable('${{ test }}'), '${{ test }}');
});

test('test isWrapVariable', (t) => {
  t.is(isWrapVariable('${{test}}'), true);
  t.is(isWrapVariable('${{ test }}'), true);
  t.is(isWrapVariable(' ${{ test }}'), true);
  t.is(isWrapVariable(' ${{ test }} '), true);

  t.is(isWrapVariable('test'), false);
  t.is(isWrapVariable('test ${{ test }}'), false);
  t.is(isWrapVariable('${{ test }} test'), false);
  t.is(isWrapVariable('test ${{ test }} test'), false);

  t.is(isWrapVariable('${{test}'), false);
  t.is(isWrapVariable('${{ test }'), false);
  t.is(isWrapVariable('${ test }'), false);
  t.is(isWrapVariable('${ test'), false);
});

test('test unwrapVariable', (t) => {
  // is wrap variable
  t.is(unwrapVariable('${{test}}'), 'test');
  t.is(unwrapVariable('${{ test }}'), 'test');
  t.is(unwrapVariable(' ${{ test }}'), 'test');
  t.is(unwrapVariable(' ${{ test }} '), 'test');

  // is not wrap variable
  t.is(unwrapVariable('test'), 'test');
  t.is(unwrapVariable('test ${{ test }}'), 'test ${{ test }}');
  t.is(unwrapVariable('${{ test }} test'), '${{ test }} test');

  t.is(unwrapVariable(undefined), '');
});

test('test unwrapParentheses', (t) => {
  t.is(unwrapParentheses('(test)'), 'test');
  t.is(unwrapParentheses('((test))'), '(test)');
  t.is(unwrapParentheses(' (test) '), 'test');
  t.is(unwrapParentheses(undefined), '');
});

test('test stringify', (t) => {
  t.is(stringify('test'), '"test"');
  t.is(stringify(1), '1');
  t.is(stringify(true), 'true');
});


// echo "${{ toJSON(github.event.commits) }}"
// echo "${{ toJSON(github.event.commits[0].message) }}"
// echo "${{ toJSON(github.event.commits.*.message) }}"

test('test getNestedValue', (t) => {
  t.is(getNestedValue({ name: 'data' }, 'name'), 'data');
  t.is(getNestedValue({ name: { data: 'data' } }, 'name.data'), 'data');
  t.is(getNestedValue({ name: { data: { nested: 'data'} } }, 'name.data.nested'), 'data');
  // @ts-expect-error
  t.is(getNestedValue({ name: { data: 'data' } }, 'name.data.data'), undefined);
});
