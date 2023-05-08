

export function initWorkflowUnknownEvent() {
  return {
    event: {} as Record<string, any>,
    eventName: 'unknown' as const
  }
}
