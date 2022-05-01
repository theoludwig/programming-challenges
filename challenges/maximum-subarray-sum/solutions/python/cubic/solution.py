import sys


def maximum_subarray_sum_cubic(array: list[int]) -> int:
    """
    Time complexity: O((array_length)^3)

    We go through all possible subarrays, calculate the sum in each subarray and maintain the maximum sum.
    """
    if len(array) == 0:
        return 0
    best_sum = array[0]
    length = len(array)
    for i in range(length):
        for j in range(i, length):
            sum = 0
            for k in range(i, j + 1):
                sum += array[k]
            if sum > best_sum:
                best_sum = sum
    return best_sum


numbers: list[int] = []
for value in sys.stdin:
    numbers.append(int(value.rstrip('\n')))

numbers = numbers[1:]
print(maximum_subarray_sum_cubic(numbers))
