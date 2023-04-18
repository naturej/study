const $header = document.querySelector("header");
$header.classList.add('flex-align-center');

$header.innerHTML = `
  <nav>
    <div class="logo">LOGO</div>
    <menu>
      <ul class="main-menu">
        <li><a href="./list.html">LIST</a></li>
        <li>ABOUT</li>
        <li>CONTACT</li>
      </ul>
    </menu>
  </nav>
`;

//sroll
document.addEventListener("mousewheel", (e) => {
    if(document.documentElement.scrollTop < 100) {
        $header.classList.remove('sticky');
    } else {
        $header.classList.add('sticky');
    }
});