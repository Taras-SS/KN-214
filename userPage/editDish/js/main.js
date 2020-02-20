editDish = (name, image, price, description, prioritet) => {
    document.getElementById(`dishNameEdit`).value = name;
    document.getElementById(`priceDishEdit`).value = price;
    document.getElementById(`dishDescriptionEdit`).innerText = description;
    document.getElementById(`newDishPrioritet`).value = prioritet;
    document.getElementById(`dishImageEdit`).setAttribute(`src`, image);

    const out = ` <button class="contact100-form-btn" id="saveEditData" type="button" onclick="saveEditedDish('${name}', '${image}', '${price}', '${description}', '${prioritet}')">
              <span>
                Зберегти
                <i class="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
              </span>
                </button>`;

    document.querySelector(`#editGoods`).classList.add(`none-display`);
    document.querySelector(`#btnSaveEditedBlock`).innerHTML = out;
    document.querySelector(`.editDishForm`).classList.remove(`none-display`);
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

saveEditedDish = (name, image, price, description, prioritet) => {
    const oldData = {
        DishName: name,
        Image: image,
        Price: price,
        Description: description,
        Prioritet: prioritet
    }

    const winWidth = window.innerWidth;
    let status = 1;
    let newDishName = $(`#dishNameEdit`).val();

    if(newDishName.length <= 4){
        if(winWidth <= 557){
            $(`#dishNameEdit`).val(``);
            $(`#dishNameEdit`).attr(`placeholder`, `Ім'я`);
        }
        if(winWidth <= 400){
            $(`#dishNameEdit`).val(``);
            $(`#dishNameEdit`).attr(`placeholder`, ``);
        }
        showValidate($(`#dishNameEdit`));
        status = 0;
    }else{
        hideValidate($(`#dishNameEdit`));
    }

    let newPrice = $(`#priceDishEdit`).val();
    newPrice.replace(`,`, `.`);
    if(newPrice.length < 1){
        if(winWidth <= 557){
            $(`#priceDishEdit`).val(``);
            $(`#priceDishEdit`).attr(`placeholder`, `Ціна`);
        }
        if(winWidth <= 400){
            $(`#priceDishEdit`).val(``);
            $(`#priceDishEdit`).attr(`placeholder`, ``);
        }
        showValidate($(`#priceDishEdit`));
        status = 0;
    }else{
        hideValidate($(`#priceDishEdit`));
    }

    let newDescription = $(`#dishDescriptionEdit`).val();
    if(newDescription.length <= 5){
        showValidate($(`#dishDescriptionEdit`));
        status = 0;
    }else{
        hideValidate($(`#dishDescriptionEdit`));
    }

    let newImage = ``;
    if($(`#dishImageEdit`) != undefined){
        newImage = $(`#dishImageEdit`).attr(`src`);
    }else{
        status = 0;
    }

    let newDishPrioritet = $(`#newDishPrioritet`).val();
    if(newDishPrioritet.length == 0){
        if(winWidth <= 557){
            $(`#newDishPrioritet`).val(``);
            $(`#newDishPrioritet`).attr(`placeholder`, `Пріорітет`);
        }
        if(winWidth <= 400){
            $(`#newDishPrioritet`).val(``);
            $(`#newDishPrioritet`).attr(`placeholder`, ``);
        }
        showValidate($(`#newDishPrioritet`));
        status = 0;
    }else {
        hideValidate($(`#newDishPrioritet`));
    }

    if(status == 1){
        $.ajax({
            url: `/updateDish`,
            type: `POST`,
            data: {
                oldData: oldData,
                newData: {
                    DishName: newDishName,
                    Image: newImage,
                    Price: newPrice,
                    Description: newDescription,
                    Prioritet: newDishPrioritet
                },
                success: response => {
                    console.log(1);
                    window.location.reload(), true;
                }
            }
        });
    }


}

checkStock = (el, name, description, image) => {
    let oldData = {
        DishName: name,
        Image: image,
        Description: description
    };

    let newData = {};

    if(el.value.indexOf(`checked`) != -1){
        oldData.InStock = true;
        newData.InStock = false;
    }else{
        oldData.InStock = false;
        newData.InStock = true;
    }

    $.ajax({
        url: `/updateDish`,
        type: `POST`,
        data: {
            oldData: oldData,
            newData: newData
        },
        success: response => {
            console.log(response);
        }
    })

}

