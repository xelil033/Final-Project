// js/payment-modal.js
(() => {
  const modal = document.getElementById("payModal");
  if (!modal) return;

  const openBtn = document.querySelector(".pay"); 
  const closeBtns = modal.querySelectorAll("[data-pay-close]");
  const form = document.getElementById("payForm");
  const errorEl = document.getElementById("payError");

  const cardInput = document.getElementById("cardNumber");
  const cvvInput = document.getElementById("cvv");
  const monthInput = document.getElementById("expMonth");
  const yearInput = document.getElementById("expYear");

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    errorEl.textContent = "";
    setTimeout(() => cardInput?.focus(), 0);
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }


  openBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });


  closeBtns.forEach((btn) => btn.addEventListener("click", closeModal));


  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  
  cardInput?.addEventListener("input", () => {
    const digits = cardInput.value.replace(/\D/g, "").slice(0, 16);
    const spaced = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    cardInput.value = spaced;
  });

 
  [cvvInput, monthInput, yearInput].forEach((inp) => {
    inp?.addEventListener("input", () => {
      inp.value = inp.value.replace(/\D/g, "");
    });
  });

  function showError(msg) {
    errorEl.textContent = msg;
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    errorEl.textContent = "";

    const cardDigits = cardInput.value.replace(/\s/g, "");
    const cvv = cvvInput.value.trim();
    const mm = monthInput.value.trim();
    const yyyy = yearInput.value.trim();

    if (cardDigits.length !== 16) return showError("Kart nömrəsi 16 rəqəm olmalıdır.");
    if (cvv.length < 3 || cvv.length > 4) return showError("CVV 3 və ya 4 rəqəm olmalıdır.");

    const monthNum = Number(mm);
    if (!mm || monthNum < 1 || monthNum > 12) return showError("Ay 01–12 aralığında olmalıdır.");

    const yearNum = Number(yyyy);
    const currentYear = new Date().getFullYear();
    if (!yyyy || yyyy.length !== 4) return showError("İl YYYY formatında olmalıdır.");
    if (yearNum < currentYear) return showError("Kartın müddəti bitib.");

   
    alert("Ödəniş məlumatları qəbul edildi (demo).");
    form.reset();
    closeModal();
  });
})();
