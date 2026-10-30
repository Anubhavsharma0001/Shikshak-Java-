(function () {
const J = String.raw;
window.QUESTIONS = window.QUESTIONS || [];
const Q = window.QUESTIONS;

Q.push({ id: 31, topic: "Strings", title: "Reverse a string",
intro: "Goal: \"hello\" becomes \"olleh\".",
levels: [
{ x: "A `String` is a sequence of characters. `length()` gives the size and `charAt(i)` gives the character at index `i`.",
c: J`public class Main {
    public static void main(String[] args) {
        String s = "hello";
        System.out.println(s.length());     // 5
        System.out.println(s.charAt(0));    // h
        System.out.println(s.charAt(4));    // o
    }
}
` },
{ x: "Walk from the last character to the first and build a new string.",
c: J`public class Main {
    public static void main(String[] args) {
        String s = "hello";
        String rev = "";
        for (int i = s.length() - 1; i >= 0; i--) {
            rev = rev + s.charAt(i);
        }
        System.out.println(rev);
    }
}
` },
{ x: "Method version. `StringBuilder` is faster than joining Strings in a loop because Strings cannot be changed, so each `+` makes a new copy.",
c: J`import java.util.Scanner;

public class Main {
    static String reverse(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = s.length() - 1; i >= 0; i--) sb.append(s.charAt(i));
        return sb.toString();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(reverse(sc.nextLine()));
    }
}
`, i: "Shikshak Java" },
{ x: "Recursive reverse, and the built in `StringBuilder.reverse()`.",
c: J`public class Main {
    static String reverse(String s) {
        if (s.isEmpty()) return "";
        return reverse(s.substring(1)) + s.charAt(0);
    }

    public static void main(String[] args) {
        System.out.println(reverse("recursion"));
        System.out.println(new StringBuilder("recursion").reverse());
    }
}
` }
]});

Q.push({ id: 32, topic: "Strings", title: "Palindrome string",
intro: "Goal: \"madam\" and \"racecar\" read the same in both directions.",
levels: [
{ x: "Compare the first and last characters.",
c: J`public class Main {
    public static void main(String[] args) {
        String s = "madam";
        System.out.println(s.charAt(0) == s.charAt(s.length() - 1));   // true
    }
}
` },
{ x: "Two pointers moving towards the centre. If any pair differs, it is not a palindrome.",
c: J`public class Main {
    public static void main(String[] args) {
        String s = "racecar";
        boolean ok = true;
        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s.charAt(i) != s.charAt(j)) { ok = false; break; }
            i++; j--;
        }
        System.out.println(ok ? "Palindrome" : "Not a palindrome");
    }
}
` },
{ x: "Method that ignores case, spaces and punctuation (like \"A man, a plan, a canal: Panama\").",
c: J`import java.util.Scanner;

public class Main {
    static boolean isPalindrome(String s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            while (i < j && !Character.isLetterOrDigit(s.charAt(i))) i++;
            while (i < j && !Character.isLetterOrDigit(s.charAt(j))) j--;
            if (Character.toLowerCase(s.charAt(i)) != Character.toLowerCase(s.charAt(j))) return false;
            i++; j--;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(isPalindrome(sc.nextLine()) ? "Palindrome" : "Not a palindrome");
    }
}
`, i: "A man, a plan, a canal: Panama" },
{ x: "Recursive version.",
c: J`public class Main {
    static boolean isPal(String s, int i, int j) {
        if (i >= j) return true;
        if (s.charAt(i) != s.charAt(j)) return false;
        return isPal(s, i + 1, j - 1);
    }

    public static void main(String[] args) {
        String s = "level";
        System.out.println(isPal(s, 0, s.length() - 1));
        System.out.println(isPal("hello", 0, 4));
    }
}
` }
]});

Q.push({ id: 33, topic: "Strings", title: "Count vowels and consonants",
intro: "Goal: count vowels (a, e, i, o, u) and consonants in a word or sentence.",
levels: [
{ x: "`Character.isLetter(ch)` checks for a letter. `Character.toLowerCase` makes comparisons easier.",
c: J`public class Main {
    public static void main(String[] args) {
        char ch = 'E';
        System.out.println(Character.isLetter(ch));        // true
        System.out.println(Character.toLowerCase(ch));     // e
    }
}
` },
{ x: "Loop through each character. If it is one of `aeiou` it is a vowel, otherwise (if it is a letter) a consonant.",
c: J`public class Main {
    public static void main(String[] args) {
        String s = "Hello World";
        int v = 0, c = 0;
        for (int i = 0; i < s.length(); i++) {
            char ch = Character.toLowerCase(s.charAt(i));
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') v++;
            else if (Character.isLetter(ch)) c++;
        }
        System.out.println("Vowels = " + v + ", Consonants = " + c);
    }
}
` },
{ x: "Method version. `\"aeiou\".indexOf(ch) >= 0` is a shorter vowel test.",
c: J`import java.util.Scanner;

public class Main {
    static int[] count(String s) {
        int v = 0, c = 0;
        for (char ch : s.toLowerCase().toCharArray()) {
            if ("aeiou".indexOf(ch) >= 0) v++;
            else if (Character.isLetter(ch)) c++;
        }
        return new int[]{v, c};
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] r = count(sc.nextLine());
        System.out.println("Vowels = " + r[0] + ", Consonants = " + r[1]);
    }
}
`, i: "Shikshak Java Teacher" },
{ x: "Advanced: count how many times every letter appears using a frequency array of size 26. This idea is used in many DSA string problems.",
c: J`public class Main {
    public static void main(String[] args) {
        String s = "programming";
        int[] freq = new int[26];
        for (char ch : s.toCharArray()) {
            freq[ch - 'a']++;
        }
        for (int i = 0; i < 26; i++) {
            if (freq[i] > 0) System.out.println((char) ('a' + i) + " -> " + freq[i]);
        }
    }
}
` }
]});

Q.push({ id: 34, topic: "Strings", title: "Count words in a sentence",
intro: "Goal: \"I love Java programming\" has 4 words.",
levels: [
{ x: "Words are separated by spaces. `split(\" \")` breaks a string into an array of words.",
c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        String s = "I love Java";
        String[] words = s.split(" ");
        System.out.println(Arrays.toString(words));
        System.out.println(words.length);
    }
}
` },
{ x: "Counting without `split`: a new word starts whenever a non-space follows a space (or the start).",
c: J`public class Main {
    public static void main(String[] args) {
        String s = "I love Java programming";
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) != ' ' && (i == 0 || s.charAt(i - 1) == ' ')) count++;
        }
        System.out.println("Words = " + count);
    }
}
` },
{ x: "Method that handles extra spaces: `trim()` removes outer spaces and the pattern `\\\\s+` means one or more spaces.",
c: J`import java.util.Scanner;

public class Main {
    static int countWords(String s) {
        s = s.trim();
        if (s.isEmpty()) return 0;
        return s.split("\\s+").length;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(countWords(sc.nextLine()));
    }
}
`, i: "   Java   is    fun   " },
{ x: "Extension: find the longest word and capitalise each word.",
c: J`public class Main {
    public static void main(String[] args) {
        String s = "learn java before dsa";
        String longest = "";
        StringBuilder cap = new StringBuilder();
        for (String w : s.split(" ")) {
            if (w.length() > longest.length()) longest = w;
            cap.append(Character.toUpperCase(w.charAt(0))).append(w.substring(1)).append(" ");
        }
        System.out.println("Longest: " + longest);
        System.out.println("Capitalised: " + cap.toString().trim());
    }
}
` }
]});

Q.push({ id: 35, topic: "Strings", title: "Check anagram",
intro: "Goal: two words are anagrams if they use the same letters the same number of times. \"listen\" and \"silent\" are anagrams.",
levels: [
{ x: "`toCharArray()` turns a string into a char array, and `Arrays.sort` sorts it.",
c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        char[] c = "listen".toCharArray();
        Arrays.sort(c);
        System.out.println(new String(c));   // eilnst
    }
}
` },
{ x: "Sort the letters of both words. If the results are equal, they are anagrams.",
c: J`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        String a = "listen", b = "silent";
        char[] x = a.toCharArray(), y = b.toCharArray();
        Arrays.sort(x);
        Arrays.sort(y);
        System.out.println(Arrays.equals(x, y) ? "Anagrams" : "Not anagrams");
    }
}
` },
{ x: "Method version using a frequency array: add 1 for each letter of the first word and subtract 1 for the second. If everything returns to 0, they match. This is faster than sorting.",
c: J`import java.util.Scanner;

public class Main {
    static boolean isAnagram(String a, String b) {
        a = a.toLowerCase(); b = b.toLowerCase();
        if (a.length() != b.length()) return false;
        int[] f = new int[26];
        for (int i = 0; i < a.length(); i++) {
            f[a.charAt(i) - 'a']++;
            f[b.charAt(i) - 'a']--;
        }
        for (int x : f) if (x != 0) return false;
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String a = sc.next(), b = sc.next();
        System.out.println(isAnagram(a, b) ? "Anagrams" : "Not anagrams");
    }
}
`, i: "Listen Silent" },
{ x: "Group words that are anagrams of each other using a `HashMap` where the key is the sorted letters.",
c: J`import java.util.*;

public class Main {
    public static void main(String[] args) {
        String[] words = {"eat", "tea", "tan", "ate", "nat", "bat"};
        Map<String, List<String>> groups = new LinkedHashMap<>();
        for (String w : words) {
            char[] c = w.toCharArray();
            Arrays.sort(c);
            groups.computeIfAbsent(new String(c), k -> new ArrayList<>()).add(w);
        }
        System.out.println(groups.values());
    }
}
` }
]});

