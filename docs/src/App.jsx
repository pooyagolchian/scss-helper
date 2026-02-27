import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import GettingStarted from './pages/GettingStarted'
import Tokens from './pages/Tokens'
import GoldenRatio from './pages/GoldenRatio'
import Typography from './pages/Typography'
import Spacing from './pages/Spacing'
import Grid from './pages/Grid'
import DarkMode from './pages/DarkMode'
import ContainerQueries from './pages/ContainerQueries'
import Animations from './pages/Animations'
import Mixins from './pages/Mixins'
import TailwindPlugin from './pages/TailwindPlugin'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="getting-started" element={<GettingStarted />} />
        <Route path="tokens" element={<Tokens />} />
        <Route path="golden-ratio" element={<GoldenRatio />} />
        <Route path="typography" element={<Typography />} />
        <Route path="spacing" element={<Spacing />} />
        <Route path="grid" element={<Grid />} />
        <Route path="dark-mode" element={<DarkMode />} />
        <Route path="container-queries" element={<ContainerQueries />} />
        <Route path="animations" element={<Animations />} />
        <Route path="mixins" element={<Mixins />} />
        <Route path="tailwind-plugin" element={<TailwindPlugin />} />
      </Route>
    </Routes>
  )
}
