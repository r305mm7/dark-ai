async function login() {
  const key = document.getElementById("key").value;

  const res = await fetch("/verify-key", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key })
  });

  const data = await res.json();
  if (data.success) {
    localStorage.setItem("ACCESS_KEY", key);
    window.location.href = "/index.html";
  } else {
    document.getElementById("msg").innerText = "❌ مفتاح خاطئ";
  }
}