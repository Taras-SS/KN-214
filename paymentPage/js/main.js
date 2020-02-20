checkPaymentData = () => {
    let status = 1;
    const winWidth = window.innerWidth;

    const name = $(`#clientName`).val();
    if(name.length <= 4){
        if(winWidth <= 557){
            $(`#clientName`).val(``);
            $(`#clientName`).attr(`placeholder`, `Ім'я`);
        }
        if(winWidth <= 400){
            $(`#clientName`).val(``);
            $(`#clientName`).attr(`placeholder`, ``);
        }
        showValidate($(`#clientName`));
        status = 0;
    }else{
        hideValidate($(`#clientName`));
    }

    const clientPhone = $(`#clientPhone`).val();
    if(/^((\+{1}(60|62|63|66){1})|(0)){1}\d{9,13}$/.test(clientPhone) == false){
        if(winWidth <= 557){
            $(`#clientPhone`).val(``);
            $(`#clientPhone`).attr(`placeholder`, `Телефон`);
        }
        if(winWidth <= 400){
            $(`#clientPhone`).val(``);
            $(`#clientPhone`).attr(`placeholder`, ``);
        }
        showValidate($(`#clientPhone`));
        status = 0;
    }else{
        hideValidate($(`#clientPhone`))
    }

    const deliverTo = $(`#deliverTo`).val();
    if(deliverTo.length <= 4){
        if(winWidth <= 557){
            $(`#deliverTo`).val(``);
            $(`#deliverTo`).attr(`placeholder`, `Телефон`);
        }
        if(winWidth <= 400){
            $(`#deliverTo`).val(``);
            $(`#deliverTo`).attr(`placeholder`, ``);
        }
        showValidate($(`#deliverTo`));
        status = 0;
    }else{
        hideValidate($(`#deliverTo`));
    }

    let count = 0;
    for(let i=0; i<$(`.paymentType input`).length; i++){
        if(document.querySelectorAll(`.paymentType input`)[i].classList.contains(`no-checked`) == false){
            count++;
        }
    }

    if(count == 0){
        status = 0;
        for(let i=0; i<$(`.paymentType input`).length; i++){
            document.querySelectorAll(`.paymentType label`)[i].style.color = `red`;
        }
    }else{
        for(let i=0; i<$(`.paymentType input`).length; i++){
            document.querySelectorAll(`.paymentType label`)[i].style.color = `black`;
        }
    }

    if(status == 1){
        if(document.getElementById(`cashPay`).classList.contains(`no-checked`) == false){
            $.ajax({
                url: `/cashOrder`,
                type: `POST`,
                data: {
                    data: prepareData(localStorage.getItem(`cart`), name, clientPhone, deliverTo)
                },
                success: response => {
                    if(response == `OK`){
                        Swal.fire({
                            title: 'Заявку відправлено',
                            showClass: {
                                popup: 'animated fadeInDown faster'
                            },
                            hideClass: {
                                popup: 'animated fadeOutUp faster'
                            }
                        })
                    }
                }
            });
        }else{
            $.ajax({
                url: `/goCardPay`,
                type: `POST`,
                data: {
                    price: getFinalPrice(),
                    data: prepareData(localStorage.getItem(`cart`), name, clientPhone, deliverTo),
                    ownersAmount: countOwners(localStorage.getItem(`cart`))
                },
                success: response => {
                    document.querySelector(`#payData`).value = response.data;
                    document.querySelector(`#paySignature`).value = response.signature;
                    document.querySelector(`.liqpayBlock`).style.display = `flex`;
                }
            })
        }
    }
    //console.log(count);

}

countOwners = data => {
    data = JSON.parse(data);
    let owners = [];
    for(let i=0; i<data.length; i++){
        if(owners.includes(data[i].Owner) == false){
            owners.push(data[i].Owner);
        }
    }
    //console.log(owners.length);
    return owners.length;
}

getFinalPrice = () => {
    let data = JSON.parse(localStorage.getItem(`cart`));
    let sum = 0;
    for(let i=0; i<data.length; i++){
        sum += Number(data[i].Price) * Number(data[i].Amount)
    }
    //console.log(sum);
    return sum;
}

prepareData = (cart, client_name, client_phone, address) => {
    cart = JSON.parse(cart);
    let data = [];
    for(let i=0; i<cart.length; i++){
        data.push({
            Client_name: client_name,
            ClientPhone: client_phone,
            Client_address: address,
            DishName: cart[i].Name,
            Price: cart[i].Price,
            Amount: cart[i].Amount,
            Owner: cart[i].Owner,
            Description: cart[i].Description
        });
    }
    //console.log(JSON.stringify(data));
    return data;
}

showValidate = input => {
    let thisAlert = $(input).parent();
    $(thisAlert).addClass('alert-validate');
}

hideValidate = input => {
    let thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}

checkPayType = elem => {
    for(let i=0; i<document.querySelectorAll(`.paymentTypeCheck`).length; i++){
        document.querySelectorAll(`.paymentTypeCheck`)[i].checked = false;
        document.querySelectorAll(`.paymentTypeCheck`)[i].classList.add(`no-checked`);
    }

    if(document.querySelector(elem).classList.contains(`no-checked`)){
        document.querySelector(elem).classList.remove(`no-checked`);
        document.querySelector(elem).checked = true;
    }else{
        document.querySelector(elem).classList.add(`no-checked`);
    }
}

document.querySelector(`.cancelPay`).onclick = () => {
    document.querySelector(`.liqpayBlock`).style.display = `none`;
}