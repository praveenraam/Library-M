const bodyIn = document.getElementById('root');

var DATA = []; var data = []; var ResponseV= []; var Length = [];

//Fucntion to fetch the result for the Frontpage
async function fetcher(){
        data[0] = await fetch(`https://www.googleapis.com/books/v1/volumes?q=free+books`);
        DATA[0] = await data[0].json();
        data[1] = await fetch(`https://www.googleapis.com/books/v1/volumes?q=college+books`);
        DATA[1] = await data[1].json();
        data[2] = await fetch(`https://www.googleapis.com/books/v1/volumes?q=computer+science+books`)
        DATA[2] = await data[2].json();
       
        //Assigning DATA for all the ResponseV
        for(k=0;k<3;k++){
            ResponseV[k]=DATA[k].items;
            Length[k] = ResponseV[k].length;
        }
        //function to add the book to the frontpage
        const changeData = () => {
            let k=0;
            for(j=0;j<3;j++){
                
                for(i=0;i<Length[0];i++){
                    let Entering = `
                    <div class='box'>
                        <div class='img-box'>
                            <img class='images' src=${ResponseV[j][i].volumeInfo.imageLinks.smallThumbnail}></img>
                        </div>
                        <div class='bottom'>
                            <p>Title : ${ResponseV[j][i].volumeInfo.title}</p>
                            <h2>Author : ${ResponseV[j][i].volumeInfo.authors[0]}</h2>
                            <button onclick="CartAdd(${k++});Increment();">Add to cart</button>
                        </div> 
                    </div>` 
                    bodyIn.innerHTML += Entering;
                }
            }   
        }
        changeData();
}
//Fetcher function is called on all the reloads
fetcher();

//Search Function to store and add the value in the body
const SearchValue = document.getElementById('searchBar');
var SearchResult;
async function Searcher(){
    var typeSearch = "";
    var searchQuery = SearchValue.value
    //Checking for any checked radio box
    try {
        typeSearch = document.querySelector('input[name=SearchType]:checked').value
    }
    catch(TypeError){ //TypeError is handled and raised if no radio button is checked
        console.log("Exception Handled - Type Error of null property");
    }
    bodyIn.innerHTML = ''; //Removing the content added by fetcher function
    var SearchResult = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${typeSearch}${searchQuery}`)
    DATA[3] = await SearchResult.json();
    for(i=0;i<Length[0];i++){
        //If the fetched results are Less than 10 Type Error occurs , Try catch is used
        try{
            let Entering = `
        <div class='box' id="divNo${i}">
            <div class='img-box'>
                <img class='images' src=${DATA[3].items[i].volumeInfo.imageLinks.smallThumbnail}></img>
            </div>
            <div class='bottom'>
                <p>Title : ${DATA[3].items[i].volumeInfo.title}</p>
                <h2>Author : ${DATA[3].items[i].volumeInfo.authors[0]}</h2>
                <button onclick="CartAdd(${i});Increment();">Add to cart</button>
            </div> 
        </div>` 
        bodyIn.innerHTML += Entering;
        }
        catch(TypeError){
            console.log("Exception Handled - Type Error of null property\nResult Count are less 10")
        }
    } //In case of no result from the searchQuery Fetcher function is called
    if(bodyIn.innerHTML == ''){
        fetcher();
    }
}

const List = document.querySelector('.listCard');
//Unique ID for the Book added to cart for the removal purpose
var Idno;
Idno = localStorage.getItem("Idno");
if(Idno == undefined){
    Idno = 0;
    localStorage.setItem("Idno",Idno);
}

//Adding to cart
const CartAdd = (N1) => {

   // To find book from search result or from Frontpage 30results
    if(DATA[3] === undefined){ 
        //If statements are for selecting the Specific book from the 30 results and getting its value to add in cart 
        //Book selected from the FrontPage of 30Results 
        if(N1<10){
            // Book from DATA[0]
            changeData(0,N1);
        }
        else if(N1<20){
            // Book from DATA[1]
            changeData(1,N1-10);
        }
        else if(N1<30){
            // Book from DATA[2]
            changeData(1,N1-20);
        }
    }
    else{
        // Book selected from the Search results
        changeData(3,N1);
    }

    //This Function add the book to the cart
    function changeData(datValue,ItemNo){
        Idno++;
        localStorage.setItem("Idno",Idno);
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
    LocalSetter();
}

//Removing the Specific item from the cart 
const cartRemover = (idno) => {
    document.querySelector(`#removeID${idno}`).remove();
    LocalSetter();
}

//Total No of items in the Cart to display at cartPart of page
const CartValue = document.querySelector('.total')
var noOfItems;
noOfItems = localStorage.getItem("noOfItems");
if(noOfItems == undefined){
    noOfItems = 0;
    localStorage.setItem("noOfItems",noOfItems);
}

//Increment and decrement of Items in the cartPage
const Increment = () => { CartValue.innerText = ++noOfItems; localStorage.setItem("noOfItems",noOfItems) }
const Decrement = () => { CartValue.innerText = --noOfItems; localStorage.setItem("noOfItems",noOfItems) }
const LocalSetter = () => localStorage.setItem("CartBooks",List.innerHTML);

let openShopping = document.querySelector('.cartbtn');
let closeShopping = document.querySelector('.closeShopping');
let body = document.querySelector('body');
//Setting AddTocart items to CartPart Of the Page from LocalStorage and Button Text , class is toggled
openShopping.addEventListener('click', ()=>{
    List.innerHTML = localStorage.getItem("CartBooks");
    CartValue.innerText = localStorage.getItem("noOfItems");
    body.classList.toggle('active');
    if(openShopping.innerText == "Close Cart"){
        openShopping.innerText = "Go to Cart"
    }
    else{
    openShopping.innerText = "Close Cart"}
})

//Clearing LocalStorage in logout click
document.getElementById('outbtn').addEventListener('click', () => localStorage.clear())