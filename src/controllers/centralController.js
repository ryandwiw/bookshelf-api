const { nanoid } = require('nanoid');
const books = require('../resources/books');

class centralController {

    // Method Tambah buku 
    addBook(request, h) {
        const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

        if (!name) {
            return h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            }).code(400);
        }

        if (readPage > pageCount) {
            return h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            }).code(400);
        }

        // ID Unik dengan nanoId
        const id = nanoid(16);
        const insertedAt = new Date().toISOString();
        const newBook = {
            id, name, year, author, summary, publisher,
            pageCount, readPage, reading,
            finished: pageCount === readPage,
            insertedAt, updatedAt: insertedAt,
        };

        books.push(newBook);

        return h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: { bookId: id },
        }).code(201);
    }

    // Method Mengambil Index Semua Buku
    getAllBooks(request, h) {
        const { name, reading, finished } = request.query;
        let filteredBooks = books;

        // Memfilter buku berdasarkan nama jika ada query parameter 'name'
        if (name) {
            filteredBooks = filteredBooks.filter(book =>
                book.name.toLowerCase().includes(name.toLowerCase())
            );
        }

        // Memfilter buku berdasarkan status 'reading' jika ada query parameter 'reading'
        if (reading !== undefined) {
            const isReading = reading === '1'; 
            filteredBooks = filteredBooks.filter(book => book.reading === isReading);
        }

        // Memfilter buku berdasarkan status 'finished' jika ada query parameter 'finished'
        if (finished !== undefined) {
            const isFinished = finished === '1'; 
            filteredBooks = filteredBooks.filter(book => book.finished === isFinished);
        }

        // Mengambil id, nama, dan penerbit dari buku yang telah difilter
        const bookList = filteredBooks.map(({ id, name, publisher }) => ({
            id, name, publisher,
        }));


        return h.response({
            status: 'success',
            data: { books: bookList },
        }).code(200);
    }

    // Method Ambil Buku Berdasarkan Id
    getBook(request, h) {
        const { bookId } = request.params;
        const book = books.find(b => b.id === bookId);

        if (!book) {
            return h.response({
                status: 'fail',
                message: 'Buku tidak ditemukan',
            }).code(404);
        }

        return h.response({
            status: 'success',
            data: { book },
        }).code(200);
    }

    // Method Update buku 
    updateBook(request, h) {
        const { bookId } = request.params;
        const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

        if (!name) {
            return h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            }).code(400);
        }

        if (readPage > pageCount) {
            return h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            }).code(400);
        }

        const bookIndex = books.findIndex(b => b.id === bookId);
        if (bookIndex === -1) {
            return h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Id tidak ditemukan',
            }).code(404);
        }

        books[bookIndex] = {
            ...books[bookIndex],
            name, year, author, summary, publisher,
            pageCount, readPage, reading,
            finished: pageCount === readPage,
            updatedAt: new Date().toISOString(),
        };

        return h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        }).code(200);
    }

    // Method Destroy/Delete pada Buku
    deleteBook(request, h) {
        const { bookId } = request.params;
        const bookIndex = books.findIndex(b => b.id === bookId);

        if (bookIndex === -1) {
            return h.response({
                status: 'fail',
                message: 'Buku gagal dihapus. Id tidak ditemukan',
            }).code(404);
        }

        books.splice(bookIndex, 1);
        return h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        }).code(200);
    }
}

module.exports = new centralController();
