using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BoatLine.Models
{
    public class Departure
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public virtual Date Date { get; set; }
        public virtual Route Route { get; set; }
    }
}