import _ from "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js";

document.getElementById("copyYear").textContent = new Date().getFullYear();

const searchRecepie = document.getElementById("search-recepie");
const newListItem = document.getElementById("new-list-item");
const addToList = document.getElementById("add-to-list");
const noRecepies = document.getElementById("no-recepies");
const noKeyword = document.getElementById("no-keyword");
const offlineMessage = document.getElementById("offline-message");
const recepiesList = document.getElementById("recepies-list");
const buyList = document.getElementById("buy-list");

const request = indexedDB.open("buyListDb", 1);
let db;

request.onupgradeneeded = (event) => {
  db = event.target.result;

  const objectStore = db.createObjectStore("buyList", {
    keyPath: "id",
    autoIncrement: true,
  });

  objectStore.createIndex("name", "name", { unique: true });
  objectStore.createIndex("isChecked", "isChecked", { unique: false });
};

request.onsuccess = (event) => {
  db = event.target.result;
  loadBuyList();
};

request.onerror = (event) => {
  console.error("DB open error:", event.target.error);
};

const loadBuyList = () => {
  if (!db || !buyList) return;

  const transaction = db.transaction("buyList", "readonly");
  const store = transaction.objectStore("buyList");
  const getAll = store.getAll();

  getAll.onsuccess = () => {
    const items = getAll.result;
    buyList.innerHTML = "";

    if (!items || items.length === 0) {
      buyList.innerHTML = "<p>List is empty.</p>";
      return;
    }

    items.forEach(item => {
      const itemHTML = `
        <div class="list-item">
          <p>${item.name}</p>
          <div>
            <button>
              <img src="/static/icons/check-solid.svg" alt="Check" width="16" height="16">
            </button>
            <button>
              <img src="/static/icons/trash-solid.svg" alt="Delete" width="16" height="16">
            </button>
          </div>
        </div>
      `;
      buyList.innerHTML += itemHTML;
    });
  };

  getAll.onerror = (event) => {
    console.error("Error loading buy list:", event.target.error);
  };
};

const addToBuyList = (items) => {
  if (!db || !Array.isArray(items)) {
    console.error("DB not ready or invalid data");
    return;
  }

  const transaction = db.transaction("buyList", "readwrite");
  const store = transaction.objectStore("buyList");

  items.forEach(item => {
    const request = store.add(item);
    request.onerror = (e) => console.error("Add error:", item, e.target.error);
  });

  transaction.oncomplete = () => {
    loadBuyList();
  };
};

const updateOfflineStatus = () => {
  offlineMessage.style.display = "block";
  noRecepies.style.display = "none";
  noKeyword.style.display = "none";
};

const updateOnlineStatus = () => {
  offlineMessage.style.display = "none";
};

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOfflineStatus);

const handleSearchRecepies = async (event) => {
  const searchValue = event.target.value.toLowerCase();
  recepiesList.innerHTML = "";

  if (!navigator.onLine) {
    updateOfflineStatus();
    return;
  }

  if (searchValue.length === 0) {
    noKeyword.style.display = "block";
    noRecepies.style.display = "none";
    return;
  }

  try {
    const response = await fetch("/api/recepies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: searchValue }),
    });

    if (response.ok) {
      const recepies = await response.json();

      if (!recepies || recepies.length === 0) {
        noRecepies.style.display = "block";
        noKeyword.style.display = "none";
        return;
      }

      noRecepies.style.display = "none";
      noKeyword.style.display = "none";

      recepies.forEach(recepie => {
        const recepieItem = document.createElement("div");
        recepieItem.className = "recepie-item";
        recepieItem.innerHTML = `
          <div class="recepie-image">
            <img src="${recepie.image}" alt="${recepie.name}">
          </div>
          <div class="recepie-details">
            <h3>${recepie.name}</h3>
            <p>Ingredients: ${recepie.ingredients.join(", ")}</p>
          </div>
        `;
        recepiesList.appendChild(recepieItem);
      });
    } else {
      noRecepies.style.display = "block";
      noKeyword.style.display = "none";
    }
  } catch (error) {
    console.error("Search error:", error);
    noRecepies.style.display = "block";
    noKeyword.style.display = "none";
  }
};

const debounceHandleSearchRecepies = _.debounce(handleSearchRecepies, 300);

if (searchRecepie) {
  searchRecepie.addEventListener("input", debounceHandleSearchRecepies);
}

if (addToList) {
  addToList.addEventListener("click", () => {
    const value = newListItem.value.trim();
    if (!value) {
      alert("Please enter a value");
      return;
    }

    const item = { name: value, isChecked: false };
    addToBuyList([item]);
    newListItem.value = "";
  });
}
