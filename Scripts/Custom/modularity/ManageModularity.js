var currentlist = [];
var currentSearcher = null;


$(document).ready(function () {
    $(".option-checkbox").on('change', function () {
        if ($(this).is(':checked')) {
            $("#" + $(this).val()).css("display", "block").css("opacity", 1);
        } else {
            // Hacer algo si el checkbox ha sido deseleccionado
            $("#" + $(this).val()).css("display", "").css("opacity", 0);
        }
    });

    $(".add-selected, .remove-selected").click(function () {
        //Recoge las opciones seleccione
        var button = this;
        var selectedOptions = $(button).siblings("select").val();

        if (selectedOptions != null) {
            selectedOptions.forEach(function (element, index) {
                if ($(button).data('orientation') == 'left') {
                    $(button).parent().siblings().eq(0).children("select").append($('<option>', {
                        value: element,
                        text: getTextByValue(button, element)
                    }));
                }
                else if ($(button).data('orientation') == 'right') {
                    $(button).parent().siblings().eq(1).children("select").append($('<option>', {
                        value: element,
                        text: getTextByValue(button, element)
                    }));
                }
                else if ($(button).data('orientation') == 'center') {
                    $(button).parent().siblings('.center-div').children("select").append($('<option>', {
                        value: element,
                        text: getTextByValue(button, element)
                    }));
                }

            });
        }
        $(button).siblings("select").children(":selected").remove();

        if (currentSearcher != null) {
            if ($(button).siblings(".searcher")[0] == currentSearcher) {
                //¿Que pasa cuando el boton pertenece al filtro?
                //se Borra de currentlist los elementos que se borraran
                //var aux = currentlist.map(function (element) {
                //    if (!selectedOptions.includes(element.value)) {
                //        return element;
                //    }
                //    return;
                //});

                //currentlist = aux;
                var aux = [];
                for (var i = 0; i < currentlist.length; i++) {
                    if (!selectedOptions.includes(currentlist[i].value)) {
                        aux.push(currentlist[i]);
                    }


                }
                currentlist = aux;
            }
        }

    });

    $(".add-all, .remove-all").click(function () {
        var button = this;
        var selectedOptions = [];

        $(button).siblings("select").children().each(function (index, element) {
            selectedOptions.push(element.value)
        });

        if (selectedOptions != null) {
            if ($(button).data('orientation') == 'left') {
                selectedOptions.forEach(function (element, index) {
                    $(button).parent().siblings().eq(0).children("select").append($('<option>', {
                        value: element,
                        text: getTextByValue(button, element)
                    }));
                });
            }
            else if ($(button).data('orientation') == 'right') {
                selectedOptions.forEach(function (element, index) {
                    $(button).parent().siblings().eq(1).children("select").append($('<option>', {
                        value: element,
                        text: getTextByValue(button, element)
                    }));
                });
            }
            else if ($(button).data('orientation') == 'center') {
                selectedOptions.forEach(function (element, index) {
                    $(button).parent().siblings('.center-div').children("select").append($('<option>', {
                        value: element,
                        text: getTextByValue(button, element)
                    }));
                });
            }

        }
        $(button).siblings("select").children().remove();


        if (currentSearcher != null) {
            if ($(button).siblings(".searcher")[0] == currentSearcher) {
                //¿Que pasa cuando el boton pertenece al filtro?
                //se Borra de currentlist los elementos que se borraran
                var aux = [];
                for (var i = 0; i < currentlist.length; i++) {
                    if (!selectedOptions.includes(currentlist[i].value)) {
                        aux.push(currentlist[i]);
                    }


                }
                currentlist = aux;
            }
        }
    });

    $(".searcher").keyup(function () {
        var searcher = this;
        var string = $(searcher).val();

        var result = filterItems(string);

        $(searcher).siblings("select").children("option").remove();

        result.forEach(function (element, index) {
            $(searcher).siblings("select").append($('<option>', {
                value: element.value,
                text: element.text
            }));
        });

    });

    $(".searcher").focusout(function (event) {
        //Se ubica cual es el nuevo foco
        var newSearcher = event.relatedTarget;

        //Si  el nuevo foco es un searcher, se comprueba si es vacia, si es vacia quiere decir que es un nuevo searcher
        if ($(newSearcher).val() == "" && newSearcher.type == "text") {
            //Se borran todas las opciones de la lista anterior
            $(currentSearcher).siblings("select").children("option").remove()

            //Se llena con todos los elementos, pues se pierde el filtro
            currentlist.forEach(function (element, index) {
                $(currentSearcher).siblings("select").append($('<option>', {
                    value: element.value,
                    text: element.text
                }));
            });
        }
            //Si 
        else {
            console.log("perdi el foco")
        }

    });

    $(".searcher").focusin(function () {
        var searcher = this;

        if (currentSearcher != searcher) {
            //Si se cambia de searcher se lleva el anterior select a su estado inicial
            $(currentSearcher).val("");
            $(currentSearcher).siblings("select").children("option").remove()
            currentlist.forEach(function (element, index) {
                $(currentSearcher).siblings("select").append($('<option>', {
                    value: element.value,
                    text: element.text
                }));
            });
        }

        if ($(searcher).val() == "") {
            currentlist = [];

            //$(".searcher").val("");
            $(searcher).siblings("select").children("option").each(function (index, element) {
                currentlist.push({ value: element.value, text: element.text })
            });
            //volver a la anterior lista el .searcher que tenia las cam´pañas anteriores
        }
        currentSearcher = searcher;

    });
});


