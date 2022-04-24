from Cell import Cell


class Grid:
    def __init__(self, grid: list[list[int]]) -> None:
        data: list[list[Cell]] = []
        for x in range(len(grid)):
            column: list[Cell] = []
            for y in range(len(grid[x])):
                column.append(Cell(grid[x][y], y, x))
            data.append(column)
        self.data = data

    def __repr__(self) -> str:
        result: str = ''
        for y in range(len(self.data)):
            column = ''
            for x in range(len(self.data[y])):
                cell = self.get_cell(x, y)
                column += str(cell.number) + ' '
            result += column.rstrip()
            is_last_column = (len(self.data) - 1) == y
            if not is_last_column:
                result += '\n'
        return result

    def get_cell(self, x: int, y: int) -> Cell:
        return self.data[y][x]
