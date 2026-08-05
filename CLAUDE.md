
## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health

## Design System

Read `DESIGN.md` before making any visual or UI decision. Colors, type scale,
the surface ladder, spacing, motion budget, and imagery rules are defined there,
and the non-negotiable ones are enforced by guards in `tests/data.test.ts`.

Two rules that fail silently rather than loudly:

- Never compose a type-scale class (`text-title`, `text-lede`, …) through
  `cn()`. tailwind-merge drops it as a `text-*` conflict. See DESIGN.md §2.2.1.
- Never use fractional panel opacity (`bg-panel/40`). It renders at 1.03:1
  against paper. See DESIGN.md §3.1.

If you change a rule in DESIGN.md, change its guard in the same commit.
