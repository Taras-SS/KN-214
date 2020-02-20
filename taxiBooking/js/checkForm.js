$(`.contact100-form-btn`).on(`click`, () => {
   const userName = $(`#clientName`).val();
   const userPhone = $(`#userPhone`).val();
   const deliverFrom = $(`#deliverFrom`).val();
   const deliverTo = $(`#deliverTo`).val();
   const deliverData = $(`#deliverDate`).val();
   const deliverHour = $(`#selectTime option:selected`).text();

   let status = 1;
   const winWidth = window.innerWidth;

   const regax = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;

   if(userName.length <= 2){
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

    if(regax.test(userPhone) == false){
        if(winWidth <= 557){
            $(`#userPhone`).val(``);
            $(`#userPhone`).attr(`placeholder`, `Телефон`);
        }
        if(winWidth <= 400){
            $(`#userPhone`).val(``);
            $(`#userPhone`).attr(`placeholder`, ``);
        }
        showValidate($(`#userPhone`));
        status = 0;
    }else{
        hideValidate($(`#userPhone`));
    }

    if(deliverFrom.length < 4){
        if(winWidth <= 557){
            $(`#deliverFrom`).val(``);
            $(`#deliverFrom`).attr(`placeholder`, `Від`);
        }
        if(winWidth <= 400){
            $(`#deliverFrom`).val(``);
            $(`#deliverFrom`).attr(`placeholder`, ``);
        }
        showValidate($(`#deliverFrom`));
        status = 0;
    }else{
        hideValidate($(`#deliverFrom`));
    }

    if(deliverTo.length < 4){
        if(winWidth <= 557){
            $(`#deliverTo`).val(``);
            $(`#deliverTo`).attr(`placeholder`, `До`);
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


    if(deliverData.length == 0){
        if(winWidth <= 557){
            $(`#deliverDate`).val(``);
            $(`#deliverDate`).attr(`placeholder`, `Дата`);
        }
        if(winWidth <= 400){
            $(`#deliverDate`).val(``);
            $(`#deliverDate`).attr(`placeholder`, ``);
        }
        showValidate($(`#deliverDate`));
        status = 0;
    }else{
        hideValidate($(`#deliverDate`));
    }


    if(deliverHour.length == 0 || deliverHour == `Година`){
        if(winWidth <= 557){
            $(`#selectTime`).val(``);
            $(`#selectTime`).attr(`placeholder`, `Година`);
        }
        if(winWidth <= 400){
            $(`#selectTime`).val(``);
            $(`#selectTime`).attr(`placeholder`, ``);
        }
        showValidate($(`#selectTime`));
        status = 0;
    }else{
        hideValidate($(`#selectTime`));
    }

    const service = $(`.contact100-form-title`).text();
    let url = ``;
    if(service.indexOf(`Вантажні`) != -1){
        url = `/cargoWriteOrder`;
    }else{
        url = `/taxiWriteOrder`;
    }

    if(status == 1){
        $.ajax({
            url: url,
            type: `POST`,
            data: {
                Name: userName,
                Phone: userPhone,
                From: deliverFrom,
                To: deliverTo,
                Date: deliverData,
                Hour: deliverHour
            },
            success: response => {
                if (response == `OK`){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Заявка була відправлена',
                        showConfirmButton: false,
                        timer: 1100
                    });

                    window.location.reload();
                }
            }
        });
    }

});

showValidate = input => {
    let thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

hideValidate = input => {
    let thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}