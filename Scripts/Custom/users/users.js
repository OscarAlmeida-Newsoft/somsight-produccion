var pageNumber = 1;
var pageSize = 50;

var selectedItem = {};

var pFilterModel = {
    Email: '',
    CompanyName: '',
    ContactName: '',
    RegisterOnInit: '',
    RegisterOnEnd: '',
    Client: '',
    filtered: false,
    CampaignId: null,
    SortBy: '',
    AllTenant: false
};

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
$(document).on('click', '#addUser', function () {
    loadingDiv.show();
    $.ajax({
        url: $(this).attr('href'),
        type: 'GET'
    })
    .done(function (data) {
        $('#CreateUser').html(data);
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

//edit record
$(document).on('click', '#editRecordUser', function (e) {
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
        $('#EditUser').html(data);
        $('#editModal').modal({ backdrop: "static" }, { keyboard: false });
        $.validator.unobtrusive.parse('#FormEditUser');
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

//remove dialog record
$(document).on('click', '#deleteUserConfirm', function (e) {
    if (selectedItem.id === undefined) {
        toastMessage.show('Please select a record', 'alert-warning')
        return false;
    }
    loadingDiv.show();
    $.ajax({
        url: $(this).attr('href') + '?pUserId=' + selectedItem.id,
        type: 'GET'
    })
    .done(function (data) {
        $('#RemoveUser').html(data);
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


function On_Begin() {
    loadingDiv.show();
}

function OnSuccess() {
    selectedItem = {};
    loadingDiv.hide();
    GridCallback();
}


//Pagination
$(document).on('click', '.NS-paginator li', function () {
    var clickedPage = $(this).data('page');
    if (clickedPage !== undefined) {
        pageNumber = clickedPage

        GridCallback();
    }
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
    pFilterModel.Email = $('#filterEmail').val();
    pFilterModel.CompanyName = $('#filterCompanyName').val();
    pFilterModel.ContactName = $('#filterContactName').val();
    pFilterModel.RegisterOnInit = $('#filterRegisterOnInit').val();
    pFilterModel.RegisterOnEnd = $('#filterRegisterOnEnd').val();
    pFilterModel.Client = $('#filterIsClient:checkbox:checked').length > 0;
    pFilterModel.filtered = true;
    pFilterModel.CampaignId = $('#filterCampaign').val();
    pFilterModel.AllTenant = (typeof ($("#filterAllTenant:checked")[0]) != "undefined") ? true : false;

    pageNumber = 1;

    GridCallback();
});

$(document).on('click', '#btnClearFilter', function () {
    pFilterModel = {};
    pFilterModel.filtered = false;
    GridCallback();
});

//Show User Assessments Grid
$(document).on('click', '#showUserAsssessments', function () {

    if (selectedItem.id === undefined) {
        toastMessage.show('Please select a record', 'alert-warning')
        //alert('Please select a record');
        return false;
    }

    LoadUserAssessmentsGrid($(this).attr('href'));
    return false;
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
        if (data.error ==="false") {
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

function LoadUserAssessmentsGrid(url){
    loadingDiv.show();
    $.ajax({
        url:  url + "?pUserId=" + selectedItem.id,
        type: 'POST'
    })
    .done(function (data) {
        $('#Assessments').html(data);
        $('#assessmentsModal').modal({ backdrop: "static" }, { keyboard: false });
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
