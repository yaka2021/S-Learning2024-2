<?php
function DisplayModal($message){
echo '
<link  rel="stylesheet" type="text/css" href="_css/modal.css">
<div class="layer js-modal">
  <div class="modal">
    <div class="modal__inner">
      <div class="modal__contents">
        <div class="modal__content">
          '.$message.'
          <div class="OKBtn">
              <button class="close-button js-close-button">OK</button>
          <div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  const modal = document.querySelector(".js-modal");
  const modalButton = document.querySelector(".js-modal-button");
  const modalClose = document.querySelector(".js-close-button");
  modal.classList.add("is-open");
  modalClose.addEventListener("click", () => {
    modal.classList.remove("is-open");
  });
</script>
'; } ?>
