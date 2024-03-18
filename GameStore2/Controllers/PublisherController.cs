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
    }
}
