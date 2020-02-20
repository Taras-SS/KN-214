writePrice = () => {
    let status = 1;
    const winWidth = window.innerWidth;

    const price = $(`#deliveryPrice`).val();

    if(price.length == 0){
        if(winWidth <= 557){
            $(`#deliveryPrice`).val(``);
            $(`#deliveryPrice`).attr(`placeholder`, `Ціна`);
        }
        if(winWidth <= 400){
            $(`#deliveryPrice`).val(``);
            $(`#deliveryPrice`).attr(`placeholder`, ``);
        }
        showValidate($(`#deliveryPrice`));
        status = 0;
    }else{
        hideValidate($(`#deliveryPrice`))
    }

    if(status == 1){
        $.ajax({
           url: `/writePrice`,
           type: `POST`,
           data: {
               Price: price
           },
           success: response => {
               window.location.reload();
           }
        });
    }

}

checkPrice = el => {
    //console.log(el.value);
    if(el.value.indexOf(``) != -1){
        el.value = el.value.replace(`-`, ``);
    }

    if(el.value == 0){
        el.value = el.value.replace(`0`, ``);
    }

}