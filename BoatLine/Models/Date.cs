using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BoatLine.Models
{
    public class Date
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public int Minutes { get; set; }
        public int Hours { get; set; }
    }
}