let allProducts = [];

document.addEventListener('DOMContentLoaded', function() {
   const categories = ['cpu', 'gpu', 'ram', 'motherboard', 'psu', 'case', 'ssd', 'fans']

Promise.all(
    categories.map(function(category) {
        return fetch(`data/${category}.json`)
            .then(function(response) {
                return response.json()
            })
    })
).then(function(results) {
    allProducts = results.flat()
    displayProducts(allProducts)
})

document.getElementById("shop-search").addEventListener("keyup", handleSearch);
document.querySelector(".search-btn").addEventListener("click", handleSearch);

document.getElementById("sort-select").addEventListener("change", handleSort);

document.getElementById("product-filter").addEventListener("change", handleFilter);

});



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

function handleSearch() {
    const input = document.getElementById("shop-search")
    const searchTerm = input.value.toLowerCase()

    const filtered = allProducts.filter(function(product) {
        return product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    })

    displayProducts(filtered);
}

function handleSort() {
    const sortValue = document.getElementById("sort-select").value;

    let sorted = allProducts.slice();

    if(sortValue === 'price-asc') {
        sorted.sort(function(a, b) {return a.price - b.price})
    } else if(sortValue === 'price-desc') {
        sorted.sort(function(a, b) {return b.price - a.price})
    } else if(sortValue === 'name-asc') {
        sorted.sort(function(a, b) {
            return a.name.localeCompare(b.name) 
        })
    }
    displayProducts(sorted);
}


function handleFilter() {

const checked = document.querySelectorAll("#product-filter input[type='checkbox']:checked");

const selectedCategories = Array.from(checked).map(function(checkbox) {
    return checkbox.value;
});

if(selectedCategories.length === 0) {
    displayProducts(allProducts);
} else {
    const filtered = allProducts.filter(function(product) {
        return selectedCategories.includes(product.category)
    });
    displayProducts(filtered);
}

}