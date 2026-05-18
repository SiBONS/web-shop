document.addEventListener('DOMContentLoaded', function() {

    // step 1 - read the URL
    const params = new URLSearchParams(window.location.search)
    const productId = params.get('id')

    // step 2 - get category from id
    const category = productId.split('-')[0]

    // step 3 - fetch and find the product
    fetch(`data/${category}.json`)
        .then(function(response) { return response.json() })
        .then(function(products) {
            const product = products.find(function(p) {
                return p.id === productId
            })
            displayProduct(product)
        })

}) 

function displayProduct(product) {
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = `€ ${product.price}`;
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-image").alt = product.name;
    document.getElementById("product-description").textContent = product.description;

    const specsContainer = document.getElementById('product-specs')
    let specsHTML = ''

    const specLabels = {
    cores: 'Cores',
    threads: 'Threads',
    base_clock: 'Base Clock',
    socket: 'Socket',
    tdp: 'TDP',
    vram: 'VRAM',
    memory_type: 'Memory Type',
    boost_clock: 'Boost Clock',
    connector: 'Connector',
    capacity: 'Capacity',
    speed: 'Speed',
    type: 'Type',
    latency: 'Latency',
    kit: 'Kit',
    chipset: 'Chipset',
    form_factor: 'Form Factor',
    ram_slots: 'RAM Slots',
    max_ram: 'Max RAM',
    wattage: 'Wattage',
    efficiency: 'Efficiency',
    modular: 'Modular',
    max_gpu_length: 'Max GPU Length',
    drive_bays: 'Drive Bays',
    side_panel: 'Side Panel',
    interface: 'Interface',
    read_speed: 'Read Speed',
    write_speed: 'Write Speed',
    size: 'Size',
    rpm: 'RPM',
    airflow: 'Airflow',
    noise_level: 'Noise Level',
    bearing_type: 'Bearing Type'
}

Object.keys(product.specs).forEach(function(key) {
    const label = specLabels[key] || key
    specsHTML += `<p><strong>${label}:</strong> ${product.specs[key]}</p>`
})

specsContainer.innerHTML = specsHTML
}