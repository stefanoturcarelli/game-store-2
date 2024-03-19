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

        [HttpPost]
        public JsonResult DeleteList([FromRoute] int id)
        {
            var listDeleted = WLS.DeleteListService(id);

            return Json(listDeleted);

        }

        [HttpGet]
        public JsonResult ReadLists()
        {
            var products = WLS.GetAllListsService();

            return Json(products);
        }

        [HttpGet]
        public JsonResult ReadListById(int wishlistId)
        {
            var specificGame = WLS.GetGameByIdService(wishlistId);

            return Json(specificGame);
        }
    }
}
