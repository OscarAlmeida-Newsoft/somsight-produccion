/*******************************************
                statements
*******************************************/
var pageNumber = 1;
var pageSize = 50;
var selectedItem = {};
var CargarProductosGrid = true;
var selectedItemTextIdentifier = {};
var txtTextIdentifierTag = "";
var editMainImagesUrl = '';
var pFilterModel = {
    TextIdentifier: '',
    DefaultText: '',
    Classification: ''
};

objOptions = {
    Id: null,
    AssessmentQuestionId: null,
    TranslatorAdministratorId: null,
    TranslatorAdministratorText: null,
    Description: null,
    MaturityLevelId: null,
    Status: null,
    CreatedDate: null,
    CreatedById: null,
    UpdatedDate: null,
    UpdatedById: null
};

objQuestion = {
    Id: null,
    TranslatorAdministratorId: null,
    TranslatorAdministratorText: null,
    AssessmentTypeId: null,
    AssessmentMode: null,
    RelatedQuestionOption: null,
    RelatedQuestionId: null,
    DisplayOrder: null,
    Status: null,
    CreatedDate: null,
    CreatedById: null,
    UpdatedDate: null,
    UpdatedById: null
}

objRecomendation = {
    MaturityLevelId: null,
    RecomendationText:null
}

var ListObjOptions = [];
var ListObjRecomendation = [];
/*******************************************
                Events
*******************************************/

$(document).on('click', '#SendAssessmentDraft', function () {
    loadingDiv.show();
    $('#pQuestionAnswersModelIsFinal').val(false);
    //$('#AssessmentQuestionsForm').submit();
    gAnalytics.throwFormEvent('Click Save Draft', 'Assestments', $(this).data().eventLabel, $('#AssessmentQuestionsForm'));

    return false;

});

$(document).on('click', '#SendAssessmentFinal', function () {
    //var answerQuestions = $('input[type=radio]:checked').length;
    var answerQuestions = $('input[type=radio]:checked:not(input[disabled=disabled])').length

    if (answerQuestions != totalQuestions) {
        $("#opacidad").show();
        $("#modalNotCompleted").show();


    } else {
        $("#opacidad").show();
        $("#modalConfirm").show();
    }
});


$(document).on('click', '#SendAssessmentFinalOk', function () {
    loadingDiv.show();
    $('#pQuestionAnswersModelIsFinal').val(true);
    //$('#AssessmentQuestionsForm').submit();
    gAnalytics.throwFormEvent('Click End', 'Assestments', $(this).data().eventLabel, $('#AssessmentQuestionsForm'));
});

$(document).on('click', '#FreeSendAssessmentFinalOk', function () {
    loadingDiv.show();
    $('#pQuestionAnswersModelIsFinal').val(true);
    //$('#AssessmentQuestionsForm').submit();
    gAnalytics.throwFormEvent('Click End', 'Free Assestments', $(this).data().eventLabel, $('#AssessmentQuestionsForm'));
});

$(document).on('click', '#modalConfirm .cerrar', function () {
    $("#opacidad").hide();
    $("#modalConfirm").hide();
});


//Cancel Modal
$(document).on('click', '#modalConfirm .cancel-button', function () {
    $("#opacidad").hide();
    $("#modalConfirm").hide();
});

$(document).on('click', '#modalNotCompleted', function () {
    $("#opacidad").hide();
    $("#modalNotCompleted").hide();
});

$(document).on('change', 'input[type=radio]', function () {
    //answeredQuestions = $('input[type=radio]:checked').length
    answeredQuestions = $('input[type=radio]:checked:not(input[disabled=disabled])').length
    $('#answeredQuestions').text(answeredQuestions);
});

$(document).ready(function () {
    FillSelectMaturity("/AdminAssessmentQuestionAdvance/GetAssessmentMaturity", "txtAddNewOptionMaturity");
    FillSelectMaturity("/AdminAssessmentQuestionAdvance/GetAssessmentMaturity", "txtEditOptionMaturity");
    GridCallback();
    CargarProductos();
});

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

