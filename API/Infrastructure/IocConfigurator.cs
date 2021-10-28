using Unity; 
using Inv.DAL.Repository;
using Inv.BLL.Services.GUSERS;
using Inv.BLL.Services.IControl; 
using Inv.BLL.Services.IGCodes;
using Inv.BLL.Services.GCostCenter;
using Inv.BLL.Services.GRole;
using Inv.BLL.Services.GRoleUsers;
using Inv.BLL.Services.G_Control;
using Inv.BLL.Services.GBRANCH;
using Inv.BLL.Services.G_SUB_SYSTEM;
using Inv.BLL.Services.USER_BRANCH;
using Inv.BLL.Services.GCompany;
using Inv.BLL.Services.GAlertControl;
using Inv.BLL.Services.CompStatus; 
using Inv.BLL.Services.Item;
using Inv.BLL.Services.Category;
using Inv.BLL.Services.Customer;
using Inv.BLL.Services.Outletpirce;
using Inv.BLL.Services.Stok_ORDER;
using Inv.BLL.Services.Purchases;
using Inv.BLL.Services.familly_Cate;
using Inv.BLL.Services.Vendor; 
using Inv.BLL.Services.SlsTrSales;
using BLL.Services.I_Type_Souscriptions;
using BLL.Services.Souscription;
using BLL.Services.SouscriptionDetails;
using BLL.Services.I_Attendancee; 

namespace Inv.API.Infrastructure
{
    public static class IocConfigurator
    {

        public static void RegisterServices(IUnityContainer container)
        {
            container.RegisterType<IUnitOfWork, UnitOfWork>();
            container.RegisterType<IG_USERSService, G_USERSService>();
            container.RegisterType<II_VW_GetCompStatusService, I_VW_GetCompStatusService>();
            container.RegisterType<II_ControlService, I_ControlService>();
            container.RegisterType<IIGCodesService, IGCodesService>();
            container.RegisterType<IGCostCenterService, GCostCenterService>();
            container.RegisterType<IG_ControlService, G_ControlService>();
            container.RegisterType<IGRoleUsersService, GRoleUsersService>();
            container.RegisterType<IGRoleService, GRoleService>();
            container.RegisterType<IGBRANCHService, GBRANCHService>();
            container.RegisterType<IG_SUB_SYSTEMSService, G_SUB_SYSTEMSService>();
            container.RegisterType<IG_USER_BRANCHService, G_USER_BRANCHService>();
            container.RegisterType<IGCompanyService, GCompanyService>();
            container.RegisterType<IG_AlertControlService, G_AlertControlService>(); 
            container.RegisterType<IVendorServices, VendorServices>();
            container.RegisterType<IItemServices, ItemServices>();
            container.RegisterType<ICategoryServices, CategoryServices>();
            container.RegisterType<ICustomerServices, CustomerServices>();
            container.RegisterType<IOutletpirceServices, OutletpirceServices>();
            container.RegisterType<IStok_ORDERServices, Stok_ORDERServices>();
            container.RegisterType<IPurchases_MasterServices, Purchases_MasterServices>();
            container.RegisterType<Ifamilly_CatServices, familly_CatServices>();
            container.RegisterType<ISlsTrSalesServices, SlsTrSalesServices>();
            container.RegisterType<II_Type_SouscriptionServices, I_Type_SouscriptionServices>();
            container.RegisterType<II_Customer_GymServices, I_Customer_GymServices>();
            container.RegisterType<II_Detais_CustmorServices, I_Detais_CustmorServices>();
            container.RegisterType<II_AttendanceServices, I_AttendanceServices>();  

        }
    }
}