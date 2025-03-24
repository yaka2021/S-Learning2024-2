<header>
  <div class="wrapper">
    <h1 class="header_title_top-left">
      <a href="./" class="header_link_top-left">
        <img
          src="./_topImg/favicon.ico"
          alt="icon"
          width="50"
          height="50"
          class="header_img_top-left"
        />S-Learning 2024
      </a>
    </h1>
    <nav>
      <ul class="header_ul">
        <li class="header_user-info_bottom">
          ユーザー名：
          <?php include("_background/userManager.php");
						echo UserManager::GetUserName(); ?>
          <a href="f_user_name.php" class="header_btn_bottom-left"
            >ユーザー名変更</a
          >
        </li>
        <li class="header_user-info_bottom">
          初回ログイン：<?php echo UserManager::GetTimestamp(); ?>
        </li>
      </ul>
      <a id="logout" class="header_btn_bottom-right">ログアウト</a>
      <a href="obtained_flags.php" class="header_btn_bottom-right"
        >手に入れたFLAG</a
      >
    </nav>
  </div>
</header>

<div id="ComfirmModal" style="display: none;">
  <?php 
		include("_src/confirm_modal.php"); 
		DisplayLogoutCofirmModal(); 
	?></div>
<script>
  let logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", (event) => {
    let ComfirmModal = document.getElementById("ComfirmModal");
    ComfirmModal.style.display = "block";
  });
</script>