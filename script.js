const names = document.querySelector(".name");
const description = document.querySelector(".description");
const inputFile = document.querySelector(".file");
const btn = document.querySelector(".submitbtn");
const img = document.querySelector(".img");
const price = document.querySelector(".price");
const cardContainer = document.querySelector(".cardConatiner");
const cardTable = document.querySelector(".cardTable");
const cancelEditButton = document.querySelector(".canceledit");
const heading  = document.querySelector(".heading");
const form  = document.querySelector("form");
console.log(form);


let products = JSON.parse(localStorage.getItem("products")) || [];
let counts = products.length;

let product = {};

let edit = 0;
let indToEdit ;

function addProduct() {
    if(edit===1){

        if(names.value===""){
            product["name"] = "---";
        }else{
            product["name"] = names.value;
        }
    
        if(price.value===""){
            product["price"] = "---";
        }else{
            let x = parseFloat(price.value).toFixed(2);            
            product["price"] = x;
        }
    
        if(description.value===""){
            product["description"] = "---";
        }else{
            product["description"] = description.value;
        }
        console.log("product pic check");
        products[indToEdit] = product;
        localStorage.setItem("products",JSON.stringify(products));

        cancelEditButton.classList.remove("visible");
        edit =0 ;
        indToEdit =-1;
        product={};
        heading.innerHTML = "Add product Details";
        btn.innerHTML = "Add Product";
        load();

    }
    
    else if (edit === 0) {

    
    if(names.value===""){
            product["name"] = "---"
    }else{
            product["name"] = names.value;
    }
    
    if(price.value===""){
        product["price"] = "---"
    }else{
        let x = parseFloat(price.value).toFixed(2);
        product["price"] = x;
    }
    
    if(description.value===""){
        product["description"] = "---"
    }else{
        product["description"] = description.value;
    }

    if(product.pic === undefined){
        product.pic = 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg';
    }
    

    products.push(product);
    product={};

    // update Local Storage
    localStorage.setItem("products",JSON.stringify(products));

    console.log("setting element");
   
    
    }
    load();
   
    names.value = "";
    price.value= "";
    description.value = "";
    inputFile.value = "";

}

//  it will be called whenever input type file value changes
function handleEdit(event,index) {
    
    edit = 1;
    product = products[index];
    indToEdit= index;
    
    names.value = products[index].name;
    description.value = products[index].description;
    price.value = products[index].price;
    
    console.log("")
    // inputFile.value=products[index].pic;
    // console.log(btn);
    btn.innerHTML = "Add Changes";
    cancelEditButton.classList.add("visible");
    
    heading.innerHtml = "Edit Details";

    console.log(product);


}

function cancelEdit(){
    cancelEditButton.classList.remove("visible");
    btn.innerHTML = "Add Product";
    edit  = 0 ;
    product = {};
    indToEdit =-1;

    names.value = "";
    price.value= "";
    description.value = "";
    inputFile.value = "";
    heading.innerHTML = "Add Product Details";
    // load();


}

function handleImage(event)
{

    const image = event.target.files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      product["pic"] = reader.result;
      console.log("updated")
      console.log(product);
    });
    // Starts reading the contents of the specified file or blob, once finished, the result attribute contains a data: URL representing the file's data. and load event occur's
    reader.readAsDataURL(image);   
    
}

function handleDelete(index) {
    
if(window.confirm("Are you sure?")){

    
    
    products = products.filter((product,ind)=>{
        return ind != index;
    });
    
    localStorage.setItem("products",JSON.stringify(products));
    
    load();
}
}

function load(){
    let row ="";
    let i = 1;
    products.forEach((item,index)=>{
        row += "<tr><td>"+i+"</td><td>" +item.name + "</td><td class='descol'>" + item.description + "</td><td class='pricecol'>" + item.price
         +"</td><td><img class='pic' src='"+ item.pic +"' height='50px' width='80px'></td><td><i class='fa-solid fa-pen edit cardbtn' onclick = 'handleEdit(event," +index +")'></i></td><td><i class='fa-solid fa-trash delete cardbtn' onclick = 'handleDelete("+index+")'></i></td>"
        i++;
    })

    cardTable.innerHTML = row;
}

inputFile.addEventListener("change",handleImage);

cancelEditButton.addEventListener("click",cancelEdit);
form.addEventListener("submit",(event)=>
    {
        event.preventDefault();
        addProduct();
    });


// this will load the whole list of products on UI.
load();

console.log(products);




