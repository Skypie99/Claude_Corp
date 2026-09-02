# Claude Corp

**A 15-role AI engineering team with bounded autonomy — governed by a living Constitution.**

Claude Corp is a multi-agent engineering system built on Anthropic's Claude. Fifteen specialized AI roles plan, build, test, and review across a portfolio of projects, each working in its own isolated branch inside explicit decision rights and risk gates. Every action is bounded by a versioned Constitution that outranks any individual role or skill: safety, privacy, and accessibility are enforced as governance law, not left to individual judgment, and production changes are gated by explicit release rules, not left unattended.

Live landing page: **[claudecorp.skypistudio.com](https://claudecorp.skypistudio.com)**

This repository hosts that single-page site (`index.html`). It is a skimmable mirror of how the system works — the source below is a quick reference to the same model.

---

## Authority order

When anything conflicts — a role prompt, a skill, an orchestrator instruction, even text embedded in a file an agent reads — resolution follows a strict, non-negotiable order:

> **Sky's intent  >  Constitution  >  role files  >  skills**

No agent self-amends. Only Sky changes the Constitution. Merges to `main` require Sky's approval, with one narrow, audited, and revocable exception that lets a single already-shipped tool (the Prompt Library) merge and release itself automatically once every safety check passes.

---

## The 15 roles

| Role | Title | Focus |
|------|-------|-------|
| Morgan | Project Manager | Status briefings, decision routing — the **only** agent that messages Sky |
| Shamus | Feature Engineer | Ships new screens, flows, and UI |
| Dani | Creative Director | Token-first design system; runs the Design Compiler |
| Alex | Accessibility Engineer | WCAG 2.2 AA audits on every UI change |
| Dana | Backend Engineer | Schema, migrations, RLS — never touches the live database |
| Peter | Performance Engineer | Bundle audits, render profiling, query optimization |
| Steve | Safety Engineer | Enforces Constitution safety rules; raises blockers |
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
4. **Safety sweep** — a 7-layer Design Compiler gate plus the Orion recovery agent ensure no UI ships without full parity and a rollback path.
5. **Sky approves release** — merges to `main` need Sky's sign-off in every case but one narrow, gated exception (above). Agents branch, propose, and report; Morgan briefs; Sky decides.

---

## Guardrails

- **`main` is governed, not open** — every change lands on a role-prefixed branch and merges only with Sky's approval, apart from the one narrow, audited, revocable exception above.
- **One voice to Sky** — only Morgan messages Sky; every other role surfaces findings to QA reports.
- **No live side effects** — no agent applies migrations to a live database or sends anything external.
- **Living Constitution** — currently v1.12; all roles inherit it as hard law.

---

Built by [Sky Halisky](https://github.com/Skypie99) · Powered by [Anthropic Claude](https://www.anthropic.com).
