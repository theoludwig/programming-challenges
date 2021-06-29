#include <stdio.h>
#include <stdlib.h>

#include "merge_sort.h"

int main() {
  int *numbers = malloc(25000 * sizeof(int));
  int current_number;
  int index_input = 0;
  while (scanf("%d", &current_number) != EOF) {
    numbers[index_input] = current_number;
    index_input += 1;
  }
  merge_sort(numbers, index_input);
  for (int index = 0; index < index_input; index++) {
    printf("%d\n", numbers[index]);
  }
  free(numbers);
  return 0;
}

void merge(int numbers[], int left_index, int middle_index, int right_index) {
  int index_left, index_right, index_numbers;
  int index_temporary_1 = middle_index - left_index + 1;
  int index_temporary_2 = right_index - middle_index;
  int left[index_temporary_1], right[index_temporary_2];
  for (index_left = 0; index_left < index_temporary_1; index_left++) {
    left[index_left] = numbers[left_index + index_left];
  }
  for (index_right = 0; index_right < index_temporary_2; index_right++) {
    right[index_right] = numbers[middle_index + 1 + index_right];
  }
  index_left = 0;
  index_right = 0;
  index_numbers = left_index;
  while (index_left < index_temporary_1 && index_right < index_temporary_2) {
    if (left[index_left] <= right[index_right]) {
      numbers[index_numbers] = left[index_left];
      index_left++;
    } else {
      numbers[index_numbers] = right[index_right];
      index_right++;
    }
    index_numbers++;
  }
  while (index_left < index_temporary_1) {
    numbers[index_numbers] = left[index_left];
    index_left++;
    index_numbers++;
  }
  while (index_right < index_temporary_2) {
    numbers[index_numbers] = right[index_right];
    index_right++;
    index_numbers++;
  }
}

void merge_sort_recursive(int numbers[], int left_index, int right_index) {
  if (left_index < right_index) {
    int middle_index = left_index + (right_index - left_index) / 2;
    merge_sort_recursive(numbers, left_index, middle_index);
    merge_sort_recursive(numbers, middle_index + 1, right_index);
    merge(numbers, left_index, middle_index, right_index);
  }
}

void merge_sort(int numbers[], const int length) {
  merge_sort_recursive(numbers, 0, length - 1);
}