function filterItems(query) {
    return currentlist.filter(function (el) {
        return el.text.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
}

function getTextByValue(button, value) {
    var result = "";

    $(button).siblings("select").children().each(function (index, element) {
        if (value == element.value) {
            result = element.text;
            return;
        }
    });

    return result;
}

function submitForm() {
    var moduleID = $("#NS_ModuleID").text();
    //var regionHasInfo = $("#region-checkbox").is(':checked');
    //var countryHasInfo = $("#country-checkbox").is(':checked');
    //var campaignHasInfo = $("#campaign-checkbox").is(':checked');


    var data = {
        ModuleID: moduleID,
        NonAllowedPlanData: [],
        NonAllowedCountryData: [],
        NonAllowedCampaignData: [],
        NonAllowedUserData: [],
        AllowedPlanData: [],
        AllowedCountryData: [],
        AllowedCampaignData: [],
        AllowedUserData: [],
    };

    $("#body-plan-container div:nth-child(1) select option").each(function (index, element) {
        var aux = {
            Value: element.value
        };
        data.NonAllowedPlanData.push(aux);
    });

    $("#body-country-container div:nth-child(1) select option").each(function (index, element) {
        var aux = {
            Value: element.value
        };
        data.NonAllowedCountryData.push(aux);
    });

    $("#body-campaign-container div:nth-child(1) select option").each(function (index, element) {
        var aux = {
            Value :element.value
        };
        data.NonAllowedCampaignData.push(aux);
    })

    $("#body-user-container div:nth-child(1) select option").each(function (index, element) {
        var aux = {
            Value: element.value
        };
        data.NonAllowedUserData.push(aux);
    })


    $("#body-plan-container div:nth-child(3) select option").each(function (index, element) {
        var aux = {
            Value: element.value
        };
        data.AllowedPlanData.push(aux);
    });

    $("#body-country-container div:nth-child(3) select option").each(function (index, element) {
        var aux = {
            Value: element.value
        };
        data.AllowedCountryData.push(aux);
    });

    $("#body-campaign-container div:nth-child(3) select option").each(function (index, element) {
        var aux = {
            Value: element.value
        };
        data.AllowedCampaignData.push(aux);
    })

    $("#body-user-container div:nth-child(3) select option").each(function (index, element) {
        var aux = {
            Value: element.value
        };
        data.AllowedUserData.push(aux);
    })


    $.ajax({
        method: "POST",
        url: "EditModule",
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

function addCampaign() {
    loadingDiv.show();
    var CheckCampaignName = $("#campaign-name").val();

    $.ajax({
        method: "POST",
        url: "CheckCampaignName",
        data: { pCampaignName: CheckCampaignName }
    })
    .done(function (data) {
        //Quiere decir que no existe en crm
        if (!data.result && data.campaignId == 0) {
            $("#campaign-name").css("background-color", "indianred");
            semaphore.showError("The campaign couldn't be added", "The campaign name wasn't found on the CRM")
        }
            //Quiere decir que ya existia entonces no tuvo que volverlo a crear
        else if (!data.result && data.campaignId != 0) {
            $("#campaign-name").val("");
            $("#campaign-name").css("background-color", "unset");
            semaphore.showAtention("The campaign wasn't added", "The campaign already exists in the list")
        }
            //Quiere decir que debe agregarlo al select
        else if (data.result) {
            //body-campaign-container

            $("#body-campaign-container div:nth-child(1)").children("select").append($('<option>', {
                value: data.campaignId,
                text: data.campaignName
            }));
            $("#campaign-name").val("");
            $("#campaign-name").css("background-color", "unset");
            semaphore.showSuccess("Added campaign", "The campaign was added successfully")
        }


        loadingDiv.hide();
        alert("Data Saved: " + msg);
    })
    .fail(function (err) {
        loadingDiv.hide();
        console.log(err);
    });
}