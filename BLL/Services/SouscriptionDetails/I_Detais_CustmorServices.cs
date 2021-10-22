using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Inv.DAL.Repository;

namespace BLL.Services.SouscriptionDetails
{
   public class I_Detais_CustmorServices : II_Detais_CustmorServices
    {
        private readonly IUnitOfWork unitOfWork;

        public I_Detais_CustmorServices(IUnitOfWork _unitOfWork)
        {

            this.unitOfWork = _unitOfWork;

        }


        #region Nationality Services
        public I_Detais_Data_Custmor GetById(int id)
        {

            return unitOfWork.Repository<I_Detais_Data_Custmor>().GetById(id);

        }

        public List<I_Detais_Data_Custmor> GetAll()
        {
            return unitOfWork.Repository<I_Detais_Data_Custmor>().GetAll();
        }

        public List<I_Detais_Data_Custmor> GetAll(Expression<Func<I_Detais_Data_Custmor, bool>> predicate)
        {
            return unitOfWork.Repository<I_Detais_Data_Custmor>().Get(predicate);
        }

        public I_Detais_Data_Custmor Insert(I_Detais_Data_Custmor entity)
        {
            var memb = unitOfWork.Repository<I_Detais_Data_Custmor>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public I_Detais_Data_Custmor Update(I_Detais_Data_Custmor entity)
        {

            var memb = unitOfWork.Repository<I_Detais_Data_Custmor>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<I_Detais_Data_Custmor>().Delete(id);
            unitOfWork.Save();
        }

        public void UpdateList(List<I_Detais_Data_Custmor> Lstservice)
        {

            var insertedRecord = Lstservice.Where(x => x.StatusFlag == 'i');
            var updatedRecord = Lstservice.Where(x => x.StatusFlag == 'u');
            var deletedRecord = Lstservice.Where(x => x.StatusFlag == 'd');

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<I_Detais_Data_Custmor>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<I_Detais_Data_Custmor>().Insert(insertedRecord);


            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<I_Detais_Data_Custmor>().Delete(entity.ID);
            }

            unitOfWork.Save();

        }
        #endregion
    }
}
