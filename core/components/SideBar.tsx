import { useEffect, useState } from 'react'
import getSidebarByBasePath from '../router/SideBarTreeBuilder'
import { SidebarItem, SidebarProps } from '../types/SideBar'

export const Sidebar: React.FC<SidebarProps> = ({ basePath, sidebars }) => {
	const [sidebarItems, setSidebarItems] = useState<SidebarItem[] | undefined>(
		undefined
	)

	useEffect(() => {
		const loadSidebar = async () => {
			const items = await getSidebarByBasePath(basePath, sidebars)
			console.log(items)
			setSidebarItems(items as SidebarItem[] | undefined)
		}
		loadSidebar()
	}, [basePath, sidebars])

	console.log(sidebarItems)

	if (!sidebarItems) {
		return <div>Loading...</div>
	}

	return (
		<div>
			{sidebarItems.map((item, index) => (
				<div key={index}>
					<a href={item.link || '#'}>{item.title}</a>
					{item.children && (
						<ul>
							{item.children.map((subItem, subIndex) => (
								<li key={subIndex}>
									<a href={subItem.link || '#'}>{subItem.title}</a>
								</li>
							))}
						</ul>
					)}
				</div>
			))}
		</div>
	)
}
