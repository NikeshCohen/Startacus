# GitHub Configurations

This directory contains GitHub-specific configurations for the repository.

## Workflows

The `.github/workflows` directory contains GitHub Actions workflows that automate various processes:

### `ci.yml`

- **Purpose**: Performs continuous integration tests for the codebase
- **Trigger**: Runs on push to main branch and on pull requests to main branch
- **Actions**:
  - Linting with ESLint
  - Type checking with TypeScript
  - Running tests

### `security-analysis.yml`

- **Purpose**: Performs security analysis using GitHub's CodeQL
- **Trigger**: Runs on push to main, on pull requests to main, and on a weekly schedule (Mondays at 8:00 AM UTC)
- **Actions**:
  - Scans JavaScript and TypeScript code for security vulnerabilities

### `vercel-checks.yml`

- **Purpose**: Ensures optimal configuration for Vercel deployment
- **Trigger**: Runs on push to main and on pull requests to main
- **Actions**:
  - Checks for React Server Components usage
  - Checks for Async Request APIs
  - Checks for Enhanced Forms implementation

### `check-up-to-date.yml`

- **Purpose**: Ensures pull requests are up-to-date with the main branch
- **Trigger**: Runs when a pull request is opened, reopened, or synchronized
- **Actions**:
  - Verifies the PR branch contains the latest changes from main
  - Posts a comment on PR if the branch is behind main

## Renovate Configuration

The `renovate.json` file configures the Renovate Bot, which:

- Automatically creates PRs to update dependencies
- Uses the default configuration from the Renovate preset
- Updates internal dependencies
- Uses "bump" strategy for version ranges
- Enables auto-merging for dependency updates
- Targets both standard and template package.json files

## Usage

These GitHub configurations are automatically applied when code is pushed to the repository. You don't need to manually trigger them.

To customize these workflows:

1. Edit the relevant YAML file in the `.github/workflows` directory
2. Commit and push your changes
3. The updated workflow will be applied on the next trigger event

For Renovate Bot configuration, edit the `.github/renovate.json` file to customize dependency update behavior.
