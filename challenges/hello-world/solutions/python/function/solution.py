import sys

input_values: list[str] = []
for value in sys.stdin:
    input_values.append(value.rstrip('\n'))

print(f'Hello, {input_values[0]}!')
