$(document).ready(function () {

});

$(document).on('click', '#ConfirmImport', function (e) {
    event.preventDefault();
    var Translations = [];

    $("#tbodyImportTranslation tr").each(function (index, element) {

        var textIdentifier = $(this).data("textidentifier");
        var defaultText = $(this).data("defaulttext");
        var description = $(this).data("description");
        var classification = $(this).data("classification");
        var translation = $(this).data("translation");
        var error = $(this).data("error");
        var languagecode = $(this).data("languagecode");
        
        

        if (error == "" || error == null) {
            item = {};

            item.LanguageCode = languagecode;
            item.TextIdentifier = textIdentifier;
            item.DefaultText = defaultText;
            item.Description = description;
            item.Classification = classification;
            item.Translation = translation;

            Translations.push(item);
        }
                

    });


    if (Translations.length == 0) {
        toastMessage.show("There aren't items to import","alert-warning");
        return;
    }


    loadingDiv.show();
    $.ajax({
        url: $(this).attr('href'),
        type: 'POST',
        data: JSON.stringify(Translations),
        contentType: 'application/json; charset=utf-8'
    })
    .done(function (data) {
        $("#ImportTranslation").html(data)
    })
    .fail(function (jqXHR, exception) {
        toastMessage.show('An error ocurred while the translations was uploading.', 'alert-warning')
    })
    .always(function () {
        loadingDiv.hide();
    });


    return false;
});


$(document).on('click', '#btnSave', function (e) {
    event.preventDefault();
    loadingDiv.show();
    var formData = new FormData();
    formData.append("pLanguageId", $("#languageId")[0].value);
    formData.append("someFile", $("#fileInput")[0].files[0]);
    


    $.ajax({
        url: $(this).attr('href'),
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false
    })
    .done(function (data) {
        $("#ImportTranslation").html($("#accordionImport").html())

        data.data.forEach(function (element) {
            $("#tbodyImportTranslation").append(`<tr data-textidentifier="${element.TextIdentifier}" data-defaulttext="${element.DefaultText}" data-description="${element.Description}" data-classification="${element.Classification}" data-translation="${element.Translation}" data-error="${element.ErrorDescription}" data-languagecode="${element.LanguageCode}" class ="table-item"><td>${element.Fila}</td><td>${element.TextIdentifier}</td><td class="default-text-class"></td><td>${element.Description}</td><td>${element.Classification}</td><td class="translation-text-class"></td><td>${element.ActionTranslatorAdministrator}</td><td>${element.ActionTranlationByLanguage}</td><td class="text-danger">${element.ErrorDescription}</td></tr>`)
            var tr = $("#tbodyImportTranslation tr").last();
            tr.find(".default-text-class").text(element.DefaultText);
            tr.find(".translation-text-class").text(element.Translation);
            
        });
         
        $('#labelLanguageCode').text(selectedLanguage);
        //$('#Filter').html(data);
        //$('#filterModal').modal({ backdrop: "static" }, { keyboard: false });
    })
    .fail(function (jqXHR, exception) {
        toastMessage.show('An error ocurred while the file was uploading.', 'alert-warning')
        //$('#vermasdiv').text(TextError(jqXHR, exception));
        //$('#FailModal').modal({ backdrop: "static" }, { keyboard: false });
    })
    .always(function () {
        loadingDiv.hide();
    });
});