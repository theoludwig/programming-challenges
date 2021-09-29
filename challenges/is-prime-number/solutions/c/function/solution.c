#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

bool is_prime_number(int number) {
  for (int iteration = 2; iteration < number; iteration++) {
    if (number % iteration == 0) {
      return false;
    }
  }
  return true;
}

int main() {
  int number;
  scanf("%d", &number);
  bool is_prime = is_prime_number(number);
  printf("%s\n", is_prime ? "true" : "false");
  return EXIT_SUCCESS;
}
