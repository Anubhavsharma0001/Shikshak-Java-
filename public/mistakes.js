
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
  ],

  // Questions 51–60: Java Fundamentals
  "Java Fundamentals": [
    { t: "Using a variable before initializing it", w: "int age;\nSystem.out.println(age);", why: "Local variables must be assigned before use. Give age an initial value or read it from input." },
    { t: "Choosing the wrong primitive data type", w: "int price = 99.99;", why: "int cannot store decimal values. Use double for decimal numbers or an appropriate integer type." },
    { t: "Forgetting to create a Scanner", w: "int age = sc.nextInt();", why: "Create Scanner first with Scanner sc = new Scanner(System.in); and import java.util.Scanner." },
    { t: "Confusing casting with parsing", w: "int n = (int) \"123\";", why: "Casting converts compatible numeric types. To convert text to an integer, use Integer.parseInt(\"123\")." },
    { t: "Reassigning a final variable", w: "final int MAX = 100;\nMAX = 200;", why: "A final variable can be assigned only once. Choose its value when declaring it." },
    { t: "Accessing a local variable outside its scope", w: "if (true) {\n    int value = 10;\n}\nSystem.out.println(value);", why: "A local variable exists only inside the block where it is declared. Declare it outside if you need it later." },
    { t: "Unboxing a null wrapper", w: "Integer value = null;\nint n = value;", why: "Unboxing null throws NullPointerException. Check for null before converting a wrapper to a primitive." },
    { t: "Ignoring that String methods return a new String", w: "String name = \"java\";\nname.toUpperCase();", why: "Strings are immutable. Store the returned value: name = name.toUpperCase()." },
    { t: "Using StringBuilder without converting to String", w: "StringBuilder sb = new StringBuilder(\"Java\");\nString text = sb;", why: "StringBuilder and String are different types. Use sb.toString() when a String is required." },
    { t: "Using the wrong printf format specifier", w: "System.out.printf(\"Age: %d\", 19.5);", why: "Use %d for integers, %f for floating-point values and %s for strings. Match the format to the argument type." }
  ],

  // Questions 61–70: Operators, Conditions and Loops
  "Operators, Conditions & Loops": [
    { t: "Integer division when a decimal is expected", w: "int a = 5, b = 2;\ndouble result = a / b;", why: "The division happens as integer division first. Use (double) a / b to preserve the decimal part." },
    { t: "Confusing ++i and i++ in expressions", w: "int i = 5;\nint result = i++;", why: "Post-increment returns the old value before increasing. Pre-increment increases first and then returns the new value." },
    { t: "Using bitwise operators instead of logical operators", w: "if (age > 18 & hasId)", why: "For normal boolean conditions, use && and ||. They short-circuit and avoid evaluating the second condition when unnecessary." },
    { t: "Using = instead of == in if", w: "if (marks = 90) { }", why: "Use == to compare primitive values. A single = is assignment, not equality comparison." },
    { t: "Confusing the ternary operator order", w: "int max = a > b ? b : a;", why: "The expression is condition ? valueIfTrue : valueIfFalse. Check both branches carefully." },
    { t: "Forgetting break in switch", w: "switch (choice) {\n    case 1: System.out.println(\"One\");\n    case 2: System.out.println(\"Two\");\n}", why: "Without break, execution may fall through into the next case. Add break when you want only one case to run." },
    { t: "Off-by-one loop condition", w: "for (int i = 0; i < n; i++) {\n    // starts at zero\n}", why: "Decide whether the loop should run n times or include n. Test boundary values such as 0, 1 and n." },
    { t: "Creating an infinite while loop", w: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n}", why: "Update the loop variable inside the loop, such as i++, so the condition eventually becomes false." },
    { t: "Assuming do-while checks before running", w: "do {\n    System.out.println(\"Run\");\n} while (false);", why: "A do-while loop executes its body at least once because the condition is checked afterward." },
    { t: "Using break when you only want to skip one iteration", w: "if (i == 3) break;", why: "break exits the loop completely. Use continue to skip the current iteration and proceed with the next one." }
  ],

  // Questions 71–80: Arrays and Strings
  "Arrays & Strings": [
    { t: "Using an array index outside its valid range", w: "int[] a = {1, 2, 3};\nSystem.out.println(a[3]);", why: "Array indexes start at 0. For an array of length 3, valid indexes are 0, 1 and 2." },
    { t: "Using <= instead of < when traversing an array", w: "for (int i = 0; i <= a.length; i++)", why: "The last valid index is length - 1. Use i < a.length." },
    { t: "Initializing maximum to zero", w: "int max = 0;", why: "This fails when all array values are negative. Initialize max with the first array element." },
    { t: "Forgetting that linear search may not find a value", w: "int index = -1;\nfor (int i = 0; i < a.length; i++) {\n    if (a[i] == target) index = i;\n}", why: "Use a clear not-found value such as -1 and stop when the target is found if only the first index is needed." },
    { t: "Applying binary search to unsorted data", w: "// array = {8, 2, 5, 1}", why: "Binary search requires sorted input. Sort the array first or use linear search." },
    { t: "Reversing row and column indexes", w: "int value = matrix[j][i];", why: "For a matrix, use matrix[row][column]. Check the row and column dimensions before accessing an element." },
    { t: "Confusing character indexes and string length", w: "for (int i = 0; i <= text.length(); i++)", why: "The final character index is length - 1. Use i < text.length()." },
    { t: "Comparing strings with == for content", w: "if (first == second)", why: "Use equals() to compare text content. == compares object references." },
    { t: "Assuming StringBuilder append creates a new object", w: "StringBuilder sb = new StringBuilder(\"Hi\");\nStringBuilder other = sb.append(\" Java\");", why: "append modifies the same StringBuilder and returns that same object. Use a new StringBuilder if you need an independent copy." },
    { t: "Forgetting to import Arrays", w: "Arrays.sort(numbers);", why: "Add import java.util.Arrays; or use the fully qualified class name." }
  ],

  // Questions 81–90: Methods and Recursion
  "Methods & Recursion": [
    { t: "Calling a method with the wrong signature", w: "static int add(int a, int b) { return a + b; }\nadd(5);", why: "The method expects two integer arguments. Pass the required number and types of arguments." },
    { t: "Forgetting to return a value", w: "static int square(int n) {\n    n * n;\n}", why: "A method with return type int must return an integer value on every valid path." },
    { t: "Overloading only by changing the return type", w: "static int show() { return 1; }\nstatic double show() { return 1.0; }", why: "Java does not overload methods by return type alone. Change the parameter list." },
    { t: "Expecting Java to pass objects by reference", w: "static void change(int x) { x = 99; }", why: "Java passes arguments by value. Reassigning a parameter does not change the caller's primitive variable." },
    { t: "Missing a recursion base case", w: "static void count(int n) {\n    System.out.println(n);\n    count(n - 1);\n}", why: "Add a stopping condition so recursive calls eventually end." },
    { t: "Using the wrong factorial base case", w: "static long fact(int n) {\n    if (n == 0) return 0;\n}", why: "Factorial has the base case 0! = 1 and 1! = 1. Return 1 for those cases." },
    { t: "Confusing Fibonacci indexes", w: "int a = 0, b = 1;", why: "Decide whether the requested sequence starts 0, 1 or 1, 1. Keep the update order consistent." },
    { t: "Not reducing both GCD arguments", w: "return gcd(a, b);", why: "Use the Euclidean step gcd(b, a % b) until b becomes zero." },
    { t: "Using recursion when a loop is simpler", w: "static void repeat(int n) {\n    if (n > 0) repeat(n - 1);\n}", why: "Recursion uses call-stack space. For simple repetition, an iterative loop may be clearer and use constant extra space." },
    { t: "Recursive calls never approach the base case", w: "static int sum(int n) {\n    return n + sum(n);\n}", why: "Every recursive call must move toward the base case. Reduce the problem size on each call." }
  ],

  // Questions 91–100: OOP and Advanced Java
  "OOP & Advanced Java": [
    { t: "Using a class without creating an object", w: "Student s;\ns.name = \"Aman\";", why: "The reference is not pointing to an object. Create one with new Student() before accessing instance fields." },
    { t: "Writing a constructor with a return type", w: "void Student() { }", why: "A constructor has the same name as the class and no return type, not even void." },
    { t: "Making fields public instead of encapsulating them", w: "class Student {\n    public int age;\n}", why: "Keep fields private and provide controlled public methods such as getters and setters when needed." },
    { t: "Forgetting to call the parent constructor correctly", w: "class Child extends Parent {\n    Child() { }\n}", why: "If the parent has no accessible no-argument constructor, call an available parent constructor using super(arguments) as the first statement." },
    { t: "Confusing overloading with overriding", w: "class Child extends Parent {\n    void show(int x) { }\n}", why: "Overriding uses the same method signature in a subclass. A different parameter list is overloading." },
    { t: "Trying to instantiate an abstract class", w: "abstract class Shape { }\nShape s = new Shape();", why: "Abstract classes cannot be instantiated directly. Create a concrete subclass that implements required abstract methods." },
    { t: "Accessing an instance field from a static context", w: "int count = 0;\nstatic void show() {\n    System.out.println(count);\n}", why: "A static method has no current object. Access instance fields through an object or make the field static if it represents shared class state." },
    { t: "Catching an exception but ignoring it", w: "try {\n    int n = 10 / 0;\n} catch (Exception e) { }", why: "Handle the exception meaningfully: show a message, recover, or rethrow it. Empty catch blocks hide errors." },
    { t: "Using an ArrayList index that does not exist", w: "ArrayList<Integer> list = new ArrayList<>();\nSystem.out.println(list.get(0));", why: "An empty ArrayList has no valid indexes. Add an element first or check list.size()." },
    { t: "Assuming HashMap preserves insertion order", w: "HashMap<String, Integer> map = new HashMap<>();", why: "HashMap does not guarantee iteration order. Use LinkedHashMap when insertion order matters." }
  ]
};
