window.currentSessionData = {
    angle: 0,
    count: 0,
    time: 0,
    status: "-",
    score: 100
};

function handleData(event) {

    if (ignoreBLE) return;

    const decoder = new TextDecoder();
    const value = decoder.decode(event.target.value);
    const parts = value.split(",");

    if (parts.length !== 5) return;

    const data = {
        angle: parts[0],
        count: parts[1],
        time: parts[2],
        status: parts[3],
        score: parts[4]
    };

    window.currentSessionData = data;

    updateUI(data);
}

function updateUI(data) {
    document.getElementById("angle").innerText = data.angle;
    document.getElementById("count").innerText = data.count;
    document.getElementById("time").innerText = data.time;
    document.getElementById("status").innerText = data.status;
    document.getElementById("score").innerText = data.score;
}

function resetUI() {
    const resetData = {
        angle: 0,
        count: 0,
        time: 0,
        status: "-",
        score: 100
    };

    window.currentSessionData = resetData;
    updateUI(resetData);
}

document.getElementById("connectBtn").addEventListener("click", connectBLE);

document.getElementById("resetBtn").addEventListener("click", function () {
    sendCommand("RESET");
    resetUI();
});
