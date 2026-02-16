let currentProfile = "Father";
let ignoreBLE = false;

function switchProfile(profile) {

    ignoreBLE = true;

    // Save current session data properly
    if (window.currentSessionData) {
        saveProfileData(currentProfile, window.currentSessionData);
    }

    currentProfile = profile;
    document.getElementById("activeProfile").innerText = profile + " Dashboard";

    // Reset device
    sendCommand("RESET");

    // Reset UI immediately
    resetUI();

    // Load saved data for new profile
    const saved = loadProfileData(profile);
    if (saved) {
        window.currentSessionData = saved;
        updateUI(saved);
    } else {
        window.currentSessionData = {
            angle: 0,
            count: 0,
            time: 0,
            status: "-",
            score: 100
        };
    }

    // Load threshold
    const threshold = loadThreshold(profile);
    document.getElementById("thresholdSlider").value = threshold;
    document.getElementById("thresholdValue").innerText = threshold;

    sendCommand("TH:" + threshold);

    setTimeout(() => {
        ignoreBLE = false;
    }, 1000);
}

document.getElementById("profileSelect").addEventListener("change", function () {
    switchProfile(this.value);
});
