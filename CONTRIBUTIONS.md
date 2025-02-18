# Contributions

Contributions are welcome and greatly appreciated! Whether you're fixing a bug, adding a feature, or improving documentation, your efforts help make **Fanos** better for everyone. Please follow these guidelines to ensure consistency and quality across the project.

## Table of contents
1. [Install Development Dependencies](#1-install-development-dependencies)
2. [Submit Issues or Feature Requests](#2-submit-issues-or-feature-requests)
3. [Fork and Create a Pull Request](#3-fork-and-create-a-pull-request)
4. [Coding Standards](#4-coding-standards)
5. [Linting](#5-linting)
6. [Formatting](#6-formatting)
7. [Example for New Features or Bug Fixes](#7-example-for-new-features-or-bug-fixes)
8. [Build](#8-build)
9. [Submit Pull Request](#9-submit-pull-request)
10. [Commit Messages](#10-commit-messages)
11. [Documentation](#11-documentation)

## 1. Install Development Dependencies
Before starting, make sure to install the necessary development dependencies:

```bash
npm install
```
This will install all the required dependencies listed in the `package.json`, including ESLint, Prettier, and Rollup.

## 2. Submit Issues or Feature Requests
   - For **bug reports** or **feature requests**, please create an issue on the repository.
   - Provide as much detail as possible to help us understand the issue or feature request.

## 3. Fork and Create a Pull Request
- **Fork** the repository and create a **pull request (PR)** with your changes.
- Ensure that your PR is **up-to-date** with the latest version of the `main` branch to avoid conflicts.
- For a step-by-step guide on creating PRs, refer to [GitHub's documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

## 4. Coding Standards
- Your code should adhere to the project's coding standards.
- Run **linting** and **formatting** checks to ensure your code is clean and consistent.

## 5. Linting
   - The project uses **ESLint** to enforce code quality and consistency. Before submitting your PR, ensure that:
   - **Run ESLint**: Lint your code with `eslint src`
        ```bash
        npm run lint
        ```
- **Fix Issues**: You can automatically fix most linting issues using the `--fix` flag.
    ```bash
    npm run lint:fix
    ```
  
## 6. Formatting 

The project uses **Prettier** to maintain consistent code formatting. To format your code before submitting a PR:
- **Format your code** with Prettier:
    ```bash
    npm run format  
  ```

## 7. Example for New Features or Bug Fixes
- If you're adding a new feature or fixing a bug, please include relevant examples or tests (if applicable) that demonstrate the fix or feature in action.
- Ensure that your changes are covered by unit tests or integration tests.
- If you're unsure how to write tests, feel free to ask for help in your PR!

## 8. Build
- If your changes include updates to the build process, ensure that you test it using **Rollup**:
  ```bash
  npm run build
  ```

## 9. Submit Pull Request

Once your changes are complete, **submit your pull request**. Be sure to provide a clear description of what your changes do and any additional context.


## 10. Commit Messages
- Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

### Example

- `feat(core)`: add support for JSON payload type
- `fix(api)`: resolve issue with failed request retries
- `docs(readme)`: update installation instructions

### Types:
- `feat`: A new feature.
- `fix`: A bug fix.
- `docs`: Documentation changes.
- `style`: Code style changes.
- `refactor`: Code refactoring (no functional changes).
- `test`: Adding or updating tests.
- `chore`: Maintenance tasks (dependency updates).

## 11. Documentation
- Update the relevant documentation when adding new features or making changes.
- Use clear and concise language.
- Include examples where applicable.
- Follow the Markdown formatting guidelines.

By following these steps, you can ensure that your contributions are aligned with the project's standards and easy to integrate. Feel free to submit any issues or pull requests to improve the project!

