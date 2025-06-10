const resultDiv = document.getElementById('result');
const html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

// กล้อง
function onScanSuccess(decodedText) {
  resultDiv.textContent = "ผลลัพธ์จากกล้อง: " + decodedText;
  html5QrcodeScanner.clear();
}

html5QrcodeScanner.render(onScanSuccess);

// อัปโหลดภาพ
const input = document.getElementById('file-input');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

input.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      resultDiv.textContent = "ผลลัพธ์จากภาพ: " + code.data;
    } else {
      resultDiv.textContent = "ไม่พบ QR Code ในภาพ";
    }
  };
  img.src = URL.createObjectURL(file);
});