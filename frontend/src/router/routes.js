// Checks if the path parameter id is between 1 and 4
function isValidID(id) {
	return /^[1-4]$/.test(id);
}

const routes = [
	{
		path: '/',
		redirect: '/task/1',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: 'task/:id',
				component: () => import('pages/TaskPage.vue'),
				beforeEnter: (to, from, next) => { // Route guard to check if it's permitted navigating to /task with the given id path parameter
					const {
						id,
					} = to.params;
					if (isValidID(id)) {
						next();
					} else {
						next('/:catchAll(.*)*');
					}
				},
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
