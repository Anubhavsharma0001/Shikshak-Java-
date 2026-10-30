(function () {
const J = String.raw;
window.QUESTIONS = window.QUESTIONS || [];
const Q = window.QUESTIONS;

Q.push({ id: 41, topic: "Arrays", title: "2D array: matrix sum and transpose",
intro: "Goal: store numbers in rows and columns (a matrix), then add them all and flip rows into columns. This is the doorway to grid problems in DSA.",
levels: [
{ x: "A 2D array is an array of arrays. `m[row][col]` picks one cell. Use two loops: the outer loop walks rows, the inner loop walks columns.",
c: J`public class Main {
    public static void main(String[] args) {
        int[][] m = { {1, 2, 3}, {4, 5, 6} };   // 2 rows, 3 columns
        System.out.println("Rows: " + m.length);
        System.out.println("Columns: " + m[0].length);
        for (int i = 0; i < m.length; i++) {
            for (int j = 0; j < m[i].length; j++) {
                System.out.print(m[i][j] + " ");
            }
            System.out.println();   // new line after each row
        }
    }
}
` },
{ x: "Add every cell using the same two loops, and keep a running total. Then build the transpose: the cell at (i, j) moves to (j, i).",
c: J`public class Main {
    public static void main(String[] args) {
        int[][] m = { {1, 2, 3}, {4, 5, 6} };
        int sum = 0;
        for (int i = 0; i < m.length; i++)
            for (int j = 0; j < m[0].length; j++)
                sum += m[i][j];
        System.out.println("Sum = " + sum);

        int[][] t = new int[m[0].length][m.length];   // rows and columns swap sizes
        for (int i = 0; i < m.length; i++)
            for (int j = 0; j < m[0].length; j++)
                t[j][i] = m[i][j];

        System.out.println("Transpose:");
        for (int[] row : t) {
            for (int x : row) System.out.print(x + " ");
            System.out.println();
        }
    }
}
` },
{ x: "Move the work into methods, and read the matrix from the keyboard. Input format: rows, columns, then all the numbers.",
c: J`import java.util.Scanner;

public class Main {
    static int sum(int[][] m) {
        int s = 0;
        for (int[] row : m) for (int x : row) s += x;
        return s;
    }

    static int[][] transpose(int[][] m) {
        int[][] t = new int[m[0].length][m.length];
        for (int i = 0; i < m.length; i++)
            for (int j = 0; j < m[0].length; j++)
                t[j][i] = m[i][j];
        return t;
    }

    static void print(int[][] m) {
        for (int[] row : m) {
            for (int x : row) System.out.print(x + " ");
            System.out.println();
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt(), c = sc.nextInt();
        int[][] m = new int[r][c];
        for (int i = 0; i < r; i++)
            for (int j = 0; j < c; j++)
                m[i][j] = sc.nextInt();
        System.out.println("Sum = " + sum(m));
        print(transpose(m));
    }
}
`, i: "2 3\n1 2 3\n4 5 6" },
{ x: "Advanced: print the main diagonal sum and the sum of each row. `Arrays.toString` and `Arrays.deepToString` print arrays quickly.",
c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[][] m = { {1, 2, 3}, {4, 5, 6}, {7, 8, 9} };
        int diag = 0;
        int[] rowSum = new int[m.length];
        for (int i = 0; i < m.length; i++) {
            diag += m[i][i];
            for (int j = 0; j < m[i].length; j++) rowSum[i] += m[i][j];
        }
        System.out.println(Arrays.deepToString(m));
        System.out.println("Diagonal sum = " + diag);
        System.out.println("Row sums = " + Arrays.toString(rowSum));
    }
}
` }
]});

Q.push({ id: 42, topic: "Recursion", title: "Sum of first n numbers (recursion)",
intro: "Goal: add 1 + 2 + ... + n. First with a loop, then with recursion, where a method calls itself on a smaller problem.",
levels: [
{ x: "Basics: a loop keeps a running total. This is the version you already know.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 5, sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += i;
        }
        System.out.println("Sum of 1 to " + n + " = " + sum);
    }
}
` },
{ x: "Read n from the keyboard. There is also a direct formula: n * (n + 1) / 2. Both must give the same answer.",
c: J`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int sum = 0;
        for (int i = 1; i <= n; i++) sum += i;
        System.out.println("Loop answer    = " + sum);
        System.out.println("Formula answer = " + (n * (n + 1) / 2));
    }
}
`, i: "10" },
{ x: "Recursion idea: sum(n) = n + sum(n - 1). It needs a base case, the smallest problem we can answer directly: sum(0) = 0. Without a base case the method calls itself forever and crashes.",
c: J`import java.util.Scanner;

public class Main {
    static int sum(int n) {
        if (n == 0) return 0;      // base case
        return n + sum(n - 1);     // smaller problem
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println("Sum = " + sum(n));
    }
}
`, i: "5" },
{ x: "Advanced: watch the recursion work. This version prints each call going down and each return coming back up, so you can trace sum(4) by hand.",
c: J`public class Main {
    static int sum(int n, int depth) {
        String pad = "  ".repeat(depth);
        System.out.println(pad + "call sum(" + n + ")");
        if (n == 0) {
            System.out.println(pad + "base case, return 0");
            return 0;
        }
        int result = n + sum(n - 1, depth + 1);
        System.out.println(pad + "sum(" + n + ") returns " + result);
        return result;
    }

    public static void main(String[] args) {
        System.out.println("Final answer = " + sum(4, 0));
    }
}
` }
]});

