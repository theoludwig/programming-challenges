import sys


def maximum_subarray_sum_recursive(array: list[int]) -> int:
    """
    Time complexity: O((array_length) * log(array_length))
    """

    def maximum_subarray_sum(array: list[int], left: int, right):
        if len(array) == 0:
            return 0
        if right == left:
            return array[left]
        middle = (left + right) // 2

        left_maximum_sum = array[middle]
        total = 0
        for i in range(middle, left - 1, -1):
            total += array[i]
            if total > left_maximum_sum:
                left_maximum_sum = total

        right_maximum_sum = array[middle + 1]
        total = 0
        for i in range(middle + 1, right + 1):
            total += array[i]
            if total > right_maximum_sum:
                right_maximum_sum = total

        maximum_sum = max(maximum_subarray_sum(array, left, middle), maximum_subarray_sum(array, middle + 1, right))
        return max(maximum_sum, left_maximum_sum + right_maximum_sum)

    return maximum_subarray_sum(array, 0, len(array) - 1)


numbers: list[int] = []
for value in sys.stdin:
    numbers.append(int(value.rstrip('\n')))

numbers = numbers[1:]
print(maximum_subarray_sum_recursive(numbers))
