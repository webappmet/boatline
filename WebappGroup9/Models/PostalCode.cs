using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebappGroup9.Models
{
    public class PostalCode
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        //TODO perhaps change this to string anyways. It doesn't retain the 0 in 0170 and such in the DB with the type being int
        public string Code { get; set; }
        public string Name { get; set; }
    }
}