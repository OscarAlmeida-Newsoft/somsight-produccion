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
/*******************************************
                Events
*******************************************/
$(document).ready(function () {
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


//Pagination
$(document).on('click', '.ModalTextIdentifier', function () {
    txtTextIdentifierTag = $(this).data("textidentifier");
    $('#searchTextIdentifierModal').show();
    $('#searchTextIdentifierModal').modal({ backdrop: "static" }, { keyboard: false });
    $("#txtTextIdentifier").val('');
    selectedItemTextIdentifier = {};
    CargarProductos();
    $.validator.unobtrusive.parse('#FormCreateEdit');
});


//Add new record
$(document).on('click', '#addAssessmentType', function () {
    loadingDiv.show();
    $('#CreateAssementType').html('');
    $('#EditAssessmentType').html('');

    $.ajax({
        url: $(this).attr('href'),
        type: 'GET'
    })
        .done(function (data) {
            $('#CreateAssementType').html(data);
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

$(document).on('click', '.ClearModalTextIdentifier', function () {
    txtTextIdentifierTag = $(this).data("textidentifier");
    $("#" + txtTextIdentifierTag).val("");
});

$(document).on('click', '#deleteAssessmentTypeConfirm', function (e) {
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
        $('#RemoveAssessmentType').html(data);
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

//edit record
$(document).on('click', '#editRecordAssessmentType', function (e) {
    if (selectedItem.id === undefined) {
        toastMessage.show('Please select a record', 'alert-warning')
        return false;
    }
    $('#CreateAssementType').html('');
    $('#EditAssessmentType').html('');

    $.ajax({
        url: $(this).attr('href') + '?pId=' + selectedItem.id,
        type: 'GET'
    })
        .done(function (data) {
            $('#EditAssessmentType').html(data);
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

//edit record
$(document).on('click', '#editImagesRecord', function (e) {
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
        $('#EditImages').html(data);
        $('#editImagesModal').modal({ backdrop: "static" }, { keyboard: false });
        $.validator.unobtrusive.parse('#FormEdit');
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

/*Images Upload*/
$(document).on("click", ".upload-image", function ()
{
    input = "#"+$(this).data("image");
    $(input).val("");
    $(input).click();
});

$(document).on("change", ".fileimage", function () {
    debugger;
    var files = $(this)[0].files;
    var extensions = $(this).data("accept").split("|");

    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {

            var fileExt = files[i].name.slice((files[i].name.lastIndexOf(".") - 1 >>> 0) + 2);
            var fileExt = fileExt.toLowerCase();

            if (!extensions.includes(fileExt)) {
                toastr.error('Select a file with the allowed extension image format', 'Error!')
                $(this).val("");
                return;
            }
        }
    }

    var inputFileImages = $(this)[0].files;

    loadingDiv.show();

    var images = new FormData();
    images.append("file", inputFileImages[0])
    images.append("pSelectedTenantId", selectedItem.id);
    images.append("accept", $(this).data("accept") );
    images.append("standarfilename", $(this).data("imagename") );

    $.ajax({
        url: $('#NS_UrlActionSubmitFile').text(),
        data: images,
        type: 'POST',
        processData: false,
        contentType: false,
    }).done(function (data) {
        $(this).val("");
        loadingDiv.hide();
        if (data.exito == 1) {
            //toastr.success('The image was successfully uploaded', 'Success!');
            $("#editImagesRecord").click();
        } else if (data.exito == 2) {
            toastr.error('Select a file with the allowed extension (.png)', 'Error!')
        } else {
            toastr.error('An unexpected error has occurred', 'Error!');
        }
    }).fail(function (err) {
        $(this).val("");
        loadingDiv.hide();
        toastr.error('An unexpected error has occurred', 'Error!');
    });
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
    //loadingDiv.show();
    $.ajax({
        url: $('#TextIdenfitiferAction').text(),
        type: 'POST',
        dataType: "json",
        data: {
            textIdentifier: $("#txtTextIdentifier").val(),
            DefaultText: $("#txtDefaultText").val(),
            Description: $("#txtDescripcion").val()}
    })
    .done(function (data) {
        if (data.Resultado)
            CrearGridTextIdentifier(data.Data);
    })
    .fail(function (jqXHR, exception) {
        $('#vermasdiv').text(TextError(jqXHR, exception));
        $('#FailModal').modal({ backdrop: "static" }, { keyboard: false });
    });
    /*.always(function () {
        loadingDiv.hide();
    });*/
    return false;
    
};

function CrearGridTextIdentifier(data)
{
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
}