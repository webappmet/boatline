using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace WebappGroup9.Models
{
    public class Ticket
    {
        // Tor uses this but i think it is for a key that doesn't autoincrement or something i dunno
        // [Key]
        // [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public virtual Route Route { get; set; }
        public string Date { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }

        public int CabinAmount { get; set; }
        public virtual List<Cabin> Cabin { get; set; }

        // TODO add customer list for when we do several customers per line.
        // public virtual List<Customer> Customers { get; set; }
    }
}