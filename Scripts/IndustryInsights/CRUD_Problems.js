$(document).ready(function () {
    var selectedProblemIdToDelete = 0;

    $(document).on('click', '.problems a.add, .edit_problem', function () {
        
        loadingDiv.show();
        $.ajax({
            url: $(this).attr('href'),
            type: 'GET',
            cache: false,
            success: function (result) {
                $('.contenedor_add_to_current').html(result);
                //$('#windowsModal').modal({ backdrop: "static" }, { keyboard: false });
                //$.validator.unobtrusive.parse('#FormCreateEdit');
                quita_scroll_del_body();
                $(".opacidad").show();
                $(".contenedor_add_to_current").show();
                $(".modal.add_to_current").show();
                $.validator.unobtrusive.parse('#CreateProblemForm');
                                
                loadingDiv.hide();
            },
            error: function (error) {
                loadingDiv.hide();
                console.log(error);
            }
        });
        return false;
    });

    $(document).on('click', '.problems a.delete', function () {
        selectedProblemIdToDelete = $(this).data('problemid');

        $('.opacidad').show();
        $('#modalConfirmProblem').css('z-index', 10001);
        $('#modalConfirmProblem').show();
        return false;
    });

    $(document).on('click', '#modalConfirmProblem .cancel-button', function () {

        $('.opacidad').hide();
        $('#modalConfirmProblem').hide();
    });

    $(document).on('click', '#delete-problem-ok', function () {
        $.ajax({
            url: $('#NS_DeleteProblemURLCallback').text() + "?pProblemId=" + selectedProblemIdToDelete,
            //data: JSON.stringify(pFilterModel),
            type: 'POST',
            contentType: 'application/json; charset=utf-8'
        })
       .done(function (data) {
           $('.opacidad').hide();
           $('#modalConfirmProblem').hide();
           OnProblemCreationSuccess();
       })
       .fail(function (jqXHR, exception) {
           console.log(exception);
       })
       .always(function () {
           loadingDiv.hide();
       });
    });
});

function OnProblemCreationSuccess() {
    processId = $('.ii_processes li.activo h5').data('processid');
    LoadProblemsAndDigitalTransformation(processId);
    loadingDiv.hide();
}

function OnProblemCreationBegin() {
    CloseCreateProcessModal();
    loadingDiv.show();
}