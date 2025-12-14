export let CURRENT_KEY = generateKey();

function generateKey() {
  return Math.random().toString(36).substring(2, 10);
}

setInterval(() => {
  CURRENT_KEY = generateKey();
  console.log("NEW KEY:", CURRENT_KEY);
}, 1000 * 60 * 60 * 24);