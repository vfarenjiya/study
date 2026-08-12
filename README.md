# iTube — Content Generation Guide (for AI agents)

This document is a **build spec**, not a tutorial. It tells an AI model exactly how to
generate a new book (subject) or new chapters inside an existing book for the iTube
static site, so the output is byte-for-byte consistent with the existing site's
structure, styling, and math rendering.

Read this whole file before generating anything. Follow it literally — do not
improvise class names, file paths, or script tags.

> **Note on depth (v3):** the existing `ml` book's chapters (used as structural
> examples throughout this doc) were written to an earlier, shallower standard —
> formula stated, briefly explained, done. Do **not** copy their level of detail as
> a target — copy only their HTML/CSS/LaTeX *mechanics*. The teaching style required
> for all new content is defined in section 8.3: fully Socratic, fully derived, with
> step-by-step worked examples, and it does not target any word count — depth is
> judged by whether a reader could reconstruct every formula from the question that
> motivated it, not by length. If asked to add chapters to `ml` itself, new chapters
> should meet this bar even though older sibling chapters do not yet.

---

## 1. Site model

iTube is a flat static site. Content is organized as:

```
/                          → root index.html = library (list of all books)
/<book-slug>/index.html    → book landing page (list of chapters)
/<book-slug>/ch<N>/index.html  → one chapter (N = 1, 2, 3, ...)
/style.css                 → shared styles (do not fork per-book)
/app.js                    → shared behavior: theme toggle, font size, KaTeX + Markdown render
/theme.js                  → theme init helper loaded before app.js
/manifest.json, /icons/    → PWA metadata, shared across all books
```

A `<book-slug>` is a short lowercase folder name, e.g. `ml`, `os`, `dbms`, `algo`.
Chapters are always `ch1`, `ch2`, `ch3`, ... (no zero-padding, no other naming).

To add a **new book**: create `/<slug>/index.html` + `/<slug>/ch1/index.html` ...
`/<slug>/chN/index.html`, and add one row to the root `/index.html` chapter-list.

To add **new chapters to an existing book**: create `/<slug>/ch<N>/index.html`,
add one row to `/<slug>/index.html`, and wire the `chapter-nav` prev/next links
on the chapter immediately before and after it.

Never edit `style.css`, `app.js`, or `theme.js` per-book. They are global and
already handle theming, font-scaling, and math/markdown rendering for every page.

---

## 2. Required file structure for a new book

```
/<slug>/index.html        (book landing page)
/<slug>/ch1/index.html
/<slug>/ch2/index.html
...
/<slug>/chN/index.html
```

Relative path depth matters:
- Root `index.html` is depth 0 → assets referenced as `style.css`, `app.js`, `icons/...`
- Book `index.html` is depth 1 → assets referenced as `../style.css`, `../app.js`, `../icons/...`
- Chapter `index.html` is depth 2 → assets referenced as `../../style.css`, `../../app.js`, `../../icons/...`

Get this wrong and the page loads unstyled with no math rendering. Always match
the `../` count to the folder depth, exactly as shown in the templates below.

---

## 3. Exact `<head>` template (use verbatim, only change `title`/`description`/relative path prefix)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<title>PAGE_TITLE — iTube</title>
<meta name="description" content="PAGE_DESCRIPTION">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="manifest" href="PREFIX/manifest.json">
<link rel="icon" href="PREFIX/icons/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="PREFIX/icons/icon-192.svg">
<meta name="theme-color" content="#1B1B1F">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="iTube">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script>
  (function () {
    var saved = localStorage.getItem("itube-theme");
    var theme = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  })();
</script>
<link rel="stylesheet" href="PREFIX/style.css">

