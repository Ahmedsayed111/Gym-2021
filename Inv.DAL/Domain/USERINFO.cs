//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Inv.DAL.Domain
{
    using System;
    using System.Collections.Generic;
    
    public partial class USERINFO
    {
        public int USERID { get; set; }
        public string BADGENUMBER { get; set; }
        public string SSN { get; set; }
        public string NAME { get; set; }
        public string GENDER { get; set; }
        public string TITLE { get; set; }
        public string PAGER { get; set; }
        public Nullable<System.DateTime> BIRTHDAY { get; set; }
        public Nullable<System.DateTime> HIREDDAY { get; set; }
        public string STREET { get; set; }
        public string CITY { get; set; }
        public string STATE { get; set; }
        public string ZIP { get; set; }
        public string OPHONE { get; set; }
        public string FPHONE { get; set; }
        public Nullable<short> VERIFICATIONMETHOD { get; set; }
        public Nullable<short> DEFAULTDEPTID { get; set; }
        public Nullable<short> SECURITYFLAGS { get; set; }
        public short ATT { get; set; }
        public short INLATE { get; set; }
        public short OUTEARLY { get; set; }
        public short OVERTIME { get; set; }
        public short SEP { get; set; }
        public short HOLIDAY { get; set; }
        public string MINZU { get; set; }
        public string PASSWORD { get; set; }
        public short LUNCHDURATION { get; set; }
        public string MVerifyPass { get; set; }
        public byte[] PHOTO { get; set; }
        public byte[] Notes { get; set; }
        public Nullable<int> privilege { get; set; }
        public Nullable<short> InheritDeptSch { get; set; }
        public Nullable<short> InheritDeptSchClass { get; set; }
        public Nullable<short> AutoSchPlan { get; set; }
        public Nullable<int> MinAutoSchInterval { get; set; }
        public Nullable<short> RegisterOT { get; set; }
        public Nullable<short> InheritDeptRule { get; set; }
        public Nullable<short> EMPRIVILEGE { get; set; }
        public string CardNo { get; set; }
        public Nullable<System.DateTime> F_PassportExpiry { get; set; }
        public Nullable<System.DateTime> F_IDCardExpiry { get; set; }
        public Nullable<System.DateTime> F_InsuranceExpiry { get; set; }
        public Nullable<System.DateTime> DMedical { get; set; }
        public Nullable<System.DateTime> DLabor { get; set; }
        public Nullable<System.DateTime> DPassport { get; set; }
        public Nullable<System.DateTime> Dvisa { get; set; }
    }
}
