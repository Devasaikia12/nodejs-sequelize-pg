const config = () => {
	let nodeEnv = 'development';
	if (nodeEnv == 'development') {
		require('dotenv').config({ path: `./config/.env.development` });
	} else if (nodeEnv == 'testing') {
		require('dotenv').config({ path: `./config/.env.testing` });
	} else {
		console.log('booo');
	}
};

module.exports = config;
