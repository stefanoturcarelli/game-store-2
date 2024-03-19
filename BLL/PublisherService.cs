using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entities.Context;
using Entities.Entities;
using Entities.Entities.DTO;

namespace BLL
{
    public class PublisherService
    {
        PublisherRepository publisherRepository = new PublisherRepository();
        public List<Publisher> GetAllPublishersService()
        {
            return publisherRepository.GetAllPublishersRepository();
        }
        public Publisher? GetPublisherByIdService(int PublisherId)
        {
            return publisherRepository.GetPublisherByIdRepository(PublisherId);
        }
        public GameStoreResponse CreatePublisherService(Publisher p)
        {
            if (p == null)
            {
                return new GameStoreResponse("Create failed: Publisher is null");
            }
            TrimPublisher(p);
            GameStoreResponse validation = this.ValidatePublisher(p);
            if (validation.Success)
            {
                return publisherRepository.CreatePublisherRepository(p);
            }
            validation.Message = "Create failed: " + validation.Message;
            return validation;
        }
        public GameStoreResponse EditPublisherService(Publisher p)
        {
            if (p == null)
            {
                return new GameStoreResponse("Edit failed: Publisher is null");
            }
            TrimPublisher(p);
            GameStoreResponse validation = this.ValidatePublisher(p);
            if (validation.Success)
            {
                return publisherRepository.EditPublisherRepository(p);
            }
            validation.Message = "Edit failed: " + validation.Message;
            return validation;
        }
        public GameStoreResponse DeletePublisherService(int PublisherId)
        {
            return publisherRepository.DeletePublisherRepository(PublisherId);
        }
        /// <summary>
        /// Removes extra whitespace around the edges of this object's properties
        /// </summary>
        private void TrimPublisher(Publisher p)
        {
            if (p.PublisherName == null)
            {
                p.PublisherName = "";
            }
            p.PublisherName = p.PublisherName.Trim();
            if (p.PublisherEmail == null)
            {
                p.PublisherEmail = "";
            }
            p.PublisherEmail = p.PublisherEmail.Trim();
            if (p.PublisherDescription == null)
            {
                p.PublisherDescription = "";
            }
            p.PublisherDescription = p.PublisherDescription.Trim();
        }
        private GameStoreResponse ValidatePublisher(Publisher p)
        {
            if (p.PublisherName == "")
            {
                return new GameStoreResponse("Publisher name cannot be blank");
            }
            if (p.PublisherEmail == "")
            {
                return new GameStoreResponse("Publisher email cannot be blank");
            }
            return new GameStoreResponse();
        }
    }
}