using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebappGroup9.Models
{
    public class Route
    {
        /* TODO
         * Route type (kind of how many days and such, express vs cruise i dunno)
         * Amount of bags
         * Type of living space aboard boat, like standard, with windows, luxury i dunno
         * Parking space for the boat?*/

        // Trying to make it so that it doesn't auto increment here, routes can be used again without adding new entry
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        public string Departure { get; set; }
        public string Destination { get; set; }
        
        public int DurationDays { get; set; }
        
        public int DurationHours { get; set; }
    }
}