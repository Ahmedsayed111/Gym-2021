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
    
    public partial class DEPARTMENT
    {
        public int DEPTID { get; set; }
        public string DEPTNAME { get; set; }
        public int SUPDEPTID { get; set; }
        public Nullable<short> InheritParentSch { get; set; }
        public Nullable<short> InheritDeptSch { get; set; }
        public Nullable<short> InheritDeptSchClass { get; set; }
        public Nullable<short> AutoSchPlan { get; set; }
        public Nullable<short> InLate { get; set; }
        public Nullable<short> OutEarly { get; set; }
        public Nullable<short> InheritDeptRule { get; set; }
        public Nullable<int> MinAutoSchInterval { get; set; }
        public Nullable<short> RegisterOT { get; set; }
        public int DefaultSchId { get; set; }
        public Nullable<short> ATT { get; set; }
        public Nullable<short> Holiday { get; set; }
        public Nullable<short> OverTime { get; set; }
    }
}
