#ifndef __STACK__
#define __STACK__

#include <errno.h>
#include <stdio.h>
#include <stdlib.h>

/**
 * @brief Stack structure => LIFO (Last In First Out).
 */
struct stack {
  struct stack_node *first;
  size_t length;
};

/**
 * @brief Stack node structure.
 */
struct stack_node {
  void *data;
  struct stack_node *next;
};

/**
 * @brief Stack initialization.
 *
 * @return struct stack*
 */
struct stack *stack_initialization();

/**
 * @brief Push data to stack.
 *
 * @param stack
 * @param data
 */
void stack_push(struct stack *stack, void *data);

/**
 * @brief Pop data from stack.
 *
 * @param stack
 * @return void*
 */
void *stack_pop(struct stack *stack);

/**
 * @brief Frees the stack.
 *
 * @param stack
 */
void stack_free(struct stack *stack);

#endif
