addToCart = (name, price,  image, owner, description) => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Страва додана до корзини',
        showConfirmButton: false,
        timer: 1100
    });
    let data = [];
    if(localStorage.getItem(`cart`) == undefined){
        data.push({
            Name: name,
            Price: price,
            Image: image,
            Amount: 1,
            Owner: owner,
            Description: description
        });
        localStorage.setItem(`cart`, JSON.stringify(data));
    }else{
        data = JSON.parse(localStorage.getItem(`cart`));
        for(let i=0; i<data.length; i++){
            if(data[i].Name == name && data[i].Image == image){
                data[i].Amount = Number(data[i].Amount) + 1;
                localStorage.setItem(`cart`, JSON.stringify(data));
                break;
            }

            if(i == data.length - 1 && (data[i].Name != name && data[i].Image != image)){
                data.push({
                    Name: name,
                    Price: price,
                    Image: image,
                    Amount: 1,
                    Owner: owner,
                    Description: description
                });
                let counter = 0;
                for(let i=0; i<data.length; i++){
                    if(data[i].Owner != owner){
                        counter++;
                    }
                }

                if(counter != 0){
                    let current_price = document.querySelector(`#deliveryPrice`).innerText.replace(`₴`, ``);
                    current_price = Number(current_price.replace(`,`, `.`));
                    const price_for_one = Number(document.querySelector(`#onlyDeliverPrice`).innerText.replace(`,`, `.`));
                    document.querySelector(`#deliveryPrice`).innerText = `₴${current_price + price_for_one}`;
                }
                localStorage.setItem(`cart`, JSON.stringify(data));
                break;
            }

        }

    }
    showCartIcon();
}

showCart = () => {
    let out = ``;
    const data = JSON.parse(localStorage.getItem(`cart`));
    for(let i=0; i<data.length; i++){
        if(i % 2 == 0){
            out += `<li class="items odd" id="cartElem${i}">`
        }else{
            out += `<li class="items even" id="cartElem${i}">`
        }

        out+=` <div class="infoWrap">
                        <div class="cartSection" style="width: 65%">
                            <img src="${data[i].Image}" alt="" class="itemImg" />
                            <h3>${data[i].Name}</h3>
                            <p>
                                <input type="number" class="qty" oninput="checkNum(this, 'cartElem${i}', '${data[i].Name}', '${data[i].Image}', '${data[i].Owner}');" placeholder="${data[i].Amount}" /> x ₴${data[i].Price}</p>
                        </div>
                        <div class="prodTotal cartSection" style="width: 27%">
                            <p>₴${Number(data[i].Amount) * Number(data[i].Price)}</p>
                        </div>
                        <div class="cartSection removeWrap">
                            <a href="#" class="remove" onclick="removeFromCart('${data[i].Name}', '${data[i].Image}', 'cartElem${i}', '${data[i].Owner}')">x</a>
                        </div>
                    </div>
                </li>`;
    }
    document.querySelector(`.cartWrap`).innerHTML = out;
    document.querySelector(`.orderPrice`).innerHTML = `₴${countPrice()}`;
    document.querySelector(`#finalPrice`).innerHTML = `₴${finalPrice()}`;
    document.querySelector(`.card-with-background`).style.display = `flex`;
}

checkNum = (el, elemLi, name, image, owner) => {
    if (el.value.length >2){
        el.value = el.value.slice(0, 2);
    }

    if(el.value.indexOf(``) != -1){
        el.value = el.value.replace(`-`, ``);
    }

    if(el.value == 0){
        removeFromCart(name, image, elemLi, owner);
    }else{
        const data = JSON.parse(localStorage.getItem(`cart`));
        for(let i=0; i<data.length; i++){
            if(data[i].Name == name && data[i].Image == image){
                data[i].Amount = el.value;
                localStorage.setItem(`cart`, JSON.stringify(data));
                document.querySelector(`.orderPrice`).innerHTML = `₴${countPrice()}`;
                document.querySelector(`#finalPrice`).innerHTML = `₴${finalPrice()}`;
                document.querySelector(`.prodTotal.cartSection p`).innerHTML = `₴${Number(el.value) * data[i].Price}`;
                break;
            }
        }
        return;
    }

}

