//5 variables for user inputs on form 
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const pagesInput = document.getElementById("pagesInput");
const readCheckbox = document.getElementById("readCheckbox");
const genreInput = document.getElementById("genreInput");
//Overlay, Grid, and Modal variables
const overlay = document.getElementById("overlay");
const bookGrid = document.getElementById("bookGrid");
const addBookModal = document.getElementById("modal");
const removeBookModal = document.getElementById("modal2");

//global variable to remain null until removeBookBtn is pressed
//will store dataset.id of book selected for removal when removeBookBtn is pressed
let idToDelete = null;

//onclick of newBook btn, display modal form for user inputs
const newBook = document.getElementById("newBook");
newBook.addEventListener("click", () => {
    overlay.style.display = "flex";
    removeBookModal.style.display = "none";
    addBookModal.style.display = "block";
    clearForm();
});

//Create and store buttons to close modals onclick
const closeModalBtn = document.getElementById("closeModalBtn");
closeModalBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    clearForm();
})

const close2ndModalBtn = document.getElementById("close2ndModalBtn");
close2ndModalBtn.addEventListener("click", () =>{
    overlay.style.display = "none";
})

//library array to hold all book objects
let myLibrary = [];

//Book Object Constructor Function
function Book(title, author, genre, pages, read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
}

//Function to create New books and store in myLibrary array
function addBookToLibrary(){
    const titleValue = titleInput.value;
    const authorValue = authorInput.value;
    const genreValue = genreInput.value;
    const pagesValue = pagesInput.value;
    const checkboxValue = readCheckbox.checked;
    const newBook = new Book(titleValue, authorValue, genreValue, pagesValue, checkboxValue);
    myLibrary.push(newBook);
}

//form submission event listener to call functions 
const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    overlay.style.display = "none";
    addBookModal.style.display = "none";
    addBookToLibrary();
    bookGrid.innerHTML = "";
    displayBooks();
});


//create a function to loop through the array
function displayBooks(){
    for(const bookObj of myLibrary){

        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.dataset.id = bookObj.id;
        //Create random color for background of book using math.random()

        const titleh1 = document.createElement("h1");
        titleh1.textContent = `${bookObj.title}`;
        bookElement.appendChild(titleh1);

        const authorh2 = document.createElement("h2");
        authorh2.textContent = `By: ${bookObj.author}`;
        bookElement.appendChild(authorh2);

        const genreh2 = document.createElement("h2");
        genreh2.textContent = `Genre: ${bookObj.genre}`;
        bookElement.appendChild(genreh2);

        const pagesP = document.createElement("p");
        pagesP.textContent = `Pages: ${bookObj.pages}`;
        bookElement.appendChild(pagesP);

        const readButton = document.createElement("button");
        if(bookObj.read){
            readButton.classList.add("readButton")
            readButton.textContent = "Read";
        } else {
            readButton.classList.add("notReadButton")
            readButton.textContent = "Unread";
        }   
        readButton.addEventListener("click", () =>{
            if(readButton.classList.contains("readButton")){
                readButton.classList.remove("readButton");
                readButton.classList.add("notReadButton");
                readButton.textContent = "Unread";
            } else{
                readButton.classList.remove("notReadButton");
                readButton.classList.add("readButton");
                readButton.textContent = "Read";
            }
        });
        bookElement.appendChild(readButton);

        const removeBookBtn = document.createElement("button");
        removeBookBtn.classList.add("removeBookBtn");
        removeBookBtn.textContent = "Remove Book";
        removeBookBtn.addEventListener("click", (event) =>{
            const bookElement = event.target.closest(".book");
            idToDelete = bookElement.dataset.id;

            overlay.style.display = "flex";
            addBookModal.style.display = "none";
            removeBookModal.style.display = "block";
        })
        bookElement.appendChild(removeBookBtn);

        bookGrid.appendChild(bookElement);
    }
}

const yesDeleteBtn = document.getElementById("yesDelete")
yesDeleteBtn.addEventListener("click", () =>{            
    myLibrary = myLibrary.filter(book => book.id !== idToDelete);
    idToDelete = null;
    overlay.style.display = "none";
    removeBookModal.style.display = "none";
    bookGrid.innerHTML = "";
    displayBooks();
})

const noDeleteBtn = document.getElementById("noDelete")
noDeleteBtn.addEventListener("click", () =>{
    overlay.style.display = "none";
    removeBookModal.style.display = "none";
    idToDelete = null;
})


//function to clear inputs on form when book added or modal closed
function clearForm(){
    titleInput.value = "";
    authorInput.value = "";
    genreInput.value = "";
    pagesInput.value = "";
    readCheckbox.checked = "";
}




//things to do next:

//2) Change styling of user input form so it isn't ugly as fuck
//3) Change styling of the deleteBook modal so it isn't ugly as fuck as well
//4) Change styling of book objects so they aren't ugly as fuck

//LOOK INTO WHAT THIS MEANS?
//1) (REFER TO #5)Solve how to remove Book objects from array when clicking the yesDelete button(REFER TO #5)
//5) You will need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the unique id of the respective book object.
