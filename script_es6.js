class Book {
  constructor(_title, _author, _isbn) {
    this.title = _title;
    this.author = _author;
    this.isbn = _isbn;
  }
}

class UI {
  // constructor() {}

  addBookToList(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">Remove</a></td>
      `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    document
      .querySelector(".container")
      .insertBefore(div, document.querySelector("#book-form"));

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    console.log(isbn);
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

document
  .getElementById("book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;

    const book = new Book(title, author, isbn);

    const ui = new UI();

    if (title === "" || author === "" || isbn === "") {
      ui.showAlert("Please fill in all fields", "error");
    } else {
      ui.addBookToList(book);

      Store.addBook(book);
      ui.showAlert("Book Added", "success");

      ui.clearFields();
    }
  });

document
  .getElementById("book-list")
  .addEventListener("click", function (event) {
    const ui = new UI();
    ui.deleteBook(event.target);
    Store.removeBook(
      event.target.parentElement.previousElementSibling.textContent
    );
    ui.showAlert("Book removed", "success");
    event.preventDefault();
  });

document.addEventListener("DOMContentLoaded", Store.displayBooks);
