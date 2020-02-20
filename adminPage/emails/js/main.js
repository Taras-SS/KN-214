checkEmails = () => {
    const winWidth = window.innerWidth;
    const regax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let status = 1;

    let taxiEmail = $(`#taxiEmail`).val();
    let cargoEmail = $(`#cargo-email`).val();

    if(regax.test(taxiEmail) == false){
        if(winWidth <= 557){
            $(`#taxiEmail`).val(``);
            $(`#taxiEmail`).attr(`placeholder`, `Почта`);
        }
        if(winWidth <= 400){
            $(`#taxiEmail`).val(``);
            $(`#taxiEmail`).attr(`placeholder`, ``);
        }
        showValidate($(`#taxiEmail`));
        status = 0;
    }else{
        hideValidate($(`#taxiEmail`));
    }

    if(regax.test(cargoEmail) == false){
        if(winWidth <= 557){
            $(`#cargo-email`).val(``);
            $(`#cargo-email`).attr(`placeholder`, `Почта`);
        }
        if(winWidth <= 400){
            $(`#cargo-email`).val(``);
            $(`#cargo-email`).attr(`placeholder`, ``);
        }
        showValidate($(`#cargo-email`));
        status = 0;
    }else{
        hideValidate($(`#cargo-email`));
    }

    if(status == 1){
        $.ajax({
            url: `/emailsConfig`,
            type: `POST`,
            data: {
                taxi: taxiEmail,
                cargo: cargoEmail
            },
            success: response => {
                window.location.reload();
            }
        })
    }

}

