from Sudoku import Sudoku
from example import grid

sudoku = Sudoku(grid)

print(f'\nSudoku | is_solved = {sudoku.is_solved()}\n')
print(sudoku)
print('-------------------------------------\n')
sudoku.solve()
print(f'Sudoku | is_solved = {sudoku.is_solved()}\n')
print(sudoku)