removeFromCart = (name, image, elem, owner) => {
    document.getElementById(elem).style.display = `none`;
    const data = JSON.parse(localStorage.getItem(`cart`));
    for(let i=0; i<data.length; i++){
        if(data[i].Name == name && data[i].Image == image){
            data.splice(i, 1);
            break;
        }
    }

    data.empty = () => {
        for (let i = 0, s = this.length; i < s; i++) { this.pop(); }
        return this;
    };

    let counter = 0;
    for(let i=0; i<data.length; i++){
        if(data[i].Owner == owner){
            counter++;
        }
    }

    if(counter == 0){
        let current_price = document.querySelector(`#deliveryPrice`).innerText.replace(`₴`, ``);
        current_price = Number(current_price.replace(`,`, `.`));
        const price_for_one = Number(document.querySelector(`#onlyDeliverPrice`).innerText.replace(`,`, `.`));
        document.querySelector(`#deliveryPrice`).innerText = `₴${current_price - price_for_one}`
    }

    if(data.length == 0){
        document.querySelector(`.card-with-background`).style.display = `none`;
        localStorage.removeItem(`cart`);
        document.querySelector(`.cartIcon`).remove();
        return 0;
    }else{
        localStorage.setItem(`cart`, JSON.stringify(data));
        document.querySelector(`.orderPrice`).innerHTML = `₴${countPrice()}`;
        document.querySelector(`#finalPrice`).innerHTML = `₴${finalPrice()}`;
    }
}

finalPrice = () => {
    let orderPrice = Number(document.querySelector(`.orderPrice`).innerText.replace(`₴`, ``));
    //let deliveryPrice = Number(document.querySelector(`#deliveryPrice`).innerText.replace(`₴`, ``)) * countOwners(localStorage.getItem(`cart`));
    let deliveryPrice = Number(document.querySelector(`#onlyDeliverPrice`).innerText.replace(`,`, `.`)) * countOwners(localStorage.getItem(`cart`));
    document.getElementById(`deliveryPrice`).innerText = `₴${deliveryPrice}`;
    return orderPrice + deliveryPrice;
}

countOwners = data => {
    data = JSON.parse(data);
    let owners = [];
    for(let i=0; i<data.length; i++){
        if(owners.includes(data[i].Owner) == false){
            owners.push(data[i].Owner);
        }
    }
    //console.log(owners.length);
    return owners.length;
}

countPrice = () => {
    const data = JSON.parse(localStorage.getItem(`cart`));
    let price = 0;
    for(let i=0; i<data.length; i++){
        price += Number(data[i].Price) * Number(data[i].Amount);
    }
    return price;
}

hideCart = () => {
    document.querySelector(`.card-with-background`).style.display = `none`;
}

showCartIcon = () => {
    if(localStorage.getItem(`cart`) != undefined){
        document.querySelector(`body`).innerHTML += `<div class="cartIcon" onclick="showCart()"><svg version="1.1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="40" height="40"><g><g>
<g>
<path d="M509.867,89.6c-2.133-2.133-4.267-4.267-8.533-4.267H96L85.333,29.867c0-4.267-6.4-8.533-10.667-8.533h-64    C4.267,21.333,0,25.6,0,32c0,6.4,4.267,10.667,10.667,10.667h55.467l51.2,260.267c6.4,34.133,38.4,59.733,72.533,59.733H435.2    c6.4,0,10.667-4.267,10.667-10.667c0-6.4-4.267-10.667-10.667-10.667H192c-17.067,0-34.133-8.533-42.667-23.467L460.8,275.2    c4.267,0,8.533-4.267,8.533-8.533L512,96C512,96,512,91.733,509.867,89.6z M450.133,256l-311.467,40.533l-38.4-192H486.4    L450.133,256z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/>
</g>
</g><g>
<g>
<path d="M181.333,384C151.467,384,128,407.467,128,437.333c0,29.867,23.467,53.333,53.333,53.333    c29.867,0,53.333-23.467,53.333-53.333C234.667,407.467,211.2,384,181.333,384z M181.333,469.333c-17.067,0-32-14.934-32-32    s14.933-32,32-32c17.067,0,32,14.934,32,32S198.4,469.333,181.333,469.333z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/>
</g>
</g><g>
<g>
<path d="M394.667,384c-29.867,0-53.333,23.467-53.333,53.333c0,29.867,23.467,53.333,53.333,53.333    c29.867,0,53.333-23.467,53.333-53.333C448,407.467,424.533,384,394.667,384z M394.667,469.333c-17.067,0-32-14.934-32-32    s14.933-32,32-32c17.067,0,32,14.934,32,32S411.733,469.333,394.667,469.333z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/>
</g>
</g></g> </svg></div>`
    }
}

showCartIcon();
