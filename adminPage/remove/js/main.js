removeRestaurant = (login, elem) => {
    Swal.fire({
        title: 'Ви впевнені?',
        text: "Повернути буде не можливо!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Так, видалити!',
        cancelButtonText: 'Ні',
    }).then((result) => {
        if (result.value) {
            $.ajax({
               url: `/removeRestaurant`,
                type: `POST`,
                data: {
                   login: login
                },
                success: response => {
                    Swal.fire(
                        'Видалено!',
                        'Рсеторан успішно виделно.',
                        'success'
                    )
                    $(`#${elem}`).remove();
                }
            });
        }
    });
}