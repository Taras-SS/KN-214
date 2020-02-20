selectedType = selectedType => {

    const winWidth = window.innerWidth;

    if(winWidth >= 500){
        if(selectedType == 1){
            document.querySelectorAll(`.cat-icons svg`)[0].style.fill = `#fc0`;
            document.querySelectorAll(`.cat-icons div`)[0].style.border = `1px solid #fc0`;
        }else if(selectedType == 2){
            document.querySelectorAll(`.cat-icons svg`)[1].style.fill = `#fc0`;
            document.querySelectorAll(`.cat-icons div`)[1].style.border = `1px solid #fc0`;
        }else if(selectedType == 3){
            document.querySelectorAll(`.cat-icons svg`)[2].style.fill = `#fc0`;
            document.querySelectorAll(`.cat-icons div`)[2].style.border = `1px solid #fc0`;
        }
    }else{
        if(selectedType == 1){
            document.querySelectorAll(`.menuPoints li`)[0].style.color = `rgb(204, 0, 102)`;
        }else if(selectedType == 2){
            document.querySelectorAll(`.menuPoints li`)[1].style.color = `rgb(204, 0, 102)`;
        }else if(selectedType == 3){
            document.querySelectorAll(`.menuPoints li`)[2].style.color = `rgb(204, 0, 102)`;
        }
    }
}

document.onclick = el => {

    if(el.target.attributes.class.value != `pointInMenu` && document.querySelector(`.menuList`).classList.contains(`showed`)){
        document.querySelector(`.menuList`).style.display = `none`;
    }

    if(el.target.attributes.class.value == `showMenu`){
        document.querySelector(`.menuList`).style.display = `block`;
        document.querySelector(`.menuList`).classList.add(`showed`);
    }
}