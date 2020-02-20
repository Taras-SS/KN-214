window.onscroll = () => {
    const header = document.querySelector("header");
    const sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
        $(`header`).css(`display`, `none`);
        document.querySelector((`.stick-top-menu`)).classList.add("sticky");
        $(`.stick-top-menu`).css({"display": `block`, "margin-right": `auto`, "margin-left": `auto`});
    } else {
        document.querySelector((`.stick-top-menu`)).classList.remove("sticky");
        $(`.stick-top-menu`).css({"display": `none`});
        $(`header`).css(`display`, `block`);
    }
}


$(`.menu-icon img`).on(`click`, () => {
    $(`.top-menu-points-block`).css(`display`, `block`);
    $(`.menu-icon ~ div`).css({"display": `block`, "text-align": `center`});
});