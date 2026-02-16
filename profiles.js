let currentProfile = "Father";
let ignoreBLE = false;

function switchProfile(profile) {

    ignoreBLE = true;  // stop BLE overwrite

    // Save current session data
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

    resetUI();

    const saved = loadProfileData(profile);
    if (saved) {
        updateUI(saved);
    }

    const threshold = loadThreshold(profile);
    document.getElementById("thresholdSlider").value = threshold;
    document.getElementById("thresholdValue").innerText = threshold;

    sendCommand("TH:" + threshold);

    // Re-enable BLE after delay
    setTimeout(() => {
        ignoreBLE = false;
    }, 800);
}

document.getElementById("profileSelect").addEventListener("change", function () {
    switchProfile(this.value);
});
