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
    
    public partial class ACGroup
    {
        public short GroupID { get; set; }
        public string Name { get; set; }
        public Nullable<short> TimeZone1 { get; set; }
        public Nullable<short> TimeZone2 { get; set; }
        public Nullable<short> TimeZone3 { get; set; }
        public Nullable<bool> holidayvaild { get; set; }
        public Nullable<int> verifystyle { get; set; }
    }
}
