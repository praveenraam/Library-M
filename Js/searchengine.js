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
            for(j=0;j<3;j++){
                for(i=0;i<Length[0];i++){
                    let Entering = `
                    <div class='box'>
                        <div class='img-box'>
                            <img class='images' src=${Value[j][i].volumeInfo.imageLinks.smallThumbnail}></img>
                        </div>
                        <div class='bottom'>
                            <p>Title : ${Value[j][i].volumeInfo.title}</p>
                            <h2>Author : ${Value[j][i].volumeInfo.authors[0]}</h2>
                            <button>Add to cart</button>
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

async function Searcher(){
    var typeSearch = "";
    try {
        typeSearch = document.querySelector('input[name=SearchType]:checked').value
        console.log("No Error");
    }
    catch(TypeError){
        console.log("Exception Handled - Type Error of null property");
    }
    bodyIn.innerHTML = '';
    searchvalue =SearchValue.value
    const SearchResult = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${typeSearch}${searchvalue}`)
    const response = await SearchResult.json()
    console.log(response.items[0]);
    for(i=0;i<Length[0];i++){
        let Entering = `
        <div class='box'>
            <div class='img-box'>
                <img class='images' src=${response.items[i].volumeInfo.imageLinks.smallThumbnail}></img>
            </div>
            <div class='bottom'>
                <p>Title : ${response.items[i].volumeInfo.title}</p>
                <h2>Author : ${response.items[i].volumeInfo.authors[0]}</h2>
                <button>Add to cart</button>
            </div> 
        </div>` 
        bodyIn.innerHTML += Entering;
    }
}


function Cart(){
        
}