Q.push({ id: 36, topic: "Strings", title: "Remove duplicate characters",
intro: "Goal: \"programming\" becomes \"progamin\" (keep the first occurrence of each letter).",
levels: [
{ x: "`indexOf(ch)` returns the first position of a character. If it equals the current index, this is the first time we see it.",
c: J`public class Main {
    public static void main(String[] args) {
        String s = "banana";
        System.out.println(s.indexOf('a'));   // 1
        System.out.println(s.indexOf('n'));   // 2
        System.out.println(s.indexOf('z'));   // -1 (not found)
    }
}
` },
{ x: "Build a result and add a character only if the result does not already contain it.",
c: J`public class Main {
    public static void main(String[] args) {
        String s = "programming";
        String result = "";
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (result.indexOf(ch) == -1) result += ch;
        }
        System.out.println(result);
    }
}
` },
{ x: "Method using a `boolean[]` to remember which characters were seen (works fast for all ASCII characters).",
c: J`import java.util.Scanner;

public class Main {
    static String removeDuplicates(String s) {
        boolean[] seen = new boolean[256];
        StringBuilder sb = new StringBuilder();
        for (char ch : s.toCharArray()) {
            if (!seen[ch]) {
                seen[ch] = true;
                sb.append(ch);
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(removeDuplicates(sc.nextLine()));
    }
}
`, i: "mississippi" },
{ x: "With a `LinkedHashSet`, which removes duplicates and keeps the original order. Also: find the first non repeating character.",
c: J`import java.util.*;

public class Main {
    public static void main(String[] args) {
        String s = "swiss";
        LinkedHashSet<Character> set = new LinkedHashSet<>();
        for (char c : s.toCharArray()) set.add(c);
        StringBuilder sb = new StringBuilder();
        for (char c : set) sb.append(c);
        System.out.println(sb);

        Map<Character, Integer> cnt = new LinkedHashMap<>();
        for (char c : s.toCharArray()) cnt.merge(c, 1, Integer::sum);
        for (Map.Entry<Character, Integer> e : cnt.entrySet()) {
            if (e.getValue() == 1) { System.out.println("First unique: " + e.getKey()); break; }
        }
    }
}
` }
]});

