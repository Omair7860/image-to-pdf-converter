const { jsPDF } = window.jspdf;
let images = [];

document.getElementById('imageUpload').addEventListener('change', function (e) {
  handleFiles(e.target.files);
});

function handleFiles(files) {
  images = [];
  const preview = document.getElementById('preview');
  preview.innerHTML = '';
  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement('img');
      img.src = event.target.result;
      preview.appendChild(img);
      images.push(event.target.result);
    };
    reader.readAsDataURL(file);
  });
}

function handleDragOver(e) {
  e.preventDefault();
  document.getElementById('drop-zone').classList.add('dragover');
}
function handleDrop(e) {
  e.preventDefault();
  document.getElementById('drop-zone').classList.remove('dragover');
  if (e.dataTransfer.files) {
    handleFiles(e.dataTransfer.files);
  }
}

function generatePDF() {
  if (images.length === 0) return alert('Please upload at least one image.');
  const pdf = new jsPDF();
  const scale = parseInt(document.getElementById('scale').value) / 100;
  const border = parseInt(document.getElementById('border').value);
  const resFactor = parseInt(document.getElementById('resolution').value);

  images.forEach((imgData, index) => {
    const img = new Image();
    img.src = imgData;
    img.onload = function () {
      const width = img.width * scale / resFactor;
      const height = img.height * scale / resFactor;
      if (index !== 0) pdf.addPage();
      pdf.addImage(img, 'JPEG', border, border, width, height);
      if (index === images.length - 1) {
        pdf.save("converted.pdf");
      }
    };
  });
}
