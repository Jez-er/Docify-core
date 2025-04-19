import { GitLogo } from '../assets/git'
import useHeaderStore from '../stores/useHeaderStore'
import st from './styles/header.module.css'

const DocifyHeader = () => {
	const { config } = useHeaderStore()

	if (!config) return null

	const paddingX = config.styles?.padding_x || 200
	const paddingY = config.styles?.padding_y || 20

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
			<div style={{ display: 'flex', gap: '5vw', alignItems: 'center' }}>
				<a href='/' className={st.header__logo}>
					<img
						src={config.logoPath}
						alt='DocifyLogo'
						className={st.header__logo__img}
					/>
					<h2 className={st.header__logo__title}>{config.title}</h2>
				</a>
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
