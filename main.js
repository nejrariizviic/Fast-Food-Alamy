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
                <button type="button" onclick="fillEditData(${food.id})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editFood" data-bs-whatever="@getbootstrap">Edit</button>
                <button type="button" onclick="deleteFood(${food.id})" class="btn btn-danger">Delete</button>
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
        console.log(`Status code: ${res.status}`);
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
        console.log(`Status code: ${res.status}`);
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
        console.log(`Status code: ${res.status}`);
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















/*
fetch('https://ptf-web-dizajn-2022.azurewebsites.net/api/Food')
.then(res => {
    if(!res.ok) {
        throw Error('[GRESKA] Dogodila se greska.');
    } 
    return res.json();
})
.then(data => {
    const cardList = document.querySelector('#content__food__cards');
    let cards = '';

    data.forEach(element => {
        cards += `
            <div class="card" style="width: 18rem; height: auto; margin: 0 20px; margin-top: 20px;" id="${element.id}">
                <img src="${element.imageUrl}" class="card-img-top" alt="..." style="width: 100%; height: 60%;">
                <div class="card-body">
                    <h5 class="card-title text-dark">${element.name}</h5>
                    <p class="card-text text-dark">Cijena: ${element.price} KM</p>
                    <button href="" class="btn content__food__cards__root-buttons" onclick="editFood(this)" id="content__food__cards__root-buttons-edit"><span class="text-light">Uredi</span></button>
                    <button href="" class="btn content__food__cards__root-buttons" onclick="deleteFood(this)" id="content__food__cards__root-buttons-delete"> <span class="text-light">Izbriši</span></button>
                    <button href="" class="btn btn-primary" onclick="dodajUKorpu(this)"><span class="text-light">Naruči</span></button>
                
                    <div class="modal fade" id="rezervacija" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Reservation your book:</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <form>
                              <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Frst name:</label>
                                <input type="text" class="form-control" id="recipient-name">
                              </div>
                              <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Last name:</label>
                                <input type="text" class="form-control" id="recipient-name">
                              </div>
                              <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">E-mail:</label>
                                <input type="text" class="form-control" id="recipient-name">
                              </div>
                              <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Contact:</label>
                                <input type="text" class="form-control" id="recipient-name">
                              </div>
                              <div class="mb-3">
                                <label for="message-text" class="col-form-label"> Day:</label>
                                <textarea class="form-control" id="message-text"></textarea>
                              </div>
                             
                            </form>
                          </div>
                    
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Reservation</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                </div>
            </div>  
                              
        `
    })

    cardList2.innerHTML = cards; 
})


fetch('https://ptf-web-dizajn-2022.azurewebsites.net/api/Food')
.then(res => {
    if(!res.ok) {
        throw Error('[GRESKA] Dogodila se greska.');
    } 
    return res.json();
})
.then(data => {
    const cardList = document.querySelector('#content__food__cards');
    let cards = '';

    data.forEach(element => {
        cards += `
            <div class="card" style="width: 18rem; height: auto; margin: 0 20px; margin-top: 20px;" id="${element.id}">
                <img src="${element.imageUrl}" class="card-img-top" alt="..." style="width: 100%; height: 60%;">
                <div class="card-body">
                    <h5 class="card-title text-dark">${element.name}</h5>
                    <p class="card-text text-dark">Cijena: ${element.price} KM</p>
                    <button href="" class="btn content__food__cards__root-buttons" onclick="editFood(this)" id="content__food__cards__root-buttons-edit"><span class="text-light">Uredi</span></button>
                    <button href="" class="btn content__food__cards__root-buttons" onclick="deleteFood(this)" id="content__food__cards__root-buttons-delete"> <span class="text-light">Izbriši</span></button>
                    <button href="" class="btn btn-primary" onclick="dodajUKorpu(this)"><span class="text-light">Naruči</span></button>
                </div>
            </div>                    
        `
    })

    cardList.innerHTML = cards; 
})


const deleteBooks = (books) => {
  let booksId = books.parentElement.parentElement.id;
  
  fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/books/${booksId}`, {
      method: 'DELETE'
  })
  .then(res => {
      if (res.ok) {
          console.log(`Delete status code: ${res.status}`);
          
          let booksCard = document.getElementById(booksId);
         booksCard.remove();
         console.log(res);
          
      } else {
          let popup = document.querySelector('#error-pop-up');
      }
  })
}


*/