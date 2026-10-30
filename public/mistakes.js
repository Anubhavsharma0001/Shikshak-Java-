// Common beginner mistakes, shown for every question of a topic.
window.MISTAKES = {
"Basics": [
  { t: "Using = instead of == in a condition", w: "if (n % 2 = 0) {\n    ...\n}", why: "= stores a value, == compares two values. Java stops with the error: incompatible types. Write n % 2 == 0." },
  { t: "Forgetting that int division drops the decimal part", w: "int a = 7, b = 2;\nSystem.out.println(a / b);   // prints 3, not 3.5", why: "Dividing two ints gives an int. Make one side a double: (double) a / b." },
  { t: "Missing semicolon or mismatched braces", w: "int sum = a + b\nSystem.out.println(sum);", why: "Every statement ends with ;. The error message points to the line after the real problem, so check the line above it." }
],
"Numbers": [
  { t: "Number too big for int", w: "int f = 1;\nfor (int i = 1; i <= 20; i++) f *= i;   // wrong for 13! and above", why: "int holds numbers up to about 2.1 billion. Use long for factorials, powers and sums that can grow large." },
  { t: "Changing the number you still need", w: "while (n > 0) {\n    rev = rev * 10 + n % 10;\n    n = n / 10;\n}\nif (rev == n) ...   // n is 0 here!", why: "The loop destroys n. Save the original first: int original = n; and compare rev with original." },
  { t: "Off-by-one in loops", w: "for (int i = 1; i < n; i++) sum += i;   // misses n", why: "i < n stops before n. Use i <= n when n must be included, and test with tiny inputs such as 1 and 0." }
],
"Patterns": [
  { t: "Printing the new line in the wrong place", w: "for (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= i; j++) System.out.print(\"* \");\n}\nSystem.out.println();   // outside the outer loop", why: "The println must be inside the outer loop, after the inner loop, so each row ends with a new line." },
  { t: "Using the wrong inner loop limit", w: "for (int j = 1; j <= n; j++)   // always n stars", why: "For a triangle the inner loop depends on the row: j <= i. Write the star count for rows 1, 2, 3 on paper first." },
  { t: "Extra spaces at the end of the line", w: "System.out.print(\"* \");", why: "Auto-checkers compare exact text. Print a space only between stars, not after the last one." }
],
"Arrays": [
  { t: "Index out of bounds", w: "for (int i = 0; i <= a.length; i++) ...   // crashes", why: "Valid indexes are 0 to length - 1. Use i < a.length. The error is ArrayIndexOutOfBoundsException." },
  { t: "Starting max or min at 0", w: "int max = 0;\nfor (int x : a) if (x > max) max = x;   // wrong for all-negative arrays", why: "Start with the first element: int max = a[0]. Then every value is compared fairly." },
  { t: "Thinking = copies an array", w: "int[] b = a;   // both names point to the SAME array\nb[0] = 99;     // a[0] changes too", why: "Use Arrays.copyOf(a, a.length) or a loop to make a real copy." }
],
"Searching & Sorting": [
  { t: "Binary search on an unsorted array", w: "// binary search needs sorted input", why: "If the array is not sorted, binary search gives wrong answers. Sort first or use linear search." },
  { t: "Overflow when finding the middle", w: "int mid = (low + high) / 2;   // can overflow for huge arrays", why: "Write int mid = low + (high - low) / 2; It is always safe." },
  { t: "Wrong inner loop limit in sorting", w: "for (int j = 0; j < n; j++)\n    if (a[j] > a[j + 1]) swap...   // j + 1 goes out of range", why: "Compare a[j] with a[j + 1] only up to j < n - 1 - i. Otherwise you get ArrayIndexOutOfBoundsException." }
],
"Strings": [
  { t: "Comparing strings with ==", w: "if (s1 == s2) ...", why: "== checks if both names point to the same object, not whether the text is equal. Use s1.equals(s2) or equalsIgnoreCase." },
  { t: "Trying to change a string in place", w: "s.toUpperCase();\nSystem.out.println(s);   // unchanged", why: "Strings cannot be changed. Methods return a new string: s = s.toUpperCase();" },
  { t: "Mixing up next() and nextLine()", w: "int n = sc.nextInt();\nString line = sc.nextLine();   // reads the leftover empty line", why: "nextInt leaves the Enter key in the input. Call sc.nextLine() once to skip it, or read everything with nextLine and parse it." }
],
"Recursion": [
  { t: "Missing base case", w: "static int sum(int n) {\n    return n + sum(n - 1);   // never stops\n}", why: "Without a base case the method calls itself until the program crashes with StackOverflowError. Add: if (n == 0) return 0;" },
  { t: "Not moving toward the base case", w: "return n + sum(n);   // same problem again", why: "Each call must make the problem smaller, for example n - 1 or n / 2, so it reaches the base case." },
  { t: "Forgetting to return the result", w: "static int sum(int n) {\n    if (n == 0) return 0;\n    n + sum(n - 1);   // value is thrown away\n}", why: "Write return n + sum(n - 1); Otherwise the compiler says: missing return statement." }
]
};
