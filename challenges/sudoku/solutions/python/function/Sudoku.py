from unittest import TestCase, main
from copy import deepcopy

from Cell import Cell
from Grid import Grid
from example import grid, grid_solved


class Sudoku:
    def __init__(self, grid: Grid) -> None:
        assert len(grid.data) == 9, 'Invalid Sudoku Grid'
        assert len(grid.data[0]) == 9, 'Invalid Sudoku Grid'
        self.grid = deepcopy(grid)

    def __repr__(self) -> str:
        result: str = '+' + '---+' * 9 + '\n'
        for x in range(0, 9):
            result += ('|' + ' {}   {}   {} |'*3).format(*
                                                         [y.number if y.number != 0 else ' ' for y in self.grid.data[x]])
            result += '\n'
            if x % 3 == 2:
                result += '+' + '---+' * 9 + '\n'
            else:
                result += '+' + '   +' * 9 + '\n'
        return result

    def is_possible_x(self, cell: Cell, number: int) -> bool:
        for x in range(0, 9):
            if cell.number == number:
                continue
            elif self.grid.get_cell(x, cell.y).number == number:
                return False
        return True

    def is_possible_y(self, cell: Cell, number: int) -> bool:
        for y in range(0, 9):
            if cell.number == number:
                continue
            elif self.grid.get_cell(cell.x, y).number == number:
                return False
        return True

    def is_possible_square(self, cell: Cell, number: int) -> bool:
        x_square_start = (cell.x // 3) * 3
        y_square_start = (cell.y // 3) * 3
        for x in range(0, 3):
            for y in range(0, 3):
                if cell.number == number:
                    continue
                elif self.grid.get_cell(x_square_start + x, y_square_start + y).number == number:
                    return False
        return True

    def is_possible(self, cell: Cell, number: int) -> bool:
        return self.is_possible_x(cell, number) and self.is_possible_y(cell, number) and self.is_possible_square(cell, number)

    def is_solved(self) -> bool:
        for y in range(0, 9):
            for x in range(0, 9):
                cell = self.grid.get_cell(x, y)
                if cell.number == 0:
                    return False
                if not self.is_possible(cell, cell.number):
                    return False
        return True

    def solve(self) -> None:
        for y in range(0, 9):
            for x in range(0, 9):
                cell = self.grid.get_cell(x, y)
                if cell.number == 0:
                    for number in range(1, 10):
                        if self.is_possible(cell, number):
                            cell.number = number
                            self.solve()
                            cell.number = 0
                    return
        self.grid = deepcopy(self.grid)


class SudokuTest(TestCase):
    def test_is_possible_x(self):
        sudoku = Sudoku(grid)
        self.assertFalse(sudoku.is_possible_x(grid.get_cell(2, 0), 5))
        self.assertFalse(sudoku.is_possible_x(grid.get_cell(2, 0), 3))
        self.assertFalse(sudoku.is_possible_x(grid.get_cell(2, 0), 7))
        self.assertTrue(sudoku.is_possible_x(grid.get_cell(2, 0), 4))
        self.assertTrue(sudoku.is_possible_x(grid.get_cell(2, 0), 6))
        self.assertTrue(sudoku.is_possible_x(grid.get_cell(2, 0), 8))
        self.assertTrue(sudoku.is_possible_x(grid.get_cell(2, 0), 1))
        self.assertTrue(sudoku.is_possible_x(grid.get_cell(2, 0), 2))
        self.assertTrue(sudoku.is_possible_x(grid.get_cell(2, 0), 9))

    def test_is_possible_y(self):
        sudoku = Sudoku(grid)
        self.assertFalse(sudoku.is_possible_y(grid.get_cell(0, 2), 5))
        self.assertTrue(sudoku.is_possible_y(grid.get_cell(0, 2), 3))
        self.assertFalse(sudoku.is_possible_y(grid.get_cell(0, 2), 7))
        self.assertTrue(sudoku.is_possible_y(grid.get_cell(0, 2), 1))
        self.assertTrue(sudoku.is_possible_y(grid.get_cell(0, 2), 2))
        self.assertFalse(sudoku.is_possible_y(grid.get_cell(0, 2), 4))
        self.assertFalse(sudoku.is_possible_y(grid.get_cell(0, 2), 6))
        self.assertFalse(sudoku.is_possible_y(grid.get_cell(0, 2), 8))
        self.assertTrue(sudoku.is_possible_y(grid.get_cell(0, 2), 9))

    def test_is_possible_square(self):
        sudoku = Sudoku(grid)
        self.assertFalse(sudoku.is_possible_square(grid.get_cell(0, 2), 3))
        self.assertFalse(sudoku.is_possible_square(grid.get_cell(0, 2), 5))
        self.assertFalse(sudoku.is_possible_square(grid.get_cell(0, 2), 6))
        self.assertFalse(sudoku.is_possible_square(grid.get_cell(0, 2), 8))
        self.assertFalse(sudoku.is_possible_square(grid.get_cell(0, 2), 9))
        self.assertTrue(sudoku.is_possible_square(grid.get_cell(0, 2), 1))
        self.assertTrue(sudoku.is_possible_square(grid.get_cell(0, 2), 2))
        self.assertTrue(sudoku.is_possible_square(grid.get_cell(0, 2), 4))
        self.assertTrue(sudoku.is_possible_square(grid.get_cell(0, 2), 7))

    def test_is_possible(self):
        sudoku = Sudoku(grid)
        self.assertFalse(sudoku.is_possible(grid.get_cell(4, 6), 8))
        self.assertFalse(sudoku.is_possible(grid.get_cell(4, 6), 1))
        self.assertFalse(sudoku.is_possible(grid.get_cell(4, 6), 7))
        self.assertFalse(sudoku.is_possible(grid.get_cell(4, 6), 9))
        self.assertFalse(sudoku.is_possible(grid.get_cell(4, 6), 6))
        self.assertFalse(sudoku.is_possible(grid.get_cell(4, 6), 4))
        self.assertFalse(sudoku.is_possible(grid.get_cell(4, 6), 2))
        self.assertTrue(sudoku.is_possible(grid.get_cell(4, 6), 3))
        self.assertTrue(sudoku.is_possible(grid.get_cell(4, 6), 5))

    def test_is_solved(self):
        sudoku = Sudoku(grid)
        self.assertFalse(sudoku.is_solved())
        sudoku.grid = grid_solved
        self.assertTrue(sudoku.is_solved())

    def test_solve(self):
        sudoku = Sudoku(grid)
        sudoku.solve()
        self.assertEqual(sudoku.grid.__repr__(), grid_solved.__repr__())


if __name__ == '__main__':
    main()
