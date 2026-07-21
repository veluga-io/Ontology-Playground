# Veluga GitHub Pages Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the Korean-default application from `veluga-io/Ontology-Playground` and verify its GitHub Pages deployment.

**Architecture:** Keep the Microsoft repository as `upstream`, use the public Veluga organization fork as `origin`, and publish the verified feature through `main`. GitHub Actions builds with the repository-name base path and deploys the `build` artifact through the official Pages actions.

**Tech Stack:** Git, GitHub CLI, GitHub Actions, Node.js 22.22.1, Vite 8, GitHub Pages

## Global Constraints

- Preserve the public fork relationship to `microsoft/Ontology-Playground`.
- Never stage or delete the existing untracked `.tool-versions` file.
- Do not force-push or rewrite history.
- The deployment URL must be `https://veluga-io.github.io/Ontology-Playground/`.

---

### Task 1: Make the Pages workflow target Veluga

**Files:**
- Modify: `.github/workflows/deploy-ghpages.yml`

**Interfaces:**
- Consumes: the existing Vite `VITE_BASE_PATH` build contract.
- Produces: a Pages workflow that runs only for `veluga-io/Ontology-Playground` with Node.js 22.22.1.

- [ ] **Step 1: Confirm the current workflow guard and Node version**

```bash
rg -n "github.repository|node-version" .github/workflows/deploy-ghpages.yml
```

Expected: two `microsoft/Ontology-Playground` guards and `node-version: 20`.

- [ ] **Step 2: Update the workflow**

Change both job guards to:

```yaml
if: github.repository == 'veluga-io/Ontology-Playground'
```

Change the setup-node input to:

```yaml
node-version: 22.22.1
```

- [ ] **Step 3: Verify the workflow and application**

```bash
rg -n "veluga-io/Ontology-Playground|node-version: 22.22.1" .github/workflows/deploy-ghpages.yml
npm test
npm run build
git diff --check
```

Expected: two Veluga guards, Node.js 22.22.1, all tests pass, and both application builds finish successfully.

- [ ] **Step 4: Commit the workflow and plan**

```bash
git add .github/workflows/deploy-ghpages.yml docs/superpowers/plans/2026-07-21-veluga-pages-deployment.md docs/ko/docs/superpowers/plans/2026-07-21-veluga-pages-deployment.md
git commit -m "ci: deploy Veluga fork to GitHub Pages"
```

### Task 2: Create the organization fork and publish main

**Files:**
- No source files changed.

**Interfaces:**
- Consumes: the verified `feature/korean-default-ui` branch.
- Produces: `veluga-io/Ontology-Playground` with the Korean-default release on `main`.

- [ ] **Step 1: Create the public organization fork**

```bash
gh repo fork microsoft/Ontology-Playground --org veluga-io --clone=false
```

Expected: `https://github.com/veluga-io/Ontology-Playground` exists as a public fork.

- [ ] **Step 2: Separate upstream and publish remotes**

```bash
git remote rename origin upstream
git remote add origin https://github.com/veluga-io/Ontology-Playground.git
git remote -v
```

Expected: `origin` points to Veluga and `upstream` points to Microsoft.

- [ ] **Step 3: Merge the feature into main**

```bash
git switch main
git merge --no-ff feature/korean-default-ui -m "feat: add Korean default experience"
```

Expected: merge completes without conflicts and `.tool-versions` remains untracked.

- [ ] **Step 4: Verify the merged result and push**

```bash
npm test
npm run build
git status --short
git push -u origin main
```

Expected: tests and build pass, only `.tool-versions` is untracked, and `main` tracks `origin/main`.

### Task 3: Enable and verify GitHub Pages

**Files:**
- No source files changed.

**Interfaces:**
- Consumes: the pushed `main` branch and its Pages workflow.
- Produces: a healthy public Pages deployment.

- [ ] **Step 1: Configure GitHub Actions as the Pages source**

```bash
gh api --method POST repos/veluga-io/Ontology-Playground/pages -f build_type=workflow
```

Expected: Pages reports `build_type: workflow`; an already-enabled response is acceptable after confirming the current setting.

- [ ] **Step 2: Wait for the Pages workflow**

```bash
gh run list --repo veluga-io/Ontology-Playground --workflow deploy-ghpages.yml --limit 1
gh run watch --repo veluga-io/Ontology-Playground --exit-status
```

Expected: build and deploy jobs finish with `success`.

- [ ] **Step 3: Verify repository and deployment state**

```bash
gh api repos/veluga-io/Ontology-Playground/pages
curl --fail --location https://veluga-io.github.io/Ontology-Playground/
```

Expected: Pages returns the expected URL and the deployed HTML loads successfully.
