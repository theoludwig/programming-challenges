from typing import List
import sys

from Sudoku import Sudoku
from Grid import Grid

grid_values: List[List[int]] = []
for value in sys.stdin:
    row_values = value.rstrip('\n').split(' ')
    current_row: List[int] = []
    for row_value in row_values:
        current_row.append(int(row_value))
    grid_values.append(current_row)

grid = Grid(grid_values)
sudoku = Sudoku(grid)
sudoku.solve()
print(sudoku.grid)
