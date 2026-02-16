let currentProfile = "Father";

function switchProfile(profile) {
    currentProfile = profile;
    document.getElementById("activeProfile").innerText = profile + " Dashboard";

    let saved = loadProfileData(profile);
    if (saved) {
        updateUI(saved);
    } else {
        resetUI();
    }
}

document.getElementById("profileSelect").addEventListener("change", function () {
    switchProfile(this.value);
});
