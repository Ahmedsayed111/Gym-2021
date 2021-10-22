using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Inv.DAL.Repository;

namespace BLL.Services.Souscription
{
   public class I_Customer_GymServices : II_Customer_GymServices
    {
        private readonly IUnitOfWork unitOfWork;

        public I_Customer_GymServices(IUnitOfWork _unitOfWork)
        {

            this.unitOfWork = _unitOfWork;

        }


        #region Nationality Services
        public I_Customer_Gym GetById(int id)
        {

            return unitOfWork.Repository<I_Customer_Gym>().GetById(id);

        }

        public List<I_Customer_Gym> GetAll()
        {
            return unitOfWork.Repository<I_Customer_Gym>().GetAll();
        }

        public List<I_Customer_Gym> GetAll(Expression<Func<I_Customer_Gym, bool>> predicate)
        {
            return unitOfWork.Repository<I_Customer_Gym>().Get(predicate);
        }

        public I_Customer_Gym Insert(I_Customer_Gym entity)
        {
            var memb = unitOfWork.Repository<I_Customer_Gym>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public I_Customer_Gym Update(I_Customer_Gym entity)
        {

            var memb = unitOfWork.Repository<I_Customer_Gym>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<I_Customer_Gym>().Delete(id);
            unitOfWork.Save();
        }

        public void UpdateList(List<I_Customer_Gym> Lstservice)
        {

            var insertedRecord = Lstservice.Where(x => x.StatusFlag == "i");
            var updatedRecord = Lstservice.Where(x => x.StatusFlag == "u");
            var deletedRecord = Lstservice.Where(x => x.StatusFlag == "d");

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<I_Customer_Gym>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<I_Customer_Gym>().Insert(insertedRecord);


            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<I_Customer_Gym>().Delete(entity.ID_Cust);
            }

            unitOfWork.Save();

        }
        #endregion
    }
}
