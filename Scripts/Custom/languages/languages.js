/*******************************************
                statements
*******************************************/
var pageNumber = 1;
var pageSize = 50;
var selectedItem = {};
/*******************************************
                Events
*******************************************/
$(document).ready(function () {
    GridCallback();
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

//Pagination
$(document).on('click', '.NS-paginator li', function () {
    var clickedPage = $(this).data('page');
    if (clickedPage !== undefined) {
        pageNumber = clickedPage

        GridCallback();
    }
});

//Add new record
$(document).on('click', '#addLanguage', function () {
    loadingDiv.show();
    $.ajax({
        url: $(this).attr('href'),
        type: 'GET'
    })
        .done(function (data) {
            $('#CreateLanguage').html(data);
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
$(document).on('click', '#editRecordLanguage', function (e) {
    if (selectedItem.id === undefined) {
        toastMessage.show('Please select a record', 'alert-warning')
        return false;
    }

    $.ajax({
        url: $(this).attr('href') + '?pId=' + selectedItem.id,
        type: 'GET'
    })
        .done(function (data) {
            $('#EditLanguage').html(data);
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
$(document).on('click', '#deleteLanguageConfirm', function (e) {
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
            $('#RemoveLanguage').html(data);
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
    //console.log($('#GridListCallBack').text());
    loadingDiv.show();
    $.ajax({
        url: $('#GridListCallBack').text() + "?pPage=" + pageNumber + "&pPageSize=" + pageSize,
        //data: JSON.stringify(pFilterModel),
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
