const express = require('express');
const {nanoid} = require('nanoid');

const app = express();
app.use(express.json());

const books =[];

app.post('/books', (req,res) =>{
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = req.body

    if(!name){
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambah buku. Mohon isi nama buku',
        });
    }

    if(readPage > pageCount){
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambah buku. readPage tidak boleh lebih besar dari pageCount',
        });
    }

    const id = nanoid();
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    return res.status(201).json({
        satus: 'success',
        data: {
            bookId: id
        }
    });
});

app.get('/books',(req,res) => {
    const {name, reading, finished} = req.query;

    let filteredBooks = books;

    if(name){
        const lowerCaseName = name.toLowerCase();
        filteredBooks = filteredBooks.filter((book) => book.name.toLocaleLowerCase().includes(lowerCaseName));
    }

    if(reading !== undefined){
        const isReading = reading === '1';
        filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
    }

    if (finished !== undefined){
        const isFinished = finished === '1';
        filteredBooks = filteredBooks.filter((book) => book.finished === isFinished);
    }

    const response = {
        status: 'success',
        data: {
            books: filteredBooks.map((book) =>({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    };
    res.status(200).json(response);
});

app.get('/books/:bookId', (req,res) =>{
    const {bookId} = req.params;

    const foundBook = books.find((book) => book.id === bookId);

    if (!foundBook){
        return res.status(404).json({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        });
    }

    return res.status(200).json({
        staus: 'success',
        data:{
            book: foundBook,
        },
    });
});

app.put('/books/:bookId', (req,res) => {
    const {bookId} = req.params;
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = req.body;

    if(!name){
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal mempebarui Buku. Mohon isi nama buku'
        });
    }

    if(readPage > pageCount){
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal mempebarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
    }

    const foundBookIndex = books.findIndex((book) => book.id === bookId);

    if(foundBookIndex === -1){
        return res.status(404).json({
            status: 'fail',
            message: 'Gagal mempebarui buku. Id tidak ditemukan',
        });
    }

    const updatedAt = new Date().toISOString();

    books[foundBookIndex] = {
        ...books[foundBookIndex],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
    };

    return res.status(200).json({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    });
});

app.delete('/books/:bookId', (req, res) => {
    const { bookId } = req.params;

    const foundBookIndex = books.findIndex((book) => book.id === bookId);

    if (foundBookIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Gagal menghapus buku. Id tidak ditemukan',
        });
    }

    books.splice(foundBookIndex, 1);

    return res.status(200).json({
        status: 'success',
        message: 'Buku berhasil dihapus',
    });
});

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});