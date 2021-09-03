var selectedButton;

$(document).ready(function () {
    $(".upload-assessment").click(function () {
        selectedButton = this;
        $('#images-productid').val("");
        $("#images-productid").click();
        SelectedAssessmentTypeId = $(this).data("assessmenttypeid");
        SelectedAssessmentVersion = $(this).data("assessmentversion");
    });

    $("#images-productid").change(function () {
        var files = $("#images-productid")[0].files;
        var extensions = ["pdf"];

        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {

                var fileExt = files[i].name.slice((files[i].name.lastIndexOf(".") - 1 >>> 0) + 2);
                var fileExt = fileExt.toLowerCase();

                if (!extensions.includes(fileExt)) {
                    showAlert(2);
                    $('#images-productid').val("");
                    return;
                }
            }
        }

        var inputFileImages = $('#images-productid')[0].files;


        loadingDiv.show();

        var images = new FormData();
        images.append("file", inputFileImages[0])
        images.append("pUserId", $("#NS_UserId").text());
        images.append("pAssessmentTypeId", SelectedAssessmentTypeId);
        images.append("pAssessmentVersion", SelectedAssessmentVersion);

        $.ajax({
            url: $('#NS_UrlActionSubmitFile').text(),
            data: images,
            type: 'POST',
            processData: false,
            contentType: false,
        }).done(function (data) {
            $('#images-productid').val("");
            loadingDiv.hide();
            showAlert(data.exito);
        }).fail(function (err) {
            $('#images-productid').val("");
            loadingDiv.hide();
            showAlert(3)
        });
    });
});

function showAlert(code) {
    if (code == 1) {
        toastr.success('The .pdf was successfully uploaded', 'Success!')
        //Si se subio exitosamente la imagen se debe cambiar el icono
        
        //Muestra botón de ok
        $(selectedButton).parent().parent().siblings().find(".file-recommendation-div").children().eq(0).removeClass("hidden")
        //Esconde boton de None
        $(selectedButton).parent().parent().siblings().find(".file-recommendation-div").children().eq(1).addClass("hidden")
        $(selectedButton).parent().parent().siblings().find(".assesment-confirm-button").data("hasuploadrecommendation", "True")

    } else if (code == 2) {
        toastr.error('Select a file with the allowed extension (.pdf)', 'Error!')
    } else if (code == 3) {
        toastr.error('An unexpected error has occurred', 'Error!')
    }
}