Q.push({ id: 43, topic: "Recursion", title: "Decimal to binary",
intro: "Goal: convert a number such as 10 into binary (1010). The idea is to divide by 2 again and again and collect the remainders.",
levels: [
{ x: "Basics: `n % 2` gives the last binary digit and `n / 2` removes it. Print the digits for 10 and notice they come out in reverse order.",
c: J`public class Main {
    public static void main(String[] args) {
        int n = 10;
        while (n > 0) {
            System.out.println(n + " / 2 -> remainder " + (n % 2));
            n = n / 2;
        }
    }
}
` },
{ x: "Fix the order by building the string from the front: put each new digit before the earlier ones. Handle 0 separately.",
c: J`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if (n == 0) { System.out.println("0"); return; }
        String bin = "";
        while (n > 0) {
            bin = (n % 2) + bin;    // add the new digit at the front
            n /= 2;
        }
        System.out.println("Binary = " + bin);
    }
}
`, i: "10" },
{ x: "Put it in a method. Java can also check you: `Integer.toBinaryString`.",
c: J`import java.util.Scanner;

public class Main {
    static String toBinary(int n) {
        if (n == 0) return "0";
        String bin = "";
        while (n > 0) { bin = (n % 2) + bin; n /= 2; }
        return bin;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println("Mine    : " + toBinary(n));
        System.out.println("Java's  : " + Integer.toBinaryString(n));
    }
}
`, i: "37" },
{ x: "Advanced: recursion does the reversing for you. Convert n / 2 first, then print the last digit n % 2 after it.",
c: J`import java.util.Scanner;

public class Main {
    static void toBinary(int n) {
        if (n == 0) return;        // base case
        toBinary(n / 2);           // earlier digits first
        System.out.print(n % 2);   // then this digit
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if (n == 0) System.out.print(0);
        else toBinary(n);
        System.out.println();
    }
}
`, i: "10" }
]});

