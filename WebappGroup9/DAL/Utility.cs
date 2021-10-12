using System;
using System.Linq;

namespace WebappGroup9.DAL
{
    public class Utility
    {
        static readonly Random random = new Random();
        
        public static string GetRandomHexNumber(int digits)
        {
            byte[] buffer = new byte[digits / 2];
            random.NextBytes(buffer);
            var result = string.Concat(buffer.Select(x => x.ToString("X2")).ToArray());
            return digits % 2 == 0 ? result : result + random.Next(16).ToString("X");
        }
    }
}