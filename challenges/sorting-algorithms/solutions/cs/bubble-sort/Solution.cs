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
            int[] result = BubbleSort(numbers.ToArray());
            foreach (int number in result)
            {
                Console.WriteLine(number);
            }
        }

        public static int[] BubbleSort(int[] array)
        {
            for (int index1 = 0; index1 < array.Length; index1++)
            {
                for (int index2 = 0; index2 < array.Length - 1; index2++)
                {
                    if (array[index2] > array[index2 + 1])
                    {
                        int temporary = array[index2];
                        array[index2] = array[index2 + 1];
                        array[index2 + 1] = temporary;
                    }
                }
            }
            return array;
        }
    }
}
