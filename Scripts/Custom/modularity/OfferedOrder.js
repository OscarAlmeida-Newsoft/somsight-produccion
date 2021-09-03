var moduleID = 0;
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
            oldModuleOrder.push($(this).data("moduleid"));
        });

        $("#Savebutton-div").css("display", "none");

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
    
    var data = {
        ModuleOrderList: [],
        TenantId: ''
    };

    newModuleOrder = [];
    $("tbody tr").each(function (index, element) {
        newModuleOrder.push($(this).data("moduleid"));
    });

    newModuleOrder.forEach(function (element, index) {
        data.ModuleOrderList.push({
            OfferedModuleId: element,
            Order: index + 1
        });
    });

    $.ajax({
        method: "POST",
        url: $("#NS_SortModuleURL").text(),
        data: { data: data }
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
    newModuleOrder = oldModuleOrder;
}

function cancelOption() {
    newModuleOrder = [];
    $("tbody tr").each(function (index, element) {
        newModuleOrder.push($(this).data("moduleid"));
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





function On_Begin() {
    loadingDiv.show();
}

function OnSuccess() {
    selectedItem = {};
    loadingDiv.hide();
}

$(document).on('click', '#CreateOfferedModule button.btn-success', function () {
    location.reload();
});


$(document).on('click', '#addOfferedModule', function () {
    loadingDiv.show();
    $.ajax({
        url: $(this).attr('href'),
        type: 'GET'
    })
    .done(function (data) {
        $('#CreateOfferedModule').html(data);
        $('#createModal').modal({ backdrop: "static" }, { keyboard: false });


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

$(document).on('click', '.deleteOfferModule', function (e) {
    debugger;
    e.preventDefault();

    loadingDiv.show();
    $.ajax({
        url: $(this).attr('href'),
        type: 'GET'
    })
    .done(function (data) {
        $('#Remove').html(data);
        $('#removeModal').modal({ backdrop: "static" }, { keyboard: false });
        
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