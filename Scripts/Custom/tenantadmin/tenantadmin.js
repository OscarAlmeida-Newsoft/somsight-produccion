var pageNumber = 1;
var pageSize = 50;

var selectedItem = {};
var editMainImagesUrl = '';
var editFaviconImagesUrl = '';

var pFilterModel = {
    Name: '',
    TenantSubdomain: '',
    TenantContactName: '',
    TenantContactEmail1: '',
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

$(document).on('click', '#refreshTable', function (e) {
    GridCallback();
    return false;
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

//edit record
$(document).on('click', '#editRecord', function (e) {
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

$(document).on("change", "#color-picker-control", function () {
    $("#color-picker-text").val(this.value);
})

$(document).on("change paste keyup", "#color-picker-text", function () {
    $("#color-picker-control").val($('#color-picker-text').val())
})


// primaryColor -  SecondaryColor  - TertiaryColor
$(document).on("change", "#color-picker-control-primaryColor", function () {
    $("#color-picker-text-primaryColor").val(this.value);
})

$(document).on("change paste keyup", "#color-picker-text-primaryColor", function () {
    $("#color-picker-control-primaryColor").val($('#color-picker-text-primaryColor').val());
})

$(document).on("change", "#color-picker-control-SecondaryColor", function () {
    $("#color-picker-text-SecondaryColor").val(this.value);
})

$(document).on("change paste keyup", "#color-picker-text-SecondaryColor", function () {
    $("#color-picker-control-SecondaryColor").val($('#color-picker-text-SecondaryColor').val());
})

$(document).on("change", "#color-picker-control-TertiaryColor", function () {
    $("#color-picker-text-TertiaryColor").val(this.value);
})

$(document).on("change paste keyup", "#color-picker-text-TertiaryColor", function () {
    $("#color-picker-control-TertiaryColor").val($('#color-picker-text-TertiaryColor').val());
})

//Radio Butons
$(document).on('click', '#radioBtn a', function () {
    //$('#radioBtn a').on('click', function () {
    var sel = $(this).data('title');
    var tog = $(this).data('toggle');
    $('#' + tog).prop('value', sel);
    $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
    $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
});





//edit record
$(document).on('click', '#editImagesRecord', function (e) {
    if (selectedItem.id === undefined) {
        toastMessage.show('Please select a record', 'alert-warning')
        //alert('Please select a record');
        return false;
    }

    editMainImagesUrl = $(this).attr('href');

    LoadEditImages();
    
    return false;
});


function LoadEditImages() {
    loadingDiv.show();
    $.ajax({
        url: editMainImagesUrl + '?pId=' + selectedItem.id,
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
        loadingDiv.hide();
    });
}





function OnBeginEdit() {
    loadingDiv.show();
}

function OnCompleteEdit() {
    GridCallback();
    loadingDiv.hide();
}

function OnSuccessEdit() {
}

function OnFailureEdit() {
}


/*Images Upload*/
$(document).on("click", ".upload-tenant-logo-1", function () {

    $('#images-tenant-logo-1').val("");
    $("#images-tenant-logo-1").click();
});

$(document).on("change", "#images-tenant-logo-1", function () {
    var files = $("#images-tenant-logo-1")[0].files;
    var extensions = ["png"];

    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {

            var fileExt = files[i].name.slice((files[i].name.lastIndexOf(".") - 1 >>> 0) + 2);
            var fileExt = fileExt.toLowerCase();

            if (!extensions.includes(fileExt)) {
                toastr.error('Select a file with the allowed extension (.png)', 'Error!')
                $('#images-tenant-logo-1').val("");
                return;
            }
        }
    }

    var inputFileImages = $('#images-tenant-logo-1')[0].files;

    

    loadingDiv.show();

    var images = new FormData();
    images.append("file", inputFileImages[0])
    images.append("pSelectedTenantId", selectedItem.id);

    $.ajax({
        url: $('#NS_UrlActionSubmitFile').text(),
        data: images,
        type: 'POST',
        processData: false,
        contentType: false,
    }).done(function (data) {
        $('#images-tenant-logo-1').val("");
        loadingDiv.hide();
        if (data.exito == 1) {
            toastr.success('The primary image was successfully uploaded', 'Success!');
            LoadEditImages();
        } else if (data.exito == 2) {
            toastr.error('Select a file with the allowed extension (.png)', 'Error!')
        } else {
            toastr.error('An unexpected error has occurred', 'Error!');
        }
    }).fail(function (err) {
        $('#images-tenant-logo-1').val("");
        loadingDiv.hide();
        toastr.error('An unexpected error has occurred', 'Error!');
    });
});


$(document).on("click", ".upload-tenant-favicon", function () {

    $('#images-tenant-favicon').val("");
    $("#images-tenant-favicon").click();
});

$(document).on("change", "#images-tenant-favicon", function () {
    var files = $("#images-tenant-favicon")[0].files;
    var extensions = ["ico"];

    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {

            var fileExt = files[i].name.slice((files[i].name.lastIndexOf(".") - 1 >>> 0) + 2);
            var fileExt = fileExt.toLowerCase();

            if (!extensions.includes(fileExt)) {
                toastr.error('Select a file with the allowed extension (.ico)', 'Error!')
                $('#images-tenant-favicon').val("");
                return;
            }
        }
    }

    var inputFileImages = $('#images-tenant-favicon')[0].files;



    loadingDiv.show();

    var images = new FormData();
    images.append("file", inputFileImages[0])
    images.append("pSelectedTenantId", selectedItem.id);

    $.ajax({
        url: $('#NS_UrlActionSubmitFileFavicon').text(),
        data: images,
        type: 'POST',
        processData: false,
        contentType: false,
    }).done(function (data) {
        $('#images-tenant-favicon').val("");
        loadingDiv.hide();
        if (data.exito == 1) {
            toastr.success('The favicon was successfully uploaded', 'Success!')
            LoadEditImages();
        } else if (data.exito == 2) {
            toastr.error('Select a file with the allowed extension (.ico)', 'Error!')
        } else {
            toastr.error('An unexpected error has occurred', 'Error!');
        }
    }).fail(function (err) {
        $('#images-tenant-favicon').val("");
        loadingDiv.hide();
        toastr.error('An unexpected error has occurred', 'Error!');
    });
});

$(document).on('click', '#add', function () {
    loadingDiv.show();
    $.ajax({
        url: $(this).attr('href'),
        type: 'GET'
    })
    .done(function (data) {
        $('#Create').html(data);
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
    pFilterModel.Name = $('#filterName').val();
    pFilterModel.TenantSubdomain = $('#filterSubdomain').val();
    pFilterModel.TenantContactName = $('#filterContactName').val();
    pFilterModel.TenantContactEmail1 = $('#filterContactEmail').val();
    pFilterModel.AllTenant = (typeof ($("#filterAllTenant:checked")[0]) != "undefined") ? true : false;
    pFilterModel.filtered = true;

    pageNumber = 1;

    GridCallback();
});

$(document).on('click', '#btnClearFilter', function () {
    pFilterModel = {};
    pFilterModel.filtered = false;
    pageNumber = 1;

    GridCallback();
});


//UPLOAD IMAGES MODULE***********************************************************************************

//record image Module
$(document).on('click', '#editImagesModule', function (e) {
    if (selectedItem.id === undefined) {
        toastMessage.show('Please select a record', 'alert-warning')
        return false;
    }
    editMainImagesUrl = $(this).attr('href');
    LoadEditImagesModule();
    return false;
});


function LoadEditImagesModule() {
    loadingDiv.show();
    $.ajax({
        url: editMainImagesUrl + '?pId=' + selectedItem.id,
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
        loadingDiv.hide();
    });
}

/*Images Upload*/

var moduleId;

$(document).on("click", ".upload-module-image", function () {
    $('#images-module-upload').val("");

    moduleId = $(this).attr('id');

    $("#images-module-upload").click();
});

$(document).on("change", "#images-module-upload", function () {
    var files = $("#images-module-upload")[0].files;
    var extensions = ["png"];

    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {

            var fileExt = files[i].name.slice((files[i].name.lastIndexOf(".") - 1 >>> 0) + 2);
            var fileExt = fileExt.toLowerCase();

            if (!extensions.includes(fileExt)) {
                toastr.error('Select a file with the allowed extension (.png)', 'Error!')
                $('#images-module-upload').val("");
                return;
            }
        }
    }

    var inputFileImages = $('#images-module-upload')[0].files;

    loadingDiv.show();

    var images = new FormData();
    images.append("file", inputFileImages[0])
    images.append("pSelectedTenantId", selectedItem.id);
    images.append("pModuleId", moduleId);

    $.ajax({
        url: $('#NS_UrlActionSubmitFileModule').text() + '?pModuleId=' + moduleId,
        data: images,
        type: 'POST',
        processData: false,
        contentType: false,
    }).done(function (data) {
        $('#images-module-upload').val("");
        loadingDiv.hide();
        if (data.exito == 1) {
            toastr.success('The primary image was successfully uploaded', 'Success!');
            LoadEditImages();
        } else if (data.exito == 2) {
            toastr.error('Select a file with the allowed extension (.png)', 'Error!')
        } else {
            toastr.error('An unexpected error has occurred', 'Error!');
        }
    }).fail(function (err) {
        $('#images-module-upload').val("");
        loadingDiv.hide();
        toastr.error('An unexpected error has occurred', 'Error!');
    });
});