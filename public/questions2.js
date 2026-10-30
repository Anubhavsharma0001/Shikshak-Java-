(function () {
const J = String.raw;
window.QUESTIONS = window.QUESTIONS || [];
const Q = window.QUESTIONS;

Q.push({ id: 11, topic: "Numbers", title: "Sum of digits",
intro: "Goal: 4321 gives 4+3+2+1 = 10.",
levels: [
{ x: "Remember: `n % 10` is the last digit, `n / 10` drops it.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 4321;
        System.out.println(n % 10);        // 1
        System.out.println(n / 10);        // 432
        System.out.println(432 % 10);      // 2
    }
}
` },
{ x: "Keep taking the last digit, add it to `sum`, and remove it until the number becomes 0.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 4321, sum = 0;
        while (n > 0) {
            sum += n % 10;
            n /= 10;
        }
        System.out.println("Sum of digits = " + sum);
    }
}
` },
{ x: "Method version with input.",
c: J`import java.util.Scanner;

public class Main {
    static int sumDigits(int n) {
        n = Math.abs(n);
        int sum = 0;
        while (n > 0) {
            sum += n % 10;
            n /= 10;
        }
        return sum;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(sumDigits(sc.nextInt()));
    }
}
`, i: "9875" },
{ x: "Recursion: sum of digits of `n` is the last digit plus the sum of digits of `n / 10`. Bonus: the digital root repeats until one digit is left.",
c: J`public class Main {
    static int sumDigits(int n) {
        if (n == 0) return 0;
        return n % 10 + sumDigits(n / 10);
    }

    static int digitalRoot(int n) {
        while (n > 9) n = sumDigits(n);
        return n;
    }

    public static void main(String[] args) {
        System.out.println(sumDigits(4321));
        System.out.println(digitalRoot(9875));   // 9875 -> 29 -> 11 -> 2
    }
}
` }
]});

