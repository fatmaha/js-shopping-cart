const Cart = require('./services/Cart');



Cart.list().then(response => {
    let data = response.data;
    let card = document.querySelector('#products-list')
    for(let i in data){
        card.innerHTML += `<div class="card mb-3" data-id="${data[i].id}"><div class="row g-0">
        <div class="col-md-4 p-3"><img src="${data[i].image}" class="img-fluid rounded-start"></div>
        <div class="col-md-8 p-3"><div class="card-body">
        <h5 class="card-title" data-title>${data[i].title}</h1>
        <p class="card-text text-muted pt-4">${data[i].description}</p>
        <div class="card-text d-flex justify-content-between">
        <small data-price="${data[i].price}" class="price">${data[i].price}</small><span class="currancy">$</span>
        <button data-id="${data[i].id}" class="btn btn-primary ms-auto"> Add to Cart</button>
        </div>
        </div></div>
        </div></div>`;
    }

    let btns = document.querySelectorAll('button.btn-primary')
    btns.forEach(function(btn) {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        let id = e.target.getAttribute('data-id');
        let price = document.querySelector(`div[data-id="${id}"] small[data-price]`)
        let value = price.textContent

    
        let cart = document.querySelector('#cart-list')
        cart.innerHTML += `<li data-id="${id}" class="list-group-item d-flex justify-content-between">
          <span>Product x ${id}</span>
          <span data-value>${value}</span>
          <button data-id="${id}" class="btn-rm"><i data-id="${id}" class="fas fa-times"></i></button>
        </li> `;
        let prices = document.querySelector(`span[data-value]`)
        let valuep = prices.textContent
        // console.log(valuep)

        deletelistener()

        let y = Number(value);
        let x = Number(valuep);
      
        function sum(){
        var sum = 0;
        for(var i=0;i<arguments.length;i++)
          {                  
              sum += Number(arguments[i]);
        }
         return sum;
        }

          console.log(sum(x,y));
     

            let total = document.querySelector('#total')
            total.innerHTML = ` <li class="list-group-item border-black d-flex align-items-center">
            <span class="w-55">Total</span>
            <span class="style-price">${sum(x,y)}</span>
             </li>`;
      
        
        
            
    })       
})

})

function deletelistener() {
    let btns = document.querySelectorAll('button.btn-rm')
    btns.forEach(function(btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            let id = e.target.getAttribute('data-id');
            console.log(id)
            Cart.delete(id).then(response => {
                document.querySelector(`li[data-id="${id}"]`).remove()
            })
        })
        
    })
}










