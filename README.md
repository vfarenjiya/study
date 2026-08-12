# iTube — Content Generation Guide (for AI agents)

This document is a **build spec**, not a tutorial. It tells an AI model exactly how to
generate a new book (subject) or new chapters inside an existing book for the iTube
static site, so the output is byte-for-byte consistent with the existing site's
structure, styling, and math rendering.

Read this whole file before generating anything. Follow it literally — do not
improvise class names, file paths, or script tags.

> **Note on depth (v2):** the existing `ml` book's chapters (used as structural
> examples throughout this doc) were written to an earlier, shallower depth
> standard (~500–1200 words each). Do **not** copy their word count or level of
> detail as a target — copy only their HTML/CSS/LaTeX *mechanics*. The depth and
> rigor bar for all new content is defined in section 8.3 and is substantially
> higher. If asked to add chapters to `ml` itself, new chapters should meet the
> v2 depth bar even though older sibling chapters do not yet.

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
- Every subsection that introduces a formula follows this rhythm, in order:
  1. **Motivating prose** (2–4 sentences) — why this formula exists, what problem it
     solves, what came before it that was insufficient.
  2. **The `\[ ... \]` display block.**
  3. **Interpretive prose** (3–6 sentences) — what every symbol means, what happens
     at the boundaries (e.g. as a parameter → 0 or → ∞), and why it matters for later
     chapters or for the exam/practical context this book targets.
  4. **A derivation**, when the formula is not a definition but a result (e.g. show
     how minimizing RSS yields the closed-form OLS estimator; show how the sigmoid
     falls out of the log-odds assumption). Do not state a derived formula as if it
     fell from the sky — show the 2–5 algebraic steps that get there.
  5. **A worked numerical example** — see 8.3.1. Every `<h2>` section that contains at
     least one non-trivial formula must contain at least one worked example. Purely
     definitional or conceptual `<h2>` sections (e.g. "parametric vs non-parametric")
     do not require one.
  6. **At least one of**: an edge case, a common mistake/misconception, or a
     connection to another chapter/algorithm. See 8.3.2 and 8.3.3.
- Bold (`<strong>`) key terms on first use. Italicize (`<em>`) terms being contrasted
  or emphasized mid-sentence.
- Do not use inline `style=` attributes inside `<article>` content except on the root
  and book pages' subtitle `<p>` (`style="color:var(--stone); max-width:60ch;"`),
  which is a landing-page-only convention.

#### 8.3.1 Worked examples — required depth

A worked example is not "plug in numbers and state the answer." It must:
- State the concrete inputs explicitly (numbers, a small dataset, or specific vectors/matrices).
- Show every intermediate computation step — not just the final substitution. If a
  chapter shows `\(\hat\beta_1 = 0.9\)` it must also show the numerator and
  denominator sums that produced 0.9, not just assert the result.
- End with an explicit numeric or categorical answer, and one sentence of interpretation
  ("a 1-unit increase in x is associated with a 0.9-unit increase in y", or
  "the point is classified Spam because its unnormalized posterior is larger").
- Where relevant, show what changes if one input changes (a mini sensitivity check),
  e.g. "if C were smaller instead, the margin would widen and this same point might
  fall inside it." This is optional but strongly preferred for `<h2>` sections that
  introduce a hyperparameter.

Wrap every worked example in `<h3>Worked example</h3>` (or `<h4>Worked example</h4>`
if it's nested under a subsection that's already an `<h3>`).

#### 8.3.2 Common mistakes / misconceptions

At least one per `<h2>` major section (more for sections covering material that is
easy to misapply). Format as a labeled callout paragraph, not a bare aside:

```html
<p><strong>Common mistake:</strong> students often confuse the <em>margin</em> with the
<em>distance to the decision boundary</em> for an arbitrary point — the margin is
specifically the distance from the boundary to the nearest support vector, not to
an arbitrary training point.</p>
```

#### 8.3.3 Edge cases and boundary behavior

Every formula with a parameter, limit, or special condition should get explicit
treatment of what happens at the extremes:
- What happens as a regularization/smoothing parameter → 0? → ∞?
- What happens when a matrix is singular / non-invertible? When a denominator can be 0?
- What happens with a degenerate dataset (all one class, n=1, perfectly collinear features)?
- What is the algorithm's behavior in the linearly-separable vs. non-separable case,
  or the high-bias vs. high-variance regime, where applicable?

