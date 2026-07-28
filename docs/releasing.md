# Releasing

Releases are published from GitHub Actions with npm provenance.

## Prerequisites

- Ensure the npm account `campino` owns the `@campino` scope and can publish
  public packages in it.
- Configure the GitHub environment `npm` with tag protection for `v*` and, when
  appropriate, a required reviewer.
- Configure npm trusted publishing for the `Release` workflow after the package
  exists on npm.
- Protect the GitHub `npm` environment and the `main` branch.
- Ensure CI passes on every supported Node.js version.

## First publish

Trusted publishing is configured from an existing package's settings, so the
first publish needs a temporary granular npm access token:

1. While signed in as `campino`, create a granular npm token that can publish
   public packages in the `@campino` scope and bypasses 2FA for automation.
2. Add it as the `NPM_TOKEN` secret on the GitHub `npm` environment.
3. Push the `v1.0.0` tag and approve the environment deployment. The workflow
   uses the token as a fallback while still generating provenance.
4. On npmjs.com, open `@campino/rule` → Settings → Trusted Publisher and use:
   - Organization or user: `hynek-systems`
   - Repository: `hynek-shop-rule`
   - Workflow filename: `release.yml`
   - Environment name: `npm`
   - Allowed action: `npm publish`
5. Delete the `NPM_TOKEN` environment secret and revoke the temporary token.
6. In the package's Publishing access settings, require 2FA and disallow tokens.

The npm CLI prefers the GitHub OIDC identity over `NODE_AUTH_TOKEN`, so later
releases use trusted publishing even before the temporary secret is removed.

## Release process

1. Update and review `CHANGELOG.md` for the intended version.
2. Run `npm publish --dry-run`. This executes formatting, lint, type checks, all
   tests, the build, and the isolated packed-package consumer test.
3. Run `vp run release -- --release <version>`. The installed `bumpp` updates
   manifests, creates the release commit and tag, and pushes both.
4. Verify the GitHub release workflow, generated release notes, and npm
   provenance statement.

The workflow rejects tags that do not exactly match the package version. Do not
reuse or move a published version tag. The checked-in changelog is curated;
GitHub release notes are generated automatically from merged changes.

For emergency manual recovery, run the same dry-run first and then
`npm publish --provenance --access public` from the tagged commit using an
authorized npm account.
