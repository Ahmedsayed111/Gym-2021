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
    
    public partial class AQVat_Srch_VatPurchaseHeader
    {
        public int InvoiceHeaderID { get; set; }
        public Nullable<int> InvoiceId { get; set; }
        public string Head_DocNO { get; set; }
        public string Invoice_DocNO { get; set; }
        public Nullable<int> VendorID { get; set; }
        public string Vnd_NameA { get; set; }
        public string Vnd_NameE { get; set; }
        public Nullable<int> Inv_TrNO { get; set; }
        public Nullable<System.DateTime> Inv_TrDate { get; set; }
        public Nullable<System.DateTime> Head_TrDate { get; set; }
        public Nullable<decimal> TOTAL { get; set; }
        public Nullable<decimal> DISCOUNT { get; set; }
        public Nullable<decimal> VatAmount { get; set; }
        public Nullable<decimal> Net { get; set; }
        public Nullable<int> CompCode { get; set; }
    }
}
