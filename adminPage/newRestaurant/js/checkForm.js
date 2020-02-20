$(`.contact100-form-btn`).on(`click`, () => {
    const winWidth = window.innerWidth;
    let status = 1;

    let login = $(`#login`).val();

    if(login.length <= 4){
        if(winWidth <= 557){
            $(`#login`).val(``);
            $(`#login`).attr(`placeholder`, `Логін`);
        }
        if(winWidth <= 400){
            $(`#login`).val(``);
            $(`#login`).attr(`placeholder`, ``);
        }
        showValidate($(`#login`));
        status = 0;
    }else{
        hideValidate($(`#login`));
    }

    let password = $(`#password`).val();
    if(password.length <= 4){
        if(winWidth <= 557){
            $(`#password`).val(``);
            $(`#password`).attr(`placeholder`, `Пароль`);
        }
        if(winWidth <= 400){
            $(`#password`).val(``);
            $(`#password`).attr(`placeholder`, ``);
        }
        showValidate($(`#password`));
        status = 0;
    }else{
        hideValidate($(`#password`));
    }

    let name = $(`#restName`).val();

    if(name.length <= 3){
        if(winWidth <= 557){
            $(`#restName`).val(``);
            $(`#restName`).attr(`placeholder`, `Ім'я`);
        }
        if(winWidth <= 400){
            $(`#restName`).val(``);
            $(`#restName`).attr(`placeholder`, ``);
        }
        showValidate($(`#restName`));
        status = 0;
    }else{
        hideValidate($(`#restName`));
    }

    let description = $(`#restDescription`).val();
    if(description.length <= 5){
        showValidate($(`#restDescription`));
        status = 0;
    }else{
        hideValidate($(`#restDescription`));
    }

    let image = ``;
    if($(`.restaurantImage`) != undefined){
        image = $(`.restaurantImage`).attr(`src`);
    }else{
        status = 0;
    }

    let prioritet = $(`#restPrioritet`).val();

    if(prioritet.length == 0){
        if(winWidth <= 557){
            $(`#restPrioritet`).val(``);
            $(`#restPrioritet`).attr(`placeholder`, `Проірітет`);
        }
        if(winWidth <= 400){
            $(`#restPrioritet`).val(``);
            $(`#restPrioritet`).attr(`placeholder`, ``);
        }
        showValidate($(`#restPrioritet`));
        status = 0;
    }else{
        hideValidate($(`#restPrioritet`));
    }

    if(status == 1){
        $.ajax({
            url: `/addNewRestaurant`,
            type: `POST`,
            data: {
                Name: name,
                Image: image,
                Description: description,
                Prioritet: Number(prioritet),
                login: login,
                password: password
            },
            success: response => {
                    window.location.reload(), true;
            }
        });
    }

});

$('#addPhotoInput').change(data => {
    let file = document.getElementById('addPhotoInput').files[0];
    let reader  = new FileReader();
    reader.onload = e => {
        let src = e.target.result;
        $(`#uploadImageForm`).replaceWith(`<img class="restaurantImage" src=${src} style="max-height: 200px !important; width: auto;">`);

    }
    reader.readAsDataURL(file);;
});

showValidate = input => {
    let thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

hideValidate = input => {
    let thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}

checkPrioritet = el => {
    //console.log(el.value);
    if(el.value.indexOf(``) != -1){
        el.value = el.value.replace(`-`, ``);
    }

    if(el.value == 0){
        el.value = el.value.replace(`0`, ``);
    }

    if(Number(el.value) > 10){
        el.value = el.value.slice(1, 2);
    }

}