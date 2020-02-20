document.onclick = el => {
    if(document.querySelector(`.menuList`).classList.contains(`none-display`) == false){
        if(el.target.attributes.class.value != `menuPoints` && el.target.attributes.class.value != `pointInMenu`){
            document.querySelector(`.menuList`).classList.add(`none-display`);
        }
    }else if(document.querySelector(`.menuList`).classList.contains(`none-display`)){
        if(el.target.attributes.class.value == `showMenu` || el.target.attributes.class.value == `menu`){
           document.querySelector(`.menuList`).classList.remove(`none-display`);
       }
   }

    if(el.target.id == `show-add-new-dish`){
        document.getElementById(`goodsContainer`).classList.add(`none-display`);
        document.getElementById(`editGoods`).classList.add(`none-display`);
        document.querySelector(`.editDishForm`).classList.add(`none-display`);
        document.querySelector(`#restaurantTimetable`).classList.add(`none-display`);
        document.querySelector(`footer`).classList.remove(`bottom-0`);
        document.querySelector(`.container-contact100`).classList.remove(`none-display`);
    }else if(el.target.id == `show-remove-dish`){
        document.querySelector(`.container-contact100`).classList.add(`none-display`);
        document.querySelector(`#editGoods`).classList.add(`none-display`);
        document.querySelector(`footer`).classList.add(`bottom-0`);
        document.querySelector(`.editDishForm`).classList.add(`none-display`);
        document.querySelector(`#restaurantTimetable`).classList.add(`none-display`);
        document.getElementById(`goodsContainer`).classList.remove(`none-display`);
    }else if(el.target.id == `show-edit-dish`){
        document.querySelector(`.container-contact100`).classList.add(`none-display`);
        document.getElementById(`goodsContainer`).classList.add(`none-display`);
        document.querySelector(`footer`).classList.add(`bottom-0`);
        document.querySelector(`.editDishForm`).classList.add(`none-display`);
        document.querySelector(`#restaurantTimetable`).classList.add(`none-display`);
        document.querySelector(`#editGoods`).classList.remove(`none-display`);
    }else if(el.target.id == `show-timetable`){
        document.querySelector(`.container-contact100`).classList.add(`none-display`);
        document.getElementById(`goodsContainer`).classList.add(`none-display`);
        document.querySelector(`footer`).classList.add(`bottom-0`);
        document.querySelector(`.editDishForm`).classList.add(`none-display`);
        document.querySelector(`#editGoods`).classList.add(`none-display`);
        document.querySelector(`footer`).classList.remove(`bottom-0`);
        document.querySelector(`#restaurantTimetable`).classList.remove(`none-display`);
    } else if(el.target.id == `show-taxi-sending`){
        //document.querySelector(`.container-contact100`).classList.add(`none-display`);
        //document.getElementById(`goodsContainer`).classList.add(`none-display`);
        document.querySelector(`footer`).classList.remove(`bottom-0`);
        document.querySelector(`#addRestaurant`).classList.add(`none-display`);
        document.querySelector(`#delivery-price-form`).classList.add(`none-display`);
        document.querySelector(`#contacts-form`).classList.add(`none-display`);
        document.querySelector(`#restaurantsRemove`).classList.add(`none-display`);
        document.querySelector(`#restaurantsEdit`).classList.add(`none-display`);
        document.querySelector(`.edit-restaurant-form`).classList.add(`none-display`);
        document.querySelector(`#taxi-email-form`).classList.remove(`none-display`);
    }else if(el.target.id == `show-add-new-restaurant`){
        //document.querySelector(`.container-contact100`).classList.add(`none-display`);
        //document.getElementById(`goodsContainer`).classList.add(`none-display`);
        document.querySelector(`footer`).classList.remove(`bottom-0`);
        document.querySelector(`#taxi-email-form`).classList.add(`none-display`);
        document.querySelector(`#contacts-form`).classList.add(`none-display`);
        document.querySelector(`#delivery-price-form`).classList.add(`none-display`);
        document.querySelector(`#restaurantsRemove`).classList.add(`none-display`);
        document.querySelector(`#restaurantsEdit`).classList.add(`none-display`);
        document.querySelector(`.edit-restaurant-form`).classList.add(`none-display`);
        document.querySelector(`#addRestaurant`).classList.remove(`none-display`);
    }else if(el.target.id == `show-contactUs`){
        //document.querySelector(`.container-contact100`).classList.add(`none-display`);
        //document.getElementById(`goodsContainer`).classList.add(`none-display`);
        document.querySelector(`footer`).classList.remove(`bottom-0`);
        document.querySelector(`#taxi-email-form`).classList.add(`none-display`);
        document.querySelector(`#addRestaurant`).classList.add(`none-display`);
        document.querySelector(`#delivery-price-form`).classList.add(`none-display`);
        document.querySelector(`#restaurantsRemove`).classList.add(`none-display`);
        document.querySelector(`#restaurantsEdit`).classList.add(`none-display`);
        document.querySelector(`.edit-restaurant-form`).classList.add(`none-display`);
        document.querySelector(`#contacts-form`).classList.remove(`none-display`);
    }else if(el.target.id == `show-remove-restaurant`){
        //document.querySelector(`.container-contact100`).classList.add(`none-display`);
        //document.getElementById(`goodsContainer`).classList.add(`none-display`);
        document.querySelector(`footer`).classList.add(`bottom-0`);
        document.querySelector(`#taxi-email-form`).classList.add(`none-display`);
        document.querySelector(`#addRestaurant`).classList.add(`none-display`);
        document.querySelector(`#delivery-price-form`).classList.add(`none-display`);
        document.querySelector(`#contacts-form`).classList.add(`none-display`);
        document.querySelector(`#restaurantsEdit`).classList.add(`none-display`);
        document.querySelector(`.edit-restaurant-form`).classList.add(`none-display`);
        document.querySelector(`#restaurantsRemove`).classList.remove(`none-display`);
    }else if(el.target.id == `show-edit-restaurant`){
        //document.querySelector(`.container-contact100`).classList.add(`none-display`);
        //document.getElementById(`goodsContainer`).classList.add(`none-display`);
        document.querySelector(`footer`).classList.add(`bottom-0`);
        document.querySelector(`#taxi-email-form`).classList.add(`none-display`);
        document.querySelector(`#addRestaurant`).classList.add(`none-display`);
        document.querySelector(`.edit-restaurant-form`).classList.add(`none-display`);
        document.querySelector(`#delivery-price-form`).classList.add(`none-display`);
        document.querySelector(`#contacts-form`).classList.add(`none-display`);
        document.querySelector(`#restaurantsRemove`).classList.add(`none-display`);
        document.querySelector(`#restaurantsEdit`).classList.remove(`none-display`);
    }else if(el.target.id == `show-delivery-price`){
        //document.querySelector(`.container-contact100`).classList.add(`none-display`);
        //document.getElementById(`goodsContainer`).classList.add(`none-display`);
        document.querySelector(`footer`).classList.add(`bottom-0`);
        document.querySelector(`#taxi-email-form`).classList.add(`none-display`);
        document.querySelector(`#addRestaurant`).classList.add(`none-display`);
        document.querySelector(`.edit-restaurant-form`).classList.add(`none-display`);
        document.querySelector(`#contacts-form`).classList.add(`none-display`);
        document.querySelector(`#restaurantsRemove`).classList.add(`none-display`);
        document.querySelector(`#restaurantsEdit`).classList.add(`none-display`);
        document.querySelector(`#delivery-price-form`).classList.remove(`none-display`);
    }

}