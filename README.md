# Miti — The Nepali Calendar (Fork)

> This is a personal fork of [PoskOfficial/Miti](https://github.com/PoskOfficial/Miti) maintained by [@Paurakh4](https://github.com/Paurakh4). It tracks the upstream project while exploring UI refinements and experiments. The original app lives at [miti.bikram.io](https://miti.bikram.io).

A clean, minimal Nepali calendar that lives wherever you do — web, mobile, browser, and even Raycast — with first-class Google Calendar sync. Schedule by Bikram Sambat, view in Gregorian, and stop converting dates in your head.

![banner](apps/vite/public/banner.png)

## About this fork

This fork is for hands-on work and experimentation on top of the upstream project. Notable changes in this fork at the moment:

- A redesigned, keyboard-inspired UI for the web app: neutral palette, tactile keycap surfaces, prominent focus rings, mono-spaced metadata, and tighter spacing
- Lighter modal / sheet overlays with snappier open/close animations
- Extended BS year range so the calendar stays usable beyond 2082

If you're looking for the production app, use the upstream [PoskOfficial/Miti](https://github.com/PoskOfficial/Miti) and [miti.bikram.io](https://miti.bikram.io). PRs that make sense upstream will be sent there.

## Why Miti

Most Nepalis live by two calendars at once. You make a plan in BS ("Asadh 15"), but every reminder, invite, and meeting tool speaks Gregorian. Miti closes that gap. It doesn't try to replace your calendar — it lets you create and browse events in BS, then syncs them to Google Calendar so they show up in every other tool you already use.

The goal is simple: a small, fast, focused calendar that respects both systems.

## Features

- BS ↔ AD calendar with tithis, paksha, nakshatra, and Panchang details
- Holidays, festivals, and notable events for the month
- Google Calendar sync — create events in BS, see them everywhere
- Date converter between Bikram Sambat and Gregorian
- Works offline, installable as a PWA (under ~150 KB)
- Light and dark mode
- English and नेपाली
- Keyboard-first interface with consistent focus states

## Apps in this monorepo

| App | Path | Notes |
| --- | --- | --- |
| Web (PWA) | `apps/vite` | The main app at miti.bikram.io |
| API | `apps/api` | Cloudflare Workers + D1, OAuth, Google Calendar bridge |
| Mobile | `apps/expo` | iOS / Android via Expo |
| Browser extension | `apps/plasmo` | Chrome / Firefox via Plasmo |
| Raycast | `apps/raycast` | macOS Raycast extension |

Shared code lives in `packages/`:

- `packages/query` — React Query hooks shared across clients
- `packages/types` — shared TypeScript types
- `packages/eslint-config`, `packages/prettier-config`, `packages/tsconfig` — config presets

## Tech stack

- **Web:** React 18, Vite, TypeScript, TailwindCSS, Radix UI, React Query, react-router
- **API:** Hono on Cloudflare Workers, Drizzle ORM, D1, Oslo (OAuth + sessions)
- **Mobile:** Expo, React Native, Tamagui
- **Tooling:** Bun, Turborepo, Biome / Prettier
- **i18n:** i18next (English + Nepali)

## Getting started

Requirements: [Bun](https://bun.sh) (≥ 1.1) and Node 18+.

```bash
git clone https://github.com/Paurakh4/Miti.git
cd Miti
bun install
```

### Run the web app

```bash
bun run web
# Vite dev server at http://localhost:5173
```

### Run the API

Copy the example env first:

```bash
cp apps/api/.dev.vars.example apps/api/.dev.vars
bun run api
```

### Run mobile

```bash
bun run ios       # iOS simulator
bun run android   # Android emulator
bun run native    # Expo dev client
```

### Run the browser extension

```bash
bun run chrome
```

## Project scripts

From the repo root:

| Script | Description |
| --- | --- |
| `bun run web` | Start the Vite web app |
| `bun run api` | Start the Cloudflare Workers API locally |
| `bun run native` / `ios` / `android` | Start the Expo mobile app |
| `bun run chrome` | Start the browser extension dev build |
| `bun run build` | Build all apps via Turborepo |
| `bun run lint` | Lint all workspaces |
| `bun run format` | Format the repo |
| `bun run check-deps` | Verify dependency versions across workspaces |

## Repository layout

```
Miti/
├── apps/
│   ├── api/        Cloudflare Workers API (Hono + Drizzle + D1)
│   ├── expo/       Mobile app
│   ├── plasmo/     Browser extension
│   ├── raycast/    Raycast extension
│   └── vite/       Web app (PWA)
├── packages/
│   ├── query/      Shared React Query hooks
│   ├── types/      Shared TypeScript types
│   ├── eslint-config/
│   ├── prettier-config/
│   └── tsconfig/
├── turbo.json
└── package.json
```

## Privacy & Google API use

Miti uses Google OAuth strictly to authenticate you and to read/write your Google Calendar events on your behalf. It does not sell, share, or use your data for advertising or analytics targeting. Miti's use of information received from Google APIs adheres to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes), including the Limited Use requirements.

See the in-app [Privacy Policy](https://miti.bikram.io/privacy) and [Google API Disclosure](https://miti.bikram.io/google-api-disclosure) for details.

## Contributing

Issues and PRs against this fork are welcome for fork-specific changes. For changes that should land in the production app, please open them against the upstream repository at [github.com/PoskOfficial/Miti](https://github.com/PoskOfficial/Miti).

1. Fork (or branch from) this repo
2. `bun install` and run the relevant app
3. Keep changes focused and match the existing code style
4. Open a PR with a clear summary of what changed and why

## Maintainer of this fork

- [Paurakh](https://github.com/Paurakh4) — fork maintainer

## Credits (upstream)

Built and maintained upstream by [Bikram Parajuli](https://github.com/ParajuliBkrm) on behalf of the Miti team, with contributions from:

- [@nirajacharyaa](https://github.com/nirajacharyaa)
- [@headshigh](https://github.com/headshigh)
- [@poudelsanchit](https://github.com/poudelsanchit) — date converter
- [@nabinkdl](https://github.com/nabinkdl) — logo
- [@sareeka61](https://github.com/sareeka61)
- The [POSK team](https://github.com/PoskOfficial)

[![Contributors](https://contrib.rocks/image?repo=PoskOfficial/Miti)](https://github.com/PoskOfficial/Miti/graphs/contributors)

## Contact

- Upstream project: [github.com/PoskOfficial/Miti](https://github.com/PoskOfficial/Miti)
- Upstream email: [calendar@bikram.io](mailto:calendar@bikram.io)
- Upstream Discord: [dsc.gg/posk](https://dsc.gg/posk)
- This fork: [github.com/Paurakh4/Miti](https://github.com/Paurakh4/Miti)

## License

Open source, inherited from the upstream project. See the upstream repository for license details.
