const express = require('express');
const router = express.Router();

const authMiddleware = require('../auth/middlewares/auth');


router.get('/', authMiddleware.hasAuth, (req, res) => {
	const locations = [
		{
			name: 'Manila',
			lat: 14.5995, 
			lng: 120.9842
		},
		{
			name: 'Mandaluyong',
			lat: 14.5794,
			lng: 121.0359
		},
		{
			name: 'Quezon City',
			lat: 14.6488,
			lng: 121.0509
		},
		{
			name: 'Pasig',
			lat: 14.58691,
			lng: 121.0614
		},
		{
			name: 'Pasay',
			lat: 14.537752,
			lng: 121.001381
		},
		{
			name: 'Taguig',
			lat: 14.5499978,
			lng: 121.083333
		},
		{
			name: 'Paranaque',
			lat: 14.4793,
			lng: 121.0198
		},
		{
			name: 'Muntinlupa',
			lat: 14.4081,
			lng: 121.0415
		},
		{
			name: 'San Juan',
			lat: 14.6019,
			lng: 121.0355
		},
		{
			name: 'Marikina',
			lat: 14.6507,
			lng: 121.1029
		},
		{
			name: 'Caloocan',
			lat: 14.7566,
			lng: 121.0450
		},
		{
			name: 'Malabon',
			lat: 14.6681,
			lng: 120.9658
		},
		{
			name: 'Valenzuela',
			lat: 14.7011,
			lng: 120.9830
		},
		{
			name: 'Navotas',
			lat: 14.6732,
			lng: 120.9350
		},
		{
			name: 'Las Pinas',
			lat: 14.4445,
			lng: 120.9939
		},
		{
			name: 'Pateros',
			lat: 14.5454,
			lng: 121.0687
		}
	]
	const tickets = [
		{
			id: 'T-123',
			status: 'Paid',
			location: 'Manila',
			date: '2019-11-11',
			licenseNo: '12345',
			violations: [
				{
					id: 'A-123',
					noOfOffense: 1
				},
				{
					id: 'A-234',
					noOfOffense: 2
				}
			]
		},
		{
			id: 'T-124',
			status: 'Unpaid',
			location: 'Marikina',
			date: '2019-11-13',
			licenseNo: '12345',
			violations: [
				{
					id: 'A-123',
					noOfOffense: 1
				},
				{
					id: 'A-234',
					noOfOffense: 2
				}
			]
		},
		{
			id: 'T-125',
			status: 'Unpaid',
			location: 'Pasay',
			date: '2019-11-20',
			licenseNo: '12345',
			violations: [
				{
					id: 'A-123',
					noOfOffense: 1
				},
				{
					id: 'A-234',
					noOfOffense: 2
				}
			]
		}
	]
	const violations = [
		{
			id: 'A-123',
			description: 'Violation 1',
			price: {
				'1': 400,
				'2': 500,
				'3': 600
			}
		},
		{
			id: 'A-234',
			description: 'Violation 2',
			price: {
				'1': 500,
				'2': 500,
				'3': 600
			}
		}
	]
	return res.render('index/views/index', {locations, tickets, violations})
});

router.route('/login')
	.get(authMiddleware.noAuthed, (req, res) => {
		return res.render('index/views/login')
	})
	.post(authMiddleware.noAuthed, (req, res) => {
		const { username, password } = req.body
		
		if (username === 'admin' && password === 'pass') {
			req.session.user = {
				user: 'admin'
			}

			return res.redirect('/')
		} else {
			return res.redirect('/login')
		}
	})

router.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if (err) throw err;
		res.redirect('/login');
	});
});

exports.index = router;