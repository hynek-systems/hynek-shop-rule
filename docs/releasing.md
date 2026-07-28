# Releasing

Releases are published from GitHub Actions with npm provenance.

## Prerequisites

- Configure npm trusted publishing for the `Release` workflow in this repository.
- Protect the GitHub `npm` environment and the `main` branch.
- Ensure CI passes on every supported Node.js version.

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
