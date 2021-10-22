using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Inv.DAL.Domain;
using API.Models;
using Inv.API.Models.CustomEntities;

namespace API.Models.CustomModel
{
    public class SubscriptionsMasterDetails : SecurityClass
    {
        public I_Customer_Gym Custmer_Souscription { get; set; }
        public List<I_Detais_Data_Custmor> Data_CustmorDetails { get; set; }
    }
}