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
    
    public partial class ReportItem
    {
        public int RIID { get; set; }
        public Nullable<int> RIIndex { get; set; }
        public Nullable<short> ShowIt { get; set; }
        public string RIName { get; set; }
        public string UnitName { get; set; }
        public byte[] Formula { get; set; }
        public Nullable<short> CalcBySchClass { get; set; }
        public Nullable<short> StatisticMethod { get; set; }
        public Nullable<short> CalcLast { get; set; }
        public byte[] Notes { get; set; }
    }
}