Q.push({ id: 37, topic: "Strings", title: "Count frequency of each character",
intro: "Goal: for \"hello\" print h=1, e=1, l=2, o=1.",
levels: [
{ x: "To count one specific character, loop and compare.",
c: J`public class Main {
    public static void main(String[] args) {
        String s = "hello";
        int count = 0;
        for (char c : s.toCharArray()) {
            if (c == 'l') count++;
        }
        System.out.println("l appears " + count + " times");
    }
}
` },
{ x: "A `HashMap` stores pairs of (character, count). `getOrDefault` returns 0 for characters not yet seen.",
c: J`import java.util.LinkedHashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        String s = "hello";
        Map<Character, Integer> freq = new LinkedHashMap<>();
        for (char c : s.toCharArray()) {
            freq.put(c, freq.getOrDefault(c, 0) + 1);
        }
        for (Map.Entry<Character, Integer> e : freq.entrySet()) {
            System.out.println(e.getKey() + " = " + e.getValue());
        }
    }
}
` },
{ x: "Method returning the map, taking the sentence from the keyboard. Spaces are skipped.",
c: J`import java.util.*;

public class Main {
    static Map<Character, Integer> frequency(String s) {
        Map<Character, Integer> m = new TreeMap<>();   // TreeMap keeps keys sorted
        for (char c : s.toCharArray()) {
            if (c != ' ') m.merge(c, 1, Integer::sum);
        }
        return m;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(frequency(sc.nextLine()));
    }
}
`, i: "java is fun" },
{ x: "Find the most frequent character using a fixed size array (the fastest option for lowercase letters).",
c: J`public class Main {
    static char mostFrequent(String s) {
        int[] f = new int[26];
        for (char c : s.toCharArray()) f[c - 'a']++;
        int best = 0;
        for (int i = 1; i < 26; i++) if (f[i] > f[best]) best = i;
        return (char) ('a' + best);
    }

    public static void main(String[] args) {
        System.out.println(mostFrequent("abracadabra"));   // a
    }
}
` }
]});