Q.push({ id: 12, topic: "Numbers", title: "Armstrong number",
intro: "Goal: 153 is an Armstrong number because 1^3 + 5^3 + 3^3 = 153. (Each digit is raised to the power of the number of digits.)",
levels: [
{ x: "First see the calculation for 153 written by hand, and how `Math.pow` works.",
c: J`public class Main {
    public static void main(String[] args) {
        System.out.println(1*1*1 + 5*5*5 + 3*3*3);   // 153
        System.out.println(Math.pow(5, 3));          // 125.0 (a double)
    }
}
` },
{ x: "For 3 digit numbers: take each digit, cube it, add it up, compare with the original.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 153, temp = n, sum = 0;
        while (temp > 0) {
            int d = temp % 10;
            sum += d * d * d;
            temp /= 10;
        }
        System.out.println(sum == n ? "Armstrong" : "Not Armstrong");
    }
}
` },
{ x: "Make it work for any number of digits. The power is the digit count. `Math.round` fixes tiny decimal errors from `Math.pow`.",
c: J`import java.util.Scanner;

public class Main {
    static boolean isArmstrong(int n) {
        int k = String.valueOf(n).length();
        int temp = n;
        long sum = 0;
        while (temp > 0) {
            int d = temp % 10;
            sum += Math.round(Math.pow(d, k));
            temp /= 10;
        }
        return sum == n;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isArmstrong(n) ? "Armstrong" : "Not Armstrong");
    }
}
`, i: "9474" },
{ x: "Print every Armstrong number from 1 to 10000 by calling the method inside a loop.",
c: J`public class Main {
    static boolean isArmstrong(int n) {
        int k = String.valueOf(n).length();
        int temp = n;
        long sum = 0;
        while (temp > 0) {
            long p = 1;
            for (int i = 0; i < k; i++) p *= temp % 10;
            sum += p;
            temp /= 10;
        }
        return sum == n;
    }

    public static void main(String[] args) {
        for (int i = 1; i <= 10000; i++) {
            if (isArmstrong(i)) System.out.print(i + " ");
        }
        System.out.println();
    }
}
` }
]});

Q.push({ id: 13, topic: "Numbers", title: "Power of a number (a^b)",
intro: "Goal: compute a raised to the power b, for example 2^5 = 32.",
levels: [
{ x: "Java has `Math.pow(a, b)`, but it returns a `double`. Casting gives an integer.",
c: J`public class Main {
    public static void main(String[] args) {
        System.out.println(Math.pow(2, 5));         // 32.0
        System.out.println((int) Math.pow(2, 5));   // 32
    }
}
` },
{ x: "Do it yourself: multiply `base` by itself `exp` times.",
c: J`public class Main {
    public static void main(String[] args) {
        int base = 2, exp = 5;
        long result = 1;
        for (int i = 0; i < exp; i++) {
            result *= base;
        }
        System.out.println(base + "^" + exp + " = " + result);
    }
}
` },
{ x: "Method version with input.",
c: J`import java.util.Scanner;

public class Main {
    static long power(long base, int exp) {
        long result = 1;
        for (int i = 0; i < exp; i++) result *= base;
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long b = sc.nextLong();
        int e = sc.nextInt();
        System.out.println(power(b, e));
    }
}
`, i: "3 4" },
{ x: "Fast exponentiation: a^n = (a^(n/2))^2 (times a if n is odd). This needs only about log n multiplications. A very common DSA trick.",
c: J`public class Main {
    static long power(long a, int n) {
        if (n == 0) return 1;
        long half = power(a, n / 2);
        if (n % 2 == 0) return half * half;
        return half * half * a;
    }

    public static void main(String[] args) {
        System.out.println(power(2, 30));
        System.out.println(power(3, 13));
    }
}
` }
]});

Q.push({ id: 14, topic: "Numbers", title: "GCD (HCF) of two numbers",
intro: "Goal: the greatest number that divides both. GCD(48, 18) = 6.",
levels: [
{ x: "`a % b == 0` means b divides a perfectly. A common divisor divides both numbers.",
c: J`public class Main {
    public static void main(String[] args) {
        System.out.println(48 % 6);   // 0, so 6 divides 48
        System.out.println(18 % 6);   // 0, so 6 divides 18
        System.out.println(18 % 4);   // 2, so 4 does not divide 18
    }
}
` },
{ x: "Brute force: try every number from the smaller one down to 1. The first one that divides both is the GCD.",
c: J`public class Main {
    public static void main(String[] args) {
        int a = 48, b = 18;
        int gcd = 1;
        for (int i = Math.min(a, b); i >= 1; i--) {
            if (a % i == 0 && b % i == 0) {
                gcd = i;
                break;
            }
        }
        System.out.println("GCD = " + gcd);
    }
}
` },
{ x: "Euclid's idea: gcd(a, b) = gcd(b, a % b). Keep replacing until the remainder is 0. Much faster.",
c: J`import java.util.Scanner;

public class Main {
    static int gcd(int a, int b) {
        while (b != 0) {
            int r = a % b;
            a = b;
            b = r;
        }
        return a;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(gcd(sc.nextInt(), sc.nextInt()));
    }
}
`, i: "48 18" },
{ x: "The recursive form is only one line. You can also fold it over an array to get the GCD of many numbers.",
c: J`public class Main {
    static int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }

    public static void main(String[] args) {
        System.out.println(gcd(48, 18));
        int[] arr = {12, 18, 24, 30};
        int g = arr[0];
        for (int x : arr) g = gcd(g, x);
        System.out.println("GCD of array = " + g);
    }
}
` }
]});

Q.push({ id: 15, topic: "Numbers", title: "LCM of two numbers",
intro: "Goal: the smallest number that both numbers divide into. LCM(12, 18) = 36.",
levels: [
{ x: "Multiples of a number are what you get by multiplying it by 1, 2, 3 ... Print the first multiples of 4 and 6.",
c: J`public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 6; i++) System.out.print(4 * i + " ");
        System.out.println();
        for (int i = 1; i <= 6; i++) System.out.print(6 * i + " ");
        System.out.println();
    }
}
` },
{ x: "Start at the larger number and keep adding until both numbers divide it.",
c: J`public class Main {
    public static void main(String[] args) {
        int a = 12, b = 18;
        int lcm = Math.max(a, b);
        while (lcm % a != 0 || lcm % b != 0) {
            lcm++;
        }
        System.out.println("LCM = " + lcm);
    }
}
` },
{ x: "Formula: LCM = a x b / GCD. Divide first to avoid overflow.",
c: J`import java.util.Scanner;

