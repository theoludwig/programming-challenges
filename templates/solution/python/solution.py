import sys

input = []
for value in sys.stdin:
    input.append(value.rstrip('\n'))

print(f'Hello, {input[0]}!')
