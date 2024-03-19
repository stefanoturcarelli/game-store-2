using Entities.Context;
using Entities.Entities;
using Entities.Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class WishlistRepository
    {

        GameStoreContext GSC = new GameStoreContext();

        public string RegisterListRepository(Wishlist listFormDataObject)
        {
            User user = new User();


            if (listFormDataObject != null)
            {
                GSC.Wishlists.Add(listFormDataObject);
                GSC.SaveChanges();
                return "success";
            }
            else
            {
                return "error";
            }
        }

        public GameStoreResponse DeleteListRepository(int WishlistId)
        {

            GSC.Wishlists.RemoveRange();


            return new GameStoreResponse("Delete failed: Cannot find list with id " + WishlistId);
        }

        public List<Wishlist> GetAllListsRepository()
        {
            return GSC.Wishlists.ToList();
        }
        public Wishlist? GetListByIdRepository(int WishlistId)
        {
            return GSC.Wishlists.Where(x => x.WishlistId == WishlistId).FirstOrDefault();
        }

    }
}
