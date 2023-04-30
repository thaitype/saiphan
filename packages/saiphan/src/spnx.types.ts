/**
 * Typed generated from spnx
 */

export type TypedWorkflow = {
  jobs: Record<string, TypedWorkflowJob>;
};

export type TypedWorkflowJob = {
  availableNeeds: string[];
  needs: Record<string, TypedOutput<string>>;
};

// export type TypedWorkflowJob<
//   TAvailableNeeds extends string,
//   TNeeds extends string,
//   TOutputs extends string
// > = {
//   availableNeeds: TAvailableNeeds[];
//   needs: Record<TNeeds, TypedOutput<TOutputs>[]>;
// };

export type TypedOutput<TOutputs extends string> = {
  outputs: TOutputs[];
};

// export function typedWrap<
//   TAvailableNeeds extends string,
//   TNeeds extends string,
//   TOutputs extends string
// >(jobDetial: TypedWorkflowJob<TAvailableNeeds, TNeeds, TOutputs>) {
//   return jobDetial;
// }
