using BLL;
using Entities.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace GameStore2.Controllers
{
    public class GameController : Controller
    {
        GameService gameService = new GameService();

        public IActionResult Index()
        {
            //var response = gameService.GetAllGamesService();
            //return View(response);

            return View();
        }

        // This method is called when the user clicks the "See Products" header link
        [HttpGet]
        public JsonResult ReadGames()
        {
            var products = gameService.GetAllGamesService();

            return Json(products);
        }

        [HttpGet]
        public JsonResult ReadGamesFilter(int? PublisherId, int? PlatformId, int? GenreId)
        {
            Entities.Entities.DTO.GameFilter.GameFilter filter = new Entities.Entities.DTO.GameFilter.GameFilter();
            filter.PublisherId = PublisherId;
            filter.PlatformId = PlatformId;
            filter.GenreId = GenreId;
            var products = gameService.GetAllGamesByFilterService(filter);

            return Json(products);
        }

        [HttpGet]
        public JsonResult ReadGameById(int gameId)
        {
            var specificGame = gameService.GetGameByIdService(gameId);

            return Json(specificGame);
        }

        [HttpPost]
        public JsonResult AddGame([FromBody] Game game)
        {
            var response = gameService.CreateGameService(game);
            return Json(response);
        }

        [HttpPost]
        public JsonResult UpdateGame([FromBody] Game game)
        {
            var gameEdited = gameService.EditGameService(game);
            return Json(gameEdited);
        }

        [HttpPost]
        public JsonResult DeleteGame([FromRoute] int id)
        {
            var gameDeleted = gameService.DeleteGameService(id);

            return Json(gameDeleted);

        }

        [HttpGet]
        public JsonResult GetAllGenres()
        {
            //TEMP
            return Json(new GenreService().GetAllGenresService());
        }
        [HttpGet]
        public JsonResult GetAllPlatforms()
        {
            //TEMP
            return Json(new PlatformService().GetAllPlatformsService());
        }
        [HttpGet]
        public JsonResult GetAllPublishers()
        {
            //TEMP
            return Json(new PublisherService().GetAllPublishersService());
        }
    }
}
