#include "string.h"

bool string_starts_with(char* string, char* prefix) {
  size_t string_length = strlen(string);
  size_t prefix_length = strlen(prefix);
  bool is_prefix = string_length >= prefix_length;
  for (size_t index = 0; index < prefix_length && index < string_length && is_prefix; index++) {
    if (prefix[index] != string[index]) {
      is_prefix = false;
    }
  }
  return is_prefix;
}

bool string_ends_with(char* string, char* suffix) {
  size_t string_length = strlen(string);
  size_t suffix_length = strlen(suffix);
  int index_start_of_the_end = string_length - suffix_length;
  bool is_suffix = true;
  if (index_start_of_the_end < 0) {
    is_suffix = false;
  } else {
    size_t suffix_index = 0;
    for (size_t string_index = index_start_of_the_end; string_index < string_length && is_suffix; string_index++) {
      if (string[string_index] != suffix[suffix_index]) {
        is_suffix = false;
      }
      suffix_index++;
    }
  }
  return is_suffix;
}
