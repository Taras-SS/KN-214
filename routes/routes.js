require(`dotenv`).config();
const bodyParser = require(`body-parser`);
const cookieSession = require(`cookie-session`);
const url = require(`url`);
const fs = require(`fs`);
const emails = JSON.parse(fs.readFileSync(`config/emailSender.json`));
const contacts = JSON.parse(fs.readFileSync(`config/contacts.json`));
const deliveryPrice = JSON.parse(fs.readFileSync(`config/deliveryPrice.json`));

module.exports = (app, express, serv_dirname) => {

    app.use(cookieSession({
        name: 'session',
        keys: ['key1', 'key2']
    }));

    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb'}));

    app.use(express.json());

    const urLenCodedParser = bodyParser.urlencoded({extended: false});

    app.set(`view engine`, `ejs`);

    app.get(`/main`, (req, res) => {
        app.use(`/mainPage`, express.static(serv_dirname + `/mainPage`));
        app.use(`/images`, express.static(serv_dirname + `/images`));
        app.use(`/login`, express.static(serv_dirname + `/login`));
        app.use(`/vendor`, express.static(serv_dirname + `/vendor`));
        if(req.session.login == undefined){
            res.render(`../views/main`, {login: 0, contacts:contacts});
        }else{
            res.render(`../views/main`, {login: 1, contacts:contacts});
        }
    });

    app.get(`/userPage`, (req, res) => {
        if(req.session.login == undefined){
            res.redirect(`/main`);
        }else if(req.session.login == process.env.ADMIN_LOG){
            res.redirect(`/adminPage`)
        }else{
            app.use(`/footer`, express.static(serv_dirname + `/mainPage/css`));
            app.use(`/images`, express.static(serv_dirname + `/images`));
            app.use(`/vendor`, express.static(serv_dirname + `/vendor`));
            app.use(`/userPage`, express.static(serv_dirname + `/userPage`));
            app.use(`/sweetAlert`, express.static(serv_dirname + `/vendor/sweetAlert`));
            app.use(`/dishes`, express.static(serv_dirname + `/dishesPage`));
            require(`../DB/getData`)(`dishes`, {Owner: req.session.login}, {Owner: 1}, dishes => {
                res.render(`../views/userPage`, {dishes: dishes, contacts:contacts});
            });
        }
    });

    app.get(`/dishesPage`, (req, res) => {
        let sentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        let q = url.parse(sentUrl, true);
        let filter = {
            //Type: `Основна страва`,
            InStock: true
        }
        let dishType = 1;
        if(q.query.Login != undefined && q.query.Type != undefined){
            filter.Owner = q.query.Login;
            if(q.query.Type == `main`){
                filter.Type = `Основна страва`;
                dishType = 1;
            }else if(q.query.Type == `snack`){
                filter.Type = `Снек`;
                dishType = 2;
            }else{
                filter.Type = `Напої`;
                dishType = 3;
            }
        }else{
            res.redirect(`/restaurants`);
        }
        app.use(`/bootstrap`, express.static(serv_dirname + `/vendor/bootstrap/css`));
        app.use(`/dishesPage`, express.static(serv_dirname + `/dishesPage`));
        app.use(`/footer`, express.static(serv_dirname + `/mainPage/css`));
        app.use(`/images`, express.static(serv_dirname + `/images`));
        app.use(`/cart`, express.static(serv_dirname + `/shopingCart`));
        app.use(`/sweetAlert`, express.static(serv_dirname + `/vendor/sweetAlert`));
        app.use(`/vendor`, express.static(serv_dirname + `/vendor`));
        app.use(`/login`, express.static(serv_dirname + `/login`));
        require(`../DB/getData`)(`dishes`, filter, {Prioritet: -1}, dishes => {
            if(req.session.login == undefined){
                res.render(`../views/dishes`, {login: 0, dishes: dishes, contacts: contacts, dishType: dishType, owner: q.query.Login, deliveryPrice: deliveryPrice.Price});
            }else{
                res.render(`../views/dishes`, {login: 1, dishes: dishes, contacts: contacts, dishType: dishType, owner: q.query.Login, deliveryPrice: deliveryPrice.Price});
            }
        });
    });

    app.get(`/taxiBooking`, (req, res) => {
        let sentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        let q = url.parse(sentUrl, true);
        app.use(`/bootstrap`, express.static(serv_dirname + `/vendor/bootstrap/css`));
        app.use(`/footer`, express.static(serv_dirname + `/mainPage/css`));
        app.use(`/images`, express.static(serv_dirname + `/images`));
        app.use(`/login`, express.static(serv_dirname + `/login`));
        app.use(`/taxiBooking`, express.static(serv_dirname + `/taxiBooking`));
        app.use(`/sweetAlert`, express.static(serv_dirname + `/vendor/sweetAlert`));
        app.use(`/vendor`, express.static(serv_dirname + `/vendor`));
        if(req.session.login == undefined){
            if(q.query.taxi == `true`){
                res.render(`../views/taxi`, {login: 0, service: `Бронювання таксі`, contacts: contacts});
            }else{
                res.render(`../views/taxi`, {login: 0, service: `Вантажні перевезення`, contacts:contacts});
            }
        }else{
            if(q.query.taxi == `true`){
                res.render(`../views/taxi`, {login: 1, service: `Бронювання таксі`, contacts:contacts});
            }else{
                res.render(`../views/taxi`, {login: 1, service: `Вантажні перевезення`, contacts:contacts});
            }
        }
    });

    app.get(`/adminPage`, (req, res) => {
        if(req.session.login != process.env.ADMIN_LOG){
            res.redirect(`/main`);
        }else {
            app.use(`/footer`, express.static(serv_dirname + `/mainPage/css`));
            app.use(`/adminPage`, express.static(serv_dirname + `/adminPage`));
            app.use(`/images`, express.static(serv_dirname + `/images`));
            app.use(`/vendor`, express.static(serv_dirname + `/vendor`));
            app.use(`/userPage`, express.static(serv_dirname + `/userPage`));
            app.use(`/sweetAlert`, express.static(serv_dirname + `/vendor/sweetAlert`));
            require(`../DB/getData`)(`users`, {}, {Prioritet: -1}, restaurants => {
                res.render(`../views/admin`, {emails: emails, contacts: contacts, restaurants: restaurants, deliveryPrice: deliveryPrice.Price});
            });
        }
    });

    app.get(`/restaurants`, (req, res) => {
        app.use(`/mainPage`, express.static(serv_dirname + `/mainPage`));
        app.use(`/images`, express.static(serv_dirname + `/images`));
        app.use(`/restaurants`, express.static(serv_dirname + `/restaurants`));
        app.use(`/login`, express.static(serv_dirname + `/login`));
        app.use(`/vendor`, express.static(serv_dirname + `/vendor`));
        require(`../DB/getData`)(`users`, {}, {Prioritet: -1}, restaurants => {
            if(req.session.login == undefined){
                res.render(`../views/restaurants`, {login: 0, restaurants: restaurants, contacts:contacts});
            }else{
                res.render(`../views/restaurants`, {login: 1, restaurants: restaurants, contacts:contacts});
            }
        });
    });

    app.get(`/paymentPage`, (req, res) => {
        let sentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        let q = url.parse(sentUrl, true);
        if(q.query.GoPay == undefined){
            res.redirect(`/main`);
        }else{
            app.use(`/mainPage`, express.static(serv_dirname + `/mainPage`));
            app.use(`/images`, express.static(serv_dirname + `/images`));
            app.use(`/payment`, express.static(serv_dirname + `/paymentPage`));
            app.use(`/login`, express.static(serv_dirname + `/login`));
            app.use(`/vendor`, express.static(serv_dirname + `/vendor`));
            app.use(`/form`, express.static(serv_dirname + `/taxiBooking`));
            app.use(`/sweetAlert`, express.static(serv_dirname + `/vendor/sweetAlert`));
            if(req.session.login == undefined){
                res.render(`../views/paymentPage`, {login: 0, contacts:contacts});
            }else{
                res.render(`../views/paymentPage`, {login: 1, contacts:contacts});
            }
        }
    });

    app.post(`/addNewDish`, (req, res) => {
        let data = req.body;
        data.Owner = req.session.login;
        data.Prioritet = Number(data.Prioritet);
        if(data.InStock == `true`){
            data.InStock = true;
        }else{
            data.InStock = false;
        }
       require(`../DB/addToDb`)(`dishes`, data);
       res.sendStatus(200);
    });

    app.post(`/checkLog`, (req, res) => {
        if(req.body.login == process.env.ADMIN_LOG && req.body.password == process.env.ADMIN_PASSWORD){
            req.session.login = process.env.ADMIN_LOG;
            req.session.passpord = process.env.ADMIN_PASSWORD;
            res.json(2);
        }else{
            require(`../DB/getData`)(`users`, req.body, {login: 1}, response => {
                if(response == 0){
                    res.json(0);
                }else{
                    req.session.login = req.body.login;
                    req.session.passpord = req.body.password;
                    res.json(response.length);
                }
            });
        }
    });

    app.post(`/logOut`, (req, res) => {
        req.session = null;
        res.sendStatus(200);
    });

    app.post(`/taxiWriteOrder`, (req, res) => {
        require(`../DB/addToDb`)(`taxi`, req.body);
        const subject = `Нова заявка`;
        const html = `<div style="text-align: center">
            <h2>Ім'я - ${req.body.Name}</h2>
            <h2>Номер телефону - ${req.body.Phone}</h2>
            <h2>Коли - ${req.body.Date} : ${req.body.Hour}</h2>
            <h2>Звідки - ${req.body.From}</h2>
            <h2>Куди - ${req.body.To}</h2>
        </div>`;
        require(`../config/sendMail`)(emails.taxi, subject, html);
        res.sendStatus(200);
    });

    app.use(`/cargoWriteOrder`, (req, res) => {
        require(`../DB/addToDb`)(`cargo`, req.body);
        const subject = `Нова заявка`;
        const html = `<div style="text-align: center">
            <h2>Ім'я - ${req.body.Name}</h2>
            <h2>Номер телефону - ${req.body.Phone}</h2>
            <h2>Коли - ${req.body.Date} : ${req.body.Hour}</h2>
            <h2>Звідки - ${req.body.From}</h2>
            <h2>Куди - ${req.body.To}</h2>
        </div>`;
        require(`../config/sendMail`)(emails.cargo, subject, html);
        res.sendStatus(200);
    });

    app.post(`/removeDish`, (req, res) => {
        let data = req.body;
        data.Owner = req.session.login;
        //console.log(data);
        require(`../DB/remove`)(`dishes`, data);
        res.sendStatus(200);
    });

    app.post(`/updateDish`, (req, res) => {
        let checkData = req.body.oldData;
        let newData = req.body.newData;
        checkData.Owner = req.session.login;
        if(checkData.hasOwnProperty(`InStock`)){
            if(checkData.InStock == `true`){
                checkData.InStock = true;
                newData.InStock = false;
            }else{
                checkData.InStock = false;
                newData.InStock = true;
            }
        }

        if(checkData.hasOwnProperty(`Prioritet`)){
            checkData.Prioritet = Number(checkData.Prioritet);
            newData.Prioritet = Number(newData.Prioritet);
        }

        require(`../DB/update`)(checkData, `dishes`, newData);
        res.json(1);
    });

    app.post(`/addNewRestaurant`, (req, res) => {
        let data = req.body;
        data.Prioritet = Number(data.Prioritet);
        require(`../DB/addToDb`)(`users`, req.body);
        res.json(1);
    });

    app.post(`/timetabel`, (req, res) => {
        require(`../DB/update`)({login: req.session.login}, `users`, req.body);
        res.json(1);
    });

    app.post(`/emailsConfig`, (req, res) => {
        fs.writeFileSync(`config/emailSender.json`, JSON.stringify(req.body));
        res.sendStatus(200);
    });

    app.post(`/writeContacts`, (req, res) => {
        fs.writeFileSync(`config/contacts.json`, JSON.stringify(req.body));
        res.sendStatus(200);
    });

    app.post(`/removeRestaurant`, (req, res) => {
        require(`../DB/remove`)(`users`, req.body);
        require(`../DB/remove`)(`dishes`, {Owner: req.body});
        res.sendStatus(200);
    });

    app.post(`/updateRestaurantData`, (req, res) => {
        let newData = req.body.newData;
        newData.Prioritet = Number(newData.Prioritet);
        let oldData = req.body.oldData;
        oldData.Prioritet = Number(oldData.Prioritet);
        require(`../DB/update`)(oldData, `users`, newData);

        require(`../DB/update`)({Owner: oldData.login}, `dishes`, {Owner: newData.login});

        res.sendStatus(200);
    });

    app.post(`/writePrice`, (req, res) => {
        fs.writeFileSync(`config/deliveryPrice.json`, JSON.stringify(req.body));
        res.sendStatus(200);
    });

    app.post(`/goCardPay`, (req, res) => {
        let sum = Number(req.body.ownersAmount) * Number(deliveryPrice.Price) + Number(req.body.price);
        console.log(sum);
        const data = require(`../config/payment`)(String(sum));
        req.session.orderData = JSON.stringify(req.body.data);
        res.json(data);
    });

    app.post(`/cashOrder`, (req, res) => {
        require(`./handlers/paymentData`)(req.body.data);
        res.sendStatus(200);
    });

    app.post(`/completed`, (req, res) => {
        require(`./handlers/paymentData`)(JSON.parse(req.session.orderData));
        require(`./handlers/paymentStatus`)(res);
    });


}