</head>
```

`PREFIX` rules:
- Root page: `PREFIX` = `` (empty) → `manifest.json`, `icons/...`, `style.css`
- Book page: `PREFIX` = `..` → `../manifest.json`, `../icons/...`, `../style.css`
- Chapter page: `PREFIX` = `../..` → `../../manifest.json`, `../../icons/...`, `../../style.css`

`PAGE_TITLE` convention:
- Root: `iTube — No video. Just read.`
- Book: `<Book Title> — iTube`
- Chapter: `<N>. <Chapter Title> — <Book Title> — iTube`

`PAGE_DESCRIPTION`: one plain-text sentence/paragraph summarizing the page (used for
SEO/meta only — for chapters, first ~150 chars of the opening paragraph works well).

---

## 4. Exact header/footer/script scaffold (identical on every page, only `PREFIX` and `data-depth` change)

```html
<body data-depth="DEPTH">
<header class="top">
  <div class="wrap">
    <a class="logo" href="PREFIX/index.html">i<span class="no">Tube</span></a>
    <div class="top-actions">
      <div class="font-controls" role="group" aria-label="Adjust text size">
        <button id="font-dec-btn" title="Decrease text size" aria-label="Decrease text size">A−</button>
        <span id="font-size-label">100%</span>
        <button id="font-inc-btn" title="Increase text size" aria-label="Increase text size">A+</button>
        <button id="font-reset-btn" class="font-reset" title="Reset text size" aria-label="Reset text size">RESET</button>
      </div>
      <button id="theme-btn" title="Toggle light/dark">◐</button>
    </div>
  </div>
</header>
<main>

  <!-- PAGE BODY GOES HERE — see section 5, 6, 7 -->

</main>
<footer>
  <div class="wrap">
    <span>© 2026 iTube. Read forever, free forever.</span>
    <span>No video was harmed in the making of this platform.</span>
  </div>
</footer>
<script src="PREFIX/theme.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js"></script>
<script defer src="PREFIX/app.js"></script>
</body>
</html>
```

`DEPTH` = `0` for root, `1` for book pages, `2` for chapter pages. `PREFIX` = same
mapping as section 3. (`PREFIX/index.html` for the logo link: root uses `index.html`,
book uses `../index.html`, chapter uses `../../index.html`.)

Do not reorder these `<script>` tags. `theme.js` loads first (sync). The other four
are `defer`, and must load in this order: katex.min.js → auto-render.min.js →
marked.min.js → app.js, because `app.js` calls functions exposed by the first three
on `DOMContentLoaded`.

---

## 5. Root page body (`/index.html`) — the library

Body content inside `<main>`:

```html
<div class="wrap narrow">
  <div class="eyebrow">The anti-video learning platform</div>
  <h1>Learn by reading, not watching.</h1>
  <p style="color:var(--stone); max-width:60ch;">No video, ever. One book, read at your own pace, no runtime, no scrubbing.</p>

  <div class="chapter-list">
    <a class="chapter-row" href="ml/index.html">
      <span class="chapter-row-num">📖</span>
      <span class="chapter-row-title">Machine Learning: Supervised &amp; Unsupervised Learning (GATE DA)</span>
      <span class="chapter-row-time">10 chapters</span>
    </a>
    <!-- one .chapter-row per book. Add a new <a> for each new book, do not remove existing ones. -->
  </div>
</div>
```

To add a new book, append one more `<a class="chapter-row" href="<slug>/index.html">`
block, following the exact same three-span structure (emoji/num, title, chapter count).

---

## 6. Book landing page body (`/<slug>/index.html`)

```html
<div class="wrap narrow">
  <div class="breadcrumb"><a href="../index.html">iTube</a><span class="sep">/</span><span>BOOK_TITLE</span></div>
  <div class="eyebrow">SUBJECT_CATEGORY</div>
  <h1>BOOK_TITLE</h1>
  <div class="byline">by AUTHOR_OR_SOURCE · PAGE_COUNT pages · N chapters</div>
  <p style="color:var(--stone); max-width:60ch;">BOOK_DESCRIPTION</p>

  <div class="chapter-list">
    <a class="chapter-row" href="ch1/index.html">
      <span class="chapter-row-num">1</span>
      <span class="chapter-row-title">1. CHAPTER_TITLE</span>
      <span class="chapter-row-time">N min</span>
    </a>
    <!-- repeat one .chapter-row per chapter, in order, num = chapter index -->
  </div>
