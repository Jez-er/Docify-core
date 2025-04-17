import { SidebarItem } from '../types/SideBar'

const getSidebarByBasePath = async (
	basePath: string,
	sidebars: Record<string, () => Promise<any>>
): Promise<SidebarItem[] | undefined> => {
	for (const [path, loader] of Object.entries(sidebars)) {
		if (path.includes(`/pages/${basePath}/`)) {
			const mod = await loader()
			if (mod && mod.sidebar) {
				return mod.sidebar as SidebarItem[]
			}
		}
	}

	return undefined
}

export default getSidebarByBasePath
