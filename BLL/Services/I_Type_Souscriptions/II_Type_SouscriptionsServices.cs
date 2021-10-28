using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.I_Type_Souscriptions
{
    public interface II_Type_SouscriptionServices
    {
        I_Type_Souscription GetById(int id);
        List<I_Type_Souscription> GetAll();
        List<I_Type_Souscription> GetAll(Expression<Func<I_Type_Souscription, bool>> predicate);
        I_Type_Souscription Insert(I_Type_Souscription entity);
        I_Type_Souscription Update(I_Type_Souscription entity);
        void Delete(int id);
        void UpdateList(List<I_Type_Souscription> Lstservice);
    }
}
