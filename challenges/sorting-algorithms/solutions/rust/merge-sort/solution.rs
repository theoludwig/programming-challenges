use std::io::{self, BufRead};

fn main() {
  let mut numbers: Vec<i64> = Vec::new();
  let stdin = io::stdin();
  for line in stdin.lock().lines().skip(1) {
    let line = line.unwrap();
    let number: i64 = line.trim().parse().unwrap();
    numbers.push(number);
  }
  merge_sort(&mut numbers);
  for number in numbers {
    println!("{}", number);
  }
}

pub fn merge_sort(array: &mut Vec<i64>) {
  if array.len() > 1 {
    let mid = array.len() / 2;
    let mut left = array[..mid].to_vec();
    let mut right = array[mid..].to_vec();
    merge_sort(&mut left);
    merge_sort(&mut right);
    merge(left, right, array);
  }
}

pub fn merge(left: Vec<i64>, right: Vec<i64>, array: &mut Vec<i64>) {
  let mut left_index = 0;
  let mut right_index = 0;
  let mut array_index = 0;
  while left_index < left.len() && right_index < right.len() {
    if left[left_index] <= right[right_index] {
      array[array_index] = left[left_index];
      left_index += 1;
    } else {
      array[array_index] = right[right_index];
      right_index += 1;
    }
    array_index += 1;
  }
  while left_index < left.len() {
    array[array_index] = left[left_index];
    left_index += 1;
    array_index += 1;
  }
  while right_index < right.len() {
    array[array_index] = right[right_index];
    right_index += 1;
    array_index += 1;
  }
}
