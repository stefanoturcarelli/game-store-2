using DAL;
using Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class WishlistService
    {

        WishlistRepository WLR = new WishlistRepository();

        public string RegisterListService(Wishlist listFormDataObject)
        {
            return WLR.RegisterListRepository(listFormDataObject);
        }

    }
}
