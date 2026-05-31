# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Playwright E2E test suite (TypeScript) written as part of a 10-week bootcamp. Tests run against the public demo app **https://www.saucedemo.com** (Swag Labs) — there is no application source code in this repo, only the tests. The standard test account is `standard_user` / `secret_sauce`.

## Commands

There are no npm scripts; invoke Playwright directly via `npx`.

```bash
npx playwright install        # one-time: install browsers
npx playwright test           # run all tests (headless, chromium)
npx playwright test tests/login.spec.ts          # run one file
npx playwright test -g "TC01"                     # run tests matching title
npx playwright test --headed                      # run with a visible browser
npx playwright test --ui                          # interactive UI mode
npx playwright show-report    # open the HTML report after a run
```

## Architecture & conventions

- **`playwright.config.ts`** — `testDir: ./tests`, chromium only (other browsers/mobile/`webServer`/`baseURL` are commented out and available to enable). `fullyParallel: true`. CI-specific behavior is gated on `process.env.CI` (retries, single worker, `forbidOnly`). There is no `baseURL`, so every test calls `page.goto('https://www.saucedemo.com')` with the full URL.
- **Test naming** — tests use a `TCnn — <description>` title convention (e.g. `TC01 — Login successfully with valid credentials`). Keep new tests in this format.
- **Locator style** — tests use raw `page.locator(...)` with CSS / `[data-test='...']` selectors and inline `expect` assertions. There is currently **no Page Object Model** and no shared helpers/fixtures; each test is self-contained including its own login steps.
- **CI** — `.github/workflows/playwright.yml` runs the full suite on push/PR to `main`/`master` and uploads `playwright-report/` as an artifact.

## Notes

- `test-results/` and `playwright-report/` are gitignored build output — do not commit them.
- Commit messages in this repo follow a bootcamp cadence (e.g. `feat: TC04 add product to cart - day 1`).
