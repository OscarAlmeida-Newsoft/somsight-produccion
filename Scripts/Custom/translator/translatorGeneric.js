$(document).on('click', '#addTranslator', function () {
    loadingDiv.show();
    $('#createTranslationModal').show();
    $.ajax({
        url: $(this).attr('href'),
        type: 'GET'
    })
        .done(function (data) {
            $('#CreateTranslator').html(data);
            $('#createTranslationModal').modal({
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


//Para cerrar modal sin afectar si hay modales anidados abiertos
$(document).on('click', '#btnclose', function () {
    // do something…
    debugger;
    $('#searchTextIdentifierModal').hide();
    var l = $('.modal-backdrop').length;

    if (l != 0) {
        $('.modal-backdrop')[l - 1].remove();
    }

    
});

//Para cerrar modal sin afectar si hay modales anidados abiertos
$(document).on('click', '#CloseAddTranslation', function () {
    // do something…
    debugger;
    $('#createTranslationModal').hide();
    var l = $('.modal-backdrop').length;

    if (l != 0) {
        $('.modal-backdrop')[l - 1].remove();
    }
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
                debugger;
                if (result.Status == "Error") {
                    alert(result.MessageText);
                } else {
                    $("#CloseAddTranslation").trigger("click");
                    $("#txtTextIdentifier").val(data.TextIdentifier);
                    CargarProductos();
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


$(document).on('click', '.ViewTextIdentifier', function () {
    txtTextIdentifierTag = $(this).data("textidentifier");
    debugger;
    if ($('#' + txtTextIdentifierTag).val() == '') {
        alert("TextIdentfier is empty");
    } else {

        var win = window.open($('#NS_UrlTranslation').text() + '?pTextIdentifier=' + $('#' + txtTextIdentifierTag).val(), '_blank');
        win.focus();
    }

    $.validator.unobtrusive.parse('#FormCreateEdit');
});

