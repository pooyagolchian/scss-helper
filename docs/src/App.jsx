import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Animations from "./pages/Animations";
import ContainerQueries from "./pages/ContainerQueries";
import DarkMode from "./pages/DarkMode";
import GettingStarted from "./pages/GettingStarted";
import GoldenRatio from "./pages/GoldenRatio";
import Grid from "./pages/Grid";
import Home from "./pages/Home";
import Mixins from "./pages/Mixins";
import Spacing from "./pages/Spacing";
import TailwindPlugin from "./pages/TailwindPlugin";
import Tokens from "./pages/Tokens";
import Typography from "./pages/Typography";

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
	);
}
