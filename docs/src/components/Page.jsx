import styles from './Page.module.css'

export function Page({ children }) {
  return <div className={styles.page}>{children}</div>
}

export function PageHeader({ eyebrow, title, description }) {
  return (
    <header className={styles.header}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
    </header>
  )
}

export function Section({ title, children, id }) {
  return (
    <section className={styles.section} id={id}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      {children}
    </section>
  )
}

export function SubSection({ title, children }) {
  return (
    <div className={styles.sub}>
      {title && <h3 className={styles.subTitle}>{title}</h3>}
      {children}
    </div>
  )
}

export function Prose({ children }) {
  return <div className={styles.prose}>{children}</div>
}

export function Badge({ children, variant = 'default' }) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>
}

export function PropTable({ rows }) {
  // rows: [{ name, type, default, description }]
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type / Values</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.name}>
              <td>
                <code>{r.name}</code>
              </td>
              <td>
                <code className={styles.type}>{r.type}</code>
              </td>
              <td>
                <code>{r.default || '—'}</code>
              </td>
              <td>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Demo({ label, children }) {
  return (
    <div className={styles.demo}>
      {label && <span className={styles.demoLabel}>{label}</span>}
      <div className={styles.demoContent}>{children}</div>
    </div>
  )
}

export function Grid2({ children }) {
  return <div className={styles.grid2}>{children}</div>
}

export function Callout({ type = 'info', children }) {
  return <div className={`${styles.callout} ${styles[`callout_${type}`]}`}>{children}</div>
}
