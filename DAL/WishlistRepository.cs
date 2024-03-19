using Entities.Context;
using Entities.Entities;
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

    }
}
