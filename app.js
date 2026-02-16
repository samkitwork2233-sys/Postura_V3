window.currentSessionData = {
    angle: 0,
    status: "GOOD",
    slouchCount: 0,
    totalSlouchTime: 0,
    score: 100
};

let lastStatus = "GOOD";
let slouchStartTime = null;
let ignoreBLE = false;

function handleData(event) {

    if (ignoreBLE) return;

    const decoder = new TextDecoder();
    const value = decoder.decode(event.target.value);
    const parts = value.split(",");

    if (parts.length !== 5) return;

    const angle = parts[0];
    const status = parts[3];   // GOOD or BAD

    window.currentSessionData.angle = angle;

    // Detect transition GOOD → BAD
    if (lastStatus === "GOOD" && status === "BAD") {
        window.currentSessionData.slouchCount++;
        slouchStartTime = Date.now();
    }

    // Detect transition BAD → GOOD
    if (lastStatus === "BAD" && status === "GOOD" && slouchStartTime) {
        const duration = Math.floor((Date.now() - slouchStartTime) / 1000);
        window.currentSessionData.totalSlouchTime += duration;
        slouchStartTime = null;
    }

    window.currentSessionData.status = status;

    // Calculate score
    let score = 100 - (window.currentSessionData.slouchCount * 5);
    if (score < 0) score = 0;

    window.currentSessionData.score = score;

    updateUI(window.currentSessionData);
    saveProfileData(currentProfile, window.currentSessionData);

    lastStatus = status;
}

function updateUI(data) {
    document.getElementById("angle").innerText = data.angle;
    document.getElementById("count").innerText = data.slouchCount;
    document.getElementById("time").innerText = data.totalSlouchTime;
    document.getElementById("status").innerText = data.status;
    document.getElementById("score").innerText = data.score;
}

function resetUI() {
    window.currentSessionData = {
        angle: 0,
        status: "GOOD",
        slouchCount: 0,
        totalSlouchTime: 0,
        score: 100
    };
    updateUI(window.currentSessionData);
}

document.getElementById("connectBtn").addEventListener("click", connectBLE);

document.getElementById("resetBtn").addEventListener("click", function () {
    window.currentSessionData = {
        angle: 0,
        status: "GOOD",
        slouchCount: 0,
        totalSlouchTime: 0,
        score: 100
    };
    sendCommand("RESET");
    updateUI(window.currentSessionData);
});
