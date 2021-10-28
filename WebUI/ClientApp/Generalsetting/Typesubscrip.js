$(document).ready(function () {
    //debugger;
    Typesubscrip.InitalizeComponent();
});
var Typesubscrip;
(function (Typesubscrip) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var compcode;
    var CountGrid = 0;
    var btnback;
    var btnNew_sub_Add_service;
    var btnsave;
    var btnAddDetails;
    var btnEdit;
    var MSG_ID;
    var Details = new Array();
    var Model = new I_Type_Souscription();
    var ID_familly_Cat;
    function InitalizeComponent() {
        debugger;
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            document.getElementById('Screen_name').innerHTML = "انواع الاشتراكات";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "Types Of Subsriptions";
        }
        //debugger;
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        InitalizeControls();
        InitalizeEvents();
        Display();
    }
    Typesubscrip.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //debugger;
        btnAddDetails = document.getElementById("btnAddDetails");
        btnEdit = document.getElementById("btnedite");
        btnsave = document.getElementById("btnsave");
        btnback = document.getElementById("btnback");
        // Buton privialges for single record page
    }
    function InitalizeEvents() {
        debugger;
        btnAddDetails.onclick = AddNewRow; //
        btnsave.onclick = btnsave_onClick;
        btnback.onclick = btnback_onclick;
        btnEdit.onclick = btnEdit_onclick;
    }
    function Update() {
        debugger;
        Assign();
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("I_Type_Souscription", "UpdateCustlist"),
            data: JSON.stringify(Details),
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess == true) {
                    MessageBox.Show("تم الحفظ", "الحفظ");
                    btnback_onclick();
                    refresh();
                }
                else {
                    debugger;
                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });
    }
    function refresh() {
        $('#div_Data').html("");
        CountGrid = 0;
        Display();
    }
    function Assign() {
        var StatusFlag;
        Details = new Array();
        for (var i = 0; i < CountGrid; i++) {
            Model = new I_Type_Souscription();
            StatusFlag = $("#txt_StatusFlag" + i).val();
            if (StatusFlag == "i") {
                Model.StatusFlag = StatusFlag.toString();
                Model.ID_Souscription = 0;
                Model.Type_Sub = $("#txttype" + i).val();
                Model.Num_Day = $("#txtday" + i).val();
                Model.price_Sub = $("#txtPrice" + i).val();
                Model.Discount = $("#discount" + i).val();
                Model.Price_After_Discount = $("#txtTotal" + i).val();
                Model.invitation = $("#txtinvite" + i).val();
                Model.Active = $('#txtactive' + i).prop('checked');
                Details.push(Model);
            }
            if (StatusFlag == "u") {
                Model.StatusFlag = StatusFlag.toString();
                Model.ID_Souscription = $("#txtID_Souscription" + i).val();
                Model.Type_Sub = $("#txttype" + i).val();
                Model.Num_Day = $("#txtday" + i).val();
                Model.price_Sub = $("#txtPrice" + i).val();
                Model.Discount = $("#discount" + i).val();
                Model.Price_After_Discount = $("#txtTotal" + i).val();
                Model.invitation = $("#txtinvite" + i).val();
                Model.Active = $('#txtactive' + i).prop('checked');
                Details.push(Model);
            }
            if (StatusFlag == "d") {
                if ($("#txtID_Souscription" + i).val() != "") {
                    Model.StatusFlag = StatusFlag.toString();
                    Model.ID_Souscription = $("#txtID_Souscription" + i).val();
                    Details.push(Model);
                }
            }
        }
    }
    function AddNewRow() {
        var CanAdd = true;
        if (CountGrid > 0) {
            for (var i = 0; i < CountGrid; i++) {
                CanAdd = Validation_Grid(i);
                if (CanAdd == false) {
                    break;
                }
            }
        }
        if (CanAdd) {
            BuildControls(CountGrid);
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode
            $("#code" + CountGrid).val(CountGrid + 1);
            $("#txttype" + CountGrid).removeAttr("disabled");
            $("#txtday" + CountGrid).removeAttr("disabled");
            $("#txtPrice" + CountGrid).removeAttr("disabled");
            $("#discount" + CountGrid).removeAttr("disabled");
            $("#txtactive" + CountGrid).removeAttr("disabled");
            $("#txtinvite" + CountGrid).removeAttr("disabled");
            $("#discount" + CountGrid).val("0");
            $("#btn_minus" + CountGrid).removeClass("display_none");
            $("#btn_minus" + CountGrid).removeAttr("disabled");
            $("#btnedite").removeClass("display_none");
            CountGrid++;
        }
        $("#btnedite").addClass("display_none");
    }
    function btnEdit_onclick() {
        debugger;
        $(".fontitm3").removeClass("display_none");
        $('#btnsave').toggleClass("display_none");
        $('#btnback').toggleClass("display_none");
        $("#div_ContentData :input").removeAttr("disabled");
        $("#btnedite").toggleClass("display_none");
        $(".btnAddDetails").removeAttr("disabled");
        $('#btnAddDetails').attr('class', 'glyphicon glyphicon-plus-sign');
        for (var i = 0; i < CountGrid; i++) {
            $("#code" + i).attr("disabled", "disabled");
            $("#txtTotal" + i).attr("disabled", "disabled");
        }
    }
    function btnback_onclick() {
        $('#btnAddDetails').attr('class', 'glyphicon glyphicon-plus-sign  display_none');
        $('#btnsave').toggleClass("display_none");
        $('#btnback').toggleClass("display_none");
        $("#div_ContentData :input").attr("disabled", "true");
        $(".minus_btn").addClass("display_none");
        $("#btnedite").removeClass("display_none");
        $("#btnedite").removeAttr("disabled");
        $("#btnback").removeAttr("disabled");
        $("#btnsave").removeAttr("disabled");
        CountGrid = 0;
        $("#div_Data").html("");
        Display();
    }
    function btnsave_onClick() {
        var CanAdd = true;
        if (CountGrid > 0) {
            for (var i = 0; i < CountGrid; i++) {
                CanAdd = Validation_Grid(i);
                if (CanAdd == false) {
                    break;
                }
            }
        }
        if (CanAdd) {
            Update();
        }
    }
    function BuildControls(cnt) {
        var html;
        debugger;
        html = '<div id= "No_Row' + cnt + '" class="container-fluid style_border" > <div class="" > <div class="col-lg-12" > ' +
            '<div class="col-lg-12"style="left:23px">' +
            '<div class="col-lg-12"style="width: 3%;">' +
            '<span id="btn_minus' + cnt + '" class="fa fa-minus-circle fontitm3 display_none" style="font-size: 28px;"></span></div>' +
            '<div class="col-lg-1 display_none"><input id="txtID_Souscription' + cnt + '"  type="number" disabled class="form-control right2"/></div>' +
            '<div class="col-lg-1"><input id="code' + cnt + '"  type="number" disabled class="form-control right2"/></div>' +
            '<div class="col-lg-2"><input id="txttype' + cnt + '" type="text" disabled class="form-control right2"/></div>' +
            '<div class="col-lg-1"><input id="txtday' + cnt + '"  type="number" disabled class="form-control right2"/></div>' +
            '<div class="col-lg-2"style="right: 25px;"><input id="txtPrice' + cnt + '" type="number" disabled class="form-control right2"/></div>' +
            '<div class="col-lg-1"style="right:34px;""><input id="discount' + cnt + '" type="number" disabled class="form-control right2"/></div>' +
            '<div class="col-lg-1"style="right:53px;"><input id="txtTotal' + cnt + '" type="number" disabled class="form-control right2"/></div>' +
            '<div class="col-lg-1"style="right:56px;"><input id="txtinvite' + cnt + '" type="number" disabled class="form-control right2"/></div>' +
            '<div class="col-lg-2"style="right:28px;"><input id="txtactive' + cnt + '" type="checkbox" disabled class="form-control right2"/></div>' +
            '</div></div></div>' +
            '<input id="txt_StatusFlag' + cnt + '" name = " " type = "hidden" class="form-control"/>';
        $("#div_Data").append(html);
        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });
        $("#btn_minus" + cnt).addClass("display_none");
        $("#btn_minus" + cnt).attr("disabled", "disabled");
        $("#txttype" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtday" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtPrice" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
            var fes = 100;
            $("#txtTotal" + cnt).val(((fes - $("#discount" + cnt).val()) * $("#txtPrice" + cnt).val()) / fes);
        });
        $("#discount" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
            var fes = 100;
            $("#txtTotal" + cnt).val(((fes - $("#discount" + cnt).val()) * $("#txtPrice" + cnt).val()) / fes);
        });
        $("#txtTotal" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtactive" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtinvite" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        return;
    }
    function DeleteRow(RecNo) {
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", function () {
            $("#txt_StatusFlag" + RecNo).val() == 'i' ? $("#txt_StatusFlag" + RecNo).val("m") : $("#txt_StatusFlag" + RecNo).val("d");
            $("#No_Row" + RecNo).attr("hidden", "true");
            $("#txtCode" + RecNo).val("000");
        });
    }
    function Display() {
        debugger;
        Details = new Array();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("I_Type_Souscription", "GetAll"),
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    Details = result.Response;
                    DisplayStkDefCategory();
                }
            }
        });
    }
    function DisplayStkDefCategory() {
        debugger;
        CountGrid = 0;
        for (var i = 0; i < Details.length; i++) {
            BuildControls(CountGrid);
            $("#txtID_Souscription" + i).val(Details[i].ID_Souscription);
            $("#code" + i).val(i + 1);
            $("#txttype" + i).val(Details[i].Type_Sub);
            $("#txtday" + i).val(Details[i].Num_Day);
            $("#txtPrice" + i).val(Details[i].price_Sub);
            $("#discount" + i).val(Details[i].Discount);
            $("#txtTotal" + i).val(Details[i].Price_After_Discount);
            Details[i].Active == true ? $('#txtactive' + i).prop('checked', true) : $('#txtactive' + i).prop('checked', false);
            $("#txtinvite" + i).val(Details[i].invitation);
            $("#txt_StatusFlag" + i).val("");
            CountGrid++;
        }
    }
    function Validation_Grid(rowcount) {
        if ($("#txt_StatusFlag" + rowcount).val() == "d" || $("#txt_StatusFlag" + rowcount).val() == "m") {
            return true;
        }
        else {
            if ($("#code" + rowcount).val() == "") {
                MessageBox.Show("ادخل نوع الاشتراك", "خطأ");
                Errorinput($("#code" + rowcount));
                return false;
            }
            if ($("#txttype" + rowcount).val() == "") {
                MessageBox.Show("ادخل نوع الاشتراك", "خطأ");
                Errorinput($("#txttype" + rowcount));
                return false;
            }
            if ($("#txtday" + rowcount).val() == "") {
                MessageBox.Show("ادخل عدد الايام ", "خطأ");
                Errorinput($("#txtday" + rowcount));
                return false;
            }
            if ($("#txtPrice" + rowcount).val() == "") {
                MessageBox.Show("ادخل سعر الاشتراك", "خطأ");
                Errorinput($("#txtPrice" + rowcount));
                return false;
            }
            if ($("#discount" + rowcount).val() == "") {
                MessageBox.Show("ادخل نسبة العرض", "خطأ");
                Errorinput($("#discount" + rowcount));
                return false;
            }
            if ($("#txtinvite" + rowcount).val() == "") {
                MessageBox.Show("ادخل عدد الدعوات للمشترك", "خطأ");
                Errorinput($("#txtinvite" + rowcount));
                return false;
            }
        }
        return true;
    }
})(Typesubscrip || (Typesubscrip = {}));
//# sourceMappingURL=Typesubscrip.js.map