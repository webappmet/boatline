using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace WebappGroup9.Models
{
    public class Cabin
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        public string Type { get; set; }
        // TODO Make this be like car brand and model selection
        // Where the first dropdown causes the second one to load the option for rooms
        public string Floor { get; set; } 
        public string Room { get; set; }
        public double Price { get; set; }
        // TODO Use this to calculate what type of cabins a certain amount of customers can spend (On frontend)

        public int Beds { get; set; }

        // Setting up many to many
        // Ignoring looping Json
        // Source: https://stackoverflow.com/questions/7397207/json-net-error-self-referencing-loop-detected-for-type
        [JsonIgnore] 
        [IgnoreDataMember] 
        public virtual ICollection<Ticket> Tickets { get; set; }

        public Cabin()
        {
            this.Tickets = new HashSet<Ticket>();
        }
        
    }
}