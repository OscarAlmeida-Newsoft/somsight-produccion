$(document).ready(function () {
    GridCallback();
    $(".opacidad.alerta").hide();
    $(".modal.alerta.blue").hide();
    $(".modal.alerta.red").hide();


    $(document).on('click', '#SaveTicket', function () {
        SaveTicket();
    });

    $(document).on('click', '.button', function () {
        $(".opacidad.alerta").hide();
        $(".modal.alerta.blue").hide();
        $(".modal.alerta.red").hide();
    });

});


function GridCallback() {
    loadingDiv.show();

    $.ajax({
        url: $('#NS_GridUrlActionGridCallBack').text(),
        type: 'POST',
        contentType: 'application/json; charset=utf-8'
    })
    .done(function (data) {
        $('#grid-div').html(data);
    })
    .fail(function (jqXHR, exception) {
        toastMessage.show(exception, "alert-success");
    })
    .always(function () {
        loadingDiv.hide();
    });
}

function SaveTicket() {
    loadingDiv.show();
    pModel = {
        MessageText : ''
    };

    if($('#SupportMessage').val() ===""){
        ShowValidationTextMessage();

        return;
    }

    pModel.MessageText = $('#SupportMessage').val();
    $.ajax({
        url: $('#NS_SaveSupportTicket').text(),
        type: 'POST',
        data: pModel
    })
    .done(function (data) {
        console.log(data);
        if (data.Error) {
            ShowErrorMessage();
        } else {
            ShowSuccessMessage();
            $('#SupportMessage').val('');
        }
        GridCallback();

    })
    .fail(function (jqXHR, exception) {
        console.log(exception);
        ShowErrorMessage();
    })
    .always(function () {
        loadingDiv.hide();
    });
}

function ShowErrorMessage() {
    $(".opacidad").show();
    $(".modal.alerta.red").show();
}

function ShowSuccessMessage() {
    $(".opacidad").show();
    $(".modal.alerta.blue").show();
}

function ShowValidationTextMessage() {
    loadingDiv.hide();
    $(".opacidad").show();
    $(".modal.alerta.red.texto").show();
}