</div>
```

Rules:
- `chapter-row-num` = chapter number as plain text (`1`, `2`, ... `10`, `11`, ...).
- `chapter-row-title` = `"<N>. <Title>"` — always repeat the number inside the title text too.
- `chapter-row-time` = an honest estimate, `"N min"`, based on ~200 words/min reading
  speed of the chapter's actual prose (exclude nothing — count everything the reader sees).
- `byline` page count = sum of realistic printed-page-equivalent length across chapters
  (roughly: total words / 300).

---

## 7. Chapter page body (`/<slug>/ch<N>/index.html`)

```html
<div class="wrap narrow">
  <div class="breadcrumb">
    <a href="../../index.html">iTube</a><span class="sep">/</span>
    <a href="../index.html">BOOK_TITLE</a><span class="sep">/</span>
    <span>Ch. N</span>
  </div>
  <div class="eyebrow">BOOK_TITLE</div>
  <h1>N. CHAPTER_TITLE</h1>
  <div class="chapter-meta">
    <span>Chapter N of TOTAL</span>
    <span class="read-badge">N min read</span>
  </div>

  <article>
    <!-- chapter prose goes here — see section 8 for content rules -->
  </article>

  <div class="chapter-nav">
    <a class="chapter-nav-link prev" href="../ch<N-1>/index.html">
      <span class="chapter-nav-label">← Previous</span>
      <span class="chapter-nav-title">N-1. PREV_CHAPTER_TITLE</span>
    </a>
    <a class="chapter-nav-link next" href="../ch<N+1>/index.html">
      <span class="chapter-nav-label">Next →</span>
      <span class="chapter-nav-title">N+1. NEXT_CHAPTER_TITLE</span>
    </a>
  </div>
