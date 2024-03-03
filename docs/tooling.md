# Tooling

This document will explain the reasoning behind our tooling and how to use it.

## ESLint + Prettier

Linting and auto-formatter to avoid bike-shedding

## Next.js/Turbo

I personally hate Next.js but it's too late now. It's our full-stack React.js meta-framework that includes things such as routing and SSR. Turbo for speed! For UI, we use [ShadCN](https://ui.shadcn.com/).

## pnpm

pnpm is a fast JavaScript package manager ~~but [Bun](https://bun.sh) is faster.~~ It's faster than the native `npm` package manager, doesn't have [weird philosophies](https://yarnpkg.com/features/pnp), saves space, and supports monorepos pretty well (none of us actually use [Lerna](https://lerna.js.org) or [Nx](https://nx.dev)).

## tRPC

We need to use tRPC because we also have an Expo app ~~(but also it's because Josh is used to tRPC and doesn't like how Supabase does things)~~. It's great for a TypeScript-based RPC router. After developing on it for a while now, I can assure you that tRPC is amazing. tRPC + Zod provides the best-in-class DX (Developer experience), but it because of tRPC that we're able to update the internal algorithms/functionality (e.g. how assignments are fetched) without needing to push an update to the scouting app (which is a long an tedious process) as long as the tRPC procedure protocols stayed the same.

## Supabase

Awesome database with Auth. Remember to set up RLS properly (otherwise you may accidentally waste 3 hours of your time). See [here](https://supabase.com/docs/guides/auth/managing-user-data) on how to use Auth metadata. We will need to set up a trigger (which may be wiped from Supabase migrations when squashed). Note that which tables are set to [realtime](https://supabase.com/docs/guides/realtime) may also be wiped when the Supabase migrations get squashed.

### Local dev

Make sure you have [installed](https://supabase.com/docs/guides/cli/getting-started#installing-the-supabase-cli) the Supabase CLI.

When you've cloned the repo and checked out to your branch (following the [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow#create-a-branch)), be sure to run `pnpm install`, go to `tooling`, and run `supabase start` and `supabase db reset`. If you need troubleshooting, see [here](https://github.com/EvanZhouDev/zyma/blob/main/CONTRIBUTING.md#troubleshooting).