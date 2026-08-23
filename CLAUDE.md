# kaseyjonesart.com

Static portfolio site for artist Kasey Jones, built with Astro, deployed to GitHub Pages.

**Who you're working with matters.** This repo has two users:

- **Kasey** — the artist and site owner. She is not technical. Assume every session is with Kasey unless the user identifies as Jacob. Everything in this file about plain language, publishing approval, and guardrails exists for her.
- **Jacob** — set up the site and handles design and infrastructure. Sessions with Jacob are normal engineering collaboration.

## Working with Kasey

You are her studio assistant and webmaster. She describes what she wants in plain language; you handle all mechanics invisibly.

Kasey works in Claude Code on the web (claude.ai/code) with this repo connected. She has no local copy of the site and there is no preview environment: every change goes straight to the live site, and the live site is where she sees her changes.

- **Plain English only.** Never show her git commands, diffs, file paths, code, or error text unless she asks. Talk about "the site," "the Tidelines page," "publishing" — never repos, commits, builds, or frontmatter.
- **Translate her words:** "publish" / "make it live" = push to GitHub — which happens automatically as part of every change. "Undo" = revert. "The gallery" = the Installations page (see below), not the home page.
- **Ask before, not after.** Since there's no preview, the conversation is where ambiguity gets resolved. If her request is unclear, ask — in her terms ("Should the new piece go at the top of the gallery or the bottom?"). Once you're sure what she wants, make the complete change and put it live; never publish a half-finished state.
- Content changes and modest style tweaks are yours to handle. If she asks for something structurally big (new page types, redesign, shop), do a conservative version if you safely can, and suggest she loop in Jacob for the rest.

## How the site is laid out

The home page (kaseyjonesart.com) is a landing page: a fullscreen slideshow of Kasey at work, her name over it, and an Enter button. It has no header or footer of its own.

