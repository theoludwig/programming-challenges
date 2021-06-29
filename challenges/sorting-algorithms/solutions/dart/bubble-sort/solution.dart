import 'dart:io';

void main() {
  int length = int.parse(readLineSync());
  List<int> numbers = [];
  for (int indexInput = 0; indexInput < length; indexInput++) {
    numbers.add(int.parse(readLineSync()));
  }
  List<int> sortedNumbers = bubbleSort(numbers);
  for (int index = 0; index < length; index++) {
    print(sortedNumbers[index]);
  }
}

List<int> bubbleSort(Iterable<int> numbersInput) {
  var numbers = [...numbersInput];
  for (var index1 = 0; index1 < numbers.length; index1++) {
    for (var index2 = 0; index2 < numbers.length - index1 - 1; index2++) {
      if (numbers[index2] > numbers[index2 + 1]) {
        var temporary = numbers[index2];
        numbers[index2] = numbers[index2 + 1];
        numbers[index2 + 1] = temporary;
      }
    }
  }
  return numbers;
}

String readLineSync() {
  String? string = stdin.readLineSync();
  return string == null ? '' : string;
}
