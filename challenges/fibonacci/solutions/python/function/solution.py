import sys

input = []
for value in sys.stdin:
    input.append(value.rstrip('\n'))


def fibonacci(number: int) -> int:
    return number if number < 2 else fibonacci(number-1) + fibonacci(number-2)


print(fibonacci(int(input[0])))
