require(`dotenv`).config();

module.exports = data => {
    for(let i=0; i<data.length; i++){
        let subject = `Нова заявка`,
            html = `<div style="text-align: center; font-family: cursive">
            <h1 style="color: red">Дані клієнта</h1>
            <h2>Ім'я - ${data[i].Client_name}</h2>
            <h2>Номер телефону - ${data[i].ClientPhone}</h2>
            <h2>Адресс - ${data[i].Client_address}</h2>
            <h1 style="color: red">Замовлення</h1>
            <h2>Страва - ${data[i].DishName}</h2>
            <h2>Кількість - ${data[i].Amount}</h2>
            <h2>Ціна - ${data[i].Price}</h2>
            <h2>Опис - ${data[i].Description}</h2>
        </div>`;
        require(`../../config/sendMail`)(process.env.MAIL, subject, html);
        require(`../../config/sendMail`)(data[i].Owner, subject, html);
    }
}