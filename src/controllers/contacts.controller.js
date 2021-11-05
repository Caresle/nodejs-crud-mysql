const Contact = require('../models/contact')

const getContacts = async (req, res) => {
	const contacts = await Contact.findAll()
	
	if (!contacts) {
		res.render('contacts/')
	}

	const data = []
	for (const contact of contacts) {
		data.push(contact.toJSON())
	}
	res.render('contacts/', {contacts: data})
}

const createContact = async (req, res) => {
	const { contact_name, phone_number } = req.body
	const response = await Contact.create({
		contact_name,
		phone_number
	})

	if (!response) {
		res.status(400).redirect('/contacts')
	}
	res.status(201).redirect('/contacts')
}

module.exports = {
	getContacts,
	createContact
}