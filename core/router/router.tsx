import {
	AnyRoute,
	createRootRoute,
	createRoute,
	createRouter,
	Outlet,
} from '@tanstack/react-router'
import React from 'react'
import { Sidebar } from '../components/SideBar'

const rootRoute = createRootRoute({
	component: () => <Outlet />,
})

export const createLayout = (
	basePath: string,
	sidebarsPath: Record<string, () => Promise<any>>
): AnyRoute => {
	return createRoute({
		getParentRoute: () => rootRoute,
		path: basePath,
		component: () => (
			<div style={{ display: 'flex' }}>
				<Sidebar basePath={basePath} sidebars={sidebarsPath} />
				<Outlet />
			</div>
		),
	}) as AnyRoute
}

export function getDynamicRoutes(
	pages: Record<string, () => Promise<any>>,
	sidebarsPath: Record<string, () => Promise<any>>
) {
	console.log(`genRoutes: ${sidebarsPath}`)
	const layoutMap = new Map<string, AnyRoute>()
	const dynamicRoutes: AnyRoute[] = []

	for (const [filePath, loader] of Object.entries(pages)) {
		const cleanPath = filePath
			.replace('./pages', '')
			.replace(/\.mdx$/, '')
			.replace(/\/index$/, '')
		const segments = cleanPath.split('/').filter(Boolean)

		const basePath = segments[0] || ''
		const subPath = '/' + segments.slice(1).join('/')

		if (!layoutMap.has(basePath)) {
			layoutMap.set(basePath, createLayout(basePath, sidebarsPath))
		}

		const layoutRoute = layoutMap.get(basePath)!
		const pageRoute = createRoute({
			getParentRoute: () => layoutRoute,
			path: subPath || '/',
			component: React.lazy(loader as any),
		})

		dynamicRoutes.push(pageRoute)
	}

	return [...layoutMap.values(), ...dynamicRoutes]
}

function createAppRouter(
	pages: Record<string, () => Promise<any>>,
	sidebarsPath: Record<string, () => Promise<any>>,
	customRoutes: AnyRoute[]
) {
	console.log(`creator: ${sidebarsPath}`)
	const dynamicRoutes = getDynamicRoutes(pages, sidebarsPath)
	return createRouter({
		routeTree: rootRoute.addChildren([...dynamicRoutes, ...customRoutes]),
	})
}

export { createAppRouter, createRoute, createRouter, Outlet, rootRoute }
