import { initContextGithubEvent } from './events';
import { NestedKeyOf } from './utils';

// sample object
const needs = {
  prep: {
    result: 'success',
    outputs: {
      userId: 234,
    },
  },
};

// sample object
const steps = {
  'my-step': {
    outputs: {},
    outcome: 'success',
    conclusion: 'success',
  },
};

export interface ContextGithubOption {
  owner?: string;
  repo?: string;
  // event_name?: string;
  workflow?: string;
  repository_visibility?: string;
  username?: string;
  email?: string;
  name?: string;
  commit_message?: string;
  ref?: string;
  jobId?: string;
}

export type AllEvent = 'push' | 'pull_request' | 'workflow_dispatch';

export type EventOption<U extends { eventName: string; event: U['event'] }>  = {
  eventName: string;
  event: U['event']
};

/**
 * Init context for testing (Push Event)
 * @param option
 * @returns
 */
export function initContextGithub<U extends EventOption<U>>(option: ContextGithubOption = {}, eventOption: U) {
  const owner = option.owner ?? 'mildronize';
  const repo = option.repo ?? 'saiphan';
  const workflow = option.workflow ?? '${workflow}';
  const repository_visibility = option.repository_visibility ?? 'public';
  const username = option.username ?? 'mildronize';
  const email = option.email ?? 'john@email.com';
  const name = option.name ?? 'John Doe';
  const commit_message = option.commit_message ?? 'Update README.md';
  const ref = option.ref ?? 'refs/heads/main';
  const jobId = option.jobId ?? 'build';

  // When pull request event
  // head_ref: 'mildronize-patch-1',
  // base_ref: 'main',

  // sample object when push event
  return {
    // event object depends on event type
    event: eventOption.event,
    // the rest object
    token: `ghs_A6oVa`,
    job: `${jobId}`,
    ref: `${ref}`,
    sha: `fa825a3e9e47ef3d585e62e885dc04c573c33cc2`,
    repository: `${owner}/${repo}`,
    repository_owner: `${owner}`,
    repository_owner_id: 3647850,
    repositoryUrl: `git://github.com/${owner}/${repo}.git`,
    run_id: 4871234356,
    run_number: 3,
    retention_days: 90,
    run_attempt: 1,
    artifact_cache_size_limit: 10,
    repository_visibility: `${repository_visibility}`,
    repository_id: 635736144,
    actor_id: 3647850,
    actor: `${owner}`,
    triggering_actor: `${owner}`,
    workflow: `${workflow}`,
    head_ref: ``,
    base_ref: ``,
    event_name: `${eventOption.eventName}`,
    server_url: `https://github.com`,
    api_url: `https://api.github.com`,
    graphql_url: `https://api.github.com/graphql`,
    ref_name: `main`,
    ref_protected: false,
    ref_type: `branch`,
    secret_source: `Actions`,
    workflow_ref: `${owner}/${repo}/${workflow}@${ref}`,
    workflow_sha: `fa825a3e9e47ef3d585e62e885dc04c573c33cc2`,
    workspace: `/home/runner/work/${repo}/${repo}`,
    action: `__run`,
    event_path: `/home/runner/work/_temp/_github_workflow/event.json`,
    action_repository: ``,
    action_ref: ``,
    path: `/home/runner/work/_temp/_runner_file_commands/add_path_4c4ceb32-5fc4-4ec9-9d8e-3676e84a35a1`,
    env: `/home/runner/work/_temp/_runner_file_commands/set_env_4c4ceb32-5fc4-4ec9-9d8e-3676e84a35a1`,
    step_summary: `/home/runner/work/_temp/_runner_file_commands/step_summary_4c4ceb32-5fc4-4ec9-9d8e-3676e84a35a1`,
    state: `/home/runner/work/_temp/_runner_file_commands/save_state_4c4ceb32-5fc4-4ec9-9d8e-3676e84a35a1`,
    output: `/home/runner/work/_temp/_runner_file_commands/set_output_4c4ceb32-5fc4-4ec9-9d8e-3676e84a35a1`,
  };
}

declare function getData<T extends Object>(object: T, attr: NestedKeyOf<T>): any;
getData(initContextGithub({}, initContextGithubEvent.pullRequest()), 'event.number');