Q.push({ id: 38, topic: "Strings", title: "Toggle case and string methods",
intro: "Goal: change \"Hello World\" to \"hELLO wORLD\" and learn the most useful String methods.",
levels: [
{ x: "Common String methods: `toUpperCase`, `toLowerCase`, `substring`, `contains`, `replace`, `equals`.",
c: J`public class Main {
    public static void main(String[] args) {
        String s = "Hello World";
        System.out.println(s.toUpperCase());
        System.out.println(s.toLowerCase());
        System.out.println(s.substring(0, 5));
        System.out.println(s.contains("World"));
        System.out.println(s.replace('o', '0'));
        System.out.println(s.equals("hello world"));   // false: case matters
    }
}
` },
{ x: "Loop through each character: upper case becomes lower case and the other way around.",
c: J`public class Main {
    public static void main(String[] args) {
        String s = "Hello World";
        String r = "";
        for (char c : s.toCharArray()) {
            if (Character.isUpperCase(c)) r += Character.toLowerCase(c);
            else if (Character.isLowerCase(c)) r += Character.toUpperCase(c);
            else r += c;
        }
        System.out.println(r);
    }
}
` },
{ x: "Method with `StringBuilder`. Never compare Strings with `==`; use `equals`.",
c: J`import java.util.Scanner;

public class Main {
    static String toggle(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (Character.isUpperCase(c)) sb.append(Character.toLowerCase(c));
            else if (Character.isLowerCase(c)) sb.append(Character.toUpperCase(c));
            else sb.append(c);
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(toggle(sc.nextLine()));
    }
}
`, i: "Hello World 123" },
{ x: "Using ASCII values: the difference between 'a' (97) and 'A' (65) is 32, so XOR with 32 flips the case of a letter. Also a simple Caesar cipher.",
c: J`public class Main {
    static String caesar(String s, int shift) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (Character.isLowerCase(c)) sb.append((char) ('a' + (c - 'a' + shift) % 26));
            else if (Character.isUpperCase(c)) sb.append((char) ('A' + (c - 'A' + shift) % 26));
            else sb.append(c);
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        System.out.println((char) ('a' ^ 32));   // A
        System.out.println(caesar("Hello, World", 3));
    }
}
` }
]});

