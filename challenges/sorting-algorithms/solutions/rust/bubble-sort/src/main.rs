use std::io::{self, BufRead};

fn main() {
    let mut numbers: Vec<i64> = Vec::new();
    let stdin = io::stdin();
    for line in stdin.lock().lines().skip(1) {
        let line = line.unwrap();
        let number: i64 = line.trim().parse().unwrap();
        numbers.push(number);
    }
    bubble_sort(&mut numbers);
    for number in numbers {
        println!("{}", number);
    }
}

pub fn bubble_sort<T: Ord>(array: &mut [T]) {
    for index1 in 0..array.len() {
        for index2 in 0..array.len() - 1 - index1 {
            if array[index2] > array[index2 + 1] {
                array.swap(index2, index2 + 1);
            }
        }
    }
}
