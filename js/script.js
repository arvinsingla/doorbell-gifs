window.addEventListener("load", () => {
  initializeGifDisplay();
  attachFormEventListener();
  loadExampleGifs();
});

function initializeGifDisplay() {
  const urlParams = new URLSearchParams(window.location.search);
  const gifUrl = urlParams.get("gif-url");
  if (gifUrl) {
    updateImageAndUrl(decodeURIComponent(gifUrl));
  }
}
function attachFormEventListener() {
  const gifForm = document.getElementById("gif-form");
  gifForm.addEventListener("submit", loadInputGif);
}
function updateImageAndUrl(gifUrl) {
  const doorbellGif = document.querySelector(".doorbell-gif");
  doorbellGif.src = gifUrl;
  doorbellGif.title = "Custom Gif";
  window.history.pushState(
    { path: gifUrl },
    "",
    `?gif-url=${encodeURIComponent(gifUrl)}`
  );
}

function loadInputGif(e) {
  e.preventDefault();
  const gifUrlInput = document.getElementById("gif-url");
  const gifUrl = gifUrlInput.value.trim();
  if (gifUrl) {
    updateImageAndUrl(gifUrl);
    gifUrlInput.value = "";
  }
}

function loadExampleGifs() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const contentDiv = document.getElementById("links");
      data.forEach((item) => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = item.name;
        link.addEventListener("click", () =>
          updateImageAndUrl(`gifs/${item.image}`)
        );
        contentDiv.appendChild(link);
      });
    })
    .catch((error) => {
      console.error("Error loading example GIFs:", error);
      alert("Failed to load example GIFs. Please try again later.");
    });
}
