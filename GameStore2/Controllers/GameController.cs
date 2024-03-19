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
        public JsonResult ReadGameById(int gameId)
        {
            var specificGame = gameService.GetGameByIdService(gameId);

            return Json(specificGame);
        }

        [HttpPost]
        public JsonResult AddGame([FromBody] Game gameObj)
        {
            var response = gameService.CreateGameService(gameObj);
            return Json(response);
        }

        [HttpPost]
        public JsonResult UpdateGame([FromBody] Game gameToUpdate)
        {
            var gameEdited = gameService.EditGameService(gameToUpdate);
            return Json(gameEdited);
        }

        [HttpPost]
        public JsonResult DeleteGame([FromRoute] int id)
        {
            var gameDeleted = gameService.DeleteGameService(id);

            return Json(gameDeleted);

        }
    }
}
