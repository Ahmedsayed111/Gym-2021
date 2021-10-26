using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inv.DAL.Domain
{
    public class UpdateFlagClass
    {
        public char StatusFlag { get; set; }
    }
    public class SecurityClass
    {
        public string UserCode { get; set; }
        public string Token { get; set; }
    }

  
    public class SecurityandUpdateFlagClass
    {
        public char StatusFlag { get; set; }
        public string UserCode { get; set; }
        public string Token { get; set; }
    }
    public class SecurityandUpdateFlagClass_FIN_YEAR
    {
        public char StatusFlag { get; set; }
        public string UserCode { get; set; }
        public string Token { get; set; }
        public int FIN_YEAR { get; set; }
    }

    public class SecurityClass_G_USERS
    {
        public string UserCode { get; set; }
        public string Token { get; set; }
        public string Flag_Mastr { get; set; }

    }
    public class SecurityandUpdateFlagClass_serial
    {
        public char StatusFlag { get; set; }
        public string UserCode { get; set; }
        public string Token { get; set; }
        public string serial_num{ get; set; }

    }
    public class VoucherStatusClass
    {

        public char StatusFlag { get; set; }
        public string UserCode { get; set; }
        public string Token { get; set; }
        public int OpCode { get; set; }
       
    }
    public class SecurityandUpdate_Num_invClass
    {
        public string StatusFlag { get; set; }
        public string UserCode { get; set; }
        public string Token { get; set; }
        public int Num_inv { get; set; }
    }
    public class SecurityandUpdateFlagClass_flag_Add_new
    {
        public string StatusFlag { get; set; }
        public string UserCode { get; set; }
        public string Token { get; set; }
        public Boolean NewAdd { get; set; }
        public Boolean Renewal { get; set; }
    }
    public partial class LoginPage : SecurityandUpdateFlagClass
    {

    }

    public partial class PRODUCT : SecurityandUpdateFlagClass
    {

    }
    public partial class CATEGRES : SecurityandUpdateFlagClass
    {

    }
    public partial class Stok_ORDER_DELIVERY : SecurityandUpdateFlagClass
    {

    }
    public partial class CUSTOMER : SecurityandUpdateFlagClass
    {

    }
    public partial class Outlet : SecurityandUpdateFlagClass
    {

    }
    public partial class Supplier : SecurityandUpdateFlagClass
    {

    }
    public partial class Purchases_Details : SecurityandUpdateFlagClass
    {

    }
    public partial class IQ_Purchases_Details : SecurityandUpdateFlagClass
    {

    }
    public partial class Purchases_Master : SecurityandUpdateFlagClass
    {

    }
    public partial class familly_Cat : SecurityandUpdateFlagClass
    {

    }
    
    public partial class I_Type_Souscription : SecurityandUpdateFlagClass
    {

    }
    public partial class I_Customer_Gym : SecurityandUpdateFlagClass_flag_Add_new
    {

    }
    public partial class I_Detais_Data_Custmor : SecurityandUpdateFlagClass
    {

    }
    public partial class IQ__Attendance : SecurityandUpdateFlagClass
    {

    }
    public partial class I_Attendance_New : SecurityandUpdateFlagClass
    {

    }
    public partial class invitation : SecurityandUpdate_Num_invClass
    {

    }
    public partial class G_Nationality : SecurityandUpdateFlagClass
    {

    }



    public partial class G_USERS : SecurityClass_G_USERS
    {

    }
    public partial class G_RoleUsers : SecurityandUpdateFlagClass
    {

    }

    public partial class G_CONTROL : SecurityandUpdateFlagClass
    {
    }
    public partial class I_ItemYear : SecurityandUpdateFlagClass
    {
    }
    public partial class G_LnkVarBranch : SecurityandUpdateFlagClass
    {
    }
    public partial class G_SUB_SYSTEMS : SecurityandUpdateFlagClass
    {
    }
    public partial class G_USER_BRANCH : UpdateFlagClass
    {
    }

    public partial class G_STORE : SecurityandUpdateFlagClass
    {
    }

    public partial class A_Pay_D_VendorDoc : SecurityandUpdateFlagClass
    {
    }
    public partial class A_Rec_D_CustomerDoc : SecurityandUpdateFlagClass
    {
    }

    public partial class G_COMPANY : SecurityandUpdateFlagClass
    {
    }
    public partial class G_AlertControl : SecurityClass
    {
    }


    //---------------------------------------------------------------------------------------------------------------

    public partial class PRODUCT : SecurityandUpdateFlagClass
    {

    }
    public partial class CATEGRES : SecurityandUpdateFlagClass
    {

    }
    public partial class Stok_ORDER_DELIVERY : SecurityandUpdateFlagClass
    {

    }
    public partial class CUSTOMER : SecurityandUpdateFlagClass
    {

    }
    public partial class Outlet : SecurityandUpdateFlagClass
    {

    }
    public partial class Supplier : SecurityandUpdateFlagClass
    {

    }
    public partial class CUSTOMER : SecurityandUpdateFlagClass
    {

    }
    public partial class Purchases_Details : SecurityandUpdateFlagClass
    {

    }
    public partial class IQ_Purchases_Details : SecurityandUpdateFlagClass
    {

    }
    public partial class Purchases_Master : SecurityandUpdateFlagClass
    {

    }
    public partial class familly_Cat : SecurityandUpdateFlagClass
    {

    }
    public partial class G_COST_CENTER : SecurityandUpdateFlagClass
    {

    }


}
