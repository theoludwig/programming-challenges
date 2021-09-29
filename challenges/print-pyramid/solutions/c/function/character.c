#include "character.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void character_append(char* string, char character) {
  size_t length = strlen(string);
  string[length] = character;
  string[length + 1] = '\0';
}

void character_print(char* character, int number_of_times) {
  for (size_t iteration = 0; iteration < number_of_times; iteration++) {
    printf("%s", character);
  }
}
