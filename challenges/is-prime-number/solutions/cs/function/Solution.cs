using System;
using System.Collections.Generic;

namespace Solution
{
    class Program
    {
        static void Main()
        {
            int number = int.Parse(Console.ReadLine());
            if (IsPrime(number))
            {
                Console.WriteLine("true");
            }
            else
            {
                Console.WriteLine("false");
            }
        }

        /// <summary>
        /// Checks if a number is prime.
        /// </summary>
        /// <param name="number">The number to check.</param>
        /// <returns>True if the number is prime, false otherwise.</returns>
        static public bool IsPrime(int number)
        {
            return GetDividers(number).Length == 2;
        }

        /// <summary>
        /// Gets the dividers of a number.
        /// </summary>
        /// <param name="number">The number to get the dividers of.</param>
        /// <returns>An array of the dividers of the number.</returns>
        static public int[] GetDividers(int number)
        {
            List<int> dividers = new List<int>();
            for (int index = 1; index <= number; index++)
            {
                if (number % index == 0)
                {
                    dividers.Add(index);
                }
            }
            return dividers.ToArray();
        }
    }
}