public class Main {
    static int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }

    static long lcm(int a, int b) {
        return (long) a / gcd(a, b) * b;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(lcm(sc.nextInt(), sc.nextInt()));
    }
}
`, i: "12 18" },
{ x: "LCM of many numbers: fold the same idea across an array. LCM of 1 to 10 is 2520.",
c: J`public class Main {
    static long gcd(long a, long b) {
        return b == 0 ? a : gcd(b, a % b);
    }

    public static void main(String[] args) {
        long l = 1;
        for (int i = 1; i <= 10; i++) {
            l = l / gcd(l, i) * i;
        }
        System.out.println("LCM(1..10) = " + l);
    }
}
` }
]});

Q.push({ id: 16, topic: "Numbers", title: "Multiplication table",
intro: "Goal: print the table of a number, for example 7 x 1 = 7 up to 7 x 10 = 70.",
levels: [
{ x: "One line of the table is just a multiplication joined to text.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 7;
        System.out.println(n + " x 1 = " + (n * 1));
    }
}
` },
{ x: "Repeat it for 1 to 10 with a `for` loop.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 7;
        for (int i = 1; i <= 10; i++) {
            System.out.println(n + " x " + i + " = " + (n * i));
        }
    }
}
` },
{ x: "A method `table(n)` that prints the table of any number you give it.",
c: J`import java.util.Scanner;

public class Main {
    static void table(int n) {
        for (int i = 1; i <= 10; i++) {
            System.out.println(n + " x " + i + " = " + (n * i));
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        table(sc.nextInt());
    }
}
`, i: "9" },
{ x: "Nested loops: print the tables of 2, 3 and 4 side by side, neatly aligned with `printf`.",
c: J`public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            for (int t = 2; t <= 4; t++) {
                System.out.printf("%d x %2d = %3d    ", t, i, t * i);
            }
            System.out.println();
        }
    }
}
` }
]});

Q.push({ id: 17, topic: "Numbers", title: "Count digits in a number",
intro: "Goal: 98765 has 5 digits.",
levels: [
{ x: "Dividing by 10 removes one digit. Do it once and see.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 98765;
        n = n / 10;
        System.out.println(n);   // 9876, one digit fewer
    }
}
` },
{ x: "Count how many times you can divide by 10 before the number reaches 0.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 98765, count = 0;
        while (n > 0) {
            n /= 10;
            count++;
        }
        System.out.println("Digits = " + count);
    }
}
` },
{ x: "Handle the special cases: `0` has one digit, and negative numbers should be made positive first.",
c: J`import java.util.Scanner;

public class Main {
    static int countDigits(int n) {
        if (n == 0) return 1;
        n = Math.abs(n);
        int count = 0;
        while (n > 0) {
            n /= 10;
            count++;
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(countDigits(sc.nextInt()));
    }
}
`, i: "-12345" },
{ x: "Two other ways: recursion, and a math trick with logarithms (`log10`) for positive numbers.",
c: J`public class Main {
    static int countRec(int n) {
        if (n < 10) return 1;
        return 1 + countRec(n / 10);
    }

    public static void main(String[] args) {
        int n = 98765;
        System.out.println(countRec(n));
        System.out.println((int) Math.log10(n) + 1);
    }
}
` }
]});

Q.push({ id: 18, topic: "Numbers", title: "Leap year check",
intro: "Goal: a year is a leap year if it is divisible by 4, except century years, which must be divisible by 400. So 2024 and 2000 are leap, 1900 and 2100 are not.",
levels: [
{ x: "You need `&&` (and), `||` (or) and `%`. Practice them on small examples.",
c: J`public class Main {
    public static void main(String[] args) {
        int year = 2024;
        System.out.println(year % 4 == 0);                       // true
        System.out.println(year % 100 != 0);                     // true
        System.out.println(year % 4 == 0 && year % 100 != 0);    // true
    }
}
` },
{ x: "Combine the rules with `if`.",
c: J`public class Main {
    public static void main(String[] args) {
        int year = 2100;
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            System.out.println(year + " is a leap year");
        } else {
            System.out.println(year + " is not a leap year");
        }
    }
}
` },
{ x: "Method version returning a `boolean`.",
c: J`import java.util.Scanner;

