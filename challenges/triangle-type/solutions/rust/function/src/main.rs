use std::io;

pub struct Triangle {
    pub sides: [u32; 3],
}

impl Triangle {
    pub fn sides_type(&self) -> String {
        if (self.sides[0] + self.sides[1] < self.sides[2])
            || (self.sides[2] + self.sides[0] < self.sides[1])
            || (self.sides[2] + self.sides[1] < self.sides[0])
        {
            return String::from("impossible");
        }
        if self.sides[0] == self.sides[1] && self.sides[1] == self.sides[2] {
            return String::from("equilateral");
        }
        if self.sides[0] == self.sides[1]
            || self.sides[1] == self.sides[2]
            || self.sides[2] == self.sides[0]
        {
            return String::from("isosceles");
        }
        return String::from("scalene");
    }

    pub fn size(&self) -> usize {
        return self.sides.len();
    }
}

fn main() {
    let mut triangle = Triangle { sides: [0, 0, 0] };
    for index in 0..triangle.size() {
        let mut side = String::new();
        io::stdin()
            .read_line(&mut side)
            .expect("Failed to read `stdin` line.");
        let side: u32 = side
            .trim()
            .parse()
            .expect("Failed to convert `side` as an `u32`.");
        triangle.sides[index] = side;
    }
    println!("{}", triangle.sides_type());
}
