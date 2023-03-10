import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	ku: {
		translation: {
			Colour: "ڕەنگ",
			Theme: "شێواز",
			RTL: "ڕاست بۆ چەپ",
			Red: "سوور",
			Blue: "شین",
			Green: "سەوز",
			Indigo: "مۆر",
			Teal: "پیرۆزەیی",

			"in total": "بە گشتی",
			items: "بەرهەم",
			Customer: "کڕیار",
			Sell: "بفرۆشە",
			"No items in checkout": "هیچ بەرهەمێک هەڵنەبژێردراوە",
			Clear: "بەتاڵبکرەوە",
			Checkout: "پەسەندبکە",

			"Product name": "ناوی بەرهەم",
			Products: "بەرهەمەکان",
			"search for a product": "بەدوای بەرهەمێکدا بگەڕێ",
			"No results for the search": "گەڕانەکە هیچ ئەنجامێکی نەهێنایەوە",
			"Add a product": "بەرهەمێک زیادبکە",
			"Product price": "نرخی بەرهەم",
			"Quantity available": "عەدەدی بەردەست",
			"About the product": "دەربارەی بەرهەم",
			"Edit a product": "دەسکاری بەرهەمەکە بکە",
			Delete: "بیسڕەوە",
			Change: "بیگۆڕە",
			Quantity: "عەدەد",
			Qty: "عەدەد",
			Add: "زیادیبکە",
			Name: "ناو",
			About: "دەربارە",
			Category: "جۆری بەرهەم",
			Price: "نرخ",
			Total: "گشتی",
			"Min price": "کەمترین نرخ",
			"Max price": "زۆرترین نرخ",

			"Select some categories": "جۆری بەرهەم هەڵبژێرە",
			Categories: "جۆرەکانی بەرهەم",
			"New name": "ناوی تازە",
			"Change name": "ناو بگۆڕە",
			"Has no category": "هیچ جۆرێکی بۆ دانەنراوە",

			Transactions: "مامەڵەکان",
			"Transaction total": "کۆی گشتی مامەڵەکە",
			Date: "بەروار",
			Edit: "دەستکاری بکە",

			username: "ناوی بەکارهێنەر",
			password: "وشەی نهێنی",
			Login: "بچۆرەناو",
			"Cannot login": "ناتوانیت بچیتە ناوەوە",
			"Username is required": "پێویستە ناوێک داخڵ بکەیت",
			"Password is required": "پێویستە وشەی نهێنی داخڵ بکەیت",

			Overview: "گشتی",

			"Adding product...": "بەرهەمەکە زیاد ئەکرێت...",
			"Editing product...": "بەرهەمەکە دەستکاری ئەکرێت...",
			"Deleting product...": "بەرهەمەکە ئەسڕدرێتەوە...",
			"Adding category...": "جۆرەکە زیاد ئەکرێت...",
			"Editing category...": "جۆرەکە دەسکاری ئەکرێت...",
			"Deleting category...": "جۆرەکە ئەسڕدرێتەوە...",
			"Saving checkout...": "فرۆشەکە جێبەجێدەکرێ...",
		},
	},
};

i18n.use(initReactI18next).init({
	resources: resources,
	lng: "ku",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
