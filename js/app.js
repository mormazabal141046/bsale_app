//Funcion para mostrar un elemento Loading mientas se espera la Data. Se reutiliza cada vez que se realizar una peticion.
const loadData =()=>{
    const loading = document.querySelector("#products");
    loading.innerHTML=`<div class="message">
        <i class="fas fa-spinner fa-pulse"></i>
        <h2>Obtieniendo Productos</h2>
    </div>`;
}

const url = window.location;
const headers_http = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };


// CONTROLES DE CATEGORIAS
//
//
//
// Se obtienen las Categorias desde DB
const getCategories = () =>{
    fetch(url+'api/categories'
    ).then((resp) =>{
        return resp.json();
    }).then((data) => {
        setCategories(data);
    }).catch((error)=>{
        console.log("Error",error)
    });
}

// Funciones para poblar elemento Select con Categorias
const select_categories = document.querySelector('#ddl-categories');
const setCategories = (data)=>{
    //Orden de Categorias Alfabeticamente
    data.sort((a,b)=> {
        return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 :0;
    })
    //Se recorre el listado de categorias para crear el Select Option
    data.forEach(item =>{
        let option = document.createElement('option');
        option.value = item.id
        option.textContent = item.name
        option.setAttribute('style',"text-transform:capitalize;")
        select_categories.appendChild(option);
    })
}
//
//
//
//
//
// FIN CONTROLES DE CATEGORIAS



// Se obtienen todos los productos por defecto
const getProducts = () =>{
    loadData();
    fetch(url+'api/products',{
        method:"GET",
        headers: headers_http
    }
    ).then((resp) =>{
        return resp.json();
    }).then((data) => {
        showProducts(data);
    }).catch((error)=>{
        console.warn("Error",error)
    });
}

//Se llaman los primeros metodos
getCategories();
getProducts();


//Se agrega la data obtenida desde el servidor en los elementos HTML correspondiente
const body_products = document.querySelector('#products');
const showProducts = (data)=>{
    if(data.length == 0){
        body_products.innerHTML = `<div class="message">
            <i class="far fa-frown"></i>
            <h2>No se encontraron resultados en la busqueda</h2>
            <a onclick="getProducts()"><i class="fas fa-arrow-circle-right"></i> Ir Productos</a>
        </div>`;
        return;
    }
     //Orden de Productos por Categoria
     data.sort((a,b)=> {
        return (a.category < b.category) ? -1 : (a.category > b.category) ? 1 :0;
    })
    const template = document.querySelector('#template-product').content;
    const fragment = document.createDocumentFragment();

    body_products.innerHTML ="";
    data.forEach(item =>{
        template.querySelector('img').setAttribute('src',((item.url_image == "" || item.url_image == null || item.url_image == undefined) ? 'img/no-image.png' :item.url_image ) ); //Imagen del Producto. Si no existe una imagen, se agrega una por defecto que muestra "Contenido No Disponible"
        template.querySelectorAll('span')[0].textContent = item.category; //Categoria del Producto
        template.querySelectorAll('span')[1].textContent = item.name; //Nombre del Producto. Se le agregado CSS para truncar el largo del string.
        template.querySelectorAll('span')[1].setAttribute('title',item.name ); // Se añade a la propiedad "Title" el nombre compelto del Producto
        template.querySelector('.body-discount').innerHTML = ((item.discount > 0) ? `<div class="discount">-`+item.discount+`%</div>` : ""); //No es requirimiento pero en caso de que el producto tenga descuento > 0, muestra el Procentaje en una esquina superior.
        template.querySelector('del').innerHTML = (item.discount > 0) ? "$"+Math.round(parseInt(item.price)) : `<br>`; // En caso de existir descuento, muestra el precio original.
        template.querySelector('span strong').textContent = (item.discount > 0) ? "$"+Math.round((parseInt(item.price)-(parseInt(item.price)*parseInt(item.discount)/100))) : "$"+ Math.round(parseInt(item.price)) //En caso de existir descuento, calcula y muestra el nuevo precio con el descuento aplicado-
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    })
    const count = document.querySelector(".count-products").innerHTML = "N° de Productos: "+data.length;

    body_products.appendChild(fragment);
}

// Se maneja una peticion para obtener los productos por Categoria. >Cda vez se escoja una nueva Categoria, este gatilla el evento que permite obtener la data..
select_categories.addEventListener('change', (event) => {
    loadData();
    event.preventDefault();
    const id_category = event.target.value;
    fetch(url+'api/products/categories/'+id_category,{
        method:"GET",
        headers: headers_http
    }).then((resp) =>{
        return resp.json();
    }).then((data) => {
      showProducts(data);
    }).catch((error)=>{
        console.log("Error",error)
    });

});

// Accion para el boton de Buscar. 
const btn_search = document.querySelector("#searchItems")
btn_search.addEventListener('click', (event)=>{
event.preventDefault();
const search = document.querySelector("#input_search");
    // Si el input donde se ingresa el texto de busqueda esta vacio, El sistema alertará un mensaje.
    if(search.value == ""){
        alert('Debe Ingresar algun texto para realizar la Busqueda');
        search.focus();
        return;
    }
    select_categories.value ="";
    loadData();
    fetch(url+'api/products/'+search.value,{
        method:"GET",
        headers: headers_http
    }).then((resp) =>{
        return resp.json();
    }).then((data) => {
        showProducts(data);
        search.value="";
    }).catch((error)=>{
        console.log("Error",error)
    });
})
