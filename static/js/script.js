const form = document.getElementById("contactForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    message: form.message.value
  };

  const response = await fetch("/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (response.ok) {
    statusText.innerText = result.message;
    statusText.style.color = "green";
    form.reset();
  } else {
    statusText.innerText = result.error;
    statusText.style.color = "red";
  }
});