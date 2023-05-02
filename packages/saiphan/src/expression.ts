export interface ExpBase<
  TType extends string,
  TInput extends unknown[],
  TOutput
> {
  type: TType;
  input: TInput;
  eval: () => TOutput;
  stringify: () => string;
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
  [ExpressionString, ExpressionString],
  boolean
>;
/**
 * Return Type Expression Always
 * @note Return true always (Need to be clarified with GitHub Actions `always()` function)
 */
export type ExpAlways = ExpBase<'Always', [], true>;

// ----------------------------

export type ExpressionBoolean = ExpEqual | ExpBoolean | ExpContain | ExpAlways;
export type ExpressionString = ExpString;

/**
 * All Available Expressions
 */
export type Expression = ExpressionBoolean | ExpressionString;

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
