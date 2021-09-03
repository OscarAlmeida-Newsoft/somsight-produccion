var pageNumber = 1;
var pageSize = 50;
var selectedItem = {};
var pFilterModel = {
    TextIdentifier: '',
    DefaultText: '',
    Classification: ''
};

var DownloadTranslationsUrl = '';
var ImportTranslationUrl = '';
var selectedLanguage = 1;


$(document).ready(function () {
    GridCallback();
});

//Perform the callback to reload all data in the datagrid
function GridCallback() {

    if (pFilterModel.TextIdentifier == "") {
        var TextIdentifier = $('#TextIdentifierOnLoad').text();

        if (TextIdentifier != null) {
            pFilterModel.TextIdentifier = TextIdentifier;
            $('#TextIdentifierOnLoad').text('');
        }
    }
    
        

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
            $('#FailModal').modal({
                backdrop: "static"
            }, {
                keyboard: false
            });
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

$(document).on('click', '#addTranslator', function (event) {
    event.preventDefault();    
    
    loadingDiv.show();  
    $('#createModal').show();
    $.ajax({
        url: $(this).attr('href'),
        type: 'GET'
    })
        .done(function (data) {
            
            $('#CreateTranslator').html(data);
            $('#createModal').modal({
                backdrop: "static"
            }, {
                keyboard: false
                });
            
            $.validator.unobtrusive.parse('#FormAdd');
        })
        .fail(function (jqXHR, exception) {
            $('#vermasdiv').text(TextError(jqXHR, exception));
            $('#FailModal').modal({
                backdrop: "static"
            }, {
                keyboard: false
            });
        })
        .always(function () {
            loadingDiv.hide();
        });
    return false;
});

$(document).on('click', '#btnSavetranslation', function () {
    $('#Edit').empty();
    debugger;
    if (oblig()) {
        loadingDiv.show();

        var data = {
            TextIdentifier: $("#TextIdentifier").val().trim(),
            DefaultText: $("#DefaultText").val().trim(),
            Description: $("#Description").val().trim(),
            Classification: $("#Classification").val().trim(),
            languagesJson: $("#languagesJson").val().trim(),
            Traduccions: tempSavedRecords
        };

        var repetido = false;
        var idiomas = [];
        $.each(tempSavedRecords, function (i, obj) {

            if (!repetido) {
                if (idiomas.length > 0) {
                    $.each(idiomas, function (key, value) {
                        if (!repetido) {
                            if (obj.LanguageCode == value) {
                                repetido = true;

                            } else {
                                idiomas.push(obj.LanguageCode);
                            }
                        }
                    });
                } else {
                    idiomas.push(obj.LanguageCode);
                }
                
            }            
        });

        if (repetido) {
            alert("Some of the translations are repeated at the language level");
            loadingDiv.hide();
            return;
        }

        $.ajax({
            url: $("#UrlSavetranslation").val(),
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8'
        })
            .done(function (result) {

                if (result.Status == "Error") {
                    alert(result.MessageText);
                } else {
                    $('#createModal').modal('toggle');
                    debugger;
                    //$('.createTranslationModal').hide();
                    //var l = $('.modal-backdrop').length;
                    //$('.modal-backdrop')[l - 1].remove();

                    GridCallback();


                    //$('#Translations').html(result);
                    //$('#TranslationsModal').modal({
                    //    backdrop: "static"
                    //}, {
                    //        keyboard: false
                    //});
                }

                
            })
            .fail(function (jqXHR, exception) {
                $('#vermasdiv').text(TextError(jqXHR, exception));
                $('#FailModal').modal({
                    backdrop: "static"
                }, {
                    keyboard: false
                });
            })
            .always(function () {
                loadingDiv.hide();
            });
    }
});

$(document).on('click', '#btnUpdatetranslation', function () {
    $('#CreateTranslator').empty();
    if (oblig()) {
        loadingDiv.show();

        var data = {
            Id: $("#Id").val(),
            TextIdentifier: $("#TextIdentifier").val(),
            DefaultText: $("#DefaultText").val(),
            Description: $("#Description").val(),
            Classification: $("#Classification").val().trim(),
            languagesJson: $("#languagesJson").val(),
            Traduccions: tempSavedRecords
        };

        var repetido = false;
        var idiomas = [];
        $.each(tempSavedRecords, function (i, obj) {

            if (!repetido) {
                if (idiomas.length > 0) {
                    $.each(idiomas, function (key, value) {
                        if (!repetido) {
                            if (obj.LanguageCode == value) {
                                repetido = true;

                            } else {
                                idiomas.push(obj.LanguageCode);
                            }
                        }
                    });
                } else {
                    idiomas.push(obj.LanguageCode);
                }

            }
        });

        if (repetido) {
            alert("Some of the translations are repeated at the language level");
            loadingDiv.hide();
            return;
        }


        $.ajax({
            url: $("#UrlUpdatetranslation").val(),
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8'
        })
            .done(function (result) {
                debugger;
                $('#editModal').modal('toggle');
                GridCallback();
                $('#Translations').html(result);
                $('#TranslationsModal').modal({
                    backdrop: "static"
                }, {
                    keyboard: false
                });
            })
            .fail(function (jqXHR, exception) {
                $('#vermasdiv').text(TextError(jqXHR, exception));
                $('#FailModal').modal({
                    backdrop: "static"
                }, {
                    keyboard: false
                });
            })
            .always(function () {
                loadingDiv.hide();
            });
    }
});

//edit record
$(document).on('click', '#editTranslation', function (e) {
    if (selectedItem.id === undefined) {
        toastMessage.show('Please select a record', 'alert-warning')
        return false;
    }
    //loadingDiv.show();
    $.ajax({
        url: $(this).attr('href') + '?pId=' + selectedItem.id,
        type: 'GET'
    })
        .done(function (data) {
            $('#Edit').html(data);
            $('#editModal').modal({
                backdrop: "static"
            }, {
                keyboard: false
            });
            $.validator.unobtrusive.parse('#FormEdit');
        })
        .fail(function (jqXHR, exception) {
            $('#vermasdiv').text(TextError(jqXHR, exception));
            $('#FailModal').modal({
                backdrop: "static"
            }, {
                keyboard: false
            });
        })
        .always(function () {
            //loadingDiv.hide();
        });
    return false;
});

$(document).on('click', '#btnClearFilter', function () {
    pFilterModel = {};
    pFilterModel.filtered = false;

    GridCallback();
});

$(document).on('click', '#btnFilter', function () {
    pFilterModel.TextIdentifier = $('#filterTextIdentifier').val();
    pFilterModel.DefaultText = $('#filterDefaultText').val();
    pFilterModel.Classification = $('#filterClassification').val();
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

$(document).on('click', '#refreshTable', function (e) {
    pFilterModel.TextIdentifier = '';
    pFilterModel.DefaultText = '';
    pFilterModel.Classification = '';
    GridCallback();
    return false;
});




function callApiRestData(siteUrl, method, payload, async) {
    method = method || 'GET';
    async = async || false;

    var ajaxOptions = {
        url: siteUrl,
        method: method,
        async: async,
        headers: {
            "Accept": "application/json;odata=verbose"
        },
    };

    if (method == "POST" || method == "MERGE" || method == "DELETE") {
        ajaxOptions.headers["X-RequestDigest"] = $("#__REQUESTDIGEST").val();
        ajaxOptions.contentType = "application/json;odata=verbose";
        if (method == "MERGE" || method == "DELETE") {
            ajaxOptions.headers["If-Match"] = "*";
        }
    }

    if (typeof payload != 'undefined')
        ajaxOptions.data = JSON.stringify(payload);

    return $.ajax(ajaxOptions);
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
}

function oblig() {
    var isValid = true;

    isValid = validarCampos($('#TextIdentifier'), 'text', isValid);
    isValid = validarCampos($('#DefaultText'), 'text', isValid);
    //isValid = validarCampos($('#Description'), 'text', isValid);
    isValid = validarCampos($('#Classification'), 'text', isValid);
    //isValid = validarCampos($('#languagesJson'), 'text', isValid);

    if (!isValid)
        alert('Incomplete Information');
    return isValid;
}

function validarCampos(obj, typeObj, isValid) {
    if (typeObj == 'text')
        (obj.val().trim() == '') ? (obj.css("border", "1px solid red"), isValid = false) : (obj.css("border", "1px solid #bdbdbd"));
    else if (typeObj == 'select')
        (obj.find('option:selected').val() == '0') ? (obj.css('border', '1px solid red'), isValid = false) : (obj.css('border', '1px solid #bdbdbd'))

    return isValid;
}

//Para cerrar modal sin afectar si hay modales anidados abiertos
$(document).on('click', '.modalTclose', function () {
    // do something…
    debugger;
    $('.createTranslationModal').hide();
    var l = $('.modal-backdrop').length;
    $('.modal-backdrop')[l - 1].remove();
});



//Show User Assessments Grid
$(document).on('click', '#ExportTranslation', function (event) {

    event.preventDefault();

    ImportTranslationUrl = '';
    DownloadTranslationsUrl = $(this).attr('href');
    //LoadUserAssessmentsGrid($(this).attr('href'));
    $('#implementedLanguagesModal').modal({ backdrop: "static" }, { keyboard: false });
    //$('#Languages').show();
    return false;
});


//import Dialog
$(document).on('click', '#ImportTranslationConfirm', function (e) {
    event.preventDefault();

    DownloadTranslationsUrl = '';
    ImportTranslationUrl = $(this).attr('href');

    $('#implementedLanguagesModal').modal({ backdrop: "static" }, { keyboard: false });

    return false;
});

$(document).on('click', '#btnSelectLanguage', function () {

    selectedLanguage = $('#selectedLanguageId').val();
    $('#implementedLanguagesModal').modal('hide');

    if (DownloadTranslationsUrl != '') {
        
        window.location.href = DownloadTranslationsUrl + "?pLanguageId=" + selectedLanguage;

    } else {
        OpenImportConfirm();
    }    
    

});


function OpenImportConfirm() {
    debugger;
    loadingDiv.show();

    $.ajax({
        url: ImportTranslationUrl,
        type: 'GET'
    })
    .done(function (data) {
        
        $('#ImportTranslation').html(data);
        $('#ImportTranslationsModal').modal({ backdrop: "static" }, { keyboard: false });
        $('#languageId').val(selectedLanguage);
    })
    .fail(function (jqXHR, exception) {
        $('#vermasdiv').text(TextError(jqXHR, exception));
        $('#FailModal').modal({ backdrop: "static" }, { keyboard: false });
    })
    .always(function () {
        loadingDiv.hide();
    });

    return false;
}