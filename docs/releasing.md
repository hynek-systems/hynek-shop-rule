# Releasing

Releases are published from GitHub Actions with npm provenance.

## Prerequisites

- Configure npm trusted publishing for the `Release` workflow in this repository.
- Protect the GitHub `npm` environment and the `main` branch.
- Ensure CI passes on every supported Node.js version.

## Release process

1. Update `CHANGELOG.md` and set the same version in `package.json` and
   `package-lock.json`.
2. Run `npm publish --dry-run`. This executes formatting, lint, type checks, all
   tests, the build, and the isolated packed-package consumer test.
3. Merge the release commit to `main`.
4. Create and push an annotated `v<version>` tag for that commit.
5. Verify the GitHub release workflow and npm provenance statement.

The workflow rejects tags that do not exactly match the package version. Do not
reuse or move a published version tag.

For emergency manual recovery, run the same dry-run first and then
`npm publish --provenance --access public` from the tagged commit using an
authorized npm account.
