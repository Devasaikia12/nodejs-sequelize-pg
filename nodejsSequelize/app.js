const express = require('express');
const config = require('./config/index.js');
const { sequelize } = require('./models');

config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

/**
 * Define all routes here
 */

app.use('/users', require('./routes/users.routes'));
app.use('/posts', require('./routes/posts.routes'));
app.use('/comments', require('./routes/comments.routes'));

app.listen(PORT, async () => {
	console.log(`App is running on port ${PORT}`);
	await sequelize.authenticate();
	console.log(`Database connected!!`);
});
