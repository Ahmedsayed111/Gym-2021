using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Inv.DAL.Repository;

namespace BLL.Services.I_Attendancee
{
   public class I_AttendanceServices : II_AttendanceServices
    {
        private readonly IUnitOfWork unitOfWork;

        public I_AttendanceServices(IUnitOfWork _unitOfWork)
        {

            this.unitOfWork = _unitOfWork;

        }


        #region Nationality Services
        public IQ__Attendance GetById(int id)
        {

            return unitOfWork.Repository<IQ__Attendance>().GetById(id);

        }

        public List<IQ__Attendance> GetAll()
        {
            return unitOfWork.Repository<IQ__Attendance>().GetAll();
        }

        public List<IQ__Attendance> GetAll(Expression<Func<IQ__Attendance, bool>> predicate)
        {
            return unitOfWork.Repository<IQ__Attendance>().Get(predicate);
        }

        public IQ__Attendance Insert(IQ__Attendance entity)
        {
            var memb = unitOfWork.Repository<IQ__Attendance>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public IQ__Attendance Update(IQ__Attendance entity)
        {

            var memb = unitOfWork.Repository<IQ__Attendance>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<IQ__Attendance>().Delete(id);
            unitOfWork.Save();
        }

        
        #endregion
    }
}
