//onclick of newBook btn, display overlay as block to prompt user input for form
const newBook = document.getElementById("newBook");
const overlay = document.getElementById("overlay");
newBook.addEventListener("click", () => {
    overlay.style.display = "block";
});



//library array to hold all book objects
const myLibrary = [book1, book2, book3];


//constructor function to create new books
function Book(title, author, pages, read, genre){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.genre = genre;
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