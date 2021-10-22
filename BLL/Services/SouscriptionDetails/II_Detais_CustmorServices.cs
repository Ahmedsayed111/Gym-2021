using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.SouscriptionDetails
{
    public interface II_Detais_CustmorServices
    {
        I_Detais_Data_Custmor GetById(int id);
        List<I_Detais_Data_Custmor> GetAll();
        List<I_Detais_Data_Custmor> GetAll(Expression<Func<I_Detais_Data_Custmor, bool>> predicate);
        I_Detais_Data_Custmor Insert(I_Detais_Data_Custmor entity);
        I_Detais_Data_Custmor Update(I_Detais_Data_Custmor entity);
        void Delete(int id);
        void UpdateList(List<I_Detais_Data_Custmor> Lstservice);
    }
}
