#include "stack.h"

#include <stdio.h>
#include <stdlib.h>

struct Stack *stack_initialization() {
  struct Stack *stack = malloc(sizeof(*stack));
  if (stack == NULL) {
    exit(EXIT_FAILURE);
  }
  stack->first = NULL;
  stack->length = 0;
  return stack;
}

void stack_push(struct Stack *stack, void *data) {
  struct Node *node_new = malloc(sizeof(*node_new));
  if (stack == NULL || data == NULL) {
    exit(EXIT_FAILURE);
  }
  node_new->data = data;
  node_new->next = stack->first;
  stack->first = node_new;
  stack->length = stack->length + 1;
}

void *stack_pop(struct Stack *stack) {
  if (stack == NULL) {
    exit(EXIT_FAILURE);
  }
  struct Node *node = stack->first;
  void *data = NULL;
  if (node != NULL) {
    stack->first = node->next;
    data = node->data;
    free(node);
  }
  stack->length = stack->length - 1;
  return data;
}
