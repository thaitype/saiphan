export interface ContextGithubEventOption_PullRequest {
  owner?: string;
  repo?: string;
  action?: string;
  number?: number;
}

export function initWorkflowPullRequestEvent(option: ContextGithubEventOption_PullRequest = {}){
  const owner = option.owner ?? 'my-org';
  const repo = option.repo ?? 'my-repo';
  const action = option.action ?? 'opened';
  const number = option.number ?? 1;
  const event = {
    action: `${action}`,
    number: `${number}`,
    pull_request: {
      _links: {
        comments: {
          href: `https://api.github.com/repos/${owner}/${repo}/issues/1/comments`,
        },
        commits: {
          href: `https://api.github.com/repos/${owner}/${repo}/pulls/1/commits`,
        },
        html: {
          href: `https://github.com/${owner}/${repo}/pull/1`,
        },
        issue: {
          href: `https://api.github.com/repos/${owner}/${repo}/issues/1`,
        },
        review_comment: {
          href: `https://api.github.com/repos/${owner}/${repo}/pulls/comments{/number}`,
        },
        review_comments: {
          href: `https://api.github.com/repos/${owner}/${repo}/pulls/1/comments`,
        },
        self: {
          href: `https://api.github.com/repos/${owner}/${repo}/pulls/1`,
        },
        statuses: {
          href: `https://api.github.com/repos/${owner}/${repo}/statuses/cf2577ee361e748e01c2d0d3efd3025624dc9c31`,
        },
      },
      active_lock_reason: ``,
      additions: 2,
      assignee: ``,
      assignees: [],
      author_association: `OWNER`,
      auto_merge: ``,
      base: {
        label: `${owner}:main`,
        ref: `main`,
        repo: {
          allow_auto_merge: false,
          allow_forking: true,
          allow_merge_commit: true,
          allow_rebase_merge: true,
          allow_squash_merge: true,
          allow_update_branch: false,
          archive_url: `https://api.github.com/repos/${owner}/${repo}/{archive_format}{/ref}`,
          archived: false,
          assignees_url: `https://api.github.com/repos/${owner}/${repo}/assignees{/user}`,
          blobs_url: `https://api.github.com/repos/${owner}/${repo}/git/blobs{/sha}`,
          branches_url: `https://api.github.com/repos/${owner}/${repo}/branches{/branch}`,
          clone_url: `https://github.com/${owner}/${repo}.git`,
          collaborators_url: `https://api.github.com/repos/${owner}/${repo}/collaborators{/collaborator}`,
          comments_url: `https://api.github.com/repos/${owner}/${repo}/comments{/number}`,
          commits_url: `https://api.github.com/repos/${owner}/${repo}/commits{/sha}`,
          compare_url: `https://api.github.com/repos/${owner}/${repo}/compare/{base}...{head}`,
          contents_url: `https://api.github.com/repos/${owner}/${repo}/contents/{+path}`,
          contributors_url: `https://api.github.com/repos/${owner}/${repo}/contributors`,
          created_at: `2023-05-03T10:52:56Z`,
          default_branch: `main`,
          delete_branch_on_merge: false,
          deployments_url: `https://api.github.com/repos/${owner}/${repo}/deployments`,
          description: ``,
          disabled: false,
          downloads_url: `https://api.github.com/repos/${owner}/${repo}/downloads`,
          events_url: `https://api.github.com/repos/${owner}/${repo}/events`,
          fork: false,
          forks: 0,
          forks_count: 0,
          forks_url: `https://api.github.com/repos/${owner}/${repo}/forks`,
          full_name: `${owner}/${repo}`,
          git_commits_url: `https://api.github.com/repos/${owner}/${repo}/git/commits{/sha}`,
          git_refs_url: `https://api.github.com/repos/${owner}/${repo}/git/refs{/sha}`,
          git_tags_url: `https://api.github.com/repos/${owner}/${repo}/git/tags{/sha}`,
          git_url: `git://github.com/${owner}/${repo}.git`,
          has_discussions: false,
          has_downloads: true,
          has_issues: true,
          has_pages: false,
          has_projects: true,
          has_wiki: true,
          homepage: ``,
          hooks_url: `https://api.github.com/repos/${owner}/${repo}/hooks`,
          html_url: `https://github.com/${owner}/${repo}`,
          id: 635736144,
          is_template: false,
          issue_comment_url: `https://api.github.com/repos/${owner}/${repo}/issues/comments{/number}`,
          issue_events_url: `https://api.github.com/repos/${owner}/${repo}/issues/events{/number}`,
          issues_url: `https://api.github.com/repos/${owner}/${repo}/issues{/number}`,
          keys_url: `https://api.github.com/repos/${owner}/${repo}/keys{/key_id}`,
          labels_url: `https://api.github.com/repos/${owner}/${repo}/labels{/name}`,
          language: ``,
          languages_url: `https://api.github.com/repos/${owner}/${repo}/languages`,
          license: ``,
          merge_commit_message: `PR_TITLE`,
          merge_commit_title: `MERGE_MESSAGE`,
          merges_url: `https://api.github.com/repos/${owner}/${repo}/merges`,
          milestones_url: `https://api.github.com/repos/${owner}/${repo}/milestones{/number}`,
          mirror_url: ``,
          name: `${repo}`,
          node_id: `R_kgDOJeSQUA`,
          notifications_url: `https://api.github.com/repos/${owner}/${repo}/notificationsparticipating`,
          open_issues: 1,
          open_issues_count: 1,
          owner: {
            avatar_url: `https://avatars.githubusercontent.com/u/3647850?v=4`,
            events_url: `https://api.github.com/users/${owner}/events{/privacy}`,
            followers_url: `https://api.github.com/users/${owner}/followers`,
            following_url: `https://api.github.com/users/${owner}/following{/other_user}`,
            gists_url: `https://api.github.com/users/${owner}/gists{/gist_id}`,
            gravatar_id: ``,
            html_url: `https://github.com/${owner}`,
            id: 3647850,
            login: `${owner}`,
            node_id: `MDQ6VXNlcjM2NDc4NTA=`,
            organizations_url: `https://api.github.com/users/${owner}/orgs`,
            received_events_url: `https://api.github.com/users/${owner}/received_events`,
            repos_url: `https://api.github.com/users/${owner}/repos`,
            site_admin: false,
            starred_url: `https://api.github.com/users/${owner}/starred{/owner}{/repo}`,
            subscriptions_url: `https://api.github.com/users/${owner}/subscriptions`,
            type: `User`,
            url: `https://api.github.com/users/${owner}`,
          },
          private: false,
          pulls_url: `https://api.github.com/repos/${owner}/${repo}/pulls{/number}`,
          pushed_at: `2023-05-03T12:20:15Z`,
          releases_url: `https://api.github.com/repos/${owner}/${repo}/releases{/id}`,
          size: 1,
          squash_merge_commit_message: `COMMIT_MESSAGES`,
          squash_merge_commit_title: `COMMIT_OR_PR_TITLE`,
          ssh_url: `git@github.com:${owner}/${repo}.git`,
          stargazers_count: 0,
          stargazers_url: `https://api.github.com/repos/${owner}/${repo}/stargazers`,
          statuses_url: `https://api.github.com/repos/${owner}/${repo}/statuses/{sha}`,
          subscribers_url: `https://api.github.com/repos/${owner}/${repo}/subscribers`,
          subscription_url: `https://api.github.com/repos/${owner}/${repo}/subscription`,
          svn_url: `https://github.com/${owner}/${repo}`,
          tags_url: `https://api.github.com/repos/${owner}/${repo}/tags`,
          teams_url: `https://api.github.com/repos/${owner}/${repo}/teams`,
          topics: [],
          trees_url: `https://api.github.com/repos/${owner}/${repo}/git/trees{/sha}`,
          updated_at: `2023-05-03T10:52:56Z`,
          url: `https://api.github.com/repos/${owner}/${repo}`,
          use_squash_pr_title_as_default: false,
          visibility: `public`,
          watchers: 0,
          watchers_count: 0,
          web_commit_signoff_required: false,
        },
        sha: `ed2952486527c98882fc3cd20458a68c559acddb`,
        user: {
          avatar_url: `https://avatars.githubusercontent.com/u/3647850?v=4`,
          events_url: `https://api.github.com/users/${owner}/events{/privacy}`,
          followers_url: `https://api.github.com/users/${owner}/followers`,
          following_url: `https://api.github.com/users/${owner}/following{/other_user}`,
          gists_url: `https://api.github.com/users/${owner}/gists{/gist_id}`,
          gravatar_id: ``,
          html_url: `https://github.com/${owner}`,
          id: 3647850,
          login: `${owner}`,
          node_id: `MDQ6VXNlcjM2NDc4NTA=`,
          organizations_url: `https://api.github.com/users/${owner}/orgs`,
          received_events_url: `https://api.github.com/users/${owner}/received_events`,
          repos_url: `https://api.github.com/users/${owner}/repos`,
          site_admin: false,
          starred_url: `https://api.github.com/users/${owner}/starred{/owner}{/repo}`,
          subscriptions_url: `https://api.github.com/users/${owner}/subscriptions`,
          type: `User`,
          url: `https://api.github.com/users/${owner}`,
        },
      },
      body: ``,
      changed_files: 1,
      closed_at: ``,
      comments: 0,
      comments_url: `https://api.github.com/repos/${owner}/${repo}/issues/1/comments`,
      commits: 1,
      commits_url: `https://api.github.com/repos/${owner}/${repo}/pulls/1/commits`,
      created_at: `2023-05-03T12:20:15Z`,
      deletions: 1,
      diff_url: `https://github.com/${owner}/${repo}/pull/1.diff`,
      draft: false,
      head: {
        label: `${owner}:${owner}-patch-1`,
        ref: `${owner}-patch-1`,
        repo: {
          allow_auto_merge: false,
          allow_forking: true,
          allow_merge_commit: true,
          allow_rebase_merge: true,
          allow_squash_merge: true,
          allow_update_branch: false,
          archive_url: `https://api.github.com/repos/${owner}/${repo}/{archive_format}{/ref}`,
          archived: false,
          assignees_url: `https://api.github.com/repos/${owner}/${repo}/assignees{/user}`,
          blobs_url: `https://api.github.com/repos/${owner}/${repo}/git/blobs{/sha}`,
          branches_url: `https://api.github.com/repos/${owner}/${repo}/branches{/branch}`,
          clone_url: `https://github.com/${owner}/${repo}.git`,
          collaborators_url: `https://api.github.com/repos/${owner}/${repo}/collaborators{/collaborator}`,
          comments_url: `https://api.github.com/repos/${owner}/${repo}/comments{/number}`,
          commits_url: `https://api.github.com/repos/${owner}/${repo}/commits{/sha}`,
          compare_url: `https://api.github.com/repos/${owner}/${repo}/compare/{base}...{head}`,
          contents_url: `https://api.github.com/repos/${owner}/${repo}/contents/{+path}`,
          contributors_url: `https://api.github.com/repos/${owner}/${repo}/contributors`,
          created_at: `2023-05-03T10:52:56Z`,
          default_branch: `main`,
          delete_branch_on_merge: false,
          deployments_url: `https://api.github.com/repos/${owner}/${repo}/deployments`,
          description: ``,
          disabled: false,
          downloads_url: `https://api.github.com/repos/${owner}/${repo}/downloads`,
          events_url: `https://api.github.com/repos/${owner}/${repo}/events`,
          fork: false,
          forks: 0,
          forks_count: 0,
          forks_url: `https://api.github.com/repos/${owner}/${repo}/forks`,
          full_name: `${owner}/${repo}`,
          git_commits_url: `https://api.github.com/repos/${owner}/${repo}/git/commits{/sha}`,
          git_refs_url: `https://api.github.com/repos/${owner}/${repo}/git/refs{/sha}`,
          git_tags_url: `https://api.github.com/repos/${owner}/${repo}/git/tags{/sha}`,
          git_url: `git://github.com/${owner}/${repo}.git`,
          has_discussions: false,
          has_downloads: true,
          has_issues: true,
          has_pages: false,
          has_projects: true,
          has_wiki: true,
          homepage: ``,
          hooks_url: `https://api.github.com/repos/${owner}/${repo}/hooks`,
          html_url: `https://github.com/${owner}/${repo}`,
          id: 635736144,
          is_template: false,
          issue_comment_url: `https://api.github.com/repos/${owner}/${repo}/issues/comments{/number}`,
          issue_events_url: `https://api.github.com/repos/${owner}/${repo}/issues/events{/number}`,
          issues_url: `https://api.github.com/repos/${owner}/${repo}/issues{/number}`,
          keys_url: `https://api.github.com/repos/${owner}/${repo}/keys{/key_id}`,
          labels_url: `https://api.github.com/repos/${owner}/${repo}/labels{/name}`,
          language: ``,
          languages_url: `https://api.github.com/repos/${owner}/${repo}/languages`,
          license: ``,
          merge_commit_message: `PR_TITLE`,
          merge_commit_title: `MERGE_MESSAGE`,
          merges_url: `https://api.github.com/repos/${owner}/${repo}/merges`,
          milestones_url: `https://api.github.com/repos/${owner}/${repo}/milestones{/number}`,
          mirror_url: ``,
          name: `${repo}`,
          node_id: `R_kgDOJeSQUA`,
          notifications_url: `https://api.github.com/repos/${owner}/${repo}/notificationsparticipating`,
          open_issues: 1,
          open_issues_count: 1,
          owner: {
            avatar_url: `https://avatars.githubusercontent.com/u/3647850?v=4`,
            events_url: `https://api.github.com/users/${owner}/events{/privacy}`,
            followers_url: `https://api.github.com/users/${owner}/followers`,
            following_url: `https://api.github.com/users/${owner}/following{/other_user}`,
            gists_url: `https://api.github.com/users/${owner}/gists{/gist_id}`,
            gravatar_id: ``,
            html_url: `https://github.com/${owner}`,
            id: 3647850,
            login: `${owner}`,
            node_id: `MDQ6VXNlcjM2NDc4NTA=`,
            organizations_url: `https://api.github.com/users/${owner}/orgs`,
            received_events_url: `https://api.github.com/users/${owner}/received_events`,
            repos_url: `https://api.github.com/users/${owner}/repos`,
            site_admin: false,
            starred_url: `https://api.github.com/users/${owner}/starred{/owner}{/repo}`,
            subscriptions_url: `https://api.github.com/users/${owner}/subscriptions`,
            type: `User`,
            url: `https://api.github.com/users/${owner}`,
          },
          private: false,
          pulls_url: `https://api.github.com/repos/${owner}/${repo}/pulls{/number}`,
          pushed_at: `2023-05-03T12:20:15Z`,
          releases_url: `https://api.github.com/repos/${owner}/${repo}/releases{/id}`,
          size: 1,
          squash_merge_commit_message: `COMMIT_MESSAGES`,
          squash_merge_commit_title: `COMMIT_OR_PR_TITLE`,
          ssh_url: `git@github.com:${owner}/${repo}.git`,
          stargazers_count: 0,
          stargazers_url: `https://api.github.com/repos/${owner}/${repo}/stargazers`,
          statuses_url: `https://api.github.com/repos/${owner}/${repo}/statuses/{sha}`,
          subscribers_url: `https://api.github.com/repos/${owner}/${repo}/subscribers`,
          subscription_url: `https://api.github.com/repos/${owner}/${repo}/subscription`,
          svn_url: `https://github.com/${owner}/${repo}`,
          tags_url: `https://api.github.com/repos/${owner}/${repo}/tags`,
          teams_url: `https://api.github.com/repos/${owner}/${repo}/teams`,
          topics: [],
          trees_url: `https://api.github.com/repos/${owner}/${repo}/git/trees{/sha}`,
          updated_at: `2023-05-03T10:52:56Z`,
          url: `https://api.github.com/repos/${owner}/${repo}`,
          use_squash_pr_title_as_default: false,
          visibility: `public`,
          watchers: 0,
          watchers_count: 0,
          web_commit_signoff_required: false,
        },
        sha: `cf2577ee361e748e01c2d0d3efd3025624dc9c31`,
        user: {
          avatar_url: `https://avatars.githubusercontent.com/u/3647850?v=4`,
          events_url: `https://api.github.com/users/${owner}/events{/privacy}`,
          followers_url: `https://api.github.com/users/${owner}/followers`,
          following_url: `https://api.github.com/users/${owner}/following{/other_user}`,
          gists_url: `https://api.github.com/users/${owner}/gists{/gist_id}`,
          gravatar_id: ``,
          html_url: `https://github.com/${owner}`,
          id: 3647850,
          login: `${owner}`,
          node_id: `MDQ6VXNlcjM2NDc4NTA=`,
          organizations_url: `https://api.github.com/users/${owner}/orgs`,
          received_events_url: `https://api.github.com/users/${owner}/received_events`,
          repos_url: `https://api.github.com/users/${owner}/repos`,
          site_admin: false,
          starred_url: `https://api.github.com/users/${owner}/starred{/owner}{/repo}`,
          subscriptions_url: `https://api.github.com/users/${owner}/subscriptions`,
          type: `User`,
          url: `https://api.github.com/users/${owner}`,
        },
      },
      html_url: `https://github.com/${owner}/${repo}/pull/1`,
      id: 1336609988,
      issue_url: `https://api.github.com/repos/${owner}/${repo}/issues/1`,
      labels: [],
      locked: false,
      maintainer_can_modify: false,
      merge_commit_sha: ``,
      mergeable: ``,
      mergeable_state: `unknown`,
      merged: false,
      merged_at: ``,
      merged_by: ``,
      milestone: ``,
      node_id: `PR_kwDOJeSQUM5PqwzE`,
      number: 1,
      patch_url: `https://github.com/${owner}/${repo}/pull/1.patch`,
      rebaseable: ``,
      requested_reviewers: [],
      requested_teams: [],
      review_comment_url: `https://api.github.com/repos/${owner}/${repo}/pulls/comments{/number}`,
      review_comments: 0,
      review_comments_url: `https://api.github.com/repos/${owner}/${repo}/pulls/1/comments`,
      state: `open`,
      statuses_url: `https://api.github.com/repos/${owner}/${repo}/statuses/cf2577ee361e748e01c2d0d3efd3025624dc9c31`,
      title: `Update README.md`,
      updated_at: `2023-05-03T12:20:15Z`,
      url: `https://api.github.com/repos/${owner}/${repo}/pulls/1`,
      user: {
        avatar_url: `https://avatars.githubusercontent.com/u/3647850?v=4`,
        events_url: `https://api.github.com/users/${owner}/events{/privacy}`,
        followers_url: `https://api.github.com/users/${owner}/followers`,
        following_url: `https://api.github.com/users/${owner}/following{/other_user}`,
        gists_url: `https://api.github.com/users/${owner}/gists{/gist_id}`,
        gravatar_id: ``,
        html_url: `https://github.com/${owner}`,
        id: 3647850,
        login: `${owner}`,
        node_id: `MDQ6VXNlcjM2NDc4NTA=`,
        organizations_url: `https://api.github.com/users/${owner}/orgs`,
        received_events_url: `https://api.github.com/users/${owner}/received_events`,
        repos_url: `https://api.github.com/users/${owner}/repos`,
        site_admin: false,
        starred_url: `https://api.github.com/users/${owner}/starred{/owner}{/repo}`,
        subscriptions_url: `https://api.github.com/users/${owner}/subscriptions`,
        type: `User`,
        url: `https://api.github.com/users/${owner}`,
      },
    },
    repository: {
      allow_forking: true,
      archive_url: `https://api.github.com/repos/${owner}/${repo}/{archive_format}{/ref}`,
      archived: false,
      assignees_url: `https://api.github.com/repos/${owner}/${repo}/assignees{/user}`,
      blobs_url: `https://api.github.com/repos/${owner}/${repo}/git/blobs{/sha}`,
      branches_url: `https://api.github.com/repos/${owner}/${repo}/branches{/branch}`,
      clone_url: `https://github.com/${owner}/${repo}.git`,
      collaborators_url: `https://api.github.com/repos/${owner}/${repo}/collaborators{/collaborator}`,
      comments_url: `https://api.github.com/repos/${owner}/${repo}/comments{/number}`,
      commits_url: `https://api.github.com/repos/${owner}/${repo}/commits{/sha}`,
      compare_url: `https://api.github.com/repos/${owner}/${repo}/compare/{base}...{head}`,
      contents_url: `https://api.github.com/repos/${owner}/${repo}/contents/{+path}`,
      contributors_url: `https://api.github.com/repos/${owner}/${repo}/contributors`,
      created_at: `2023-05-03T10:52:56Z`,
      default_branch: `main`,
      deployments_url: `https://api.github.com/repos/${owner}/${repo}/deployments`,
      description: ``,
      disabled: false,
      downloads_url: `https://api.github.com/repos/${owner}/${repo}/downloads`,
      events_url: `https://api.github.com/repos/${owner}/${repo}/events`,
      fork: false,
      forks: 0,
      forks_count: 0,
      forks_url: `https://api.github.com/repos/${owner}/${repo}/forks`,
      full_name: `${owner}/${repo}`,
      git_commits_url: `https://api.github.com/repos/${owner}/${repo}/git/commits{/sha}`,
      git_refs_url: `https://api.github.com/repos/${owner}/${repo}/git/refs{/sha}`,
      git_tags_url: `https://api.github.com/repos/${owner}/${repo}/git/tags{/sha}`,
      git_url: `git://github.com/${owner}/${repo}.git`,
      has_discussions: false,
      has_downloads: true,
      has_issues: true,
      has_pages: false,
      has_projects: true,
      has_wiki: true,
      homepage: ``,
      hooks_url: `https://api.github.com/repos/${owner}/${repo}/hooks`,
      html_url: `https://github.com/${owner}/${repo}`,
      id: 635736144,
      is_template: false,
      issue_comment_url: `https://api.github.com/repos/${owner}/${repo}/issues/comments{/number}`,
      issue_events_url: `https://api.github.com/repos/${owner}/${repo}/issues/events{/number}`,
      issues_url: `https://api.github.com/repos/${owner}/${repo}/issues{/number}`,
      keys_url: `https://api.github.com/repos/${owner}/${repo}/keys{/key_id}`,
      labels_url: `https://api.github.com/repos/${owner}/${repo}/labels{/name}`,
      language: ``,
      languages_url: `https://api.github.com/repos/${owner}/${repo}/languages`,
      license: ``,
      merges_url: `https://api.github.com/repos/${owner}/${repo}/merges`,
      milestones_url: `https://api.github.com/repos/${owner}/${repo}/milestones{/number}`,
      mirror_url: ``,
      name: `${repo}`,
      node_id: `R_kgDOJeSQUA`,
      notifications_url: `https://api.github.com/repos/${owner}/${repo}/notifications?since`,
      open_issues: 1,
      open_issues_count: 1,
      owner: {
        avatar_url: `https://avatars.githubusercontent.com/u/3647850?v=4`,
        events_url: `https://api.github.com/users/${owner}/events{/privacy}`,
        followers_url: `https://api.github.com/users/${owner}/followers`,
        following_url: `https://api.github.com/users/${owner}/following{/other_user}`,
        gists_url: `https://api.github.com/users/${owner}/gists{/gist_id}`,
        gravatar_id: ``,
        html_url: `https://github.com/${owner}`,
        id: 3647850,
        login: `${owner}`,
        node_id: `MDQ6VXNlcjM2NDc4NTA=`,
        organizations_url: `https://api.github.com/users/${owner}/orgs`,
        received_events_url: `https://api.github.com/users/${owner}/received_events`,
        repos_url: `https://api.github.com/users/${owner}/repos`,
        site_admin: false,
        starred_url: `https://api.github.com/users/${owner}/starred{/owner}{/repo}`,
        subscriptions_url: `https://api.github.com/users/${owner}/subscriptions`,
        type: `User`,
        url: `https://api.github.com/users/${owner}`,
      },
      private: false,
      pulls_url: `https://api.github.com/repos/${owner}/${repo}/pulls{/number}`,
      pushed_at: `2023-05-03T12:20:15Z`,
      releases_url: `https://api.github.com/repos/${owner}/${repo}/releases{/id}`,
      size: 1,
      ssh_url: `git@github.com:${owner}/${repo}.git`,
      stargazers_count: 0,
      stargazers_url: `https://api.github.com/repos/${owner}/${repo}/stargazers`,
      statuses_url: `https://api.github.com/repos/${owner}/${repo}/statuses/{sha}`,
      subscribers_url: `https://api.github.com/repos/${owner}/${repo}/subscribers`,
      subscription_url: `https://api.github.com/repos/${owner}/${repo}/subscription`,
      svn_url: `https://github.com/${owner}/${repo}`,
      tags_url: `https://api.github.com/repos/${owner}/${repo}/tags`,
      teams_url: `https://api.github.com/repos/${owner}/${repo}/teams`,
      topics: [],
      trees_url: `https://api.github.com/repos/${owner}/${repo}/git/trees{/sha}`,
      updated_at: `2023-05-03T10:52:56Z`,
      url: `https://api.github.com/repos/${owner}/${repo}`,
      visibility: `public`,
      watchers: 0,
      watchers_count: 0,
      web_commit_signoff_required: false,
    },
    sender: {
      avatar_url: `https://avatars.githubusercontent.com/u/3647850?v=4`,
      events_url: `https://api.github.com/users/${owner}/events{/privacy}`,
      followers_url: `https://api.github.com/users/${owner}/followers`,
      following_url: `https://api.github.com/users/${owner}/following{/other_user}`,
      gists_url: `https://api.github.com/users/${owner}/gists{/gist_id}`,
      gravatar_id: ``,
      html_url: `https://github.com/${owner}`,
      id: 3647850,
      login: `${owner}`,
      node_id: `MDQ6VXNlcjM2NDc4NTA=`,
      organizations_url: `https://api.github.com/users/${owner}/orgs`,
      received_events_url: `https://api.github.com/users/${owner}/received_events`,
      repos_url: `https://api.github.com/users/${owner}/repos`,
      site_admin: false,
      starred_url: `https://api.github.com/users/${owner}/starred{/owner}{/repo}`,
      subscriptions_url: `https://api.github.com/users/${owner}/subscriptions`,
      type: `User`,
      url: `https://api.github.com/users/${owner}`,
    },
  };
  return {
    event,
    eventName: 'pull_request',
  };
}
