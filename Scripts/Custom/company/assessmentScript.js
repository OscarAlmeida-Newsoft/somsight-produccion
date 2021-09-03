var SelectedAssessmentTypeId;
var SelectedAssessmentVersion;

$(document).ready(function () {

    $(".view-assessment").click(function () {
        SelectedAssessmentTypeId = $(this).data("assessmenttypeid");
        SelectedAssessmentVersion = $(this).data("assessmentversion");
        alert("Hola, presiono View con: " + SelectedAssessmentTypeId + " y " + SelectedAssessmentVersion)
    });

    $(".assesment-confirm-button").click(function () {
        var thisElement = this;
        SelectedAssessmentTypeId = $(thisElement).data("assessmenttypeid");
        SelectedAssessmentVersion = $(thisElement).data("assessmentversion");

        if ($(thisElement).data("hasuploadrecommendation") == 'False') {
            toastr.error('To confirm the recommendations you must first upload a file!', 'Error!')
            return;
        }

        loadingDiv.show();
        $.ajax({
            url: $('#NS_ConfirmAssessmentRecommendation').text() + "?pUserId=" + $("#NS_UserId").text() + "&pAssessmentTypeId=" + SelectedAssessmentTypeId + "&pAssessmentVersion=" + SelectedAssessmentVersion,
            type: 'POST',
            contentType: 'application/json; charset=utf-8'
        })
        .done(function (data) {
            if (data.exito == 1) {
                $(thisElement).addClass("hidden")
                $(thisElement).siblings().removeClass("hidden")
                $(thisElement).parent().parent().siblings().find(".message-box .confirmed").removeClass("hidden");
                $(thisElement).parent().parent().siblings().find(".message-box .pending").addClass("hidden");
                toastr.success('The recommendations were confirmed successfully!', 'Success!')
            }
            else if (data.exito == 2) {
                toastr.error('An unexpected error has occurred', 'Error!')
            }
        })
        .fail(function (jqXHR, exception) {
            toastr.error('An unexpected error has occurred', 'Error!')
        })
        .always(function () {
            loadingDiv.hide();
        });
    });

    $(".assesment-unconfirm-button").click(function () {
        var thisElement = this;
        SelectedAssessmentTypeId = $(thisElement).data("assessmenttypeid");
        SelectedAssessmentVersion = $(thisElement).data("assessmentversion");

        loadingDiv.show();
        $.ajax({
            url: $('#NS_UnconfirmAssessmentRecommendation').text() + "?pUserId=" + $("#NS_UserId").text() + "&pAssessmentTypeId=" + SelectedAssessmentTypeId + "&pAssessmentVersion=" + SelectedAssessmentVersion,
            type: 'POST',
            contentType: 'application/json; charset=utf-8'
        })
        .done(function (data) {
            if (data.exito == 1) {
                $(thisElement).addClass("hidden")
                $(thisElement).siblings().removeClass("hidden")
                $(thisElement).parent().parent().siblings().find(".message-box .confirmed").addClass("hidden");
                $(thisElement).parent().parent().siblings().find(".message-box .pending").removeClass("hidden");
                toastr.warning('The recommendations were unconfirmed successfully!', 'Success!')
            }
            else if (data.exito == 2) {
                toastr.error('An unexpected error has occurred', 'Error!')
            }
        })
        .fail(function (jqXHR, exception) {
            toastr.error('An unexpected error has occurred', 'Error!')
        })
        .always(function () {
            loadingDiv.hide();
        });



    });

    

});