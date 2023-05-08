import { initWorkflowPullRequestEvent } from './pull_request';
import { initWorkflowPushEvent } from './push';
import { initWorkflowUnknownEvent } from './unknown';

export const initContextGithubEvent = {
  push: initWorkflowPushEvent,
  pullRequest: initWorkflowPullRequestEvent,
  unknown: initWorkflowUnknownEvent
};
