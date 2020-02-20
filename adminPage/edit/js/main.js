showEditForm = (name, description, image, prioritet, login, password) => {
    document.getElementById(`restaurantNameEdit`).value = name;
    document.getElementById(`restaurantLoginEdit`).value = login;
    document.getElementById(`restaurantPasswordEdit`).value = password;
    document.getElementById(`restaurantDescriptionEdit`).innerText = description;
    document.getElementById(`newRestaurantPrioritet`).value = prioritet;
    document.getElementById(`restaurantImageEdit`).setAttribute(`src`, image);

    const out = ` <button class="contact100-form-btn" id="saveEditData" type="button" onclick="saveEditedInfo('${name}', '${description}', '${image}', '${prioritet}', '${login}', '${password}')">
              <span>
                Зберегти
                <i class="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
              </span>
                </button>`;

    document.querySelector(`#restaurantsEdit`).classList.add(`none-display`);
    document.querySelector(`#btnSaveEditedBlock`).innerHTML = out;
    document.querySelector(`.edit-restaurant-form`).classList.remove(`none-display`);
    document.querySelector(`footer`).classList.remove(`bottom-0`)
}


$('#updateImageBtn').change(data => {
    let file = document.getElementById('updateImageBtn').files[0];
    let reader  = new FileReader();
    reader.onload = e => {
        let src = e.target.result;
        $(`.dishImage`).attr(`src`, src);

    }
    reader.readAsDataURL(file);
});

saveEditedInfo = (current_name, current_description, current_image, current_prioritet, current_login, current_password) => {
    const winWidth = window.innerWidth;
    let status = 1;
    const new_name = $(`#restaurantNameEdit`).val();

    if(new_name.length <= 4){
        if(winWidth <= 557){
            $(`#restaurantNameEdit`).val(``);
            $(`#restaurantNameEdit`).attr(`placeholder`, `Ім'я`);
        }
        if(winWidth <= 400){
            $(`#restaurantNameEdit`).val(``);
            $(`#restaurantNameEdit`).attr(`placeholder`, ``);
        }
        showValidate($(`#restaurantNameEdit`));
        status = 0;
    }else{
        hideValidate($(`#restaurantNameEdit`));
    }

    const new_login = $(`#restaurantLoginEdit`).val();
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(new_login) == false){
        if(winWidth <= 557){
            $(`#restaurantLoginEdit`).val(``);
            $(`#restaurantLoginEdit`).attr(`placeholder`, `Логін`);
        }
        if(winWidth <= 400){
            $(`#restaurantLoginEdit`).val(``);
            $(`#restaurantLoginEdit`).attr(`placeholder`, ``);
        }
        showValidate($(`#restaurantLoginEdit`));
        status = 0;
    }else{
        hideValidate($(`#restaurantLoginEdit`));
    }

    const new_password = $(`#restaurantPasswordEdit`).val()
    if(new_password.length <= 5){
        if(winWidth <= 557){
            $(`#restaurantPasswordEdit`).val(``);
            $(`#restaurantPasswordEdit`).attr(`placeholder`, `Пароль`);
        }
        if(winWidth <= 400){
            $(`#restaurantPasswordEdit`).val(``);
            $(`#restaurantPasswordEdit`).attr(`placeholder`, ``);
        }
        showValidate($(`#restaurantPasswordEdit`));
        status = 0;
    }else{
        hideValidate($(`#restaurantPasswordEdit`));
    }

    const new_description = $(`#restaurantDescriptionEdit`).val()
    if(new_description.length <= 10){
        if(winWidth <= 557){
            $(`#restaurantDescriptionEdit`).val(``);
            $(`#restaurantDescriptionEdit`).attr(`placeholder`, `Опис`);
        }
        if(winWidth <= 400){
            $(`#restaurantDescriptionEdit`).val(``);
            $(`#restaurantDescriptionEdit`).attr(`placeholder`, ``);
        }
        showValidate($(`#restaurantDescriptionEdit`));
        status = 0;
    }else{
        hideValidate($(`#restaurantDescriptionEdit`));
    }

    const new_prioritet = $(`#newRestaurantPrioritet`).val();
    if(new_prioritet.length == 0){
        if(winWidth <= 557){
            $(`#newRestaurantPrioritet`).val(``);
            $(`#newRestaurantPrioritet`).attr(`placeholder`, `Пріорітет`);
        }
        if(winWidth <= 400){
            $(`#newRestaurantPrioritet`).val(``);
            $(`#newRestaurantPrioritet`).attr(`placeholder`, ``);
        }
        showValidate($(`#newRestaurantPrioritet`));
        status = 0;
    }else{
        hideValidate($(`#newRestaurantPrioritet`));
    }

    const new_image = $(`#restaurantImageEdit`).attr(`src`);

    if(status == 1){
        $.ajax({
           url: `/updateRestaurantData`,
           type: `POST`,
           data: {
               oldData: {
                   login: current_login,
                   password: current_password,
                   Name: current_name,
                   Image: current_image,
                   Description: current_description,
                   Prioritet: current_prioritet
               },
               newData: {
                   login: new_login,
                   password: new_password,
                   Name: new_name,
                   Image: new_image,
                   Description: new_description,
                   Prioritet: new_prioritet
               }
           } ,
            success: response => {
                window.location.reload();
            }
        });
    }

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