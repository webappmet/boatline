using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BoatLine.Models
{
    public class Ticket
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Reference { get; set; }
        public virtual Route Route { get; set; }
        public string Date { get; set; }
        public string StartTime { get; set; }

        // Setting up many to many
        public virtual ICollection<Cabin> Cabins { get; set; }
        
        public Ticket()
        {
            this.Cabins = new HashSet<Cabin>();
        }
    }
}