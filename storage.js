function saveProfileData(profile, data) {
    localStorage.setItem("postura_" + profile, JSON.stringify(data));
}

function loadProfileData(profile) {
    let data = localStorage.getItem("postura_" + profile);
    return data ? JSON.parse(data) : null;
}
