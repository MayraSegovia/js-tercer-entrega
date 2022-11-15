//Cart products
let addedProducts = []
if(localStorage.getItem("cartProducts")){
    addedProducts = JSON.parse(localStorage.getItem("cartProducts"))
}else{
    console.log("Seteando el array carrito por primera vez")
    localStorage.setItem("cartProducts", JSON.stringify(addedProducts))
}


//Find by searchbar

function searchCourse(searched, array){
    console.log(searched)
    let search = array.filter(
        (course) => course.language.toLowerCase().includes(searched.toLowerCase())
    )
    if(search.length == 0){
        
        coincidence.innerHTML = ""
        let newDiv = document.createElement("div")
        newDiv.innerHTML = `<p>No se encontró el curso, se muestran a continuación los cursos disponibles:</p>`
        coincidence.appendChild(newDiv)
        showCourses(array)
    }else{
        coincidence.innerHTML = ""
        showCourses(search)
    }

}

let divProducts = document.getElementById("products")
let searchBar = document.getElementById("searchBar")
let btnShowProducts = document.getElementById("showProducts")
let btnHideProducts = document.getElementById("hideProducts")
let modalBody = document.getElementById("modal-body")
let btnCart = document.getElementById("btnCart")
let coincidence = document.getElementById("coincidence")



function showCourses(array){
    divProducts.innerHTML = ""

    for(let course of array){
        let newCourse = document.createElement("div")
        newCourse.classList.add("col-12", "col-md-6", "col-lg-4", "my-1")
        
        newCourse.innerHTML = `<div id="${course.id}" class="card" style="width: 18rem;">
                                    <img class="card-img-top img-fluid" style="height: 200px;"src="imgs/${course.image}" alt="${course.language}">
                                    <div class="card-body">
                                        <h4 class="card-title">${course.language}</h4>
                                        <p class="">Precio: ${course.price}</p>
                                    <button id="addBtn${course.id}" class="btn btn-outline-success">Agregar al carrito</button>
                                    </div>
                                </div>`
    
    divProducts.appendChild(newCourse)

    let addBtn = document.getElementById(`addBtn${course.id}`)
    console.log(addBtn)
    addBtn.addEventListener("click", ()=>{
        addToCart(course)

    })

    }
}



showCourses(addedProducts)
//function Add to cart
function addToCart(course){
    console.log(course)
    addedProducts.push(course)
    console.log(addedProducts)
    localStorage.setItem("cartProducts", JSON.stringify(addedProducts))
}

function cartModal(array){
    modalBody.innerHTML = ""

    array.forEach((cartProduct)=>{
        modalBody.innerHTML += `
        <div class="card border-primary mb-3" id ="cartProduct${cartProduct.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="imgs/${cartProduct.image}" alt="${cartProduct.language}">
            <div class="card-body">
                    <h4 class="card-title">${cartProduct.language}</h4>
                
                    <p class="card-text">$${cartProduct.price}</p> 
                    <button class= "btn btn-danger" id="btnDelete${cartProduct.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
`
    })

    array.forEach((cartProduct, index)=>{
        document.getElementById(`btnDelete${cartProduct.id}`).addEventListener("click",()=>{
           console.log(`Boton eliminar ${cartProduct.language}`)
           let cardProduct = document.getElementById(`cartProduct${cartProduct.id}`)
           cardProduct.remove()
           addedProducts.splice(index, 1) 
           console.log(addedProducts)
           localStorage.setItem('cartProducts', JSON.stringify(addedProducts))

        })
    })
}




searchBar.addEventListener("input", ()=>{searchCourse(searchBar.value, courseList)})
btnCart.addEventListener("click", ()=>{
    cartModal(addedProducts)
}) 
showCourses(courseList)
