const centralController = require('../controllers/centralController');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: centralController.addBook,
    },
    {
        method: 'GET',
        path: '/books',
        handler: centralController.getAllBooks,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: centralController.getBook,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: centralController.updateBook,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: centralController.deleteBook,
    },
];

module.exports = routes;
