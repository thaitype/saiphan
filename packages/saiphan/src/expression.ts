export interface ExpBase<
  TType extends string,
  TInput extends unknown[],
  TOutput
> {
  type: TType;
  input: TInput;
  eval: () => TOutput;
  toString: () => string;
}

/**
 * Return Type Expression Equal
 */
export type ExpEqual = ExpBase<'Equal', [Expression, Expression], boolean>;
/**
 * Return Type Expression String
 */
export type ExpString = ExpBase<'String', [string], string>;
/**
 * Return Type Expression Boolean
 */
export type ExpBoolean = ExpBase<'Boolean', [boolean], boolean>;
/**
 * Return Type Expression Contain
 */
export type ExpContain = ExpBase<
  'Contain',
  [ExpressionString | ExpGithub | ExpNeeds, ExpressionString | ExpGithub | ExpNeeds],
  boolean
>;
/**
 * Return Type Expression Always
 * @note Return true always
 * TODO: Need to be clarified with GitHub Actions `always()` function
 */
export type ExpAlways = ExpBase<'Always', [], true>;

/**
 * Return Type Expression Needs
 * TODO: Eval function require mock value when running test
 */
export type ExpNeeds<TNeed extends string = string, TOutput = any> = ExpBase<'Needs', [TNeed], TOutput>;

/**
 * Return Type Expression Github
 * TODO: Eval function require mock value when running test
 */
export type ExpGithub<TOutput = any> = ExpBase<'Github', [string], TOutput>;
// ----------------------------

export type ExpressionBoolean = ExpEqual | ExpBoolean | ExpContain | ExpAlways;
export type ExpressionString = ExpString;

/**
 * All Available Expressions
 */
export type Expression = ExpressionBoolean | ExpressionString | ExpGithub | ExpNeeds;

// const expression: Expression = t.equal(
//   t.equal(t.string('555'), t.string('555')),
//   t.string('demo')
// );

// console.log(JSON.stringify(expression, null, 2));
// console.log(`eval: ${expression.eval()}`);
// console.log(`stringify: ${expression.stringify()}`);
// console.log(`inline string template: ${t.exp(expression)}`);

// const aa =
// "(needs.deploy-web.result == 'success' || needs.deploy-web.result == 'skipped') ";

// const bb = t.or(t.equal(t.needs('deploy-web.result'), t.string('success')), t.equal(t.needs('deploy-web.result'), t.string('skipped')))
