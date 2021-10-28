
$(document).ready(() => {
    Presence.InitalizeComponent();
})

namespace Presence { 
    var compcode: Number;                     
    var SysSession: SystemSession = GetSystemSession();
    
    var sys: SystemTools = new SystemTools();

    //Arrays     
    var UserDetails: Array<LoginPage> = new Array<LoginPage>();
    var Details: Array<I_Attendance> = new Array<I_Attendance>();
    var IQDetails: Array<IQ_Attend_Multi> = new Array<IQ_Attend_Multi>();
    var SearchDetails: Array<IQ_Attend_Multi> = new Array<IQ_Attend_Multi>();
    var CustomerDetails: Array<I_Customer_Gym> = new Array<I_Customer_Gym>();
    var EmpDetails: Array<G_USERS> = new Array<G_USERS>();


    //DropDownlist  
    var ddlType: HTMLSelectElement;
    var ddlCustEmp: HTMLSelectElement;


    // giedView
    var divMasterGrid: JsGrid = new JsGrid();
    //Textboxes
    var searchbutmemreport: HTMLInputElement;
    var txtFromDate: HTMLInputElement;
    var txtToDate: HTMLInputElement;
    var txtNationality: HTMLSelectElement;
    //buttons 
    var btnShow: HTMLButtonElement;     
    var btnprint: HTMLButtonElement;
    var btnPrintTrview: HTMLButtonElement;
    var btnPrintTrPDF: HTMLButtonElement;
    var btnPrintTrEXEL: HTMLButtonElement;
    //flags            
    var IsSuccess = false;

    export function InitalizeComponent() {


                     

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
    function InitalizeControls() {

        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            document.getElementById('Screen_name').innerHTML = "استعلام حضور و انصراف";

        }
        else {
            document.getElementById('Screen_name').innerHTML = "Attendance and departure inquiries";
        }


        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        //Drop Downlists

        searchbutmemreport = document.getElementById("searchbutmemreport") as HTMLInputElement;
        txtFromDate = document.getElementById("txtFromDate") as HTMLInputElement;
        txtToDate = document.getElementById("txtToDate") as HTMLInputElement;
        ddlType = document.getElementById("ddlType") as HTMLSelectElement;
        ddlCustEmp = document.getElementById("ddlCustEmp") as HTMLSelectElement;

        btnShow = document.getElementById("btnShow") as HTMLButtonElement;

        btnprint = document.getElementById("btnprint") as HTMLButtonElement;
        btnPrintTrview = document.getElementById("btnPrintTrview") as HTMLButtonElement;
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF") as HTMLButtonElement;
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL") as HTMLButtonElement;

    }
    function IntializeEvents() {
        btnShow.onclick = btnShow_onclick;
        ddlType.onchange = ddlType_onchange;
        searchbutmemreport.onkeyup = _SearchBox_Change;


        btnprint.onclick = () => { printreport(1) };
        //btnPrintTrview.onclick = () => { printreport(1) };
        //btnPrintTrPDF.onclick = () => { printreport(2) };
        //btnPrintTrEXEL.onclick = () => { printreport(3) };

                                                                
    }


    function GetDate() {

        var today: Date = new Date();
        var dd: string = today.getDate().toString();
        var ReturnedDate: string;
        var mm: string = (today.getMonth() + 1).toString();
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
        debugger
        var startDate = DateFormatDataBes(txtFromDate.value).toString();
        var endDate = DateFormatDataBes(txtToDate.value).toString();
        var type = ddlType.value == "Cust"? 1 : 2;
        var cust = ddlCustEmp.value == "null" ? 0 : Number(ddlCustEmp.value);


        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("I_Attendance", "GetAll"),
            data: { startDate: startDate, endDate: endDate, type: type, cust: cust },
            success: (d) => {                  //string startdt,string enddt , string type , int CustEmp)
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    IQDetails = result.Response as Array<IQ_Attend_Multi>;

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


            if (ddlType.value == "Emp" ) {
                let search: string = searchbutmemreport.value.toLowerCase();
                SearchDetails = IQDetails.filter(x => x.ID_Code_USER.toString().search(search) >= 0 || x.USER_NAME.toLowerCase().search(search) >= 0);
                   
            }
            else {
                let search: string = searchbutmemreport.value.toLowerCase();
                SearchDetails = IQDetails.filter(x => x.ID_Cust.toString().search(search) >= 0  || x.Name_Customer.toLowerCase().search(search) >= 0 );
                                   
            }

        


            divMasterGrid.DataSource = SearchDetails;
            divMasterGrid.Bind();
        } else {
            divMasterGrid.DataSource = IQDetails;
            divMasterGrid.Bind();
        }
    }
    function InitializeGrid() {
        
        let res: any = GetResourceList("");
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
            { title: "الكود", name: (ddlType.value == "Emp" ? "ID_Code_USER" :"ID_Cust"), type: "text", width: "20%" },    
            { title: "الاسم", name: (ddlType.value == "Emp" ? "USER_NAME":"Name_Customer"), type: "text", width: "20%" },    
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
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    EmpDetails = result.Response as Array<G_USERS>;


                }
            }
        });

    }
    function GetAll_I_Detais_Custmor() {

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Subscriptions", "GetAll_I_Detais_Custmor"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    CustomerDetails = result.Response as Array<I_Customer_Gym>;


                }
            }
        });
    }
    function ddlType_onchange() {
        debugger;
        if (ddlType.value == "Cust") {
            $('#ddlCustEmp').removeAttr('disabled');

            DocumentActions.FillCombowithdefult(CustomerDetails, ddlCustEmp, "ID_Cust", "Name_Customer", "اختر العميل");

        } else {
            $('#ddlCustEmp').removeAttr('disabled');


            DocumentActions.FillCombowithdefult(EmpDetails, ddlCustEmp, "ID_Code", "USER_CODE", "اختر الموظف");

        }



    }
   

    ////-------------------------------------------------------button---Save and Back and Eidt-------------------------------------- 

    function printreport(type: number) {
        let _StockList: Array<Settings_Report> = new Array<Settings_Report>();
        let _Stock: Settings_Report = new Settings_Report();
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

        let rp: ReportParameters = new ReportParameters();

        rp.Data_Report = JSON.stringify(_StockList);//output report as View

        Ajax.Callsync({
            url: Url.Action("Data_Report_Open", "GeneralReports"),
            data: rp,
            success: (d) => {
                let result = d.result as string;


                window.open(result, "_blank");
            }
        })








    }

}