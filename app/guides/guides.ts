export interface Guide {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  published: string; // ISO date
  content: string; // markdown
}

export const guides: Guide[] = [
  {
    slug: "pandas-groupby-explained",
    title: "Pandas GroupBy, Explained the Way You Wish It Had Been",
    description:
      "Split-apply-combine is three ideas, not one. A practical tour of groupby, agg, transform, and the mistakes everyone makes on the way.",
    readTime: "9 min",
    published: "2026-07-20",
    content: `
Most people meet \`groupby\` the same way: they copy a snippet from Stack Overflow, it produces a table that looks roughly right, and from that day on they treat it as an incantation. Then one day they need the group average *next to each original row* instead of in a summary table, and the incantation stops working.

The fix is to understand that GroupBy is not one operation. It is three, chained together: **split, apply, combine**. Once you can name which of the three you're customizing, every variant becomes predictable.

## The mental model: split → apply → combine

Take a concrete table:

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "city":  ["NY", "NY", "LA", "LA", "LA", "CHI"],
    "rep":   ["Ana", "Ben", "Ana", "Cal", "Ben", "Cal"],
    "sales": [120,   90,    200,   40,    155,   80],
})
\`\`\`

\`df.groupby("city")\` does the **split**: it partitions the rows into three invisible sub-tables — one for NY, one for LA, one for CHI. Nothing is computed yet. If you print the groupby object you get something unhelpful like \`<DataFrameGroupBy object>\`, which is pandas telling you: "I've made the piles, now tell me what to do with them."

The **apply** step is whatever you call next — \`mean()\`, \`sum()\`, \`agg(...)\`. It runs once per pile.

The **combine** step is how pandas stitches the per-pile results back together — and this is where \`agg\` and \`transform\` part ways.

## agg: one row per group

\`\`\`python
df.groupby("city")["sales"].mean()
# city
# CHI     80.0
# LA     131.7
# NY     105.0
\`\`\`

\`agg\` (and its shortcuts like \`.mean()\`) **collapses** each group to a single row. Six input rows became three output rows. This is the "summary table" shape — great for reporting.

The most readable way to do several aggregations at once is *named aggregation*, which too few people use:

\`\`\`python
df.groupby("city").agg(
    total_sales=("sales", "sum"),
    avg_sales=("sales", "mean"),
    n_reps=("rep", "nunique"),
)
\`\`\`

Each keyword becomes a column name; each tuple is \`(source_column, function)\`. No MultiIndex headaches, no renaming afterwards.

## transform: same shape as the input

Now the situation that breaks the incantation: you want each row to carry its own city's average, so you can compute how each sale compares to its local norm.

\`\`\`python
df["city_avg"] = df.groupby("city")["sales"].transform("mean")
df["vs_avg"]   = df["sales"] / df["city_avg"]
\`\`\`

\`transform\` runs the same per-group computation but **broadcasts the result back to the original rows** — the output has six rows, aligned to the input's index, so it drops straight into a new column. That's the entire difference: \`agg\` collapses, \`transform\` preserves shape.

A remarkable amount of intermediate pandas code is people doing an \`agg\`, then merging the summary back onto the original frame. That's \`transform\` in two extra steps.

## The mistakes everyone makes

**1. Forgetting \`reset_index()\`.** After a groupby-agg, your group keys live in the *index*, not in columns. If the next step is a merge or a plot that expects columns, call \`.reset_index()\`. If you'd rather never think about this, pass \`as_index=False\` to \`groupby\`.

**2. \`count\` vs \`size\`.** \`size()\` counts rows per group, full stop. \`count()\` counts *non-null values per column* per group. On clean data they agree; on real data they quietly don't.

**3. Aggregating what you should have filtered.** If you only want big sales, filter first: \`df[df.sales > 100].groupby("city")...\`. Filtering after aggregation usually means you wanted a different question entirely.

**4. Reaching for \`.apply()\` too early.** \`groupby().apply(custom_fn)\` is the slow path — pandas calls your Python function once per group with no vectorization. It's sometimes necessary, but check whether a combination of built-in aggs and \`transform\` gets you there first; it's routinely 10–100× faster.

## A worked example, end to end

Question: *which sales rep beats their city's average most consistently?*

\`\`\`python
df["city_avg"] = df.groupby("city")["sales"].transform("mean")
df["beat"] = df["sales"] > df["city_avg"]

result = (
    df.groupby("rep")
      .agg(times_beat=("beat", "sum"), deals=("beat", "count"))
      .assign(rate=lambda t: t.times_beat / t.deals)
      .sort_values("rate", ascending=False)
)
\`\`\`

Notice the shape of the reasoning: a \`transform\` to attach group context to every row, a plain vectorized comparison, then an \`agg\` to summarize — split-apply-combine used twice, each time on purpose.

## Where to practice

The [Pandas module](/module/pandas) on QuraLabz has interactive lessons where this exact pattern — groupby, named aggregation, transform — runs live in your browser, with datasets you can break and fix. Reading builds familiarity; running code builds instinct.
`,
  },
  {
    slug: "first-machine-learning-model",
    title: "Your First Machine Learning Model, End to End",
    description:
      "From raw CSV to honest accuracy number with scikit-learn — including the two mistakes that make beginners' models look better than they are.",
    readTime: "10 min",
    published: "2026-07-20",
    content: `
There is a moment in every data science journey where you stop reading about machine learning and train an actual model. This guide is that moment. We'll go from a raw dataset to an honest performance number using scikit-learn, and — more importantly — we'll do it *in the right order*, because the order is where beginners get silently burned.

## The task

We'll predict whether a passenger survived the Titanic — the classic beginner dataset, because it's small, real, and full of authentic mess: missing values, mixed types, and columns that look useful but aren't.

\`\`\`python
import pandas as pd

df = pd.read_csv("titanic.csv")
df.shape          # (891, 12)
df["Survived"].value_counts(normalize=True)
# 0    0.616
# 1    0.384
\`\`\`

That last line matters more than it looks: **61.6% of passengers died**. A "model" that predicts *death for everyone* scores 61.6% accuracy while learning nothing. That number — the majority-class baseline — is the score to beat. Write it down before you train anything.

## Split first. Always first.

The most common beginner mistake is exploring, cleaning, and engineering features on the *entire* dataset, then splitting at the end. The problem: information from your test rows (their means, their categories, their quirks) has already leaked into your decisions. Your final score will look better than the model actually is — and you won't know it.

\`\`\`python
from sklearn.model_selection import train_test_split

X = df.drop(columns=["Survived"])
y = df["Survived"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
\`\`\`

\`stratify=y\` keeps the survival ratio identical in both halves. \`random_state\` makes the split reproducible. The test set now goes in a drawer — we touch it exactly once, at the very end.

## Features: less is more (at first)

Titanic has 12 columns. A first model should use the few with obvious signal:

- **Sex** — "women and children first" is visible in the data.
- **Pclass** — ticket class is a proxy for cabin location and wealth.
- **Age** — with ~20% missing values to handle.
- **Fare** — skewed, but informative.

We need two preprocessing steps: fill missing ages, and turn text categories into numbers. Both must be **fit on training data only** — the imputation value comes from the training rows, then gets *applied* to test rows. A \`Pipeline\` makes that automatic:

\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder

numeric = ["Age", "Fare"]
categorical = ["Sex", "Pclass"]

prep = ColumnTransformer([
    ("num", SimpleImputer(strategy="median"), numeric),
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical),
])
\`\`\`

This object is the professional habit worth learning early: preprocessing that lives *inside* the model, so it can never be accidentally fit on data it shouldn't see.

## Train two models

Always train a simple model and a stronger one — the gap between them tells you where you are.

\`\`\`python
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

logreg = Pipeline([("prep", prep), ("model", LogisticRegression(max_iter=1000))])
forest = Pipeline([("prep", prep), ("model", RandomForestClassifier(n_estimators=300, random_state=42))])

cross_val_score(logreg, X_train, y_train, cv=5).mean()  # ≈ 0.79
cross_val_score(forest, X_train, y_train, cv=5).mean()  # ≈ 0.81
\`\`\`

Note we're scoring with **cross-validation on the training set** — five different train/validation splits, averaged — not with the test set. The test set is still in its drawer.

Both models clear the 0.616 baseline by a wide margin: the features carry real signal. The forest edges out logistic regression, but not dramatically — on small tabular datasets, that's typical.

## The one look at the test set

\`\`\`python
forest.fit(X_train, y_train)
forest.score(X_test, y_test)   # ≈ 0.80
\`\`\`

Around 80%, consistent with cross-validation — which is exactly what we want to see. If the test score had come in far *below* the CV score, that would smell of overfitting to validation choices; far above, of luck or leakage.

Accuracy isn't the whole story. A confusion matrix shows *which* mistakes the model makes — and on imbalanced problems you'd reach for precision, recall, and PR-AUC instead. But that's the next lesson, not the first one.

## What made this "honest"

Two habits did all the work:

1. **Split before you look.** Every decision — imputation values, encodings, features — was made using training data only.
2. **Beat the baseline, not just zero.** 80% only means something because we knew 61.6% was free.

Models are easy; discipline is the skill. If you want to run this whole workflow interactively — data loading, pipelines, cross-validation, live in your browser with nothing to install — the [Machine Learning module](/module/ml-basics) walks through each piece with editable code.
`,
  },
  {
    slug: "numpy-broadcasting-mental-model",
    title: "NumPy Broadcasting: The Mental Model That Makes It Click",
    description:
      "Broadcasting isn't magic — it's two rules applied right-to-left. Learn to predict shapes before you run the code, and shape errors stop being mysterious.",
    readTime: "8 min",
    published: "2026-07-20",
    content: `
Every NumPy user has been ambushed by this error:

\`\`\`
ValueError: operands could not be broadcast together with shapes (3,4) (3,)
\`\`\`

And every NumPy user has "fixed" it by sprinkling \`.T\` and \`reshape\` until the error went away — without being sure why. This guide replaces that guesswork with a two-rule mental model you can run in your head.

## Why broadcasting exists

You have a matrix of exam scores — 3 students × 4 subjects — and you want to add 5 bonus points to everything:

\`\`\`python
import numpy as np

scores = np.array([[70, 80, 90, 60],
                   [65, 75, 85, 55],
                   [90, 95, 92, 88]])

scores + 5        # works — no loop needed
\`\`\`

A scalar has no shape at all, yet NumPy combines it with a (3,4) matrix. That's broadcasting: **a set of rules for stretching smaller arrays to match bigger ones, without actually copying data**. It's why NumPy code has so few loops — and why it's fast.

## The two rules

To predict whether \`a + b\` works, line up their shapes **right-aligned**, and compare dimension by dimension **from the right**:

> **Rule 1 — missing dimensions:** if one array has fewer dimensions, imagine 1s padded on its *left*.
>
> **Rule 2 — matching:** two dimensions are compatible if they are **equal**, or if **either is 1**. A 1 gets stretched to match the other size.

If every position passes, the result takes the larger size at each position. If any position fails, you get the broadcast error.

## Running the rules by hand

**Case 1: matrix + row.** Add per-subject curve \`[1, 2, 3, 4]\` to every student:

\`\`\`
scores:  (3, 4)
curve:      (4)   → pad left → (1, 4)
compare: 3 vs 1 ✓ (stretch)   4 vs 4 ✓
result:  (3, 4)
\`\`\`

\`scores + curve\` just works. The row is virtually stacked three times.

**Case 2: matrix + column — the classic failure.** Give each *student* a personal bonus \`[5, 10, 15]\`:

\`\`\`
scores:  (3, 4)
bonus:      (3)   → pad left → (1, 3)
compare: 4 vs 3 ✗ — ERROR
\`\`\`

This is the ambush. The rules pad on the *left*, so your 3-element array lines up against the 4 subjects, not the 3 students. NumPy has no way to know you meant "one per row" — you have to say it, by giving the array an explicit column shape:

\`\`\`python
scores + bonus[:, np.newaxis]     # shape (3,1)
\`\`\`

\`\`\`
scores:  (3, 4)
bonus:   (3, 1)
compare: 3 vs 3 ✓    4 vs 1 ✓ (stretch)
result:  (3, 4)
\`\`\`

That \`[:, np.newaxis]\` (or equivalently \`.reshape(-1, 1)\`) is not ritual — it's you telling the rules which axis your data belongs to.

## The idiom worth memorizing

Standardizing columns — subtracting each column's mean and dividing by its std — is pure broadcasting:

\`\`\`python
X = np.random.default_rng(0).normal(size=(200, 5))

X_std = (X - X.mean(axis=0)) / X.std(axis=0)
#          (200,5) - (5,)  → (200,5)  ✓
\`\`\`

\`mean(axis=0)\` collapses the row axis, leaving shape (5,) — which broadcasts cleanly against (200,5) because the rightmost dimensions match. One line, no loop, no copies. This exact pattern is what \`StandardScaler\` does inside scikit-learn.

A useful habit: when you write \`axis=...\`, say out loud what *survives*. \`axis=0\` collapses rows → per-column stats. \`axis=1\` collapses columns → per-row stats. Most axis confusion is just this sentence unspoken.

## Debugging shape errors like an adult

When you hit a broadcast error now, don't reach for \`.T\` at random:

1. Print both shapes: \`print(a.shape, b.shape)\`.
2. Right-align them on paper, pad 1s on the left.
3. Find the failing position — it names the axis that disagrees.
4. Add \`[:, None]\` (or \`reshape\`) to place your data on the axis you *meant*.

Thirty seconds of shape arithmetic beats ten minutes of trial-and-error, every time.

Broadcasting also explains why NumPy is memory-efficient: the stretched copies are *virtual* — strides tricks, not allocations. A (3,1) column added to a (3,1000000) matrix allocates nothing extra for the stretch.

To make this automatic, run the shape drills in the [NumPy module](/module/numpy) — the exercises are built so you predict the output shape before executing, which is exactly the skill that makes broadcasting click for good.
`,
  },
  {
    slug: "how-to-learn-data-science-2026",
    title: "How to Actually Learn Data Science in 2026 (Without Drowning)",
    description:
      "The field looks infinite from the outside. The hireable core is small. A realistic 6-month sequence, what to skip, and how AI tools change the job.",
    readTime: "11 min",
    published: "2026-07-20",
    content: `
From the outside, data science looks like an ocean: five languages, forty libraries, endless courses, and a new "must-know" tool every month. People respond to that ocean in one of two bad ways — they course-hop for a year without building anything, or they bounce off entirely.

Here's the thing the syllabus-sellers won't tell you: **the hireable core is small**. Python, data manipulation, visualization, a working grasp of statistics, and classical machine learning. Everything else — deep learning, LLM engineering, big-data tooling — stacks on top of that core and is learned faster *because* of it.

## The sequence (and why order matters)

### Months 1–2: Python, but only the data-relevant parts

You do not need to be a software engineer. You need: variables, lists, dictionaries, loops, functions, comprehensions, error handling, and file I/O. That's roughly the [Python Basics module](/module/python) — not a 60-hour bootcamp.

The trap here is *tutorial completionism*: grinding through OOP metaclasses and decorators before ever touching data. Skip that. You'll learn advanced Python naturally, on demand, when a real problem requires it.

**Exit test:** you can read a CSV without pandas, count word frequencies with a dictionary, and write a function you reuse twice.

### Months 2–3: Pandas and NumPy — where real work lives

Survey after survey shows data professionals spending the majority of their time preparing and exploring data, not fitting models. Pandas *is* the job. Learn selection with \`loc\`/\`iloc\`, boolean filtering, groupby (split-apply-combine), merging, and missing-data handling until they're reflexes. Under it, NumPy: arrays, vectorization, broadcasting.

**Exit test:** given a messy CSV you've never seen, you can answer "which category grew fastest month-over-month?" in under 15 minutes.

### Month 3–4: Visualization and the statistics you'll actually use

Charts are how analysis becomes influence. Matplotlib fundamentals plus Seaborn one-liners cover 95% of real needs — histogram, scatter, box plot, heatmap, and knowing *which* one answers which question.

For statistics, resist the urge to "do a stats degree first." The working set: distributions, mean vs median (and when they disagree), standard deviation, correlation (and its failure modes), sampling, confidence intervals, and the logic of hypothesis testing. Learn them *through* data you're already plotting.

### Months 4–6: Classical machine learning, done honestly

Scikit-learn, not TensorFlow. Linear and logistic regression, decision trees, random forests, gradient boosting. Train/test splits, cross-validation, and the metrics that matter beyond accuracy (precision, recall, ROC-AUC). Most of what separates a junior from a strong junior is not knowing more models — it's evaluation discipline: no leakage, honest baselines, metrics matched to the problem.

Deep learning comes *after* this, and only if your target roles need it. For many analyst and data-science roles, it never does.

## The part almost everyone skips: projects

Courses feel like progress because they remove friction. Projects *are* progress because they add it back. From month 3 onward, alternate: for every unit of new material, one small project on data you personally find interesting — league stats, your city's open data, your own spending.

Three projects with real datasets, honest write-ups, and code on GitHub beat any certificate. Hiring managers read projects the way editors read writing samples: five minutes each, looking for evidence you can *finish* something and explain a decision.

A good write-up answers three questions: What question did you ask? What did you find (with one good chart)? What would you do next with more time? That last one signals judgment, which is the actual thing being hired.

## What about AI tools?

In 2026, assistants write a lot of boilerplate pandas and matplotlib. This changes the job less than people claim, in an instructive way: AI makes *writing* code cheap, which makes *judging* code precious. When the assistant hands you a groupby that silently drops NaN groups, or an evaluation with leakage baked in, you are the one who has to notice.

So the fundamentals above aren't obsolete — they're the review skill. Use AI to accelerate, but type the core patterns yourself until they're in your fingers. You can't review what you never learned to write. And add one new skill to the core list: prompting and integrating LLM APIs, which is why QuraLabz includes [Generative AI](/module/generative-ai) and [Agentic AI](/module/agentic-ai) modules after the classical track.

## What to deliberately ignore (for now)

- **Language debates.** Python won. SQL is the essential sidekick — learn SELECT/JOIN/GROUP BY along the way.
- **Big-data tools** (Spark, distributed anything) before you've outgrown pandas. Most datasets you'll touch fit in memory.
- **MLOps/deployment** before you have a model worth deploying.
- **The new-framework-of-the-month.** If it matters, it will still matter in six months, and it'll have better docs.

## The realistic promise

Six focused months — an hour on weekdays, more on weekends — takes a motivated beginner to "can do useful analysis and build honest baseline models." That's employable in analyst roles and a legitimate launchpad for data science ones. The people who fail mostly don't fail the material; they fail the sequencing, drowning in month one because they tried to learn the whole ocean at once.

Start with [Python Basics](/module/python), keep the loop tight — learn a little, build a little — and let the browser-based lessons here remove the setup excuses. The water's fine once you stop trying to drink all of it.
`,
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
