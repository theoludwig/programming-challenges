using System;
using System.Collections.Generic;

namespace Solution
{
    class Program
    {
        static void Main()
        {
            string line = Console.ReadLine();
            Console.WriteLine(GetAcronym(line));
        }

        /// <summary>
        /// Returns the acronym of the given string.
        /// </summary>
        /// <param name="line">The string to get the acronym of.</param>
        /// <returns>The acronym of the given string.</returns>
        public static string GetAcronym(string line)
        {
            line = ReplaceString(line, "\"", "");
            string[] words = SplitString(line, " ");
            string acronym = "";
            foreach (string word in words)
            {
                acronym += word[0].ToString().ToUpper();
            }
            return acronym;
        }

        /// <summary>
        /// Splits a string into words.
        /// </summary>
        /// <param name="source">The string to split.</param>
        /// <param name="delimiter">The delimiter to split the string by.</param>
        /// <returns>An array of words.</returns>
        public static string[] SplitString(string source, string delimiter)
        {
            List<string> result = new List<string>();
            string current = "";
            for (int index = 0; index < source.Length; index++)
            {
                string character = source[index].ToString();
                if (character == delimiter)
                {
                    result.Add(current);
                    current = "";
                }
                else
                {
                    current += character;
                }
            }
            result.Add(current);
            return result.ToArray();
        }

        /// <summary>
        /// Replaces all instances of a string with another string.
        /// </summary>
        /// <param name="source">The source string.</param>
        /// <param name="oldValue">The string to replace.</param>
        /// <param name="newValue">The string to replace with.</param>
        /// <returns>The new string.</returns>
        public static string ReplaceString(string source, string oldValue, string newValue)
        {
            string result = "";
            for (int index = 0; index < source.Length; index++)
            {
                if (source[index].ToString() == oldValue)
                {
                    result += newValue;
                }
                else
                {
                    result += source[index];
                }
            }
            return result;
        }
    }
}