</div>
```

`chapter-nav` rules:
- First chapter: use `<div class="chapter-nav-empty"></div>` in place of the `prev` link.
- Last chapter: use `<div class="chapter-nav-empty"></div>` in place of the `next` link.
- Every other chapter: both `prev` and `next` links present, in this exact order
  (prev first, next second) — CSS lays them out as a 2-column grid.
- When you add a new last chapter to an existing book, you must go back and edit
  the previously-last chapter's `next` link (was empty, now points to the new chapter).

---

## 8. Chapter content rules — math, structure, prose (the part that matters most)

This is the section most likely to be gotten wrong. Follow it exactly.

### 8.1 Math rendering pipeline (how it actually works)

`app.js` calls KaTeX's `renderMathInElement` scoped to `<article>`, with:

```js
delimiters: [
  { left: "$$", right: "$$", display: true },
  { left: "$", right: "$", display: false },
  { left: "\\[", right: "\\]", display: true },
  { left: "\\(", right: "\\)", display: false }
],
ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"]
```

Consequences:

1. **Never put math inside `<code>` or `<pre>`.** KaTeX explicitly skips those tags.
   Math written as plain text inside code tags (e.g. `<code>R(f) = E[L(f(x),y)]</code>`)
   will render as literal text forever, not math. This was the exact bug fixed in this
   codebase's history — do not reintroduce it.
2. Use `\[ ... \]` for **display/block** equations (standalone, centered, own line).
   Do not indent or wrap it in a `<p>` — put it directly between the surrounding
   `<p>` tags as raw text, exactly like this:
   ```html
   <p>Formally, we want to minimize the <strong>expected risk</strong>:</p>
   \[
   R(f) = \mathbb{E}_{(x,y)\sim P}\big[\, L(f(x), y) \,\big]
   \]
   <p>Since the true distribution is unknown, ...</p>
   ```
3. Use `\( ... \)` for **inline** math within a sentence inside a `<p>`:
   ```html
   <p>We assume the data is drawn i.i.d. from some unknown joint distribution \(P(X, Y)\).</p>
   ```
4. `$...$` and `$$...$$` also work (both delimiter styles are registered) — pick ONE
   style per book and use it consistently across all its chapters for uniformity.
   The reference book (`ml`) uses `\( \)` / `\[ \]` throughout; prefer that style
   unless told otherwise.
5. Always use real LaTeX commands, never ASCII math shorthand:

   | Don't write (plain text) | Write (LaTeX) |
   |---|---|
   | `E[Y|X=x]` | `\mathbb{E}[Y \mid X=x]` |
   | `sum_i` | `\sum_i` or `\sum_{i=1}^{n}` |
   | `y_hat` | `\hat{y}` |
   | `beta0`, `beta1` | `\beta_0`, `\beta_1` |
   | `x^2` | `x^2` (caret is fine, KaTeX handles it) |
   | `sqrt(x)` | `\sqrt{x}` |
   | `!=` | `\neq` |
   | `>=`, `<=` | `\geq`, `\leq` |
   | `X^T X` (matrix transpose) | `X^\top X` |
   | `X^-1` (matrix inverse) | `X^{-1}` |
   | `->` | `\to` |
   | `in {-1, +1}` | `\in \{-1, +1\}` |
   | `P(A|B)` | `P(A \mid B)` |
   | `argmin_x f(x)` | `\arg\min_x f(x)` |
   | piecewise definitions | `\begin{cases} ... & \text{if } ... \\ ... & \text{if } ... \end{cases}` |
   | matrices | `\begin{pmatrix} a & b \\ c & d \end{pmatrix}` |
   | labeled braces | `\underbrace{\text{expr}}_{\text{label}}` |

6. Escape literal `<`, `>`, `&` as HTML entities (`&lt;`, `&gt;`, `&amp;`) when they
   appear OUTSIDE math delimiters (in plain prose). Inside `\[...\]`/`\(...\)` blocks,
   write raw LaTeX — do not HTML-escape inside math.
7. Genuine pseudocode / algorithm listings (numbered steps, not standalone formulas)
   correctly stay inside `<pre><code>...</code></pre>` and are left unrendered as math —
   this is intentional (see `ml/ch9` k-means/hierarchical-clustering algorithm boxes
   for the reference pattern). Only convert something to LaTeX if it is a **formula**,
   not a **procedure**.

### 8.2 Markdown support

`marked.js` is loaded and available, but the reference book does not use Markdown —
all chapter content is hand-written semantic HTML directly inside `<article>`. Follow
that convention: write `<h2>`, `<h3>`, `<p>`, `<strong>`, `<em>`, `<ul>/<li>` etc.
directly. Only use a `.md` wrapper div with raw Markdown text if explicitly asked to;
if you do, wrap it as `<div class="md">...</div>` and the site will render it via
`marked.parse()` — see `app.js` for the exact selector (`.md`).

### 8.3 HTML structure inside `<article>`

- `<h2>` = major section within the chapter.
- `<h3>` = subsection (individual named formulas, worked examples, edge cases, common
  mistakes, derivations).
- **Word count is not a target and must never be optimized for.** A chapter is exactly
  as long as it needs to be to teach the material Socratically, with full derivations
  and step-by-step examples — never pad, never summarize prematurely. Depth is judged
  by whether a reader could reconstruct every formula from scratch after reading, not
  by how many words were used to get there.

#### 8.3.1 The Socratic method — mandatory teaching style

Do not present a formula and then explain it. Instead, **lead the reader to discover
it** by posing the question the formula answers, examining why naive approaches fail,
and letting the formula emerge as the answer. Every major concept in a chapter should
follow this arc:

1. **Pose a concrete question or problem** the reader can picture — not "let us now
   consider X" but an actual question: *"If we want to guess a single number ŷ that
   minimizes expected squared error against the true y, what number should we
   guess?"*
2. **Try the obvious/naive answer first, and show where it struggles**, or reason
   through candidate answers out loud, the way a teacher thinks aloud on a whiteboard.
   ("What if we just guessed the first observed value? What if we guessed the
   maximum? Let's see what happens with a small example...")
3. **Derive the real answer step by step**, showing every algebraic manipulation,
   never skipping a step "because it's standard." If a step uses a rule (product
   rule, linearity of expectation, chain rule, a specific identity), name the rule
   explicitly, so the reader can look it up if unfamiliar.
4. **State the resulting formula**, in `\[ ... \]` display form, immediately after
   the derivation that produced it — the formula should feel inevitable, not asserted.
5. **Ask a follow-up question that a curious reader would ask next** ("okay, but what
   if the loss isn't squared error — does the same argument still work?") and answer
   it, even briefly. This is what turns a chapter into a dialogue rather than a lecture.
6. **Work a full numeric example**, per 8.3.2 below, showing the derived formula in
   action on concrete numbers.
7. **Surface at least one common mistake or edge case**, per 8.3.3, ideally phrased
   as a question too ("what would go wrong here if the matrix were singular?").

This rhythm (question → naive attempt → derivation → formula → follow-up question →
worked example → mistake/edge case) is the mandatory unit of exposition for every
formula in the book. Repeat it as many times as the chapter's concepts require —
there is no ceiling on how many times you use this pattern in one chapter, and no
minimum either, beyond "as many times as there are ideas worth deriving."

#### 8.3.2 Derivations — required depth

A derivation is not "the formula is X, which can be shown as follows: [formula]." It
must show **every intermediate line of algebra/calculus**, each one following
visibly from the line before it, with the justification named in prose alongside it.
Never write "it can be shown that..." — show it.

Minimum acceptable derivation shape:

```html
<p>We want to find the value of \(\hat y\) that minimizes \(\mathbb{E}[(\hat y - Y)^2]\). Let's expand the square first:</p>
\[
\mathbb{E}[(\hat y - Y)^2] = \hat y^2 - 2\hat y\,\mathbb{E}[Y] + \mathbb{E}[Y^2]
\]
<p>This used linearity of expectation to pull \(\hat y\) (a constant, not a random variable) outside the expectation on the middle term. Now, since this is a quadratic in \(\hat y\) alone (the other terms are constants with respect to \(\hat y\)), we minimize it the way we'd minimize any parabola: take the derivative with respect to \(\hat y\) and set it to zero.</p>
\[
\frac{d}{d\hat y}\Big[\hat y^2 - 2\hat y\,\mathbb{E}[Y] + \mathbb{E}[Y^2]\Big] = 2\hat y - 2\,\mathbb{E}[Y] = 0
\]
<p>Solving for \(\hat y\):</p>
\[
\hat y = \mathbb{E}[Y]
\]
<p>So the best constant guess, under squared error, is the mean. Notice we never needed to know the actual distribution of Y — this result holds for any distribution with a finite mean and variance.</p>
```

Every derivation in every chapter must be shown at this granularity: each algebraic
move gets its own line and its own one-sentence justification. If a derivation genuinely
requires an external theorem (e.g. the law of large numbers, a matrix identity), name
it explicitly the first time it's used and give one sentence on what it says.

#### 8.3.3 Worked examples — step-by-step, no skipped arithmetic

A worked example must show **every intermediate computation**, not just the setup
and the final answer. If a sum has four terms, show all four terms individually
before summing them, then show the sum, then show any final division/normalization.
Treat the reader as someone following along with pencil and paper who should never
have to fill in a gap themselves.

Required shape:
1. State the concrete inputs explicitly (real numbers, or a small labeled dataset).
2. Write out the general formula being applied (referencing the one just derived).
3. Substitute the actual numbers into the formula, showing the substitution itself
   as its own display line before any arithmetic is carried out.
4. Carry out the arithmetic in visible steps — do not jump from substitution to
   final answer in one line if more than one operation is involved.
5. State the final answer in a full sentence with units/meaning, not just a bare number.
6. Where useful, immediately follow with a second, contrasting mini-example ("now
   watch what happens if we change one input...") to build intuition about
   sensitivity — this is optional but encouraged, especially for anything involving
   a hyperparameter.

Wrap every worked example in `<h3>Worked example</h3>` (or `<h4>` if nested under an
`<h3>` subsection).

#### 8.3.4 Common mistakes / misconceptions

Ideally phrased as a question-and-resolution, in the Socratic spirit ("what would
happen if we applied this formula when the matrix isn't invertible? Students often
assume..."). Format as a labeled callout paragraph:

```html
<p><strong>Common mistake:</strong> students often confuse the <em>margin</em> with the
<em>distance to the decision boundary</em> for an arbitrary point — the margin is
specifically the distance from the boundary to the nearest support vector, not to
an arbitrary training point.</p>
```

Include these wherever a concept is genuinely easy to misapply — do not force one
into every section artificially, but do not skip obvious ones either.

#### 8.3.5 Edge cases and boundary behavior

For every formula with a parameter, limit, or special condition, explicitly walk
through — again, ideally by posing the question first — what happens at the
extremes: as a parameter → 0 or → ∞, when a matrix is singular, when a dataset is
degenerate (all one class, n=1, perfectly collinear features), or in the
linearly-separable vs. non-separable / high-bias vs. high-variance regimes where
applicable. Reason through *why* the formula behaves that way at the boundary, not
just *that* it does.

#### 8.3.6 Cross-references

Explicitly reference at least one other chapter by number and name whenever a genuine
connection exists ("this is the same closed-form structure derived for ridge
regression in Chapter 2, but with the kernel matrix replacing \(XX^\top\)"). This
reinforces the book as a connected whole, not isolated chapters.

#### 8.3.7 What "done" looks like

A chapter is complete when a reader who works through it with pencil and paper could:
- reconstruct every formula's derivation from the question that motivated it, without
  having memorized the formula in advance;
- reproduce every worked example's arithmetic unaided;
- explain, in their own words, what breaks the formula or where it's commonly misapplied.

There is no length ceiling or floor beyond this — some concepts need one page of
derivation, others need four. Trust the material, not a word count, to decide when a
section is finished. Do not artificially compress a derivation to save space, and do
not artificially inflate one with restatement or filler once the concept is genuinely covered.

This is a *substantial* increase in rigor versus a typical blog-style explainer —
treat each chapter like a section of a rigorous, Socratic textbook (in the spirit of
a good lecturer deriving results live on a whiteboard), not a cheat sheet or a list
of stated facts.

### 8.4 Text alignment (handled globally, do not override per-chapter)

`style.css` already enforces sitewide alignment priority — do not add per-element
`text-align` inside chapter content:
- Body paragraphs/list items (`article p`, `article li`) → justified with hyphenation.
- Headings (`h1`–`h4`) → centered.
- Code, `<pre>`, tables, chapter-nav links → left-aligned.

### 8.5 Layout width (handled globally)

`.wrap` has no `max-width` — content spans full viewport width (edge-to-edge, 24px
side padding only). Do not add `max-width` constraints inside chapter markup.

---

## 9. Worked reference example (copy this depth and pattern)

This demonstrates the mandatory Socratic arc from section 8.3.1: a question, a naive
attempt, a full step-by-step derivation, the formula, a follow-up question, a fully
worked example, and an edge case — all before moving to the next idea.

```html
<h2>The learning problem</h2>
<p>Suppose you had to predict a single number \(\hat y\) for a quantity \(Y\) you can't observe yet, and you'll be penalized by squared error, \((\hat y - Y)^2\), once the true value is revealed. What number should you guess, if all you know is the distribution \(Y\) is drawn from?</p>

