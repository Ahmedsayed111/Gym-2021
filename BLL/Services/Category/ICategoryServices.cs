using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.Category
{
    public interface ICategoryServices
    {
        CATEGRES GetById(int id);
        List<CATEGRES> GetAll();
        List<CATEGRES> GetAll(Expression<Func<CATEGRES, bool>> predicate);
        CATEGRES Insert(CATEGRES entity);
        CATEGRES Update(CATEGRES entity);
        void Delete(int id);
        void UpdateList(List<CATEGRES> Lstservice);
    }
}
