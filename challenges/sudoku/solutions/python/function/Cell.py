class Cell:
    def __init__(self, number: int, x: int, y: int) -> None:
        self.number = number
        self.x = x
        self.y = y

    def __repr__(self) -> str:
        return str(self.number)
