
//Book class to handle individual book logic
class Book{
    constructor(title, author, genre, pages, read){
        this.id = crypto.randomUUID();
        this.createdDate = Date.now();
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = pages;
        this.read = read;  
    }

    toggleRead(){
        this.read = !this.read;
    }
}


//Library class to handle the entire array of books logic
class Library{
    constructor(){
        this.library = [];
    }
    
    addBook(book){
        this.library.push(book);
    }

    removeBook(idToDelete){
        this.library = this.library.filter(book => book.id !== idToDelete);
    }

    sortLibrary(selectedValue){
        switch(selectedValue){
        case "newToOld":
            this.library.sort((a, b) => b.createdDate - a.createdDate);
        break ;
            
        case "oldToNew":
            this.library.sort((a, b) => a.createdDate - b.createdDate);
        break ;

        case "titlea2z":
            this.library.sort((a, b) => a.title.localeCompare(b.title));
        break ;

        case "titlez2a":
            this.library.sort((a, b) => b.title.localeCompare(a.title));
        break ;

        case "authora2z":
            this.library.sort((a, b) => a.author.localeCompare(b.author));
        break ;

        case "authorz2a":
            this.library.sort((a, b) => b.author.localeCompare(a.author));
        break ;

        case "genrea2z":
            this.library.sort((a, b) => a.genre.localeCompare(b.genre));
        break ;

        case "genrez2a":
            this.library.sort((a, b) => b.genre.localeCompare(a.genre));
        break;

        case "read":
            this.library.sort((a, b) => b.read - a.read);
        break ;

        case "unread":
            this.library.sort((a, b) => a.read - b.read);
        break ;      

        default:
            this.library.sort((a, b) => b.createdDate - a.createdDate);
        break;
        }
    }

    get allBooks(){
        return this.library; 
    }
}

const myLibrary = new Library();


//class to handle the UI of the library and display it. 
class LibraryUI{
    constructor(myLibrary){
        this.myLibrary = myLibrary;

        //input values for form submission
        this.titleInput = document.getElementById("titleInput");
        this.authorInput = document.getElementById("authorInput");
        this.genreInput = document.getElementById("genreInput");
        this.pagesInput = document.getElementById("pagesInput");
        this.readCheckbox = document.getElementById("readCheckbox");
        
        //Overlay, Grid, and Modal variables
        this.overlay = document.getElementById("overlay");
        this.bookGrid = document.getElementById("bookGrid");
        this.addBookModal = document.getElementById("addNewBookModal");
        this.removeBookModal = document.getElementById("deleteBookModal");

        //Add book variables
        this.newBook = document.getElementById("newBook");
        this.addBookForm = document.getElementById("form");
        this.closeModalBtn = document.getElementById("closeModalBtn");

        this.yesDeleteBtn = document.getElementById("yesDelete")
        this.noDeleteBtn = document.getElementById("noDelete")
        this.close2ndModalBtn = document.getElementById("close2ndModalBtn");
        this.sortSelect = document.getElementById("sortBy");
        
        this.idToDelete = null;
    }


    clearForm(){
        this.titleInput.value = "";
        this.authorInput.value = "";
        this.genreInput.value = "";
        this.pagesInput.value = "";
        this.readCheckbox.checked = "";
    }

    //Loops through library array, creates book elements for objects, displays those books on page
    displayBooks(){
        bookGrid.innerHTML = "";
        for(const bookObj of myLibrary.allBooks){

            const bookElement = document.createElement("div");
            bookElement.classList.add("book");
            bookElement.dataset.id = bookObj.id;

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

            readButton.addEventListener("click", ()=>{
                if(bookObj.read){
                    readButton.classList.remove("readButton");
                    readButton.classList.add("notReadButton");
                    readButton.textContent = "Unread";
                    bookObj.toggleRead();
                } else{
                    readButton.classList.remove("notReadButton");
                    readButton.classList.add("readButton");
                    readButton.textContent = "Read";
                    bookObj.toggleRead();
                }
            });
            bookElement.appendChild(readButton);

            const removeBookBtn = document.createElement("button");
            removeBookBtn.classList.add("removeBookBtn");
            removeBookBtn.textContent = "Remove Book";
            removeBookBtn.addEventListener("click", (event) =>{
                const bookElement = event.target.closest(".book");
                this.idToDelete = bookElement.dataset.id;

                overlay.style.display = "flex";
                this.addBookModal.style.display = "none";
                this.removeBookModal.style.display = "block";
            })
            bookElement.appendChild(removeBookBtn);
            bookGrid.appendChild(bookElement);
        }
    }

    bindEvents(){
        this.addBookForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const book = new Book(
                this.titleInput.value,
                this.authorInput.value,
                this.genreInput.value,
                this.pagesInput.value,
                this.readCheckbox.checked
            );

            overlay.style.display = "none";
            this.addBookModal.style.display = "none";

            myLibrary.addBook(book);
            myLibrary.sortLibrary(this.sortSelect.value);
            this.displayBooks();
        });

        this.newBook.addEventListener("click", () => {
            overlay.style.display = "flex";
            this.removeBookModal.style.display = "none";
            this.addBookModal.style.display = "block";
            this.clearForm();
        });

        this.closeModalBtn.addEventListener("click", () => {
            overlay.style.display = "none";
        })

        this.yesDeleteBtn.addEventListener("click", () =>{
            this.myLibrary.removeBook(this.idToDelete);    
            idToDelete = null;
            overlay.style.display = "none";
            this.removeBookModal.style.display = "none";
            this.displayBooks();
        })

        this.noDeleteBtn.addEventListener("click", () =>{
            overlay.style.display = "none";
            this.removeBookModal.style.display = "none";
            idToDelete = null;
        })

        this.close2ndModalBtn.addEventListener("click", () =>{
            overlay.style.display = "none";
        })

        this.sortSelect.addEventListener("change", () =>{
            this.myLibrary.sortLibrary(sortSelect.value);
            this.displayBooks();
        });
    }

}

const ui = new LibraryUI();
ui.bindEvents();
ui.displayBooks();

