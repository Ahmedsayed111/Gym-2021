
$(document).ready(() => {
    ////debugger;
    Subscriptions.InitalizeComponent();
})

namespace Subscriptions {
    var UploadImg: boolean = true;
    var NewUploadedImageName = "";
    var CurrentImageName = "";
    //system varables
    var AccType = 3; //نوع الحساب
    //var SysSession: SystemSession = GetSystemSession();
    var compcode: Number;
    //var sys: SystemTools = new SystemTools();

    var SysSession: SystemSession = GetSystemSession();
    var sys: SystemTools = new SystemTools();
    //Arrays     
    var UserDetails: Array<LoginPage> = new Array<LoginPage>();
    var CustomerDetails: Array<CUSTOMER> = new Array<CUSTOMER>();

    var Get_IQ_Custmer_Souscription: Array<IQ_Custmer_Souscription> = new Array<IQ_Custmer_Souscription>();
    var SearchDetails: Array<IQ_Custmer_Souscription> = new Array<IQ_Custmer_Souscription>();
    var Selected_Data: Array<IQ_Custmer_Souscription> = new Array<IQ_Custmer_Souscription>();
    var AllGetStokMasterDetail: Array<I_Detais_Data_Custmor> = new Array<I_Detais_Data_Custmor>();

    var FilterFamilyDetails: Array<CATEGRES> = new Array<CATEGRES>();
    var FamilyDetails: Array<CATEGRES> = new Array<CATEGRES>();
    var ItemFamilyDetails: Array<PRODUCT> = new Array<PRODUCT>();
    var ItemBaesdFamilyDetails: Array<PRODUCT> = new Array<PRODUCT>();
    var DetaisCustmorModel: Array<I_Detais_Data_Custmor> = new Array<I_Detais_Data_Custmor>();
    var DetaisCustmorSingleModel: I_Detais_Data_Custmor = new I_Detais_Data_Custmor();

    var SubsMasterDetails: SubscriptionsMasterDetails = new SubscriptionsMasterDetails();

    var Purchases_Mas: Array<IQ_Purchases_Master> = new Array<IQ_Purchases_Master>();

    var UpdatedModel: Array<Purchases_Master> = new Array<Purchases_Master>();
    var FilteredModel: Array<Purchases_Master> = new Array<Purchases_Master>();


    var DetailsType_Souscription: Array<I_Type_Souscription> = new Array<I_Type_Souscription>();
    var DetailsType_Sous: Array<I_Type_Souscription> = new Array<I_Type_Souscription>();
    var SearchVendorDetails: Array<Supplier> = new Array<Supplier>();
    var Detailsfamilly_Cat: Array<familly_Cat> = new Array<familly_Cat>();
    var UploadImage: HTMLInputElement;
    var txtNumDays_freeze: HTMLInputElement;
    var txtEnd_Date: HTMLInputElement;
    var txtStart_Date: HTMLInputElement;

    
    

    //DropDownlist

    var ddlStateType: HTMLSelectElement;

    var ddlSouscription: HTMLSelectElement;
    var txtType_Sub: HTMLSelectElement;

    var id_divGridDetails: HTMLDivElement;

    // giedView
    var divMasterGrid: JsGrid = new JsGrid();
    //Textboxes

    var chkActive: HTMLInputElement;
    var txtdateopening: HTMLInputElement;
    var txtDateHeader: HTMLInputElement;
    var txtNationality: HTMLSelectElement;
    //buttons 
    var btnPresent: HTMLButtonElement;
    var btnClose: HTMLButtonElement;
    var btnOpen: HTMLButtonElement;
    var btnView_load: HTMLButtonElement;
    var btnExpenses: HTMLButtonElement;
    var btnShow: HTMLButtonElement;
    var btnadd: HTMLButtonElement;
    var btnprint: HTMLButtonElement;

    var btnview_invitation: HTMLButtonElement;
    var btn_cancel_freeze: HTMLButtonElement;
    var btn_Ok_freeze: HTMLButtonElement;
    var btnfreeze: HTMLButtonElement;
    var btnRenewal: HTMLButtonElement;
    var btnUpdate: HTMLButtonElement;
    var btnSave: HTMLButtonElement;
    var btnBack: HTMLButtonElement;
    var btnSupplierSearch: HTMLButtonElement;
    var btnPaid_Up: HTMLButtonElement;
    var output: HTMLImageElement;

    //new                          

    var i_file: HTMLButtonElement;
    var btnAddDetails: HTMLButtonElement;
    var searchbutmemreport: HTMLInputElement;
    //var btnPrint: HTMLButtonElement;
    //var btnPrintTrview: HTMLButtonElement;
    //var btnPrintTrPDF: HTMLButtonElement;
    //var btnPrintTrEXEL: HTMLButtonElement;
    //flags 
    var CountGrid = 0;
    var CountItems = 0;

    var ID_Cust;
    var AddNew;
    var Renewal;
    var CashTot;
    var Success_Balance = true;
    var Bal = 0;
    var Num_Attendance = 0;
    var IsSuccess = false;

    export function InitalizeComponent() {

        //CreatedAt = DateTimeFormat(Date().toString());
        //CreatedBy = SysSession.CurrentEnvironment.UserCode;

        //UpdatedAt = DateTimeFormat(Date().toString());
        //UpdatedBy = SysSession.CurrentEnvironment.UserCode;

        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "الاشتراكات";

        }
        else {
            document.getElementById('Screen_name').innerHTML = "الاشتراكات";
        }

        compcode = Number(SysSession.CurrentEnvironment.CompCode);

