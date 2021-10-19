using System;
using System.Linq;

namespace BoatLine.DAL
{
    public static class Utility
    {
        private static readonly Random Random = new Random();
        
        /**
         * Method for generating random hex number for customer and ticket reference
         */
        public static string GetRandomHexNumber(int digits)
        {
            byte[] buffer = new byte[digits / 2];
            Random.NextBytes(buffer);
            var result = string.Concat(buffer.Select(x => x.ToString("X2")).ToArray());
            return digits % 2 == 0 ? result : result + Random.Next(16).ToString("X");
        }
    }
}