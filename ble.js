let device;
let characteristic;

async function connectBLE() {
    try {
        device = await navigator.bluetooth.requestDevice({
            filters: [{ name: "POSTURA_V3" }],
            optionalServices: ["12345678-1234-1234-1234-1234567890ab"]
        });

        const server = await device.gatt.connect();
        const service = await server.getPrimaryService("12345678-1234-1234-1234-1234567890ab");
        characteristic = await service.getCharacteristic("abcdefab-1234-1234-1234-abcdefabcdef");

        await characteristic.startNotifications();
        characteristic.addEventListener("characteristicvaluechanged", handleData);

        document.getElementById("connectionStatus").innerText = "Connected";

    } catch (error) {
        alert("Connection Failed");
    }
}

function sendCommand(cmd) {
    if (!characteristic) return;
    const encoder = new TextEncoder();
    characteristic.writeValue(encoder.encode(cmd));
}
