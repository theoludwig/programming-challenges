#include "input.h"

#include "character.h"

char* input() {
  char character;
  size_t length = 1;
  char* string = malloc(length * sizeof(char));
  *string = '\0';
  while ((character = getchar()) != '\n' && character != EOF) {
    length++;
    string = realloc(string, length * sizeof(char));
    character_append(string, character);
  }
  return string;
}
