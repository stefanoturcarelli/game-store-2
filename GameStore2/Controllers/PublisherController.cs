using BLL;
using Entities.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameStore2.Controllers
{
    public class PublisherController : Controller
    {
        // Instantiate the publisherService class
        PublisherService publisherService = new PublisherService();

        public IActionResult Index()
        {
            var response = publisherService.GetAllPublishersService();
            return View(response);
        }

        [HttpPost]
        public IActionResult AddPublisher([FromBody] Publisher publisherFormDataObject)
        {
            var response = publisherService.CreatePublisherService(publisherFormDataObject);
            return Json(response);
        }

        public JsonResult ReadPublisher()
        {
            var products = publisherService.GetAllPublishersService();

            return Json(products);
        }

        [HttpGet]
        public JsonResult ReadPublisherById(int publisherId)
        {
            var specificGame = publisherService.GetPublisherByIdService(publisherId);

            return Json(specificGame);
        }

        [HttpPost]
        public JsonResult UpdatePublisher([FromBody] Publisher publisherToUpdate)
        {
            var publisherEdited = publisherService.EditPublisherService(publisherToUpdate);
            return Json(publisherEdited);
        }

        [HttpPost]
        public JsonResult DeletePublisher([FromRoute] int id)
        {
            var gameDeleted = publisherService.DeletePublisherService(id);

            return Json(gameDeleted);

        }
    }
}

