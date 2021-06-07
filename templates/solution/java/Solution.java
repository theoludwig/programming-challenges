import java.util.Scanner;

public class Solution {
  public static void main(String[] args) {
    String line;
    Scanner scanner = new Scanner(System.in);
    while(scanner.hasNextLine()) {
      line = scanner.nextLine();
      System.out.println("Hello, " + line + "!");
    }
  }
}
