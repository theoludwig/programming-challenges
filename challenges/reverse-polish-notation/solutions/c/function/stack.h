#ifndef __STACK__
#define __STACK__

#include <stdlib.h>

// LIFO = Last In First Out
struct Stack {
  struct Node *first;
  size_t length;
};

struct Node {
  void *data;
  struct Node *next;
};

struct Stack *stack_initialization();

void stack_push(struct Stack *stack, void *data);

void *stack_pop(struct Stack *stack);

#endif
