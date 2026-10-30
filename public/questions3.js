(function () {
const J = String.raw;
window.QUESTIONS = window.QUESTIONS || [];
const Q = window.QUESTIONS;

Q.push({ id: 21, topic: "Arrays", title: "Sum of array elements",
intro: "Goal: add up all numbers stored in an array.",
levels: [
{ x: "An array stores many values of the same type. Indexes start at 0. `arr.length` is the size.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] arr = {4, 8, 15, 16, 23};
        System.out.println(arr[0]);        // 4 (first)
        System.out.println(arr[4]);        // 23 (last)
        System.out.println(arr.length);    // 5
    }
}
` },
{ x: "Loop over every index and add the element to `sum`.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] arr = {4, 8, 15, 16, 23};
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        System.out.println("Sum = " + sum);
    }
}
` },
{ x: "Read the array from the keyboard (first the size, then the elements) and use a method. Input box: first line is the size, second line the elements.",
c: J`import java.util.Scanner;

public class Main {
    static int sum(int[] a) {
        int s = 0;
        for (int x : a) s += x;      // for-each loop
        return s;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println("Sum = " + sum(a));
    }
}
`, i: "5\n1 2 3 4 5" },
{ x: "Recursion: sum of the first `n` elements = last element + sum of the first `n-1` elements. Streams do it in one line.",
c: J`import java.util.Arrays;

public class Main {
    static int sum(int[] a, int n) {
        if (n == 0) return 0;
        return a[n - 1] + sum(a, n - 1);
    }

    public static void main(String[] args) {
        int[] a = {4, 8, 15, 16, 23};
        System.out.println(sum(a, a.length));
        System.out.println(Arrays.stream(a).sum());
    }
}
` }
]});

Q.push({ id: 22, topic: "Arrays", title: "Largest element in an array",
intro: "Goal: find the maximum value stored in an array.",
levels: [
{ x: "Compare two array elements using `>`.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] arr = {3, 9, 2};
        System.out.println(arr[0] > arr[1] ? arr[0] : arr[1]);   // 9
    }
}
` },
{ x: "Assume the first element is the largest. Walk through the rest and update `max` whenever you see a bigger one.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] arr = {3, 9, 2, 14, 7, 5};
        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
        }
        System.out.println("Largest = " + max);
    }
}
` },
{ x: "Method with keyboard input. It returns the maximum value. Also the index of the max is often useful.",
c: J`import java.util.Scanner;

public class Main {
    static int maxIndex(int[] a) {
        int idx = 0;
        for (int i = 1; i < a.length; i++) {
            if (a[i] > a[idx]) idx = i;
        }
        return idx;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int i = maxIndex(a);
        System.out.println("Largest = " + a[i] + " at index " + i);
    }
}
`, i: "6\n3 9 2 14 7 5" },
{ x: "Recursive version, and the one-line stream version.",
c: J`import java.util.Arrays;

public class Main {
    static int max(int[] a, int n) {
        if (n == 1) return a[0];
        return Math.max(a[n - 1], max(a, n - 1));
    }

    public static void main(String[] args) {
        int[] a = {3, 9, 2, 14, 7, 5};
        System.out.println(max(a, a.length));
        System.out.println(Arrays.stream(a).max().getAsInt());
    }
}
` }
]});

Q.push({ id: 23, topic: "Arrays", title: "Reverse an array",
intro: "Goal: {1,2,3,4,5} becomes {5,4,3,2,1}.",
levels: [
{ x: "Reversing starts with swapping the first and last elements.",
c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 5};
        int temp = a[0];
        a[0] = a[4];
        a[4] = temp;
        System.out.println(Arrays.toString(a));
    }
}
` },
{ x: "Two pointers: `left` starts at the beginning, `right` at the end. Swap, then move both inward until they meet.",
c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 5};
        int left = 0, right = a.length - 1;
        while (left < right) {
            int temp = a[left];
            a[left] = a[right];
            a[right] = temp;
            left++;
            right--;
        }
        System.out.println(Arrays.toString(a));
    }
}
` },
{ x: "A method that reverses the array in place (arrays are shared with the caller, so the change is visible in `main`).",
c: J`import java.util.Arrays;
import java.util.Scanner;

public class Main {
    static void reverse(int[] a) {
        for (int l = 0, r = a.length - 1; l < r; l++, r--) {
            int t = a[l]; a[l] = a[r]; a[r] = t;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        reverse(a);
        System.out.println(Arrays.toString(a));
    }
}
`, i: "5\n10 20 30 40 50" },
{ x: "Recursive reverse: swap the two ends, then reverse the middle part.",
c: J`import java.util.Arrays;

public class Main {
    static void reverse(int[] a, int l, int r) {
        if (l >= r) return;
        int t = a[l]; a[l] = a[r]; a[r] = t;
        reverse(a, l + 1, r - 1);
    }

    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 5, 6};
        reverse(a, 0, a.length - 1);
        System.out.println(Arrays.toString(a));
    }
}
` }
]});

