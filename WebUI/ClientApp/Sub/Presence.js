$(document).ready(function () {
    Presence.InitalizeComponent();
});
var Presence;
(function (Presence) {
    var compcode;
    var SysSession = GetSystemSession();
    var sys = new SystemTools();
    //Arrays     
    var UserDetails = new Array();
    var Details = new Array();
    var IQDetails = new Array();
    var SearchDetails = new Array();
    var CustomerDetails = new Array();
    var EmpDetails = new Array();
    //DropDownlist  
    var ddlType;
    var ddlCustEmp;
    // giedView
    var divMasterGrid = new JsGrid();
    //Textboxes
    var searchbutmemreport;
    var txtFromDate;
    var txtToDate;
    var txtNationality;
    //buttons 
    var btnShow;
    var btnprint;
    var btnPrintTrview;
    var btnPrintTrPDF;
    var btnPrintTrEXEL;
    //flags            
    var IsSuccess = false;
    function InitalizeComponent() {
        InitalizeControls();
        IntializeEvents();
        txtFromDate.value = GetDate();
        txtToDate.value = GetDate();
        GetAllUser();
        GetAll_I_Detais_Custmor();
        DocumentActions.FillCombowithdefult(CustomerDetails, ddlCustEmp, "ID_Cust", "Name_Customer", "اختر العميل");
        $('#ddlCustEmp').removeAttr('disabled');
        btnShow_onclick();
    }
    Presence.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            document.getElementById('Screen_name').innerHTML = "استعلام حضور و انصراف";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "Attendance and departure inquiries";
        }
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        //Drop Downlists
        searchbutmemreport = document.getElementById("searchbutmemreport");
        txtFromDate = document.getElementById("txtFromDate");
        txtToDate = document.getElementById("txtToDate");
        ddlType = document.getElementById("ddlType");
        ddlCustEmp = document.getElementById("ddlCustEmp");
        btnShow = document.getElementById("btnShow");
        btnprint = document.getElementById("btnprint");
        btnPrintTrview = document.getElementById("btnPrintTrview");
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF");
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL");
    }
    function IntializeEvents() {
        btnShow.onclick = btnShow_onclick;
        ddlType.onchange = ddlType_onchange;
        searchbutmemreport.onkeyup = _SearchBox_Change;
        btnprint.onclick = function () { printreport(1); };
        //btnPrintTrview.onclick = () => { printreport(1) };
        //btnPrintTrPDF.onclick = () => { printreport(2) };
        //btnPrintTrEXEL.onclick = () => { printreport(3) };
    }
    function GetDate() {
        var today = new Date();
        var dd = today.getDate().toString();
        var ReturnedDate;
        var mm = (today.getMonth() + 1).toString();
        var yyyy = today.getFullYear();
        if (Number(dd) < 10) {
            dd = ('0' + dd);
        }
        if (Number(mm) < 10) {
            mm = ('0' + mm);
        }
        ReturnedDate = yyyy + '-' + mm + '-' + dd;
        return ReturnedDate;
    }
    function btnShow_onclick() {
        $('#divMasterGridiv').removeClass('display_none');
        Display();
    }
    function Display() {
        debugger;
        var startDate = DateFormatDataBes(txtFromDate.value).toString();
        var endDate = DateFormatDataBes(txtToDate.value).toString();
        var type = ddlType.value == "Cust" ? 1 : 2;
        var cust = ddlCustEmp.value == "null" ? 0 : Number(ddlCustEmp.value);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("I_Attendance", "GetAll"),
            data: { startDate: startDate, endDate: endDate, type: type, cust: cust },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    IQDetails = result.Response;
                    for (var i = 0; i < IQDetails.length; i++) {
                        IQDetails[i].Tr_Date = DateFormat(IQDetails[i].Tr_Date);
                    }
                    InitializeGrid();
                    divMasterGrid.DataSource = IQDetails;
                    divMasterGrid.Bind();
                }
            }
        });
    }
    function _SearchBox_Change() {
        //  k//debugger;
        //debugger
        if (searchbutmemreport.value != "") {
            if (ddlType.value == "Emp") {
                var search_1 = searchbutmemreport.value.toLowerCase();
                SearchDetails = IQDetails.filter(function (x) { return x.ID_Code_USER.toString().search(search_1) >= 0 || x.USER_NAME.toLowerCase().search(search_1) >= 0; });
            }
            else {
                var search_2 = searchbutmemreport.value.toLowerCase();
                SearchDetails = IQDetails.filter(function (x) { return x.ID_Cust.toString().search(search_2) >= 0 || x.Name_Customer.toLowerCase().search(search_2) >= 0; });
            }
            divMasterGrid.DataSource = SearchDetails;
            divMasterGrid.Bind();
        }
        else {
            divMasterGrid.DataSource = IQDetails;
            divMasterGrid.Bind();
        }
    }
    function InitializeGrid() {
        var res = GetResourceList("");
        divMasterGrid.ElementName = "divMasterGrid";
        divMasterGrid.Paging = true;
        divMasterGrid.PageSize = 15;
        divMasterGrid.Sorting = true;
        divMasterGrid.InsertionMode = JsGridInsertionMode.Binding;
        divMasterGrid.Editing = false;
        divMasterGrid.Inserting = false;
        divMasterGrid.SelectedIndex = 1;
        divMasterGrid.PrimaryKey = "ID";
        divMasterGrid.Columns = [
            { title: "ID", name: "ID", type: "text", width: "2%", visible: false },
            { title: "الكود", name: (ddlType.value == "Emp" ? "ID_Code_USER" : "ID_Cust"), type: "text", width: "20%" },
            { title: "الاسم", name: (ddlType.value == "Emp" ? "USER_NAME" : "Name_Customer"), type: "text", width: "20%" },
            { title: " التاريخ  ", name: "Tr_Date", type: "text", width: "18%" },
            { title: "وقت الحضور", name: "Time_in", type: "text", width: "20%" },
            { title: "وقت الانصراف", name: "Time_out", type: "text", width: "20%" },
            { title: "عدد ايام الحضور", name: "Num_Day_Attendance", type: "text", width: "20%" },
        ];
    }
    function GetAllUser() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_USERS", "GetAllUser"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    EmpDetails = result.Response;
                }
            }
        });
    }
    function GetAll_I_Detais_Custmor() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Subscriptions", "GetAll_I_Detais_Custmor"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    CustomerDetails = result.Response;
                }
            }
        });
    }
    function ddlType_onchange() {
        debugger;
        if (ddlType.value == "Cust") {
            $('#ddlCustEmp').removeAttr('disabled');
            DocumentActions.FillCombowithdefult(CustomerDetails, ddlCustEmp, "ID_Cust", "Name_Customer", "اختر العميل");
        }
        else {
            $('#ddlCustEmp').removeAttr('disabled');
            DocumentActions.FillCombowithdefult(EmpDetails, ddlCustEmp, "ID_Code", "USER_CODE", "اختر الموظف");
        }
    }
    ////-------------------------------------------------------button---Save and Back and Eidt-------------------------------------- 
    function printreport(type) {
        var _StockList = new Array();
        var _Stock = new Settings_Report();
        _Stock.Type_Print = type;
        _Stock.ID_Button_Print = 'print';
        _Stock.Parameter_1 = $('#txtFromDate').val();
        _Stock.Parameter_2 = $('#txtToDate').val();
        //_Stock.Parameter_3 = "";
        //_Stock.Parameter_4 = "";
        //_Stock.Parameter_5 = "";
        //_Stock.Parameter_6 = "";
        //_Stock.Parameter_7 = "";
        //_Stock.Parameter_8 = "";
        //_Stock.Parameter_9 = "";
        _StockList.push(_Stock);
        var rp = new ReportParameters();
        rp.Data_Report = JSON.stringify(_StockList); //output report as View
        Ajax.Callsync({
            url: Url.Action("Data_Report_Open", "GeneralReports"),
            data: rp,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(Presence || (Presence = {}));
//# sourceMappingURL=Presence.js.map