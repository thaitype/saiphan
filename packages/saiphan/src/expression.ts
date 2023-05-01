
interface ExpBase<TType extends string, TInput extends unknown[], TOutput> {
  type: TType;
  input: TInput,
  eval: () => TOutput;
  stringify: () => string;
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
  var: (arg: Expression) => string,
  // or: (exp1: ExpressionBoolean, exp2: ExpressionBoolean) => ExpressionBoolean,
}

function wrapVariable(variable: string) {
  return `\${{ ${variable} }}`;
}

const t: T = {
  equal: (exp1, exp2) => ({
      type: 'Equal',
      input: [exp1, exp2],
      eval: () => exp1.eval() === exp2.eval(),
      stringify: () => `(${exp1.stringify()} == ${exp2.stringify()})`,
  }),
  // contain: (search: ExpressionString, item: ExpressionString) => ({
  //     type: 'Contain',
  //     output: search.output.indexOf(item.output) >= 0,
  // }) as ExpContain,
  // github: (...args: any[]) => ({
  //     type: 'Github'
  // }) as ExpGithub,
  string: (value) => ({
      stringify: () => `"${value}"`,
      input: [value],
      type: 'String',
      eval: () => value,
  }),
  var: (arg) => wrapVariable(arg.stringify()),
  // boolean: (value: boolean) => ({
  //     output: value,
  //     type: 'Boolean'
  // }) as ExpBoolean,
  // or: (exp1: ExpressionBoolean, exp2: ExpressionBoolean) => ({
  //     type: 'Or',
  //     input: [exp1, exp2],
  //     eval: () => exp1.eval() || exp2.eval(),
   //   stringify: () => `${exp1.stringify()} || ${exp2.stringify()}`,
  // }),
}

// if: `contains(github.event.pull_request.title, '"') == true`,
// const expression: Expression = t.equal(
//     t.contain(t.github('event.pull_request.title'), t.string('"')),
//     t.boolean(true)
// );

// const exp1: Expression = t.string('lk');

const expression: Expression = t.equal(t.equal(t.string('555'), t.string('555')), t.string('demo'));

console.log(JSON.stringify(expression, null, 2))

type A = typeof expression.input[0]

console.log(`eval: ${expression.eval()}`);
console.log(`stringify: ${expression.stringify()}`);

console.log(`inline string template: ${t.var(expression)}`);


const aa =  "(needs.deploy-web.result == 'success' || needs.deploy-web.result == 'skipped') "

// const bb = t.or(t.equal(t.needs('deploy-web.result'), t.string('success')), t.equal(t.needs('deploy-web.result'), t.string('skipped')))