public class Main {
    static boolean isLeap(int y) {
        return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int y = sc.nextInt();
        System.out.println(y + (isLeap(y) ? " is a leap year" : " is not a leap year"));
    }
}
`, i: "2000" },
{ x: "Reuse the method in a loop to list all leap years in a range.",
c: J`public class Main {
    static boolean isLeap(int y) {
        return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
    }

    public static void main(String[] args) {
        int count = 0;
        for (int y = 1900; y <= 2030; y++) {
            if (isLeap(y)) {
                System.out.print(y + " ");
                count++;
            }
        }
        System.out.println();
        System.out.println("Total leap years: " + count);
    }
}
` }
]});

Q.push({ id: 19, topic: "Patterns", title: "Star triangle pattern",
intro: "Goal: print\n*\n**\n***\n****\nPatterns train your loop thinking, which you need everywhere in DSA.",
levels: [
{ x: "`print` stays on the same line and `println` moves down. Print 5 stars on one row using a loop.",
c: J`public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.print("*");
        }
        System.out.println();
    }
}
` },
{ x: "Use a loop inside a loop. The outer loop is the row number `i`, the inner loop prints `i` stars.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}
` },
{ x: "Put the logic in a method `triangle(n)` so you can print any size.",
c: J`import java.util.Scanner;

public class Main {
    static void triangle(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) System.out.print("* ");
            System.out.println();
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        triangle(sc.nextInt());
    }
}
`, i: "4" },
{ x: "Variations: an upside down triangle, and a right aligned triangle (spaces first, then stars).",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 5;
        System.out.println("Inverted:");
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) System.out.print("*");
            System.out.println();
        }
        System.out.println("Right aligned:");
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= i; j++) System.out.print("*");
            System.out.println();
        }
    }
}
` }
]});

Q.push({ id: 20, topic: "Patterns", title: "Pyramid and diamond pattern",
intro: "Goal: a centered pyramid\n    *\n   ***\n  *****\n and then a diamond.",
levels: [
{ x: "Each row of a pyramid is made of some spaces followed by some stars. Print one such row (3 spaces, 3 stars).",
c: J`public class Main {
    public static void main(String[] args) {
        for (int s = 1; s <= 3; s++) System.out.print(" ");
        for (int k = 1; k <= 3; k++) System.out.print("*");
        System.out.println();
    }
}
` },
{ x: "For row `i` of `n` rows: `n - i` spaces, then `2*i - 1` stars.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int k = 1; k <= 2 * i - 1; k++) System.out.print("*");
            System.out.println();
        }
    }
}
` },
{ x: "Method version.",
c: J`import java.util.Scanner;

public class Main {
    static void pyramid(int n) {
        for (int i = 1; i <= n; i++) {
            System.out.println(" ".repeat(n - i) + "*".repeat(2 * i - 1));
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        pyramid(sc.nextInt());
    }
}
`, i: "6" },
{ x: "A diamond is a pyramid plus an upside down pyramid. Also a number pyramid.",
c: J`public class Main {
    static void row(int n, int i) {
        System.out.println(" ".repeat(n - i) + "*".repeat(2 * i - 1));
    }

    public static void main(String[] args) {
        int n = 4;
        for (int i = 1; i <= n; i++) row(n, i);
        for (int i = n - 1; i >= 1; i--) row(n, i);

        System.out.println();
        for (int i = 1; i <= 4; i++) {
            System.out.println(" ".repeat(4 - i) + (String.valueOf(i) + " ").repeat(i));
        }
    }
}
` }
]});

})();
