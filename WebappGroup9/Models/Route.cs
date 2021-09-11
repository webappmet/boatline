using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebappGroup9.Models
{
    public class Route
    {
        // Trying to make it so that it doesn't auto increment here, routes can be used again
        [Key]
        [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string Departure { get; set; }
        public string Destination { get; set; }
    }
}