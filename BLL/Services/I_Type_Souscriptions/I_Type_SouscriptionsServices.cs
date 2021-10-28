using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Inv.DAL.Repository;

namespace BLL.Services.I_Type_Souscriptions
{
    public class I_Type_SouscriptionServices : II_Type_SouscriptionServices
    {
        private readonly IUnitOfWork unitOfWork;

        public I_Type_SouscriptionServices(IUnitOfWork _unitOfWork)
        {

            this.unitOfWork = _unitOfWork;

        }


        #region Nationality Services
        public I_Type_Souscription GetById(int id)
        {

            return unitOfWork.Repository<I_Type_Souscription>().GetById(id);

        }

        public List<I_Type_Souscription> GetAll()
        {
            return unitOfWork.Repository<I_Type_Souscription>().GetAll();
        }

        public List<I_Type_Souscription> GetAll(Expression<Func<I_Type_Souscription, bool>> predicate)
        {
            return unitOfWork.Repository<I_Type_Souscription>().Get(predicate);
        }

        public I_Type_Souscription Insert(I_Type_Souscription entity)
        {
            var memb = unitOfWork.Repository<I_Type_Souscription>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public I_Type_Souscription Update(I_Type_Souscription entity)
        {

            var memb = unitOfWork.Repository<I_Type_Souscription>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<I_Type_Souscription>().Delete(id);
            unitOfWork.Save();
        }

        public void UpdateList(List<I_Type_Souscription> Lstservice)
        {

            var insertedRecord = Lstservice.Where(x => x.StatusFlag =='i');
            var updatedRecord = Lstservice.Where(x => x.StatusFlag == 'u');
            var deletedRecord = Lstservice.Where(x => x.StatusFlag == 'd');

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<I_Type_Souscription>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<I_Type_Souscription>().Insert(insertedRecord);


            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<I_Type_Souscription>().Delete(entity.ID_Souscription);
            }

            unitOfWork.Save();

        }
        #endregion
    }
}