<p>A natural first instinct is to guess something simple — say, the smallest possible value of \(Y\), reasoning that underestimating "feels safer." Let's test that instinct on a tiny example: suppose \(Y\) takes the values 2, 4, and 9, each with equal probability \(1/3\). If we guess \(\hat y = 2\) (the smallest value), the squared errors are \((2-2)^2=0\), \((2-4)^2=4\), and \((2-9)^2=49\), averaging to \((0+4+49)/3 \approx 17.7\). If instead we guess the middle value \(\hat y = 4\), the errors are \(4, 0, 25\), averaging to \(29/3\approx 9.7\) — already better. So "smallest value" was a bad first guess. This suggests the right \(\hat y\) is some kind of balance point, not an extreme — let's derive it properly instead of guessing.</p>

<p>We want the \(\hat y\) that minimizes \(\mathbb{E}[(\hat y - Y)^2]\). Expand the square first, treating \(\hat y\) as an ordinary constant (not a random variable) inside the expectation:</p>
\[
\mathbb{E}[(\hat y - Y)^2] = \mathbb{E}[\hat y^2 - 2\hat y Y + Y^2] = \hat y^2 - 2\hat y\,\mathbb{E}[Y] + \mathbb{E}[Y^2]
\]
<p>This step used <em>linearity of expectation</em>: since \(\hat y\) is a constant, \(\mathbb{E}[\hat y^2] = \hat y^2\) and \(\mathbb{E}[2\hat y Y] = 2\hat y\,\mathbb{E}[Y]\) — the constant simply factors out of the expectation. What remains is a plain quadratic in \(\hat y\), with \(\mathbb{E}[Y]\) and \(\mathbb{E}[Y^2]\) acting as fixed numbers we don't need to know yet. A quadratic \(a\hat y^2 + b\hat y + c\) with positive leading coefficient is minimized where its derivative is zero, so differentiate with respect to \(\hat y\):</p>
\[
\frac{d}{d\hat y}\Big[\hat y^2 - 2\hat y\,\mathbb{E}[Y] + \mathbb{E}[Y^2]\Big] = 2\hat y - 2\,\mathbb{E}[Y]
\]
<p>Setting this equal to zero and solving:</p>
\[
2\hat y - 2\,\mathbb{E}[Y] = 0 \quad\Longrightarrow\quad \hat y = \mathbb{E}[Y]
\]
<p>So the best constant guess under squared error is exactly the mean of \(Y\) — no more, no less. Notice this derivation never used the specific shape of \(Y\)'s distribution, only that a mean and variance exist, so the result holds universally: whenever you minimize expected squared error, you are, whether you realize it or not, targeting a conditional mean.</p>

