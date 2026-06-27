export interface Question {
  code: string;
  options: string[];
  answer: number; // index into options
  explain: string;
}

/** "Guess the Output" deck — real Python gotchas relevant to data science.
    Keep outputs exact; each has one correct option + 3 plausible distractors. */
export const QUESTIONS: Question[] = [
  {
    code: `nums = [1, 2, 3, 4]\nprint(nums[1:3])`,
    options: ["[2, 3]", "[1, 2, 3]", "[2, 3, 4]", "[1, 2]"],
    answer: 0,
    explain: "Slicing [1:3] starts at index 1 and stops before index 3 — so items 2 and 3.",
  },
  {
    code: `print(10 // 3)`,
    options: ["3", "3.33", "3.0", "1"],
    answer: 0,
    explain: "// is floor division — it discards the remainder and returns an int.",
  },
  {
    code: `d = {"a": 1, "b": 2}\nprint(d.get("c", 0))`,
    options: ["0", "None", "KeyError", '"c"'],
    answer: 0,
    explain: "dict.get() returns the default (0) when the key is missing — no error raised.",
  },
  {
    code: `print(list(range(2, 8, 2)))`,
    options: ["[2, 4, 6]", "[2, 4, 6, 8]", "[2, 3, 4, 5, 6, 7]", "[0, 2, 4, 6]"],
    answer: 0,
    explain: "range(2, 8, 2) starts at 2, steps by 2, stops before 8 → 2, 4, 6.",
  },
  {
    code: `print(0.1 + 0.2 == 0.3)`,
    options: ["False", "True", "0.3", "Error"],
    answer: 0,
    explain: "Floating-point rounding makes 0.1 + 0.2 = 0.30000000000000004 — not exactly 0.3.",
  },
  {
    code: `print("ab" * 3)`,
    options: ["ababab", "abababab", "ab3", "Error"],
    answer: 0,
    explain: "Multiplying a string by an int repeats it that many times.",
  },
  {
    code: `print(bool(0), bool(""), bool([1]))`,
    options: ["False False True", "True True True", "False False False", "0 0 1"],
    answer: 0,
    explain: "0 and empty string are falsy; a non-empty list is truthy.",
  },
  {
    code: `print([i * 2 for i in range(3)])`,
    options: ["[0, 2, 4]", "[2, 4, 6]", "[0, 1, 2]", "[1, 2, 3]"],
    answer: 0,
    explain: "range(3) is 0,1,2; each doubled gives 0, 2, 4.",
  },
  {
    code: `s = "Hello"\nprint(s[1:4])`,
    options: ["ell", "Hell", "ello", "llo"],
    answer: 0,
    explain: "Indexes 1, 2, 3 → 'e', 'l', 'l'. Index 4 is excluded.",
  },
  {
    code: `print(sum([1, 2, 3]) / len([1, 2, 3]))`,
    options: ["2.0", "2", "3", "6"],
    answer: 0,
    explain: "/ always returns a float in Python 3, so the mean prints as 2.0.",
  },
  {
    code: `a = (1, 2)\na += (3,)\nprint(a)`,
    options: ["(1, 2, 3)", "Error", "(1, 2)", "(3,)"],
    answer: 0,
    explain: "+= on a tuple builds a brand-new tuple and rebinds a — tuples stay immutable.",
  },
  {
    code: `print("Data".lower().upper())`,
    options: ["DATA", "data", "Data", "Error"],
    answer: 0,
    explain: "lower() → 'data', then upper() → 'DATA'. Methods chain left to right.",
  },
];
