const year = new Date().getFullYear();

document.getElementById("copyYear").innerHTML = year;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

const searchRecepie = document.getElementById("searchRecepie");

searchRecepie.addEventListener("keyup", function (event) {
  const searchValue = event.target.value.toLowerCase();
  const noRecepies = document.getElementById("no-recepies");
  const noKeyword = document.getElementById("no-keyword");

  if(searchValue.length == 0) {
    noKeyword.style.display = "block";
    noRecepies.style.display = "none";
  }
  else {
    noKeyword.style.display = "none";
    noRecepies.style.display = "block";
  }
});