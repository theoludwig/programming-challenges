using System;
using System.Collections.Generic;

namespace Solution
{
    class Program
    {
        static void Main()
        {
            string line = Console.ReadLine();
            List<int> numbers = new List<int>();
            while ((line = Console.ReadLine()) != null)
            {
                numbers.Add(int.Parse(line));
            }
            int[] result = InsertionSort(numbers.ToArray());
            foreach (int number in result)
            {
                Console.WriteLine(number);
            }
        }

        public static int[] InsertionSort(int[] array)
        {
            for (int index1 = 1; index1 < array.Length; index1++)
            {
                int index2 = index1;
                while (index2 > 0 && array[index2 - 1] > array[index2])
                {
                    int temporary = array[index2];
                    array[index2] = array[index2 - 1];
                    array[index2 - 1] = temporary;
                    index2--;
                }
            }
            return array;
        }
    }
}