#### 8.3.4 Cross-references

Explicitly reference at least one other chapter by number and name whenever a genuine
connection exists ("this is the same closed-form structure derived for ridge
regression in Chapter 2, but with the kernel matrix replacing \(XX^\top\)"). This
reinforces the book as a connected whole, not ten isolated chapters, and mirrors the
existing `ml` book's convention.

#### 8.3.5 Target chapter length and density

- Target: **1800–3200 words** of prose per chapter (measured as visible text inside
  `<article>`, excluding LaTeX source and HTML tags), reflecting a genuine 18–30
  minute deep-reading chapter — not a summary. This supersedes any shorter estimate;
  a chapter under 1500 words is too shallow for this book format and must be expanded.
- Minimum **4–7 `<h2>` sections** per chapter.
- Minimum **1 worked example per `<h2>` that contains a non-definitional formula**,
  and most chapters should have **3+ worked examples total**.
- Minimum **1 derivation** (not just a stated result) somewhere in the chapter, where
  the topic supports one — most quantitative ML/CS/math/stats topics do.
- At least **2 "common mistake" callouts** and **2 edge-case discussions** per chapter,
  distributed across sections rather than clustered in one.
- At least **1 explicit cross-reference** to another chapter.
- `chapter-meta` read-time should scale with actual word count at ~180–220 words/min
  (a 2400-word chapter → ~12–13 min listed... but include LaTeX reading friction, so
  round UP: use ~150 words/min effective for math-heavy chapters when computing the
  displayed "N min read").

This is a *substantial* increase in depth versus a typical blog-style explainer —
treat each chapter like a section of a rigorous textbook (Bishop, ESL, CLRS-style),
not a cheat sheet. A reader finishing a chapter should be able to derive the core
formula from scratch, work a numeric example by hand, and know where it commonly
breaks or gets misapplied — not just recognize the formula.

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

The old, shallow pattern (motivate → formula → one sentence) is **not sufficient**
anymore. Every formula-bearing subsection must read like this:

```html
<h2>The learning problem</h2>
<p>We assume the data is drawn i.i.d. from some unknown joint distribution \(P(X, Y)\). The goal is not to memorize the training set but to find a hypothesis \(f\) from a hypothesis class \(\mathcal{H}\) that generalizes to unseen data drawn from the same distribution. This distinction — fitting the sample versus fitting the underlying process that generated it — is the single most important idea in this book, and nearly every technique introduced later exists to manage the gap between the two.</p>

<p>Formally, we want to minimize the <strong>expected risk</strong>, the average loss a hypothesis would incur over the entire (unobservable) population:</p>
\[
R(f) = \mathbb{E}_{(x,y)\sim P}\big[\, L(f(x), y) \,\big]
\]
<p>Here \(L\) is a loss function chosen to encode what "wrong" costs (see the next section), and the expectation is taken over the true, unknown joint distribution \(P(X,Y)\). If we could compute \(R(f)\) exactly for every candidate \(f\), model selection would be trivial: pick the \(f \in \mathcal{H}\) that minimizes it. The entire difficulty of machine learning stems from the fact that \(P\) is unknown and \(R(f)\) cannot be computed directly.</p>

<p>Since the true distribution is unavailable, we approximate it with the empirical distribution of the training sample and minimize the <strong>empirical risk</strong> instead:</p>
\[
\hat{R}(f) = \frac{1}{n}\sum_{i=1}^{n} L\big(f(x_i), y_i\big)
\]
<p>This is derived by replacing the population expectation with a sample average — formally, replacing \(P\) with the empirical measure that places probability \(1/n\) on each observed point. By the law of large numbers, \(\hat{R}(f) \to R(f)\) as \(n \to \infty\) for a fixed \(f\), which is the statistical justification for the substitution. This is <strong>empirical risk minimization (ERM)</strong>, and it underlies nearly every algorithm in this book: OLS (Chapter 2), logistic regression (Chapter 3), and neural network training (Chapter 8) are all instances of ERM with a specific choice of \(\mathcal{H}\) and \(L\).</p>

<p><strong>Common mistake:</strong> students often treat "minimizing empirical risk" and "minimizing expected risk" as interchangeable. They are not — a hypothesis class flexible enough can drive \(\hat R(f)\) to zero while \(R(f)\) remains large; this gap is exactly what overfitting means, and it's why Chapter 7 exists.</p>

<h3>Worked example</h3>
<p>Take a training sample of 4 points under squared loss: \((x_i, y_i) \in \{(1,2),(2,3),(3,5),(4,4)\}\), and a candidate hypothesis \(f(x) = x + 1\). Computing each term of \(\hat R(f) = \frac{1}{n}\sum_i (f(x_i)-y_i)^2\):</p>
\[
(f(1)-2)^2 = (2-2)^2 = 0, \quad (f(2)-3)^2 = (3-3)^2 = 0
\]
\[
(f(3)-5)^2 = (4-5)^2 = 1, \quad (f(4)-4)^2 = (5-4)^2 = 1
\]
<p>Summing gives \(0+0+1+1=2\), so \(\hat R(f) = 2/4 = 0.5\). If we instead evaluate \(g(x) = x + 0.5\), the squared errors become \(0.25, 0.25, 2.25, 0.25\), summing to 3, giving \(\hat R(g) = 0.75\) — worse than \(f\), even though \(g\)'s errors are more evenly spread across points. This illustrates that ERM does not care about the distribution of error across points, only the total — a property directly inherited from the choice of loss function, revisited when we contrast squared loss with more robust losses.</p>

<h2>Loss functions</h2>
<p>The loss function encodes what "wrong" costs, and the choice of loss shapes the entire optimization landscape: whether the risk is convex, whether it's differentiable, and what the risk-minimizing prediction turns out to be.</p>

<h3>Squared error loss (regression)</h3>
\[
L(\hat{y}, y) = (\hat{y} - y)^2
\]
<p>Squared loss penalizes large errors disproportionately (an error of 4 costs 16 times as much as an error of 1, not 4 times), is differentiable everywhere including at zero error, and — this is the key structural fact — the risk-minimizing prediction under squared loss is provably the <strong>conditional mean</strong> \(\mathbb{E}[Y \mid X=x]\).</p>
<p>This follows from a short derivation: for a fixed \(x\), minimizing \(\mathbb{E}_Y[(\hat y - Y)^2 \mid X=x]\) over \(\hat y\) means differentiating with respect to \(\hat y\) and setting the result to zero: \(\frac{d}{d\hat y}\mathbb{E}[(\hat y - Y)^2] = 2\mathbb{E}[\hat y - Y] = 0 \implies \hat y = \mathbb{E}[Y \mid X=x]\). This is exactly why ordinary least squares, derived in the next chapter, targets the mean rather than the median or some other statistic.</p>
<p><strong>Edge case:</strong> squared loss is sensitive to outliers precisely because of this quadratic penalty — a single point far from the rest can dominate the sum and pull the fitted mean toward it. When outlier-robustness matters more than optimality under Gaussian noise, absolute loss (\(|\hat y - y|\), whose risk-minimizer is the conditional <em>median</em>, not mean) is often preferred instead.</p>
```

This is the depth bar for **every** formula-bearing subsection in a new chapter —
motivating prose, the formula, an explanation that unpacks every symbol, a short
derivation where the result isn't a definition, a worked numeric example with every
intermediate step shown, and at least one common-mistake or edge-case callout.

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
- [ ] Every formula has motivating prose before it, symbol-by-symbol interpretation
      after it, and a short derivation where the result isn't a bare definition.
- [ ] Chapter is **1800–3200 words** of prose (recount if unsure — do not eyeball it).
- [ ] At least **4–7 `<h2>` sections**.
- [ ] At least **one worked example per formula-bearing `<h2>`**, **3+ total**, each
      showing every intermediate computation step, not just the final number.
- [ ] At least **one full derivation** (not just a stated closed-form result).
- [ ] At least **2 "common mistake" callouts** and **2 edge-case discussions**, spread
      across the chapter rather than clustered together.
- [ ] At least **1 explicit cross-reference** to another chapter by number and name.
- [ ] No `max-width` or `text-align` overrides added inside chapter content.
- [ ] `chapter-meta` read-time and book `byline` page/chapter counts recomputed from
      actual final word counts (section 8.3.5), not copied from a template guess.
