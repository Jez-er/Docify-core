import { setConfig } from './stores'
import { HeaderConfig } from './types'

export * from './components'
export * from './router'
export * from './types'

export const initDocify = (headerConfig: HeaderConfig) => {
	setConfig(headerConfig)
	console.log('Docify started successfully!')
}
