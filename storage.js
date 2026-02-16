function saveProfileData(profile, data) {
    localStorage.setItem("postura_" + profile, JSON.stringify(data));
}

function loadProfileData(profile) {
    const data = localStorage.getItem("postura_" + profile);
    return data ? JSON.parse(data) : null;
}

function saveThreshold(profile, value) {
    localStorage.setItem("postura_" + profile + "_threshold", value);
}

function loadThreshold(profile) {
    return localStorage.getItem("postura_" + profile + "_threshold") || 10;
}
