(function () {
const J = String.raw;
window.QUESTIONS = window.QUESTIONS || [];
const Q = window.QUESTIONS;

Q.push({ id: 1, topic: "Basics", title: "Print a message and a number",
intro: "Goal: show text and numbers on the screen. This is the very first step of every Java program.",
levels: [
{ x: "Every Java program starts inside `main`. `System.out.println()` prints something and moves to the next line. `System.out.print()` prints and stays on the same line.",
c: J`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");   // text goes inside double quotes
        System.out.println(25);               // numbers need no quotes
        System.out.print("Same line, ");
        System.out.print("still same line");
    }
}
` },
{ x: "Store values in variables first, then print them. The `+` sign joins text and numbers together (this is called concatenation).",
c: J`public class Main {
    public static void main(String[] args) {
        String name = "Ravi";
        int age = 20;
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Next year: " + (age + 1));
    }
}
` },
{ x: "Put the printing work into a separate method. The method is written once and can be called many times with different values.",
c: J`public class Main {
    static void printCard(String name, int age) {
        System.out.println(name + " is " + age + " years old");
    }

    public static void main(String[] args) {
        printCard("Ravi", 20);
        printCard("Sita", 22);
    }
}
` },
{ x: "`printf` lets you format output: `%d` for integers, `%s` for text, `%.2f` for decimals, `%n` for a new line. Loops let you print many lines with little code.",
c: J`public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            System.out.printf("Line %d: %s%n", i, "Learning Java");
        }
        System.out.printf("Pi is about %.2f%n", 3.14159);
        System.out.printf("%-8s|%5d|%n", "Ravi", 42);
    }
}
` }
]});

Q.push({ id: 2, topic: "Basics", title: "Add two numbers",
intro: "Goal: take two numbers and print their sum. You will go from a fixed sum, to user input, to a method, to recursion.",
levels: [
{ x: "Before adding, you need to know how to store and print a number. `int` stores whole numbers.",
c: J`public class Main {
    public static void main(String[] args) {
        int a = 10;
        System.out.println(a);          // prints 10
        System.out.println(a + 5);      // prints 15
    }
}
` },
{ x: "Store two numbers in variables, add them with `+`, and print the result.",
c: J`public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        int sum = a + b;
        System.out.println("Sum = " + sum);
    }
}
` },
{ x: "Now the numbers come from the keyboard using `Scanner`, and the addition lives in its own method `add`. `main` only reads input and calls `add`. Use the Input box below to type `10 20`.",
c: J`import java.util.Scanner;

public class Main {
    static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter two numbers: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println("Sum = " + add(a, b));
    }
}
`, i: "10 20" },
{ x: "Advanced idea: recursion. A method that calls itself. To add `a` and `b`, move 1 from `b` to `a` again and again until `b` becomes 0. This works for `b >= 0`.",
c: J`import java.util.Scanner;

public class Main {
    static int add(int a, int b) {
        if (b == 0) return a;        // base case: nothing left to add
        return add(a + 1, b - 1);    // add 1 and make the problem smaller
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println("Sum = " + add(a, b));
    }
}
`, i: "5 3" }
]});

Q.push({ id: 3, topic: "Basics", title: "Check even or odd",
intro: "Goal: decide whether a number is even or odd. The key tool is the remainder operator `%`.",
levels: [
{ x: "`%` gives the remainder after division. An even number leaves remainder 0 when divided by 2.",
c: J`public class Main {
    public static void main(String[] args) {
        System.out.println(10 % 2);   // 0
        System.out.println(7 % 2);    // 1
    }
}
` },
{ x: "Use `if` / `else` with the remainder.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 7;
        if (n % 2 == 0) {
            System.out.println(n + " is even");
        } else {
            System.out.println(n + " is odd");
        }
    }
}
` },
{ x: "Move the check into a method that returns `true` or `false` (a `boolean`). `main` reads the number and prints the answer.",
c: J`import java.util.Scanner;

public class Main {
    static boolean isEven(int n) {
        return n % 2 == 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isEven(n) ? n + " is even" : n + " is odd");
    }
}
`, i: "12" },
{ x: "Two more ways: a bitwise trick (`n & 1` is 1 for odd numbers) and recursion (remove 2 each time until you reach 0 or 1). The recursive version here is for non-negative numbers.",
c: J`public class Main {
    static boolean isEvenRec(int n) {
        if (n == 0) return true;
        if (n == 1) return false;
        return isEvenRec(n - 2);
    }

    public static void main(String[] args) {
        int n = 9;
        System.out.println("Recursion says even? " + isEvenRec(n));
        System.out.println("Bitwise says " + ((n & 1) == 0 ? "even" : "odd"));
    }
}
` }
]});

Q.push({ id: 4, topic: "Basics", title: "Swap two numbers",
intro: "Goal: exchange the values of two variables. Classic interview warm-up.",
levels: [
{ x: "A variable holds one value at a time. If you write `a = b`, the old value of `a` is lost. That is why swapping needs a plan.",
c: J`public class Main {
    public static void main(String[] args) {
        int a = 5, b = 9;
        a = b;                       // a is now 9, the old 5 is gone!
        System.out.println(a + " " + b);
    }
}
` },
{ x: "Use a third variable `temp` to hold one value safely, like a spare glass when swapping two drinks.",
c: J`public class Main {
    public static void main(String[] args) {
        int a = 5, b = 9;
        System.out.println("Before: a=" + a + " b=" + b);
        int temp = a;
        a = b;
        b = temp;
        System.out.println("After:  a=" + a + " b=" + b);
    }
}
` },
{ x: "In Java, numbers are passed to methods by value (a copy). A method cannot swap two plain `int` variables of `main`. But an array is shared, so a method can swap values inside an array.",
c: J`public class Main {
    static void swap(int[] p) {
        int temp = p[0];
        p[0] = p[1];
        p[1] = temp;
    }

    public static void main(String[] args) {
        int[] p = {5, 9};
        swap(p);
        System.out.println(p[0] + " " + p[1]);
    }
}
` },
{ x: "Swap without a third variable: using arithmetic or using XOR (`^`). These are good to know, but the `temp` way is the clearest in real code.",
c: J`public class Main {
    public static void main(String[] args) {
        int a = 5, b = 9;
        a = a + b;      // 14
        b = a - b;      // 5
        a = a - b;      // 9
        System.out.println("Arithmetic: " + a + " " + b);

        int x = 5, y = 9;
        x = x ^ y;
        y = x ^ y;
        x = x ^ y;
        System.out.println("XOR: " + x + " " + y);
    }
}
` }
]});

Q.push({ id: 5, topic: "Basics", title: "Largest of three numbers",
intro: "Goal: find the biggest among three numbers using comparisons.",
levels: [
{ x: "Comparison operators (`>`, `<`, `==`, `>=`) give a `boolean` answer, `true` or `false`.",
c: J`public class Main {
    public static void main(String[] args) {
        System.out.println(5 > 3);    // true
        System.out.println(5 < 3);    // false
        System.out.println(5 >= 5);   // true
    }
}
` },
{ x: "Use `if / else if / else` and `&&` (AND) to compare all three numbers.",
c: J`public class Main {
    public static void main(String[] args) {
        int a = 12, b = 45, c = 30;
        if (a >= b && a >= c) {
            System.out.println(a + " is largest");
        } else if (b >= a && b >= c) {
            System.out.println(b + " is largest");
        } else {
            System.out.println(c + " is largest");
        }
    }
}
` },
{ x: "A method `max3` hides the logic. `Math.max` compares two numbers, so use it twice.",
c: J`import java.util.Scanner;

public class Main {
    static int max3(int a, int b, int c) {
        return Math.max(a, Math.max(b, c));
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt();
        System.out.println("Largest = " + max3(a, b, c));
    }
}
`, i: "12 45 30" },
{ x: "Advanced: a ternary operator `cond ? x : y` for one-line choices, and varargs (`int... nums`) so the same method works for any number of values.",
c: J`public class Main {
    static int max(int... nums) {
        int m = nums[0];
        for (int x : nums) {
            if (x > m) m = x;
        }
        return m;
    }

    public static void main(String[] args) {
        int a = 3, b = 9;
        System.out.println("Ternary: " + (a > b ? a : b));
        System.out.println(max(3, 9, 2));
        System.out.println(max(7, 1, 8, 20, 4));
    }
}
` }
]});

Q.push({ id: 6, topic: "Numbers", title: "Factorial of a number",
intro: "Goal: n! = 1 x 2 x 3 x ... x n. For example 5! = 120. This needs a loop (or recursion).",
levels: [
{ x: "Factorial is just repeated multiplication. Before looping, see it written by hand.",
c: J`public class Main {
    public static void main(String[] args) {
        System.out.println(1 * 2 * 3 * 4 * 5);   // 120 = 5!
    }
}
` },
{ x: "Start `fact` at 1 and multiply it by every number from 1 to n using a `for` loop.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 5;
        long fact = 1;
        for (int i = 1; i <= n; i++) {
            fact = fact * i;
        }
        System.out.println(n + "! = " + fact);
    }
}
` },
{ x: "Move the loop into a method. `long` holds bigger values than `int` (an `int` overflows after 12!).",
c: J`import java.util.Scanner;

public class Main {
    static long factorial(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(n + "! = " + factorial(n));
    }
}
`, i: "10" },
{ x: "Recursion: n! = n x (n-1)!, and 0! = 1! = 1 is the base case. For huge numbers (like 25!) even `long` overflows, so use `BigInteger`.",
c: J`import java.math.BigInteger;

public class Main {
    static long factRec(int n) {
        if (n <= 1) return 1;          // base case
        return n * factRec(n - 1);     // smaller problem
    }

    static BigInteger bigFact(int n) {
        BigInteger r = BigInteger.ONE;
        for (int i = 2; i <= n; i++) {
            r = r.multiply(BigInteger.valueOf(i));
        }
        return r;
    }

    public static void main(String[] args) {
        System.out.println("10! = " + factRec(10));
        System.out.println("25! = " + bigFact(25));
    }
}
` }
]});