        InitalizeControls();
        IntializeEvents();
        FillddlType_Souscription();
        InitializeGrid();
        btnShow_onclick();

    }
    function InitalizeControls() {
        debugger

        ddlSouscription = document.getElementById("ddlSouscription") as HTMLSelectElement;
        txtType_Sub = document.getElementById("txtType_Sub") as HTMLSelectElement;
        ddlStateType = document.getElementById("ddlStateType") as HTMLSelectElement;
        searchbutmemreport = document.getElementById("searchbutmemreport") as HTMLInputElement;

        output = document.getElementById('output') as HTMLImageElement;

        btnadd = document.getElementById("btnadd") as HTMLButtonElement;
        btnShow = document.getElementById("btnShow") as HTMLButtonElement;
        btnview_invitation = document.getElementById("btnview_invitation") as HTMLButtonElement;
        btn_cancel_freeze = document.getElementById("btn_cancel_freeze") as HTMLButtonElement;
        btn_Ok_freeze = document.getElementById("btn_Ok_freeze") as HTMLButtonElement;
        btnfreeze = document.getElementById("btnfreeze") as HTMLButtonElement;
        btnRenewal = document.getElementById("btnRenewal") as HTMLButtonElement;
        btnUpdate = document.getElementById("btnUpdate") as HTMLButtonElement;
        btnBack = document.getElementById("btnBack") as HTMLButtonElement;
        btnSave = document.getElementById("btnSave") as HTMLButtonElement;
        btnSupplierSearch = document.getElementById("btnSupplierSearch") as HTMLButtonElement;
        btnPaid_Up = document.getElementById("btnPaid_Up") as HTMLButtonElement;
        btnprint = document.getElementById("btnprint") as HTMLButtonElement;
        //i_file = document.getElementById("i_file") as HTMLButtonElement;         //

        btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;
        //btnPrint = document.getElementById("btnPrint") as HTMLButtonElement;
        //btnPrintTrview = document.getElementById("btnPrintTrview") as HTMLButtonElement;
        //btnPrintTrPDF = document.getElementById("btnPrintTrPDF") as HTMLButtonElement;
        //btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL") as HTMLButtonElement;
        UploadImage = document.getElementById("Upload_Image") as HTMLInputElement;
        txtNumDays_freeze = document.getElementById("txtNumDays_freeze") as HTMLInputElement;
        txtEnd_Date = document.getElementById("txtEnd_Date") as HTMLInputElement;
        txtStart_Date = document.getElementById("txtStart_Date") as HTMLInputElement;         

        
        
        chkActive = document.getElementById("chkActive") as HTMLInputElement;


    }
    function IntializeEvents() {

        //txtNumDays_freeze.value.trim() == '';
        searchbutmemreport.onkeyup = _SearchBox_Change;
        btnShow.onclick = btnShow_onclick;
        btnUpdate.onclick = Update_onclick;
        btnview_invitation.onclick = view_invitation;
        btn_cancel_freeze.onclick = btn_cancel_freeze_onclick;
        btn_Ok_freeze.onclick = btn_Ok_freeze_onclick;
        btnfreeze.onclick = btnfreeze_onclick;
        btnRenewal.onclick = btnRenewal_onclick;
        btnBack.onclick = btnBack_onclick;
        btnSave.onclick = btnSave_onclick;
        btnadd.onclick = btnAdd_onclick;
        btnAddDetails.onclick = AddNewRow;
        txtType_Sub.onchange = txtType_Sub_onchange;
        txtEnd_Date.onchange = txtEnd_Date_onchange;
        txtStart_Date.onchange = txtEnd_Date_onchange;

        
        UploadImage.onchange = UploadImage_onchange;
        txtNumDays_freeze.onkeyup = txtNumDays_freeze_onchange;
        chkActive.onchange = chkActive_onchange;
        //btnPrint.onclick = () => { printreport(4) };
        //btnPrintTrview.onclick = () => { printreport(1) };
        //btnPrintTrPDF.onclick = () => { printreport(2) };
        //btnPrintTrEXEL.onclick = () => { printreport(3) };

    }

    function FillddlType_Souscription() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("I_Type_Souscription", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    DetailsType_Souscription = result.Response as Array<I_Type_Souscription>;
                    DocumentActions.FillCombowithdefult(DetailsType_Souscription, ddlSouscription, "ID_Souscription", "Type_Sub", "اختر نوع الاشتراك");
                    DocumentActions.FillCombowithdefult(DetailsType_Souscription, txtType_Sub, "ID_Souscription", "Type_Sub", "اختر نوع الاشتراك");

                    DetailsType_Sous = DetailsType_Souscription.filter(x => x.Active == true);


                }
            }
        });
    }

    function Display() {
        //debugger

        var ID_Souscription = ddlSouscription.value == "null" ? 1001 : ddlSouscription.value;
        var Statas = ddlStateType.value;



        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Subscriptions", "GetAll_IQ_Subscriptions"),
            data: { ID_Souscription: Number(ID_Souscription), Statas: Number(Statas) },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Get_IQ_Custmer_Souscription = result.Response as Array<IQ_Custmer_Souscription>;

                    for (var i = 0; i < Get_IQ_Custmer_Souscription.length; i++) {

                        Get_IQ_Custmer_Souscription[i].NameStatas = Get_IQ_Custmer_Souscription[i].Statas == true ? 'نعم' : 'لا';



                        let Num = GetNumDay(Get_IQ_Custmer_Souscription[i].Start_Date, Get_IQ_Custmer_Souscription[i].End_Date);

                        Get_IQ_Custmer_Souscription[i].remainDay = Num == 0 ? 'انتهى الاشتراك' : '' + Num + '';


                    }

                    divMasterGrid.DataSource = Get_IQ_Custmer_Souscription;
                    divMasterGrid.Bind();
                }
            }
        });
    }
    function _SearchBox_Change() {
        //  k//debugger;
        debugger
        if (searchbutmemreport.value != "") {



            let search: string = searchbutmemreport.value.toLowerCase();
            SearchDetails = Get_IQ_Custmer_Souscription.filter(x => x.ID_Cust.toString().search(search) >= 0 || x.Name_Customer.toLowerCase().search(search) >= 0 || x.Phone_Customer.toLowerCase().search(search) >= 0 || x.Carte_Dentite.toLowerCase().search(search) >= 0  /*|| x.PortName.toLowerCase().search(search) >= 0*/);

            divMasterGrid.DataSource = SearchDetails;
            divMasterGrid.Bind();
        } else {
            divMasterGrid.DataSource = Get_IQ_Custmer_Souscription;
            divMasterGrid.Bind();
        }
    }
    function InitializeGrid() {
        //$("#divMasterGrid").attr("style", "");
        let res: any = GetResourceList("");
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
            { title: "ID", name: "ID_Cust", type: "text", width: "2%", visible: false },
            { title: "كود العميل", name: "ID_Cust", type: "text", width: "8%" },
            { title: "اسم العميل", name: "Name_Customer", type: "text", width: "30%" },
            { title: "رقم الهاتف", name: "Phone_Customer", type: "text", width: "10%" },
            { title: "نوع الاشتراك", name: "Type_Sub", type: "text", width: "10%" },
            { title: "تاريخ البدء", name: "Start_Date", type: "text", width: "11%" },
            { title: "تاريخ الانتهاء", name: "End_Date", type: "text", width: "11%" },
            { title: "الايام المتبقيه", name: "remainDay", type: "text", width: "11%" },
            { title: "حاله التجميد مسبقا", name: "NameStatas", type: "text", width: "9%" },
        ];

    }

    function MasterGridDoubleClick() {
        Selected_Data = new Array<IQ_Custmer_Souscription>();

        Selected_Data = Get_IQ_Custmer_Souscription.filter(x => x.ID_Cust == Number(divMasterGrid.SelectedKey));

        ID_Cust = Selected_Data[0].ID_Cust;

        $("#rowData").removeClass("display_none");
        $("#divTotalSatistics").removeClass("display_none");
        DisplayData(Selected_Data);

        $("#btnview_invitation").removeAttr("disabled");



    }
    function DisplayData(Selected_Data: Array<IQ_Custmer_Souscription>) {
        DocumentActions.RenderFromModel(Selected_Data[0]);




        var NumDay = GetNumDay(Selected_Data[0].Start_Date, Selected_Data[0].End_Date);

        $('#Num_Day').val(NumDay);

        //$("#output").attr('src', Selected_Data[0].image);

        Num_Attendance = Selected_Data[0].Num_Attendance;
        //alert(Num_Attendance);

        let code = Selected_Data[0].image.toString();
        //alert(code);
        viewimage(code);
        $("#output").attr('data-cod', code);

        $('#txtStatas').val(Selected_Data[0].Type_Customer.toString());

        chkActive.checked = Selected_Data[0].Type == '1' ? true : false;

        BindGetOperationItemsGridData(Selected_Data[0].ID_Cust);



        btnRenewal.disabled = false;
        btnUpdate.disabled = false;
        btnfreeze.disabled = false;
        btnview_invitation.disabled = false;
        chkActive.disabled = true;

        if (Selected_Data[0].Statas == true) {

            let date = GetDate();
            let Days = GetNumDay(date, Selected_Data[0].End_Date_freeze);

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
    function BindGetOperationItemsGridData(ID_Cust: number) {
        debugger
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Subscriptions", "GetAll_I_Detais_Data_Custmor"),
            data: { ID_Cust: ID_Cust },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    AllGetStokMasterDetail = result.Response as Array<I_Detais_Data_Custmor>;

                    $("#div_Data").html('');
                    CountGrid = 0;
                    for (var i = 0; i < AllGetStokMasterDetail.length; i++) {

                        BuildControls(i);
                        Disbly_BuildControls(i, AllGetStokMasterDetail);
                        CountGrid += 1;
                    }


                    Newwide(CountGrid - 1);

                }
            }
        });
    }

    function BuildControls(cnt: number) {
        var html;

        html = '<div id= "No_Row' + cnt + '" class="container-fluid style_border" > <div class="" > <div class="col-lg-12" > ' +
            '<div class="col-lg-1"style="width: 3%;">' +
            '<span id="btn_minus' + cnt + '" class="fa fa-minus-circle fontitm3 display_none" style="font-size: 28px;"></span></div>' +
            '<div class="col-lg-2" style="width: 20%;">' +
            '<input type="date" class="form-control input-sm addable editable" name="Start_Date"  disabled id="txt_Date' + cnt + '"></div>' +
            '<div class="col-lg-1" style="width: 12%;"><input id="txtLongueur_Detais' + cnt + '" disabled data-qet="0" type="number" class="form-control right2"   value="0"/></div>' +
            '<div class="col-lg-1" style="width: 12%;"><input id="txtle_Poids_Detais' + cnt + '" disabled data-product_qet_stock="0" type="number" class="form-control right2"   value="0"/></div>' +
            '<div class="col-lg-1" style="width: 12%;"><input id="txtMuscles_P_C' + cnt + '" type="number" disabled disabled class="form-control right2"   value="0"/></div>' +
            '<div class="col-lg-1" style="width: 12%;"><input id="txtFats_P_C' + cnt + '" type="number" disabled disabled class="form-control right2"   value="0"/></div>' +
            '<div class="col-lg-2" ><input id="txtRemarks_Detais' + cnt + '" type="txet" disabled disabled class="form-control right2"   value=""/></div>' +
            '<div class="col-lg-1" ><input id="txtperfect_weight' + cnt + '" type="txet" disabled disabled class="form-control right2"   value=""/></div>' +
            //'<div class="col-lg-1" style=""><input id="txtReturn' + cnt + '" type="number" disabled class="form-control right2"   value=""/></div>' +
            //'<div class="col-lg-2" style="width: 12%;"><input id="txtTotal' + cnt + '" type="number" disabled class="form-control right2"   value="0"/></div>' +

            '</div></div></div>' +

            '<input id="txt_StatusFlag' + cnt + '" name = " " type = "hidden" class="form-control"/><input id="txt_ID' + cnt + '" name = " " type = "hidden" class="form-control" /> ';

        $("#div_Data").append(html);

        $("#txt_Date" + cnt).val(GetDate());

        $("#txt_Date" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });

        $("#txtLongueur_Detais" + cnt).on('keyup', function () {

            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");


            if ($("#txtle_Poids_Detais" + cnt).val().trim() == "" || $("#txtLongueur_Detais" + cnt).val().trim() == '') {

            }
            else {
                Equations(cnt);
            }
        });


        $("#txtle_Poids_Detais" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");



            if ($("#txtle_Poids_Detais" + cnt).val().trim() == "" || $("#txtLongueur_Detais" + cnt).val().trim() == '') {

            }
            else {
                Equations(cnt);
            }
        });

        $("#txtMuscles_P_C" + cnt).on('keyup', function () {

            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });

        $("#txtFats_P_C" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });

        $("#txtRemarks_Detais" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });

        $("#txtnewwide").on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });

        $("#txtperfect_weight" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });



        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });


        return;

    }
    function Disbly_BuildControls(cnt: number, AllGetStokItemInfo: Array<I_Detais_Data_Custmor>) {
        debugger
        $("#btnAddDetails").addClass("display_none");
        $("#btn_minus" + cnt).addClass("display_none");
        $("#txt_StatusFlag" + cnt).val("");
        $('#txt_ID' + cnt).val(AllGetStokItemInfo[cnt].ID);

        var TrDate: string = DateFormat(AllGetStokItemInfo[cnt].Start_Date_Detais);
        $('#txt_Date' + cnt).val(TrDate);
        $('#txtLongueur_Detais' + cnt).val(AllGetStokItemInfo[cnt].Longueur_Detais);
        $('#txtle_Poids_Detais' + cnt).val(AllGetStokItemInfo[cnt].le_Poids_Detais);
        $('#txtMuscles_P_C' + cnt).val(AllGetStokItemInfo[cnt].Muscles_P_C);
        $('#txtFats_P_C' + cnt).val(AllGetStokItemInfo[cnt].Fats_P_C);
        $('#txtRemarks_Detais' + cnt).val(AllGetStokItemInfo[cnt].Remarks_Detais);
        $('#txtperfect_weight' + cnt).val(AllGetStokItemInfo[cnt].perfect_weight);




    }
    function AddNewRow() {

        var CanAdd: boolean = true;
        if (CountGrid > 0) {

            for (var i = 0; i < CountGrid -1 ; i++) {
                CanAdd = Validation_Grid(i);
                if (CanAdd == false) {
                    break;
                }
            }
        }
        if (CanAdd) {
            CountItems = CountItems + 1;
            BuildControls(CountGrid);
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode         
            $("#txt_Date" + CountGrid).removeAttr("disabled");
            $("#txtLongueur_Detais" + CountGrid).removeAttr("disabled");
            $("#txtle_Poids_Detais" + CountGrid).removeAttr("disabled");

            $("#btn_minus" + CountGrid).removeClass("display_none");
            $("#btn_minus" + CountGrid).removeAttr("disabled");

            CountGrid += 1;

            ComputeTotals();


        }
    }
    function DeleteRow(RecNo: number) {
        if (!SysSession.CurrentPrivileges.Remove) return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", () => {

            if ($("#txt_StatusFlag" + RecNo).val() == 'i') {
                $("#txt_StatusFlag" + RecNo).val("m");
            }
            else {
                $("#txt_StatusFlag" + RecNo).val("d");

            }

            $("#txt_Date" + RecNo).val("1");
            $("#txtLongueur_Detais" + RecNo).val("1");
            $("#txtle_Poids_Detais" + RecNo).val("2");
            $("#txtMuscles_P_C" + RecNo).val("1");
            $("#txtFats_P_C" + RecNo).val("1");
            $("#txtRemarks_Detais" + RecNo).val("110");
            $("#txtperfect_weight" + RecNo).val("110");
            $("#txtnewwide").val("110");
            $("#No_Row" + RecNo).attr("hidden", "true");
            CountItems = CountItems - 1;
            ComputeTotals();

        });
    }
    function Validation_Grid(rowcount: number) {
        if ($("#txt_Date" + rowcount).val() == "Null" && ($("#txt_StatusFlag" + rowcount).val() != 'd' || $("#txt_StatusFlag" + rowcount).val() != 'm')) {

            DisplayMassage(" برجاء أختيار التاريخ", "خطأ", MessageType.Error);
            Errorinput($("#txt_Date" + rowcount));
            return false
        }
        else if ($("#txtLongueur_Detais" + rowcount).val().trim() == ''|| $("#txtLongueur_Detais" + rowcount).val() == "0" || $("#txtLongueur_Detais" + rowcount).val() == "" && ($("#txt_StatusFlag" + rowcount).val() != 'd' || $("#txt_StatusFlag" + rowcount).val() != 'm')) {

            DisplayMassage(" برجاءادخال الطول", "خطأ", MessageType.Error);
            Errorinput($("#txtLongueur_Detais" + rowcount));


            return false
        }
        else if ($("#txtle_Poids_Detais" + rowcount).val().trim() == '' || $("#txtle_Poids_Detais" + rowcount).val() == "0" ||$("#txtle_Poids_Detais" + rowcount).val() == "" && ($("#txt_StatusFlag" + rowcount).val() != 'd' || $("#txt_StatusFlag" + rowcount).val() != 'm')) {

            DisplayMassage(" برجاءادخال الوزن", "خطأ", MessageType.Error);

            Errorinput($("#txtle_Poids_Detais" + rowcount));

            return false
        }
        else if ($("#txtRemarks_Detais" + rowcount).val() == "" && ($("#txt_StatusFlag" + rowcount).val() != 'd' || $("#txt_StatusFlag" + rowcount).val() != 'm')) {

            DisplayMassage(" برجاءادخال الوزن والطول مجددا", "خطأ", MessageType.Error);
            Errorinput($("#txtRemarks_Detais" + rowcount));

            return false
        }

        else if ($("#txtperfect_weight" + rowcount).val() == "" && ($("#txt_StatusFlag" + rowcount).val() != 'd' || $("#txt_StatusFlag" + rowcount).val() != 'm')) {

            DisplayMassage(" برجاءادخال الوزن والطول مجددا", "خطأ", MessageType.Error);
            Errorinput($("#txtperfect_weight" + rowcount));

            return false
        }



        return true;

    }

    function CustomerFoundBefore() {
        var res: boolean = true;
        let code = Number($("#txtNumber").val());
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Subscriptions", "CodeFounBefore"),
            data: { ID_Cust: code },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.Response == 0) {
                    res = true;
                }
                else
                    res = false;
            }
        });
        return res;
    }
    function Validation_Heder() {

        debugger




        if (AddNew == true) {
            if ($("#txtNumber").val() != "") {

                if (CustomerFoundBefore() == false) {
                    DisplayMassage("رقم العميل موجود من قبل ", "Contact Email Is Not Valid", MessageType.Worning);
                    Errorinput($("#txtNumber"));
                    return false


                }
            }

        }

        if ($("#txtNumber").val() == "" || $("#txtNumber").val() == "0") {


            DisplayMassage(" برجاءادخال رقم العميل", "خطأ", MessageType.Error);
            Errorinput($("#txtNumber"));
            return false
        }
        if ($("#txtage").val() == "" || $("#txtage").val() == "0") {

            DisplayMassage(" برجاءادخال العمر", "خطأ", MessageType.Error);
            Errorinput($("#txtage"));

            return false
        }
        if ($("#txtName_Customer").val() == "" || $("#txtName_Customer").val() == "0") {

            DisplayMassage(" برجاءادخال الاسم", "خطأ", MessageType.Error);

            Errorinput($("#txtName_Customer"));

            return false
        }
        if ($("#txtPhone_Customer").val() == "" || $("#txtPhone_Customer").val() == "0") {

            DisplayMassage(" برجاءادخال رقم تليفون", "خطأ", MessageType.Error);
            Errorinput($("#txtPhone_Customer"));

            return false
        }
        debugger
        var q = Number($("#txtCarte_Dentite").val());
        if ($("#txtCarte_Dentite").val().trim() == "" || $("#txtCarte_Dentite").val() == "0" || isNaN(q)) {

            DisplayMassage(" برجاءادخال الرقم القومي", "خطأ", MessageType.Error);
            Errorinput($("#txtCarte_Dentite"));

            return false
        }
        
        if ($("#txtCarte_Dentite").val().length < 14 ) {

            DisplayMassage("الرقم القومي اقل من 14 رقم", "خطأ", MessageType.Error);
            Errorinput($("#txtCarte_Dentite"));

            return false
        }
        if ($("#txtType_Sub").val() == "null" || txtType_Sub.selectedIndex == 0) {

            DisplayMassage(" برجاء أختيار  نوع الاشتراك  ", "خطأ", MessageType.Error);
            Errorinput(txtType_Sub);

            return false
        }



        return true;

    }

    ////----------------------------------------------------- Div_items-------------------------------------------------------
    function Assign() {

        debugger;

        SubsMasterDetails = new SubscriptionsMasterDetails();
        var StatusFlag: String;

        for (var i = 0; i < CountGrid; i++) {
            DetaisCustmorSingleModel = new I_Detais_Data_Custmor();
            StatusFlag = $("#txt_StatusFlag" + i).val();
            debugger;
            if (StatusFlag == "i") {
                DetaisCustmorSingleModel.StatusFlag = StatusFlag.toString();
                DetaisCustmorSingleModel.ID = 0;
                DetaisCustmorSingleModel.ID_Cust = $('#txtNumber').val();
                DetaisCustmorSingleModel.Start_Date_Detais = $('#txt_Date' + i).val();
                DetaisCustmorSingleModel.Longueur_Detais = $("#txtLongueur_Detais" + i).val();
                DetaisCustmorSingleModel.le_Poids_Detais = $("#txtle_Poids_Detais" + i).val();
                DetaisCustmorSingleModel.Muscles_P_C = Number($('#txtMuscles_P_C' + i).val());
                DetaisCustmorSingleModel.Fats_P_C = Number($("#txtFats_P_C" + i).val());
                DetaisCustmorSingleModel.Remarks_Detais = $("#txtRemarks_Detais" + i).val();
                DetaisCustmorSingleModel.perfect_weight = Number($("#txtperfect_weight" + i).val());
                SubsMasterDetails.Data_CustmorDetails.push(DetaisCustmorSingleModel);

            }
            if (StatusFlag == "u") {
                var ID = $("#txt_ID" + i).val();
                DetaisCustmorSingleModel.StatusFlag = StatusFlag.toString();
                DetaisCustmorSingleModel.ID = ID;
                DetaisCustmorSingleModel.ID_Cust = $('#txtNumber').val();
                DetaisCustmorSingleModel.Start_Date_Detais = $('#txt_Date' + i).val();
                DetaisCustmorSingleModel.Longueur_Detais = $("#txtLongueur_Detais" + i).val();
                DetaisCustmorSingleModel.le_Poids_Detais = $("#txtle_Poids_Detais" + i).val();
                DetaisCustmorSingleModel.Muscles_P_C = Number($('#txtMuscles_P_C' + i).val());
                DetaisCustmorSingleModel.Fats_P_C = Number($("#txtFats_P_C" + i).val());
                DetaisCustmorSingleModel.Remarks_Detais = $("#txtRemarks_Detais" + i).val();
                DetaisCustmorSingleModel.perfect_weight = Number($("#txtperfect_weight" + i).val());
                SubsMasterDetails.Data_CustmorDetails.push(DetaisCustmorSingleModel);
            }
            if (StatusFlag == "d") {
                if ($("#txt_ID" + i).val() != "") {
                    var ID = $("#txt_ID" + i).val();
                    DetaisCustmorSingleModel.StatusFlag = StatusFlag.toString();
                    DetaisCustmorSingleModel.ID = ID;
                    DetaisCustmorSingleModel.ID_Cust = $('#txtNumber').val();
                    SubsMasterDetails.Data_CustmorDetails.push(DetaisCustmorSingleModel);
                }
            }
        }
        DocumentActions.AssignToModel(SubsMasterDetails.Custmer_Souscription);


        SubsMasterDetails.Custmer_Souscription.Type_Customer = $('#txtStatas').val();


        if (AddNew == true) {
            SubsMasterDetails.Custmer_Souscription.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            SubsMasterDetails.Custmer_Souscription.CreatedAt = DateTimeFormat(Date().toString());

            let cod = ($('#txtNumber').val() + (Math.floor(Math.random() * 50000)));
            FileUpload(cod);

            SubsMasterDetails.Custmer_Souscription.image = cod;
            SubsMasterDetails.Custmer_Souscription.Statas = false;

            SubsMasterDetails.Custmer_Souscription.Type = '0';
            SubsMasterDetails.Custmer_Souscription.Num_Attendance = 0;

            SubsMasterDetails.Custmer_Souscription.Renewal = true;



        }
        else {
            SubsMasterDetails.Custmer_Souscription.UpdatedBy = SysSession.CurrentEnvironment.UserCode;
            SubsMasterDetails.Custmer_Souscription.UpdatedAt = DateTimeFormat(Date().toString());
            SubsMasterDetails.Custmer_Souscription.Statas = Selected_Data[0].Statas;

            SubsMasterDetails.Custmer_Souscription.Type = chkActive.checked == true ? '1' : '0';

            SubsMasterDetails.Custmer_Souscription.Num_Attendance = Num_Attendance;

            $("#output").attr('data-cod');

            SubsMasterDetails.Custmer_Souscription.Renewal = false;


            if ($("#output").attr('data-cod') == '') {
                let cod = ($('#txtNumber').val() + (Math.floor(Math.random() * 50000)));
                FileUpload(cod);

                SubsMasterDetails.Custmer_Souscription.image = cod;
            }
            else {
                SubsMasterDetails.Custmer_Souscription.image = $("#output").attr('data-cod');
            }



        }


        if (Renewal == true) {
            SubsMasterDetails.Custmer_Souscription.Statas = false;
            SubsMasterDetails.Custmer_Souscription.Type_Customer = 0;
            SubsMasterDetails.Custmer_Souscription.Num_Days_freeze = 0;
            SubsMasterDetails.Custmer_Souscription.Num_Attendance = 0;
            SubsMasterDetails.Custmer_Souscription.End_Date_freeze = null;
            SubsMasterDetails.Custmer_Souscription.Renewal = true;

        }

        SubsMasterDetails.Custmer_Souscription.ID_Souscription = Number($('#txtType_Sub').val());


        SubsMasterDetails.Custmer_Souscription.NewAdd = AddNew;

        ID_Cust = $('#txtNumber').val();



    }
    function Update() {
        debugger
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Subscriptions", "Insert_Subscriptions"),
            data: JSON.stringify(SubsMasterDetails),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    debugger
                    let res = result.Response as number
                   
                    DisplayMassage("تم الحفظ بنجاح", "Success", MessageType.Succeed);

                    btnBack_onclick();
                    btnShow_onclick();



                    Selected_Data = new Array<IQ_Custmer_Souscription>();

                    Selected_Data = Get_IQ_Custmer_Souscription.filter(x => x.ID_Cust == Number(ID_Cust));
                                                               
                    ID_Cust = Selected_Data[0].ID_Cust;

                    $("#rowData").removeClass("display_none");
                    $("#divTotalSatistics").removeClass("display_none");
                    DisplayData(Selected_Data);

                    AddNew = true;
                    IsSuccess = true;

                }
                else {

                    IsSuccess = false;

                    DisplayMassage("خطأء", "Success", MessageType.Error);


                }
            }
        });

    }
    ////-------------------------------------------------------button---Save and Back and Eidt-------------------------------------- 
    function btnShow_onclick() {

        $('#divMasterGridiv').removeClass('display_none');

        $("#rowData").addClass("display_none");
        $("#divTotalSatistics").addClass("display_none");

        Display();
        debugger
        if (ddlStateType.value == '0') {
            $('#btnPaid_Up').removeAttr('disabled');
            $('.Paid').removeAttr('disabled');

        }
        else {
            $('#btnPaid_Up').attr('disabled', 'disabled');
            $('.Paid').attr('disabled', 'disabled');
        }

    }
    function btnfreeze_onclick() {
      

        $('#Men_popu').attr('style', 'display:block;');
        $('#Men_popu').attr('class', 'popu animated zoomIn');

        $("#PopupDialog").modal("show");

        $('#txtEnd_Date_freeze').val() == '' ? $('#txtEnd_Date_freeze').val(GetDate()) : $('#txtEnd_Date_freeze').val();        

        let date = GetDate();
        let Days = GetNumDay(date, $('#txtEnd_Date_freeze').val());
        $('#txtRemadays_freeze').val((Days - 1) <= 0 ? 0 : (Days - 1));

        $("#btn_Ok_freeze").removeClass("display_none");
        $("#btn_cancel_freeze").addClass("display_none");
        $("#txtNumDays_freeze").removeAttr("disabled");

        if (Selected_Data[0].Statas == true) {

            btn_Ok_freeze.classList.add('display_none');



            if (Days > 0) {

                $("#btn_cancel_freeze").removeClass("display_none");
                $("#txtNumDays_freeze").attr("disabled", "disabled");


            }
            else {
                $("#btn_cancel_freeze").addClass("display_none");
                $("#txtNumDays_freeze").attr("disabled", "disabled");


            }


        }
        else
        {

            $("#txtNumDays_freeze").val('0');
            $("#txtRemadays_freeze").val('0');
            $("#txtEnd_Date_freeze").val(GetDate());


        }


    }

    function txtNumDays_freeze_onchange() {


        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Subscriptions", "Select_Date_Day"),
            data: { Num_Day: Number(txtNumDays_freeze.value) },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    let Date = result.Response as string;

                    var End_Date: string = DateFormat(Date);
                    $('#txtEnd_Date_freeze').val(End_Date);


                    let date = GetDate();
                    let Days = GetNumDay(date, $('#txtEnd_Date_freeze').val());
                    $('#txtRemadays_freeze').val((Days) <= 0 ? 0 : (Days));

                }
            }
        });



    }

    function btn_Ok_freeze_onclick() {


        if ($("#txtNumDays_freeze").val().trim() == '' || $("#txtNumDays_freeze").val() == '0') {
            MessageBox.Show('يجب ادخال عدد الايام', '');
            Errorinput($("#txtNumDays_freeze"));
            return
        }


        let Num_days = Number(txtNumDays_freeze.value) + Number($('#Num_Day').val());

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Subscriptions", "Select_Date_Day"),
            data: { Num_Day: Number(Num_days) },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    let Date = result.Response as string;

                    var End_Date: string = DateFormat(Date);
                    $('#txtEnd_Date').val(End_Date);

                }
            }
        });

        SubsMasterDetails = new SubscriptionsMasterDetails();

        DetaisCustmorSingleModel = new I_Detais_Data_Custmor();



        DocumentActions.AssignToModel(SubsMasterDetails.Custmer_Souscription);

        SubsMasterDetails.Custmer_Souscription.UpdatedBy = SysSession.CurrentEnvironment.UserCode;

        SubsMasterDetails.Custmer_Souscription.UpdatedAt = DateTimeFormat(Date().toString());

        SubsMasterDetails.Custmer_Souscription.Statas = true;

        SubsMasterDetails.Custmer_Souscription.Type_Customer = 1;


        SubsMasterDetails.Custmer_Souscription.Num_Days_freeze = $('#txtNumDays_freeze').val();

        SubsMasterDetails.Custmer_Souscription.End_Date_freeze = $('#txtEnd_Date_freeze').val();

        SubsMasterDetails.Custmer_Souscription.End_Date = $('#txtEnd_Date').val();

        SubsMasterDetails.Custmer_Souscription.image = $("#output").attr('data-cod');


        SubsMasterDetails.Custmer_Souscription.ID_Souscription = Number($('#txtType_Sub').val());

        SubsMasterDetails.Custmer_Souscription.NewAdd = false;

        ID_Cust = $('#txtNumber').val();


        Update();
        IsSuccess = false;
        $("#PopupDialog").modal("hide");

        $('#Men_popu').attr('class', 'popu animated zoomOutUp');

    }

    function btn_cancel_freeze_onclick() {
        let Num_days = Number($('#Num_Day').val()) - (Number($('#txtRemadays_freeze').val()) + 1);

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Subscriptions", "Select_Date_Day"),
            data: { Num_Day: Number(Num_days) },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    let Date = result.Response as string;

                    var End_Date: string = DateFormat(Date);
                    $('#txtEnd_Date').val(End_Date);

                }
            }
        });


        let NumDays_freeze = Number($('#txtNumDays_freeze').val()) - Number($('#txtRemadays_freeze').val());

        $('#txtNumDays_freeze').val(NumDays_freeze);

        $('#txtEnd_Date_freeze').val(GetDate());




        SubsMasterDetails = new SubscriptionsMasterDetails();

        DetaisCustmorSingleModel = new I_Detais_Data_Custmor();



        DocumentActions.AssignToModel(SubsMasterDetails.Custmer_Souscription);

        SubsMasterDetails.Custmer_Souscription.UpdatedBy = SysSession.CurrentEnvironment.UserCode;

        SubsMasterDetails.Custmer_Souscription.UpdatedAt = DateTimeFormat(Date().toString());

        SubsMasterDetails.Custmer_Souscription.Statas = true;

        SubsMasterDetails.Custmer_Souscription.Type_Customer = 0;


        SubsMasterDetails.Custmer_Souscription.Num_Days_freeze = $('#txtNumDays_freeze').val();

        SubsMasterDetails.Custmer_Souscription.End_Date_freeze = $('#txtEnd_Date_freeze').val();

        SubsMasterDetails.Custmer_Souscription.End_Date = $('#txtEnd_Date').val();

        SubsMasterDetails.Custmer_Souscription.image = $("#output").attr('data-cod');


        SubsMasterDetails.Custmer_Souscription.ID_Souscription = Number($('#txtType_Sub').val());

        SubsMasterDetails.Custmer_Souscription.NewAdd = false;

        ID_Cust = $('#txtNumber').val();


        Update();
        IsSuccess = false;
        $("#PopupDialog").modal("hide");

        $('#Men_popu').attr('class', 'popu animated zoomOutUp');
    }


    function chkActive_onchange() {

        debugger
        if (AddNew == false) {

        }
        else {

            chkActive.disabled = true;

            DisplayMassage("جاري الغاء الحظر", "Success", MessageType.Succeed);


            if (chkActive.checked == false) {




                if (chkActive.disabled == true) {

                    AddNew = false;

                    SubsMasterDetails = new SubscriptionsMasterDetails();
                    DetaisCustmorSingleModel = new I_Detais_Data_Custmor();


                    DocumentActions.AssignToModel(SubsMasterDetails.Custmer_Souscription);


                    SubsMasterDetails.Custmer_Souscription.Type_Customer = $('#txtStatas').val();


                    SubsMasterDetails.Custmer_Souscription.UpdatedBy = SysSession.CurrentEnvironment.UserCode;
                    SubsMasterDetails.Custmer_Souscription.UpdatedAt = DateTimeFormat(Date().toString());
                    SubsMasterDetails.Custmer_Souscription.Statas = Selected_Data[0].Statas;

                    SubsMasterDetails.Custmer_Souscription.Type = '0';


                    $("#output").attr('data-cod');


                    if ($("#output").attr('data-cod') == '') {
                        let cod = ($('#txtNumber').val() + (Math.floor(Math.random() * 50000)));
                        FileUpload(cod);

                        SubsMasterDetails.Custmer_Souscription.image = cod;
                    }
                    else {
                        SubsMasterDetails.Custmer_Souscription.image = $("#output").attr('data-cod');
                    }

                    SubsMasterDetails.Custmer_Souscription.ID_Souscription = Number($('#txtType_Sub').val());


                    SubsMasterDetails.Custmer_Souscription.NewAdd = AddNew;

                    ID_Cust = $('#txtNumber').val();


                    Ajax.Callsync({
                        type: "POST",
                        url: sys.apiUrl("Subscriptions", "Insert_Subscriptions"),
                        data: JSON.stringify(SubsMasterDetails),
                        success: (d) => {
                            let result = d as BaseResponse;
                            if (result.IsSuccess) {
                                debugger
                                let res = result.Response
                                //alert('تم الحفظ بنجاح');   

                                DisplayMassage("تم فك الحظر", "Success", MessageType.Succeed);

                                btnShow_onclick();

                                $("#rowData").removeClass("display_none");

                                btnRenewal.disabled = false;
                                btnUpdate.disabled = false;
                                btnfreeze.disabled = false;
                                btnview_invitation.disabled = false;
                                chkActive.disabled = true;

                                AddNew = true;

                            }
                            else {

                                IsSuccess = false;

                                DisplayMassage("خطأء", "Success", MessageType.Error);


                            }
                        }
                    });

                }






            }

        }

    }

    function btnRenewal_onclick() {

        AddNew = false;

        Renewal = true;

        $("#rowData :input").attr("disabled", "true");

        btnfreeze.classList.add("display_none");
        btnRenewal.classList.add("display_none");
        btnUpdate.classList.add("display_none");
        btnSave.classList.remove("display_none");
        btnBack.classList.remove("display_none");

        $("#DivShow").removeClass("disabledDiv");
        $("#DivHederMaster").addClass("disabledDiv");

        $(".btn-group").addClass("display_none");

        $(".fontitm3").removeClass("display_none");
        $("#btnAddDetails").removeClass("display_none");
        $("#txtDate").removeAttr("disabled");
        $("#txtRemarks").removeAttr("disabled");

        $("#i_file").removeAttr("disabled");
        $("#btnSave").removeAttr("disabled");
        $("#btnBack").removeAttr("disabled");



        DocumentActions.FillCombowithdefult(DetailsType_Sous, txtType_Sub, "ID_Souscription", "Type_Sub", "اختر نوع الاشتراك");


        $("#txtType_Sub").removeAttr("disabled");
        $('#txtStatas').val('0');
        $("#txtprice_Sub").val(0);
        $("#txtDiscount").val(0);
        $("#txtPrice_After_Discount").val(0);
        $("#txtinvitation").val(0);
        $("#Num_Day").val(0);

        txtType_Sub.selectedIndex = 0;

        for (var i = 0; i < CountGrid + 1; i++) {
            $("#txt_Date" + i).removeAttr("disabled");
            $("#txtLongueur_Detais" + i).removeAttr("disabled");
            $("#txtle_Poids_Detais" + i).removeAttr("disabled");

        }

        $('#txtStart_Date').val(GetDate());
        $('#txtEnd_Date').val(GetDate());
        $('#txtEnd_Date').removeAttr("disabled");
        $('#txtStart_Date').removeAttr("disabled");


        $('#btnview_invitation').attr('disabled', 'disabled');


    }
    function btnAdd_onclick() {

        AddNew = true;

        Renewal = false;


        DocumentActions.FillCombowithdefult(DetailsType_Sous, txtType_Sub, "ID_Souscription", "Type_Sub", "اختر نوع الاشتراك");


        $("#rowData").removeClass("display_none");
        $("#divTotalSatistics").removeClass("display_none");

        btnfreeze.classList.add("display_none");
        btnRenewal.classList.add("display_none");
        btnUpdate.classList.add("display_none");
        btnSave.classList.remove("display_none");
        btnBack.classList.remove("display_none");

        $("#DivShow").removeClass("disabledDiv");
        $("#DivHederMaster").addClass("disabledDiv");
        $(".fontitm3").removeClass("display_none");
        $("#btnAddDetails").removeClass("display_none");
        $("#txtDate").removeAttr("disabled");
        $("#txtRemarks").removeAttr("disabled");
        $("#rowData :input").removeAttr("disabled");

        clear();

        CountGrid = 0;
        $("#div_Data").html("");

        AddNewRow();

        $('#txtStatas').val('0');
        $('#txtnewwide').val('0');

        chkActive.checked = false;

        $('#chkActive').attr('disabled', 'disabled');

        $('#txtinvitation').attr('disabled', 'disabled');
        $('#txtprice_Sub').attr('disabled', 'disabled');
        $('#txtDiscount').attr('disabled', 'disabled');
        $('#txtPrice_After_Discount').attr('disabled', 'disabled');

        $('#txtItemCount').attr('disabled', 'disabled');
        $('#txtTotal').attr('disabled', 'disabled');
        $('#txtCreatedBy').attr('disabled', 'disabled');
        $('#txtCreatedAt').attr('disabled', 'disabled');
        $('#txtUpdatedBy').attr('disabled', 'disabled');
        $('#txtUpdatedAt').attr('disabled', 'disabled');


        //$('#txtStart_Date').attr('disabled', 'disabled');
        //$('#txtEnd_Date').attr('disabled', 'disabled');

        $('#txtEnd_Date').removeAttr("disabled");
        $('#txtStart_Date').removeAttr("disabled");

        $('#Num_Day').attr('disabled', 'disabled');

        $('#btnview_invitation').attr('disabled', 'disabled');
        let code = '000000';
        viewimage(code);

    }
    function Update_onclick() {

        AddNew = false;

        Renewal = false;


        btnfreeze.classList.add("display_none");
        btnRenewal.classList.add("display_none");
        btnUpdate.classList.add("display_none");
        btnSave.classList.remove("display_none");
        btnBack.classList.remove("display_none");

        $("#DivShow").removeClass("disabledDiv");
        $("#DivHederMaster").addClass("disabledDiv");

        $(".btn-group").addClass("display_none");

        $(".fontitm3").removeClass("display_none");
        $("#btnAddDetails").removeClass("display_none");
        $("#txtDate").removeAttr("disabled");
        $("#txtRemarks").removeAttr("disabled");


        $("#rowData :input").removeAttr("disabled");

        for (var i = 0; i < CountGrid + 1; i++) {
            $("#txtMuscles_P_C" + i).attr('disabled', 'disabled');
            $("#txtFats_P_C" + i).attr('disabled', 'disabled');
            $("#txtRemarks_Detais" + i).attr('disabled', 'disabled');
            $("#txtperfect_weight" + i).attr('disabled', 'disabled');
        }

        $('#txtItemCount').attr('disabled', 'disabled');
        $('#txtTotal').attr('disabled', 'disabled');
        $('#txtCreatedBy').attr('disabled', 'disabled');
        $('#txtCreatedAt').attr('disabled', 'disabled');
        $('#txtUpdatedBy').attr('disabled', 'disabled');
        $('#txtUpdatedAt').attr('disabled', 'disabled');

        $('#txtStatas').attr('disabled', 'disabled');
        $('#txtinvitation').attr('disabled', 'disabled');
        $('#txtType_Sub').attr('disabled', 'disabled');
        $('#txtprice_Sub').attr('disabled', 'disabled');
        $('#txtDiscount').attr('disabled', 'disabled');
        $('#txtPrice_After_Discount').attr('disabled', 'disabled');

        $('#txtStart_Date').attr('disabled', 'disabled');
        $('#txtEnd_Date').attr('disabled', 'disabled');
        $('#Num_Day').attr('disabled', 'disabled');
        $('#txtNumber').attr('disabled', 'disabled');

        $('#btnview_invitation').attr('disabled', 'disabled');



    }
    function btnBack_onclick() {
        if (AddNew == true) {

            DocumentActions.FillCombowithdefult(DetailsType_Souscription, txtType_Sub, "ID_Souscription", "Type_Sub", "اختر نوع الاشتراك");

            $("#DivHederMaster").removeClass("disabledDiv");

            $("#btnAddDetails").addClass("display_none");
            btnfreeze.classList.remove("display_none");
            btnRenewal.classList.remove("display_none");
            btnUpdate.classList.remove("display_none");
            btnSave.classList.add("display_none");
            btnBack.classList.add("display_none");
            $("#div_Data").html('');
            CountGrid = 0;
            CountItems = 0;
            clear();
            $("#rowData").addClass("display_none");
            $("#divTotalSatistics").addClass("display_none");
            $("#rowData :input").attr("disabled", "true");
            $("#btnfreeze").removeAttr("disabled");
            $("#btnRenewal").removeAttr("disabled");
            $("#btnUpdate").removeAttr("disabled");
            $(".dropdown-toggle").removeAttr("disabled");
            $(".primary-btn-cl").removeAttr("disabled");
            AddNew = true;

            $(".btn-group").removeClass("display_none");

        }
        else {

            DocumentActions.FillCombowithdefult(DetailsType_Souscription, txtType_Sub, "ID_Souscription", "Type_Sub", "اختر نوع الاشتراك");


            $("#DivHederMaster").removeClass("disabledDiv");

            $("#btnAddDetails").addClass("display_none");
            btnfreeze.classList.remove("display_none");
            btnRenewal.classList.remove("display_none");
            btnUpdate.classList.remove("display_none");
            btnSave.classList.add("display_none");
            btnBack.classList.add("display_none");
            $(".btn-group").removeClass("display_none");

            $("#div_Data").html('');
            CountGrid = 0;
            for (var i = 0; i < AllGetStokMasterDetail.length; i++) {
                BuildControls(i);
                Disbly_BuildControls(i, AllGetStokMasterDetail);
                CountGrid += 1;
            }

            DocumentActions.RenderFromModel(Selected_Data[0]);


            $('#txtStatas').val(Selected_Data[0].Type_Customer.toString());



            var NumDay = GetNumDay(Selected_Data[0].Start_Date, Selected_Data[0].End_Date);

            $('#Num_Day').val(NumDay);

            let code = Selected_Data[0].image.toString();
            viewimage(code);
            $("#output").attr('data-cod', code);
                                                               
            chkActive.checked = Selected_Data[0].Type == '1' ? true : false;

            if (Selected_Data[0].Statas == true) {

                let date = GetDate();
                let Days = GetNumDay(date, Selected_Data[0].End_Date_freeze);

                if (Days > 0) {
                    btnRenewal.disabled = true;
                }
                else {
                    btnRenewal.disabled = false;

                }

            }

        }
        ComputeTotals();

        $("#rowData :input").attr("disabled", "true");
        $("#btnfreeze").removeAttr("disabled");
        $("#btnRenewal").removeAttr("disabled");
        $("#btnview_invitation").removeAttr("disabled");
        $("#btnUpdate").removeAttr("disabled");
        $(".dropdown-toggle").removeAttr("disabled");
        $(".primary-btn-cl").removeAttr("disabled");

       

    }
    function btnSave_onclick() {
        debugger
        if (!Validation_Heder())
            return


        var CanAdd: boolean = true;
        if (CountGrid > -1) {

            for (var i = 0; i <= CountGrid -1 ; i++) {
                CanAdd = Validation_Grid(i);
                if (CanAdd == false) {
                    break;
                }
            }
        }
        if (CanAdd) {//add
            Assign();
            Update();
            IsSuccess = false;

        }

    }

    function view_invitation() {

        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.Subscriptions, "btnview_invitation", "ID_Cust = " + Number($('#txtNumber').val()), () => {
            let ID_Supplier = SearchGrid.SearchDataGrid.SelectedKey;

        });

    }


    function txtType_Sub_onchange() {

        if (txtType_Sub.value != 'null') {
            let Type_Sub: Array<I_Type_Souscription> = new Array<I_Type_Souscription>();
            Type_Sub = DetailsType_Souscription.filter(x => x.ID_Souscription == Number(txtType_Sub.value));

            $('#txtinvitation').val(Type_Sub[0].invitation);
            $('#txtprice_Sub').val(Type_Sub[0].price_Sub);
            $('#txtDiscount').val(Type_Sub[0].Discount);
            $('#txtPrice_After_Discount').val(Type_Sub[0].Price_After_Discount);
            $('#txtStart_Date').val(GetDate());


            Ajax.Callsync({
                type: "Get",
                url: sys.apiUrl("Subscriptions", "GetEnd_Date_Souscription"),
                data: { ID_Souscription: Number(txtType_Sub.value) },
                success: (d) => {
                    let result = d as BaseResponse;
                    if (result.IsSuccess) {
                        let Date = result.Response as string;

                        var End_Date: string = DateFormat(Date);
                        $('#txtEnd_Date').val(End_Date);
                    }
                }
            });

            let Days = GetNumDay($('#txtStart_Date').val(), $('#txtEnd_Date').val());
            $('#Num_Day').val(Days);
        }
        else {

            $('#txtprice_Sub').val('');
            $('#txtDiscount').val('');
            $('#txtPrice_After_Discount').val('');
            $('#txtStart_Date').val(GetDate());
            $('#txtEnd_Date').val(GetDate());
            $('#Num_Day').val('0');
        }

    }

    function txtEnd_Date_onchange() {
  
        setTimeout(function () {
            let Days = GetNumDay($('#txtStart_Date').val(), $('#txtEnd_Date').val());
            $('#Num_Day').val(Days);
        }, 600);
       
    }

    function clear() {
        $('#txtNumber').val('');
        $('#txtage').val('');
        $('#txtName_Customer').val('');
        $('#txtPhone_Customer').val('');
        $('#txtCarte_Dentite').val('');
        $('#txtType_Sub').val('null');
        $('#txtprice_Sub').val('');
        $('#txtDiscount').val('');
        $('#txtAdresse').val('');
        $('#txtRemarks').val('');
        $('#txtPrice_After_Discount').val('');
        $('#txtStart_Date').val(GetDate());
        $('#txtEnd_Date').val(GetDate());
        $('#Num_Day').val('0');

    }
    function remove_disabled_Grid_Controls() {

        $("#txtDate").removeAttr("disabled");
        $("#txtPaid_Up").removeAttr("disabled");
        //$("#txtTo_be_Paid").removeAttr("disabled");
        $("#txtRemarks").removeAttr("disabled");


        for (var i = 0; i < CountGrid + 1; i++) {
            $("#ddlfamilly_Cat" + i).removeAttr("disabled");
            $("#Family" + i).removeAttr("disabled");
            $("#Items" + i).removeAttr("disabled");
            $("#txtQuantity" + i).removeAttr("disabled");
            $("#txtPrice" + i).removeAttr("disabled");
            $("#Sales_Price" + i).removeAttr("disabled");
            $("#MinUnitPrice" + i).removeAttr("disabled");
            $("#txt_StatusFlag" + i).val("");

            //$("#txtTotal" + i).removeAttr("disabled");

        }
    }
    function disabled_Grid_Controls() {

        btnSupplierSearch.disabled = true;

        $("#txtDate").attr("disabled", "disabled");
        $("#txtPaid_Up").attr("disabled", "disabled");
        $("#txtTo_be_Paid").attr("disabled", "disabled");
        $("#txtRemarks").attr("disabled", "disabled");

        for (var i = 0; i < CountGrid + 1; i++) {

            $("#ddlfamilly_Cat" + i).attr("disabled", "disabled");
            $("#Family" + i).attr("disabled", "disabled");
            $("#Items" + i).attr("disabled", "disabled");
            $("#txtQuantity" + i).attr("disabled", "disabled");
            $("#txtQuantityRetrun" + i).attr("disabled", "disabled");
            $("#txtPrice" + i).attr("disabled", "disabled");
            $("#Sales_Price" + i).attr("disabled", "disabled");
            $("#txtMinPrice" + i).attr("disabled", "disabled");
            $("#txt_StatusFlag" + i).val("");

            //$("#txtScrapQty" + i).attr("disabled", "disabled");
        }
    }
    function ComputeTotals() {

        //var CountTotal = 0;
        //var ItemCount = 0;

        //for (let i = 0; i < CountGrid + 1; i++) {
        //    var flagvalue = $("#txt_StatusFlag" + i).val();
        //    if (flagvalue != "d") {

        //        CountTotal += Number($("#txtTotal" + i).val());
        //        CountTotal = Number(CountTotal.toFixed(2).toString());
        //        ItemCount += 1;
        //    }
        //}

        //$("#txtItemCount").val(ItemCount);
        //$("#txtTotal").val(CountTotal);

        //var To_be_Paid = Number(CountTotal - Number($("#txtPaid_Up").val() == null ? 0 : $("#txtPaid_Up").val()));

        //$("#txtTo_be_Paid").val(To_be_Paid)


    }


    function printreport(type: number) {
        debugger;
        let _StockList: Array<Settings_Report> = new Array<Settings_Report>();
        let _Stock: Settings_Report = new Settings_Report();
        _Stock.Type_Print = type;
        _Stock.ID_Button_Print = 'Purchases';
        _Stock.Parameter_1 = $('#txtNumber').val();
        //_Stock.Parameter_2 = "";
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

        debugger
        Ajax.Callsync({
            url: Url.Action("Data_Report_Open", "GeneralReports"),
            data: rp,
            success: (d) => {
                debugger
                let result = d.result as string;


                window.open(result, "_blank");
            }
        })








    }

    function UploadImage_onchange() {

        var reader = new FileReader();

        reader.readAsDataURL(UploadImage.files[0]);
        reader.onload = (_event) => {
            $("#output").attr("src", reader.result.toString());
            $("#output").attr('data-cod', '');

        }
        NewUploadedImageName = UploadImage.files[0].name;
    }
    function FileUpload(code: string) {

        //DeleteDirectory();

        //alert(code);
        if (UploadImg) {
            let file = UploadImage.files[0];
            var formData = new FormData();
            if (file != null) {
                formData.append('Comp', file);
                var CustCODE = code;
                var link = '/ClientApp/Partial/UploadFile.ashx?MainFolder=' + CustCODE;
                $.ajax({
                    url: link,
                    type: "POST",
                    contentType: false,
                    processData: false,
                    data: formData,
                    success: function (data) {

                    },
                    error: function (err) {
                        alert(err.statusText);
                    }
                });
            }
        }
    }
    function viewimage(CustCode: string) {

        var src: string;
        let arrList = [];

        Ajax.CallAsync({
            type: "GET",
            url: sys.apiUrl("SystemTools", "paths"),
            data: { CustCode: CustCode },
            dataType: 'json',

            success: function (Path) {

                arrList = null;
                arrList = JSON.parse(Path);
                src = arrList[arrList.length - 1].IncodeImg;
                $("#output").attr("name", arrList[arrList.length - 1].Name);

                $("#creatimg").html("<img data-cod='" + CustCode + "' style='width: 166px;height: 265px;margin-top:0px;margin-right: 12%;' id='output' src='" + src + "' name='" + arrList[arrList.length - 1].Name + "' />");

            },
            error: function (err) {
                alert(err.statusText);
            }
        });

    }

    function Equations(row: number) {



        var wazn = Number($('#txtle_Poids_Detais' + row).val());
        var tolM = (Number($('#txtLongueur_Detais' + row).val()) / 100);
        var tolC = (Number($('#txtLongueur_Detais' + row).val()));
        var age = (Number($('#txtage').val()));
        $('#txtMuscles_P_C' + row).val((wazn / (tolM * tolM)).toFixed(2));
        if (Number($('#txtMuscles_P_C' + row).val()) < 15) {
            $('#txtRemarks_Detais' + row).val("نقص حاد جداً")
        } else if (Number($('#txtMuscles_P_C' + row).val()) > 15 && Number($('#txtMuscles_P_C' + row).val()) <= 16) {
            $('#txtRemarks_Detais' + row).val("نقص حاد ")
        } else if (Number($('#txtMuscles_P_C' + row).val()) > 16 && Number($('#txtMuscles_P_C' + row).val()) <= 18.5) {
            $('#txtRemarks_Detais' + row).val("نقص فى الوزن ")
        } else if (Number($('#txtMuscles_P_C' + row).val()) > 18.5 && Number($('#txtMuscles_P_C' + row).val()) <= 25) {
            $('#txtRemarks_Detais' + row).val("وزن طبيعي ")
        } else if (Number($('#txtMuscles_P_C' + row).val()) > 25 && Number($('#txtMuscles_P_C' + row).val()) <= 30) {
            $('#txtRemarks_Detais' + row).val("زياده فى الوزن")
        } else if (Number($('#txtMuscles_P_C' + row).val()) > 30 && Number($('#txtMuscles_P_C' + row).val()) <= 35) {
            $('#txtRemarks_Detais' + row).val("سمنة من الدرجة الاولى")
        } else if (Number($('#txtMuscles_P_C' + row).val()) > 35 && Number($('#txtMuscles_P_C' + row).val()) <= 40) {
            $('#txtRemarks_Detais' + row).val("سمنة من الدرجة الثانية")
        } else {
            $('#txtRemarks_Detais' + row).val("سمنة من الدرجة الثالثة")
        }


        $('#txtFats_P_C' + row).val((10 * wazn) + (6.25 * tolC) - (5 * age));



        $('#txtperfect_weight' + row).val(((tolM * tolM) * 22.4).toFixed(2));

        debugger;

        Newwide(row);

    }
    function Newwide(row: number) {

        debugger
        let newr: number = 0;

        if (row == 0) {

            $('#minus').removeClass('display_none');
            $('#Plus').addClass('display_none');

            newr = (0);
            $('#txtnewwide').val(newr);
            $('#txtnewwide').addClass('glyphicon glyphicon-arrow-down');
            document.getElementById("txtnewwide").style.backgroundColor = "red";
            document.getElementById("txtnewwide").style.fontWeight = "bold";
            document.getElementById("txtnewwide").style.color = "white";

        }
        else {



            if (Number($('#txtle_Poids_Detais' + row).val()) > Number($('#txtle_Poids_Detais' + (row - 1)).val())) {
                $('#Plus').removeClass('display_none');
                $('#minus').addClass('display_none');
                newr = (Number($('#txtle_Poids_Detais' + row).val())) - (Number($('#txtle_Poids_Detais' + (row - 1)).val()));
                $('#txtnewwide').val(newr);
                $('#txtnewwide').addClass('glyphicon glyphicon-arrow-up');
                document.getElementById("txtnewwide").style.backgroundColor = "#0dff0d";
                document.getElementById("txtnewwide").style.color = "black";
                document.getElementById("txtnewwide").style.fontWeight = "bold";

            } else {
                $('#minus').removeClass('display_none');
                $('#Plus').addClass('display_none');

                newr = (Number($('#txtle_Poids_Detais' + (row - 1)).val())) - (Number($('#txtle_Poids_Detais' + row).val()));
                $('#txtnewwide').val(newr);
                $('#txtnewwide').addClass('glyphicon glyphicon-arrow-down');
                document.getElementById("txtnewwide").style.backgroundColor = "red";
                document.getElementById("txtnewwide").style.fontWeight = "bold";
                document.getElementById("txtnewwide").style.color = "white";
            }

        }


    }
    //function DeleteDirectory() {
    //    //***"G:\\BSERSIMG\/";
    //    var path = SysSession.CurrentEnvironment.RS_Control.ImgPath;
    //    path = path + "RealEstateImgs\/Comp" + SysSession.CurrentEnvironment.CompCode + "\/" + txtCode.value;
    //    Ajax.Callsync({
    //        type: "GET",
    //        url: sys.apiUrl("SystemTools", "DeleteDirectory"),
    //        data: { ImgPath: path },
    //        dataType: 'json',

    //        success: function (data) {
    //        },
    //        error: function (err) {
    //            alert(err.statusText);
    //        }
    //    });
    //}



}