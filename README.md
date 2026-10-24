# Claude Corp

**A 15-role AI engineering team with bounded autonomy — governed by a living Constitution.**

Claude Corp is a multi-agent engineering system built on Anthropic's Claude. Fifteen specialized AI roles plan, build, test, and review across a portfolio of projects, each working in its own isolated branch inside explicit decision rights and risk gates. The written Constitution sets safety, privacy, and accessibility policy above individual role and skill instructions. Review gates apply that policy; technical enforcement depends on each project's named platform controls and must be verified separately. Production changes require explicit authorization under the release policy.

Live landing page: **[claudecorp.skypistudio.com](https://claudecorp.skypistudio.com)**

This repository hosts that single-page site (`index.html`). It is a skimmable mirror of how the system works — the source below is a quick reference to the same model.

---

## Authority order

When anything conflicts — a role prompt, a skill, an orchestrator instruction, even text embedded in a file an agent reads — resolution follows a strict, non-negotiable order:

> **Sky's intent  >  Constitution  >  role files  >  skills**

No agent self-amends. Only Sky changes the Constitution. Written policy requires Sky's approval for merges to `main`. Any release exception needs separate, explicit authorization, a documented scope, and current verification of its controls. This public summary does not establish an active automated release exception.

---

## The 15 roles

| Role | Title | Focus |
|------|-------|-------|
| Morgan | Project Manager | Status briefings, decision routing — the **only** agent that messages Sky |
| Shamus | Feature Engineer | Ships new screens, flows, and UI |
| Dani | Creative Director | Token-first design system; runs the Design Compiler |
| Alex | Accessibility Engineer | Reviews every UI change against WCAG 2.2 AA |
| Dana | Backend Engineer | Schema, migrations, RLS — never touches the live database |
| Peter | Performance Engineer | Bundle audits, render profiling, query optimization |
| Steve | Safety Engineer | Applies the Constitution's safety rules in review; raises blockers |
| Gary | QA Engineer | Writes and runs the test suite; catches regressions |
| Rory | DevOps Engineer | CI/CD, EAS builds, release readiness |
| Quinn | Product Manager | Grooms the backlog, specs features by user value |
| Riley | User Researcher | Personas, journey maps, friction analysis |
| Jordan | Privacy Advisor | Privacy-by-design gate on location, auth, user data |
| Casey | Community Manager | Contributor docs, onboarding, growth |
| Will | Technical Writer | READMEs, setup guides, changelogs, learnings log |
| Orion | Recovery Agent | Recovery-only; steps in on blockers or inconsistent state |

---

## The 5-step pipeline

1. **Sky sets intent** — a directive or slash command. The authority order locks in.
2. **Orchestrator plans** — Morgan reads backlogs, open branches, and QA reports, then routes work to the right specialists in dependency order.
3. **Roles execute** — each agent works in isolation on a scoped, role-prefixed branch. Design, code, test, a11y, performance, and privacy checks run before merge.
4. **Safety sweep** — the 7-layer Design Compiler guides UI review; Orion supports recovery when a role hits a blocker. Review findings and a rollback path are checked before release.
5. **Sky approves release** — merges to `main` need Sky's sign-off; any exception requires separate, explicit authorization. Agents branch, propose, and report; Morgan briefs; Sky decides.

---

## Guardrails

- **`main` is governed, not open** — agents propose changes on role-prefixed branches. Written policy requires Sky's approval; any exception needs separate, explicit authorization.
- **One voice to Sky** — only Morgan messages Sky; every other role surfaces findings to QA reports.
- **Live side effects require authorization** — written policy prohibits live database changes and external sends without explicit authorization. A release exception is not general permission to act.
- **Living Constitution** — all roles inherit it as binding written policy. The full Constitution and role files are private; this repository presents a public summary, not a verified current version or enforcement record.

---

## The site

A static page deployed by GitHub Pages from `main` (`.github/workflows/deploy.yml`). There is no build step.

| Path | What |
|------|------|
| `index.html` | The page, including its inline Branch Atlas drawings |
| `404.html` | Not-found page; uses root-absolute asset paths because Pages serves it at any depth |
| `assets/site.css`, `assets/site.js` | Shared styles and the small progressive-enhancement script (theme, menu, reveal) |
| `assets/fonts/` | Self-hosted Cormorant Garamond, DM Sans and DM Mono subsets, under the SIL Open Font License 1.1 (licence texts alongside) |
| `og-image.png` | Social card, rendered from `tools/og-image.html` |
| `tools/atlas.mjs` | Regenerates the drawings in place: `node tools/atlas.mjs` |

The drawings are diagrams of the operating model, not captures of live activity. To preview locally, serve the repository root over HTTP, for example `python3 -m http.server 8000 --bind 127.0.0.1`, and open `http://127.0.0.1:8000/`.

---

Built by [Skyler Halisky](https://github.com/Skypie99) · Powered by [Anthropic Claude](https://www.anthropic.com).
