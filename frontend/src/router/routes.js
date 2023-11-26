const routes = [
	{
		path: '/',
		redirect: '/task/1',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: 'task/:id',
				component: () => import('pages/TaskPage.vue'),
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
