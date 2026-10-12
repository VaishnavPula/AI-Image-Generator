const promptInput = document.getElementById("prompt");
const charCount = document.getElementById("charCount");

const generateForm = document.getElementById("generateForm");
const generateBtn = document.getElementById("generateBtn");

const emptyState = document.getElementById("emptyState");
const loadingState = document.getElementById("loadingState");
const generatedImage = document.getElementById("generatedImage");

const resultActions = document.getElementById("resultActions");
const downloadBtn = document.getElementById("downloadBtn");
const galleryGrid = document.getElementById("galleryGrid");

const newProjectBtn = document.getElementById("newProjectBtn");


// 1. Character counter
promptInput.addEventListener("input", function () {
    charCount.textContent = `${promptInput.value.length} / 2000`;
});


// 2. New creation button
newProjectBtn.addEventListener("click", function () {
    promptInput.value = "";
    charCount.textContent = "0 / 2000";

    generatedImage.src = "";
    generatedImage.hidden = true;

    emptyState.hidden = false;
    loadingState.hidden = true;
    resultActions.hidden = true;

    generateBtn.disabled = false;
    generateBtn.innerHTML =
        '<span>✦</span> Generate image <span class="button-arrow">↗</span>';

    promptInput.focus();

    document.getElementById("result").scrollIntoView({
        behavior: "smooth"
    });
});


// 3. Generate image form
generateForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const prompt = promptInput.value.trim();

    if (prompt === "") {
        alert("Please enter an image description.");
        return;
    }

    // Show loading animation
    emptyState.hidden = true;
    generatedImage.hidden = true;
    resultActions.hidden = true;
    loadingState.hidden = false;

    generateBtn.disabled = true;
    generateBtn.textContent = "Generating...";

    try {
        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: prompt,
                imageSize: document.getElementById("imageSize").value,
                style: document.getElementById("style").value
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Image generation failed.");
        }

        if (!data.image) {
            throw new Error("The server did not return an image.");
        }

        // Display generated image
        generatedImage.onload = function () {
            loadingState.hidden = true;
            generatedImage.hidden = false;
            resultActions.hidden = false;

            downloadBtn.href = data.image;

            addToGallery(data.image, prompt);
        };

        generatedImage.onerror = function () {
            loadingState.hidden = true;
            emptyState.hidden = false;
            emptyState.querySelector("h3").textContent =
                "Unable to display the image.";

            alert("The image could not be loaded.");
        };

        generatedImage.src = data.image;

    } catch (error) {
        loadingState.hidden = true;
        emptyState.hidden = false;

        emptyState.querySelector("h3").textContent =
            "Something went wrong.";

        emptyState.querySelector("p").textContent = error.message;

        alert(error.message);

    } finally {
        generateBtn.disabled = false;
        generateBtn.innerHTML =
            '<span>✦</span> Generate image <span class="button-arrow">↗</span>';
    }
});


// 4. Add image to recent creations
function addToGallery(imageUrl, prompt) {
    const emptyMessage = galleryGrid.querySelector(".gallery-empty");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = prompt;

    const description = document.createElement("p");
    description.textContent = prompt;

    galleryItem.appendChild(image);
    galleryItem.appendChild(description);

    galleryGrid.prepend(galleryItem);
}