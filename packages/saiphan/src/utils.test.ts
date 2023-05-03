import test from 'ava';
import { isWrapVariable, stringify, unwrapParentheses, unwrapVariable, wrapVariable } from './utils';

test('test wrapVariable', t => {
  t.is(wrapVariable('test'), '${{ test }}');
  t.is(wrapVariable('${{ test }}'), '${{ test }}');
});

test('test isWrapVariable', t => {
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

test('test unwrapVariable', t => {
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

test('test unwrapParentheses', t => {
  t.is(unwrapParentheses('(test)'), 'test');
  t.is(unwrapParentheses('((test))'), '(test)');
  t.is(unwrapParentheses(' (test) '), 'test');
  t.is(unwrapParentheses(undefined), '');
});


test('test stringify', t => {
  t.is(stringify('test'), '"test"');
  t.is(stringify(1), '1');
  t.is(stringify(true), 'true');
})
