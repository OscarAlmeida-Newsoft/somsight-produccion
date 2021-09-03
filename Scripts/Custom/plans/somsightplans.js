var pageNumber = 1;
var pageSize = 50;

var selectedItem = {};

var pFilterModel = {
    PlanName: '',
    CreatedBy: '',
    UpdatedBy: '',
    CreatedDateInit: '',
    CreatedDateEnd: '',
    filtered: false,
    SortBy: '',
    AllTenant: false
};

var oldModuleOrder = [];
var newModuleOrder = [];
var cache = null;

function toggleOrder() {
    if ($("#button-div").css("display") == "none") {
        cache = $("tbody").html();
        $("#modyfy-button").html('Turn off modify order <i class="glyphicon glyphicon-sort"></i>')
        $("#button-div").css("display", "block");


        $("tbody").sortable();
        $("tbody").sortable("enable");
        oldModuleOrder = [];
        $("tbody tr").each(function (index, element) {
            oldModuleOrder.push($(this).data("itemid"));
        });

        $("#Savebutton-div").css("display", "none");
        $(".botonesGestion").hide();
        

        semaphore.showSuccess(
        "The modification of the order of the modules has been enabled!",
        "From this moment you can modify the order of the modules by dragging them to the desired place.",
        function () {

        });
    }
    else {
        cancelOption();
    }
}

function saveOrder() {
    loadingDiv.show();
    debugger;

    PlanOrderList: [];
    
    newModuleOrder = [];
    $("tbody tr").each(function (index, element) {
        newModuleOrder.push(
            { Id: $(this).data("itemid"), DisplayOrder: index + 1 }
            
            );
    });

    //newModuleOrder.forEach(function (element, index) {
    //    PlanOrderList.push({
    //        OfferedModuleId: element,
    //        Order: index + 1
    //    });
    //});

    $.ajax({
        method: "POST",
        url: $("#NS_SortModuleURL").text(),
        data: JSON.stringify(newModuleOrder),
        contentType: 'application/json; charset=utf-8'
    })
    .done(function (result) {
        if (result.success != 1) {
            //Redireccionar
            alert("Error");
        } else {
            //Si fue exitoso
            $("#modyfy-button").html('Turn on modify order <i class="glyphicon glyphicon-sort"></i>')
            $("#button-div").css("display", "none");
            $("tbody").sortable("disable");
            $(".botonesGestion").show();
        }
        loadingDiv.hide();
    })
    .fail(function (err) {
        console.log(err);
        loadingDiv.hide();
    });
    $("#Savebutton-div").css("display", "block");
}

function cancelOrder() {
    //alert("Turning order to the initial order order...")
    $("tbody").html(cache).sortable("refresh");

    $("#modyfy-button").html('Turn on modify order <i class="glyphicon glyphicon-sort"></i>')
    $("#button-div").css("display", "none")
    $("tbody").sortable("disable");
    $(".botonesGestion").show();
    newModuleOrder = oldModuleOrder;
}

function cancelOption() {
    newModuleOrder = [];
    $("tbody tr").each(function (index, element) {
        newModuleOrder.push($(this).data("itemid"));
    });

    if (!checkIfOrderChange(oldModuleOrder, newModuleOrder)) {
        semaphore.showAtention(
        "If you continue your new order changes will be lose",
        "",
        function () {
            cancelOrder();
        });
    } else {
        cancelOrder();
    }
}

