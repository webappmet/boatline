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
        public virtual Departure Departure { get; set; }
        // Storing price on ticket so that it does not change if cabin price is updated/changed in the future by admin
        public double Price { get; set; }
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