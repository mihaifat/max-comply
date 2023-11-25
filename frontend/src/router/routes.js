const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				component: () => import('pages/IndexPage.vue'),
			},
			{
				path: 'onboarding-introduction',
				component: () => import('pages/OnboardingIntroduction.vue'),
			},
			{
				path: 'identity-validation',
				component: () => import('pages/IdentityValidation.vue'),
			},
			{
				path: 'address-validation',
				component: () => import('pages/AddressValidation.vue'),
			},
			{
				path: 'financial-records',
				component: () => import('pages/FinancialRecords.vue'),
			}
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue'),
	}
];

export default routes;
