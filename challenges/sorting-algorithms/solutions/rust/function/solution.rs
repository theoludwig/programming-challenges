use std::io::{self, BufRead};

fn main() {
  let mut numbers: Vec<i64> = Vec::new();
  let stdin = io::stdin();
  for line in stdin.lock().lines().skip(1) {
    let line = line.unwrap();
    let number: i64 = line.trim().parse().unwrap();
    numbers.push(number);
  }
  numbers.sort();
  for number in numbers {
    println!("{}", number);
  }
}
