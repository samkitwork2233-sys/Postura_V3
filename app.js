const SERVICE_UUID = "12345678-1234-1234-1234-1234567890ab";
const CHARACTERISTIC_UUID = "abcdefab-1234-1234-1234-abcdefabcdef";

let device;
let characteristic;

let profiles = {
  Father: createNewProfile(),
  Mother: createNewProfile(),
  Child: createNewProfile()
};

let currentProfile = "Father";

function createNewProfile() {
  return {
    slouchCount: 0,
    totalSlouchTime: 0,
    score: 100,
    threshold: 10,
    isSlouching: false,
    slouchStart: 0
  };
}

document.getElementById("profileSelect").addEventListener("change", function () {
  currentProfile = this.value;
  document.getElementById("dashboardTitle").innerText = currentProfile + " Dashboard";
  loadProfileData();
});

function loadProfileData() {
  let p = profiles[currentProfile];
  document.getElementById("slouchCount").innerText = p.slouchCount;
  document.getElementById("slouchTime").innerText = p.totalSlouchTime;
  document.getElementById("postureScore").innerText = p.score;
  document.getElementById("sensitivity").value = p.threshold;
  document.getElementById("sensitivityValue").innerText = p.threshold;
}

document.getElementById("connectBtn").addEventListener("click", async () => {
  try {
    device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [SERVICE_UUID] }]
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(SERVICE_UUID);
    characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

    document.getElementById("connectionStatus").innerText = "Connected";

    characteristic.startNotifications();
    characteristic.addEventListener("characteristicvaluechanged", handleData);

  } catch (error) {
    alert("Connection Failed");
  }
});

function handleData(event) {
  let value = new TextDecoder().decode(event.target.value);
  let angle = parseFloat(value);

  if (isNaN(angle)) return;

  document.getElementById("angle").innerText = angle;

  let p = profiles[currentProfile];

  if (angle > p.threshold) {
    document.getElementById("postureStatus").innerText = "Slouching";

    if (!p.isSlouching) {
      p.slouchCount++;
      p.slouchStart = Date.now();
      p.isSlouching = true;
    }
  } else {
    document.getElementById("postureStatus").innerText = "Good";

    if (p.isSlouching) {
      let duration = Math.floor((Date.now() - p.slouchStart) / 1000);
      p.totalSlouchTime += duration;
      p.isSlouching = false;
    }
  }

  p.score = Math.max(100 - p.totalSlouchTime, 0);

  loadProfileData();
}

document.getElementById("sensitivity").addEventListener("input", function () {
  let value = parseInt(this.value);
  profiles[currentProfile].threshold = value;
  document.getElementById("sensitivityValue").innerText = value;
});

document.getElementById("resetBtn").addEventListener("click", () => {
  profiles[currentProfile] = createNewProfile();
  loadProfileData();
});
