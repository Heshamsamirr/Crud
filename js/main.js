let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCategory");
let productDescInput = document.getElementById("productDesc");
let productsContainer = [];
let currentIndex = 0;
let add = document.getElementById('add')
let alertName = document.getElementById('alert-name')
let alertPrice = document.getElementById('alert-price')
let alertCategory = document.getElementById('alert-category')
let alertDesc = document.getElementById('alert-desc')
let alertAll = document.getElementById('alert-all')



// update date from localStorage

if (localStorage.getItem("productsList") != null) {

    productsContainer = JSON.parse(localStorage.getItem('productsList'))
    displayProducts()
}


// add new product
function addProduct() {
    if (
        productNameInput.value == "" ||
        productPriceInput.value == "" ||
        productCategoryInput.value == "" ||
        productDescInput.value == ""
    ) {
        alertAll.removeAttribute('hidden')
    }
    else {
        if (document.getElementById("add").innerHTML == "Add Product") {
            displayProducts()
        }
        else {
            updateProduct()
        }
        let product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value
        }
        productsContainer.push(product);
        localStorage.setItem("productsList", JSON.stringify(productsContainer))
        displayProducts()
        clearForm()
        alertAll.hidden = "true"
    }
}
// reset after display data to table :

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
    add.disabled = "true"
    productNameInput.classList.remove("is-invalid")
    productNameInput.classList.remove("is-valid")
    productPriceInput.classList.remove("is-invalid")
    productPriceInput.classList.remove("is-valid")
    productCategoryInput.classList.remove("is-invalid")
    productCategoryInput.classList.remove("is-valid")
    productDescInput.classList.remove("is-invalid")
    productDescInput.classList.remove("is-valid")
}

//display data to table :

function displayProducts() {
    let container = ``;
    for (i = 0; i < productsContainer.length; i++) {
        container += `
<tr class="ttr">    
    <td>${[i + 1]}</td>
    <td>${productsContainer[i].name}</td>
    <td>${productsContainer[i].price}</td>
    <td>${productsContainer[i].category}</td>
    <td>${productsContainer[i].desc}</td>
    <td>
    <a href="#Crud" class="text-decoration-none">
        <i onclick="getProduct(${i})" class="fas fa-edit "></i>
    </a>
    </td>
    <td>
    <a  class="text-decoration-none">

    <i onclick="deleteProduct(${i})" class="fas fa-minus-circle text-danger"></i>
    </a>
    </td>

    </tr>
    `
    }
    document.getElementById("tableBody").innerHTML = container;
}

//delete product from table :
function deleteProduct(index) {
    productsContainer.splice(index, 1)
    localStorage.setItem("productsList", JSON.stringify(productsContainer))
    displayProducts()
}

//search product from table :

function searchProduct(term) {
    let container = ``;

    for (i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true) {

            container += `
            <tr class="ttr">
                <td>${[i + 1]}</td>
                <td>${productsContainer[i].name}</td>
                <td>${productsContainer[i].price}</td>
                <td>${productsContainer[i].category}</td>
                <td>${productsContainer[i].desc}</td>
                <td>
        <a href="#Crud" class="text-decoration-none">
        <i onclick="getProduct(${i})" class="fas fa-edit text-green"></i>
        </a>
        </td>
        <td>
        <a href="#" class="text-decoration-none">

        <i onclick="deleteProduct(${i})" class="fas fa-minus-circle text-danger"></i>
        </a>
        </td>
        </tr>
        `
        }
    }
    document.getElementById("tableBody").innerHTML = container;
}

// update data from table :
function getProduct(index) {
    productNameInput.value = productsContainer[index].name;
    productPriceInput.value = productsContainer[index].price;
    productCategoryInput.value = productsContainer[index].category;
    productDescInput.value = productsContainer[index].desc;
    document.getElementById("add").innerHTML = "Update"
    currentIndex = index;

}
function updateProduct() {
    let product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    }
    productsContainer[currentIndex] = product;
    localStorage.setItem("productsList", JSON.stringify(productsContainer))
    document.getElementById("add").innerHTML = "Add Product"
    deleteProduct(currentIndex)

}

// =====>validation<======

// 1 -- Validate Product Name Function:

function ValidateName() {
    let regex = /^[a-z A-Z 0-9]{4,}$/
    if (regex.test(productNameInput.value) == true) {

        add.removeAttribute("disabled")
        productNameInput.classList.add("is-valid")
        productNameInput.classList.remove("is-invalid")
        alertName.hidden = "true"
        return true;
    }
    else {
        add.disabled = "true"
        productNameInput.classList.add("is-invalid")
        productNameInput.classList.remove("is-valid")
        alertName.removeAttribute('hidden')
        return false;
    }
}
productNameInput.addEventListener("keyup", ValidateName)
// 2 -- Validate Product price Function:

function ValidatePrice() {

    let regex = /^([1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|10000)$/;
    if (regex.test(productPriceInput.value) == true) {
        add.removeAttribute("disabled")
        productPriceInput.classList.add("is-valid")
        productPriceInput.classList.remove("is-invalid")
        alertPrice.hidden = "true"
        return true;

    }
    else {
        add.disabled = "true"
        productPriceInput.classList.add("is-invalid")
        productPriceInput.classList.remove("is-valid")
        alertPrice.removeAttribute('hidden')
        return false;

    }
}
productPriceInput.addEventListener("keyup", ValidatePrice)
// 3- -- Validate Product category Function:

function ValidateCategory() {

    let regex = /^(tv|mobile|lap)/
    if (regex.test(productCategoryInput.value) == true) {
        add.removeAttribute("disabled")
        productCategoryInput.classList.add("is-valid")
        productCategoryInput.classList.remove("is-invalid")
        alertCategory.hidden = "true"
        return true;

    }
    else {
        add.disabled = "true"
        productCategoryInput.classList.add("is-invalid")
        productCategoryInput.classList.remove("is-valid")
        alertCategory.removeAttribute('hidden')
        return false;

    }
}
productCategoryInput.addEventListener("keyup", ValidateCategory)
// 4 -- Validate Product Desc Function:

function ValidateDesc() {

    let regex = /^[a-z A-Z 0-9]{4,}$/
    if (regex.test(productDescInput.value) == true) {
        add.removeAttribute("disabled")
        productDescInput.classList.add("is-valid")
        productDescInput.classList.remove("is-invalid")
        alertDesc.hidden = "true"
        return true;

    }
    else {
        add.disabled = "true"
        productDescInput.classList.add("is-invalid")
        productDescInput.classList.remove("is-valid")
        alertDesc.removeAttribute('hidden')
        return false;

    }
}
productDescInput.addEventListener("keyup", ValidateDesc)