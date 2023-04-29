/**
 * Typed generated from spnx
 */

// export type TypedWorkflow<TJobId extends string, X extends string, Y extends string> = {
//   jobs: Record<TJobId, TypedWorkflowJob<X, Y>>;
// };

export type TypedWorkflowJob<TAvailableNeeds extends string, TNeeds extends string> = {
  availableNeeds: TAvailableNeeds[];
  needs: TNeeds[];
};

export function typedWrap<
  TAvailableNeeds extends string,
  TNeeds extends string
>(jobDetial: TypedWorkflowJob<TAvailableNeeds, TNeeds>) {
  return jobDetial;
}
