$(document).on('click', '#SendAssessmentDraft', function () {
    loadingDiv.show();
    $('#pQuestionAnswersModelIsFinal').val(false);
    //$('#AssessmentQuestionsForm').submit();
    gAnalytics.throwFormEvent('Click Save Draft', 'Assestments', $(this).data().eventLabel, $('#AssessmentQuestionsForm'));

    return false;

});

$(document).on('click', '#SendAssessmentFinal', function () {
    //var answerQuestions = $('input[type=radio]:checked').length;
    var answerQuestions = $('input[type=radio]:checked:not(input[disabled=disabled])').length

    if (answerQuestions != totalQuestions) {
        $("#opacidad").show();
        $("#modalNotCompleted").show();


    } else {
        $("#opacidad").show();
        $("#modalConfirm").show();
    }
});


$(document).on('click', '#SendAssessmentFinalOk', function () {
    loadingDiv.show();
    $('#pQuestionAnswersModelIsFinal').val(true);
    //$('#AssessmentQuestionsForm').submit();
    gAnalytics.throwFormEvent('Click End', 'Assestments', $(this).data().eventLabel, $('#AssessmentQuestionsForm'));
});

$(document).on('click', '#FreeSendAssessmentFinalOk', function () {
    loadingDiv.show();
    $('#pQuestionAnswersModelIsFinal').val(true);
    //$('#AssessmentQuestionsForm').submit();
    gAnalytics.throwFormEvent('Click End', 'Free Assestments', $(this).data().eventLabel, $('#AssessmentQuestionsForm'));
});

$(document).on('click', '#modalConfirm .cerrar', function () {
    $("#opacidad").hide();
    $("#modalConfirm").hide();
});


//Cancel Modal
$(document).on('click', '#modalConfirm .cancel-button', function () {
    $("#opacidad").hide();
    $("#modalConfirm").hide();
});

$(document).on('click', '#modalNotCompleted', function () {
    $("#opacidad").hide();
    $("#modalNotCompleted").hide();
});

$(document).on('change', 'input[type=radio]', function () {
    //answeredQuestions = $('input[type=radio]:checked').length
    answeredQuestions = $('input[type=radio]:checked:not(input[disabled=disabled])').length
    $('#answeredQuestions').text(answeredQuestions);
});