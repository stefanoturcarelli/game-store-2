using Entities.Context;
using Entities.Entities;

namespace DAL
{
    public class GameRepository
    {
        GameContext gameContext = new GameContext();

        public List<Game> GetAllGames()
        {
            return gameContext.Games.ToList();
        }
    }
}
