//4 variables for user inputs on form 
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const pagesInput = document.getElementById("pagesInput");
const readCheckbox = document.getElementById("readCheckbox");
const overlay = document.getElementById("overlay");


//onclick of newBook btn, display modal form for user inputs
const newBook = document.getElementById("newBook");
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
    for(const bookObj of myLibrary){
        const bookElement = document.createElement("div");
        bookElement.classList.add("book")

        const titleh1 = document.createElement("h1");
        titleh1.textContent = `${bookObj.title}`;
        bookElement.appendChild(titleh1);

        const authorh2 = document.createElement("h2");
        authorh2.textContent = `By: ${bookObj.author}`;
        bookElement.appendChild(authorh2);

        const pagesP = document.createElement("p");
        pagesP.textContent = `Pages: ${bookObj.pages}`;
        bookElement.appendChild(pagesP);

        const readButton = document.createElement("button");
        if(bookObj.readButton){
            //if checked, apply read button class
        } else {
            //if unchecked, apply notRead button class
        }   

        readButton.addEventListener("click", () =>{
            //one to turn read button into notRead
            //(remove current class, add opposite class, change text content)
        })
        readButton.addEventListener("click", () =>{
            //one to turn notRead button into read
            //(remove current class, add opposite class, change text content)
        })

        bookElement.appendChild(readButton);




        bookGrid.appendChild(bookElement);
    }
}

//form submission event listener to call functions 
const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    overlay.style.display = "none";
    addBookToLibrary();
    displayBooks();
});

//add button to remove book from library and make it so it asks for confirmation ("are you sure?")
