document.addEventListener('DOMContentLoaded', function() {

    fetch('data/cpu.json')
    .then(function(response) {
        return response.json()
    })
    .then(function(products) {
        displayProducts(products);
    }) 
})

function createProductCard(product) {
    return `
    <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="product-price">EUR ${product.price}</p>
        <a href="product.html?id=${product.id}">View Details</a>
    </div>`
}

function displayProducts(products) {
    const grid = document.getElementById('product-grid');
    const allCards = products.map(createProductCard).join('');
    grid.innerHTML = allCards;
}