Q.push({ id: 24, topic: "Searching & Sorting", title: "Linear search",
intro: "Goal: find the position of a value in an array, or report that it is missing.",
levels: [
{ x: "Check one element against the value you want.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {4, 8, 15, 16, 23};
        int key = 15;
        System.out.println(a[2] == key);   // true
    }
}
` },
{ x: "Check every element from left to right. Stop as soon as you find it.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {4, 8, 15, 16, 23};
        int key = 16;
        int index = -1;
        for (int i = 0; i < a.length; i++) {
            if (a[i] == key) {
                index = i;
                break;
            }
        }
        System.out.println(index == -1 ? "Not found" : "Found at index " + index);
    }
}
` },
{ x: "Method returning the index, or -1 when not found. -1 is the usual 'not found' signal because no real index is negative.",
c: J`import java.util.Scanner;

public class Main {
    static int search(int[] a, int key) {
        for (int i = 0; i < a.length; i++) {
            if (a[i] == key) return i;
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int key = sc.nextInt();
        System.out.println(search(a, key));
    }
}
`, i: "5\n4 8 15 16 23\n16" },
{ x: "Recursive search, and counting how many times the value appears.",
c: J`public class Main {
    static int search(int[] a, int i, int key) {
        if (i == a.length) return -1;
        if (a[i] == key) return i;
        return search(a, i + 1, key);
    }

    static int count(int[] a, int key) {
        int c = 0;
        for (int x : a) if (x == key) c++;
        return c;
    }

    public static void main(String[] args) {
        int[] a = {4, 8, 15, 8, 23, 8};
        System.out.println("First index of 8: " + search(a, 0, 8));
        System.out.println("Times 8 appears: " + count(a, 8));
    }
}
` }
]});

Q.push({ id: 25, topic: "Searching & Sorting", title: "Binary search",
intro: "Goal: search very fast in a sorted array by halving the search area each time. It is one of the most important algorithms for DSA.",
levels: [
{ x: "Look at the middle element. If the key is bigger, it must be in the right half, otherwise the left half. The middle index is `(low + high) / 2`.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {2, 5, 8, 12, 16, 23, 38};
        int low = 0, high = a.length - 1;
        int mid = (low + high) / 2;
        System.out.println("Middle index " + mid + " holds " + a[mid]);
    }
}
` },
{ x: "Repeat the halving in a loop until the range is empty.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {2, 5, 8, 12, 16, 23, 38};
        int key = 23;
        int low = 0, high = a.length - 1, found = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;   // safe from overflow
            if (a[mid] == key) { found = mid; break; }
            else if (a[mid] < key) low = mid + 1;
            else high = mid - 1;
        }
        System.out.println(found == -1 ? "Not found" : "Found at index " + found);
    }
}
` },
{ x: "Method version with input (the array must be sorted).",
c: J`import java.util.Scanner;

public class Main {
    static int binarySearch(int[] a, int key) {
        int low = 0, high = a.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (a[mid] == key) return mid;
            if (a[mid] < key) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(binarySearch(a, sc.nextInt()));
    }
}
`, i: "7\n2 5 8 12 16 23 38\n23" },
{ x: "Recursive binary search, and the built in `Arrays.binarySearch`.",
c: J`import java.util.Arrays;

public class Main {
    static int search(int[] a, int low, int high, int key) {
        if (low > high) return -1;
        int mid = low + (high - low) / 2;
        if (a[mid] == key) return mid;
        if (a[mid] < key) return search(a, mid + 1, high, key);
        return search(a, low, mid - 1, key);
    }

    public static void main(String[] args) {
        int[] a = {2, 5, 8, 12, 16, 23, 38};
        System.out.println(search(a, 0, a.length - 1, 12));
        System.out.println(Arrays.binarySearch(a, 12));
    }
}
` }
]});

