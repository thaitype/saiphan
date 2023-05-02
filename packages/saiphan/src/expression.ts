interface ExpBase<TType extends string, TInput extends unknown[], TOutput> {
  type: TType;
  input: TInput;
  eval: () => TOutput;
  stringify: () => string;
}

// type ExpContain
// interface ExpContain extends ExpBase<'Contain', boolean> { }
// interface ExpGithub extends ExpBase<'Github', string> { }

// interface ExpBoolean extends ExpBase<'Boolean', boolean> {}

function wrapVariable(variable: string) {
  return `\${{ ${variable} }}`;
}

/**
 * Return Type Expression Equal
 */

export type ExpEqual = ExpBase<'Equal', [Expression, Expression], boolean>;

/**
 * Expression Equal Factory Function
 * @param args
 * @returns
 */
function equal(...args: ExpEqual['input']): ExpEqual {
  return {
    type: 'Equal',
    input: [args[0], args[1]],
    eval: () => args[0].eval() === args[1].eval(),
    stringify: () => `(${args[0].stringify()} == ${args[1].stringify()})`,
  };
}

type ExpString = ExpBase<'String', [string], string>;
function string(...args: ExpString['input']): ExpString {
  return {
    stringify: () => `"${args[0]}"`,
    input: [args[0]],
    type: 'String',
    eval: () => args[0],
  };
}

function exp(arg: Expression){
  return wrapVariable(arg.stringify());
}
// ----------------------------


type ExpressionBoolean = ExpEqual;
type ExpressionString = ExpString;

/**
 * All Available Expressions
 */
type Expression = ExpressionBoolean | ExpressionString;

const t = {
  equal,
  string,
  exp,
};

// if: `contains(github.event.pull_request.title, '"') == true`,
// const expression: Expression = t.equal(
//     t.contain(t.github('event.pull_request.title'), t.string('"')),
//     t.boolean(true)
// );


const expression: Expression = t.equal(
  t.equal(t.string('555'), t.string('555')),
  t.string('demo')
);

console.log(JSON.stringify(expression, null, 2));

type A = (typeof expression.input)[0];

console.log(`eval: ${expression.eval()}`);
console.log(`stringify: ${expression.stringify()}`);
console.log(`inline string template: ${t.exp(expression)}`);

const aa =
  "(needs.deploy-web.result == 'success' || needs.deploy-web.result == 'skipped') ";

// const bb = t.or(t.equal(t.needs('deploy-web.result'), t.string('success')), t.equal(t.needs('deploy-web.result'), t.string('skipped')))

// contain: (search: ExpressionString, item: ExpressionString) => ({
//     type: 'Contain',
//     output: search.output.indexOf(item.output) >= 0,
// }) as ExpContain,
// github: (...args: any[]) => ({
//     type: 'Github'
// }) as ExpGithub,
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
