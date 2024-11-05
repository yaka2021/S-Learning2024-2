<?php
 function DisplayLogoutCofirmModal(){
    echo '
    <link  rel="stylesheet" type="text/css" href="_css/confirm_modal.css">
    <div class="confirm_layer confirm_js-modal">
      <div class="confirm_modal">
        <div class="confirm_modal__inner">
          <div class="confirm_modal__contents">
            <div class="confirm_modal__content">
              <p>本当にログアウトしますか？</p>
	        <button id="ModalLogoutBtn" class="confirm_modal-button">
                はい
              </button>
              <button class="confirm_modal-button confirm_js-close-button">
                いいえ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

<script>
  let ModalLogoutBtn = document.getElementById("ModalLogoutBtn");

  const confirm_modal = document.querySelector(".confirm_js-modal");
  const confirm_modalButton = document.querySelector(
    ".confirm_js-modal-button"
  );
  const confirm_modalClose = document.querySelector(".confirm_js-close-button");
  confirm_modal.classList.add("confirm_is-open");

  confirm_modalClose.addEventListener("click", () => {
    let ComfirmModal = document.getElementById("ComfirmModal");
    ComfirmModal.style.display = "none";
  });

  ModalLogoutBtn.addEventListener("click", () => {
    location.href = "_background/b_logout.php";
  });
</script>
'; } ?>