logOut = () => {
    Swal.fire({
        title: 'Ви впевнені?',
        text: "Ваші можливост будуть обмежені!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Так, вийти!',
        cancelButtonText: 'Ні',
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: `/logOut`,
                type: `POST`,
                data: {},
                success: response => {
                    Swal.fire(
                        'Завершено!',
                        'Ви успішно вийшли з облікового запису.',
                        'success'
                    )
                    window.location.href = `/main`;
                }
            });
        }
    });
}