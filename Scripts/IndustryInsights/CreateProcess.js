$(document).ready(function () {




});

function OnProcessCreationSuccess() {
    LoadProcesses();
    loadingDiv.hide();
}

function OnProcessCreationBegin() {
    CloseCreateProcessModal();
    loadingDiv.show();
}

