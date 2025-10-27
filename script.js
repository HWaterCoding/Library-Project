//5 variables for user inputs on form 
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const pagesInput = document.getElementById("pagesInput");
const readCheckbox = document.getElementById("readCheckbox");

//form submission event listener to call functions 
const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    overlay.style.display = "none";
    addBookToLibrary();
    displayBooks();
});


//onclick of newBook btn, display modal form for user inputs
const newBook = document.getElementById("newBook");
const overlay = document.getElementById("overlay");
newBook.addEventListener("click", () => {
    overlay.style.display = "flex";
});

//Create and store button to close modal onclick
const closeModalBtn = document.getElementById("closeModalBtn");
closeModalBtn.addEventListener("click", () => {
    overlay.style.display = "none";
})


//library array to hold all book objects
const myLibrary = [];


//constructor function to create new books
function Book(title, author, pages, read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//function to add books once constructed to the array using push()
function addBookToLibrary(){
    const titleValue = titleInput.value;
    const authorValue = authorInput.value;
    const pagesValue = pagesInput.value;
    const checkboxValue = readCheckbox.checked;
    const newBook = new Book(titleValue, authorValue, pagesValue, checkboxValue);
    myLibrary.push(newBook);
}




//create a function to loop through the array
function displayBooks(){

}


//add button to remove book from library and make it so it asks for confirmation ("are you sure?")
