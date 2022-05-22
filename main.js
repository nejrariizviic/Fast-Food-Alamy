let foods = [];

fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/api/Food`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        foods = data;
        renderFoods(data);
    });

const renderFoods = (foods) => {
    const foodsRow = document.getElementById('content__foods__cards');

    let resultFoodsHtml = '';

    foods.forEach(food => {
        resultFoodsHtml += `
        <div class="card mx-2 my-2" style="width: 18rem;" id="${food.id}">
            <img src="${food.imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${food.name}</h5>
                <p class="card-text">${food.price}KM</p>
                <button type="button" onclick="fillEditData(${food.id})" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#editFood" data-bs-whatever="@getbootstrap">Edit</button>
                <button type="button" onclick="deleteFood(${food.id})" class="btn btn-outline-secondary">Delete</button>
                <button type="button" class="btn btn-outline-dark btn-sm">Order</button>
            </div>
        </div>
        `;
    });

    foodsRow.innerHTML = resultFoodsHtml;
}

const fillEditData = (foodId) => {
    const food = foods.find(food => food.id === foodId);
    const foodFormId = document.getElementById('food-id');
    const foodFormName = document.getElementById('food-name');
    const foodFormImage = document.getElementById('food-image');
    const foodFormPrice = document.getElementById('food-price');

    foodFormId.value = food.id;
    foodFormName.value = food.name;
    foodFormImage.value = food.imageUrl;
    foodFormPrice.value = food.price;
}

const editFood = () => { 
    const foodFormId = document.getElementById('food-id').value;
    const foodFormName = document.getElementById('food-name').value;
    const foodFormImage = document.getElementById('food-image').value;
    const foodFormPrice = document.getElementById('food-price').value;

    fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/api/Food`, {
        method: 'PUT', 
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
            id: foodFormId,
            name: foodFormName,
            imageUrl: foodFormImage,
            price: foodFormPrice
        })
    })
    .then(res => {
        console.log(`Put status code: ${res.status}`);
        if (res.ok) {
            let kartica = document.getElementById(foodFormId);
            kartica.children[0].src = foodFormImage;
            kartica.children[1].children[0].innerText = foodFormName;
            kartica.children[1].children[1].innerText = foodFormPrice; 
        }
    })
}

const deleteFood = (id) => {
    fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/api/Food/${id}`, {
        method: 'DELETE'
    })
    .then(res => {
        console.log(`Delete status code: ${res.status}`);
        if (res.ok) {
            let kartica = document.getElementById(id);
            kartica.remove();
        } else {
            console.log(`Nije moguće obrisati hranu koja sadrži ID: ${id}`);
        }
    })
}

const addFood = () => {
    const foodFormId = document.getElementById('food-add-id').value;
    const foodFormName = document.getElementById('food-add-name').value;
    const foodFormImage = document.getElementById('food-add-image').value;
    const foodFormPrice = document.getElementById('food-add-price').value;

    fetch('https://ptf-web-dizajn-2022.azurewebsites.net/api/Food', {
        method: 'POST', 
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
            id: foodFormId,
            name: foodFormName,
            price: foodFormPrice,
            imageUrl: foodFormImage
        })
    })
    .then(res => {
        console.log(`Post status code: ${res.status}`);
        if (res.ok) {
            const foodsRow = document.getElementById('content__foods__cards');

            let resultFoodsHtml = '';
        
            resultFoodsHtml += `
                <div class="card mx-2 my-2" style="width: 18rem;" id="${foodFormId}">
                    <img src="${foodFormImage}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${foodFormName}</h5>
                        <p class="card-text">${foodFormPrice}KM</p>
                        <button type="button" onclick="fillEditData(${foodFormId})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editFood" data-bs-whatever="@getbootstrap">Edit</button>
                        <button type="button" onclick="deleteFood(${foodFormId})" class="btn btn-danger">Delete</button>
                    </div>
                </div>
             `;
        
            foodsRow.innerHTML += resultFoodsHtml;            
        }
    })
}













