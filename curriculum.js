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
            <p>Sample space: $\\Omega = \\{1, 2, 3, 4, 5, 6\\}$</p>
            <p>Event A = "roll is even" = $\\{2, 4, 6\\}$</p>
            <p>$P(A) = 3/6 = 1/2$</p>
          </div>

          <p><strong>Key properties:</strong></p>
          <ul>
            <li>$P(A) \\ge 0$ for all events A</li>
            <li>$P(\\Omega) = 1$ (certain event)</li>
            <li>$P(A^c) = 1 - P(A)$ (complement rule)</li>
          </ul>
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
            <p>$= \\frac{0.95 \\times 0.01}{0.95 \\times 0.01 + 0.1 \\times 0.99} \\approx 8.76\\%$</p>
          </div>
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
            <p>$$A = \\begin{pmatrix} 3 & 1 \\\\ 0 & 2 \\end{pmatrix}$$</p>
            <p>Characteristic polynomial: $\\det(A - \\lambda I) = (3-\\lambda)(2-\\lambda) = 0$</p>
            <p>Eigenvalues: $\\lambda_1 = 3, \\lambda_2 = 2$</p>
          </div>
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
            <p>For a 2×2 matrix: $$\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc$$</p>
            <p>Properties:</p>
            <p>• $\\det(A) = 0 \\iff$ A is singular (not invertible)</p>
            <p>• $\\det(AB) = \\det(A)\\det(B)$</p>
            <p>• $\\det(A^T) = \\det(A)$</p>
          </div>

          <div class="example-box">
            <h4>Inverse via Determinant (2×2)</h4>
            <p>$$A^{-1} = \\frac{1}{\\det(A)}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$$</p>
            <p>Exists only when $\\det(A) \\ne 0$.</p>
          </div>
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
        `
      },
      {
        id: 'co-03',
        title: 'Hessians',
        content: `
          <div class="theorem-box">
            <h5>Partial Derivatives & Gradient</h5>
            <p>For a function $f(x,y)$, the gradient $\\nabla f$ is a vector of its partial derivatives: $$\\nabla f = \\begin{bmatrix} \\frac{\\partial f}{\\partial x} \\\\ \\frac{\\partial f}{\\partial y} \\end{bmatrix}$$</p>
          </div>

          <div class="def-box">
            <h4>The Hessian Matrix</h4>
            <p>The Hessian H is the matrix of second-order partial derivatives. It describes local curvature.</p>
            <p>• If H is <strong>Positive Definite</strong> at a critical point, it is a local minimum.</p>
            <p>• If H is <strong>Negative Definite</strong>, it is a local maximum.</p>
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
            <li><strong>BFS (breadth-first):</strong> $O(V + E)$, layer by layer</li>
            <li><strong>DFS (depth-first):</strong> $O(V + E)$, go deep first</li>
          </ul>
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
            <p>Given labeled data $\\{(x_i, y_i)\\}$, learn a function f such that $f(x) \\approx y$.</p>
            <p><strong>Regression:</strong> y is continuous</p>
            <p><strong>Classification:</strong> y is discrete</p>
          </div>

          <div class="theorem-box">
            <h5>Loss Functions</h5>
            <p><strong>Regression:</strong> Mean Squared Error = $$\\frac{1}{n}\\sum (y_i - \\hat{y}_i)^2$$</p>
            <p><strong>Classification:</strong> Cross-entropy = $$-\\sum y_i \\log(\\hat{y}_i)$$</p>
          </div>

          <p><strong>Bias-Variance tradeoff:</strong> MSE = Bias² + Variance + Irreducible Error</p>
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
            <p><strong>BFS:</strong> explores level by level. Optimal for unweighted graphs.</p>
            <p><strong>DFS:</strong> explores deep first. Uses less memory than BFS.</p>
          </div>

          <div class="theorem-box">
            <h5>Informed Search</h5>
            <p><strong>A* Search:</strong> uses heuristic h(n) to guide exploration.</p>
            <p>$$f(n) = g(n) + h(n)$$</p>
            <p>where g(n) = cost so far, h(n) = estimated cost to goal.</p>
            <p><strong>Admissibility:</strong> $h(n) \\le \\text{actual cost}$ guarantees optimality.</p>
          </div>
        `
      },
      {
        id: 'ai-02',
        title: 'Logic',
        content: `
          <div class="def-box">
            <h4>Propositional Logic</h4>
            <p>Operators: $\\neg$ (not), $\\wedge$ (and), $\\vee$ (or), $\\rightarrow$ (implies), $\\leftrightarrow$ (iff)</p>
          </div>

          <div class="def-box">
            <h4>First-Order Logic (FOL)</h4>
            <p>Extends propositional with objects and relations.</p>
            <p>$\\forall x, \\exists x$ quantifiers for "for all" and "there exists"</p>
          </div>
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

const SUBJECTS_ORDER = ['PS', 'LA', 'CO', 'PDSA', 'ML', 'AI'];
