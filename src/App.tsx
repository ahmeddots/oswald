import { Route } from "wouter";
import { useEffect } from "react";

import { createEmotionCache, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { Layout } from "./Layout";
import { AuthPage } from "./pages/AuthPage";
import { MainPage } from "./pages/MainPage";
import { ProductsPage } from "./pages/ProductsPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { OverviewPage } from "./pages/OverviewPage";

import { CustomFonts } from "./components/CustomFonts";
import rtlPlugin from "stylis-plugin-rtl";
import i18n from "./utils/translation";

import { Provider } from "react-redux";
import { store, useAppDispatch, useAppSelector } from "./stores/root";
import { getCategories, getProducts } from "./stores/products";
import { getTransactions } from "./stores/transactions";

// right to left caching for emotion
const rtlCache = createEmotionCache({
	key: "mantine-rtl",
	stylisPlugins: [rtlPlugin],
});

function App() {
	return (
		// provide redux store
		<Provider store={store}>
			<AppInner></AppInner>
		</Provider>
	);
}

function AppInner() {
	// get settings state
	const settingsState = useAppSelector((state) => state.settings);

	const dispatch = useAppDispatch();

	// set language on app init according to settings state
	useEffect(() => {
		i18n.changeLanguage(settingsState.rightToLeft ? "ku" : "en");
		dispatch(getProducts());
		dispatch(getCategories());
		dispatch(getTransactions());
	}, []);

	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				fontFamily: "Ubuntu Kurdish",
				headings: { fontFamily: "Ubuntu Kurdish" },
				colorScheme: settingsState.darkMode ? "dark" : "light",
				primaryColor: settingsState.color,
				dir: settingsState.rightToLeft ? "rtl" : "ltr",
				loader: "bars",
			}}
			emotionCache={settingsState.rightToLeft ? rtlCache : undefined}
		>
			<NotificationsProvider>
				<CustomFonts></CustomFonts>
				<Layout rtl={settingsState.rightToLeft}>
					{/* Routes */}
					<Route path="/" component={MainPage} />
					<Route path="/products" component={ProductsPage} />
					<Route path="/transactions" component={TransactionsPage} />
					<Route path="/overview" component={OverviewPage} />
					<Route path="/auth" component={AuthPage} />
					{/* Routes end */}
				</Layout>
			</NotificationsProvider>
		</MantineProvider>
	);
}

export default App;
