using API.Models;
using Inv.BLL.Services.I_Type_Souscriptions;
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

namespace API.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class I_Type_SouscriptionController : BaseController
    {
         
        private readonly II_Type_SouscriptionServices I_Type_SouscriptionServices;

        public I_Type_SouscriptionController(II_Type_SouscriptionServices _II_Type_SouscriptionServices)
        {
            I_Type_SouscriptionServices = _II_Type_SouscriptionServices;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            if (ModelState.IsValid)
            {
                var Cust = I_Type_SouscriptionServices.GetAll().ToList();
                
                    return Ok(new BaseResponse(Cust));
              
            }
            return BadRequest(ModelState);
        }

         
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]I_Type_Souscription Nation)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var Nationality = I_Type_SouscriptionServices.Insert(Nation);
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
                    I_Type_SouscriptionServices.Delete(ID);
                    return Ok(new BaseResponse());
                }
                catch (Exception  )
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
        public IHttpActionResult Update([FromBody]I_Type_Souscription Nation)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var Nationality = I_Type_SouscriptionServices.Update(Nation);
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
        public IHttpActionResult UpdateCustlist(List<I_Type_Souscription> CUSTOMERList)
        {

            if (ModelState.IsValid)
            {
                 
                    try
                    {
                        var insertedRecords = CUSTOMERList.Where(x => x.StatusFlag =='i').ToList();
                        var updatedRecords = CUSTOMERList.Where(x => x.StatusFlag == 'u').ToList();
                        var deletedRecords = CUSTOMERList.Where(x => x.StatusFlag == 'd').ToList();
                        ResponseResult res = new ResponseResult();
                    //loop insered 
                    if (insertedRecords.Count > 0)
                    {
                        foreach (var item in insertedRecords)
                        {
                            var InsertedRec = I_Type_SouscriptionServices.Insert(item);
                            
                        }
                       
                    }


                    //loop Update 
                    if (updatedRecords.Count > 0)
                    {
                        foreach (var item in updatedRecords)
                        {
                            var updatedRec = I_Type_SouscriptionServices.Update(item);
                            
                        }
                       
                    }

                    //loop Delete 
                    if (deletedRecords.Count > 0)
                    {
                        foreach (var item in deletedRecords)
                        { 
                            var id = item.ID_Souscription;
                            I_Type_SouscriptionServices.Delete(id);
                        }

                    }


                    return Ok(new BaseResponse(1));
                     
                }
                catch (Exception ex)
                    { 
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                
            }
            return BadRequest(ModelState);
        }

    }
}
