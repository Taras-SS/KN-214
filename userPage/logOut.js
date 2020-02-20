document.getElementById(`logOut`).onclick = () => {
    Swal.fire({
        title: 'Ви впевнені?',
        text: "Ваші можливості будуть обмежені!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Так, вийти',
        cancelButtonText: 'Ні'
    }).then(result => {
        if (result.value) {
            Swal.fire(
                'Виконано!',
                'Ви успішно вийшли з облікового запису.',
                'success',
                $.ajax({
                    url: "/logOut",
                    method: "POST",
                    data: 0,
                    success: response => {
                        if(response == `OK`){
                            window.location.href = `/main`, true;
                        }
                    }
                })
            )
        }
    });
}