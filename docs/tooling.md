# Tooling

This document will explain the reasoning behind our tooling and how to use it.

## ESLint + Prettier

Linting and auto-formatter to avoid bike-shedding

## Next.js/turbo

I personally hate Next.js but it's too late now. It's our full-stack React.js meta-framework that includes things such as routing and SSR. Turbo for speed!

## pnpm

pnpm is a fast JavaScript package manager ~~but [Bun](https://bun.sh) is faster.~~ It's faster than the native `npm` package manager, doesn't have [weird philosophies](https://yarnpkg.com/features/pnp), saves space, and supports monorepos pretty well (none of us actually use [Lerna](https://lerna.js.org) or [Nx](https://nx.dev)).

## tRPC

We need to use tRPC because we also have an Expo app (but also it's because Josh is used to tRPC and doesn't like how Supabase does things). It's great for a TypeScript-based RPC router

## Supabase

Awesome database with Auth. Remember to set up RLS properly (otherwise you may accidentally waste 3 hours of your time). See [here](https://supabase.com/docs/guides/auth/managing-user-data) on how to use Auth metadata. We will need to set up a trigger (which may be wiped from Supabase migrations when squashed). Note that which tables are set to [realtime](https://supabase.com/docs/guides/realtime) may also be wiped when the Supabase migrations get squashed.

### Local dev

Make sure you have [installed](https://supabase.com/docs/guides/cli/getting-started#installing-the-supabase-cli) the Supabase CLI.

When you've cloned the repo and checked out to your branch (following the [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow#create-a-branch)), be sure to run `pnpm install`, `supabase start`, and `supabase db reset`.
