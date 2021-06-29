import 'dart:io';

void main() {
  int length = int.parse(readLineSync());
  List<int> numbers = [];
  for (int indexInput = 0; indexInput < length; indexInput++) {
    numbers.add(int.parse(readLineSync()));
  }
  List<int> sortedNumbers = insertionSort(numbers);
  for (int index = 0; index < length; index++) {
    print(sortedNumbers[index]);
  }
}

List<int> insertionSort(Iterable<int> numbersInput) {
  var numbers = [...numbersInput];
  for (var index1 = 0; index1 < numbers.length; index1++) {
    var current = numbers[index1];
    var index2 = index1 - 1;
    while (index2 >= 0 && numbers[index2] > current) {
      numbers[index2 + 1] = numbers[index2];
      index2 -= 1;
    }
    numbers[index2 + 1] = current;
  }
  return numbers;
}

String readLineSync() {
  String? string = stdin.readLineSync();
  return string == null ? '' : string;
}
