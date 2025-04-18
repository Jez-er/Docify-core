interface HeaderPaths {
	title: string
	path: string
}

interface HeaderStyles {
	padding_x: number
	padding_y: number
}

export interface HeaderConfig {
	logoPath: string
	title: string
	navigation: HeaderPaths[]
	gitUrl?: string
	styles?: HeaderStyles
}
