import { GitLogo } from '../assets/git'
import useHeaderStore from '../stores/useHeaderStore'
import st from './styles/header.module.css'

const DocifyHeader = () => {
	const { config } = useHeaderStore()

	if (!config) return null

	const paddingX = config.styles?.padding_x || 100
	const paddingY = config.styles?.padding_y || 10

	return (
		<header
			className={st.header}
			style={{
				paddingLeft: paddingX,
				paddingRight: paddingX,
				paddingTop: paddingY,
				paddingBottom: paddingY,
			}}
		>
			<div>
				<div className={st.header__logo}>
					<img src={config.logoPath} alt='DocifyLogo' />
					<h2 className={st.header__logo__title}>{config.title}</h2>
				</div>
				<div className={st.header__navigation}>
					{config.navigation?.map((link, index) => (
						<a
							key={index}
							href={link.path}
							className={st.header__navigation__item}
						>
							{link.title}
						</a>
					))}
				</div>
			</div>
			<div>
				{config.gitUrl && (
					<a href={config.gitUrl}>
						<GitLogo />
					</a>
				)}
			</div>
		</header>
	)
}

export default DocifyHeader
