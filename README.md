# book-db-api
install->npm i


run-> node app.js
books database  api
# create books in db 
http://localhost:9000/books post api payload -> {"title": "Book Title", "author": "Author Name", "isbn": "1234567890", "publicationDate": "2023-01-01"}
# get all records 
 http://localhost:9000/books get api
# get record byid 
http://localhost:9000/books/:id get api
# update record byid
http://localhost:9000/books/:id put api- payload> {"title": "Updated Title", "author": "Updated Author", "isbn": "0987654321", "publicationDate": "2023-01-02"}
# delete record byid 
http://localhost:9000/books/:id delete api
