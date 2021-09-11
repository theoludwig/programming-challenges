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
            int[] result = NativeSort(numbers.ToArray());
            foreach (int number in result)
            {
                Console.WriteLine(number);
            }
        }

        public static int[] NativeSort(int[] array)
        {
            Array.Sort(array);
            return array;
        }
    }
}
