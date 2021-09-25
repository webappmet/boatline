using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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

        // Endtime will be calculated from route duration
        // public string EndTime { get; set; }

        public int CabinAmount { get; set; }
        
        // This is how to do many to many
        public virtual ICollection<Cabin> Cabins { get; set; }


        public Ticket()
        {
            this.Cabins = new HashSet<Cabin>();
        }

        /*
         You wouldn't do it this way. You would make one ticket for every customer with the same cabin
         The cabin ID is unique and different tickets can be bound to the same ticket
         
        public virtual Customer Owner { get; set; }
        
        public virtual List<Customer> BonusCustomers { get; set; }
        */
    }
}