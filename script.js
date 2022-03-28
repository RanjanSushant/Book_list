//Book constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI() {
  this.showAlert = function (message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    document
      .querySelector(".container")
      .insertBefore(div, document.querySelector("#book-form"));

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  };
  this.addBookToList = function (book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">Remove</a></td>
      `;

    list.appendChild(row);
    console.log(book);
  };

  this.deleteBook = function (target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  };

  this.clearFields = function () {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  };
}

//Event listeners
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

      ui.showAlert("Book Added", "success");

      ui.clearFields();
    }

    console.log(ui);
  });

document
  .getElementById("book-list")
  .addEventListener("click", function (event) {
    const ui = new UI();
    ui.deleteBook(event.target);
    ui.showAlert("Book removed", "success");
    event.preventDefault();
  });
