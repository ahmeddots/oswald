import { PlusIcon } from "@heroicons/react/24/solid";
import {
	ActionIcon,
	Affix,
	Drawer,
	Flex,
	Group,
	Input,
	NumberInput,
	Stack,
	TextInput,
	Button,
	SimpleGrid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { t } from "i18next";
import { useState } from "react";
import { ProductList } from "../components/ProductList";
import { TitleText } from "../components/TitleText";
import { useAppSelector } from "../stores/root";
import {
	createProduct,
	deleteProduct,
	editProduct,
	useCollection,
} from "../utils/pbase";

export function ProductsPage() {
	let settingsState = useAppSelector((state) => state.settings);

	// search string and drawer visiblity state
	let [search, setSearch] = useState("");
	let [addDrawerVisible, setAddDrawerVisible] = useState(false);
	let [editDrawerVisible, setEditDrawerVisible] = useState(false);

	// get data from products collection
	let query = useCollection("products");

	const addForm = useForm({
		initialValues: {
			name: "",
			price: 1000,
			quantity: 1,
			about: "",
		},

		validate: {
			name: (value) => (value.length > 0 ? null : "Name is required"),
			price: (value) => (value > 0 ? null : "Price is required"),
			quantity: (value) => (value > 0 ? null : "Quantity is required"),
			about: (value) => (value.length > 0 ? null : "About is required"),
		},
	});

	const editForm = useForm({
		initialValues: {
			id: "",
			name: "",
			price_current: 0,
			quantity_available: 0,
			about: "",
		},

		validate: {
			name: (value) => (value.length > 0 ? null : "Name is required"),
			price_current: (value) => (value > 0 ? null : "Price is required"),
			quantity_available: (value) =>
				value > 0 ? null : "Quantity is required",
			about: (value) => (value.length > 0 ? null : "About is required"),
		},
	});

	const tryAddProduct = async () => {
		// try to validate the form
		// if got errors, return
		let feedback = addForm.validate();
		if (feedback.hasErrors) return;

		await createProduct(
			addForm.values.name,
			addForm.values.price,
			addForm.values.quantity,
			addForm.values.about,
		);

		setAddDrawerVisible(false);
	};

	const tryEditProduct = async () => {
		// try to validate the form
		// if got errors, return
		let feedback = editForm.validate();
		if (feedback.hasErrors) return;

		await editProduct(
			editForm.values.id,
			editForm.values.name,
			editForm.values.price_current,
			editForm.values.quantity_available,
			editForm.values.about,
		);

		setEditDrawerVisible(false);
	};

	const tryDeleteProduct = async () => {
		await deleteProduct(editForm.values.id);
		setEditDrawerVisible(false);
	};

	// render
	return (
		<Stack h={"100%"}>
			<Flex justify={"space-between"} align="center" gap={"lg"}>
				<TitleText title="Products" />
				<Input
					placeholder={t("search for a product")}
					value={search}
					onInput={(e: any) => setSearch(e.target.value)}
				></Input>
			</Flex>
			<ProductList
				data={query.data}
				loading={query.loading}
				filterTerms={search}
				itemClickFunc={({
					id,
					name,
					quantity_available,
					price_current,
					about,
				}) => {
					setEditDrawerVisible(true);
					editForm.setValues({
						id,
						name,
						quantity_available,
						price_current,
						about,
					});
				}}
			></ProductList>

			<Affix
				onClick={() => setAddDrawerVisible(true)}
				position={{ bottom: 20, right: 20 }}
			>
				<ActionIcon
					color={settingsState.color}
					size={"xl"}
					variant="filled"
					radius={"xl"}
					p={8}
				>
					<PlusIcon></PlusIcon>
				</ActionIcon>
			</Affix>

			{/* Drawer for editing a product */}
			<Drawer
				opened={editDrawerVisible}
				position={settingsState.rightToLeft ? "right" : "left"}
				onClose={() => setEditDrawerVisible(false)}
				title={t("Edit a product")}
				overlayOpacity={0.7}
				padding="xl"
				size="xl"
			>
				<Stack>
					<TextInput
						withAsterisk
						label={t("Name")}
						placeholder={t("Product name") || "Product name"}
						{...editForm.getInputProps("name")}
					/>
					<TextInput
						withAsterisk
						label={t("About")}
						placeholder={t("About the product") || "About the product"}
						{...editForm.getInputProps("about")}
					/>

					<Group position="apart">
						<Flex direction={"row"} gap="lg">
							<NumberInput
								withAsterisk
								label={t("Price")}
								step={250}
								placeholder={t("Product price") || "Product price"}
								{...editForm.getInputProps("price_current")}
							/>
							<NumberInput
								withAsterisk
								label={t("Quantity")}
								placeholder={t("Quantity available") || "Quantity available"}
								{...editForm.getInputProps("quantity_available")}
							/>
						</Flex>
					</Group>

					<SimpleGrid cols={2} mt={16}>
						<Button onClick={() => tryEditProduct()}>{t("Change")}</Button>
						<Button variant="light" onClick={() => tryDeleteProduct()}>
							{t("Delete")}
						</Button>
					</SimpleGrid>
				</Stack>
			</Drawer>

			{/* Drawer for adding a product */}
			<Drawer
				opened={addDrawerVisible}
				position={settingsState.rightToLeft ? "right" : "left"}
				onClose={() => setAddDrawerVisible(false)}
				title={t("Add a product")}
				overlayOpacity={0.7}
				padding="xl"
				size="xl"
			>
				<Stack>
					<TextInput
						withAsterisk
						label={t("Name")}
						placeholder={t("Product name") || "Product name"}
						{...addForm.getInputProps("name")}
					/>
					<TextInput
						withAsterisk
						label={t("About")}
						placeholder={t("About the product") || "About the product"}
						{...addForm.getInputProps("about")}
					/>

					<Group position="apart">
						<Flex direction={"row"} gap="lg">
							<NumberInput
								withAsterisk
								label={t("Price")}
								step={250}
								placeholder={t("Product price") || "Product price"}
								{...addForm.getInputProps("price")}
							/>
							<NumberInput
								withAsterisk
								label={t("Quantity")}
								placeholder={t("Quantity available") || "Quantity available"}
								{...addForm.getInputProps("quantity")}
							/>
						</Flex>
					</Group>

					<Button color={settingsState.color} onClick={tryAddProduct} mt={16}>
						{t("Add")}
					</Button>
				</Stack>
			</Drawer>
		</Stack>
	);
}