Q.push({ id: 7, topic: "Numbers", title: "Fibonacci series",
intro: "Goal: print 0 1 1 2 3 5 8 13 ... where each number is the sum of the previous two.",
levels: [
{ x: "You only need to remember the last two numbers. See the idea for the first few terms.",
c: J`public class Main {
    public static void main(String[] args) {
        int a = 0, b = 1;
        System.out.println(a);
        System.out.println(b);
        int c = a + b;     // third term
        System.out.println(c);
    }
}
` },
{ x: "Repeat the idea in a loop: print `a`, compute `next`, then slide the two values forward.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 10;
        int a = 0, b = 1;
        for (int i = 1; i <= n; i++) {
            System.out.print(a + " ");
            int next = a + b;
            a = b;
            b = next;
        }
        System.out.println();
    }
}
` },
{ x: "Wrap it in a method `printFib(n)` that prints the first n terms.",
c: J`import java.util.Scanner;

public class Main {
    static void printFib(int n) {
        long a = 0, b = 1;
        for (int i = 1; i <= n; i++) {
            System.out.print(a + " ");
            long next = a + b;
            a = b;
            b = next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        printFib(sc.nextInt());
    }
}
`, i: "8" },
{ x: "Recursion: fib(n) = fib(n-1) + fib(n-2). Plain recursion repeats the same work many times and gets very slow, so we remember results in an array (this is called memoization, a first taste of dynamic programming).",
c: J`public class Main {
    static long[] memo = new long[51];

    static long fib(int n) {
        if (n <= 1) return n;
        if (memo[n] != 0) return memo[n];      // already known
        return memo[n] = fib(n - 1) + fib(n - 2);
    }

    public static void main(String[] args) {
        for (int i = 0; i <= 10; i++) System.out.print(fib(i) + " ");
        System.out.println();
        System.out.println("fib(50) = " + fib(50));
    }
}
` }
]});

Q.push({ id: 8, topic: "Numbers", title: "Check prime number",
intro: "Goal: a prime number has exactly two divisors: 1 and itself. 2, 3, 5, 7, 11 ... are prime.",
levels: [
{ x: "A divisor divides the number with remainder 0. List the divisors of 12 to see the idea.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 12;
        for (int i = 1; i <= n; i++) {
            if (n % i == 0) System.out.print(i + " ");
        }
        System.out.println();
    }
}
` },
{ x: "If any number from 2 to n-1 divides `n`, it is not prime. Use a flag variable.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 29;
        boolean prime = n > 1;
        for (int i = 2; i < n; i++) {
            if (n % i == 0) {
                prime = false;
                break;
            }
        }
        System.out.println(n + (prime ? " is prime" : " is not prime"));
    }
}
` },
{ x: "Faster: you only need to check up to the square root of `n` (`i * i <= n`). Put it in a method.",
c: J`import java.util.Scanner;

public class Main {
    static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(n + (isPrime(n) ? " is prime" : " is not prime"));
    }
}
`, i: "97" },
{ x: "To find all primes up to N, the Sieve of Eratosthenes is much faster than checking each number. It crosses out multiples of every prime.",
c: J`public class Main {
    public static void main(String[] args) {
        int N = 50;
        boolean[] composite = new boolean[N + 1];
        for (int i = 2; i * i <= N; i++) {
            if (!composite[i]) {
                for (int j = i * i; j <= N; j += i) composite[j] = true;
            }
        }
        for (int i = 2; i <= N; i++) {
            if (!composite[i]) System.out.print(i + " ");
        }
        System.out.println();
    }
}
` }
]});

Q.push({ id: 9, topic: "Numbers", title: "Palindrome number",
intro: "Goal: a number like 121 or 12321 reads the same forwards and backwards.",
levels: [
{ x: "`n % 10` gives the last digit and `n / 10` removes it. These two lines are the base of many number problems.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 121;
        System.out.println("Last digit: " + n % 10);   // 1
        System.out.println("Remaining:  " + n / 10);   // 12
    }
}
` },
{ x: "Build the reverse of the number digit by digit, then compare it with the original.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 121;
        int temp = n, rev = 0;
        while (temp > 0) {
            rev = rev * 10 + temp % 10;
            temp = temp / 10;
        }
        System.out.println(n == rev ? "Palindrome" : "Not a palindrome");
    }
}
` },
{ x: "Method version. Negative numbers are never palindromes here.",
c: J`import java.util.Scanner;

