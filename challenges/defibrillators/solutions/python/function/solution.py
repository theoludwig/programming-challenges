import sys
import math

input_values: list[str] = []
for value in sys.stdin:
    input_values.append(value.rstrip('\n'))


def convert_string_to_float(string: str) -> float:
    return float(string.replace(',', '.'))


class Position:
    def __init__(self, longitude: float, latitude: float) -> None:
        self.longitude = self.convert_degrees_to_radian(longitude)
        self.latitude = self.convert_degrees_to_radian(latitude)

    @staticmethod
    def calculation_distance(pointA: 'Position', pointB: 'Position') -> float:
        x = (pointB.longitude - pointA.longitude) * \
            math.cos((pointA.latitude + pointB.latitude) / 2)
        y = pointB.latitude - pointA.latitude
        return math.sqrt(math.pow(x, 2) + math.pow(y, 2)) * 6371

    def convert_degrees_to_radian(self, degrees: float) -> float:
        return degrees * (math.pi / 180)


class Defibrillator:
    def __init__(self, strings: list[str], user_position: Position) -> None:
        self.id = strings[0]
        self.name = strings[1]
        self.address = strings[2]
        self.position = Position(convert_string_to_float(
            strings[len(strings) - 2]), convert_string_to_float(strings[len(strings) - 1]))
        self.distance = Position.calculation_distance(
            self.position, user_position)


longitude = convert_string_to_float(input_values[0])
latitude = convert_string_to_float(input_values[1])
user_position = Position(longitude, latitude)
defibrillators: list[Defibrillator] = []

for index in range(3, len(input_values), 1):
    line = input_values[index].split(';')
    defibrillator = Defibrillator(line, user_position)
    defibrillators.append(defibrillator)

defibrillator_result = defibrillators[0]
for index in range(1, len(defibrillators), 1):
    if defibrillator_result.distance > defibrillators[index].distance:
        defibrillator_result = defibrillators[index]

print(defibrillator_result.name)
