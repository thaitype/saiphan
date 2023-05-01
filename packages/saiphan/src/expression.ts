
interface ExpBase<TType extends string, TInput extends unknown[], TOutput> {
  type: TType;
  input: TInput,
  // output: TOutput;
  eval: () => TOutput;
}

type ExpEqualParams = [Expression, Expression];
interface ExpEqual extends ExpBase<'Equal', ExpEqualParams, boolean> { }

// type ExpContain
// interface ExpContain extends ExpBase<'Contain', boolean> { }
// interface ExpGithub extends ExpBase<'Github', string> { }
type ExpStringParams = [string];
interface ExpString extends ExpBase<'String', ExpStringParams, string> { }
// interface ExpBoolean extends ExpBase<'Boolean', boolean> {}

type ExpressionBoolean = ExpEqual;
type ExpressionString = ExpString;
type Expression = ExpressionBoolean | ExpressionString;

type T = {
  equal: (...args: ExpEqualParams) => ExpEqual,
  string: (...args: ExpStringParams) => ExpString,
}

const t: T = {
  equal: (exp1, exp2) => ({
      type: 'Equal',
      input: [exp1, exp2],
      eval: () => exp1.eval() === exp2.eval(),
      // output: exp1.output === exp2.output,
  }),
  // contain: (search: ExpressionString, item: ExpressionString) => ({
  //     type: 'Contain',
  //     output: search.output.indexOf(item.output) >= 0,
  // }) as ExpContain,
  // github: (...args: any[]) => ({
  //     type: 'Github'
  // }) as ExpGithub,
  string: (value) => ({
      // output: value,
      input: [value],
      type: 'String',
      eval: () => value,
  }),
  // boolean: (value: boolean) => ({
  //     output: value,
  //     type: 'Boolean'
  // }) as ExpBoolean,
}

// if: `contains(github.event.pull_request.title, '"') == true`,
// const expression: Expression = t.equal(
//     t.contain(t.github('event.pull_request.title'), t.string('"')),
//     t.boolean(true)
// );

// const exp1: Expression = t.string('lk');

const expression: Expression = t.equal(t.string('555'), t.string('555'));

console.log(JSON.stringify(expression, null, 2))

type A = typeof expression.input[0]

console.log(`eval: ${expression.eval()}`);
