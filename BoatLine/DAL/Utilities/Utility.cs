using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Security.Cryptography;
using BoatLine.Models.Auth;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace BoatLine.DAL.Utilities
{
    [ExcludeFromCodeCoverage]
    public static class Utility
    {
        private static readonly Random Random = new();
        
        /**
         * Method for generating random hex number for customer and ticket reference
         */
        public static string GetRandomHexNumber(int digits)
        {
            var buffer = new byte[digits / 2];
            Random.NextBytes(buffer);
            var result = string.Concat(buffer.Select(x => x.ToString("X2")).ToArray());
            return digits % 2 == 0 ? result : result + Random.Next(16).ToString("X");
        }
        
        /**
         * Method for generating hash
         */
        public static byte[] GenerateHash(string password, byte[] salt)
        {
            return KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 1000,
                numBytesRequested: 32);
        }

        /**
         * Method for generating salt
         */
        public static byte[] GenerateSalt()
        {
            var csp = new RNGCryptoServiceProvider();
            var salt = new byte[24];
            csp.GetBytes(salt);
            return salt;
        }
        
        public static string Base64Encode(string plainText) {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return Convert.ToBase64String(plainTextBytes);
        }
        
        public static string Base64Decode(string base64EncodedData) {
            var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        public static Admin DecodeAdmin(string credentials)
        {
            try
            {
                var sub = credentials[6..];
                var decode = Base64Decode(sub);
                var res = decode.Split(":");
                
                Console.WriteLine(decode);
                Console.WriteLine(res[0]);
                Console.WriteLine(res[1]);

                return new Admin { Username = res[0], Password = res[1] };
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}