$(document).on('click', '.table-item-search', function () {
    selectedItemTextIdentifier = {};
    if ($(this).hasClass('item-selected')) {
        $(this).find('.check-item').prop('checked', false);
        $(this).removeClass('item-selected');
    } else {

        $(this).parent().find('.check-item').prop('checked', false);
        $(this).parent().find('tr').removeClass('item-selected');
        $(this).find('.check-item').prop('checked', true);
        $(this).addClass('item-selected');
        selectedItemTextIdentifier.id = $(this).data('itemtext');
    }

});

//Pagination
$(document).on('click', '.NS-paginator li', function () {
    var clickedPage = $(this).data('page');
    if (clickedPage !== undefined) {
        pageNumber = clickedPage

        GridCallback();
    }
});

$(document).on('click', '.ClearModalTextIdentifier', function () {
    txtTextIdentifierTag = $(this).data("textidentifier");
    $("#" + txtTextIdentifierTag).val("");
});

$(document).on('keyup', '.searchBox', function () {
    if ($("#txtTextIdentifier").val().length >= 3 || $("#txtDefaultText").val().length >= 3 || $("#txtDescripcion").val().length >= 3)
        CargarProductos();
});



$(document).on('click', '#btnSaveQuestion', function () {
    objQuestion.TranslatorAdministratorText = $("#txtTextIdentifierQuestion").val();
    objQuestion.AssessmentTypeId = $("#txtAssessmentTypeId").val();
    objQuestion.DisplayOrder = $("#txtDisplayOrder").val();
    objQuestion.Status = $("#Status").is(':checked');
    objQuestion.AssessmentMode = 0;
    objQuestion.RelatedQuestionId = 0;

    messageError = "";
    errors = false;
    //TextIdentifier Required
    if ($("#txtTextIdentifierQuestion").val() == null || $("#txtTextIdentifierQuestion").val() == "") {
        message = $("#txtTextIdentifierQuestion").data('menssagerequired');
        messageError += `${message} </br>`;
        errors = true;
    }
    //Almost one Option
    if (ListObjOptions.length == 0) {
        message = $("#optionsTable").data('menssagerequired');
        messageError += `${message} </br>`;
        errors = true;
    }

    if (!errors) {
        saveQuestion();
        $('.divmessageerror').parent().addClass('hide');
    }
    else {
        $('.divmessageerror').empty();
        $('.divmessageerror').append(messageError);
        $('.divmessageerror').parent().removeClass('hide');
    }
});

$(document).on("click", "#btnUpdateAssessmentQuestion", function () {
    objQuestion.TranslatorAdministratorText = $("#txtTextIdentifierQuestionEdit").val();
    objQuestion.AssessmentTypeId = $("#txtAssessmentTypeIdEdit").val();
    objQuestion.Status = $("#StatusEdit").is(':checked');
    objQuestion.AssessmentMode = 1;
    objQuestion.DisplayOrder =0;
    objQuestion.RelatedQuestionId = 0;
    debugger;

    messageError = "";
    errors = false;
    

    //TextIdentifier Required
    if ($("#txtTextIdentifierQuestionEdit").val() == null || $("#txtTextIdentifierQuestionEdit").val() == "") {
        message = $("#txtTextIdentifierQuestionEdit").data('menssagerequired');
        messageError += `${message} </br>`;
        errors = true;
    }
    //Almost one Option
    if (ListObjOptions.length == 0) {
        message = $("#optionsTable").data('menssagerequired');
        messageError += `${message} </br>`;
        errors = true;
    }

    if (!errors) {
        editQuestion();
        $('.divmessageerror').parent().addClass('hide');
    }
    else {
        $('.divmessageerror').empty();
        $('.divmessageerror').append(messageError);
        $('.divmessageerror').parent().removeClass('hide');
    }



});

