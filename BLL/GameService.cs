using DAL;
using Entities.Entities;

namespace BLL
{
    public class GameService
    {
        GameRepository gameRepository = new GameRepository();

        public List<Game> GetAllGames()
        {
            return gameRepository.GetAllGames();
        }
    }
}
