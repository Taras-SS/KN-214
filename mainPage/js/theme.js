document.querySelector(`body`).onload = () => {
    console.log(localStorage.getItem(`theme`));
    if(localStorage.getItem(`theme`) != undefined){
        if(localStorage.getItem(`theme`) == `black`){
            setDark();
        }else{
            setLight();
        }
    }else{
        return;
    }
}

changeTheme = () => {
    if(localStorage.getItem(`theme`) != undefined){
        if(localStorage.getItem(`theme`) == `black`){
            localStorage.setItem(`theme`, `white`);
            setLight();
        }else{
            localStorage.setItem(`theme`, `black`);
            setDark();
        }
    }else{
        localStorage.setItem(`theme`, `black`);
        setDark();
    }
}

setDark = () => {
    $( "#top-menu-main" ).replaceWith( $(`#changeTheme`) );
    $(`<div id="top-menu-main">
            <a href="/main">Головна</a>
        </div>`).insertAfter(`#showLogFormMenu`);
    $(`body`).css({"background": `linear-gradient(to right, rgba(255, 195, 160, 0.1), rgba(255, 175, 189, 0.3))`});
    $(`.overflow-wrapper`).css({"background-color": `transparent`});
    $(`header`).css(`background-color`, `white`);
    $(`.project-slide-description-title`).css({"color": `rgb(255, 102, 153)`});
    $(`#changeTheme`).css(`color`, `rgb(255, 102, 153)`);
    $(`.project-container > div`).css({"border": `1px solid rgb(255, 80, 80)`, "box-shadow": `0 0 30px rgba(255, 80, 80, 0.5)`, "background-color": `white`});
    $(`#showLoginForm`).css({"background-color": `rgb(255, 102, 153)`});
    $(`.footer-distributed h3 span`).css({"color": `rgb(255, 102, 153)`});
    $(`.footer-distributed .footer-center p`).css({"color": `rgb(255, 102, 153)`});
    $(`.footer-distributed .footer-center p a`).css({"color": `rgb(255, 102, 153)`});
    $(`footer`).css(`background-color`, `rgba(77, 184, 255, 0.6)`);
    $(`.stick-top-menu`).css({"background-color": `rgba(77, 184, 255, 1)`, "box-shadow": `0 0 30px rgba(77, 184, 255, 0.5)`});
    $(`.list-tp-menu`).css({"background-color": `rgba(77, 184, 255, 0.5)`, "border": `1px solid rgb(77, 184, 255)`});

}

setLight = () => {
    $(`body`).css({"background": `white`});
    $(`.overflow-wrapper`).css({"background-color": `transparent`});
    $(`.project-container > div`).css({"border": `1px solid rgb(255, 204, 0)`, "box-shadow": `0 0 0`});
    $(`.project-slide-description-title`).css({"color": `rgb(0, 0, 0)`});
    $(`#changeTheme`).css(`color`, `white`);
    $(`.footer-distributed h3 span`).css({"color": `lightseagreen`});
    $(`.footer-distributed .footer-center p`).css({"color": `lightseagreen`});
    $(`.footer-distributed .footer-center p a`).css({"color": `lightseagreen`});
    $(`footer`).css(`background-color`, `rgba(255, 204, 0, 0.5)`);
    $(`.stick-top-menu`).css({"background-color": `rgb(255, 212, 0)`, "box-shadow": `0 0 30px rgba(255, 212, 0, 0.7)`});
    $(`.list-tp-menu`).css({"background-color": `rgba(255, 223, 0, 0.7)`, "border": `1px solid rgb(255, 212, 0)`});
    $( "#top-menu-main" ).remove();
    $(`#changeTheme`).remove();
     $(`<div class="theme white" id="changeTheme" onclick="changeTheme()">
            Тема
        </div>`).insertAfter(`#showLogFormMenu`);
    $(`<div id="top-menu-main">
            <a href="/main">Головна</a>
        </div>`).insertBefore(`.show-services`);
}