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
    
    public partial class ACTimeZone
    {
        public short TimeZoneID { get; set; }
        public string Name { get; set; }
        public Nullable<System.DateTime> SunStart { get; set; }
        public Nullable<System.DateTime> SunEnd { get; set; }
        public Nullable<System.DateTime> MonStart { get; set; }
        public Nullable<System.DateTime> MonEnd { get; set; }
        public Nullable<System.DateTime> TuesStart { get; set; }
        public Nullable<System.DateTime> TuesEnd { get; set; }
        public Nullable<System.DateTime> WedStart { get; set; }
        public Nullable<System.DateTime> WedEnd { get; set; }
        public Nullable<System.DateTime> ThursStart { get; set; }
        public Nullable<System.DateTime> ThursEnd { get; set; }
        public Nullable<System.DateTime> FriStart { get; set; }
        public Nullable<System.DateTime> FriEnd { get; set; }
        public Nullable<System.DateTime> SatStart { get; set; }
        public Nullable<System.DateTime> SatEnd { get; set; }
    }
}