Q.push({ id: 26, topic: "Searching & Sorting", title: "Bubble sort",
intro: "Goal: sort an array in increasing order by repeatedly swapping neighbours that are in the wrong order.",
levels: [
{ x: "One pass: compare each neighbouring pair and swap if the left one is bigger. After one pass the biggest value reaches the end.",
c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] a = {5, 3, 8, 1, 2};
        for (int j = 0; j < a.length - 1; j++) {
            if (a[j] > a[j + 1]) {
                int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
            }
        }
        System.out.println(Arrays.toString(a));   // biggest (8) is at the end
    }
}
` },
{ x: "Repeat the pass `n - 1` times. Each pass can ignore the already sorted end.",
c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] a = {5, 3, 8, 1, 2};
        int n = a.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                if (a[j] > a[j + 1]) {
                    int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
                }
            }
        }
        System.out.println(Arrays.toString(a));
    }
}
` },
{ x: "A method with an early exit: if a full pass makes no swap, the array is already sorted, so stop.",
c: J`import java.util.Arrays;
import java.util.Scanner;

public class Main {
    static void bubbleSort(int[] a) {
        for (int i = 0; i < a.length - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < a.length - 1 - i; j++) {
                if (a[j] > a[j + 1]) {
                    int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        bubbleSort(a);
        System.out.println(Arrays.toString(a));
    }
}
`, i: "6\n64 25 12 22 11 90" },
{ x: "Recursive bubble sort: do one pass, then sort the first `n-1` elements. In real programs use `Arrays.sort`.",
c: J`import java.util.Arrays;

public class Main {
    static void bubble(int[] a, int n) {
        if (n == 1) return;
        for (int j = 0; j < n - 1; j++) {
            if (a[j] > a[j + 1]) {
                int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
            }
        }
        bubble(a, n - 1);
    }

    public static void main(String[] args) {
        int[] a = {9, 4, 7, 1, 8, 2};
        bubble(a, a.length);
        System.out.println(Arrays.toString(a));

        int[] b = {9, 4, 7, 1, 8, 2};
        Arrays.sort(b);
        System.out.println(Arrays.toString(b));
    }
}
` }
]});

Q.push({ id: 27, topic: "Arrays", title: "Second largest element",
intro: "Goal: find the second biggest value without sorting the whole array.",
levels: [
{ x: "First solve the simpler problem: find the largest value.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {12, 35, 1, 10, 34, 1};
        int max = a[0];
        for (int x : a) if (x > max) max = x;
        System.out.println("Largest = " + max);
    }
}
` },
{ x: "Track two values in one pass: `first` and `second`. When you meet a new biggest, the old biggest becomes second.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {12, 35, 1, 10, 34, 1};
        int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
        for (int x : a) {
            if (x > first) {
                second = first;
                first = x;
            } else if (x > second && x != first) {
                second = x;
            }
        }
        System.out.println("Second largest = " + second);
    }
}
` },
{ x: "Method version. It returns `Integer.MIN_VALUE` when there is no second largest (for example all elements are equal).",
c: J`import java.util.Scanner;

public class Main {
    static int secondLargest(int[] a) {
        int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
        for (int x : a) {
            if (x > first) { second = first; first = x; }
            else if (x > second && x != first) second = x;
        }
        return second;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int r = secondLargest(a);
        System.out.println(r == Integer.MIN_VALUE ? "No second largest" : "Second largest = " + r);
    }
}
`, i: "6\n12 35 1 10 34 1" },
{ x: "Generalise to the k-th largest distinct element by sorting and using a `TreeSet`.",
c: J`import java.util.TreeSet;

public class Main {
    static int kthLargest(int[] a, int k) {
        TreeSet<Integer> set = new TreeSet<>();
        for (int x : a) set.add(x);                 // sorted and unique
        Integer[] sorted = set.toArray(new Integer[0]);
        if (k > sorted.length) return -1;
        return sorted[sorted.length - k];
    }

    public static void main(String[] args) {
        int[] a = {12, 35, 1, 10, 34, 1};
        System.out.println("2nd largest: " + kthLargest(a, 2));
        System.out.println("3rd largest: " + kthLargest(a, 3));
    }
}
` }
]});

Q.push({ id: 28, topic: "Arrays", title: "Count even and odd numbers in an array",
intro: "Goal: count how many elements are even and how many are odd.",
levels: [
{ x: "Remember: a number is even if `n % 2 == 0`.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {3, 8, 5};
        System.out.println(a[0] % 2 == 0);   // false
        System.out.println(a[1] % 2 == 0);   // true
    }
}
` },
{ x: "Keep two counters and loop through the array.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 5, 6, 7};
        int even = 0, odd = 0;
        for (int x : a) {
            if (x % 2 == 0) even++;
            else odd++;
        }
        System.out.println("Even = " + even + ", Odd = " + odd);
    }
}
` },
{ x: "A method can return two values by returning an array `{even, odd}`.",
c: J`import java.util.Scanner;

public class Main {
    static int[] countEvenOdd(int[] a) {
        int[] r = new int[2];
        for (int x : a) {
            if (x % 2 == 0) r[0]++;
            else r[1]++;
        }
        return r;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int[] r = countEvenOdd(a);
        System.out.println("Even = " + r[0] + ", Odd = " + r[1]);
    }
}
`, i: "7\n1 2 3 4 5 6 7" },
{ x: "Recursive count of evens, and a stream with `filter`.",
c: J`import java.util.Arrays;

public class Main {
    static int countEven(int[] a, int i) {
        if (i == a.length) return 0;
        return (a[i] % 2 == 0 ? 1 : 0) + countEven(a, i + 1);
    }

    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 5, 6, 7};
        System.out.println(countEven(a, 0));
        System.out.println(Arrays.stream(a).filter(x -> x % 2 == 0).count());
    }
}
` }
]});

