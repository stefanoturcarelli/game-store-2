using BLL;
using Entities.Entities;
using Microsoft.AspNetCore.Mvc;

namespace GameStore2.Controllers
{
    public class WishlistController : Controller
    {

        // Instantiate the StudentService class
        WishlistService WLS = new WishlistService();

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult RegisterListController([FromBody] Wishlist listFormDataObject)
        {
            var response = WLS.RegisterListService(listFormDataObject);
            return Json(response);
        }
    }
}
