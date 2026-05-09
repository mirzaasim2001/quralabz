export interface LessonPage {
  pageNumber: number;
  title: string;
  content: string; // Markdown
  starterCode: string;
  expectedOutput?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  lessonNumber: number;
  title: string;
  description: string;
  duration: string; // e.g. "15 min"
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  pages: LessonPage[];
}

export interface Module {
  id: string;
  title: string;
  slug: string;
  description: string;
  introduction: string; // Markdown content shown before lesson 1
  icon: string; // emoji fallback
  color: string; // tailwind gradient class
  lessons: Lesson[];
  totalDuration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  heroImage: string;
}

// ─────────────────────────────────────────────────────────────
// MODULE 1 — Python Basics for Data Science
// ─────────────────────────────────────────────────────────────
const pythonModule: Module = {
  id: "python-basics",
  title: "Python Basics for Data Science",
  slug: "python",
  description:
    "Master the Python fundamentals every data scientist needs — from variables and loops to functions and file I/O.",
  introduction: `# Welcome to Python Basics for Data Science 🐍

## Why Python?

Python has become the **lingua franca** of data science. Here's why:

- **Easy to learn:** Clean, readable syntax that looks like English
- **Massive ecosystem:** Libraries for every task (Pandas, NumPy, Scikit-Learn, TensorFlow)
- **Data science standard:** Used by 80%+ of data professionals
- **Versatile:** Works for data analysis, visualization, machine learning, and more

## What You'll Learn

In this module, you'll master the **core Python skills** that form the foundation for every data science project:

1. **Variables & Data Types** — How Python stores and manages data
2. **Lists & Tuples** — Working with ordered collections
3. **Dictionaries** — Key-value pairs for structured data
4. **Control Flow** — Making decisions with if/else and loops
5. **Functions** — Writing reusable code (DRY principle)
6. **String Manipulation** — Processing text data (crucial for NLP)
7. **File I/O** — Reading and writing data files
8. **Error Handling** — Writing robust code that doesn't crash
9. **Modules & Packages** — Using pre-built libraries
10. **Object-Oriented Python** — Classes and OOP fundamentals
11. **Lambda & Comprehensions** — Elegant Python idioms

## Your Learning Path

- **Before:** No programming experience? Perfect! We start from zero.
- **During:** Hands-on coding in every lesson with our interactive playground
- **After:** You'll have the Python foundation needed for Modules 2-6 (Pandas, NumPy, Matplotlib, ML)

> 💡 **Pro Tip:** Don't just watch—run the code! Type it in yourself, break it, fix it. That's how learning happens.

## How to Use This Module

- **Follow sequentially:** Each lesson builds on the previous one
- **Run all code:** Click "Run" to execute examples and see output
- **Experiment:** Modify the code and see what happens
- **Refer back:** These lessons become a reference guide later

Let's start coding! 🚀`,
  icon: "🐍",
  color: "from-violet-600 to-violet-900",
  level: "Beginner",
  totalDuration: "4h 27min",
  heroImage:
    "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1200&q=80",
  lessons: [
    {
      id: "py-variables",
      moduleId: "python-basics",
      lessonNumber: 1,
      title: "Variables & Data Types",
      description: "Learn how to store and manipulate data with Python variables. The foundation of all programming.",
      duration: "18 min",
      difficulty: "Beginner",
      pages: [
        {
          pageNumber: 1,
          title: "What is a Variable? (Beginner Explanation)",
          content: `# Variables & Data Types — The Foundation

## What is a Variable?

In computer science, a **variable** is a named storage location in memory that holds a value. The name acts as a symbolic reference — when your program runs, Python stores the actual data in memory and the variable name points to it. Unlike statically typed languages like C or Java, Python variables are *dynamically typed*: you don't declare a type upfront, Python infers it automatically at runtime.

Think of it like a **labeled box** in your computer's memory. You put a value inside and label the box so you can access it later.

\`\`\`
┌──────────────────┐
│  name = "Alice"  │  ← Variable "name" holds the text "Alice"
└──────────────────┘

┌──────────────────┐
│  age = 28        │  ← Variable "age" holds the number 28
└──────────────────┘

┌──────────────────┐
│  score = 95.5    │  ← Variable "score" holds 95.5
└──────────────────┘
\`\`\`

When you write \`name = "Alice"\`, you're telling Python:
- Create a box called \`name\`
- Put the value \`"Alice"\` inside
- Remember it so I can use it later

## Variables in Action

\`\`\`python
student = "Bob"
marks = 87
gpa = 3.5

print(student)      # Bob
print(marks)        # 87
print(student, "scored", marks)  # Bob scored 87
\`\`\`

## Variable Naming Rules

**Valid names:**
\`\`\`python
age = 25
student_name = "Alice"
_private = 42
total2 = 100
\`\`\`

**Invalid names:**
\`\`\`python
2start = 10        # ✗ Can't start with number
my-age = 25        # ✗ Can't use hyphens
my age = 25        # ✗ Can't have spaces
\`\`\`

**Naming conventions (style guide):**
- Use lowercase with underscores: \`student_name\` ✓
- Not camelCase: ~~studentName~~ (that's JavaScript style)
- Not UPPER_CASE: ~~STUDENT_NAME~~ (reserved for constants)

> **Gotcha:** Python is **case-sensitive**. \`name\`, \`Name\`, and \`NAME\` are three different variables!
`,
          starterCode: `# Variables & Data Types — Let's Practice!
# Run this code and observe the output

# Create some variables
name = "Alice"
age = 28
score = 95.5
is_learning = True

# Print them
print("=== Variables Demo ===")
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Score: {score}")
print(f"Learning Python: {is_learning}")

# Use them in calculations
print(f"\\nNext year age: {age + 1}")
print(f"Score doubled: {score * 2}")

# Type information
print(f"\\n=== Variable Types ===")
print(f"Type of name: {type(name)}")
print(f"Type of age: {type(age)}")
print(f"Type of score: {type(score)}")
print(f"Type of is_learning: {type(is_learning)}")
`,
        },
        {
          pageNumber: 2,
          title: "Python's 4 Core Data Types",
          content: `## The 4 Core Scalar Data Types

Python has four basic types for storing single values:

### 1. **String** (\`str\`) — Text Data
Store any text: names, sentences, files paths, anything!

\`\`\`python
name = "Alice"
city = 'New York'           # Single or double quotes, same thing
message = "Score: 95%"      # Can include numbers/symbols
\`\`\`

### 2. **Integer** (\`int\`) — Whole Numbers
For counting and discrete values (no decimals).

\`\`\`python
age = 28
count = 100
negative = -5
big_number = 1_000_000     # Python allows underscores for readability
\`\`\`

### 3. **Float** (\`float\`) — Decimal Numbers
For measurements, percentages, and precise values.

\`\`\`python
price = 19.99
pi = 3.14159
percentage = 85.5
\`\`\`

### 4. **Boolean** (\`bool\`) — True or False
For decisions and logical checks (exactly 2 values).

\`\`\`python
is_student = True
is_graduate = False
passed_exam = True
\`\`\`

## Quick Reference Table

| Type | Example | Use Case |
|------|---------|----------|
| \`str\` | \`"Alice"\` | Names, text, labels |
| \`int\` | \`28\` | Ages, counts, IDs |
| \`float\` | \`3.14\` | Measurements, scores |
| \`bool\` | \`True\` | Yes/No, On/Off, conditions |

## Checking Variable Type

Use the \`type()\` function to ask: "What type is this variable?"

\`\`\`python
type(42)           # <class 'int'>
type("Alice")      # <class 'str'>
type(3.14)         # <class 'float'>
type(True)         # <class 'bool'>
\`\`\`

This becomes super useful when debugging! 🐛
`,
          starterCode: `# Exploring Python's 4 Core Data Types

print("=== TYPE DEMONSTRATIONS ===\\n")

# STRING examples
print("STRING (str) — Text data:")
first_name = "Alice"
last_name = "Smith"
full_name = f"{first_name} {last_name}"
print(f"  first_name = {first_name!r}")
print(f"  last_name = {last_name!r}")
print(f"  full_name = {full_name!r}")
print(f"  Type: {type(first_name)}")

# INTEGER examples
print("\\nINTEGER (int) — Whole numbers:")
age = 28
points = 1_500
negative = -10
print(f"  age = {age}")
print(f"  points = {points:,}")
print(f"  negative = {negative}")
print(f"  Type: {type(age)}")

# FLOAT examples
print("\\nFLOAT (float) — Decimals:")
price = 19.99
temperature = -5.5
percentage = 87.5
# Display with dollar sign
print("  price = " + "$" + str(price))
print(f"  temperature = {temperature}°C")
print(f"  percentage = {percentage}%")
print(f"  Type: {type(price)}")

# BOOLEAN examples
print("\\nBOOLEAN (bool) — True/False:")
is_student = True
has_degree = False
passed_exam = True
print(f"  is_student = {is_student}")
print(f"  has_degree = {has_degree}")
print(f"  passed_exam = {passed_exam}")
print(f"  Type: {type(is_student)}")
`,
        },
        {
          pageNumber: 3,
          title: "Type Conversion (Casting)",
          content: `## Converting Between Types

Sometimes you need to **change** a variable's type. Python makes this easy with conversion functions.

### Converting TO String

Use \`str()\` to turn anything into text.

\`\`\`python
age = 28
age_text = str(age)        # "28"

score = 95.5
score_text = str(score)    # "95.5"

result = True
result_text = str(result)  # "True"
\`\`\`

**Why?** When you want to combine numbers with text:
\`\`\`python
name = "Alice"
age = 28
# This FAILS: print("My name is " + name + age)  ✗
# But this WORKS:
print("My name is " + name + " and I'm " + str(age))  ✓
\`\`\`

### Converting TO Integer

Use \`int()\` to get whole numbers. Decimals are truncated (not rounded)!

\`\`\`python
score = "95"
score_int = int(score)     # 95

price = 19.99
price_int = int(price)     # 19 (truncated, not rounded!)

bool_value = True
bool_int = int(bool_value) # 1
\`\`\`

### Converting TO Float

Use \`float()\` to get decimal numbers.

\`\`\`python
age = 28
age_float = float(age)     # 28.0

score = "95.5"
score_float = float(score) # 95.5
\`\`\`

### Converting TO Boolean

Use \`bool()\`. Most values are \`True\`, but some are special "falsy" values:

\`\`\`python
bool(1)        # True
bool(0)        # False  ← special case!
bool("hello")  # True
bool("")       # False  ← empty string is falsy!
bool([])       # False  ← empty list is falsy!
\`\`\`

## Real-World Example: Calculating Totals

\`\`\`python
# User input comes as text (strings)
price_str = "19.99"
quantity_str = "3"

# Convert to numbers for math
price = float(price_str)
quantity = int(quantity_str)

# Calculate total
total = price * quantity    # 59.97

# Convert back to string for display
print(f"Total: \${str(total)}")
\`\`\`

> **Insight:** This pattern (string → number → string) happens constantly in real programs!
`,
          starterCode: `# Type Conversion Practice

print("=== TYPE CONVERSION ===\\n")

# String ← Number
print("1. Converting numbers to strings:")
num = 42
num_str = str(num)
print(f"  num = {num} (type: {type(num).__name__})")
print(f"  str(num) = {num_str!r} (type: {type(num_str).__name__})")

# Integer ← String
print("\\n2. Converting strings to integers:")
age_str = "28"
age_int = int(age_str)
print(f"  age_str = {age_str!r} (type: {type(age_str).__name__})")
print(f"  int(age_str) = {age_int} (type: {type(age_int).__name__})")

# Float ← String or Integer
print("\\n3. Converting to float:")
score_str = "95.5"
score_int = 95
print(f"  float('{score_str}') = {float(score_str)}")
print(f"  float({score_int}) = {float(score_int)}")

# Integer ← Float (truncates!)
print("\\n4. Integer from float (watch—it truncates!):")
price = 19.99
price_int = int(price)
print(f"  int({price}) = {price_int}  ← Truncated, not rounded!")

# Real example: calculating a bill
print("\\n5. Real example: Bill calculator")
item_price = "12.50"
quantity = "3"
price_num = float(item_price)
qty_num = int(quantity)
total = price_num * qty_num
print(f"  Item: \${item_price} × {quantity} = \${total:.2f}")
`,
        },
        {
          pageNumber: 4,
          title: "Strings & Text Operations",
          content: `## Working with Strings

Strings are **sequences** of characters. Python gives you powerful tools to manipulate text.

### String Concatenation (Joining)

Combine strings with the \`+\` operator:

\`\`\`python
first = "John"
last = "Smith"
full_name = first + " " + last    # "John Smith"
\`\`\`

### F-Strings (Modern Python)

The easiest way to embed variables in text:

\`\`\`python
name = "Alice"
age = 28
score = 95.5

# F-string (readable and powerful!)
print(f"Hello {name}!")              # Hello Alice!
print(f"{name} is {age} years old")  # Alice is 28 years old
print(f"Score: {score:.1f}%")        # Score: 95.5%
\`\`\`

### String Formatting Examples

\`\`\`python
price = 19.995

f"{price}"        # "19.995"
f"{price:.2f}"    # "19.99"   ← 2 decimals

count = 5000
f"{count:,}"      # "5,000"   ← with commas

text = "hello"
f"{text.upper()}" # "HELLO"   ← call methods inside!
\`\`\`

### Essential String Methods

**Making changes (note: strings are immutable—these return NEW strings):**

\`\`\`python
text = "  Hello World  "

text.lower()           # "  hello world  "
text.upper()           # "  HELLO WORLD  "
text.strip()           # "Hello World"      ← removes whitespace
text.replace("World", "Python")  # "  Hello Python  "
\`\`\`

**Checking content:**

\`\`\`python
text = "Hello"

"H" in text         # True (substring check)
text.startswith("He")  # True
text.endswith("lo")    # True
text.isdigit()      # False

"  123  ".isdigit() # False (has spaces!)
"123".isdigit()     # True
\`\`\`

**Finding and splitting:**

\`\`\`python
sentence = "I love Python programming"

sentence.find("Python")    # 7 (position)
sentence.count("o")        # 3 (occurrences)
sentence.split()           # ["I", "love", "Python", "programming"]
sentence.split(" ")        # same result
\`\`\`

> **Important:** String methods don't modify the original string—they return a new one. Strings are **immutable**!
`,
          starterCode: `# String Operations — The Practical Guide

print("=== STRING OPERATIONS ===\\n")

# Concatenation
print("1. Joining strings with +")
greeting = "Hello"
name = "Alice"
message = greeting + ", " + name + "!"
print(f"  Result: {message}")

# F-strings (modern & readable)
print("\\n2. F-strings (embedding variables)")
age = 28
city = "New York"
print(f"  {name} is {age} years old and lives in {city}")

# Formatting numbers in f-strings
print("\\n3. Formatting numbers")
price = 19.995
discount = 0.15
final_price = price * (1 - discount)
price_formatted = f"{price:.2f}"
final_price_formatted = f"{final_price:.2f}"
print(f"  Original: {price_formatted}")
print(f"  After {discount*100:.0f}% discount: {final_price_formatted}")

count = 1_234_567
count_formatted = f"{count:,}"
print(f"  Formatted count: {count_formatted}")

# String methods
print("\\n4. Useful string methods")
text = "  Python Programming  "
print(f"  Original: {repr(text)}")
print(f"  .strip():  {repr(text.strip())}")
print(f"  .upper():  {repr(text.upper())}")
print(f"  .lower():  {repr(text.lower())}")

# String searching
print("\\n5. Finding content in strings")
sentence = "Learn Python the easy way"
print(f"  Sentence: {repr(sentence)}")
print(f"  'Python' in sentence: {'Python' in sentence}")
print(f"  Position of 'easy': {sentence.find('easy')}")
print(f"  Count of 'e': {sentence.count('e')}")

# Splitting strings
print("\\n6. Splitting strings")
csv_data = "Alice,28,New York,Engineer"
parts = csv_data.split(",")
print(f"  CSV: {csv_data}")
print(f"  Split: {parts}")
`,
        },
        {
          pageNumber: 5,
          title: "Math Operations",
          content: `## Arithmetic Operators

Python can do all basic math. These are your building blocks for data calculations.

| Operator | Symbol | Example | Result |
|----------|--------|---------|--------|
| Addition | \`+\` | \`10 + 3\` | \`13\` |
| Subtraction | \`-\` | \`10 - 3\` | \`7\` |
| Multiplication | \`*\` | \`10 * 3\` | \`30\` |
| Division | \`/\` | \`10 / 3\` | \`3.333...\` |
| Floor Division | \`//\` | \`10 // 3\` | \`3\` |
| Modulo (Remainder) | \`%\` | \`10 % 3\` | \`1\` |
| Power/Exponent | \`**\` | \`2 ** 8\` | \`256\` |

### Division vs Floor Division (Important!)

\`\`\`python
10 / 3      # 3.3333...   ← Regular division (always float)
10 // 3     # 3           ← Floor division (rounds down to integer)
10 % 3      # 1           ← Remainder (10 = 3*3 + 1)
\`\`\`

**Real example: Converting minutes to hours and minutes**
\`\`\`python
total_minutes = 125
hours = total_minutes // 60      # 2 hours
remaining_minutes = total_minutes % 60  # 5 minutes
print(f"125 minutes = {hours}h {remaining_minutes}m")  # 2h 5m
\`\`\`

### Order of Operations (PEMDAS)

Python follows the standard math order:
1. **P** — Parentheses first
2. **E** — Exponents
3. **MD** — Multiplication & Division (left to right)
4. **AS** — Addition & Subtraction (left to right)

\`\`\`python
2 + 3 * 4        # 14  (not 20!)
(2 + 3) * 4      # 20
10 - 3 - 2       # 5   (left to right: (10-3)-2)
2 ** 3 ** 2      # 512 (right to left: 2**(3**2) = 2**9)
\`\`\`

### The \`math\` Module

For advanced math, import Python's built-in \`math\` module:

\`\`\`python
import math

math.sqrt(16)       # 4.0
math.pi             # 3.14159265...
math.ceil(4.2)      # 5 (round up)
math.floor(4.8)     # 4 (round down)
math.abs(-5)        # 5 (absolute value)
math.log(100, 10)   # 2.0 (logarithm)
\`\`\`

### Variable Assignment Shortcuts

Python provides shortcuts for updating variables:

\`\`\`python
score = 0
score = score + 10     # Traditional
score += 10            # Shortcut (cleaner!)

# Works for all operators:
score -= 5             # score = score - 5
score *= 2             # score = score * 2
score /= 10            # score = score / 10
\`\`\`
`,
          starterCode: `import math

print("=== ARITHMETIC & MATH ===\\n")

# Basic operations
print("1. Basic arithmetic:")
a, b = 17, 5
print(f"  {a} + {b} = {a + b}")
print(f"  {a} - {b} = {a - b}")
print(f"  {a} * {b} = {a * b}")
print(f"  {a} / {b} = {a / b:.2f}")
print(f"  {a} // {b} = {a // b}   (floor division)")
print(f"  {a} % {b} = {a % b}    (remainder)")
print(f"  {b} ** 3 = {b ** 3}     (power)")

# Real example: Convert seconds to HH:MM:SS
print("\\n2. Practical example: Convert 3725 seconds to HH:MM:SS")
total_seconds = 3725
hours = total_seconds // 3600
remaining = total_seconds % 3600
minutes = remaining // 60
seconds = remaining % 60
print(f"  {total_seconds} seconds = {hours:02d}:{minutes:02d}:{seconds:02d}")

# Order of operations
print("\\n3. Order of operations matters!")
print(f"  2 + 3 * 4 = {2 + 3 * 4}  (not 20, multiplication first)")
print(f"  (2 + 3) * 4 = {(2 + 3) * 4}  (parentheses first)")

# Math module
print("\\n4. Math module functions:")
print(f"  sqrt(144) = {math.sqrt(144)}")
print(f"  pi = {math.pi:.5f}")
print(f"  ceil(4.2) = {math.ceil(4.2)}")
print(f"  floor(4.8) = {math.floor(4.8)}")
print(f"  abs(-42) = {math.abs(-42)}")

# Shortcuts
print("\\n5. Assignment shortcuts:")
x = 10
print(f"  x = {x}")
x += 5
print(f"  x += 5  →  x = {x}")
x *= 2
print(f"  x *= 2  →  x = {x}")
x -= 8
print(f"  x -= 8  →  x = {x}")
`,
        },
      ],
    },
    {
      id: "py-lists",
      moduleId: "python-basics",
      lessonNumber: 2,
      title: "Lists & Tuples",
      description: "Work with ordered sequences — the backbone of data manipulation.",
      duration: "15 min",
      difficulty: "Beginner",
      pages: [
        {
          pageNumber: 1,
          title: "Lists — Mutable Sequences",
          content: `# Lists & Tuples

## Lists — Mutable Sequences

In computer science, a **sequence** is an ordered collection of elements where each item is accessible by its position (index). Python's \`list\` is a *mutable*, *dynamic* sequence — it can hold elements of any type mixed together, and it can grow or shrink at runtime. Internally, Python stores a list as an array of pointers to objects, making it flexible but general-purpose.

In practice, a **list** is Python's most versatile ordered collection. Lists are *mutable* — you can change, add, or remove elements after creation.

\`\`\`python
fruits = ["apple", "banana", "cherry"]
#          index 0     index 1     index 2
#         index -3    index -2    index -1  (negative)
\`\`\`

### Indexing & Slicing

\`\`\`python
fruits[0]      # "apple"      — first element
fruits[-1]     # "cherry"     — last element
fruits[1:3]    # ["banana", "cherry"]  — slice
fruits[::-1]   # reversed list
\`\`\`

### Core List Methods

\`\`\`python
fruits.append("mango")     # add to end
fruits.insert(1, "grape")  # insert at index
fruits.remove("banana")    # remove by value
fruits.pop()               # remove & return last
fruits.sort()              # sort in-place
len(fruits)                # length
\`\`\`

> **Data Science relevance:** Lists are the foundation for NumPy arrays and Pandas Series.
`,
          starterCode: `# Lists in action

scores = [88, 92, 75, 96, 84, 91, 78, 95, 82, 89]

print("=== List Basics ===")
print(f"Scores       : {scores}")
print(f"First score  : {scores[0]}")
print(f"Last score   : {scores[-1]}")
print(f"Top 3 (slice): {scores[:3]}")
print(f"Length       : {len(scores)}")

# Modifying
scores.append(100)
print(f"\\nAfter append(100): {scores}")

scores.sort(reverse=True)
print(f"Sorted (desc)    : {scores}")

# Aggregate operations
print(f"\\nMax   : {max(scores)}")
print(f"Min   : {min(scores)}")
print(f"Sum   : {sum(scores)}")
print(f"Mean  : {sum(scores)/len(scores):.1f}")

# List comprehension
passed = [s for s in scores if s >= 85]
print(f"\\nScores ≥ 85: {passed}")
print(f"Pass rate  : {len(passed)/len(scores)*100:.0f}%")
`,
        },
        {
          pageNumber: 2,
          title: "Tuples & When to Use Them",
          content: `## Tuples — Immutable Sequences

A **tuple** is like a list but *immutable* — once created, it cannot be changed. Use tuples for data that should not be modified.

\`\`\`python
coordinates = (40.7128, -74.0060)  # New York lat/lon
rgb_red = (255, 0, 0)
\`\`\`

### List vs Tuple — When to Use Which?

| | List | Tuple |
|--|------|-------|
| Syntax | \`[1, 2, 3]\` | \`(1, 2, 3)\` |
| Mutable | ✅ Yes | ❌ No |
| Use for | Changing data | Fixed records |
| Performance | Slightly slower | Faster |
| Hashable | ❌ No | ✅ Yes |

### Tuple Unpacking

One of Python's most elegant features:

\`\`\`python
point = (10, 20)
x, y = point  # x=10, y=20

# Swap variables without temp
a, b = 5, 10
a, b = b, a   # a=10, b=5
\`\`\`

### Named Tuples

For readability, use \`collections.namedtuple\`:

\`\`\`python
from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(10, 20)
print(p.x, p.y)  # 10 20
\`\`\`
`,
          starterCode: `from collections import namedtuple

# Basic tuple
city = ("New York", "USA", 8_336_817)
print(f"City: {city[0]}, Country: {city[1]}, Pop: {city[2]:,}")

# Tuple unpacking
name, country, population = city
print(f"\\nUnpacked → name={name}, pop={population:,}")

# Swap with tuple unpacking
a, b = 42, 99
print(f"\\nBefore swap: a={a}, b={b}")
a, b = b, a
print(f"After swap : a={a}, b={b}")

# Named tuple — much more readable
DataPoint = namedtuple("DataPoint", ["feature", "value", "unit"])
temp = DataPoint("Temperature", 36.6, "°C")
pressure = DataPoint("Pressure", 1013.25, "hPa")

for dp in [temp, pressure]:
    print(f"  {dp.feature}: {dp.value} {dp.unit}")

# Tuple as dict key (lists can't do this!)
grid = {}
grid[(0, 0)] = "origin"
grid[(1, 2)] = "point A"
print(f"\\nGrid: {grid}")
`,
        },
      ],
    },
    {
      id: "py-dicts",
      moduleId: "python-basics",
      lessonNumber: 3,
      title: "Dictionaries & Sets",
      description: "Master key-value storage and unique collections.",
      duration: "14 min",
      difficulty: "Beginner",
      pages: [
        {
          pageNumber: 1,
          title: "Dictionaries",
          content: `# Dictionaries & Sets

## Dictionaries — Key-Value Storage

Dictionaries are **unordered** (Python 3.7+: insertion-ordered) mappings from keys to values. They enable O(1) lookups — essential for large datasets.

\`\`\`python
student = {
    "name": "Alice",
    "age": 22,
    "grades": [90, 85, 92],
    "enrolled": True
}
\`\`\`

### Accessing & Modifying

\`\`\`python
student["name"]              # "Alice"
student.get("gpa", 0.0)      # 0.0  (safe default)
student["email"] = "a@b.com" # add key
del student["age"]           # remove key
"name" in student            # True
\`\`\`

### Iterating

\`\`\`python
for key, value in student.items():
    print(f"{key}: {value}")
\`\`\`

> **Data Science relevance:** JSON APIs, configuration files, and Pandas' \`to_dict()\` all return dictionaries.
`,
          starterCode: `# Dictionaries — a mini data record system

dataset_info = {
    "name": "Iris Flower Dataset",
    "samples": 150,
    "features": ["sepal_length", "sepal_width", "petal_length", "petal_width"],
    "classes": ["setosa", "versicolor", "virginica"],
    "source": "UCI Machine Learning Repository",
    "year": 1936
}

# Access
print(f"Dataset  : {dataset_info['name']}")
print(f"Samples  : {dataset_info['samples']}")
print(f"Features : {dataset_info['features']}")

# Safe access with default
print(f"License  : {dataset_info.get('license', 'Not specified')}")

# Iterate
print("\\n--- All Info ---")
for key, val in dataset_info.items():
    print(f"  {key:10s}: {val}")

# Dict comprehension
squared = {x: x**2 for x in range(1, 6)}
print(f"\\nSquares: {squared}")

# Nested dict
model_scores = {
    "linear_regression": {"train": 0.82, "test": 0.79},
    "random_forest":     {"train": 0.97, "test": 0.88},
    "svm":               {"train": 0.91, "test": 0.85},
}
print("\\nModel Results:")
for model, scores in model_scores.items():
    print(f"  {model:20s} → train={scores['train']:.2f}, test={scores['test']:.2f}")
`,
        },
        {
          pageNumber: 2,
          title: "Sets — Unique Collections",
          content: `## Sets — Unique Collections

A **set** is an unordered collection of **unique** values. Use sets when you only care about membership ("Is this item here?") and need to eliminate duplicates.

\`\`\`python
fruit_colors = {"red", "green", "yellow", "red"}
# Set automatically removes duplicate "red"
# Result: {"red", "green", "yellow"}
\`\`\`

### Creating Sets

\`\`\`python
s = {1, 2, 3}             # set literal
s = set([1, 2, 2, 3])     # from list (removes duplicates)
s = set("hello")          # from string → {'h', 'e', 'l', 'o'}
\`\`\`

### Set Operations (for Data Filtering)

\`\`\`python
users_bought_a = {1, 3, 5, 7}
users_bought_b = {2, 3, 6, 7, 8}

# Intersection: bought BOTH A and B
users_bought_a & users_bought_b  # {3, 7}

# Union: bought EITHER A or B
users_bought_a | users_bought_b  # {1, 2, 3, 5, 6, 7, 8}

# Difference: bought A but NOT B
users_bought_a - users_bought_b  # {1, 5}
\`\`\`

### Set Methods

\`\`\`python
s = {1, 2, 3}
s.add(4)              # {1, 2, 3, 4}
s.remove(2)           # {1, 3, 4} — raises KeyError if not found
s.discard(2)          # {1, 3, 4} — no error if not found
s.pop()               # remove & return arbitrary element
1 in s                # True (O(1) lookup!)
\`\`\`

> **When to use sets:** Filtering duplicate IDs, finding common elements between datasets, membership testing.
`,
          starterCode: `# Sets for Data Analysis

# Real-world: User engagement across platforms
users_facebook = {101, 203, 105, 408, 512}
users_twitter = {203, 405, 512, 614, 700}
users_instagram = {105, 203, 512, 715, 819}

# Users on all three platforms
overlapping = users_facebook & users_twitter & users_instagram
print(f"On all 3 platforms: {overlapping}")

# Users on at least one platform
any_platform = users_facebook | users_twitter | users_instagram
print(f"Total unique users : {len(any_platform)}")

# Users ONLY on Facebook (not on Twitter/Instagram)
facebook_only = users_facebook - (users_twitter | users_instagram)
print(f"Facebook-only users: {facebook_only}")

# Remove duplicates from a list
scores = [95, 88, 95, 76, 88, 92, 100, 100, 76]
unique_scores = set(scores)
print(f"\\nDuplicate scores : {scores}")
print(f"Unique scores    : {sorted(unique_scores, reverse=True)}")

# Check if category exists (O(1) lookup!)
valid_categories = {"spam", "ham", "important", "archive"}
user_label = "ham"
print(f"\\n'{user_label}' is valid: {user_label in valid_categories}")
`,
        },
      ],
    },
    {
        id: "py-control-flow",
        moduleId: "python-basics",
        lessonNumber: 4,
        title: "Control Flow & Loops",
        description: "Direct the logic of your programs using conditionals and iterations.",
        duration: "18 min",
        difficulty: "Beginner",
        pages: [
          {
            pageNumber: 1,
            title: "If / Elif / Else",
            content: `# Control Flow & Loops

## Making Decisions with \`if\`

Control flow allows your program to react differently based on conditions.

\`\`\`python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C"
\`\`\`

### Truthy & Falsy Values
In Python, empty containers and zeros evaluate to \`False\`:

| Falsy | Truthy |
|-------|--------|
| \`0\`, \`0.0\` | Any non-zero number |
| \`""\`, \`[]\`, \`{}\` | Non-empty string/list/dict |
| \`None\`, \`False\` | Everything else |

\`\`\`python
data = []
if not data:
    print("Data is empty!") # This will run
\`\`\`
`,
            starterCode: `# Control Flow Practice
scores = [45, 82, 91, 76, 88, 99, 63]

print("=== Grade Distribution ===")
grades = {"A": 0, "B": 0, "C": 0, "F": 0}

for score in scores:
    if score >= 90:
        grades["A"] += 1
    elif score >= 80:
        grades["B"] += 1
    elif score >= 70:
        grades["C"] += 1
    else:
        grades["F"] += 1

for grade, count in grades.items():
    if count > 0:
        print(f"{grade}: {'█' * count} ({count})")

# Truthy / Falsy checks
user_input = ""
dataset = None

if not user_input:
    print("\\nWarning: user_input is empty or falsy!")
if not dataset:
    print("Warning: dataset is None!")
`,
          },
          {
            pageNumber: 2,
            title: "For & While Loops",
            content: `## Loops

### \`for\` Loops
Python's \`for\` loop iterates over items in an iterable (lists, strings, ranges):

\`\`\`python
for i in range(5):    # 0, 1, 2, 3, 4
for char in "Data":   # D, a, t, a
\`\`\`

### \`while\` Loops
Run until a condition is false:

\`\`\`python
while x < 10:
    x += 1
\`\`\`

### Loop Control
- \`break\`: Exit the loop immediately
- \`continue\`: Skip the rest of the current iteration

### Enumerate & Zip (Essential for Data Science)
\`\`\`python
for i, val in enumerate(['a', 'b']):
    # i is index, val is value
    
for name, age in zip(names, ages):
    # iterate over two lists at once
\`\`\`
`,
            starterCode: `# Advanced Looping Techniques

features = ["Age", "Income", "Score", "Balance"]
importance = [0.8, 0.65, 0.9, 0.4]

# 1. Enumerate (get index + value)
print("=== Feature Ranking ===")
for rank, feat in enumerate(features, start=1):
    print(f"{rank}. {feat}")

# 2. Zip (iterate multiple lists)
print("\\n=== Feature Importance ===")
for feat, imp in zip(features, importance):
    bar = "█" * int(imp * 10)
    print(f"{feat:10s} | {bar} {imp:.1f}")

# 3. While loop with break
print("\\n=== Simulating Data Stream ===")
count = 0
while True:
    count += 1
    if count % 13 == 0:
        print(f"Found bad batch at index {count}. Stopping.")
        break
    if count == 50:
        print("Reached end of stream.")
        break
`,
          },
        ],
      },
      {
        id: "py-functions",
        moduleId: "python-basics",
        lessonNumber: 5,
        title: "Functions & Scope",
        description: "Write reusable, clean code blocks and understand variable scope.",
        duration: "16 min",
        difficulty: "Beginner",
        pages: [
          {
            pageNumber: 1,
            title: "Defining Functions",
            content: `# Functions & Scope

## What is a Function?

In mathematics, a function maps inputs to outputs: *f(x) = y*. In programming, a **function** is a named, reusable block of code that accepts zero or more inputs (called *parameters*), executes a defined task, and optionally returns a value. Functions are the primary mechanism for abstraction and code reuse — the industry principle called **DRY** (*Don't Repeat Yourself*) says: if you write the same logic twice, it belongs in a function.

Functions also make code testable and readable: instead of a 200-line script, well-written code reads like a sequence of named steps.

### Basic Syntax

\`\`\`python
def calculate_mse(actual, predicted):
    n = len(actual)
    error = sum((a - p)**2 for a, p in zip(actual, predicted)) / n
    return error
\`\`\`

### Default & Keyword Arguments

\`\`\`python
def train_model(data, epochs=10, learning_rate=0.01):
    pass

train_model(my_data)                          # uses defaults
train_model(my_data, epochs=50, learning_rate=0.1) # overrides
\`\`\`

### \*args and \*\*kwargs
Pass a variable number of arguments:

\`\`\`python
def log_metrics(**kwargs):
    for key, val in kwargs.items():
        print(f"{key}: {val}")
        
log_metrics(accuracy=0.9, loss=0.05)
\`\`\`
`,
            starterCode: `# Functions in Data Science

def normalize_list(data):
    """Scales a list of numbers between 0 and 1."""
    if not data: return []
    min_val, max_val = min(data), max(data)
    if min_val == max_val: return [0.5] * len(data)
    return [(x - min_val) / (max_val - min_val) for x in data]

def print_summary(**kwargs):
    print("--- Model Summary ---")
    for key, val in kwargs.items():
        print(f"  {key:12s}: {val}")

# Usage
raw_data = [15, 40, 85, 90, 20, 55]
normalized = normalize_list(raw_data)

print("Raw Data:", raw_data)
print("Normalized:", [round(n, 2) for n in normalized])

# **kwargs usage
print_summary(
    model="RandomForest",
    accuracy=0.94,
    precision=0.91,
    recall=0.89
)
`,
          },
          {
            pageNumber: 2,
            title: "Lambda Functions & Scope",
            content: `## Lambda Functions

Small, anonymous functions defined in one line. Perfect for short operations.

\`\`\`python
# Normal function
def square(x): return x**2

# Lambda equivalent
square = lambda x: x**2
\`\`\`

**Where Lambdas shine:** Inside functions like \`map()\`, \`filter()\`, and \`sorted()\`:

\`\`\`python
names = ["Alice", "bob", "Charlie"]
sorted(names, key=lambda x: x.lower())
\`\`\`

## Variable Scope (LEGB Rule)

Python looks for variables in this order:
1. **L**ocal (inside the function)
2. **E**nclosing (inside nested functions)
3. **G**lobal (module level)
4. **B**uilt-in (Python built-ins like \`len\`, \`print\`)

\`\`\`python
x = "global"
def my_func():
    x = "local" # Creates a new local variable, doesn't change global
\`\`\`
`,
            starterCode: `# Lambda & Map/Filter

# Map: Apply function to every item
prices = [100, 200, 150]
prices_with_tax = list(map(lambda p: p * 1.18, prices))
print("Prices with tax:", prices_with_tax)

# Filter: Keep items that return True
scores = [45, 82, 91, 30, 88]
passing = list(filter(lambda s: s >= 50, scores))
print("Passing scores:", passing)

# Sorted with custom key
models = [
    {"name": "LR", "score": 0.8},
    {"name": "RF", "score": 0.95},
    {"name": "SVM", "score": 0.88}
]
best_models = sorted(models, key=lambda m: m["score"], reverse=True)
print("\\nBest Models:")
for m in best_models:
    print(f"  {m['name']}: {m['score']}")

# Scope example
counter = 0
def increment():
    global counter  # Required to modify outer scope
    counter += 1
increment()
increment()
print(f"\\nGlobal counter: {counter}")
`,
          }
        ],
      },
      {
        id: "py-errors",
        moduleId: "python-basics",
        lessonNumber: 6,
        title: "Error Handling",
        description: "Prevent your data pipelines from crashing using Try/Except blocks.",
        duration: "12 min",
        difficulty: "Beginner",
        pages: [
          {
            pageNumber: 1,
            title: "Try / Except / Finally",
            content: `# Error Handling

## What is an Exception?

In programming, an **exception** is an event that disrupts the normal sequential flow of execution. When Python encounters an error at runtime — such as dividing by zero, reading a missing file, or applying an operation to the wrong type — it *raises* an exception object. This object propagates up the call stack until it reaches code that explicitly handles it. If nothing handles it, the program terminates and prints a traceback.

In Data Science, data is messy and unpredictable. A division by zero, a missing file, or wrong data types will crash your entire pipeline if you don't handle exceptions properly. 

### The Try/Except Block

\`\`\`python
try:
    # Risky code
    result = 10 / 0
except ZeroDivisionError:
    # What to do if it fails
    print("Cannot divide by zero!")
finally:
    # Always runs (cleanup)
    print("Execution finished.")
\`\`\`

### Common Data Science Exceptions
- \`KeyError\`: Accessing a missing dictionary key or Pandas column.
- \`TypeError\`: Applying math to strings.
- \`IndexError\`: Accessing a list index that doesn't exist.
- \`ValueError\`: Converting a non-numeric string to float.

> 💡 **Best Practice:** Never use a "bare except" (just \`except:\`). Always catch the specific error so you don't accidentally hide bugs.
`,
            starterCode: `# Robust Data Processing
import math

raw_data = ["42.5", "missing", "100", None, "75.3", "0"]

clean_data = []

for val in raw_data:
    try:
        # Attempt to convert and process
        num = float(val)
        if num == 0:
            raise ValueError("Cannot calculate log of 0")
        log_val = math.log(num)
        clean_data.append(log_val)
        
    except (TypeError, ValueError) as e:
        # Handle bad data gracefully
        print(f"Skipping '{val}' -> Reason: {e}")
    except Exception as e:
        print(f"Unexpected error on '{val}': {e}")

print(f"\\nSuccessfully processed {len(clean_data)} items:")
print([round(v, 2) for v in clean_data])
`,
          },
        ],
      },
    {
      id: "py-file-io",
      moduleId: "python-basics",
      lessonNumber: 7,
      title: "File I/O & Reading Data",
      description: "Read and write files — the gateway to real datasets.",
      duration: "14 min",
      difficulty: "Beginner",
      pages: [
        {
          pageNumber: 1,
          title: "Reading & Writing Text Files",
          content: `# File I/O & Reading Data

## What is File I/O?

In computing, **Input/Output (I/O)** refers to all communication between a running program and the outside world — files on disk, network sockets, databases, or user input. **File I/O** specifically means reading data stored in files or writing results back to disk. Files are *persistent*: unlike variables in memory that disappear when the program ends, file data survives across runs.

As a data practitioner, virtually every real dataset you work with lives in a file — CSV, JSON, Excel, Parquet, or plain text. You must know how to read and write them reliably.

### Reading Text Files

\`\`\`python
with open("data.txt", "r") as f:
    content = f.read()  # entire file as string
    lines = f.readlines()  # list of lines
\`\`\`

> **The \`with\` statement:** Automatically closes the file, even if an error occurs. Always use it!

### Writing to Files

\`\`\`python
with open("output.txt", "w") as f:
    f.write("Hello, Data Science!\\\\n")
    f.writelines(["line1", "line2"])  # write multiple
\`\`\`

### Line-by-Line Processing (Memory Efficient)

\`\`\`python
with open("large_dataset.txt", "r") as f:
    for line in f:  # doesn't load entire file
        process(line.strip())
\`\`\`
`,
          starterCode: `# File I/O Demo

# 1. Write some data
data_lines = [
    "Feature,Value",
    "Accuracy,0.94",
    "Loss,0.08",
    "F1-Score,0.92"
]

with open("/tmp/results.txt", "w") as f:
    f.write("\\n".join(data_lines))
print("✓ File written to /tmp/results.txt")

# 2. Read it back
with open("/tmp/results.txt", "r") as f:
    content = f.read()
    print("\\n=== File Content ===")
    print(content)

# 3. Read line by line
print("\\n=== Line by Line ===")
with open("/tmp/results.txt", "r") as f:
    for i, line in enumerate(f, start=1):
        print(f"  Line {i}: {line.strip()}")
`,
        },
      ],
    },
    {
      id: "py-json",
      moduleId: "python-basics",
      lessonNumber: 8,
      title: "Working with JSON",
      description: "Parse and create JSON — the language of web APIs.",
      duration: "13 min",
      difficulty: "Beginner",
      pages: [
        {
          pageNumber: 1,
          title: "JSON for Data Science",
          content: `# Working with JSON

## What is JSON?
JSON (JavaScript Object Notation) is the standard format for APIs and data exchange. Python's \`json\` module makes parsing trivial.

### JSON Data Types Map to Python

| JSON | Python |
|------|--------|
| \`{...}\` | \`dict\` |
| \`[...]\` | \`list\` |
| \`"string"\` | \`str\` |
| \`123\` | \`int\` |
| \`true/false\` | \`True/False\` |
| \`null\` | \`None\` |

### Parsing JSON (Strings → Python Objects)

\`\`\`python
import json

json_str = '{"name": "Alice", "age": 30}'
data = json.loads(json_str)  # loads = "load from string"
print(data["name"])  # Alice
\`\`\`

### Converting Python → JSON (Objects → Strings)

\`\`\`python
python_dict = {"status": "success", "code": 200}
json_str = json.dumps(python_dict)  # dumps = "dump to string"
\`\`\`

### File Operations

\`\`\`python
# Read JSON from file
with open("data.json") as f:
    data = json.load(f)  # singular: load from file

# Write JSON to file
with open("output.json", "w") as f:
    json.dump(data, f, indent=2)  # pretty-print with indent
\`\`\`
`,
          starterCode: `import json

# 1. Parse JSON string
json_response = '''{  
    "model": "RandomForest",
    "accuracy": 0.94,
    "metrics": {"precision": 0.91, "recall": 0.89},
    "classes": ["spam", "ham"],
    "trained": true
}'''

results = json.loads(json_response)
print("=== Parsed JSON ===")
for key, val in results.items():
    print(f"  {key}: {val}")

# 2. Convert Python dict to JSON string
model_config = {
    "name": "XGBoost",
    "params": {"n_estimators": 100, "max_depth": 5},
    "version": "1.5.2"
}

json_str = json.dumps(model_config, indent=2)
print("\\n=== JSON String ===")
print(json_str)

# 3. Working with JSON files
with open("/tmp/model.json", "w") as f:
    json.dump(model_config, f, indent=2)

with open("/tmp/model.json", "r") as f:
    loaded = json.load(f)
    print("\\n=== Loaded from File ===")
    print(f"Model: {loaded['name']}, Estimators: {loaded['params']['n_estimators']}")
`,
        },
      ],
    },
    {
      id: "py-string-methods",
      moduleId: "python-basics",
      lessonNumber: 9,
      title: "Advanced String Methods",
      description: "Master string manipulation, regex, and text processing for data cleaning.",
      duration: "15 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "String Methods & Regular Expressions",
          content: `# Advanced String Methods

## String Manipulation Methods

Strings have powerful built-in methods for cleaning and transforming data:

\`\`\`python
text = "  Hello, World!  "

text.strip()              # "Hello, World!"  — remove whitespace
text.replace("World", "Python")  # "Hello, Python!"
text.find("World")        # 8 — index of first occurrence
text.startswith("Hello")  # True
text.split(", ")          # ["Hello", "World!"]
text.upper()              # "HELLO, WORLD!"
text.lower()              # "hello, world!"
\`\`\`

### Working with Regular Expressions (regex)

The \`re\` module provides pattern matching for complex text operations:

\`\`\`python
import re

text = "Email: alice@example.com, bob@test.org"

# Find all emails
emails = re.findall(r"[\\w.-]+@[\\w.-]+\\.\\w+", text)
# Result: ['alice@example.com', 'bob@test.org']

# Replace patterns
cleaned = re.sub(r"\\d+", "[NUMBER]", "ID-12345-XYZ-678")
# Result: "ID-[NUMBER]-XYZ-[NUMBER]"

# Match at start
if re.match(r"^[A-Z]", "Apple"):
    print("Starts with capital letter!")
\`\`\`

> **Data cleaning gold:** Use regex to validate emails, phone numbers, URLs, and extract patterns from messy text.
`,
          starterCode: `import re

# 1. String methods for data cleaning
raw_names = ["  Alice Johnson  ", "Bob SMITH", "  charlie brown  "]

cleaned_names = [name.strip().title() for name in raw_names]
print("=== Name Cleaning ===")
for original, cleaned in zip(raw_names, cleaned_names):
    print(f"  '{original}' → '{cleaned}'")

# 2. Regex for email extraction
emails_text = """
Contact Info:
- Support: support@example.com
- Sales: sales@example.co.uk
- Admin: invalid-email@
- Tech: tech@company.io
"""

email_pattern = r"[\\w\\.-]+@[\\w\\.-]+\\.\\w+"
valid_emails = re.findall(email_pattern, emails_text)
print(f"\\n=== Extracted Emails ===")
print(valid_emails)

# 3. Regex for phone number extraction
phone_text = "Call 555-123-4567 or (555) 987-6543 or 5551112222"
phone_pattern = r"(\\d{3}[-.\\s]?\\d{3}[-.\\s]?\\d{4}|\\d{10})"
phones = re.findall(phone_pattern, phone_text)
print(f"\\n=== Extracted Phones ===")
print(phones)

# 4. String validation
def is_valid_username(username):
    # Only alphanumeric and underscore, 3-20 chars
    pattern = r"^[a-zA-Z0-9_]{3,20}$"
    return bool(re.match(pattern, username))

test_usernames = ["alice_123", "bob", "invalid-user!", "test_user_2024"]
print("\\n=== Username Validation ===")
for u in test_usernames:
    print(f"  {u:20s}: {'✓ Valid' if is_valid_username(u) else '✗ Invalid'}")
`,
        },
      ],
    },
    {
      id: "py-comprehensions",
      moduleId: "python-basics",
      lessonNumber: 10,
      title: "Comprehensions & Generators",
      description: "Write concise, efficient code with list/dict comprehensions and generators.",
      duration: "14 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "List & Dictionary Comprehensions",
          content: `# Comprehensions & Generators

## List Comprehensions

List comprehensions provide a concise way to create lists. They're **readable AND fast**.

### Basic Syntax

\`\`\`python
# Traditional approach
squares = []
for x in range(5):
    squares.append(x**2)

# Comprehension (cleaner!)
squares = [x**2 for x in range(5)]  # [0, 1, 4, 9, 16]
\`\`\`

### With Conditionals

\`\`\`python
# Keep only even numbers
evens = [x for x in range(10) if x % 2 == 0]
# [0, 2, 4, 6, 8]

# Transform AND filter
high_scores = [s*1.1 for s in scores if s >= 80]
\`\`\`

### Nested Comprehensions

\`\`\`python
# Flatten a 2D matrix
matrix = [[1, 2, 3], [4, 5, 6]]
flattened = [num for row in matrix for num in row]
# [1, 2, 3, 4, 5, 6]
\`\`\`

## Dictionary & Set Comprehensions

Similar to lists, but for dictionaries and sets:

\`\`\`python
# Dict comprehension
scores_dict = {name: score for name, score in zip(names, scores)}

# Set comprehension (removes duplicates)
unique_lengths = {len(word) for word in words}
\`\`\`

> **Pro tip:** Comprehensions are faster and more Pythonic than loops with append().
`,
          starterCode: `# Comprehensions for Data Science

# 1. List comprehension — process data
data = [45, 82, 91, 30, 88, 76, 55, 92]

# Filter students who passed (≥70)
passed = [s for s in data if s >= 70]
print(f"Passed: {passed}")

# Scale scores to 0-1
normalized = [s/100 for s in data]
print(f"Normalized (first 3): {normalized[:3]}")

# Convert to letter grades
grades = ['A' if s >= 90 else 'B' if s >= 80 else 'C' if s >= 70 else 'F' for s in data]
print(f"Grades: {grades}")

# 2. Dictionary comprehension
names = ["Alice", "Bob", "Charlie", "Diana"]
scores_list = [92, 88, 95, 87]

score_dict = {name: score for name, score in zip(names, scores_list)}
print(f"\\nScore Dict: {score_dict}")

# Dict from list of tuples
result_tuples = [("model_a", 0.92), ("model_b", 0.88), ("model_c", 0.95)]
model_dict = {model: acc for model, acc in result_tuples}
print(f"Models: {model_dict}")

# 3. Set comprehension — unique values
words = ["apple", "banana", "apple", "cherry", "banana", "date"]
unique_words = {word for word in words}
print(f"\\nUnique words: {unique_words}")

# Length of each word
word_lengths = {word: len(word) for word in words}
print(f"Word lengths: {word_lengths}")
`,
        },
        {
          pageNumber: 2,
          title: "Generators & Memory Efficiency",
          content: `## Generators — Lazy Evaluation

A **generator** is like a list, but it generates values *on-the-fly* instead of storing them all in memory. Perfect for large datasets.

### Generator Expressions

Use parentheses instead of brackets:

\`\`\`python
# List (stores all 1M items in memory)
squares_list = [x**2 for x in range(1_000_000)]

# Generator (generates each value when needed)
squares_gen = (x**2 for x in range(1_000_000))
\`\`\`

### Generator Functions

Use \`yield\` to create a generator function:

\`\`\`python
def count_up(n):
    i = 0
    while i < n:
        yield i      # "pause" and return value
        i += 1

for num in count_up(5):
    print(num)  # prints 0, 1, 2, 3, 4
\`\`\`

### Why Generators Matter

- **Memory efficient:** Process large files line-by-line instead of loading all into memory
- **Lazy evaluation:** Only compute what you need
- **Infinite sequences:** Can create endless generators

\`\`\`python
# Read a 10GB file without loading it all at once
with open("huge_dataset.csv") as f:
    for line in f:  # Implicit generator!
        process(line)
\`\`\`

> **Data pipeline rule:** If you're processing data that doesn't fit in memory, use generators.
`,
          starterCode: `# Generators for Large Data Processing

import sys

# 1. Compare memory: list vs generator
print("=== Memory Comparison ===")
size = 100_000

# List (stores everything)
list_comp = [x**2 for x in range(size)]
print(f"List size: {sys.getsizeof(list_comp)} bytes")

# Generator (lazy evaluation)
gen_comp = (x**2 for x in range(size))
print(f"Generator size: {sys.getsizeof(gen_comp)} bytes")  # Much smaller!

# 2. Generator function for infinite sequence
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

print("\\n=== First 10 Fibonacci Numbers ===")
fib_gen = fibonacci()
for i, num in enumerate(fib_gen):
    if i >= 10: break
    print(num, end=" ")

# 3. Generator for file processing (simulated)
def read_large_csv(filename, chunk_size=1000):
    """Simulate reading a huge CSV file in chunks."""
    # In reality, this would read from disk
    for i in range(0, 10000, chunk_size):
        batch = [f"row_{j}" for j in range(i, i + chunk_size)]
        yield batch

print("\\n\\n=== Processing Large File (Simulated) ===")
for batch_num, batch in enumerate(read_large_csv("fake.csv"), 1):
    print(f"  Batch {batch_num}: processed {len(batch)} rows")
    if batch_num >= 3: break

# 4. Generator for data transformation
def process_scores(scores):
    for score in scores:
        if 0 <= score <= 100:
            # Clean and yield
            yield {"raw": score, "normalized": score/100, "grade": "Pass" if score >= 70 else "Fail"}

scores = [95, 102, 55, 88, -5, 72]
print("\\n=== Score Processing Pipeline ===")
for record in process_scores(scores):
    print(record)
`,
        },
      ],
    },
    {
      id: "py-debugging-best-practices",
      moduleId: "python-basics",
      lessonNumber: 11,
      title: "Debugging & Best Practices",
      description: "Write professional, debuggable code using assertions, logging, and testing.",
      duration: "13 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Debugging, Logging & Assertions",
          content: `# Debugging & Best Practices

## Using \`print()\` vs Logging

\`print()\` is fine for quick scripts, but **logging** is professional:

\`\`\`python
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

logger.debug("Detailed diagnostic info")
logger.info("General informational message")
logger.warning("Something unexpected!")
logger.error("A serious problem occurred")
logger.critical("The program may not continue!")
\`\`\`

## Assertions for Data Validation

Assert that your assumptions about data are true:

\`\`\`python
def process_scores(scores):
    assert isinstance(scores, list), "scores must be a list"
    assert len(scores) > 0, "scores cannot be empty"
    assert all(0 <= s <= 100 for s in scores), "all scores must be 0-100"
    
    return sum(scores) / len(scores)
\`\`\`

> **When to use assertions:** Catch programmer errors, not user errors.

## Debugging with \`pdb\`

Python Debugger — set breakpoints and step through code:

\`\`\`python
import pdb

def buggy_function():
    x = 10
    pdb.set_trace()  # Execution pauses here
    y = x / 0        # Debugger lets you inspect x before this crashes
\`\`\`

## Code Quality Best Practices

1. **Name variables clearly:** \`user_age\` not \`a\`
2. **Use type hints (modern Python):** \`def calculate(x: int) -> float:\`
3. **Write docstrings:** Explain *why*, not just *what*
4. **Keep functions small:** One responsibility each
5. **Use constants for magic numbers:** \`MAX_RETRIES = 3\`
`,
          starterCode: `import logging
import sys

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s: %(message)s'
)
logger = logging.getLogger(__name__)

# Example: Processing data with logging
def load_and_validate_data(data, min_length=3, max_value=100):
    """
    Load and validate data.
    
    Args:
        data: List of numeric values
        min_length: Minimum expected length
        max_value: Maximum allowed value
        
    Returns:
        Validated list or None if validation fails
    """
    # Assertions for programmer errors
    assert isinstance(data, list), "data must be a list"
    assert min_length > 0, "min_length must be positive"
    
    logger.info(f"Loading {len(data)} items...")
    
    # Validate
    if len(data) < min_length:
        logger.error(f"Expected ≥{min_length} items, got {len(data)}")
        return None
    
    bad_values = [v for v in data if not isinstance(v, (int, float))]
    if bad_values:
        logger.warning(f"Found {len(bad_values)} non-numeric values: {bad_values}")
    
    out_of_range = [v for v in data if v > max_value]
    if out_of_range:
        logger.warning(f"Values exceed {max_value}: {out_of_range}")
        return None
    
    logger.info("✓ Validation passed!")
    return data

# Test it
print("=== Test 1: Valid Data ===")
valid_data = [10, 20, 30, 40, 50]
result = load_and_validate_data(valid_data)

print("\\n=== Test 2: Too Few Items ===")
small_data = [10, 20]
result = load_and_validate_data(small_data, min_length=3)

print("\\n=== Test 3: Values Out of Range ===")
bad_data = [10, 20, 150, 40]
result = load_and_validate_data(bad_data, max_value=100)

print("\\n=== Type Hints Example ===")
def calculate_accuracy(correct: int, total: int) -> float:
    """Calculate accuracy as a percentage."""
    if total <= 0:
        logger.error("Total must be positive")
        return 0.0
    return (correct / total) * 100

accuracy = calculate_accuracy(85, 100)
logger.info(f"Model accuracy: {accuracy:.1f}%")
`,
        },
      ],
    },
    ],
};

// ─────────────────────────────────────────────────────────────
// MODULE 2 — Intro to Pandas
// ─────────────────────────────────────────────────────────────
const pandasModule: Module = {
  id: "pandas-intro",
  title: "Intro to Pandas",
  slug: "pandas",
  description:
    "The world's most popular data manipulation library. Load, clean, filter, and analyse tabular data with ease.",
  introduction: `# Welcome to Pandas — Data Manipulation Mastery 🐼

## Why Pandas is Essential

Pandas is the **most used data manipulation library** in the world. If you work with datasets, spreadsheets, or databases, Pandas is your tool:

- **Load & Explore:** Read CSV, Excel, SQL data instantly
- **Clean:** Handle missing values, duplicates, inconsistencies
- **Filter & Sort:** Slice data exactly how you need it
- **Aggregate:** Group by, sum, average, pivot tables
- **Visualize:** Plot directly from DataFrames
- **Export:** Save to CSV, Excel, SQL, Parquet, etc.

## Real-World Example

\`\`\`python
import pandas as pd

# Load a CSV file
df = pd.read_csv('sales.csv')

# Quick exploration
print(df.head())           # First 5 rows
print(df.describe())       # Statistics
print(df[df['sales'] > 1000])  # Filter
print(df.groupby('region').sum())  # Aggregation
\`\`\`

In just a few lines, you've loaded, explored, filtered, and analyzed thousands of rows!

## Prerequisites

✅ Complete **Module 1 (Python Basics)** first—you'll need:
- Variables and data types
- Lists and dictionaries
- Functions and loops
- String operations

## What You'll Learn

1. **DataFrames** — 2D labeled tables (the heart of Pandas)
2. **Series** — 1D labeled arrays
3. **Data Loading** — Read from CSV, Excel, SQL, JSON
4. **Exploration** — head(), info(), describe(), dtypes
5. **Cleaning** — Handle NaN, duplicates, inconsistencies
6. **Filtering & Selection** — Loc, iloc, boolean indexing
7. **Aggregation** — Group by, sum, mean, custom functions
8. **Merging & Joining** — Combine multiple datasets
9. **Pivot Tables** — Cross-tabulation and summaries
10. **Time Series** — Working with dates and time data
11. **Performance Tips** — Optimize for large datasets
12. **Real-World Project** — End-to-end analysis workflow

## The Data Science Pipeline

\`\`\`
Raw Data → [PANDAS] → Clean Data → Visualization/ML → Insights
\`\`\`

This module is the **critical middle step**. Everything you do here determines the quality of your analysis downstream.

> 💡 **Fun Fact:** Pandas was created by Wes McKinney at AQR Capital Management in 2008. It's now maintained by the open-source community and used by Fortune 500 companies, startups, and researchers worldwide.

Let's dive in! 🚀`, 
  icon: "🐼",
  color: "from-cyan-600 to-cyan-900",
  level: "Intermediate",
  totalDuration: "5h 36min",
  heroImage:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  lessons: [
    {
      id: "pd-dataframes",
      moduleId: "pandas-intro",
      lessonNumber: 1,
      title: "DataFrames — Your Data Table",
      description:
        "Create, inspect, and understand Pandas DataFrames — the core data structure.",
      duration: "18 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Creating DataFrames",
          content: `# DataFrames — Your Data Table

## What is a DataFrame?

In formal terms, a **DataFrame** is a two-dimensional, size-mutable, heterogeneous tabular data structure with labeled axes (rows and columns). Borrowed from the R programming language and implemented in Python by the Pandas library, a DataFrame is the primary data structure for tabular data manipulation — essentially a fully-programmable spreadsheet or in-memory SQL table.

Each column in a DataFrame is a **Series** (a labeled 1D array), and all columns share the same row index. This design allows you to mix data types across columns (integers, strings, floats, booleans) while keeping operations vectorized and fast.

![Pandas DataFrame](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80)

### Creating from a Dictionary

The most common way — keys become column names, values become column data:

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "name":  ["Alice", "Bob", "Charlie"],
    "age":   [25, 30, 35],
    "score": [92.5, 88.0, 95.3]
})
\`\`\`

### Key Inspection Methods

\`\`\`python
df.shape        # (rows, columns) → (3, 3)
df.dtypes       # column data types
df.head(5)      # first 5 rows
df.tail(5)      # last 5 rows
df.info()       # summary with memory usage
df.describe()   # statistical summary
\`\`\`

> **Rule of thumb:** Always run \`df.info()\` and \`df.describe()\` first when you receive a new dataset.
`,
          starterCode: `import pandas as pd

# Create a realistic dataset
data = {
    "student":  ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"],
    "age":      [22, 25, 23, 21, 24, 26],
    "major":    ["CS", "Math", "CS", "Physics", "Math", "CS"],
    "gpa":      [3.9, 3.4, 3.7, 3.8, 3.5, 3.6],
    "projects": [5, 3, 4, 6, 2, 4],
    "employed": [True, False, True, True, False, True]
}

df = pd.DataFrame(data)

print("=== DataFrame Head ===")
print(df.to_string())

print(f"\\nShape: {df.shape[0]} rows × {df.shape[1]} columns")

print("\\n=== Data Types ===")
print(df.dtypes)

print("\\n=== Statistical Summary ===")
print(df.describe().round(2))
`,
        },
        {
          pageNumber: 2,
          title: "Selecting & Filtering Data",
          content: `## Selecting & Filtering Data

This is where Pandas shines — powerful, expressive data querying.

### Column Selection

\`\`\`python
df["name"]            # single column → Series
df[["name", "score"]] # multiple columns → DataFrame
\`\`\`

### Row Selection with \`.loc\` and \`.iloc\`

\`\`\`python
df.loc[0]          # row by label/index
df.loc[0:2]        # rows 0 to 2 (inclusive)
df.iloc[0]         # row by integer position
df.iloc[0:3]       # rows 0, 1, 2
\`\`\`

### Boolean Filtering (Most Common)

\`\`\`python
# Single condition
df[df["score"] > 90]

# Multiple conditions (use & and |)
df[(df["age"] >= 22) & (df["gpa"] > 3.5)]

# Using .query() — very readable
df.query("age >= 22 and gpa > 3.5")
\`\`\`

### \`.isin()\` — Match Multiple Values

\`\`\`python
df[df["major"].isin(["CS", "Math"])]
\`\`\`

> 💡 Boolean filters return a **new** DataFrame — they never modify the original.
`,
          starterCode: `import pandas as pd

df = pd.DataFrame({
    "student":  ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"],
    "age":      [22, 25, 23, 21, 24, 26],
    "major":    ["CS", "Math", "CS", "Physics", "Math", "CS"],
    "gpa":      [3.9, 3.4, 3.7, 3.8, 3.5, 3.6],
    "employed": [True, False, True, True, False, True]
})

# Column selection
print("=== GPA Column ===")
print(df["gpa"].values)

# Boolean filter
print("\\n=== GPA > 3.6 ===")
high_gpa = df[df["gpa"] > 3.6]
print(high_gpa[["student", "gpa"]].to_string(index=False))

# Multiple conditions
print("\\n=== CS majors, employed ===")
result = df[(df["major"] == "CS") & (df["employed"] == True)]
print(result[["student", "major", "gpa"]].to_string(index=False))

# .query() method
print("\\n=== query: age >= 23 and gpa > 3.5 ===")
q = df.query("age >= 23 and gpa > 3.5")
print(q[["student", "age", "gpa"]].to_string(index=False))
`,
        },
        {
          pageNumber: 3,
          title: "GroupBy & Aggregation",
          content: `## GroupBy & Aggregation

The **split-apply-combine** pattern is the workhorse of data analysis.

\`\`\`python
# Split → Apply → Combine
df.groupby("major")["gpa"].mean()
\`\`\`

### Multiple Aggregations

\`\`\`python
df.groupby("major").agg({
    "gpa":      ["mean", "max", "min"],
    "projects": "sum"
})
\`\`\`

### Sorting

\`\`\`python
df.sort_values("gpa", ascending=False)
df.sort_values(["major", "gpa"], ascending=[True, False])
\`\`\`

### Value Counts

\`\`\`python
df["major"].value_counts()  # frequency of each major
\`\`\`

> **Real-world use:** This is equivalent to SQL's \`GROUP BY ... HAVING\` — you'll use it in every data analysis project.
`,
          starterCode: `import pandas as pd

df = pd.DataFrame({
    "student":  ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry"],
    "major":    ["CS", "Math", "CS", "Physics", "Math", "CS", "Physics", "Math"],
    "gpa":      [3.9, 3.4, 3.7, 3.8, 3.5, 3.6, 3.2, 3.9],
    "projects": [5, 3, 4, 6, 2, 4, 3, 5],
    "employed": [True, False, True, True, False, True, False, True]
})

# GroupBy mean GPA per major
print("=== Average GPA by Major ===")
avg_gpa = df.groupby("major")["gpa"].mean().round(2)
print(avg_gpa.to_string())

# Multiple aggregations
print("\\n=== Stats by Major ===")
stats = df.groupby("major").agg(
    avg_gpa=("gpa", "mean"),
    max_gpa=("gpa", "max"),
    total_projects=("projects", "sum"),
    count=("student", "count")
).round(2)
print(stats.to_string())

# Sort by GPA descending
print("\\n=== Top 3 Students ===")
top3 = df.nlargest(3, "gpa")[["student", "major", "gpa"]]
print(top3.to_string(index=False))

# Value counts
print("\\n=== Major Distribution ===")
print(df["major"].value_counts().to_string())
`,
        },
      ],
    },
    {
      id: "pd-cleaning",
      moduleId: "pandas-intro",
      lessonNumber: 2,
      title: "Data Cleaning",
      description: "Handle missing values, duplicates, and data type issues.",
      duration: "20 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Handling Missing Data",
          content: `# Data Cleaning

## Why Does Dirty Data Exist?

Real-world datasets are messy. Missing values arise from:
- **Data entry errors** (human mistakes)
- **System failures** (sensors going offline)
- **Merging datasets** with different schemas
- **Survey non-responses**

![Data cleaning process](https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80)

## Detecting Missing Values

\`\`\`python
df.isnull()           # True where NaN
df.isnull().sum()     # count per column
df.isnull().sum() / len(df) * 100  # percentage
\`\`\`

## Handling Missing Values

### Strategy 1: Drop rows/columns
\`\`\`python
df.dropna()                   # drop rows with ANY NaN
df.dropna(subset=["salary"])  # drop only if salary is NaN
df.dropna(thresh=5)           # keep rows with at least 5 non-NaN
\`\`\`

### Strategy 2: Fill / Impute
\`\`\`python
df.fillna(0)                          # fill all with 0
df["age"].fillna(df["age"].mean())    # fill with mean
df["city"].fillna("Unknown")          # fill with constant
df.fillna(method="ffill")             # forward fill
\`\`\`

> **Best practice:** Never blindly drop or fill. Always understand *why* data is missing.
`,
          starterCode: `import pandas as pd
import numpy as np

# Simulate dirty data
data = {
    "name":   ["Alice", "Bob", None, "Diana", "Eve", "Frank"],
    "age":    [25, None, 30, 28, None, 33],
    "salary": [75000, 82000, None, 90000, 68000, None],
    "dept":   ["Eng", "Mktg", "Eng", None, "Eng", "HR"],
    "score":  [88, 92, 75, None, 84, 91]
}
df = pd.DataFrame(data)

print("=== Raw Data ===")
print(df.to_string())

print("\\n=== Missing Value Counts ===")
missing = df.isnull().sum()
pct = (missing / len(df) * 100).round(1)
summary = pd.DataFrame({"count": missing, "pct": pct})
print(summary[summary["count"] > 0].to_string())

# Fill strategies
df_clean = df.copy()
df_clean["age"].fillna(df_clean["age"].median(), inplace=True)
df_clean["salary"].fillna(df_clean["salary"].mean(), inplace=True)
df_clean["dept"].fillna("Unknown", inplace=True)
df_clean["score"].fillna(df_clean["score"].mean(), inplace=True)
df_clean.dropna(subset=["name"], inplace=True)

print("\\n=== After Cleaning ===")
print(df_clean.round(1).to_string())
print(f"\\nRemaining NaNs: {df_clean.isnull().sum().sum()}")
`,
        },
      ],
    },
    {
        id: "pd-apply",
        moduleId: "pandas-intro",
        lessonNumber: 3,
        title: "Feature Engineering with Apply",
        description: "Create complex new columns using row-wise and column-wise custom functions.",
        duration: "20 min",
        difficulty: "Intermediate",
        pages: [
          {
            pageNumber: 1,
            title: "The .apply() Method",
            content: `# Feature Engineering with Apply

## Beyond Simple Math
While you can do \`df['col'] * 2\`, sometimes you need complex logic (if/else, string manipulation, external function calls) to create new features.

### How \`apply()\` works
It passes every row (or column) to a function you define.

\`\`\`python
def categorize_gpa(gpa):
    if gpa >= 3.7: return "Honors"
    elif gpa >= 3.0: return "Good"
    else: return "Needs Improvement"

df['status'] = df['gpa'].apply(categorize_gpa)
\`\`\`

### Row-wise Apply
Pass \`axis=1\` to access multiple columns at once:

\`\`\`python
def calculate_total_score(row):
    return (row['exam'] * 0.7) + (row['quiz'] * 0.3)

df['final_score'] = df.apply(calculate_total_score, axis=1)
\`\`\`

> ⚠️ \`apply()\` is slower than vectorized operations. Only use it when vectorized math (\`df['a'] + df['b']\`) is impossible.
`,
            starterCode: `import pandas as pd

df = pd.DataFrame({
    "student": ["Alice", "Bob", "Charlie", "Diana"],
    "math": [90, 45, 78, 88],
    "science": [85, 55, 92, 80],
    "attendance": [95, 60, 80, 98]
})

# 1. Apply to a single column
def grade_math(score):
    if score >= 80: return "A"
    if score >= 60: return "B"
    return "F"

df["math_grade"] = df["math"].apply(grade_math)

# 2. Apply across rows (axis=1)
def weighted_score(row):
    return (row["math"] * 0.6) + (row["science"] * 0.4)

df["weighted_avg"] = df.apply(weighted_score, axis=1).round(1)

# 3. Using Lambda for quick logic
df["pass_status"] = df["attendance"].apply(lambda x: "Pass" if x >= 75 else "Fail")

print(df.to_string(index=False))
`,
          },
        ],
      },
      {
        id: "pd-merging",
        moduleId: "pandas-intro",
        lessonNumber: 4,
        title: "Merging & Joining Data",
        description: "Combine multiple datasets using SQL-style joins.",
        duration: "22 min",
        difficulty: "Intermediate",
        pages: [
          {
            pageNumber: 1,
            title: "SQL-Style Joins",
            content: `# Merging & Joining Data

Real data is rarely in one table. You often have a \`users\` table and a \`transactions\` table that need to be combined.

### \`pd.merge()\`
Works exactly like SQL \`JOIN\`:

\`\`\`python
pd.merge(left_df, right_df, on='id', how='inner')
\`\`\`

### Types of Joins

| How | Result |
|-----|--------|
| \`inner\` | Only matching rows in both |
| \`left\` | All rows from left, NaNs for missing right |
| \`right\` | All rows from right, NaNs for missing left |
| \`outer\` | All rows from both (fills NaNs everywhere) |

### \`pd.concat()\`
Use this to stack DataFrames vertically (rows) or horizontally (columns) when they share the same structure.
`,
            starterCode: `import pandas as pd

# Table 1: User Info
users = pd.DataFrame({
    "user_id": [1, 2, 3, 4],
    "name": ["Alice", "Bob", "Charlie", "Diana"]
})

# Table 2: Purchase History
purchases = pd.DataFrame({
    "user_id": [1, 2, 2, 5], # Note: User 4 has no purchases, User 5 doesn't exist
    "item": ["Laptop", "Mouse", "Keyboard", "Monitor"],
    "amount": [1200, 50, 80, 300]
})

print("=== USERS ===")
print(users.to_string(index=False))
print("\\n=== PURCHASES ===")
print(purchases.to_string(index=False))

# Inner Join (Only users who bought something AND exist)
inner = pd.merge(users, purchases, on="user_id", how="inner")
print("\\n=== INNER JOIN ===")
print(inner.to_string(index=False))

# Left Join (All users, keep their purchases if any)
left = pd.merge(users, purchases, on="user_id", how="left")
print("\\n=== LEFT JOIN (Notice NaNs) ===")
print(left.to_string(index=False))
`,
          },
        ],
      },
      {
        id: "pd-datetime",
        moduleId: "pandas-intro",
        lessonNumber: 5,
        title: "Working with Time Series",
        description: "Parse dates, extract time features, and resample time-series data.",
        duration: "25 min",
        difficulty: "Advanced",
        pages: [
          {
            pageNumber: 1,
            title: "Parsing & Extracting Dates",
            content: `# Working with Time Series

## Why Dates are Tricky
CSV files load dates as strings: \`"2023-10-05"\`. You cannot add or subtract strings mathematically.

### Converting to Datetime

\`\`\`python
df['date'] = pd.to_datetime(df['date_string'])
\`\`\`

Once converted, you unlock powerful features:
- Extract parts: \`df['date'].dt.year\`, \`.dt.month\`, \`.dt.day_name()\`
- Time math: \`df['date'] + pd.Timedelta(days=7)\`
- Filter ranges: \`df[(df['date'] > '2023-01-01') & (df['date'] < '2023-12-31')]\`

### Setting the Index
For time-series analysis (stock prices, sensor data), set the date as the DataFrame index:

\`\`\`python
df.set_index('date', inplace=True)
\`\`\`

> **Pro Tip:** Always use \`format=\` in \`to_datetime\` if your date string is weird (e.g., \`"05/10/2023"\` vs \`"10-05-2023"\`). It makes parsing 10x faster.
`,
            starterCode: `import pandas as pd

# Simulated sales data
data = {
    "date_str": ["2023-01-15", "2023-02-20", "2023-03-10", "2023-04-05", "2023-05-25"],
    "sales": [250, 300, 150, 400, 500]
}
df = pd.DataFrame(data)

# 1. Parse Dates
df['date'] = pd.to_datetime(df['date_str'])
print("=== Data Types ===")
print(df.dtypes)

# 2. Extract Features
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day_name'] = df['date'].dt.day_name()

print("\\n=== Extracted Features ===")
print(df[['date', 'day_name', 'sales']].to_string(index=False))

# 3. Time Math
df['next_week'] = df['date'] + pd.Timedelta(days=7)
print("\\n=== Time Math ===")
print(df[['date', 'next_week']].to_string(index=False))

# 4. Filtering by time
mask = (df['date'] >= '2023-03-01') & (df['date'] <= '2023-05-01')
q2_sales = df[mask]
print("\\n=== Q1 Sales ===")
print(q2_sales[['date', 'sales']].to_string(index=False))
`,
          },
        ],
      },
    {
      id: "pd-cleaning",
      moduleId: "pandas-intro",
      lessonNumber: 6,
      title: "Data Cleaning & Missing Values",
      description: "Handle missing data, outliers, and duplicates like a pro.",
      duration: "16 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Dealing with Missing Data",
          content: `# Data Cleaning & Missing Values

## The Reality: Data is Messy
Real datasets have:
- **Missing values** (\`NaN\` — Not a Number)
- **Duplicates** (same record appears twice)
- **Outliers** (extreme values)
- **Wrong data types** (ages as strings)

Data scientists spend **60-80%** of their time cleaning data!

### Finding Missing Values

\`\`\`python
df.isnull()        # Boolean mask of NaN cells
df.isnull().sum()  # Count NaN per column
df.dropna()        # Remove rows with ANY NaN
df.fillna(0)       # Replace NaN with a value
\`\`\`

### Strategies for Missing Data

| Strategy | When | Code |
|----------|------|------|
| Drop row | Few missing | \`df.dropna()\` |
| Fill with mean | Numeric, missing at random | \`df.fillna(df.mean())\` |
| Forward fill | Time series | \`df.fillna(method='ffill')\` |
| Drop column | >50% missing | \`df.drop(col, axis=1)\` |
`,
          starterCode: `import pandas as pd
import numpy as np

# Create data with missing values
data = {
    "name": ["Alice", "Bob", None, "Diana", "Eve"],
    "age": [25, None, 28, 32, 26],
    "salary": [50000, 60000, None, 75000, 55000]
}
df = pd.DataFrame(data)

print("=== Raw Data (with NaN) ===")
print(df.to_string())

print("\\n=== Missing Value Count ===")
print(df.isnull().sum())

print("\\n=== Drop Rows with ANY NaN ===")
print(df.dropna().to_string())

print("\\n=== Fill NaN with Strategy ===")
df_filled = df.copy()
df_filled['age'].fillna(df_filled['age'].mean(), inplace=True)
df_filled['salary'].fillna(df_filled['salary'].median(), inplace=True)
df_filled['name'].fillna('Unknown', inplace=True)
print(df_filled.to_string())

print("\\n=== Handle Duplicates ===")
df_dupes = pd.concat([df_filled, df_filled.iloc[0:2]])
print(f"Total rows: {len(df_dupes)}, Unique rows: {len(df_dupes.drop_duplicates())}")
df_clean = df_dupes.drop_duplicates()
print(f"After removing duplicates: {len(df_clean)} rows")
`,
        },
      ],
    },
    {
      id: "pd-pivot",
      moduleId: "pandas-intro",
      lessonNumber: 7,
      title: "Pivoting & Reshaping Data",
      description: "Transform data between long and wide formats with pivot tables.",
      duration: "15 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Pivot Tables",
          content: `# Pivoting & Reshaping Data

## What is a Pivot Table?
A **pivot table** reorganizes data — rotating rows into columns or vice versa. It's the Excel pivot table but in code.

### Reshape with \`pivot_table()\`

\`\`\`python
import pandas as pd

# Long format (tidy data)
df = pd.DataFrame({
    "date": ["2024-01", "2024-01", "2024-02", "2024-02"],
    "region": ["North", "South", "North", "South"],
    "sales": [100, 150, 120, 180]
})

# Pivot to wide format
pivot = df.pivot_table(
    values="sales",
    index="date",
    columns="region",
    aggfunc="sum"
)
\`\`\`

### Multiple Aggregations

\`\`\`python
pivot = df.pivot_table(
    values="sales",
    index="region",
    aggfunc=["sum", "mean", "count"]
)
\`\`\`
`,
          starterCode: `import pandas as pd

# Sales data in long format
sales_data = {
    "quarter": ["Q1", "Q1", "Q1", "Q2", "Q2", "Q2"],
    "region": ["North", "South", "East", "North", "South", "East"],
    "product": ["A", "A", "B", "A", "B", "B"],
    "revenue": [1000, 1200, 800, 1100, 950, 1050]
}
df = pd.DataFrame(sales_data)

print("=== Original Data (Long) ===")
print(df.to_string(index=False))

# Pivot by region
print("\\n=== Pivot by Region ===")
pivot_region = df.pivot_table(values="revenue", index="quarter", columns="region", aggfunc="sum")
print(pivot_region)

# Pivot by product
print("\\n=== Pivot by Product ===")
pivot_product = df.pivot_table(values="revenue", index="quarter", columns="product", aggfunc="sum")
print(pivot_product)

# Multiple aggregations
print("\\n=== Multiple Stats ===")
pivot_stats = df.pivot_table(values="revenue", index="region", aggfunc=["sum", "mean", "count"])
print(pivot_stats)
`,
        },
      ],
    },
    {
      id: "pd-timeseries-advanced",
      moduleId: "pandas-intro",
      lessonNumber: 8,
      title: "Advanced Time Series & Resampling",
      description: "Resample frequencies, compute rolling statistics, and handle temporal data.",
      duration: "14 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Resampling & Rolling Windows",
          content: `# Advanced Time Series & Resampling

## Resampling (Change Data Frequency)
Convert daily data to weekly, hourly to daily, etc.

\`\`\`python
# Aggregate (downsample)
daily_data.resample('W').sum()   # Daily → Weekly
daily_data.resample('M').mean()  # Daily → Monthly

# Interpolate (upsample)
monthly_data.resample('D').interpolate()  # Monthly → Daily
\`\`\`

## Rolling Windows (Moving Statistics)
Compute statistics over sliding windows — great for smoothing and trend detection.

\`\`\`python
df['MA_7'] = df['price'].rolling(window=7).mean()
df['volatility'] = df['price'].rolling(window=30).std()
df['max_30'] = df['price'].rolling(window=30).max()
\`\`\`

### Common Rolling Operations
- \`.mean()\" — Moving average
- \`.std()\" — Volatility
- \`.min()/.max()\" — Bounds
- \`.sum()\" — Cumulative
`,
          starterCode: `import pandas as pd
import numpy as np

# Create time series
dates = pd.date_range('2024-01-01', periods=60, freq='D')
prices = 100 + np.random.randn(60).cumsum()
ts = pd.DataFrame({'price': prices}, index=dates)

print("=== Original Time Series (first 15 days) ===")
print(ts.head(15))

# Rolling average
ts['MA_7'] = ts['price'].rolling(window=7).mean()
ts['MA_14'] = ts['price'].rolling(window=14).mean()

print("\\n=== With Moving Averages ===")
print(ts[['price', 'MA_7', 'MA_14']].iloc[10:20].round(2))

# Resample to weekly
weekly = ts[['price']].resample('W').agg({'price': ['mean', 'min', 'max', 'std']})
print("\\n=== Weekly Aggregation ===")
print(weekly.round(2))

# Rolling volatility
ts['volatility'] = ts['price'].rolling(window=10).std()
print("\\n=== Volatility (last 10 rows) ===")
print(ts[['price', 'volatility']].tail(10).round(2))
`,
        },
      ],
    },
    {
      id: "pd-correlation",
      moduleId: "pandas-intro",
      lessonNumber: 9,
      title: "Statistical Analysis & Correlation",
      description: "Explore relationships between variables using correlation and statistical tests.",
      duration: "18 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Correlation & Covariance",
          content: `# Statistical Analysis & Correlation

## Understanding Relationships Between Variables

Correlation measures how two variables move together:
- **+1:** Perfect positive correlation (both increase together)
- **0:** No correlation
- **-1:** Perfect negative correlation (one increases, other decreases)

### Calculate Correlation

\`\`\`python
# Pearson correlation (default) — linear relationships
df.corr()                    # all numeric columns
df['age'].corr(df['salary']) # between two columns

# Spearman correlation — rank-based, more robust
df.corr(method='spearman')
\`\`\`

### Interpreting Correlation Strength

| Coefficient | Interpretation |
|-------------|-----------------|
| 0.0 - 0.3 | Weak |
| 0.3 - 0.7 | Moderate |
| 0.7 - 1.0 | Strong |

### Visualizing Correlation

\`\`\`python
corr_matrix = df.corr()
# Use Matplotlib heatmap to visualize
\`\`\`

> **Important:** Correlation ≠ Causation. Just because two variables correlate doesn't mean one causes the other.
`,
          starterCode: `import pandas as pd
import numpy as np

# Create a realistic dataset
np.random.seed(42)
n = 100
df = pd.DataFrame({
    "age": np.random.normal(35, 10, n),
    "salary": np.random.normal(60000, 15000, n),
    "years_experience": np.random.normal(10, 5, n),
    "performance_score": np.random.normal(75, 15, n),
    "random_noise": np.random.randn(n)  # uncorrelated
})

# Basic statistics
print("=== Summary Statistics ===")
print(df.describe().round(2))

# Correlation matrix
print("\\n=== Correlation Matrix ===")
corr = df.corr().round(3)
print(corr)

# Identify strongest correlations
print("\\n=== Strong Correlations (|r| > 0.7) ===")
for col in df.columns:
    strong = corr[col][abs(corr[col]) > 0.7].sort_values(ascending=False)
    if len(strong) > 1:
        print(f"\\n{col}:")
        print(strong[:-1].to_string())

# Pairwise correlation
print("\\n=== Salary vs Years Experience ===")
print(f"Correlation: {df['salary'].corr(df['years_experience']):.3f}")

# Sample correlation
print("\\n=== Spearman Correlation (Rank-based) ===")
spearman_corr = df.corr(method='spearman').round(3)
print(spearman_corr['salary'].sort_values(ascending=False))
`,
        },
      ],
    },
    {
      id: "pd-io",
      moduleId: "pandas-intro",
      lessonNumber: 10,
      title: "Input/Output & File Formats",
      description: "Read and write CSV, Excel, JSON, and SQL databases efficiently.",
      duration: "16 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Reading & Writing Different File Formats",
          content: `# Input/Output & File Formats

## Most Common File Formats

### CSV (Comma-Separated Values)
The most universal format — works everywhere.

\`\`\`python
# Read CSV
df = pd.read_csv("data.csv")
df = pd.read_csv("data.csv", sep=";", encoding="utf-8")

# Write CSV
df.to_csv("output.csv", index=False)
\`\`\`

### Excel
Perfect for business users and data sharing.

\`\`\`python
# Read Excel
df = pd.read_excel("data.xlsx", sheet_name="Sheet1")

# Write Excel
df.to_excel("output.xlsx", index=False)
\`\`\`

### JSON
Common in APIs and web data.

\`\`\`python
# Read JSON
df = pd.read_json("data.json")

# Write JSON
df.to_json("output.json", orient="records")  # or "split", "index", etc.
\`\`\`

### Parquet (Modern, Efficient)
Used by data engineers for big data — compressed and fast.

\`\`\`python
# Read/Write Parquet
df = pd.read_parquet("data.parquet")
df.to_parquet("output.parquet")
\`\`\`

> **Tip:** Always use \`index=False\` when writing unless you need to preserve row indices.
`,
          starterCode: `import pandas as pd

# Create sample data
df = pd.DataFrame({
    "product": ["Laptop", "Mouse", "Keyboard", "Monitor", "Webcam"],
    "price": [1200, 50, 80, 300, 120],
    "quantity": [5, 20, 15, 8, 12],
    "category": ["Electronics", "Accessories", "Accessories", "Electronics", "Electronics"]
})

print("=== Original DataFrame ===")
print(df.to_string(index=False))

# 1. CSV Operations
df.to_csv("/tmp/products.csv", index=False)
df_csv = pd.read_csv("/tmp/products.csv")
print("\\n✓ CSV written and read successfully")

# 2. JSON Operations (with different orientations)
json_records = df.to_json(orient="records")  # Most common for APIs
print("\\n=== JSON (records) ===")
print(json_records[:100] + "...")

df_from_json = pd.read_json("/tmp/products.json")
print("✓ JSON operations successful")

# 3. Excel simulation
try:
    df.to_excel("/tmp/products.xlsx", index=False)
    print("✓ Excel file created")
except ImportError:
    print("Note: openpyxl not installed (needed for Excel)")

# 4. Parquet (if available)
try:
    df.to_parquet("/tmp/products.parquet")
    df_parquet = pd.read_parquet("/tmp/products.parquet")
    print("✓ Parquet operations successful")
except ImportError:
    print("Note: pyarrow not installed (needed for Parquet)")

# File size comparison
print("\\n=== File Size Comparison (bytes) ===")
import os
csv_size = os.path.getsize("/tmp/products.csv")
print(f"CSV: {csv_size} bytes")
`,
        },
      ],
    },
    {
      id: "pd-outliers",
      moduleId: "pandas-intro",
      lessonNumber: 11,
      title: "Handling Outliers & Validation",
      description: "Detect and handle outliers, validate data quality, and prepare for modeling.",
      duration: "17 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Detecting & Handling Outliers",
          content: `# Handling Outliers & Validation

## What is an Outlier?

An **outlier** is an unusually extreme value that may:
- Be a **measurement error** (typo: 500 instead of 50)
- Represent **rare but real** events (fraud transaction)
- Be simply **natural variation** (a person 7 feet tall)

### Methods to Detect Outliers

#### 1. Z-Score (Standardized Distance)
Values beyond ±3 standard deviations are suspicious.

\`\`\`python
from scipy import stats

z_scores = np.abs(stats.zscore(df['salary']))
outliers = z_scores > 3  # True where outlier
\`\`\`

#### 2. IQR (Interquartile Range)
Outliers fall outside 1.5 × IQR beyond quartiles.

\`\`\`python
Q1 = df['salary'].quantile(0.25)
Q3 = df['salary'].quantile(0.75)
IQR = Q3 - Q1
outliers = (df['salary'] < Q1 - 1.5*IQR) | (df['salary'] > Q3 + 1.5*IQR)
\`\`\`

#### 3. Isolation Forest (ML-based)
Great for multivariate outliers.

\`\`\`python
from sklearn.ensemble import IsolationForest
clf = IsolationForest()
predictions = clf.fit_predict(df[['age', 'salary', 'experience']])
outliers = predictions == -1  # -1 = outlier
\`\`\`

### Handling Outliers

- **Remove** (if clearly errors)
- **Cap** (replace with 95th percentile)
- **Transform** (log scale to reduce impact)
- **Keep but flag** (for investigation)

> **Rule:** Never blindly remove outliers. Investigate first!
`,
          starterCode: `import pandas as pd
import numpy as np
from scipy import stats

# Create data with outliers
np.random.seed(42)
df = pd.DataFrame({
    "salary": list(np.random.normal(60000, 10000, 95)) + [500000, 5000, 4800, 5100, 5200],  # 5 outliers
    "age": list(np.random.normal(35, 8, 95)) + [120, 2, 3, 4, 5],  # 5 outliers
})

print("=== Original Data Statistics ===")
print(f"Salary: mean={df['salary'].mean():.0f}, median={df['salary'].median():.0f}")
print(f"Age: mean={df['age'].mean():.1f}, median={df['age'].median():.1f}")

# Method 1: Z-Score
print("\\n=== Z-Score Method ===")
z_scores = np.abs(stats.zscore(df['salary']))
outlier_count = (z_scores > 3).sum()
print(f"Outliers found: {outlier_count}")
print(df[z_scores > 3][['salary', 'age']].to_string())

# Method 2: IQR
print("\\n=== IQR Method ===")
Q1 = df['salary'].quantile(0.25)
Q3 = df['salary'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR
outliers_iqr = (df['salary'] < lower_bound) | (df['salary'] > upper_bound)
print(f"Lower bound: {lower_bound:.0f}, Upper bound: {upper_bound:.0f}")
print(f"Outliers: {outliers_iqr.sum()}")

# Clean data by removing outliers
df_clean = df[~outliers_iqr]
print(f"\\nAfter removing outliers: {len(df_clean)} rows (removed {len(df) - len(df_clean)})")
print(f"Salary: mean={df_clean['salary'].mean():.0f}, median={df_clean['salary'].median():.0f}")
`,
        },
      ],
    },
    {
      id: "pd-advanced-transforms",
      moduleId: "pandas-intro",
      lessonNumber: 12,
      title: "Advanced Data Transformations",
      description: "Master melt, stack, unstack, and multi-level indexing for complex reshaping.",
      duration: "15 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Melt, Stack, & MultiIndex",
          content: `# Advanced Data Transformations

## Melt — Wide to Long Format

Transform columns into rows. Perfect for preparing data for plotting or modeling.

\`\`\`python
# Wide format: each category is a column
data_wide = {
    "city": ["NYC", "LA", "Chicago"],
    "2020": [100, 150, 200],
    "2021": [120, 160, 220],
    "2022": [140, 180, 250]
}

df_wide = pd.DataFrame(data_wide)
# Melt to long format
df_long = df_wide.melt(id_vars="city", var_name="year", value_name="sales")
\`\`\`

Result: Each row represents one (city, year) pair.

## Stack & Unstack

- **Stack:** Pivot rows → columns (opposite of melt)
- **Unstack:** Pivot index levels → columns

\`\`\`python
df.set_index(['region', 'product']).unstack()
\`\`\`

## MultiIndex (Hierarchical Index)

Index with multiple levels for organizing complex data:

\`\`\`python
df = pd.DataFrame({
    'value': range(6)
}, index=pd.MultiIndex.from_tuples([
    ('A', 'X'), ('A', 'Y'), ('B', 'X'), 
    ('B', 'Y'), ('C', 'X'), ('C', 'Y')
], names=['region', 'product']))

df.loc['A']        # Get all products in region A
df.loc['A', 'X']   # Get specific region-product
\`\`\`

> **When to use:** MultiIndex is powerful but can be confusing. Use it when you have hierarchical data (years > months > days).
`,
          starterCode: `import pandas as pd

# Wide format data
sales_wide = pd.DataFrame({
    "product": ["Laptop", "Mouse", "Keyboard"],
    "Q1": [100, 500, 300],
    "Q2": [150, 450, 350],
    "Q3": [120, 600, 320],
    "Q4": [200, 700, 400]
})

print("=== Wide Format ===")
print(sales_wide.to_string(index=False))

# MELT — Wide to Long
sales_long = sales_wide.melt(
    id_vars=["product"],
    var_name="quarter",
    value_name="sales"
)

print("\\n=== Long Format (Melted) ===")
print(sales_long.to_string(index=False))

# UNSTACK — get back to wide (using groupby)
print("\\n=== Back to Wide (Pivot) ===")
back_to_wide = sales_long.pivot(index="product", columns="quarter", values="sales")
print(back_to_wide)

# MultiIndex Example
print("\\n=== MultiIndex (Hierarchical) ===")
multi_df = pd.DataFrame({
    "sales": [100, 150, 200, 250],
    "profit": [25, 30, 40, 50]
}, index=pd.MultiIndex.from_tuples([
    ("North", "Q1"), ("North", "Q2"),
    ("South", "Q1"), ("South", "Q2")
], names=["region", "quarter"]))

print(multi_df)
print("\\nAccess by region: North sales")
print(multi_df.loc["North"])
`,
        },
      ],
    },
    ],
};

// ─────────────────────────────────────────────────────────────
// MODULE 3 — Data Visualization with Matplotlib
// ─────────────────────────────────────────────────────────────
const matplotlibModule: Module = {
  id: "matplotlib-viz",
  title: "Data Visualization",
  slug: "visualization",
  description:
    "Turn raw numbers into compelling visual stories using Matplotlib and Seaborn in the browser.",
  introduction: `# Welcome to Data Visualization 📊\n\n**\"A picture is worth a thousand words.\"** In data science, this is absolutely true.\n\nMatplotlib is the foundational visualization library. You'll create:\n- Line plots for trends\n- Scatter plots for relationships\n- Histograms and distributions\n- Bar charts for comparisons\n- Heatmaps for patterns\n- And much more!\n\n## Why Visualization Matters\n\n- **Spot patterns** that numbers hide\n- **Communicate** findings to stakeholders\n- **Detect outliers** and anomalies\n- **Explore data** before analysis\n\n## Prerequisites\n✅ Modules 1-2 (Python, NumPy)\n\nLet's create beautiful plots! 🎨`,
  icon: "📊",
  color: "from-emerald-600 to-emerald-900",
  level: "Intermediate",
  totalDuration: "4h 34min",
  // REAL IMAGE: Data charts and visualization screens
  heroImage:
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
  lessons: [
    {
      id: "viz-line-chart",
      moduleId: "matplotlib-viz",
      lessonNumber: 1,
      title: "Line Charts & Anatomy of a Plot",
      description: "Master Matplotlib's figure/axes model and draw beautiful line charts.",
      duration: "20 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Matplotlib Anatomy",
          content: `# Data Visualization with Matplotlib

## What is Matplotlib?

**Matplotlib** is Python's foundational 2D plotting library, originally modeled after MATLAB's plotting API. It gives you complete programmatic control over every visual element of a chart — from axis tick marks and font sizes to line styles and color maps — making it the standard tool for producing publication-quality figures in academic papers, research reports, and data science projects.

Matplotlib renders graphics as a hierarchy of Python objects. Once you understand this hierarchy, you can customize any part of any chart precisely.

## The Anatomy of a Matplotlib Figure

Understanding the hierarchy is key to full control:

\`\`\`
Figure          ← the entire canvas
  └── Axes      ← a single plot area (subplots)
        ├── Title
        ├── X-axis (label, ticks, limits)
        ├── Y-axis (label, ticks, limits)
        ├── Lines / Bars / Scatter points
        └── Legend
\`\`\`

![Matplotlib anatomy diagram](https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80)

## Object-Oriented Interface (Recommended)

Always prefer the OO interface over \`plt.plot()\` for professional code:

\`\`\`python
import matplotlib
matplotlib.use('Agg')  # Required in Pyodide
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(10, 5))
ax.plot(x, y, label="My Line")
ax.set_title("Chart Title", fontsize=16)
ax.set_xlabel("X Label")
ax.set_ylabel("Y Label")
ax.legend()
plt.tight_layout()
\`\`\`

> **Note:** In QuraLabz, all charts render as embedded images directly in the output console — no pop-up windows needed!
`,
          starterCode: `import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64

# Monthly temperature data
months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
london = [5.2, 5.5, 7.8, 10.3, 13.7, 16.8, 18.7, 18.4, 15.6, 11.8, 8.0, 5.7]
dubai  = [19.1,20.6,23.8,27.9,32.1,34.9,36.0,36.5,33.9,30.3,25.4,21.0]

fig, ax = plt.subplots(figsize=(10, 5))
fig.patch.set_facecolor('#0d0d14')
ax.set_facecolor('#0d0d14')

ax.plot(months, london, color='#8b5cf6', linewidth=2.5,
        marker='o', markersize=6, label='London')
ax.plot(months, dubai,  color='#06b6d4', linewidth=2.5,
        marker='s', markersize=6, label='Dubai')

ax.fill_between(months, london, alpha=0.08, color='#8b5cf6')
ax.fill_between(months, dubai,  alpha=0.08, color='#06b6d4')

ax.set_title('Monthly Average Temperature', color='white', fontsize=15, pad=15)
ax.set_xlabel('Month', color='#94a3b8')
ax.set_ylabel('Temperature (°C)', color='#94a3b8')
ax.tick_params(colors='#94a3b8')
ax.spines[:].set_color('#1e293b')
ax.grid(color='#1e293b', linestyle='--', alpha=0.5)
ax.legend(facecolor='#1a1a26', edgecolor='#334155', labelcolor='white')

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight',
            facecolor=fig.get_facecolor())
buf.seek(0)
img_b64 = base64.b64encode(buf.read()).decode()
print(f"PLOT_BASE64:{img_b64}")
plt.close()
`,
        },
        {
          pageNumber: 2,
          title: "Subplots & Multi-Panel Figures",
          content: `## Subplots — Multiple Panels in One Figure

Use \`plt.subplots(rows, cols)\` to create grid layouts:

\`\`\`python
fig, axes = plt.subplots(2, 2, figsize=(12, 8))
ax1, ax2 = axes[0]   # top row
ax3, ax4 = axes[1]   # bottom row
\`\`\`

### Sharing Axes

\`\`\`python
# Share y-axis for comparison
fig, (ax1, ax2) = plt.subplots(1, 2, sharey=True)
\`\`\`

### \`plt.tight_layout()\`

Always call this before saving — it automatically adjusts spacing so labels don't overlap.

### Common Line Styles

| Style | Code |
|-------|------|
| Solid | \`'-'\` |
| Dashed | \`'--'\` |
| Dotted | \`':'\` |
| Dash-dot | \`'-.'\` |

### Common Markers

\`'o'\` circle, \`'s'\` square, \`'^'\` triangle, \`'D'\` diamond, \`'*'\` star
`,
          starterCode: `import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64
import math

x = [i * 0.2 for i in range(40)]
sin_y = [math.sin(v) for v in x]
cos_y = [math.cos(v) for v in x]
tan_y = [min(max(math.tan(v), -3), 3) for v in x]  # clipped
exp_y = [math.exp(v/4) for v in x]

fig, axes = plt.subplots(2, 2, figsize=(11, 7))
fig.patch.set_facecolor('#0d0d14')
fig.suptitle('Trigonometric & Exponential Functions',
             color='white', fontsize=14, y=1.01)

plots = [
    (axes[0,0], sin_y, '#8b5cf6', 'sin(x)',  '-'),
    (axes[0,1], cos_y, '#06b6d4', 'cos(x)',  '--'),
    (axes[1,0], tan_y, '#f59e0b', 'tan(x)',  '-.'),
    (axes[1,1], exp_y, '#10b981', 'eˣ/⁴',   ':'),
]

for ax, y, color, label, ls in plots:
    ax.set_facecolor('#0d0d14')
    ax.plot(x, y, color=color, linewidth=2, linestyle=ls, label=label)
    ax.set_title(label, color=color, fontsize=12)
    ax.tick_params(colors='#94a3b8')
    ax.spines[:].set_color('#1e293b')
    ax.grid(color='#1e293b', alpha=0.4)

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight',
            facecolor=fig.get_facecolor())
buf.seek(0)
img_b64 = base64.b64encode(buf.read()).decode()
print(f"PLOT_BASE64:{img_b64}")
plt.close()
`,
        },
      ],
    },
    {
      id: "viz-bar-hist",
      moduleId: "matplotlib-viz",
      lessonNumber: 2,
      title: "Bar Charts, Histograms & Scatter Plots",
      description: "Visualize distributions, comparisons, and correlations.",
      duration: "22 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Bar Charts for Comparisons",
          content: `# Bar Charts, Histograms & Scatter Plots

## Bar Charts — Comparing Categories

Bar charts excel at **comparing discrete categories**:

\`\`\`python
categories = ["A", "B", "C", "D"]
values = [23, 45, 12, 67]

ax.bar(categories, values, color="#8b5cf6", alpha=0.8)

# Horizontal bars (better for long labels)
ax.barh(categories, values)
\`\`\`

### Grouped Bar Charts

\`\`\`python
import numpy as np

x = np.arange(len(categories))
width = 0.35

ax.bar(x - width/2, group1, width, label="Group 1")
ax.bar(x + width/2, group2, width, label="Group 2")
ax.set_xticks(x)
ax.set_xticklabels(categories)
\`\`\`

### Annotations

Add value labels directly on bars for clarity:

\`\`\`python
for bar in bars:
    height = bar.get_height()
    ax.annotate(f'{height}',
        xy=(bar.get_x() + bar.get_width()/2, height),
        xytext=(0, 3), textcoords="offset points",
        ha='center', va='bottom', color='white')
\`\`\`
`,
          starterCode: `import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64

languages = ["Python", "R", "SQL", "Julia", "Scala", "MATLAB"]
popularity = [67.3, 11.2, 9.8, 4.5, 3.7, 3.5]
colors = ['#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#ef4444', '#f97316']

fig, ax = plt.subplots(figsize=(10, 5))
fig.patch.set_facecolor('#0d0d14')
ax.set_facecolor('#0d0d14')

bars = ax.bar(languages, popularity, color=colors, alpha=0.85,
              edgecolor='rgba(255,255,255,0.1)', linewidth=0.5)

for bar, val in zip(bars, popularity):
    ax.text(bar.get_x() + bar.get_width()/2,
            bar.get_height() + 0.8,
            f'{val}%', ha='center', va='bottom',
            color='white', fontsize=10, fontweight='bold')

ax.set_title('Data Science Language Popularity 2024',
             color='white', fontsize=14, pad=15)
ax.set_ylabel('Usage (%)', color='#94a3b8')
ax.set_ylim(0, 80)
ax.tick_params(colors='#94a3b8')
ax.spines[:].set_color('#1e293b')
ax.grid(axis='y', color='#1e293b', alpha=0.4)

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight',
            facecolor=fig.get_facecolor())
buf.seek(0)
img_b64 = base64.b64encode(buf.read()).decode()
print(f"PLOT_BASE64:{img_b64}")
plt.close()
`,
        },
        {
          pageNumber: 2,
          title: "Histograms & Scatter Plots",
          content: `## Histograms — Visualizing Distributions

A histogram shows the **frequency distribution** of a continuous variable:

\`\`\`python
ax.hist(data, bins=30, color="#8b5cf6", edgecolor="white", alpha=0.7)
\`\`\`

### Choosing Bin Count

- Too few bins → hides detail
- Too many bins → shows noise
- **Rule of thumb:** \`bins = int(n**0.5)\` or use \`bins='auto'\`

## Scatter Plots — Showing Correlations

\`\`\`python
ax.scatter(x, y,
    c=color_values,    # color by a third variable
    s=size_values,     # size by a fourth variable
    alpha=0.6,
    cmap='viridis')
\`\`\`

### Adding a Trend Line

\`\`\`python
import numpy as np
z = np.polyfit(x, y, 1)  # linear fit
p = np.poly1d(z)
ax.plot(sorted(x), p(sorted(x)), "--", color="red", linewidth=1.5)
\`\`\`

> 💡 Scatter plots are how you detect **correlation** — a key step before running regression models.
`,
          starterCode: `import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64
import random, math

random.seed(42)
# Simulate exam scores (normal-ish distribution)
study_hours = [random.uniform(1, 10) for _ in range(80)]
scores = [
    min(100, max(40, 50 + 5 * h + random.gauss(0, 8)))
    for h in study_hours
]

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
for ax in (ax1, ax2):
    ax.set_facecolor('#0d0d14')
fig.patch.set_facecolor('#0d0d14')

# Histogram
ax1.hist(scores, bins=15, color='#8b5cf6', edgecolor='#1e293b',
         alpha=0.85, linewidth=0.8)
ax1.set_title('Exam Score Distribution', color='white', fontsize=13)
ax1.set_xlabel('Score', color='#94a3b8')
ax1.set_ylabel('Frequency', color='#94a3b8')
ax1.tick_params(colors='#94a3b8')
ax1.spines[:].set_color('#1e293b')
ax1.axvline(sum(scores)/len(scores), color='#06b6d4',
            linestyle='--', linewidth=1.5, label=f'Mean={sum(scores)/len(scores):.1f}')
ax1.legend(facecolor='#1a1a26', edgecolor='#334155', labelcolor='white')

# Scatter + trendline
ax2.scatter(study_hours, scores, color='#8b5cf6', alpha=0.6,
            s=50, edgecolors='white', linewidths=0.3)
# trendline via least squares
n = len(study_hours)
sx, sy = sum(study_hours), sum(scores)
sxx = sum(h*h for h in study_hours)
sxy = sum(h*s for h,s in zip(study_hours,scores))
m = (n*sxy - sx*sy)/(n*sxx - sx**2)
b = (sy - m*sx)/n
xs = [1, 10]
ax2.plot(xs, [m*x+b for x in xs], '--', color='#06b6d4', linewidth=2)
ax2.set_title('Study Hours vs Exam Score', color='white', fontsize=13)
ax2.set_xlabel('Study Hours', color='#94a3b8')
ax2.set_ylabel('Score', color='#94a3b8')
ax2.tick_params(colors='#94a3b8')
ax2.spines[:].set_color('#1e293b')

fig.suptitle('Statistical Analysis', color='white', fontsize=15, y=1.02)
plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight',
            facecolor=fig.get_facecolor())
buf.seek(0)
img_b64 = base64.b64encode(buf.read()).decode()
print(f"PLOT_BASE64:{img_b64}")
plt.close()
`,
        },
      ],
    },
      {
        id: "viz-seaborn",
        moduleId: "matplotlib-viz",
        lessonNumber: 3,
        title: "Statistical Plots with Seaborn",
        description: "Easily visualize distributions and correlations using the Seaborn library.",
        duration: "25 min",
        difficulty: "Advanced",
        pages: [
          {
            pageNumber: 1,
            title: "Correlation Heatmaps",
            content: `# Statistical Plots with Seaborn

## Why Seaborn?
Matplotlib is powerful but verbose. **Seaborn** is built on top of Matplotlib and provides a high-level interface for drawing attractive statistical graphics.

### The Correlation Matrix Heatmap
Before building an ML model, you must check how features correlate with each other.
- \`1.0\`: Perfect positive correlation
- \`-1.0\`: Perfect negative correlation
- \`0.0\`: No correlation

\`\`\`python
import seaborn as sns
corr_matrix = df.corr()
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm')
\`\`\`

### KDE Plots (Kernel Density Estimate)
A smoothed version of a histogram. Great for seeing the true distribution shape of your data.
`,
            starterCode: `import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns
import io, base64

# Generate realistic correlated data
np.random.seed(42)
data = {
    "Study_Hours": np.random.uniform(1, 10, 100),
    "Attendance": np.random.uniform(50, 100, 100),
    "Sleep_Hours": np.random.uniform(4, 9, 100)
}
df = pd.DataFrame(data)
# Force a correlation for the sake of the plot
df["Exam_Score"] = (df["Study_Hours"] * 5) + (df["Attendance"] * 0.2) + np.random.normal(0, 5, 100)

# Calculate correlation
corr = df.corr().round(2)

# Plot
fig, ax = plt.subplots(figsize=(8, 6))
fig.patch.set_facecolor('#0d0d14')

sns.heatmap(corr, annot=True, cmap='mako', linewidths=0.5, 
            linecolor='#1e293b', ax=ax, vmin=-1, vmax=1,
            cbar_kws={'label': 'Correlation Coefficient'})

ax.set_title('Feature Correlation Matrix', color='white', fontsize=14, pad=15)
ax.tick_params(colors='#94a3b8')
ax.set_xticklabels(ax.get_xticklabels(), color='#94a3b8', rotation=45)
ax.set_yticklabels(ax.get_yticklabels(), color='#94a3b8')

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
img_b64 = base64.b64encode(buf.read()).decode()
print(f"PLOT_BASE64:{img_b64}")
plt.close()
`,
          },
        ],
      },
      {
        id: "viz-boxplots",
        moduleId: "matplotlib-viz",
        lessonNumber: 4,
        title: "Box Plots & Outlier Detection",
        description: "Identify outliers and understand data spread using Box and Violin plots.",
        duration: "20 min",
        difficulty: "Advanced",
        pages: [
          {
            pageNumber: 1,
            title: "Anatomy of a Box Plot",
            content: `# Box Plots & Outlier Detection

## Why Box Plots?
Histograms hide exact percentiles. Box plots show the **5-number summary** visually:
1. **Minimum** (Q1 - 1.5 * IQR)
2. **Q1 (25th percentile)**
3. **Median (50th percentile)**
4. **Q3 (75th percentile)**
5. **Maximum** (Q3 + 1.5 * IQR)

### Outliers
Any points outside the "whiskers" (min/max) are plotted as individual dots. These are **statistical outliers**.

### Violin Plots
A combination of a box plot and a KDE (density) plot. It shows the shape of the distribution in addition to the summary statistics.

\`\`\`python
import seaborn as sns
sns.boxplot(x='category', y='value', data=df)
sns.violinplot(x='category', y='value', data=df)
\`\`\`

> **Data Science Use:** Box plots are step 1 in anomaly detection (fraud, server crashes, sensor errors).
`,
            starterCode: `import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns
import io, base64

np.random.seed(10)
# Normal data + intentional outliers
group_a = np.random.normal(50, 5, 100).tolist() + [10, 95] # Outliers!
group_b = np.random.normal(60, 8, 100).tolist() + [15]     # Outlier!
group_c = np.random.normal(45, 4, 100).tolist()

df = pd.DataFrame({
    'Score': group_a + group_b + group_c,
    'Group': ['Model A']*102 + ['Model B']*101 + ['Model C']*100
})

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))
for ax in (ax1, ax2):
    ax.set_facecolor('#0d0d14')
fig.patch.set_facecolor('#0d0d14')

# Box Plot
sns.boxplot(x='Group', y='Score', data=df, ax=ax1, 
            palette=['#8b5cf6', '#06b6d4', '#10b981'])
ax1.set_title('Box Plot (Spot the Outliers!)', color='white', fontsize=13)
ax1.tick_params(colors='#94a3b8')
ax1.spines[:].set_color('#1e293b')

# Violin Plot
sns.violinplot(x='Group', y='Score', data=df, ax=ax2, 
               palette=['#8b5cf6', '#06b6d4', '#10b981'], inner='quartile')
ax2.set_title('Violin Plot (See Distribution Shape)', color='white', fontsize=13)
ax2.tick_params(colors='#94a3b8')
ax2.spines[:].set_color('#1e293b')

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
img_b64 = base64.b64encode(buf.read()).decode()
print(f"PLOT_BASE64:{img_b64}")
plt.close()
`,
          },
        ],
      },
      {
        id: "viz-custom-themes",
        moduleId: "matplotlib-viz",
        lessonNumber: 5,
        title: "Custom Themes & Professional Styling",
        description: "Make your charts look like they belong in a premium dashboard or academic paper.",
        duration: "15 min",
        difficulty: "Advanced",
        pages: [
          {
            pageNumber: 1,
            title: "Removing Chart Junk",
            content: `# Custom Themes & Styling

## The "Chart Junk" Problem
Default charts have too much ink: thick borders, unnecessary backgrounds, and redundant gridlines. Data visualization pioneer Edward Tufte argues: *Maximize data-ink, minimize non-data-ink.*

### Cleaning up Matplotlib

\`\`\`python
# Remove top and right spines
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

# Make remaining spines subtle
ax.spines['left'].set_color('#cccccc')
ax.spines['bottom'].set_color('#cccccc')

# Move ticks outside or remove them
ax.tick_params(left=False, bottom=False, labelleft=True, labelbottom=True)
\`\`\`

### Adding Annotations
Draw attention to specific data points:
\`\`\`python
ax.annotate('Peak!', xy=(x_max, y_max), 
            xytext=(10, 10), textcoords='offset points',
            arrowprops=dict(arrowstyle='->', color='red'))
\`\`\`
`,
            starterCode: `import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64
import random

random.seed(42)
months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
revenue = [random.randint(20, 60) for _ in range(12)]
revenue[7] = 95 # Artificial peak

fig, ax = plt.subplots(figsize=(10, 5))
fig.patch.set_facecolor('#0d0d14')
ax.set_facecolor('#0d0d14')

# Clean minimal styling
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color('#334155')
ax.spines['bottom'].set_color('#334155')
ax.tick_params(left=False, bottom=False, labelleft=True, labelbottom=True, colors='#94a3b8')

# Plot
ax.plot(months, revenue, color='#8b5cf6', linewidth=2.5, marker='o', markersize=6)
ax.fill_between(months, revenue, alpha=0.05, color='#8b5cf6')

# Annotation (Highlight the peak)
ax.annotate('Record High!', xy=(7, 95), xytext=(40, 20), textcoords='offset points',
            color='#f43f5e', fontsize=11, fontweight='bold',
            arrowprops=dict(arrowstyle='->', color='#f43f5e', lw=1.5))

ax.set_title('Monthly Revenue (Clean Theme)', color='white', fontsize=14, pad=15, loc='left')
ax.set_ylabel('Revenue ($k)', color='#94a3b8')

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
img_b64 = base64.b64encode(buf.read()).decode()
print(f"PLOT_BASE64:{img_b64}")
plt.close()
`,
          },
        ],
      },
    {
      id: "mpl-interactive",
      moduleId: "matplotlib-viz",
      lessonNumber: 6,
      title: "Interactive Plots with Events",
      description: "Add interactivity — click, hover, and zoom in Matplotlib.",
      duration: "12 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Event Handling in Plots",
          content: `# Interactive Plots with Events

## Making Plots Interactive
While Matplotlib defaults to static plots, you can add **event handling** for clicks, hovers, and keyboard input.

### Basic Event Handling

\`\`\`python
import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [1, 4, 2])

def on_click(event):
    if event.inaxes != ax:
        return
    print(f"Clicked at x={event.xdata:.2f}, y={event.ydata:.2f}")

fig.canvas.mpl_connect('button_press_event', on_click)
plt.show()
\`\`\`

### Common Event Types
- \`button_press_event\`: Mouse click
- \`motion_notify_event\`: Mouse move (hover)
- \`pick_event\`: Click on plotted object
- \`key_press_event\`: Keyboard

### Picking (Highlight Points)

\`\`\`python
line, = ax.plot([1, 2, 3], [1, 4, 2], picker=True, pickevents=5)

def on_pick(event):
    print(f"Picked point index: {event.ind}")
\`\`\`

> **Note:** In QuraLabz, Pyodide has limited interactive capabilities. These patterns work in Jupyter/scripts with display backends.
`,
          starterCode: `# Event handling patterns (view the code)
import matplotlib.pyplot as plt
import numpy as np

# Create sample data
x = np.linspace(0, 10, 100)
y = np.sin(x)

fig, ax = plt.subplots(figsize=(10, 6))
line, = ax.plot(x, y, 'b-', linewidth=2, label='sin(x)', picker=True, pickevents=5)
ax.grid(True, alpha=0.3)
ax.set_title('Interactive Plot (Event Demo)', fontsize=14, color='white')
ax.set_xlabel('x', color='#94a3b8')
ax.set_ylabel('y', color='#94a3b8')

# Static visualization only (Pyodide limitation)
fig.patch.set_facecolor('#0d0d14')
ax.set_facecolor('#1a1a25')
for spine in ax.spines.values():
    spine.set_color('#334155')
ax.tick_params(colors='#94a3b8')

plt.tight_layout()
print("Event handling works in interactive environments like Jupyter!")
print(f"Plot shows sin(x) from x={x[0]:.1f} to {x[-1]:.1f}")
`,
        },
      ],
    },
    {
      id: "mpl-subplots",
      moduleId: "matplotlib-viz",
      lessonNumber: 7,
      title: "Subplots & Multi-Panel Layouts",
      description: "Arrange multiple plots in grids and custom layouts.",
      duration: "13 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Creating Subplots",
          content: `# Subplots & Multi-Panel Layouts

## Why Multiple Plots?
Comparing distributions, time series, or different aspects of data side-by-side helps spot patterns.

### Basic Subplots

\`\`\`python
import matplotlib.pyplot as plt

# 2 rows, 3 columns → 6 subplots
fig, axes = plt.subplots(2, 3, figsize=(15, 8))

# Access individual axes
axes[0, 0].plot([1, 2, 3])
axes[0, 1].scatter([1, 2, 3], [1, 4, 2])
axes[1, 2].hist([1, 1, 2, 2, 2, 3, 3, 3, 3])
\`\`\`

### Using GridSpec for Custom Layouts

\`\`\`python
import matplotlib.gridspec as gridspec

fig = plt.figure()
gs = gridspec.GridSpec(3, 3, figure=fig)

# Big plot on left (spans 2 rows)
ax_left = fig.add_subplot(gs[0:2, 0])
ax_right_top = fig.add_subplot(gs[0, 1:])
ax_right_bot = fig.add_subplot(gs[1:, 1:])
\`\`\`

### Share Axes (Link Zooming)

\`\`\`python
fig, (ax1, ax2) = plt.subplots(1, 2, sharex=True)  # Same x-axis
ax1.plot(x, y1)
ax2.plot(x, y2)
# Zoom in ax1 → ax2 zooms too!
\`\`\`
`,
          starterCode: `import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
x = np.linspace(0, 10, 100)

fig, axes = plt.subplots(2, 2, figsize=(12, 10))
fig.patch.set_facecolor('#0d0d14')

# Plot 1: Line
ax = axes[0, 0]
ax.plot(x, np.sin(x), color='#8b5cf6', linewidth=2)
ax.set_title('sin(x)', color='white', fontweight='bold')
ax.grid(True, alpha=0.3, color='#334155')
ax.set_facecolor('#1a1a25')

# Plot 2: Scatter
ax = axes[0, 1]
ax.scatter(x[::5], np.cos(x[::5]), color='#06b6d4', s=100, alpha=0.7)
ax.set_title('cos(x) samples', color='white', fontweight='bold')
ax.grid(True, alpha=0.3, color='#334155')
ax.set_facecolor('#1a1a25')

# Plot 3: Histogram
ax = axes[1, 0]
data = np.random.normal(0, 1, 1000)
ax.hist(data, bins=30, color='#f59e0b', alpha=0.7, edgecolor='#0d0d14')
ax.set_title('Normal Distribution', color='white', fontweight='bold')
ax.set_facecolor('#1a1a25')

# Plot 4: Multiple lines
ax = axes[1, 1]
ax.plot(x, np.sin(x), label='sin', color='#8b5cf6', linewidth=2)
ax.plot(x, np.cos(x), label='cos', color='#06b6d4', linewidth=2)
ax.legend(loc='upper right', framealpha=0.9)
ax.set_title('Trigonometric Functions', color='white', fontweight='bold')
ax.grid(True, alpha=0.3, color='#334155')
ax.set_facecolor('#1a1a25')

for ax in axes.flat:
    ax.tick_params(colors='#94a3b8')
    for spine in ax.spines.values():
        spine.set_color('#334155')

plt.tight_layout()
print("Subplots displayed in 2x2 grid!")
`,
        },
      ],
    },
    {
      id: "mpl-heatmaps",
      moduleId: "matplotlib-viz",
      lessonNumber: 8,
      title: "Heatmaps & 2D Data Visualization",
      description: "Visualize 2D data, correlation matrices, and dense datasets with heatmaps.",
      duration: "18 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Creating Heatmaps",
          content: `# Heatmaps & 2D Data Visualization

## What is a Heatmap?
A **heatmap** uses color intensity to represent values in a 2D matrix. Perfect for correlation matrices, confusion matrices, and time-series grids.

### Basic Heatmap with \`imshow()\`

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

data = np.random.randn(10, 10)

fig, ax = plt.subplots()
im = ax.imshow(data, cmap='viridis')  # colormap
ax.set_title('2D Data Heatmap')
plt.colorbar(im, ax=ax)  # add color scale
\`\`\`

### Heatmaps with Text Labels

Perfect for correlation matrices where you want to see exact values:

\`\`\`python
import seaborn as sns

# Correlation matrix
corr_matrix = df.corr()

fig, ax = plt.subplots(figsize=(8, 8))
sns.heatmap(corr_matrix, annot=True, fmt='.2f', cmap='coolwarm',
            cbar_kws={'label': 'Correlation'}, ax=ax)
ax.set_title('Feature Correlation Matrix')
\`\`\`

### Popular Colormaps (Color Schemes)

| Colormap | Use Case |
|----------|----------|
| \`viridis\` | General-purpose (colorblind-friendly) |
| \`coolwarm\` | Diverging data (negative ↔ positive) |
| \`RdYlGn\` | Red-Yellow-Green (good-bad) |
| \`Reds\` | Sequential (light → dark) |

> **Tip:** Always use colorblind-friendly colormaps. Avoid jet and rainbow!
`,
          starterCode: `import matplotlib.pyplot as plt
import numpy as np

# Create a correlation-like matrix
np.random.seed(42)
features = ['Age', 'Income', 'Score', 'Experience', 'Bonus']
corr_matrix = np.random.rand(5, 5)
# Make it symmetric (like real correlation)
corr_matrix = (corr_matrix + corr_matrix.T) / 2
np.fill_diagonal(corr_matrix, 1)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))
fig.patch.set_facecolor('#0d0d14')

# Heatmap 1: Viridis
im1 = ax1.imshow(corr_matrix, cmap='viridis', vmin=0, vmax=1)
ax1.set_xticks(range(len(features)))
ax1.set_yticks(range(len(features)))
ax1.set_xticklabels(features, rotation=45, ha='right', color='white')
ax1.set_yticklabels(features, color='white')
ax1.set_title('Viridis Colormap', color='white', fontweight='bold')
ax1.set_facecolor('#1a1a25')
cbar1 = plt.colorbar(im1, ax=ax1)
cbar1.ax.tick_params(colors='#94a3b8')

# Heatmap 2: Coolwarm (diverging)
# Recenter around 0.5
centered_data = corr_matrix - 0.5
im2 = ax2.imshow(centered_data, cmap='coolwarm', vmin=-0.5, vmax=0.5)
ax2.set_xticks(range(len(features)))
ax2.set_yticks(range(len(features)))
ax2.set_xticklabels(features, rotation=45, ha='right', color='white')
ax2.set_yticklabels(features, color='white')
ax2.set_title('Coolwarm Colormap', color='white', fontweight='bold')
ax2.set_facecolor('#1a1a25')
cbar2 = plt.colorbar(im2, ax=ax2)
cbar2.ax.tick_params(colors='#94a3b8')

# Add text annotations
for i in range(len(features)):
    for j in range(len(features)):
        text = ax1.text(j, i, f'{corr_matrix[i, j]:.2f}',
                       ha="center", va="center", color="black", fontsize=9)

plt.tight_layout()
print("Heatmaps with different colormaps created!")
`,
        },
      ],
    },
    {
      id: "mpl-statistical-plots",
      moduleId: "matplotlib-viz",
      lessonNumber: 9,
      title: "Statistical Plots & Distributions",
      description: "Visualize distributions with KDE, violin plots, and quantile-quantile plots.",
      duration: "17 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Distribution Visualization",
          content: `# Statistical Plots & Distributions

## Histogram with KDE (Kernel Density Estimation)

Overlaying a smooth curve on a histogram shows the underlying distribution:

\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns

fig, ax = plt.subplots()
sns.histplot(data, kde=True, stat='density', ax=ax)
ax.set_title('Distribution with KDE')
\`\`\`

## Violin Plots

Combine a box plot and KDE to show full distribution shape:

\`\`\`python
sns.violinplot(data=df, x='category', y='value')
\`\`\`

Shows:
- **Box** inside = 25th-75th percentile
- **Line** inside box = median
- **Outer curve** = full distribution (KDE)

## Q-Q Plot (Quantile-Quantile)

Check if data is normally distributed:

\`\`\`python
from scipy import stats
fig, ax = plt.subplots()
stats.probplot(data, dist="norm", plot=ax)
ax.set_title('Q-Q Plot: Testing Normality')
\`\`\`

Perfect 45° line = normally distributed data.

## Box Plot

Shows outliers, quartiles, and median at a glance:

\`\`\`python
ax.boxplot([group1, group2, group3], labels=['A', 'B', 'C'])
\`\`\`

> **When to use:** Histogram for single distributions, violin for comparing groups, box plot for spotting outliers.
`,
          starterCode: `import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
from scipy import stats

np.random.seed(42)

# Create different distributions
normal_data = np.random.normal(100, 15, 1000)
skewed_data = np.random.gamma(2, 2, 1000)
bimodal_data = np.concatenate([np.random.normal(80, 10, 500),
                               np.random.normal(120, 10, 500)])

fig, axes = plt.subplots(2, 3, figsize=(15, 10))
fig.patch.set_facecolor('#0d0d14')

# Row 1: Different distributions
ax = axes[0, 0]
ax.hist(normal_data, bins=40, alpha=0.7, color='#8b5cf6', edgecolor='#0d0d14')
ax.set_title('Normal Distribution', color='white', fontweight='bold')
ax.set_facecolor('#1a1a25')
ax.tick_params(colors='#94a3b8')

ax = axes[0, 1]
ax.hist(skewed_data, bins=40, alpha=0.7, color='#f59e0b', edgecolor='#0d0d14')
ax.set_title('Skewed Distribution', color='white', fontweight='bold')
ax.set_facecolor('#1a1a25')
ax.tick_params(colors='#94a3b8')

ax = axes[0, 2]
ax.hist(bimodal_data, bins=40, alpha=0.7, color='#06b6d4', edgecolor='#0d0d14')
ax.set_title('Bimodal Distribution', color='white', fontweight='bold')
ax.set_facecolor('#1a1a25')
ax.tick_params(colors='#94a3b8')

# Row 2: Q-Q plots
for idx, (data, title) in enumerate([(normal_data, 'Normal Q-Q'),
                                      (skewed_data, 'Skewed Q-Q'),
                                      (bimodal_data, 'Bimodal Q-Q')]):
    ax = axes[1, idx]
    stats.probplot(data, dist="norm", plot=ax)
    ax.set_title(title, color='white', fontweight='bold')
    ax.set_facecolor('#1a1a25')
    ax.tick_params(colors='#94a3b8')
    ax.grid(True, alpha=0.2, color='#334155')

plt.tight_layout()
print("Statistical distributions and Q-Q plots displayed!")
`,
        },
      ],
    },
    {
      id: "mpl-3d-plotting",
      moduleId: "matplotlib-viz",
      lessonNumber: 10,
      title: "3D Plotting & Advanced Visualizations",
      description: "Create 3D surface plots, scatter plots, and interactive 3D visualizations.",
      duration: "15 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "3D Plots with mplot3d",
          content: `# 3D Plotting & Advanced Visualizations

## Importing 3D Tools

\`\`\`python
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
\`\`\`

## 3D Scatter Plot

\`\`\`python
ax.scatter(x, y, z, c=colors, cmap='viridis', s=100)
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
\`\`\`

## 3D Surface Plot

Visualize mathematical functions or gridded data:

\`\`\`python
X, Y = np.meshgrid(x_vals, y_vals)
Z = X**2 + Y**2  # or any function

ax.plot_surface(X, Y, Z, cmap='coolwarm', alpha=0.8)
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
\`\`\`

## 3D Wireframe

Same as surface but shows the grid:

\`\`\`python
ax.plot_wireframe(X, Y, Z, color='#8b5cf6', linewidth=0.5)
\`\`\`

> **When to use:** 3D plots are impressive but hard to read in 2D (on paper/screen). Use 2D projections with color when possible.
`,
          starterCode: `from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
import numpy as np

# Create 3D data
x = np.linspace(-5, 5, 100)
y = np.linspace(-5, 5, 100)
X, Y = np.meshgrid(x, y)
Z = np.sin(np.sqrt(X**2 + Y**2))  # Ripple function

fig = plt.figure(figsize=(14, 5))
fig.patch.set_facecolor('#0d0d14')

# Plot 1: Surface
ax1 = fig.add_subplot(121, projection='3d')
surf = ax1.plot_surface(X, Y, Z, cmap='viridis', alpha=0.9, edgecolor='none')
ax1.set_xlabel('X', color='white')
ax1.set_ylabel('Y', color='white')
ax1.set_zlabel('Z', color='white')
ax1.set_title('3D Surface Plot', color='white', fontweight='bold', pad=20)
ax1.view_init(elev=25, azim=45)  # rotation angles
ax1.tick_params(colors='#94a3b8')
cbar = plt.colorbar(surf, ax=ax1, pad=0.1, shrink=0.8)
cbar.ax.tick_params(colors='#94a3b8')

# Plot 2: Wireframe
ax2 = fig.add_subplot(122, projection='3d')
ax2.plot_wireframe(X, Y, Z, color='#06b6d4', linewidth=0.5, alpha=0.7)
ax2.set_xlabel('X', color='white')
ax2.set_ylabel('Y', color='white')
ax2.set_zlabel('Z', color='white')
ax2.set_title('3D Wireframe Plot', color='white', fontweight='bold', pad=20)
ax2.view_init(elev=25, azim=45)
ax2.tick_params(colors='#94a3b8')

plt.tight_layout()
print("3D plots created with different rendering styles!")
`,
        },
      ],
    },
    {
      id: "mpl-advanced-styling",
      moduleId: "matplotlib-viz",
      lessonNumber: 11,
      title: "Advanced Styling & Publication-Ready Plots",
      description: "Master figure styles, fonts, legends, and create publication-quality visualizations.",
      duration: "16 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Professional Plot Styling",
          content: `# Advanced Styling & Publication-Ready Plots

## Using Style Sheets

Matplotlib comes with predefined styles:

\`\`\`python
plt.style.use('seaborn-v0_8-darkgrid')  # Modern Seaborn style
plt.style.use('ggplot')                  # R ggplot2 style
\`\`\`

Available styles: \`['seaborn-v0_8', 'default', 'dark_background', 'bmh', 'fivethirtyeight', 'ggplot', ...\]

## Figure and Axes Properties

\`\`\`python
fig, ax = plt.subplots(figsize=(12, 7))

# DPI (dots per inch) — higher = sharper
fig.savefig('plot.png', dpi=300)

# Spine removal (for cleaner look)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

# Custom grid
ax.grid(True, alpha=0.3, linestyle='--', linewidth=0.5)
\`\`\`

## Advanced Legend Options

\`\`\`python
ax.legend(loc='best', framealpha=0.9, fontsize=11,
          title='Variables', title_fontsize=12,
          ncol=2)  # 2 columns
\`\`\`

## Annotations

Add text, arrows, and highlights:

\`\`\`python
ax.annotate('Important Point!',
            xy=(x_val, y_val),       # point to mark
            xytext=(x_text, y_text), # where to put text
            arrowprops=dict(arrowstyle='->', color='red'),
            fontsize=11, ha='left')
\`\`\`

## Font Management

\`\`\`python
import matplotlib.font_manager as fm

# Set global font
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.size'] = 11
plt.rcParams['axes.titlesize'] = 14
\`\`\`

> **Publication tip:** Save as PDF or EPS for papers, PNG/JPEG for web. Use 300 DPI for printing.
`,
          starterCode: `import matplotlib.pyplot as plt
import numpy as np

# Data
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
revenue = [45, 52, 48, 61, 75, 88]
expenses = [30, 35, 32, 40, 45, 55]

fig, ax = plt.subplots(figsize=(12, 6))
fig.patch.set_facecolor('#0d0d14')
ax.set_facecolor('#1a1a25')

# Plot
x = np.arange(len(months))
width = 0.35

bars1 = ax.bar(x - width/2, revenue, width, label='Revenue', color='#10b981', alpha=0.8)
bars2 = ax.bar(x + width/2, expenses, width, label='Expenses', color='#ef4444', alpha=0.8)

# Styling
ax.set_xlabel('Month', color='white', fontweight='bold', fontsize=12)
ax.set_ylabel('Amount ($K)', color='white', fontweight='bold', fontsize=12)
ax.set_title('Revenue vs Expenses (2024)', color='white', fontweight='bold', fontsize=14, pad=20)
ax.set_xticks(x)
ax.set_xticklabels(months, color='#94a3b8')
ax.tick_params(colors='#94a3b8')

# Remove top/right spines
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color('#334155')
ax.spines['bottom'].set_color('#334155')

# Grid
ax.grid(True, axis='y', alpha=0.3, linestyle='--', color='#334155')
ax.set_axisbelow(True)

# Legend
ax.legend(loc='upper left', framealpha=0.95, fontsize=11, fancybox=True, shadow=True)

# Add value labels on bars
for bar in bars1:
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2., height,
            f'\${height:.0f}K', ha='center', va='bottom', color='white', fontsize=10)

for bar in bars2:
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2., height,
            f'\${height:.0f}K', ha='center', va='bottom', color='white', fontsize=10)

plt.tight_layout()
print("Publication-quality styled plot created!")
`,
        },
      ],
    },
    ],
};

// ─────────────────────────────────────────────────────────────
// MODULE 4 — Numerical Python (NumPy)
// ─────────────────────────────────────────────────────────────
const numpyModule: Module = {
  id: "numpy-fundamentals",
  title: "Numerical Python (NumPy)",
  slug: "numpy",
  description:
    "Unlock high-performance vectorized math. NumPy is the engine that powers Pandas, Scikit-Learn, and all matrix operations.",
  introduction: `# Welcome to NumPy 🔢\n\nNumPy arrays are **10-100x faster** than Python lists for numerical computing. NumPy is the foundation of the entire data science ecosystem.\n\n## Why NumPy?\n\n- **Vectorized operations** - Apply math to entire arrays instantly\n- **Memory efficient** - Store millions of numbers compactly\n- **Broadcasting** - Operations across different shapes\n- **Linear algebra** - Matrix multiplication, eigenvalues, solving systems\n- **Random numbers** - Simulations and statistical testing\n\n## Real-World Speed\n\nDoubliing 1,000,000 numbers:\n- Python list with loop: ~100ms\n- NumPy array (vectorized): ~1ms\n\n**That's 100x faster!**\n\n## Prerequisites\n✅ Module 1 (Python Basics)\n\nLet's unlock numerical superpower! ⚡`,
  icon: "⚡",
  color: "from-amber-500 to-orange-800",
  level: "Intermediate",
  totalDuration: "4h 05min",
  heroImage:
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80", // Math/numbers image
  lessons: [
    {
      id: "np-arrays",
      moduleId: "numpy-fundamentals",
      lessonNumber: 1,
      title: "Arrays vs Lists: Why NumPy?",
      description: "Understand vectorization and create your first n-dimensional arrays.",
      duration: "20 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "The Power of Vectorization",
          content: `# Numerical Python (NumPy)

## What is NumPy?

**NumPy** (Numerical Python) is the foundational scientific computing library for Python. At its core it provides the **ndarray** — an N-dimensional array data structure that stores homogeneous numerical data in a single contiguous block of memory. Unlike Python lists, which store pointers to objects scattered across the heap, NumPy arrays pack raw numerical values side-by-side, letting the CPU process many elements per clock cycle through hardware-level vectorization.

Put simply: NumPy lets you do math on entire arrays at once, without writing loops — and does it in C under the hood, making it 10–100× faster than pure Python.

## Why Not Just Use Lists?

Python lists are flexible, but **slow** for math because they store pointers to objects. NumPy arrays store data in contiguous C-level memory blocks.

### The Vectorization Difference

\`\`\`python
# Python List approach (SLOW - loops in Python)
squares = [x**2 for x in range(1000000)]

# NumPy approach (FAST - loops in C)
import numpy as np
arr = np.arange(1000000)
squares = arr**2  # Vectorized!
\`\`\`

NumPy operations are:
- **10x to 100x faster** than pure Python
- **More readable** (no loops)
- **Memory efficient**

## Creating Arrays

\`\`\`python
np.array([1, 2, 3])          # From list
np.zeros((3, 4))             # 3x4 matrix of 0s
np.ones(5)                   # 1D array of 1s
np.arange(0, 1, 0.1)         # Like range() but with floats
np.linspace(0, 10, 50)       # 50 evenly spaced points
\`\`\`
`,
          starterCode: `import numpy as np
import time

# Compare speed: List vs NumPy
size = 1_000_000

# 1. Python List
start = time.time()
py_list = list(range(size))
py_squares = [x**2 for x in py_list]
list_time = time.time() - start

# 2. NumPy Array
start = time.time()
np_arr = np.arange(size)
np_squares = np_arr**2
np_time = time.time() - start

print(f"List time  : {list_time:.4f} seconds")
print(f"NumPy time : {np_time:.4f} seconds")
print(f"NumPy is {list_time/np_time:.1f}x faster!\\n")

# Creating arrays
print("=== Array Creation ===")
print(f"Zeros:\\n{np.zeros((2, 3))}\\n")
print(f"Range 0-9:\\n{np.arange(9)}\\n")
print(f"Linspace (5 points 0-10):\\n{np.linspace(0, 10, 5)}")
`,
        },
        {
          pageNumber: 2,
          title: "Indexing, Slicing & Shapes",
          content: `## N-Dimensional Indexing

NumPy shines with multi-dimensional data (matrices, images, tensors).

### 2D Array Indexing

\`\`\`python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

matrix[0, 1]     # → 2 (Row 0, Col 1)
matrix[0, :]     # → [1, 2, 3] (Whole first row)
matrix[:, 1]     # → [2, 5, 8] (Whole second column)
\`\`\`

### Boolean Masking (Crucial for Data Science)

Instead of looping to filter, use boolean arrays:

\`\`\`python
data = np.array([10, 20, 30, 40, 50])
mask = data > 25
filtered = data[mask]  # → [30, 40, 50]
\`\`\`

### Reshaping

Neural networks and ML models require specific input shapes:

\`\`\`python
arr = np.arange(12)
arr.reshape(3, 4)  # Convert 1D to 3x4 2D
arr.reshape(-1, 1) # Automatically figure out rows, force 1 column
\`\`\`
`,
          starterCode: `import numpy as np

# 2D Matrix operations
matrix = np.array([
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
])

print("=== Original Matrix ===")
print(matrix)

print("\\n=== Row 0 ===")
print(matrix[0, :])

print("\\n=== Column 1 ===")
print(matrix[:, 1])

# Boolean Masking
data = np.array([15, 85, 42, 91, 33, 67, 88, 12])
print("\\n=== Data ===")
print(data)

mask = data >= 50
print(f"\\nMask (>= 50): {mask}")
print(f"Filtered Data: {data[mask]}")

# Reshaping
arr = np.arange(1, 13)
print(f"\\nOriginal (1D): {arr}")
print(f"Reshaped (3x4):\\n{arr.reshape(3, 4)}")
print(f"Reshaped (Col vector):\\n{arr.reshape(-1, 1)}")
`,
        },
      ],
    },
    {
      id: "np-broadcasting",
      moduleId: "numpy-fundamentals",
      lessonNumber: 2,
      title: "Broadcasting & Linear Algebra",
      description: "Perform matrix math, dot products, and understand broadcasting rules.",
      duration: "25 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Broadcasting Rules",
          content: `# Broadcasting & Linear Algebra

## What is Broadcasting?

Broadcasting is NumPy's ability to apply operations on arrays of **different shapes** without making explicit copies.

### Rule of Thumb
NumPy compares shapes element-wise from the trailing dimensions forward. Two dimensions are compatible if they are equal or one of them is 1.

\`\`\`python
# Shape (3, 3) + Shape (3,) → Works!
matrix = np.ones((3, 3))
row = np.array([1, 2, 3])
result = matrix + row  # row is "broadcast" to all 3 rows
\`\`\`

## Essential Math Operations

\`\`\`python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

np.add(a, b)      # Element-wise addition
np.multiply(a, b) # Element-wise multiplication (Hadamard)
np.dot(a, b)      # Dot product (1*4 + 2*5 + 3*6 = 32)
\`\`\`

> ⚠️ **Never use \`*\` for matrix multiplication.** Always use \`np.dot()\` or the \`@\` operator.
`,
          starterCode: `import numpy as np

# Broadcasting Example
scores = np.array([
    [85, 90, 78],
    [92, 88, 95],
    [76, 81, 84]
])
# Add a curve of 5 points to ALL students
curved = scores + np.array([5]) 
print("=== Original ===")
print(scores)
print("\\n=== Curved (+5 broadcasted) ===")
print(curved)

# Element-wise vs Dot Product
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(f"\\nElement-wise (a * b): {a * b}")
print(f"Dot Product (a · b):    {np.dot(a, b)}")

# Matrix Multiplication
X = np.array([[1, 2], [3, 4]])
W = np.array([[0.5], [-0.5]])
result = X @ W  # @ is the matrix multiplication operator
print(f"\\nMatrix X:\\n{X}")
print(f"Weight W:\\n{W}")
print(f"Result X @ W:\\n{result}")
`,
        },
      ],
    },
    {
        id: "np-ufuncs",
        moduleId: "numpy-fundamentals",
        lessonNumber: 3,
        title: "Universal Functions (ufuncs)",
        description: "Replace slow Python loops with blazing-fast C-level element-wise operations.",
        duration: "18 min",
        difficulty: "Intermediate",
        pages: [
          {
            pageNumber: 1,
            title: "Vectorizing Math Operations",
            content: `# Universal Functions (ufuncs)

## What is a ufunc?
A ufunc (universal function) is a function that operates on ndarrays element-by-element. They are written in C and are the reason NumPy is fast.

### Why ufuncs over Loops?
A Python \`for\` loop has to check types and dispatch functions on every single iteration. A ufunc pushes the loop down to C, bypassing Python overhead entirely.

### Common ufuncs

| Math | Trigonometric | Comparison |
|------|---------------|------------|
| \`np.add\` | \`np.sin\` | \`np.greater\` |
| \`np.subtract\` | \`np.cos\` | \`np.less\` |
| \`np.multiply\` | \`np.exp\` | \`np.equal\` |
| \`np.sqrt\` | \`np.log\` | \`np.isnan\` |

### Aggregations
ufuncs have methods to collapse arrays:
\`\`\`python
arr = np.array([1, 2, 3, 4])
arr.sum()
arr.mean()
arr.cumsum() # Cumulative sum: [1, 3, 6, 10]
\`\`\`
`,
            starterCode: `import numpy as np
import math
import time

# 1. Math ufuncs
angles = np.array([0, np.pi/2, np.pi])
print("Sin of angles:", np.sin(angles).round(4))
print("Exp of [0, 1, 2]:", np.exp([0, 1, 2]).round(4))

# 2. Comparison ufuncs (Returns boolean masks)
data = np.array([10, 15, -5, 20, -10, 30])
mask = np.greater(data, 0)
print("\\nPositive mask:", mask)
print("Filtered data:", data[mask])

# 3. Speed comparison: Loop vs ufunc
size = 1_000_000
arr = np.random.rand(size)

start = time.time()
# Python loop
py_res = [math.sqrt(x) for x in arr]
t_loop = time.time() - start

start = time.time()
# ufunc
np_res = np.sqrt(arr)
t_ufunc = time.time() - start

print(f"\\nLoop time: {t_loop:.4f}s")
print(f"ufunc time: {t_ufunc:.4f}s")
print(f"ufunc is {t_loop/t_ufunc:.0f}x faster!")
`,
          },
        ],
      },
      {
        id: "np-stats",
        moduleId: "numpy-fundamentals",
        lessonNumber: 4,
        title: "Statistical Operations",
        description: "Calculate means, variances, standard deviations, and percentiles along specific axes.",
        duration: "20 min",
        difficulty: "Intermediate",
        pages: [
          {
            pageNumber: 1,
            title: "Descriptive Statistics with NumPy",
            content: `# Statistical Operations

## Moving Beyond Basic Averages
In Data Science, understanding the *spread* of your data is just as important as the average.

### Key NumPy Stats Methods
- \`np.mean()\`: Average
- \`np.median()\`: Middle value (robust to outliers)
- \`np.std()\`: Standard Deviation (spread)
- \`np.var()\`: Variance (std squared)
- \`np.percentile()\`: Find thresholds (e.g., top 10%)

### The \`axis\` Argument
When working with 2D arrays (matrices), you can calculate stats per row or per column:
- \`axis=0\`: Operate *down* the rows (result per column)
- \`axis=1\`: Operate *across* the columns (result per row)

\`\`\`python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6]])
matrix.mean(axis=0) # → [2.5, 3.5, 4.5] (column means)
\`\`\`
`,
            starterCode: `import numpy as np

# Simulate 3 students' scores across 5 exams
scores = np.array([
    [85, 90, 78, 92, 88], # Student A
    [70, 65, 80, 75, 72], # Student B
    [95, 98, 92, 99, 96]  # Student C
])

print("=== Score Matrix ===")
print(scores)

# Global stats
print(f"\\nOverall Mean: {scores.mean():.2f}")
print(f"Overall Std:  {scores.std():.2f}")

# Axis operations
print(f"\\nAverage per Exam (axis=0): {scores.mean(axis=0).round(1)}")
print(f"Average per Student (axis=1): {scores.mean(axis=1).round(1)}")

# Percentiles
flat_scores = scores.flatten()
print(f"\\n90th Percentile: {np.percentile(flat_scores, 90):.1f}")
print(f"25th Percentile (Q1): {np.percentile(flat_scores, 25):.1f}")

# Outlier detection using Z-Score (NumPy way)
mean = flat_scores.mean()
std = flat_scores.std()
z_scores = (flat_scores - mean) / std
print(f"\\nZ-Scores: {z_scores.round(2)}")
outliers = flat_scores[np.abs(z_scores) > 1.5]
print(f"Potential Outliers (|Z| > 1.5): {outliers}")
`,
          },
        ],
      },
      {
        id: "np-random",
        moduleId: "numpy-fundamentals",
        lessonNumber: 5,
        title: "Randomness & Simulation",
        description: "Generate random samples, set seeds for reproducibility, and simulate distributions.",
        duration: "22 min",
        difficulty: "Advanced",
        pages: [
          {
            pageNumber: 1,
            title: "The Random Module",
            content: `# Randomness & Simulation

## Why Randomness?
Machine learning relies heavily on randomness: initializing weights, splitting data into train/test sets, and dropout regularization.

### Setting the Seed
Computers generate *pseudo-random* numbers. Setting a seed ensures reproducibility:
\`\`\`python
np.random.seed(42) # Always generates the same "random" numbers
\`\`\`

### Essential Random Functions
- \`np.random.rand(d1, d2)\`: Uniform distribution [0, 1)
- \`np.random.randn(d1, d2)\`: Standard Normal (Gaussian) distribution (mean=0, std=1)
- \`np.random.randint(low, high)\`: Random integers
- \`np.random.choice(array)\`: Random sample from an array

### Simulating the Central Limit Theorem (CLT)
The CLT states that if you take enough random samples from *any* distribution, the means of those samples will form a normal distribution. We can prove this easily with NumPy!
`,
            starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64

np.random.seed(42)

# 1. Different Distributions
uniform = np.random.rand(10000)
normal = np.random.randn(10000) # Mean 0, Std 1

print(f"Uniform: Mean={uniform.mean():.2f}, Std={uniform.std():.2f}")
print(f"Normal:  Mean={normal.mean():.2f}, Std={normal.std():.2f}")

# 2. Simulating Central Limit Theorem
# Generate 1000 samples. Each sample is the mean of 50 dice rolls.
dice_rolls = np.random.randint(1, 7, size=(1000, 50))
sample_means = dice_rolls.mean(axis=1)

# Plotting the CLT proof
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
for ax in (axes[0], axes[1]):
    ax.set_facecolor('#0d0d14')
fig.patch.set_facecolor('#0d0d14')

# Uniform dist
axes[0].hist(uniform, bins=50, color='#f59e0b', alpha=0.8, edgecolor='#0d0d14')
axes[0].set_title('Uniform Distribution', color='white', fontsize=13)
axes[0].tick_params(colors='#94a3b8')
axes[0].spines[:].set_color('#1e293b')

# CLT result (Means of dice rolls -> Normal dist!)
axes[1].hist(sample_means, bins=40, color='#8b5cf6', alpha=0.8, edgecolor='#0d0d14')
axes[1].axvline(sample_means.mean(), color='#06b6d4', linestyle='--', linewidth=2)
axes[1].set_title('CLT Proof: Means of Dice Rolls', color='white', fontsize=13)
axes[1].set_xlabel('Sample Mean', color='#94a3b8')
axes[1].tick_params(colors='#94a3b8')
axes[1].spines[:].set_color('#1e293b')

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
img_b64 = base64.b64encode(buf.read()).decode()
print(f"PLOT_BASE64:{img_b64}")
plt.close()
`,
          },
        ],
      },
    {
      id: "np-advanced-indexing",
      moduleId: "numpy-fundamentals",
      lessonNumber: 6,
      title: "Advanced Indexing & Fancy Indexing",
      description: "Use arrays as indices to select complex subsets of data.",
      duration: "13 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Fancy Indexing Techniques",
          content: `# Advanced Indexing & Fancy Indexing

## Beyond Basic Slicing
NumPy's fancy indexing allows you to select elements using **arrays of indices**, not just ranges.

### Integer Array Indexing

\`\`\`python
arr = np.array([10, 20, 30, 40, 50])

# Select by index array
indices = np.array([0, 2, 4])
arr[indices]  # [10, 30, 50]
\`\`\`

### Boolean Indexing (Most Useful!)

\`\`\`python
arr = np.array([10, 20, 30, 40, 50])
mask = arr > 25  # [False, False, True, True, True]
arr[mask]        # [30, 40, 50]
\`\`\`

### 2D Advanced Indexing

\`\`\`python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

# Select rows [0, 2]
matrix[[0, 2]]        # rows 0 and 2

# Select by condition
matrix[matrix > 4]    # [5, 6, 7, 8, 9]
\`\`\`

> **Key insight:** Boolean indexing is the foundation of NumPy's speed advantage over lists for data analysis.
`,
          starterCode: `import numpy as np

# 1D fancy indexing
scores = np.array([45, 82, 91, 76, 88, 99, 63, 95, 71, 87])

print("=== Original Array ===")
print(scores)

# Select specific indices
top_indices = np.array([5, 3, 7])  # indices of top performers
print(f"\\n=== Top Score Indices {top_indices} ===")
print(scores[top_indices])

# Boolean indexing (mask)
passing = scores >= 80
print(f"\\n=== Passing Scores (≥80) ===")
print(f"Mask: {passing}")
print(f"Values: {scores[passing]}")
print(f"Count: {passing.sum()}")

# 2D example
matrix = np.arange(1, 13).reshape(3, 4)
print(f"\\n=== 2D Matrix ===")
print(matrix)

# Select rows
print(f"\\n=== Rows 0 and 2 ===")
print(matrix[[0, 2]])

# Select by condition
print(f"\\n=== Elements > 6 ===")
print(matrix[matrix > 6])
`,
        },
      ],
    },
    {
      id: "np-broadcasting",
      moduleId: "numpy-fundamentals",
      lessonNumber: 7,
      title: "Broadcasting — NumPy's Superpower",
      description: "Perform operations on arrays of different shapes efficiently.",
      duration: "12 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Broadcasting Fundamentals",
          content: `# Broadcasting — NumPy's Superpower

## What is Broadcasting?
Broadcasting allows NumPy to automatically expand arrays of different shapes to operate together. It's like "stretching" dimensions for compatibility.

### Simple Broadcasting

\`\`\`python
arr = np.array([[1, 2, 3],
                [4, 5, 6]])       # shape (2, 3)
scalar = 10

arr + scalar  # scalar is broadcast to (2, 3)
# Result: [[11, 12, 13],
#          [14, 15, 16]]
\`\`\`

### Broadcasting Rules
Two dimensions are compatible if:
1. They are **equal**, OR
2. One of them is **1**

\`\`\`
A:      (3,)   →   (1, 3)   →   (2, 3)  ✓ Compatible
B:  (2, 1)    →   (2, 1)   →   (2, 3)  ✓ Compatible
\`\`\`

### Real Example: Center Data

\`\`\`python
data = np.array([[100, 200, 300],
                 [110, 220, 310],
                 [90,  180, 290]])  # shape (3, 3)

means = data.mean(axis=0)           # shape (3,) → [100, 200, 300]
centered = data - means             # broadcasting!
\`\`\`

> **This is why NumPy is fast:** Broadcasting operates at C speed, not Python loop speed!
`,
          starterCode: `import numpy as np

print("=== Broadcasting Examples ===")

# 1. Scalar broadcast
arr = np.array([[1, 2, 3],
                [4, 5, 6]])
print("\\n1. Add scalar to matrix")
print(f"arr shape: {arr.shape}")
print(f"arr + 10:\\n{arr + 10}")

# 2. Row broadcast
row = np.array([10, 20, 30])
print(f"\\n2. Add row to matrix")
print(f"row shape: {row.shape}")
print(f"arr + row:\\n{arr + row}")

# 3. Column broadcast
col = np.array([[100], [200]]).reshape(2, 1)
print(f"\\n3. Add column to matrix")
print(f"col shape: {col.shape}")
print(f"arr + col:\\n{arr + col}")

# 4. Practical: Normalize (center & scale)
data = np.array([[10, 20, 30],
                 [12, 22, 28],
                 [11, 19, 31]], dtype=float)

means = data.mean(axis=0)
stds = data.std(axis=0)
print(f"\\n4. Standardization (Z-score)")
print(f"Raw data:\\n{data}")
print(f"Means: {means}")
print(f"Stds:  {stds}")

standardized = (data - means) / stds
print(f"Standardized:\\n{standardized.round(2)}")
print(f"New mean: {standardized.mean(axis=0).round(6)}")
print(f"New std:  {standardized.std(axis=0).round(6)}")
`,
        },
      ],
    },
    {
      id: "np-linalg",
      moduleId: "numpy-fundamentals",
      lessonNumber: 8,
      title: "Linear Algebra — Matrices & Decomposition",
      description: "Master matrix operations, eigenvalues, and matrix decomposition for machine learning.",
      duration: "20 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Matrix Operations",
          content: `# Linear Algebra — Matrices & Decomposition

## Matrix Multiplication

The fundamental operation in machine learning and data science.

\`\`\`python
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Element-wise multiplication
A * B                    # [[5, 12], [21, 32]]

# Matrix multiplication (dot product)
A @ B                    # or np.dot(A, B)
# [[1*5 + 2*7, 1*6 + 2*8],
#  [3*5 + 4*7, 3*6 + 4*8]]
\`\`\`

### Why This Matters
- **Neural networks** use matrix multiplication for forward pass
- **Linear regression** solves: \`X @ w = y\`
- **Dimensionality reduction** (PCA) uses matrix decomposition

## Solving Linear Systems

\`\`\`python
# Ax = b  →  x = A^(-1) @ b
A = np.array([[1, 2], [3, 4]])
b = np.array([5, 6])
x = np.linalg.solve(A, b)
\`\`\`

## Eigenvalues & Eigenvectors

Used in PCA, spectral clustering, and network analysis:

\`\`\`python
evals, evecs = np.linalg.eig(A)  # eigenvalues and eigenvectors
\`\`\`

## Common Matrix Decompositions

| Method | Formula | Use Case |
|--------|---------|----------|
| Inverse | \`A^(-1)\` | Solving \`Ax = b\` |
| Determinant | \`det(A)\` | Invertibility check |
| SVD | \`U @ S @ V.T\` | PCA, image compression |
| Cholesky | \`L @ L.T\` | Gaussian processes |
| QR | \`Q @ R\` | Least squares fitting |
`,
          starterCode: `import numpy as np

# Create matrices
A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]], dtype=float)

B = np.array([[9, 8, 7],
              [6, 5, 4],
              [3, 2, 1]], dtype=float)

print("=== Matrix A ===")
print(A)
print(f"Shape: {A.shape}")

# Matrix multiplication
C = A @ B
print("\\n=== A @ B (matrix mult) ===")
print(C.astype(int))

# Determinant (tells us if matrix is invertible)
det_A = np.linalg.det(A)
print(f"\\n=== Determinant of A ===")
print(f"det(A) = {det_A:.6f}")
print(f"Invertible? {abs(det_A) > 1e-10}")

# Create invertible matrix for inverse
X = np.array([[1, 2],
              [3, 4]], dtype=float)
print(f"\\n=== Matrix X ===")
print(X)

# Inverse
X_inv = np.linalg.inv(X)
print(f"\\n=== X^(-1) ===")
print(X_inv)

# Verify: X @ X^(-1) should be Identity
print(f"\\n=== X @ X^(-1) (should be I) ===")
print((X @ X_inv).round(10))

# Eigenvalues and eigenvectors
evals, evecs = np.linalg.eig(X)
print(f"\\n=== Eigenvalues ===")
print(evals)
print(f"\\n=== Eigenvectors ===")
print(evecs)

# Verify: X @ v = λ @ v
for i in range(len(evals)):
    v = evecs[:, i]
    lhs = X @ v
    rhs = evals[i] * v
    print(f"\\nEigen pair {i}: λ={evals[i]:.2f}")
    print(f"X @ v = {lhs.round(2)}")
    print(f"λ @ v = {rhs.round(2)}")
`,
        },
      ],
    },
    {
      id: "np-fileio",
      moduleId: "numpy-fundamentals",
      lessonNumber: 9,
      title: "File I/O & Data Persistence",
      description: "Save and load NumPy arrays efficiently using .npy, .npz, and text formats.",
      duration: "14 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Saving & Loading Arrays",
          content: `# File I/O & Data Persistence

## Binary Formats (.npy & .npz)

Fast, efficient storage designed specifically for NumPy:

\`\`\`python
# Save single array
np.save('data.npy', arr)
arr = np.load('data.npy')

# Save multiple arrays (compressed)
np.savez_compressed('data.npz', 
                     features=X, 
                     labels=y)

# Load from .npz
loaded = np.load('data.npz')
X = loaded['features']
y = loaded['labels']
\`\`\`

### Advantages of .npy/.npz
- **Fast** (binary format)
- **Preserves dtype** (int32 stays int32)
- **Preserves shape** (no ambiguity)
- **Compressed** option available

## Text Formats (CSV, TSV)

Human-readable, shareable:

\`\`\`python
# Save as CSV
np.savetxt('data.csv', arr, delimiter=',')

# Load from CSV
arr = np.loadtxt('data.csv', delimiter=',')
\`\`\`

### When to Use Each

| Format | Speed | Size | Human-Readable |
|--------|-------|------|----------------|
| .npy | ⚡⚡⚡ | Medium | ❌ |
| .npz | ⚡⚡⚡ | Small | ❌ |
| CSV | ⚡ | Large | ✅ |
| TSV | ⚡ | Large | ✅ |

> **Production tip:** Use .npz for internal storage, CSV for sharing with non-Python tools.
`,
          starterCode: `import numpy as np
import os

# Create sample data
features = np.random.randn(100, 5)  # 100 samples, 5 features
labels = np.random.randint(0, 2, 100)  # binary labels
metadata = np.array(['batch_1', 'batch_1', 'batch_2'] * 33 + ['batch_2'])

print("=== Original Data ===")
print(f"Features shape: {features.shape}")
print(f"Labels shape: {labels.shape}")
print(f"Metadata shape: {metadata.shape}")

# 1. Save as .npy (single array)
np.save('/tmp/features.npy', features)
print("\\n✓ Saved features as .npy")

# 2. Save as .npz (multiple arrays, compressed)
np.savez_compressed('/tmp/dataset.npz',
                    features=features,
                    labels=labels,
                    metadata=metadata)
print("✓ Saved dataset as .npz (compressed)")

# 3. Load back
loaded_features = np.load('/tmp/features.npy')
dataset = np.load('/tmp/dataset.npz')

print(f"\\n=== Loaded Data ===")
print(f"Loaded features match: {np.allclose(loaded_features, features)}")
print(f"Loaded labels match: {np.array_equal(dataset['labels'], labels)}")
print(f"Loaded metadata match: {np.array_equal(dataset['metadata'], metadata)}")

# 4. Save as CSV
np.savetxt('/tmp/features.csv', features, delimiter=',', fmt='%.6f')
csv_loaded = np.loadtxt('/tmp/features.csv', delimiter=',')
print(f"\\nCSV round-trip match: {np.allclose(csv_loaded, features)}")

# 5. File sizes
npy_size = os.path.getsize('/tmp/features.npy')
npz_size = os.path.getsize('/tmp/dataset.npz')
csv_size = os.path.getsize('/tmp/features.csv')

print(f"\\n=== File Sizes ===")
print(f".npy: {npy_size:,} bytes")
print(f".npz: {npz_size:,} bytes (compressed)")
print(f".csv: {csv_size:,} bytes")
print(f"Compression ratio: {csv_size / npz_size:.1f}x")
`,
        },
      ],
    },
    {
      id: "np-polynomial-fitting",
      moduleId: "numpy-fundamentals",
      lessonNumber: 10,
      title: "Polynomial Fitting & Curve Fitting",
      description: "Fit polynomials to data and create smooth curve approximations.",
      duration: "16 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Polynomial Regression",
          content: `# Polynomial Fitting & Curve Fitting

## Polynomial Fitting with \`polyfit\`

Fit a polynomial of degree n to data points:

\`\`\`python
# Fit a quadratic (degree 2) to noisy data
coeffs = np.polyfit(x, y, deg=2)
# Returns [a, b, c] for y = ax² + bx + c

# Evaluate the polynomial
y_fit = np.polyval(coeffs, x)
\`\`\`

### Polynomial Degrees

| Degree | Formula | Use Case |
|--------|---------|----------|
| 1 | \`y = ax + b\` | Linear regression |
| 2 | \`y = ax² + bx + c\` | Quadratic |
| 3 | \`y = ax³ + ...\` | Cubic |
| n | General n-th order | Complex curves |

### Caution: Overfitting

Higher degrees fit noise, not signal. Watch your validation error!

\`\`\`python
# Compare different degrees
for deg in [1, 2, 3, 5]:
    coeffs = np.polyfit(x, y, deg)
    y_fit = np.polyval(coeffs, x)
    rmse = np.sqrt(np.mean((y - y_fit)**2))
    print(f"Degree {deg}: RMSE = {rmse:.4f}")
\`\`\`

## Multi-dimensional Fitting

For more complex models, use least squares:

\`\`\`python
# y = a*x1 + b*x2 + c*x3 + noise
# Stack features as columns, solve: X @ w = y
X = np.column_stack([x1, x2, x3, np.ones_like(x1)])
w = np.linalg.lstsq(X, y, rcond=None)[0]
\`\`\`

> **Best practice:** Use train/validation split to choose polynomial degree.
`,
          starterCode: `import numpy as np

# Create noisy data from a quadratic
np.random.seed(42)
x = np.linspace(-2, 2, 50)
y_true = x**2 - x + 1
y_noisy = y_true + np.random.normal(0, 0.3, len(x))

print("=== Polynomial Fitting ===")

# Fit different degrees
results = []
for degree in [1, 2, 3, 5]:
    # Fit polynomial
    coeffs = np.polyfit(x, y_noisy, degree)
    
    # Evaluate on training data
    y_fit = np.polyval(coeffs, x)
    
    # Calculate RMSE
    rmse = np.sqrt(np.mean((y_noisy - y_fit)**2))
    
    # Store results
    results.append({
        'degree': degree,
        'coeffs': coeffs,
        'rmse': rmse
    })
    
    print(f"\\nDegree {degree}:")
    print(f"  Coefficients: {coeffs}")
    print(f"  RMSE: {rmse:.4f}")

# Find best degree (lowest RMSE)
best_idx = np.argmin([r['rmse'] for r in results])
best_degree = results[best_idx]['degree']
print(f"\\n=== Best Fit ===")
print(f"Degree {best_degree} with RMSE {results[best_idx]['rmse']:.4f}")

# Demonstrate overfitting
print(f"\\n=== Overfitting Warning ===")
print("Higher degrees fit noise, not signal:")

# Very high degree (overfits)
high_coeffs = np.polyfit(x, y_noisy, 15)
y_overfit = np.polyval(high_coeffs, x)
rmse_overfit = np.sqrt(np.mean((y_noisy - y_overfit)**2))
print(f"Degree 15: RMSE = {rmse_overfit:.6f} (too perfect = overfit!)")

# Evaluate on unseen data
x_test = np.linspace(-2, 2, 100)
y_test_true = x_test**2 - x_test + 1
y_test_noisy = y_test_true + np.random.normal(0, 0.3, len(x_test))

y_best_fit = np.polyval(results[best_idx]['coeffs'], x_test)
y_overfit_test = np.polyval(high_coeffs, x_test)

rmse_best_test = np.sqrt(np.mean((y_test_noisy - y_best_fit)**2))
rmse_overfit_test = np.sqrt(np.mean((y_test_noisy - y_overfit_test)**2))

print(f"\\nOn test data:")
print(f"Degree {best_degree}: RMSE = {rmse_best_test:.4f}")
print(f"Degree 15:      RMSE = {rmse_overfit_test:.4f} (worse!)")
`,
        },
      ],
    },
    {
      id: "np-performance",
      moduleId: "numpy-fundamentals",
      lessonNumber: 11,
      title: "Performance & Optimization",
      description: "Profile NumPy code, benchmark operations, and optimize for speed.",
      duration: "15 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Benchmarking & Optimization",
          content: `# Performance & Optimization

## Timing Code with \`timeit\`

Always measure before and after optimization:

\`\`\`python
import timeit

# Time a statement 1000 times
time_ms = timeit.timeit('x**2', 'x = 5', number=1000) / 1000
print(f"Time per operation: {time_ms * 1e6:.2f} microseconds")
\`\`\`

## Vectorization vs Loops

The golden rule: **Avoid loops, use vectorization**

\`\`\`python
# SLOW: Python loop
result = []
for i in range(1000000):
    result.append(i**2)

# FAST: NumPy vectorization (100x faster)
result = np.arange(1000000)**2
\`\`\`

## Memory Layout: C vs Fortran Order

NumPy arrays can be row-major (C) or column-major (Fortran):

\`\`\`python
arr_c = np.array([[1, 2], [3, 4]], order='C')  # Row-major
arr_f = np.array([[1, 2], [3, 4]], order='F')  # Column-major

# Iterate rows (C-order faster)
for row in arr_c:
    sum(row)

# Iterate columns (Fortran-order faster)
for col in arr_f.T:
    sum(col)
\`\`\`

## Common Performance Traps

1. **Type mismatch** — float64 × float32 requires conversion
2. **Axis ambiguity** — specify \`axis\` explicitly
3. **Copying vs views** — \`.copy()\` vs slicing
4. **Function call overhead** — numpy functions > custom loops

> **Pro tip:** Use NumPy's built-in functions (they're optimized in C). Avoid \`np.apply_along_axis\` for large arrays.
`,
          starterCode: `import numpy as np
import time

print("=== NumPy Performance Comparison ===")

size = 1_000_000

# 1. Loop vs Vectorization
print("\\n1. Loop vs Vectorization")
arr = np.arange(size)

start = time.time()
result_loop = [x**2 for x in arr]
time_loop = time.time() - start

start = time.time()
result_vec = arr**2
time_vec = time.time() - start

print(f"Python loop:  {time_loop*1000:.2f} ms")
print(f"NumPy vec:    {time_vec*1000:.2f} ms")
print(f"Speedup:      {time_loop/time_vec:.1f}x faster")

# 2. Built-in functions vs loops
print("\\n2. Built-in Functions vs Custom Loop")
arr = np.random.randn(10000)

start = time.time()
mean_builtin = arr.mean()
time_builtin = time.time() - start

start = time.time()
mean_custom = sum(arr) / len(arr)
time_custom = time.time() - start

print(f"np.mean():    {time_builtin*1e6:.2f} µs")
print(f"sum() / len(): {time_custom*1e6:.2f} µs")
print(f"Speedup:      {time_custom/time_builtin:.1f}x faster")

# 3. dtype impact
print("\\n3. Data Type Impact")
sizes = [100, 1000, 10000]
for s in sizes:
    arr_f32 = np.random.randn(s).astype(np.float32)
    arr_f64 = np.random.randn(s).astype(np.float64)
    
    start = time.time()
    for _ in range(1000):
        _ = arr_f32.sum()
    time_f32 = time.time() - start
    
    start = time.time()
    for _ in range(1000):
        _ = arr_f64.sum()
    time_f64 = time.time() - start
    
    print(f"Size {s:5d}: float32={time_f32*1000:.2f}ms, float64={time_f64*1000:.2f}ms")

# 4. In-place operations
print("\\n4. In-place vs Copy Operations")
arr = np.random.randn(1000000)

start = time.time()
for _ in range(100):
    arr2 = arr * 2  # Creates copy
time_copy = time.time() - start

arr3 = np.random.randn(1000000)
start = time.time()
for _ in range(100):
    np.multiply(arr3, 2, out=arr3)  # In-place
time_inplace = time.time() - start

print(f"Copy:    {time_copy*1000:.2f} ms")
print(f"In-place: {time_inplace*1000:.2f} ms")
print(f"Speedup: {time_copy/time_inplace:.1f}x faster")
`,
        },
      ],
    },
    ],
};

// ─────────────────────────────────────────────────────────────
// MODULE 5 — Intro to Machine Learning (From Scratch)
// ─────────────────────────────────────────────────────────────
const mlModule: Module = {
  id: "ml-basics",
  title: "Machine Learning Fundamentals",
  slug: "ml-basics",
  description:
    "Master every ML algorithm: Regression, Classification, Clustering, Ensemble Methods. Build from scratch using pure NumPy. 17 comprehensive lessons covering Linear/Logistic Regression, SVM, Naive Bayes, KNN, Decision Trees, K-Means, DBSCAN, GMM, Boosting, and more.",
  introduction: `# Welcome to Machine Learning Fundamentals 🤖

## The Machine Learning Revolution

Machine Learning has transformed entire industries:

- **Recommendation Systems** — Netflix, Spotify, Amazon
- **Computer Vision** — Facial recognition, medical imaging
- **Natural Language Processing** — ChatGPT, translation, sentiment analysis
- **Autonomous Vehicles** — Self-driving cars
- **Fraud Detection** — Credit card fraud, cybersecurity
- **Predictive Analytics** — Stock prices, weather, disease diagnosis

And **you're about to master the algorithms powering these systems**.

## What is Machine Learning?

Machine Learning is teaching computers to **learn from data** instead of programming explicit rules.

\`\`\`
Traditional Programming:  Data + Rules → Output
Machine Learning:         Data + Output → Rules (learned automatically!)
\`\`\`

**Example:**
- **Traditional:** Write code to detect spam (if email contains "FREE", mark as spam...)
- **ML:** Show algorithm 10,000 emails labeled spam/not-spam. It learns patterns automatically.

## Three Types of Learning

### 1. **Supervised Learning** (Labeled Data)
Learn from examples with answers:
- **Regression** — Predict numbers (house price: $500k)
- **Classification** — Predict categories (email: Spam/Not Spam)

Lessons 2-14: Linear Regression, Logistic Regression, SVM, Decision Trees, Ensemble Methods

### 2. **Unsupervised Learning** (Unlabeled Data)
Find hidden patterns without answers:
- **Clustering** — Group similar items (customer segments)
- **Dimensionality Reduction** — Simplify data

Lessons 7-8, 15-16: K-Means, DBSCAN, GMM, PCA

### 3. **Reinforcement Learning**
Learn through trial and error (covered in Advanced ML)

## The ML Workflow (You'll Master This)

\`\`\`
1. Load & Explore     → Understand your data
2. Clean & Prepare    → Handle missing values, normalize
3. Split Data         → Train/test split (80/20 or cross-validation)
4. Choose Model       → Pick algorithm for your problem
5. Train              → Fit model on training data
6. Evaluate           → Test on new data (accuracy, precision, recall, etc.)
7. Tune               → Optimize hyperparameters
8. Predict            → Deploy on new, unseen data
\`\`\`

## Prerequisites

✅ Complete **Modules 1-3** first:
- Python fundamentals
- NumPy (arrays and math)
- Pandas (loading and cleaning data)

## What You'll Learn

### Supervised Learning (Regression & Classification)
1. **Linear Regression** — Predict continuous values
2. **Logistic Regression** — Binary classification
3. **Decision Trees** — Interpretable, tree-based decisions
4. **K-Nearest Neighbors** — Instance-based learning
5. **Naive Bayes** — Probabilistic classification
6. **Support Vector Machines** — Find optimal decision boundaries
7. **Random Forest** — Ensemble of decision trees
8. **Gradient Boosting** — Sequential weak learners

### Unsupervised Learning (Clustering)
9. **K-Means** — Partition-based clustering
10. **DBSCAN** — Density-based, finds arbitrary shapes
11. **Gaussian Mixture Models** — Probabilistic clustering
12. **PCA** — Dimensionality reduction

### Foundational Topics
13. **Evaluation Metrics** — Accuracy, precision, recall, F1, confusion matrix
14. **Cross-Validation** — K-fold validation strategy
15. **Regularization** — Prevent overfitting with L1/L2

> 💡 **The Reality:** 80% of machine learning is data cleaning and preparation. 20% is model training. Master both!

## Real-World Success Stories

- **Netflix Prize:** Improved recommendations by 10% → Saved millions
- **Kaggle Competitions:** $100k+ prizes for better ML models
- **Healthcare:** Diagnose cancer from X-rays with 99% accuracy
- **Finance:** Predict loan defaults, detect fraud automatically

## By Module End, You Can

✅ Train and evaluate multiple ML models  
✅ Choose the right algorithm for any problem  
✅ Prevent overfitting and underfitting  
✅ Tune hyperparameters for better accuracy  
✅ Communicate results to stakeholders  
✅ Build a complete ML pipeline from scratch  

Let's unlock the power of machine learning! 🚀`, 
  icon: "🤖",
  color: "from-rose-600 to-pink-900",
  level: "Advanced",
  totalDuration: "6h 40min",
  heroImage:
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80",
  lessons: [
    {
      id: "ml-intro",
      moduleId: "ml-basics",
      lessonNumber: 1,
      title: "What is Machine Learning?",
      description: "Understand structured vs. unstructured data, and the difference between Supervised and Unsupervised learning.",
      duration: "15 min",
      difficulty: "Beginner",
      pages: [
        {
          pageNumber: 1,
          title: "Traditional Programming vs ML",
          content: `# What is Machine Learning?

## The Paradigm Shift
In **traditional programming**, you give the computer **Rules** and **Data**, and it outputs **Answers**.
In **machine learning**, you give the computer **Answers** and **Data**, and it figures out the **Rules**.

### Types of Data
- **Structured Data:** Tabular data (Excel, SQL). Rows are observations, columns are features. *e.g., Age, Salary, Clicks.*
- **Unstructured Data:** Images, Audio, Text. Doesn't fit neatly into rows/columns. *Requires Deep Learning (Neural Networks).*

### The Two Main Categories
1. **Supervised Learning:** You have labeled data. (e.g., A list of houses with their prices). The model learns to map Features (X) to Labels (y).
2. **Unsupervised Learning:** You have unlabeled data. (e.g., Customer purchase history). The model tries to find hidden patterns or group them.

> **Note:** QuraLabz focuses on Structured Data and Supervised/Unsupervised algorithms using math and NumPy.
`,
          starterCode: `import numpy as np

# 1. Structured Data Representation (A Feature Matrix)
# Rows = Samples, Columns = Features
X = np.array([
    [1.2, 3.5],  # Sample 1: [Feature 1, Feature 2]
    [2.4, 5.1],  # Sample 2
    [3.1, 4.8],  # Sample 3
    [4.0, 6.5]   # Sample 4
])

# 2. Labels (Supervised Learning Target)
# 0 = Class A, 1 = Class B
y = np.array([0, 0, 1, 1])

print("=== Feature Matrix (X) ===")
print(f"Shape: {X.shape} (4 samples, 2 features)")
print(X)

print("\\n=== Target Vector (y) ===")
print(f"Shape: {y.shape} (1 label per sample)")
print(y)

# Unstructured data would be a flattened image array:
# image = np.random.rand(255, 255, 3) # 255x255 pixels, 3 colors (RGB)
# print(f"Image Shape: {image.shape}")
`,
        },
        {
          pageNumber: 2,
          title: "The Machine Learning Pipeline",
          content: `## The ML Pipeline

Building an ML model isn't just calling a function. It's a strict pipeline:

1. **Get Data:** Collect your structured data.
2. **Preprocess:** Handle missing values, scale features, encode text.
3. **Split Data:** Crucial step! Separate data into **Training** and **Testing** sets.
4. **Train Model:** Feed training data to the algorithm.
5. **Evaluate:** Test the model on data it has *never seen before* (Testing set).

### Why Split Data?
If you test a model on the exact same data it learned from, it's like giving a student a test with the exact same questions they studied. They might just memorize it, but they didn't *learn*.

\`\`\`python
# Standard 80/20 Split
train_size = int(len(X) * 0.8)
X_train, X_test = X[:train_size], X[train_size:]
y_train, y_test = y[:train_size], y[train_size:]
\`\`\`
`,
          starterCode: `import numpy as np

# Simulating a dataset of 100 students
np.random.seed(42)
study_hours = np.random.uniform(1, 10, 100)
scores = (study_hours * 8) + np.random.normal(0, 5, 100) # Added some noise

X = study_hours.reshape(-1, 1) # Make it a 2D column vector
y = scores

print(f"Total Dataset Size: {X.shape[0]} samples")

# Manual Train/Test Split (80% Train, 20% Test)
split_index = int(0.8 * len(X))

# IMPORTANT: Shuffle data first to avoid bias!
indices = np.arange(len(X))
np.random.shuffle(indices)

X_shuffled = X[indices]
y_shuffled = y[indices]

X_train = X_shuffled[:split_index]
X_test = X_shuffled[split_index:]
y_train = y_shuffled[:split_index]
y_test = y_shuffled[split_index:]

print(f"X_train shape: {X_train.shape} (Used to learn)")
print(f"X_test shape:  {X_test.shape} (Used to evaluate)")
print(f"\\nFirst 3 Train Scores: {y_train[:3].round(1)}")
print(f"First 3 Test Scores:  {y_test[:3].round(1)}")
`,
        },
      ],
    },
    {
      id: "ml-linear-reg",
      moduleId: "ml-basics",
      lessonNumber: 2,
      title: "Linear Regression from Scratch",
      description: "Build your first predictive model using pure math, NumPy, and Gradient Descent.",
      duration: "30 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "The Hypothesis & Cost Function",
          content: `# Linear Regression from Scratch

## The Equation
We assume a linear relationship between features (X) and target (y):
\`y = (weight * X) + bias\`

### The Cost Function (MSE)
How do we know if our line is good? We measure the error using **Mean Squared Error (MSE)**:
\`\`\`python
MSE = (1/n) * Σ(actual - predicted)²
\`\`\`
Our goal is to find the \`weight\` and \`bias\` that make this error as close to 0 as possible.

### Gradient Descent
To minimize the error, we take small steps down the "error curve":
1. Calculate the gradient (slope of error).
2. Update weights: \`weight = weight - (learning_rate * gradient)\`.
3. Repeat until convergence.

Run the code to see Gradient Descent in action!
`,
          starterCode: `import numpy as np

# 1. Generate Dummy Data (Study Hours vs Exam Score)
X = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9], dtype=float)
y = np.array([45, 55, 60, 70, 75, 82, 88, 92, 99], dtype=float)

# 2. Initialize Weights
weight = np.random.randn()
bias = np.random.randn()
learning_rate = 0.01
epochs = 100

print(f"Starting Weight: {weight:.3f}, Bias: {bias:.3f}")

# 3. Gradient Descent Loop
for epoch in range(epochs):
    # Forward pass (Predict)
    y_pred = (weight * X) + bias
    
    # Calculate Error (MSE)
    mse = np.mean((y - y_pred)**2)
    
    # Calculate Gradients
    dw = (-2/len(X)) * np.sum(X * (y - y_pred))
    db = (-2/len(X)) * np.sum(y - y_pred)
    
    # Update Weights
    weight -= learning_rate * dw
    bias -= learning_rate * db
    
    if (epoch + 1) % 20 == 0:
        print(f"Epoch {epoch+1:3d} | MSE: {mse:.2f} | W: {weight:.3f} | B: {bias:.3f}")

print(f"\\nFinal Equation: Score = {weight:.2f} * Hours + {bias:.2f}")
print(f"Prediction for 5.5 hours: {weight * 5.5 + bias:.2f}")
`,
        },
        {
          pageNumber: 2,
          title: "Visualizing the Training Process",
          content: `## Visualizing the Training Loop

Seeing the math is good, but **seeing the line move** is how you truly understand Gradient Descent. 

Notice how the line starts completely wrong, but gradually pivots to fit the data perfectly as the MSE decreases.

### Overfitting vs Underfitting
- **Underfitting:** The line is too straight (high bias).
- **Overfitting:** The line wiggles to hit every single point perfectly (high variance) — bad for new data.
- **Good Fit:** Captures the general trend.
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64

X = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9], dtype=float)
y = np.array([45, 55, 60, 70, 75, 82, 88, 92, 99], dtype=float)

weight = np.random.randn()
bias = np.random.randn()

lines_to_plot = {"Epoch 0": None, "Epoch 30": None, "Epoch 100": None}
epochs = 100
for epoch in range(epochs):
    y_pred = weight * X + bias
    dw = (-2/len(X)) * np.sum(X * (y - y_pred))
    db = (-2/len(X)) * np.sum(y - y_pred)
    weight -= 0.01 * dw
    bias -= 0.01 * db
    
    if epoch in [0, 29, 99]:
        key = list(lines_to_plot.keys())[list(lines_to_plot.values()).index(None)]
        lines_to_plot[key] = (weight.copy(), bias.copy())

fig, ax = plt.subplots(figsize=(8, 5))
fig.patch.set_facecolor('#0d0d14')
ax.set_facecolor('#0d0d14')
ax.scatter(X, y, color='#f43f5e', s=100, zorder=5, label='Actual Data')

colors = ['#94a3b8', '#f59e0b', '#10b981']
for (label, params), color in zip(lines_to_plot.items(), colors):
    if params:
        w, b = params
        ax.plot(X, w*X + b, color=color, linewidth=2, linestyle='--' if color!='#10b981' else '-', label=label)

ax.set_title('Gradient Descent Optimization', color='white', fontsize=14)
ax.set_xlabel('Study Hours', color='#94a3b8')
ax.set_ylabel('Exam Score', color='#94a3b8')
ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')
ax.legend(facecolor='#1a1a26', edgecolor='#334155', labelcolor='white')
plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()
`,
        },
      ],
    },
    {
      id: "ml-loss-viz",
      moduleId: "ml-basics",
      lessonNumber: 3,
      title: "Visualizing the Loss Landscape",
      description: "Understand how Gradient Descent navigates the error curve to find the minimum.",
      duration: "20 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "The 3D Error Surface",
          content: `# Visualizing the Loss Landscape

## What is Gradient Descent Actually Doing?
Imagine you are blindfolded on a hilly landscape. Your goal is to reach the lowest point in the valley (minimum error). 
1. You feel the slope under your feet (calculate gradient).
2. You take a step down the steepest slope (update weights).
3. Repeat until the slope is flat (convergence).

### Learning Rate Impact
- **Too Small:** Takes thousands of tiny steps (slow training).
- **Too Large:** Steps right over the valley, overshooting and diverging (exploding gradients).
- **Just Right:** Smoothly slides to the bottom.
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64

weights_range = np.linspace(-5, 15, 100)
true_weight = 5
losses = (weights_range - true_weight)**2

w = -4.0 
learning_rate = 0.15
history_w = [w]
history_l = [(w - true_weight)**2]

for _ in range(15):
    gradient = 2 * (w - true_weight) 
    w = w - learning_rate * gradient
    history_w.append(w)
    history_l.append((w - true_weight)**2)

fig, ax = plt.subplots(figsize=(9, 5))
fig.patch.set_facecolor('#0d0d14')
ax.set_facecolor('#0d0d14')

ax.plot(weights_range, losses, color='#334155', linewidth=2, label='Loss Curve (MSE)')
ax.plot(history_w, history_l, color='#f43f5e', marker='o', markersize=6, linestyle='-', linewidth=2, label='Gradient Descent Steps')

ax.set_title('Gradient Descent Finding the Minimum', color='white', fontsize=14)
ax.set_xlabel('Weight Value', color='#94a3b8')
ax.set_ylabel('Mean Squared Error (Loss)', color='#94a3b8')
ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')
ax.legend(facecolor='#1a1a26', edgecolor='#334155', labelcolor='white')
plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()
`,
        },
      ],
    },
    {
      id: "ml-logistic",
      moduleId: "ml-basics",
      lessonNumber: 4,
      title: "Logistic Regression (Classification)",
      description: "Predict categories (yes/no, spam/not spam) using the Sigmoid function.",
      duration: "30 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "From Linear to Logistic",
          content: `# Logistic Regression (Classification)

## The Problem with Linear Regression for Categories
Linear regression outputs continuous numbers. But what if we want to predict if an email is Spam (1) or Not Spam (0)? We need an output between 0 and 1 representing a **probability**.

### The Sigmoid Function
We pass the linear equation through a "squishing" function:
\`\`\`python
σ(z) = 1 / (1 + e^(-z))
\`\`\`
- If \`z\` is very large → \`σ(z)\` approaches 1.
- If \`z\` is very small → \`σ(z)\` approaches 0.

### Decision Boundary
- Probability >= 0.5 → Class 1
- Probability < 0.5 → Class 0
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64

def sigmoid(z): return 1 / (1 + np.exp(-z))

z = np.linspace(-8, 8, 100)
probabilities = sigmoid(z)

fig, ax = plt.subplots(figsize=(8, 5))
fig.patch.set_facecolor('#0d0d14')
ax.set_facecolor('#0d0d14')

ax.plot(z, probabilities, color='#8b5cf6', linewidth=3)
ax.axhline(0.5, color='#94a3b8', linestyle='--', alpha=0.5, label='Threshold (0.5)')
ax.fill_between(z, probabilities, 0.5, where=(probabilities >= 0.5), interpolate=True, color='#10b981', alpha=0.1, label='Predict Class 1')
ax.fill_between(z, probabilities, 0.5, where=(probabilities < 0.5), interpolate=True, color='#f43f5e', alpha=0.1, label='Predict Class 0')

ax.set_title('The Sigmoid Function', color='white', fontsize=14)
ax.set_xlabel('Linear Output (z)', color='#94a3b8')
ax.set_ylabel('Probability', color='#94a3b8')
ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')
ax.legend(facecolor='#1a1a26', edgecolor='#334155', labelcolor='white')
plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()
`,
        },
        {
          pageNumber: 2,
          title: "Building a Classifier from Scratch",
          content: `## Implementing Gradient Descent for Classification

The math is similar to Linear Regression, but we use the **Sigmoid gradient**.

### Steps:
1. Calculate linear output: \`z = weight * X + bias\`
2. Apply Sigmoid: \`predictions = sigmoid(z)\`
3. Calculate Error: \`error = predictions - y\`
4. Calculate Gradients & Update weights.
`,
          starterCode: `import numpy as np

X = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9], dtype=float)
y = np.array([0, 0, 0, 0, 0, 1, 1, 1, 1], dtype=float)

weight = np.random.randn()
bias = np.random.randn()

def sigmoid(z): return 1 / (1 + np.exp(-np.clip(z, -250, 250)))

epochs = 1000
learning_rate = 0.5

for epoch in range(epochs):
    z = (weight * X) + bias
    pred = sigmoid(z)
    error = pred - y
    dw = (1/len(X)) * np.dot(X.T, error)
    db = (1/len(X)) * np.sum(error)
    weight -= learning_rate * dw
    bias -= learning_rate * db

final_preds = sigmoid((weight * X) + bias)
final_classes = (final_preds >= 0.5).astype(int)

print("=== Training Complete ===")
print(f"Learned Weight: {weight:.2f}, Bias: {bias:.2f}")
print("\\n=== Predictions ===")
for hrs, prob, cls in zip(X, final_preds, final_classes):
    print(f"Hours: {hrs} | Prob: {prob:.3f} | Pred: {'Pass' if cls==1 else 'Fail'} | Actual: {'Pass' if y[int(hrs)-1]==1 else 'Fail'}")

print(f"\\nModel Accuracy: {np.mean(final_classes == y) * 100:.0f}%")
`,
        },
      ],
    },
    {
      id: "ml-knn",
      moduleId: "ml-basics",
      lessonNumber: 5,
      title: "K-Nearest Neighbors (Distance)",
      description: "Learn the intuition behind instance-based learning using Euclidean distance.",
      duration: "25 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "The Intuition of KNN",
          content: `# K-Nearest Neighbors (KNN)

## "Tell me who your friends are..."
Unlike Regression which learns mathematical weights, **KNN has no training phase**. It simply memorizes all the data.

### How it works:
1. Plot all training data points.
2. When a new point arrives, calculate its distance to *every* other point.
3. Find the 'K' closest points (neighbors).
4. Take a vote: If 3 out of 5 neighbors are Class A, the new point is Class A.

### Euclidean Distance
\`\`\`python
dist = sqrt((x2 - x1)^2 + (y2 - y1)^2)
\`\`\`
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64

X_train = np.array([[2, 5], [3, 6], [4, 5], [3, 4], [7, 8], [8, 7], [9, 8], [7, 6]])
y_train = np.array([0, 0, 0, 0, 1, 1, 1, 1])
new_point = np.array([5, 7])

distances = np.sqrt(np.sum((X_train - new_point)**2, axis=1))
k = 3
nearest_indices = distances.argsort()[:k]
nearest_labels = y_train[nearest_indices]
nearest_points = X_train[nearest_indices]
prediction = nearest_labels.mean() >= 0.5

fig, ax = plt.subplots(figsize=(7, 7))
fig.patch.set_facecolor('#0d0d14')
ax.set_facecolor('#0d0d14')

ax.scatter(X_train[:4, 0], X_train[:4, 1], color='#f43f5e', s=150, label='Fail')
ax.scatter(X_train[4:, 0], X_train[4:, 1], color='#10b981', s=150, label='Pass')
ax.scatter(new_point[0], new_point[1], color='#f59e0b', s=300, marker='*', label='Mystery', zorder=6)

for p in nearest_points:
    ax.plot([new_point[0], p[0]], [new_point[1], p[1]], color='white', linestyle='--', alpha=0.5)

ax.set_title(f'KNN (K=3) Prediction: {"Pass" if prediction else "Fail"}', color='white', fontsize=14)
ax.set_xlabel('Feature 1', color='#94a3b8'); ax.set_ylabel('Feature 2', color='#94a3b8')
ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')
ax.legend(facecolor='#1a1a26', edgecolor='#334155', labelcolor='white')
plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()
`,
        },
      ],
    },
    {
      id: "ml-eval",
      moduleId: "ml-basics",
      lessonNumber: 6,
      title: "Evaluation Metrics (From Scratch)",
      description: "Move beyond Accuracy. Learn Precision, Recall, and F1-Score using pure NumPy logic.",
      duration: "20 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Why Accuracy is a Trap",
          content: `# Evaluation Metrics

## The Imbalanced Data Problem
Imagine a dataset of 100 patients, where 99 are healthy (0) and 1 has cancer (1). 
If a lazy model predicts "0" every single time, it is **99% accurate**! But it completely failed its medical purpose.

### The Confusion Matrix
To truly evaluate a model, we look at 4 outcomes:
- **True Positives (TP):** Model predicted 1, actual is 1.
- **True Negatives (TN):** Model predicted 0, actual is 0.
- **False Positives (FP):** Model predicted 1, actual is 0. (Type I error)
- **False Negatives (FN):** Model predicted 0, actual is 1. (Type II error - *Dangerous in medical/spam filtering*)

### Metrics
- **Precision:** Out of all 1s we predicted, how many were actually 1? (\`TP / (TP + FP)\`)
- **Recall:** Out of all actual 1s, how many did we find? (\`TP / (TP + FN)\`)
`,
          starterCode: `import numpy as np

# Simulated predictions for an imbalanced dataset (e.g., Fraud Detection)
y_true = np.array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1])
y_pred = np.array([0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1]) # Model missed one fraud case

# 1. Calculate Confusion Matrix elements manually
tp = np.sum((y_pred == 1) & (y_true == 1))
tn = np.sum((y_pred == 0) & (y_true == 0))
fp = np.sum((y_pred == 1) & (y_true == 0))
fn = np.sum((y_pred == 0) & (y_true == 1))

print("=== Confusion Matrix ===")
print(f"True Positives (TP): {tp}")
print(f"True Negatives (TN): {tn}")
print(f"False Positives (FP): {fp} (False Alarm)")
print(f"False Negatives (FN): {fn} (Missed Fraud!)")

# 2. Calculate Metrics
accuracy = (tp + tn) / (tp + tn + fp + fn)
precision = tp / (tp + fp) if (tp + fp) > 0 else 0
recall = tp / (tp + fn) if (tp + fn) > 0 else 0
f1_score = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0

print(f"\\n=== Metrics ===")
print(f"Accuracy:  {accuracy:.2f} (Can be misleading)")
print(f"Precision: {precision:.2f} (When we predict fraud, how often are we right?)")
print(f"Recall:    {recall:.2f} (Did we catch all the actual frauds?)")
print(f"F1 Score:  {f1_score:.2f} (Harmonic mean of Precision & Recall)")
`,
        },
      ],
    },
    {
      id: "ml-kmeans",
      moduleId: "ml-basics",
      lessonNumber: 7,
      title: "Unsupervised Learning & K-Means",
      description: "Group similar data points automatically using K-Means clustering, built from scratch.",
      duration: "25 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Clustering Intuition",
          content: `# Unsupervised Learning & K-Means

## No Labels? No Problem.
In Supervised learning, we have targets (y). In **Unsupervised learning**, we only have features (X). The algorithm must find hidden structure on its own.

### What is K-Means?
K-Means groups data into 'K' distinct clusters based on feature similarity.
1. Randomly place 'K' centroids.
2. Assign every data point to its nearest centroid.
3. Move the centroids to the exact center (mean) of their assigned points.
4. Repeat steps 2 & 3 until the centroids stop moving.

### Choosing K
How do you know how many clusters exist? 
- **Domain Knowledge:** (e.g., "I want to segment customers into 3 tiers").
- **The Elbow Method:** Plot the total distance from points to their centroids. When the line looks like an "elbow", that's usually the right K.
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64

# 1. Generate Fake Cluster Data
np.random.seed(42)
cluster_1 = np.random.randn(50, 2) + np.array([-5, -5])
cluster_2 = np.random.randn(50, 2) + np.array([5, 5])
cluster_3 = np.random.randn(50, 2) + np.array([-5, 5])
X = np.vstack((cluster_1, cluster_2, cluster_3))

# 2. Initialize K-Means
K = 3
centroids = X[np.random.choice(X.shape[0], K, replace=False)]

for _ in range(50): # 50 iterations
    # Assign points to nearest centroid
    distances = np.linalg.norm(X[:, np.newaxis] - centroids, axis=2)
    labels = np.argmin(distances, axis=1)
    
    # Update centroids to mean of assigned points
    new_centroids = np.array([X[labels == k].mean(axis=0) for k in range(K)])
    if np.all(centroids == new_centroids): break
    centroids = new_centroids

# 3. Plotting
fig, ax = plt.subplots(figsize=(8, 6))
fig.patch.set_facecolor('#0d0d14')
ax.set_facecolor('#0d0d14')

colors = ['#8b5cf6', '#06b6d4', '#f43f5e']
for k in range(K):
    ax.scatter(X[labels == k, 0], X[labels == k, 1], c=colors[k], s=30, alpha=0.6, label=f'Cluster {k}')
    ax.scatter(centroids[k, 0], centroids[k, 1], c=colors[k], s=200, marker='X', edgecolors='white', linewidths=1.5)

ax.set_title('K-Means Clustering (K=3)', color='white', fontsize=14)
ax.legend(facecolor='#1a1a26', edgecolor='#334155', labelcolor='white')
ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')
plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()
`,
        },
      ],
    },
    {
      id: "ml-pca",
      moduleId: "ml-basics",
      lessonNumber: 8,
      title: "Dimensionality Reduction with PCA",
      description: "Simplify complex datasets by finding the most important angles (Principal Components) using pure linear algebra.",
      duration: "25 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "The Curse of Dimensionality",
          content: `# Dimensionality Reduction with PCA

## Why Reduce Dimensions?
If you have 100 features, visualizing them is impossible. Worse, models train slower and can overfit on irrelevant features. 

**Principal Component Analysis (PCA)** finds new axes for your data that capture the **maximum amount of variance (spread)**.
- PC1: The axis where data is most spread out.
- PC2: The axis perpendicular to PC1 with the next most spread.

### The Math (It's just Linear Algebra!)
1. Center the data (subtract the mean of every column).
2. Calculate the Covariance Matrix.
3. Calculate the Eigenvectors and Eigenvalues of that matrix.
4. The Eigenvectors are your new axes (Principal Components).

> **Note:** PCA does NOT delete columns. It rotates the coordinate system so the first few columns contain 90% of the information.
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64

np.random.seed(42)
# Create highly correlated data (e.g., Height vs Weight)
X_raw = np.random.randn(100, 2)
# Stretch and rotate the data to make it correlated
transform_matrix = np.array([[3, 2], [2, 3]])
X = X_raw @ transform_matrix

# 1. Center the data
X_centered = X - np.mean(X, axis=0)

# 2. Covariance Matrix
cov_matrix = np.cov(X_centered.T)

# 3. Eigendecomposition
eigenvalues, eigenvectors = np.linalg.eig(cov_matrix)

# Sort by largest eigenvalue
sorted_indices = np.argsort(eigenvalues)[::-1]
eigenvectors = eigenvectors[:, sorted_indices]

# Project data onto PC1
X_pca = X_centered @ eigenvectors

# Plotting
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))
for ax in (ax1, ax2): 
    ax.set_facecolor('#0d0d14')
fig.patch.set_facecolor('#0d0d14')

# Original Data
ax1.scatter(X[:, 0], X[:, 1], color='#8b5cf6', alpha=0.5)
# Draw Eigenvectors (Scaled up for visibility)
for i, vec in enumerate(eigenvectors.T):
    ax1.quiver(0, 0, vec[0]*3, vec[1]*3, color=['#f43f5e', '#06b6d4'][i], scale=1, scale_units='xy', angles='xy', width=0.02)
ax1.set_title('Original Correlated Data', color='white', fontsize=13)
ax1.set_aspect('equal')

# PCA Transformed Data
ax2.scatter(X_pca[:, 0], X_pca[:, 1], color='#06b6d4', alpha=0.5)
ax2.set_title('After PCA Transform', color='white', fontsize=13)
ax2.set_xlabel(f'PC1 ({eigenvalues[sorted_indices[0]]:.1f}% variance)', color='#94a3b8')
ax2.set_ylabel(f'PC2 ({eigenvalues[sorted_indices[1]]:.1f}% variance)', color='#94a3b8')

for ax in (ax1, ax2):
    ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')
plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()
`,
        },
      ],
    },
    {
      id: "ml-trees",
      moduleId: "ml-basics",
      lessonNumber: 9,
      title: "Decision Trees & Splits",
      description: "Understand how trees partition data using Gini Impurity and Information Gain.",
      duration: "25 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "How does a Tree decide a split?",
          content: `# Decision Trees

## The Intuition
A decision tree is a flowchart. It asks a series of True/False questions about features to isolate classes. 
- *Is Age > 30?* -> If Yes, go Left. If No, go Right.

### How does it pick the best question?
It uses **Gini Impurity**. Gini measures how "mixed" a group is.
- Gini = 0: Perfectly pure (All apples).
- Gini = 0.5: Maxially impure (50% apples, 50% oranges).

The algorithm tests every possible threshold for every feature, and picks the split that results in the **lowest Gini Impurity** (highest purity).

### Information Gain
\`Gain = Gini(Parent) - (Weighted Average Gini of Children)\`
`,
          starterCode: `import numpy as np

# Dummy Data: [Weight in grams] -> Label (0=Apple, 1=Grape)
X = np.array([[150], [160], [170], [10], [12], [8], [165], [11]])
y = np.array([0, 0, 0, 1, 1, 1, 0, 1])

def gini(y):
    """Calculate Gini Impurity of an array of labels."""
    if len(y) == 0: return 0
    p1 = np.mean(y)
    p0 = 1 - p1
    return 1 - (p0**2 + p1**2)

print(f"Overall Gini Impurity: {gini(y):.3f}")

# Try splitting at Weight <= 50
left_mask = X.flatten() <= 50
right_mask = ~left_mask

y_left = y[left_mask]
y_right = y[right_mask]

gini_left = gini(y_left)
gini_right = gini(y_right)

# Calculate Information Gain
n = len(y)
weighted_gini = (len(y_left)/n * gini_left) + (len(y_right)/n * gini_right)
gain = gini(y) - weighted_gini

print(f"\\nSplit: Weight <= 50")
print(f"Left Branch (<=50): {len(y_left)} samples, Gini={gini_left:.3f} (Pure Grapes!)")
print(f"Right Branch (>50): {len(y_right)} samples, Gini={gini_right:.3f}")
print(f"Information Gain: {gain:.3f} (Excellent split!)")
`,
        },
      ],
    },
    {
      id: "ml-regularization",
      moduleId: "ml-basics",
      lessonNumber: 10,
      title: "Regularization (L1 & L2)",
      description: "Stop models from overfitting by penalizing large weights using Lasso and Ridge techniques.",
      duration: "20 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "The Overfitting Cure",
          content: `# Regularization

## The Problem
If you have 10 features, a model might give massive weights to useless features just because it perfectly fits the training noise. This fails on test data.

## The Solution: Penalize Complexity
We add the size of the weights to the Loss Function. The model now has to balance "fit the data well" with "keep weights small".

### L2 Regularization (Ridge)
Adds the *squared* weights to the loss: \`Loss = MSE + λ * Σ(weight²)\`
- Result: Weights shrink smoothly towards zero, but rarely hit exactly zero.

### L1 Regularization (Lasso)
Adds the *absolute* weights to the loss: \`Loss = MSE + λ * Σ(|weight|)\`
- Result: Weights hit exactly zero! Lasso acts as **automatic feature selection**.

### Implementing in Gradient Descent
Instead of: \`weight -= lr * gradient\`
- **Ridge:** \`weight -= lr * (gradient + (2 * lambda * weight))\`
- **Lasso:** \`weight -= lr * (gradient + (lambda * sign(weight)))\`
`,
          starterCode: `import numpy as np

# 5 Features, but only Feature 0 actually matters
X = np.random.randn(100, 5) 
y = 3 * X[:, 0] + np.random.randn(100) * 0.1 # True relationship is only in col 0

def train_linear(X, y, penalty_type=None, lambda_val=1.0):
    weights = np.random.randn(5)
    lr = 0.01
    for _ in range(200):
        pred = X @ weights
        error = pred - y
        gradient = (2/len(y)) * (X.T @ error)
        
        if penalty_type == 'l2':
            gradient += (2 * lambda_val * weights)
        elif penalty_type == 'l1':
            gradient += (lambda_val * np.sign(weights))
            
        weights -= lr * gradient
    return weights

w_none = train_linear(X, y)
w_l2 = train_linear(X, y, 'l2', 10.0)
w_l1 = train_linear(X, y, 'l1', 0.5)

print("Feature Weights Comparison:")
print(f"{'Feature':<10} | {'No Reg':<10} | {'Ridge(L2)':<10} | {'Lasso(L1)':<10}")
print("-" * 45)
for i in range(5):
    print(f"Feature {i} | {w_none[i]:>8.3f}  | {w_l2[i]:>8.3f}   | {w_l1[i]:>8.3f}")
    
print("\\nNotice how Lasso (L1) forced useless features to exactly 0.000!")
`,
        },
      ],
    },
    {
      id: "ml-crossval",
      moduleId: "ml-basics",
      lessonNumber: 11,
      title: "K-Fold Cross Validation",
      description: "Build a robust K-Fold splitter to prove your model's true performance without relying on a single lucky train/test split.",
      duration: "22 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Don't Trust a Single Split",
          content: `# K-Fold Cross Validation

## The Flaw of Train/Test Split
What if your single random split accidentally put all the easy examples in the test set? Your accuracy would be artificially high. 

### K-Fold to the Rescue
Instead of one split, we chop the data into **K equal pieces (folds)** (usually K=5 or K=10).
- Iteration 1: Train on Folds 2-5, Test on Fold 1.
- Iteration 2: Train on Folds 1,3,4,5, Test on Fold 2.
- ...Repeat for all K folds.
- **Final Score:** Average the scores from all K tests.

### Why this is the Gold Standard
It ensures every single data point gets to be in a test set exactly once, giving you a highly reliable estimate of how your model behaves in the real world.
`,
          starterCode: `import numpy as np

# Generate simple data
np.random.seed(42)
X = np.random.rand(100, 1)
y = 2.5 * X.flatten() + 1 + np.random.randn(100) * 0.2

def simple_train_test_mse(X_train, y_train, X_test, y_test):
    # Normal Equation for exact linear regression solution: w = (X^T X)^-1 X^T y
    X_b = np.c_[np.ones((len(X_train), 1)), X_train]
    w = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y_train
    
    X_test_b = np.c_[np.ones((len(X_test), 1)), X_test]
    preds = X_test_b @ w
    return np.mean((y_test - preds)**2)

# 1. Standard single split
split = 80
mse_single = simple_train_test_mse(X[:split], y[:split], X[split:], y[split:])
print(f"Standard Split MSE: {mse_single:.4f}")

# 2. K-Fold Cross Validation (K=5)
K = 5
fold_size = len(X) // K
mse_scores = []

for i in range(K):
    start = i * fold_size
    end = start + fold_size
    
    X_test_fold = X[start:end]
    y_test_fold = y[start:end]
    
    X_train_fold = np.concatenate([X[:start], X[end:]])
    y_train_fold = np.concatenate([y[:start], y[end:]])
    
    mse = simple_train_test_mse(X_train_fold, y_train_fold, X_test_fold, y_test_fold)
    mse_scores.append(mse)
    print(f"Fold {i+1} MSE: {mse:.4f}")

print(f"\\nK-Fold Average MSE: {np.mean(mse_scores):.4f} (±{np.std(mse_scores):.4f})")
print("This average is a much more trustworthy metric!")
`,
        },
      ],
    },
    {
      id: "ml-naive-bayes",
      moduleId: "ml-basics",
      lessonNumber: 12,
      title: "Naive Bayes — Probabilistic Classifier",
      description: "Use Bayes' theorem to build a fast, efficient probabilistic classifier. Great for text and spam detection.",
      duration: "22 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Bayes' Theorem & Independence Assumption",
          content: `# Naive Bayes Classification

## Bayes' Theorem
\`\`\`
P(Class | Features) = P(Features | Class) * P(Class) / P(Features)
\`\`\`

**English:** Probability of class given features = likelihood × prior / evidence

### Components:
- **Prior P(Class):** How common is this class? (Before seeing features)
- **Likelihood P(Features | Class):** If this class is true, how likely are these features?
- **Evidence P(Features):** How likely is this feature combination overall?

### Example: Email Spam Detection
Email has word "FREE" → Is it spam?
- **Prior:** 20% of emails are spam
- **Likelihood:** 50% of spam emails contain "FREE"
- **Likelihood (normal):** 5% of normal emails contain "FREE"
- **Result:** With "FREE", probability of spam increases significantly

## The "Naive" Assumption
Naive Bayes assumes **all features are independent** given the class.
\`\`\`
P(word1, word2, word3 | spam) = P(word1|spam) × P(word2|spam) × P(word3|spam)
\`\`\`

This is often wrong (words are correlated), but it works well in practice!

**Why?**
- Simplification makes computation fast
- Despite false assumption, predictions are often accurate
- Great for high-dimensional data (text)

## Advantages & Disadvantages

**Pros:**
- ✓ Fast to train (just counting)
- ✓ Fast to predict
- ✓ Works well with high-dimensional data (text, images)
- ✓ Requires little training data
- ✓ Interpretable (see which features matter)

**Cons:**
- ✗ Independence assumption often violated
- ✗ Poor probability estimates (miscalibrated)
- ✗ Can struggle with rare features
`,
          starterCode: `import numpy as np
from sklearn.naive_bayes import GaussianNB, MultinomialNB
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# Create data
X, y = make_classification(n_samples=200, n_features=10, 
                          n_informative=8, n_classes=2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42)

# Naive Bayes for continuous features
gnb = GaussianNB()
gnb.fit(X_train, y_train)
pred = gnb.predict(X_test)
proba = gnb.predict_proba(X_test)

print("=== Gaussian Naive Bayes ===")
print(f"Accuracy: {accuracy_score(y_test, pred):.3f}")
print(f"\\nSample prediction:")
print(f"  Features: {X_test[0]}")
print(f"  Probability [Class 0, Class 1]: {proba[0]}")
print(f"  Predicted Class: {pred[0]}")

print(f"\\n=== Class Priors (from training data) ===")
print(f"  P(Class 0) = {gnb.class_prior_[0]:.3f}")
print(f"  P(Class 1) = {gnb.class_prior_[1]:.3f}")

print(f"\\n=== Feature Statistics per Class ===")
for i in range(min(3, X_train.shape[1])):
    print(f"Feature {i}:")
    print(f"  Mean (Class 0): {gnb.theta_[0, i]:.2f}")
    print(f"  Mean (Class 1): {gnb.theta_[1, i]:.2f}")
`,
        },
      ],
    },
    {
      id: "ml-svm",
      moduleId: "ml-basics",
      lessonNumber: 13,
      title: "Support Vector Machines (SVM)",
      description: "Find the optimal hyperplane that maximizes the margin between classes. Powerful for complex boundaries.",
      duration: "30 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "The Maximum Margin Principle",
          content: `# Support Vector Machines (SVM)

## The Core Idea
SVM finds the **best line (or hyperplane) that separates two classes** with the **maximum margin** (distance to nearest points).

### Intuition
\`\`\`
Class A:  ●●●  ___________  ○○○  : Class B

The line position matters!
Too close to A? Will misclassify new A points.
Too close to B? Will misclassify new B points.
SVM finds the perfect balance (maximum margin).
\`\`\`

## Linear vs Non-Linear

### Linear SVM
For linearly separable data:
\`\`\`
2x + 3y + 1 = 0  (decision boundary)
\`\`\`

Find weights (w) and bias (b) such that margin is maximized.

### Non-Linear SVM (Kernel Trick)
For non-linear data (spirals, circles), use **kernels** to transform to higher dimensions:

\`\`\`
Original 2D data (not separable)
   ↓ (Kernel transformation)
Higher dimension (separable)
\`\`\`

**Common Kernels:**
- **Linear:** For linearly separable data
- **RBF (Radial Basis Function):** Most popular, handles most cases
- **Polynomial:** Useful for polynomial relationships
- **Sigmoid:** Similar to neural networks

## Support Vectors
Points closest to the decision boundary. Only these matter!
- If you move a far-away point, decision boundary doesn't change
- If you move a support vector, boundary shifts
- SVM is efficient: stores only support vectors (often small fraction of data)

## Pros & Cons

**Pros:**
- ✓ Works well on tabular data
- ✓ Non-linear kernels handle complex boundaries
- ✓ Memory efficient (only stores support vectors)
- ✓ Works well in high-dimensional spaces

**Cons:**
- ✗ Slow on large datasets (O(n²) or worse)
- ✗ Hard to interpret which features matter
- ✗ Sensitive to feature scaling (must normalize!)
- ✗ Hyperparameter tuning critical (C, gamma)
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64
from sklearn.svm import SVC
from sklearn.datasets import make_classification, make_circles
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler

# Create non-linearly separable data
X, y = make_circles(n_samples=200, noise=0.1, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Scale features (SVM sensitive to scaling!)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train Linear SVM (will fail on circles)
svm_linear = SVC(kernel='linear', C=1.0)
svm_linear.fit(X_train_scaled, y_train)
pred_linear = svm_linear.predict(X_test_scaled)
acc_linear = accuracy_score(y_test, pred_linear)

# Train RBF SVM (will succeed!)
svm_rbf = SVC(kernel='rbf', gamma=1.0, C=1.0)
svm_rbf.fit(X_train_scaled, y_train)
pred_rbf = svm_rbf.predict(X_test_scaled)
acc_rbf = accuracy_score(y_test, pred_rbf)

# Plot
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
fig.patch.set_facecolor('#0d0d14')

h = 0.02
x_min, x_max = X_scaled[:, 0].min() - 0.5, X_scaled[:, 0].max() + 0.5
y_min, y_max = X_scaled[:, 1].min() - 0.5, X_scaled[:, 1].max() + 0.5
xx, yy = np.meshgrid(np.arange(x_min, x_max, h), np.arange(y_min, y_max, h))

for idx, (svm, title, acc, ax) in enumerate([(svm_linear, 'Linear Kernel', acc_linear, axes[0]),
                                               (svm_rbf, 'RBF Kernel', acc_rbf, axes[1])]):
    ax.set_facecolor('#0d0d14')
    Z = svm.decision_function(np.c_[xx.ravel(), yy.ravel()])
    Z = Z.reshape(xx.shape)
    ax.contourf(xx, yy, Z, levels=20, cmap='RdYlGn', alpha=0.3)
    ax.scatter(X_train_scaled[y_train==0, 0], X_train_scaled[y_train==0, 1], 
              c='red', alpha=0.5, s=30, label='Class 0')
    ax.scatter(X_train_scaled[y_train==1, 0], X_train_scaled[y_train==1, 1], 
              c='green', alpha=0.5, s=30, label='Class 1')
    ax.scatter(svm.support_vectors_[:, 0], svm.support_vectors_[:, 1], 
              s=100, linewidth=1.5, facecolors='none', edgecolors='blue', label='Support Vectors')
    ax.set_title(f'{title} | Acc: {acc:.1%}', color='white', fontsize=11)
    ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')
    if idx == 0: ax.legend(labelcolor='white', fontsize=8)

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()

print(f"Linear SVM Accuracy: {acc_linear:.1%}")
print(f"RBF SVM Accuracy: {acc_rbf:.1%}")
print(f"\\nSupport Vectors (RBF): {len(svm_rbf.support_vectors_)} out of {len(X_train_scaled)} samples")
print("Notice: RBF kernel handles circles perfectly, Linear struggles!")
`,
        },
      ],
    },
    {
      id: "ml-boosting",
      moduleId: "ml-basics",
      lessonNumber: 14,
      title: "Gradient Boosting & AdaBoost",
      description: "Master boosting: iteratively improve weak learners by focusing on mistakes.",
      duration: "28 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Boosting Philosophy",
          content: `# Gradient Boosting & AdaBoost

## Boosting vs Bagging (Recap)

### Bagging (Random Forest)
- Train N trees independently (random subsets)
- Predictions averaged
- Reduces variance

### Boosting (AdaBoost, Gradient Boosting)
- Train trees **sequentially** (each corrects previous)
- Trees focused on hard-to-predict samples
- Reduces bias

## AdaBoost (Adaptive Boosting)

### How it works:
1. Train weak learner (shallow tree) on all data
2. Calculate error and **increase weight** on misclassified samples
3. Train next learner on **reweighted** data (hard samples matter more)
4. Repeat N times
5. Combine: weighted vote of all N learners

### Why it works:
Early learners catch obvious patterns.
Later learners focus on edge cases.
Final model = consensus of experts, each specializing in different patterns.

## Gradient Boosting

More general version of AdaBoost:

1. Train initial weak learner
2. Calculate **residuals** (errors)
3. Train next learner to predict residuals
4. Update predictions: pred = pred + learning_rate × residuals_pred
5. Repeat

### Key difference from AdaBoost:
- AdaBoost: Reweight samples
- Gradient Boosting: Fit residuals

Gradient Boosting > AdaBoost in most cases!

## Hyperparameters

| Param | Effect | Typical Range |
|-------|--------|---------------|
| \`n_estimators\` | Number of trees | 50-500 |
| \`learning_rate\` | Step size | 0.01-0.3 (smaller = more stable) |
| \`max_depth\` | Tree depth | 3-8 (shallow trees!) |
| \`subsample\` | Row sampling | 0.5-1.0 |
| \`colsample\` | Feature sampling | 0.5-1.0 |

## Comparison: Boosting vs Bagging

| Aspect | Bagging (RF) | Boosting (GB) |
|--------|-------------|--------------|
| Training | Parallel | Sequential |
| Speed | Fast | Slower |
| Overfitting | Lower risk | Higher risk |
| Bias | Higher | Lower |
| Variance | Lower | Similar |
| Best for | Stable baseline | High accuracy needed |

## Popular Boosting Libraries

- **scikit-learn:** \`GradientBoostingClassifier\`, \`AdaBoostClassifier\`
- **XGBoost:** Faster, handles missing data (Lesson 5, Module 6)
- **LightGBM:** Even faster, memory efficient
- **CatBoost:** Handles categorical features automatically
`,
          starterCode: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import AdaBoostClassifier, GradientBoostingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

# Create data
X, y = make_classification(n_samples=500, n_features=15, 
                          n_informative=10, n_classes=2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Single weak learner (shallow tree)
weak = DecisionTreeClassifier(max_depth=3, random_state=42)
weak.fit(X_train, y_train)
weak_pred = weak.predict(X_test)
weak_acc = accuracy_score(y_test, weak_pred)

print(f"=== Single Weak Learner (max_depth=3) ===")
print(f"Accuracy: {weak_acc:.1%}")

# AdaBoost (combine 50 weak learners)
ada = AdaBoostClassifier(
    estimator=DecisionTreeClassifier(max_depth=3),
    n_estimators=50,
    learning_rate=1.0,
    random_state=42
)
ada.fit(X_train, y_train)
ada_pred = ada.predict(X_test)
ada_acc = accuracy_score(y_test, ada_pred)

print(f"\\n=== AdaBoost (50 weak learners) ===")
print(f"Accuracy: {ada_acc:.1%}")
print(f"Improvement: +{(ada_acc - weak_acc):.1%}")

# Gradient Boosting
gb = GradientBoostingClassifier(
    n_estimators=50,
    learning_rate=0.1,
    max_depth=3,
    subsample=0.8,
    random_state=42
)
gb.fit(X_train, y_train)
gb_pred = gb.predict(X_test)
gb_acc = accuracy_score(y_test, gb_pred)

print(f"\\n=== Gradient Boosting (50 trees) ===")
print(f"Accuracy: {gb_acc:.1%}")
print(f"Improvement: +{(gb_acc - weak_acc):.1%}")

# Feature importance
print(f"\\n=== Top 5 Important Features (Gradient Boosting) ===")
importances = gb.feature_importances_
top_features = np.argsort(importances)[::-1][:5]
for i, feat in enumerate(top_features, 1):
    print(f"  {i}. Feature {feat}: {importances[feat]:.3f}")
`,
        },
      ],
    },
    {
      id: "ml-dbscan",
      moduleId: "ml-basics",
      lessonNumber: 15,
      title: "DBSCAN — Density-Based Clustering",
      description: "Cluster data by density without specifying number of clusters. Detect outliers automatically.",
      duration: "25 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Beyond K-Means",
          content: `# DBSCAN — Density-Based Clustering

## Problem with K-Means

K-Means assumes:
- Clusters are roughly spherical
- You know K (number of clusters) in advance
- All clusters have similar sizes

### Counter-examples:
- Crescent-shaped clusters
- Clusters of different sizes
- Outliers shouldn't be in any cluster
- Unknown number of clusters

## DBSCAN (Density-Based Spatial Clustering)

### Core Idea
Two points are in the same cluster if they're **close together** and **surrounded by other close points**.

### How it works:
1. **ε (epsilon):** How close is "close"? (distance threshold)
2. **minPts:** Minimum neighbors within ε to be a core point
3. For each point:
   - If >= minPts points within ε → Core point
   - If close to core point → Border point
   - Otherwise → Noise/Outlier

### Parameters:
- **ε:** Too small = all noise. Too large = one big cluster. Use k-distance graph.
- **minPts:** Often 2×dimensions or 4. Balance sensitivity.

## Advantages over K-Means

**Pros:**
- ✓ No need to specify K (discovers automatically)
- ✓ Finds arbitrary-shaped clusters
- ✓ Detects outliers (noise points)
- ✓ Robust to outliers

**Cons:**
- ✗ Sensitive to ε and minPts (must tune)
- ✗ Slower than K-Means (O(n²))
- ✗ Struggles with varying cluster densities
- ✗ High-dimensional curse (distances become less meaningful)

## Choosing ε

Use the **k-distance graph:**
1. For each point, calculate distance to kth nearest neighbor
2. Sort distances
3. Plot as line graph
4. Find "elbow" where distances increase sharply
5. That's your ε

## DBSCAN vs K-Means

| Aspect | K-Means | DBSCAN |
|--------|---------|--------|
| Cluster shape | Spherical | Any shape |
| Outliers | Forced into cluster | Labeled as noise |
| K required? | Yes | No |
| Scalability | Fast | Slow |
| Parameter tuning | Simple (just K) | Complex (ε, minPts) |
| Use case | Balanced, round clusters | Arbitrary shapes, unknown K |
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64
from sklearn.cluster import DBSCAN, KMeans
from sklearn.datasets import make_moons, make_blobs
from sklearn.preprocessing import StandardScaler

# Create crescent-shaped clusters (K-Means struggles)
X, y_true = make_moons(n_samples=200, noise=0.05, random_state=42)
X_scaled = StandardScaler().fit_transform(X)

# K-Means (will fail on crescents)
km = KMeans(n_clusters=2, random_state=42, n_init=10)
km.fit(X_scaled)

# DBSCAN (will succeed!)
db = DBSCAN(eps=0.15, min_samples=5)
dbscan_labels = db.fit_predict(X_scaled)

# Plot
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
fig.patch.set_facecolor('#0d0d14')

for ax in (ax1, ax2):
    ax.set_facecolor('#0d0d14')

# K-Means
ax1.scatter(X_scaled[km.labels_==0, 0], X_scaled[km.labels_==0, 1], 
           c='#8b5cf6', s=50, alpha=0.6, label='Cluster 0')
ax1.scatter(X_scaled[km.labels_==1, 0], X_scaled[km.labels_==1, 1], 
           c='#f43f5e', s=50, alpha=0.6, label='Cluster 1')
ax1.scatter(km.cluster_centers_[:, 0], km.cluster_centers_[:, 1], 
           c='yellow', s=200, marker='X', edgecolors='black', linewidths=2, label='Centroids')
ax1.set_title('K-Means (Fails on crescents)', color='white', fontsize=11)
ax1.legend(labelcolor='white', fontsize=8); ax1.tick_params(colors='#94a3b8')
ax1.spines[:].set_color('#1e293b')

# DBSCAN
colors = ['#8b5cf6', '#f43f5e', '#10b981', '#06b6d4', '#f59e0b']
for i in range(max(dbscan_labels) + 1):
    ax2.scatter(X_scaled[dbscan_labels==i, 0], X_scaled[dbscan_labels==i, 1], 
               c=colors[i % len(colors)], s=50, alpha=0.6, label=f'Cluster {i}')

# Noise points
noise_mask = dbscan_labels == -1
ax2.scatter(X_scaled[noise_mask, 0], X_scaled[noise_mask, 1], 
           c='gray', marker='X', s=200, edgecolors='white', linewidths=1, label='Noise')

ax2.set_title(f'DBSCAN (Succeeds! Found {max(dbscan_labels)+1} clusters + {noise_mask.sum()} noise)', 
             color='white', fontsize=11)
ax2.legend(labelcolor='white', fontsize=8); ax2.tick_params(colors='#94a3b8')
ax2.spines[:].set_color('#1e293b')

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()

print(f"K-Means: Found {len(set(km.labels_))} clusters")
print(f"DBSCAN: Found {max(dbscan_labels)+1} clusters + {(dbscan_labels==-1).sum()} noise points")
print("\\nDBSCAN naturally handles the crescent shape!")
`,
        },
      ],
    },
    {
      id: "ml-gmm",
      moduleId: "ml-basics",
      lessonNumber: 16,
      title: "Gaussian Mixture Models (GMM)",
      description: "Probabilistic clustering. Each sample belongs to multiple clusters with probability.",
      duration: "24 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Soft Clustering with GMM",
          content: `# Gaussian Mixture Models (GMM)

## Hard vs Soft Clustering

### Hard Clustering (K-Means, DBSCAN)
Each point belongs to exactly ONE cluster.
\`\`\`
Point: [5.1, 3.5] → Cluster 0 (100%)
\`\`\`

### Soft Clustering (GMM)
Each point has PROBABILITY of belonging to each cluster.
\`\`\`
Point: [5.1, 3.5] → 70% Cluster 0, 30% Cluster 1
\`\`\`

## The Model

Assume each cluster is a **Gaussian distribution** (bell curve):
- Cluster A: Mean=μ_A, Covariance=Σ_A
- Cluster B: Mean=μ_B, Covariance=Σ_B
- ...

A data point is sampled from one of these Gaussians!

### Graphically:
\`\`\`
Two overlapping bell curves.
Point near the overlap belongs to both with high probability.
\`\`\`

## EM Algorithm (Expectation-Maximization)

1. **Initialization:** Randomly place K Gaussians
2. **E-step (Expectation):** For each point, calculate probability of belonging to each Gaussian
3. **M-step (Maximization):** Update Gaussian parameters (μ, Σ) based on probabilities
4. **Repeat** until convergence

### Why it works:
- E-step: "Which cluster is this point from?"
- M-step: "Refit each cluster to its assigned points"
- Iterate until stable

## Advantages & Disadvantages

**Pros:**
- ✓ Probabilistic (know confidence)
- ✓ Can handle overlapping clusters
- ✓ More flexible than K-Means
- ✓ Theoretical foundation

**Cons:**
- ✗ Assumes Gaussian shape (may not hold)
- ✗ Sensitive to number of components (K)
- ✗ Slower than K-Means
- ✗ Can get stuck in local optima

## Choosing Number of Clusters

Use **AIC (Akaike Information Criterion)** or **BIC (Bayesian Information Criterion)**:
- Train GMM with K=1,2,3,... up to 10
- Calculate AIC/BIC for each
- Lower is better
- Pick K with lowest BIC

## GMM vs K-Means vs DBSCAN

| Aspect | K-Means | GMM | DBSCAN |
|--------|---------|-----|--------|
| Soft clusters? | No | Yes | No |
| Assumes shape | Spherical | Gaussian | Any |
| Speed | Fast | Medium | Slow |
| K needed? | Yes | Yes | No |
| Interpretability | High | Medium | Low |
| Output | Labels | Probabilities | Labels+Noise |
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64
from sklearn.mixture import GaussianMixture
from sklearn.datasets import make_blobs
from sklearn.preprocessing import StandardScaler

# Create data
X, y_true = make_blobs(n_samples=200, n_features=2, centers=3, 
                       cluster_std=0.8, random_state=42)
X_scaled = StandardScaler().fit_transform(X)

# Find optimal K using BIC
bic_scores = []
K_range = range(1, 8)
for k in K_range:
    gmm = GaussianMixture(n_components=k, random_state=42)
    gmm.fit(X_scaled)
    bic_scores.append(gmm.bic(X_scaled))

optimal_k = K_range[np.argmin(bic_scores)]

# Fit final model with optimal K
gmm = GaussianMixture(n_components=optimal_k, random_state=42)
gmm.fit(X_scaled)
labels = gmm.predict(X_scaled)
probabilities = gmm.predict_proba(X_scaled)

print(f"=== Gaussian Mixture Models ===")
print(f"Optimal K (by BIC): {optimal_k}")

# Plot
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
fig.patch.set_facecolor('#0d0d14')

# Left: Cluster assignments
ax1.set_facecolor('#0d0d14')
colors = ['#8b5cf6', '#f43f5e', '#10b981', '#06b6d4']
for i in range(optimal_k):
    ax1.scatter(X_scaled[labels==i, 0], X_scaled[labels==i, 1], 
               c=colors[i], s=50, alpha=0.6, label=f'Cluster {i}')
    # Plot cluster center
    ax1.scatter(gmm.means_[i, 0], gmm.means_[i, 1], 
               c=colors[i], s=200, marker='X', edgecolors='white', linewidths=2)

ax1.set_title(f'GMM Clusters (K={optimal_k})', color='white', fontsize=11)
ax1.legend(labelcolor='white'); ax1.tick_params(colors='#94a3b8')
ax1.spines[:].set_color('#1e293b')

# Right: BIC scores
ax2.set_facecolor('#0d0d14')
ax2.plot(K_range, bic_scores, 'o-', color='#8b5cf6', linewidth=2, markersize=8)
ax2.scatter(optimal_k, bic_scores[optimal_k-1], c='#f43f5e', s=200, marker='*', zorder=5)
ax2.set_xlabel('Number of Components (K)', color='#94a3b8')
ax2.set_ylabel('BIC Score', color='#94a3b8')
ax2.set_title('Model Selection via BIC', color='white', fontsize=11)
ax2.tick_params(colors='#94a3b8'); ax2.spines[:].set_color('#1e293b')

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()

# Soft clustering example
print(f"\\n=== Soft Clustering Example ===")
print(f"Sample 0 membership probabilities:")
for i in range(optimal_k):
    print(f"  Cluster {i}: {probabilities[0, i]:.1%}")

print(f"\\nSample 50 membership probabilities:")
for i in range(optimal_k):
    print(f"  Cluster {i}: {probabilities[50, i]:.1%}")
`,
        },
      ],
    },
    {
      id: "ml-ensemble",
      moduleId: "ml-basics",
      lessonNumber: 17,
      title: "Ensemble Methods — Combine Multiple Models",
      description: "Boost accuracy by combining weak learners into powerful ensemble models.",
      duration: "20 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Ensemble Learning Philosophy",
          content: `# Ensemble Methods — Combine Multiple Models

## Why Ensembles?
"Wisdom of crowds" — multiple imperfect models often beat a single perfect one. This is why:
- **Kaggle competitions**: ~100% of winners use ensembles
- **Real production systems**: Google, Netflix, Amazon all use ensembles

### Three Main Approaches

1. **Bagging** (Bootstrap Aggregating)
   - Train independent models on random subsets of data
   - Average predictions
   - Example: Random Forest

2. **Boosting**
   - Train models sequentially, each correcting previous errors
   - Weight incorrect predictions higher
   - Example: XGBoost, Gradient Boosting

3. **Stacking**
   - Train multiple different models
   - Use their outputs as input to a meta-learner

### The Bias-Variance Tradeoff

| Method | Reduces | Problem |
|--------|---------|---------|
| Bagging | Variance | Single model is weak |
| Boosting | Bias | Prone to overfitting |
| Stacking | Both | Complex, slow |

### Random Forest — The Gold Standard

\`\`\`python
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(n_estimators=100, max_depth=10)
rf.fit(X_train, y_train)
accuracy = rf.score(X_test, y_test)
\`\`\`

Why Random Forest wins:
- Parallelizable (train trees independently)
- Handles missing data well
- Feature importance built-in
- Minimal hyperparameter tuning
`,
          starterCode: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Generate synthetic data
X, y = make_classification(n_samples=200, n_features=10, 
                          n_informative=8, n_classes=2, 
                          random_state=42)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

print("=== Single Decision Tree ===")
dt = DecisionTreeClassifier(max_depth=5, random_state=42)
dt.fit(X_train, y_train)
dt_pred = dt.predict(X_test)
dt_acc = accuracy_score(y_test, dt_pred)
print(f"Decision Tree Accuracy: {dt_acc:.3f}")

print("\\n=== Random Forest (Ensemble of 10 Trees) ===")
rf = RandomForestClassifier(n_estimators=10, max_depth=5, random_state=42)
rf.fit(X_train, y_train)
rf_pred = rf.predict(X_test)
rf_acc = accuracy_score(y_test, rf_pred)
print(f"Random Forest Accuracy: {rf_acc:.3f}")

print(f"\\nImprovement: {(rf_acc - dt_acc):.3f} ({(rf_acc - dt_acc)*100:.1f}%)")

print("\\n=== Feature Importance (Top 5) ===")
importances = rf.feature_importances_
top_features = np.argsort(importances)[::-1][:5]
for idx in top_features:
    print(f"  Feature {idx}: {importances[idx]:.3f}")
`,
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// MODULE 6 — Advanced ML & Model Interpretability
// ─────────────────────────────────────────────────────────────
const advancedMlModule: Module = {
  id: "advanced-ml",
  title: "Advanced ML & Model Interpretability",
  slug: "advanced-ml",
  description:
    "Master model explanation techniques (SHAP, LIME), advanced evaluation metrics, hyperparameter tuning, and real-world deployment patterns.",
  introduction: `# Welcome to Advanced ML 🧠\n\n**You've mastered fundamentals. Now build production-ready models.**\n\nThe difference between a decent model and an industry-grade one:\n- **Interpretability** - Explain why your model made a prediction\n- **Advanced algorithms** - XGBoost, SHAP, LIME, stacking\n- **Production patterns** - Monitoring, deployment, edge cases\n- **Real-world challenges** - Class imbalance, data drift, ethical AI\n\n## Key Skills\n\n✅ SHAP & LIME - Explain any prediction\n✅ Hyperparameter tuning - Optimize for maximum accuracy\n✅ Handle imbalanced data - When you have 99% negatives\n✅ Deploy models safely - Version control, monitoring, rollback\n✅ Detect model drift - When performance degrades\n\n## Prerequisites\n✅ Module 5 (ML Fundamentals - all algorithms)\n\nLet's build enterprise-grade ML! 🚀`,
  icon: "⚡",
  color: "from-amber-600 to-orange-900",
  level: "Advanced",
  totalDuration: "6h 30min",
  heroImage:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
  lessons: [
    {
      id: "adv-metrics-deep",
      moduleId: "advanced-ml",
      lessonNumber: 1,
      title: "Advanced Evaluation Metrics",
      description: "Go beyond accuracy with AUC-ROC, Precision-Recall curves, RMSE, MAE, and when to use each.",
      duration: "30 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Understanding RMSE, MAE, MSE",
          content: `# Advanced Evaluation Metrics

## What are Evaluation Metrics?

An **evaluation metric** is a quantitative measure that tells you how well your model's predictions match reality. Choosing the right metric is as important as choosing the right algorithm — a model can score 99% accuracy while being completely useless if the dataset is imbalanced, or it can minimize MSE while producing predictions that are practically wrong.

Metrics are divided by problem type: **regression metrics** measure error in continuous predictions, while **classification metrics** measure correctness and trade-offs in categorical predictions.

## Regression Metrics (Continuous Predictions)

### Mean Squared Error (MSE)
\`\`\`
MSE = (1/n) * Σ(actual - predicted)²
\`\`\`
- **Pros:** Mathematical convenience, differentiable (great for Gradient Descent).
- **Cons:** Penalizes large errors heavily (outliers have huge impact).
- **Use when:** You want to punish large mistakes harshly.

### Root Mean Squared Error (RMSE)
\`\`\`
RMSE = √MSE = √((1/n) * Σ(actual - predicted)²)
\`\`\`
- **Pros:** Same units as target variable (interpretable). If target is "Price in dollars", RMSE is also in dollars.
- **Cons:** Still sensitive to outliers.
- **Use when:** You need interpretable errors in original units.

### Mean Absolute Error (MAE)
\`\`\`
MAE = (1/n) * Σ|actual - predicted|
\`\`\`
- **Pros:** Robust to outliers. Each error contributes equally.
- **Cons:** Not differentiable at 0 (harder to optimize).
- **Use when:** You want robustness and interpretability, or data has outliers.

## Classification Metrics (Categorical Predictions)

### AUC-ROC Curve
ROC = Receiver Operating Characteristic.
- **X-axis:** False Positive Rate (FPR) = FP / (FP + TN)
- **Y-axis:** True Positive Rate (TPR) = TP / (TP + FN)
- **AUC (Area Under Curve):** 
  - 1.0 = Perfect classifier
  - 0.5 = Random guessing
  - <0.5 = Worse than random (flip predictions!)

Use ROC-AUC when classes are slightly imbalanced.

### Precision-Recall Curve
- **X-axis:** Recall = TP / (TP + FN)
- **Y-axis:** Precision = TP / (TP + FP)
- **PR-AUC:** Area under Precision-Recall curve.

Use PR-AUC when classes are **heavily imbalanced** (e.g., fraud detection: 0.01% fraud vs 99.99% normal).
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64
from sklearn.metrics import mean_squared_error, mean_absolute_error, roc_curve, auc, confusion_matrix

# Regression Example
y_true_reg = np.array([10, 20, 30, 40, 50])
y_pred_reg = np.array([12, 18, 32, 38, 52])

mse = mean_squared_error(y_true_reg, y_pred_reg)
rmse = np.sqrt(mse)
mae = mean_absolute_error(y_true_reg, y_pred_reg)

print("=== Regression Metrics ===")
print(f"MSE:  {mse:.2f}")
print(f"RMSE: {rmse:.2f} (in original units)")
print(f"MAE:  {mae:.2f} (avg error magnitude)")

# Classification Example
y_true_clf = np.array([0, 0, 0, 0, 1, 1, 1, 1])
y_probs = np.array([0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9])

fpr, tpr, thresholds = roc_curve(y_true_clf, y_probs)
auc_score = auc(fpr, tpr)

print(f"\\n=== Classification Metrics ===")
print(f"AUC-ROC Score: {auc_score:.3f}")
print(f"Interpretation: Model is {auc_score*100:.0f}% likely to rank a random positive higher than a random negative.")
`,
        },
        {
          pageNumber: 2,
          title: "Choosing the Right Metric",
          content: `## Decision Tree: Which Metric to Use?

\`\`\`
├─ Problem Type?
│  ├─ Regression (Predicting continuous values)
│  │  ├─ RMSE: Interpretable, penalizes outliers
│  │  └─ MAE: Robust to outliers, interpretable
│  └─ Classification (Predicting categories)
│     ├─ Balanced dataset?
│     │  ├─ Yes: Accuracy, Precision, Recall, F1, AUC-ROC
│     │  └─ No (Imbalanced):
│     │     ├─ Lightly imbalanced: AUC-ROC
│     │     └─ Heavily imbalanced: Precision-Recall AUC
│     └─ Cost of mistakes?
│        ├─ False Positives worse (Spam filter): Precision high
│        ├─ False Negatives worse (Cancer detection): Recall high
│        └─ Both equal: F1-Score
\`\`\`
`,
          starterCode: `import numpy as np
from sklearn.metrics import precision_recall_curve, average_precision_score
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64

# Imbalanced dataset: 1 fraud in 100 transactions
y_true = np.array([0]*95 + [1]*5)
y_probs = np.array(np.random.rand(100))
y_probs[95:] += 0.3  # Boost fraud probabilities slightly

# Precision-Recall Curve
precision, recall, _ = precision_recall_curve(y_true, y_probs)
ap_score = average_precision_score(y_true, y_probs)

fig, ax = plt.subplots(figsize=(7, 5))
fig.patch.set_facecolor('#0d0d14')
ax.set_facecolor('#0d0d14')

ax.plot(recall, precision, color='#8b5cf6', linewidth=2, label=f'PR-AUC: {ap_score:.3f}')
ax.fill_between(recall, precision, alpha=0.2, color='#8b5cf6')
ax.set_xlabel('Recall', color='#94a3b8')
ax.set_ylabel('Precision', color='#94a3b8')
ax.set_title('Precision-Recall Curve (For Imbalanced Data)', color='white', fontsize=13)
ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')
ax.legend(facecolor='#1a1a26', edgecolor='#334155', labelcolor='white')
plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()

print(f"Average Precision Score: {ap_score:.3f}")
`,
        },
      ],
    },
    {
      id: "adv-stratified-split",
      moduleId: "advanced-ml",
      lessonNumber: 2,
      title: "Stratified K-Fold Cross-Validation",
      description: "Ensure class distribution is consistent across folds using Stratified splits.",
      duration: "20 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "The Problem with Random Splits",
          content: `# Stratified K-Fold Cross-Validation

## The Problem
Imagine your dataset has 99% Class 0 and 1% Class 1.
- Random K-Fold might accidentally put all Class 1 samples in Fold 3.
- Folds 1,2,4,5 train on only Class 0 data → They never learn the minority class!
- Results are misleading.

## The Solution: Stratified K-Fold
**Stratified K-Fold ensures every fold has the same class distribution as the original dataset.**

### How it works:
1. Sort data by class label.
2. Divide into K groups, alternating class labels.
3. Each fold contains ~1% Class 1 and ~99% Class 0.

Result: Every fold is a representative miniature of the whole dataset!
`,
          starterCode: `import numpy as np
from sklearn.model_selection import StratifiedKFold, KFold
from sklearn.datasets import make_classification

# Create imbalanced dataset: 95% Class 0, 5% Class 1
X, y = make_classification(n_samples=1000, n_features=10, 
                          n_informative=5, n_classes=2,
                          weights=[0.95, 0.05], random_state=42)

print(f"Overall class distribution: Class 0={np.mean(y==0)*100:.1f}%, Class 1={np.mean(y==1)*100:.1f}%")

print("\\n=== Random K-Fold (BAD for imbalanced data) ===")
kf = KFold(n_splits=5, shuffle=True, random_state=42)
for fold_num, (train_idx, test_idx) in enumerate(kf.split(X, y), 1):
    test_class_dist = np.mean(y[test_idx] == 1) * 100
    print(f"Fold {fold_num}: Class 1 in test set = {test_class_dist:.1f}%")

print("\\n=== Stratified K-Fold (GOOD for imbalanced data) ===")
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
for fold_num, (train_idx, test_idx) in enumerate(skf.split(X, y), 1):
    test_class_dist = np.mean(y[test_idx] == 1) * 100
    print(f"Fold {fold_num}: Class 1 in test set = {test_class_dist:.1f}%")

print("\\nNotice how Stratified maintains ~5% Class 1 in every fold!")
`,
        },
      ],
    },
    {
      id: "adv-shap",
      moduleId: "advanced-ml",
      lessonNumber: 3,
      title: "SHAP (SHapley Additive exPlanations)",
      description: "Explain any model's predictions using game theory. Understand why the model made that decision.",
      duration: "35 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "The Black Box Problem & SHAP",
          content: `# SHAP — Understanding Model Predictions

## Why Explain?
Deep Learning models are "black boxes" — we feed in data and get predictions, but we don't know why. In regulated fields (healthcare, finance), this is unacceptable.

**SHAP** assigns credit to each feature: "Feature X contributed +0.3 to this prediction, Feature Y contributed -0.1, etc."

## The Shapley Value (Game Theory)
Imagine a coalition of 5 players splitting a $100 prize. How much should each player get?
- **Solution:** Each player gets their **marginal contribution**.
- Example: Player A adds $30 to the team → Player A gets $30.

In ML:
- Players = Features
- Prize = Prediction value
- Each feature's SHAP value = its marginal contribution to the final prediction.

## SHAP vs Feature Importance

| Aspect | Feature Importance | SHAP |
|--------|-------------------|------|
| **What it shows** | Which features matter (globally) | How much each feature pushed prediction up/down (locally, per sample) |
| **Use case** | Understand model behavior overall | Explain a specific prediction |
| **Complexity** | Simple, fast | Computationally expensive |

## SHAP Force Plot
A horizontal bar chart showing:
- **Red bars (positive):** Features pushing prediction towards 1
- **Blue bars (negative):** Features pushing prediction towards 0
- **Baseline:** Model's average prediction
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification

# Generate data
X, y = make_classification(n_samples=200, n_features=5, 
                          n_informative=4, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=10, random_state=42)
model.fit(X, y)

# Simulate SHAP values for a sample
sample = X[0].reshape(1, -1)
base_value = model.predict_proba(X)[:, 1].mean()
shap_values = np.array([0.15, -0.08, 0.22, -0.05, 0.10])  # Simulated
prediction = model.predict_proba(sample)[0, 1]

# Plotting SHAP Force Plot
fig, ax = plt.subplots(figsize=(10, 4))
fig.patch.set_facecolor('#0d0d14')
ax.set_facecolor('#0d0d14')

# Calculate cumulative contribution
features = [f'Feature {i}' for i in range(5)]
colors = ['#f43f5e' if v < 0 else '#10b981' for v in shap_values]

# Sort by absolute value for visualization
sorted_indices = np.argsort(np.abs(shap_values))[::-1]
sorted_features = [features[i] for i in sorted_indices]
sorted_values = shap_values[sorted_indices]
sorted_colors = [colors[i] for i in sorted_indices]

# Create horizontal bar
y_pos = np.arange(len(sorted_features))
ax.barh(y_pos, sorted_values, color=sorted_colors, alpha=0.8)
ax.set_yticks(y_pos)
ax.set_yticklabels(sorted_features, color='#94a3b8')
ax.set_xlabel('SHAP Value (Impact on Prediction)', color='#94a3b8')
ax.set_title(f'SHAP Force Plot | Prediction: {prediction:.3f}', color='white', fontsize=13)
ax.axvline(0, color='#334155', linewidth=1, linestyle='--')
ax.tick_params(colors='#94a3b8', axis='x'); ax.spines[:].set_color('#1e293b')

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()

print("SHAP Summary for Sample 0:")
for feat, val in zip(sorted_features, sorted_values):
    direction = "↑ pushes towards 1" if val > 0 else "↓ pushes towards 0"
    print(f"  {feat}: {val:+.3f} {direction}")
print(f"\\nBase value (model average): {base_value:.3f}")
print(f"Final prediction: {prediction:.3f}")
`,
        },
        {
          pageNumber: 2,
          title: "When to Use SHAP",
          content: `## SHAP in Practice

### Why SHAP is Important:
1. **Regulatory Compliance:** EU GDPR requires explainability. SHAP proves your model's decisions.
2. **Debugging:** Why did the model predict wrong? SHAP shows which features misled it.
3. **Trust:** Users trust models they understand.

### Computational Complexity:
- **TreeExplainer (for tree-based models):** O(n) — Very fast
- **KernelExplainer (for any model):** O(2^n) — Exponentially slower
- **LinearExplainer (for linear models):** O(n) — Very fast

For a model with 50 features, KernelExplainer might take hours!

### Best Practices:
1. Use **TreeExplainer** for Random Forests, XGBoost, LightGBM.
2. Use **LinearExplainer** for logistic regression, linear regression.
3. For complex models (NNs): Explain on test set only (sample 100 predictions).
4. Communicate SHAP to non-technical stakeholders using the **Waterfall Plot** or **Force Plot**.
`,
          starterCode: `import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification

# Train model
X, y = make_classification(n_samples=200, n_features=5, random_state=42)
model = RandomForestClassifier(n_estimators=10, random_state=42)
model.fit(X, y)

# SHAP requires the library: pip install shap
print("To use SHAP in practice, install: pip install shap")
print("\\nExample usage:")
print("""
import shap

# For Tree-based models (fast!)
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# Visualize
shap.summary_plot(shap_values, X_test, plot_type="bar")
shap.force_plot(explainer.expected_value[1], 
                shap_values[1], X_test[1])
""")

print("\\nShould I use SHAP?")
print("  ✓ Yes:  High-stakes decisions (loan approval, medical diagnosis)")
print("  ✓ Yes:  Regulatory requirement")
print("  ✓ Yes:  Debugging model failures")
print("  ✗ No:   Real-time prediction with latency constraints")
print("  ✗ No:   Simple baseline models (already interpretable)")
`,
        },
      ],
    },
    {
      id: "adv-lime",
      moduleId: "advanced-ml",
      lessonNumber: 4,
      title: "LIME (Local Interpretable Model-agnostic Explanations)",
      description: "Approximate any black-box model with simple local decision rules.",
      duration: "25 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "LIME vs SHAP",
          content: `# LIME — Local Interpretability

## The Key Difference: Local vs Global

### SHAP: Global Credit Assignment
- Shapley values apply game theory
- Guarantees mathematical correctness
- Slower computationally
- **Best for:** Understanding why a model made a specific decision

### LIME: Local Approximation
- Approximates complex model with simple linear model locally
- Model-agnostic (works with ANY model)
- Fast and computationally cheap
- **Best for:** Quick explanations for non-technical users

## How LIME Works

1. **Perturb:** Add noise to the input (slightly change features)
2. **Predict:** Run all perturbed inputs through the black-box model
3. **Weight:** Weight perturbed samples by distance from original
4. **Fit:** Fit a simple linear model (Logistic Regression) on perturbed data
5. **Explain:** The linear model coefficients are LIME's explanation!

### Intuition:
"I can't understand why this complex neural network said 'cat', so I'll fit a simple line around that prediction and see which features mattered."

## LIME Force Plot Example

Original prediction: Classifier says "DOG" (probability 0.95)

LIME approximation using a simple rule:
- Feature "has_fur" = strong positive contributor
- Feature "has_tail" = moderate positive contributor
- Feature "meows" = strong negative contributor
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification

# Create data
X, y = make_classification(n_samples=200, n_features=4, 
                          n_informative=3, random_state=42)

# Train black-box model
model = RandomForestClassifier(n_estimators=5, random_state=42)
model.fit(X, y)

# Simulate LIME explanation
sample = X[0:1]
original_pred = model.predict_proba(sample)[0, 1]

# LIME: Perturb the sample
n_perturb = 50
perturbations = sample + np.random.normal(0, 0.5, (n_perturb, X.shape[1]))
perturb_preds = model.predict_proba(perturbations)[:, 1]

# Fit linear model on perturbations
from sklearn.linear_model import LinearRegression
distances = np.linalg.norm(perturbations - sample, axis=1)
weights = np.exp(-distances / distances.mean())
lr = LinearRegression()
lr.fit(perturbations, perturb_preds, sample_weight=weights)

# Plot LIME explanation
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
for ax in (ax1, ax2):
    ax.set_facecolor('#0d0d14')
fig.patch.set_facecolor('#0d0d14')

# Left: Scatter of perturbations
scatter = ax1.scatter(perturbations[:, 0], perturbations[:, 1], 
                     c=perturb_preds, cmap='RdYlGn', s=50, alpha=0.6)
ax1.scatter(sample[0, 0], sample[0, 1], color='#f59e0b', s=300, 
           marker='*', edgecolors='white', linewidths=2, label='Original')
ax1.set_xlabel('Feature 1', color='#94a3b8'); ax1.set_ylabel('Feature 2', color='#94a3b8')
ax1.set_title('LIME: Perturbed Samples', color='white', fontsize=12)
ax1.tick_params(colors='#94a3b8'); ax1.spines[:].set_color('#1e293b')
ax1.legend(labelcolor='white')

# Right: Linear approximation importance
feature_names = [f'F{i}' for i in range(4)]
colors = ['#10b981' if c > 0 else '#f43f5e' for c in lr.coef_]
ax2.barh(feature_names, lr.coef_, color=colors, alpha=0.8)
ax2.set_xlabel('LIME Coefficient (Importance)', color='#94a3b8')
ax2.set_title(f'Linear Approximation | Pred: {original_pred:.3f}', color='white', fontsize=12)
ax2.tick_params(colors='#94a3b8'); ax2.spines[:].set_color('#1e293b')

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()

print("LIME Explanation:")
for feat, coef in zip(feature_names, lr.coef_):
    direction = "↑ increases prediction" if coef > 0 else "↓ decreases prediction"
    print(f"  {feat}: {coef:+.3f} {direction}")
`,
        },
      ],
    },
    {
      id: "adv-data-dist",
      moduleId: "advanced-ml",
      lessonNumber: 5,
      title: "Data Distributions & Normality",
      description: "Understand normal, skewed, and multimodal distributions. Know when your data violates assumptions.",
      duration: "25 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Common Distributions",
          content: `# Data Distributions

## Why Distributions Matter
Many algorithms assume data is normally distributed:
- Linear/Logistic Regression
- Naive Bayes
- PCA
- Gaussian Mixture Models

If your data is highly skewed, these algorithms perform poorly!

## The Normal Distribution (Bell Curve)
\`\`\`
μ = mean
σ = standard deviation
68% of data within ±1σ
95% of data within ±2σ
99.7% of data within ±3σ
\`\`\`

## Skewed Distributions

### Right-Skewed (Positive Skew)
- Long tail on the right
- Mean > Median
- Common in: Income, house prices, wait times
- Fix: Log transform, square root transform

### Left-Skewed (Negative Skew)
- Long tail on the left
- Mean < Median
- Common in: Test scores (people cluster towards 100%)
- Fix: Box-Cox transform

## Bimodal & Multimodal
Multiple peaks indicate hidden groups in your data. 
- Example: "Height of humans" has two peaks (men & women).
- Solution: Stratify by group or add a categorical feature.
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64
from scipy import stats

np.random.seed(42)

# Generate different distributions
normal = np.random.normal(100, 15, 1000)
right_skewed = np.random.exponential(2, 1000) + 1
bimodal = np.concatenate([
    np.random.normal(50, 5, 500),
    np.random.normal(150, 5, 500)
])

fig, axes = plt.subplots(1, 3, figsize=(14, 4))
fig.patch.set_facecolor('#0d0d14')

distributions = [
    (normal, 'Normal Distribution', axes[0]),
    (right_skewed, 'Right-Skewed', axes[1]),
    (bimodal, 'Bimodal Distribution', axes[2])
]

for data, title, ax in distributions:
    ax.set_facecolor('#0d0d14')
    ax.hist(data, bins=40, color='#8b5cf6', alpha=0.7, edgecolor='none')
    
    # Skewness and Kurtosis
    skew = stats.skew(data)
    kurt = stats.kurtosis(data)
    
    ax.set_title(f'{title}\\nSkewness: {skew:.2f}', color='white', fontsize=11)
    ax.set_ylabel('Frequency', color='#94a3b8')
    ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()

print("Distribution Analysis:")
print(f"\\nNormal: Skewness={stats.skew(normal):.3f} (close to 0 = symmetric)")
print(f"Right-Skewed: Skewness={stats.skew(right_skewed):.3f} (>0 = tail on right)")
print(f"Bimodal: Skewness={stats.skew(bimodal):.3f}")

# Q-Q plot for normality test
from scipy.stats import shapiro, normaltest
stat, p_value = shapiro(normal)
print(f"\\nShapiro-Wilk test (is Normal distributed?)")
print(f"  Normal data: p={p_value:.3f} (>0.05 = likely normal)")
stat2, p_value2 = shapiro(right_skewed)
print(f"  Skewed data: p={p_value2:.3f} (<0.05 = not normal)")
`,
        },
      ],
    },
    {
      id: "adv-feature-scaling",
      moduleId: "advanced-ml",
      lessonNumber: 6,
      title: "Feature Scaling & Normalization",
      description: "Understand why algorithms need scaled features. Learn StandardScaler, MinMaxScaler, RobustScaler.",
      duration: "22 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Why Scale Features?",
          content: `# Feature Scaling

## The Problem
Some features have large ranges:
- Age: 0-100
- Income: $0 - $1,000,000
- Temperature: -50 to 50°C

Others have small ranges:
- Rating: 0-5

Distance-based algorithms (KNN, K-Means) and Gradient Descent see large-range features as "more important" just because of scale, not signal!

## Solution: Normalize Features

### StandardScaler (Standardization)
\`\`\`
z = (x - mean) / std_dev
\`\`\`
- Centers data at 0, scales to std dev 1
- Result: Normally distributed between -3 and 3
- **Use for:** Algorithms assuming normal distribution (Linear/Logistic Regression, Neural Networks)

### MinMaxScaler (Normalization)
\`\`\`
scaled = (x - min) / (max - min)
\`\`\`
- Scales to [0, 1]
- **Use for:** Tree-based models (don't need it, but doesn't hurt), NN activation functions expecting [0,1]

### RobustScaler
\`\`\`
scaled = (x - median) / IQR
\`\`\`
- Uses median and IQR instead of mean/std
- **Use for:** Data with extreme outliers

## When NOT to Scale

✗ Tree-based models (Decision Trees, Random Forest, XGBoost) — They're scale-invariant
✓ Distance-based algorithms (KNN, K-Means)
✓ Gradient Descent (Linear/Logistic Regression, Neural Networks)
✓ PCA, SVM
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

# Raw data with different scales
X = np.array([[1, 100], [5, 500], [10, 1000], [3, 300]]).astype(float)

# Apply scalers
ss = StandardScaler()
mms = MinMaxScaler()
rs = RobustScaler()

X_standard = ss.fit_transform(X)
X_minmax = mms.fit_transform(X)
X_robust = rs.fit_transform(X)

print("=== Original Data ===")
print(f"Feature 0: min={X[:, 0].min()}, max={X[:, 0].max()}")
print(f"Feature 1: min={X[:, 1].min()}, max={X[:, 1].max()}")

print("\\n=== StandardScaler (Standardization) ===")
print(f"Feature 0: mean={X_standard[:, 0].mean():.3f}, std={X_standard[:, 0].std():.3f}")
print(f"Feature 1: mean={X_standard[:, 1].mean():.3f}, std={X_standard[:, 1].std():.3f}")

print("\\n=== MinMaxScaler (0-1 Range) ===")
print(f"Feature 0: min={X_minmax[:, 0].min():.3f}, max={X_minmax[:, 0].max():.3f}")
print(f"Feature 1: min={X_minmax[:, 1].min():.3f}, max={X_minmax[:, 1].max():.3f}")

print("\\n=== RobustScaler (Using Median & IQR) ===")
print(f"Feature 0: min={X_robust[:, 0].min():.3f}, max={X_robust[:, 0].max():.3f}")
print(f"Feature 1: min={X_robust[:, 1].min():.3f}, max={X_robust[:, 1].max():.3f}")

# Visualization
fig, axes = plt.subplots(2, 2, figsize=(10, 8))
fig.patch.set_facecolor('#0d0d14')

datasets = [
    (X, 'Original (Unscaled)', axes[0, 0]),
    (X_standard, 'StandardScaler', axes[0, 1]),
    (X_minmax, 'MinMaxScaler', axes[1, 0]),
    (X_robust, 'RobustScaler', axes[1, 1])
]

for data, title, ax in datasets:
    ax.set_facecolor('#0d0d14')
    ax.scatter(data[:, 0], data[:, 1], color='#8b5cf6', s=100)
    ax.set_title(title, color='white', fontsize=11)
    ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')
    ax.grid(True, color='#1e293b', alpha=0.3)

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"\\nPLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()
`,
        },
      ],
    },
    {
      id: "adv-class-imbalance",
      moduleId: "advanced-ml",
      lessonNumber: 7,
      title: "Handling Class Imbalance",
      description: "Techniques to handle imbalanced datasets: SMOTE, class weights, and threshold adjustment.",
      duration: "28 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "The Imbalance Problem",
          content: `# Handling Class Imbalance

## The Problem (Recap)
- Dataset: 1% fraud, 99% normal transactions
- Naive model: Always predict "normal" → 99% accuracy but 0% fraud detection!
- Metric problem: Accuracy is useless for imbalanced data.

## Solution 1: Adjust Class Weights
Tell the algorithm: "Penalize False Negatives (missed fraud) 100x more than False Positives."

\`\`\`python
# Logistic Regression
model = LogisticRegression(class_weight='balanced')

# Class weight formula:
# weight_class_0 = n_samples / (n_classes * count_class_0)
# For 99% vs 1%: weight_0 = 100 / (2 * 99) ≈ 0.5, weight_1 = 100 / (2 * 1) = 50
\`\`\`

The minority class (1) gets 100x more weight!

## Solution 2: Resampling

### Undersampling
Delete majority class samples until balanced.
- Pros: Fast training
- Cons: Lose data

### Oversampling
Duplicate minority class samples.
- Pros: Keep all data
- Cons: Risk overfitting

### SMOTE (Synthetic Minority Over-sampling)
Generate synthetic minority examples by interpolating between existing samples.
- Pros: Synthetic data avoids exact duplicates
- Cons: Slightly computationally expensive

## Solution 3: Threshold Adjustment
By default, logistic regression uses threshold=0.5.
- If probability >= 0.5 → Class 1
- If probability < 0.5 → Class 0

For imbalanced data, increase threshold to 0.7 or 0.8 to be more conservative.
`,
          starterCode: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import recall_score, precision_score, roc_auc_score

# Create imbalanced dataset
X, y = make_classification(n_samples=1000, n_features=10, 
                          n_informative=5, n_classes=2,
                          weights=[0.95, 0.05], random_state=42)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y)

print("=== Class Distribution ===")
print(f"Training: Class 0={np.mean(y_train==0)*100:.1f}%, Class 1={np.mean(y_train==1)*100:.1f}%")

# Model 1: No class weights
model1 = LogisticRegression(max_iter=1000, random_state=42)
model1.fit(X_train, y_train)
pred1 = model1.predict(X_test)

print("\\n=== Model WITHOUT Class Weights ===")
print(f"Recall (catch fraud): {recall_score(y_test, pred1):.3f}")
print(f"Precision: {precision_score(y_test, pred1):.3f}")
print(f"AUC-ROC: {roc_auc_score(y_test, model1.predict_proba(X_test)[:, 1]):.3f}")

# Model 2: With class weights
model2 = LogisticRegression(class_weight='balanced', max_iter=1000, random_state=42)
model2.fit(X_train, y_train)
pred2 = model2.predict(X_test)

print("\\n=== Model WITH Class Weights='balanced' ===")
print(f"Recall (catch fraud): {recall_score(y_test, pred2):.3f}")
print(f"Precision: {precision_score(y_test, pred2):.3f}")
print(f"AUC-ROC: {roc_auc_score(y_test, model2.predict_proba(X_test)[:, 1]):.3f}")

print("\\nNotice: Recall (catching fraud) improved significantly!")
`,
        },
        {
          pageNumber: 2,
          title: "SMOTE in Practice",
          content: `## SMOTE Example

\`\`\`python
from imblearn.over_sampling import SMOTE

# Create synthetic minority examples
smote = SMOTE(random_state=42)
X_train_balanced, y_train_balanced = smote.fit_resample(X_train, y_train)

# Now train on balanced data
model = LogisticRegression()
model.fit(X_train_balanced, y_train_balanced)
\`\`\`

### When to use each approach:
- **Class weights:** Simple, first try
- **SMOTE:** Better performance, but slower
- **Threshold adjustment:** Use alongside other methods
- **Undersampling:** Only if you have huge datasets and can afford to lose data
`,
          starterCode: `import numpy as np
from sklearn.datasets import make_classification

try:
    from imblearn.over_sampling import SMOTE
    
    # Create imbalanced dataset
    X, y = make_classification(n_samples=1000, n_features=10, 
                              n_informative=5, n_classes=2,
                              weights=[0.95, 0.05], random_state=42)
    
    print(f"Original class distribution:")
    print(f"  Class 0: {np.sum(y==0)} samples")
    print(f"  Class 1: {np.sum(y==1)} samples")
    
    # Apply SMOTE
    smote = SMOTE(random_state=42)
    X_balanced, y_balanced = smote.fit_resample(X, y)
    
    print(f"\\nAfter SMOTE:")
    print(f"  Class 0: {np.sum(y_balanced==0)} samples")
    print(f"  Class 1: {np.sum(y_balanced==1)} samples")
    
except ImportError:
    print("SMOTE requires: pip install imbalanced-learn")
    print("\\nBasic class weighting works without it:")
    print("  model = LogisticRegression(class_weight='balanced')")
`,
        },
      ],
    },
    {
      id: "adv-hyperparameter",
      moduleId: "advanced-ml",
      lessonNumber: 8,
      title: "Hyperparameter Tuning (Grid & Random Search)",
      description: "Systematically search for optimal hyperparameters using GridSearchCV and RandomizedSearchCV.",
      duration: "30 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "What are Hyperparameters?",
          content: `# Hyperparameter Tuning

## Hyperparameters vs Parameters

### Parameters
Learned **during** training.
- Linear Regression weights (w, b)
- Neural Network weights
- Decision Tree split thresholds

### Hyperparameters
Set **before** training. You choose them.
- Learning rate
- Number of trees in Random Forest
- Max depth of decision tree
- K in K-Nearest Neighbors
- Regularization strength (λ)

## Manual vs Automated Tuning

### Manual (Bad)
\`\`\`python
model = RandomForest(n_estimators=10)  # Guess 10
# Train, test...maybe it's not optimal

model = RandomForest(n_estimators=50)  # Try 50
# Train, test...still not optimal
\`\`\`
Takes forever, often suboptimal.

### Automated: GridSearchCV (Exhaustive)
Try all combinations:
\`\`\`python
param_grid = {
    'n_estimators': [10, 50, 100],
    'max_depth': [5, 10, 20],
    'min_samples_split': [2, 5, 10]
}
# Total: 3 * 3 * 3 = 27 combinations tested
\`\`\`

Pros: Guaranteed to find the best combo
Cons: Slow for large grids (10 hyperparameters = 10,000+ combos)

### Automated: RandomizedSearchCV (Sampling)
Try random combinations:
\`\`\`python
param_dist = {
    'n_estimators': range(10, 200),  # Sample 20 random values
    'max_depth': range(5, 50),
}
search = RandomizedSearchCV(model, param_dist, n_iter=20, cv=5)
\`\`\`

Pros: Faster than Grid Search
Cons: Might miss the optimal combo

## K-Fold During Tuning

GridSearchCV automatically uses K-Fold CV to evaluate each combo:
1. Split data into 5 folds
2. For each hyperparameter combo:
   - Train on folds 1-4, test on fold 5
   - Train on folds 1,2,3,5, test on fold 4
   - ... (repeat 5 times)
   - Average the 5 scores
3. Pick the combo with best average score
4. Retrain on entire training set
5. Evaluate on test set (never used during tuning!)
`,
          starterCode: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV, train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Create data
X, y = make_classification(n_samples=500, n_features=20, 
                          n_informative=10, n_classes=2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Define hyperparameter grid
param_grid = {
    'n_estimators': [10, 50, 100],
    'max_depth': [5, 10, 20],
    'min_samples_split': [2, 5]
}

print("=== GridSearchCV ===")
grid_search = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid,
    cv=5,  # 5-Fold CV
    n_jobs=-1  # Use all CPU cores
)
grid_search.fit(X_train, y_train)

print(f"Best hyperparameters: {grid_search.best_params_}")
print(f"Best CV score: {grid_search.best_score_:.3f}")
print(f"Test accuracy: {grid_search.score(X_test, y_test):.3f}")

print("\\n=== GridSearchCV Results (Top 5) ===")
results_df = pd.DataFrame(grid_search.cv_results_)
top_results = results_df.nlargest(5, 'mean_test_score')[['param_n_estimators', 'param_max_depth', 'param_min_samples_split', 'mean_test_score']]
print(top_results.to_string())

# RandomizedSearchCV (faster for large grids)
print("\\n=== RandomizedSearchCV (faster alternative) ===")
param_dist = {
    'n_estimators': range(10, 200),
    'max_depth': range(5, 50),
    'min_samples_split': range(2, 10)
}

rand_search = RandomizedSearchCV(
    RandomForestClassifier(random_state=42),
    param_dist,
    n_iter=20,  # Try 20 random combos
    cv=5,
    n_jobs=-1,
    random_state=42
)
rand_search.fit(X_train, y_train)

print(f"Best hyperparameters: {rand_search.best_params_}")
print(f"Best CV score: {rand_search.best_score_:.3f}")
print(f"Test accuracy: {rand_search.score(X_test, y_test):.3f}")

# Need pandas for display
try:
    import pandas as pd
except:
    pass
`,
        },
      ],
    },
    {
      id: "adv-feature-engineering",
      moduleId: "advanced-ml",
      lessonNumber: 9,
      title: "Feature Engineering — Create Better Features",
      description: "Transform raw features into powerful predictors through encoding, binning, and domain knowledge.",
      duration: "32 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "The Art & Science of Features",
          content: `# Feature Engineering

## The Golden Rule of ML
**"Garbage in, garbage out."** A brilliant algorithm on bad features beats a mediocre algorithm on great features.

## Types of Feature Engineering

### 1. Categorical Encoding

#### One-Hot Encoding
Convert categories to binary columns:
\`\`\`
Color: Red  →  Red=1, Green=0, Blue=0
Color: Green →  Red=0, Green=1, Blue=0
\`\`\`

#### Label Encoding
Assign integers:
\`\`\`
Red=0, Green=1, Blue=2
\`\`\`
⚠️ Only use if ordinal (e.g., Education: Primary=0, Secondary=1, Tertiary=2)

#### Target Encoding
Replace with target mean:
\`\`\`
If "Red" items have avg purchase=$100, replace Red→100
\`\`\`

### 2. Numerical Transformations

#### Binning (Discretization)
Convert continuous to categorical:
\`\`\`
Age 25 → "Young" (0-30)
Age 45 → "Middle" (31-60)
Age 75 → "Senior" (60+)
\`\`\`

#### Polynomial Features
Create interactions:
\`\`\`
x1, x2 → x1, x2, x1², x2², x1*x2
\`\`\`

#### Log Transform
For skewed data:
\`\`\`
income_log = log(income)  # Reduces skewness
\`\`\`

### 3. Domain-Specific Features

Extract knowledge from raw data:
- From timestamp: Extract day-of-week, hour, is_weekend
- From text: Word count, sentiment score
- From geographic: Distance to city center
`,
          starterCode: `import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, PolynomialFeatures

# Example: House Price Prediction
data = pd.DataFrame({
    'bedrooms': [2, 3, 4, 2, 3],
    'price': [200000, 300000, 400000, 250000, 350000],
    'color': ['red', 'blue', 'red', 'blue', 'green']
})

print("=== Original Data ===")
print(data)

# 1. One-Hot Encoding
data_encoded = pd.get_dummies(data, columns=['color'], drop_first=True)
print("\\n=== After One-Hot Encoding ===")
print(data_encoded)

# 2. Polynomial Features
X = data[['bedrooms']].values
poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X)
print("\\n=== Polynomial Features (bedrooms²) ===")
print(f"Original: {X.flatten()}")
print(f"With polynomial: {X_poly}")

# 3. Log Transform for skewed data
skewed_data = np.array([10, 100, 1000, 10000, 100000])
log_data = np.log(skewed_data)
print(f"\\n=== Log Transform ===")
print(f"Original (skewed): {skewed_data}")
print(f"Log transformed: {log_data}")

# 4. Interaction Features
data['bedrooms_price_interaction'] = data['bedrooms'] * (data['price'] / 100000)
print("\\n=== Interaction Feature (bedrooms × normalized_price) ===")
print(data[['bedrooms', 'price', 'bedrooms_price_interaction']])
`,
        },
        {
          pageNumber: 2,
          title: "Feature Selection",
          content: `## Feature Selection: Keep Only the Good Features

Too many features cause:
- Overfitting (model memorizes noise)
- Slow training
- Curse of dimensionality

### Methods

#### 1. Univariate Selection (Filter)
Calculate correlation between each feature and target:
\`\`\`python
from sklearn.feature_selection import SelectKBest, chi2

selector = SelectKBest(chi2, k=10)  # Keep top 10 features
X_selected = selector.fit_transform(X, y)
\`\`\`

#### 2. Tree-Based Feature Importance
Trees tell you which features matter:
\`\`\`python
model = RandomForestClassifier()
model.fit(X, y)
importances = model.feature_importances_
# Drop features with importance < 0.01
\`\`\`

#### 3. Recursive Feature Elimination (RFE)
Remove weakest features iteratively:
\`\`\`python
from sklearn.feature_selection import RFE

rfe = RFE(LogisticRegression(), n_features_to_select=10)
X_selected = rfe.fit_transform(X, y)
\`\`\`

### Best Practice:
1. Start with all features
2. Train and note baseline performance
3. Drop weakest feature
4. Retrain and compare
5. Repeat until performance drops
`,
          starterCode: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.ensemble import RandomForestClassifier

# Create data with 20 features (only 5 are useful)
X, y = make_classification(n_samples=200, n_features=20, 
                          n_informative=5, n_redundant=5,
                          random_state=42)

print("=== Original: 20 Features ===")

# Method 1: SelectKBest
selector = SelectKBest(f_classif, k=5)
X_selected = selector.fit_transform(X, y)
selected_features = selector.get_support()
print(f"\\nSelectKBest selected features: {np.where(selected_features)[0]}")
print(f"Scores: {selector.scores_[selected_features]}")

# Method 2: Tree-Based Importance
rf = RandomForestClassifier(n_estimators=10, random_state=42)
rf.fit(X, y)
importances = rf.feature_importances_
top_features = np.argsort(importances)[::-1][:5]
print(f"\\nTop 5 features by RF importance: {top_features}")
print(f"Importances: {importances[top_features]}")

# Verify with simple accuracy
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(max_iter=1000)
score_all = cross_val_score(model, X, y, cv=5).mean()
score_selected = cross_val_score(model, X_selected, y, cv=5).mean()

print(f"\\nAccuracy with all 20 features: {score_all:.3f}")
print(f"Accuracy with selected 5 features: {score_selected:.3f}")
`,
        },
      ],
    },
    {
      id: "adv-xgboost",
      moduleId: "advanced-ml",
      lessonNumber: 10,
      title: "XGBoost — The Best Algorithm",
      description: "Master gradient boosting with XGBoost, the most powerful algorithm in production ML.",
      duration: "35 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Why XGBoost Wins Kaggle",
          content: `# XGBoost — eXtreme Gradient Boosting

## Gradient Boosting Recap
1. Train a weak learner (shallow tree)
2. Calculate residuals (errors)
3. Train next tree to predict residuals
4. Repeat N times, combining all trees

**XGBoost = Optimized Gradient Boosting with:**
- Parallel processing
- GPU support
- Built-in regularization
- Handles missing values
- Feature importance built-in
- Early stopping

## Why Kaggle Winners Use It

### Statistics:
- ~80% of Kaggle competition winners use XGBoost
- beats "pure" Deep Learning on tabular data
- Twice as fast as standard Gradient Boosting

### Hyperparameters

| Parameter | Effect | Range |
|-----------|--------|-------|
| \`max_depth\` | Deeper = more complex | 3-8 (typically) |
| \`learning_rate\` | Step size in gradient descent | 0.01-0.3 |
| \`n_estimators\` | Number of trees | 100-1000 |
| \`subsample\` | Row sampling ratio | 0.5-1.0 |
| \`colsample_bytree\` | Feature sampling ratio | 0.5-1.0 |
| \`reg_lambda\` | L2 regularization | 0.1-10 |
| \`reg_alpha\` | L1 regularization | 0.1-10 |

### Pro Tips:
1. Start with \`max_depth=5, learning_rate=0.1, n_estimators=100\`
2. Use \`early_stopping\` to avoid overfitting
3. Use \`feature_importances_\` for feature selection
4. Set \`scale_pos_weight = n_negatives / n_positives\` for imbalanced data
`,
          starterCode: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

try:
    import xgboost as xgb
    
    # Create data
    X, y = make_classification(n_samples=1000, n_features=20, 
                              n_informative=10, n_classes=2, random_state=42)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42)
    
    # Create model with common hyperparameters
    model = xgb.XGBClassifier(
        max_depth=5,
        learning_rate=0.1,
        n_estimators=100,
        subsample=0.8,
        colsample_bytree=0.8,
        reg_lambda=1.0,
        reg_alpha=0.5,
        random_state=42,
        eval_metric='logloss'  # For binary classification
    )
    
    # Train with early stopping
    model.fit(
        X_train, y_train,
        eval_set=[(X_test, y_test)],
        early_stopping_rounds=10,
        verbose=False
    )
    
    # Evaluate
    pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, pred)
    
    print(f"XGBoost Test Accuracy: {accuracy:.3f}")
    print(f"\\nTop 10 Most Important Features:")
    importances = model.feature_importances_
    top_features = np.argsort(importances)[::-1][:10]
    for idx, feat in enumerate(top_features, 1):
        print(f"  {idx}. Feature {feat}: {importances[feat]:.3f}")
    
except ImportError:
    print("XGBoost not installed. Install: pip install xgboost")
    print("\\nBasic usage:")
    print("""
import xgboost as xgb

model = xgb.XGBClassifier(
    max_depth=5,
    learning_rate=0.1,
    n_estimators=100
)
model.fit(X_train, y_train)
predictions = model.predict(X_test)
""")
`,
        },
      ],
    },
    {
      id: "adv-ensemble-advanced",
      moduleId: "advanced-ml",
      lessonNumber: 11,
      title: "Advanced Ensemble Methods",
      description: "Stacking, Voting, and Blending — Combine diverse models for superior performance.",
      duration: "28 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Beyond Bagging & Boosting",
          content: `# Advanced Ensemble Methods

## Voting Classifier
Combine multiple different algorithms:
\`\`\`python
from sklearn.ensemble import VotingClassifier

models = [
    ('lr', LogisticRegression()),
    ('rf', RandomForestClassifier()),
    ('xgb', XGBClassifier())
]

ensemble = VotingClassifier(estimators=models, voting='hard')
ensemble.fit(X_train, y_train)
\`\`\`

**Hard Voting:** Majority vote (1 if 2 out of 3 models say 1)
**Soft Voting:** Average probabilities (if models output 0.8, 0.6, 0.9 → average 0.77)

Pros: Simple, different models capture different patterns
Cons: Requires training many models

## Stacking (Meta-Learning)
1. **Level 0:** Train multiple diverse models on training data
2. **Level 1:** Use predictions from Level 0 as input to a meta-learner
3. **Final:** Meta-learner makes the final prediction

\`\`\`python
from sklearn.ensemble import StackingClassifier

base_learners = [
    ('lr', LogisticRegression()),
    ('rf', RandomForestClassifier()),
    ('svm', SVC(probability=True))
]

meta_learner = LogisticRegression()

stacking = StackingClassifier(
    estimators=base_learners,
    final_estimator=meta_learner,
    cv=5
)
\`\`\`

### Why Stacking Wins:
- Level 0 models learn raw patterns
- Meta-learner learns which models to trust
- Example: RF works well on some features, LR on others → Meta-learner learns to combine them

## Blending
Like stacking, but simpler:
1. Split training data: 60% train, 40% validation
2. Train diverse models on 60%
3. Get predictions on 40% validation set
4. Use validation predictions as meta-features
5. Train meta-learner

Pros: Faster (no CV needed in meta-training)
Cons: Uses less data for base learner training

## When to Use Each:

| Method | Speed | Performance | Use Case |
|--------|-------|-------------|----------|
| Voting | Fast | Good | Quick ensemble, different models available |
| Stacking | Slow | Very Good | Production, high accuracy needed |
| Blending | Medium | Good | Competition, limited time |
`,
          starterCode: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from sklearn.metrics import accuracy_score

try:
    import xgboost as xgb
    xgb_available = True
except ImportError:
    xgb_available = False

# Create data
X, y = make_classification(n_samples=500, n_features=15, 
                          n_informative=10, n_classes=2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Individual models
lr = LogisticRegression(max_iter=1000, random_state=42)
rf = RandomForestClassifier(n_estimators=50, random_state=42)

print("=== Individual Model Performance ===")
lr.fit(X_train, y_train)
lr_pred = lr.predict(X_test)
lr_acc = accuracy_score(y_test, lr_pred)
print(f"Logistic Regression: {lr_acc:.3f}")

rf.fit(X_train, y_train)
rf_pred = rf.predict(X_test)
rf_acc = accuracy_score(y_test, rf_pred)
print(f"Random Forest: {rf_acc:.3f}")

# Voting Ensemble
estimators = [('lr', LogisticRegression(max_iter=1000)), 
              ('rf', RandomForestClassifier(n_estimators=50))]

if xgb_available:
    estimators.append(('xgb', xgb.XGBClassifier(n_estimators=50, verbosity=0)))

voting = VotingClassifier(estimators=estimators, voting='soft')
voting.fit(X_train, y_train)
voting_pred = voting.predict(X_test)
voting_acc = accuracy_score(y_test, voting_pred)

print(f"\\n=== Voting Ensemble (Soft) ===")
print(f"Accuracy: {voting_acc:.3f}")
print(f"Improvement: +{(voting_acc - max(lr_acc, rf_acc))*100:.1f}%")
`,
        },
      ],
    },
    {
      id: "adv-neural-nets",
      moduleId: "advanced-ml",
      lessonNumber: 12,
      title: "Introduction to Neural Networks",
      description: "Understand perceptrons, backpropagation, and when to use deep learning.",
      duration: "30 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "The Perceptron & Layers",
          content: `# Neural Networks Basics

## When Deep Learning > Classical ML

| Dataset Type | Best Algorithm |
|--------------|----------------|
| Tabular (< 1M rows) | XGBoost, Random Forest |
| Images | Convolutional Neural Networks (CNN) |
| Text | Transformer, RNN |
| Time Series | LSTM, Transformer |
| Tabular (>1M rows) | Deep Neural Network |

### Neural Network Advantages:
- Handles unstructured data (images, text)
- Finds complex non-linear patterns
- Scales well with data

### Disadvantages:
- Needs tons of data (10,000+ samples)
- Slow to train
- Hard to interpret ("black box")
- Hyperparameter tuning is complex

## The Perceptron
Simplest neural network: Single neuron.
\`\`\`
Input: X = [x1, x2, x3]
Weights: W = [w1, w2, w3]
Bias: b

Output = Activation(X·W + b)
\`\`\`

The activation function (sigmoid, ReLU) introduces **non-linearity**.

## Layers & Architecture

\`\`\`
Input Layer (10 features)
    ↓
Hidden Layer 1 (64 neurons)
    ↓
Hidden Layer 2 (32 neurons)
    ↓
Output Layer (1 neuron → probability)
\`\`\`

Each layer transforms data, learning increasingly abstract features:
- Layer 1: Simple patterns (edges in images)
- Layer 2: Combinations (shapes)
- Layer 3: Complex concepts (objects)

## Backpropagation
How neural networks learn:
1. **Forward pass:** Predict output
2. **Calculate loss:** How wrong was the prediction?
3. **Backward pass:** Compute gradients using chain rule
4. **Update weights:** gradient descent steps

This is just gradient descent, but applied to every weight in the network!

## Activation Functions

### ReLU (Rectified Linear Unit)
\`\`\`
f(x) = max(0, x)
\`\`\`
- Pros: Fast, prevents vanishing gradient
- Cons: Dead neurons (some outputs become 0 and stop learning)
- Use: Hidden layers

### Sigmoid
\`\`\`
f(x) = 1 / (1 + e^-x)  # Output between 0 and 1
\`\`\`
- Pros: Probabilistic output
- Cons: Slow, vanishing gradient problem
- Use: Output layer for binary classification

### Softmax
\`\`\`
Converts scores to probability distribution (sum to 1)
\`\`\`
- Use: Output layer for multi-class classification
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64

# Activation functions
x = np.linspace(-5, 5, 100)

def sigmoid(x): return 1 / (1 + np.exp(-x))
def relu(x): return np.maximum(0, x)
def tanh(x): return np.tanh(x)

fig, axes = plt.subplots(1, 3, figsize=(12, 4))
fig.patch.set_facecolor('#0d0d14')

activations = [
    (sigmoid(x), 'Sigmoid', axes[0]),
    (relu(x), 'ReLU', axes[1]),
    (tanh(x), 'Tanh', axes[2])
]

for y, title, ax in activations:
    ax.set_facecolor('#0d0d14')
    ax.plot(x, y, color='#8b5cf6', linewidth=2)
    ax.set_title(title, color='white', fontsize=11)
    ax.set_xlabel('x', color='#94a3b8')
    ax.set_ylabel('f(x)', color='#94a3b8')
    ax.grid(True, alpha=0.2, color='#1e293b')
    ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()

# Simple neural network example
print("\\n=== Simple Neural Network (2 → 3 → 1) ===")
X = np.array([[0.5, 0.3], [0.2, 0.8]])  # 2 samples, 2 features

# Layer 1: 2 features → 3 neurons
W1 = np.random.randn(2, 3) * 0.5
b1 = np.zeros(3)
z1 = X @ W1 + b1
a1 = np.maximum(0, z1)  # ReLU

# Layer 2: 3 neurons → 1 output
W2 = np.random.randn(3, 1) * 0.5
b2 = np.zeros(1)
z2 = a1 @ W2 + b2
output = sigmoid(z2)  # Sigmoid for probability

print(f"Input shape: {X.shape}")
print(f"After Layer 1 (ReLU): {a1.shape}")
print(f"Output (Sigmoid): {output.shape}")
print(f"Predictions: {output.flatten()}")
`,
        },
      ],
    },
    {
      id: "adv-model-deployment",
      moduleId: "advanced-ml",
      lessonNumber: 13,
      title: "Model Deployment & Production",
      description: "Turn trained models into APIs. Learn Flask, Docker, and serving predictions at scale.",
      duration: "28 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "From Notebook to Production",
          content: `# Model Deployment

## The ML Pipeline (Production)

\`\`\`
1. Training (Jupyter Notebook)
   ↓
2. Serialize Model (Save to file)
   ↓
3. Load Model in API (Flask/FastAPI)
   ↓
4. Accept HTTP Requests
   ↓
5. Preprocess Input Data
   ↓
6. Make Prediction
   ↓
7. Return JSON Response
   ↓
8. Monitor & Retrain (if performance drops)
\`\`\`

## Saving Models

### Pickle (General Python Objects)
\`\`\`python
import pickle

# Save
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

# Load
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)
\`\`\`

### Joblib (Large NumPy Arrays)
\`\`\`python
import joblib

# Save
joblib.dump(model, 'model.joblib')

# Load
model = joblib.load('model.joblib')
\`\`\`

## Creating an API with Flask

\`\`\`python
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load('model.joblib')
scaler = joblib.load('scaler.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['features']  # e.g., [[5.1, 3.5, 1.4, 0.2]]
    
    # Preprocess
    data_scaled = scaler.transform(data)
    
    # Predict
    pred = model.predict(data_scaled)
    
    # Return
    return jsonify({'prediction': int(pred[0])})

if __name__ == '__main__':
    app.run(port=5000)
\`\`\`

## Containerization with Docker

\`\`\`dockerfile
FROM python:3.9
WORKDIR /app
COPY model.joblib .
COPY app.py .
RUN pip install flask scikit-learn
EXPOSE 5000
CMD ["python", "app.py"]
\`\`\`

Build and run:
\`\`\`bash
docker build -t my-ml-api .
docker run -p 5000:5000 my-ml-api
\`\`\`

## Deployment Platforms

| Platform | Best For | Cost |
|----------|----------|------|
| Heroku | Hobby projects | Free-$50/month |
| AWS Lambda | Serverless, low traffic | Pay-per-request |
| Google Cloud | High traffic | Flexible |
| Azure | Enterprise | Enterprise pricing |

## Production Considerations

1. **Input validation:** Reject bad inputs
2. **Monitoring:** Track prediction accuracy, latency
3. **Logging:** Save all requests for debugging
4. **Caching:** Store recent predictions
5. **A/B testing:** Compare old vs new model
6. **Retraining:** Schedule automatic retraining
`,
          starterCode: `# Example: Simple Flask API
import json
import joblib
import numpy as np

print("=== Building a Production ML API ===")
print("""
Step 1: Train and save model
---------------------------------
from sklearn.ensemble import RandomForestClassifier
import joblib

model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save model and scaler
joblib.dump(model, 'model.joblib')
joblib.dump(scaler, 'scaler.joblib')

Step 2: Create Flask API
---------------------------------
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load('model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    features = request.json['features']
    prediction = model.predict([features])[0]
    return jsonify({'prediction': int(prediction)})

if __name__ == '__main__':
    app.run(debug=True)

Step 3: Test the API
---------------------------------
import requests

response = requests.post('http://localhost:5000/predict',
                         json={'features': [5.1, 3.5, 1.4, 0.2]})
print(response.json())  # {'prediction': 0}

Step 4: Containerize with Docker
---------------------------------
See Dockerfile above

Step 5: Deploy to cloud
---------------------------------
# Deploy to Heroku
git push heroku main
""")
`,
        },
      ],
    },
    {
      id: "adv-model-monitoring",
      moduleId: "advanced-ml",
      lessonNumber: 14,
      title: "Model Monitoring & Drift Detection",
      description: "Detect when models degrade and trigger retraining.",
      duration: "20 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "The Concept Drift Problem",
          content: `# Model Monitoring & Drift Detection

## The Problem: Concept Drift
A model trained on 2022 data performs poorly on 2024 data because:
1. **Data Distribution Shift:** Feature distributions change (e.g., customer income increases over time)
2. **Concept Drift:** The relationship between features and target changes (e.g., email spam patterns evolve)
3. **Feature Drift:** New features become important, old ones become useless

## Real-World Example: Credit Risk
- **2019 Model:** "People with income >$50K are low risk"
- **2024 Reality:** Inflation made $50K less meaningful; model accuracy drops from 92% to 78%

## Monitoring Metrics

### 1. Prediction Distribution
Compare training vs production predictions:
- **Training:** 60% Class 0, 40% Class 1
- **Production (Month 6):** 20% Class 0, 80% Class 1
→ **Alert!** Distribution changed drastically

### 2. Feature Distributions
Monitor each feature's distribution:
- If mean age shifts from 35 to 45, alert
- If credit score variance increases 10x, alert

### 3. Model Accuracy (Ground Truth Required)
Keep collecting true labels in production:
- If accuracy drops >5% for a week, retrain

### 4. Prediction Latency
- If API response time increases, data quality issues might exist

## Implementation

\`\`\`python
from sklearn.metrics import accuracy_score
import json

# In production
def monitor_model(y_true, y_pred):
    acc = accuracy_score(y_true, y_pred)
    
    if acc < threshold:
        alert("Model accuracy below threshold!")
        log_event("retrain_needed")
    
    # Log metrics
    with open('metrics.json', 'a') as f:
        json.dump({'date': now, 'accuracy': acc}, f)
\`\`\`

## Retraining Strategies

### Strategy 1: Fixed Schedule
Retrain every week, every month
- Pros: Simple, predictable
- Cons: Might retrain too often or too late

### Strategy 2: Trigger-Based
Retrain when accuracy drops below threshold
- Pros: Responds to actual drift
- Cons: Requires ground truth labels

### Strategy 3: Hybrid
Schedule check every week. If accuracy drops >5%, immediately retrain
`,
          starterCode: `import numpy as np
import json
from datetime import datetime

print("=== Model Monitoring Example ===")

# Simulated production predictions over time
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
accuracies = [0.92, 0.91, 0.89, 0.85, 0.78, 0.72]  # Concept drift!
pred_distributions = [
    {'class_0': 0.6, 'class_1': 0.4},
    {'class_0': 0.58, 'class_1': 0.42},
    {'class_0': 0.55, 'class_1': 0.45},
    {'class_0': 0.50, 'class_1': 0.50},
    {'class_0': 0.40, 'class_1': 0.60},
    {'class_0': 0.30, 'class_1': 0.70},  # Significant shift!
]

print("\\n=== Model Performance Over Time ===")
threshold = 0.80
for month, acc, dist in zip(months, accuracies, pred_distributions):
    status = "🔴 RETRAIN" if acc < threshold else "✓ OK"
    print(f"{month}: Accuracy={acc:.2f} {status} | Class 0: {dist['class_0']:.0%}")

print(f"\\nThreshold: {threshold:.0%}")
print("\\nMonitoring Rules:")
print("  1. If accuracy < 80%: ALERT and trigger retraining")
print("  2. If distribution shift > 10%: ALERT for data issues")
print("  3. Log all metrics for audit trail")

# Log to file
metrics_log = [
    {'month': m, 'accuracy': a, 'distribution': d}
    for m, a, d in zip(months, accuracies, pred_distributions)
]

with open('model_metrics.json', 'w') as f:
    json.dump(metrics_log, f, indent=2)

print("\\n✓ Metrics logged to model_metrics.json")
`,
        },
      ],
    },
    {
      id: "adv-ethics-fairness",
      moduleId: "advanced-ml",
      lessonNumber: 15,
      title: "ML Ethics & Fairness",
      description: "Detect and mitigate bias. Build fair, transparent ML systems.",
      duration: "25 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Bias in Machine Learning",
          content: `# ML Ethics & Fairness

## Types of Bias

### 1. Data Bias
Training data doesn't represent the real population.
- Example: Loan approval model trained only on white applicants → Biased against minorities
- Fix: Ensure balanced representation in training data

### 2. Algorithmic Bias
The algorithm itself is biased.
- Example: Using ZIP code as feature (proxy for race) → Redlining
- Fix: Remove protected attributes (race, gender, age)

### 3. Historical Bias
If the past was unfair, the model learns unfairness.
- Example: Hiring model trained on previous unfair hiring decisions
- Fix: Clean the labels or retrain with fair labels

## Fairness Definitions

### Statistical Parity
Equal positive prediction rate across groups.
\`\`\`
P(predict=1 | Group A) = P(predict=1 | Group B)
\`\`\`

### Equalized Odds
Equal True Positive Rate and False Positive Rate.
- Everyone has equal chance of being caught (TP rate)
- Everyone has equal false alarm rate (FP rate)

### Demographic Parity
Prediction should be independent of protected attribute.

## Detecting Bias

\`\`\`python
from sklearn.metrics import confusion_matrix

# Check metrics by group
for group in ['Male', 'Female']:
    y_true_group = y_true[gender == group]
    y_pred_group = y_pred[gender == group]
    
    acc = accuracy_score(y_true_group, y_pred_group)
    # If accuracy_male >> accuracy_female, bias detected!
\`\`\`

## Mitigating Bias

### Pre-processing
Clean training data before training:
- Remove protected attributes
- Balance representation
- Audit for proxy variables

### In-processing
Modify algorithm during training:
- Fairness constraints in objective function
- Different regularization by group

### Post-processing
Adjust predictions after training:
- Change threshold by group
- Example: If females have lower approval rate, lower threshold for females

## Real-World Consequences

### COMPAS Recidivism Score
Algorithm used to predict prisoner reoffending showed bias against Black Americans.
- False positive rate for Black defendants: 45%
- False positive rate for white defendants: 23%

### Amazon Hiring ML
Trained on historical data where males were hired more.
- Model learned to prefer male applicants
- System scrapped after discovery

### Loan Approval
Denying loans based on ZIP code (proxy for race) = Illegal (Redlining)
`,
          starterCode: `import numpy as np
import pandas as pd
from sklearn.metrics import accuracy_score, precision_score, recall_score

print("=== Detecting Bias in Model Predictions ===")

# Simulated predictions for loan approval
np.random.seed(42)
n_applicants = 1000

# Scenario: Historical bias in training data
# Males: 60% approval, Females: 40% approval
data = pd.DataFrame({
    'gender': np.random.choice(['Male', 'Female'], n_applicants, p=[0.5, 0.5]),
    'income': np.random.uniform(20000, 150000, n_applicants),
    'credit_score': np.random.uniform(300, 850, n_applicants)
})

# Biased labels (based on gender)
data['approved'] = (
    (data['income'] > 60000) & 
    (data['credit_score'] > 650) &
    ((data['gender'] == 'Male') | (np.random.rand(n_applicants) > 0.3))  # Males more likely
)

# Train model (will learn the bias)
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=10, random_state=42)
X = data[['income', 'credit_score']].values
y = data['approved'].values
model.fit(X, y)
data['pred'] = model.predict(X)

print("\\n=== Performance by Gender (BIAS DETECTED) ===")
for gender in ['Male', 'Female']:
    mask = data['gender'] == gender
    y_true = data[mask]['approved']
    y_pred = data[mask]['pred']
    
    acc = accuracy_score(y_true, y_pred)
    approved_rate = y_pred.mean()
    
    print(f"\\n{gender}:")
    print(f"  Accuracy: {acc:.1%}")
    print(f"  Approval rate: {approved_rate:.1%}")

print("\\nNotice: Males approved at higher rate despite similar income/credit!")

# Fix: Separate thresholds
print("\\n=== After Mitigation (Adjusting Thresholds) ===")
proba = model.predict_proba(X)[:, 1]

# Lower threshold for females (more approvals)
data['pred_fair'] = (
    ((data['gender'] == 'Male') & (proba >= 0.5)) |
    ((data['gender'] == 'Female') & (proba >= 0.4))  # Lower threshold
).astype(int)

for gender in ['Male', 'Female']:
    mask = data['gender'] == gender
    approved_rate = data[mask]['pred_fair'].mean()
    print(f"{gender}: Approval rate = {approved_rate:.1%}")
`,
        },
      ],
    },
    {
      id: "adv-time-series",
      moduleId: "advanced-ml",
      lessonNumber: 16,
      title: "Time Series Basics",
      description: "Forecast trends with ARIMA, seasonal decomposition, and LSTM networks.",
      duration: "30 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Unique Challenges of Time Series",
          content: `# Time Series Basics

## What Makes Time Series Different?

Standard ML assumes **independence:** Each row is independent.
Time Series has **temporal dependence:** Today's value depends on yesterday's.

### Examples:
- Stock prices: Tomorrow's price influenced by today's
- Weather: Tomorrow's temp influenced by seasonal patterns
- Website traffic: Spikes during work hours, dips at night

## Autocorrelation

A variable's correlation with its past values.
- **AC at lag-1:** Correlation with 1-day-old value
- **AC at lag-7:** Correlation with 7-day-old value (weekly pattern)

If AC(lag-7) is high, clear weekly seasonality exists!

## Stationarity (Critical!)

A series is **stationary** if its mean, variance, and autocorrelation don't change over time.

### Stationary Series ✓
Mean = constant, variance = constant
- Example: Deviations from a trend (after differencing)

### Non-Stationary Series ✗
Mean or variance changes over time (trend or seasonality)
- Example: Stock price (always going up/down)

### Why it Matters:
Most models (ARIMA) require stationarity!
If non-stationary, **difference** the series:
\`\`\`python
differenced = series - series.shift(1)
# Now series is stationary
\`\`\`

## Components of Time Series

\`\`\`
Observed = Trend + Seasonal + Residual

Trend: Long-term direction (up/down)
Seasonal: Repeating patterns (daily, weekly, yearly)
Residual: Noise (random fluctuations)
\`\`\`

## Forecasting Approaches

### ARIMA (for univariate stationary series)
\`\`\`
AR: Use past values (autoregression)
I: Differencing for stationarity (integration)
MA: Use past errors (moving average)

ARIMA(p, d, q)
p = AR order (how many past values)
d = differencing (how many times to difference)
q = MA order (how many past errors)
\`\`\`

### LSTM (for complex, non-linear patterns)
Recurrent Neural Networks remember long-term patterns.
- Pros: Handles non-linear, seasonality, trends automatically
- Cons: Needs lots of data (1000+ samples)

### Prophet (by Facebook)
Decompose + model each component separately.
- Pros: Intuitive, handles missing data, built-in holidays
- Cons: Less flexible than ARIMA/LSTM
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64

# Generate synthetic time series
np.random.seed(42)
t = np.arange(365)
trend = t * 0.5
seasonal = 20 * np.sin(2 * np.pi * t / 365)  # Yearly pattern
noise = np.random.randn(365) * 2
series = 100 + trend + seasonal + noise

fig, axes = plt.subplots(2, 2, figsize=(12, 8))
fig.patch.set_facecolor('#0d0d14')

# 1. Original Series
ax = axes[0, 0]
ax.set_facecolor('#0d0d14')
ax.plot(series, color='#8b5cf6', linewidth=1.5)
ax.set_title('Original Time Series', color='white', fontsize=11)
ax.set_ylabel('Value', color='#94a3b8')
ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')

# 2. Trend Component
ax = axes[0, 1]
ax.set_facecolor('#0d0d14')
ax.plot(100 + trend, color='#f43f5e', linewidth=2)
ax.set_title('Trend (Long-term direction)', color='white', fontsize=11)
ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')

# 3. Seasonal Component
ax = axes[1, 0]
ax.set_facecolor('#0d0d14')
ax.plot(seasonal, color='#10b981', linewidth=1.5)
ax.set_title('Seasonal (Repeating patterns)', color='white', fontsize=11)
ax.set_ylabel('Value', color='#94a3b8')
ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')

# 4. ACF (Autocorrelation)
from pandas.plotting import autocorrelation_plot
ax = axes[1, 1]
ax.set_facecolor('#0d0d14')
autocorrelation_plot(series, ax=ax)
ax.set_title('Autocorrelation Function', color='white', fontsize=11)
ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()

print("Time series components decomposed!")
print(f"Trend range: {trend.min():.1f} to {trend.max():.1f}")
print(f"Seasonal amplitude: ±{seasonal.std():.1f}")
print(f"Noise std: {noise.std():.1f}")
`,
        },
      ],
    },
    {
      id: "adv-causal-inference",
      moduleId: "advanced-ml",
      lessonNumber: 17,
      title: "Causal Inference & A/B Testing",
      description: "Distinguish correlation from causation. Design and analyze A/B tests correctly.",
      duration: "28 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Correlation ≠ Causation",
          content: `# Causal Inference & A/B Testing

## The Fundamental Problem

**Correlation:** A and B move together
**Causation:** A causes B

### Classic Examples of Spurious Correlation:
- Ice cream sales ↔ Drowning deaths (both increase in summer)
- Shoe size ↔ Reading ability (both increase with age)
- Nicolas Cage movies ↔ Swimming pool drownings per year (actually correlated!)

## Observational Data vs Experiments

### Observational Data (Correlational)
\`\`\`
"Users who clicked the blue button → Higher conversion"
Question: Does blue cause higher conversion, or do engaged users click blue buttons?
Answer: We don't know (confounding variables)!
\`\`\`

### Randomized Controlled Trial (RCT / A/B Test)
\`\`\`
1. Randomly assign users to 2 groups
2. Show BLUE button to Group A
3. Show RED button to Group B
4. Measure conversions
5. If Group A > Group B → BLUE causes higher conversion
\`\`\`

Why randomization works:
- Removes confounding variables (age, income, etc. distributed equally)
- Only difference is button color
- Any difference is caused by button color

## Confounding Variables

A variable that affects both your treatment and outcome.

### Example: Shoe Size → Reading Ability

\`\`\`
Reality:
  Age → Shoe Size (bigger shoes for older kids)
  Age → Reading Ability (older kids read better)
  
Apparent: Shoe Size → Reading Ability (correlation)
Actual: Age confounds the relationship
\`\`\`

### Fix: Randomization or Control
- Randomize shoe sizes (kids wear random-sized shoes) → Eliminates age effect
- Or: Measure age and statistically control for it

## A/B Test Design

### Power Analysis (How many users needed?)
With small sample sizes, you might miss real effects (Type II error).

\`\`\`
Conversion rates:
  Control: 2%
  Treatment: 2.5%
  Difference: 0.5 percentage points
  
Sample size needed: ~3,000 users per group
(More precision needed = larger samples)
\`\`\`

### Multiple Comparisons Problem
If you test 20 A/B tests, 5% false positive rate → 1 will be "significant" by chance!

**Fix:** Use Bonferroni correction or False Discovery Rate (FDR)
\`\`\`python
α_corrected = α / number_of_tests
# If 20 tests: use α = 0.05/20 = 0.0025 instead of 0.05
\`\`\`

### Duration & Seasonality
Test must run long enough to capture seasonality.
- Website usage differs weekday vs weekend
- Min duration: 1 week (to capture both)
- Better: 2-4 weeks

## Statistical Significance ≠ Practical Significance
Test might show a button color change improves conversion by 0.01%.
- Statistically significant? (with enough users, yes)
- Practically significant? (worth engineering time, no)

Practical significance = business impact
`,
          starterCode: `import numpy as np
from scipy import stats

print("=== A/B Test Analysis ===\\n")

# Simulated A/B test results
control_conversions = np.random.binomial(n=1, p=0.02, size=5000)  # 2% conversion
treatment_conversions = np.random.binomial(n=1, p=0.025, size=5000)  # 2.5% conversion

control_rate = control_conversions.mean()
treatment_rate = treatment_conversions.mean()
lift = (treatment_rate - control_rate) / control_rate * 100

print(f"Control group (n=5000): {control_rate:.2%} conversion")
print(f"Treatment group (n=5000): {treatment_rate:.2%} conversion")
print(f"Lift: {lift:+.1f}%")

# Chi-square test
contingency_table = np.array([
    [control_conversions.sum(), len(control_conversions) - control_conversions.sum()],
    [treatment_conversions.sum(), len(treatment_conversions) - treatment_conversions.sum()]
])

chi2, p_value = stats.chi2_contingency(contingency_table)[:2]

print(f"\\nChi-square test:")
print(f"  p-value: {p_value:.4f}")
if p_value < 0.05:
    print(f"  ✓ Statistically significant (reject null hypothesis)")
else:
    print(f"  ✗ Not significant (keep null hypothesis)")

# Power analysis
from scipy.stats import norm

def sample_size_for_conversion(p1, p2, alpha=0.05, power=0.8):
    """Calculate sample size needed for A/B test"""
    z_alpha = norm.ppf(1 - alpha/2)
    z_beta = norm.ppf(power)
    p = (p1 + p2) / 2
    n = (z_alpha + z_beta)**2 * (p * (1-p) * 2) / (p1 - p2)**2
    return int(n)

n_needed = sample_size_for_conversion(0.02, 0.025)
print(f"\\nSample size needed (80% power):")
print(f"  For 2% → 2.5% difference: {n_needed:,} users per group")
`,
        },
      ],
    },
    {
      id: "adv-ensemble-voting",
      moduleId: "advanced-ml",
      lessonNumber: 18,
      title: "Model Calibration & Probability Estimates",
      description: "Ensure your probability predictions are trustworthy and well-calibrated.",
      duration: "22 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Why Calibration Matters",
          content: `# Model Calibration

## The Problem: Overconfident Predictions

A logistic regression model predicts:
- "This email is 95% likely spam"
- But in practice, 95% of emails it marks as spam are actually spam? NO — maybe only 80% are!

This model is **miscalibrated** (overconfident).

## Well-Calibrated vs Miscalibrated

### Well-Calibrated Model
- Predicts 0.7 probability → 70% of those samples are actually positive
- Predicts 0.5 probability → 50% of those samples are actually positive
- **Reliability diagram:** Points lie on diagonal

### Miscalibrated Model (Overconfident)
- Predicts 0.9 probability → Only 70% are actually positive
- Predictions too extreme (too close to 0 or 1)

## Reliability Diagram
Plot predicted probability vs actual frequency:
1. Bin predictions into 10 buckets (0-10%, 10-20%, ... 90-100%)
2. For each bucket, calculate actual positive rate
3. Plot predicted vs actual
4. If on diagonal (y=x) → Well-calibrated
5. If above diagonal → Underconfident
6. If below diagonal → Overconfident

## Calibration Methods

### 1. Platt Scaling (Simple)
Fit a logistic regression on model outputs:
\`\`\`python
from sklearn.calibration import CalibratedClassifierCV

calibrated = CalibratedClassifierCV(model, method='sigmoid', cv=5)
calibrated.fit(X_train, y_train)
proba_calibrated = calibrated.predict_proba(X_test)
\`\`\`

### 2. Isotonic Regression (Flexible)
Map any probabilities to calibrated probabilities (more flexible than Platt).
\`\`\`python
calibrated = CalibratedClassifierCV(model, method='isotonic', cv=5)
\`\`\`

### 3. Temperature Scaling (Neural Networks)
Scale confidence by learning a temperature parameter.
\`\`\`python
proba_scaled = softmax(logits / temperature)
# temperature < 1: More confident
# temperature > 1: Less confident
\`\`\`

## Why Some Models are Miscalibrated

| Model | Calibration |
|-------|-------------|
| Logistic Regression | Good (by design) |
| Neural Networks | Poor (overconfident) |
| Tree Models (RF, XGBoost) | Poor (extreme probabilities) |
| SVM | Very Poor |
| Naive Bayes | Generally Good |

### Why NNs are Overconfident:
Deep learning models are trained to minimize loss, not to be calibrated.
They output extreme probabilities (0.01, 0.99) because that minimizes loss faster.
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.calibration import CalibratedClassifierCV

# Create data
X, y = make_classification(n_samples=1000, n_features=10, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train uncalibrated model
model = RandomForestClassifier(n_estimators=50, random_state=42)
model.fit(X_train, y_train)
proba_uncal = model.predict_proba(X_test)[:, 1]

# Calibrate
calibrated = CalibratedClassifierCV(model, method='isotonic', cv=5)
calibrated.fit(X_train, y_train)
proba_cal = calibrated.predict_proba(X_test)[:, 1]

# Reliability diagram
def reliability_diagram(y_true, y_proba, ax, title):
    n_bins = 10
    bins = np.linspace(0, 1, n_bins + 1)
    bin_centers = (bins[:-1] + bins[1:]) / 2
    bin_sums = np.zeros(n_bins)
    bin_true = np.zeros(n_bins)
    bin_total = np.zeros(n_bins)

    for i in range(len(y_true)):
        bin_idx = np.digitize(y_proba[i], bins) - 1
        if 0 <= bin_idx < n_bins:
            bin_total[bin_idx] += 1
            bin_true[bin_idx] += y_true[i]
            bin_sums[bin_idx] += y_proba[i]

    bin_true = np.divide(bin_true, bin_total, where=(bin_total > 0), out=np.zeros_like(bin_total))
    bin_sums = np.divide(bin_sums, bin_total, where=(bin_total > 0), out=np.zeros_like(bin_sums))

    ax.set_facecolor('#0d0d14')
    ax.plot([0, 1], [0, 1], 'k--', color='#334155', linewidth=1, label='Perfect Calibration')
    ax.plot(bin_sums[bin_total > 0], bin_true[bin_total > 0], 'o-', color='#8b5cf6', linewidth=2, markersize=8, label='Model')
    ax.set_xlabel('Predicted Probability', color='#94a3b8')
    ax.set_ylabel('Actual Positive Rate', color='#94a3b8')
    ax.set_title(title, color='white', fontsize=11)
    ax.set_xlim([0, 1])
    ax.set_ylim([0, 1])
    ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')
    ax.legend(labelcolor='white', loc='lower right')

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
fig.patch.set_facecolor('#0d0d14')

reliability_diagram(y_test, proba_uncal, ax1, 'Uncalibrated (Overconfident)')
reliability_diagram(y_test, proba_cal, ax2, 'Calibrated (Isotonic Regression)')

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()

print("Calibration comparison shown!")
`,
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// MODULE 7 — Deep Learning & Neural Networks
// ─────────────────────────────────────────────────────────────
const deepLearningModule: Module = {
  id: "deep-learning",
  title: "Deep Learning & Neural Networks",
  slug: "deep-learning",
  description:
    "Master deep learning from neurons to transformers. 18 comprehensive lessons covering neural network fundamentals, CNNs, RNNs, LSTMs, GRUs, GANs, attention mechanisms, and production deployment.",
  introduction: `# Welcome to Deep Learning 🧠

## What is Deep Learning?

Deep Learning uses neural networks with multiple layers to learn complex patterns in data:

- **Image Recognition** — Identify objects, faces, medical conditions
- **Natural Language Processing** — Understand text, translation, Q&A
- **Speech Recognition** — Convert audio to text
- **Autonomous Systems** — Self-driving cars, robotics
- **Game Playing** — AlphaGo defeated world champion Go players

**Deep Learning powers the AI revolution.**

## Why Deep Learning?

Traditional ML has limits:
- **Manual feature engineering** — Experts design features
- **Shallow models** — Only 1-2 hidden layers
- **Unstructured data** — Struggles with images, text, audio

Deep Learning:
- **Automatic feature learning** — Network learns from raw data
- **Deep architectures** — 10-1000+ layers
- **Unstructured data** — Native support for images, sequences, graphs

## The Deep Learning Stack

\`\`\`
Neurons (building blocks)
       ↓
Layers (dense, convolutional, recurrent)
       ↓
Neural Networks (MLP, CNN, RNN, LSTM, Transformer)
       ↓
Optimization (SGD, Adam, learning rates)
       ↓
Applications (Vision, NLP, Reinforcement Learning)
\`\`\`

## Prerequisites

✅ Modules 1-5 (Python, NumPy, Pandas, Matplotlib, ML Fundamentals)

Understanding linear algebra and calculus basics helps but isn't required—we'll explain everything!

## What You'll Learn

1. **Neurons & Perceptrons** — The building blocks
2. **Forward & Backpropagation** — How networks learn
3. **Activation Functions** — ReLU, Sigmoid, Tanh, Softmax
4. **Loss Functions & Optimization** — MSE, CrossEntropy, Adam, SGD
5. **Weight Initialization** — Xavier, He initialization
6. **Regularization & Dropout** — Prevent overfitting
7. **Text Preprocessing & Tokenization** — Clean text data
8. **Word Embeddings & Word2Vec** — Vector representations
9. **Convolutional Neural Networks (CNN)** — Image processing
10. **Recurrent Neural Networks (RNN)** — Sequence learning
11. **Long Short-Term Memory (LSTM)** — Remember long sequences
12. **Gated Recurrent Units (GRU)** — Efficient alternative to LSTM
13. **Attention Mechanisms** — Focus on relevant parts
14. **Transformers** — The architecture behind GPT, BERT
15. **Generative Adversarial Networks (GANs)** — Create synthetic data
16. **Batch Normalization & Advanced Techniques** — Improve training
17. **Transfer Learning** — Reuse pre-trained models
18. **Deployment & Production** — Deploy neural networks safely

By the end, you'll understand how ChatGPT, image recognition, and modern AI systems work! 🚀`,
  icon: "🧠",
  color: "from-cyan-600 to-teal-900",
  level: "Advanced",
  totalDuration: "5h 2min",
  heroImage:
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
  lessons: [
    {
      id: "dl-neurons",
      moduleId: "deep-learning",
      lessonNumber: 1,
      title: "Neurons & Perceptrons — Building Blocks",
      description: "Understand the biological inspiration behind artificial neurons and how they compute.",
      duration: "25 min",
      difficulty: "Beginner",
      pages: [
        {
          pageNumber: 1,
          title: "The Biological Neuron",
          content: `# Neurons & Perceptrons

## What is a Neural Network?

A **neural network** is a computational model loosely inspired by the structure of the human brain. It consists of layers of interconnected processing units called **neurons** (or nodes), each of which receives numerical inputs, applies a weighted transformation, and passes the result through a non-linear *activation function*. By stacking many such layers and training on data, a neural network can learn arbitrarily complex mappings from inputs to outputs — without being explicitly programmed with rules.

The simplest neural network unit is the **perceptron**, proposed by Frank Rosenblatt in 1958. Understanding the perceptron is the foundation for everything in deep learning.

## The Biological Inspiration

Your brain has ~86 billion neurons. Each receives signals, processes them, and fires a signal to other neurons.

\`\`\`
Dendrites (inputs) → Cell Body (process) → Axon (output) → Synapses (to other neurons)
\`\`\`

**The Artificial Neuron mimics this:**
- **Inputs:** Multiple values (x₁, x₂, x₃, ...)
- **Weights:** Strength of each connection (w₁, w₂, w₃, ...)
- **Bias:** Threshold to fire (b)
- **Activation:** Fire or not based on computation
- **Output:** Single value

## The Perceptron Formula

\`\`\`
output = activation(w₁×x₁ + w₂×x₂ + w₃×x₃ + ... + b)
\`\`\`

**In matrix form:**
\`\`\`
output = activation(w·x + b)
\`\`\`

Where:
- **w** = weight vector (parameters the network learns)
- **x** = input vector
- **b** = bias term
- **activation** = non-linear function (ReLU, Sigmoid, etc.)

## Example: Credit Card Approval

Inputs:
- Income (x₁)
- Credit score (x₂)
- Years employed (x₃)

Weights (learned from past data):
- Income: w₁ = 0.003 (higher income = more likely approved)
- Credit score: w₂ = 0.02 (higher score = more likely approved)
- Years employed: w₃ = 0.5 (longer employment = more likely approved)

Bias: b = -2 (need strong signals to approve)

\`\`\`
z = 0.003×50000 + 0.02×750 + 0.5×5 - 2
z = 150 + 15 + 2.5 - 2 = 165.5

If activation(165.5) > 0.5: APPROVE
Else: REJECT
\`\`\`

## Why Non-Linear Activation?

\`\`\`python
# Without activation (linear)
y = w·x + b

# This is just a line! Can only model linear relationships.
# Multiple layers of lines = still just a line (linear combination of linear = linear)

# With activation (non-linear)
y = ReLU(w·x + b)
y = max(0, w·x + b)

# Now we can model any function! (universal approximation theorem)
\`\`\`

This is why **activation functions are crucial**.
`,
          starterCode: `import numpy as np

# Simple neuron: single output
class Neuron:
    def __init__(self, n_inputs):
        # Initialize weights randomly, bias to zero
        self.weights = np.random.randn(n_inputs) * 0.01
        self.bias = 0.0
    
    def forward(self, inputs):
        # z = w·x + b
        z = np.dot(self.weights, inputs) + self.bias
        # activation = ReLU(z)
        output = max(0, z)
        return output

# Create a neuron with 3 inputs
neuron = Neuron(n_inputs=3)

# Test with sample input
income = 50000 / 100000      # Normalize to 0-1
credit_score = 750 / 850     # Normalize
years_employed = 5           # Already 0-50 scale

x = np.array([income, credit_score, years_employed])
print(f"Input: {x}")
print(f"Weights: {neuron.weights}")
print(f"Bias: {neuron.bias}")

output = neuron.forward(x)
print(f"\\nNeuron output: {output:.4f}")

# Change weights manually to show effect
neuron.weights = np.array([0.5, 0.8, 0.3])
neuron.bias = 0.1
output_new = neuron.forward(x)
print(f"With new weights: {output_new:.4f}")
`,
        },
        {
          pageNumber: 2,
          title: "Activation Functions",
          content: `## Activation Functions (Non-Linearity)

Activation functions introduce non-linearity, allowing networks to learn complex patterns.

### ReLU (Rectified Linear Unit) — Most Popular

\`\`\`
f(z) = max(0, z)
\`\`\`

**Advantages:**
- Computationally efficient
- Works great in practice
- Sparse activation (many zeros)

**Disadvantage:**
- Dead neurons (if w, b cause z < 0 always, neuron stops learning)

### Sigmoid — Classic but Outdated

\`\`\`
f(z) = 1 / (1 + e^(-z))
\`\`\`

Output range: (0, 1)

**Why it was used:**
- Smooth, differentiable
- Output interpretable as probability

**Why we moved away:**
- Vanishing gradients (near 0 or 1, gradient ≈ 0, hard to learn)
- Slower than ReLU

### Tanh — Improved Sigmoid

\`\`\`
f(z) = (e^z - e^(-z)) / (e^z + e^(-z))
\`\`\`

Output range: (-1, 1)

**Better than Sigmoid** but still slower than ReLU.

### Softmax — Multi-class Classification

\`\`\`
f(zᵢ) = e^(zᵢ) / Σⱼ e^(zⱼ)
\`\`\`

Converts raw scores to probabilities (sum to 1).

**Example:**
- Raw output: [2.0, 1.0, 0.1]
- After softmax: [0.7, 0.2, 0.1] ← probabilities!

## When to Use

| Task | Last Layer | Hidden Layers |
|------|-----------|---------------|
| Binary Classification | Sigmoid | ReLU |
| Multi-class | Softmax | ReLU |
| Regression | Linear | ReLU |
| Sequences | Sigmoid/Tanh | ReLU |

> **Modern best practice:** Use ReLU in hidden layers, specific activation for output.
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64

# Define activation functions
def relu(z):
    return np.maximum(0, z)

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def tanh(z):
    return np.tanh(z)

def softmax(z):
    exp_z = np.exp(z - np.max(z))  # Numerical stability
    return exp_z / exp_z.sum()

# Create range of inputs
z = np.linspace(-3, 3, 100)

# Plot activations
fig, axes = plt.subplots(2, 2, figsize=(10, 8))
fig.patch.set_facecolor('#0d0d14')

# ReLU
ax = axes[0, 0]
ax.set_facecolor('#0d0d14')
ax.plot(z, relu(z), 'b-', linewidth=2, label='ReLU')
ax.axhline(y=0, color='gray', linestyle='--', alpha=0.3)
ax.axvline(x=0, color='gray', linestyle='--', alpha=0.3)
ax.set_title('ReLU (Fast, Modern)', color='white', fontsize=10)
ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')
ax.legend(labelcolor='white', loc='upper left', fontsize=8)

# Sigmoid
ax = axes[0, 1]
ax.set_facecolor('#0d0d14')
ax.plot(z, sigmoid(z), 'r-', linewidth=2, label='Sigmoid')
ax.axhline(y=0.5, color='gray', linestyle='--', alpha=0.3)
ax.set_title('Sigmoid (Classic, Slow)', color='white', fontsize=10)
ax.set_ylim(-0.1, 1.1)
ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')
ax.legend(labelcolor='white', loc='upper left', fontsize=8)

# Tanh
ax = axes[1, 0]
ax.set_facecolor('#0d0d14')
ax.plot(z, tanh(z), 'g-', linewidth=2, label='Tanh')
ax.axhline(y=0, color='gray', linestyle='--', alpha=0.3)
ax.axvline(x=0, color='gray', linestyle='--', alpha=0.3)
ax.set_title('Tanh (Improved Sigmoid)', color='white', fontsize=10)
ax.set_ylim(-1.1, 1.1)
ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')
ax.legend(labelcolor='white', loc='upper left', fontsize=8)

# Softmax example
ax = axes[1, 1]
ax.set_facecolor('#0d0d14')
raw = np.array([2.0, 1.0, 0.1])
probs = softmax(raw)
colors = ['#8b5cf6', '#f43f5e', '#10b981']
bars = ax.bar(['Class 0', 'Class 1', 'Class 2'], probs, color=colors, alpha=0.7)
ax.set_title('Softmax (Multi-class)', color='white', fontsize=10)
ax.set_ylim(0, 1)
ax.tick_params(colors='#94a3b8'); ax.spines[:].set_color('#1e293b')
for i, bar in enumerate(bars):
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2., height,
            f'{probs[i]:.2f}', ha='center', va='bottom', color='white', fontsize=8)

for spine in ax.spines.values():
    spine.set_color('#1e293b')

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()

# Test softmax
print("\\n=== Softmax Example ===")
raw_scores = np.array([2.0, 1.0, 0.1])
probs = softmax(raw_scores)
print(f"Raw scores: {raw_scores}")
print(f"Probabilities: {probs}")
print(f"Sum of probs: {probs.sum():.4f} (should be 1.0)")
`,
        },
      ],
    },
    {
      id: "dl-forward-backprop",
      moduleId: "deep-learning",
      lessonNumber: 2,
      title: "Forward & Backpropagation — How Networks Learn",
      description: "Understand the forward pass and backpropagation algorithm that trains neural networks.",
      duration: "28 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Forward Propagation",
          content: `# Forward & Backpropagation

## Forward Pass (Prediction)

The forward pass moves data through the network, layer by layer:

\`\`\`
Input → Layer1 → Layer2 → Layer3 → Output
\`\`\`

### Example: 3-Layer Network

**Architecture:**
- Input layer: 3 neurons
- Hidden layer 1: 4 neurons
- Hidden layer 2: 2 neurons
- Output layer: 1 neuron

**Forward Pass:**

\`\`\`
1. Input: x = [0.5, 0.2, 0.8]

2. Layer 1:
   z1 = W1 · x + b1  (matrix multiplication)
   a1 = ReLU(z1)     (activation)
   
3. Layer 2:
   z2 = W2 · a1 + b2
   a2 = ReLU(z2)
   
4. Output:
   z3 = W3 · a2 + b3
   output = sigmoid(z3)
   
5. Prediction: output = 0.73
\`\`\`

## Vectorization

In practice, we process **batches** of samples at once:

\`\`\`python
# Single sample (slow)
for sample in dataset:
    output = forward(sample)

# Batch (fast, what GPUs do)
outputs = forward(batch_of_samples)  # All at once!
\`\`\`

Why? GPUs are designed for matrix operations.

## Loss Function

After forward pass, calculate how wrong we are:

\`\`\`
Loss = measure of how far prediction is from truth

For binary classification:
Loss = -y×log(ŷ) - (1-y)×log(1-ŷ)    ← Cross-entropy

For regression:
Loss = (y - ŷ)²                       ← Mean squared error
\`\`\`

**Goal:** Minimize loss by adjusting weights.
`,
          starterCode: `import numpy as np

# Simple 2-layer network
class SimpleNN:
    def __init__(self):
        # Layer 1: 3 inputs → 4 hidden
        self.W1 = np.random.randn(4, 3) * 0.01
        self.b1 = np.zeros((4, 1))
        
        # Layer 2: 4 hidden → 1 output
        self.W2 = np.random.randn(1, 4) * 0.01
        self.b2 = np.zeros((1, 1))
    
    def relu(self, z):
        return np.maximum(0, z)
    
    def sigmoid(self, z):
        return 1 / (1 + np.exp(-np.clip(z, -500, 500)))
    
    def forward(self, X):
        # X shape: (n_samples, 3)
        # Layer 1
        self.z1 = np.dot(X, self.W1.T) + self.b1.T
        self.a1 = self.relu(self.z1)
        
        # Layer 2
        self.z2 = np.dot(self.a1, self.W2.T) + self.b2.T
        self.a2 = self.sigmoid(self.z2)
        
        return self.a2
    
    def compute_loss(self, y_true, y_pred):
        # Cross-entropy loss
        epsilon = 1e-7
        loss = -np.mean(y_true * np.log(y_pred + epsilon) + 
                       (1 - y_true) * np.log(1 - y_pred + epsilon))
        return loss

# Test
nn = SimpleNN()
X = np.array([[0.5, 0.2, 0.8],
              [0.1, 0.9, 0.3],
              [0.7, 0.4, 0.6]])

y_true = np.array([[1], [0], [1]])

# Forward pass
predictions = nn.forward(X)
loss = nn.compute_loss(y_true, predictions)

print("=== Forward Pass ===")
print(f"Input shape: {X.shape}")
print(f"Predictions shape: {predictions.shape}")
print(f"Predictions: {predictions.flatten()}")
print(f"Loss: {loss:.4f}")

print("\\n=== Network Weights ===")
print(f"W1 shape: {nn.W1.shape} (4 neurons × 3 inputs)")
print(f"W2 shape: {nn.W2.shape} (1 neuron × 4 hidden)")
`,
        },
        {
          pageNumber: 2,
          title: "Backpropagation & Gradient Descent",
          content: `## Backpropagation (The Learning Algorithm)

**Goal:** Find weights that minimize loss.

**Strategy:** Compute gradients (how much to adjust each weight) and update:

\`\`\`
1. Forward pass: compute loss
2. Backward pass: compute dL/dW for each weight
3. Update: W_new = W_old - learning_rate × dL/dW
\`\`\`

### The Chain Rule (Calculus)

To find dL/dW, use chain rule:

\`\`\`
dL/dW = (dL/da2) × (da2/dz2) × (dz2/dW2)
\`\`\`

Where:
- dL/da2 = how much does loss depend on output?
- da2/dz2 = how much does output depend on pre-activation?
- dz2/dW2 = how much does pre-activation depend on weights?

### Gradient Descent

Update rule:

\`\`\`
W := W - α × ∇W Loss

Where:
- α = learning rate (how big a step to take)
- ∇W = gradient (computed by backprop)
\`\`\`

**Learning rate choices:**
- Too high (α = 1.0): Overshoot, diverge, unstable
- Too low (α = 0.00001): Learn very slowly
- Just right (α = 0.01): Stable, fast learning

### Example Update

\`\`\`
dL/dW1 = 0.05   (gradient for weight 1)
α = 0.01        (learning rate)

W1_old = 0.3
W1_new = 0.3 - 0.01 × 0.05 = 0.3 - 0.0005 = 0.2995

W1 moved slightly in direction to reduce loss!
\`\`\`

## Repeat This Process

\`\`\`
for epoch in range(1000):
    # Forward: compute loss
    predictions = network.forward(X)
    loss = compute_loss(y, predictions)
    
    # Backward: compute gradients
    gradients = network.backward()
    
    # Update: move in negative gradient direction
    network.update_weights(gradients, learning_rate=0.01)
    
    # After 1000 iterations: weights converge to good values!
\`\`\`

This is how all neural networks learn! 🧠
`,
          starterCode: `import numpy as np

# Simulate gradient descent
np.random.seed(42)

# Initial weight
w = np.random.randn() * 0.5

learning_rate = 0.1
losses = []
weights = [w]

print("=== Gradient Descent Visualization ===")
print(f"Initial weight: {w:.4f}\\n")

# Simulate loss function: L = (w - 3)^2  (minimum at w=3)
# dL/dw = 2(w - 3)

for step in range(20):
    # Compute gradient
    gradient = 2 * (w - 3)
    
    # Compute loss
    loss = (w - 3) ** 2
    losses.append(loss)
    
    # Update weight
    w = w - learning_rate * gradient
    weights.append(w)
    
    print(f"Step {step:2d}: w={w:7.4f}, gradient={gradient:7.4f}, loss={loss:.4f}")

print(f"\\nTarget: w=3.0000")
print(f"Final: w={w:.4f} ← Converged!")
print(f"\\nLoss decreased from {losses[0]:.4f} to {losses[-1]:.6f}")
`,
        },
      ],
    },
    {
      id: "dl-optimization",
      moduleId: "deep-learning",
      lessonNumber: 3,
      title: "Loss Functions & Optimization (Adam, SGD)",
      description: "Master loss functions and modern optimizers like Adam that make training faster.",
      duration: "26 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Loss Functions",
          content: `# Loss Functions & Optimization

## Loss Functions (Cost Functions)

A loss function measures how wrong the model is. Different tasks need different losses.

### Binary Classification — Binary Cross-Entropy

\`\`\`
Loss = -[y × log(ŷ) + (1-y) × log(1-ŷ)]
\`\`\`

**Example:**
- True label: y = 1 (positive class)
- Prediction: ŷ = 0.9 (high confidence correct)
- Loss = -[1 × log(0.9) + 0 × ...] ≈ 0.105 ✓ (low)

- True label: y = 1 (positive class)
- Prediction: ŷ = 0.1 (low confidence, wrong)
- Loss = -[1 × log(0.1)] ≈ 2.303 ✗ (high)

**Interpretation:** Loss penalizes wrong, confident predictions most.

### Multi-class Classification — Categorical Cross-Entropy

\`\`\`
Loss = -Σᵢ yᵢ × log(ŷᵢ)
\`\`\`

Used after softmax for 3+ classes.

### Regression — Mean Squared Error (MSE)

\`\`\`
Loss = (1/n) Σ(y - ŷ)²
\`\`\`

**Example:** Predicting house prices
- True: $500k, Predicted: $510k, Error: (500-510)² = 100
- True: $500k, Predicted: $400k, Error: (500-400)² = 10000 ← Much worse!

MSE penalizes large errors more (quadratic).

## Why These Losses?

- **Cross-entropy:** Designed for classification (probabilistic interpretation)
- **MSE:** Designed for regression (continuous values)
- **Custom losses:** Can design for specific tasks

> **Key insight:** Choose loss that matches your task!
`,
          starterCode: `import numpy as np

def binary_cross_entropy(y_true, y_pred):
    """Binary classification loss"""
    epsilon = 1e-7
    loss = -np.mean(y_true * np.log(y_pred + epsilon) + 
                   (1 - y_true) * np.log(1 - y_pred + epsilon))
    return loss

def categorical_cross_entropy(y_true, y_pred):
    """Multi-class classification loss (y_true is one-hot)"""
    epsilon = 1e-7
    loss = -np.mean(np.sum(y_true * np.log(y_pred + epsilon), axis=1))
    return loss

def mse(y_true, y_pred):
    """Regression loss"""
    loss = np.mean((y_true - y_pred) ** 2)
    return loss

# Test Binary Cross-Entropy
print("=== Binary Classification ===")
y_true = np.array([1, 0, 1, 1])
y_pred_good = np.array([0.9, 0.1, 0.8, 0.95])
y_pred_bad = np.array([0.2, 0.8, 0.3, 0.1])

print(f"Correct predictions: {binary_cross_entropy(y_true, y_pred_good):.4f}")
print(f"Wrong predictions:   {binary_cross_entropy(y_true, y_pred_bad):.4f}")
print(f"← Worse predictions have higher loss")

# Test MSE
print("\\n=== Regression (MSE) ===")
y_true_reg = np.array([100, 200, 300])
y_pred_close = np.array([105, 195, 305])
y_pred_far = np.array([50, 400, 100])

print(f"Close predictions: {mse(y_true_reg, y_pred_close):.2f}")
print(f"Far predictions:   {mse(y_true_reg, y_pred_far):.2f}")
print(f"← Large errors penalized more")
`,
        },
        {
          pageNumber: 2,
          title: "Modern Optimizers: SGD, Momentum, Adam",
          content: `## Optimization Algorithms

**Problem with basic gradient descent:**
- Slow convergence on large datasets
- Gets stuck in local minima
- No adaptive learning rates

**Solution:** Modern optimizers!

### Stochastic Gradient Descent (SGD)

\`\`\`
W := W - α × ∇W Loss
\`\`\`

Same as basic gradient descent, but:
- Process mini-batches (32-256 samples) instead of all data
- Faster updates, escapes local minima

**Advantage:** Noisy gradient helps escape bad local minima
**Disadvantage:** Jerky updates, slow convergence

### SGD with Momentum

\`\`\`
v := β × v + (1-β) × gradient
W := W - α × v
\`\`\`

Keep moving in direction of previous gradients (momentum).

**Intuition:** Like rolling a ball downhill—builds up speed in good directions.

\`\`\`
Good: All gradients point downhill → Fast!
Bad: Gradient reverses → Momentum keeps us going → Escapes!
\`\`\`

**β = 0.9** (most common) means: Use 90% of previous velocity.

### Adam (Adaptive Moment Estimation) — Best for Most Tasks

\`\`\`
Keep two running averages:
- m := β₁ × m + (1-β₁) × gradient        (1st moment, mean)
- v := β₂ × v + (1-β₂) × gradient²       (2nd moment, variance)

Adaptive learning rate:
W := W - α × m / (√v + ε)
\`\`\`

**Why Adam works:**
- **Adaptive:** Different learning rates for different parameters
- **Momentum:** Accelerates in good directions
- **Variance:** Adapts to noisy gradients
- **Works great in practice:** Default choice for deep learning

**Default parameters:**
- α = 0.001
- β₁ = 0.9
- β₂ = 0.999

## When to Use

| Optimizer | Speed | Stability | Use Case |
|-----------|-------|-----------|----------|
| SGD | Slow | Stable | Fine-tuning, small models |
| Momentum | Fast | Good | CNN, vision tasks |
| Adam | Very Fast | Excellent | RNN, transformers (DEFAULT) |

> **Modern practice:** Start with Adam, rarely change it!
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64

# Loss landscape: L = x² + y² (minimum at 0,0)
np.random.seed(42)

def simulate_optimizer(init_x, init_y, optimizer, steps=50):
    x, y = init_x, init_y
    path_x, path_y = [x], [y]
    
    for _ in range(steps):
        gx, gy = 2*x, 2*y  # Gradient
        
        if optimizer == 'sgd':
            x -= 0.1 * gx
            y -= 0.1 * gy
        
        elif optimizer == 'momentum':
            if not hasattr(simulate_optimizer, 'vx'):
                simulate_optimizer.vx = 0
                simulate_optimizer.vy = 0
            simulate_optimizer.vx = 0.9 * simulate_optimizer.vx - 0.1 * gx
            simulate_optimizer.vy = 0.9 * simulate_optimizer.vy - 0.1 * gy
            x += simulate_optimizer.vx
            y += simulate_optimizer.vy
        
        elif optimizer == 'adam':
            if not hasattr(simulate_optimizer, 'adam_m'):
                simulate_optimizer.adam_m = np.array([0.0, 0.0])
                simulate_optimizer.adam_v = np.array([0.0, 0.0])
            
            beta1, beta2, alpha = 0.9, 0.999, 0.01
            g = np.array([gx, gy])
            simulate_optimizer.adam_m = beta1 * simulate_optimizer.adam_m + (1-beta1) * g
            simulate_optimizer.adam_v = beta2 * simulate_optimizer.adam_v + (1-beta2) * (g**2)
            
            m_hat = simulate_optimizer.adam_m / (1 - beta1)
            v_hat = simulate_optimizer.adam_v / (1 - beta2)
            
            delta = alpha * m_hat / (np.sqrt(v_hat) + 1e-8)
            x -= delta[0]
            y -= delta[1]
        
        path_x.append(x)
        path_y.append(y)
    
    return np.array(path_x), np.array(path_y)

# Run optimizers
sgd_x, sgd_y = simulate_optimizer(2.0, 2.0, 'sgd')
simulate_optimizer.vx = simulate_optimizer.vy = 0
mom_x, mom_y = simulate_optimizer(2.0, 2.0, 'momentum')
adam_x, adam_y = simulate_optimizer(2.0, 2.0, 'adam')

# Plot
fig, ax = plt.subplots(figsize=(10, 8))
fig.patch.set_facecolor('#0d0d14')
ax.set_facecolor('#0d0d14')

# Contour plot
xx = np.linspace(-2.5, 2.5, 50)
yy = np.linspace(-2.5, 2.5, 50)
XX, YY = np.meshgrid(xx, yy)
Z = XX**2 + YY**2

contours = ax.contour(XX, YY, Z, levels=15, colors='gray', alpha=0.3)

# Paths
ax.plot(sgd_x, sgd_y, 'o-', color='#8b5cf6', label='SGD', markersize=3, linewidth=1.5, alpha=0.7)
ax.plot(mom_x, mom_y, 's-', color='#f43f5e', label='Momentum', markersize=3, linewidth=1.5, alpha=0.7)
ax.plot(adam_x, adam_y, '^-', color='#10b981', label='Adam', markersize=3, linewidth=1.5, alpha=0.7)

ax.scatter(0, 0, s=200, c='yellow', marker='*', edgecolors='white', linewidths=2, label='Minimum', zorder=5)

ax.set_xlabel('X', color='#94a3b8')
ax.set_ylabel('Y', color='#94a3b8')
ax.set_title('Optimizer Comparison (Reaching Minimum)', color='white', fontsize=12)
ax.legend(labelcolor='white', fontsize=10)
ax.tick_params(colors='#94a3b8')
for spine in ax.spines.values():
    spine.set_color('#1e293b')

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()

# Statistics
print("\\n=== Optimizer Comparison ===")
print(f"SGD final pos:  ({sgd_x[-1]:.4f}, {sgd_y[-1]:.4f})")
print(f"Momentum final: ({mom_x[-1]:.4f}, {mom_y[-1]:.4f})")
print(f"Adam final:     ({adam_x[-1]:.4f}, {adam_y[-1]:.4f})")
print(f"\\nAdam converges fastest! ✓")
`,
        },
      ],
    },
    {
      id: "dl-text-embedding",
      moduleId: "deep-learning",
      lessonNumber: 4,
      title: "Tokenization, Word Embeddings & Word2Vec",
      description: "Convert text into numerical vectors that capture semantic meaning.",
      duration: "30 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "From Text to Numbers",
          content: `# Text Processing & Embeddings

## The Challenge: Text to Neural Networks

Neural networks need numbers, but we have text!

\`\`\`
"The cat sat on the mat" → ???
\`\`\`

### Step 1: Tokenization

Break text into tokens (words, subwords, characters).

\`\`\`
"The cat sat on the mat"
↓
["The", "cat", "sat", "on", "the", "mat"]
\`\`\`

### Step 2: Vocabulary & Indexing

Map each token to an integer.

\`\`\`
Vocabulary:
- "cat" → 2
- "mat" → 5
- "on" → 4
- "sat" → 3
- "the" → 1

Text: "The cat sat on the mat"
↓
[1, 2, 3, 4, 1, 5]
\`\`\`

### Step 3: Convert to Vectors

Now the neural network can process!

\`\`\`
[1, 2, 3, 4, 1, 5] → Neural Network → Output
\`\`\`

## One-Hot Encoding (Naive Approach)

Represent each word as a vector:

\`\`\`
Vocabulary: {cat, dog, mat, sat, the}

"cat" → [1, 0, 0, 0, 0]  (one-hot)
"dog" → [0, 1, 0, 0, 0]
"the" → [0, 0, 0, 0, 1]
\`\`\`

**Problem:** No semantic relationship!
- "cat" and "dog" should be similar (both animals)
- "cat" and "pizza" should be different
- But one-hot gives them no relationship

## Dense Word Embeddings (Better Approach)

Instead of sparse one-hot vectors, learn dense embeddings:

\`\`\`
"cat" → [0.2, -0.5, 0.8, 0.1, -0.3]  (5D embedding)
"dog" → [0.25, -0.48, 0.75, 0.15, -0.25]  (similar!)
"the" → [-0.1, 0.2, -0.3, 0.8, 0.1]  (different)
\`\`\`

**Magic:** Similar words have similar vectors!

- **Distance between "cat" and "dog" vectors: 0.05** ← close!
- **Distance between "cat" and "the" vectors: 1.2** ← far!
`,
          starterCode: `import numpy as np

# Tokenization example
text = "the cat sat on the mat"

# Step 1: Tokenize
tokens = text.lower().split()
print("Tokens:", tokens)

# Step 2: Build vocabulary
vocab = sorted(list(set(tokens)))
word2idx = {word: i for i, word in enumerate(vocab)}
idx2word = {i: word for word, i in word2idx.items()}

print("\\nVocabulary:", vocab)
print("Word to Index:", word2idx)

# Step 3: Convert text to indices
token_ids = [word2idx[token] for token in tokens]
print("\\nToken IDs:", token_ids)

# One-hot encoding
def one_hot_encode(word_id, vocab_size):
    vec = np.zeros(vocab_size)
    vec[word_id] = 1
    return vec

print("\\n=== One-Hot Encoding ===")
vocab_size = len(vocab)
for token in tokens[:3]:
    idx = word2idx[token]
    one_hot = one_hot_encode(idx, vocab_size)
    print(f"{token:8s} → {one_hot}")

# Word embedding (learned)
print("\\n=== Word Embeddings (Random Example) ===")
embedding_dim = 5
embedding_matrix = np.random.randn(vocab_size, embedding_dim) * 0.1

for token in tokens[:3]:
    idx = word2idx[token]
    embedding = embedding_matrix[idx]
    print(f"{token:8s} → {embedding}")

# Semantic similarity
print("\\n=== Semantic Similarity ===")
cat_idx = word2idx['cat']
mat_idx = word2idx['mat']

cat_emb = embedding_matrix[cat_idx]
mat_emb = embedding_matrix[mat_idx]

distance = np.linalg.norm(cat_emb - mat_emb)
print(f"Distance between 'cat' and 'mat': {distance:.4f}")
`,
        },
        {
          pageNumber: 2,
          title: "Word2Vec & Learning Embeddings",
          content: `## Word2Vec (Context-Based Embeddings)

**Idea:** Learn word embeddings by predicting context!

### Skip-Gram Model

Train a network to: Given a word, predict surrounding words.

\`\`\`
"the cat sat on the mat"

For word "cat":
- Context words: ["the", "sat"] (nearby words)

Network learns:
- Input: embed("cat")
- Output: predict ["the", "sat"]

By training on millions of examples:
- Similar words in similar contexts
- Similar embeddings!
\`\`\`

### Example Training

\`\`\`
Sentence: "king queen man woman"

Training examples (predict next word):
- "king" → "queen"
- "queen" → "man"
- "man" → "woman"

After training:
embed("king") - embed("man") ≈ embed("queen") - embed("woman")

Why? Both pairs are {masculine → feminine} relationships!
\`\`\`

## Semantic Algebra (Magic!)

Pre-trained embeddings capture semantics:

\`\`\`
embed("king") - embed("man") + embed("woman") ≈ embed("queen")

king is to man as queen is to woman!

embed("Paris") - embed("France") + embed("Germany") ≈ embed("Berlin")

Paris is to France as Berlin is to Germany!
\`\`\`

## Pre-Trained Embeddings

Don't train from scratch! Use pre-trained:

- **Word2Vec:** 300D vectors trained on Google News (billions of words)
- **GloVe:** Global vectors, captures global word co-occurrence
- **FastText:** Handles out-of-vocabulary words (subword information)

**Advantage:** These embeddings already understand language! Just load and use.

## Embedding Dimensions

\`\`\`
50D embeddings:   Fast, less memory, OK quality
100D embeddings:  Good balance
300D embeddings:  High quality (standard Word2Vec)
1000D embeddings: Very high quality, but slow
\`\`\`

Most use **300D** as sweet spot.
`,
          starterCode: `import numpy as np

# Simulate Word2Vec training
# In practice, use pre-trained embeddings!

class SimpleWord2Vec:
    def __init__(self, vocab_size, embedding_dim):
        # Embedding matrix (vocabulary × embedding dimension)
        self.embed_matrix = np.random.randn(vocab_size, embedding_dim) * 0.01
        self.vocab_size = vocab_size
        self.embedding_dim = embedding_dim
    
    def get_embedding(self, word_id):
        return self.embed_matrix[word_id]
    
    def cosine_similarity(self, vec1, vec2):
        return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2) + 1e-8)

# Test
vocab = ["cat", "dog", "mat", "sat", "on", "the"]
vocab_size = len(vocab)
embedding_dim = 10

word2vec = SimpleWord2Vec(vocab_size, embedding_dim)

# Manually set similar embeddings (simulating training)
word2vec.embed_matrix[0] = np.array([0.5, 0.3, -0.2, 0.1, 0.4, -0.3, 0.2, 0.1, 0.0, -0.1])  # cat
word2vec.embed_matrix[1] = np.array([0.5, 0.35, -0.2, 0.12, 0.42, -0.28, 0.2, 0.1, 0.01, -0.1])  # dog (similar)
word2vec.embed_matrix[2] = np.array([-0.5, 0.6, 0.3, -0.4, 0.1, 0.2, -0.3, 0.5, 0.2, 0.4])  # mat (different)

# Similarity
cat_emb = word2vec.get_embedding(0)
dog_emb = word2vec.get_embedding(1)
mat_emb = word2vec.get_embedding(2)

sim_cat_dog = word2vec.cosine_similarity(cat_emb, dog_emb)
sim_cat_mat = word2vec.cosine_similarity(cat_emb, mat_emb)

print("=== Word2Vec Embeddings ===")
print(f"Cosine similarity (cat, dog): {sim_cat_dog:.4f}  ← Similar (both animals)")
print(f"Cosine similarity (cat, mat): {sim_cat_mat:.4f}  ← Different")

# Semantic arithmetic (simplified)
print("\\n=== Semantic Algebra ===")
print("Analogies (approximate):")
print(f"  'king' - 'man' + 'woman' ≈ 'queen'  (social gender roles)")
print(f"  'Paris' - 'France' + 'Germany' ≈ 'Berlin'  (geographic capital)")
print(f"  'good' + 'bad' ≈ opposite  (semantic negation)")
`,
        },
      ],
    },
    {
      id: "dl-cnn",
      moduleId: "deep-learning",
      lessonNumber: 5,
      title: "Convolutional Neural Networks (CNN) — Image Processing",
      description: "Learn convolutional layers that automatically detect visual features (edges, shapes, objects).",
      duration: "32 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Convolution & Feature Maps",
          content: `# Convolutional Neural Networks (CNN)

## Why CNNs for Images?

Traditional dense layers treat image as flat vector:

\`\`\`
Image: 32×32 pixels
↓
Flatten: 1024 values
↓
Dense layer: 1024 × 512 parameters

Problem: Loses spatial structure!
- Pixel at (0,0) connected to pixel at (31,31)
- No local structure exploited
- VERY slow on large images
\`\`\`

**CNNs preserve spatial structure:**
- Learn local features (edges, corners, shapes)
- Share weights (same filter applied to all locations)
- Reduce parameters dramatically

## The Convolution Operation

A **filter** (kernel) slides over the image, computing dot products:

\`\`\`
Image:
[1 2 3]
[4 5 6]
[7 8 9]

Filter (3×3):
[1 0 -1]
[2 0 -2]
[1 0 -1]

Convolution at position (0,0):
(1×1 + 2×0 + 3×(-1) + 4×2 + 5×0 + 6×(-2) + 7×1 + 8×0 + 9×(-9))
= 1 + 0 - 3 + 8 + 0 - 12 + 7 + 0 - 81
= Output: -80

Result: Feature map (one number per position)
\`\`\`

## Feature Detection

Different filters detect different features:

| Filter | Detects | Example |
|--------|---------|---------|
| [1 0 -1; 2 0 -2; 1 0 -1] | Vertical edges | Line pattern |
| [1 2 1; 0 0 0; -1 -2 -1] | Horizontal edges | Line pattern |
| Learned | Corners, textures, shapes | Complex patterns |

**Key insight:** CNNs automatically learn these filters!

## Stacking Layers

\`\`\`
Input Image (32×32×3)
      ↓
Conv1 (16 filters) → 32×32×16  (detect low-level: edges)
      ↓
Conv2 (32 filters) → 16×16×32  (detect mid-level: shapes)
      ↓
Conv3 (64 filters) → 8×8×64    (detect high-level: objects)
      ↓
Global Average Pool → 64
      ↓
Dense → 10 classes (output)
\`\`\`

**Hierarchy:**
- Early layers: edges, colors
- Middle layers: shapes, textures
- Late layers: whole objects
`,
          starterCode: `import numpy as np

# Simple convolution
def convolve2d(image, kernel):
    """Simple 2D convolution (no padding)"""
    img_h, img_w = image.shape
    k_h, k_w = kernel.shape
    
    out_h = img_h - k_h + 1
    out_w = img_w - k_w + 1
    output = np.zeros((out_h, out_w))
    
    for i in range(out_h):
        for j in range(out_w):
            patch = image[i:i+k_h, j:j+k_w]
            output[i, j] = np.sum(patch * kernel)
    
    return output

# Example: Edge detection
image = np.array([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
], dtype=float)

# Vertical edge detector
vertical_kernel = np.array([
    [1, 0, -1],
    [2, 0, -2],
    [1, 0, -1]
])

# Horizontal edge detector
horizontal_kernel = np.array([
    [1, 2, 1],
    [0, 0, 0],
    [-1, -2, -1]
])

result_v = convolve2d(image, vertical_kernel)
result_h = convolve2d(image, horizontal_kernel)

print("=== Convolution Operation ===")
print("Image:")
print(image.astype(int))

print("\\nVertical Edge Filter:")
print(vertical_kernel.astype(int))

print("\\nResult:")
print(result_v.astype(int))

print("\\n--- Interpretation ---")
print("Large values → Vertical edges detected")
print("Small values → No edges")
`,
        },
        {
          pageNumber: 2,
          title: "Pooling, Flattening & CNN Architecture",
          content: `## Pooling (Dimensionality Reduction)

After convolution, feature maps are still large. Pooling reduces size while keeping important info.

### Max Pooling

Take the maximum value in each window:

\`\`\`
Input (4×4):
[1 2 | 3 4]
[5 6 | 7 8]
-----+-----
[9 10| 11 12]
[13 14| 15 16]

Max Pool (2×2 window):
[6  8]     ← Max of [1,2,5,6], [3,4,7,8], etc.
[14 16]
\`\`\`

**Why?** Keeps strongest activation (most relevant feature).

### Average Pooling

Take average instead of max:

\`\`\`
[1 2 | 3 4]   Average Pool (2×2):
[5 6 | 7 8]   [3.5  6.5]
-----+-----
[9 10| 11 12] [11.5 14.5]
[13 14| 15 16]
\`\`\`

## Full CNN Architecture

\`\`\`
Input Image (224×224×3)
      ↓
Conv (64 filters, 3×3, ReLU) → 224×224×64
      ↓
MaxPool (2×2) → 112×112×64  (reduced!)
      ↓
Conv (128 filters) → 112×112×128
      ↓
MaxPool (2×2) → 56×56×128
      ↓
Conv (256 filters) → 56×56×256
      ↓
MaxPool (2×2) → 28×28×256
      ↓
Flatten → 200,704 values
      ↓
Dense (512, ReLU) → 512
      ↓
Dropout (0.5) → Drop half randomly
      ↓
Dense (1000, Softmax) → Final output
\`\`\`

## Common CNN Architectures

| Architecture | Year | Key Innovation |
|-------------|------|-----------------|
| LeNet | 1998 | First CNN (MNIST) |
| AlexNet | 2012 | Deep CNN + GPUs |
| VGG | 2014 | Showed depth matters |
| ResNet | 2015 | Residual connections (skip) |
| Inception | 2015 | Multi-scale convolutions |
| MobileNet | 2017 | Lightweight for phones |

**Use pre-trained:** Don't train CNNs from scratch! Load pre-trained weights (ImageNet).

## Why CNNs Work

1. **Local connectivity:** Only nearby pixels connected
2. **Weight sharing:** Same filter across all positions
3. **Hierarchical learning:** Build up from edges to objects
4. **Translation invariance:** Same object detected regardless of position
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64

# Visualize feature maps through CNN layers
def simple_conv_block(x, num_filters):
    """Simulate a conv + pooling block"""
    # Convolution (simulated)
    if len(x.shape) == 2:
        features = np.random.randn(x.shape[0]//2, x.shape[1]//2, num_filters) * 0.1
    else:
        features = np.random.randn(x.shape[0]//2, x.shape[1]//2, num_filters) * 0.1
    
    # Add some structure
    for i in range(num_filters):
        features[:, :, i] += np.random.randn() * 0.5
    
    # Max pooling (already done in size reduction)
    return features

# Simulate image through network
image = np.random.randn(32, 32)

layer1 = simple_conv_block(image, 16)  # 16×16×16
layer2 = simple_conv_block(layer1, 32)  # 8×8×32
layer3 = simple_conv_block(layer2, 64)  # 4×4×64

# Visualize
fig, axes = plt.subplots(1, 4, figsize=(14, 3))
fig.patch.set_facecolor('#0d0d14')

# Input
ax = axes[0]
ax.imshow(image, cmap='gray')
ax.set_title('Input (32×32)', color='white')
ax.axis('off')

# Layer 1
ax = axes[1]
ax.imshow(layer1[:, :, 0], cmap='viridis')
ax.set_title('Layer1 Filter 1\\n(16×16×16)', color='white')
ax.axis('off')

# Layer 2
ax = axes[2]
ax.imshow(layer2[:, :, 0], cmap='plasma')
ax.set_title('Layer2 Filter 1\\n(8×8×32)', color='white')
ax.axis('off')

# Layer 3
ax = axes[3]
ax.imshow(layer3[:, :, 0], cmap='cool')
ax.set_title('Layer3 Filter 1\\n(4×4×64)', color='white')
ax.axis('off')

plt.suptitle('CNN Feature Maps Through Layers', color='white', fontsize=12, y=1.02)
plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=100, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()

print("\\n=== CNN Feature Hierarchy ===")
print(f"Input shape:  {image.shape}")
print(f"After Conv1+Pool: {layer1.shape}  (lower resolution, more channels)")
print(f"After Conv2+Pool: {layer2.shape}  (even lower, more filters)")
print(f"After Conv3+Pool: {layer3.shape}  (high-level features)")
print(f"\\nFlattened: {layer3.size}")
print("→ Ready for classification!")
`,
        },
      ],
    },
    {
      id: "dl-rnn",
      moduleId: "deep-learning",
      lessonNumber: 6,
      title: "Recurrent Neural Networks (RNN, LSTM, GRU)",
      description: "Process sequences by maintaining memory through recurrent connections.",
      duration: "35 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "RNN Basics & Hidden State",
          content: `# Recurrent Neural Networks

## Why RNNs for Sequences?

Some data is sequential:
- Text: "The cat sat on the mat" (words in order matter!)
- Time series: Stock prices over time
- Audio: Sound waves (time-dependent)

Dense networks treat all inputs as independent. **RNNs remember!**

\`\`\`
Dense: [word1, word2, word3] → No memory of previous
RNN:   [word1] → hidden state → [word2] → hidden state → [word3]
                    (remembers!)
\`\`\`

## The RNN Equation

\`\`\`
hidden_state[t] = activation(W × input[t] + U × hidden_state[t-1] + b)
output[t] = V × hidden_state[t]
\`\`\`

Where:
- **W:** Input-to-hidden weights
- **U:** Hidden-to-hidden weights (recurrent!)
- **V:** Hidden-to-output weights
- **hidden_state[t-1]:** Memory from previous step

## Example: Text Generation

Training: "The cat sat"

\`\`\`
Step 1: Input="The" → hidden = [0.3, -0.2, 0.5]
Step 2: Input="cat", hidden_prev=[0.3, -0.2, 0.5] → hidden = [0.1, 0.4, -0.3]
Step 3: Input="sat", hidden_prev=[0.1, 0.4, -0.3] → hidden = [-0.2, 0.5, 0.1]

Each step "remembers" the previous words!
\`\`\`

## Backpropagation Through Time (BPTT)

Training RNNs is tricky:

\`\`\`
dL/dU must flow backward through many steps:
dL/dU = dL/dh[t] × dh[t]/dh[t-1] × dh[t-1]/dh[t-2] × ... × dh[1]/dU
        └─────────┬─────────┬─────────────────┬─────────────────┘
         Chain rule through many steps!

Problem: If gradients < 1, they vanish (→ 0)
         If gradients > 1, they explode (→ ∞)
\`\`\`

This is the **vanishing gradient problem**.

## The Problem & The Solution

\`\`\`
Vanishing Gradients:
- Can't learn long-term dependencies
- Network forgets early inputs

Example: "The cat, which was ... sat"
- Can the network remember "cat" was the subject?
- With vanishing gradients: NO

Solution: LSTM & GRU (gate mechanisms to control information flow)
\`\`\`
`,
          starterCode: `import numpy as np

# Simple RNN cell
class SimpleRNNCell:
    def __init__(self, input_size, hidden_size):
        self.Wx = np.random.randn(hidden_size, input_size) * 0.01
        self.Wh = np.random.randn(hidden_size, hidden_size) * 0.01
        self.bh = np.zeros((hidden_size, 1))
        
        self.Wy = np.random.randn(input_size, hidden_size) * 0.01
        self.by = np.zeros((input_size, 1))
    
    def forward(self, X, h_prev):
        """X: (sequence_length, input_size)"""
        hidden_states = []
        outputs = []
        h = h_prev
        
        for t in range(X.shape[0]):
            xt = X[t:t+1].T  # Column vector
            # hidden = tanh(Wx × input + Wh × h_prev + b)
            h = np.tanh(np.dot(self.Wx, xt) + np.dot(self.Wh, h) + self.bh)
            hidden_states.append(h)
            
            # output = Wy × hidden + by
            yt = np.dot(self.Wy, h) + self.by
            outputs.append(yt)
        
        return outputs, hidden_states, h

# Test sequence
sequence = np.array([
    [1, 0, 0],  # "word1"
    [0, 1, 0],  # "word2"
    [0, 0, 1],  # "word3"
])

rnn = SimpleRNNCell(input_size=3, hidden_size=5)
h_init = np.zeros((5, 1))

outputs, hidden_states, h_final = rnn.forward(sequence, h_init)

print("=== RNN Forward Pass ===")
print(f"Sequence shape: {sequence.shape}")
print(f"Number of steps: {len(outputs)}")
print(f"Hidden state size: {hidden_states[0].shape}")

print(f"\\nHidden state evolution:")
for t, h in enumerate(hidden_states):
    norm = np.linalg.norm(h)
    print(f"  Step {t}: norm={norm:.4f}")

print(f"\\nFinal hidden state (captures entire sequence):")
print(h_final.flatten()[:3], "...")
`,
        },
        {
          pageNumber: 2,
          title: "LSTM (Long Short-Term Memory) & GRU",
          content: `## LSTM (Long Short-Term Memory)

**Solution to vanishing gradients:** Use gates to control information flow!

### The LSTM Cell

\`\`\`
Four gates control what gets remembered:

1. Forget Gate: f_t = sigmoid(W_f × [h_{t-1}, x_t] + b_f)
   "Should I forget this info?"

2. Input Gate: i_t = sigmoid(W_i × [h_{t-1}, x_t] + b_i)
   "Should I learn this new info?"

3. Candidate: C̃_t = tanh(W_c × [h_{t-1}, x_t] + b_c)
   "What new info should I learn?"

4. Output Gate: o_t = sigmoid(W_o × [h_{t-1}, x_t] + b_o)
   "What info should I output?"

Cell state update:
C_t = f_t ⊙ C_{t-1} + i_t ⊙ C̃_t  (add new, forget old)

Hidden state:
h_t = o_t ⊙ tanh(C_t)

(⊙ = element-wise multiplication)
\`\`\`

**Key insight:** Cell state flows straight through, gradients don't vanish!

### Example: Understanding Context

\`\`\`
Sentence: "The cat, which was orange and fluffy, sat"

LSTM forgets irrelevant words (commas, adjectives)
Remembers "cat" as subject
Learns that "sat" is the verb about the cat

Forget gate: "Forget 'orange', 'fluffy', 'and'"
Input gate: "Remember 'cat'"
Output gate: "Output 'sat' is verb of 'cat'"
\`\`\`

## GRU (Gated Recurrent Unit)

**Simpler than LSTM but similar performance.**

\`\`\`
Only 2 gates (vs LSTM's 4):

Reset gate: r_t = sigmoid(W_r × [h_{t-1}, x_t] + b_r)
Update gate: z_t = sigmoid(W_z × [h_{t-1}, x_t] + b_z)

h̃_t = tanh(W × [r_t ⊙ h_{t-1}, x_t] + b)
h_t = (1 - z_t) ⊙ h̃_t + z_t ⊙ h_{t-1}
\`\`\`

**Advantages of GRU:**
- Fewer parameters (2 gates vs 4)
- Faster training
- Often similar performance to LSTM
- Good for smaller datasets

## LSTM vs GRU vs RNN

| Model | Params | Speed | Long-term | Use Case |
|-------|--------|-------|-----------|----------|
| RNN | Few | Fast | Poor | Simple sequences |
| GRU | Medium | Medium | Good | Text, most tasks |
| LSTM | Many | Slow | Excellent | Complex sequences |

**Modern practice:**
- Default to GRU (good balance)
- Use LSTM for very long sequences
- Avoid vanilla RNN (vanishing gradients)

## Bidirectional RNNs

Process sequence in both directions:

\`\`\`
Forward RNN: ← (left to right)
Backward RNN: → (right to left)
Concatenate: [forward_hidden, backward_hidden]

Advantage: Can look ahead!
\`\`\`

Example: Sequence labeling, machine translation
`,
          starterCode: `import numpy as np

# LSTM gate equations
class SimpleLSTMCell:
    def __init__(self, input_size, hidden_size):
        self.hidden_size = hidden_size
        
        # Four gates: forget, input, cell, output
        self.Wf = np.random.randn(hidden_size, input_size + hidden_size) * 0.01
        self.bf = np.zeros((hidden_size, 1))
        
        self.Wi = np.random.randn(hidden_size, input_size + hidden_size) * 0.01
        self.bi = np.zeros((hidden_size, 1))
        
        self.Wc = np.random.randn(hidden_size, input_size + hidden_size) * 0.01
        self.bc = np.zeros((hidden_size, 1))
        
        self.Wo = np.random.randn(hidden_size, input_size + hidden_size) * 0.01
        self.bo = np.zeros((hidden_size, 1))
    
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))
    
    def lstm_step(self, x, h_prev, C_prev):
        """Single LSTM step"""
        # Concatenate input and hidden
        concat = np.vstack([h_prev, x])
        
        # Forget gate
        f_t = self.sigmoid(np.dot(self.Wf, concat) + self.bf)
        
        # Input gate
        i_t = self.sigmoid(np.dot(self.Wi, concat) + self.bi)
        
        # Candidate cell
        C_tilde = np.tanh(np.dot(self.Wc, concat) + self.bc)
        
        # Output gate
        o_t = self.sigmoid(np.dot(self.Wo, concat) + self.bo)
        
        # Cell state (remember + forget)
        C_t = f_t * C_prev + i_t * C_tilde
        
        # Hidden state
        h_t = o_t * np.tanh(C_t)
        
        return h_t, C_t

# Test
lstm = SimpleLSTMCell(input_size=3, hidden_size=4)

h = np.zeros((4, 1))
C = np.zeros((4, 1))

x1 = np.array([[1], [0], [0]])
x2 = np.array([[0], [1], [0]])

h, C = lstm.lstm_step(x1, h, C)
print(f"After step 1: h norm = {np.linalg.norm(h):.4f}, C norm = {np.linalg.norm(C):.4f}")

h, C = lstm.lstm_step(x2, h, C)
print(f"After step 2: h norm = {np.linalg.norm(h):.4f}, C norm = {np.linalg.norm(C):.4f}")

print("\\n✓ LSTM gates control information flow!")
print("✓ Cell state preserves long-term memory!")
`,
        },
      ],
    },
    {
      id: "dl-transformer",
      moduleId: "deep-learning",
      lessonNumber: 7,
      title: "Attention Mechanisms & Transformers",
      description: "The revolutionary attention mechanism that powers BERT, GPT, and modern NLP.",
      duration: "40 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Attention Mechanism",
          content: `# Attention & Transformers

## The Problem with RNNs/LSTMs

**Sequential processing is slow:**
\`\`\`
Step 1: Input word 1 → hidden state 1 (wait for completion)
Step 2: Input word 2 → hidden state 2 (can't start until step 1 done)
...
Step N: Process word N

For a 1000-word sentence: 1000 sequential steps! Bottleneck!

Solution: Process all words at once (parallelization)
But then how do we know which words relate to which?
\`\`\`

## Attention: "Focus on Relevant Words"

When processing a word, don't treat all other words equally. **Attend** to relevant ones.

\`\`\`
Sentence: "The cat sat on the mat"
         word:    1   2   3  4  5   6

Processing word 3 ("sat"):
- High attention to "cat" (subject)
- Low attention to "the" (article)
- Medium attention to "mat" (object)

This tells the model which words matter for "sat"!
\`\`\`

## Self-Attention Mechanism

\`\`\`
Query Q = W_q × x     (what am I looking for?)
Key K = W_k × x       (what do I have?)
Value V = W_v × x     (what info to use?)

Attention(Q, K, V) = softmax(Q × K^T / √d_k) × V
\`\`\`

**Intuition:**
1. Q × K^T computes similarity between each pair
2. softmax converts to attention weights
3. Weights × V gives weighted average (which words matter)

## Example: Computing Attention

\`\`\`
Query for "sat": "what verbs happened?"
Keys for all words: ["noun", "noun", "verb", "preposition", "article", "noun"]
Similarity: [low, low, high, low, very_low, low]

After softmax: [0.01, 0.01, 0.85, 0.05, 0.005, 0.01]
↑ High attention to "sat" (the verb!)

Weighted sum of values: 0.85 × V_sat + 0.05 × V_on + ...
Result: Information focused on the verb!
\`\`\`

## Why Attention Works

1. **Parallelization:** All words processed simultaneously (GPU-friendly)
2. **Long-range dependencies:** Can attend to any word (no sequential bottleneck)
3. **Interpretability:** Attention weights show what model focused on
4. **Flexibility:** Can learn different attention patterns per layer

## Multi-Head Attention

Use multiple attention mechanisms in parallel:

\`\`\`
Head 1: Attends to subjects
Head 2: Attends to verbs
Head 3: Attends to adjectives
...

Concatenate: [head1_output, head2_output, head3_output, ...]

Why? Different "heads" learn different relationships!
\`\`\`

**Example:** 8 heads × 64 dimensions = 512-dimensional output
`,
          starterCode: `import numpy as np

def softmax(x):
    exp_x = np.exp(x - np.max(x, axis=-1, keepdims=True))
    return exp_x / np.sum(exp_x, axis=-1, keepdims=True)

def scaled_dot_product_attention(Q, K, V):
    """Compute attention"""
    d_k = Q.shape[-1]
    
    # Compute similarity
    scores = np.dot(Q, K.T) / np.sqrt(d_k)
    
    # Softmax to get weights
    weights = softmax(scores)
    
    # Weighted sum
    output = np.dot(weights, V)
    
    return output, weights

# Example: 4 words, each with embedding
words = ["cat", "sat", "on", "mat"]
embed_dim = 3

# Simple embeddings
embeddings = np.array([
    [1.0, 0.0, -0.5],   # cat
    [0.5, 1.0, 0.2],    # sat
    [0.0, 0.5, 0.8],    # on
    [-0.5, 0.0, 1.0]    # mat
])

# Projection matrices (learned)
W_q = np.array([[1, 0], [0, 1], [-0.5, 0.5]])
W_k = np.array([[0.8, 0.2], [0.1, 0.9], [0.5, -0.5]])
W_v = np.array([[1, 0, 0], [0, 1, 0], [0, 0, 1]])

# Compute Q, K, V
Q = np.dot(embeddings, W_q)
K = np.dot(embeddings, W_k)
V = embeddings

# Attention
output, attention_weights = scaled_dot_product_attention(Q, K, V)

print("=== Self-Attention Example ===")
print(f"Words: {words}")
print(f"\\nAttention weights:")
for i, word in enumerate(words):
    print(f"  {word}: {attention_weights[i]}")

print(f"\\nAttention interpretation (for word 'sat'):")
for j, word in enumerate(words):
    print(f"  Attention to '{word}': {attention_weights[1, j]:.3f}")

print(f"\\n→ High attention to 'sat' (itself)")
print(f"→ Medium attention to 'cat' (subject)")
print(f"→ Low attention to prepositions")
`,
        },
        {
          pageNumber: 2,
          title: "Transformers: The Full Picture",
          content: `## Transformer Architecture

Transformers stack attention layers without recurrence:

\`\`\`
Input Embeddings (with positional encoding)
      ↓
Multi-Head Attention
      ↓
Feed Forward (Dense layers)
      ↓
Repeat (6-24 layers)
      ↓
Output Layer
\`\`\`

## Positional Encoding

**Problem:** Without recurrence, network doesn't know word order!

\`\`\`
"cat sat on mat" vs "mat on sat cat" would be identical
\`\`\`

**Solution:** Add positional encoding to embeddings:

\`\`\`
PE(pos, 2i) = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))

Each position has unique encoding!
Position 1: [0.84, 0.54, 0.75, ...]
Position 2: [0.91, 0.41, 0.68, ...]
...
\`\`\`

## Encoder-Decoder Architecture

Many models use encoder-decoder:

\`\`\`
Machine Translation:

English: "The cat sat"
   ↓
[Encoder - multiple attention layers]
   ↓
Context vector (compressed representation)
   ↓
[Decoder - multiple attention layers + encoder attention]
   ↓
German: "Die Katze saß"
\`\`\`

**Encoder:** Process input, build representation
**Decoder:** Generate output using encoder's representation

## Famous Models Built on Transformers

| Model | Year | Use |
|-------|------|-----|
| Transformer | 2017 | Machine translation |
| BERT | 2018 | Understanding text (pre-trained) |
| GPT | 2018 | Text generation |
| GPT-2/3 | 2019-2020 | Large-scale generation |
| T5 | 2019 | Any-to-any text tasks |
| DistilBERT | 2019 | Fast BERT (60% faster) |

## Why Transformers Won

1. **Parallelization:** Process entire sequences at once
2. **Long-range:** Attend to any position (no vanishing gradients)
3. **Pre-training:** Train on massive unlabeled text, fine-tune on tasks
4. **Scalability:** Works with billions of parameters
5. **Interpretability:** Attention weights show what model learned

## Modern NLP Stack

\`\`\`
Pre-trained Transformer (BERT, GPT)
         ↓
Fine-tune on specific task
         ↓
Inference (prediction)
\`\`\`

You don't train from scratch! Use existing models! 🚀
`,
          starterCode: `import numpy as np

# Simplified transformer layer
class TransformerLayer:
    def __init__(self, d_model=512, num_heads=8):
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
    
    def forward(self, x, mask=None):
        """
        x: (sequence_length, d_model)
        """
        # Multihead attention + feedforward (simplified)
        seq_len = x.shape[0]
        
        # Self-attention (each word attends to all words)
        attention_output = np.zeros_like(x)
        
        for i in range(seq_len):
            # Each word can see all previous and itself
            context = x[:i+1]
            attention_output[i] = np.mean(context, axis=0)  # Simplified: just average
        
        # Feed-forward
        output = attention_output * 2  # Simplified: just scale
        
        return output

# Test
seq_len = 4
d_model = 64

embeddings = np.random.randn(seq_len, d_model) * 0.1

transformer = TransformerLayer(d_model=d_model, num_heads=8)
output = transformer.forward(embeddings)

print("=== Transformer Layer ===")
print(f"Input shape: {embeddings.shape}")
print(f"Output shape: {output.shape}")
print(f"Sequence processed in PARALLEL (all at once!)")
print(f"\\nNo recurrence = No sequential bottleneck = GPU-friendly!")
`,
        },
      ],
    },
    {
      id: "dl-gan",
      moduleId: "deep-learning",
      lessonNumber: 8,
      title: "Generative Adversarial Networks (GAN)",
      description: "Create synthetic data by pitting a generator against a discriminator in adversarial training.",
      duration: "32 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Generator vs Discriminator",
          content: `# Generative Adversarial Networks (GAN)

## The Idea: A Game Between Two Networks

**Generator:** "I'll create fake images"
**Discriminator:** "I'll catch your fakes"

\`\`\`
Real images: [dog, dog, dog, dog, dog]
      ↓ (mix)
Fake images: [fake, fake, fake, fake]
      ↓
Discriminator: "Is this real or fake?"

If Discriminator says "real" on fake: Discriminator loses
If Discriminator says "fake" on real: Discriminator loses
If Generator makes fake that fools Discriminator: Generator wins
\`\`\`

Both networks improve iteratively!

## The Two Networks

### Generator

\`\`\`
Random noise (100D): z ~ Normal(0, 1)
        ↓
Dense layer (512 neurons)
        ↓
Dense layer (1024 neurons)
        ↓
Dense layer (784 neurons)
        ↓
Output: Fake image (28×28)

Training: Fool the discriminator!
Goal: Minimize log(1 - D(G(z)))
\`\`\`

**Key insight:** Starts with random noise, learns to create realistic images!

### Discriminator

\`\`\`
Input: Image (real or fake)
        ↓
Conv layer (32 filters)
        ↓
Conv layer (64 filters)
        ↓
Dense layer (128 neurons)
        ↓
Output: Real or Fake? (sigmoid)

Training: Classify correctly!
Goal: Minimize -log(D(real)) - log(1 - D(G(z)))
\`\`\`

## The Training Loop

\`\`\`
for epoch in range(100):
    for batch in dataset:
        # Train Discriminator
        real_output = Discriminator(real_images)      # Should be ~1
        fake_output = Discriminator(Generator(noise))  # Should be ~0
        
        D_loss = -log(real_output) - log(1 - fake_output)
        Discriminator.update(D_loss)
        
        # Train Generator
        fake_images = Generator(noise)
        fake_output = Discriminator(fake_images)
        
        G_loss = -log(fake_output)  # Fool discriminator
        Generator.update(G_loss)
\`\`\`

## Nash Equilibrium (Perfect Balance)

When both networks are perfectly balanced:

\`\`\`
Generator: Creates perfect fakes (indistinguishable from real)
Discriminator: Guesses 50-50 (can't tell)

Result: P(real) = P(fake) = 0.5

This is the goal! Both networks reach equilibrium.
\`\`\`

## Applications

| Application | Use |
|-------------|-----|
| Image Generation | Create new faces, art, objects |
| Image-to-Image | Style transfer, photo enhancement |
| Text Generation | Generate realistic text |
| Data Augmentation | Generate more training data |
| Super-resolution | Upscale low-res images |
| Anomaly Detection | Detect unusual images |

## Challenges

- **Mode collapse:** Generator only creates same image
- **Instability:** Training oscillates, doesn't converge
- **Slow convergence:** Takes many iterations to balance

## Solutions (Modern GANs)

| Technique | Fixes |
|-----------|-------|
| WGAN | Wasserstein loss (more stable) |
| Spectral Norm | Normalize discriminator |
| Progressive Growing | Start small, grow gradually |
| StyleGAN | Separate style and content |
`,
          starterCode: `import numpy as np

class SimpleGAN:
    def __init__(self):
        self.generator_w = np.random.randn(10, 100) * 0.01
        self.discriminator_w = np.random.randn(100, 10) * 0.01
        self.discriminator_w2 = np.random.randn(10, 1) * 0.01
    
    def generator(self, z):
        """Generate fake sample from noise"""
        # z: (batch, 100)
        return np.dot(z, self.generator_w.T)  # (batch, 10)
    
    def discriminator(self, x):
        """Classify real or fake"""
        # x: (batch, 10)
        h = np.maximum(0, np.dot(x, self.discriminator_w))  # ReLU
        out = 1 / (1 + np.exp(-np.dot(h, self.discriminator_w2)))  # Sigmoid
        return out.flatten()
    
    def train_step(self, real_samples):
        batch_size = real_samples.shape[0]
        
        # Generate fake
        z = np.random.randn(batch_size, 100)
        fake_samples = self.generator(z)
        
        # Discriminator scores
        real_score = self.discriminator(real_samples)
        fake_score = self.discriminator(fake_samples)
        
        return real_score, fake_score

# Test
gan = SimpleGAN()

# Real data (mix of normal distributions)
real_data = np.random.randn(32, 10) + 2

for iteration in range(100):
    real_scores, fake_scores = gan.train_step(real_data)
    
    if iteration % 20 == 0:
        avg_real = np.mean(real_scores)
        avg_fake = np.mean(fake_scores)
        print(f"Iter {iteration:3d}: Real score = {avg_real:.3f}, Fake score = {avg_fake:.3f}")

print("\\n✓ Generator learns to fool discriminator!")
print("✓ Discriminator learns to detect fakes!")
print("✓ They reach equilibrium at ~0.5 each")
`,
        },
        {
          pageNumber: 2,
          title: "GAN Applications & Variants",
          content: `## Popular GAN Variants

### DCGAN (Deep Convolutional GAN)

\`\`\`
Generator:  Dense → Reshape → Transposed Conv → Transposed Conv → Image
Discriminator: Conv → Conv → Dense → Real/Fake
\`\`\`

**Key:** Use convolutional operations (better for images).

### CycleGAN

\`\`\`
Domain A → Generator AB → Domain B
Domain B → Generator BA → Domain A

Goal: Unpaired image-to-image translation
Example: Photos ↔ Paintings
\`\`\`

### StyleGAN

\`\`\`
Latent code → Maps to style → Applies style progressively → Image

Key innovation: Separate style and content
Result: Remarkably realistic face generation!
\`\`\`

### Conditional GAN (cGAN)

\`\`\`
Noise z + Condition c → Generator → Fake sample
                              ↓
Real sample + Condition c → Discriminator → Real/Fake

Example: Generate faces of a specific gender/age
\`\`\`

## Real-World Applications

### Face Generation
- Generate realistic fake faces (for testing, privacy)
- Style transfer (add artistic style)
- Age progression (show how faces age)

### Image Super-Resolution
- Upscale low-res images 4x
- SRGAN learns upscaling patterns

### Medical Imaging
- Generate synthetic medical images (for training)
- Improve low-quality MRI/CT scans

### Art & Creative
- StyleGAN used for artistic generation
- Neural style transfer (Picasso style on photos)

## Ethical Concerns

⚠️ **Potential misuse:**
- Deepfakes (fake videos of real people)
- Misinformation (synthetic media)
- Privacy concerns (can train on private photos)

✅ **Responsible use:**
- Transparency (disclose AI-generated content)
- Regulation (detect and flag AI-generated media)
- Consent (get permission before using people's images)

## When to Use GANs

**Use if:**
- Need to generate realistic synthetic data
- Want image-to-image translation
- Need data augmentation

**Don't use if:**
- Simple classification works (CNN is easier)
- Generating text (use Transformers)
- Limited compute (GANs are expensive)

## The Future

**Emerging research:**
- Text-to-image GANs (DALL-E uses variants)
- Video generation
- 3D object generation
- Multi-modal GANs (audio + video)
`,
          starterCode: `import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64

# Visualize GAN training progress
np.random.seed(42)

iterations = []
real_scores = []
fake_scores = []

# Simulate training
for i in range(50):
    # Generator improves (fakes get better)
    fake_score = 0.1 + 0.35 * (1 - np.exp(-i / 10))
    
    # Discriminator adapts
    real_score = 0.85 + 0.1 * np.sin(i / 5)
    
    # Add noise
    fake_score += np.random.randn() * 0.05
    real_score += np.random.randn() * 0.05
    
    iterations.append(i)
    real_scores.append(real_score)
    fake_scores.append(fake_score)

# Plot
fig, ax = plt.subplots(figsize=(10, 6))
fig.patch.set_facecolor('#0d0d14')
ax.set_facecolor('#0d0d14')

ax.plot(iterations, real_scores, 'o-', color='#10b981', label='Real (Discriminator should output ~1)', linewidth=2)
ax.plot(iterations, fake_scores, 's-', color='#f43f5e', label='Fake (Discriminator should output ~0)', linewidth=2)
ax.axhline(y=0.5, color='gray', linestyle='--', alpha=0.5, label='Equilibrium (both at 0.5)')

ax.set_xlabel('Training Iteration', color='#94a3b8')
ax.set_ylabel('Discriminator Score', color='#94a3b8')
ax.set_title('GAN Training: Generator vs Discriminator', color='white', fontsize=12)
ax.set_ylim(0, 1)
ax.legend(labelcolor='white', fontsize=10, loc='center right')
ax.tick_params(colors='#94a3b8')
for spine in ax.spines.values():
    spine.set_color('#1e293b')

plt.tight_layout()
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
buf.seek(0)
print(f"PLOT_BASE64:{base64.b64encode(buf.read()).decode()}")
plt.close()

print("\\n=== GAN Training Dynamics ===")
print(f"Initial: Real={real_scores[0]:.2f}, Fake={fake_scores[0]:.2f}")
print(f"Final:   Real={real_scores[-1]:.2f}, Fake={fake_scores[-1]:.2f}")
print(f"\\nGoal: Both converge to 0.5 (can't distinguish)")
print(f"Status: ✓ Nearly achieved equilibrium!")
`,
        },
      ],
    },
    {
      id: "dl-weight-init",
      moduleId: "deep-learning",
      lessonNumber: 9,
      title: "Weight Initialization, Regularization & Dropout",
      description: "Techniques to train deep networks stably and prevent overfitting.",
      duration: "28 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Weight Initialization",
          content: `# Weight Initialization & Regularization

## Why Weight Initialization Matters

**Scenario 1: All weights = 0**
\`\`\`
All neurons produce same output
No diversity → Can't learn!
\`\`\`

**Scenario 2: Random huge weights (e.g., N(0, 100))**
\`\`\`
Activations explode → Gradients explode → Training unstable
\`\`\`

**Scenario 3: Random tiny weights (e.g., N(0, 0.0001))**
\`\`\`
Activations too small → Gradients vanish → Learning too slow
\`\`\`

**Goal:** Find the Goldilocks zone!

## Xavier (Glorot) Initialization

\`\`\`
W ~ Uniform(-√(6/(n_in + n_out)), √(6/(n_in + n_out)))

Or Gaussian:
W ~ Normal(0, √(2/(n_in + n_out)))
\`\`\`

**Intuition:** Scale weights based on layer size
- Large layer → smaller weights
- Small layer → larger weights
- Keeps activations from exploding/vanishing

**When:** For sigmoid/tanh layers

## He Initialization

\`\`\`
W ~ Normal(0, √(2/n_in))
\`\`\`

**Better for ReLU:**
- ReLU doesn't saturate (unbounded on positive side)
- Can use slightly larger weights
- Better for deep networks

**When:** For ReLU layers (the modern default)

## Comparison

\`\`\`
Xavier:  Works OK for sigmoid
He:      Better for ReLU
Random:  Bad! Don't use!

Modern practice: Use He initialization!
\`\`\`

## Layer Normalization / Batch Normalization

**Problem:** Even with good initialization, activations drift during training.

**Solution:** Normalize activations before each layer!

\`\`\`
Batch Normalization:
x_norm = (x - batch_mean) / √(batch_var + ε)
x_scaled = γ × x_norm + β

γ, β are learnable!

Effect: Stabilizes training, allows higher learning rates
\`\`\`

**Benefits:**
- Faster convergence
- Less sensitive to initialization
- Acts as regularizer
- Allows higher learning rates

**When:** Add after dense/conv layers, before activation
`,
          starterCode: `import numpy as np

# Weight initialization comparison
def xavier_init(n_in, n_out):
    limit = np.sqrt(6 / (n_in + n_out))
    return np.random.uniform(-limit, limit, (n_out, n_in))

def he_init(n_in, n_out):
    std = np.sqrt(2 / n_in)
    return np.random.randn(n_out, n_in) * std

def random_init(n_in, n_out):
    return np.random.randn(n_out, n_in)  # DON'T DO THIS!

# Test on deep network
n_layers = 5
n_neurons = 100

print("=== Forward Pass Activation Analysis ===\\n")

# Xavier
print("Xavier Initialization:")
x = np.random.randn(1, n_neurons)
for layer in range(n_layers):
    w = xavier_init(n_neurons, n_neurons)
    x = np.dot(x, w.T)
    print(f"  Layer {layer+1}: mean={np.mean(x):.4f}, std={np.std(x):.4f}, max={np.max(np.abs(x)):.4f}")

# He
print("\\nHe Initialization:")
x = np.random.randn(1, n_neurons)
for layer in range(n_layers):
    w = he_init(n_neurons, n_neurons)
    x = np.dot(x, w.T)
    print(f"  Layer {layer+1}: mean={np.mean(x):.4f}, std={np.std(x):.4f}, max={np.max(np.abs(x)):.4f}")

# Random (bad)
print("\\nRandom Initialization (BAD):")
x = np.random.randn(1, n_neurons)
for layer in range(n_layers):
    w = random_init(n_neurons, n_neurons)
    x = np.dot(x, w.T)
    norm = np.linalg.norm(x)
    if norm > 1e10:
        print(f"  Layer {layer+1}: EXPLODED! norm={norm:.2e}")
        break
    print(f"  Layer {layer+1}: mean={np.mean(x):.4f}, std={np.std(x):.4f}, max={np.max(np.abs(x)):.4f}")

print("\\n✓ Xavier/He keep activations stable!")
print("✗ Random initialization diverges!")
`,
        },
        {
          pageNumber: 2,
          title: "Dropout & L1/L2 Regularization",
          content: `## Dropout (Simple but Effective)

**Problem:** Model memorizes training data (overfitting).

**Solution:** Randomly drop neurons during training!

\`\`\`
Forward pass:
y = Dense(x)  (normal)

With dropout (p=0.5):
mask = random([0, 1])  (50% zeros)
y = Dense(x) * mask    (drop 50% of outputs)

Then scale: y = y / (1 - p)  (compensate for dropped units)

Test time: Use all neurons! No dropout.
\`\`\`

**Why it works:**
- Forces network to learn redundant features
- Can't rely on single neuron
- Ensemble effect (different neurons active each batch)

**Typical dropout rates:**
- p=0.2-0.3 (light, 20-30% drop)
- p=0.5 (standard)
- p > 0.7 (heavy, for very large networks)

## L1/L2 Regularization

**Idea:** Penalize large weights → Force small, sparse weights.

### L2 Regularization (Ridge)

\`\`\`
Total Loss = Data Loss + λ × Σ(w²)

λ controls strength (hyperparameter)

Gradient: dL/dw = (normal gradient) + 2λw

Large w → bigger penalty → decay toward 0
\`\`\`

**Effect:** All weights shrink uniformly.

### L1 Regularization (Lasso)

\`\`\`
Total Loss = Data Loss + λ × Σ(|w|)

Gradient: dL/dw = (normal gradient) + λ × sign(w)

Drives less-important weights to exactly 0!
\`\`\`

**Effect:** Feature selection (some weights exactly 0).

## Regularization Strength

\`\`\`
λ = 0:     No regularization (overfit)
λ = 0.001: Light regularization (good balance)
λ = 0.1:   Strong regularization (underfit)
λ = 1.0:   Very strong (model too simple)
\`\`\`

**Tuning:** Use validation set to find best λ.

## Combining Techniques

**Best practice:**
\`\`\`
Layer 1: Dense → BatchNorm → Activation → Dropout
Layer 2: Dense → BatchNorm → Activation → Dropout
...
\`\`\`

## When to Use

| Technique | Use For | Strength |
|-----------|---------|----------|
| Dropout | Large networks | Simple, effective |
| L2 Reg | All models | Standard |
| L1 Reg | Feature selection | Interpretability |
| Batch Norm | Deep networks | Stabilizes training |
| Early stopping | General | Prevents overfitting |

## Early Stopping

**Simplest regularization:**
\`\`\`
Train until validation loss stops improving
Stop and use that model

Why? Prevents overfitting!
\`\`\`
`,
          starterCode: `import numpy as np

# Dropout simulation
class DropoutLayer:
    def __init__(self, dropout_rate=0.5):
        self.dropout_rate = dropout_rate
    
    def forward(self, x, training=True):
        if not training:
            return x  # No dropout at test time
        
        # Create mask
        mask = np.random.binomial(1, 1 - self.dropout_rate, x.shape)
        
        # Apply dropout and scale
        x = x * mask / (1 - self.dropout_rate)
        return x

# Test
dropout = DropoutLayer(dropout_rate=0.5)

# Training
x_original = np.ones((10, 100))

print("=== Dropout in Training ===")
for i in range(3):
    x_dropped = dropout.forward(x_original, training=True)
    active_neurons = np.sum(x_dropped > 0)
    print(f"Batch {i+1}: {active_neurons}/100 neurons active (dropped {100-active_neurons})")

# Testing
print("\\n=== Dropout at Test Time ===")
x_test = dropout.forward(x_original, training=False)
active_test = np.sum(x_test > 0)
print(f"Test: {active_test}/100 neurons active (all used!)")

# L2 Regularization
print("\\n=== L2 Regularization Effect ===")
w_unregularized = np.random.randn(100) * 10
w_regularized = w_unregularized * 0.5 ** np.arange(100) / 100

print(f"Unregularized: mean={np.mean(np.abs(w_unregularized)):.4f}, max={np.max(np.abs(w_unregularized)):.4f}")
print(f"Regularized:   mean={np.mean(np.abs(w_regularized)):.4f}, max={np.max(np.abs(w_regularized)):.4f}")
print(f"\\n✓ Regularization shrinks large weights!")
`,
        },
      ],
    },
    {
      id: "dl-deployment",
      moduleId: "deep-learning",
      lessonNumber: 10,
      title: "Transfer Learning & Model Deployment",
      description: "Use pre-trained models and deploy neural networks in production.",
      duration: "26 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Transfer Learning",
          content: `# Transfer Learning

## The Problem: Training from Scratch

\`\`\`
ResNet-50 with ImageNet pre-training:
- 50 layers
- ~25 million parameters
- Trained on 1.2 million images
- Training time: Days on GPU

You have 1000 images: 
- Training from scratch: Slow, prone to overfitting
- You don't have enough data!

Solution: Use the pre-trained model!
\`\`\`

## Transfer Learning: Reuse & Adapt

**Idea:** A model trained on ImageNet learned general visual features!

\`\`\`
Pre-trained ResNet:
Layer 1-48: General features (edges, textures, shapes)
Layer 49-50: ImageNet-specific (1000 classes)

Your task (e.g., classify dog breeds):
Layer 1-48: Keep frozen (already good!)
Layer 49-50: Replace and train (only 10 layers!)
\`\`\`

## Two Approaches

### 1. Feature Extraction (Frozen Backbone)

\`\`\`
Pre-trained CNN (ImageNet)
    ↓
Remove last layers (frozen - don't train)
    ↓
Add new classification head (train this!)
    ↓
Fine-tune only the head (fast!)
\`\`\`

**Use when:** Limited data, similar task.

### 2. Fine-Tuning (Unfreeze Layers)

\`\`\`
Pre-trained model
    ↓
Unfreeze last few layers
    ↓
Train entire model with low learning rate
    ↓
Adapt all layers to your data
\`\`\`

**Use when:** Plenty of data, task significantly different.

## Which Layers to Unfreeze?

\`\`\`
Layer 1-10: Very general (edges, colors) → Keep frozen
Layer 11-30: Medium level (shapes, textures) → Maybe freeze
Layer 31-50: Task-specific (objects) → Definitely unfreeze

Rule of thumb:
- Different task: Freeze most, train last few
- Similar task: Unfreeze more layers
- Lots of data: Fine-tune everything
- Little data: Freeze most
\`\`\`

## Real-World Example: Dog Breed Classification

\`\`\`
Pre-trained: ImageNet (1000 classes, general objects)
Your task: Dog breeds (120 classes)

Approach:
1. Load ResNet-50 (pre-trained on ImageNet)
2. Remove last layer (was "1000 classes")
3. Add new last layer ("120 dog breeds")
4. Train new layer (quick!)
5. Optionally fine-tune last few layers (medium effort)

Result: 95% accuracy in hours!
Without transfer learning: 50% accuracy, days of training
\`\`\`

## Popular Pre-Trained Models

| Model | Task | Best For |
|-------|------|----------|
| ResNet-50 | ImageNet | General image classification |
| BERT | Wikipedia | Text understanding |
| GPT-2 | Wikipedia + WebText | Text generation |
| YOLO | COCO | Object detection |
| MobileNet | ImageNet | Mobile/edge devices |

Most available through: TensorFlow Hub, Hugging Face, PyTorch Hub
`,
          starterCode: `# Transfer Learning Example (Pseudocode)
import numpy as np

# Simulate pre-trained model
class PreTrainedModel:
    def __init__(self):
        # Pretend layers 1-48 are pre-trained
        self.frozen_layers = ["layer_1_50", "layer_51_100", "layer_101_500"]
        self.final_layer = "layer_1000"  # ImageNet (1000 classes)
    
    def freeze_backbone(self):
        """Freeze pre-trained layers"""
        for layer in self.frozen_layers:
            print(f"Freezing {layer}")
    
    def replace_head(self, n_classes):
        """Replace final layer for new task"""
        self.final_layer = f"layer_{n_classes}"
        print(f"Replaced head: new layer has {n_classes} classes")
    
    def train_head_only(self):
        """Train only the new head"""
        print(f"Training only: {self.final_layer}")
        print("Speed: FAST (only small layer)")
    
    def fine_tune(self, learning_rate=0.0001):
        """Unfreeze and fine-tune all layers"""
        print(f"Fine-tuning all layers (lr={learning_rate})")
        print("Speed: SLOW (many parameters)")
        print("Better accuracy: Usually 1-2%")

# Example
print("=== Transfer Learning Workflow ===\\n")

model = PreTrainedModel()

print("1. Load pre-trained ResNet-50")
print("   Already trained on 1.2M images!")

print("\\n2. Freeze backbone (keep learned features)")
model.freeze_backbone()

print("\\n3. Replace classification head")
print("   From: 1000 ImageNet classes")
print("   To: 120 dog breed classes")
model.replace_head(120)

print("\\n4. Train only the new head")
model.train_head_only()
print("   Time: ~10 minutes on GPU")
print("   Result: ~90% accuracy")

print("\\n5. Optional: Fine-tune all layers")
model.fine_tune(learning_rate=0.0001)
print("   Time: ~1 hour on GPU")
print("   Result: ~95% accuracy")

print("\\n=== Benefits ===")
print("✓ 100x faster training")
print("✓ Need less data")
print("✓ Better accuracy")
print("✓ Leverages knowledge from millions of images")
`,
        },
        {
          pageNumber: 2,
          title: "Deployment & Production Considerations",
          content: `## Deploying Models in Production

### Model Export Formats

\`\`\`
PyTorch → ONNX → Works everywhere
TensorFlow → SavedModel → TensorFlow Serving
Keras → .h5 or SavedModel → Any framework
\`\`\`

### Quantization (Make Models Smaller)

**Problem:** Neural network weights are 32-bit floats (4 bytes each).

**Solution:** Use 8-bit integers (1 byte)!

\`\`\`
Original: 100M parameters × 4 bytes = 400 MB
Quantized: 100M parameters × 1 byte = 100 MB  (4x smaller!)

Speed: 2-4x faster on mobile!
Accuracy: Usually only 0.5-1% drop!
\`\`\`

### Batch Inference

**Single prediction:**
\`\`\`
Input: One image → Model → Output
Latency: 100ms (slow)
\`\`\`

**Batch prediction:**
\`\`\`
Input: 32 images → Model → 32 outputs
Latency: 150ms (only 50% slower!)
Throughput: 32/150ms = 213 images/sec

Huge efficiency gain!
\`\`\`

### Monitoring in Production

\`\`\`
Track:
- Accuracy on real data
- Inference latency
- Memory usage
- Error rates

Alert if:
- Accuracy drops (model drift)
- Latency spikes (resource issue)
- Error rate increases
\`\`\`

### Data Drift

**Problem:** Production data different from training!

\`\`\`
Training: 2020 data
Production 2024: Different distribution!

Model's accuracy degrades over time.

Solution: Retrain periodically on new data
\`\`\`

## Deployment Platforms

| Platform | Use | Notes |
|----------|-----|-------|
| TensorFlow Serving | High-throughput | Google-maintained |
| TorchServe | PyTorch models | Easy setup |
| ONNX Runtime | Any framework | Lightweight |
| AWS SageMaker | Managed service | Auto-scaling |
| Hugging Face | NLP models | One-click deploy |

## Production Checklist

\`\`\`
✓ Model accuracy validated (>95%?)
✓ Tested on diverse data (edge cases?)
✓ Latency acceptable (<100ms?)
✓ Memory footprint reasonable (<100MB?)
✓ Quantized for mobile (if needed)
✓ Error handling implemented
✓ Monitoring set up
✓ Retraining pipeline ready
✓ Documentation complete
✓ Ethics/bias reviewed
\`\`\`

## Common Pitfalls

| Pitfall | How to Avoid |
|---------|-------------|
| Deploying without testing | Comprehensive test suite |
| Not handling edge cases | Anomaly detection layer |
| Forgetting to log decisions | Enable model explanability |
| Ignoring model drift | Monitor metrics continuously |
| Brittle preprocessing | Robust, versioned pipeline |

## Ethics & Fairness

Before deployment, ask:
- ✓ Does model work equally for all groups?
- ✓ Are predictions explainable?
- ✓ Are there unintended biases?
- ✓ Is data used ethically?
- ✓ Can users understand why they were rejected/approved?
`,
          starterCode: `import numpy as np

# Production model monitoring
class ModelMonitor:
    def __init__(self, threshold=0.05):
        self.accuracy_threshold = threshold
        self.training_accuracy = 0.95
        self.predictions_log = []
    
    def make_prediction(self, x):
        # Simulate prediction (in reality: actual model)
        return np.random.rand() > 0.05
    
    def log_prediction(self, pred, actual):
        self.predictions_log.append({'pred': pred, 'actual': actual})
    
    def check_model_drift(self):
        """Check if accuracy is degrading"""
        if len(self.predictions_log) < 100:
            return False
        
        recent = self.predictions_log[-100:]
        accuracy = sum(1 for p in recent if p['pred'] == p['actual']) / len(recent)
        
        drift = self.training_accuracy - accuracy
        
        if drift > self.accuracy_threshold:
            return True, drift
        return False, drift

# Simulate production
monitor = ModelMonitor(threshold=0.05)

print("=== Production Monitoring ===\\n")

# Simulate 200 predictions
for i in range(200):
    x = np.random.randn()
    pred = monitor.make_prediction(x)
    actual = np.random.rand() > 0.1  # Simulated ground truth
    monitor.log_prediction(pred, actual)
    
    # Check for drift every 50 predictions
    if (i + 1) % 50 == 0:
        has_drift, drift_amount = monitor.check_model_drift()
        status = "⚠️  DRIFT DETECTED" if has_drift else "✓ OK"
        print(f"Batch {i+1:3d}: Drift = {drift_amount:+.3f} - {status}")

print("\\n=== When to Retrain ===")
print("✓ Retrain when accuracy drops > 5%")
print("✓ Monthly retrain (if data stable)")
print("✓ Continuous retraining (if data rapidly changes)")
`,
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// MODULE 8 — Generative AI & LLMs
// ─────────────────────────────────────────────────────────────
const genaiModule: Module = {
  id: "generative-ai",
  title: "Generative AI & Large Language Models",
  slug: "generative-ai",
  description:
    "Master Generative AI from transformer architecture to practical LLM applications. 12 comprehensive lessons covering ChatGPT, fine-tuning, RAG, prompt engineering, and enterprise deployment.",
  introduction: `# Welcome to Generative AI 🤖

## What is Generative AI?

Generative AI systems create new content based on patterns learned from training data:

- **Text Generation** — ChatGPT, Claude, writing emails, code
- **Image Generation** — DALL-E, Midjourney, Stable Diffusion
- **Code Generation** — GitHub Copilot, helping write software
- **Music & Audio** — Generate music, voice synthesis
- **Video** — Generate videos from text prompts

**Generative AI is transforming every industry.**

## The LLM Revolution

Traditional AI: "Given input, predict output"
Large Language Models (LLMs): "Given context, predict next word, 1000 times"

\`\`\`
User: "What is Python?"
LLM: ["Python", "is", "a", "programming", "language", ...]
     (predicts each word based on context)
\`\`\`

## Why Now?

1. **Transformer Architecture** (2017) — Breakthrough enabling scaling
2. **More Data** — Internet-scale training
3. **More Compute** — GPUs & TPUs made large training feasible
4. **Better Techniques** — RLHF, instruction tuning, in-context learning

**Result:** Models that understand, reason, and generate human-like text

## The LLM Stack

\`\`\`
Pre-trained LLM (GPT-4, Claude, LLaMA)
         ↓
Fine-tune on your data (optional)
         ↓
Prompt engineering (craft good prompts)
         ↓
RAG (Retrieval-Augmented Generation) (add context)
         ↓
Deploy & integrate into applications
\`\`\`

## Prerequisites

✅ Modules 1-4 (Python, Pandas, Matplotlib, NumPy)
✅ Module 5-7 (ML, Advanced ML, Deep Learning) — Recommended but not required

We'll explain transformer concepts from scratch!

## What You'll Learn

1. **Transformer Architecture Deep Dive** — The foundation
2. **LLMs Explained** — How GPT-4, Claude work
3. **Training LLMs** — Pre-training, fine-tuning, RLHF
4. **Prompt Engineering** — Techniques to get best results
5. **In-Context Learning** — Few-shot prompting, chain-of-thought
6. **Retrieval-Augmented Generation (RAG)** — Add knowledge without fine-tuning
7. **Fine-Tuning LLMs** — Adapt models to your domain
8. **Building LLM Apps** — Use APIs, build chatbots
9. **LLM Optimization** — Quantization, caching, serving at scale
10. **Safety & Ethics** — Bias, hallucinations, responsible AI
11. **Multimodal LLMs** — Vision + language (GPT-4V, Claude 3)
12. **Future of GenAI** — Emerging trends & research

By the end, you'll understand how ChatGPT works and can build your own AI applications! 🚀`,
  icon: "🤖",
  color: "from-emerald-600 to-teal-900",
  level: "Advanced",
  totalDuration: "6h 45min",
  heroImage:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
  lessons: [
    {
      id: "genai-transformer-recap",
      moduleId: "generative-ai",
      lessonNumber: 1,
      title: "Transformer Architecture Deep Dive",
      description: "Understand the transformer architecture that powers all modern LLMs.",
      duration: "38 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Building Blocks: Attention Recap",
          content: `# Transformer Architecture

## What is a Transformer?

The **Transformer** is a neural network architecture introduced in the 2017 paper *"Attention Is All You Need"* (Vaswani et al., Google Brain). It replaced recurrent networks (RNNs/LSTMs) as the dominant architecture for sequence processing by relying entirely on a mechanism called **self-attention** — allowing every position in a sequence to directly attend to every other position in parallel, rather than processing tokens one-by-one.

Every modern large language model — GPT-4, Claude, LLaMA, Gemini — is built on the Transformer architecture. Understanding it at a mechanistic level is the gateway to understanding generative AI.

## Quick Recap: Self-Attention

Transformers are built entirely on attention mechanisms. Let's refresh:

\`\`\`
For each position in sequence:
1. Compute Query Q, Key K, Value V
2. Compute attention scores: Q · K^T / √d_k
3. Apply softmax to get weights
4. Multiply weights by V (weighted sum)

Result: Each position "attends to" other positions based on relevance!
\`\`\`

## Why Transformers Beat RNNs/LSTMs

\`\`\`
RNN/LSTM Problems:
- Sequential processing (slow!)
- Gradients vanish over long sequences
- Hard to parallelize

Transformer Benefits:
- Parallel processing (GPU-friendly!)
- Direct paths between distant words
- Better gradients (no recurrence)
- Scales to billions of parameters
\`\`\`

## The Full Transformer Block

\`\`\`
Input
  ↓
Layer Norm
  ↓
Multi-Head Attention (8+ heads)
  ↓
Residual Add (skip connection)
  ↓
Layer Norm
  ↓
Feed-Forward Network (2 dense layers)
  ↓
Residual Add (skip connection)
  ↓
Output

Repeat this N times (6-96 layers depending on model size)
\`\`\`

## Residual Connections (Why Skip Connections Matter)

\`\`\`
Without skip connections:
Output = f(Input)

With skip connections:
Output = Input + f(Input)

Benefits:
- Gradients flow directly through skip connection (easier learning)
- Network learns residuals (differences) instead of full transformations
- Allows much deeper networks (100+ layers)
\`\`\`

## Positional Encoding (Not Just Position Numbers!)

\`\`\`
Naive approach:
Position 1: [1, 0, 0, ...]
Position 2: [2, 0, 0, ...]
Problem: Large position numbers dwarf embedding values!

Sinusoidal Encoding (what transformers use):
PE(pos, 2i) = sin(pos / 10000^(2i/d))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d))

Benefit:
- Bounded values (between -1 and 1)
- Model can learn positional relationships easily
- Smooth interpolation
\`\`\`
`,
          starterCode: `import numpy as np

# Simplified transformer attention
def scaled_dot_product_attention(Q, K, V, d_k):
    scores = np.matmul(Q, K.T) / np.sqrt(d_k)
    weights = np.exp(scores) / np.sum(np.exp(scores))
    output = np.matmul(weights, V)
    return output

# Example
seq_len = 4
d_model = 8
d_k = d_model // 2

# Random queries, keys, values
Q = np.random.randn(seq_len, d_k)
K = np.random.randn(seq_len, d_k)
V = np.random.randn(seq_len, d_model)

output = scaled_dot_product_attention(Q, K, V, d_k)

print("=== Transformer Attention ===")
print(f"Input shape: ({seq_len}, {d_model})")
print(f"Output shape: {output.shape}")
print(f"\\nAttention enables each token to see all other tokens!")
print(f"✓ Parallel processing (unlike RNNs)")
print(f"✓ Long-range dependencies")
print(f"✓ GPU-friendly (matrix operations)")
`,
        },
      ],
    },
    {
      id: "genai-llm-architecture",
      moduleId: "generative-ai",
      lessonNumber: 2,
      title: "Large Language Models (LLMs) Explained",
      description: "How ChatGPT, Claude, and other LLMs work at a high level.",
      duration: "35 min",
      difficulty: "Beginner",
      pages: [
        {
          pageNumber: 1,
          title: "From Transformers to ChatGPT",
          content: `# Large Language Models (LLMs)

## What is an LLM?

A Large Language Model is:
- A transformer network
- Pre-trained on billions of text tokens
- Learns to predict the next word
- Scaled to hundreds of billions of parameters

\`\`\`
Input: "The cat sat on the"
LLM: "mat" (predicts next word)

Input: "What is 2+2?"
LLM: "4" (learned from examples)

Input: "Write a poem about"
LLM: Generates coherent, creative text
\`\`\`

## Training Process

### Stage 1: Pre-training (Next Token Prediction)

\`\`\`
Training data: Entire internet (books, websites, code)
Objective: Predict next word given previous words
Learning: Billions of examples → learns language patterns

Loss function:
- For each word, compute probability of next word
- Compare to actual next word
- Minimize cross-entropy loss
\`\`\`

### Stage 2: Supervised Fine-Tuning (Optional)

\`\`\`
Training data: Human-written examples of good responses
Objective: Learn to follow instructions better

Example:
User: "Summarize this text: [long text]"
Model: "[good summary]"

Loss: Minimize difference between model output and human-written summary
\`\`\`

### Stage 3: Reinforcement Learning from Human Feedback (RLHF)

\`\`\`
Training data: Human rankings of different outputs
Objective: Learn which responses are better

Example:
User: "How to make friends?"
Response A: [helpful advice]
Response B: [vague nonsense]

Human rates: Response A >> Response B

Model learns: Generate Response A-like outputs
\`\`\`

## Model Sizes

\`\`\`
Small (7B params):    1-2 hours training, cheap inference
Medium (13-70B):      Balanced
Large (175B+):        GPT-3, Claude
Huge (1T+ params):    Future models, not yet practical

Rule: More parameters → Better understanding & reasoning
      But: Slower, more expensive, more compute
\`\`\`

## Inference (Using the Model)

\`\`\`
User input: "What is Python?"

Step 1: Tokenize: ["What", "is", "Python", "?"]
Step 2: Convert to numbers: [1234, 567, 890, 123]
Step 3: Feed through transformer (generate next token probabilities)
Step 4: Sample from probabilities (pick next word)
Step 5: Repeat steps 3-4 until done or [END] token

Output: "Python is a programming language..."
\`\`\`

## Key Insight: Emergent Abilities

With enough scale:
- Models without explicit training suddenly can:
  - Translate languages
  - Write code
  - Answer questions
  - Reason about problems

These abilities "emerge" from scale! Not explicitly programmed.
`,
          starterCode: `# Simplified LLM inference
import numpy as np

# Pretend we have a trained LLM vocabulary
vocab = ["the", "cat", "sat", "on", "mat", ".", "dog", "ran", "in", "park"]
word2id = {word: i for i, word in enumerate(vocab)}
id2word = {i: word for word, i in word2id.items()}

# Simulate next word prediction (in reality, from neural network)
def next_word_distribution(previous_words):
    """Simulate LLM predicting next word probabilities"""
    # In reality: neural network computes this
    # For demo: rules based on word patterns
    
    context = " ".join(previous_words)
    probs = np.zeros(len(vocab))
    
    # Hand-crafted patterns (LLM learns these!)
    if "cat" in context:
        probs[word2id["sat"]] = 0.5
        probs[word2id["on"]] = 0.3
    elif "dog" in context:
        probs[word2id["ran"]] = 0.5
        probs[word2id["in"]] = 0.3
    elif "sat" in context:
        probs[word2id["on"]] = 0.8
    elif "on" in context:
        probs[word2id["the"]] = 0.8
    
    # Normalize
    probs = probs / (np.sum(probs) + 1e-10)
    probs = probs + 0.01  # Add small probability to all words
    probs = probs / np.sum(probs)
    
    return probs

# Generate text
prompt = ["the", "cat"]
generated = prompt.copy()

print("=== LLM Text Generation ===")
print(f"Prompt: {' '.join(prompt)}")
print(f"\\nGenerating text...")

for step in range(5):
    probs = next_word_distribution(generated)
    next_id = np.random.choice(len(vocab), p=probs)
    next_word = id2word[next_id]
    generated.append(next_word)
    print(f"  Step {step+1}: '{next_word}' (probability: {probs[next_id]:.2f})")

print(f"\\nFull output: {' '.join(generated)}")
print(f"\\n✓ This is how LLMs work!")
print(f"✓ Predict one word at a time")
print(f"✓ Probability distribution over vocabulary")
`,
        },
      ],
    },
    {
      id: "genai-prompt-engineering",
      moduleId: "generative-ai",
      lessonNumber: 3,
      title: "Prompt Engineering & Techniques",
      description: "Master the art of writing effective prompts to get the best results from LLMs.",
      duration: "32 min",
      difficulty: "Beginner",
      pages: [
        {
          pageNumber: 1,
          title: "Prompting Techniques",
          content: `# Prompt Engineering

## What is Prompt Engineering?

Prompt Engineering = Art of writing prompts to get best results from LLMs.

\`\`\`
Bad prompt: "Explain Python"
LLM: [vague, generic response]

Good prompt: "Explain Python to a complete beginner who has never coded before. Use simple language and give 2-3 real-world examples."
LLM: [detailed, beginner-friendly response]
\`\`\`

The difference: Better prompt → Better output!

## Core Principles

### 1. Be Specific & Clear

\`\`\`
Bad: "Tell me about machine learning"
Good: "Explain the difference between supervised and unsupervised learning. Give a concrete example of each."
\`\`\`

### 2. Give Context

\`\`\`
Bad: "Translate this"
Good: "Translate the following Spanish sentence to English: 'El gato está en la mesa.'"
\`\`\`

### 3. Specify Output Format

\`\`\`
Bad: "Summarize this article"
Good: "Summarize this article in 2-3 sentences. Format as: Key point 1: ... Key point 2: ..."
\`\`\`

### 4. Use Examples (Few-Shot Prompting)

\`\`\`
Without examples:
"Classify sentiment: 'This movie is great!' → ?"

With examples:
"Classify sentiment:
- 'This movie is great!' → Positive
- 'Terrible waste of time' → Negative
- 'Pretty good movie' → ?"

LLM learns from examples!
\`\`\`

### 5. Chain-of-Thought (CoT)

Ask the model to "think through" problems:

\`\`\`
Bad prompt: "If there are 5 apples and 3 are red, what percent are red?"

Good prompt: "If there are 5 apples and 3 are red, what percent are red? Think step-by-step."

LLM output:
Step 1: Red apples = 3
Step 2: Total apples = 5
Step 3: Percentage = (3/5) × 100 = 60%
Answer: 60%
\`\`\`

Better reasoning, fewer mistakes!

## Advanced Techniques

### Role-Playing

\`\`\`
Prompt: "You are an expert Python teacher. Explain decorators to a student who knows functions."

LLM: [Uses teaching expertise, adjusts explanation level]
\`\`\`

### Temperature & Randomness

\`\`\`
Temperature = 0 (Deterministic)
- Always picks most likely word
- Good for factual questions

Temperature = 1.0 (Balanced)
- Standard randomness
- Good for general use

Temperature = 2.0 (Creative)
- Picks random words
- Good for creative writing
\`\`\`

### Using System Prompts

\`\`\`
System: "You are a friendly Python tutor. Explain concepts simply but accurately."
User: "What is a list?"

LLM: [Acts as friendly tutor, explains simply]
\`\`\`
`,
          starterCode: `# Demonstrating prompt quality

prompts = {
    "bad": "Explain Python",
    "good": "Explain Python for someone learning to code for the first time. Include 2 real-world uses.",
    "specific": "Compare Python and JavaScript for web development. Format your answer as: Python advantages: ... JavaScript advantages: ...",
    "with_example": "Classify sentiment. Examples: 'Love it!' = Positive, 'Hate it' = Negative. Now classify: 'It\\'s okay'",
}

print("=== Prompt Engineering Quality ===\\n")

for style, prompt in prompts.items():
    print(f"{style.upper()}")
    print(f"  Prompt: {prompt[:60]}..." if len(prompt) > 60 else f"  Prompt: {prompt}")
    print(f"  Characteristics: ", end="")
    
    if style == "bad":
        print("Too vague, generic response likely")
    elif style == "good":
        print("Specific, gives context, clear audience")
    elif style == "specific":
        print("Specifies output format (structured)")
    elif style == "with_example":
        print("Few-shot learning (examples provided)")
    
    print()

print("\\n✓ Better prompts = Better responses!")
print("✓ Key: Be specific, give examples, specify format")
`,
        },
      ],
    },
    {
      id: "genai-rag",
      moduleId: "generative-ai",
      lessonNumber: 4,
      title: "Retrieval-Augmented Generation (RAG)",
      description: "Add knowledge to LLMs without fine-tuning using RAG systems.",
      duration: "34 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "RAG Concepts & Architecture",
          content: `# Retrieval-Augmented Generation (RAG)

## The Problem: Knowledge Cutoff

LLMs are trained on data up to a certain date:
- GPT-4 trained until April 2023
- After that date: Model doesn't know

\`\`\`
User: "What happened on May 1, 2024?"
GPT-4: "I don't know, my training ended before that."
\`\`\`

## The Solution: RAG

Instead of retraining the model:
1. Store your documents in a database
2. When user asks a question:
   - Search documents for relevant info
   - Give relevant info to LLM
   - LLM answers based on context

\`\`\`
User: "What are the new policies?"

System:
  1. Search knowledge base for "policies"
  2. Find: "New policy document from May 2024"
  3. Pass to LLM: "Based on this document: [text]... Answer: what are the new policies?"
  4. LLM: "The new policies are..."
\`\`\`

## Why RAG is Powerful

| Approach | Cost | Speed | Freshness | Accuracy |
|----------|------|-------|-----------|----------|
| Fine-tuning | $$$$$ | Slow | Days | Good |
| RAG | $$ | Fast | Real-time | Excellent |
| No knowledge | $ | Very Fast | N/A | Poor |

## RAG Architecture

\`\`\`
Documents → Vector Database
  ↑
  |
User Question → Embedding → Search → Top K Results → LLM → Answer
\`\`\`

### Step 1: Vectorize Documents

\`\`\`
Document: "Python is a programming language"
Embedding: [0.2, -0.5, 0.8, 0.1, ...] (1024D vector)

Embedding captures semantic meaning!
Similar documents → Similar embeddings
\`\`\`

### Step 2: Search for Relevant Documents

\`\`\`
User question: "How do I learn Python?"
Question embedding: [0.25, -0.48, 0.75, 0.12, ...] (similar to "Python document"!)

Search: Find K documents with highest similarity
\`\`\`

### Step 3: Pass to LLM with Context

\`\`\`
System message: "Use these documents to answer:"
Documents: [retrieved documents]
User question: "How do I learn Python?"

LLM: [answers based on context]
\`\`\`

## Practical Example: Customer Support Bot

\`\`\`
Company stores:
- Product manuals
- FAQs
- Support tickets
- Policies

Customer: "How do I return an item?"
RAG system:
  1. Search knowledge base → Find return policy
  2. Pass to LLM with policy
  3. LLM: "According to our policy: [details] Steps: [steps]"
\`\`\`

## Vector Databases (Tools)

| Tool | Best For |
|------|----------|
| Pinecone | Managed, easy |
| Weaviate | Open source, flexible |
| Milvus | Scalable, enterprise |
| Chroma | Local/small projects |
| Qdrant | Performance |

## RAG vs Fine-tuning

\`\`\`
Use RAG when:
- Knowledge changes frequently
- Need up-to-date info
- Multiple knowledge sources
- Quick implementation needed

Use Fine-tuning when:
- Want to change model behavior/style
- Need performance optimization
- Training data is stable
- Cost not a concern
\`\`\`
`,
          starterCode: `# Simplified RAG system

from collections import Counter

# Knowledge base
documents = {
    1: "Python is a programming language created by Guido van Rossum",
    2: "Python is used for web development, data science, and automation",
    3: "To learn Python, start with variables, functions, and loops",
    4: "NumPy is a Python library for numerical computing",
    5: "Machine learning uses Python with scikit-learn and TensorFlow",
}

def simple_search(query, documents, top_k=2):
    """Very simple search - count word matches"""
    query_words = set(query.lower().split())
    
    scores = {}
    for doc_id, text in documents.items():
        text_words = set(text.lower().split())
        # Count common words
        common = len(query_words & text_words)
        scores[doc_id] = common
    
    # Get top K
    top_docs = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:top_k]
    return [documents[doc_id] for doc_id, _ in top_docs]

# User question
query = "How do I learn Python?"

print("=== RAG System Demo ===\\n")
print(f"User: {query}\\n")

# Step 1: Search
results = simple_search(query, documents, top_k=2)
print(f"Retrieved documents:")
for i, doc in enumerate(results, 1):
    print(f"  {i}. {doc}")

# Step 2: Generate (simplified)
print(f"\\nLLM with context:")
print(f"  'To learn Python, you should start with variables, functions, and loops.'")
print(f"\\nThis is RAG: Retrieve documents → Feed to LLM → Get answer")
print(f"✓ Accurate answers based on knowledge base")
print(f"✓ No need to retrain LLM")
print(f"✓ Works with fresh/dynamic knowledge")
`,
        },
      ],
    },
    {
      id: "genai-finetuning",
      moduleId: "generative-ai",
      lessonNumber: 5,
      title: "Fine-Tuning LLMs",
      description: "Adapt pre-trained LLMs to your specific domain or style.",
      duration: "36 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Fine-Tuning Strategies",
          content: `# Fine-Tuning Large Language Models

## What is Fine-Tuning?

Fine-tuning = Taking a pre-trained LLM and training it on your specific data.

\`\`\`
Pre-trained model: General knowledge (trained on internet)
Fine-tuning data: Your specific data (domain knowledge)
Result: Model that acts like you want
\`\`\`

## Why Fine-Tune?

\`\`\`
Base GPT-3.5: General responses
Fine-tuned on customer service: Customer service responses
Fine-tuned on medical data: Medical advice (with proper disclaimers)
Fine-tuned on code: Code generation for your style
\`\`\`

## Fine-Tuning vs RAG

\`\`\`
Fine-Tuning:
- Modifies model weights
- Learning is "baked in"
- Better for style/behavior changes
- More expensive, slower
- Changes how model thinks

RAG:
- Model stays the same
- Adds context at inference time
- Better for knowledge addition
- Cheaper, faster
- Model retrieves then answers
\`\`\`

## Types of Fine-Tuning

### Full Fine-Tuning

\`\`\`
Train ALL parameters of the model.

Pros:
- Best quality
- Model fully adapts

Cons:
- Expensive (requires GPU, lots of data)
- Time-consuming
- Requires hundreds of examples
\`\`\`

### Parameter-Efficient Fine-Tuning (PEFT)

\`\`\`
Train only a small percentage of parameters.

Main techniques:
1. LoRA (Low-Rank Adaptation) - Train 1-2% of params
2. QLoRA - Quantized LoRA (cheaper)
3. Prefix tuning - Add learnable prefixes
4. Adapter layers - Add small trainable modules
\`\`\`

### Instruction Fine-Tuning

\`\`\`
Training data format:
{
  "instruction": "Summarize this text",
  "input": "[long text]",
  "output": "[summary]"
}

Model learns: instruction → output
\`\`\`

### RLHF (Reinforcement Learning from Human Feedback)

\`\`\`
Stage 1: Supervised fine-tuning
- Train on high-quality examples

Stage 2: Reward model training
- Train model to predict human preferences
- Humans rate outputs (this is better vs that is better)

Stage 3: Policy optimization
- Use reward model to fine-tune LLM
- Optimize for "human-preferred" outputs
\`\`\`

## Fine-Tuning Process

\`\`\`
Step 1: Prepare data (100-1000+ examples)
Step 2: Format data correctly
Step 3: Choose base model
Step 4: Fine-tune (hours to days)
Step 5: Evaluate on test set
Step 6: Deploy and monitor
\`\`\`

## Data Requirements

\`\`\`
Small model (7B):    100-500 examples minimum
Medium (13-70B):     500-5K examples
Large (175B+):       Thousands of examples

Quality > Quantity:
- 100 high-quality examples > 1000 random examples
\`\`\`

## Cost Comparison

\`\`\`
GPT-3.5 Fine-tuning: $0.008 per 1K tokens (input), $0.012 (output)
Claude Fine-tuning: Similar pricing
Open source (LLaMA): Free (run yourself)

ROI: Better model → Better results → Worth it if using heavily
\`\`\`

## Risks & Challenges

\`\`\`
Catastrophic forgetting: Model "forgets" general knowledge
- Solution: Blend original data with new data during training

Overfitting: Model memorizes training data
- Solution: Validation set, early stopping, regularization

Data quality: Bad training data → Bad results
- Solution: Carefully curate & clean training data

Bias amplification: Fine-tuning can amplify biases
- Solution: Diverse training data, bias testing
\`\`\`
`,
          starterCode: `# Fine-tuning concept simulation

import numpy as np

# Simulate a model
class SimpleLanguageModel:
    def __init__(self, vocab_size=1000):
        self.weights = np.random.randn(vocab_size, 128)
        self.vocab_size = vocab_size
    
    def compute_loss(self, data):
        """Compute loss on data"""
        total_loss = np.mean((data - self.weights[:10])**2)
        return total_loss

# Pretrained model
print("=== Fine-Tuning Simulation ===\\n")

model = SimpleLanguageModel()

# Evaluate on general knowledge
general_data = np.random.randn(10, 128)
general_loss = model.compute_loss(general_data)
print(f"Pre-trained model:")
print(f"  Loss on general knowledge: {general_loss:.4f}")

# Evaluate on specific domain (medical)
medical_data = np.random.randn(10, 128) + 2  # Different distribution
medical_loss = model.compute_loss(medical_data)
print(f"  Loss on medical domain: {medical_loss:.4f} (worse!)")

print(f"\\nAfter fine-tuning on medical data:")
# Simulate fine-tuning (updating weights toward medical data)
model.weights[:10] = model.weights[:10] * 0.7 + medical_data.mean(axis=0) * 0.3

medical_loss_after = model.compute_loss(medical_data)
general_loss_after = model.compute_loss(general_data)
print(f"  Loss on medical domain: {medical_loss_after:.4f} (improved!)")
print(f"  Loss on general knowledge: {general_loss_after:.4f} (slightly worse - trade-off)")

print(f"\\n✓ Fine-tuning adapts model to specific domain")
print(f"✓ Trade-off: Better on domain, slightly worse on general tasks")
print(f"✓ Solution: Use both domain + general data during training")
`,
        },
      ],
    },
    {
      id: "genai-deployment",
      moduleId: "generative-ai",
      lessonNumber: 6,
      title: "Building & Deploying LLM Applications",
      description: "Build chatbots, agents, and deploy LLMs in production.",
      duration: "38 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "LLM Application Architecture",
          content: `# Building LLM Applications

## Basic LLM Application Pattern

\`\`\`
User Input
    ↓
Process/Validate Input
    ↓
Send to LLM (with prompt engineering)
    ↓
Process Output
    ↓
Return to User
\`\`\`

## Using LLM APIs

Most developers use APIs instead of running models locally:

\`\`\`
Services:
- OpenAI API (GPT-4, GPT-3.5)
- Anthropic API (Claude)
- Google PaLM API
- Open-source: HuggingFace Inference API

Benefits:
- No need to run models locally (expensive!)
- Latest model versions
- Pay per use
- Handled scaling & infrastructure
\`\`\`

## Building a Chatbot

\`\`\`
Architecture:
1. User sends message
2. Store in conversation history
3. Send history + new message to LLM
4. Store response in history
5. Return response to user

Key: Keep conversation context!
\`\`\`

### Conversation Memory

\`\`\`
Without memory:
User: "My name is Alice"
LLM: "Nice to meet you Alice"
User: "What's my name?"
LLM: "I don't know"

With memory (context window):
User: "My name is Alice"
Context: "My name is Alice"
User: "What's my name?"
Context: "[previous messages], User: 'What's my name?'"
LLM: "Your name is Alice"
\`\`\`

## LLM Agents (Autonomous Behaviors)

An agent uses an LLM plus tools:

\`\`\`
Tools available:
- Calculator
- Web search
- Database query
- Send email

Agent loop:
1. User asks question
2. LLM decides which tool to use
3. Tool executes
4. LLM gets result
5. Returns answer or asks for more tools

Example:
User: "What's the weather and stock price of Apple?"
LLM: "I need weather API and stock API"
  → Calls weather API
  → Calls stock API
  → Combines results: "Weather is sunny, Apple stock is $150"
\`\`\`

## Cost Optimization

\`\`\`
Expensive:
- Sending entire conversation history every request
- Using expensive models for simple tasks
- Running models locally

Optimized:
- Cache common prompts
- Use cheaper models (GPT-3.5 vs GPT-4)
- Use RAG instead of fine-tuning
- Batch requests
- Use open-source models (LLaMA) for simple tasks
\`\`\`

## Handling Limitations

### Hallucinations (Making Stuff Up)

\`\`\`
LLM: "Einstein won the Nobel Prize in Physics in 1921"
Reality: True! (just checking you know)

LLM: "Python's creator is Steve Jobs"
Reality: False! (Guido van Rossum) - This is hallucination

Solutions:
1. Fact-check with RAG/knowledge base
2. Ask model for sources
3. Use smaller models trained for factuality
4. Fine-tune on factual data
\`\`\`

### Token Limits

\`\`\`
GPT-4: 8K-128K tokens per request
Claude 3: Up to 200K tokens

Solutions:
- Summarize long conversations
- Keep relevant context only
- Use embeddings to find important parts
\`\`\`

### Latency

\`\`\`
Problem: API calls can be slow
- OpenAI API: 1-10 seconds
- Local models: 100-500ms

Solutions:
- Cache common requests
- Use streaming (show response as it comes)
- Queue requests if needed
\`\`\`

## Deployment Patterns

\`\`\`
Pattern 1: Hosted API
- Send requests to provider (OpenAI, Anthropic)
- Simplest, no infrastructure
- Pay per request

Pattern 2: Self-hosted open model
- Run model on your servers
- Full control, privacy
- Need GPU resources

Pattern 3: Hybrid
- Critical paths use local models
- General queries use APIs
- Best of both
\`\`\`
`,
          starterCode: `# Simplified LLM application

class SimpleChatBot:
    def __init__(self, model_name="gpt-4"):
        self.model_name = model_name
        self.conversation_history = []
        self.system_prompt = "You are a helpful assistant."
    
    def add_message(self, role, content):
        """Add message to conversation history"""
        self.conversation_history.append({
            "role": role,
            "content": content
        })
    
    def chat(self, user_message):
        """Process user message and generate response"""
        # Add user message to history
        self.add_message("user", user_message)
        
        # In real implementation: send to API
        # For demo: return example
        
        # Count words to simulate "thinking"
        word_count = len(user_message.split())
        response = f"[{self.model_name}] I received your message with {word_count} words. "
        
        if len(self.conversation_history) > 2:
            response += f"This is message #{len(self.conversation_history)//2}. "
        
        response += "How can I help?"
        
        # Add bot response to history
        self.add_message("assistant", response)
        
        return response
    
    def get_context(self):
        """Show conversation context (what would be sent to API)"""
        context = f"System: {self.system_prompt}\\n"
        for msg in self.conversation_history:
            context += f"{msg['role']}: {msg['content']}\\n"
        return context

# Test
print("=== LLM Chatbot Demo ===\\n")

bot = SimpleChatBot()

# Turn 1
response1 = bot.chat("What is Python?")
print(f"User: What is Python?")
print(f"Bot: {response1}\\n")

# Turn 2
response2 = bot.chat("Can you compare it to JavaScript?")
print(f"User: Can you compare it to JavaScript?")
print(f"Bot: {response2}\\n")

# Show context (what chatbot remembers)
print("=== Conversation Context (sent to LLM) ===")
print(bot.get_context())

print(f"\\n✓ Chatbot maintains conversation history")
print(f"✓ Context is sent with each request")
print(f"✓ Real LLMs use this to maintain conversation")
`,
        },
      ],
    },
    {
      id: "genai-safety-ethics",
      moduleId: "generative-ai",
      lessonNumber: 7,
      title: "Safety, Ethics & Responsible AI",
      description: "Understand bias, hallucinations, safety concerns, and responsible deployment of LLMs.",
      duration: "30 min",
      difficulty: "Beginner",
      pages: [
        {
          pageNumber: 1,
          title: "Responsible LLM Usage",
          content: `# Safety, Ethics & Responsible AI

## Key Concerns with LLMs

### 1. Hallucinations (Making Up Facts)

\`\`\`
User: "Who was the first president of Argentina?"
GPT-4: "Juan Manuel de Rosas" (WRONG - correct: Manuel Belgrano)

Why? Model is predicting likely text, not retrieving facts!
\`\`\`

**Mitigation:**
- Use RAG for factual questions
- Fine-tune on factual data
- Fact-check outputs
- Acknowledge limitations

### 2. Bias

\`\`\`
Training data contains human biases
- Gender bias (women underrepresented in tech)
- Race bias (historical stereotypes)
- Socioeconomic bias (favors wealthy topics)

Model learns and reproduces these biases!

Example:
Prompt: "A successful programmer is..."
Response: "A successful programmer is a smart young man..."
(Subtle bias toward male gender)
\`\`\`

**Mitigation:**
- Diverse training data
- Bias testing before deployment
- Monitoring outputs for bias
- Allow user feedback

### 3. Misuse & Harmful Content

\`\`\`
LLMs can be misused for:
- Generating misinformation
- Creating spam/phishing
- Automating harassment
- Synthesizing illegal content

Safeguards (implemented by OpenAI, etc.):
- Refuse harmful requests
- No sexual content involving minors
- No instructions for violence
- No impersonation
\`\`\`

### 4. Privacy Concerns

\`\`\`
If you send private data to an LLM API:
- Data goes to company servers
- Company may store/use it for training
- Data could be at risk

Examples:
- Don't send: patient medical records, financial data, trade secrets
- Do send: generic questions, public information

OpenAI Policy:
- Business API data: Not stored or used for training
- ChatGPT free tier: May be stored
\`\`\`

### 5. Deepfakes & Misinformation

\`\`\`
LLMs can generate:
- Fake news articles
- Convincing lies
- Manipulated quotes

Impact:
- Election interference
- Stock manipulation  
- Damage to reputations

Defense:
- Media literacy
- Fact-checking AI detection tools
- Digital signatures for authentic content
\`\`\`

## Responsible Deployment

### Transparency

Tell users:
- "This response generated by AI"
- "May contain errors"
- "Not a substitute for expert advice"

### Accountability

- Have human oversight
- Allow feedback/corrections
- Monitor for misuse
- Document decisions

### Fairness Testing

Before deployment:
- Test for gender bias
- Test for racial bias
- Test for socioeconomic bias
- Use diverse test scenarios

### Data Privacy

- Don't send sensitive data to APIs
- Use self-hosted models for sensitive data
- Comply with regulations (GDPR, etc.)
- Get user consent

## Regulations & Future

\`\`\`
Emerging regulations:
- EU AI Act: Classifies AI by risk
- US Executive Order on AI
- China AI regulation

Requirements:
- Transparency (explain decisions)
- Human oversight (especially high-stakes)
- Bias auditing
- Incident reporting

Expect: More regulation incoming!
\`\`\`

## Best Practices

1. **Transparency:** Disclose AI use
2. **Accuracy:** Fact-check, especially factual claims
3. **Fairness:** Test for bias
4. **Privacy:** Don't send sensitive data
5. **Accountability:** Have oversight
6. **Explainability:** Help users understand reasoning
7. **Safety:** Consider misuse potential
8. **Consent:** Ask before using user data
`,
          starterCode: `# Ethical concerns demonstration

class EthicsChecker:
    def __init__(self):
        self.harmful_keywords = ["bomb", "poison", "kill", "hack"]
        self.sensitive_fields = ["password", "credit_card", "ssn", "medical"]
        self.bias_patterns = ["women are", "men are", "[race] people"]
    
    def check_safety(self, text):
        """Check if text contains harmful requests"""
        issues = []
        
        text_lower = text.lower()
        for keyword in self.harmful_keywords:
            if keyword in text_lower:
                issues.append(f"⚠️ Potentially harmful: contains '{keyword}'")
        
        return issues
    
    def check_privacy(self, text):
        """Check if text contains sensitive information"""
        issues = []
        
        text_lower = text.lower()
        for field in self.sensitive_fields:
            if field in text_lower:
                issues.append(f"🔒 Privacy concern: mentions '{field}'")
        
        return issues
    
    def check_bias(self, response):
        """Check if response contains biased language"""
        issues = []
        
        if "woman" in response.lower() and "emotional" in response.lower():
            issues.append("⚠️ Potential gender bias detected")
        
        if "man" in response.lower() and "strong" in response.lower():
            issues.append("⚠️ Potential gender bias detected")
        
        return issues

# Test
print("=== LLM Safety & Ethics Checker ===\\n")

checker = EthicsChecker()

test_cases = [
    ("What is Python?", "Safe query"),
    ("How to make a bomb", "Harmful request"),
    ("My SSN is 123-45-6789", "Privacy leak"),
    ("Women are emotional, men are strong", "Biased statement"),
]

for query, label in test_cases:
    print(f"Query: {query}")
    print(f"Category: {label}")
    
    safety_issues = checker.check_safety(query)
    privacy_issues = checker.check_privacy(query)
    
    if safety_issues:
        for issue in safety_issues:
            print(f"  {issue}")
    if privacy_issues:
        for issue in privacy_issues:
            print(f"  {issue}")
    
    if not safety_issues and not privacy_issues:
        print(f"  ✓ Safe")
    
    print()

print("\\n✓ LLM safety requires multiple checks")
print("✓ Transparency, privacy, and fairness are critical")
`,
        },
      ],
    },
    {
      id: "genai-multimodal",
      moduleId: "generative-ai",
      lessonNumber: 8,
      title: "Multimodal LLMs & Vision-Language Models",
      description: "Models that understand both text and images (GPT-4V, Claude 3, etc).",
      duration: "28 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Vision + Language Integration",
          content: `# Multimodal Large Language Models

## What is Multimodal?

Multimodal = A single model that processes multiple types of data:
- Text
- Images
- Audio (some models)
- Video (some models)

\`\`\`
Text-only LLM:
Input: "What's in this image?" 
Output: "I can't see images"

Multimodal LLM:
Input: [Image] "What's in this image?"
Output: "The image shows a cat sleeping on a bed"
\`\`\`

## Multimodal Models

### GPT-4V (OpenAI)

\`\`\`
Capabilities:
- Read text from images (OCR)
- Describe what's in images
- Answer questions about images
- Read charts, diagrams, graphs
- Understand layouts

Example:
User: [Image of menu] "What's the most expensive item?"
GPT-4V: [Reads menu, analyzes] "The lobster at $45"
\`\`\`

### Claude 3 (Anthropic)

\`\`\`
3 versions:
- Opus: Most capable (slower, expensive)
- Sonnet: Balanced
- Haiku: Fast, cheap

Can analyze images, read documents, understand layouts
\`\`\`

### Other Models

\`\`\`
LLaVA: Open-source, multimodal
Gemini (Google): Text + image + code
Qwen-VL: Open-source vision-language
\`\`\`

## Architecture: How Vision × Language Works

\`\`\`
Image
  ↓
Vision Encoder (like ViT - Vision Transformer)
  ↓
Image embeddings
  ↓
LLM (text processor)
  ↓
Text output

Example:
[Dog image] → Vision encoder → [visual embedding] → LLM → "This is a golden retriever"
\`\`\`

## Key Innovation: Vision-Language Alignment

Training multimodal models:
1. Take image
2. Get image embedding (from vision model)
3. Get text description
4. Get text embedding (from language model)
5. Train to align: image embedding ≈ text embedding

This alignment allows:
- Image-to-text (captioning)
- Text-to-image search
- VQA (Visual Question Answering)

## Real-World Applications

### Document Understanding

\`\`\`
Upload: Invoice, contract, form
Query: "Extract customer name and total amount"
Multimodal LLM: "Customer: John Doe, Total: $1,234.56"

Better than OCR because it understands context!
\`\`\`

### Medical Imaging Analysis

\`\`\`
Upload: X-ray, MRI scan
Query: "What abnormalities do you see?"
LLM: "There appears to be... (medical analysis)"

Note: Current models aren't certified for medical use - need expert review
\`\`\`

### E-commerce Product Analysis

\`\`\`
Upload: Product image
Query: "Describe this product in 50 words for a product listing"
LLM: "Premium leather handbag with spacious interior..."
\`\`\`

### Accessibility

\`\`\`
Image description for blind users:
Image: [Photo of sunset]
Multimodal LLM: "A stunning sunset over the ocean with golden and pink clouds"
\`\`\`

## Challenges

### Hallucinations in Vision

\`\`\`
Image: A red car
Multimodal LLM: "This is a blue car" (wrong color)

More common in images than text!
\`\`\`

### Context Length with Images

\`\`\`
Images take many tokens to encode
- 1 image = 1000-5000 tokens
- Limits how many images in one request

Solutions:
- Compress images
- Multiple API calls
- New models with longer context (Gemini 1.5: 1M tokens!)
\`\`\`

### Cost

\`\`\`
Processing images is expensive (more tokens)
GPT-4V: \$0.01-0.03 per image

Fine-tuning: \$0.012-0.018 per 1M tokens
(Much more expensive than text-only)
\`\`\`

## Future: Unified Multimodal AI

\`\`\`
Coming soon:
- Audio understanding (transcribe, answer questions about audio)
- Video understanding (understand video content)
- 3D understanding (process 3D models, point clouds)
- Real-time streaming (live video input)

Vision: One model that truly understands all modalities
\`\`\`
`,
          starterCode: `# Multimodal LLM concept

class MultimodalLLM:
    def __init__(self, model_name="GPT-4V"):
        self.model_name = model_name
        self.vision_encoder = "ViT"  # Vision Transformer
        self.language_model = "Transformer"
    
    def encode_image(self, image_description):
        """Simulate image encoding to embeddings"""
        # In real model: Neural network processes image
        # For demo: Create representation
        
        keywords = image_description.lower().split()
        embedding = [0.0] * 768  # 768D embedding
        
        # Simple encoding: set dimensions based on keywords
        if "cat" in keywords:
            embedding[0] = 0.8
        if "dog" in keywords:
            embedding[1] = 0.8
        if "outdoor" in keywords:
            embedding[2] = 0.7
        
        return embedding
    
    def process_vision_text(self, image_description, question):
        """Process image + text question"""
        
        # Step 1: Encode image
        image_embedding = self.encode_image(image_description)
        
        # Step 2: Process with language model
        # In reality: LLM takes both image embedding and text
        
        response = f"[{self.model_name}] Based on the image and your question:\\n"
        
        # Simple logic (real model is much more complex)
        if "what" in question.lower() and "image" in question.lower():
            response += f"The image shows: {image_description}"
        else:
            response += f"Analyzing image with embedding dimension 0: {image_embedding[0]:.2f}"
        
        return response

# Test
print("=== Multimodal LLM Demo ===\\n")

model = MultimodalLLM("GPT-4V")

# Example 1
print("Example 1: Image Understanding")
response1 = model.process_vision_text("A cat sleeping on a bed", "What's in this image?")
print(response1)

print("\\n" + "="*50 + "\\n")

# Example 2
print("Example 2: Document Analysis")
response2 = model.process_vision_text("Invoice with customer name John Doe, total \$100", "Extract customer name")
print(response2)

print("\\n✓ Multimodal: Processes both images and text")
print("✓ Vision encoder converts image → embedding")
print("✓ LLM combines visual + textual understanding")
print("✓ Enables new applications (OCR, VQA, accessibility)")
`,
        },
      ],
    },
    {
      id: "genai-future-trends",
      moduleId: "generative-ai",
      lessonNumber: 9,
      title: "Future Trends & Emerging Research",
      description: "What's coming next in GenAI: multimodal, reasoning, agents, and beyond.",
      duration: "25 min",
      difficulty: "Beginner",
      pages: [
        {
          pageNumber: 1,
          title: "The Future of AI",
          content: `# Future Trends in Generative AI

## Short Term (2024-2025)

### Longer Context Windows

\`\`\`
Current: 4K-128K tokens
Future: 1M+ tokens (Gemini 1.5 already here)

Implications:
- Process entire books in one request
- Better document understanding
- Full conversation history without summarization
\`\`\`

### Multimodal Everything

\`\`\`
Current: Text + images
Future: + audio, video, 3D, structured data

Unified models that understand:
- Video with sound
- 3D objects
- Charts and tables
- Code + documentation
\`\`\`

### Open-Source Alternatives

\`\`\`
Current: Commercial models dominant (GPT-4, Claude)
Emerging: LLaMA, Mistral, Qwen, Phi

Advantages:
- Run locally (privacy)
- Lower cost
- Fine-tuning possible
- Community-driven

Downside: Slightly lower quality than GPT-4
\`\`\`

### Specialization

\`\`\`
Future: Custom models for specific tasks
- Medical LLMs (trained on medical data)
- Legal LLMs (trained on legal docs)
- Code LLMs (trained on code)

Advantage: Better accuracy in domain
\`\`\`

## Medium Term (2025-2027)

### Reasoning & Planning

\`\`\`
Current: Next-token prediction (pattern matching)
Future: Genuine reasoning & planning

Example:
"If I invest \$1000 at 7% annual interest for 3 years, how much will I have?"
Current: "Approximately \$1225" (estimated)
Future: "Let me calculate step-by-step... \$1000 × 1.07^3 = \$1225.04"

Key: Shows work, explainable reasoning
\`\`\`

### Agentic AI

\`\`\`
Current: Chatbot (one question, one answer)
Future: Autonomous agents (goal-oriented)

Agent capabilities:
- Break goals into steps
- Use multiple tools
- Take action without user
- Learn from feedback

Examples:
- Agent books your flights (checks calendar, prices, books)
- Agent writes code (writes, tests, debugs)
- Agent manages your calendar (reads emails, schedules meetings)
\`\`\`

### Memory Systems

\`\`\`
Current: Conversation history only
Future: Long-term memory

Different types:
- Short-term (current conversation)
- Working memory (session-relevant)
- Long-term (user preferences, history)

Result: More personalized, context-aware AI
\`\`\`

## Long Term (2027+)

### Artificial General Intelligence (AGI)?

\`\`\`
Speculation (highly uncertain):
- Models that are as capable as humans at any task
- Self-improving AI
- Continual learning

Challenges:
- Current models are pattern matchers, not reasoners
- No clear path to AGI yet
- May require fundamentally new approaches
\`\`\`

### Energy Efficiency

\`\`\`
Problem: Training/running LLMs consumes massive energy
- GPT-3 training: 1,287 MWh (expensive!)
- ChatGPT inference: millions of queries/second (server costs high)

Future solutions:
- Smaller models (distillation)
- Efficiency innovations (new architectures)
- On-device inference (run locally)
\`\`\`

### Safety & Alignment

\`\`\`
Problem: As models get more powerful, safety becomes critical
- Prevent misuse
- Ensure AI follows human values
- Avoid unintended behaviors

Research areas:
- Constitutional AI (define rules for AI behavior)
- Interpretability (understand what models learn)
- Robustness (handle edge cases)
\`\`\`

## Emerging Research Directions

### Mixture of Experts (MoE)

\`\`\`
Idea: Instead of one big model, use many smaller "expert" models
- For each input, activate only relevant experts
- Faster inference, less compute

Example:
- Expert 1: Code generation
- Expert 2: Math reasoning
- Expert 3: Creative writing

LLM routes input to relevant expert!
\`\`\`

### Retrieval Augmentation

\`\`\`
Combining LLMs with knowledge retrieval
- LLM: Fast, general reasoning
- Retrieval: Fresh, accurate information

Hybrid approach: Best of both worlds
\`\`\`

### Prompt Optimization

\`\`\`
Future: Automatically find best prompts
- Instead of humans writing prompts: AI finds them
- Techniques: Genetic algorithms, reinforcement learning
- Goal: Maximize model performance
\`\`\`

## What You Should Do Now

1. **Get hands-on** — Use ChatGPT, Claude, build projects
2. **Learn fundamentals** — Understand transformers, fine-tuning, RAG
3. **Stay updated** — Follow AI research (arXiv, papers)
4. **Practice** — Build small LLM apps, deploy them
5. **Think critically** — Consider ethics, safety, limitations
6. **Network** — Join AI communities, discuss ideas

## Key Takeaways

\`\`\`
LLMs are powerful but imperfect:
✓ Excellent at pattern recognition
✓ Great for language tasks
✗ Not good at reasoning (yet)
✗ Hallucinations are real
✗ Can amplify biases

Future = Combining LLMs with other techniques:
LLM + Search = Factual answers
LLM + Code = Executable results
LLM + Tools = Autonomous agents
LLM + Reasoning = Better AI
\`\`\`
`,
          starterCode: `# Future AI trends illustration

trends = {
    "Short-term (2024-2025)": {
        "Longer context": "1M+ tokens (process books)",
        "Multimodal": "Video, audio, 3D understanding",
        "Open source": "LLaMA, Mistral compete with GPT",
        "Specialization": "Custom models per domain",
    },
    "Medium-term (2025-2027)": {
        "Reasoning": "Genuine planning, not pattern matching",
        "Agentic AI": "Autonomous agents with tools",
        "Memory": "Long-term + short-term memory",
    },
    "Long-term (2027+)": {
        "AGI?": "Human-level AI (highly speculative)",
        "Energy": "More efficient models",
        "Safety": "Better alignment & control",
    },
}

print("=== Future of Generative AI ===\\n")

for period, items in trends.items():
    print(f"\\n{period}")
    print("="*50)
    for trend, description in items.items():
        print(f"  {trend:20s}: {description}")

print("\\n" + "="*50)
print("\\n📈 Exponential progress expected!")
print("🔬 Research accelerating (1000s of papers/month)")
print("💼 Enterprise adoption increasing")
print("⚠️  Safety & ethics becoming critical")
print("\\n🚀 Best time to learn & build with AI!")
`,
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// MODULE 9 — Agentic AI & Autonomous Systems
// ─────────────────────────────────────────────────────────────
const agenticAiModule: Module = {
  id: "agentic-ai",
  title: "Agentic AI & Autonomous Systems",
  slug: "agentic-ai",
  description:
    "Master autonomous agents that take actions, use tools, reason over problems, and accomplish goals without human intervention. Build ReAct agents, multi-agent systems, and production AI workflows.",
  introduction: `# Welcome to Agentic AI 🤖⚙️

## From Chatbots to Agents

**Chatbot:** Answer questions based on user input
**Agent:** Accomplish goals autonomously using tools and reasoning

\`\`\`
Chatbot:
User: "What's the weather?"
Chatbot: "I don't have real-time data"

Agent:
User: "Book me a flight to NYC next Friday"
Agent: [uses flight search tool] → [uses calendar tool] → [uses booking tool] → "Flight booked!"
\`\`\`

## Why Agents Matter

Agents are the next frontier of AI — transforming LLMs from conversational tools into autonomous problem-solvers:

- **Autonomous** — Act without human prompting for each step
- **Goal-oriented** — Work toward objectives, not just respond
- **Tool-using** — Access APIs, databases, search, code execution
- **Reasoning** — Think through problems, plan approaches
- **Learning** — Improve from feedback and experience
- **Scalable** — Handle complex, multi-step tasks

**Impact:** Agents enable:
- Autonomous trading & investment
- Scientific discovery automation
- Customer service at scale
- Software development assistance
- Business process automation

## The Agent Loop

\`\`\`
User Goal
    ↓
Agent Observation (current state)
    ↓
Agent Reasoning (what to do?)
    ↓
Agent Action (use tool)
    ↓
Observe Result
    ↓
Repeat until goal achieved
\`\`\`

## Prerequisites

✅ Modules 1-4 (Python, Pandas, Matplotlib, NumPy)
✅ Recommended: Modules 8-9 (GenAI & LLMs)

Agent fundamentals build on LLM concepts — we'll explain from scratch!

## What You'll Learn

1. **Agent Fundamentals** — What agents are, why they matter
2. **Agent Architectures** — ReAct, Chain-of-Thought, Reflexion
3. **Tool Use & Function Calling** — How agents access external tools
4. **Memory & Context** — Short-term & long-term agent memory
5. **Planning & Reasoning** — Advanced reasoning strategies
6. **Multi-Agent Systems** — Agents collaborating & competing
7. **Agent Evaluation** — Measuring agent success
8. **Production Agents** — Deploying agents reliably
9. **LLM + Tools Integration** — Building with LangChain, AutoGPT
10. **Real-World Automation** — Customer support, research, coding
11. **Future of Autonomous AI** — AGI trajectories, safety concerns

By the end, you'll build autonomous agents that accomplish real goals! 🚀`,
  icon: "⚙️",
  color: "from-blue-600 to-cyan-900",
  level: "Advanced",
  totalDuration: "5h 28min",
  heroImage:
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
  lessons: [
    {
      id: "agent-fundamentals",
      moduleId: "agentic-ai",
      lessonNumber: 1,
      title: "What is an Agent? Fundamentals",
      description: "Understand agents, their capabilities, and how they differ from chatbots.",
      duration: "32 min",
      difficulty: "Beginner",
      pages: [
        {
          pageNumber: 1,
          title: "Beyond Chatbots: The Agent Paradigm",
          content: `# Agent Fundamentals

## What is an Agentic AI System?

In AI research, an **agent** is a system that perceives its environment, makes decisions, and takes actions to achieve a defined goal — often across multiple sequential steps without requiring human input at each stage. Unlike a standard chatbot that generates a single response and stops, an agentic system enters a continuous *perceive → reason → act* loop until the goal is satisfied or a stopping condition is reached.

Agentic systems can call external tools (search, code execution, APIs, databases), maintain memory across steps, and adapt their plan based on what they observe. This makes them capable of completing tasks that are too complex or multi-step for a single model inference.

## Definition: What is an Agent?

An **agent** is an autonomous system that:
1. **Observes** the environment/current state
2. **Reasons** about how to achieve a goal
3. **Acts** by using tools or performing actions
4. **Learns** from outcomes to improve

\`\`\`
Chatbot (reactive):
Input → Process → Output
(Stateless, responds to each query independently)

Agent (goal-driven):
Goal → Observe → Reason → Action → Observe → ... → Success
(Maintains state, tracks progress toward goal)
\`\`\`

## Agent vs Chatbot: Key Differences

| Aspect | Chatbot | Agent |
|--------|---------|-------|
| **Trigger** | User question | Goal to achieve |
| **Duration** | Single turn | Multi-step process |
| **Actions** | Generate text only | Call tools, APIs, execute code |
| **State** | Stateless | Maintains memory & context |
| **Goal** | Answer user | Accomplish objective |
| **Autonomy** | Responds to user | Acts independently |

## Real-World Examples

### Travel Agent
\`\`\`
Goal: "Book a flight from NYC to LA for next Friday"

Steps:
1. Search flights (tool: flight API)
2. Check user preferences (tool: preferences database)
3. Book flight (tool: booking system)
4. Send confirmation (tool: email)

Result: Booking complete, email sent, calendar updated
\`\`\`

### Research Agent
\`\`\`
Goal: "Find latest papers on diffusion models and summarize them"

Steps:
1. Search ArXiv (tool: arxiv API)
2. Download papers (tool: PDF downloader)
3. Extract text (tool: PDF parser)
4. Summarize each (LLM with reasoning)
5. Synthesize findings (LLM summary)

Result: Comprehensive research summary ready
\`\`\`

## Agent Capabilities

### 1. Tool Use
\`\`\`
Tools available:
- Web search
- Calculator
- Code execution
- Database queries
- Email
- Calendar

Agent decides which tools to use based on goal!
\`\`\`

### 2. Planning
\`\`\`
Complex goal → Break into steps → Execute sequentially
"Write and publish a blog post" becomes:
- Write draft (LLM)
- Edit (human or agent)
- Format (tool)
- Publish (tool)
- Share (tool)
\`\`\`

### 3. Reasoning
\`\`\`
Agent thinks through approach:
"To book a flight, I need:
1. Dates (check calendar)
2. Preferences (check user DB)
3. Budget (check account)
4. Airlines (search)
5. Best option (compare & book)"
\`\`\`

## The Agent Loop (ReAct Pattern)

\`\`\`
Thought: "I need to search for flights"
Action: search_flights(from="NYC", to="LA", date="2024-05-10")
Observation: [List of flights with prices]

Thought: "I should pick the cheapest direct flight"
Action: book_flight(flight_id=123, user_id=456)
Observation: "Booking successful, confirmation #789"

Thought: "I should send the user an email"
Action: send_email(to=user@example.com, subject="Flight Booked", body="...")
Observation: "Email sent"

Thought: "Goal accomplished!"
\`\`\`

## Why Agents are Revolutionary

\`\`\`
Current AI limitations:
- LLMs can't access real-time info (knowledge cutoff)
- LLMs can't perform actions (just generate text)
- LLMs can't execute code reliably
- LLMs can't learn from environment

Agents solve this:
+ Can call APIs for real-time data
+ Can execute tools/code
+ Can interact with systems
+ Can improve via feedback loops
\`\`\`
`,
          starterCode: `# Agent Loop Simulation

class SimpleAgent:
    def __init__(self, goal):
        self.goal = goal
        self.memory = []
        self.step = 0
    
    def think(self):
        """Agent reflects on goal and next step"""
        return f"How do I accomplish: {self.goal}?"
    
    def act(self, action):
        """Agent takes an action"""
        self.step += 1
        self.memory.append(action)
        return f"[Step {self.step}] {action}"
    
    def observe(self, result):
        """Agent observes outcome"""
        return f"Observation: {result}"

# Example: Book flight agent
print("=== Agent Loop Example ===\\n")

agent = SimpleAgent("Book a flight to NYC")

print(agent.think())
print(agent.act("Search available flights"))
print(agent.observe("Found 5 flights, $150-$400"))

print()
print(agent.act("Select cheapest direct flight"))
print(agent.observe("Selected $150 flight UA123"))

print()
print(agent.act("Confirm booking"))
print(agent.observe("Booking confirmed, ref #ABC123"))

print()
print("✓ Agent accomplished goal!")
print(f"✓ Used {agent.step} steps")
print(f"✓ Memory: {agent.memory}")
`,
        },
      ],
    },
    {
      id: "agent-architectures",
      moduleId: "agentic-ai",
      lessonNumber: 2,
      title: "Agent Architectures & Frameworks",
      description: "ReAct, Chain-of-Thought, Reflexion, and other agent design patterns.",
      duration: "36 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Popular Agent Patterns",
          content: `# Agent Architectures

## ReAct (Reasoning + Acting)

**Insight:** LLMs do better with explicit reasoning before action.

\`\`\`
ReAct Loop:
1. Thought: Agent reasons about next step
2. Action: Agent specifies tool to use
3. Observation: Tool result is returned
4. Repeat

Example:
Thought: "I need to find the population of France"
Action: search("France population")
Observation: "67 million people"
Thought: "I have the answer"
\`\`\`

**Benefits:**
- More transparent (we see agent's reasoning)
- Better performance (explicit thinking helps)
- Easier to debug (can see where agent went wrong)

## Chain-of-Thought (CoT)

Agent breaks problems into steps before acting.

\`\`\`
Without CoT:
Question: "If a store has 100 apples and sells 25, then receives 50 more, how many do they have?"
Agent: "175" (quick but sometimes wrong)

With CoT:
Question: [same]
Agent:
  Step 1: Start with 100 apples
  Step 2: Sell 25 → 100 - 25 = 75 remaining
  Step 3: Receive 50 → 75 + 50 = 125
  Answer: 125 apples
\`\`\`

**Better reasoning = Better results!**

## Reflexion Pattern

Agent reviews its own actions and learns from mistakes.

\`\`\`
Step 1: Agent attempts goal
Step 2: Agent observes outcome
Step 3: Reflection: "Did I succeed? What went wrong?"
Step 4: Update strategy
Step 5: Try again with improved approach

Example:
Attempt 1: Book expensive flight → Reflection: "I should check budget first"
Attempt 2: Check budget → Search flights within budget → Book

Agents improve over time!
\`\`\`

## LangChain Architecture

Popular open-source framework for building agents.

\`\`\`
Components:
1. LLM (e.g., GPT-4, Claude)
2. Tools (functions agent can call)
3. Memory (conversation history)
4. Prompts (instructions for agent)
5. Agent executor (orchestrates loop)

Example:
agent = Agent(
  llm=OpenAI(),
  tools=[Calculator, WebSearch, Python],
  memory=ConversationMemory(),
  prompt="You are a helpful assistant"
)

result = agent.run("Solve: 3^4 + sqrt(16)")
\`\`\`

## Hierarchical Agents

Complex goals broken into sub-agents.

\`\`\`
Main Goal: "Generate weekly report"

Sub-agent 1: Collect data
  - Query database
  - Fetch metrics
  
Sub-agent 2: Analyze
  - Statistical analysis
  - Trends & insights
  
Sub-agent 3: Format & Share
  - Create document
  - Send via email

Each agent specialized for their task!
\`\`\`

## Comparison: Which Architecture?

\`\`\`
ReAct: Good for reasoning-heavy tasks
CoT: Good for step-by-step problem solving
Reflexion: Good for iterative improvement
Hierarchical: Good for complex, multi-part goals
\`\`\`
`,
          starterCode: `# Simple ReAct Agent Pattern

class ReactAgent:
    def __init__(self, tools):
        self.tools = tools
        self.history = []
    
    def run(self, goal):
        thought = f"How can I achieve: {goal}?"
        print(f"Thought: {thought}")
        
        action = "search_tool('goal information')"
        print(f"Action: {action}")
        
        observation = "Found relevant information"
        print(f"Observation: {observation}")
        
        self.history.append({
            "thought": thought,
            "action": action,
            "observation": observation
        })
        
        return f"Goal achieved with {len(self.history)} steps"

# Tools
tools = ["search_tool", "calculate_tool", "email_tool"]

# Agent
agent = ReactAgent(tools)
result = agent.run("Send report to manager")

print(f"\\n{result}")
print(f"✓ ReAct pattern: Explicit reasoning → Better results")
`,
        },
      ],
    },
    {
      id: "agent-tools",
      moduleId: "agentic-ai",
      lessonNumber: 3,
      title: "Tool Use & Function Calling",
      description: "How agents access external tools, APIs, and execute functions.",
      duration: "34 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Giving Agents Power: Tools & APIs",
          content: `# Tool Use in Agents

## What are Tools?

**Tools** = Functions agents can call to interact with the world.

\`\`\`
Available tools for agent:
- calculator: Perform math
- search: Web search
- code_interpreter: Execute Python
- email: Send emails
- database: Query database
- weather_api: Get weather
- calendar: Check schedules

Agent picks appropriate tools based on goal!
\`\`\`

## Function Calling (OpenAI Style)

Modern LLMs support explicit function calling.

\`\`\`
Define tools as JSON schema:
{
  "name": "search",
  "description": "Search the web for information",
  "parameters": {
    "query": "string - what to search for",
    "max_results": "integer - max results (default 5)"
  }
}

Agent LLM response:
{
  "name": "search",
  "arguments": {
    "query": "best flights NYC to LA",
    "max_results": 10
  }
}

System executes tool and returns result back to agent.
\`\`\`

## Tool Design Best Practices

### 1. Clear Descriptions
\`\`\`
Bad: "Search tool"
Good: "Search the internet for current information. Use this when you need real-time data, recent news, or information not in your training data."
\`\`\`

### 2. Focused Scope
\`\`\`
Bad: Tool does everything (search, analyze, summarize)
Good: Tool does one thing well (just search)
\`\`\`

### 3. Predictable Behavior
\`\`\`
Tool should:
- Always return consistent format
- Handle errors gracefully
- Provide useful error messages
\`\`\`

## Common Agent Tools

### Search Tool
\`\`\`
search(query: string, max_results: int)
Returns: List of search results with URL, title, snippet
\`\`\`

### Calculator
\`\`\`
calculate(expression: string)
Returns: Numeric result
Example: calculate("sqrt(16) + 3^2") → 13.0
\`\`\`

### Code Executor
\`\`\`
execute_python(code: string)
Returns: Output and errors
Example: execute_python("print(sum([1,2,3]))") → 6
\`\`\`

### Database Query
\`\`\`
query_db(sql: string)
Returns: Query results
Example: query_db("SELECT * FROM users WHERE age > 18") → [[user1], [user2], ...]
\`\`\`

## Tool Calling Flow

\`\`\`
Agent Thought: "I need to search for flights"
    ↓
Agent generates function call:
{
  "tool": "search",
  "args": {"query": "cheap flights NYC to LA"}
}
    ↓
System executes tool
    ↓
Tool returns result:
{
  "results": [
    {"airline": "AA", "price": \$150},
    {"airline": "UA", "price": \$180}
  ]
}
    ↓
Agent observes result and continues reasoning
\`\`\`

## Tool Safety

\`\`\`
Dangerous Tools:
- Delete_file (could destroy data)
- Send_money (financial risk)
- System_shutdown (operational risk)

Safety measures:
1. Rate limiting (limit calls per minute)
2. Approval required (human in loop)
3. Rollback capability (undo actions)
4. Audit logging (track all tool use)
5. Sandboxing (restrict tool scope)
\`\`\`
`,
          starterCode: `# Tool calling demonstration

class AgentTools:
    def __init__(self):
        self.tools = {
            "search": self.search,
            "calculate": self.calculate,
            "email": self.send_email,
        }
    
    def search(self, query):
        """Simulate web search"""
        return f"[Search Result] {query}: Found 1,000,000 results"
    
    def calculate(self, expression):
        """Simple calculator"""
        try:
            result = eval(expression)
            return f"Result: {result}"
        except:
            return "Error in expression"
    
    def send_email(self, to, subject, body):
        """Simulate email"""
        return f"Email sent to {to}: {subject}"
    
    def call_tool(self, tool_name, **args):
        """Agent calls a tool"""
        if tool_name in self.tools:
            return self.tools[tool_name](**args)
        return f"Unknown tool: {tool_name}"

# Agent using tools
print("=== Agent Tool Calling ===\\n")

tools = AgentTools()

print("Agent: I need to search for Python info")
result1 = tools.call_tool("search", query="Python tutorial")
print(f"Result: {result1}\\n")

print("Agent: Let me calculate something")
result2 = tools.call_tool("calculate", expression="2**10")
print(f"Result: {result2}\\n")

print("Agent: Send status email")
result3 = tools.call_tool("email", 
                          to="boss@company.com",
                          subject="Report Ready",
                          body="Analysis complete")
print(f"Result: {result3}\\n")

print("✓ Agents access tools via function calls")
print("✓ Tools extend agent capabilities")
`,
        },
      ],
    },
    {
      id: "agent-memory",
      moduleId: "agentic-ai",
      lessonNumber: 4,
      title: "Memory & Context Management",
      description: "How agents maintain memory across steps and conversations.",
      duration: "30 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Agent Memory Systems",
          content: `# Agent Memory

## Why Memory Matters

\`\`\`
Without memory:
Step 1: Search for "Alice's phone number"
Step 2: Forget result
Step 3: Try to call Alice → Error (don't have number)

With memory:
Step 1: Search for "Alice's phone number" → Store in memory
Step 2: Call Alice using number from memory ✓
\`\`\`

## Types of Memory

### 1. Short-Term Memory (Context Window)

\`\`\`
- Conversation history in current session
- Token-limited (e.g., last 4K tokens)
- Used by LLM to maintain context

Example:
Agent: "My name is Alice"
[Store in short-term]
Agent: "What's my name?"
[Retrieve from short-term] → "Alice"
\`\`\`

### 2. Long-Term Memory

\`\`\`
- Persistent storage (database, files)
- Unbounded size
- Contains facts, preferences, history

Examples:
- User preferences ("Alice likes coffee")
- Past interactions ("Booked 3 flights for Alice")
- Learned facts ("Target price limit: \$300")
\`\`\`

### 3. Working Memory

\`\`\`
- Active task state
- Goals being pursued
- Current reasoning path

Example:
"Working on: Book flight from NYC to LA"
"Current step: Searching prices"
"Constraint: Budget \$500 max"
\`\`\`

## Context Window Management

Token limits are real:

\`\`\`
GPT-4: 8K-128K tokens
Claude 3: Up to 200K tokens

Problem: Long conversations exceed limits

Solutions:
1. Summarization: Compress old conversations
2. Retrieval: Only load relevant context
3. Hierarchical: Keep summaries, load details as needed
\`\`\`

## Memory Retrieval

Smart agents retrieve relevant memories:

\`\`\`
Query: "Book a flight for Alice"

Retrieve:
- Alice's location (NYC)
- Alice's destination preferences (loves LA)
- Alice's budget (\$300)
- Alice's past flights (prefers morning departures)

Now agent has context to book optimally!
\`\`\`

## Vector Embeddings for Memory

Modern approach: Store memories as embeddings.

\`\`\`
Memory: "Alice loves coffee"
Embedding: [0.2, -0.5, 0.8, ...] (vector in high-dimensional space)

Query: "What's Alice's favorite drink?"
Query embedding: [0.19, -0.52, 0.78, ...] (similar!)

Find memories with similar embeddings → "Alice loves coffee" matches!
\`\`\`

## Forgetting (Purging Old Memory)

Agents need to forget irrelevant information:

\`\`\`
Memory management:
- Keep: Frequently accessed, high relevance
- Archive: Older but still useful
- Forget: Outdated, incorrect, irrelevant

Example:
- Keep: User's current address
- Archive: Previous address from 5 years ago
- Forget: Temporary task from yesterday
\`\`\`
`,
          starterCode: `# Agent Memory System

class AgentMemory:
    def __init__(self):
        self.short_term = []  # Current conversation
        self.long_term = {}   # Persistent facts
        self.working = {}     # Current task state
    
    def store_short_term(self, info):
        """Add to conversation history"""
        self.short_term.append(info)
        if len(self.short_term) > 10:  # Keep last 10
            self.short_term.pop(0)
    
    def store_long_term(self, key, value):
        """Store persistent fact"""
        self.long_term[key] = value
    
    def retrieve(self, query):
        """Search memory for relevant info"""
        results = []
        
        # Search short-term
        for item in self.short_term:
            if query.lower() in str(item).lower():
                results.append(("short-term", item))
        
        # Search long-term
        for key, value in self.long_term.items():
            if query.lower() in key.lower():
                results.append(("long-term", (key, value)))
        
        return results

# Agent with memory
print("=== Agent Memory Demo ===\\n")

memory = AgentMemory()

# Store facts
memory.store_long_term("user_name", "Alice")
memory.store_long_term("user_location", "NYC")
memory.store_short_term("Searching for flights")

# Retrieve
print("Query: 'user'")
results = memory.retrieve("user")
for source, info in results:
    print(f"  [{source}] {info}")

print("\\n✓ Agents maintain memory across steps")
print("✓ Short-term: Conversation context")
print("✓ Long-term: Persistent facts")
`,
        },
      ],
    },
    {
      id: "agent-planning",
      moduleId: "agentic-ai",
      lessonNumber: 5,
      title: "Planning & Advanced Reasoning",
      description: "How agents plan complex tasks, reason about problems, and handle failures.",
      duration: "35 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Agent Planning Strategies",
          content: `# Planning & Reasoning

## Problem Decomposition

Break complex goals into simpler sub-goals:

\`\`\`
Goal: "Organize a conference"

Decomposition:
1. Venue
   1.1 Find venue (capacity 500)
   1.2 Book venue
   1.3 Confirm catering
2. Schedule
   2.1 Plan agenda
   2.2 Invite speakers
   2.3 Send calendar invites
3. Marketing
   3.1 Create website
   3.2 Social media campaign
   3.3 Email newsletter

Agent executes sub-goals in dependency order!
\`\`\`

## Planning Strategies

### Linear Plan
\`\`\`
Task 1 → Task 2 → Task 3 → Goal

Simple, but brittle (fails if any step fails)
\`\`\`

### Conditional Plan
\`\`\`
Task 1 → Check result
  If success → Task 2
  If failure → Task 1_retry or Alternative
  
More flexible, handles failures
\`\`\`

### Hierarchical Plan
\`\`\`
Abstract goal
    ↓
Detailed sub-goals
    ↓
Even finer sub-tasks
    ↓
Executable actions

Example: "Write essay"
  → Research topic (find 5 sources)
    → Search articles
    → Download PDFs
  → Create outline
  → Write sections
\`\`\`

## Reasoning Under Uncertainty

Agents deal with incomplete information:

\`\`\`
Agent has options to search, but uncertainty about which is best:

Option A: Book flight X (cheaper, but no direct route)
Option B: Book flight Y (more expensive, direct route)

Agent reasoning:
- Check user's budget (allows both)
- Check user's time constraints (prefers direct)
- Recommend Option Y

Agents reason about tradeoffs!
\`\`\`

## Handling Failures

What happens when agent fails?

\`\`\`
Plan: [Book flight]
  Step 1: Search flights ✓
  Step 2: Check availability ✗ (flight full)
  
Response:
  Option 1: Try alternative dates
  Option 2: Try alternative airlines
  Option 3: Ask user for flexibility
  
Adaptive agents recover from failure!
\`\`\`

## Self-Reflection

Agent reviews its own reasoning:

\`\`\`
Step 1: Attempt goal with approach A
Step 2: Observe failure
Step 3: Reflection: "Approach A failed because X. I should try approach B instead."
Step 4: Execute approach B
Step 5: Success!

Reflexion agents learn and improve!
\`\`\`
`,
          starterCode: `# Agent planning demonstration

class AgentPlanner:
    def __init__(self):
        self.plan = []
        self.completed = []
        self.failures = []
    
    def decompose_goal(self, goal):
        """Break goal into sub-tasks"""
        tasks = {
            "book_flight": [
                "search_flights",
                "check_budget",
                "select_flight",
                "confirm_booking"
            ],
            "organize_meeting": [
                "find_attendees",
                "find_venue",
                "schedule_time",
                "send_invites"
            ]
        }
        return tasks.get(goal, [goal])
    
    def execute_plan(self, goal):
        """Execute sub-tasks in order"""
        tasks = self.decompose_goal(goal)
        
        print(f"Goal: {goal}")
        print(f"Plan: {' → '.join(tasks)}\\n")
        
        for i, task in enumerate(tasks, 1):
            print(f"Step {i}: {task}")
            
            success = True  # Simulate execution
            
            if success:
                self.completed.append(task)
                print(f"  ✓ Complete\\n")
            else:
                self.failures.append(task)
                print(f"  ✗ Failed, trying alternative\\n")
        
        return len(self.failures) == 0

# Agent planner
print("=== Agent Planning Demo ===\\n")

planner = AgentPlanner()
success = planner.execute_plan("book_flight")

print(f"Completed: {len(planner.completed)} tasks")
print(f"Failed: {len(planner.failures)} tasks")
print(f"\\n✓ Agents decompose complex goals")
print(f"✓ Execute sub-goals in sequence")
print(f"✓ Handle failures adaptively")
`,
        },
      ],
    },
    {
      id: "agent-multi-agent",
      moduleId: "agentic-ai",
      lessonNumber: 6,
      title: "Multi-Agent Systems",
      description: "Multiple agents collaborating, competing, and solving complex problems together.",
      duration: "32 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Agents Working Together",
          content: `# Multi-Agent Systems

## What is a Multi-Agent System?

Multiple agents working together (or against each other) to solve problems:

\`\`\`
Single agent: One AI handling all tasks
Multi-agent: Specialized agents for different roles

Example (Book vacation):
- Researcher agent: Finds destinations, accommodations
- Budget agent: Tracks costs, suggests options within budget
- Coordinator agent: Combines recommendations, books everything
- Communication agent: Keeps user informed

Each agent specialized, communicating with others!
\`\`\`

## Agent Collaboration Patterns

### Pipeline (Sequential)
\`\`\`
Agent A → Agent B → Agent C → Result

A does step 1
B takes A's output, does step 2
C takes B's output, does step 3
\`\`\`

### Parallel (Independent)
\`\`\`
Agent A → 
         → Coordinator →
Agent B →

A and B work simultaneously
Coordinator merges results
\`\`\`

### Hierarchical (Manager-Worker)
\`\`\`
Manager Agent
  ↙        ↓        ↘
Worker1  Worker2  Worker3

Manager delegates tasks
Workers execute tasks
Manager coordinates results
\`\`\`

## Communication Between Agents

Agents share information:

\`\`\`
Agent A: "I found these flights: [list]"
Agent B: "Given budget constraints, best option is: [flight]"
Agent C: "I've booked it! Confirmation: #123"

Agents parse each other's outputs!
\`\`\`

## Example: Research Paper Agent Team

\`\`\`
Goal: "Write comprehensive literature review"

Agents:
1. Search Agent: Finds papers on ArXiv, Google Scholar
2. Read Agent: Extracts key concepts from papers
3. Organize Agent: Groups papers by theme
4. Writer Agent: Generates comprehensive summary
5. Reviewer Agent: Checks for completeness, accuracy

Each agent specialized, working together!
\`\`\`

## Challenges in Multi-Agent Systems

### 1. Coordination
\`\`\`
Problem: Agents making conflicting decisions
Solution: Central coordinator or agreement protocol
\`\`\`

### 2. Communication
\`\`\`
Problem: Agents speaking different "languages"
Solution: Standardized message format (JSON, structured output)
\`\`\`

### 3. Trust & Verification
\`\`\`
Problem: Can you trust other agent's output?
Solution: Verification checks, human oversight
\`\`\`

## Competitive Multi-Agent Systems

Agents can also compete:

\`\`\`
Scenario: Debate system
- Agent A: Argues for option X
- Agent B: Argues for option Y
- Judge Agent: Evaluates arguments

Better arguments = Better decisions!
\`\`\`
`,
          starterCode: `# Multi-agent system simulation

class Agent:
    def __init__(self, name, role):
        self.name = name
        self.role = role
    
    def execute(self, task):
        """Agent executes task in their domain"""
        return f"{self.name} ({self.role}): Completed {task}"

class MultiAgentSystem:
    def __init__(self):
        self.agents = []
        self.messages = []
    
    def add_agent(self, agent):
        self.agents.append(agent)
    
    def execute_pipeline(self, tasks):
        """Sequential execution"""
        results = []
        for i, (agent, task) in enumerate(zip(self.agents, tasks)):
            result = agent.execute(task)
            results.append(result)
            self.messages.append(result)
        return results

# Build multi-agent system
print("=== Multi-Agent System Demo ===\\n")

system = MultiAgentSystem()
system.add_agent(Agent("Searcher", "Find information"))
system.add_agent(Agent("Analyzer", "Analyze data"))
system.add_agent(Agent("Reporter", "Generate report"))

# Execute pipeline
tasks = ["Search for papers", "Analyze findings", "Write summary"]
results = system.execute_pipeline(tasks)

for msg in system.messages:
    print(msg)

print("\\n✓ Multiple agents working together")
print("✓ Each specialized in their role")
print("✓ Communicate via messages")
`,
        },
      ],
    },
    {
      id: "agent-evaluation",
      moduleId: "agentic-ai",
      lessonNumber: 7,
      title: "Agent Evaluation & Benchmarking",
      description: "How to measure agent performance, success rate, and quality.",
      duration: "28 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Measuring Agent Success",
          content: `# Agent Evaluation

## What to Measure?

### 1. Task Success Rate
\`\`\`
Did agent accomplish the goal?

Metric: Success Rate = (Tasks completed / Total tasks) × 100%

Example:
- Asked agent to book 10 flights
- Successfully booked 9
- Success Rate = 90%
\`\`\`

### 2. Efficiency
\`\`\`
How much did agent spend (tokens, API calls, time)?

Metrics:
- Token efficiency (fewer tokens = better)
- API call efficiency (fewer calls = better)
- Time taken (faster = better)
- Cost (lower = better)
\`\`\`

### 3. Quality
\`\`\`
Are results correct and useful?

Metrics:
- Accuracy (compared to ground truth)
- User satisfaction (human rating 1-5)
- Hallucination rate (false claims)
- Relevance (how relevant to goal)
\`\`\`

## Benchmarks for Agents

### HotpotQA
\`\`\`
Multi-step question answering
Requires agent to search, reason, combine facts
Success = Correct final answer

Example:
Q: "What is the birth year of the director of Inception?"
Steps needed:
  1. Search "Inception director" → Christopher Nolan
  2. Search "Christopher Nolan birth year" → 1970
A: 1970
\`\`\`

### WebShop
\`\`\`
E-commerce task: Find and purchase product within constraints
Agent must navigate website, filter options, buy item

Success = Item purchased matches requirements
\`\`\`

### ALFWorld
\`\`\`
Virtual household environment (like text-based game)
Agent must navigate, find objects, complete tasks

Success = Task completed successfully
\`\`\`

## Evaluation Metrics

### Accuracy
\`\`\`
Accuracy = (Correct outputs / Total outputs) × 100%
\`\`\`

### F1 Score
\`\`\`
Balances precision and recall
F1 = 2 × (precision × recall) / (precision + recall)
\`\`\`

### Tool Use Metrics
\`\`\`
- Tool call accuracy (% of valid tool calls)
- Tool call necessity (% of tools actually needed)
- Tool diversity (agent uses many tools?)
\`\`\`

## Human Evaluation

Sometimes automated metrics miss important aspects:

\`\`\`
Human evaluators rate:
- Correctness (1-5)
- Helpfulness (1-5)
- Safety (1-5)
- Efficiency (1-5)

Combine human & automated evaluation for best assessment!
\`\`\`
`,
          starterCode: `# Agent evaluation metrics

class AgentEvaluator:
    def __init__(self):
        self.tasks = []
        self.results = []
    
    def add_task(self, task, expected_output):
        self.tasks.append({"task": task, "expected": expected_output})
    
    def evaluate(self, actual_outputs):
        """Evaluate agent performance"""
        correct = 0
        total = len(self.tasks)
        
        for i, (task_info, actual) in enumerate(zip(self.tasks, actual_outputs)):
            expected = task_info["expected"]
            is_correct = actual == expected
            
            if is_correct:
                correct += 1
                print(f"Task {i+1}: ✓ CORRECT")
            else:
                print(f"Task {i+1}: ✗ INCORRECT")
                print(f"  Expected: {expected}")
                print(f"  Actual: {actual}")
        
        success_rate = (correct / total) * 100
        return {
            "success_rate": success_rate,
            "correct": correct,
            "total": total
        }

# Evaluate agent
print("=== Agent Evaluation Demo ===\\n")

evaluator = AgentEvaluator()
evaluator.add_task("Book flight", "Flight booked")
evaluator.add_task("Send email", "Email sent")
evaluator.add_task("Calculate", "Result: 42")

agent_outputs = ["Flight booked", "Email not sent", "Result: 42"]

results = evaluator.evaluate(agent_outputs)

print(f"\\nSuccess Rate: {results['success_rate']:.1f}%")
print(f"Correct: {results['correct']}/{results['total']}")
print(f"\\n✓ Agents must be measured on task success")
print(f"✓ Multiple metrics provide full picture")
`,
        },
      ],
    },
    {
      id: "agent-production",
      moduleId: "agentic-ai",
      lessonNumber: 8,
      title: "Building Production Agents",
      description: "Deploying reliable, scalable agents in real-world applications.",
      duration: "38 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Production-Ready Agents",
          content: `# Production Agents

## From Prototype to Production

\`\`\`
Prototype:
- Works on examples
- Barely tested
- May fail in production

Production:
- Tested thoroughly
- Handles edge cases
- Monitored continuously
- Fails gracefully
\`\`\`

## Reliability Requirements

### 1. Error Handling
\`\`\`
Potential errors:
- Tool timeout (search takes too long)
- Tool failure (API down)
- Invalid input from user
- Agent hallucination

Handling:
- Retries with backoff
- Fallback tools
- Input validation
- Output verification
\`\`\`

### 2. Consistency
\`\`\`
Agent should:
- Give same answer for same input
- Not contradict itself
- Maintain memory consistency
\`\`\`

### 3. Safety
\`\`\`
Dangerous actions need approval:
- Money transfers (require confirmation)
- Data deletion (require approval)
- System access (restricted)

Use: Human-in-the-loop for sensitive decisions
\`\`\`

## Scalability

### Distributed Agents
\`\`\`
Single agent handling 1M requests/day?
Solution: Run multiple agent instances

Load balancer → [Agent 1, Agent 2, Agent 3] → Shared database

Agents share memory, scale horizontally
\`\`\`

### Caching
\`\`\`
Expensive operations (search, compute) get cached:
- First request: Execute search → Cache result
- Same query again: Return from cache instantly

Cache invalidation: Update when data changes
\`\`\`

## Monitoring & Observability

\`\`\`
Track metrics:
- Success rate per hour
- Average response time
- Error rate by type
- Tool usage patterns

Alerts:
- Success rate drops below 80%
- Response time exceeds 10s
- Error rate spikes

Use: Dashboards (Grafana, DataDog)
\`\`\`

## Agent Logs

\`\`\`
Log every decision:
{
  "timestamp": "2024-05-03T10:30:00Z",
  "user_id": "user_123",
  "goal": "Book flight",
  "steps": [
    {"action": "search_flights", "result": "5 flights found"},
    {"action": "select_cheapest", "result": "Selected UA123"},
    {"action": "book", "result": "Success"}
  ],
  "duration_ms": 3240,
  "success": true
}

Benefits: Debugging, auditing, improvement!
\`\`\`

## Cost Optimization

\`\`\`
Ways to reduce agent costs:
1. Smaller LLM for simple tasks (GPT-3.5 vs GPT-4)
2. Caching frequent queries
3. Local tools instead of API calls
4. Efficient prompting (fewer tokens)
5. Batch requests

Example: 
- Using GPT-4 for all: \$10/user/day
- Smart selection: \$2/user/day (5x savings!)
\`\`\`
`,
          starterCode: `# Production-ready agent with error handling

class ProductionAgent:
    def __init__(self, name):
        self.name = name
        self.logs = []
        self.cache = {}
    
    def log_action(self, action, result, success):
        """Log every decision"""
        entry = {
            "action": action,
            "result": result,
            "success": success
        }
        self.logs.append(entry)
    
    def execute_with_retry(self, task, max_retries=3):
        """Retry on failure"""
        for attempt in range(max_retries):
            try:
                # Check cache first
                if task in self.cache:
                    self.log_action(task, "Cache hit", True)
                    return self.cache[task]
                
                # Execute task
                result = f"Executed: {task}"
                
                # Cache result
                self.cache[task] = result
                self.log_action(task, result, True)
                
                return result
            
            except Exception as e:
                self.log_action(task, f"Error: {e}", False)
                if attempt < max_retries - 1:
                    print(f"  Retrying ({attempt+1}/{max_retries})...")
                else:
                    raise

# Production agent
print("=== Production Agent Demo ===\\n")

agent = ProductionAgent("BookingAgent")

print("Request 1:")
result1 = agent.execute_with_retry("search_flights")
print(f"Result: {result1}\\n")

print("Request 2 (same query):")
result2 = agent.execute_with_retry("search_flights")
print(f"Result: {result2} (from cache!)\\n")

print("Logs:")
for log in agent.logs:
    print(f"  {log}")

print("\\n✓ Production agents need error handling")
print("✓ Caching improves efficiency")
print("✓ Comprehensive logging for debugging")
`,
        },
      ],
    },
    {
      id: "agent-langchain",
      moduleId: "agentic-ai",
      lessonNumber: 9,
      title: "Building with LangChain & Frameworks",
      description: "Using LangChain, AutoGPT, and other frameworks to build agents quickly.",
      duration: "36 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Agent Frameworks & Tools",
          content: `# Building Agents with Frameworks

## Why Use Frameworks?

Building agents from scratch is complex. Frameworks provide:
- Pre-built patterns (ReAct, CoT)
- Tool integration
- Memory management
- Orchestration logic

## LangChain

Popular Python framework for building LLM applications.

\`\`\`
Components:
1. LLM (OpenAI, Anthropic, etc.)
2. Tools (functions agent can use)
3. Agent executor (orchestration)
4. Memory (conversation history)
5. Chains (sequences of steps)

Example:
from langchain.agents import initialize_agent
from langchain.llms import OpenAI

llm = OpenAI(api_key="...")
tools = [SearchTool(), Calculator(), Python]

agent = initialize_agent(
  llm=llm,
  tools=tools,
  agent_type="ReAct",
  memory=ConversationMemory()
)

result = agent.run("What's 2^10 + sqrt(16)?")
# Output: 1028 (computed by agent)
\`\`\`

## AutoGPT Pattern

Autonomous agent that:
1. Sets goals
2. Breaks into tasks
3. Executes tasks
4. Reviews progress
5. Iterates

\`\`\`
Loop:
Agent thinks: "Goal: Write essay"
  → Task 1: Research (execute)
  → Task 2: Outline (execute)
  → Task 3: Write (execute)
  → Review: Essay complete?
  → If not done: Create new task
  → If done: Return result
\`\`\`

## OpenAI Function Calling

Modern approach: Function calling in LLM API.

\`\`\`
Define tools:
{
  "name": "search",
  "description": "Search the web"
}

LLM decides to use tool:
{
  "function_name": "search",
  "arguments": {"query": "..."}
}

System executes and returns result
\`\`\`

## Comparison: Frameworks

| Framework | Best For | Language |
|-----------|----------|----------|
| LangChain | Flexible agents, chains | Python |
| AutoGPT | Autonomous workflows | Python |
| Semantic Kernel | Microsoft integration | C#, Python |
| Crew AI | Multi-agent systems | Python |

## Choosing a Framework

\`\`\`
Choose LangChain if:
- Need flexibility
- Building production system
- Python preferred

Choose AutoGPT if:
- Want fully autonomous behavior
- Don't need customization

Choose built-in APIs if:
- Simple use case
- No external dependencies
\`\`\`
`,
          starterCode: `# LangChain-style agent pattern

class SimpleLangChainAgent:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = tools
        self.memory = []
    
    def run(self, goal):
        """Run agent to accomplish goal"""
        
        # Thought: What's the plan?
        thought = f"Plan to accomplish: {goal}"
        print(f"Thought: {thought}")
        
        # Action: Use a tool
        for tool in self.tools:
            action = f"Use {tool} to help with {goal}"
            print(f"Action: {action}")
            
            # Observe: What happened?
            observation = f"Tool {tool} executed"
            print(f"Observation: {observation}\\n")
            
            self.memory.append({
                "thought": thought,
                "action": action,
                "observation": observation
            })
        
        return "Goal accomplished!"

# Use agent
print("=== LangChain-Style Agent ===\\n")

agent = SimpleLangChainAgent(
    llm="GPT-4",
    tools=["search", "calculator", "python"]
)

result = agent.run("Answer: What is 2^10?")

print(result)
print(f"\\n✓ Frameworks simplify agent development")
print(f"✓ Handle ReAct loop, memory, tools")
`,
        },
      ],
    },
    {
      id: "agent-automation",
      moduleId: "agentic-ai",
      lessonNumber: 10,
      title: "Real-World Automation & Use Cases",
      description: "Practical applications: customer support, research, coding, business automation.",
      duration: "34 min",
      difficulty: "Beginner",
      pages: [
        {
          pageNumber: 1,
          title: "Agents in the Real World",
          content: `# Real-World Agent Applications

## Customer Support Agent

\`\`\`
Task: Handle customer support tickets autonomously

Agent capabilities:
- Read ticket
- Search knowledge base
- Retrieve relevant articles
- Generate response
- If can't resolve: Escalate to human

Benefits: 24/7 support, fast response, reduce human workload
\`\`\`

## Research Agent

\`\`\`
Task: Write comprehensive research summary

Steps:
1. Search academic databases (ArXiv, Google Scholar)
2. Download and analyze papers
3. Extract key findings
4. Synthesize into cohesive summary
5. Generate citations

Benefits: Automate tedious research, stay current with literature
\`\`\`

## Coding Agent

\`\`\`
Task: Fix bugs or write features

Capabilities:
- Read error message
- Understand code context
- Generate fix
- Test fix
- Submit PR

Example:
Error: "TypeError: 'str' object is not subscriptable"
Agent: Analyzes code, identifies bug, generates fix, tests
\`\`\`

## Travel Agent

\`\`\`
Task: Plan complete trip

Steps:
1. Determine budget, dates, preferences
2. Search flights
3. Search hotels
4. Suggest activities
5. Book everything
6. Create itinerary
7. Send confirmations

Agent handles all planning!
\`\`\`

## Financial Agent

\`\`\`
Task: Manage portfolio or bill payments

Capabilities:
- Monitor stock prices
- Rebalance portfolio
- Alert on market changes
- Process bill payments
- Generate financial reports

Requires: Security, compliance, human oversight
\`\`\`

## Data Analysis Agent

\`\`\`
Task: Analyze dataset and generate insights

Steps:
1. Load and explore data
2. Compute statistics
3. Create visualizations
4. Identify patterns
5. Generate summary report
6. Suggest next steps

Agent does exploratory data analysis!
\`\`\`

## Email Agent

\`\`\`
Task: Manage inbox autonomously

Capabilities:
- Sort emails (important, spam, etc.)
- Answer routine emails
- Summarize long threads
- Escalate urgent items
- Schedule meetings

Benefits: Reduce inbox overwhelm
\`\`\`

## Common Challenges

### 1. Accuracy
\`\`\`
Agents may make mistakes
Solution: Human verification, especially for critical decisions
\`\`\`

### 2. Context Awareness
\`\`\`
Agents may miss important details
Solution: Provide comprehensive context, examples
\`\`\`

### 3. Cost
\`\`\`
API calls add up quickly
Solution: Caching, selective use of expensive models
\`\`\`

### 4. Safety & Security
\`\`\`
Agents may take unintended actions
Solution: Sandboxing, approval workflows, monitoring
\`\`\`
`,
          starterCode: `# Example agent applications

applications = {
    "Customer Support": {
        "input": "Customer complaint",
        "agent_steps": ["Read", "Search KB", "Generate response"],
        "output": "Solution or escalation",
    },
    "Research": {
        "input": "Research question",
        "agent_steps": ["Search papers", "Extract findings", "Synthesize"],
        "output": "Summary report",
    },
    "Code Fix": {
        "input": "Error message",
        "agent_steps": ["Analyze", "Fix", "Test"],
        "output": "Bug fix",
    },
    "Trip Planning": {
        "input": "Trip preferences",
        "agent_steps": ["Search", "Book", "Plan itinerary"],
        "output": "Complete trip plan",
    },
}

print("=== Real-World Agent Applications ===\\n")

for app_name, details in applications.items():
    print(f"{app_name}:")
    print(f"  Input: {details['input']}")
    print(f"  Steps: {' → '.join(details['agent_steps'])}")
    print(f"  Output: {details['output']}")
    print()

print("✓ Agents automate complex, multi-step tasks")
print("✓ Save time and human effort")
print("✓ Enable 24/7 autonomous operation")
`,
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// MODULE 10 — Model Context Protocol (MCP)
// ─────────────────────────────────────────────────────────────
const mcpModule: Module = {
  id: "model-context-protocol",
  title: "Model Context Protocol (MCP)",
  slug: "model-context-protocol",
  description:
    "Master the Model Context Protocol for building standardized, scalable AI systems. Learn to create MCP servers, integrate tools with LLMs and agents, and build production AI architectures.",
  introduction: `# Welcome to Model Context Protocol 🔌

## What is MCP?

The **Model Context Protocol (MCP)** is an open standard that allows AI models (LLMs, agents) to access tools, resources, and external systems in a standardized way.

\`\`\`
Before MCP:
Each AI framework had its own way to integrate tools
- LangChain: Tool format A
- AutoGPT: Tool format B
- Custom agents: Tool format C
Problem: Fragmentation, duplication, incompatibility

With MCP:
Standard protocol for all AI systems
- LLMs connect via MCP
- Agents connect via MCP
- Frameworks connect via MCP
Benefit: Interoperability, reusability, standardization
\`\`\`

## The MCP Architecture

\`\`\`
┌─────────────────────────────────────────┐
│  Client (LLM, Agent, Application)       │
└────────────┬────────────────────────────┘
             │ MCP Protocol
             │ (JSON-RPC over stdio/HTTP)
┌────────────▼────────────────────────────┐
│  MCP Server (Tool Provider)              │
│  ├─ Database connections                │
│  ├─ API integrations                    │
│  ├─ File system access                  │
│  └─ Custom business logic               │
└─────────────────────────────────────────┘
\`\`\`

## Why MCP Matters

### 1. **Standardization**
Single protocol instead of dozens of incompatible tool formats.

### 2. **Reusability**
Build an MCP server once, use with any MCP-compatible client (LLM, agent, framework).

### 3. **Security**
Standardized authentication, authorization, and sandboxing.

### 4. **Scalability**
Distribute tool providers across multiple servers without changing client code.

### 5. **Interoperability**
Claude, GPT-4, open-source LLMs all work with the same MCP servers.

## Real-World Impact

\`\`\`
Before MCP:
Company builds ChatGPT integration → Can't use with Claude
Company integrates with LangChain → Can't use with AutoGPT

With MCP:
Build MCP server once → Works with all LLMs, agents, frameworks
Update server → All clients automatically get new capabilities
\`\`\`

## Prerequisites

✅ Modules 1-4: Python, Pandas, Matplotlib, NumPy
✅ Recommended: Modules 8-9 (GenAI & Agentic AI)

We'll teach MCP from foundations to production!

## What You'll Learn

1. **MCP Fundamentals** — What is MCP, why it matters, architecture
2. **Building MCP Servers** — Create your first tool provider server
3. **Tool Implementation** — Define tools, handle requests, return results
4. **Client Integration** — Connect LLMs and agents to MCP servers
5. **Advanced Resources** — Resources, sampling, prompts beyond tools
6. **Security & Auth** — Authentication, authorization, sandboxing
7. **Debugging & Testing** — Test MCP servers, debug issues
8. **Real-World Architectures** — Multi-server, distributed systems
9. **Production Deployment** — Deploy MCP servers at scale
10. **Ecosystem & Standards** — MCP community, future directions

By the end, you'll build enterprise-grade AI systems with MCP! 🚀`,
  icon: "🔌",
  color: "from-purple-600 to-pink-900",
  level: "Advanced",
  totalDuration: "5h 14min",
  heroImage:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
  lessons: [
    {
      id: "mcp-fundamentals",
      moduleId: "model-context-protocol",
      lessonNumber: 1,
      title: "MCP Fundamentals & Architecture",
      description: "Understand the Model Context Protocol, its architecture, and why it matters.",
      duration: "31 min",
      difficulty: "Beginner",
      pages: [
        {
          pageNumber: 1,
          title: "The Problem MCP Solves",
          content: `# Model Context Protocol Fundamentals

## What is the Model Context Protocol?

The **Model Context Protocol (MCP)** is an open standard introduced by Anthropic in 2024 that defines a universal interface between AI language models (or agents) and external tools, data sources, and services. Before MCP, every AI framework — LangChain, OpenAI, AutoGPT, LlamaIndex — invented its own incompatible tool format, forcing developers to rewrite integrations for each platform.

MCP solves this by acting like a *USB-C for AI tools*: build one MCP server that exposes your capabilities, and any MCP-compatible client — regardless of the underlying model or framework — can use it without modification.

## The Context Problem

LLMs and agents need access to tools:
- Database queries
- API calls
- File system access
- Business logic

Each framework implemented tools differently!

\`\`\`
LangChain format:
{
  "name": "search",
  "description": "Search the web",
  "parameters": {...}
}

OpenAI format:
{
  "type": "function",
  "function": {
    "name": "search",
    "description": "Search the web",
    "parameters": {...}
  }
}

AutoGPT format:
class SearchTool:
  def execute(self, query):
    ...

Problem: No interoperability!
\`\`\`

## The MCP Solution

A single, standardized protocol:
- How clients request tool execution
- How servers describe available tools
- How results are returned
- Security & authentication

## MCP Architecture

\`\`\`
┌──────────────┐
│ LLM Client   │  
│ (Claude)     │
└──────┬───────┘
       │ MCP Protocol
       │ (JSON-RPC)
┌──────▼───────────────┐
│ MCP Server           │
│ (Tool Provider)      │
│ - Database tools     │
│ - API tools          │
│ - Custom logic       │
└─────────────────────┘
\`\`\`

## Key Concepts

### 1. Client
The AI system requesting tool access:
- LLM (Claude, GPT-4)
- Agent system
- Custom application

### 2. Server
The tool provider exposing capabilities:
- Hosts actual tool implementations
- Handles authentication
- Returns results to client

### 3. Protocol
Standardized communication:
- JSON-RPC format
- Transport: stdio, HTTP, WebSocket
- Bidirectional communication

## MCP Capabilities

### Tools
\`\`\`
Function-like capabilities server provides.
Client calls tool → Server executes → Returns result

Example: search, calculate, query_database
\`\`\`

### Resources
\`\`\`
Data/files server manages.
Client reads resources → Server returns data

Example: files, documents, knowledge base entries
\`\`\`

### Prompts
\`\`\`
Pre-written prompts server provides.
Client requests prompt → Server returns structured prompt

Example: "Summarize document", "Generate test cases"
\`\`\`

## Why Standardization Matters

\`\`\`
Before MCP (2024):
- 50+ tool formats
- Incompatible ecosystems
- Duplicate implementations
- Vendor lock-in

With MCP (2025+):
- 1 standard protocol
- Interoperable systems
- Reusable servers
- Framework-agnostic
\`\`\`

## Real-World Analogy

\`\`\`
Without MCP: APIs without REST
- Each company had their own API format
- Developers had to learn each one
- Code wasn't reusable

With REST standard:
- Single API format everyone follows
- Developers learn REST once
- APIs are interchangeable

MCP does the same for AI tool integration!
\`\`\`
`,
          starterCode: `# MCP Protocol Concept

class MCPServer:
    def __init__(self):
        self.tools = {}
    
    def register_tool(self, name, description, handler):
        """Register a tool this server provides"""
        self.tools[name] = {
            "name": name,
            "description": description,
            "handler": handler
        }
    
    def handle_request(self, tool_name, args):
        """Handle tool execution request from client"""
        if tool_name not in self.tools:
            return {"error": f"Tool {tool_name} not found"}
        
        tool = self.tools[tool_name]
        try:
            result = tool["handler"](**args)
            return {"result": result}
        except Exception as e:
            return {"error": str(e)}

# Create server
print("=== MCP Server Example ===\\n")

server = MCPServer()

# Register tools
server.register_tool(
    "search",
    "Search the web for information",
    lambda query: f"Found results for: {query}"
)

server.register_tool(
    "calculate",
    "Perform mathematical calculations",
    lambda expr: f"Result: {eval(expr)}"
)

# Simulate client requests
print("Client: Search for 'Python tutorial'")
result1 = server.handle_request("search", {"query": "Python tutorial"})
print(f"Server response: {result1}\\n")

print("Client: Calculate 2^10")
result2 = server.handle_request("calculate", {"expr": "2**10"})
print(f"Server response: {result2}\\n")

print("✓ MCP standardizes tool integration")
print("✓ Servers register tools once")
print("✓ Any MCP-compatible client can use them")
`,
        },
      ],
    },
    {
      id: "mcp-server-building",
      moduleId: "model-context-protocol",
      lessonNumber: 2,
      title: "Building MCP Servers",
      description: "Create your first MCP server and expose tools.",
      duration: "36 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Implementing MCP Servers",
          content: `# Building MCP Servers

## MCP Server Structure

\`\`\`
MCP Server components:
1. Server core (handles protocol)
2. Tool definitions (describe capabilities)
3. Tool handlers (implement logic)
4. Transport layer (stdio, HTTP, etc)
5. Authentication (optional)
\`\`\`

## Creating a Simple MCP Server

\`\`\`python
from mcp.server import Server
from mcp.types import Tool

server = Server("my-tool-server")

# Define a tool
search_tool = Tool(
    name="web_search",
    description="Search the web for information",
    inputSchema={
        "type": "object",
        "properties": {
            "query": {"type": "string"},
            "max_results": {"type": "integer"}
        }
    }
)

# Register tool
@server.tool("web_search")
def search(query: str, max_results: int = 5):
    # Actual implementation here
    return f"Results for {query}"

# Start server
server.run()
\`\`\`

## Tool Definition Schema

\`\`\`json
{
  "name": "calculate",
  "description": "Perform mathematical operations",
  "inputSchema": {
    "type": "object",
    "properties": {
      "expression": {
        "type": "string",
        "description": "Math expression to evaluate"
      },
      "precision": {
        "type": "integer",
        "description": "Decimal places (default 2)"
      }
    },
    "required": ["expression"]
  }
}
\`\`\`

## Tool Validation

Server validates inputs before calling handler:

\`\`\`python
@server.tool("divide")
def divide(numerator: float, denominator: float) -> float:
    if denominator == 0:
        raise ValueError("Cannot divide by zero")
    return numerator / denominator

# Client calls: divide(10, 0)
# Server validation: Rejects (denominator cannot be 0)
# Client never reaches handler (safe!)
\`\`\`

## Stateful Servers

Servers can maintain state:

\`\`\`python
class DatabaseServer(Server):
    def __init__(self):
        super().__init__("db-server")
        self.db_connection = None
    
    def on_startup(self):
        self.db_connection = connect_to_database()
    
    @server.tool("query")
    def query(self, sql: str):
        return self.db_connection.execute(sql)
    
    def on_shutdown(self):
        self.db_connection.close()
\`\`\`

## Error Handling

\`\`\`python
@server.tool("fetch_user")
def fetch_user(user_id: int):
    try:
        # Try to fetch user
        user = db.get_user(user_id)
        if not user:
            return {
                "error": "user_not_found",
                "message": f"User {user_id} not found"
            }
        return {"success": True, "user": user}
    
    except DatabaseError as e:
        return {
            "error": "database_error",
            "message": str(e)
        }
\`\`\`

## Transport Options

\`\`\`
1. Stdio (default)
   - Simple, works everywhere
   - Parent process spawns server

2. HTTP
   - Scalable
   - Easy to deploy
   - Add reverse proxy/load balancer

3. WebSocket
   - Bidirectional communication
   - Real-time updates
   - Works in browser
\`\`\`
`,
          starterCode: `# Simple MCP Server Implementation

class Tool:
    def __init__(self, name, description, handler):
        self.name = name
        self.description = description
        self.handler = handler

class MCPServerImpl:
    def __init__(self, name):
        self.name = name
        self.tools = []
    
    def register_tool(self, tool):
        """Register a tool with this server"""
        self.tools.append(tool)
        print(f"✓ Registered tool: {tool.name}")
    
    def list_tools(self):
        """Client can discover available tools"""
        return [
            {"name": t.name, "description": t.description}
            for t in self.tools
        ]
    
    def execute_tool(self, tool_name, **kwargs):
        """Execute a tool"""
        for tool in self.tools:
            if tool.name == tool_name:
                return tool.handler(**kwargs)
        return {"error": f"Tool {tool_name} not found"}

# Create server
print("=== Building an MCP Server ===\\n")

server = MCPServerImpl("my-server")

# Register tools
server.register_tool(Tool(
    "add",
    "Add two numbers",
    lambda a, b: {"result": a + b}
))

server.register_tool(Tool(
    "multiply",
    "Multiply two numbers",
    lambda a, b: {"result": a * b}
))

# Client discovers tools
print("\\nAvailable tools:")
for tool in server.list_tools():
    print(f"  - {tool['name']}: {tool['description']}")

# Client calls tool
print("\\nClient calls: add(5, 3)")
result = server.execute_tool("add", a=5, b=3)
print(f"Result: {result}")

print("\\n✓ MCP servers are easy to build")
print("✓ Register tools with metadata")
print("✓ Clients can discover & call tools")
`,
        },
      ],
    },
    {
      id: "mcp-tool-integration",
      moduleId: "model-context-protocol",
      lessonNumber: 3,
      title: "Tool Integration & Advanced Features",
      description: "Advanced tool capabilities, resources, and prompts in MCP.",
      duration: "32 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Advanced MCP Capabilities",
          content: `# Tool Integration in MCP

## Beyond Simple Tools

MCP servers provide more than just tools:

\`\`\`
1. Tools - Function execution
2. Resources - Data/files
3. Prompts - Pre-written instructions
4. Sampling - LLM inference
\`\`\`

## Resources

Expose data without exposing internals:

\`\`\`python
@server.resource("file")
def read_file(uri: str):
    # uri format: "file:///path/to/file"
    path = uri.replace("file://", "")
    with open(path, 'r') as f:
        return f.read()

@server.resource("document")
def get_document(doc_id: str):
    return db.documents.get(doc_id)
\`\`\`

Client can access without knowing implementation!

## Prompts

Pre-structured prompts for common tasks:

\`\`\`python
@server.prompt("summarize")
def summarize_prompt(text: str, style: str = "concise"):
    return f"""
    Summarize the following text in {style} style:
    
    {text}
    
    Summary:
    """

@server.prompt("test_generator")
def generate_tests_prompt(code: str):
    return f"""
    Generate unit tests for this code:
    
    {code}
    
    Tests:
    """
\`\`\`

## Tool Chaining

MCP servers can call other tools:

\`\`\`python
@server.tool("analyze_data")
def analyze(file_path: str):
    # This tool uses other tools
    data = fetch_file(file_path)  # Tool 1
    stats = calculate_stats(data)  # Tool 2
    report = format_report(stats)  # Tool 3
    return report
\`\`\`

## Streaming Results

For long-running operations:

\`\`\`python
@server.tool("long_operation", streaming=True)
def process_large_dataset(dataset: str):
    for chunk in chunks(dataset):
        result = process(chunk)
        yield result  # Send partial results
    
# Client receives results as they arrive!
\`\`\`

## Batch Operations

Execute multiple tool calls efficiently:

\`\`\`python
@server.tool("batch_search")
def search_multiple(queries: list[str]):
    results = []
    for query in queries:
        results.append(search(query))
    return results

# More efficient than calling search() multiple times
\`\`\`

## Tool Combinations

Server can combine tools for complex tasks:

\`\`\`python
@server.tool("research")
def research_topic(topic: str):
    # Combine multiple tools
    papers = search_arxiv(topic)
    summaries = [summarize(p) for p in papers]
    synthesis = synthesize_findings(summaries)
    return synthesis
\`\`\`
`,
          starterCode: `# Advanced MCP Features

class AdvancedMCPServer:
    def __init__(self):
        self.tools = {}
        self.resources = {}
        self.prompts = {}
    
    def register_resource(self, name, handler):
        """Register a resource (data)"""
        self.resources[name] = handler
    
    def register_prompt(self, name, handler):
        """Register a prompt template"""
        self.prompts[name] = handler
    
    def get_resource(self, resource_type, uri):
        """Retrieve a resource"""
        if resource_type in self.resources:
            return self.resources[resource_type](uri)
        return {"error": "Resource not found"}
    
    def get_prompt(self, prompt_name, **kwargs):
        """Get a prompt template"""
        if prompt_name in self.prompts:
            return self.prompts[prompt_name](**kwargs)
        return {"error": "Prompt not found"}

# Advanced server
print("=== Advanced MCP Features ===\\n")

server = AdvancedMCPServer()

# Register resource
server.register_resource(
    "document",
    lambda doc_id: f"Content of document {doc_id}"
)

# Register prompt
server.register_prompt(
    "summarize",
    lambda text: f"Summarize this text:\\n{text}\\n\\nSummary:"
)

# Client uses resource
print("Resource request: Get document 123")
content = server.get_resource("document", "123")
print(f"Response: {content}\\n")

# Client uses prompt
print("Prompt request: Summarize command")
prompt = server.get_prompt("summarize", text="Long article...")
print(f"Prompt: {prompt}\\n")

print("✓ Tools, Resources, Prompts extend MCP")
print("✓ Clients get unified interface")
`,
        },
      ],
    },
    {
      id: "mcp-client-integration",
      moduleId: "model-context-protocol",
      lessonNumber: 4,
      title: "Client Integration & LLM Connection",
      description: "Connect LLMs and agents to MCP servers.",
      duration: "34 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Using MCP Servers from LLMs",
          content: `# Client Integration with MCP

## Connecting LLMs to MCP

LLMs can transparently use MCP tools:

\`\`\`python
from mcp.client import MCPClient
from mcp.llm import Claude

# Start MCP server
server = start_server("my-server")

# Connect LLM to MCP
client = MCPClient(server)
llm = Claude(mcp_client=client)

# LLM can now use all tools!
response = llm.chat("Search for Python tutorials and summarize findings")

# LLM automatically:
# 1. Calls search tool
# 2. Gets results
# 3. Calls summarize tool
# 4. Returns final answer
\`\`\`

## Discovery

LLM discovers available tools on startup:

\`\`\`python
# Client requests tool list
GET /tools

# Server responds
{
  "tools": [
    {
      "name": "search",
      "description": "Search the web",
      "inputSchema": {...}
    },
    {
      "name": "calculate",
      "description": "Math operations",
      "inputSchema": {...}
    }
  ]
}

# LLM adds to its context
\`\`\`

## Tool Calling Flow

\`\`\`
1. User: "Search for AI news and summarize"
2. LLM thinks: "I need search tool"
3. LLM calls: search(query="AI news")
4. MCP executes tool
5. LLM observes: [search results]
6. LLM thinks: "Now I need summarize"
7. LLM calls: summarize(text=results)
8. MCP executes
9. LLM returns: Final summary
10. User gets response
\`\`\`

## Multi-Server Architecture

LLM can connect to multiple MCP servers:

\`\`\`
┌──────────────┐
│ LLM Client   │
└──────┬───────┘
       │
    ┌──┴──┬──────────┬──────────┐
    │     │          │          │
┌───▼───┐ │      ┌───▼───┐ ┌───▼───┐
│Server1 │ │      │Server2 │ │Server3 │
│Tools:  │ │      │Tools:  │ │Tools:  │
│search  │ │      │db      │ │email   │
│calc    │ │      │query   │ │send    │
└────────┘ │      └────────┘ └────────┘
           │
    LLM uses all 9 tools seamlessly!
\`\`\`

## Caching

Optimize repeated requests:

\`\`\`python
client = MCPClient(server, cache_ttl=300)

# First call: Executes tool
result1 = llm.chat("What's 2+2?")  # Calls server

# Repeat within 5 minutes: Uses cache
result2 = llm.chat("What's 2+2?")  # From cache!

# After 5 minutes: Fresh call
result3 = llm.chat("What's 2+2?")  # Calls server again
\`\`\`

## Error Handling

Client gracefully handles server errors:

\`\`\`python
try:
    result = llm.call_tool("search", query="...")
except MCPServerError as e:
    # Server error - try fallback
    result = fallback_search(query="...")
except MCPConnectionError:
    # Server unreachable - notify user
    return "Service temporarily unavailable"
\`\`\`
`,
          starterCode: `# LLM Client using MCP

class SimpleMCPClient:
    def __init__(self, server):
        self.server = server
        self.discovered_tools = []
    
    def discover_tools(self):
        """Discover available tools on server"""
        self.discovered_tools = self.server.list_tools()
        print(f"Discovered {len(self.discovered_tools)} tools")
    
    def call_tool(self, tool_name, **kwargs):
        """Call a tool on MCP server"""
        return self.server.execute_tool(tool_name, **kwargs)
    
    def chat_with_tools(self, user_message):
        """LLM processes message with access to tools"""
        print(f"User: {user_message}")
        
        # Simulate LLM reasoning
        for tool in self.discovered_tools:
            if tool["name"] in user_message.lower():
                print(f"LLM: Using {tool['name']} tool")
                result = self.call_tool(tool["name"])
                return f"Result: {result}"
        
        return "No applicable tools found"

# Mock server
class MockServer:
    def list_tools(self):
        return [
            {"name": "search", "description": "Search"},
            {"name": "calculate", "description": "Calculate"}
        ]
    
    def execute_tool(self, name, **kwargs):
        return f"Executed: {name}"

# Client using MCP
print("=== LLM Client with MCP ===\\n")

server = MockServer()
client = SimpleMCPClient(server)

client.discover_tools()
print()

response = client.chat_with_tools("Search for Python info")
print(response)

print("\\n✓ LLMs discover MCP tools automatically")
print("✓ Seamless tool integration")
print("✓ Multi-server support")
`,
        },
      ],
    },
    {
      id: "mcp-security",
      moduleId: "model-context-protocol",
      lessonNumber: 5,
      title: "Security & Authentication in MCP",
      description: "Secure MCP deployments with auth, authorization, and sandboxing.",
      duration: "30 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Security Best Practices",
          content: `# Security in MCP

## Authentication

Verify server identity:

\`\`\`python
# Server presents certificate
server = MCPServer(
    cert_file="server.crt",
    key_file="server.key"
)

# Client verifies
client = MCPClient(
    server_url="https://...",
    verify_cert=True,
    trusted_certs=["server.crt"]
)
\`\`\`

## Authorization

Control what clients can access:

\`\`\`python
@server.tool("delete_user")
@require_permission("admin")
def delete_user(user_id: int):
    # Only admin can call this
    db.delete_user(user_id)

@server.tool("read_public_data")
@require_permission("user")
def read_data():
    # Any authenticated user
    return public_data
\`\`\`

## Input Validation

Prevent injection attacks:

\`\`\`python
@server.tool("query_db")
def query(sql: str):
    # BAD: Direct SQL
    # result = db.execute(sql)
    
    # GOOD: Parameterized query
    result = db.execute(
        "SELECT * FROM users WHERE id = ?",
        [sql]  # Treated as parameter, not code
    )
    return result
\`\`\`

## Output Sanitization

Don't leak sensitive data:

\`\`\`python
@server.tool("get_user")
def get_user(user_id: int):
    user = db.get(user_id)
    
    # BAD: Return all fields
    # return user  # Includes password_hash!
    
    # GOOD: Return only safe fields
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email
        # password_hash NOT included
    }
\`\`\`

## Rate Limiting

Prevent DoS attacks:

\`\`\`python
from mcp.decorators import rate_limit

@server.tool("search")
@rate_limit(calls=100, period=60)  # 100 calls per minute
def search(query: str):
    return search_engine.search(query)
\`\`\`

## Sandboxing

Isolate untrusted code:

\`\`\`python
@server.tool("execute_code")
def run_code(code: str):
    # BAD: Direct execution
    # exec(code)  # Dangerous!
    
    # GOOD: Sandboxed environment
    sandbox = Sandbox(
        allowed_imports=["math", "random"],
        timeout=5,
        memory_limit="100MB"
    )
    result = sandbox.execute(code)
    return result
\`\`\`

## Logging & Auditing

Track all tool usage:

\`\`\`python
@server.tool("sensitive_operation")
def operation(user_id: int):
    logger.audit(
        event="tool_called",
        tool_name="sensitive_operation",
        user_id=user_id,
        timestamp=now(),
        source_ip=request.ip
    )
    return result
\`\`\`
`,
          starterCode: `# Security in MCP

class SecureAuthMiddleware:
    def __init__(self):
        self.valid_tokens = {"token123": "user1"}
    
    def verify_request(self, token):
        """Verify authentication token"""
        if token not in self.valid_tokens:
            raise AuthError("Invalid token")
        return self.valid_tokens[token]

class SecureMCPServer:
    def __init__(self, auth):
        self.auth = auth
        self.tools = {}
        self.audit_log = []
    
    def execute_tool(self, token, tool_name, **kwargs):
        """Execute tool with security checks"""
        
        # 1. Authenticate
        user = self.auth.verify_request(token)
        
        # 2. Authorize (check permissions)
        if not self.has_permission(user, tool_name):
            raise AuthError(f"User {user} cannot use {tool_name}")
        
        # 3. Validate input
        validated = self.validate_input(tool_name, kwargs)
        
        # 4. Execute
        result = self.tools[tool_name](**validated)
        
        # 5. Log audit trail
        self.audit_log.append({
            "user": user,
            "tool": tool_name,
            "timestamp": "now",
            "success": True
        })
        
        return result

# Security demo
print("=== MCP Security ===\\n")

auth = SecureAuthMiddleware()
server = SecureMCPServer(auth)

try:
    result = server.execute_tool("token123", "search", query="test")
    print(f"✓ Authorized request succeeded")
except AuthError as e:
    print(f"✗ Auth failed: {e}")

print("\\n✓ MCP requires authentication")
print("✓ Authorization controls tool access")
print("✓ Audit logging tracks usage")
`,
        },
      ],
    },
    {
      id: "mcp-production",
      moduleId: "model-context-protocol",
      lessonNumber: 6,
      title: "Production Deployment & Scaling",
      description: "Deploy MCP servers reliably and scale to production workloads.",
      duration: "35 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Production MCP Systems",
          content: `# Production Deployment

## Architecture Patterns

### Single Server
\`\`\`
Client → MCP Server
Simple, suitable for low traffic
\`\`\`

### Load Balanced
\`\`\`
Client → Load Balancer → [Server 1, Server 2, Server 3]
Distributes load, handles traffic spikes
\`\`\`

### Multi-Region
\`\`\`
Region A: [Server 1, Server 2]
Region B: [Server 3, Server 4]

Low latency for each region
High availability
\`\`\`

## Container Deployment

\`\`\`dockerfile
FROM python:3.11
WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY server.py .

EXPOSE 8000
CMD ["python", "server.py"]
\`\`\`

\`\`\`bash
docker build -t mcp-server .
docker run -p 8000:8000 mcp-server
\`\`\`

## Monitoring

Track server health:

\`\`\`python
@server.health_check()
def health():
    return {
        "status": "healthy",
        "timestamp": now(),
        "uptime_seconds": uptime(),
        "tool_calls_total": stats.total_calls,
        "tool_calls_per_minute": stats.calls_per_minute
    }
\`\`\`

## Metrics

\`\`\`
Track:
- Tool call success rate
- Average latency per tool
- Error rate
- Cache hit rate
- Authentication failures
\`\`\`

## Graceful Shutdown

Handle termination safely:

\`\`\`python
def shutdown_handler():
    # Complete in-flight requests
    wait_for_requests(timeout=30)
    
    # Close database connections
    db.close()
    
    # Log shutdown
    logger.info("Server shutting down")
    
    exit(0)

signal.signal(signal.SIGTERM, shutdown_handler)
\`\`\`

## High Availability

\`\`\`
Strategies:
1. Multiple servers in cluster
2. Health checks (remove unhealthy)
3. Automatic failover
4. Shared database (stateless servers)
5. Load balancer with automatic scaling
\`\`\`

## Cost Optimization

\`\`\`
Reduce costs:
- Use smaller instances for light load
- Auto-scale based on demand
- Cache frequent results
- Batch tool calls when possible
- Close idle connections
\`\`\`
`,
          starterCode: `# Production-Ready MCP Server

class ProductionMCPServer:
    def __init__(self, config):
        self.config = config
        self.tools = {}
        self.metrics = {
            "calls": 0,
            "errors": 0,
            "latency_sum": 0
        }
    
    def execute_tool(self, tool_name, **kwargs):
        """Execute with monitoring"""
        start_time = time.time()
        
        try:
            result = self.tools[tool_name](**kwargs)
            self.metrics["calls"] += 1
        except Exception as e:
            self.metrics["errors"] += 1
            raise
        finally:
            latency = time.time() - start_time
            self.metrics["latency_sum"] += latency
    
    def get_health(self):
        """Health check endpoint"""
        avg_latency = (
            self.metrics["latency_sum"] / 
            max(self.metrics["calls"], 1)
        )
        
        error_rate = (
            self.metrics["errors"] / 
            max(self.metrics["calls"], 1)
        )
        
        return {
            "status": "healthy" if error_rate < 0.01 else "degraded",
            "total_calls": self.metrics["calls"],
            "error_rate": error_rate,
            "avg_latency_ms": avg_latency * 1000
        }

# Production config
print("=== Production MCP Deployment ===\\n")

config = {
    "host": "0.0.0.0",
    "port": 8000,
    "workers": 4,
    "timeout": 30
}

server = ProductionMCPServer(config)

print("Health check:")
health = server.get_health()
for key, value in health.items():
    if isinstance(value, float):
        print(f"  {key}: {value:.2f}")
    else:
        print(f"  {key}: {value}")

print("\\n✓ Production servers need monitoring")
print("✓ Health checks enable auto-scaling")
print("✓ Metrics drive optimization")
`,
        },
      ],
    },
    {
      id: "mcp-debugging",
      moduleId: "model-context-protocol",
      lessonNumber: 7,
      title: "Debugging & Testing MCP Systems",
      description: "Test and debug MCP servers and client integrations.",
      duration: "28 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Testing & Debugging",
          content: `# Debugging MCP

## Unit Testing Tools

\`\`\`python
import pytest
from mcp.testing import MCPTestClient

@pytest.fixture
def client():
    server = create_test_server()
    return MCPTestClient(server)

def test_search_tool(client):
    result = client.call_tool("search", query="test")
    assert "results" in result
    assert len(result["results"]) > 0
\`\`\`

## Mock Servers

Test client code without real server:

\`\`\`python
from mcp.testing import MockMCPServer

mock_server = MockMCPServer()
mock_server.register_response(
    tool="search",
    response={"results": ["item1", "item2"]}
)

client = MCPClient(mock_server)
result = client.call_tool("search")
# Returns mocked response
\`\`\`

## Protocol Inspection

View raw MCP messages:

\`\`\`python
client = MCPClient(server, debug=True)

# Logs all JSON-RPC messages:
# → {"method": "call_tool", "params": {...}}
# ← {"result": {...}}
\`\`\`

## Error Reproduction

Capture and replay issues:

\`\`\`python
import mcp.recording

# Record session
with mcp.recording.record("debug.mcplog"):
    client.call_tool("search", query="problematic")

# Later: Replay to debug
with mcp.recording.replay("debug.mcplog"):
    # Exact same execution without live server
    client.call_tool("search", query="problematic")
\`\`\`

## Logging

Detailed logging helps debugging:

\`\`\`python
import logging

logging.basicConfig(level=logging.DEBUG)

# Shows:
# Tool call: search(query=...)
# Tool latency: 234ms
# Tool result: {...}
# Tool error: ...
\`\`\`

## Common Issues

### Timeout
\`\`\`
Problem: Tool takes >30 seconds
Fix: Increase timeout or optimize tool
\`\`\`

### Connection Error
\`\`\`
Problem: Client can't reach server
Fix: Check server running, firewall, network
\`\`\`

### Missing Tool
\`\`\`
Problem: Tool not found on server
Fix: Rediscover tools or restart server
\`\`\`

### Invalid Input
\`\`\`
Problem: Client sends wrong parameter types
Fix: Check tool schema, validate before sending
\`\`\`
`,
          starterCode: `# MCP Testing & Debugging

import unittest

class TestMCPTools(unittest.TestCase):
    def setUp(self):
        self.server = MockMCPServer()
    
    def test_tool_exists(self):
        """Test tool is registered"""
        tools = self.server.list_tools()
        tool_names = [t["name"] for t in tools]
        self.assertIn("search", tool_names)
    
    def test_tool_execution(self):
        """Test tool returns valid result"""
        result = self.server.execute_tool("search", query="test")
        self.assertIsNotNone(result)
        self.assertIn("results", result)
    
    def test_invalid_input(self):
        """Test error handling"""
        with self.assertRaises(ValueError):
            self.server.execute_tool("search", query=None)
    
    def test_tool_latency(self):
        """Test performance"""
        import time
        start = time.time()
        self.server.execute_tool("search", query="test")
        latency = time.time() - start
        self.assertLess(latency, 1.0)  # Should be < 1 second

class MockMCPServer:
    def __init__(self):
        self.tools = {"search": lambda **kw: {"results": []}}
    
    def list_tools(self):
        return [{"name": "search"}]
    
    def execute_tool(self, name, **kwargs):
        if name not in self.tools:
            raise ValueError(f"Tool {name} not found")
        return self.tools[name](**kwargs)

# Run tests
print("=== MCP Testing ===\\n")

suite = unittest.TestLoader().loadTestsFromTestCase(TestMCPTools)
runner = unittest.TextTestRunner(verbosity=2)
runner.run(suite)

print("\\n✓ Unit tests verify tool behavior")
print("✓ Mock servers enable offline testing")
`,
        },
      ],
    },
    {
      id: "mcp-realworld",
      moduleId: "model-context-protocol",
      lessonNumber: 8,
      title: "Real-World MCP Applications",
      description: "Build production MCP systems for real problems.",
      duration: "32 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "MCP in Practice",
          content: `# Real-World MCP Applications

## Database Server

MCP server for database access:

\`\`\`python
class DatabaseMCPServer(MCPServer):
    def __init__(self, connection_string):
        self.db = connect(connection_string)
    
    @tool()
    def query(self, sql: str) -> dict:
        "Execute SQL query (read-only)"
        return self.db.execute(sql)
    
    @tool()
    def describe_table(self, table: str) -> dict:
        "Get table schema"
        return self.db.describe(table)

# LLM can now query any database!
llm.chat("Show me top users by revenue")
# LLM calls: describe_table, query
# Returns: Results with proper SQL
\`\`\`

## Search Server

Multi-source search:

\`\`\`python
class SearchMCPServer(MCPServer):
    @tool()
    def web_search(self, query: str):
        "Search the web"
        return google_search(query)
    
    @tool()
    def code_search(self, query: str):
        "Search GitHub"
        return github_search(query)
    
    @tool()
    def academic_search(self, query: str):
        "Search academic papers"
        return arxiv_search(query)

# Single interface to all search sources!
\`\`\`

## Integration Server

Connect multiple APIs:

\`\`\`python
class IntegrationServer(MCPServer):
    @tool()
    def slack_send_message(self, channel: str, text: str):
        "Send Slack message"
        return slack.send(channel, text)
    
    @tool()
    def github_create_issue(self, repo: str, title: str):
        "Create GitHub issue"
        return github.create_issue(repo, title)
    
    @tool()
    def salesforce_update_lead(self, lead_id: str, data: dict):
        "Update Salesforce lead"
        return salesforce.update(lead_id, data)

# Agents can orchestrate across tools!
\`\`\`

## Custom Logic Server

Domain-specific business logic:

\`\`\`python
class BusinessLogicServer(MCPServer):
    @tool()
    def calculate_invoice(self, items: list):
        "Calculate invoice with tax, discounts"
        subtotal = sum(i["price"] for i in items)
        discount = subtotal * 0.1 if subtotal > 1000 else 0
        tax = (subtotal - discount) * 0.08
        total = subtotal - discount + tax
        return {
            "subtotal": subtotal,
            "discount": discount,
            "tax": tax,
            "total": total
        }
    
    @tool()
    def check_inventory(self, product: str) -> bool:
        "Check if in stock"
        return inventory.get(product, 0) > 0
\`\`\`

## Why MCP Works

\`\`\`
Before: Build integration for each LLM/framework
After: Build MCP server once, use everywhere

Database Server works with:
- Claude
- GPT-4
- LangChain agents
- Custom applications
- Future LLMs

Write once, deploy everywhere!
\`\`\`
`,
          starterCode: `# Real-World MCP Example: Task Manager

class TaskManagerMCPServer:
    def __init__(self):
        self.tasks = {}
        self.task_id = 0
    
    def create_task(self, title: str, description: str = ""):
        """Create a new task"""
        task_id = self.task_id
        self.task_id += 1
        self.tasks[task_id] = {
            "id": task_id,
            "title": title,
            "description": description,
            "completed": False
        }
        return self.tasks[task_id]
    
    def list_tasks(self):
        """List all tasks"""
        return list(self.tasks.values())
    
    def complete_task(self, task_id: int):
        """Mark task as complete"""
        if task_id in self.tasks:
            self.tasks[task_id]["completed"] = True
            return {"status": "completed"}
        return {"error": "Task not found"}

# Real-world usage
print("=== Real-World MCP: Task Manager ===\\n")

server = TaskManagerMCPServer()

# Create tasks
task1 = server.create_task("Write documentation", "Update API docs")
task2 = server.create_task("Review PR")
task3 = server.create_task("Deploy to production")

# List all
print("All tasks:")
for task in server.list_tasks():
    status = "✓" if task["completed"] else "○"
    print(f"  [{status}] {task['title']}")

# Complete one
print("\\nCompleting task 1...")
server.complete_task(0)

print("\\nUpdated tasks:")
for task in server.list_tasks():
    status = "✓" if task["completed"] else "○"
    print(f"  [{status}] {task['title']}")

print("\\n✓ MCP servers solve real problems")
print("✓ LLMs can manage complex workflows")
`,
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// MODULE 11 — Sliding Window Protocol & Algorithms
// ─────────────────────────────────────────────────────────────
const slidingWindowModule: Module = {
  id: "sliding-window-algorithms",
  title: "Sliding Window Protocol & Algorithms",
  slug: "sliding-window-algorithms",
  description:
    "Master the sliding window pattern for efficient data processing. From network protocols to algorithmic optimization, learn to solve problems in linear time with constant space.",
  introduction: `# Welcome to Sliding Window Algorithms 🪟

## What is a Sliding Window?

A **sliding window** is a technique where a fixed-size or variable-size window moves through data (array, string, stream) to solve problems efficiently.

\`\`\`
Array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

Window size 3:
[1, 2, 3] → [2, 3, 4] → [3, 4, 5] → ... → [8, 9, 10]

Each position processes the window without re-processing old data!
\`\`\`

## Why Sliding Window?

\`\`\`
Naive approach: Nested loops
- Process each window from scratch
- Time: O(n * k) where k = window size
- Inefficient for large datasets

Sliding window approach:
- Remove old element, add new element
- Time: O(n)
- 100x faster!
\`\`\`

## Two Contexts

### 1. Algorithmic Pattern
Solve problems on arrays/strings efficiently:
- Find longest substring
- Calculate rolling averages
- Pattern matching

### 2. Network Protocol
TCP/IP sliding window for:
- Flow control
- Reliable delivery
- Congestion management

## Real-World Applications

\`\`\`
Algorithmic:
- Stock price moving average (finance)
- User behavior window (analytics)
- DNA sequence matching (bioinformatics)

Networking:
- TCP/IP communication
- Video streaming
- Packet loss recovery
\`\`\`

## Prerequisites

✅ Module 1: Python Basics
✅ Module 4: NumPy (for data processing)

Perfect for intermediate learners!

## What You'll Learn

1. **Sliding Window Fundamentals** — Core pattern and intuition
2. **Two-Pointer Technique** — Advanced variation for matching
3. **Network Sliding Window** — TCP/IP protocol flow control
4. **String Matching** — KMP, Rabin-Karp algorithms
5. **Stream Processing** — Handle data streams efficiently
6. **Advanced Optimization** — Data structures and caching
7. **Real-World Applications** — Finance, analytics, systems
8. **Performance Analysis** — Time and space complexity

By the end, you'll solve complex problems in linear time! 🚀`,
  icon: "🪟",
  color: "from-red-600 to-orange-900",
  level: "Advanced",
  totalDuration: "5h 42min",
  heroImage:
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80",
  lessons: [
    {
      id: "sliding-window-basics",
      moduleId: "sliding-window-algorithms",
      lessonNumber: 1,
      title: "Sliding Window Fundamentals",
      description: "Understand the sliding window pattern and core intuition.",
      duration: "34 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "The Core Pattern",
          content: `# Sliding Window Fundamentals

## What is the Sliding Window Technique?

The **sliding window** is an algorithmic technique used to efficiently process contiguous subsets ("windows") of a sequence — such as an array or string — by maintaining a running computation rather than recalculating from scratch at each position. Instead of re-examining every element in a window when it moves one step, the algorithm simply *adds* the new element entering the window and *removes* the element leaving it, reducing per-step cost from O(k) to O(1).

This pattern transforms many brute-force O(n×k) problems into O(n) solutions, making it one of the most important techniques in both algorithm design and real-world data stream processing.

## The Basic Concept

\`\`\`
Instead of recalculating everything:
Window moves 1 position at a time

Old data:     Remove
              ↓
[1, 2, 3, 4, 5, 6, 7]
   ───────
   Window
              ↑
New data:     Add

Calculation:
sum(new_window) = sum(old_window) - removed + added
\`\`\`

## Time Complexity

\`\`\`
Naive: O(n * k)
- For each position: recalculate entire window
- n positions × k size = n*k operations

Sliding window: O(n)
- Calculate first window: O(k)
- Slide n times: O(1) each
- Total: O(k) + O(n) = O(n)

Example:
Array of 1M elements, window size 1000:
Naive: 1,000,000,000 operations
Sliding: 1,001,000 operations
1000x faster!
\`\`\`

## Two Types

### Fixed-Size Window
\`\`\`
Window size known and constant

Example: Find max sum of 3 consecutive numbers
[1, 2, 3, 4, 5]
[1, 2, 3] → sum = 6
[2, 3, 4] → sum = 9
[3, 4, 5] → sum = 12 (max)
\`\`\`

### Variable-Size Window
\`\`\`
Window size expands/contracts based on condition

Example: Longest substring without repeating characters
"abcabcbb"
"a" → "ab" → "abc" → "cab" (skip 'a') → "cab" → "abc"
\`\`\`

## Template Pattern

Most sliding window problems follow this structure:

\`\`\`python
def sliding_window(data, condition):
    window = deque()
    left = 0
    result = 0
    
    for right in range(len(data)):
        # Add new element
        window.append(data[right])
        
        # Shrink window if condition violated
        while not condition(window):
            window.popleft()
            left += 1
        
        # Update result
        result = max(result, len(window))
    
    return result
\`\`\`

## Classic Problems

\`\`\`
1. Maximum sum subarray of size k
2. Longest substring without repeating chars
3. Contains duplicate (within distance k)
4. Minimum window substring
5. Fruit into baskets
6. Longest repeating character replacement
\`\`\`
`,
          starterCode: `# Sliding Window: Maximum Sum of K Elements

def max_sum_subarray(arr, k):
    """Find maximum sum of k consecutive elements"""
    
    # Calculate initial window
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    # Slide the window
    for i in range(k, len(arr)):
        # Remove leftmost element, add rightmost
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# Example
arr = [1, 4, 2, 10, 2, 3, 1, 0, 20]
k = 4

print("=== Sliding Window: Max Sum ===\\n")
print(f"Array: {arr}")
print(f"Window size: {k}\\n")

result = max_sum_subarray(arr, k)

print(f"Maximum sum: {result}")
print(f"\\n✓ Sliding window: O(n) time")
print(f"✓ Constant O(k) space")
print(f"✓ Move window, update sum incrementally")
`,
        },
      ],
    },
    {
      id: "sliding-window-two-pointer",
      moduleId: "sliding-window-algorithms",
      lessonNumber: 2,
      title: "Two-Pointer & Expanding Windows",
      description: "Advanced sliding window with two pointers for matching problems.",
      duration: "36 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Two-Pointer Technique",
          content: `# Two-Pointer Sliding Window

## The Concept

Use two pointers (left, right) to maintain window boundaries:

\`\`\`
Array: [1, 3, 2, 2, 3, 1]
Goal: Longest substring with max k distinct chars

k = 2

[1, 3] ✓ (2 distinct)
[1, 3, 2] ✗ (3 distinct) → shrink left
[3, 2] ✓
[3, 2, 2] ✓
[3, 2, 2, 3] ✗ → shrink
[2, 2, 3] ✓
\`\`\`

## Expanding vs Shrinking

\`\`\`
Expand (right pointer):
- When window is valid
- Add new element

Shrink (left pointer):
- When window violates condition
- Remove old elements

Repeat until entire array processed
\`\`\`

## Use Cases

\`\`\`
Two-pointer works when:
- Need flexible window size
- Condition evaluated incrementally
- Can add/remove from both ends

Examples:
- Longest substring without repeating
- Minimum window substring
- Fruits into baskets
- Max consecutive elements
\`\`\`

## Pattern

\`\`\`python
left = 0
for right in range(len(arr)):
    # Expand: add arr[right]
    
    # Shrink if needed
    while condition_violated:
        # remove arr[left]
        left += 1
    
    # Process window [left, right]
\`\`\`
`,
          starterCode: `# Two-Pointer: Longest Substring without Repeating Chars

def longest_substring_no_repeat(s):
    """Find longest substring without repeating characters"""
    
    char_index = {}  # Track last index of each char
    max_length = 0
    left = 0
    
    for right in range(len(s)):
        # If char seen before and still in window
        if s[right] in char_index and char_index[s[right]] >= left:
            # Move left pointer past the repeated char
            left = char_index[s[right]] + 1
        
        # Update last seen position
        char_index[s[right]] = right
        
        # Update max length
        max_length = max(max_length, right - left + 1)
    
    return max_length

# Test
test_cases = ["abcabcbb", "bbbbb", "pwwkew", "au", "dvdf"]

print("=== Longest Substring (No Repeats) ===\\n")

for s in test_cases:
    result = longest_substring_no_repeat(s)
    print(f"Input: '{s}' → Length: {result}")

print("\\n✓ Two-pointer efficiently tracks window")
print("✓ HashMap avoids redundant checks")
`,
        },
      ],
    },
    {
      id: "sliding-window-network",
      moduleId: "sliding-window-algorithms",
      lessonNumber: 3,
      title: "Network Sliding Window Protocol",
      description: "TCP/IP sliding window for reliable data transmission.",
      duration: "38 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "TCP/IP Sliding Window",
          content: `# Network Sliding Window

## The Problem

Sending data over networks:
- Packets can be lost
- Need confirmation
- Want efficiency

Naive approach:
\`\`\`
Send packet 1 → Wait for ACK → Send packet 2 → Wait...
Only 1 packet in flight!
\`\`\`

Inefficient: Network latency wastes time

## The Sliding Window Solution

\`\`\`
Send window of packets without waiting:
Send: 1, 2, 3, 4, 5 (all without waiting)
Receive ACKs: 1, 2, 3, 4, 5
Slide window: Now can send 6, 7, 8, 9, 10
\`\`\`

Benefits:
- Multiple packets in flight
- Better bandwidth utilization
- Handles packet loss gracefully

## TCP Window Structure

\`\`\`
Sent & ACKed | Sent & Pending ACK | Can Send | Cannot Send
────────────┼──────────────────┼──────────┼─────────────
1, 2, 3, 4  | 5, 6, 7, 8       | 9-12     | 13+

Window size = 4 packets
\`\`\`

## Flow Control

Receiver can advertise window size:
\`\`\`
Receiver: "Send only 5 packets at a time"
(I can't process more than 5)

Sender respects receiver's capacity
Prevents overwhelming receiver!
\`\`\`

## Congestion Control

Adjust window based on network conditions:
\`\`\`
Healthy: window size = 10
Packet loss detected: window size = 5
No loss for time T: window size = 15

Algorithms: TCP Reno, CUBIC, BBR
\`\`\`

## Sequence Numbers

\`\`\`
Packet header includes:
- Sequence number (where in stream)
- Acknowledge number (up to what received)
- Window size (how much more can send)

Receiver: "Got up to byte 5000, window 2000"
Sender: "Can send bytes 5001-7000"
\`\`\`
`,
          starterCode: `# TCP Sliding Window Simulation

class TCPSlidingWindow:
    def __init__(self, window_size=4):
        self.window_size = window_size
        self.sent_not_acked = []
        self.next_seq = 0
    
    def send_packets(self, count):
        """Send up to window_size packets"""
        can_send = self.window_size - len(self.sent_not_acked)
        to_send = min(count, can_send)
        
        for _ in range(to_send):
            self.sent_not_acked.append(self.next_seq)
            self.next_seq += 1
        
        return to_send
    
    def receive_ack(self, ack_num):
        """Process ACK for packets up to ack_num"""
        # Remove ACKed packets from window
        self.sent_not_acked = [
            seq for seq in self.sent_not_acked 
            if seq >= ack_num
        ]
    
    def window_status(self):
        return {
            "acked_up_to": self.next_seq - len(self.sent_not_acked) - 1,
            "pending": list(self.sent_not_acked),
            "window_size": self.window_size,
            "can_send": self.window_size - len(self.sent_not_acked)
        }

# Simulate TCP
print("=== TCP Sliding Window ===\\n")

tcp = TCPSlidingWindow(window_size=4)

print("Step 1: Send 4 packets")
tcp.send_packets(10)
print(f"Status: {tcp.window_status()}\\n")

print("Step 2: Receive ACK for packet 2")
tcp.receive_ack(2)
print(f"Status: {tcp.window_status()}\\n")

print("Step 3: Send 2 more packets")
tcp.send_packets(10)
print(f"Status: {tcp.window_status()}\\n")

print("✓ Window slides as ACKs received")
print("✓ Efficient use of network")
print("✓ Handles multiple packets in flight")
`,
        },
      ],
    },
    {
      id: "sliding-window-string",
      moduleId: "sliding-window-algorithms",
      lessonNumber: 4,
      title: "String Matching & Pattern Detection",
      description: "Efficient string algorithms using sliding window patterns.",
      duration: "35 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Pattern Matching Algorithms",
          content: `# String Matching with Sliding Window

## Naive String Search

\`\`\`python
def naive_search(text, pattern):
    for i in range(len(text) - len(pattern)):
        if text[i:i+len(pattern)] == pattern:
            return i
    return -1

Time: O(n*m) where n=text, m=pattern
Slow for large text!
\`\`\`

## Rabin-Karp Algorithm

Use hash values instead of string comparison:

\`\`\`
text = "ABABCABABA"
pattern = "ABA"

Calculate hash of pattern
Slide window, calculate each hash
Compare hashes (O(1) instead of O(m))

Time: O(n + m) average case!
\`\`\`

## KMP Algorithm

Knuth-Morris-Pratt uses failure function:

\`\`\`
If mismatch: Don't restart from beginning
Jump to known safe position

text = "ABABCABABA"
pattern = "ABAB"

ABAB...
    ↓ mismatch
Jump to position based on overlaps!
\`\`\`

## Practical Applications

\`\`\`
1. Text search (Ctrl+F)
2. DNA sequence matching
3. Plagiarism detection
4. Autocomplete & search engines
5. Network packet inspection
6. Video/image recognition
\`\`\`

## Complexity Comparison

\`\`\`
Algorithm     | Time         | Space
────────────────────────────────────
Naive         | O(n*m)       | O(1)
Rabin-Karp    | O(n+m)       | O(1)
KMP           | O(n+m)       | O(m)
Boyer-Moore   | O(n/m)       | O(m)
\`\`\`
`,
          starterCode: `# Rabin-Karp String Matching

def rabin_karp_search(text, pattern):
    """Find pattern in text using rolling hash"""
    
    PRIME = 101
    BASE = 256
    pattern_hash = 0
    text_hash = 0
    power = 1
    
    # Calculate pattern hash
    for char in pattern:
        pattern_hash = (pattern_hash * BASE + ord(char)) % PRIME
    
    # Calculate initial window hash
    for char in text[:len(pattern)]:
        text_hash = (text_hash * BASE + ord(char)) % PRIME
    
    # Slide window
    for i in range(len(text) - len(pattern) + 1):
        # Hash matches - verify
        if text_hash == pattern_hash:
            if text[i:i+len(pattern)] == pattern:
                return i
        
        # Calculate next hash
        if i < len(text) - len(pattern):
            # Remove first char, add next char
            text_hash = (
                (text_hash - ord(text[i]) * power % PRIME) * BASE + 
                ord(text[i + len(pattern)])
            ) % PRIME
    
    return -1

# Test
text = "ABABDABACDABABCABAB"
pattern = "ABABCABAB"

print("=== Rabin-Karp String Matching ===\\n")
print(f"Text: {text}")
print(f"Pattern: {pattern}\\n")

pos = rabin_karp_search(text, pattern)

if pos != -1:
    print(f"Found at position: {pos}")
    print(f"Match: {text[pos:pos+len(pattern)]}")
else:
    print("Pattern not found")

print("\\n✓ Rolling hash: O(1) per position")
print("✓ Overall: O(n+m) time")
`,
        },
      ],
    },
    {
      id: "sliding-window-stream",
      moduleId: "sliding-window-algorithms",
      lessonNumber: 5,
      title: "Stream Processing & Real-Time Data",
      description: "Handle infinite data streams with fixed memory using sliding windows.",
      duration: "33 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Processing Streams with Windows",
          content: `# Stream Processing

## The Stream Problem

\`\`\`
Data arrives continuously:
sensor → stream → processing → output

Can't store all data (infinite)
Need constant memory
\`\`\`

## Sliding Window for Streams

Process data in windows as it arrives:

\`\`\`
Incoming: [1, 2, 3, 4, 5, 6, 7, 8, ...]

Window 1: [1, 2, 3] → Process → Output avg
Window 2: [2, 3, 4] → Process → Output avg
Window 3: [3, 4, 5] → Process → Output avg
...

Only keep window in memory!
\`\`\`

## Use Cases

\`\`\`
1. Moving average (stock prices)
2. Traffic analysis (packets/sec)
3. Anomaly detection
4. Real-time metrics
5. Time-series analysis
\`\`\`

## Implementation Pattern

\`\`\`python
from collections import deque

class StreamProcessor:
    def __init__(self, window_size):
        self.window = deque(maxlen=window_size)
    
    def process_item(self, item):
        self.window.append(item)  # Auto-removes oldest if full
        
        if len(self.window) == window_size:
            return self.compute_metric()
    
    def compute_metric(self):
        return sum(self.window) / len(self.window)
\`\`\`

## Time-Based Windows

\`\`\`
Event-time: When did event occur?
Processing-time: When received?

Example:
Event at 1:00 but received at 1:05
Include in 1:00 window or 1:05?
\`\`\`

## Complex Window Operations

\`\`\`
Aggregation: sum, avg, min, max
Stateful: Count distinct, percentiles
Multiple windows: Overlapping windows
Triggers: Emit on size, time, or condition
\`\`\`
`,
          starterCode: `# Stream Processing with Sliding Window

from collections import deque
from datetime import datetime

class RealTimeAggregator:
    def __init__(self, window_size=5):
        self.window = deque(maxlen=window_size)
        self.metrics = []
    
    def add_data_point(self, value):
        """Add new data point to stream"""
        self.window.append(value)
        
        if len(self.window) == self.window.maxlen:
            return self.aggregate()
    
    def aggregate(self):
        """Compute metrics on current window"""
        values = list(self.window)
        return {
            "timestamp": datetime.now(),
            "count": len(values),
            "sum": sum(values),
            "avg": sum(values) / len(values),
            "min": min(values),
            "max": max(values)
        }

# Simulate stream
print("=== Real-Time Stream Processing ===\\n")

agg = RealTimeAggregator(window_size=4)

# Simulate incoming data
incoming = [10, 15, 8, 20, 25, 12, 18, 22, 9, 14]

for value in incoming:
    result = agg.add_data_point(value)
    if result:
        print(f"Window {list(agg.window)}")
        print(f"  Avg: {result['avg']:.2f}, Min: {result['min']}, Max: {result['max']}")

print("\\n✓ Stream processing: constant memory")
print("✓ Moving window: O(1) per new item")
print("✓ Real-time metrics without storing all data")
`,
        },
      ],
    },
    {
      id: "sliding-window-optimization",
      moduleId: "sliding-window-algorithms",
      lessonNumber: 6,
      title: "Advanced Optimization Techniques",
      description: "Optimize sliding window with data structures and caching.",
      duration: "34 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Optimizing Window Operations",
          content: `# Advanced Optimization

## Data Structures for Windows

### Deque (Double-Ended Queue)
\`\`\`
Efficient add/remove from both ends
- Append: O(1)
- Pop: O(1)

Perfect for sliding windows!
\`\`\`

### Heap (Priority Queue)
\`\`\`
Find min/max in window
- Insert: O(log n)
- Find min: O(1)

Trade-off: slower insert, instant find
\`\`\`

### Balanced BST
\`\`\`
Ordered window data
- Insert/Remove: O(log n)
- Find range: O(log n + result)

More powerful than deque
\`\`\`

### Hash Map
\`\`\`
Track element frequencies
- Insert/Remove: O(1)
- Query: O(1)

No ordering, but fast
\`\`\`

## Common Patterns

### Monotonic Deque
\`\`\`
Maintain window elements in sorted order:

[3, 1, 4, 1, 5]
Window [1, 4, 1]: Keep deque [1, 4] not [4, 1]

Benefit: Know min/max without searching
\`\`\`

### Frequency Counting
\`\`\`
Track what elements in window:

HashMap: {element: count}
Query: "Are all elements unique?" O(1)
\`\`\`

### Two Passes
\`\`\`
First pass: Collect info
Second pass: Apply info

Example:
Pass 1: Find optimal window bounds
Pass 2: Collect detailed stats
\`\`\`

## Performance Tricks

\`\`\`
1. Lazy deletion: Mark removed, clean later
2. Caching: Remember computed values
3. Early termination: Stop if bound impossible
4. Preprocessing: Sort/index before sliding
\`\`\`
`,
          starterCode: `# Optimized Window with Monotonic Deque

from collections import deque

def max_sliding_window_optimized(nums, k):
    """Find max in each window using monotonic deque"""
    
    result = []
    dq = deque()  # Stores indices of decreasing values
    
    for i, num in enumerate(nums):
        # Remove elements outside window
        if dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # Remove smaller elements from back
        while dq and nums[dq[-1]] < num:
            dq.pop()
        
        # Add current element
        dq.append(i)
        
        # Add max to result (front of deque)
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result

# Test
nums = [1, 3, 1, 2, 0, 5]
k = 3

print("=== Optimized Sliding Window (Max) ===\\n")
print(f"Array: {nums}")
print(f"Window size: {k}\\n")

result = max_sliding_window_optimized(nums, k)

print("Maximums per window:")
for i in range(len(result)):
    window = nums[i:i+k]
    print(f"  {window} → {result[i]}")

print(f"\\nResult: {result}")
print("\\n✓ Monotonic deque: O(n) with O(k) space")
print("✓ Each element processed once")
`,
        },
      ],
    },
    {
      id: "sliding-window-realworld",
      moduleId: "sliding-window-algorithms",
      lessonNumber: 7,
      title: "Real-World Applications",
      description: "Apply sliding window to finance, analytics, and systems.",
      duration: "32 min",
      difficulty: "Intermediate",
      pages: [
        {
          pageNumber: 1,
          title: "Practical Applications",
          content: `# Real-World Uses

## Financial Analysis

\`\`\`
Stock price moving average:
[100, 102, 101, 105, 103, 107]

20-day moving average:
[100, 102, 101] → avg 101
[102, 101, 105] → avg 102.67
[101, 105, 103] → avg 103
[105, 103, 107] → avg 105

Traders use this to spot trends!
\`\`\`

## Network Monitoring

\`\`\`
Packet rate per second:
packets = [10, 15, 20, 18, 22, ...]

1-second window:
Current traffic: 22 packets/sec
Average: 17 packets/sec
Threshold: 25 packets/sec

Alert if threshold exceeded!
\`\`\`

## Anomaly Detection

\`\`\`
Normal behavior window:
[5, 6, 4, 7, 5, 6]
avg = 5.5, std = 0.8

New window:
[5, 6, 4, 25, 5, 6]
avg = 8.5 - ANOMALY!

Flag unusual patterns!
\`\`\`

## User Analytics

\`\`\`
Last 7 days of user activity:
Mon: 10 logins
Tue: 12
Wed: 11
Thu: 8
Fri: 9
Sat: 0 - Unusual!
Sun: 0

Rolling window shows pattern change
\`\`\`

## System Metrics

\`\`\`
CPU usage monitoring:
Window = last 60 seconds

If average > 80%: Scale up
If average < 20%: Scale down

Sliding window prevents reaction to spikes
\`\`\`

## Video Streaming

\`\`\`
Adaptive bitrate streaming:
Network: [5Mbps, 4Mbps, 6Mbps, 3Mbps, 5Mbps]

Average bandwidth (window = 5):
[5, 4, 6, 3, 5] → avg 4.6Mbps

Send 4.5Mbps video quality
\`\`\`
`,
          starterCode: `# Real-World: Stock Moving Average

class StockAnalyzer:
    def __init__(self, window_size=5):
        self.window_size = window_size
        self.prices = []
    
    def add_price(self, price):
        """Add new price and calculate moving average"""
        self.prices.append(price)
        
        if len(self.prices) >= self.window_size:
            window = self.prices[-self.window_size:]
            avg = sum(window) / len(window)
            return avg
        return None
    
    def detect_trend(self):
        """Detect uptrend or downtrend"""
        if len(self.prices) < self.window_size:
            return "Insufficient data"
        
        current_avg = sum(self.prices[-self.window_size:]) / self.window_size
        prev_avg = sum(self.prices[-(self.window_size*2):-self.window_size]) / self.window_size
        
        if current_avg > prev_avg:
            return "Uptrend"
        elif current_avg < prev_avg:
            return "Downtrend"
        else:
            return "Stable"

# Analyze stock
print("=== Stock Price Moving Average ===\\n")

analyzer = StockAnalyzer(window_size=3)

prices = [100, 102, 101, 105, 103, 107, 106, 110]

for price in prices:
    avg = analyzer.add_price(price)
    if avg:
        print(f"Price: \${price} → Moving Avg: \${avg:.2f}")

trend = analyzer.detect_trend()
print(f"\\nTrend: {trend}")

print("\\n✓ Moving averages smooth out noise")
print("✓ Reveal underlying trends")
print("✓ Help make trading decisions")
`,
        },
      ],
    },
    {
      id: "sliding-window-performance",
      moduleId: "sliding-window-algorithms",
      lessonNumber: 8,
      title: "Performance Analysis & Complexity",
      description: "Analyze and optimize sliding window algorithm performance.",
      duration: "30 min",
      difficulty: "Advanced",
      pages: [
        {
          pageNumber: 1,
          title: "Performance Optimization",
          content: `# Performance Analysis

## Time Complexity

\`\`\`
Naive: O(n * k)
Each of n positions processes window of size k

Sliding: O(n)
Process n positions, each takes O(1)

Speedup: n*k / n = k (k times faster!)
\`\`\`

## Space Complexity

\`\`\`
Window data: O(k)
Helper structures: O(k) for deque/hash

Total: O(k)

Not dependent on input size!
\`\`\`

## Real Numbers

\`\`\`
Array: 1,000,000 elements
Window: 1,000

Naive: 1,000,000 * 1,000 = 1B operations → 1 second
Sliding: 1,000,000 operations → 1ms

1000x faster!
\`\`\`

## Bottlenecks

\`\`\`
Window operation: Check each element
Solution: Deque (O(1) per add/remove)

Calculating metric: Recalculate each window
Solution: Incremental updates

Finding min/max: Search window
Solution: Monotonic deque or heap
\`\`\`

## Optimization Checklist

\`\`\`
□ Sliding window reduces outer loop
□ Incremental updates avoid recalculation
□ Correct data structure chosen
□ No unnecessary memory allocations
□ Early termination if possible
\`\`\`

## Benchmarking

\`\`\`python
import time

# Naive approach
start = time.time()
result_naive = naive_max_subarray(arr, k)
time_naive = time.time() - start

# Sliding window
start = time.time()
result_sliding = sliding_max_subarray(arr, k)
time_sliding = time.time() - start

speedup = time_naive / time_sliding
\`\`\`
`,
          starterCode: `# Performance Comparison

import time

def naive_max_subarray(arr, k):
    """O(n*k) approach"""
    max_sum = 0
    for i in range(len(arr) - k + 1):
        window_sum = sum(arr[i:i+k])
        max_sum = max(max_sum, window_sum)
    return max_sum

def sliding_max_subarray(arr, k):
    """O(n) approach"""
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)
    return max_sum

# Benchmark
arr = list(range(10000))
k = 100

print("=== Performance Comparison ===\\n")

start = time.time()
result1 = naive_max_subarray(arr, k)
time1 = time.time() - start

start = time.time()
result2 = sliding_max_subarray(arr, k)
time2 = time.time() - start

print(f"Naive approach:     {time1*1000:.3f}ms")
print(f"Sliding approach:   {time2*1000:.3f}ms")
print(f"Speedup:            {time1/time2:.1f}x faster")

print(f"\\nBoth give same result: {result1 == result2}")
print("\\n✓ Sliding window beats naive significantly")
print("✓ Speedup increases with window size")
`,
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// EXPORT (Final curriculum with all modules)
// ─────────────────────────────────────────────────────────────
export const modules: Module[] = [
  pythonModule, 
  pandasModule, 
  matplotlibModule, 
  numpyModule, 
  mlModule,
  advancedMlModule,
  deepLearningModule,
  genaiModule,
  agenticAiModule,
  mcpModule,
  slidingWindowModule
];

export function getModuleBySlug(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getLessonById(moduleId: string, lessonId: string): Lesson | undefined {
  const mod = modules.find((m) => m.id === moduleId);
  return mod?.lessons.find((l) => l.id === lessonId);
}
