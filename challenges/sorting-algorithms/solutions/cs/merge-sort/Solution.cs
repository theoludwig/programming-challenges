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
            int[] result = MergeSort(numbers.ToArray());
            foreach (int number in result)
            {
                Console.WriteLine(number);
            }
        }

        public static int[] MergeSort(int[] array)
        {
            if (array.Length <= 1)
            {
                return array;
            }
            int middle = array.Length / 2;
            int[] left = new int[middle];
            int[] right = new int[array.Length - middle];
            for (int index = 0; index < middle; index++)
            {
                left[index] = array[index];
            }
            for (int index = middle; index < array.Length; index++)
            {
                right[index - middle] = array[index];
            }
            left = MergeSort(left);
            right = MergeSort(right);
            return Merge(left, right);
        }

        public static int[] Merge(int[] left, int[] right)
        {
            int[] result = new int[left.Length + right.Length];
            int leftIndex = 0;
            int rightIndex = 0;
            for (int index = 0; index < result.Length; index++)
            {
                if (leftIndex >= left.Length)
                {
                    result[index] = right[rightIndex];
                    rightIndex++;
                }
                else if (rightIndex >= right.Length)
                {
                    result[index] = left[leftIndex];
                    leftIndex++;
                }
                else if (left[leftIndex] < right[rightIndex])
                {
                    result[index] = left[leftIndex];
                    leftIndex++;
                }
                else
                {
                    result[index] = right[rightIndex];
                    rightIndex++;
                }
            }
            return result;
        }
    }
}
