#ifndef __ARRAY_2D_INT__
#define __ARRAY_2D_INT__

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "character.h"
#include "input.h"
#include "string.h"

/**
 * @brief Prints a 2D array of integers.
 *
 * @param array
 * @param number_of_rows
 * @param number_of_columns
 */
void array_2D_int_print(int **array, size_t number_of_rows, size_t number_of_columns);

/**
 * @brief Read from stdin a 2D array (rectangle or square) of integers.
 *
 * @param number_of_rows
 * @param number_of_columns
 * @return int**
 */
int **array_2D_int_input(size_t *number_of_rows, size_t *number_of_columns);

/**
 * @brief Reverse the order of the rows of a 2D array of integers.
 *
 * @param array
 * @param number_of_rows
 * @param number_of_columns
 * @return int**
 */
int **array_2D_int_reverse_rows(int **array, size_t *number_of_rows, size_t *number_of_columns);

/**
 * @brief Rotate a 2D array of integers by 90 degrees clockwise.
 *
 * @param array
 * @param number_of_rows
 * @param number_of_columns
 * @return int**
 */
int **array_2D_int_rotate_90_degrees_clockwise(int **array, size_t *number_of_rows, size_t *number_of_columns);

/**
 * @brief Rotate a 2D array of integers by 90 degrees anticlockwise.
 *
 * @param array
 * @param number_of_rows
 * @param number_of_columns
 * @return int**
 */
int **array_2D_int_rotate_90_degrees_anticlockwise(int **array, size_t *number_of_rows, size_t *number_of_columns);

#endif
