namespace GameStore2.ViewModels
{
    public class GameViewModel
    {
        public int GameId { get; set; }
        public string PublisherName { get; set; }
        public string PlatformName { get; set; }
        public string GameName { get; set; }
        public string GenreName { get; set; }
        public decimal Price { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}
