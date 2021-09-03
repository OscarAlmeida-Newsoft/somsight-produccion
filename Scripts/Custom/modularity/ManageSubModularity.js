var currentlist = [];
var currentSearcher = null;


$(document).ready(function () {

    //$(".add-selected, .remove-selected").click(function () {

    $(".add-selected").click(function () {
        //Recoge las opciones seleccione
        var button = this;
        var subModuleId = $(button).siblings(".submodule-select").val();

        if (subModuleId == "" || subModuleId == undefined) {
            warningSelectSubmodule();
            return;
        }


        var selectedOptions = $(button).siblings("select[multiple]").val();

        if (selectedOptions != null) {
            selectedOptions.forEach(function (element, index) {
                $(button).parent().siblings("div[data-submoduleid='" + subModuleId + "']").children("select[multiple]").append($('<option>', {
                    value: element,
                    text: getTextByValue(button, element)
                }));
            });
        }
        $(button).siblings("select[multiple]").children(":selected").remove();

    });

    $(".remove-selected").click(function () {
        //Recoge las opciones seleccione
        var button = this;

        var selectedOptions = $(button).siblings("select[multiple]").val();

        if (selectedOptions != null) {
            selectedOptions.forEach(function (element, index) {
                $(button).parent().siblings(".center-div").children("select[multiple]").append($('<option>', {
                    value: element,
                    text: getTextByValue(button, element)
                }));
            });
        }
        $(button).siblings("select[multiple]").children(":selected").remove();

    });

    //$(".add-all, .remove-all").click(function () {
    $(".add-all").click(function () {
        var button = this;
        var subModuleId = $(button).siblings(".submodule-select").val();

        if (subModuleId == "" || subModuleId == undefined) {
            warningSelectSubmodule();
            return;
        }

        var selectedOptions = [];

        $(button).siblings("select[multiple]").children().each(function (index, element) {
            selectedOptions.push(element.value)
        });

        if (selectedOptions != null) {
            selectedOptions.forEach(function (element, index) {
                $(button).parent().siblings("div[data-submoduleid='" + subModuleId + "']").children("select[multiple]").append($('<option>', {
                    value: element,
                    text: getTextByValue(button, element)
                }));
            });
        }
        $(button).siblings("select[multiple]").children().remove();
    });
    $(".remove-all").click(function () {
        var button = this;

        var selectedOptions = [];

        $(button).siblings("select[multiple]").children().each(function (index, element) {
            selectedOptions.push(element.value)
        });

        if (selectedOptions != null) {
            selectedOptions.forEach(function (element, index) {
                $(button).parent().siblings(".center-div").children("select[multiple]").append($('<option>', {
                    value: element,
                    text: getTextByValue(button, element)
                }));
            });
        }
        $(button).siblings("select[multiple]").children().remove();
    });
});





function getTextByValue(button, value) {
    var result = "";

    $(button).siblings("select[multiple]").children().each(function (index, element) {
        if (value == element.value) {
            result = element.text;
            return;
        }
    });

    return result;
}

function submitForm() {
    debugger;
    var moduleID = $("#NS_ModuleID").text();
    var subModuleId = $("#DefaultSubModuleId").val();

    if (subModuleId == "" || subModuleId == undefined) {
        warningSelectDefaultSubmodule();
        return;
    }

    var data = {
        ModuleID: moduleID,
        DefaultSubModuleId: subModuleId,
        SubModulePlanData: getSubmoduleData($("#body-plan-container div:not(.center-div)")),
        SubModuleCountryData: getSubmoduleData($("#body-country-container div:not(.center-div)")),
        SubModuleCampaignData: getSubmoduleData($("#body-campaign-container div:not(.center-div)")),
        SubModuleUserData: getSubmoduleData($("#body-user-container div:not(.center-div)")),
        
    };

    $.ajax({
        method: "POST",
        url: "EditSubModule",
        data: { data: data }
    })
    .done(function (result) {
        if (result.success != 1) {
            //Redireccionar
            alert("Error");
        }

        //document.location.href = '/ManageConstraint/Index';
        document.location.href = $("#NS_HomeContraintURL").text();
    });

}


function getSubmoduleData(submoduleDiv) {
    var data = [];
    submoduleDiv.each(function (index, element) {
        var _currentSubmoduleId = $(element).data("submoduleid");
        var _currentOptions = [];

        $(element).find("select[multiple] option").each(function (index, element) {
            var auxConstraint = {
                Value: element.value
            };
            _currentOptions.push(auxConstraint);
        });;

        var aux = {
            SubModuleID: _currentSubmoduleId,
            SubModuleConstraint: _currentOptions
        }

        data.push(aux);
    });
    
    return data;
}

function saveForm() {

    semaphore.showAtention(
    "Are you sure you want to save the process?",
    "",
    function () {
        submitForm();
    }
);
}

function cancelForm() {
    semaphore.showAtention(
    "Are you sure you want to cancel the process?",
    "If you decide to cancel the process, the data you have registered will be deleted",
    function () {

        event.preventDefault();
        document.location.href = $("#NS_HomeContraintURL").text();
    }
);
}

function warningSelectSubmodule() {

    semaphore.showAtention(
    "You must select a submodule before move items",
    "",
    function () { },
    function () { }
    );
}

function warningSelectDefaultSubmodule() {
    semaphore.showAtention(
    "You must select a default submodule to finish",
    "",
    function () { },
    function () { }
    );
}
