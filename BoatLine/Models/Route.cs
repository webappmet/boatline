using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BoatLine.Models
{
    public class Route
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        public string Departure { get; set; }
        public string Destination { get; set; }
        
        public int DurationDays { get; set; }
        
        public int DurationHours { get; set; }
    }
}