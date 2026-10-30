(function () {
  const J = String.raw;
  window.QUESTIONS = window.QUESTIONS || [];
  const Q = window.QUESTIONS;

  Q.push(
    {
      id: 91,
      topic: "OOP & Advanced Java",
      title: "Classes and Objects",
      intro: "Understand the foundation of object-oriented programming in Java.",
      levels: [
        {
          x: "A class is a blueprint, while an object is an instance of that class.",
          c: J`class Student {
    String name = "Aman";
    int age = 20;
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student();

        System.out.println(student.name);
        System.out.println(student.age);
    }
}`
        },
        {
          x: "Objects can have their own state and can access methods defined in their class.",
          c: J`class Car {
    String brand;

    void drive() {
        System.out.println(brand + " is moving");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.brand = "Toyota";
        car.drive();
    }
}`
        },
        {
          x: "You can create multiple objects from the same class. Each object maintains its own instance variables.",
          c: J`class Student {
    String name;
    int marks;

    void display() {
        System.out.println(name + ": " + marks);
    }
}

public class Main {
    public static void main(String[] args) {
        Student first = new Student();
        first.name = "Riya";
        first.marks = 90;

        Student second = new Student();
        second.name = "Aman";
        second.marks = 85;

        first.display();
        second.display();
    }
}`
        },
        {
          x: "A class groups related data and behaviour together, making programs easier to organize and maintain.",
          c: J`class Rectangle {
    double length;
    double width;

    double area() {
        return length * width;
    }

    double perimeter() {
        return 2 * (length + width);
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle rectangle = new Rectangle();

        rectangle.length = 10;
        rectangle.width = 5;

        System.out.println("Area: " + rectangle.area());
        System.out.println("Perimeter: " + rectangle.perimeter());
    }
}`
        }
      ]
    },
    {
      id: 92,
      topic: "OOP & Advanced Java",
      title: "Constructors in Java",
      intro: "Learn how constructors initialize objects.",
      levels: [
        {
          x: "A constructor has the same name as its class and has no return type.",
          c: J`class Student {
    Student() {
        System.out.println("Student object created");
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student();
    }
}`
        },
        {
          x: "A parameterized constructor accepts values while creating an object.",
          c: J`class Student {
    String name;
    int age;

    Student(String studentName, int studentAge) {
        name = studentName;
        age = studentAge;
    }

    void display() {
        System.out.println(name + " " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student("Aman", 21);
        student.display();
    }
}`
        },
        {
          x: "Constructor overloading allows a class to have multiple constructors with different parameter lists.",
          c: J`class Box {
    int length;
    int width;

    Box() {
        length = 1;
        width = 1;
    }

    Box(int side) {
        length = side;
        width = side;
    }

    Box(int l, int w) {
        length = l;
        width = w;
    }

    void display() {
        System.out.println(length * width);
    }
}

public class Main {
    public static void main(String[] args) {
        new Box().display();
        new Box(5).display();
        new Box(4, 6).display();
    }
}`
        },
        {
          x: "The this keyword refers to the current object. It can distinguish instance variables from constructor parameters.",
          c: J`class Employee {
    String name;
    double salary;

    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    void display() {
        System.out.println(name + " earns " + salary);
    }
}

public class Main {
    public static void main(String[] args) {
        Employee employee = new Employee("Rahul", 45000);
        employee.display();
    }
}`
        }
      ]
    },
    {
      id: 93,
      topic: "OOP & Advanced Java",
      title: "Encapsulation",
      intro: "Protect object data using private fields and public methods.",
      levels: [
        {
          x: "Encapsulation combines data and methods in a class and controls access to its internal state.",
          c: J`class Account {
    private double balance;

    public void setBalance(double amount) {
        balance = amount;
    }

    public double getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        Account account = new Account();
        account.setBalance(5000);

        System.out.println(account.getBalance());
    }
}`
        },
        {
          x: "Private fields cannot be accessed directly outside their class. Getter and setter methods provide controlled access.",
          c: J`class Student {
    private String name;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student();
        student.setName("Riya");

        System.out.println(student.getName());
    }
}`
        },
        {
          x: "A setter can validate values before updating an object's state.",
          c: J`class BankAccount {
    private double balance;

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public double getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount();

        account.deposit(1000);
        account.deposit(-500);

        System.out.println(account.getBalance());
    }
}`
        },
        {
          x: "Encapsulation helps maintain valid object state by hiding implementation details and exposing controlled operations.",
          c: J`class Temperature {
    private double celsius;

    public void setCelsius(double value) {
        if (value >= -273.15) {
            celsius = value;
        }
    }

    public double getCelsius() {
        return celsius;
    }

    public double getFahrenheit() {
        return celsius * 9 / 5 + 32;
    }
}

public class Main {
    public static void main(String[] args) {
        Temperature temperature = new Temperature();

        temperature.setCelsius(25);

        System.out.println(temperature.getCelsius());
        System.out.println(temperature.getFahrenheit());
    }
}`
        }
      ]
    },
    {
      id: 94,
      topic: "OOP & Advanced Java",
      title: "Inheritance",
      intro: "Learn how one class can reuse and extend another class.",
      levels: [
        {
          x: "Inheritance allows a child class to acquire accessible fields and methods from a parent class.",
          c: J`class Animal {
    void eat() {
        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Dog is barking");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();

        dog.eat();
        dog.bark();
    }
}`
        },
        {
          x: "The extends keyword establishes inheritance between classes.",
          c: J`class Vehicle {
    String brand = "Toyota";
}

class Car extends Vehicle {
    void display() {
        System.out.println(brand);
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.display();
    }
}`
        },
        {
          x: "The super keyword can call a parent class constructor or access a parent class member.",
          c: J`class Person {
    String name;

    Person(String name) {
        this.name = name;
    }
}

class Student extends Person {
    int rollNumber;

    Student(String name, int rollNumber) {
        super(name);
        this.rollNumber = rollNumber;
    }

    void display() {
        System.out.println(name + " " + rollNumber);
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student("Aman", 101);
        student.display();
    }
}`
        },
        {
          x: "Java supports single, multilevel and hierarchical class inheritance. A class cannot extend multiple classes.",
          c: J`class Animal {
    void eat() {
        System.out.println("Eating");
    }
}

class Mammal extends Animal {
    void walk() {
        System.out.println("Walking");
    }
}

class Dog extends Mammal {
    void bark() {
        System.out.println("Barking");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();

        dog.eat();
        dog.walk();
        dog.bark();
    }
}`
        }
      ]
    },
    {
      id: 95,
      topic: "OOP & Advanced Java",
      title: "Polymorphism and Method Overriding",
      intro: "Understand how the same method call can produce different behaviour.",
      levels: [
        {
          x: "Polymorphism means one interface or parent reference can represent objects of different classes.",
          c: J`class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    void sound() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();
        animal.sound();
    }
}`
        },
        {
          x: "Method overriding occurs when a subclass provides its own implementation of an inherited method.",
          c: J`class Shape {
    void draw() {
        System.out.println("Drawing shape");
    }
}

class Circle extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing circle");
    }
}

public class Main {
    public static void main(String[] args) {
        Shape shape = new Circle();
        shape.draw();
    }
}`
        },
        {
          x: "Runtime polymorphism selects the overridden instance method according to the actual object type.",
          c: J`class Payment {
    void pay() {
        System.out.println("Generic payment");
    }
}

class CardPayment extends Payment {
    @Override
    void pay() {
        System.out.println("Card payment");
    }
}

class UpiPayment extends Payment {
    @Override
    void pay() {
        System.out.println("UPI payment");
    }
}

public class Main {
    public static void main(String[] args) {
        Payment first = new CardPayment();
        Payment second = new UpiPayment();

        first.pay();
        second.pay();
    }
}`
        },
        {
          x: "Use the @Override annotation to make the compiler verify that a method correctly overrides a parent method.",
          c: J`class Employee {
    double calculateBonus() {
        return 1000;
    }
}

class Manager extends Employee {
    @Override
    double calculateBonus() {
        return 5000;
    }
}

public class Main {
    public static void main(String[] args) {
        Employee employee = new Manager();

        System.out.println(employee.calculateBonus());
    }
}`
        }
      ]
    },
    {
      id: 96,
      topic: "OOP & Advanced Java",
      title: "Abstraction and Interfaces",
      intro: "Learn how abstract classes and interfaces define behaviour.",
      levels: [
        {
          x: "An abstract class cannot be instantiated directly and may contain abstract and concrete methods.",
          c: J`abstract class Animal {
    abstract void sound();

    void sleep() {
        System.out.println("Sleeping");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Barking");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();

        animal.sound();
        animal.sleep();
    }
}`
        },
        {
          x: "An interface defines a contract that a class can implement.",
          c: J`interface Printable {
    void print();
}

class Document implements Printable {
    public void print() {
        System.out.println("Printing document");
    }
}

public class Main {
    public static void main(String[] args) {
        Printable item = new Document();
        item.print();
    }
}`
        },
        {
          x: "A class can implement multiple interfaces, allowing it to provide several capabilities.",
          c: J`interface Printable {
    void print();
}

interface Scannable {
    void scan();
}

class Machine implements Printable, Scannable {
    public void print() {
        System.out.println("Printing");
    }

    public void scan() {
        System.out.println("Scanning");
    }
}

public class Main {
    public static void main(String[] args) {
        Machine machine = new Machine();

        machine.print();
        machine.scan();
    }
}`
        },
        {
          x: "Interfaces can contain default and static methods in addition to abstract methods.",
          c: J`interface Greeting {
    void greet();

    default void message() {
        System.out.println("Welcome!");
    }

    static void info() {
        System.out.println("Greeting interface");
    }
}

class EnglishGreeting implements Greeting {
    public void greet() {
        System.out.println("Hello!");
    }
}

public class Main {
    public static void main(String[] args) {
        EnglishGreeting greeting = new EnglishGreeting();

        greeting.greet();
        greeting.message();
        Greeting.info();
    }
}`
        }
      ]
    },
    {
      id: 97,
      topic: "OOP & Advanced Java",
      title: "Static and Final Keywords",
      intro: "Understand class-level members and values that cannot be reassigned.",
      levels: [
        {
          x: "A static variable belongs to the class and is shared by all objects.",
          c: J`class Student {
    static String college = "ABC College";
    String name;

    Student(String name) {
        this.name = name;
    }
}

public class Main {
    public static void main(String[] args) {
        Student first = new Student("Aman");
        Student second = new Student("Riya");

        System.out.println(first.name + " " + Student.college);
        System.out.println(second.name + " " + Student.college);
    }
}`
        },
        {
          x: "A static method can be called using the class name without creating an object.",
          c: J`class Calculator {
    static int add(int a, int b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Calculator.add(10, 20));
    }
}`
        },
        {
          x: "The final keyword can prevent a variable from being reassigned.",
          c: J`public class Main {
    public static void main(String[] args) {
        final double PI = 3.14159;

        double radius = 5;
        double area = PI * radius * radius;

        System.out.println(area);
    }
}`
        },
        {
          x: "A final method cannot be overridden, and a final class cannot be extended.",
          c: J`class Parent {
    final void display() {
        System.out.println("Final method");
    }
}

final class Utility {
    static void help() {
        System.out.println("Utility class");
    }
}

class Child extends Parent {
    void show() {
        System.out.println("Child method");
    }
}

public class Main {
    public static void main(String[] args) {
        Child child = new Child();

        child.display();
        child.show();

        Utility.help();
    }
}`
        }
      ]
    },
    {
      id: 98,
      topic: "OOP & Advanced Java",
      title: "Exception Handling",
      intro: "Handle runtime problems using try, catch and finally.",
      levels: [
        {
          x: "An exception is an event that interrupts the normal flow of program execution.",
          c: J`public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        }
    }
}`
        },
        {
          x: "A try block contains risky code, while a catch block handles a matching exception.",
          c: J`public class Main {
    public static void main(String[] args) {
        try {
            int[] arr = {10, 20};
            System.out.println(arr[5]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Invalid array index");
        }
    }
}`
        },
        {
          x: "The finally block normally executes whether an exception occurs or not.",
          c: J`public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 2;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Error occurred");
        } finally {
            System.out.println("Execution completed");
        }
    }
}`
        },
        {
          x: "You can throw an exception explicitly and declare checked exceptions using throws.",
          c: J`public class Main {
    static void checkAge(int age) {
        if (age < 18) {
            throw new IllegalArgumentException("Age must be 18 or above");
        }

        System.out.println("Eligible");
    }

    public static void main(String[] args) {
        try {
            checkAge(20);
            checkAge(16);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}`
        }
      ]
    },
    {
      id: 99,
      topic: "OOP & Advanced Java",
      title: "Collections and ArrayList",
      intro: "Use Java collections to store and manage groups of objects.",
      levels: [
        {
          x: "ArrayList is a resizable collection that stores elements in insertion order.",
          c: J`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Aman");
        names.add("Riya");
        names.add("Rahul");

        System.out.println(names);
    }
}`
        },
        {
          x: "Use get(), set() and remove() to access, update and delete elements.",
          c: J`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();

        names.add("Aman");
        names.add("Riya");

        System.out.println(names.get(0));

        names.set(1, "Priya");
        names.remove("Aman");

        System.out.println(names);
    }
}`
        },
        {
          x: "Use generics to specify the type of elements stored in a collection.",
          c: J`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);

        int sum = 0;

        for (int number : numbers) {
            sum += number;
        }

        System.out.println("Sum: " + sum);
    }
}`
        },
        {
          x: "Collections.sort() sorts an ArrayList of comparable elements in ascending order.",
          c: J`import java.util.ArrayList;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();

        numbers.add(40);
        numbers.add(10);
        numbers.add(30);
        numbers.add(20);

        Collections.sort(numbers);

        System.out.println(numbers);

        Collections.reverse(numbers);

        System.out.println(numbers);
    }
}`
        }
      ]
    },
    {
      id: 100,
      topic: "OOP & Advanced Java",
      title: "HashMap and Key-Value Pairs",
      intro: "Store and retrieve data using unique keys and associated values.",
      levels: [
        {
          x: "HashMap stores data as key-value pairs. Each key is unique.",
          c: J`import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<Integer, String> students = new HashMap<>();

        students.put(101, "Aman");
        students.put(102, "Riya");

        System.out.println(students.get(101));
    }
}`
        },
        {
          x: "Use put(), get(), containsKey() and remove() to manage map entries.",
          c: J`import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> marks = new HashMap<>();

        marks.put("Aman", 85);
        marks.put("Riya", 92);

        System.out.println(marks.get("Riya"));
        System.out.println(marks.containsKey("Aman"));

        marks.remove("Aman");

        System.out.println(marks);
    }
}`
        },
        {
          x: "Use entrySet() to iterate over both keys and values in a HashMap.",
          c: J`import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> marks = new HashMap<>();

        marks.put("Aman", 85);
        marks.put("Riya", 92);
        marks.put("Rahul", 78);

        for (Map.Entry<String, Integer> entry : marks.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}`
        },
        {
          x: "HashMap is useful for fast average-case lookups by key. It does not guarantee iteration order.",
          c: J`import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        String text = "java programming";
        HashMap<Character, Integer> frequency = new HashMap<>();

        for (char ch : text.toCharArray()) {
            if (ch == ' ') continue;

            frequency.put(ch, frequency.getOrDefault(ch, 0) + 1);
        }

        for (Map.Entry<Character, Integer> entry : frequency.entrySet()) {
            System.out.println(entry.getKey() + " = " + entry.getValue());
        }
    }
}`
        }
      ]
    }
  );
})();
