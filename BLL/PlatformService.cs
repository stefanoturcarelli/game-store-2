using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entities.Entities;
using Entities.Entities.DTO;

namespace BLL
{
    public class PlatformService
    {
        PlatformRepository platformRepository = new PlatformRepository();
        public List<Platform> GetAllPlatformsService()
        {
            return platformRepository.GetAllPlatformsRepository();
        }
        public Platform? GetPlatformByIdService(int PlatformId)
        {
            return platformRepository.GetPlatformByIdRepository(PlatformId);
        }
        public GameStoreResponse CreatePlatformService(Platform p)
        {
            if (p == null)
            {
                return new GameStoreResponse("Create failed: Platform is null");
            }
            TrimPlatform(p);
            GameStoreResponse validation = this.ValidatePlatform(p);
            if (validation.Success)
            {
                return platformRepository.CreatePlatformRepository(p);
            }
            validation.Message = "Create failed: " + validation.Message;
            return validation;
        }
        public GameStoreResponse EditPlatformService(Platform p)
        {
            if (p == null)
            {
                return new GameStoreResponse("Edit failed: Platform is null");
            }
            TrimPlatform(p);
            GameStoreResponse validation = this.ValidatePlatform(p);
            if (validation.Success)
            {
                return platformRepository.EditPlatformRepository(p);
            }
            validation.Message = "Edit failed: " + validation.Message;
            return validation;
        }
        public GameStoreResponse DeletePlatformService(int PlatformId)
        {
            return platformRepository.DeletePlatformRepository(PlatformId);
        }
        /// <summary>
        /// Removes extra whitespace around the edges of this object's properties
        /// </summary>
        private void TrimPlatform(Platform p)
        {
            if (p.PlatformName == null)
            {
                p.PlatformName = "";
            }
            p.PlatformName = p.PlatformName.Trim();
        }
        private GameStoreResponse ValidatePlatform(Platform p)
        {
            if (p.PlatformName == "")
            {
                return new GameStoreResponse("Platform name cannot be blank");
            }
            return new GameStoreResponse();
        }
    }
}