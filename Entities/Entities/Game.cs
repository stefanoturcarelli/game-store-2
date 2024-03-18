using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Entities
{
    public class Game
    {
        [Key]
        public int GameId { get; set; }
        [ForeignKey("Publisher")]
        public int PublisherId { get; set; }
        [ForeignKey("Platform")]
        public int PlatformId { get; set; }
        [MaxLength(64)]
        public string GameName { get; set; }
        public string GameDescription { get; set; }
        [ForeignKey("Genre")]
        public int GenreId { get; set; }
        [Column(TypeName = "numeric(18,2)")]
        public decimal Price { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}
