#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "character.h"
#include "input.h"

size_t string_get_length(const char* string) {
  size_t length = 0;
  while (string[length] != '\0') {
    length++;
  }
  return length;
}

char* string_copy(const char* string) {
  size_t source_length = string_get_length(string);
  char* copy = malloc(sizeof(char) * (source_length + 1));
  if (copy == NULL) {
    perror("Error (string_copy)");
    exit(EXIT_FAILURE);
  }
  size_t index;
  for (index = 0; index < source_length; index++) {
    copy[index] = string[index];
  }
  copy[index] = '\0';
  return copy;
}

unsigned long long mathematics_absolute_value(const long long number) {
  if (number >= 0) {
    return number;
  }
  return -number;
}

void string_reverse(char* string) {
  size_t string_length = string_get_length(string);
  size_t index_start = 0;
  size_t index_end = string_length - 1;
  while (index_start < index_end) {
    char temporary = string[index_start];
    string[index_start] = string[index_end];
    string[index_end] = temporary;
    index_start++;
    index_end--;
  }
}

char* convert_character_to_string(const char character) {
  char* string = malloc(sizeof(char) * 2);
  if (string == NULL) {
    perror("Error (convert_character_to_string)");
    exit(EXIT_FAILURE);
  }
  string[0] = character;
  string[1] = '\0';
  return string;
}

char convert_digit_to_character(const char digit) {
  return digit + '0';
}

void string_concatenate(char** destination, char* source) {
  size_t destination_length = string_get_length(*destination);
  size_t source_length = string_get_length(source);
  size_t new_length = destination_length + source_length;
  *destination = realloc(*destination, sizeof(char) * (new_length + 1));
  if (*destination == NULL) {
    perror("Error (string_concatenate)");
    exit(EXIT_FAILURE);
  }
  size_t index_destination = destination_length;
  for (size_t index_source = 0; index_source < source_length; index_source++) {
    (*destination)[index_destination++] = source[index_source];
  }
  (*destination)[index_destination] = '\0';
}

char* convert_number_to_string(const long long integer) {
  if (integer == 0) {
    return convert_character_to_string('0');
  }
  bool is_negative = integer < 0;
  size_t length = 1;
  long long current = mathematics_absolute_value(integer);
  while (current != 0) {
    current = current / 10;
    length++;
  }
  if (is_negative) {
    length++;
  }
  char* string = malloc(sizeof(char) * length);
  if (string == NULL) {
    perror("Error (convert_number_to_string)");
    exit(EXIT_FAILURE);
  }
  current = mathematics_absolute_value(integer);
  size_t index = 0;
  while (current != 0) {
    string[index++] = convert_digit_to_character(current % 10);
    current = current / 10;
  }
  if (is_negative) {
    string[index++] = '-';
  }
  string[index] = '\0';
  string_reverse(string);
  return string;
}

int main() {
  char* string = input();
  size_t string_length = string_get_length(string);
  char* result = string_copy("");
  for (size_t index = 0; index < string_length; index++) {
    long long number_of_appearances = 0;
    char value_to_search = string[index];
    while (number_of_appearances + index < string_length && string[number_of_appearances + index] == value_to_search) {
      number_of_appearances++;
    }
    char* number_of_appearances_string = convert_number_to_string(number_of_appearances);
    string_concatenate(&result, number_of_appearances_string);
    char* value_string = convert_character_to_string(value_to_search);
    string_concatenate(&result, value_string);
    free(number_of_appearances_string);
    free(value_string);
    index += number_of_appearances - 1;
  }
  printf("%s\n", result);
  free(string);
  free(result);
  return EXIT_SUCCESS;
}
