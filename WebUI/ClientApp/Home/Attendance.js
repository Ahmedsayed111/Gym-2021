$(document).ready(function () {
    ////debugger;
    Attendance.InitalizeComponent();
});
var Attendance;
(function (Attendance) {
    //Arrays     
    var SysSession = GetSystemSession();
    var sys = new SystemTools();
    var Get_I_Attendance = new Array();
    var SearchDetails = new Array();
    var Model = new invitation();
    var divMasterGrid = new JsGrid();
    var searchbutmemreport;
    var Enter_Cust;
    var btnview_invitation;
    var btn_Ok_invit;
    var ID_Cust_inv_view = 0;
    function InitalizeComponent() {
        var Att = $('#Vld_Attendance').val();
        if (Att == '1') {
            InitalizeControls();
            IntializeEvents();
            InitializeGrid();
            Display();
            setTime();
            Enter_Cust.focus();
            Foucs();
        }
    }
    Attendance.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        debugger;
        searchbutmemreport = document.getElementById("searchbutmemreport");
        Enter_Cust = document.getElementById("Enter_Cust");
        btnview_invitation = document.getElementById("btnview_invitation");
        btn_Ok_invit = document.getElementById("btn_Ok_invit");
    }
    function IntializeEvents() {
        //txtNumDays_freeze.value.trim() == '';
        Enter_Cust.onchange = Enter_Cust_onchange;
        searchbutmemreport.onkeyup = _SearchBox_Change;
        searchbutmemreport.onclick = _SearchBox_Focs;
        btnview_invitation.onclick = view_invitation;
        btn_Ok_invit.onclick = btn_Ok_invit_onclick;
    }
    function Display() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("I_Attendance", "Timer_Out_Cust"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Get_I_Attendance = result.Response;
                    var num = Get_I_Attendance.length;
                    for (var i = 0; i < Get_I_Attendance.length; i++) {
                        Get_I_Attendance[i].Num = (num);
                        num -= 1;
                    }
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
        divMasterGrid.PrimaryKey = "ID_Cust";
        divMasterGrid.Columns = [
            { title: "ID", name: "ID", type: "text", width: "2%", visible: false },
            { title: "التسلسل", name: "Num", type: "text", width: "3%" },
            { title: "رقم العميل", name: "ID_Cust", type: "text", width: "8%" },
            { title: "اسم العميل", name: "Name_Customer", type: "text", width: "30%" },
            { title: "التاريخ", name: "Tr_Date", type: "text", width: "10%" },
            { title: "وقت الدخول", name: "Time_in", type: "text", width: "10%" },
            { title: "عدد ايام الحضور", name: "Num_Day_Attendance", type: "text", width: "11%" },
            {
                title: "الدعوه",
                width: "5%",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = "دعوه";
                    txt.disabled = false;
                    txt.id = "but" + item.ID_Cust;
                    txt.disabled = false;
                    txt.className = "dis src-btn btn btn-warning";
                    txt.setAttribute('Name_Cust', item.Name_Customer);
                    txt.onclick = function (e) {
                        Open_invitation(item.ID_Cust);
                    };
                    return txt;
                }
            },
        ];
    }
    function Open_invitation(ID_Cust_inv) {
        ID_Cust_inv_view = ID_Cust_inv;
        var Name_Cust = $("#but" + ID_Cust_inv + "").attr('Name_Cust');
        $("#id_Labol_Cust").html(Name_Cust);
        Get_Num_inv();
        $("#txtName_invit").val('');
        $("#txtPhone_invit").val('');
        $("#txtAge_invit").val('');
        $("#txtCarte_Dentite_invit").val('');
        $("#txtRemarks_invit").val('');
        if (Number($("#txtNum_inv").val()) > 0) {
            $("#div_control_invit").removeClass('display_none');
            $("#btn_Ok_invit").removeClass('display_none');
            $("#txtName_invit").removeAttr("disabled");
            $("#txtPhone_invit").removeAttr("disabled");
            $("#txtAge_invit").removeAttr("disabled");
            $("#txtCarte_Dentite_invit").removeAttr("disabled");
            $("#txtRemarks_invit").removeAttr("disabled");
        }
        else {
            $("#div_control_invit").addClass('display_none');
            $("#btn_Ok_invit").addClass('display_none');
            $("#txtName_invit").attr("disabled", "disabled");
            $("#txtPhone_invit").attr("disabled", "disabled");
            $("#txtAge_invit").attr("disabled", "disabled");
            $("#txtCarte_Dentite_invit").attr("disabled", "disabled");
            $("#txtRemarks_invit").attr("disabled", "disabled");
            Enter_Cust.focus();
            Foucs();
        }
        $('#Men_popu').attr('style', 'display:block;');
        $('#Men_popu').attr('class', 'popu animated zoomIn');
        $("#PopupDialog").modal("show");
    }
    function Get_Num_inv() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Subscriptions", "Get_Num_inv"),
            data: { ID_Cust: ID_Cust_inv_view },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    var Num_inv = result.Response;
                    $("#txtNum_inv").val(Num_inv);
                }
            }
        });
    }
    function view_invitation() {
        var sys = new SystemTools();
        sys.FindKey(Modules.Subscriptions, "btnview_invitation", "ID_Cust = " + Number(ID_Cust_inv_view), function () {
            var ID_Supplier = SearchGrid.SearchDataGrid.SelectedKey;
        });
    }
    function btn_Ok_invit_onclick() {
        if ($("#txtName_invit").val().trim() == '') {
            Errorinput($("#txtName_invit"));
            MessageBox.Show('برجاء ادخال الاسم', 'خطا');
            return false;
        }
        else if ($("#txtPhone_invit").val().trim() == '') {
            Errorinput($("#txtPhone_invit"));
            MessageBox.Show('برجاء ادخال رقم التليفون', 'خطا');
            return false;
        }
        else if ($("#txtAge_invit").val().trim() == '') {
            Errorinput($("#txtAge_invit"));
            MessageBox.Show('برجاء ادخال العمر', 'خطا');
            return false;
        }
        Model = new invitation();
        var Num_unv = (Number($("#txtNum_inv").val()) - 1);
        Model.ID_Cust = ID_Cust_inv_view;
        Model.Num_inv = Num_unv;
        Model.Name = $("#txtName_invit").val();
        Model.Phone = $("#txtPhone_invit").val();
        Model.age = $("#txtAge_invit").val();
        Model.Carte_Dentite = $("#txtCarte_Dentite_invit").val();
        Model.Remarks = $("#txtRemarks_invit").val();
        console.log(Model);
        Ajax.Callsync({
            type: "Post",
            url: sys.apiUrl("Subscriptions", "update_Num_inv"),
            data: JSON.stringify(Model),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    $("#PopupDialog").modal("hide");
                    $('#Men_popu').attr('class', 'popu animated zoomOutUp');
                    Enter_Cust.focus();
                    Foucs();
                }
            }
        });
    }
    function Enter_Cust_onchange() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("I_Attendance", "GetAttendance"),
            data: { ID_Code: Number(Enter_Cust.value) },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    var Out_Result = result.Response;
                    DisplayMassage('' + Out_Result + '', '', MessageType.Succeed);
                    Display();
                    Enter_Cust.value = '';
                }
            }
        });
    }
    function setTime() {
        setTimeout(function () {
            Display();
            setTime();
        }, 70000);
    }
    function Foucs() {
        setTimeout(function () {
            //$("input#id_pirce").is(":active")
            if ($('#PopupDialog').attr('style') == 'display: block; padding-right: 17px;' || $('#PopupDialog').attr('style') == 'display: block;') {
                setTimeout(function () {
                    //Enter_Cust.focus();
                    Foucs();
                }, 10000);
            }
            else if ($("textarea#id_Dasc_Name").is(":active")) {
                setTimeout(function () {
                    Enter_Cust.focus();
                    Foucs();
                }, 10000);
            }
            else if ($("input#id_pirce").is(":active")) {
                setTimeout(function () {
                    Enter_Cust.focus();
                    Foucs();
                }, 10000);
            }
            else if ($("input#searchbutmemreport").is(":active")) {
                setTimeout(function () {
                    Enter_Cust.focus();
                    Foucs();
                }, 10000);
            }
            else {
                Enter_Cust.focus();
                Foucs();
            }
        }, 1000);
    }
    function _SearchBox_Focs() {
        //setTimeout(function () {
        //    alert('treu')
        //    Enter_Cust.focus();
        //    Foucs();
        //}, 10000);
    }
})(Attendance || (Attendance = {}));
//# sourceMappingURL=Attendance.js.map