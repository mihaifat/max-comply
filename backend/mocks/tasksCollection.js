const TASK_COLLECTION = [
	{
		id: 1,
		name: 'Onboarding Introduction',
		subHeading: 'A brief introduction to the tasks required.',
		link: '/onboarding-introduction',
		status: 'completed'
	},
	{
		id: 2,
		name: 'Identity Validation',
		subHeading: 'Provide valid photo identification',
		link: '/identity-validation',
		status: 'open'
	},
	{
		id: 3,
		name: 'Address Validation',
		subHeading: 'Provide valid proof of address',
		link: '/address-validation',
		status: 'open'
	},
	{
		id: 4,
		name: 'Financial Records',
		subHeading: 'Provide details of financial transactions',
		link: '/financial-records',
		status: 'open'
	}
]

module.exports.tasks = TASK_COLLECTION;