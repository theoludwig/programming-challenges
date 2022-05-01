import sys


def maximum_subarray_sum_linear(array: list[int]) -> int:
    """
    Time complexity: O(array_length)

    We loop through the array and for each array position, we calculate the maximum sum of a subarray that ends at that position. After this, the answer for the problem is the maximum of those sums.
    """
    if len(array) == 0:
        return 0
    best_sum = array[0]
    length = len(array)
    sum = 0
    for i in range(length):
        sum = max(array[i], sum + array[i])
        best_sum = max(best_sum, sum)
    return best_sum


numbers: list[int] = []
for value in sys.stdin:
    numbers.append(int(value.rstrip('\n')))

numbers = numbers[1:]
print(maximum_subarray_sum_linear(numbers))
