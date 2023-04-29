/**
 * Typed generated from spnx
 */

// export type TypedWorkflow<TJobId extends string, X extends string, Y extends string> = {
//   jobs: Record<TJobId, TypedWorkflowJob<X, Y>>;
// };

export type TypedWorkflowJob<
  TAvailableNeeds extends string,
  TNeeds extends string,
  TOutputs extends string
> = {
  availableNeeds: TAvailableNeeds[];
  needs: TNeeds[];
  outputs: TOutputs[];
};

export function typedWrap<
  TAvailableNeeds extends string,
  TNeeds extends string,
  TOutputs extends string
>(jobDetial: TypedWorkflowJob<TAvailableNeeds, TNeeds, TOutputs>) {
  return jobDetial;
}
