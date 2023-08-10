#include "stack.h"

struct stack *stack_initialization() {
  struct stack *stack = malloc(sizeof(struct stack));
  if (stack == NULL) {
    perror("Error (stack_initialization)");
    exit(EXIT_FAILURE);
  }
  stack->first = NULL;
  stack->length = 0;
  return stack;
}

void stack_push(struct stack *stack, void *data) {
  if (stack == NULL) {
    errno = EINVAL;
    perror("Error (stack_push)");
    exit(EXIT_FAILURE);
  }
  struct stack_node *node_new = malloc(sizeof(struct stack_node));
  if (data == NULL) {
    perror("Error (stack_push)");
    exit(EXIT_FAILURE);
  }
  node_new->data = data;
  node_new->next = stack->first;
  stack->first = node_new;
  stack->length = stack->length + 1;
}

void *stack_pop(struct stack *stack) {
  if (stack == NULL) {
    errno = EINVAL;
    perror("Error (stack_pop)");
    exit(EXIT_FAILURE);
  }
  struct stack_node *node = stack->first;
  void *data = NULL;
  if (node != NULL) {
    stack->first = node->next;
    data = node->data;
    free(node);
  }
  stack->length = stack->length - 1;
  return data;
}

void stack_free(struct stack *stack) {
  if (stack == NULL) {
    errno = EINVAL;
    perror("Error (stack_free)");
    exit(EXIT_FAILURE);
  }
  struct stack_node *node = stack->first;
  while (node != NULL) {
    struct stack_node *node_next = node->next;
    free(node);
    node = node_next;
  }
  free(stack);
}