function checkIfOrderChange(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

$(document).ready(function () {
    GridCallback();
});


//Perform the callback to reload all data in the datagrid
function GridCallback() {
    console.log($('#GridListCallBack').text());
    loadingDiv.show();
    $.ajax({
        url: $('#GridListCallBack').text() + "?pPage=" + pageNumber + "&pPageSize=" + pageSize,
        data: JSON.stringify(pFilterModel),
        type: 'POST',
        contentType: 'application/json; charset=utf-8'
    })
    .done(function (data) {
        $('#grid-div').html(data);
    })
    .fail(function (jqXHR, exception) {
        $('#vermasdiv').text(TextError(jqXHR, exception));
        $('#FailModal').modal({ backdrop: "static" }, { keyboard: false });
    })
    .always(function () {
        loadingDiv.hide();
    });
}

$(document).on('click', '#refreshTable', function (e) {
    GridCallback();
    return false;
});

//Add new record
$(document).on('click', '#add', function () {
    loadingDiv.show();
    $.ajax({
        url: $(this).attr('href'),
        type: 'GET'
    })
    .done(function (data) {
        $('#Create').html(data);
        $('#createModal').modal({ backdrop: "static" }, { keyboard: false });
        $.validator.unobtrusive.parse('#FormCreateEdit');
    })
    .fail(function (jqXHR, exception) {


        $('#vermasdiv').text(TextError(jqXHR, exception));
        $('#FailModal').modal({ backdrop: "static" }, { keyboard: false });
    })
    .always(function () {
        loadingDiv.hide();
    });
    return false;
});

function On_Begin() {
    loadingDiv.show();
}

function OnSuccess() {
    debugger;
    selectedItem = {};
    loadingDiv.hide();
    GridCallback();
}

//Pagination
//$(document).on('click', '.NS-paginator li', function () {
//    var clickedPage = $(this).data('page');
//    if (clickedPage !== undefined) {
//        pageNumber = clickedPage

//        GridCallback();
//    }
//});

$(document).on('change', '.items-per-page-select', function () {
    pageSize = $(this).val();
    pageNumber = 1;
    GridCallback();

});

$(document).on('click', '.table-item', function () {
    selectedItem = {};
    if ($(this).hasClass('item-selected')) {
        $(this).find('.check-item').prop('checked', false);
        $(this).removeClass('item-selected');

    } else {

        $(this).parent().find('.check-item').prop('checked', false);
        $(this).parent().find('tr').removeClass('item-selected');

        $(this).find('.check-item').prop('checked', true);
        $(this).addClass('item-selected');
        selectedItem.id = $(this).data('itemid');
    }

});

//edit record
$(document).on('click', '#editRecord', function (e) {
    if (selectedItem.id === undefined) {
        toastMessage.show('Please select a record', 'alert-warning')
        //alert('Please select a record');
        return false;
    }

    //loadingDiv.show();
    $.ajax({
        url: $(this).attr('href') + '?pId=' + selectedItem.id,
        type: 'GET'
    })
    .done(function (data) {
        $('#Edit').html(data);
        $('#editModal').modal({ backdrop: "static" }, { keyboard: false });
        $.validator.unobtrusive.parse('#FormEdit');
    })
     .fail(function (jqXHR, exception) {


         $('#vermasdiv').text(TextError(jqXHR, exception));
         $('#FailModal').modal({ backdrop: "static" }, { keyboard: false });
     })
    .always(function () {
        //loadingDiv.hide();
    });
    return false;
});

$(document).on('click', '#filterTable', function () {
    loadingDiv.show();
    $.ajax({
        url: $(this).attr('href'),
        type: 'POST',
        data: JSON.stringify(pFilterModel),
        contentType: 'application/json; charset=utf-8'
    })
    .done(function (data) {
        $('#Filter').html(data);
        $('#filterModal').modal({ backdrop: "static" }, { keyboard: false });
    })
     .fail(function (jqXHR, exception) {
         $('#vermasdiv').text(TextError(jqXHR, exception));
         $('#FailModal').modal({ backdrop: "static" }, { keyboard: false });
     })
    .always(function () {
        loadingDiv.hide();
    });
    return false;
});

$(document).on('click', '#btnFilter', function () {
    pFilterModel.PlanName = $('#filterName').val();
    pFilterModel.AllTenant = (typeof ($("#filterAllTenant:checked")[0]) != "undefined") ? true : false;
    pFilterModel.filtered = true;

    pageNumber = 1;

    GridCallback();
});

$(document).on('click', '#btnClearFilter', function () {
    pFilterModel = {};
    pFilterModel.filtered = false;
    pageNumber = 1;

    GridCallback();
});


function TextError(jq, exc) {
    var msg = '';
    if (jq.status === 0) {
        msg = 'Not connect.\n Verify Network.';
    } else if (jq.status == 404) {
        msg = 'Requested page not found. [404]';
    } else if (jq.status == 500) {
        msg = 'Internal Server Error [500].';
    } else if (exc === 'parsererror') {
        msg = 'Requested JSON parse failed.';
    } else if (exc === 'timeout') {
        msg = 'Time out error.';
    } else if (exc === 'abort') {
        msg = 'Ajax request aborted.';
    } else {
        msg = 'Uncaught Error.\n';
    }



    msg = msg + jq.responseText;

    return msg;
}


$(document).on('click', '#pricesByRange', function () {
    debugger;
    if (selectedItem.id === undefined) {
        toastMessage.show('Please select a record', 'alert-warning')
        //alert('Please select a record');
        return false;
    }

    LoadPricesByRangeGrid($(this).attr('href'));
    return false;
});

function LoadPricesByRangeGrid(url) {
    loadingDiv.show();
    $.ajax({
        url: url + "?pPlanId=" + selectedItem.id,
        type: 'GET'
    })
    .done(function (data) {
        debugger;
        $('#Prices').html(data);
        $('#PricesModal').modal({ backdrop: "static" }, { keyboard: false });
        //setTimeout(function () {
        //    tableBasic.columns.adjust();
        //}, 300);
    })
    .fail(function (jqXHR, exception) {
        $('#vermasdiv').text(TextError(jqXHR, exception));
        $('#FailModal').modal({ backdrop: "static" }, { keyboard: false });
    })
    .always(function () {
        loadingDiv.hide();
    });


}

$(document).on('click', '#btnSave', function () {
    //Validaciones
    var valido = true;
    prices = [];

    $("#gridTableBasic tbody tr").each(function (index, element) {
        var idRange = $(this).data("itemid");
        var valueMontly = $("#ValueMontly" + idRange).val();
        var valueAnualy = $("#ValueAnual" + idRange).val();
        debugger;
        
        if (valido && (valueMontly == "" || valueAnualy == "")) {
            valido = false;
            toastMessage.show('Please complete all prices', 'alert-warning')
        }

        if (valido && (!IsNumeric(valueMontly) || !IsNumeric(valueAnualy))) {
            valido = false;
            toastMessage.show('All prices must be numbers', 'alert-warning')
        }

        if (valido && (parseFloat(valueMontly) <= 0 || parseFloat(valueAnualy) <= 0)) {
            valido = false;
            toastMessage.show('All prices must be greater than zero', 'alert-warning')
        }

        if (valido) {
            item = {};
            item.SOMSightPlanId = $(this).data("itemplanid");
            item.RangeId = idRange;
            item.ValueMontly = valueMontly;
            item.ValueAnual = valueAnualy;

            prices.push(item);
        }        
        
    });


    if (valido) {
        //Hace llamado a funcion del backend
        loadingDiv.show();

        $.ajax({
            url: ($("#UrlSavePrices").val()),
            type: 'POST',
            data: JSON.stringify(prices),
            contentType: 'application/json; charset=utf-8'
        })
        .done(function (data) {
            $('#Prices').html(data);
            $('#PricesModal').modal({ backdrop: "static" }, { keyboard: false });
        })
         .fail(function (jqXHR, exception) {
             $('#vermasdiv').text(TextError(jqXHR, exception));
             $('#FailModal').modal({ backdrop: "static" }, { keyboard: false });
         })
        .always(function () {
            loadingDiv.hide();
        });

    }
});

function IsNumeric(input){
    var RE = /^(\d*\.)?\d+$/;
    var resp = RE.test(input)
    return resp;
}