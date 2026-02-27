import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

const nav = [
  {
    group: 'START',
    links: [
      { to: '/',                label: 'Introduction' },
      { to: '/getting-started', label: 'Getting Started' },
    ],
  },
  {
    group: 'FOUNDATIONS',
    links: [
      { to: '/tokens',       label: 'Design Tokens' },
      { to: '/golden-ratio', label: '✦ Golden Ratio' },
    ],
  },
  {
    group: 'UTILITIES',
    links: [
      { to: '/typography',        label: 'Typography' },
      { to: '/spacing',           label: 'Spacing' },
      { to: '/grid',              label: 'CSS Grid' },
      { to: '/dark-mode',         label: 'Dark Mode' },
      { to: '/container-queries', label: 'Container Queries' },
      { to: '/animations',        label: 'Animations' },
    ],
  },
  {
    group: 'ADVANCED',
    links: [
      { to: '/mixins',         label: 'Mixins & Functions' },
      { to: '/tailwind-plugin', label: 'Tailwind Plugin' },
    ],
  },
]

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.logo}>✦</span>
        <span className={styles.name}>scss-helper</span>
        <span className={styles.version}>v3.0</span>
      </div>

      <nav className={styles.nav}>
        {nav.map(section => (
          <div key={section.group} className={styles.group}>
            <span className={styles.groupLabel}>{section.group}</span>
            {section.links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        <a
          href="https://github.com/pooyagolchian/scss-helper"
          target="_blank"
          rel="noreferrer"
          className={styles.ghLink}
        >
          GitHub ↗
        </a>
      </div>
    </aside>
  )
}
