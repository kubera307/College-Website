const form = document.querySelector(".contact-form");
const statusText = document.getElementById("status");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeButton = document.querySelector(".image-modal-close");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");
let currentGalleryIndex = 0;
let modalGalleryImages = [];

if (form) {
  form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      message: form.message.value
    };

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        if (statusText) {
          statusText.innerText = result.message;
          statusText.style.color = "green";
        }
        form.reset();
      } else {
        if (statusText) {
          statusText.innerText = result.error || "Something went wrong.";
          statusText.style.color = "red";
        }
      }
    } catch (error) {
      if (statusText) {
        statusText.innerText = "Unable to send your enquiry right now.";
        statusText.style.color = "red";
      }
    }
  });
}

const galleryImages = document.querySelectorAll(".gallery img, #faculty .card img, .logo-image");
const gallerySlider = document.getElementById("gallerySlider");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");

modalGalleryImages = Array.from(galleryImages);

function openGalleryImage(index) {
  if (!modal || !modalImage || modalGalleryImages.length === 0) return;

  currentGalleryIndex = (index + modalGalleryImages.length) % modalGalleryImages.length;
  const image = modalGalleryImages[currentGalleryIndex];

  modalImage.src = image.src;
  modalImage.alt = image.alt;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

if (gallerySlider) {
  const scrollAmount = 320;

  if (galleryPrev) {
    galleryPrev.addEventListener("click", () => {
      gallerySlider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }

  if (galleryNext) {
    galleryNext.addEventListener("click", () => {
      gallerySlider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }
}

galleryImages.forEach((image, index) => {
  image.addEventListener("click", () => {
    currentGalleryIndex = index;
    openGalleryImage(index);
  });
});

if (modalPrev) {
  modalPrev.addEventListener("click", () => {
    openGalleryImage(currentGalleryIndex - 1);
  });
}

if (modalNext) {
  modalNext.addEventListener("click", () => {
    openGalleryImage(currentGalleryIndex + 1);
  });
}

if (closeButton && modal) {
  closeButton.addEventListener("click", () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
});
