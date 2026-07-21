# Veluga GitHub Pages Deployment Design

## Goal

Publish the Korean-default Ontology Playground from a public `veluga-io/Ontology-Playground` organization fork and deploy its `main` branch through GitHub Pages.

## Repository model

Create a public organization fork rather than an unrelated repository. This preserves the upstream relationship to `microsoft/Ontology-Playground`, its commit history, and the MIT license attribution. Keep the Microsoft repository as the local `upstream` remote and use the Veluga fork as `origin`.

## Branch and release flow

The completed `feature/korean-default-ui` branch is merged locally into `main` with a merge commit. The updated `main` is then pushed to the Veluga fork. The pre-existing untracked `.tool-versions` file remains local and is never staged.

## Pages workflow

Update `.github/workflows/deploy-ghpages.yml` so both jobs target `veluga-io/Ontology-Playground` instead of the Microsoft repository. Use Node.js `22.22.1`, matching the locally verified runtime. Retain the repository-name-derived `VITE_BASE_PATH`, SPA `404.html` fallback, Pages artifact upload, and `actions/deploy-pages` release job.

## Verification

Before publishing, run the full test suite and production build. After pushing, configure the repository Pages source for GitHub Actions, wait for the Pages workflow to finish, and verify the deployed URL `https://veluga-io.github.io/Ontology-Playground/` returns the Korean-default application without failed assets.

## Rollback

If deployment fails, keep the organization fork and inspect the failed Actions job. Do not rewrite history or force-push. Fix the workflow on a new branch or revert the deployment-specific commit on `main`.
