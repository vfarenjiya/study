const CURRICULUM = {
  PS: {
    name: 'Probability & Statistics',
    color: '#e8a23d',
    lessons: [
      {
        id: 'ps-01',
        title: 'Sample Space & Basic Probabilities',
        content: `
          <p>Every probability question starts here. This is your foundation.</p>
          
          <div class="def-box">
            <h4>Sample Space & Events</h4>
            <p>A <strong>sample space</strong> $\\Omega$ is the set of all possible outcomes of an experiment.</p>
            <p>An <strong>event</strong> A is any subset of $\\Omega$.</p>
            <p><strong>Probability:</strong> For a finite sample space with equally likely outcomes: $$P(A) = \\frac{n(A)}{n(\\Omega)}$$</p>
          </div>

          <div class="example-box">
            <h4>Example: Rolling a Die</h4>
            <p>Sample space: $\\Omega = \{1, 2, 3, 4, 5, 6\}$</p>
            <p>Event A = "roll is even" = $\{2, 4, 6\}$</p>
            <p>$P(A) = 3/6 = 1/2$</p>
          </div>

          <p><strong>Key properties:</strong></p>
          <ul>
            <li>$P(A) \\ge 0$ for all events A</li>
            <li>$P(\\Omega) = 1$ (certain event)</li>
            <li>$P(A^c) = 1 - P(A)$ (complement rule)</li>
          </ul>

          <div class="def-box">
            <h4>Counting: Permutations & Combinations</h4>
            <p><strong>Permutation</strong> (order matters): $$nPr = \\frac{n!}{(n-r)!}$$</p>
            <p><strong>Combination</strong> (order doesn't matter): $$nCr = \\frac{n!}{r!(n-r)!}$$</p>
            <p>These underlie almost every "equally likely outcomes" probability question — count favorable arrangements over total arrangements.</p>
          </div>

          <div class="theorem-box">
            <h5>Addition Rule (Inclusion-Exclusion)</h5>
            <p>For any two events (not necessarily mutually exclusive): $$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$</p>
            <p>For three events: $$P(A\\cup B\\cup C) = \\sum P(A_i) - \\sum P(A_i\\cap A_j) + P(A\\cap B\\cap C)$$</p>
            <p>If A and B are <strong>mutually exclusive</strong> ($A \\cap B = \\emptyset$), this simplifies to $P(A\\cup B) = P(A)+P(B)$.</p>
          </div>

          <p style="margin-top: 12px; color: var(--muted);">💡 <strong>Exam tip:</strong> "At least one" questions are almost always faster via the complement rule — compute $1 - P(\\text{none})$ instead of enumerating every favorable case.</p>
        `
      },
      {
        id: 'ps-02',
        title: 'Conditional Probability & Bayes Theorem',
        content: `
          <div class="def-box">
            <h4>Conditional Probability</h4>
            <p>The probability of A given B has occurred is: $$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$</p>
            <p>This is the probability of A "restricted" to the sample space where B is true.</p>
          </div>

          <div class="theorem-box">
            <h5>Bayes' Theorem (Most Important!)</h5>
            <p>$$P(A_i|B) = \\frac{P(B|A_i)P(A_i)}{\\sum_j P(B|A_j)P(A_j)}$$</p>
            <p><strong>Intuition:</strong> Update your belief about $A_i$ after observing B.</p>
          </div>

          <div class="example-box">
            <h4>Classic: Disease Testing</h4>
            <p>Disease prevalence: 1% of population has it. Test accuracy: 95% (detects disease when present), 90% specificity (correctly says "no disease" when negative).</p>
            <p>If you test positive, what's the probability you actually have the disease?</p>
            <p><strong>Solution:</strong> Let D = have disease, T+ = test positive.</p>
            <p>$P(D|T+) = \\frac{P(T+|D)P(D)}{P(T+|D)P(D) + P(T+|\\neg D)P(\\neg D)}$</p>
            <p>$= \\frac{0.95 \\times 0.01}{0.95 \\times 0.01 + 0.1 \\times 0.99} \\approx 8.76\%$</p>
          </div>

          <div class="def-box">
            <h4>Law of Total Probability</h4>
            <p>If $B_1, ..., B_n$ partition the sample space: $$P(A) = \\sum_j P(A|B_j)P(B_j)$$</p>
            <p>This is exactly the denominator of Bayes' theorem — it's how you compute the "total" probability of evidence A by summing over every possible cause.</p>
          </div>

          <div class="theorem-box">
            <h5>Independence vs. Conditional Independence</h5>
            <p>A and B are <strong>independent</strong> if $P(A\\cap B) = P(A)P(B)$, equivalently $P(A|B) = P(A)$.</p>
            <p>A and B are <strong>conditionally independent given C</strong> if $P(A\\cap B|C) = P(A|C)P(B|C)$ — independence can hold conditionally even if A and B are dependent unconditionally (or vice versa).</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">⚠️ <strong>Common pitfall:</strong> Don't confuse $P(A|B)$ with $P(B|A)$ — this "base rate" mix-up is exactly why a 95%-accurate test still gives an ~8.76% chance of disease given a positive result, when the disease is rare.</p>
        `
      },
      {
        id: 'ps-03',
        title: 'Probability Distributions',
        content: `
          <p>Real-world data generation processes are modeled using standard distributions.</p>
          
          <div class="theorem-box">
            <h5>Discrete: Binomial & Poisson</h5>
            <p><strong>Binomial:</strong> Number of successes in $n$ independent trials. $$P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}$$</p>
            <p><strong>Poisson:</strong> Number of events occurring in a fixed interval of time. $$P(X=k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}$$</p>
          </div>

          <div class="theorem-box">
            <h5>Continuous: Normal Distribution</h5>
            <p>Bell-shaped curve defined by mean $\\mu$ and variance $\\sigma^2$.</p>
            <p><strong>Standard Normal (Z):</strong> $\\mu=0, \\sigma=1$. Conversion: $$Z = \\frac{X - \\mu}{\\sigma}$$</p>
            <p><strong>68-95-99.7 Rule:</strong> ~68% of data falls within 1 standard deviation, 95% within 2, and 99.7% within 3.</p>
          </div>

          <div class="example-box">
            <h4>Choosing the Right Distribution</h4>
            <p>Counting successes in fixed trials (e.g., defective items in a batch of 20) → <strong>Binomial</strong>.</p>
            <p>Counting rare events over a continuous interval (e.g., calls per hour) → <strong>Poisson</strong>.</p>
            <p><strong>Poisson as a limit of Binomial:</strong> when $n \\to \\infty$, $p \\to 0$, with $np = \\lambda$ fixed, Binomial converges to Poisson($\\lambda$) — useful for approximating rare-event binomials.</p>
          </div>

          <div class="def-box">
            <h4>Uniform & Exponential Distributions</h4>
            <p><strong>Uniform (continuous):</strong> constant density over $[a,b]$: $$f(x) = \\frac{1}{b-a},\\quad E[X] = \\frac{a+b}{2}$$</p>
            <p><strong>Exponential:</strong> models waiting time until the next event in a Poisson process: $$f(x) = \\lambda e^{-\\lambda x},\\quad E[X] = \\frac{1}{\\lambda}$$</p>
            <p>The exponential distribution is <strong>memoryless</strong>: $P(X > s+t \\mid X > s) = P(X > t)$ — past waiting time gives no information about future waiting time.</p>
          </div>

          <div class="theorem-box">
            <h5>Cumulative Distribution Function (CDF)</h5>
            <p>$$F(x) = P(X \\le x) = \\int_{-\\infty}^{x} f(t)\\,dt \\quad \\text{(continuous)}, \\qquad F(x) = \\sum_{t\\le x} p(t) \\quad \\text{(discrete)}$$</p>
            <p>F is non-decreasing, $F(-\\infty)=0$, $F(\\infty)=1$, and $f(x) = F'(x)$ wherever f is continuous.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> Memorize $E[X]$ and $Var(X)$ for Binomial ($np$, $np(1-p)$) and Poisson ($\\lambda$, $\\lambda$) — GATE frequently tests these directly without asking you to derive them.</p>
        `
      },
      {
        id: 'ps-04',
        title: 'Expectation, Variance & Covariance',
        content: `
          <div class="def-box">
            <h4>Expectation (Mean)</h4>
            <p>For a discrete random variable X: $$E[X] = \\sum_x x \\cdot P(X=x)$$</p>
            <p><strong>Linearity of Expectation:</strong> $E[aX + bY] = aE[X] + bE[Y]$ — holds even if X and Y are dependent!</p>
          </div>

          <div class="def-box">
            <h4>Variance & Covariance</h4>
            <p>$$Var(X) = E[X^2] - (E[X])^2$$</p>
            <p>Covariance measures how two variables move together: $$Cov(X,Y) = E[XY] - E[X]E[Y]$$</p>
            <p>If X and Y are independent, $Cov(X,Y) = 0$ (the converse is not always true).</p>
          </div>

          <div class="example-box">
            <h4>Example</h4>
            <p>A die roll X has $E[X] = 3.5$ and $E[X^2] = \\frac{1+4+9+16+25+36}{6} = 15.17$.</p>
            <p>$$Var(X) = 15.17 - 3.5^2 = 15.17 - 12.25 = 2.92$$</p>
          </div>

          <div class="def-box">
            <h4>Correlation Coefficient</h4>
            <p>Normalizes covariance to $[-1, 1]$: $$\\rho_{XY} = \\frac{Cov(X,Y)}{\\sigma_X\\sigma_Y}$$</p>
            <p>$\\rho = 1$: perfect positive linear relationship. $\\rho = -1$: perfect negative. $\\rho = 0$: no <em>linear</em> relationship (nonlinear dependence can still exist).</p>
          </div>

          <div class="theorem-box">
            <h5>Conditional Expectation & Variance</h5>
            <p>$$E[X] = E[E[X|Y]] \\qquad \\text{(Law of Total Expectation)}$$</p>
            <p>$$Var(X) = E[Var(X|Y)] + Var(E[X|Y]) \\qquad \\text{(Law of Total Variance)}$$</p>
            <p>The variance decomposition splits total variance into "average within-group variance" plus "variance of group means" — the same idea behind ANOVA.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">⚠️ <strong>Common pitfall:</strong> $Var(aX+b) = a^2Var(X)$ — the constant $b$ vanishes and the coefficient $a$ gets <em>squared</em>. Many students forget the square.</p>
        `
      },
      {
        id: 'ps-05',
        title: 'Sampling, CLT & Hypothesis Testing',
        content: `
          <div class="theorem-box">
            <h5>Central Limit Theorem (CLT)</h5>
            <p>The sample mean $\\bar{X}$ of n i.i.d. random variables, regardless of the population's original distribution, approaches a Normal distribution as n grows:</p>
            <p>$$\\bar{X} \\sim N\\left(\\mu, \\frac{\\sigma^2}{n}\\right) \\text{ as } n \\to \\infty$$</p>
            <p>This is why the Normal distribution shows up everywhere in statistics.</p>
          </div>

          <div class="def-box">
            <h4>Hypothesis Testing</h4>
            <p><strong>Null Hypothesis $H_0$:</strong> the default "no effect" claim.</p>
            <p><strong>p-value:</strong> probability of observing data at least as extreme as what we saw, assuming $H_0$ is true.</p>
            <p>If $p\\text{-value} < \\alpha$ (typically 0.05), we <strong>reject</strong> $H_0$.</p>
          </div>

          <div class="example-box">
            <h4>Type I vs Type II Error</h4>
            <p><strong>Type I ($\\alpha$):</strong> Rejecting $H_0$ when it's actually true (false positive).</p>
            <p><strong>Type II ($\\beta$):</strong> Failing to reject $H_0$ when it's actually false (false negative).</p>
          </div>

          <div class="def-box">
            <h4>Confidence Intervals</h4>
            <p>A $(1-\\alpha)$ confidence interval for the mean: $$\\bar{X} \\pm z_{\\alpha/2}\\frac{\\sigma}{\\sqrt{n}}$$</p>
            <p>Interpretation: if we repeated the sampling process many times, about $(1-\\alpha)\\times 100\\%$ of such intervals would contain the true population mean — it's a statement about the <em>procedure</em>, not about one fixed interval containing $\\mu$ with that probability.</p>
          </div>

          <div class="theorem-box">
            <h5>Chi-Squared Test</h5>
            <p>Tests whether observed categorical frequencies differ from expected ones: $$\\chi^2 = \\sum_i \\frac{(O_i - E_i)^2}{E_i}$$</p>
            <p>Used for goodness-of-fit tests and tests of independence between two categorical variables (contingency tables).</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> Use a z-test when $\\sigma$ is known (or $n$ is large); use a t-test when $\\sigma$ is unknown and estimated from a small sample ($n < 30$), with $df = n-1$.</p>
        `
      }
    ],
    quiz: [
      {
        q: 'A coin is flipped twice. What is P(at least one head)?',
        opts: ['1/2', '3/4', '1/4', '1/3'],
        ans: 1,
        exp: 'Sample space: {HH, HT, TH, TT}. At least one H: {HH, HT, TH} = 3 outcomes. P = 3/4.'
      },
      {
        q: 'If P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2, find P(A|B).',
        opts: ['0.4', '0.5', '0.2', '0.1'],
        ans: 0,
        exp: '$P(A|B) = P(A\\cap B) / P(B) = 0.2 / 0.5 = 0.4$'
      },
      {
        q: 'For a Normal Distribution, approximately what percentage of data falls within 2 standard deviations of the mean?',
        opts: ['68%', '90%', '95%', '99.7%'],
        ans: 2,
        exp: 'According to the Empirical Rule (68-95-99.7 rule), approximately 95% of the data falls within 2 standard deviations.'
      },
      {
        q: 'If X and Y are independent random variables, what is Cov(X, Y)?',
        opts: ['1', '-1', '0', 'Var(X) + Var(Y)'],
        ans: 2,
        exp: 'Independence implies E[XY] = E[X]E[Y], so Cov(X,Y) = E[XY] - E[X]E[Y] = 0.'
      },
      {
        q: 'A p-value of 0.02 with significance level α = 0.05 leads to which decision?',
        opts: ['Fail to reject H0', 'Reject H0', 'Accept H0 as definitely true', 'Increase sample size only'],
        ans: 1,
        exp: 'Since 0.02 < 0.05, the result is statistically significant, so we reject the null hypothesis H0.'
      }
    ]
  },

  LA: {
    name: 'Linear Algebra',
    color: '#5aa9e6',
    lessons: [
      {
        id: 'la-01',
        title: 'Vectors & Vector Spaces',
        content: `
          <div class="def-box">
            <h4>Vector & Vector Space</h4>
            <p>A <strong>vector space</strong> V is a set closed under vector addition and scalar multiplication:</p>
            <p>• If $u, v \\in V$, then $u + v \\in V$</p>
            <p>• If $v \\in V$ and $c$ is scalar, then $c\\cdot v \\in V$</p>
          </div>

          <div class="example-box">
            <h4>Example</h4>
            <p>$v_1 = [1, 2], v_2 = [3, 4]$</p>
            <p>$v_1 + v_2 = [4, 6]$ ✓ (still in $\\mathbb{R}^2$)</p>
            <p>$2\\cdot v_1 = [2, 4]$ ✓ (still in $\\mathbb{R}^2$)</p>
          </div>

          <p><strong>Linear Independence:</strong> Vectors $v_1, v_2, ..., v_n$ are linearly independent if the only solution to $c_1v_1 + ... + c_nv_n = 0$ is $c_1 = ... = c_n = 0$.</p>

          <div class="def-box">
            <h4>Span, Basis & Dimension</h4>
            <p><strong>Span:</strong> the set of all linear combinations of a set of vectors — the space they can "reach".</p>
            <p><strong>Basis:</strong> a linearly independent set that spans the whole space. Every vector in the space has a <em>unique</em> representation as a combination of basis vectors.</p>
            <p><strong>Dimension:</strong> the number of vectors in any basis of the space (all bases of a given space have the same size).</p>
          </div>

          <div class="theorem-box">
            <h5>Subspaces</h5>
            <p>$W \\subseteq V$ is a subspace if it contains the zero vector and is closed under addition and scalar multiplication.</p>
            <p>Common subspaces of a matrix A: the <strong>column space</strong> (span of columns), <strong>row space</strong>, and <strong>null space</strong> ($\\{x : Ax = 0\\}$).</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> A quick test — if one vector is a scalar multiple of another (or a linear combination of the rest), the set is dependent. For n vectors in $\\mathbb{R}^n$, they're independent iff the matrix they form has non-zero determinant.</p>
        `
      },
      {
        id: 'la-02',
        title: 'Eigenvalues & Eigenvectors',
        content: `
          <div class="def-box">
            <h4>Eigenvalues & Eigenvectors</h4>
            <p>For a square matrix A, a scalar $\\lambda$ is an <strong>eigenvalue</strong> and vector $v$ is an <strong>eigenvector</strong> if:</p>
            <p>$$Av = \\lambda v$$</p>
            <p>This means A stretches/shrinks v by factor $\\lambda$ (no direction change).</p>
            <p><strong>How to find:</strong> Solve $\\det(A - \\lambda I) = 0$ for $\\lambda$.</p>
          </div>

          <div class="example-box">
            <h4>2×2 Example</h4>
            <p>$$A = \\begin{pmatrix} 3 & 1 \\ 0 & 2 \\end{pmatrix}$$</p>
            <p>Characteristic polynomial: $\\det(A - \\lambda I) = (3-\\lambda)(2-\\lambda) = 0$</p>
            <p>Eigenvalues: $\\lambda_1 = 3, \\lambda_2 = 2$</p>
          </div>

          <div class="def-box">
            <h4>Diagonalization</h4>
            <p>If A has n linearly independent eigenvectors, it can be written as $$A = PDP^{-1}$$ where D is diagonal (eigenvalues) and P's columns are the corresponding eigenvectors.</p>
            <p>This makes computing $A^k$ trivial: $A^k = PD^kP^{-1}$, since raising a diagonal matrix to a power just raises each entry.</p>
          </div>

          <div class="theorem-box">
            <h5>Algebraic vs. Geometric Multiplicity</h5>
            <p><strong>Algebraic multiplicity:</strong> how many times $\\lambda$ repeats as a root of the characteristic polynomial.</p>
            <p><strong>Geometric multiplicity:</strong> the dimension of the eigenspace for $\\lambda$ (number of independent eigenvectors).</p>
            <p>Geometric $\\le$ algebraic multiplicity always. A matrix is diagonalizable iff they're equal for every eigenvalue.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> Two fast sanity checks without solving the full characteristic polynomial: $\\sum \\lambda_i = trace(A)$ and $\\prod \\lambda_i = \\det(A)$. For the example above: $3+2=5=trace(A)$ ✓ and $3\\times 2 = 6 = \\det(A)$ ✓.</p>
        `
      },
      {
        id: 'la-03',
        title: 'Matrix Decompositions (SVD)',
        content: `
          <div class="theorem-box">
            <h5>Singular Value Decomposition (SVD)</h5>
            <p>Any $m \\times n$ matrix A can be factored into: $$A = U \\Sigma V^T$$</p>
            <p>• U: Orthogonal matrix ($m \\times m$, left singular vectors)</p>
            <p>• $\\Sigma$: Diagonal matrix (singular values, $\\sigma_i \\ge 0$)</p>
            <p>• $V^T$: Orthogonal matrix ($n \\times n$, right singular vectors)</p>
          </div>

          <p><strong>Rank of a Matrix:</strong> The rank of A is exactly equal to the number of non-zero singular values in $\\Sigma$.</p>

          <div class="example-box">
            <h4>Why It Matters in Data Science</h4>
            <p>Keeping only the top $k$ singular values (largest $\\sigma_i$) gives the best rank-$k$ approximation of A in the least-squares sense — this is the basis for PCA, image compression, and dimensionality reduction.</p>
          </div>

          <div class="def-box">
            <h4>Connection to PCA</h4>
            <p>Principal Component Analysis finds the eigenvectors of the covariance matrix $\\Sigma = \\frac{1}{n}X^TX$ (for centered data X); these are exactly the right singular vectors of X. The eigenvalues (squared singular values) give the variance captured along each principal direction.</p>
          </div>

          <div class="theorem-box">
            <h5>Condition Number</h5>
            <p>$$\\kappa(A) = \\frac{\\sigma_{max}}{\\sigma_{min}}$$</p>
            <p>A large condition number means A is "ill-conditioned" — small changes in input cause large changes in output, which is numerically unstable for solving $Ax=b$ or for gradient-based optimization (elongated loss landscapes).</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> SVD exists for <em>any</em> matrix (even non-square, non-invertible), unlike eigendecomposition which requires a square matrix. The eigenvectors of $A^TA$ are the right singular vectors of A.</p>
        `
      },
      {
        id: 'la-04',
        title: 'Matrix Operations & Determinants',
        content: `
          <div class="def-box">
            <h4>Matrix Multiplication</h4>
            <p>For $A$ ($m\\times n$) and $B$ ($n\\times p$), the product $AB$ is $m\\times p$, where element $(i,j) = \\sum_k A_{ik}B_{kj}$.</p>
            <p>Matrix multiplication is <strong>not commutative</strong>: $AB \\ne BA$ in general.</p>
          </div>

          <div class="theorem-box">
            <h5>Determinants</h5>
            <p>For a 2×2 matrix: $$\\det\\begin{pmatrix} a & b \\ c & d \\end{pmatrix} = ad - bc$$</p>
            <p>Properties:</p>
            <p>• $\\det(A) = 0 \\iff$ A is singular (not invertible)</p>
            <p>• $\\det(AB) = \\det(A)\\det(B)$</p>
            <p>• $\\det(A^T) = \\det(A)$</p>
          </div>

          <div class="example-box">
            <h4>Inverse via Determinant (2×2)</h4>
            <p>$$A^{-1} = \\frac{1}{\\det(A)}\\begin{pmatrix} d & -b \\ -c & a \\end{pmatrix}$$</p>
            <p>Exists only when $\\det(A) \\ne 0$.</p>
          </div>

          <div class="theorem-box">
            <h5>Rank-Nullity Theorem</h5>
            <p>For an $m \\times n$ matrix A: $$rank(A) + nullity(A) = n$$</p>
            <p>Rank = dimension of the column space (equivalently, row space). Nullity = dimension of the null space $\\{x : Ax=0\\}$. This directly tells you how many free variables exist when solving $Ax=0$.</p>
          </div>

          <div class="def-box">
            <h4>LU Decomposition</h4>
            <p>Factor $A = LU$ where L is lower-triangular (with 1s on the diagonal) and U is upper-triangular, obtained via Gaussian elimination. Solving $Ax=b$ becomes two easy triangular solves: $Ly=b$ then $Ux=y$ — much cheaper than computing $A^{-1}$ directly when solving for many different b's.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">⚠️ <strong>Common pitfall:</strong> $(AB)^{-1} = B^{-1}A^{-1}$, not $A^{-1}B^{-1}$ — the order flips, just like with transposes: $(AB)^T = B^TA^T$.</p>
        `
      },
      {
        id: 'la-05',
        title: 'Positive Definite Matrices & Quadratic Forms',
        content: `
          <div class="def-box">
            <h4>Quadratic Form</h4>
            <p>For symmetric matrix A, the quadratic form is $$Q(x) = x^T A x$$</p>
          </div>

          <div class="theorem-box">
            <h5>Positive Definiteness</h5>
            <p>A symmetric matrix A is <strong>positive definite</strong> if $x^T A x > 0$ for all $x \\ne 0$.</p>
            <p><strong>Equivalent test:</strong> all eigenvalues of A are strictly positive.</p>
            <p>Positive semi-definite allows eigenvalues $\\ge 0$ (matters heavily for covariance matrices and convex optimization).</p>
          </div>

          <div class="example-box">
            <h4>Why It Matters in ML</h4>
            <p>Covariance matrices are always positive semi-definite. A Hessian that is positive definite at a critical point confirms a local minimum — this connects Linear Algebra directly to Optimization.</p>
          </div>

          <div class="def-box">
            <h4>Cholesky Decomposition</h4>
            <p>Every symmetric positive definite matrix A can be factored as $$A = LL^T$$ where L is lower-triangular. This is roughly twice as fast as LU decomposition and is the standard way to solve linear systems and sample from multivariate Gaussians in practice.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> A fast test for a symmetric 2×2 matrix: it's positive definite iff both leading principal minors are positive, i.e. $a_{11} > 0$ and $\\det(A) > 0$ (Sylvester's criterion).</p>
        `
      }
    ],
    quiz: [
      {
        q: 'Are vectors [1,2] and [2,4] linearly independent?',
        opts: ['Yes', 'No', 'Cannot determine', 'Depends on context'],
        ans: 1,
        exp: '$[2,4] = 2\\cdot[1,2]$, so they are linearly dependent. Only the trivial combination gives zero if one vector is 0.'
      },
      {
        q: 'If Av = 5v, then 5 is:',
        opts: ['Determinant of A', 'Eigenvalue of A', 'Trace of A', 'Rank of A'],
        ans: 1,
        exp: 'By definition, if $Av = \\lambda v$, then $\\lambda$ is an eigenvalue. Here $\\lambda = 5$.'
      },
      {
        q: 'What is the maximum possible rank of a 4 × 7 matrix?',
        opts: ['4', '7', '11', '28'],
        ans: 0,
        exp: 'The rank of an $m \\times n$ matrix is bounded by $\\min(m, n)$. Thus, $\\min(4, 7) = 4$.'
      },
      {
        q: 'What does det(A) = 0 tell you about matrix A?',
        opts: ['A is symmetric', 'A is singular (non-invertible)', 'A is positive definite', 'A has all positive eigenvalues'],
        ans: 1,
        exp: 'A zero determinant means A has no inverse — it is singular, and at least one eigenvalue is 0.'
      },
      {
        q: 'A symmetric matrix A is positive definite if and only if:',
        opts: ['All entries of A are positive', 'All eigenvalues of A are positive', 'det(A) = 1', 'A is diagonal'],
        ans: 1,
        exp: 'Positive definiteness is characterized by every eigenvalue of the symmetric matrix being strictly greater than zero.'
      }
    ]
  },

  CO: {
    name: 'Calculus & Optimization',
    color: '#c792ea',
    lessons: [
      {
        id: 'co-01',
        title: 'Limits & Continuity',
        content: `
          <div class="def-box">
            <h4>Limit Definition</h4>
            <p>$$\\lim_{x \\to a} f(x) = L$$</p>
            <p>means: for every $\\epsilon > 0$, there exists $\\delta > 0$ such that $|x - a| < \\delta \\implies |f(x) - L| < \\epsilon$.</p>
          </div>

          <div class="theorem-box">
            <h5>Continuity</h5>
            <p>f is continuous at $a$ if: $$\\lim_{x \\to a} f(x) = f(a)$$</p>
            <p>No jumps, breaks, or holes at $a$.</p>
          </div>

          <div class="example-box">
            <h4>Indeterminate Forms</h4>
            <p>$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$$</p>
            <p>Direct substitution gives 0/0 (indeterminate). Handled via L'Hôpital's rule or Taylor series.</p>
          </div>

          <div class="def-box">
            <h4>Differentiability</h4>
            <p>$$f'(a) = \\lim_{h\\to 0} \\frac{f(a+h)-f(a)}{h}$$</p>
            <p>Differentiability at $a$ requires both one-sided derivatives to exist and be equal. <strong>Differentiability implies continuity</strong>, but not the other way — $f(x)=|x|$ is continuous but not differentiable at $x=0$ (a sharp corner).</p>
          </div>

          <div class="theorem-box">
            <h5>Intermediate Value Theorem (IVT)</h5>
            <p>If f is continuous on $[a,b]$ and $k$ is between $f(a)$ and $f(b)$, then some $c \\in [a,b]$ satisfies $f(c)=k$. This guarantees, for example, that a continuous function which is negative at one point and positive at another must cross zero somewhere in between — the basis of bisection root-finding.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> L'Hôpital's rule ($\\lim f/g = \\lim f'/g'$) only applies to 0/0 or ∞/∞ forms — check the indeterminate form first, or you'll get a wrong answer applying it blindly.</p>
        `
      },
      {
        id: 'co-02',
        title: 'Gradient Descent',
        content: `
          <div class="theorem-box">
            <h5>Gradient Descent</h5>
            <p>To minimize f(x), iterate: $$x_{t+1} = x_t - \\alpha \\nabla f(x_t)$$</p>
            <p>where $\\alpha$ is the learning rate and $\\nabla f$ is the gradient.</p>
          </div>

          <div class="example-box">
            <h4>1D Example</h4>
            <p>$f(x) = x^2 - 4x + 5$. Start $x_0 = 0$, learning rate $\\alpha = 0.1$.</p>
            <p>$\\nabla f = 2x - 4$. At $x_0 = 0$: $\\nabla f = -4$.</p>
            <p>$x_1 = 0 - 0.1\\cdot(-4) = 0.4$</p>
            <p>$x_2 = 0.4 - 0.1\\cdot(2\\cdot0.4 - 4) = 0.4 - 0.1\\cdot(-3.2) = 0.72$</p>
          </div>

          <div class="def-box">
            <h4>Variants of Gradient Descent</h4>
            <p><strong>Batch GD:</strong> uses the full dataset per step — accurate gradient, but slow per iteration.</p>
            <p><strong>Stochastic GD (SGD):</strong> uses one random sample per step — noisy but fast, and the noise can help escape shallow local minima.</p>
            <p><strong>Mini-batch GD:</strong> a middle ground — uses a small batch per step, the standard choice in deep learning.</p>
          </div>

          <div class="theorem-box">
            <h5>Momentum</h5>
            <p>Adds a fraction of the previous update to the current one, damping oscillations and accelerating convergence in consistent directions: $$v_{t+1} = \\beta v_t + \\nabla f(x_t), \\qquad x_{t+1} = x_t - \\alpha v_{t+1}$$</p>
            <p>This is the key idea behind more advanced optimizers like Adam, which combine momentum with per-parameter adaptive learning rates.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">⚠️ <strong>Common pitfall:</strong> Gradient descent moves in the direction of the <em>negative</em> gradient (steepest descent), not the gradient itself — forgetting the minus sign sends you uphill instead of downhill.</p>
        `
      },
      {
        id: 'co-03',
        title: 'Hessians',
        content: `
          <div class="theorem-box">
            <h5>Partial Derivatives & Gradient</h5>
            <p>For a function $f(x,y)$, the gradient $\\nabla f$ is a vector of its partial derivatives: $$\\nabla f = \\begin{bmatrix} \\frac{\\partial f}{\\partial x} \\ \\frac{\\partial f}{\\partial y} \\end{bmatrix}$$</p>
          </div>

          <div class="def-box">
            <h4>The Hessian Matrix</h4>
            <p>The Hessian H is the matrix of second-order partial derivatives. It describes local curvature.</p>
            <p>• If H is <strong>Positive Definite</strong> at a critical point, it is a local minimum.</p>
            <p>• If H is <strong>Negative Definite</strong>, it is a local maximum.</p>
            <p>• If H is <strong>Indefinite</strong> (mixed signs), it is a <strong>saddle point</strong>.</p>
          </div>

          <div class="example-box">
            <h4>2×2 Second Derivative Test</h4>
            <p>For $f(x,y)$ with $H = \\begin{pmatrix} f_{xx} & f_{xy} \\ f_{xy} & f_{yy} \\end{pmatrix}$, compute $D = f_{xx}f_{yy} - f_{xy}^2$ at a critical point.</p>
            <p>$D>0, f_{xx}>0$: local min. $D>0, f_{xx}<0$: local max. $D<0$: saddle point. $D=0$: test is inconclusive.</p>
          </div>

          <div class="def-box">
            <h4>Multivariable Chain Rule & Directional Derivative</h4>
            <p>If $z = f(x,y)$ with $x=x(t), y=y(t)$: $$\\frac{dz}{dt} = \\frac{\\partial f}{\\partial x}\\frac{dx}{dt} + \\frac{\\partial f}{\\partial y}\\frac{dy}{dt}$$</p>
            <p>This is exactly how gradients propagate through computation graphs in backpropagation. The <strong>directional derivative</strong> along unit vector $\\hat{u}$ is $\\nabla f \\cdot \\hat{u}$ — the gradient points in the direction of steepest ascent, and its magnitude is the maximum rate of increase.</p>
          </div>
        `
      },
      {
        id: 'co-04',
        title: 'Derivatives & Taylor Series',
        content: `
          <div class="def-box">
            <h4>Common Derivative Rules</h4>
            <p><strong>Chain Rule:</strong> $\\frac{d}{dx}f(g(x)) = f'(g(x))\\cdot g'(x)$</p>
            <p><strong>Product Rule:</strong> $(fg)' = f'g + fg'$</p>
          </div>

          <div class="theorem-box">
            <h5>Taylor Series</h5>
            <p>Approximate a function near point $a$ using derivatives at that point:</p>
            <p>$$f(x) \\approx f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + ...$$</p>
            <p>A first-order (linear) Taylor approximation is exactly the tangent line — this is the basis for gradient-based optimization.</p>
          </div>

          <div class="example-box">
            <h4>Why This Matters for ML</h4>
            <p>Newton's Method uses a second-order Taylor approximation (including the Hessian) to converge faster than plain gradient descent, at the cost of computing second derivatives.</p>
          </div>

          <div class="def-box">
            <h4>Taylor's Remainder</h4>
            <p>Truncating the series after $n$ terms leaves an error term $R_n(x)$ that shrinks as $x \\to a$ — the closer you are to the expansion point, the better a low-order approximation works. This is why gradient-based methods take small steps: the linear (first-order) approximation is only trustworthy locally.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> Newton's update is $x_{t+1} = x_t - [H(x_t)]^{-1}\\nabla f(x_t)$ — it converges quadratically near the optimum, but each step costs $O(n^3)$ to invert the Hessian, which is why gradient descent is preferred at scale.</p>
        `
      },
      {
        id: 'co-05',
        title: 'Convexity & Lagrange Multipliers',
        content: `
          <div class="def-box">
            <h4>Convex Functions</h4>
            <p>A function f is <strong>convex</strong> if the line segment between any two points on its graph lies above (or on) the graph.</p>
            <p><strong>Key property:</strong> Every local minimum of a convex function is a <strong>global</strong> minimum. This is why convexity is prized in ML loss functions.</p>
          </div>

          <div class="theorem-box">
            <h5>Lagrange Multipliers</h5>
            <p>To minimize $f(x)$ subject to constraint $g(x) = 0$, form the Lagrangian:</p>
            <p>$$\\mathcal{L}(x, \\lambda) = f(x) - \\lambda g(x)$$</p>
            <p>Solve $\\nabla_x \\mathcal{L} = 0$ and $\\nabla_\\lambda \\mathcal{L} = 0$ simultaneously.</p>
          </div>

          <div class="example-box">
            <h4>Application</h4>
            <p>SVMs use Lagrange multipliers to convert a constrained margin-maximization problem into an easier dual optimization problem.</p>
          </div>

          <div class="def-box">
            <h4>Convex Sets & Duality</h4>
            <p>A set S is <strong>convex</strong> if the line segment between any two points in S stays in S. Convex feasible regions + convex objective = a well-behaved (convex) optimization problem.</p>
            <p><strong>Weak duality:</strong> the dual problem's optimum is always a lower bound on the primal's optimum. <strong>Strong duality</strong> (which holds for convex problems satisfying Slater's condition) means the bound is tight — primal and dual optima coincide.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> KKT conditions extend Lagrange multipliers to inequality constraints ($g(x)\\le 0$), adding complementary slackness: $\\lambda_i g_i(x^*) = 0$ — either the constraint is active ($g_i=0$) or its multiplier is zero.</p>
        `
      }
    ],
    quiz: [
      {
        q: 'What is lim(x→0) (x²/x)?',
        opts: ['0', '1', 'undefined', '∞'],
        ans: 0,
        exp: 'For $x \\ne 0$, $x^2/x = x$. As $x\\to 0$, $x\\to 0$. The limit is 0 (the function is continuous there).'
      },
      {
        q: 'In gradient descent, if you increase learning rate α, what happens?',
        opts: ['Always converges faster', 'May diverge or oscillate', 'No change in convergence', 'Always converges slower'],
        ans: 1,
        exp: 'Too large $\\alpha$ causes overshooting. Too small $\\alpha$ converges slowly. There is an optimal range.'
      },
      {
        q: 'If the Hessian matrix evaluated at a critical point is positive definite, the point is a:',
        opts: ['Local Maximum', 'Local Minimum', 'Saddle Point', 'Cannot be determined'],
        ans: 1,
        exp: 'A positive definite Hessian implies the function curves upwards in all directions, confirming a local minimum.'
      },
      {
        q: 'Why do machine learning practitioners prefer convex loss functions?',
        opts: ['They train faster on GPUs', 'Any local minimum found is also the global minimum', 'They require no derivatives', 'They always give 100% accuracy'],
        ans: 1,
        exp: 'Convexity guarantees that optimization cannot get stuck in a bad local minimum — every local minimum is globally optimal.'
      },
      {
        q: 'Lagrange multipliers are used to solve which type of problem?',
        opts: ['Unconstrained maximization only', 'Constrained optimization problems', 'Sorting problems', 'Graph traversal problems'],
        ans: 1,
        exp: 'Lagrange multipliers convert a constrained optimization problem into a system of equations by introducing a multiplier for each constraint.'
      }
    ]
  },

  PDSA: {
    name: 'Programming, DSA',
    color: '#35d07f',
    lessons: [
      {
        id: 'pdsa-01',
        title: 'Time & Space Complexity',
        content: `
          <div class="def-box">
            <h4>Big-O Notation</h4>
            <p>f(n) is O(g(n)) if there exist constants c, n₀ such that $f(n) \\le c\\cdot g(n)$ for all $n \\ge n_0$.</p>
            <p><strong>Intuition:</strong> Describes worst-case growth rate, ignoring constants and lower-order terms.</p>
          </div>

          <div class="example-box">
            <h4>Common Complexities</h4>
            <p>$O(1)$ — constant (hash table lookup)</p>
            <p>$O(\\log n)$ — binary search</p>
            <p>$O(n)$ — linear search</p>
            <p>$O(n \\log n)$ — merge sort, quicksort (avg)</p>
            <p>$O(n^2)$ — bubble sort, nested loops</p>
          </div>

          <div class="theorem-box">
            <h5>Recurrence Relations & Master Theorem</h5>
            <p>Divide-and-conquer algorithms often have running time $T(n) = aT(n/b) + f(n)$ — a subproblems of size $n/b$, plus $f(n)$ work to combine.</p>
            <p>The <strong>Master Theorem</strong> compares $f(n)$ to $n^{\\log_b a}$: if $f(n) = O(n^{\\log_b a - \\epsilon})$, $T(n) = \\Theta(n^{\\log_b a})$; if $f(n) = \\Theta(n^{\\log_b a})$, $T(n) = \\Theta(n^{\\log_b a}\\log n)$; if $f(n)$ dominates, $T(n) = \\Theta(f(n))$.</p>
            <p>Example: Merge Sort has $T(n) = 2T(n/2) + O(n)$, giving $T(n) = \\Theta(n\\log n)$.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> $\\Theta$ (theta) means tight bound (upper and lower), $\\Omega$ (omega) means lower bound, $O$ (big-O) means upper bound. GATE often tests this distinction directly, not just growth rates.</p>
        `
      },
      {
        id: 'pdsa-02',
        title: 'Trees & Graphs',
        content: `
          <div class="def-box">
            <h4>Tree Definitions</h4>
            <p>A <strong>tree</strong> is a connected, acyclic graph with n nodes and n-1 edges.</p>
            <p><strong>Height:</strong> maximum distance from root to leaf.</p>
          </div>

          <p><strong>Graph traversals:</strong></p>
          <ul>
            <li><strong>BFS (breadth-first):</strong> $O(V + E)$, layer by layer, uses a queue</li>
            <li><strong>DFS (depth-first):</strong> $O(V + E)$, go deep first, uses a stack (or recursion)</li>
          </ul>

          <div class="example-box">
            <h4>Binary Search Tree (BST) Property</h4>
            <p>For every node, all keys in the left subtree are smaller and all keys in the right subtree are larger. In-order traversal of a BST visits nodes in sorted order — a classic GATE trap when asked to reconstruct a tree from a traversal sequence.</p>
          </div>

          <div class="def-box">
            <h4>Tree Traversals</h4>
            <p><strong>Pre-order</strong> (root, left, right), <strong>in-order</strong> (left, root, right), <strong>post-order</strong> (left, right, root) — all $O(n)$. A unique binary tree can be reconstructed from in-order + pre-order (or in-order + post-order), but <em>not</em> from pre-order + post-order alone.</p>
          </div>

          <div class="theorem-box">
            <h5>Graph Representations</h5>
            <p><strong>Adjacency matrix:</strong> $O(V^2)$ space, $O(1)$ edge lookup — good for dense graphs.</p>
            <p><strong>Adjacency list:</strong> $O(V+E)$ space, faster to iterate neighbors — good for sparse graphs, which is why BFS/DFS complexity is stated as $O(V+E)$ (assuming adjacency-list representation).</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> A balanced BST (AVL, Red-Black) keeps height $O(\\log n)$, so search/insert/delete are all $O(\\log n)$. An unbalanced BST can degrade to a linked list — $O(n)$ operations.</p>
        `
      },
      {
        id: 'pdsa-03',
        title: 'Dynamic Programming',
        content: `
          <div class="theorem-box">
            <h5>Core Concepts</h5>
            <p>Dynamic Programming (DP) simplifies complex problems by breaking them down into simpler sub-problems.</p>
            <p>Requires two properties:</p>
            <p>1. <strong>Optimal Substructure:</strong> Optimal solution to the problem contains optimal solutions to sub-problems.</p>
            <p>2. <strong>Overlapping Subproblems:</strong> Subproblems are repeated multiple times.</p>
          </div>

          <div class="example-box">
            <h4>Memoization vs Tabulation</h4>
            <p><strong>Memoization (Top-Down):</strong> Recursive approach that caches computed answers.</p>
            <p><strong>Tabulation (Bottom-Up):</strong> Iterative approach building a table from the smallest subproblems up to the final answer.</p>
          </div>

          <div class="example-box">
            <h4>Classic Example: 0/1 Knapsack</h4>
            <p>Given items with weights and values and a capacity W, the recurrence is:</p>
            <p>$$dp[i][w] = \\max(dp[i-1][w],\\ v_i + dp[i-1][w-w_i])$$</p>
            <p>either skip item i, or take it (if it fits) — building a table of size $O(nW)$ gives pseudo-polynomial time.</p>
          </div>

          <div class="def-box">
            <h4>Longest Common Subsequence (LCS) & Edit Distance</h4>
            <p><strong>LCS</strong> of strings X (length m), Y (length n): $$dp[i][j] = \\begin{cases} dp[i-1][j-1]+1 & X_i = Y_j \\\\ \\max(dp[i-1][j], dp[i][j-1]) & \\text{otherwise} \\end{cases}$$ solved in $O(mn)$.</p>
            <p><strong>Edit distance</strong> (Levenshtein) uses a similar table, considering insert/delete/substitute costs — the backbone of spell-checkers and diff tools.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> If a DP recurrence only depends on the previous row/column, you can often reduce space from $O(n^2)$ to $O(n)$ by keeping just the last row — a common "space-optimized DP" exam question.</p>
        `
      },
      {
        id: 'pdsa-04',
        title: 'Sorting Algorithms',
        content: `
          <div class="def-box">
            <h4>Comparison-Based Sorts</h4>
            <p><strong>Merge Sort:</strong> Divide-and-conquer, splits array in half, sorts, merges. $O(n \\log n)$ worst case, stable, needs $O(n)$ extra space.</p>
            <p><strong>Quick Sort:</strong> Picks a pivot, partitions around it. $O(n \\log n)$ average, but $O(n^2)$ worst case (bad pivot choice).</p>
          </div>

          <div class="theorem-box">
            <h5>Lower Bound for Comparison Sorts</h5>
            <p>Any comparison-based sorting algorithm requires at least $\\Omega(n \\log n)$ comparisons in the worst case — this is an information-theoretic lower bound.</p>
          </div>

          <div class="example-box">
            <h4>Non-Comparison Sorts</h4>
            <p><strong>Counting Sort</strong> and <strong>Radix Sort</strong> can achieve $O(n)$ or $O(nk)$ time by exploiting known structure in the input (e.g., bounded integer range), bypassing the comparison lower bound.</p>
          </div>

          <div class="def-box">
            <h4>Heap Sort & Quickselect</h4>
            <p><strong>Heap Sort:</strong> build a max-heap in $O(n)$, then repeatedly extract the max in $O(\\log n)$ — $O(n\\log n)$ worst case, in-place, but not stable.</p>
            <p><strong>Quickselect:</strong> a Quick-Sort variant that finds the k-th smallest element without fully sorting, by recursing into only one partition — $O(n)$ average time, $O(n^2)$ worst case, same pivot-choice sensitivity as Quick Sort.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> "Stable" means equal elements keep their relative order. Merge Sort and Insertion Sort are stable; standard in-place Quick Sort and Heap Sort are not — this matters when sorting by a secondary key.</p>
        `
      },
      {
        id: 'pdsa-05',
        title: 'Hashing',
        content: `
          <div class="def-box">
            <h4>Hash Tables</h4>
            <p>A hash function maps keys to array indices, giving average-case $O(1)$ insert, delete, and lookup.</p>
            <p><strong>Collision:</strong> Two keys mapping to the same index.</p>
          </div>

          <div class="theorem-box">
            <h5>Collision Resolution</h5>
            <p><strong>Chaining:</strong> Each bucket holds a linked list of colliding entries.</p>
            <p><strong>Open Addressing:</strong> On collision, probe for the next open slot (linear, quadratic, or double hashing).</p>
          </div>

          <div class="example-box">
            <h4>Worst Case</h4>
            <p>If all keys hash to the same bucket, lookup degrades to $O(n)$. A good hash function distributes keys uniformly to keep this rare.</p>
          </div>

          <div class="def-box">
            <h4>Beyond Basic Hashing</h4>
            <p><strong>Perfect hashing:</strong> for a static known key set, a two-level hashing scheme guarantees $O(1)$ worst-case lookup with no collisions.</p>
            <p><strong>Bloom filter:</strong> a space-efficient probabilistic structure that tests set membership — can have false positives but never false negatives, using multiple hash functions over a bit array.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> Load factor $\\alpha = n/m$ (entries / buckets). Keeping $\\alpha$ below ~0.7 and resizing (rehashing) when it's exceeded is what keeps average-case operations $O(1)$.</p>
        `
      }
    ],
    quiz: [
      {
        q: 'Binary search on sorted array has complexity:',
        opts: ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'],
        ans: 1,
        exp: 'Each iteration halves search space: $n \\to n/2 \\to n/4 \\to ... \\to 1$. That is $\\log_2 n$ steps.'
      },
      {
        q: 'How many edges in a tree with 7 nodes?',
        opts: ['6', '7', '8', 'Depends on shape'],
        ans: 0,
        exp: 'By definition, a tree with n nodes has exactly n-1 edges. So $7-1 = 6$.'
      },
      {
        q: 'The standard recursive Fibonacci function calculates fib(n) in O(2ⁿ) time. What is the time complexity when using Dynamic Programming?',
        opts: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
        ans: 0,
        exp: 'By storing the results (memoization/tabulation), each Fibonacci number from 1 to n is computed exactly once, making it $\\mathcal{O}(n)$.'
      },
      {
        q: 'What is the worst-case time complexity of Quick Sort?',
        opts: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'],
        ans: 2,
        exp: 'With a consistently poor pivot choice (e.g., already sorted array with a naive pivot rule), Quick Sort degrades to O(n²).'
      },
      {
        q: 'In a hash table using chaining, what happens on a collision?',
        opts: ['The insert operation fails', 'The new key overwrites the old one', 'The colliding entry is appended to a linked list at that bucket', 'The table is immediately resized'],
        ans: 2,
        exp: 'Chaining resolves collisions by storing all entries that hash to the same bucket in a linked list (or similar structure) at that index.'
      }
    ]
  },

  DBMS: {
    name: 'Database Management & Warehousing',
    color: '#ff8a5c',
    lessons: [
      {
        id: 'dbms-01',
        title: 'ER Model, Keys & Relational Model',
        content: `
          <div class="def-box">
            <h4>Entities, Relationships & Keys</h4>
            <p>An <strong>entity</strong> is a distinguishable real-world object; an <strong>entity set</strong> groups entities sharing the same attributes. A <strong>relationship</strong> associates two or more entities.</p>
            <p><strong>Super key:</strong> any attribute set that uniquely identifies a tuple. <strong>Candidate key:</strong> a minimal super key. <strong>Primary key:</strong> the chosen candidate key. <strong>Foreign key:</strong> an attribute referencing the primary key of another relation.</p>
          </div>

          <div class="example-box">
            <h4>Cardinality & Participation</h4>
            <p>Relationship cardinality (1:1, 1:N, M:N) controls how mapping constraints translate into foreign keys during ER-to-relational mapping.</p>
            <p>Total participation means every entity instance must appear in the relationship (drawn with a double line in ER diagrams).</p>
          </div>

          <p><strong>Mapping ER to relations:</strong></p>
          <ul>
            <li>Strong entity → its own table with its key</li>
            <li>Weak entity → table includes owner's key as part of a composite key</li>
            <li>M:N relationship → its own table holding both foreign keys</li>
            <li>1:N relationship → foreign key placed on the "many" side</li>
          </ul>

          <div class="def-box">
            <h4>Specialization & Generalization</h4>
            <p><strong>Specialization:</strong> top-down — divide an entity into subtypes (e.g., Employee → Manager, Engineer) with distinct attributes.</p>
            <p><strong>Generalization:</strong> bottom-up — combine common attributes of similar entities into a supertype. <strong>Disjoint</strong> means an entity belongs to at most one subtype; <strong>overlapping</strong> allows membership in multiple; <strong>total</strong> means every supertype instance must belong to some subtype.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> A weak entity has no candidate key of its own and depends on an "identifying" strong entity for its primary key — drawn with a double rectangle in ER diagrams.</p>
        `
      },
      {
        id: 'dbms-02',
        title: 'Relational Algebra & SQL',
        content: `
          <div class="def-box">
            <h4>Core Relational Algebra Operators</h4>
            <p>$\\sigma_{cond}(R)$ — selection (filter rows). $\\pi_{attrs}(R)$ — projection (filter columns).</p>
            <p>$R \\bowtie S$ — natural join. $R \\times S$ — Cartesian product. $R \\cup S$, $R \\cap S$, $R - S$ — set operators (require union-compatible schemas).</p>
          </div>

          <div class="theorem-box">
            <h5>Join Types</h5>
            <p><strong>Inner join:</strong> keeps only matching rows from both sides.</p>
            <p><strong>Left/Right outer join:</strong> keeps all rows from one side, padding unmatched columns with NULL.</p>
            <p><strong>Full outer join:</strong> keeps all rows from both sides.</p>
          </div>

          <div class="example-box">
            <h4>SQL Execution Order (Conceptual)</h4>
            <p>$$FROM \\to WHERE \\to GROUP\\,BY \\to HAVING \\to SELECT \\to ORDER\\,BY$$</p>
            <p>This is why aggregate aliases from SELECT can't be used inside WHERE, but can be used in ORDER BY.</p>
          </div>

          <div class="def-box">
            <h4>Common SQL Patterns</h4>
            <p><strong>Aggregate + group:</strong> <code>SELECT dept, COUNT(*) FROM emp GROUP BY dept HAVING COUNT(*) > 5</code></p>
            <p><strong>Correlated subquery:</strong> <code>SELECT name FROM emp e WHERE salary > (SELECT AVG(salary) FROM emp WHERE dept = e.dept)</code> — the inner query re-evaluates per outer row.</p>
            <p><strong>Set membership:</strong> <code>IN</code>, <code>EXISTS</code>, and <code>NOT EXISTS</code> are common ways to express "for all"/"there exists" style relational-algebra queries in SQL.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">⚠️ <strong>Common pitfall:</strong> WHERE filters rows before grouping; HAVING filters groups after aggregation. Using an aggregate function like COUNT(*) inside WHERE is a syntax error — it belongs in HAVING.</p>
        `
      },
      {
        id: 'dbms-03',
        title: 'Functional Dependencies & Normalization',
        content: `
          <div class="def-box">
            <h4>Functional Dependency</h4>
            <p>$X \\to Y$ means: for any two tuples agreeing on X, they must agree on Y. X is the determinant.</p>
            <p><strong>Closure $X^+$:</strong> the set of all attributes functionally determined by X, computed using Armstrong's axioms (reflexivity, augmentation, transitivity).</p>
          </div>

          <div class="theorem-box">
            <h5>Normal Forms</h5>
            <p><strong>1NF:</strong> all attribute values are atomic.</p>
            <p><strong>2NF:</strong> 1NF, and no non-prime attribute is partially dependent on a candidate key.</p>
            <p><strong>3NF:</strong> 2NF, and no non-prime attribute is transitively dependent on a candidate key.</p>
            <p><strong>BCNF:</strong> for every non-trivial $X \\to Y$, X must be a super key (stricter than 3NF).</p>
          </div>

          <div class="example-box">
            <h4>Why Normalize?</h4>
            <p>Normalization removes redundancy and prevents insertion, update, and deletion anomalies by decomposing relations based on their functional dependencies.</p>
          </div>

          <div class="example-box">
            <h4>Worked Example: 2NF Violation</h4>
            <p>Relation $Enroll(StudentID, CourseID, StudentName, Grade)$ with key $(StudentID, CourseID)$. Since $StudentID \\to StudentName$ depends on only <em>part</em> of the key, this is a partial dependency — violates 2NF. Fix: split into $Student(StudentID, StudentName)$ and $Enroll(StudentID, CourseID, Grade)$.</p>
          </div>

          <div class="def-box">
            <h4>Decomposition Properties</h4>
            <p><strong>Lossless-join decomposition:</strong> joining the decomposed relations back together must reproduce exactly the original relation (no spurious tuples) — guaranteed if the common attribute is a key in at least one of the two relations.</p>
            <p><strong>Dependency-preserving decomposition:</strong> every original functional dependency can still be checked without needing to join relations back together. BCNF always guarantees lossless-join, but may sacrifice dependency preservation — 3NF guarantees both, which is why 3NF is often preferred in practice.</p>
          </div>
        `
      },
      {
        id: 'dbms-04',
        title: 'Transactions, ACID & Concurrency Control',
        content: `
          <div class="def-box">
            <h4>ACID Properties</h4>
            <p><strong>Atomicity:</strong> a transaction is all-or-nothing. <strong>Consistency:</strong> a transaction moves the DB between valid states. <strong>Isolation:</strong> concurrent transactions appear to run serially. <strong>Durability:</strong> committed changes survive failures.</p>
          </div>

          <div class="theorem-box">
            <h5>Serializability</h5>
            <p>A schedule is <strong>conflict-serializable</strong> if its precedence graph (built from conflicting read/write operations) is acyclic — equivalent to some serial execution order.</p>
          </div>

          <div class="example-box">
            <h4>Locking Protocols</h4>
            <p><strong>Two-Phase Locking (2PL):</strong> a transaction acquires all locks before releasing any (growing phase, then shrinking phase). Strict 2PL holds all locks until commit, avoiding cascading rollbacks.</p>
          </div>

          <div class="def-box">
            <h4>Deadlocks</h4>
            <p>A deadlock occurs when transactions wait on each other in a cycle. <strong>Detection:</strong> build a wait-for graph and check for cycles periodically. <strong>Prevention:</strong> enforce a strict lock-acquisition ordering, or use timestamp-based schemes (wait-die / wound-wait).</p>
          </div>

          <div class="theorem-box">
            <h5>SQL Isolation Levels</h5>
            <p>From weakest to strongest: <strong>Read Uncommitted</strong> (allows dirty reads) → <strong>Read Committed</strong> → <strong>Repeatable Read</strong> (prevents non-repeatable reads) → <strong>Serializable</strong> (prevents phantom reads too). Stronger isolation reduces concurrency anomalies at the cost of throughput.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">⚠️ <strong>Common pitfall:</strong> Serializability guarantees correctness, not that transactions ran in the order you'd expect — a "conflict-serializable" schedule may be equivalent to a serial order that's different from the actual interleaving.</p>
        `
      },
      {
        id: 'dbms-05',
        title: 'Indexing, Query Optimization & Data Warehousing',
        content: `
          <div class="def-box">
            <h4>Indexes</h4>
            <p><strong>B+ tree index:</strong> balanced, sorted, supports range queries in $O(\\log n)$; all data pointers live in leaf nodes, which are linked for fast range scans.</p>
            <p><strong>Hash index:</strong> $O(1)$ average lookup for equality, but no support for range queries.</p>
            <p><strong>Clustered vs. non-clustered:</strong> a clustered index determines the physical row order (at most one per table); a table can have many non-clustered indexes.</p>
          </div>

          <div class="theorem-box">
            <h5>Query Optimization</h5>
            <p>An optimizer estimates cost (I/O, CPU) across equivalent query plans — reordering joins, pushing selections down, and choosing access paths (index scan vs. full scan) — to pick the cheapest plan.</p>
          </div>

          <div class="example-box">
            <h4>Data Warehousing Basics</h4>
            <p><strong>OLTP</strong> systems handle frequent small transactions (normalized schemas); <strong>OLAP</strong> systems handle analytical queries over historical data.</p>
            <p>A <strong>star schema</strong> has one central fact table (measures) linked to denormalized dimension tables, optimized for fast aggregation over a <strong>snowflake schema</strong>'s normalized dimensions.</p>
          </div>

          <div class="def-box">
            <h4>ETL: Extract, Transform, Load</h4>
            <p>The pipeline that populates a data warehouse: <strong>Extract</strong> data from operational (OLTP) sources, <strong>Transform</strong> it (cleaning, deduplication, format conversion, aggregation), and <strong>Load</strong> it into the warehouse's fact/dimension tables — typically run on a schedule rather than in real time.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> OLAP operations — roll-up (aggregate to a coarser level), drill-down (the reverse), slice (fix one dimension), and dice (filter on multiple dimensions) — are common vocabulary questions.</p>
        `
      }
    ],
    quiz: [
      {
        q: 'Which key is a minimal super key that uniquely identifies a tuple?',
        opts: ['Foreign key', 'Candidate key', 'Composite key', 'Alternate key'],
        ans: 1,
        exp: 'A candidate key is a super key with no redundant attributes — removing any attribute breaks uniqueness.'
      },
      {
        q: 'In standard SQL execution order, which clause is evaluated immediately before SELECT?',
        opts: ['WHERE', 'FROM', 'HAVING', 'ORDER BY'],
        ans: 2,
        exp: 'Conceptual order is FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY, so HAVING runs right before SELECT.'
      },
      {
        q: 'A relation in 3NF has a non-trivial FD X → Y where X is not a super key, but Y is a prime attribute. Is it in BCNF?',
        opts: ['Yes, always', 'No, this violates BCNF', 'Only if X is a candidate key', 'Cannot be determined'],
        ans: 1,
        exp: 'BCNF requires every non-trivial FD to have a super key as its determinant, regardless of whether Y is prime — this is exactly the gap that separates 3NF from BCNF.'
      },
      {
        q: 'Strict Two-Phase Locking primarily guarantees:',
        opts: ['Deadlock-freedom', 'Conflict-serializability and avoids cascading rollbacks', 'Faster transaction throughput than no locking', 'Atomicity alone'],
        ans: 1,
        exp: 'Strict 2PL ensures conflict-serializable schedules and, by holding locks until commit, prevents other transactions from reading uncommitted data (avoiding cascading rollbacks). It does not by itself prevent deadlocks.'
      },
      {
        q: 'Which index structure is best suited for range queries like "salary BETWEEN 40000 AND 60000"?',
        opts: ['Hash index', 'B+ tree index', 'Bitmap on a single unique column', 'No index needed'],
        ans: 1,
        exp: 'B+ tree indexes keep keys sorted with linked leaf nodes, making range scans efficient. Hash indexes only support equality lookups.'
      }
    ]
  },

  ML: {
    name: 'Machine Learning',
    color: '#ff6b46',
    lessons: [
      {
        id: 'ml-01',
        title: 'Supervised Learning',
        content: `
          <div class="def-box">
            <h4>Supervised Learning</h4>
            <p>Given labeled data $\{(x_i, y_i)\}$, learn a function f such that $f(x) \\approx y$.</p>
            <p><strong>Regression:</strong> y is continuous</p>
            <p><strong>Classification:</strong> y is discrete</p>
          </div>

          <div class="theorem-box">
            <h5>Loss Functions</h5>
            <p><strong>Regression:</strong> Mean Squared Error = $$\\frac{1}{n}\\sum (y_i - \\hat{y}_i)^2$$</p>
            <p><strong>Classification:</strong> Cross-entropy = $$-\\sum y_i \\log(\\hat{y}_i)$$</p>
          </div>

          <p><strong>Bias-Variance tradeoff:</strong> MSE = Bias² + Variance + Irreducible Error</p>

          <div class="def-box">
            <h4>Linear Regression: Closed Form</h4>
            <p>For $\\hat{y} = X\\beta$, minimizing MSE has a closed-form solution (the normal equation): $$\\beta = (X^TX)^{-1}X^Ty$$</p>
            <p>Works when $X^TX$ is invertible (features not perfectly collinear); otherwise use gradient descent or add regularization (Ridge) to make it invertible.</p>
          </div>

          <div class="theorem-box">
            <h5>R² (Coefficient of Determination)</h5>
            <p>$$R^2 = 1 - \\frac{\\sum(y_i-\\hat{y}_i)^2}{\\sum(y_i-\\bar{y})^2}$$</p>
            <p>Measures the fraction of variance in y explained by the model. $R^2=1$: perfect fit. $R^2=0$: no better than predicting the mean. Can be negative if the model is worse than the mean baseline.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> High bias → underfitting (too simple a model, high train <em>and</em> test error). High variance → overfitting (fits training noise, low train error but high test error).</p>
        `
      },
      {
        id: 'ml-02',
        title: 'Logistic Regression & SVM',
        content: `
          <div class="def-box">
            <h4>Logistic Regression</h4>
            <p>Model probability of class 1: $$p = \\frac{1}{1 + e^{-(\\beta_0 + \\beta_1 x)}}$$</p>
            <p>Decision boundary at $p = 0.5$.</p>
          </div>

          <div class="def-box">
            <h4>Support Vector Machine (SVM)</h4>
            <p>Find hyperplane with maximum <strong>margin</strong> between classes.</p>
            <p>Margin = distance from hyperplane to nearest point.</p>
            <p>Kernel trick allows non-linear decision boundaries.</p>
          </div>

          <div class="example-box">
            <h4>Support Vectors & Soft Margin</h4>
            <p>Only the points closest to the boundary ("support vectors") determine the hyperplane — moving other points doesn't change it. A <strong>soft margin</strong> (with slack variables) allows some misclassification, trading margin width for tolerance to noisy/overlapping data.</p>
          </div>

          <div class="def-box">
            <h4>Kernel Functions</h4>
            <p>The kernel trick computes dot products in a high-dimensional feature space without explicitly mapping to it: $K(x,y) = \\phi(x)\\cdot\\phi(y)$.</p>
            <p><strong>Linear:</strong> $K(x,y)=x\\cdot y$. <strong>Polynomial:</strong> $K(x,y)=(x\\cdot y + c)^d$. <strong>RBF (Gaussian):</strong> $K(x,y)=e^{-\\gamma\\|x-y\\|^2}$ — maps to infinite dimensions, very flexible for non-linear boundaries.</p>
          </div>

          <div class="theorem-box">
            <h5>Softmax for Multi-Class</h5>
            <p>Generalizes logistic regression to K classes: $$P(y=k|x) = \\frac{e^{z_k}}{\\sum_{j=1}^K e^{z_j}}$$</p>
            <p>Converts raw scores into a probability distribution that sums to 1 — paired with cross-entropy loss for multi-class classification.</p>
          </div>
        `
      },
      {
        id: 'ml-03',
        title: 'Clustering',
        content: `
          <div class="theorem-box">
            <h5>K-Means Clustering</h5>
            <p>Goal: Partition data into K distinct, non-overlapping clusters.</p>
            <p><strong>Algorithm:</strong></p>
            <ol>
              <li>Randomly initialize K cluster centroids.</li>
              <li>Assign each data point to the nearest centroid.</li>
              <li>Update centroids by calculating the mean of all points assigned to that cluster.</li>
              <li>Repeat until convergence.</li>
            </ol>
          </div>
          
          <p><strong>Optimization objective:</strong> Minimize the Within-Cluster Sum of Squares (WCSS).</p>

          <div class="def-box">
            <h4>Hierarchical Clustering & DBSCAN</h4>
            <p><strong>Agglomerative hierarchical clustering:</strong> starts with every point as its own cluster and repeatedly merges the closest pair, producing a dendrogram — no need to pre-specify K, but $O(n^2\\log n)$ or worse.</p>
            <p><strong>DBSCAN:</strong> groups points that are densely packed together, marking sparse points as noise/outliers. Unlike K-Means, it can find arbitrarily shaped clusters and doesn't require specifying K in advance.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">⚠️ <strong>Common pitfall:</strong> K-Means converges to a local optimum, not a global one — different random initializations can give different clusters. K-Means++ improves initialization, and the "elbow method" (plotting WCSS vs. K) helps choose K.</p>
        `
      },
      {
        id: 'ml-04',
        title: 'Decision Trees & Ensembles',
        content: `
          <div class="def-box">
            <h4>Decision Trees</h4>
            <p>Split data recursively on features that best separate classes, measured by <strong>Information Gain</strong> or <strong>Gini Impurity</strong>.</p>
            <p>$$Gini = 1 - \\sum_i p_i^2$$</p>
            <p>Prone to overfitting if grown too deep — controlled with max depth or pruning.</p>
          </div>

          <div class="theorem-box">
            <h5>Ensemble Methods</h5>
            <p><strong>Bagging (Random Forest):</strong> Train many trees on bootstrapped samples, average predictions. Reduces <strong>variance</strong>.</p>
            <p><strong>Boosting (AdaBoost, Gradient Boosting):</strong> Train trees sequentially, each correcting the previous one's errors. Reduces <strong>bias</strong>.</p>
          </div>

          <div class="def-box">
            <h4>Feature Importance & Out-of-Bag Error</h4>
            <p><strong>Feature importance</strong> in tree ensembles is typically measured by the total reduction in impurity (Gini/entropy) a feature contributes across all splits, averaged over trees.</p>
            <p><strong>Out-of-bag (OOB) error:</strong> since bagging trains each tree on a bootstrap sample (~63% of data), the remaining ~37% ("out-of-bag") can be used as a free validation set per tree — giving an unbiased error estimate without a separate holdout set.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> Gini impurity and entropy both measure node "purity" and give similar trees, but Gini is cheaper to compute (no logarithm) — that's why CART uses Gini by default while ID3/C4.5 use entropy/information gain.</p>
        `
      },
      {
        id: 'ml-05',
        title: 'Model Evaluation & Regularization',
        content: `
          <div class="def-box">
            <h4>Evaluation Metrics</h4>
            <p><strong>Precision:</strong> $\\frac{TP}{TP+FP}$ — of predicted positives, how many were correct.</p>
            <p><strong>Recall:</strong> $\\frac{TP}{TP+FN}$ — of actual positives, how many were found.</p>
            <p><strong>F1-Score:</strong> Harmonic mean of precision and recall.</p>
          </div>

          <div class="theorem-box">
            <h5>Regularization</h5>
            <p><strong>L1 (Lasso):</strong> adds $\\lambda\\sum|\\theta_i|$ to loss. Encourages sparsity (some weights become exactly 0).</p>
            <p><strong>L2 (Ridge):</strong> adds $\\lambda\\sum\\theta_i^2$ to loss. Shrinks weights smoothly, discourages extreme values.</p>
          </div>

          <div class="example-box">
            <h4>Cross-Validation</h4>
            <p>K-Fold CV splits data into K parts, trains on K-1 folds, validates on the remaining fold, and rotates — giving a more robust estimate of generalization than a single train/test split.</p>
          </div>

          <div class="def-box">
            <h4>ROC Curve & AUC</h4>
            <p>The ROC curve plots True Positive Rate (Recall) against False Positive Rate at every possible classification threshold. <strong>AUC</strong> (area under the curve) summarizes performance across all thresholds — AUC = 0.5 is random guessing, AUC = 1.0 is a perfect classifier, making it threshold-independent unlike accuracy or F1.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">⚠️ <strong>Common pitfall:</strong> Accuracy is misleading on imbalanced datasets (e.g., 99% negative class) — a model that always predicts "negative" scores 99% accuracy but 0% recall. Use precision, recall, F1, or AUC-ROC instead.</p>
        `
      }
    ],
    quiz: [
      {
        q: 'In logistic regression, P(y=1|x) = 1/(1+e^(-z)). When z = 0, P(y=1) =',
        opts: ['0', '0.5', '1', 'undefined'],
        ans: 1,
        exp: '$P = 1/(1+e^0) = 1/(1+1) = 1/2 = 0.5$'
      },
      {
        q: 'SVM finds a hyperplane. Its key advantage is:',
        opts: ['Always fast', 'Maximizes margin (robustness)', 'Works only for 2D data', 'No overfitting possible'],
        ans: 1,
        exp: 'Large margin = more robust to noise. The margin is central to SVM generalization.'
      },
      {
        q: 'Which of the following describes the objective of the K-Means algorithm?',
        opts: ['Maximize distance between data points within a cluster', 'Find the hyperplane with the largest margin', 'Minimize the variance within each cluster (WCSS)', 'Estimate the probability of a data point belonging to a class'],
        ans: 2,
        exp: 'K-Means aims to minimize the Within-Cluster Sum of Squares (WCSS), effectively minimizing the variance inside each cluster.'
      },
      {
        q: 'Random Forest (bagging) primarily helps reduce which source of error?',
        opts: ['Bias', 'Variance', 'Irreducible error', 'Learning rate'],
        ans: 1,
        exp: 'By averaging many trees trained on different bootstrapped samples, bagging reduces variance without significantly increasing bias.'
      },
      {
        q: 'L1 regularization (Lasso) is often preferred when you want:',
        opts: ['Smooth shrinkage of all weights', 'Sparse solutions with some weights exactly zero', 'Faster matrix multiplication', 'Guaranteed convexity'],
        ans: 1,
        exp: 'The L1 penalty\'s geometry tends to push some coefficients exactly to zero, effectively performing feature selection.'
      }
    ]
  },

  AI: {
    name: 'Artificial Intelligence',
    color: '#f6c445',
    lessons: [
      {
        id: 'ai-01',
        title: 'Search Algorithms',
        content: `
          <div class="def-box">
            <h4>Uninformed Search</h4>
            <p><strong>BFS:</strong> explores level by level using a queue. $O(b^d)$ time and space. Optimal for unweighted graphs (finds shortest path in fewest edges).</p>
            <p><strong>DFS:</strong> explores deep first using a stack/recursion. $O(b^m)$ time, but only $O(bm)$ space — much cheaper memory-wise, but not optimal and can get stuck down an infinite branch.</p>
            <p><strong>Uniform Cost Search (UCS):</strong> like BFS but expands the node with lowest cumulative path cost $g(n)$ — optimal for weighted graphs with non-negative edge costs.</p>
          </div>

          <div class="theorem-box">
            <h5>Informed Search</h5>
            <p><strong>Greedy Best-First Search:</strong> expands the node that looks closest to the goal, using only $h(n)$. Fast but not optimal.</p>
            <p><strong>A* Search:</strong> uses both path cost so far and a heuristic to guide exploration.</p>
            <p>$$f(n) = g(n) + h(n)$$</p>
            <p>where g(n) = cost so far, h(n) = estimated cost to goal.</p>
            <p><strong>Admissibility:</strong> $h(n) \\le \\text{actual cost}$ guarantees A* finds the optimal path. <strong>Consistency</strong> (monotonicity): $h(n) \\le cost(n,n') + h(n')$ for every neighbor — a stronger condition that also guarantees optimality and avoids re-expanding nodes.</p>
          </div>

          <div class="example-box">
            <h4>Classic Heuristic: 8-Puzzle</h4>
            <p>A common admissible heuristic is the number of misplaced tiles, or better, the sum of Manhattan distances of each tile from its goal position — both never overestimate the true number of moves needed.</p>
          </div>

          <div class="def-box">
            <h4>Iterative Deepening & Bidirectional Search</h4>
            <p><strong>Iterative Deepening DFS (IDDFS):</strong> runs DFS with increasing depth limits (1, 2, 3, ...) — combines DFS's $O(bm)$ space with BFS's optimality/completeness for unweighted graphs.</p>
            <p><strong>Bidirectional search:</strong> simultaneously searches forward from the start and backward from the goal, meeting in the middle — reduces the effective search from $O(b^d)$ to roughly $O(b^{d/2})$.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> A stronger (larger, but still admissible) heuristic expands fewer nodes than a weaker one, while both remain optimal — this is the basis of "heuristic dominance" questions.</p>
        `
      },
      {
        id: 'ai-02',
        title: 'Logic',
        content: `
          <div class="def-box">
            <h4>Propositional Logic</h4>
            <p>Operators: $\\neg$ (not), $\\wedge$ (and), $\\vee$ (or), $\\rightarrow$ (implies), $\\leftrightarrow$ (iff)</p>
            <p><strong>Key equivalence:</strong> $A \\rightarrow B \\equiv \\neg A \\vee B$ — implication is false only when A is true and B is false.</p>
          </div>

          <div class="theorem-box">
            <h5>Satisfiability, Validity & Entailment</h5>
            <p>A sentence is <strong>satisfiable</strong> if some model makes it true, <strong>valid</strong> (a tautology) if it's true in every model, and <strong>unsatisfiable</strong> if no model makes it true.</p>
            <p>KB <strong>entails</strong> $\\alpha$ (written $KB \\models \\alpha$) if $\\alpha$ is true in every model where KB is true — equivalently, $KB \\wedge \\neg\\alpha$ is unsatisfiable (this is the basis of proof-by-refutation and resolution).</p>
          </div>

          <div class="def-box">
            <h4>First-Order Logic (FOL)</h4>
            <p>Extends propositional logic with objects, relations, functions, and quantifiers — far more expressive.</p>
            <p>$\\forall x$ ("for all x") and $\\exists x$ ("there exists an x") are quantifiers. De Morgan's-style duality: $\\neg \\forall x\\, P(x) \\equiv \\exists x\\, \\neg P(x)$.</p>
          </div>

          <div class="example-box">
            <h4>Translating English to FOL</h4>
            <p>"All students are hardworking" → $\\forall x\\, (Student(x) \\rightarrow Hardworking(x))$.</p>
            <p>"Some students like AI" → $\\exists x\\, (Student(x) \\wedge Likes(x, AI))$.</p>
          </div>

          <div class="theorem-box">
            <h5>Resolution & Unification</h5>
            <p><strong>Resolution</strong> is a sound, complete inference rule for clauses in CNF: from $(A \\vee B)$ and $(\\neg B \\vee C)$, derive $(A \\vee C)$. Proof by refutation adds $\\neg\\alpha$ to KB and derives a contradiction (the empty clause) to prove $KB \\models \\alpha$.</p>
            <p><strong>Unification</strong> finds a substitution that makes two first-order expressions identical (e.g., unifying $Likes(x, AI)$ with $Likes(John, AI)$ gives $\\{x/John\\}$) — essential for applying resolution in FOL.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">⚠️ <strong>Common pitfall:</strong> Universal statements pair with $\\rightarrow$, existential statements pair with $\\wedge$ — swapping these is the single most common FOL translation mistake.</p>
        `
      },
      {
        id: 'ai-03',
        title: 'Bayesian Networks',
        content: `
          <div class="theorem-box">
            <h5>The Markov Condition</h5>
            <p>In a Bayesian Network, a node is conditionally independent of its non-descendants, given its parents.</p>
            <p>Joint Probability Factorization: $$P(X_1, ..., X_n) = \\prod_{i=1}^n P(X_i | \\text{Parents}(X_i))$$</p>
          </div>

          <div class="example-box">
            <h4>Example Application</h4>
            <p>Modeling medical diagnosis: <em>Genetics</em> and <em>Diet</em> (Parents) influence <em>Heart Disease</em> (Child), which influences <em>Chest Pain</em> (Descendant).</p>
          </div>

          <div class="def-box">
            <h4>Exact vs. Approximate Inference</h4>
            <p><strong>Variable elimination</strong> computes exact posterior probabilities by summing out irrelevant variables one at a time, reusing intermediate "factors" — exact but can be exponential for densely connected networks.</p>
            <p><strong>Sampling methods</strong> (rejection sampling, likelihood weighting, Gibbs sampling / MCMC) approximate the answer by generating samples consistent with the evidence — scales better for large or densely connected networks, at the cost of exactness.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> A node's <strong>Markov blanket</strong> — its parents, children, and children's other parents — is the minimal set that makes it conditionally independent of every other node in the network.</p>
        `
      },
      {
        id: 'ai-04',
        title: 'Adversarial Search',
        content: `
          <div class="def-box">
            <h4>Minimax Algorithm</h4>
            <p>Used in two-player zero-sum games. The <strong>MAX</strong> player tries to maximize the score, the <strong>MIN</strong> player tries to minimize it, recursively exploring the game tree.</p>
          </div>

          <div class="theorem-box">
            <h5>Alpha-Beta Pruning</h5>
            <p>An optimization of Minimax that prunes branches which cannot influence the final decision, without changing the result.</p>
            <p>• $\\alpha$ = best value MAX can guarantee so far</p>
            <p>• $\\beta$ = best value MIN can guarantee so far</p>
            <p>Prune when $\\alpha \\ge \\beta$. In the best case, this reduces the effective branching factor from $b$ to $\\sqrt{b}$.</p>
          </div>

          <div class="example-box">
            <h4>Why It Matters</h4>
            <p>Alpha-Beta pruning is what makes deep game-tree search (chess, Go) computationally feasible despite an enormous branching factor.</p>
          </div>

          <div class="def-box">
            <h4>Expectimax for Stochastic Games</h4>
            <p>When outcomes involve chance (dice rolls, card draws), replace MIN nodes with <strong>chance nodes</strong> that take a probability-weighted average of children's values instead of the minimum: $$Expectimax(n) = \\sum_i P(i)\\cdot value(child_i)$$</p>
            <p>Unlike Minimax, Alpha-Beta pruning generally doesn't apply cleanly to chance nodes, since a single unexplored branch can still shift the expected value.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> Move ordering matters — exploring the best moves first maximizes pruning. In the best case (perfect ordering), Alpha-Beta explores $O(b^{d/2})$ nodes instead of Minimax's $O(b^d)$.</p>
        `
      },
      {
        id: 'ai-05',
        title: 'Constraint Satisfaction Problems',
        content: `
          <div class="def-box">
            <h4>CSP Definition</h4>
            <p>A CSP consists of:</p>
            <p>• <strong>Variables:</strong> $X_1, ..., X_n$</p>
            <p>• <strong>Domains:</strong> possible values for each variable</p>
            <p>• <strong>Constraints:</strong> restrictions on which combinations of values are allowed</p>
          </div>

          <div class="theorem-box">
            <h5>Solving Techniques</h5>
            <p><strong>Backtracking Search:</strong> assign variables one at a time, backtrack on constraint violation.</p>
            <p><strong>Arc Consistency (AC-3):</strong> prunes domains before/during search by ensuring every value in one variable's domain has a compatible value in a neighbor's domain.</p>
          </div>

          <div class="example-box">
            <h4>Classic Example</h4>
            <p>Map coloring: variables are regions, domain is a set of colors, constraint is that adjacent regions must differ. Sudoku is also a CSP.</p>
          </div>

          <div class="def-box">
            <h4>Local Search for CSPs</h4>
            <p><strong>Hill Climbing:</strong> start with a complete (possibly invalid) assignment, repeatedly change one variable's value to reduce the number of conflicts — fast but can get stuck at local optima.</p>
            <p><strong>Simulated Annealing:</strong> like hill climbing, but occasionally accepts a worse move (with probability that decreases over time via a "temperature" schedule) to escape local optima.</p>
            <p><strong>Min-Conflicts heuristic:</strong> when reassigning a variable, choose the value that minimizes conflicts with other assigned variables — surprisingly effective for large CSPs like million-queens.</p>
          </div>

          <p style="margin-top: 4px; color: var(--muted);">💡 <strong>Exam tip:</strong> Heuristics speed up backtracking: <strong>MRV</strong> (minimum remaining values) picks the most-constrained variable next, and <strong>LCV</strong> (least constraining value) tries the value that rules out the fewest options for neighbors.</p>
        `
      }
    ],
    quiz: [
      {
        q: 'In BFS, nodes are explored in order of:',
        opts: ['Cost', 'Distance from start', 'Heuristic value', 'Random order'],
        ans: 1,
        exp: 'BFS explores all nodes at distance d before d+1. Order is purely by distance.'
      },
      {
        q: 'A* is optimal if heuristic h(n) is:',
        opts: ['Always > 0', 'Admissible (h(n) ≤ actual cost)', 'Consistent', 'Equal to actual cost'],
        ans: 1,
        exp: 'Admissibility guarantees optimality of A*. Consistency (monotonicity) is stronger but also sufficient.'
      },
      {
        q: 'In a Bayesian Network, a node is conditionally independent of its non-descendants given its:',
        opts: ['Children', 'Markov Blanket', 'Parents', 'Ancestors'],
        ans: 2,
        exp: 'By the local Markov property in Bayesian Networks, a node is conditionally independent of all its non-descendants given its parents.'
      },
      {
        q: 'What is the main benefit of Alpha-Beta pruning over plain Minimax?',
        opts: ['It guarantees a win', 'It searches the same tree but faster, without changing the result', 'It removes the need for a heuristic', 'It only works for single-player games'],
        ans: 1,
        exp: 'Alpha-Beta pruning skips branches proven irrelevant to the final decision, yielding the exact same result as Minimax with far fewer node expansions.'
      },
      {
        q: 'Which of these is a Constraint Satisfaction Problem?',
        opts: ['Finding shortest path in a weighted graph', 'Map coloring so adjacent regions differ', 'Sorting an array', 'Computing a matrix determinant'],
        ans: 1,
        exp: 'Map coloring is a textbook CSP: variables are regions, domains are colors, and constraints require adjacent regions to have different colors.'
      }
    ]
  }
};

const SUBJECTS_ORDER = ['PS', 'LA', 'CO', 'PDSA', 'DBMS', 'ML', 'AI'];
