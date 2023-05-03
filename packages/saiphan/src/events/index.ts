import { initWorkflowPullRequestEvent } from './pull_request';
import { initWorkflowPushEvent } from './push';

export * from './pull_request';
export * from './push';

export const initContextGithubEvent = {
  push: initWorkflowPushEvent,
  pullRequest: initWorkflowPullRequestEvent,
};
