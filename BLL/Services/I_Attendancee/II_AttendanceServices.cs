using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.I_Attendancee
{
    public interface II_AttendanceServices
    {
        IQ__Attendance GetById(int id);
        List<IQ__Attendance> GetAll();
        List<IQ__Attendance> GetAll(Expression<Func<IQ__Attendance, bool>> predicate);
        IQ__Attendance Insert(IQ__Attendance entity);
        IQ__Attendance Update(IQ__Attendance entity);
        void Delete(int id);
        
    }
}
