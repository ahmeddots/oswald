import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pb } from "../utils/pbase";

// types

export type Product = {
	id: string;
	name: string;
	about: string;
	category: {
		id: string;
		name: string;
	};
	quantity_available: number;
	price_current: number;
};

type FormProduct = Product & { mode: "edit" | "add" };
type FormFields =
	| "name"
	| "about"
	| "category.name"
	| "category.id"
	| "quantity_available"
	| "price_current";

export type ProductsState = {
	loading: boolean;
	loadingCategories: boolean;
	list: Product[];
	categories: { id: string; name: string }[];
	form: FormProduct;
};

type ProductsActions = {
	formWithEdit: (state: ProductsState, action: PayloadAction<Product>) => void;
	formWithCreate: (state: ProductsState) => void;
	formSetField: (
		state: ProductsState,
		action: PayloadAction<{ field: FormFields; value: number | string }>,
	) => void;
};

// data

const initialProducts: ProductsState = {
	loading: false,
	loadingCategories: false,
	list: [],
	categories: [],
	form: {
		about: "",
		category: { id: "", name: "" },
		id: "",
		mode: "add",
		name: "",
		price_current: 250,
		quantity_available: 1,
	},
};

export const productsSlice = createSlice<ProductsState, ProductsActions>({
	name: "products",
	initialState: initialProducts,
	reducers: {
		// set form ui to edit mode and product values provided
		formWithEdit: (state, action) => {
			state.form = {
				...action.payload,
				mode: "edit",
			};
		},
		// set form ui to add mode and empty values
		formWithCreate: (state) => {
			state.form = initialProducts.form;
		},
		// set a field in the form to a value provided
		formSetField: (state, action) => {
			// better than passing the whole form object
			switch (action.payload.field) {
				case "category.id":
					state.form.category.id = action.payload.value as string;
					break;
				case "category.name":
					state.form.category.name = action.payload.value as string;
					break;
				case "quantity_available":
					state.form.quantity_available = action.payload.value as number;
					break;
				case "about":
					state.form.about = action.payload.value as string;
					break;
				case "price_current":
					state.form.price_current = action.payload.value as number;
					break;
				case "name":
					state.form.name = action.payload.value as string;
					break;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProducts.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getProducts.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});
		builder.addCase(getCategories.pending, (state) => {
			state.loading = true;
			state.loadingCategories = true;
		});
		builder.addCase(getCategories.fulfilled, (state, action) => {
			state.loading = false;
			state.loadingCategories = false;
			state.categories = action.payload;
		});
	},
});

// thunks

// get all the products
export const getProducts = createAsyncThunk(
	"products/get",
	async (): Promise<Product[]> => {
		// get the products from the database
		let products = await pb
			.collection("products")
			.getFullList({ expand: "category_id" });

		// change them into a product list
		let productList = products.map((product) => {
			// if expanded field has multiple relations take the first one
			// this is to fix type errors
			const singleCategory = Array.isArray(product.expand.category_id)
				? product.expand.category_id[0]
				: product.expand.category_id;

			return {
				id: product.id,
				name: product.name,
				about: product.about,
				category: {
					id: singleCategory?.id,
					name: singleCategory?.name,
				},
				price_current: product.price_current,
				quantity_available: product.quantity_available,
			};
		});

		return productList;
	},
);

// create a new product
export const createProduct = createAsyncThunk(
	"products/create",
	async (product: Omit<Product, "id">, { dispatch }) => {
		const data = {
			name: product.name,
			about: product.about,
			price_current: product.price_current,
			quantity_available: product.quantity_available,
			category_id: product.category.id,
		};

		await pb.collection("products").create(data);

		dispatch(getProducts());
	},
);

// edit an existing product using the id
export const editProduct = createAsyncThunk(
	"products/edit",
	async (product: Product, { dispatch }) => {
		const data = {
			name: product.name,
			price_current: product.price_current,
			quantity_available: product.quantity_available,
			about: product.about,
			category_id: product.category.id,
		};

		await pb.collection("products").update(product.id, data);

		dispatch(getProducts());
	},
);

// delete an existing product using the id
export const deleteProduct = createAsyncThunk(
	"products/delete",
	async (product: Pick<Product, "id">, { dispatch }) => {
		await pb.collection("products").delete(product.id);

		dispatch(getProducts());
	},
);

// get all the categories
export const getCategories = createAsyncThunk(
	"products/getCategories",
	async () => {
		let categories = await pb.collection("product_categories").getFullList(1);

		let categoriesList = categories.map((category) => {
			return {
				id: category.id,
				name: category.name,
			};
		});

		return categoriesList;
	},
);

// create a new category
export const createCategory = createAsyncThunk(
	"products/createCategory",
	async (product: { name: string }, { dispatch }) => {
		const data = {
			name: product.name,
		};

		await pb.collection("product_categories").create(data);

		dispatch(getCategories());
	},
);

export const editCategory = createAsyncThunk(
	"products/editCategory",
	async (product: { id: string; name: string }, { dispatch }) => {
		const data = {
			name: product.name,
		};

		await pb.collection("product_categories").update(product.id, data);

		dispatch(getCategories());
	},
);

export const deleteCategory = createAsyncThunk(
	"products/deleteCategory",
	async (product: { id: string }, { dispatch }) => {
		await pb.collection("product_categories").delete(product.id);

		dispatch(getCategories());
	},
);
