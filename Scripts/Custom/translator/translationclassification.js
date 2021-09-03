var pageNumber = 1;
var pageSize = 50;

var selectedItem = {};

var pFilterModel = {
    Classification: '',
    filtered: false,
    SortBy: ''
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
};

$(document).on('click', '#refreshTable', function (e) {
    GridCallback();
    return false;
});

function On_Begin() {
    loadingDiv.show();
}

function OnSuccess() {
    debugger;
    selectedItem = {};
    loadingDiv.hide();
    $('#createModal').modal('toggle');
    $('#editModal').modal('toggle');
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

//Add new record
$(document).on('click', '#addTranslatorClass', function () {
    loadingDiv.show();
    $.ajax({
        url: $(this).attr('href'),
        type: 'GET'
    })
        .done(function (data) {
            $('#CreateTranslationClassification').html(data);
            $('#createModal').modal({ backdrop: "static" }, { keyboard: false });
            $.validator.unobtrusive.parse('#FormAdd');
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


//Pagination
$(document).on('click', '.NS-paginator li', function () {
    var clickedPage = $(this).data('page');
    if (clickedPage !== undefined) {
        pageNumber = clickedPage;

        GridCallback();
    }
});

$(document).on('change', '.items-per-page-select', function () {
    pageSize = $(this).val();
    pageNumber = 1;
    GridCallback();

});


//edit record
$(document).on('click', '#editTranslation', function (e) {
    if (selectedItem.id === undefined) {
        toastMessage.show('Please select a record', 'alert-warning');
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