const { User } = require('../models');
const addUsers = async (req, res) => {
	const { name, email, role } = req.body;

	console.log(User);
	try {
		const data = await User.create({ name, email, role });
		res.send(data);
	} catch (error) {
		res.status(500).send(error.message);
	}
};

const findUsers = async (req, res) => {
	try {
		const data = await User.findAll();
		res.json(data);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const findUser = async (req, res) => {
	const uuid = req.params.uuid;

	console.log(User);
	try {
		const data = await User.findOne({
			where: { uuid },
		});
		res.json(data);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

module.exports = { addUsers, findUser, findUsers };
