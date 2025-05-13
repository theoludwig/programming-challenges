#include <errno.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "input.h"

int main() {
  size_t count = (size_t)atoi(input());
  size_t prefix_length = 0;

  char* last = NULL;
  for (size_t i = 1; i < count; i++) {
    if (last == NULL) {
      last = input();
    }
    char* current = input();

    size_t prefix_current_length = 0;
    for (size_t j = 0; j < strlen(current); j++) {
      if (current[j] == last[j]) {
        prefix_current_length += 1;
      } else {
        break;
      }
    }

    if (prefix_length > prefix_current_length) {
      prefix_length = prefix_current_length;
    } else if (prefix_length == 0) {
      prefix_length = prefix_current_length;
    }

    last = current;
  }

  printf("%ld\n", prefix_length);
  return EXIT_SUCCESS;
}