Q.push({ id: 44, topic: "Recursion", title: "Tower of Hanoi",
intro: "Goal: move n disks from rod A to rod C using rod B, never placing a bigger disk on a smaller one. A classic that shows how recursion breaks a big problem into smaller copies of itself.",
levels: [
{ x: "Basics: with one disk the answer is a single move. Print it.",
c: J`public class Main {
    public static void main(String[] args) {
        System.out.println("Move disk 1 from A to C");
    }
}
` },
{ x: "With two disks: move the small disk out of the way to B, move the big disk to C, then put the small disk on top.",
c: J`public class Main {
    public static void main(String[] args) {
        System.out.println("Move disk 1 from A to B");
        System.out.println("Move disk 2 from A to C");
        System.out.println("Move disk 1 from B to C");
    }
}
` },
{ x: "General idea for n disks: move n-1 disks to the helper rod, move the biggest disk, then move the n-1 disks on top of it. Each step is the same problem with fewer disks, so one recursive method solves every n.",
c: J`import java.util.Scanner;

public class Main {
    static void hanoi(int n, char from, char to, char helper) {
        if (n == 0) return;                      // base case
        hanoi(n - 1, from, helper, to);          // step 1
        System.out.println("Move disk " + n + " from " + from + " to " + to);
        hanoi(n - 1, helper, to, from);          // step 3
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        hanoi(n, 'A', 'C', 'B');
    }
}
`, i: "3" },
{ x: "Advanced: count the moves. The answer is always 2^n - 1, so 10 disks need 1023 moves. Doubling for each extra disk is why recursion with two calls can grow so fast.",
c: J`public class Main {
    static int moves = 0;

    static void hanoi(int n, char from, char to, char helper) {
        if (n == 0) return;
        hanoi(n - 1, from, helper, to);
        moves++;
        hanoi(n - 1, helper, to, from);
    }

    public static void main(String[] args) {
        for (int n = 1; n <= 10; n++) {
            moves = 0;
            hanoi(n, 'A', 'C', 'B');
            System.out.println(n + " disks -> " + moves + " moves (2^n - 1 = " + ((1 << n) - 1) + ")");
        }
    }
}
` }
]});

Q.push({ id: 45, topic: "Searching & Sorting", title: "Selection sort",
intro: "Goal: sort an array by repeatedly picking the smallest remaining element and placing it at the front.",
levels: [
{ x: "Basics: finding the smallest element is the heart of selection sort. Start with the first value as the minimum and compare the rest.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {64, 25, 12, 22, 11};
        int minIndex = 0;
        for (int i = 1; i < a.length; i++) {
            if (a[i] < a[minIndex]) minIndex = i;
        }
        System.out.println("Smallest = " + a[minIndex] + " at index " + minIndex);
    }
}
` },
{ x: "Repeat for every position. For position i, find the smallest value from i to the end and swap it into place.",
c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] a = {64, 25, 12, 22, 11};
        for (int i = 0; i < a.length - 1; i++) {
            int min = i;
            for (int j = i + 1; j < a.length; j++)
                if (a[j] < a[min]) min = j;
            int tmp = a[i]; a[i] = a[min]; a[min] = tmp;
        }
        System.out.println(Arrays.toString(a));
    }
}
`},
{ x: "Make it a method and read the array from the keyboard. Input: size, then the numbers.",
c: J`import java.util.Arrays;
import java.util.Scanner;

public class Main {
    static void selectionSort(int[] a) {
        for (int i = 0; i < a.length - 1; i++) {
            int min = i;
            for (int j = i + 1; j < a.length; j++)
                if (a[j] < a[min]) min = j;
            int tmp = a[i]; a[i] = a[min]; a[min] = tmp;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        selectionSort(a);
        System.out.println(Arrays.toString(a));
    }
}
`, i: "6\n29 10 14 37 13 5" },
{ x: "Advanced: print the array after every pass to see the sorted part grow from the left. Selection sort always makes about n*n/2 comparisons, even on sorted input.",
c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] a = {64, 25, 12, 22, 11};
        for (int i = 0; i < a.length - 1; i++) {
            int min = i;
            for (int j = i + 1; j < a.length; j++)
                if (a[j] < a[min]) min = j;
            int tmp = a[i]; a[i] = a[min]; a[min] = tmp;
            System.out.println("After pass " + (i + 1) + ": " + Arrays.toString(a));
        }
    }
}
` }
]});

Q.push({ id: 46, topic: "Searching & Sorting", title: "Insertion sort",
intro: "Goal: sort like you sort playing cards in your hand, taking one card at a time and sliding it into the right place among the cards already sorted.",
levels: [
{ x: "Basics: insert one value into an already sorted list by shifting bigger values to the right.",
c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] a = {2, 5, 9, 0, 0};     // first three are sorted
        int key = 6;                    // new value to insert
        int j = 2;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];            // shift right
            j--;
        }
        a[j + 1] = key;
        System.out.println(Arrays.toString(a));
    }
}
` },
{ x: "Do that for every element starting from index 1. The left side is always sorted.",
c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] a = {12, 11, 13, 5, 6};
        for (int i = 1; i < a.length; i++) {
            int key = a[i];
            int j = i - 1;
            while (j >= 0 && a[j] > key) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = key;
        }
        System.out.println(Arrays.toString(a));
    }
}
` },
{ x: "Method version with keyboard input. Input: size, then the numbers.",
c: J`import java.util.Arrays;
import java.util.Scanner;

