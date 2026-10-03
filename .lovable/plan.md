# Rangoli Bites standalone cleanup

## Goal
Update the existing Rangoli Bites codebase in place so the public site and repository contain only Rangoli Bites branding, while preserving the menu, checkout fields, order flow, and payment/email behavior.

## Changes
- Replace the current eight-part rangoli artwork with one reusable, clean four-petal brand mark in the navigation, decorative story area, order confirmation, and favicon.
- Remove project metadata, branding, links, badges, comments, telemetry code, and telemetry imports tied to the current builder.
- Rewrite the README as standalone Rangoli Bites setup, development, build, and Cloudflare deployment documentation; keep `AGENTS.md` only if it contains a useful project rule after cleanup.
- Replace the custom Vite wrapper with direct TanStack Start, React, Tailwind CSS v4, path-alias, and Cloudflare-compatible Nitro configuration.
- Remove the custom package dependency and lockfile references, and add `wrangler.jsonc` for the generated Worker output.
- Keep all restaurant content and ordering behavior unchanged.

## Verification
- Search the maintained source, public assets, configuration, and documentation for remaining builder-specific references.
- Run the existing tests and verify the production build and responsive public ordering page.
- Confirm the favicon and four-petal mark render correctly.

## GitHub sync
- Use the authorized GitHub connection to update the existing `broyourtypeonly/rangoli-bites` repository on `main` without creating a repository.
- Read the current `main` state first, then write the cleaned project tree as one commit and report its resulting SHA.

## Technical note
The existing order server function remains unchanged. The Vite setup will use the official TanStack Start Vite plugin, React plugin, Tailwind plugin, TypeScript path plugin, and Nitro's Cloudflare preset rather than the removed custom wrapper.
