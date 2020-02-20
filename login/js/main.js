document.querySelector(`.login100-form-btn`).onclick = () => {
    const login = document.getElementById(`logInput`).value;
    const password = document.getElementById(`passInput`).value;

    $.ajax({
        url: `/checkLog`,
        type: `POST`,
        data: {
            login: login,
            password: password
        },
        success: response => {
            if(response > 0){
                window.location.reload();
            }else{
                document.getElementById(`logInput`).style.backgroundColor = `rgba(255, 80, 80, 0.5)`;
                document.getElementById(`passInput`).style.backgroundColor = `rgba(255, 80, 80, 0.5)`;
                document.getElementById(`logInput`).value = ``;
                document.getElementById(`passInput`).value = ``;
            }
        }
    });

}

if(document.getElementById(`showLoginForm`) != undefined){
    document.getElementById(`showLoginForm`).onclick = () => {
        document.querySelector(`.log-form-withBackground`).style.display = `block`;
    }

    document.getElementById(`showLogFormMenu`).onclick = () => {
        document.querySelector(`.log-form-withBackground`).style.display = `block`;
    }
}

hideLogForm = () => {
    document.querySelector(`.log-form-withBackground`).style.display = `none`;
}