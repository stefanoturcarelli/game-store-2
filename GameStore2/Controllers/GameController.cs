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
            var response = gameService.GetAllGamesService();
            return View(response);
        }

        [HttpPost]
        public IActionResult AddGame([FromBody] Game gameObj)
        {
            var response = gameService.CreateGameService(gameObj);
            return Json(response);
        }
    }
}
