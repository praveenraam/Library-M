// const categories = [...new Set(product.map((item) => { return item }))]

// document.getElementById('searchBar').addEventListener('keyup', (e) => {
//     const searchData = e.target.value.toLowerCase();
//     const filteredData = categories.filter((item) => {
//         return (
//             item.title.toLowerCase().includes(searchData)
//         )
//     })
//     displayItem(filteredData)
// });

// const displayItem = (items) => {
//     document.getElementById('root').innerHTML = items.map((item) => {
//         var { image, title, price } = item;
//         return (
//             `<div class='box'>
//                 <div class='img-box'>
//                     <img class='images' src=${image}></img>
//                 </div> 
//                 <div class='bottom'>
//                     <p>${title}</p>
//                     <h2>$ ${price}.00</h2>
//                 <button>Add to cart</button>
//                 </div>
//             </div>`
//         )
//     }).join('')
// };
// displayItem(categories);

const bodyIn = document.getElementById('root');

let api = `AIzaSyCK2hCmzH_FH-jFn6h7TY-J-abHVZnwFcA`;
var DATA = []; var data = []; var Value= []; var Length = [];

async function fetcher(){
        data[0] = await fetch(`https://www.googleapis.com/books/v1/volumes?q=free+books`);
        DATA[0] = await data[0].json();
        data[1] = await fetch(`https://www.googleapis.com/books/v1/volumes?q=college+books`);
        DATA[1] = await data[1].json();
        data[2] = await fetch(`https://www.googleapis.com/books/v1/volumes?q=computer+science+books`)
        DATA[2] = await data[2].json();
       
        for(k=0;k<3;k++){
            Value[k]=DATA[k].items;
            Length[k] = Value[k].length;
        }
        
        const changeData = () => {
            let k=-10;
            for(j=0;j<3;j++){
                k+=10;
                for(i=0;i<Length[0];i++){
                    let Entering = `
                    <div class='box'>
                        <div class='img-box'>
                            <img class='images' src=${Value[j][i].volumeInfo.imageLinks.smallThumbnail}></img>
                        </div>
                        <div class='bottom'>
                            <p>Title : ${Value[j][i].volumeInfo.title}</p>
                            <h2>Author : ${Value[j][i].volumeInfo.authors[0]}</h2>
                            <button onclick="Cart(${i+k});Increment();">Add to cart</button>
                        </div> 
                    </div>` 
                    bodyIn.innerHTML += Entering;
                }
            }   
        }
        changeData();
}
fetcher();

const SearchValue = document.getElementById('searchBar');
var SearchResult,response=[];
async function Searcher(){
    var typeSearch = "";
    var searchResult = SearchValue.value
    try {
        typeSearch = document.querySelector('input[name=SearchType]:checked').value
        console.log("No Error");
    }
    catch(TypeError){
        console.log("Exception Handled - Type Error of null property");
    }
    bodyIn.innerHTML = '';
    var SearchResult = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${typeSearch}${searchResult}`)
    DATA[3] = await SearchResult.json();
    // console.log(DATA[3].items[0]);
    for(i=0;i<Length[0];i++){
        let Entering = `
        <div class='box' id="divNo${i}">
            <div class='img-box'>
                <img class='images' src=${DATA[3].items[i].volumeInfo.imageLinks.smallThumbnail}></img>
            </div>
            <div class='bottom'>
                <p>Title : ${DATA[3].items[i].volumeInfo.title}</p>
                <h2>Author : ${DATA[3].items[i].volumeInfo.authors[0]}</h2>
                <button onclick="Cart(${i});Increment();">Add to cart</button>
            </div> 
        </div>` 
        bodyIn.innerHTML += Entering;
    }
}

const List = document.querySelector('.listCard');
var Idno=0;
const Cart = (N1) => {
    if(DATA[3] === undefined){
        if(N1<10){
            console.log(DATA[0].items[N1]);
            changeData(0,N1);
        }
        else if(N1<20){
            console.log(DATA[1].items[N1-10])
            changeData(1,N1-10);
        }
        else if(N1<30){
            console.log(DATA[2].items[N1-20])
            changeData(1,N1-20);
        }
    }
    else{
        console.log(DATA[3].items[N1])
        changeData(3,N1);
    }

    function changeData(datValue,ItemNo){
        Idno++;
        let Entering = `
                <div id="removeID${Idno}">
                    <div class='ins-box'>
                        <div class='img-box'>
                            <img class='images' src=${DATA[datValue].items[ItemNo].volumeInfo.imageLinks.smallThumbnail}></img>
                        </div>
                        <div class='bottom'>
                            <p class="ins-p">Title : ${DATA[datValue].items[ItemNo].volumeInfo.title}</p>
                            <h2 class="ins-h">Author : ${DATA[datValue].items[ItemNo].volumeInfo.authors[0]}</h2>
                            <button class="ins-btn" onclick="Decrement();cartRemover(${Idno})" >Remove from cart</button>
                        </div> 
                    </div>
                </div>`
        List.innerHTML += Entering;
    }
}

const cartRemover = (idno) => {
    console.log(idno);
    document.querySelector(`#removeID${idno}`).innerHTML = '';
}

const CartValue = document.querySelector('.total')
var noOfItems = 0;
const Increment = () => CartValue.innerText = ++noOfItems;
const Decrement = () => CartValue.innerText = --noOfItems;

let openShopping = document.querySelector('.cartbtn');
let closeShopping = document.querySelector('.closeShopping');
let body = document.querySelector('body');

openShopping.addEventListener('click', ()=>{
    body.classList.toggle('active');
    if(openShopping.innerText == "Close Cart"){
        openShopping.innerText = "Go to Cart"
    }
    else{
    openShopping.innerText = "Close Cart"}
    
})
// closeShopping.addEventListener('click', ()=>{
//     body.classList.remove('active');
// })