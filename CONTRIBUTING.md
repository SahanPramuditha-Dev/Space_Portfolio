# Contributing

Thanks for your interest in improving this portfolio project.

## Development Setup

1. Fork and clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create local env file:
   ```bash
   cp .env.example .env
   ```
   PowerShell:
   ```powershell
   Copy-Item .env.example .env
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## Branch and Commit Guidelines

- Create a focused branch for each change.
- Keep pull requests small and reviewable.
- Use clear commit messages that describe user impact.

## Code Quality

Before opening a pull request, run:

```bash
npm run lint
npm run build
```

## Pull Request Checklist

- Update documentation when behavior or setup changes.
- Verify responsive behavior on desktop and mobile.
- Test accessibility-critical interactions (keyboard nav, focus states).
- Include screenshots or short recordings for UI changes.
- Link related issues in the pull request description.

## Reporting Bugs

- Use the GitHub Bug Report issue template.
- Include repro steps, expected behavior, and actual behavior.
- Add browser and OS information for frontend issues.

## Feature Requests

- Use the GitHub Feature Request issue template.
- Explain the problem first, then propose the solution.
