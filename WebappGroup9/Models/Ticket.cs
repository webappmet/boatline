using System.Collections.Generic;

namespace WebappGroup9.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        
        public string Reference { get; set; }
        public virtual Route Route { get; set; }
        public string Date { get; set; }
        public string StartTime { get; set; }

        // This is how to do many to many
        public virtual ICollection<Cabin> Cabins { get; set; }
        
        public Ticket()
        {
            this.Cabins = new HashSet<Cabin>();
        }
    }
}