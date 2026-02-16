let currentProfile = "Father";

function switchProfile(profile) {

    // Save current profile session
    const currentData = {
        angle: document.getElementById("angle").innerText,
        count: document.getElementById("count").innerText,
        time: document.getElementById("time").innerText,
        status: document.getElementById("status").innerText,
        score: document.getElementById("score").innerText
    };

    saveProfileData(currentProfile, currentData);

    currentProfile = profile;
    document.getElementById("activeProfile").innerText = profile + " Dashboard";

    // Reset device session to avoid mixing
    sendCommand("RESET");

    // Reset UI first
    resetUI();

    // Load stored data if exists
    const saved = loadProfileData(profile);
    if (saved) {
        updateUI(saved);
    }

    // Load profile threshold
    const threshold = loadThreshold(profile);
    document.getElementById("thresholdSlider").value = threshold;
    document.getElementById("thresholdValue").innerText = threshold;

    sendCommand("TH:" + threshold);
}

document.getElementById("profileSelect").addEventListener("change", function () {
    switchProfile(this.value);
});
