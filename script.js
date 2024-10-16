const myLibrary = [];

function Book(title, author, read) {
  this.title = title;
  this.author = author;
  this.read = read;
}

const hobbit = new Book("The Hobbit", "Tolkein", true)
const lotr = new Book("Lord of The Rings", "Tolkein", true)
const harryPotter = new Book("Harry Potter", "Rowling", false)

addBookToLibrary(hobbit)
addBookToLibrary(lotr)
addBookToLibrary(harryPotter)

function addBookToLibrary(book) {
  myLibrary.push(book)
}

console.log(myLibrary)

const main = document.querySelector(".main")

function displayLibrary() {
  for (i = 0; i < myLibrary.length; i++) {
    main.appendChild(createBook(myLibrary[i].title, myLibrary[i].author, myLibrary[i].read , myLibrary[i].id))
  }
}

displayLibrary()

function createBook(title, author, read){
  const div = document.createElement('div')
  const bookTitle = document.createElement('h1')
  const bookAuthor = document.createElement('p')
  const finished = document.createElement('p')
  bookTitle.innerText = title
  bookAuthor.innerText = author
  finished.innerText = read ? "Read: Yes" : "Read: No"

  const readBtn = document.createElement('button')
  readBtn.value = title
  readBtn.innerText = !read ? "Yes" : "No"
  readBtn.addEventListener("click", changeRead)
  const delBtn = document.createElement('button')
  delBtn.value = title
  delBtn.innerText = "Delete"
  delBtn.addEventListener("click", delBook)
  div.id = title
  div.appendChild(bookTitle) 
  div.appendChild(bookAuthor) 
  div.appendChild(finished) 
  div.append(readBtn)
  div.append(delBtn)
  
  return div
}

const addBookBtn = document.getElementById("newBook")
const closeModal = document.getElementById("closeModal")
const modal = document.getElementById("modal")
const title = document.getElementById("title")
const form = document.getElementById("form")

addBookBtn.addEventListener("click", () => {
  modal.showModal();
  form.reset()
})

closeModal.addEventListener("click", (e) => {
  e.preventDefault()
  modal.close();
  const newTitle = document.getElementById("title").value
  const newAuthor = document.getElementById("author").value
  const newRead = document.getElementById("read").value
  const book = new Book(newTitle, newAuthor, newRead)
  addBookToLibrary(book)
  main.innerHTML = ``
  displayLibrary()
})

function delBook(e) {
  const div = document.getElementById(e.target.value)
  for (i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title === div.id){
      myLibrary.splice(i, 1)
    }
  }
  div.remove()
}

function changeRead(e) {
  console.log(e.target)
  const div = document.getElementById(e.target.value)
  const readFlag = div.childNodes[2]
  for (i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title === div.id){
      myLibrary[i].read = !myLibrary[i].read
      readFlag.innerText = myLibrary[i].read ? "Read: Yes" : "Read: No"
      e.target.innerText = !myLibrary[i].read ? "Yes" : "No"
    }
  }

}