(function () {
const J = String.raw;
window.QUESTIONS = window.QUESTIONS || [];
const Q = window.QUESTIONS;

// Questions 51-60: Java Fundamentals
// Existing questions 1-50 are intentionally left unchanged.

Q.push({
id: 51, topic: "Java Fundamentals", title: "Variables and data types",
intro: "Goal: understand how Java stores information in variables and chooses a data type for each value.",
levels: [
{ x: "A variable is a named place to store a value. Declare its type before its name, then assign a value with `=`.",
c: J`public class Main {
    public static void main(String[] args) {
        int age = 20;
        double height = 5.8;
        char grade = 'A';
        boolean isStudent = true;

        System.out.println(age);
        System.out.println(height);
        System.out.println(grade);
        System.out.println(isStudent);
    }
}
` },
{ x: "Java is statically typed: a variable's type is known at compile time. You can update a variable with another value of the same compatible type.",
c: J`public class Main {
    public static void main(String[] args) {
        int score = 70;
        score = 85;
        String name = "Anu";
        name = "Ravi";

        System.out.println(name + " scored " + score);
    }
}
` },
{ x: "Choose types according to the data. Use `int` for ordinary whole numbers, `long` for larger whole numbers, `double` for decimal calculations, and `boolean` for true/false values.",
c: J`public class Main {
    public static void main(String[] args) {
        int students = 45;
        long population = 8000000000L;
        double price = 149.50;
        boolean available = true;

        System.out.println("Students: " + students);
        System.out.println("Population: " + population);
        System.out.println("Price: " + price);
        System.out.println("Available: " + available);
    }
}
` },
{ x: "Use meaningful names and initialize local variables before reading them. Java does not automatically give local variables a default value.",
c: J`public class Main {
    static int calculateTotal(int itemPrice, int quantity) {
        int total = itemPrice * quantity;
        return total;
    }

    public static void main(String[] args) {
        int total = calculateTotal(120, 3);
        System.out.println("Total = " + total);
    }
}
` }
]
});

Q.push({
id: 52, topic: "Java Fundamentals", title: "Primitive data types",
intro: "Goal: learn Java's eight primitive types and when to use each one.",
levels: [
{ x: "Java has eight primitive types: `byte`, `short`, `int`, `long`, `float`, `double`, `char`, and `boolean`.",
c: J`public class Main {
    public static void main(String[] args) {
        byte small = 100;
        short year = 2026;
        int marks = 450;
        long distance = 9000000000L;
        float temperature = 36.5f;
        double accountBalance = 12500.75;
        char section = 'B';
        boolean passed = true;

        System.out.println(small);
        System.out.println(year);
        System.out.println(marks);
        System.out.println(distance);
        System.out.println(temperature);
        System.out.println(accountBalance);
        System.out.println(section);
        System.out.println(passed);
    }
}
` },
{ x: "The integer types have different ranges. `byte` and `short` use less storage; `int` is the usual choice for whole numbers; `long` is for larger values.",
c: J`public class Main {
    public static void main(String[] args) {
        byte minByte = -128;
        byte maxByte = 127;
        int normalNumber = 2000000;
        long largeNumber = 9000000000L;

        System.out.println(minByte + " to " + maxByte);
        System.out.println(normalNumber);
        System.out.println(largeNumber);
    }
}
` },
{ x: "For decimal values, `float` uses an `f` suffix while decimal literals are `double` by default. `char` stores one UTF-16 code unit in single quotes.",
c: J`public class Main {
    public static void main(String[] args) {
        float rate = 7.5f;
        double preciseRate = 7.500001;
        char initial = 'A';

        System.out.println(rate);
        System.out.println(preciseRate);
        System.out.println(initial);
        System.out.println((int) initial);
    }
}
` },
{ x: "Use `long` for large integer calculations and be aware that integer overflow wraps around. Use `BigInteger` when integers can exceed the `long` range.",
c: J`import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        long largestLong = Long.MAX_VALUE;
        System.out.println(largestLong);

        BigInteger huge = new BigInteger("999999999999999999999999999999");
        System.out.println(huge.add(BigInteger.ONE));
    }
}
` }
]
});

Q.push({
id: 53, topic: "Java Fundamentals", title: "Read input using Scanner",
intro: "Goal: accept values from the keyboard with `Scanner` and display a result.",
levels: [
{ x: "Create a `Scanner` connected to `System.in`. Use `nextInt()` to read an integer.",
c: J`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int age = sc.nextInt();
        System.out.println("Age = " + age);
    }
}
`, i: "21" },
{ x: "Read different types with methods such as `nextDouble()`, `next()`, and `nextBoolean()`.",
c: J`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.next();
        int age = sc.nextInt();
        double cgpa = sc.nextDouble();

        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("CGPA: " + cgpa);
    }
}
`, i: "Anu 20 8.4" },
{ x: "Use `nextLine()` when the input may contain spaces. If you call it after `nextInt()`, consume the leftover newline first.",
c: J`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int age = sc.nextInt();
        sc.nextLine();
        String fullName = sc.nextLine();

        System.out.println(fullName + " is " + age);
    }
}
`, i: "20\nAnubhav Sharma" },
{ x: "Read several values, validate the input when needed, and keep input handling separate from the calculation.",
c: J`import java.util.Scanner;

public class Main {
    static double average(int a, int b, int c) {
        return (a + b + c) / 3.0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();

        System.out.printf("Average = %.2f%n", average(a, b, c));
    }
}
`, i: "70 80 90" }
]
});

Q.push({
id: 54, topic: "Java Fundamentals", title: "Type casting and conversion",
intro: "Goal: convert values between numeric types and understand widening and narrowing conversions.",
levels: [
{ x: "Widening conversion moves from a smaller compatible numeric type to a larger one, such as `int` to `double`. Java performs it automatically.",
c: J`public class Main {
    public static void main(String[] args) {
        int count = 12;
        double value = count;

        System.out.println(count);
        System.out.println(value);
    }
}
` },
{ x: "Narrowing conversion may lose information, so write an explicit cast. Converting `double` to `int` removes the fractional part; it does not round.",
c: J`public class Main {
    public static void main(String[] args) {
        double price = 99.95;
        int wholePrice = (int) price;

        System.out.println(wholePrice);
    }
}
` },
{ x: "Use parsing methods to convert text into numbers. Invalid text causes `NumberFormatException`, so validate or handle it when input is untrusted.",
c: J`public class Main {
    public static void main(String[] args) {
        String text = "125";
        int number = Integer.parseInt(text);
        double decimal = Double.parseDouble("12.75");

        System.out.println(number + 5);
        System.out.println(decimal);
    }
}
` },
{ x: "Casting follows Java's numeric promotion rules. In mixed arithmetic, smaller integer types are promoted to `int`; choose the intended result type carefully.",
c: J`public class Main {
    public static void main(String[] args) {
        byte a = 10;
        byte b = 20;
        int sum = a + b;

        int total = 5;
        int count = 2;
        double average = (double) total / count;

        System.out.println(sum);
        System.out.println(average);
    }
}
` }
]
});

Q.push({
id: 55, topic: "Java Fundamentals", title: "Constants using final",
intro: "Goal: declare values that should not be reassigned and use named constants to make programs clearer.",
levels: [
{ x: "The `final` keyword prevents a variable from being assigned again after it has been initialized.",
c: J`public class Main {
    public static void main(String[] args) {
        final int DAYS_IN_WEEK = 7;
        System.out.println(DAYS_IN_WEEK);
    }
}
` },
{ x: "By convention, constants are often written in uppercase with underscores. A `final` local variable must be assigned before it is used.",
c: J`public class Main {
    public static void main(String[] args) {
        final double PI = 3.141592653589793;
        double radius = 4.0;
        double area = PI * radius * radius;

        System.out.println(area);
    }
}
` },
{ x: "A class-level constant is commonly declared `static final`, allowing every method in the class to use the same value.",
c: J`public class Main {
    static final double TAX_RATE = 0.18;

    static double addTax(double price) {
        return price + price * TAX_RATE;
    }

    public static void main(String[] args) {
        System.out.printf("%.2f%n", addTax(1000));
    }
}
` },
{ x: "For primitive variables, `final` prevents reassignment. For object references, it prevents changing the reference, but the referenced object's contents may still be mutable.",
c: J`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        final ArrayList<String> names = new ArrayList<>();
        names.add("Anu");
        names.add("Ravi");

        // names = new ArrayList<>(); // not allowed
        System.out.println(names);
    }
}
` }
]
});

Q.push({
id: 56, topic: "Java Fundamentals", title: "Variable scope",
intro: "Goal: understand where a variable can be accessed and how local, instance, and static variables differ.",
levels: [
{ x: "A local variable is declared inside a method or block. It can only be used within that scope.",
c: J`public class Main {
    public static void main(String[] args) {
        int number = 10;
        if (number > 0) {
            int doubled = number * 2;
            System.out.println(doubled);
        }
        // doubled is not available here
    }
}
` },
{ x: "A block creates its own scope. A variable declared inside a loop or `if` block cannot be accessed after that block ends.",
c: J`public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            int square = i * i;
            System.out.println(square);
        }
        // i and square are out of scope here
    }
}
` },
{ x: "An instance variable belongs to an object. Each object has its own copy, while a static variable belongs to the class and is shared.",
c: J`class Student {
    String name;
    static String college = "ABC";

    Student(String studentName) {
        name = studentName;
    }

    void printDetails() {
        System.out.println(name + " - " + college);
    }
}

public class Main {
    public static void main(String[] args) {
        Student a = new Student("Anu");
        Student b = new Student("Ravi");
        a.printDetails();
        b.printDetails();
    }
}
` },
{ x: "Prefer the narrowest scope that works. This reduces accidental changes and makes code easier to understand and test.",
c: J`public class Main {
    static int calculateTotal(int[] values) {
        int total = 0;
        for (int value : values) {
            total += value;
        }
        return total;
    }

    public static void main(String[] args) {
        int[] marks = {80, 75, 90};
        System.out.println(calculateTotal(marks));
    }
}
` }
]
});

Q.push({
id: 57, topic: "Java Fundamentals", title: "Wrapper classes and autoboxing",
intro: "Goal: understand object wrappers for primitive values and how Java converts between primitives and wrappers.",
levels: [
{ x: "Each primitive type has a wrapper class, such as `int` and `Integer`, or `double` and `Double`.",
c: J`public class Main {
    public static void main(String[] args) {
        int number = 10;
        Integer wrapped = Integer.valueOf(number);

        System.out.println(number);
        System.out.println(wrapped);
    }
}
` },
{ x: "Autoboxing automatically converts a primitive into its wrapper object. Unboxing converts the wrapper back into a primitive.",
c: J`public class Main {
    public static void main(String[] args) {
        Integer score = 95;
        int value = score;

        System.out.println(value + 5);
    }
}
` },
{ x: "Collections such as `ArrayList` store objects, not primitive values, so wrapper classes are used with them.",
c: J`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> marks = new ArrayList<>();
        marks.add(80);
        marks.add(90);
        marks.add(75);

        int total = 0;
        for (int mark : marks) {
            total += mark;
        }
        System.out.println("Total = " + total);
    }
}
` },
{ x: "Be careful when unboxing a null wrapper: it throws `NullPointerException`. Also use `.equals()` to compare wrapper values rather than relying on object identity with `==`.",
c: J`public class Main {
    public static void main(String[] args) {
        Integer first = 1000;
        Integer second = 1000;

        System.out.println(first.equals(second));
        System.out.println(first == second);

        Integer maybeNull = null;
        if (maybeNull != null) {
            int value = maybeNull;
            System.out.println(value);
        }
    }
}
` }
]
});

Q.push({
id: 58, topic: "Java Fundamentals", title: "String methods",
intro: "Goal: work with text using common String methods and remember that String objects are immutable.",
levels: [
{ x: "A `String` stores text. Use `length()` to count characters and `charAt()` to access a character by zero-based index.",
c: J`public class Main {
    public static void main(String[] args) {
        String language = "Java";
        System.out.println(language.length());
        System.out.println(language.charAt(0));
        System.out.println(language.charAt(3));
    }
}
` },
{ x: "Use methods such as `toUpperCase()`, `toLowerCase()`, `contains()`, and `startsWith()` to inspect or transform text.",
c: J`public class Main {
    public static void main(String[] args) {
        String message = "Learn Java Today";
        System.out.println(message.toUpperCase());
        System.out.println(message.toLowerCase());
        System.out.println(message.contains("Java"));
        System.out.println(message.startsWith("Learn"));
    }
}
` },
{ x: "Strings are immutable: methods such as `trim()` and `replace()` return a new String. Store the returned value if you want to keep the change.",
c: J`public class Main {
    public static void main(String[] args) {
        String raw = "  Java Programming  ";
        String clean = raw.trim();
        String updated = clean.replace("Java", "Python");

        System.out.println("Original: [" + raw + "]");
        System.out.println("Clean: [" + clean + "]");
        System.out.println("Updated: " + updated);
    }
}
` },
{ x: "Compare String contents with `.equals()` or `.equalsIgnoreCase()`. The `==` operator checks whether two references point to the same object.",
c: J`public class Main {
    public static void main(String[] args) {
        String a = new String("java");
        String b = new String("java");

        System.out.println(a == b);
        System.out.println(a.equals(b));
        System.out.println(a.equalsIgnoreCase("JAVA"));
    }
}
` }
]
});

Q.push({
id: 59, topic: "Java Fundamentals", title: "StringBuilder for editable text",
intro: "Goal: build and modify text efficiently when many changes are needed.",
levels: [
{ x: "`StringBuilder` is a mutable sequence of characters. You can append text without creating a new String for every step.",
c: J`public class Main {
    public static void main(String[] args) {
        StringBuilder text = new StringBuilder();
        text.append("Learn");
        text.append(" ");
        text.append("Java");

        System.out.println(text);
    }
}
` },
{ x: "Use `append()`, `insert()`, and `delete()` to change the contents of a StringBuilder.",
c: J`public class Main {
    public static void main(String[] args) {
        StringBuilder text = new StringBuilder("Java");
        text.append(" Language");
        text.insert(0, "Learn ");
        text.delete(0, 6);

        System.out.println(text);
    }
}
` },
{ x: "Use `reverse()` to reverse the characters and `toString()` to obtain an immutable String result.",
c: J`public class Main {
    public static void main(String[] args) {
        StringBuilder word = new StringBuilder("Shikshak");
        word.reverse();

        String reversed = word.toString();
        System.out.println(reversed);
    }
}
` },
{ x: "For repeated concatenation inside loops, prefer StringBuilder over repeated String concatenation. It is generally more efficient for many updates.",
c: J`public class Main {
    public static void main(String[] args) {
        StringBuilder result = new StringBuilder();

        for (int i = 1; i <= 5; i++) {
            if (i > 1) result.append(", ");
            result.append(i * i);
        }

        System.out.println(result);
    }
}
` }
]
});

Q.push({
id: 60, topic: "Java Fundamentals", title: "Formatted output with printf",
intro: "Goal: display values neatly using format specifiers, field widths, and decimal precision.",
levels: [
{ x: "`System.out.printf()` prints formatted output. Use `%d` for integers, `%s` for strings, `%c` for characters, and `%f` for floating-point values.",
c: J`public class Main {
    public static void main(String[] args) {
        int age = 20;
        String name = "Anu";
        char grade = 'A';
        double score = 87.456;

        System.out.printf("%s %d %c %.2f%n", name, age, grade, score);
    }
}
` },
{ x: "Specify decimal precision with forms such as `%.2f`. The format `%.2f` displays two digits after the decimal point.",
c: J`public class Main {
    public static void main(String[] args) {
        double price = 125.5;
        double tax = 18.0;

        System.out.printf("Price: %.2f%n", price);
        System.out.printf("Tax: %.1f%%%n", tax);
    }
}
` },
{ x: "Use field widths to align columns. A positive width is right-aligned by default; a negative width is left-aligned.",
c: J`public class Main {
    public static void main(String[] args) {
        System.out.printf("%-12s %8s%n", "Item", "Price");
        System.out.printf("%-12s %8.2f%n", "Notebook", 45.5);
        System.out.printf("%-12s %8.2f%n", "Pen", 12.0);
    }
}
` },
{ x: "Combine formatted output with calculations, and use `%n` for a platform-independent line break.",
c: J`public class Main {
    public static void main(String[] args) {
        double[] marks = {85.5, 90.0, 78.5};
        double total = 0;

        for (double mark : marks) {
            total += mark;
        }

        double average = total / marks.length;
        System.out.printf("Total: %.2f%n", total);
        System.out.printf("Average: %.2f%%%n", average);
    }
}
` }
]
});

})();