//Pagination
$(document).on('click', '.ModalTextIdentifier', function () {
    txtTextIdentifierTag = $(this).data("textidentifier");
    $('#searchTextIdentifierModal').show();
    $('#searchTextIdentifierModal').modal({ backdrop: "static" }, { keyboard: false });
    $("#txtTextIdentifier").val('');
    $.validator.unobtrusive.parse('#FormCreateEdit');
    CargarProductos();
});

$(document).on('keyup', '.searchBox', function () {
    if ($("#txtTextIdentifier").val().length >= 3 || $("#txtDefaultText").val().length >= 3 || $("#txtDescripcion").val().length >= 3)
        CargarProductos();
});

$(document).on('click', '#btnSave', function () {
    if (!selectedItemTextIdentifier.id) {
        alert("You must select an element");
        return;
    }

    if (txtTextIdentifierTag != null && txtTextIdentifierTag != undefined && txtTextIdentifierTag != "")
    {
        $("#" + txtTextIdentifierTag).val(selectedItemTextIdentifier.id);
        $("#btnclose").click();
    }
});

//Add new record
$(document).on('click', '#addAssessmentQuestion', function () {
    loadingDiv.show();
    $.ajax({
        url: $(this).attr('href') + "?pidAssessmentTypeId=" + $("#idAssessmentType").text(),
        type: 'GET'
    })
        .done(function (data) {
            $('#CreateAssessmentQuestion').html(data);
            $('#createModal').modal({ backdrop: "static" }, { keyboard: false });
            $.validator.unobtrusive.parse('#FormCreateEdit');
            
            objOptions = [];
            objRecomendation = [];
            ListObjOptions = [];
            ListObjRecomendation = [];

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

$(document).on('click', '#addNewOption', function () {
    $("#messageMadurity").empty();

    $("#txtAddNewOptionTextIdentifier").val('');
    $("#txtAddNewRecommendTextIdentifier").val('');
    $("#txtAddNewOptionMaturity").val('');
    $("#txtAddNewOptionDescription").val('');

    $('#addNewOptionModal').modal({ backdrop: "static" }, { keyboard: false });
    $.validator.unobtrusive.parse('#FormCreateEdit');
});

//Edit option
function editOption(tag) {
    debugger;
    $("#messageMadurityEdit").empty();

    $("#txtEditOptionTextIdentifier").val($(tag).data("translationadministrationtext"));
    $("#txtEditRecommendTextIdentifier").val($(tag).data("translatoradministratorrecommendation"));
    $("#txtEditOptionMaturity").val($(tag).data("maturitylevel"));
    $("#txtEditOptionMaturityOriginal").val($(tag).data("maturitylevel"));
    $("#txtEditOptionDescription").val($(tag).data("description"));

    $('#editOptionModal').modal({ backdrop: "static" }, { keyboard: false });
    $.validator.unobtrusive.parse('#FormCreateEdit');
}


$(document).on('click', "#btnSaveNewOption ", function () {
    pass = true;
    messageError = "";
    debugger;
    if ($("#txtAddNewOptionTextIdentifier").val() == null || $("#txtAddNewOptionTextIdentifier").val() == "") {
        message = $("#txtAddNewOptionTextIdentifier").data('menssagerequired');
        messageError += `${message} </br>`;
        pass = false;
        errors = true;
    }

    if ($("#txtAddNewOptionMaturity").val() == null || $("#txtAddNewOptionMaturity").val() == "") {
        message = $("#txtAddNewOptionMaturity").data('validation');
        messageError += `${message} </br>`;
        pass = false;
        errors = true;
    }

    for (var i = 0; i < ListObjOptions.length; i++) {
        if (ListObjOptions[i].MaturityLevelId == $("#txtAddNewOptionMaturity").val()) {
            message = $("#txtAddNewOptionMaturity").data('menssagerequired');
            messageError += `${message} </br>`;
            errors = true;
            pass = false;
            break;
        }
    }

    if (($("#txtAddNewOptionTextIdentifier").val() != null || $("#txtAddNewOptionTextIdentifier").val() != "" || $("#txtAddNewOptionMaturity").val() != null || $("#txtAddNewOptionMaturity").val() != "") && pass) {
        objOptions = new Object();
        objOptions.TranslatorAdministratorText = $("#txtAddNewOptionTextIdentifier").val();
        objOptions.Description = $("#txtAddNewOptionDescription").val();
        objOptions.MaturityLevelId = $("#txtAddNewOptionMaturity").val();
        objOptions.Status = 1;

        objRecomendation = new Object();
        objRecomendation.MaturityLevelId = $("#txtAddNewOptionMaturity").val();
        objRecomendation.RecomendationText = $("#txtAddNewRecommendTextIdentifier").val();

        htmlAppend = `
        <tr data-maturityleveltr="${objOptions.MaturityLevelId}">
            <td>${objOptions.MaturityLevelId}</td>
            <td>${objOptions.TranslatorAdministratorText}</td>
            <td>${objOptions.Description}</td>
            <td>${objRecomendation.RecomendationText}</td>
            <td>
            <a href="#" data-maturitylevel="${objOptions.MaturityLevelId}" 
    data-translationadministrationtext="${objOptions.TranslatorAdministratorText}"
                             data-description="${objOptions.Description}"
      data-translatoradministratorrecommendation="${objRecomendation.RecomendationText}" onclick="editOption(this)" class="btn btn-sm btn-default edit"><i class="glyphicon glyphicon-edit"></i></a>
            </td>
            <td>
            <a href="#" data-textidentifier="${objOptions.MaturityLevelId}" onclick="deleteOption(this)" class="btn btn-sm btn-default delete"><i class="glyphicon glyphicon-remove"></i></a>
            </td>
        </tr>      
        `;
        $("#optionsTable").find("tbody").append(htmlAppend);
        ListObjOptions.push(objOptions);
        ListObjRecomendation.push(objRecomendation);
        $("#btncloseNewOption").click();
        $(".newoption").val("");
    }
    else if (!pass) {
        $("#messageMadurity").empty();
        $('#messageMadurity').append(messageError);
    }
});

//Edit
$(document).on('click', "#btnSaveEditOption ", function () {
    pass = true;
    messageError = "";
    debugger;    

    for (var i = 0; i < ListObjOptions.length; i++) {
        if (ListObjOptions[i].MaturityLevelId != $("#txtEditOptionMaturityOriginal").val()
            && ListObjOptions[i].MaturityLevelId == $("#txtEditOptionMaturity").val()) {

            message = $("#txtEditOptionMaturity").data('menssagerequired');
            messageError += `${message} </br>`;
            errors = true;
            pass = false;
            break;
        }
    }

    if (($("#txtEditOptionTextIdentifier").val() != null || $("#txtEditOptionTextIdentifier").val() != "" || $("#txtEditOptionMaturity").val() != null || $("#txtEditOptionMaturity").val() != "") && pass) {

        //Ubico la posicion modificada
        var i = 0;
        for (i = 0; i < ListObjOptions.length; i++) {
            if (ListObjOptions[i].MaturityLevelId == $("#txtEditOptionMaturityOriginal").val()) {

                ListObjOptions[i].MaturityLevelId = $("#txtEditOptionMaturity").val();
                ListObjOptions[i].TranslatorAdministratorText = $("#txtEditOptionTextIdentifier").val();
                ListObjOptions[i].Description = $("#txtEditOptionDescription").val();
                ListObjOptions[i].RecomendationText = $("#txtEditRecommendTextIdentifier").val();
                break;
            }
        }

        //Recomendaciones
        var encontrado = false;
        for (j = 0; j < ListObjRecomendation.length; j++) {
            if (ListObjRecomendation[j].MaturityLevelId == $("#txtEditOptionMaturityOriginal").val()) {

                ListObjRecomendation[j].MaturityLevelId = $("#txtEditOptionMaturity").val();
                ListObjRecomendation[j].RecomendationText = $("#txtEditRecommendTextIdentifier").val();
                encontrado = true;
                break;
            }
        }

        if (!encontrado) {
            objRecomendation = new Object();
            objRecomendation.MaturityLevelId = $("#txtEditOptionMaturity").val();
            objRecomendation.RecomendationText = $("#txtEditRecommendTextIdentifier").val();
            ListObjRecomendation.push(objRecomendation);
        }
        


        htmlAppend = `
        <tr data-maturityleveltr="${ListObjOptions[i].MaturityLevelId}">
            <td>${ListObjOptions[i].MaturityLevelId}</td>
            <td>${ListObjOptions[i].TranslatorAdministratorText}</td>
            <td>${ListObjOptions[i].Description}</td>
            <td>${ListObjOptions[i].RecomendationText}</td>
            <td>
            <a href="#" data-maturitylevel="${ListObjOptions[i].MaturityLevelId}" 
    data-translationadministrationtext="${ListObjOptions[i].TranslatorAdministratorText}"
                             data-description="${ListObjOptions[i].Description}"
      data-translatoradministratorrecommendation="${ListObjOptions[i].RecomendationText}"
onclick="editOption(this)" class="btn btn-sm btn-default edit"><i class="glyphicon glyphicon-edit"></i></a>
            </td>
            <td>
            <a href="#" data-textidentifier="${ListObjOptions[i].MaturityLevelId}" onclick="deleteOption(this)" class="btn btn-sm btn-default delete"><i class="glyphicon glyphicon-remove"></i></a>
            </td>
        </tr>      
        `;

        var oldItem = $("#optionsTableEdit").find('tbody *[data-maturityleveltr="' + $("#txtEditOptionMaturityOriginal").val() + '"]');
        oldItem.after(htmlAppend);
        oldItem.remove();
        $("#btncloseEditOption").click();
        $(".newoption").val("");
    }
    else if (!pass) {
        $("#messageMadurityEdit").empty();
        $('#messageMadurityEdit').append(messageError);
    }
});

$(document).on("change", "#addQuestionToAdvance", function () {
    if ($(this).prop('checked')) {
        $("#addToAdvanceQuestionDiv").show(200);
        $("#addnewoptiondiv").hide();
    }
    else {
        $("#addToAdvanceQuestionDiv").hide(200);
        $("#addnewoptiondiv").show();
    }

});

$(document).on("click", "#btncloseNewOptionAdvance", function () {
    $("#addToAdvanceQuestionDiv").hide(200);
    $("#addnewoptiondiv").show();
    $("#addQuestionToAdvance").parent().removeClass("toggle");
    $("#addQuestionToAdvance").parent().removeClass("btn");
    $("#addQuestionToAdvance").parent().removeClass("btn-primary");
    $("#addQuestionToAdvance").parent().addClass("toggle");
    $("#addQuestionToAdvance").parent().addClass("btn");
    $("#addQuestionToAdvance").parent().addClass("btn-default");
    $("#addQuestionToAdvance").parent().addClass("off");
    $("#addQuestionToAdvance").prop("checked", false);
});


$(document).on("click", "#btnSaveNewOptionAdvance", function () {

    pass = true;
    messageError = "";
    if ($("#txtTextIdentifierQuestionAdvance").val() == null || $("#txtTextIdentifierQuestionAdvance").val() == "") {
        message = $("#txtTextIdentifierQuestionAdvance").data('menssagerequired');
        messageError += `${message} </br>`;
        pass = false;
        errors = true;
    }

    if (pass) {
        $("#messageErrorsAdvance").empty();
        $("#labeladdAdvanceQuestion").text("Advanced question created successfully");
        $("#addToAdvanceQuestionDiv").hide(200);
        $("#addnewoptiondiv").show();
        $("#addQuestionToAdvance").parent().removeClass("toggle");
        $("#addQuestionToAdvance").parent().removeClass("btn");
        $("#addQuestionToAdvance").parent().removeClass("btn-primary");
        $("#addQuestionToAdvance").parent().addClass("toggle");
        $("#addQuestionToAdvance").parent().addClass("btn");
        $("#addQuestionToAdvance").parent().addClass("btn-default");
        $("#addQuestionToAdvance").parent().addClass("off");


        $("#addQuestionToAdvance").parent().addClass("hide");
        $("#removeQuestionAdvance").removeClass("hide");
        $("#addQuestionToAdvance").prop("checked", false);
    }
    else {
        $("#messageErrorsAdvance").empty();
        $('#messageErrorsAdvance').append(messageError);
    }
});
$(document).on("click", "#removeQuestionAdvance", function () {

    $("#addQuestionToAdvance").parent().removeClass("hide");
    $("#removeQuestionAdvance").addClass("hide");
});

$(document).on("change", "#txtTextIdentifierQuestionAdvance", function () {
    if ($(this).val() != "" || $(this).val() != "") {
        $.ajax({
            url: "/AdminAssessmentQuestionAdvance/SearchAdvanceQuestion",
            type: 'POST',
            data: JSON.stringify({
                TextIdentifier: $(this).val(),
                AssessmentTypeId: $("#idAssessmentType").text()
            }),
            dataType: "json",
            contentType: 'application/json; charset=utf-8'
        })
            .done(function (data) {
                if (data.Resultado) {
                    if (data.Data.length == 0) {
                        $("#txtTextIdentifierQuestionAdvance").val("");
                        $("#cantfingmessagediv").removeClass("hide");
                    }
                    else {
                        $("#cantfingmessagediv").addClass("hide");
                    }
                }
            })
    }
});


//Add new record
$(document).on('click', '#editRecordAssessmentQuestion', function () {
    if (selectedItem.id === undefined) {
        toastMessage.show('Please select a record', 'alert-warning')
        return false;
    }

    $.ajax({
        url: $(this).attr('href') + "?AssessmentQuestion=" + selectedItem.id,
        type: 'GET'
    })
        .done(function (data) {
            $('#EditAssessmentQuestion').html(data);
            $('#editModal').modal({ backdrop: "static" }, { keyboard: false });
            $.ajax({
                url: "/AdminAssessmentQuestionAdvance/GetOptions" + "?AssessmentQuestion=" + selectedItem.id,
                type: 'GET',
                dataType: "json",
                contentType: 'application/json; charset=utf-8'
            })
                .done(function (data) {
                    debugger;
                    ListObjOptions = new Object();
                    ListObjOptions = data.Data;
                })
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

$(document).on('click', '#deleteAssessmentQuestionConfirm', function (e) {
    if (selectedItem.id === undefined) {
        toastMessage.show('Please select a record', 'alert-warning')
        return false;
    }
    loadingDiv.show();
    $.ajax({
        url: $(this).attr('href') + '?pId=' + selectedItem.id,
        type: 'GET'
    })
        .done(function (data) {
            $('#RemoveAssessmentQuestion').html(data);
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


/*******************************************
                Functions
*******************************************/
//Perform the callback to reload all data in the datagrid
function GridCallback() {
    loadingDiv.show();
    $.ajax({
        url: $('#GridListCallBack').text() + "?pPage=" + pageNumber + "&pPageSize=" + pageSize + "&pidAssessmentTypeId=" + $("#idAssessmentType").text(),
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

function On_Begin() {
    loadingDiv.show();
}

function OnSuccess() {
    selectedItem = {};
    loadingDiv.hide();
    GridCallback();
}

function OnFailure() {
}

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
//*************************************************************
//Carga la grid de text identifier con la información.
//**************************************************************
function CargarProductos() {
    $.ajax({
        url: $('#TextIdenfitiferAction').text(),
        type: 'POST',
        dataType: "json",
        data: {
            textIdentifier: $("#txtTextIdentifier").val(),
            DefaultText: $("#txtDefaultText").val(),
            Description: $("#txtDescripcion").val()
        }
    })
        .done(function (data) {
            if (data.Resultado)
                CrearGridTextIdentifier(data.Data);
        })
        .fail(function (jqXHR, exception) {
            $('#vermasdiv').text(TextError(jqXHR, exception));
            $('#FailModal').modal({ backdrop: "static" }, { keyboard: false });
        });
    return false;
};

function CrearGridTextIdentifier(data) {
    $("#tbadytextidentifier").remove();

    var appendHTML = "<tbody id='tbadytextidentifier'>";
    for (var i = 0; i < data.length; i++) {
        appendHTML += `
        <tr data-itemtext="${data[i].TextIdentifier}" class="table-item-search">
            <td>
                ${data[i].TextIdentifier}
            </td>
            <td>
                ${data[i].DefaultText}
            </td>
            <td>
                ${data[i].Description}
            </td>
            <td>
                ${data[i].Classification}
            </td>
        </tr>
        `
    }
    appendHTML += "</tbody>"
    $("#griTextIdentifier").append(appendHTML);
    return true;
};



function FillSelectMaturity(Url, Select, Required = false) {
    $.ajax({
        url: Url,
        type: 'POST',
        dataType: "json"
    })
        .done(function (data) {
            appendHTML = "";
            for (var i = 0; i < data.Data.length; i++) {
                appendHTML +=
                    `<option value="${data.Data[i].MaturityLevelId}">
                    ${data.Data[i].MaturityLevelId}
            </option>`
            }
            $("#" + Select).append(appendHTML);
        })
        .fail(function (jqXHR, exception) {
            $('#vermasdiv').text(TextError(jqXHR, exception));
            $('#FailModal').modal({ backdrop: "static" }, { keyboard: false });
        });
    return false;
};

function deleteOption(tag) {
    textidentifierToRemove = $(tag).data("textidentifier");
    debugger;
    for (var i = 0; i < ListObjOptions.length; i++) {
        if (ListObjOptions[i].MaturityLevelId == textidentifierToRemove) {
            ListObjOptions.splice(i, 1);
           
            break;
        }
    }

    for (var i = 0; i < ListObjRecomendation.length; i++) {
        if (ListObjRecomendation[i].MaturityLevelId == textidentifierToRemove) {
           
            ListObjRecomendation.splice(i, 1);
            break;
        }
    }

    $(tag).parent().parent().remove();
}

function saveQuestion() {

    loadingDiv.show();
    $.ajax({
        url: "/AdminAssessmentQuestionAdvance/AddQuestion",
        data: JSON.stringify({
            objQuestion: objQuestion,
            ListObjOptions: ListObjOptions,
            ListObjRecomendation: ListObjRecomendation,
        }),
        type: 'POST',
        contentType: 'application/json; charset=utf-8'
    })
        .done(function (data) {
            $('#messageAssessmentModal').html(data);
            $('#messageModal').modal({ backdrop: "static" }, { keyboard: false });
            $('#closemodaladd').click();
            OnSuccess()
        })
        .fail(function (jqXHR, exception) {
            $('#vermasdiv').text(TextError(jqXHR, exception));
            $('#FailModal').modal({ backdrop: "static" }, { keyboard: false });
        })
        .always(function () {
            loadingDiv.hide();
        });
}

function editQuestion() {

    loadingDiv.show();
    $.ajax({
        url: "/AdminAssessmentQuestionAdvance/UpdateQuestion",
        data: JSON.stringify({
            objQuestion: objQuestion,
            ListObjOptions: ListObjOptions,
            ListObjRecomendation: ListObjRecomendation
        }),
        type: 'POST',
        contentType: 'application/json; charset=utf-8'
    })
        .done(function (data) {
            $('#messageAssessmentModal').html(data);
            $('#messageModal').modal({ backdrop: "static" }, { keyboard: false });
            $('#closemodaledit').click();
            OnSuccess()
        })
        .fail(function (jqXHR, exception) {
            $('#vermasdiv').text(TextError(jqXHR, exception));
            $('#FailModal').modal({ backdrop: "static" }, { keyboard: false });
        })
        .always(function () {
            loadingDiv.hide();
        });
}