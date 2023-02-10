import { createEmotionCache, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { createContext, ReactNode, useContext } from "react";
import rtlPlugin from "stylis-plugin-rtl";
import { Route } from "wouter";
import { Hello } from "./components/Hello";
import { Layout } from "./Layout";
import { HomePage } from "./pages/MainPage";

// right to left caching for emotion
const rtlCache = createEmotionCache({
	key: "mantine-rtl",
	stylisPlugins: [rtlPlugin],
});

// app context to provide rtl and darkmode state
export const AppContext = createContext({
	rtl: false,
	toggleRtl: () => {},
	darkMode: true,
	toggleDarkMode: () => {},
});

// function to abstract the usecontext hook
export const useAppContext = () => useContext(AppContext);

function App() {
	// set both rtl and darkmode in localStorage
	const [rtl, setRtl] = useLocalStorage({ key: "rtl", defaultValue: false });
	const [darkMode, setDarkMode] = useLocalStorage({
		key: "darkMode",
		defaultValue: true,
	});

	// set values to pass to the context
	const contextValue = {
		rtl: rtl,
		toggleRtl: () => setRtl((old) => !old),
		darkMode: darkMode,
		toggleDarkMode: () => setDarkMode((old) => !old),
	};

	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colorScheme: darkMode ? "dark" : "light",
				dir: rtl ? "rtl" : "ltr",
			}}
			emotionCache={rtl ? rtlCache : undefined}
		>
			<AppContext.Provider value={contextValue}>
				<Layout rtl={rtl}>
					<Route path="/" component={HomePage} />
					<Route path="*">Not Found</Route>
				</Layout>
			</AppContext.Provider>
		</MantineProvider>
	);
}

export default App;
