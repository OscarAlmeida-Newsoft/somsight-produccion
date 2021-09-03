$(document).ready(function () {
    var selectedDigitalTransformationIdToDelete = 0;

    $(document).on('click', '.digitaltrans a.add, .edit_digitaltrans', function () {

        loadingDiv.show();
        $.ajax({
            url: $(this).attr('href'),
            type: 'GET',
            cache: false,
            success: function (result) {
                $('.contenedor_add_to_current_digitaltrans').html(result);
                //$('#windowsModal').modal({ backdrop: "static" }, { keyboard: false });
                //$.validator.unobtrusive.parse('#FormCreateEdit');
                quita_scroll_del_body();
                $(".opacidad").show();
                $(".contenedor_add_to_current_digitaltrans").show();
                $(".modal.add_to_current_digitaltrans").show();
                $.validator.unobtrusive.parse('#CreateDigitalTransformationForm');

                loadingDiv.hide();
            },
            error: function (error) {
                loadingDiv.hide();
                console.log(error);
            }
        });
        return false;
    });

    $(document).on('click', '.digitaltrans a.delete', function () {
        selectedDigitalTransformationIdToDelete = $(this).data('digitaltransformationid');

        $('.opacidad').show();
        $('#modalConfirmDigitalTransformation').css('z-index', 10001);
        $('#modalConfirmDigitalTransformation').show();
        return false;
    });

    $(document).on('click', '#modalConfirmDigitalTransformation .cancel-button', function () {

        $('.opacidad').hide();
        $('#modalConfirmDigitalTransformation').hide();
    });

    $(document).on('click', '#delete-digitaltransformation-ok', function () {
        $.ajax({
            url: $('#NS_DeleteDigitalTransformationURLCallback').text() + "?pDigitalTransformationId=" + selectedDigitalTransformationIdToDelete,
            //data: JSON.stringify(pFilterModel),
            type: 'POST',
            contentType: 'application/json; charset=utf-8'
        })
       .done(function (data) {
           $('.opacidad').hide();
           $('#modalConfirmDigitalTransformation').hide();
           OnDigitalTransformationCreationSuccess();
       })
       .fail(function (jqXHR, exception) {
           console.log(exception);
       })
       .always(function () {
           loadingDiv.hide();
       });
    });
});

function OnDigitalTransformationCreationSuccess() {
    processId = $('.ii_processes li.activo h5').data('processid');
    LoadProblemsAndDigitalTransformation(processId);
    loadingDiv.hide();
}

function OnDigitalTransformationCreationBegin() {
    CloseCreateProcessModal();
    loadingDiv.show();
}