public class Main {
    static void insertionSort(int[] a) {
        for (int i = 1; i < a.length; i++) {
            int key = a[i], j = i - 1;
            while (j >= 0 && a[j] > key) { a[j + 1] = a[j]; j--; }
            a[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        insertionSort(a);
        System.out.println(Arrays.toString(a));
    }
}
`, i: "5\n9 3 7 1 5" },
{ x: "Advanced: the same idea written recursively. Sort the first n-1 elements, then insert the last one. This is exactly how a recursive solution is thought out: trust the smaller problem.",
c: J`import java.util.Arrays;

public class Main {
    static void sort(int[] a, int n) {
        if (n <= 1) return;            // base case
        sort(a, n - 1);                // sort the first n-1
        int key = a[n - 1], j = n - 2;
        while (j >= 0 && a[j] > key) { a[j + 1] = a[j]; j--; }
        a[j + 1] = key;                // insert the last one
    }

    public static void main(String[] args) {
        int[] a = {8, 4, 1, 9, 3};
        sort(a, a.length);
        System.out.println(Arrays.toString(a));
    }
}
` }
]});

Q.push({ id: 47, topic: "Arrays", title: "Find the missing number",
intro: "Goal: an array holds the numbers 1 to n with exactly one missing. Find it.",
levels: [
{ x: "Basics: for the array {1, 2, 4, 5} the missing number is 3. Check each number from 1 to n with a loop and see whether it exists.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2, 4, 5};
        int n = 5;
        for (int num = 1; num <= n; num++) {
            boolean found = false;
            for (int x : a) if (x == num) found = true;
            if (!found) System.out.println("Missing = " + num);
        }
    }
}
` },
{ x: "Smarter: the sum of 1 to n is n*(n+1)/2. Subtract the sum of the array and what remains is the missing number. One loop only.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2, 4, 5};
        int n = a.length + 1;
        int expected = n * (n + 1) / 2;
        int actual = 0;
        for (int x : a) actual += x;
        System.out.println("Missing = " + (expected - actual));
    }
}
` },
{ x: "Method with keyboard input. Input: the value of n, then the n-1 numbers that are present.",
c: J`import java.util.Scanner;

