import 'dart:io';

void main() {
  int length = int.parse(readLineSync());
  List<int> numbers = [];
  for (int indexInput = 0; indexInput < length; indexInput++) {
    numbers.add(int.parse(readLineSync()));
  }
  List<int> sortedNumbers = mergeSort(numbers);
  for (int index = 0; index < length; index++) {
    print(sortedNumbers[index]);
  }
}

List<List<int>> divideList(List<int> numbers) {
  var middle = (numbers.length / 2).round();
  var left = numbers.sublist(0, middle);
  var right = numbers.sublist(middle, numbers.length);
  return [left, right];
}

List<int> merge(List<int> numbers1, List<int> numbers2) {
  var indexNumbers1 = 0;
  var indexNumbers2 = 0;
  var result = <int>[];
  while (indexNumbers1 < numbers1.length && indexNumbers2 < numbers2.length) {
    if (numbers1[indexNumbers1] < numbers2[indexNumbers2]) {
      result.add(numbers1[indexNumbers1]);
      indexNumbers1 += 1;
    } else {
      result.add(numbers2[indexNumbers2]);
      indexNumbers2 += 1;
    }
  }
  for (var index = indexNumbers1; index < numbers1.length; index++) {
    result.add(numbers1[index]);
  }
  for (var index = indexNumbers2; index < numbers2.length; index++) {
    result.add(numbers2[index]);
  }
  return result;
}

List<int> mergeSort(Iterable<int> numbersInput) {
  var numbers = [...numbersInput];
  if (numbers.length <= 1) {
    return numbers;
  }
  var dividedList = divideList(numbers);
  var left = mergeSort(dividedList[0]);
  var right = mergeSort(dividedList[1]);
  return merge(left, right);
}

String readLineSync() {
  String? string = stdin.readLineSync();
  return string == null ? '' : string;
}
