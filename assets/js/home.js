//Chuyển đổi giữa đăng kí đăng nhập
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".navbar__tab-item");
const panes = $$(".navbar__user-body");

tabs.forEach((tab, index) => {
    const pane = panes[index];

    tab.onclick = function() {
        $(".navbar__tab-item.active").classList.remove("active");
        $(".navbar__user-body.active").classList.remove("active");

        this.classList.add("active");
        pane.classList.add("active");
        console.log(this, pane)
    };
});


//Đóng mở user
const openMenu = $('#showmenu')
const hiddenMenu = $("#hidden")
const sidemenu = $("#navbar-right")
const overlay = $('#overlay')

openMenu.addEventListener("click", function() {
    sidemenu.classList.add("active");
    overlay.classList.add("active");
    overlay.style.display = "block";

})

hiddenMenu.addEventListener('click', function() {
    sidemenu.classList.remove("active");
    overlay.style.display = "none";
})

overlay.addEventListener('click', function() {
    sidemenu.classList.remove("active");
    overlay.style.display = "none";
})

// Ẩn hiện search

const showSearch = $('#showSearch')
const searchResult = $('#searchResult')

showSearch.addEventListener('click', function() {
    searchResult.classList.add("active");
    overlay.classList.add("active");
    overlay.style.display = "block";
})
overlay.addEventListener('click', function() {
    searchResult.classList.remove("active");
    overlay.style.display = "none";
})