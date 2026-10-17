const form = document.getElementById("feedbackForm");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const rating = document.getElementById("rating").value;
  const comment = document.getElementById("comment").value;

  const feedback = {
    name: name,
    rating: rating,
    comment: comment
  };

  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(feedback)
    });

    const result = await response.json();

    if (response.ok) {
      message.textContent = "Feedback submitted successfully!";
      form.reset();
    } else {
      message.textContent = result.message;
    }
  } catch (error) {
    message.textContent = "Please check the server connection.";
  }
});
