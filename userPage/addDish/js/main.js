
    $('.input100').each(() => {
        $(this).on('blur', () => {
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })

    /*==================================================================
    [ Validate ]*/
    let input = $('.validate-input .input100');

    $('.contact100-form-btn').on('click', () => {
        const winWidth = window.innerWidth;
        let check = true;
        let status = 1;
        let dishName = $(`#dishName`).val();
        
        if(dishName.length <= 4){
            if(winWidth <= 557){
                $(`#dishName`).val(``);
                $(`#dishName`).attr(`placeholder`, `Ім'я`);
            }
            if(winWidth <= 400){
                $(`#dishName`).val(``);
                $(`#dishName`).attr(`placeholder`, ``);
            }
            showValidate($(`#dishName`));
            status = 0;
        }else{
            hideValidate($(`#dishName`));
        }
        
        let price = $(`#priceDish`).val();
        price.replace(`,`, `.`);
        if(price.length < 1){
            if(winWidth <= 557){
                $(`#priceDish`).val(``);
                $(`#priceDish`).attr(`placeholder`, `Ціна`);
            }
            if(winWidth <= 400){
                $(`#priceDish`).val(``);
                $(`#priceDish`).attr(`placeholder`, ``);
            }
            showValidate($(`#priceDish`));
            status = 0;
        }else{
            hideValidate($(`#priceDish`));
        }
        
        let description = $(`#dishDescription`).val();
        if(description.length <= 5){
            showValidate($(`#dishDescription`));
            status = 0;
        }else{
            hideValidate($(`#dishDescription`));
        }

        let dishType = document.getElementById(`dishType`);
        dishType = dishType.options[dishType.selectedIndex].label;

        if(dishType == `Тип страви`){
            $(`#dishType`).css(`color`, `red`);
            status = 0;
        }else{
            $(`#dishType`).css(`color`, `black`);
        }

        let image = ``;
        if($(`.dishImage`) != undefined){
            image = $(`.dishImage`).attr(`src`);
        }else{
            status = 0;
        }

        let dishPrioritet = $(`#dishPrioritet`).val();
        if(dishPrioritet.length == 0){
            if(winWidth <= 557){
                $(`#dishPrioritet`).val(``);
                $(`#dishPrioritet`).attr(`placeholder`, `Пріорітет`);
            }
            if(winWidth <= 400){
                $(`#dishPrioritet`).val(``);
                $(`#dishPrioritet`).attr(`placeholder`, ``);
            }
            showValidate($(`#dishPrioritet`));
            status = 0;
        }else {
            hideValidate($(`#dishPrioritet`));
        }

        if(status == 1){
            $.ajax({
                url: `/addNewDish`,
                type: `POST`,
                data: {
                    DishName: dishName,
                    Price: price,
                    Description: description,
                    Type: dishType,
                    Image: image,
                    InStock: true,
                    Prioritet: Number(dishPrioritet)
                },
                success: response => {
                    if(response == `OK`){
                        window.location.reload();
                    }
                }
            });
        }

        return check;
    });


    $('.validate-form .input100').each(() => {
        $(this).focus(() => {
           hideValidate(this);
        });
    });


    showValidate = input => {
        let thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    hideValidate = input => {
        let thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    $('.contact100-btn-hide').on('click', () => {
        $('.wrap-contact100').fadeOut(400);
    })

    $('.contact100-btn-show').on('click', () => {
        $('.wrap-contact100').fadeIn(400);
    })

$('#addPhotoInput').change(data => {
    let file = document.getElementById('addPhotoInput').files[0];
    let reader  = new FileReader();
    reader.onload = e => {
        let src = e.target.result;
        $(`#uploadImageForm`).replaceWith(`<img class="dishImage" src=${src} style="max-height: 200px !important; width: auto;">`);

    }
    reader.readAsDataURL(file);;
});

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
