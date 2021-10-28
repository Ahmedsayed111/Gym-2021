using Inv.API.Models;
using BLL.Services.I_Attendancee;
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
    public class I_AttendanceController : BaseController
    {

        private readonly II_AttendanceServices I_AttendanceServices;

        public I_AttendanceController(II_AttendanceServices _I_AttendanceServices)
        {
            this.I_AttendanceServices = _I_AttendanceServices;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(string startDate, string endDate, int type, int cust)
        {

            if (ModelState.IsValid)
            {
                if (type == 1)
                {
                    string s = "SELECT * FROM  [dbo].[IQ_Attend_Multi] WHERE [ID_Cust] > 0   and  ready = 0 and Tr_Date >='" + startDate + "' and Tr_Date <='" + endDate + "'";

                    string condition = "";

                    if (cust != 0)
                    {
                        condition += "and [ID_Cust] = " + cust;
                    }
                    string query = s + condition;
                    var res = db.Database.SqlQuery<IQ_Attend_Multi>(query).ToList();
                    return Ok(new BaseResponse(res));
                }

                else
                {
                    string s = "SELECT * FROM  [dbo].[IQ_Attend_Multi] WHERE [ID_Code_USER] > 0   and  ready = 0 and Tr_Date >='" + startDate + "' and Tr_Date <='" + endDate + "'";

                    string condition = "";

                    if (cust != 0)
                    {
                        condition += "and [ID_Code_USER] = " + cust;
                    }
                    string query = s + condition;
                    var res = db.Database.SqlQuery<IQ_Attend_Multi>(query).ToList();
                    return Ok(new BaseResponse(res));
                }

            }
            return BadRequest(ModelState);
        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllI_Attendance()
        {
            if (ModelState.IsValid)
            {
                string s = @"declare @Num_Day_out int              
                             execute select_days @Num_Day_out out 
                             SELECT dbo.I_Attendance.*, dbo.I_Customer_Gym.Name_Customer
                             FROM   dbo.I_Attendance INNER JOIN
                             dbo.I_Customer_Gym ON dbo.I_Attendance.ID_Cust = dbo.I_Customer_Gym.ID_Cust  where ready = 1 and Num_Day = @Num_Day_out  order by ID DESC";

                string query = s;
                var res = db.Database.SqlQuery<Models.CustomModel.I_Attendance_New>(query).ToList();
                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }



        [HttpGet, AllowAnonymous]
        public IHttpActionResult Timer_Out_Cust()
        {
            if (ModelState.IsValid)
            {
                string s = @"Timer_Out_Cust";

                string query = s;
                var res = db.Database.SqlQuery<Models.CustomModel.I_Attendance_New>(query).ToList();
                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }



        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAttendance(int ID_Code)
        {
            if (ModelState.IsValid)
            {
                string s = "GetAttendance " + ID_Code + "";

                string query = s;
                var res = db.Database.SqlQuery<string>(query).ToList();
                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }



        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll_Item_by_Cat(int ID_I_Attendance)
        {
            if (ModelState.IsValid)
            {
                var Item = I_AttendanceServices.GetAll(x => x.ID_Cust == ID_I_Attendance).ToList();

                return Ok(new BaseResponse(Item));

            }
            return BadRequest(ModelState);
        }

        //[HttpGet, AllowAnonymous]
        //public IHttpActionResult open_and_close_Login(string UserName, string password, int Open_Login)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            var companies = db.Database.SqlQuery<GetUser_Login_Result>("GetUser_Login  N'" + UserName + "',N'" + password + "'," + Open_Login + " ").ToList();
        //            //var companies = db.GFun_Companies(userCode).ToList();

        //            return Ok(new BaseResponse(companies));


        //        }
        //        catch (Exception ex)
        //        {
        //            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
        //        }
        //    }
        //    return BadRequest(ModelState);
        //}
        //[HttpGet, AllowAnonymous]
        //public IHttpActionResult PROC_Delete_Rows(int ID, string TR_Type)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            var companies = db.Database.SqlQuery<Delete_Rows_Result>("Delete_Rows " + ID + ",'" + TR_Type + "'").ToList();

        //            return Ok(new BaseResponse(companies));


        //        }
        //        catch (Exception ex)
        //        {
        //            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
        //        }
        //    }
        //    return BadRequest(ModelState);
        //}
        //[HttpGet, AllowAnonymous]
        //public IHttpActionResult PROC_Enter_Customer(int ID, string TR_Type)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            var companies = db.Database.SqlQuery<Enter_Customer_Result>("Enter_Customer " + ID + ",'" + TR_Type + "'").ToList();

        //            return Ok(new BaseResponse(companies));


        //        }
        //        catch (Exception ex)
        //        {
        //            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
        //        }
        //    }
        //    return BadRequest(ModelState);
        //}


        public string ExecuteScalar(string SqlStatement)
        {
            string connectionString = db.Database.Connection.ConnectionString;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = SqlStatement;
                    connection.Open();

                    string result = string.Empty;

                    result = command.ExecuteScalar().ToString();
                    connection.Close();
                    command.Dispose();
                    connection.Dispose();


                    return result;
                }
            }

        }




        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]IQ__Attendance Nation)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var Nationality = I_AttendanceServices.Insert(Nation);
                    return Ok(new BaseResponse(Nationality));
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(int ID)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    I_AttendanceServices.Delete(ID);
                    return Ok(new BaseResponse());
                }
                catch (Exception)
                {
                    return Ok(new BaseResponse(0, "Error"));
                }

            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody]IQ__Attendance Nation)
        {
            if (ModelState.IsValid)
            {











                try
                {
                    var Nationality = I_AttendanceServices.Update(Nation);
                    return Ok(new BaseResponse(Nationality));
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }



        //***************asmaa********************//
        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateLst(List<IQ__Attendance> I_Attendance)
        {

            try
            {
                var InsertOperationI_Attendance = I_Attendance.Where(x => x.StatusFlag ==  'i').ToList();
                var updatedOperationI_Attendance = I_Attendance.Where(x => x.StatusFlag == 'u').ToList();
                var deletedOperationI_Attendance = I_Attendance.Where(x => x.StatusFlag == 'd').ToList();


                //loop Insert  I_Pur_TR_ReceiveI_Attendance
                foreach (var item in InsertOperationI_Attendance)
                {


                    var Insert = I_AttendanceServices.Insert(item);

                }

                //loop Update  I_Pur_TR_ReceiveI_Attendance
                foreach (var item in updatedOperationI_Attendance)
                {

                    var updated = I_AttendanceServices.Update(item);

                }

                //loop Delete  I_Pur_TR_ReceiveI_Attendance
                foreach (var item in deletedOperationI_Attendance)
                {
                    int id = item.ID;
                    I_AttendanceServices.Delete(id);

                }


                return Ok(new BaseResponse("ok"));
            }
            catch (Exception)
            {
                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "الصنف مستخدم بافعل لا يمكنك تغيره"));
            }

        }

    }
}
