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
    
    public partial class GQ_GetLnkTransVoucherDetail
    {
        public string ROW_ID { get; set; }
        public string TR_CODE { get; set; }
        public Nullable<int> COMP_CODE { get; set; }
        public Nullable<int> BRA_CODE { get; set; }
        public string SYSTEM_CODE { get; set; }
        public string SUB_SYSTEM_CODE { get; set; }
        public Nullable<int> VOUCHER_CODE { get; set; }
        public Nullable<byte> VOUCHER_TYPE { get; set; }
        public string VOUCHER_SOURCE_TYPE { get; set; }
        public Nullable<int> TR_NO { get; set; }
        public string TR_TYPE { get; set; }
        public Nullable<System.DateTime> TR_DATE { get; set; }
        public Nullable<decimal> TR_AMOUNT { get; set; }
        public string TR_DESCA { get; set; }
        public string TR_DESCE { get; set; }
        public string TR_USER_CODE { get; set; }
        public Nullable<int> ToTrNo { get; set; }
        public Nullable<int> FromTrNo { get; set; }
        public Nullable<System.DateTime> ToDate { get; set; }
        public Nullable<System.DateTime> FromDate { get; set; }
        public string VOUCHER_DESCE { get; set; }
        public string VOUCHER_DESCA { get; set; }
        public int SERIAL { get; set; }
        public string VarCode { get; set; }
        public bool ISDebit { get; set; }
        public Nullable<int> AccType { get; set; }
        public string AccFixedCode { get; set; }
        public string AccVar_Code { get; set; }
        public string AccBr_Code { get; set; }
        public string Amt_exp { get; set; }
        public Nullable<int> CCType { get; set; }
        public string CCFixedCode { get; set; }
        public string CCVAR_Code { get; set; }
        public string CCBR_Code { get; set; }
        public string User_Code { get; set; }
        public Nullable<bool> IsCollective { get; set; }
        public string DataSource { get; set; }
        public string FN_TR_ID { get; set; }
        public string Trans_DescA { get; set; }
        public string Trans_DescE { get; set; }
        public string AccVar_DataSource { get; set; }
        public string CCVAR_DataSource { get; set; }
        public string Amt_DataSource { get; set; }
        public string LineRemarkE { get; set; }
        public string LineRemarkA { get; set; }
    }
}
