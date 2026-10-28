---
id: generate-tests
title: Generate Unit & Integration Tests
version: 0.0.1
category: task
tags:
  - testing
  - unit
  - integration
description: >
  Generate well-structured and relevant unit or integration tests for the given code using preferred test libraries.
---

# Prompt

Generate comprehensive unit and/or integration tests for the following code.

Guidelines:

- Use **Vitest** or **Jest** with **React Testing Library** for React components and hooks; use **Playwright** (or similar) for E2E when needed.
- Cover edge cases, expected behavior, and failure modes.
- Include appropriate mocks/stubs where necessary (e.g. `next/navigation`, fetch).
- Include **accessibility testing** where relevant (e.g. `@axe-core/react`, `jest-axe`, or Playwright a11y checks).
- Follow naming and structuring conventions of the company (e.g. `*.test.tsx`, `*.spec.ts`).

Include both the test file and a brief explanation of what’s being tested.

---

# Usage Notes

- Input = function, component, hook, or API logic
- Stack with `feature/react`, `feature/typescript`; add `feature/nextjs` for Next.js code.
