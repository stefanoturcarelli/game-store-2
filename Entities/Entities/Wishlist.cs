using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    public class Wishlist
    {
        [Key] 
        public int WishlistId { get; set; }

        [MaxLength(50)]
        public string WishlistName { get; set; }

        public string WishlistDescription { get; set; }

        // Foreign key property
        public int UserId { get; set; }

        // Navigation property
        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
