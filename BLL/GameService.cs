using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entities.Entities;
using Entities.Entities.DTO;
using Entities.Entities.DTO.GameFilter;
using GameStore2.ViewModels;

namespace BLL
{
    public class GameService
    {
        GameRepository gameRepository = new GameRepository();
        public List<GameViewModel> GetAllGamesService()
        {
            return gameRepository.GetAllGamesRepository();
        }
        public Game? GetGameByIdService(int GameId)
        {
            return gameRepository.GetGameByIdRepository(GameId);
        }
        public GameStoreResponse CreateGameService(Game g)
        {
            if (g == null)
            {
                return new GameStoreResponse("Create failed: Game is null");
            }
            this.TrimGame(g);
            GameStoreResponse validation = this.ValidateGame(g);
            if (validation.Success)
            {
                return gameRepository.CreateGameRepository(g);
            }
            validation.Message = "Create failed: " + validation.Message;
            return validation;
        }
        public GameStoreResponse EditGameService(Game g)
        {
            if (g == null)
            {
                return new GameStoreResponse("Edit failed: Game is null");
            }
            this.TrimGame(g);
            GameStoreResponse validation = this.ValidateGame(g);
            if (validation.Success)
            {
                return gameRepository.EditGameRepository(g);
            }
            validation.Message = "Edit failed: " + validation.Message;
            return validation;
        }
        public GameStoreResponse DeleteGameService(int GameId)
        {
            return gameRepository.DeleteGameRepository(GameId);
        }

        public List<Game> GetAllGamesByFilterService(IGameFilter gameFilter)
        {
            return gameRepository.GetAllGamesByFilterRepository(gameFilter);
        }
        /// <summary>
        /// Removes extra whitespace around the edges of this object's properties
        /// </summary>
        private void TrimGame(Game g)
        {
            if (g.GameName==null)
            {
                g.GameName = "";
            }
            g.GameName = g.GameName.Trim();
            if (g.GameDescription == null)
            {
                g.GameDescription = "";
            }
            g.GameDescription = g.GameDescription.Trim();
        }
        private GameStoreResponse ValidateGame(Game g)
        {
            if (g.GameName == "")
            {
                return new GameStoreResponse("Game name cannot be blank");
            }
            return new GameStoreResponse();
        }
    }
}