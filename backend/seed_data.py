import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from questions.models import Question, TestCase


def create_question(data):
    q = Question.objects.create(
        title=data["title"],
        description=data["description"],
        difficulty=data["difficulty"],
        topic=data["topic"],
        constraints=data["constraints"],
        examples=data["examples"],
        starter_code=data["starter_code"]
    )

    for tc in data["test_cases"]:
        TestCase.objects.create(
            question=q,
            input_data=tc["input"],
            expected_output=tc["output"],
            is_hidden=tc.get("hidden", False)
        )

    print(f"Created: {q.title}")


questions = [

    {
        "title": "Two Sum",
        "description": "Given an array of integers nums and a target, return indices of two numbers such that they add up to target.",
        "difficulty": "easy",
        "topic": "arrays",
        "constraints": "2 <= nums.length <= 10^4",
        "examples": "Input: nums=[2,7,11,15], target=9\nOutput: [0,1]",
        "starter_code": "def two_sum(nums, target):\n    pass",
        "test_cases": [
            {"input": "[2,7,11,15],9", "output": "[0,1]"},
            {"input": "[3,2,4],6", "output": "[1,2]"}
        ]
    },

    {
        "title": "Reverse String",
        "description": "Write a function that reverses a string.",
        "difficulty": "easy",
        "topic": "strings",
        "constraints": "1 <= len(s) <= 10^5",
        "examples": "Input: hello\nOutput: olleh",
        "starter_code": "def reverse_string(s):\n    pass",
        "test_cases": [
            {"input": "hello", "output": "olleh"},
            {"input": "abc", "output": "cba"}
        ]
    },

    {
        "title": "Palindrome Check",
        "description": "Check if a string is a palindrome.",
        "difficulty": "easy",
        "topic": "strings",
        "constraints": "",
        "examples": "Input: madam\nOutput: True",
        "starter_code": "def is_palindrome(s):\n    pass",
        "test_cases": [
            {"input": "madam", "output": "True"},
            {"input": "hello", "output": "False"}
        ]
    },

    {
        "title": "Factorial",
        "description": "Return factorial of a number.",
        "difficulty": "easy",
        "topic": "math",
        "constraints": "",
        "examples": "Input: 5\nOutput: 120",
        "starter_code": "def factorial(n):\n    pass",
        "test_cases": [
            {"input": "5", "output": "120"},
            {"input": "3", "output": "6"}
        ]
    },

    {
        "title": "Fibonacci",
        "description": "Return nth Fibonacci number.",
        "difficulty": "medium",
        "topic": "dp",
        "constraints": "",
        "examples": "Input: 6\nOutput: 8",
        "starter_code": "def fib(n):\n    pass",
        "test_cases": [
            {"input": "6", "output": "8"},
            {"input": "5", "output": "5"}
        ]
    },

    {
        "title": "Valid Parentheses",
        "description": "Check if parentheses are valid.",
        "difficulty": "medium",
        "topic": "stack",
        "constraints": "",
        "examples": "Input: ()[]{}\nOutput: True",
        "starter_code": "def is_valid(s):\n    pass",
        "test_cases": [
            {"input": "()[]{}", "output": "True"},
            {"input": "(]", "output": "False"}
        ]
    },

    {
        "title": "Merge Sorted Arrays",
        "description": "Merge two sorted arrays.",
        "difficulty": "medium",
        "topic": "arrays",
        "constraints": "",
        "examples": "Input: [1,2],[3,4]\nOutput: [1,2,3,4]",
        "starter_code": "def merge(a, b):\n    pass",
        "test_cases": [
            {"input": "[1,2],[3,4]", "output": "[1,2,3,4]"}
        ]
    },

    {
        "title": "Binary Search",
        "description": "Implement binary search.",
        "difficulty": "medium",
        "topic": "search",
        "constraints": "",
        "examples": "Input: [1,2,3,4,5],4\nOutput: 3",
        "starter_code": "def binary_search(arr, target):\n    pass",
        "test_cases": [
            {"input": "[1,2,3,4,5],4", "output": "3"}
        ]
    },

    {
        "title": "Longest Substring Without Repeating Characters",
        "description": "Find longest substring without repeating characters.",
        "difficulty": "hard",
        "topic": "strings",
        "constraints": "",
        "examples": "Input: abcabcbb\nOutput: 3",
        "starter_code": "def longest_substring(s):\n    pass",
        "test_cases": [
            {"input": "abcabcbb", "output": "3"}
        ]
    },

    {
        "title": "Median of Two Sorted Arrays",
        "description": "Find median of two sorted arrays.",
        "difficulty": "hard",
        "topic": "arrays",
        "constraints": "",
        "examples": "Input: [1,3],[2]\nOutput: 2",
        "starter_code": "def find_median(a, b):\n    pass",
        "test_cases": [
            {"input": "[1,3],[2]", "output": "2"}
        ]
    }

]


if __name__ == "__main__":
    for q in questions:
        create_question(q)