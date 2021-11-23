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