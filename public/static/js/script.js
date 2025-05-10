const year = new Date().getFullYear();

document.getElementById("copyYear").innerHTML = year;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
