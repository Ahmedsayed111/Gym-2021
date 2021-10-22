using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Souscription
{
    public interface II_Customer_GymServices
    {
        I_Customer_Gym GetById(int id);
        List<I_Customer_Gym> GetAll();
        List<I_Customer_Gym> GetAll(Expression<Func<I_Customer_Gym, bool>> predicate);
        I_Customer_Gym Insert(I_Customer_Gym entity);
        I_Customer_Gym Update(I_Customer_Gym entity);
        void Delete(int id);
        void UpdateList(List<I_Customer_Gym> Lstservice);
    }
}