<p>A natural follow-up: does this still hold once we're not guessing a single unconditional number, but a function \(f(x)\) that depends on an input \(x\)? Yes — the identical argument applies separately at each fixed value of \(x\), which is exactly why we write the risk-minimizer under squared loss as \(f^*(x) = \mathbb{E}[Y \mid X=x]\), the <strong>conditional</strong> mean, rather than the unconditional one. Conditioning on \(x\) doesn't change the algebra above; it just repeats it inside each "slice" of the input space.</p>

<h3>Worked example</h3>
<p>Let's verify the derived formula \(\hat y = \mathbb{E}[Y]\) against the tiny example above, rather than trusting the algebra blindly. With \(Y \in \{2, 4, 9\}\), each with probability \(1/3\):</p>
\[
\mathbb{E}[Y] = \tfrac{1}{3}(2) + \tfrac{1}{3}(4) + \tfrac{1}{3}(9) = \tfrac{2+4+9}{3} = \tfrac{15}{3} = 5
\]
<p>So the theory predicts \(\hat y = 5\) should beat both of our earlier guesses (2 and 4). Let's check: the squared errors at \(\hat y = 5\) are \((5-2)^2=9\), \((5-4)^2=1\), \((5-9)^2=16\), which average to \((9+1+16)/3 = 26/3 \approx 8.67\) — lower than both \(17.7\) (guessing 2) and \(9.7\) (guessing 4), exactly as the derivation predicted. This confirms, on concrete numbers, that the mean genuinely minimizes squared error better than either of our earlier intuitive guesses.</p>

