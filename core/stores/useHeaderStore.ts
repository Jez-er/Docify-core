import { useEffect, useState } from 'react'
import { HeaderConfig } from '../types'

type Listener = (config: HeaderConfig) => void

let config: HeaderConfig | null = null
const listeners = new Set<Listener>()

const subscribe = (listener: Listener): (() => void) => {
	listeners.add(listener)
	return () => {
		listeners.delete(listener)
	}
}

const setConfig = (newConfig: HeaderConfig) => {
	config = newConfig
	listeners.forEach(listener => listener(newConfig))
}

const getConfig = () => config

const useHeaderStore = () => {
	const [localConfig, setLocalConfig] = useState<HeaderConfig | null>(() =>
		getConfig()
	)

	useEffect(() => {
		const unsubscribe = subscribe(setLocalConfig)
		return unsubscribe
	}, [])

	return {
		config: localConfig,
	}
}

export { getConfig, setConfig }
export default useHeaderStore
