checkContacts = () => {
    const email = $(`#contactsEmail`).val();
    const regaxEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regaxPhone = /^((\+{1}(60|62|63|66){1})|(0)){1}\d{9,13}$/;
    const winWidth = window.innerWidth;
    let status = 1;

    if(regaxEmail.test(email) == false){
        if(winWidth <= 557){
            $(`#contactsEmail`).val(``);
            $(`#contactsEmail`).attr(`placeholder`, `Почта`);
        }
        if(winWidth <= 400){
            $(`#contactsEmail`).val(``);
            $(`#contactsEmail`).attr(`placeholder`, ``);
        }
        showValidate($(`#contactsEmail`));
        status = 0;
    }else{
        hideValidate($(`#contactsEmail`));
    }

    const phone = $(`#contactsPhone`).val();
    if(regaxPhone.test(phone) == false){
        if(winWidth <= 557){
            $(`#contactsPhone`).val(``);
            $(`#contactsPhone`).attr(`placeholder`, `Телефон`);
        }
        if(winWidth <= 400){
            $(`#contactsPhone`).val(``);
            $(`#contactsPhone`).attr(`placeholder`, ``);
        }
        showValidate($(`#contactsPhone`));
        status = 0;
    }else{
        hideValidate($(`#contactsPhone`));
    }

    const facebookLink = $(`#contactsFacebook`).val();
    if(facebookLink.length < 10){
        showValidate($(`#contactsFacebook`));
    }else{
        hideValidate($(`#contactsFacebook`));
    }

    const instagramLink = $(`#contactsInstagram`).val();
    if(facebookLink.length < 10){
        showValidate($(`#contactsInstagram`));
    }else{
        hideValidate($(`#contactsInstagram`));
    }

    if(status == 1){
        $.ajax({
            url: `/writeContacts`,
            type: `POST`,
            data: {
                email: email,
                phone: phone,
                facebook: facebookLink,
                instagram: instagramLink
            },
            success: response => {
                window.location.reload();
            }
        });
    }

}