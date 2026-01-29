const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("passwordError").textContent = "";
  document.getElementById("successMsg").textContent = "";

  let valid = true;

  if (name === "") {
    document.getElementById("nameError").textContent = "Name is required";
    valid = false;
  }

  if (email === "") {
    document.getElementById("emailError").textContent = "Email is required";
    valid = false;
  } else if (!email.includes("@")) {
    document.getElementById("emailError").textContent = "Invalid email format";
    valid = false;
  }

  if (password === "") {
    document.getElementById("passwordError").textContent = "Password is required";
    valid = false;
  } else if (password.length < 6) {
    document.getElementById("passwordError").textContent = "Minimum 6 characters required";
    valid = false;
  }

  if (!valid) return;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push({ name, email, password });

  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("successMsg").textContent = "Registration Successful!";

  form.reset();
});