public class Main {
    static int missing(int[] a, int n) {
        int expected = n * (n + 1) / 2;
        for (int x : a) expected -= x;
        return expected;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n - 1];
        for (int i = 0; i < n - 1; i++) a[i] = sc.nextInt();
        System.out.println("Missing = " + missing(a, n));
    }
}
`, i: "6\n1 2 3 5 6" },
{ x: "Advanced: XOR trick. `x ^ x = 0` and `x ^ 0 = x`, so XOR of 1..n and all array values cancels everything except the missing number. It avoids overflow for very large n.",
c: J`public class Main {
    static int missing(int[] a, int n) {
        int x = 0;
        for (int i = 1; i <= n; i++) x ^= i;
        for (int v : a) x ^= v;
        return x;
    }

    public static void main(String[] args) {
        int[] a = {1, 2, 4, 5, 6};
        System.out.println("Missing = " + missing(a, 6));
    }
}
` }
]});

Q.push({ id: 48, topic: "Arrays", title: "Pair with a given sum",
intro: "Goal: find two numbers in an array that add up to a target value. This is the famous Two Sum problem.",
levels: [
{ x: "Basics: try every pair with two loops. Start the inner loop at i + 1 so you never pair a number with itself.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {2, 7, 11, 15};
        int target = 9;
        for (int i = 0; i < a.length; i++) {
            for (int j = i + 1; j < a.length; j++) {
                if (a[i] + a[j] == target) {
                    System.out.println("Pair: " + a[i] + " + " + a[j]);
                }
            }
        }
    }
}
` },
{ x: "Make it a method that returns the indices, or a message if no pair exists. Input: size, the numbers, then the target.",
c: J`import java.util.Scanner;

public class Main {
    static String findPair(int[] a, int target) {
        for (int i = 0; i < a.length; i++)
            for (int j = i + 1; j < a.length; j++)
                if (a[i] + a[j] == target)
                    return "Indices " + i + " and " + j;
        return "No pair found";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int target = sc.nextInt();
        System.out.println(findPair(a, target));
    }
}
`, i: "4\n3 2 4 1\n6" },
{ x: "Faster with a HashMap: while walking the array, ask whether `target - current` was already seen. One loop instead of two, which is the pattern DSA interviews expect.",
c: J`import java.util.HashMap;
import java.util.Map;

public class Main {
    static String findPair(int[] a, int target) {
        Map<Integer, Integer> seen = new HashMap<>();   // value -> index
        for (int i = 0; i < a.length; i++) {
            int need = target - a[i];
            if (seen.containsKey(need))
                return "Indices " + seen.get(need) + " and " + i;
            seen.put(a[i], i);
        }
        return "No pair found";
    }

    public static void main(String[] args) {
        System.out.println(findPair(new int[]{2, 7, 11, 15}, 9));
        System.out.println(findPair(new int[]{1, 2, 3}, 100));
    }
}
` },
{ x: "Advanced: if the array is already sorted, two pointers work without extra memory. Move the left pointer up when the sum is too small, the right pointer down when it is too big.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {1, 3, 4, 6, 8, 11};   // sorted
        int target = 10;
        int l = 0, r = a.length - 1;
        while (l < r) {
            int s = a[l] + a[r];
            if (s == target) {
                System.out.println("Pair: " + a[l] + " + " + a[r]);
                break;
            } else if (s < target) l++;
            else r--;
        }
    }
}
` }
]});

Q.push({ id: 49, topic: "Arrays", title: "Maximum subarray sum (Kadane)",
intro: "Goal: find the largest possible sum of a continuous part of an array. For {-2, 1, -3, 4, -1, 2, 1, -5, 4} the answer is 6 (from 4, -1, 2, 1).",
levels: [
{ x: "Basics: a subarray is a continuous slice. Use three loops: pick a start, pick an end, add everything in between.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        int best = a[0];
        for (int i = 0; i < a.length; i++) {
            for (int j = i; j < a.length; j++) {
                int sum = 0;
                for (int k = i; k <= j; k++) sum += a[k];
                if (sum > best) best = sum;
            }
        }
        System.out.println("Max sum = " + best);
    }
}
` },
{ x: "Remove the third loop: while extending the end j, keep adding to a running sum for the same start i.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        int best = a[0];
        for (int i = 0; i < a.length; i++) {
            int sum = 0;
            for (int j = i; j < a.length; j++) {
                sum += a[j];
                if (sum > best) best = sum;
            }
        }
        System.out.println("Max sum = " + best);
    }
}
` },
{ x: "Kadane's idea, in one loop: at each element either start fresh or extend the previous run, whichever is bigger. `current = max(a[i], current + a[i])`. Input: size, then the numbers.",
c: J`import java.util.Scanner;

