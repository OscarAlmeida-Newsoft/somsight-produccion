var moduleID = 0;
var oldModuleOrder = [];
var newModuleOrder = [];
var cache = null;

$(document).ready(function () {
    $(".useAsTemplate").click(function () {

        //Se le quita el display: none al anterior
        if (moduleID != 0) {
            $("#useAsTemplate select option[value=" + moduleID + "]").css("display", "block")
        }

        moduleID = $(this).data("moduleid");

        //Se le agrega el display: none al nuevo
        $("#useAsTemplate select option[value=" + moduleID + "]").css("display", "none")


        $('#useAsTemplate').modal('show');
    });


    $(".EditVariableButton").click(function (ev) {
        var button = $(this);
        loadingDiv.show();

        //$('#addVariableModal').val('');
        //$('#addVariableModal').modal('show');EditVariableButton

        $.ajax({
            url: ("EditVariable"),
            type: 'GET',
            data: { pModuleID: button.data("moduleid") }
        })
            .done(function (data) {
                $('#variable-list').html(data);
                loadingDiv.hide();
                return false;
            })
            .fail(function (err) {
                console.log(err);
                loadingDiv.hide();
            });

    });
});

function copyConfiguration() {
    loadingDiv.show();

    if ($("#useAsTemplate select option:selected").val() == "") {
        //alert("You have to select the target module");

        loadingDiv.hide();
        semaphore.showError(
        "There was an error!",
        "You have to select the target module"
        );
        return;
    }

    //moduleID
    var sourceModuleId = moduleID;
    var targetModuleId = $("#useAsTemplate select option:selected").val();

    $.ajax({
        method: "POST",
        url: $("#NS_UseAsTemplateURL").text(),
        data: {
            pSourceModuleId: sourceModuleId,
            pTargetModuleId: targetModuleId
        }
    })
    .done(function (result) {
        if (result.success != 1) {
            //Redireccionar
            alert("Error");
            return;
        }

        $('#useAsTemplate').modal('hide');
        loadingDiv.hide();
        semaphore.showSuccess(
            "Success!",
            "The configuration was successfully copied"
        );
    })
    .fail(function (err) {
        console.log(err);
        loadingDiv.hide();
    });
}



function toggleOrder() {
    if ($("#button-div").css("display") == "none") {
        cache = $("tbody").html();
        $("#modyfy-button").html('Turn off modify order <i class="glyphicon glyphicon-sort"></i>')
        $("#button-div").css("display", "block")


        $("tbody").sortable();
        $("tbody").sortable("enable");
        oldModuleOrder = [];
        $("tbody tr").each(function (index, element) {
            oldModuleOrder.push($(this).data("moduleid"));
        });

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
            ModuleId: element,
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
            $("#button-div").css("display", "none")
            $("tbody").sortable("disable");
        }
        loadingDiv.hide();
    })
    .fail(function (err) {
        console.log(err);
        loadingDiv.hide();
    });
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
