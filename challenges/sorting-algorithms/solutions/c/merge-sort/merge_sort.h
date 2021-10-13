#ifndef __MERGE_SORT__
#define __MERGE_SORT__

void merge(int numbers[], int left_index, int middle_index, int right_index);

void merge_sort_recursive(int numbers[], int left_index, int right_index);

void merge_sort(int *numbers, const int length);

#endif
