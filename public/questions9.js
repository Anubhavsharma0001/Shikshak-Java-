(function () {
  const J = String.raw;
  window.QUESTIONS = window.QUESTIONS || [];
  const Q = window.QUESTIONS;

  Q.push(
    {
      id: 71,
      topic: "Arrays & Strings",
      title: "Array Declaration and Initialization",
      intro: "Learn how to create arrays and store multiple values of the same type.",
      levels: [
        {
          x: "An array stores multiple values of the same data type in a single variable. Array indexing starts from 0.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40};

        System.out.println(numbers[0]);
        System.out.println(numbers[2]);
    }
}`
        },
        {
          x: "You can declare an array first and initialize it later using the new keyword.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[] marks = new int[3];

        marks[0] = 85;
        marks[1] = 90;
        marks[2] = 78;

        System.out.println(marks[0]);
        System.out.println(marks[1]);
        System.out.println(marks[2]);
    }
}`
        },
        {
          x: "The length property tells you how many elements an array can hold.",
          c: J`public class Main {
    public static void main(String[] args) {
        String[] names = {"Aman", "Riya", "Rahul"};

        System.out.println("Array length: " + names.length);

        for (int i = 0; i < names.length; i++) {
            System.out.println(names[i]);
        }
    }
}`
        },
        {
          x: "Create an array, update one of its elements, and print the updated array values.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[] values = {5, 10, 15, 20};

        values[1] = 50;

        for (int value : values) {
            System.out.println(value);
        }
    }
}`
        }
      ]
    },
    {
      id: 72,
      topic: "Arrays & Strings",
      title: "Traversing Arrays",
      intro: "Learn different ways to visit every element of an array.",
      levels: [
        {
          x: "A for loop can access each array element using its index.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30};

        for (int i = 0; i < arr.length; i++) {
            System.out.println(arr[i]);
        }
    }
}`
        },
        {
          x: "An enhanced for loop visits each element without manually managing an index.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8};

        for (int num : arr) {
            System.out.println(num);
        }
    }
}`
        },
        {
          x: "You can calculate the sum of all elements while traversing an array.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40};
        int sum = 0;

        for (int num : arr) {
            sum += num;
        }

        System.out.println("Sum: " + sum);
    }
}`
        },
        {
          x: "Traverse an array and count how many elements are even and how many are odd.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6};
        int even = 0;
        int odd = 0;

        for (int num : arr) {
            if (num % 2 == 0) {
                even++;
            } else {
                odd++;
            }
        }

        System.out.println("Even: " + even);
        System.out.println("Odd: " + odd);
    }
}`
        }
      ]
    },
    {
      id: 73,
      topic: "Arrays & Strings",
      title: "Maximum, Minimum and Sum",
      intro: "Find the largest, smallest and total value in an array.",
      levels: [
        {
          x: "Initialize the maximum with the first array element and compare every element with it.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[] arr = {12, 45, 7, 89, 23};
        int max = arr[0];

        for (int num : arr) {
            if (num > max) {
                max = num;
            }
        }

        System.out.println("Maximum: " + max);
    }
}`
        },
        {
          x: "To find the minimum, update the minimum value whenever a smaller element is found.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[] arr = {12, 45, 7, 89, 23};
        int min = arr[0];

        for (int num : arr) {
            if (num < min) {
                min = num;
            }
        }

        System.out.println("Minimum: " + min);
    }
}`
        },
        {
          x: "You can calculate sum, maximum and minimum in one traversal of the array.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 5, 40, 15};

        int sum = 0;
        int max = arr[0];
        int min = arr[0];

        for (int num : arr) {
            sum += num;

            if (num > max) max = num;
            if (num < min) min = num;
        }

        System.out.println("Sum: " + sum);
        System.out.println("Maximum: " + max);
        System.out.println("Minimum: " + min);
    }
}`
        },
        {
          x: "Calculate the average of array elements using the sum and array length.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40};
        int sum = 0;

        for (int num : arr) {
            sum += num;
        }

        double average = (double) sum / arr.length;

        System.out.println("Average: " + average);
    }
}`
        }
      ]
    },
    {
      id: 74,
      topic: "Arrays & Strings",
      title: "Linear Search",
      intro: "Search for an element by checking array values one by one.",
      levels: [
        {
          x: "Linear search checks each element until the target is found or the array ends.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40};
        int target = 30;
        int index = -1;

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                index = i;
                break;
            }
        }

        System.out.println(index);
    }
}`
        },
        {
          x: "If the target is not found, the index remains -1.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[] arr = {5, 15, 25, 35};
        int target = 100;
        boolean found = false;

        for (int num : arr) {
            if (num == target) {
                found = true;
                break;
            }
        }

        System.out.println(found ? "Found" : "Not found");
    }
}`
        },
        {
          x: "Linear search can return the position of the first occurrence of a repeated value.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[] arr = {4, 8, 4, 12, 4};
        int target = 4;

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                System.out.println("First index: " + i);
                break;
            }
        }
    }
}`
        },
        {
          x: "Linear search works on both sorted and unsorted arrays. Its worst-case time complexity is O(n).",
          c: J`public class Main {
    static int search(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {17, 3, 29, 8, 12};

        System.out.println(search(arr, 29));
        System.out.println(search(arr, 100));
    }
}`
        }
      ]
    },
    {
      id: 75,
      topic: "Arrays & Strings",
      title: "Binary Search",
      intro: "Learn an efficient searching technique for sorted arrays.",
      levels: [
        {
          x: "Binary search works on sorted arrays. It repeatedly divides the search range into half.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};

        int left = 0;
        int right = arr.length - 1;
        int target = 40;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                System.out.println("Found at index " + mid);
                break;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
}`
        },
        {
          x: "If the middle element is smaller than the target, search the right half. Otherwise, search the left half.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8, 10, 12};
        int target = 6;

        int left = 0;
        int right = arr.length - 1;
        int answer = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                answer = mid;
                break;
            }

            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        System.out.println(answer);
    }
}`
        },
        {
          x: "Java provides Arrays.binarySearch() for searching a value in a sorted array.",
          c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};

        int index = Arrays.binarySearch(arr, 30);

        System.out.println(index);
    }
}`
        },
        {
          x: "Binary search has O(log n) time complexity. The array must be sorted before searching.",
          c: J`public class Main {
    static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) return mid;

            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {3, 7, 11, 15, 19, 23};

        System.out.println(binarySearch(arr, 15));
    }
}`
        }
      ]
    },
    {
      id: 76,
      topic: "Arrays & Strings",
      title: "Two-Dimensional Arrays",
      intro: "Understand matrices and arrays containing rows and columns.",
      levels: [
        {
          x: "A two-dimensional array stores values in rows and columns.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6}
        };

        System.out.println(matrix[0][0]);
        System.out.println(matrix[1][2]);
    }
}`
        },
        {
          x: "Use nested loops to traverse every element in a matrix.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2},
            {3, 4},
            {5, 6}
        };

        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}`
        },
        {
          x: "You can calculate the sum of all elements in a two-dimensional array.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6}
        };

        int sum = 0;

        for (int[] row : matrix) {
            for (int value : row) {
                sum += value;
            }
        }

        System.out.println("Sum: " + sum);
    }
}`
        },
        {
          x: "Find the sum of each row separately using nested loops.",
          c: J`public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {2, 4, 6},
            {1, 3, 5},
            {10, 20, 30}
        };

        for (int i = 0; i < matrix.length; i++) {
            int rowSum = 0;

            for (int j = 0; j < matrix[i].length; j++) {
                rowSum += matrix[i][j];
            }

            System.out.println("Row " + i + ": " + rowSum);
        }
    }
}`
        }
      ]
    },
    {
      id: 77,
      topic: "Arrays & Strings",
      title: "String Traversal and Character Frequency",
      intro: "Learn to access individual characters and count their occurrences.",
      levels: [
        {
          x: "The charAt() method returns the character at a given index in a string.",
          c: J`public class Main {
    public static void main(String[] args) {
        String name = "JAVA";

        for (int i = 0; i < name.length(); i++) {
            System.out.println(name.charAt(i));
        }
    }
}`
        },
        {
          x: "Convert a string to uppercase or lowercase using built-in methods.",
          c: J`public class Main {
    public static void main(String[] args) {
        String text = "Hello Java";

        System.out.println(text.toUpperCase());
        System.out.println(text.toLowerCase());
    }
}`
        },
        {
          x: "Count how many times a particular character appears in a string.",
          c: J`public class Main {
    public static void main(String[] args) {
        String text = "programming";
        char target = 'm';
        int count = 0;

        for (int i = 0; i < text.length(); i++) {
            if (text.charAt(i) == target) {
                count++;
            }
        }

        System.out.println(count);
    }
}`
        },
        {
          x: "Count the vowels in a string by checking each character.",
          c: J`public class Main {
    public static void main(String[] args) {
        String text = "Hello Java".toLowerCase();
        int vowels = 0;

        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);

            if (ch == 'a' || ch == 'e' || ch == 'i'
                    || ch == 'o' || ch == 'u') {
                vowels++;
            }
        }

        System.out.println("Vowels: " + vowels);
    }
}`
        }
      ]
    },
    {
      id: 78,
      topic: "Arrays & Strings",
      title: "Palindrome and Anagram",
      intro: "Practice two popular string problems used in coding interviews.",
      levels: [
        {
          x: "A palindrome reads the same forward and backward, such as madam.",
          c: J`public class Main {
    public static void main(String[] args) {
        String text = "madam";
        String reversed = "";

        for (int i = text.length() - 1; i >= 0; i--) {
            reversed += text.charAt(i);
        }

        System.out.println(text.equals(reversed));
    }
}`
        },
        {
          x: "Use two pointers to compare characters from both ends of a string.",
          c: J`public class Main {
    public static void main(String[] args) {
        String text = "level";
        int left = 0;
        int right = text.length() - 1;
        boolean palindrome = true;

        while (left < right) {
            if (text.charAt(left) != text.charAt(right)) {
                palindrome = false;
                break;
            }

            left++;
            right--;
        }

        System.out.println(palindrome);
    }
}`
        },
        {
          x: "Two strings are anagrams when they contain the same characters with the same frequencies.",
          c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        String a = "listen";
        String b = "silent";

        char[] first = a.toCharArray();
        char[] second = b.toCharArray();

        Arrays.sort(first);
        Arrays.sort(second);

        System.out.println(Arrays.equals(first, second));
    }
}`
        },
        {
          x: "Before checking anagrams, normalize the strings so that spaces and letter case do not affect the result.",
          c: J`import java.util.Arrays;

public class Main {
    static boolean isAnagram(String a, String b) {
        a = a.replaceAll("\\\\s", "").toLowerCase();
        b = b.replaceAll("\\\\s", "").toLowerCase();

        if (a.length() != b.length()) return false;

        char[] first = a.toCharArray();
        char[] second = b.toCharArray();

        Arrays.sort(first);
        Arrays.sort(second);

        return Arrays.equals(first, second);
    }

    public static void main(String[] args) {
        System.out.println(isAnagram("Dormitory", "Dirty room"));
    }
}`
        }
      ]
    },
    {
      id: 79,
      topic: "Arrays & Strings",
      title: "StringBuilder Practical",
      intro: "Use StringBuilder to modify strings efficiently.",
      levels: [
        {
          x: "StringBuilder is mutable, meaning its contents can be changed without creating a new string every time.",
          c: J`public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Java");

        sb.append(" Programming");

        System.out.println(sb);
    }
}`
        },
        {
          x: "Use insert(), delete() and replace() to modify text.",
          c: J`public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Hello World");

        sb.insert(6, "Java ");
        System.out.println(sb);

        sb.delete(6, 11);
        System.out.println(sb);

        sb.replace(6, 11, "India");
        System.out.println(sb);
    }
}`
        },
        {
          x: "The reverse() method reverses the characters in a StringBuilder.",
          c: J`public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("program");

        sb.reverse();

        System.out.println(sb);
    }
}`
        },
        {
          x: "StringBuilder is useful when repeatedly building or modifying text, such as inside loops.",
          c: J`public class Main {
    public static void main(String[] args) {
        String[] words = {"Learn", "Java", "Step", "By", "Step"};

        StringBuilder result = new StringBuilder();

        for (String word : words) {
            if (result.length() > 0) {
                result.append(" ");
            }
            result.append(word);
        }

        System.out.println(result);
    }
}`
        }
      ]
    },
    {
      id: 80,
      topic: "Arrays & Strings",
      title: "Sorting Arrays with Java Utilities",
      intro: "Learn how to sort arrays using Java's built-in Arrays utility class.",
      levels: [
        {
          x: "Arrays.sort() sorts an integer array in ascending order.",
          c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] arr = {5, 2, 9, 1, 7};

        Arrays.sort(arr);

        System.out.println(Arrays.toString(arr));
    }
}`
        },
        {
          x: "Arrays.toString() converts an array into a readable string representation.",
          c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        String[] names = {"Riya", "Aman", "Karan"};

        Arrays.sort(names);

        System.out.println(Arrays.toString(names));
    }
}`
        },
        {
          x: "You can sort an array in descending order by sorting its boxed Integer values and using reverseOrder().",
          c: J`import java.util.Arrays;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        Integer[] arr = {5, 2, 9, 1, 7};

        Arrays.sort(arr, Collections.reverseOrder());

        System.out.println(Arrays.toString(arr));
    }
}`
        },
        {
          x: "Arrays.equals() compares array contents, while Arrays.copyOf() creates a copy of an array.",
          c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] original = {10, 20, 30};

        int[] copy = Arrays.copyOf(original, original.length);

        System.out.println(Arrays.equals(original, copy));

        copy[0] = 99;

        System.out.println(Arrays.toString(original));
        System.out.println(Arrays.toString(copy));
    }
}`
        }
      ]
    }
  );
})();
