let currentImageUrl = "";

function generateImage() {
  const prompt = document.getElementById("prompt").value;
  const image = document.getElementById("image");
  const status = document.getElementById("status");
  const downloadBtn = document.getElementById("downloadBtn");

  if (!prompt) {
    status.innerText = "Please enter a prompt!";
    return;
  }

  status.innerText = "Generating image... ⏳";

  // FREE AI IMAGE API
  const url = "https://image.pollinations.ai/prompt/" + encodeURIComponent(prompt);

  currentImageUrl = url;
  image.src = url;

  image.onload = () => {
    status.innerText = "Image Generated Successfully ✅";
    downloadBtn.style.display = "inline-block";
  };

  image.onerror = () => {
    status.innerText = "Error generating image ❌";
    downloadBtn.style.display = "none";
  };
}

// 🔥 DOWNLOAD FUNCTION
function downloadImage() {
  if (!currentImageUrl) return;

  fetch(currentImageUrl)
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "ai-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(() => {
      alert("Download failed!");
    });
}