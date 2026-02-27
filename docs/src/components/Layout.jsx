import { Outlet } from 'react-router-dom'
import styles from './Layout.module.css'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
