var booksContainer = [];
var test = function () {
    for (var i = 1; i < 21; i++) {

        $.get("data/book" + i + ".html", function (data) {
        })
            .done(function (data) {
                booksContainer.push(data);
            });
    }
}

var show = function () {
    parseBooks();
    console.log(sumWeight());
    console.log(JSON.stringify(inBox()));
}

var books = [];

var parseBooks = function () {
    for (var i = 0; i < booksContainer.length; i++) {
        var book = {};
        book.title = $(booksContainer[i]).find('span#btAsinTitle').text().trim();
        book.author = $(booksContainer[i]).find('span.byLinePipe:contains("Author")').parent().text().replace(/\([^)]*\)/g, "").trim();
        if (!book.author) {
            book.author = $(booksContainer[i]).find('li:contains("Publisher")').text().replace(/\([^)]*\)/g, "").trim();
        }
        book.price = $(booksContainer[i]).find('b.priceLarge').text().trim();
        if (!book.price) {
            book.price = $(booksContainer[i]).find('span.rentPrice').first().text().trim();
        }
        book.weight = parseFloat($(booksContainer[i]).find('li:contains("pounds")').text().replace(/[^0-9\.]+/g, ""));
        book.isbn = $(booksContainer[i]).find('li:contains("ISBN-10")').text().replace(/^[^:]*:+/g, "");
        
        books.push(book);
    }
    console.log(books);
};


function sumWeight() {
    var weight = 0.0;
    for (var i = 0; i < books.length; i++) {
        weight += books[i].weight;
    }
    return weight;
}


var inBox = function () {
    var boxes = [];
    var box = {};
    var numBoxes = Math.ceil(sumWeight() / 10)+1;
    var numBox = 0;


    for (var i = 0; i < numBoxes; i++) {
        box = {
            id: i,
            totalWeight: 0.0,
            contents: [],
        };

        boxes.push(box);
    }
    for (var e = 0; e < boxes.length; e++) {
        for (var i = 0; i < books.length; i++) {
            if ((boxes[e].totalWeight + books[i].weight) < 10) {
                boxes[e].contents.push(books[i]);
                boxes[e].totalWeight += books[i].weight;
                books.splice(i, 1);
            }            
        }
    }
    // document.getElementById('content').innerHTML = JSON.stringify(boxes,null,4);    
    return boxes;    
};


JSON.stringify(inBox());