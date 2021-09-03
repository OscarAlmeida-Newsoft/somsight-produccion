
$(document).on('click', '.getTrial', 'click', function () {
    $(".opacidadtrial").show();
    $("#modalConfirmTrial").show();
});

$(document).on('click', '.closeModalTrial, .cerrar', function () {
    $(".opacidadtrial").hide();
    $("#modalConfirmTrial").hide();
});

$(document).on('click', '#SendGetTrial', function () {
    loadingDiv.show();
    GetTrialCallback();
});

$(document).on('click', '.button', function () {
    $(".modal.alerta.blue").hide();
    location.reload(true);
    $(".opacidadtrial").hide();
    
});

function GetTrialCallback() {
    $.ajax({
        url: gGetUrlAction.urlTrial,
        type: 'POST',
    contentType: 'application/json; charset=utf-8'
})
.done(function (data) {
    if (data.exito == 1) {
        $("#modalConfirmTrial").hide();
        $(".modal.alerta.blue").show();
    } else {
        $("#modalConfirmTrial").hide();
        $(".opacidadtrial").hide();
        loadingDiv.hide();
        console.log('Ocurrio un Error');
        //toastMessage.show(exception, "alert-success");
        //alert('Error');
    }
})
.fail(function (jqXHR, exception) {
    toastMessage.show(exception, "alert-success");
})
.always(function () {
    loadingDiv.hide();
});
}