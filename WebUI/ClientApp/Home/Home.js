$(document).ready(function () {
    ////debugger;
    Home.InitalizeComponent();
});
var Home;
(function (Home) {
    var UploadImg = true;
    var NewUploadedImageName = "";
    var CurrentImageName = "";
    //system varables
    var AccType = 3; //نوع الحساب
    //var SysSession: SystemSession = GetSystemSession();
    var compcode;
    //var sys: SystemTools = new SystemTools();
    var SysSession = GetSystemSession();
    var sys = new SystemTools();
    //Arrays     
    var UserDetails = new Array();
    var CustomerDetails = new Array();
    var Get_I_Attendance = new Array();
    var SearchDetails = new Array();
    var Selected_Data = new Array();
    var AllGetStokMasterDetail = new Array();
    var FilterFamilyDetails = new Array();
    var FamilyDetails = new Array();
    var ItemFamilyDetails = new Array();
    var ItemBaesdFamilyDetails = new Array();
    var DetaisCustmorModel = new Array();
    var DetaisCustmorSingleModel = new I_Detais_Data_Custmor();
    var SubsMasterDetails = new SubscriptionsMasterDetails();
    var Purchases_Mas = new Array();
    var UpdatedModel = new Array();
    var FilteredModel = new Array();
    var DetailsType_Souscription = new Array();
    var SearchVendorDetails = new Array();
    var Detailsfamilly_Cat = new Array();
    var UploadImage;
    var txtNumDays_freeze;
    //DropDownlist
    var ddlStateType;
    var ddlSouscription;
    var txtType_Sub;
    var id_divGridDetails;
    // giedView
    var divMasterGrid = new JsGrid();
    //Textboxes
    var chkActive;
    var txtdateopening;
    var txtDateHeader;
    var txtNationality;
    //buttons 
    var btnPresent;
    var btnClose;
    var btnOpen;
    var btnView_load;
    var btnExpenses;
    var btnShow;
    var btnadd;
    var btnprint;
    var btnview_invitation;
    var btn_cancel_freeze;
    var btn_Ok_freeze;
    var btnfreeze;
    var btnRenewal;
    var btnUpdate;
    var btnSave;
    var btnBack;
    var btnSupplierSearch;
    var btnPaid_Up;
    var output;
    //new                          
    var i_file;
    var btnAddDetails;
    var searchbutmemreport;
    var btnPrint;
    var btnPrintTrview;
    var btnPrintTrPDF;
    var btnPrintTrEXEL;
    //flags 
    var CountGrid = 0;
    var CountItems = 0;
    var ID_Cust;
    var AddNew;
    var Renewal;
    var CashTot;
    var Success_Balance = true;
    var Bal = 0;
    var IsSuccess = false;
    function InitalizeComponent() {
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "الحضور والانصراف";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "الحضور والانصراف";
        }
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        InitalizeControls();
        IntializeEvents();
        InitializeGrid();
        Display();
    }
    Home.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        debugger;
        searchbutmemreport = document.getElementById("searchbutmemreport");
    }
    function IntializeEvents() {
        //txtNumDays_freeze.value.trim() == '';
        searchbutmemreport.onkeyup = _SearchBox_Change;
    }
    function FillddlType_Souscription() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("I_Type_Souscription", "GetAll"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    DetailsType_Souscription = result.Response;
                    DocumentActions.FillCombowithdefult(DetailsType_Souscription, ddlSouscription, "ID_Souscription", "Type_Sub", "اختر نوع الاشتراك");
                    DocumentActions.FillCombowithdefult(DetailsType_Souscription, txtType_Sub, "ID_Souscription", "Type_Sub", "اختر نوع الاشتراك");
                }
            }
        });
    }
    function Display() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("I_Attendance", "GetAllI_Attendance"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Get_I_Attendance = result.Response;
                    divMasterGrid.DataSource = Get_I_Attendance;
                    divMasterGrid.Bind();
                }
            }
        });
    }
    function _SearchBox_Change() {
        if (searchbutmemreport.value != "") {
            var search_1 = searchbutmemreport.value.toLowerCase();
            SearchDetails = Get_I_Attendance.filter(function (x) { return x.ID_Cust.toString().search(search_1) >= 0 || x.Name_Customer.toLowerCase().search(search_1) >= 0; } /*|| x.PortName.toLowerCase().search(search) >= 0*/);
            divMasterGrid.DataSource = SearchDetails;
            divMasterGrid.Bind();
        }
        else {
            divMasterGrid.DataSource = Get_I_Attendance;
            divMasterGrid.Bind();
        }
    }
    function InitializeGrid() {
        divMasterGrid.ElementName = "divMasterGrid";
        divMasterGrid.Paging = true;
        divMasterGrid.PageSize = 10;
        divMasterGrid.Sorting = true;
        divMasterGrid.InsertionMode = JsGridInsertionMode.Binding;
        divMasterGrid.Editing = false;
        divMasterGrid.Inserting = false;
        divMasterGrid.SelectedIndex = 1;
        divMasterGrid.OnRowDoubleClicked = MasterGridDoubleClick;
        divMasterGrid.PrimaryKey = "ID_Cust";
        divMasterGrid.Columns = [
            { title: "ID", name: "ID", type: "text", width: "2%", visible: false },
            { title: "رقم العميل", name: "ID_Cust", type: "text", width: "8%" },
            { title: "اسم العميل", name: "Name_Customer", type: "text", width: "30%" },
            { title: "التاريخ", name: "Tr_Date", type: "text", width: "10%" },
            { title: "وقت الدخول", name: "Time_in", type: "text", width: "10%" },
            { title: "عدد ايام الحضور", name: "Num_Day_Attendance", type: "text", width: "11%" },
        ];
    }
    function MasterGridDoubleClick() {
        //Selected_Data = new Array<IQ_Custmer_Souscription>();                   
        //Selected_Data = Get_I_Attendance.filter(x => x.ID_Cust == Number(divMasterGrid.SelectedKey));
        //ID_Cust = Selected_Data[0].ID_Cust;
        //$("#rowData").removeClass("display_none");
        //$("#divTotalSatistics").removeClass("display_none");
        //DisplayData(Selected_Data);
        //$("#btnview_invitation").removeAttr("disabled");
    }
    function DisplayData(Selected_Data) {
        DocumentActions.RenderFromModel(Selected_Data[0]);
        var NumDay = GetNumDay(Selected_Data[0].Start_Date, Selected_Data[0].End_Date);
        $('#Num_Day').val(NumDay);
        var code = Selected_Data[0].image.toString();
        $("#output").attr('data-cod', code);
        $('#txtStatas').val(Selected_Data[0].Type_Customer.toString());
        chkActive.checked = Selected_Data[0].Type == '1' ? true : false;
        btnRenewal.disabled = false;
        btnUpdate.disabled = false;
        btnfreeze.disabled = false;
        btnview_invitation.disabled = false;
        chkActive.disabled = true;
        if (Selected_Data[0].Statas == true) {
            var date = GetDate();
            var Days = GetNumDay(date, Selected_Data[0].End_Date_freeze);
            if (Days > 0) {
                btnRenewal.disabled = true;
            }
            else {
                btnRenewal.disabled = false;
            }
        }
        if (Selected_Data[0].Type == '1') {
            btnUpdate.disabled = true;
            btnRenewal.disabled = true;
            btnfreeze.disabled = true;
            btnview_invitation.disabled = true;
            chkActive.disabled = false;
        }
    }
})(Home || (Home = {}));
//# sourceMappingURL=Home.js.map