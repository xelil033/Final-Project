const cardBtns = document.querySelectorAll(".card__btn");
let roomDesigns = [];

function getItemsFromLocalStorageAfterLoad() {
  const elsFromLocalStorage = JSON.parse(localStorage.getItem("roomDesign"));
  if (elsFromLocalStorage !== null) {
    roomDesigns = [...elsFromLocalStorage];
  }
}

window.addEventListener("load", getItemsFromLocalStorageAfterLoad());

function addItemToLocalStorage(btn) {
  const roomDesignsItem = {};
  roomDesignsItem.price = btn.previousElementSibling.getAttribute("data-price");
  roomDesignsItem.name = btn.previousElementSibling.innerText;
  roomDesignsItem.category =
    btn.parentElement.parentElement.parentElement.previousElementSibling.innerText;
  roomDesigns.push(roomDesignsItem);
  const roomDesignsObj = JSON.stringify(roomDesigns);
  localStorage.setItem("roomDesign", roomDesignsObj);
}

cardBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    addItemToLocalStorage(btn);
  });
});
const cardBtn = document.querySelector(".card-btn");

cardBtn.addEventListener("click", () => {
  window.location.href = "index.html"; 
});

let messageCount = 0;
const messagesContainer = document.getElementById("messages-container");
const buttons = document.querySelectorAll(".card__btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    messageCount++;
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.textContent = ` ${messageCount}. Sifariş seçildi`;
    messagesContainer.appendChild(newMessage);
    setTimeout(() => {
      newMessage.style.opacity = 0;
      setTimeout(() => {
        messagesContainer.removeChild(newMessage);
      }, 500); 
    }, 2000);
  });
});


