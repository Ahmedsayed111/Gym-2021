using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DAL.Domain;
using API.Models;
using API.Models.CustomEntities;

namespace API.Models.CustomModel
{
    public class I_Attendance_New : SecurityClass
    {
        public int ID { get; set; }
        public Nullable<int> ID_Cust { get; set; }
        public Nullable<int> ID_Code_USER { get; set; }
        public string Tr_Date { get; set; }
        public string Time_in { get; set; }
        public string Time_out { get; set; }
        public Nullable<int> Num_Day_Attendance { get; set; }
        public Nullable<bool> ready { get; set; }
        public Nullable<int> Num_Day { get; set; }
        public string Name_Customer { get; set; }

    }
}