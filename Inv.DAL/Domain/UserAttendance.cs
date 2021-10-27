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
    
    public partial class UserAttendance
    {
        public int UserId { get; set; }
        public Nullable<bool> EarlyAbsent { get; set; }
        public Nullable<bool> LateAbsent { get; set; }
        public Nullable<int> MinsEarly { get; set; }
        public Nullable<int> MinsEarlyAbsent { get; set; }
        public Nullable<int> MinsLate { get; set; }
        public Nullable<int> TMinsout { get; set; }
        public Nullable<int> MinsLateAbsent { get; set; }
        public Nullable<int> MinsNoIn { get; set; }
        public Nullable<int> MinsNoOut { get; set; }
        public Nullable<int> MinsWorkDay { get; set; }
        public Nullable<int> MinsWorkDay1 { get; set; }
        public Nullable<int> NoInAbsent { get; set; }
        public Nullable<int> NoOutAbsent { get; set; }
        public string weekends { get; set; }
        public Nullable<bool> WeekenFullDayOT { get; set; }
        public Nullable<int> IntervalOfAfterOT { get; set; }
        public Nullable<bool> AllowAfterOT { get; set; }
        public Nullable<bool> AllowEarlyOT { get; set; }
        public Nullable<int> IntervalOfEarlyOT { get; set; }
        public Nullable<int> IntervalOfEarlyOT_AsOT { get; set; }
        public Nullable<int> IntervalOfAfterOT_AsOT { get; set; }
        public Nullable<bool> LimitEarlyMaxOT { get; set; }
        public Nullable<bool> LimitAfterMaxOT { get; set; }
        public Nullable<bool> LimitTotalMaxOT { get; set; }
        public Nullable<int> EarlyMaxOT { get; set; }
        public Nullable<int> AfterMaxOT { get; set; }
        public Nullable<int> TotalMaxOT { get; set; }
        public string WeekendReportSymbol { get; set; }
        public string WeekendReportColor { get; set; }
    }
}