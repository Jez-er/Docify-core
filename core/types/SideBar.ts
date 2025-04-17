export type SidebarItem = {
	title: string
	link?: string
	children?: SidebarItem[]
}

export type SidebarProps = {
	basePath: string
	sidebars: Record<string, () => Promise<any>>
}
