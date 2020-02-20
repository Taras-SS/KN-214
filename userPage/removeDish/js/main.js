removeDish = (name, image, price, description, el) => {
    Swal.fire({
        title: 'Ви впевнені!?',
        text: "Повернути товар буде не можливо!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Так, видалити!',
        cancelButtonText: 'Ні'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Видалено!',
                'Ваш товар успішно видалено.',
                'success'
            );
            $.ajax({
                url: `/removeDish`,
                type: `POST`,
                data: {
                    DishName: name,
                    Image: image,
                    Price: price,
                    Description: description
                },
                success: response => {
                    if(response == `OK`){
                        document.getElementById(el).remove();
                    }
                }
            });
        }
    })
}