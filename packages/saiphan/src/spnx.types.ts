/**
 * Typed generated from spnx
 */

export type TypedWorkflow<TJobId extends string> = {
  jobs: Record<TJobId, any>;
}

export type TypedWorkflowJob<TNeeds extends keyof any> = {
  availableNeeds: TNeeds[];
}
