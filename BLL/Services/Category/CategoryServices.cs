using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Inv.DAL.Repository;

namespace Inv.BLL.Services.Category
{
   public class CategoryServices : ICategoryServices
    {
        private readonly IUnitOfWork unitOfWork;

        public CategoryServices(IUnitOfWork _unitOfWork)
        {

            this.unitOfWork = _unitOfWork;

        }


        #region Nationality Services
        public CATEGRES GetById(int id)
        {

            return unitOfWork.Repository<CATEGRES>().GetById(id);

        }

        public List<CATEGRES> GetAll()
        {
            return unitOfWork.Repository<CATEGRES>().GetAll();
        }

        public List<CATEGRES> GetAll(Expression<Func<CATEGRES, bool>> predicate)
        {
            return unitOfWork.Repository<CATEGRES>().Get(predicate);
        }

        public CATEGRES Insert(CATEGRES entity)
        {
            var memb = unitOfWork.Repository<CATEGRES>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public CATEGRES Update(CATEGRES entity)
        {

            var memb = unitOfWork.Repository<CATEGRES>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<CATEGRES>().Delete(id);
            unitOfWork.Save();
        }

        public void UpdateList(List<CATEGRES> Lstservice)
        {

            var insertedRecord = Lstservice.Where(x => x.StatusFlag == 'i');
            var updatedRecord = Lstservice.Where(x => x.StatusFlag == 'u');
            var deletedRecord = Lstservice.Where(x => x.StatusFlag == 'd');

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<CATEGRES>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<CATEGRES>().Insert(insertedRecord);


            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<CATEGRES>().Delete(entity.ID_CAT);
            }

            unitOfWork.Save();

        }
        #endregion
    }
}
