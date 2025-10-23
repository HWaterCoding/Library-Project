//psuedocode javascript process:
//create 4 variables linked to all 4 user inputs (title, author, pages, checkbox)
//variable needs to store value of user inputs
//create variable linked to add to library button. (addBook)
//create a new card when addBook pressed
//retrieve user input values and display as textcontent for new card




//onclick of newBook btn, display overlay as block to prompt user input for form
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
const myLibrary = [book1, book2, book3];


//constructor function to create new books
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    // add function
    return `hhhh`
}


//function to add books once constructed to the array using push()
function addBookToLibrary(){
    //take parameters to create new book
    //assign a unique ID to every book
    crypto.randomUUID()
    //store that book in array using push()
}


//create a function to loop through the array