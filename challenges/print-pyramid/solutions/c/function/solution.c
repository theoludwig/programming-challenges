#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "character.h"
#include "input.h"

int main() {
  char* type = input();
  int height;
  scanf("%d", &height);

  int step = strcmp(type, "normal") == 0 ? 1 : height;
  while ((strcmp(type, "normal") == 0 && step <= height) || (strcmp(type, "reverse") == 0 && step != 0)) {
    int numberOfStars = (step * 2) - 1;
    int totalNumberOfLocations = (height * 2) - 1;
    int totalNumberOfSpaces = totalNumberOfLocations - numberOfStars;
    int numberOfSpacesOnEachSide = totalNumberOfSpaces / 2;
    character_print(" ", numberOfSpacesOnEachSide);
    character_print("*", numberOfStars);
    character_print(" ", numberOfSpacesOnEachSide);
    printf("\n");
    step = strcmp(type, "normal") == 0 ? step + 1 : step - 1;
  }

  return EXIT_SUCCESS;
}
