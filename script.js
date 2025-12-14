const key = localStorage.getItem("ACCESS_KEY");
if (!key) window.location.href = "/login.html";

async function send() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");
  const msg = input.value;
  chat.innerHTML += `<p><b>أنت:</b> ${msg}</p>`;
  input.value = "";

  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg, key })
  });

  const data = await res.json();
  chat.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
}