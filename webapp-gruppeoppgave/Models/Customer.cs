using System.Collections.Generic;

namespace webapp_gruppeoppgave.Models
{
    public class Customer
    {
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string adress { get; set; }
        public string tlfNr { get; set; }
        
        // Ha kunde som hoved tabell, bestilling sterkt avhengig av kunde, pizza avhengig av bestilling
        public virtual List<Ticket> Tickets { get; set; }
    }
}