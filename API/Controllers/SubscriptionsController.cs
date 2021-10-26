using Inv.API.Models;
using BLL.Services.Souscription;
using BLL.Services.SouscriptionDetails;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using API.Controllers;
using Inv.API.Tools;
using System.Web.Http.Cors;
using System.Data.SqlClient;
using System.Data.Entity;
using Inv.DAL.Repository;
using Newtonsoft.Json;
using API.Models.CustomModel; 

namespace API.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class SubscriptionsController : BaseController
    {


        private readonly II_Customer_GymServices I_Customer_GymServices;
        private readonly II_Detais_CustmorServices I_Detais_CustmorServices;

        public SubscriptionsController(II_Customer_GymServices _Subscriptions_MasterServices , II_Detais_CustmorServices _Subscriptions_DetaisServices)
        {
            this.I_Customer_GymServices = _Subscriptions_MasterServices;
            this.I_Detais_CustmorServices = _Subscriptions_DetaisServices;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll_IQ_Subscriptions(int? ID_Souscription, int Statas)
        {
            if (ModelState.IsValid)
            {
                string s = "select * from IQ_Custmer_Souscription ";

                string condition = " where";
                string query = "";
                if (ID_Souscription != 1001)
                {
                    condition = condition + " ID_Souscription =" + ID_Souscription;

                }
                if (Statas != 2)
                {

                    if (condition != " where")
                    {
                        condition = condition + " and ";

                    }
                    condition = condition + " Statas =" + Statas;
                }

                if (condition == " where")
                {
                    query = s;

                }
                else
                {
                    query = s + condition;

                }

                var res = db.Database.SqlQuery<IQ_Custmer_Souscription>(query).ToList();
                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll_I_Detais_Data_Custmor(int ID_Cust)
        {
            if (ModelState.IsValid)
            {
                string s = "select * from I_Detais_Data_Custmor where ID_Cust = " + ID_Cust + "";

                string query = s;
                var res = db.Database.SqlQuery<I_Detais_Data_Custmor>(query).ToList();
                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll_I_Detais_Custmor()
        {
            if (ModelState.IsValid)
            {
                string s = "select * from I_Customer_Gym ";

                string query = s;
                var res = db.Database.SqlQuery<I_Customer_Gym>(query).ToList();
                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetEnd_Date_Souscription(int ID_Souscription)
        {
            if (ModelState.IsValid)
            {
                string s = "End_Date_Souscription " + ID_Souscription + "";

                string query = s;
                var res = db.Database.SqlQuery<string>(query).ToList();
                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Select_Date_Day(int Num_Day)
        {
            if (ModelState.IsValid)
            {
                string s = "Select_Date_Day " + Num_Day + "";

                string query = s;
                var res = db.Database.SqlQuery<string>(query).ToList();
                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult CodeFounBefore(int ID_Cust)
        {

            var AccDefVendor = I_Customer_GymServices.GetAll(x => x.ID_Cust == ID_Cust);

            return Ok(new BaseResponse(AccDefVendor));

        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult Get_Num_inv(int ID_Cust)
        {
            string quer = "select invitation from I_Customer_Gym Where  ID_Cust =" + ID_Cust;
            var Num_invitation = db.Database.SqlQuery<decimal>(quer);
            return Ok(new BaseResponse(Num_invitation));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult update_Num_inv([FromBody]invitation invitati)
        {
            string quer_1 = "insert into invitation values(" + invitati.ID_Cust + " , N'" + invitati.Name + "' , N'" + invitati.Phone + "' , " + invitati.Carte_Dentite + " , " + invitati.age + " , (select convert(date, getdate(), 4)) , N'" + invitati.Remarks + "')";

            db.Database.ExecuteSqlCommand(quer_1);



            string quer_2 = "update I_Customer_Gym set invitation = " + invitati.Num_inv + " where ID_Cust = " + invitati.ID_Cust + "";

            db.Database.ExecuteSqlCommand(quer_2);



            return Ok(new BaseResponse(100));
        }


        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert_Subscriptions([FromBody]SubscriptionsMasterDetails Subscriptions)
        {
            try
            {

                var insertSubscriptionsItems = Subscriptions.Data_CustmorDetails.Where(x => x.StatusFlag == 'i').ToList();
                var updatedSubscriptionsItems = Subscriptions.Data_CustmorDetails.Where(x => x.StatusFlag == 'u').ToList();
                var deletedSubscriptionsItems = Subscriptions.Data_CustmorDetails.Where(x => x.StatusFlag == 'd').ToList();

                if (Subscriptions.Custmer_Souscription.NewAdd == true)
                {
                    //loop insered  I_Customer_Gym 
                    var InsertedRec = I_Customer_GymServices.Insert(Subscriptions.Custmer_Souscription);
                }
                else
                {
                    //loop Update  I_Customer_Gym 
                    var updatedRec = I_Customer_GymServices.Update(Subscriptions.Custmer_Souscription);
                }



                //loop insered  I_Detais_Data_Custmor
                foreach (var item in insertSubscriptionsItems)
                {
                    var InsertedRec = I_Detais_CustmorServices.Insert(item);
                }

                //loop Update  I_Detais_Data_Custmor
                foreach (var item in updatedSubscriptionsItems)
                {

                    var updatedRec = I_Detais_CustmorServices.Update(item);
                }

                //loop Delete  I_Detais_Data_Custmor
                foreach (var item in deletedSubscriptionsItems)
                {
                    int deletedId = item.ID;
                    I_Detais_CustmorServices.Delete(deletedId);
                }



                if (Subscriptions.Custmer_Souscription.Renewal == true)
                {
                    string quer = "Insert_Enter_Money N'اشتراك الاعب ( " + Subscriptions.Custmer_Souscription.Name_Customer + " ) ', " + Subscriptions.Custmer_Souscription.Price_After_Discount + ", N'" + Subscriptions.Custmer_Souscription.CreatedBy + "' , N'أيرادات الاشتركات'";
                    var Outlet = db.Database.SqlQuery<decimal>(quer);
                    return Ok(new BaseResponse(Outlet));

                }


                return Ok(new BaseResponse(100));

            }
            catch (Exception ex)
            {

                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }


        }



    }
}
