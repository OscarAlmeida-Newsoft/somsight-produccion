var pageNumber = 1;
var pageSize = 50;

var selectedItem = {};

var pFilterModel = {
    NameOrEmail: '',
    filtered: false,
    AllTenant: false
};

var seletedUserAssessmentGridUrl = '';
var selectedLanguage = 1;

$(document).ready(function () {
    GridCompaniesCallBack();
});

function GridCompaniesCallBack() {
    loadingDiv.show();
    $.ajax({
        url: $('#GridListCompaniesCallBack').text() + "?pPage=" + pageNumber + "&pPageSize=" + pageSize,
        data: JSON.stringify(pFilterModel),
        type: 'POST',
        contentType: 'application/json; charset=utf-8'
    })
    .done(function (data) {
        $('#gridCompanies-div').html(data);
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
    GridCompaniesCallBack();
    return false;
});


function On_Begin() {
    loadingDiv.show();
}

function OnSuccess() {
    selectedItem = {};
    loadingDiv.hide();
    GridCompaniesCallBack();
}

//Pagination
$(document).on('click', '.NS-paginator li', function () {
    var clickedPage = $(this).data('page');
    if (clickedPage !== undefined) {
        pageNumber = clickedPage

        GridCompaniesCallBack();
    }
});

$(document).on('change', '.items-per-page-select', function () {
    pageSize = $(this).val();
    pageNumber = 1;
    GridCompaniesCallBack();

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
        selectedItem.measure = $(this).data('measure');
    }

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
    pFilterModel.NameOrEmail = $('#filterNameOrEmail').val();
    pFilterModel.AllTenant = (typeof ($("#filterAllTenant:checked")[0]) != "undefined") ? true : false;
    pFilterModel.filtered = true;

    pageNumber = 1;

    GridCompaniesCallBack();
});


$(document).on('click', '#btnClearFilter', function () {
    pFilterModel = {};
    pFilterModel.filtered = false;

    GridCompaniesCallBack();
});

//Show User Assessments Grid
$(document).on('click', '#showUserAsssessments', function () {

    if (selectedItem.id === undefined) {
        toastMessage.show('Please select a record', 'alert-warning');
        //alert('Please select a record');
        return false;
    }
    seletedUserAssessmentGridUrl = $(this).attr('href');
    //LoadUserAssessmentsGrid($(this).attr('href'));
    $('#implementedLanguagesModal').modal({ backdrop: "static" }, { keyboard: false });
    //$('#Languages').show();
    return false;
});

$(document).on('click', '#btnSelectLanguage', function () {

    //alert(seletedUserAssessmentGridUrl);
    selectedLanguage = $('#selectedLanguageId').val();
    $('#implementedLanguagesModal').modal('hide');
    LoadUserAssessmentsGrid(seletedUserAssessmentGridUrl);
});
//Show User Assessments Grid
$(document).on('click', '#unlockAssessment', function () {

    var urlReload = $(this).data('reloadgridurl');
    loadingDiv.show();
    $.ajax({
        url: $(this).attr('href'),
        type: 'POST'
    })
    .done(function (data) {
        console.log(data);
        if (data.error === "false") {
            LoadUserAssessmentsGrid(urlReload);
        }
        //$('#Assessments').html(data);
        //$('#assessmentsModal').modal({ backdrop: "static" }, { keyboard: false });
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

function LoadUserAssessmentsGrid(url) {
    loadingDiv.show();
    $.ajax({
        url: url + "?pUserId=" + selectedItem.id + '&pLanguageId=' + selectedLanguage,
        type: 'POST'
    })
    .done(function (data) {
        debugger;
        $('#Assessments').html(data);
        $('#assessmentsModal').modal({ backdrop: "static" }, { keyboard: false });
        setTimeout(function () {
            tableBasic.columns.adjust();
        }, 300);
    })
    .fail(function (jqXHR, exception) {
        $('#vermasdiv').text(TextError(jqXHR, exception));
        $('#FailModal').modal({ backdrop: "static" }, { keyboard: false });
    })
    .always(function () {
        loadingDiv.hide();
    });


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


//Show User Assessments Grid
$(document).on('click', '#showUserMyPlatform', function () {

    if (selectedItem.id === undefined) {
        toastMessage.show('Please select a record', 'alert-warning')
        //alert('Please select a record');
        return false;
    }

    if (selectedItem.measure == false) {
        toastMessage.show('The company has not measure clients', 'alert-warning')
        //alert('Please select a record');
        return false;
    }

    LoadUserMyPlatformModal($(this).attr('href'));
    return false;
});

function LoadUserMyPlatformModal(url) {
    loadingDiv.show();
    $.ajax({
        url: url + "?pUserId=" + selectedItem.id,
        type: 'POST'
    })
    .done(function (data) {
        debugger;
        $('#Measure').html(data);
        $('#measureModal').modal({ backdrop: "static" }, { keyboard: false });
    })
    .fail(function (jqXHR, exception) {
        $('#vermasdiv').text(TextError(jqXHR, exception));
        $('#FailModal').modal({ backdrop: "static" }, { keyboard: false });
    })
    .always(function () {
        loadingDiv.hide();
    });
}


$(document).on("click", ".assessment-grid-modal-dismiss", function () {
    $("#assessmentsModal").hide();
});