const Hapi = require('@hapi/hapi');
const routes = require('./routes/routes');

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
        //Antisipasi Cors
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`\x1b[1mServer Sedang Berjalan pada : ${server.info.uri}\x1b[0m`);
}

init();