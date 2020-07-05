# Only the non-zero and positive divisors
def divider_list(number):
    number_list = []
    for index in range(1, number + 1):
        if number % index == 0:
            number_list.append(index)
    return number_list

def solution(number):
    return len(divider_list(number)) == 2
