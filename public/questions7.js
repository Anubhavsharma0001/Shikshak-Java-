(function () {
const J = String.raw;
window.QUESTIONS = window.QUESTIONS || [];
const Q = window.QUESTIONS;

// Questions 61-70: Operators, Conditions & Loops
// Questions 1-60 are intentionally left unchanged.

Q.push({
id: 61, topic: "Operators, Conditions & Loops", title: "Arithmetic operators",
intro: "Goal: perform addition, subtraction, multiplication, division, and remainder operations in Java.",
levels: [
{ x: "Java uses `+`, `-`, `*`, `/`, and `%` for basic arithmetic. The remainder operator `%` returns what is left after division.",
c: J`public class Main {
    public static void main(String[] args) {
        int a = 17;
        int b = 5;

        System.out.println(a + b);
        System.out.println(a - b);
        System.out.println(a * b);
        System.out.println(a / b);
        System.out.println(a % b);
    }
}
` },
{ x: "When both operands are integers, division produces an integer and discards the fractional part. Use a floating-point operand for decimal division.",
c: J`public class Main {
    public static void main(String[] args) {
        int total = 7;
        int count = 2;

        System.out.println(total / count);
        System.out.println((double) total / count);
    }
}
` },
{ x: "The remainder operator is useful for checking divisibility. A number is even when `number % 2 == 0`.",
c: J`public class Main {
    static boolean isEven(int number) {
        return number % 2 == 0;
    }

    public static void main(String[] args) {
        System.out.println(isEven(24));
        System.out.println(isEven(17));
    }
}
` },
{ x: "Operator precedence determines the order of evaluation. Use parentheses to make the intended calculation explicit.",
c: J`public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 4;
        int c = 2;

        int first = a + b * c;
        int second = (a + b) * c;

        System.out.println(first);
        System.out.println(second);
    }
}
` }
]
});

Q.push({
id: 62, topic: "Operators, Conditions & Loops", title: "Assignment and increment operators",
intro: "Goal: update variables using compound assignment, increment, and decrement operators.",
levels: [
{ x: "The assignment operator `=` stores a value. Compound operators such as `+=` and `-=` update a variable using its current value.",
c: J`public class Main {
    public static void main(String[] args) {
        int score = 10;
        score += 5;
        score -= 3;
        score *= 2;

        System.out.println(score);
    }
}
` },
{ x: "`++` increases a value by one and `--` decreases it by one. Both have prefix and postfix forms.",
c: J`public class Main {
    public static void main(String[] args) {
        int count = 5;

        System.out.println(++count);
        System.out.println(count++);
        System.out.println(count);
        System.out.println(--count);
    }
}
` },
{ x: "Prefix changes the value before the expression is evaluated. Postfix evaluates the current value first and then changes the variable.",
c: J`public class Main {
    public static void main(String[] args) {
        int x = 4;
        int prefixResult = ++x;

        int y = 4;
        int postfixResult = y++;

        System.out.println(prefixResult + " " + x);
        System.out.println(postfixResult + " " + y);
    }
}
` },
{ x: "Avoid complicated expressions that modify the same variable multiple times. Separate updates into clear statements to make behavior predictable.",
c: J`public class Main {
    public static void main(String[] args) {
        int balance = 1000;
        int deposit = 250;
        int withdrawal = 120;

        balance += deposit;
        balance -= withdrawal;

        System.out.println("Final balance = " + balance);
    }
}
` }
]
});

Q.push({
id: 63, topic: "Operators, Conditions & Loops", title: "Relational and logical operators",
intro: "Goal: compare values and combine conditions using Java relational and logical operators.",
levels: [
{ x: "Relational operators compare two values and produce a boolean: `==`, `!=`, `>`, `<`, `>=`, and `<=`.",
c: J`public class Main {
    public static void main(String[] args) {
        int age = 20;

        System.out.println(age >= 18);
        System.out.println(age == 20);
        System.out.println(age != 16);
        System.out.println(age < 25);
    }
}
` },
{ x: "Logical AND `&&` is true only when both conditions are true. Logical OR `||` is true when at least one condition is true. NOT `!` reverses a boolean.",
c: J`public class Main {
    public static void main(String[] args) {
        int age = 22;
        boolean hasId = true;

        System.out.println(age >= 18 && hasId);
        System.out.println(age < 18 || hasId);
        System.out.println(!hasId);
    }
}
` },
{ x: "Java uses short-circuit evaluation for `&&` and `||`. The right side may not run when the left side already determines the result.",
c: J`public class Main {
    public static void main(String[] args) {
        String name = null;

        if (name != null && name.length() > 0) {
            System.out.println("Name is present");
        } else {
            System.out.println("Name is missing");
        }
    }
}
` },
{ x: "Combine conditions carefully with parentheses, especially when mixing AND and OR. This makes business rules easier to verify.",
c: J`public class Main {
    static boolean eligible(int age, boolean hasTicket, boolean isMember) {
        return age >= 18 && (hasTicket || isMember);
    }

    public static void main(String[] args) {
        System.out.println(eligible(20, true, false));
        System.out.println(eligible(16, false, true));
        System.out.println(eligible(25, false, true));
    }
}
` }
]
});

Q.push({
id: 64, topic: "Operators, Conditions & Loops", title: "if, else if and else",
intro: "Goal: make decisions by running different blocks depending on conditions.",
levels: [
{ x: "An `if` statement runs its block only when its condition is true.",
c: J`public class Main {
    public static void main(String[] args) {
        int number = 8;

        if (number > 0) {
            System.out.println("Positive");
        }
    }
}
` },
{ x: "Use `else` to provide an alternative when the `if` condition is false.",
c: J`public class Main {
    public static void main(String[] args) {
        int number = -3;

        if (number >= 0) {
            System.out.println("Non-negative");
        } else {
            System.out.println("Negative");
        }
    }
}
` },
{ x: "Use an `else if` chain when there are multiple mutually exclusive cases. Conditions are checked from top to bottom.",
c: J`public class Main {
    public static void main(String[] args) {
        int marks = 76;

        if (marks >= 90) {
            System.out.println("Grade A");
        } else if (marks >= 75) {
            System.out.println("Grade B");
        } else if (marks >= 60) {
            System.out.println("Grade C");
        } else {
            System.out.println("Needs improvement");
        }
    }
}
` },
{ x: "Validate boundary values and order conditions from the most specific or highest threshold to the broadest case.",
c: J`public class Main {
    static String classify(int marks) {
        if (marks < 0 || marks > 100) return "Invalid";
        if (marks >= 90) return "A";
        if (marks >= 80) return "B";
        if (marks >= 70) return "C";
        if (marks >= 40) return "Pass";
        return "Fail";
    }

    public static void main(String[] args) {
        System.out.println(classify(95));
        System.out.println(classify(72));
        System.out.println(classify(35));
        System.out.println(classify(110));
    }
}
` }
]
});

Q.push({
id: 65, topic: "Operators, Conditions & Loops", title: "Ternary operator",
intro: "Goal: write a concise conditional expression using the ternary operator.",
levels: [
{ x: "The ternary operator has the form `condition ? valueIfTrue : valueIfFalse`. It chooses one of two expressions.",
c: J`public class Main {
    public static void main(String[] args) {
        int age = 19;
        String result = age >= 18 ? "Adult" : "Minor";

        System.out.println(result);
    }
}
` },
{ x: "The selected expression is assigned to a variable. Both alternatives should produce compatible types.",
c: J`public class Main {
    public static void main(String[] args) {
        int a = 14;
        int b = 9;

        int maximum = a > b ? a : b;
        System.out.println(maximum);
    }
}
` },
{ x: "Ternary expressions can be used in method returns and output statements, but ordinary `if/else` is often clearer for complex logic.",
c: J`public class Main {
    static String evenOrOdd(int number) {
        return number % 2 == 0 ? "Even" : "Odd";
    }

    public static void main(String[] args) {
        System.out.println(evenOrOdd(12));
        System.out.println(evenOrOdd(7));
    }
}
` },
{ x: "Avoid deeply nested ternary operators. Keep a conditional expression short enough that its two outcomes are immediately understandable.",
c: J`public class Main {
    static String grade(int marks) {
        if (marks < 0 || marks > 100) return "Invalid";
        return marks >= 40 ? "Pass" : "Fail";
    }

    public static void main(String[] args) {
        System.out.println(grade(65));
        System.out.println(grade(25));
    }
}
` }
]
});

Q.push({
id: 66, topic: "Operators, Conditions & Loops", title: "switch statement",
intro: "Goal: select one branch from several choices using a switch statement.",
levels: [
{ x: "A traditional `switch` compares one expression with case labels. Use `break` to prevent execution from falling through to the next case.",
c: J`public class Main {
    public static void main(String[] args) {
        int day = 3;

        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            default:
                System.out.println("Unknown day");
        }
    }
}
` },
{ x: "The `default` branch handles values that do not match any case. It is optional but useful when all unexpected values need handling.",
c: J`public class Main {
    public static void main(String[] args) {
        char grade = 'B';

        switch (grade) {
            case 'A':
                System.out.println("Excellent");
                break;
            case 'B':
            case 'C':
                System.out.println("Good");
                break;
            default:
                System.out.println("Keep practising");
        }
    }
}
` },
{ x: "Modern switch expressions can return a value. The arrow form does not fall through, so a `break` is not needed.",
c: J`public class Main {
    public static void main(String[] args) {
        int month = 2;

        String season = switch (month) {
            case 12, 1, 2 -> "Winter";
            case 3, 4, 5 -> "Spring";
            case 6, 7, 8 -> "Summer";
            case 9, 10, 11 -> "Autumn";
            default -> "Invalid month";
        };

        System.out.println(season);
    }
}
` },
{ x: "Choose switch when one expression is matched against fixed alternatives. Use if/else when conditions involve ranges or more complex boolean logic.",
c: J`public class Main {
    static int daysInMonth(int month) {
        return switch (month) {
            case 1, 3, 5, 7, 8, 10, 12 -> 31;
            case 4, 6, 9, 11 -> 30;
            case 2 -> 28;
            default -> -1;
        };
    }

    public static void main(String[] args) {
        System.out.println(daysInMonth(2));
        System.out.println(daysInMonth(11));
        System.out.println(daysInMonth(15));
    }
}
` }
]
});

Q.push({
id: 67, topic: "Operators, Conditions & Loops", title: "for loop",
intro: "Goal: repeat a block a known number of times using a for loop.",
levels: [
{ x: "A `for` loop has initialization, a condition, and an update. It is useful when the number of repetitions is known.",
c: J`public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.println(i);
        }
    }
}
` },
{ x: "Change the start, end condition, and update to count backwards or use a different step size.",
c: J`public class Main {
    public static void main(String[] args) {
        for (int i = 10; i >= 2; i -= 2) {
            System.out.println(i);
        }
    }
}
` },
{ x: "Use an accumulator to calculate a total while iterating. Initialize it before the loop and update it on each iteration.",
c: J`public class Main {
    public static void main(String[] args) {
        int sum = 0;

        for (int i = 1; i <= 10; i++) {
            sum += i;
        }

        System.out.println(sum);
    }
}
` },
{ x: "Nested loops place one loop inside another. The inner loop completes all its iterations for each iteration of the outer loop.",
c: J`public class Main {
    public static void main(String[] args) {
        for (int row = 1; row <= 3; row++) {
            for (int col = 1; col <= 4; col++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
` }
]
});

Q.push({
id: 68, topic: "Operators, Conditions & Loops", title: "while loop",
intro: "Goal: repeat instructions while a condition remains true, especially when the repetition count is not known in advance.",
levels: [
{ x: "A `while` loop checks its condition before each iteration. If the condition is initially false, its body does not run.",
c: J`public class Main {
    public static void main(String[] args) {
        int count = 1;

        while (count <= 5) {
            System.out.println(count);
            count++;
        }
    }
}
` },
{ x: "Update the variable used by the condition so the loop can eventually stop. Forgetting the update can create an infinite loop.",
c: J`public class Main {
    public static void main(String[] args) {
        int number = 5;

        while (number > 0) {
            System.out.println(number);
            number--;
        }

        System.out.println("Go!");
    }
}
` },
{ x: "A while loop is useful for processing digits. Integer division by 10 removes the last digit and remainder by 10 extracts it.",
c: J`public class Main {
    public static void main(String[] args) {
        int number = 4821;

        while (number > 0) {
            int digit = number % 10;
            System.out.println(digit);
            number /= 10;
        }
    }
}
` },
{ x: "Use a loop invariant or a clear progress variable to reason about termination. Handle special inputs such as zero separately when necessary.",
c: J`public class Main {
    static int sumDigits(int number) {
        number = Math.abs(number);
        int sum = 0;

        while (number > 0) {
            sum += number % 10;
            number /= 10;
        }
        return sum;
    }

    public static void main(String[] args) {
        System.out.println(sumDigits(4821));
        System.out.println(sumDigits(0));
        System.out.println(sumDigits(-305));
    }
}
` }
]
});

Q.push({
id: 69, topic: "Operators, Conditions & Loops", title: "do-while loop",
intro: "Goal: use a loop that always executes its body at least once before checking the condition.",
levels: [
{ x: "A `do-while` loop checks its condition after running the body, so it always executes at least once.",
c: J`public class Main {
    public static void main(String[] args) {
        int count = 1;

        do {
            System.out.println(count);
            count++;
        } while (count <= 5);
    }
}
` },
{ x: "The semicolon after the while condition is required in a do-while loop.",
c: J`public class Main {
    public static void main(String[] args) {
        int value = 10;

        do {
            System.out.println("This runs once");
            value++;
        } while (value < 5);
    }
}
` },
{ x: "A do-while loop is useful for menu-driven programs because the menu should appear before the program checks whether the user wants to continue.",
c: J`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice;

        do {
            System.out.println("1. Say hello");
            System.out.println("0. Exit");
            choice = sc.nextInt();

            if (choice == 1) {
                System.out.println("Hello!");
            }
        } while (choice != 0);
    }
}
`, i: "1\n0" },
{ x: "Choose do-while when at least one execution is required. Choose while when the condition must be checked before the first execution.",
c: J`public class Main {
    static int countDigits(int number) {
        number = Math.abs(number);
        if (number == 0) return 1;

        int count = 0;
        do {
            count++;
            number /= 10;
        } while (number > 0);

        return count;
    }

    public static void main(String[] args) {
        System.out.println(countDigits(5832));
        System.out.println(countDigits(0));
    }
}
` }
]
});

Q.push({
id: 70, topic: "Operators, Conditions & Loops", title: "break and continue",
intro: "Goal: control loop execution with `break` and `continue`.",
levels: [
{ x: "`break` immediately exits the nearest loop. Execution continues with the first statement after that loop.",
c: J`public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            if (i == 6) {
                break;
            }
            System.out.println(i);
        }
        System.out.println("Loop ended");
    }
}
` },
{ x: "`continue` skips the rest of the current iteration and moves to the next iteration.",
c: J`public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) {
                continue;
            }
            System.out.println(i);
        }
    }
}
` },
{ x: "In nested loops, an unlabeled break or continue affects only the nearest enclosing loop.",
c: J`public class Main {
    public static void main(String[] args) {
        for (int row = 1; row <= 3; row++) {
            for (int col = 1; col <= 3; col++) {
                if (col == 2) {
                    break;
                }
                System.out.println(row + ":" + col);
            }
        }
    }
}
` },
{ x: "Use labeled break only when you need to exit multiple nested loops. Keep labels rare because they can make control flow harder to follow.",
c: J`public class Main {
    public static void main(String[] args) {
        int target = 7;
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        search:
        for (int row = 0; row < matrix.length; row++) {
            for (int col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] == target) {
                    System.out.println("Found at " + row + "," + col);
                    break search;
                }
            }
        }
    }
}
` }
]
});

})();
