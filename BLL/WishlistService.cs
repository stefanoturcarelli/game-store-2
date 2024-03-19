using DAL;
using Entities.Entities;
using Entities.Entities.DTO;
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

        public List<Wishlist> GetAllListsService()
        {
            return WLR.GetAllListsRepository();
        }
        public Wishlist? GetGameByIdService(int WishlistId)
        {
            return WLR.GetListByIdRepository(WishlistId);
        }

        public GameStoreResponse DeleteListService(int WishlistId)
        {
            return WLR.DeleteListRepository(WishlistId);
        }

        public string RegisterListService(Wishlist listFormDataObject)
        {
            return WLR.RegisterListRepository(listFormDataObject);
        }

    }
}
