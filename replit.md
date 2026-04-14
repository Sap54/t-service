# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Т-СЕРВИС Landing Page (`artifacts/t-service`)
- **Type**: React + Vite (frontend-only, no backend)
- **Preview path**: `/`
- **Description**: Russian-language landing page for Т-СЕРВИС, a Siberian automatic gates/doors repair company
- **Features**: Hero, advantages, services grid, brands, geography, social proof, contact form
- **Contacts**: +7(913)917-87-34, +7(913)000-18-23, +7(913)000-18-27, Telegram @TechFixCrew
- **Stack**: React, Vite, Tailwind CSS, framer-motion, lucide-react, react-icons
- **SEO**: Russian meta tags, H1/H2 per spec