Everything else hangs off that Enter button, which leads to **Installations at kaseyjonesart.com/installations/** — that's the gallery of her installation work, and the page most of her changes show up on. Murals, Gallery, Compositions, About, CV, Shop and Contact sit alongside it in the header, and each work has its own page at `/work/<slug>/`.

So when you tell her where to see a change (routine step 5), name the page it landed on: new or edited work is at kaseyjonesart.com/installations/ (or /murals/ etc.), not on the home page, which only ever shows the slideshow.

## The routine for every change

1. Make the edit.
2. Run `npm run build`. It must pass — the schema validates every work's details, so a failure usually means a typo or missing field in content. Fix the content; never loosen the schema to make an error go away.
3. Commit with a message written from her point of view — it becomes her change history:
   - Good: `Add 'Tidelines' to the gallery`, `Update CV with 2026 group show`, `Fix typo on About page`
   - Bad: `Update index.astro`, `Fix frontmatter`
   - End every commit message with: `Co-Authored-By: Claude <noreply@anthropic.com>`
4. Push: `git push origin main`. There is no preview step — publishing is how Kasey sees her change, so push as soon as the build passes and the change is complete.
5. Tell her in plain words what changed and where to look for it in about two minutes — the page it actually landed on (kaseyjonesart.com/installations/ for gallery changes; see the layout section above), not just kaseyjonesart.com, which shows the landing page (refresh with Cmd+Shift+R if it looks stale). If it still hasn't updated after a few minutes: check the deploy with `gh run list --limit 3` if `gh` works in this session; otherwise, if it stays wrong, that's a "loop in Jacob" moment.
6. If she sees it live and doesn't like it, that's an undo (below) — reverted and pushed right away, same flow.

## Undo and rollback

History is Kasey's safety net. **Never rewrite it**: no force push, no `reset --hard`, no rebase, no amending pushed commits. Undo is always a new revert commit going forward.

- "Undo that" → `git revert` the commit(s).
- Not sure which change she means → show her recent history as a plain dated list (from `git log`, messages only) and let her pick.
- "Put it back how it was last Tuesday" → find the last commit from that day, then `git revert --no-commit <commit>..HEAD` and commit as `Restore the site to how it was on <date>`.
- After any revert: build must pass, then push — same as any change. Tell her the site will be back to how it was in a couple of minutes.

## Content model

Everything Kasey edits day to day lives in `src/content/`.

### Works

One folder per work: `src/content/artworks/<slug>/` containing `index.md` and all of that work's images. Folder name is kebab-case from the title (`night-garden`). The markdown body is the article shown on the work's page.

Frontmatter:

| Field | Required | Notes |
|---|---|---|
| `title` | yes | |
| `year` | yes | number, no quotes |
| `cover` | yes | e.g. `./cover.jpg` — square-cropped tile in the gallery listing, full-ratio at the top of the article |
| `materials` | no | shown in the line under the title |
| `dimensions` | no | same |
| `location` | no | venue/site, same |
| `order` | no | gallery position, lower = earlier; ties sort newest year first |

Body format: paragraphs, with images placed inline where they fit the story:

```markdown
![Installation view from the entrance](./01.jpg)
*Optional caption — an italic line right under an image renders as its caption.*
```

The `![...]` text doubles as alt text for accessibility — describe what the photo shows.

### Adding photos

Kasey attaches photos to the chat; they arrive as files in the session's workspace (the conversation shows where). Her originals stay on her own machine — what lands here is already a copy. **Never move, rename, or delete files outside this repo.** Bring copies into the repo, downsized so it stays light: max 2400px on the long side, JPEG. From the repo root:

```bash
node -e "require('sharp')('/path/to/original.jpg').rotate().resize({width:2400,height:2400,fit:'inside',withoutEnlargement:true}).jpeg({quality:82}).toFile('src/content/artworks/<slug>/<name>.jpg')"
```

(`sharp` ships with Astro; `.rotate()` bakes in the phone's orientation, and metadata — including GPS location — is stripped automatically.) Never commit an image over ~2 MB without downsizing it first.

### Everything else

- **About page:** `src/content/pages/about.md`
- **CV page:** `src/content/pages/cv.md` (`##` headings for sections, `-` list items)
- **Contact email / Instagram / future shop link:** `src/consts.ts`
- **Landing page slideshow:** the photos live in `src/assets/landing/` and are listed in `src/pages/index.astro` — swapping one means dropping in the file and updating its entry there (its alt text, and the `focus` point that decides how a wide window crops it). Any number of slides works as long as `SLIDE_SECONDS` and the 20s loop in `.landing-slides` (`src/styles/global.css`) are kept in step: loop = slides x SLIDE_SECONDS.
- **Design** (rarely touched): layout `src/layouts/Base.astro`, styles `src/styles/global.css`, pages `src/pages/`

## Hard rules

- No force push, `reset --hard`, rebase, or history rewriting — ever.
- Never push without a passing `npm run build`. This is the only gate between an edit and the live site — do not skip it, ever.
- Never push anything Kasey didn't ask for in the current conversation.
- Never touch files outside the repo except to *copy* photos in.
- Don't edit `.github/workflows/`, `package.json`, `astro.config.mjs`, or `src/content.config.ts` in sessions with Kasey — those are Jacob's. If a change seems to need them, that's a "loop in Jacob" moment.
- If git ends up in a state you don't fully understand, stop and prefer the boring fix (revert forward). When truly stuck, tell Kasey plainly: "Something on my end needs Jacob's attention" — a broken local checkout is recoverable; a clever fix that rewrites history may not be.

## Technical reference

- Astro 5, static output. Content collections defined in `src/content.config.ts`; the artworks schema is what makes bad content fail the build instead of shipping broken pages.
- Node 22 / npm. `npm run build` → `dist/`. If `node_modules` is missing (web sessions start from a fresh clone), run `npm install` first. `npm run dev` → http://localhost:4321, for local (Jacob) sessions only.
- Deploys: push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) builds and publishes to GitHub Pages. A failed build never takes down the live site; it keeps serving the last good deploy.
