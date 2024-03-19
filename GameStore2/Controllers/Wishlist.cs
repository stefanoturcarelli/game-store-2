using Microsoft.AspNetCore.Mvc;

namespace GameStore2.Controllers
{
    public class Wishlist : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
