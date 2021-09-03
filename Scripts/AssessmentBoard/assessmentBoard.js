

$(document).on('click', '.warning_advanced_assessment_open_modal', 'click', function () {
    hideAll();
    $(".opacidad").show();
    $("#modal-warning-advanced-assessment").show();
});

$(document).on('click', '.got_for_it_open_modal', 'click', function () {
    hideAll();
    $(".opacidad").show();
    $("#modal-assessment-advanced").show();
    //alert('');
});
$(document).on('click', '.full_try_open_modal', 'click', function () {
    hideAll();
    $(".opacidad").show();
    $("#modal-assessment-full-try").show();
    //alert('');
});
$(document).on('click', '.version_open_modal', 'click', function () {
    hideAll();
    $(".opacidad").show();
    $("#modal-assessment-version-basic").show();
    //alert('');
});

$(document).on('click', '.version_question_open_modal', 'click', function () {
    hideAll();
    $(".opacidad").show();
    $("#modal-assessment-version-basic-question").show();
    //alert('');
});

$(document).on('click', '.version_advanced_open_modal', 'click', function () {
    hideAll();
    $(".opacidad").show();
    $("#modal-assessment-version-advanced").show();
    //alert('');
});

$(document).on('click', '.version_advanced_question_open_modal', 'click', function () {
    hideAll();
    $(".opacidad").show();
    $("#modal-assessment-version-advanced-question").show();
    //alert('');
});


function hideAll() {
    //$(".opacidad").hide();
    $("#modal-warning-advanced-assessment").hide();
    $("#modal-assessment-advanced").hide();
    $("#modal-assessment-full-try").hide();
    $("#modal-assessment-version-basic").hide();
    $("#modal-assessment-version-basic-question").hide();
    $("#modal-assessment-version-advanced").hide();
    $("#modal-assessment-version-advanced-question").hide();

}


$(document).ready(function () {
    if (shouldSeeWarning == 'True') {
        $(".opacidad").show();
        $("#modal-assessment-advanced-recommendations").show();
    }
})
