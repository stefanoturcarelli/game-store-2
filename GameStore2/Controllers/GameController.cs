using BLL;
using Microsoft.AspNetCore.Mvc;

namespace GameStore2.Controllers
{
    public class GameController : Controller
    {
        GameService gameService = new GameService();

        public IActionResult Index()
        {
            var response = gameService.GetAllGames();
            return View(response);
        }
    }
}