public class Main {
    static int maxSubarray(int[] a) {
        int current = a[0], best = a[0];
        for (int i = 1; i < a.length; i++) {
            current = Math.max(a[i], current + a[i]);
            best = Math.max(best, current);
        }
        return best;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println("Max sum = " + maxSubarray(a));
    }
}
`, i: "9\n-2 1 -3 4 -1 2 1 -5 4" },
{ x: "Advanced: also remember where the best slice starts and ends, so you can print the actual elements.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        int current = a[0], best = a[0];
        int start = 0, bestStart = 0, bestEnd = 0;
        for (int i = 1; i < a.length; i++) {
            if (a[i] > current + a[i]) { current = a[i]; start = i; }
            else current += a[i];
            if (current > best) { best = current; bestStart = start; bestEnd = i; }
        }
        System.out.print("Max sum = " + best + " from [");
        for (int i = bestStart; i <= bestEnd; i++)
            System.out.print(a[i] + (i < bestEnd ? ", " : ""));
        System.out.println("]");
    }
}
` }
]});

Q.push({ id: 50, topic: "Arrays", title: "Move all zeros to the end",
intro: "Goal: push every 0 to the end of the array while keeping the other numbers in the same order. Example: {0, 1, 0, 3, 12} becomes {1, 3, 12, 0, 0}.",
levels: [
{ x: "Basics: use a second array. Copy the non-zero values first, and the rest stays 0 by default.",
c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] a = {0, 1, 0, 3, 12};
        int[] b = new int[a.length];   // filled with zeros
        int k = 0;
        for (int x : a) {
            if (x != 0) b[k++] = x;
        }
        System.out.println(Arrays.toString(b));
    }
}
` },
{ x: "Do it in the same array, without extra memory. Keep a write position `k`, copy each non-zero value there, then fill the remaining positions with 0.",
c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] a = {0, 1, 0, 3, 12};
        int k = 0;
        for (int i = 0; i < a.length; i++)
            if (a[i] != 0) a[k++] = a[i];
        while (k < a.length) a[k++] = 0;
        System.out.println(Arrays.toString(a));
    }
}
` },
{ x: "Method with keyboard input. This version swaps instead of copying, so each element moves at most once. Input: size, then the numbers.",
c: J`import java.util.Arrays;
import java.util.Scanner;

public class Main {
    static void moveZeros(int[] a) {
        int k = 0;                           // next place for a non-zero
        for (int i = 0; i < a.length; i++) {
            if (a[i] != 0) {
                int tmp = a[i]; a[i] = a[k]; a[k] = tmp;
                k++;
            }
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        moveZeros(a);
        System.out.println(Arrays.toString(a));
    }
}
`, i: "7\n0 4 0 0 5 6 0" },
{ x: "Advanced: the same problem solved recursively on the index. Handle one element, then ask recursion to handle the rest. Practice thinking this way, because DSA uses it everywhere.",
c: J`import java.util.Arrays;

public class Main {
    // returns how many non-zero values were placed
    static int place(int[] a, int i, int k) {
        if (i == a.length) return k;               // base case
        if (a[i] != 0) a[k++] = a[i];
        return place(a, i + 1, k);
    }

    public static void main(String[] args) {
        int[] a = {0, 1, 0, 3, 12};
        int k = place(a, 0, 0);
        for (int i = k; i < a.length; i++) a[i] = 0;
        System.out.println(Arrays.toString(a));
    }
}
` }
]});

})();
