from typing import List

from Cell import Cell


class Grid:
    def __init__(self, grid: List[List[int]]) -> None:
        data: List[List[Cell]] = []
        for x in range(len(grid)):
            column: List[Cell] = []
            for y in range(len(grid[x])):
                column.append(Cell(grid[x][y], y, x))
            data.append(column)
        self.data = data

    def __repr__(self) -> str:
        result: str = '['
        for y in range(len(self.data)):
            result += '['
            for x in range(len(self.data[y])):
                result += str(self.get_cell(x, y).number)
                is_last_x = x == (len(self.data[y]) - 1)
                if not is_last_x:
                    result += ', '
            result += ']'
            is_last_y = y == len(self.data) - 1
            if not is_last_y:
                result += ',\n'
        return result + ']'

    def get_cell(self, x: int, y: int) -> Cell:
        return self.data[y][x]
