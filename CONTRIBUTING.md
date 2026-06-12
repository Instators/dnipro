# Contributing to Dnipro

Thank you for your interest in contributing to the Dnipro protocol!

## Ways to Contribute

- **New adapters** — Implement the three-function interface for a new yield protocol
- **Bug fixes** — Fix issues in existing adapters, SDK, or CLI
- **Documentation** — Improve guides, API docs, or examples
- **Tests** — Expand integration test coverage
- **Web UI** — Improve the dashboard or add new pages

## Development Setup

```bash
# Clone the repo
git clone https://github.com/dnipro-finance/dnipro
cd dnipro

# Install dependencies
yarn install

# Build programs
anchor build

# Run tests
anchor test
```

## Adapter Contributions

The fastest path is:

```bash
# Generate scaffold
dnipro generate your-protocol

# Implement the interface in programs/adapters/your-protocol/src/lib.rs
# Then submit a PR with:
#   - Program code
#   - Tests in tests/integration/
#   - Registration metadata
```

## Code Style

- Rust: follow `rustfmt` defaults (`cargo fmt`)
- TypeScript: follow ESLint config (`yarn lint`)
- Commit messages: `type(scope): description` (e.g. `feat(adapter): add solend adapter`)

## Pull Request Process

1. Fork → branch → implement → test
2. Ensure `anchor test` passes
3. Open a PR with a clear description
4. One approval from a maintainer required to merge

## Security Issues

Please report security vulnerabilities privately to security@dnipro.finance — do not open public issues for security bugs.