public class Main {
    static boolean isPalindrome(int n) {
        if (n < 0) return false;
        int temp = n, rev = 0;
        while (temp > 0) {
            rev = rev * 10 + temp % 10;
            temp /= 10;
        }
        return rev == n;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isPalindrome(n) ? "Palindrome" : "Not a palindrome");
    }
}
`, i: "12321" },
{ x: "Recursive reverse using an accumulator `r`. Each call moves one digit from `n` to `r`.",
c: J`public class Main {
    static int rev(int n, int r) {
        if (n == 0) return r;
        return rev(n / 10, r * 10 + n % 10);
    }

    static boolean isPalindrome(int n) {
        return n >= 0 && n == rev(n, 0);
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome(1221));
        System.out.println(isPalindrome(1231));
    }
}
` }
]});

Q.push({ id: 10, topic: "Numbers", title: "Reverse a number",
intro: "Goal: 1234 becomes 4321. Practice with digits using `%` and `/`.",
levels: [
{ x: "Print the digits of a number from the last one to the first. That is already a reversal.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 1234;
        while (n > 0) {
            System.out.print(n % 10);
            n = n / 10;
        }
        System.out.println();
    }
}
` },
{ x: "Instead of printing, build a new number: multiply it by 10 and add the new digit.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 1234;
        int rev = 0;
        while (n > 0) {
            int digit = n % 10;
            rev = rev * 10 + digit;
            n /= 10;
        }
        System.out.println("Reversed: " + rev);
    }
}
` },
{ x: "A method that also handles negative numbers (reverse the digits and keep the sign). We use `long` to be safe from overflow.",
c: J`import java.util.Scanner;

public class Main {
    static long reverse(long n) {
        boolean neg = n < 0;
        if (neg) n = -n;
        long rev = 0;
        while (n > 0) {
            rev = rev * 10 + n % 10;
            n /= 10;
        }
        return neg ? -rev : rev;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(reverse(sc.nextLong()));
    }
}
`, i: "-4520" },
{ x: "Recursive version, and a String based version with `StringBuilder`.",
c: J`public class Main {
    static int rev(int n, int r) {
        if (n == 0) return r;
        return rev(n / 10, r * 10 + n % 10);
    }

    public static void main(String[] args) {
        System.out.println(rev(98765, 0));
        System.out.println(new StringBuilder(String.valueOf(98765)).reverse());
    }
}
` }
]});

})();
