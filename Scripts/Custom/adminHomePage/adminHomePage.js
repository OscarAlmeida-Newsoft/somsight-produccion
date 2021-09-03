var pageNumber = 1;
var pageSize = 50;

var selectedItem = {};

var pFilterModel = {
    ImageName: '',
    ModuleId: null,
    filtered: false,
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

function On_Begin() {
    loadingDiv.show();
}

function OnSuccess() {
    selectedItem = {};
    loadingDiv.hide();
    GridCallback();
}

//refreshTable
$(document).on('click', '#refreshTable', function (e) {
    GridCallback();
    return false;
});

//Add new record
$(document).on('click', '#addHomePage', function () {
    loadingDiv.show();
    $.ajax({
        url: $(this).attr('href'),
        type: 'GET'
    })
    .done(function (data) {
        $('#CreateHomePage').html(data);
        $('#CreateModal').modal({ backdrop: "static" }, { keyboard: false });
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

//edit record
$(document).on('click', '#editRecord', function (e) {
    if (selectedItem.id === undefined) {
        toastMessage.show('Please select a record', 'alert-warning')
        //alert('Please select a record');
        return false;
    }

    //loadingDiv.show();
    $.ajax({
        url: $(this).attr('href') + '?pIdRegion=' + selectedItem.id,
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