Q.push({ id: 39, topic: "Strings", title: "Longest common prefix",
intro: "Goal: for {\"flower\",\"flow\",\"flight\"} the answer is \"fl\".",
levels: [
{ x: "`startsWith` checks whether a string begins with a given prefix, and `substring(0, n)` cuts the first `n` characters.",
c: J`public class Main {
    public static void main(String[] args) {
        System.out.println("flower".startsWith("flo"));    // true
        System.out.println("flower".substring(0, 2));      // fl
    }
}
` },
{ x: "Take the first word as the prefix and keep shortening it until every word starts with it.",
c: J`public class Main {
    public static void main(String[] args) {
        String[] words = {"flower", "flow", "flight"};
        String prefix = words[0];
        for (String w : words) {
            while (!w.startsWith(prefix)) {
                prefix = prefix.substring(0, prefix.length() - 1);
            }
        }
        System.out.println("Prefix = \"" + prefix + "\"");
    }
}
` },
{ x: "Method version that also handles the empty array and the no-common-prefix case.",
c: J`public class Main {
    static String commonPrefix(String[] words) {
        if (words.length == 0) return "";
        String prefix = words[0];
        for (String w : words) {
            while (!w.startsWith(prefix)) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }

    public static void main(String[] args) {
        System.out.println("[" + commonPrefix(new String[]{"interview", "internet", "internal"}) + "]");
        System.out.println("[" + commonPrefix(new String[]{"dog", "car", "race"}) + "]");
    }
}
` },
{ x: "Another approach: compare column by column (vertical scanning). It stops at the first mismatch.",
c: J`public class Main {
    static String commonPrefix(String[] w) {
        if (w.length == 0) return "";
        for (int i = 0; i < w[0].length(); i++) {
            char c = w[0].charAt(i);
            for (int j = 1; j < w.length; j++) {
                if (i == w[j].length() || w[j].charAt(i) != c) {
                    return w[0].substring(0, i);
                }
            }
        }
        return w[0];
    }

    public static void main(String[] args) {
        System.out.println(commonPrefix(new String[]{"flower", "flow", "flight"}));
    }
}
` }
]});

Q.push({ id: 40, topic: "Strings", title: "Check if a string is a rotation of another",
intro: "Goal: \"abcd\" and \"cdab\" are rotations of each other.",
levels: [
{ x: "A rotation moves letters from the front to the back. Rotating \"abcd\" by 1 gives \"bcda\".",
c: J`public class Main {
    public static void main(String[] args) {
        String s = "abcd";
        String r = s.substring(1) + s.substring(0, 1);
        System.out.println(r);   // bcda
    }
}
` },
{ x: "Try every rotation of the first string and see if one equals the second.",
c: J`public class Main {
    public static void main(String[] args) {
        String a = "abcd", b = "cdab";
        boolean found = false;
        for (int k = 0; k < a.length(); k++) {
            String rot = a.substring(k) + a.substring(0, k);
            if (rot.equals(b)) { found = true; break; }
        }
        System.out.println(found ? "Rotation" : "Not a rotation");
    }
}
` },
{ x: "Clever trick: every rotation of `a` appears inside `a + a`. So check the lengths and use `contains`.",
c: J`import java.util.Scanner;

public class Main {
    static boolean isRotation(String a, String b) {
        return a.length() == b.length() && (a + a).contains(b);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String a = sc.next(), b = sc.next();
        System.out.println(isRotation(a, b) ? "Rotation" : "Not a rotation");
    }
}
`, i: "waterbottle erbottlewat" },
{ x: "Print all rotations of a string and all substrings, a good warm up for nested loops.",
c: J`public class Main {
    public static void main(String[] args) {
        String s = "abc";
        for (int k = 0; k < s.length(); k++) {
            System.out.println(s.substring(k) + s.substring(0, k));
        }
        System.out.println("Substrings:");
        for (int i = 0; i < s.length(); i++) {
            for (int j = i + 1; j <= s.length(); j++) {
                System.out.print(s.substring(i, j) + " ");
            }
        }
        System.out.println();
    }
}
` }
]});

})();
