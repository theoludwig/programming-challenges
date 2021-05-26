def solution(number: int) -> int:
    return number if number < 2 else solution(number-1) + solution(number-2)
