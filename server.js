const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './Config.env' });

if (!process.env.DATABASE || !process.env.PASSWORD) {
    console.error(
        'Please provide DATABASE and PASSWORD in the Config.env file'
    );
    process.exit(1);
}

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err);
    process.exit(1);
});

const DB = process.env.DATABASE.replace('<db_password>', process.env.PASSWORD);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const app = require('./app');

const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
    console.log(`Listening on port ${port}...`)
);

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err);
    server.close(() => {
        process.exit(1);
    });
});