<p><strong>Common mistake:</strong> it's tempting to assume the same derivation would give \(\hat y = \text{median}(Y)\) if we just re-ran the same steps — it wouldn't, because the median minimizes a <em>different</em> loss (absolute error, \(|\hat y - Y|\)), whose derivative isn't a clean linear function of \(\hat y\) the way squared error's is. Swapping the loss function without redoing the derivation is one of the most common sources of quietly wrong intuition in this subject.</p>

<p><strong>Edge case:</strong> what if \(Y\) has no finite mean (e.g. a heavy-tailed distribution like the Cauchy distribution)? Then \(\mathbb{E}[Y]\) is undefined, the derivative-based argument above breaks down at the very first step (\(\mathbb{E}[Y]\) doesn't exist to substitute in), and squared-error risk minimization has no solution — this is precisely why some fields prefer loss functions with guaranteed finite risk-minimizers even under heavy-tailed noise.</p>
```

This is the mandatory depth for every idea introduced in a new chapter — a posed
question, a naive attempt that's shown to fail (or at least be suboptimal) on real
numbers, a full line-by-line derivation with each step justified, the resulting
formula, a natural follow-up question answered, a worked numeric example that
verifies the derivation on concrete numbers, and at least one mistake or edge case.

---

## 10. Checklist before shipping a new book or chapter

- [ ] Folder depth is correct; every `PREFIX`-relative link (`style.css`, `app.js`,
      `theme.js`, `manifest.json`, `icons/`, `index.html` breadcrumbs) matches depth.
- [ ] `<head>` block copied verbatim from section 3, only `title`/`description`/`PREFIX` changed.
- [ ] All five `<script>` tags present, in the exact order from section 4.
- [ ] Book page has one `.chapter-row` per chapter, correctly numbered and linked.
- [ ] Root `/index.html` has a `.chapter-row` entry for the new book (new books only).
- [ ] Every chapter has correct `chapter-nav` prev/next (or `chapter-nav-empty` at the
      ends), and adding a new last chapter updates the previous last chapter's `next` link.
- [ ] No math lives inside `<code>` or `<pre>` — only genuine step-by-step algorithms do.
- [ ] All formulas use real LaTeX commands (section 8.1 table), wrapped in `\[ \]` or `\( \)`.
- [ ] Every major idea is introduced Socratically: a posed question, a naive attempt
      examined and shown insufficient, a full line-by-line derivation with each step
      justified in prose, the resulting formula, and a natural follow-up question answered.
- [ ] Every derivation shows every intermediate algebraic/calculus step — never
      "it can be shown that..." with the work skipped.
- [ ] Every worked example shows every intermediate computation, substitutes numbers
      before computing, and states a full-sentence final answer with meaning attached.
- [ ] At least one worked example verifies its section's derived formula numerically
      against the reasoning that motivated the derivation (as in section 9's example).
- [ ] Common mistakes and edge cases appear wherever a concept is genuinely easy to
      misapply or has a genuine boundary condition worth reasoning through — not
      forced into every section, not skipped where obvious.
- [ ] At least one explicit cross-reference to another chapter by number and name,
      wherever a genuine connection exists.
- [ ] No `max-width` or `text-align` overrides added inside chapter content.
- [ ] `chapter-meta` read-time is a reasonable, honest estimate based on the chapter's
      actual final content — not copied from a template guess. Do not target a
      specific word count when writing; let the material's depth determine length,
      then estimate read time from whatever length resulted.