Q.push({ id: 29, topic: "Arrays", title: "Find duplicate elements",
intro: "Goal: detect which values appear more than once in an array.",
levels: [
{ x: "A duplicate means two different positions hold the same value. Compare two elements.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2, 3, 2};
        System.out.println(a[1] == a[3]);   // true: 2 appears twice
    }
}
` },
{ x: "Brute force: compare every pair of positions `i` and `j`. Simple, but slow for large arrays.",
c: J`public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2, 3, 2, 4, 1};
        for (int i = 0; i < a.length; i++) {
            for (int j = i + 1; j < a.length; j++) {
                if (a[i] == a[j]) {
                    System.out.println("Duplicate: " + a[i]);
                    break;
                }
            }
        }
    }
}
` },
{ x: "A `HashSet` remembers what you saw. `add` returns `false` if the value is already there. One pass only.",
c: J`import java.util.HashSet;
import java.util.Scanner;

public class Main {
    static boolean hasDuplicate(int[] a) {
        HashSet<Integer> seen = new HashSet<>();
        for (int x : a) {
            if (!seen.add(x)) return true;
        }
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(hasDuplicate(a) ? "Has duplicate" : "All unique");
    }
}
`, i: "5\n1 2 3 4 2" },
{ x: "Sort first and compare neighbours, or print each duplicate only once with a set.",
c: J`import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        int[] a = {4, 1, 3, 4, 2, 1, 4};

        int[] b = a.clone();
        Arrays.sort(b);
        for (int i = 1; i < b.length; i++) {
            if (b[i] == b[i - 1]) System.out.print(b[i] + " ");
        }
        System.out.println("(neighbours after sorting)");

        HashSet<Integer> seen = new HashSet<>();
        LinkedHashSet<Integer> dups = new LinkedHashSet<>();
        for (int x : a) {
            if (!seen.add(x)) dups.add(x);
        }
        System.out.println("Distinct duplicates: " + dups);
    }
}
` }
]});

Q.push({ id: 30, topic: "Arrays", title: "Rotate an array",
intro: "Goal: rotate left by k positions. {1,2,3,4,5} rotated left by 2 becomes {3,4,5,1,2}.",
levels: [
{ x: "Start with rotating by 1: save the first element, shift everything left, put the saved element at the end.",
c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 5};
        int first = a[0];
        for (int i = 0; i < a.length - 1; i++) a[i] = a[i + 1];
        a[a.length - 1] = first;
        System.out.println(Arrays.toString(a));
    }
}
` },
{ x: "Rotate by k using a second array. The element at index `i` moves to index `(i - k + n) % n`.",
c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 5};
        int k = 2, n = a.length;
        int[] b = new int[n];
        for (int i = 0; i < n; i++) {
            b[(i - k % n + n) % n] = a[i];
        }
        System.out.println(Arrays.toString(b));
    }
}
` },
{ x: "Method that rotates left by k, using the modulo to handle k larger than the array size. Input: size, elements, k.",
c: J`import java.util.Arrays;
import java.util.Scanner;

public class Main {
    static int[] rotateLeft(int[] a, int k) {
        int n = a.length;
        int[] b = new int[n];
        k = k % n;
        for (int i = 0; i < n; i++) b[i] = a[(i + k) % n];
        return b;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int k = sc.nextInt();
        System.out.println(Arrays.toString(rotateLeft(a, k)));
    }
}
`, i: "5\n1 2 3 4 5\n2" },
{ x: "The reversal algorithm rotates in place with no extra array: reverse the first k elements, reverse the rest, then reverse everything. Memory use is O(1).",
c: J`import java.util.Arrays;

public class Main {
    static void reverse(int[] a, int l, int r) {
        while (l < r) {
            int t = a[l]; a[l] = a[r]; a[r] = t;
            l++; r--;
        }
    }

    static void rotateLeft(int[] a, int k) {
        int n = a.length;
        k %= n;
        reverse(a, 0, k - 1);
        reverse(a, k, n - 1);
        reverse(a, 0, n - 1);
    }

    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 5, 6, 7};
        rotateLeft(a, 3);
        System.out.println(Arrays.toString(a));   // [4, 5, 6, 7, 1, 2, 3]
    }
}
` }
]});

})();
