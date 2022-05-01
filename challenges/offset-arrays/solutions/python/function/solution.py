import sys

input_values: list[str] = []
for value in sys.stdin:
    input_values.append(value.rstrip('\n'))


class AssignmentArray:
    def __init__(self, assignment: str) -> None:
        identifier = assignment.split('[')[0]
        rest = assignment.split('[')[1]
        indexes = rest.split(']')[0]
        values_string = rest.split(']')[1]
        first_index_string = indexes.split('..')[0]
        last_index_string = indexes.split('..')[1]
        first_index = int(first_index_string)
        last_index = int(last_index_string)
        numbers_string = values_string.split('=')[1]
        numbers_string_array = numbers_string.strip().split(' ')
        numbers = [int(number) for number in numbers_string_array]
        values = {}
        index = 0
        for virtual_index in range(first_index, last_index + 1):
            values[virtual_index] = numbers[index]
            index += 1

        self.identifier = identifier
        self.first_index = first_index
        self.last_index = last_index
        self.values = values

    def get_by_index(self, index: int) -> int:
        return self.values[index]


assignments = {}
assignments_length = int(input_values[0])
assignment_index = 0
for assignment_index in range(0, assignments_length):
    assignment = input_values[assignment_index + 1]
    assignment_array = AssignmentArray(assignment)
    assignments[assignment_array.identifier] = assignment_array
assignment_index += 1

operation = input_values[assignment_index + 1]
simplified_operation = operation.split(']')[0]
nested = simplified_operation.split('[')
last_operation_index = len(nested) - 1
operation_identifiers = nested[0:last_operation_index]
operation_index = 0
operations_index = int(nested[last_operation_index])

current_value = None
for index in range(len(operation_identifiers) - 1, -1, -1):
    current_identifier = operation_identifiers[index]
    if current_value is None:
        current_value = assignments[current_identifier].get_by_index(
            operations_index)
    else:
        current_value = assignments[current_identifier].get_by_index(
            current_value)

print(current_value)
