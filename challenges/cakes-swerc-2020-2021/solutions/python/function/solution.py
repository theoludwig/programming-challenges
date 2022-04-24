import sys

maximum_number_of_cake_possible = None

next(sys.stdin)
for line in sys.stdin:
    quantity_per_cake, quantity_available = list(map(int, line.split(' ')))
    cake_possible = quantity_available // quantity_per_cake
    if maximum_number_of_cake_possible == None or cake_possible < maximum_number_of_cake_possible:
        maximum_number_of_cake_possible = cake_possible

print(maximum_number_of_cake_possible)
