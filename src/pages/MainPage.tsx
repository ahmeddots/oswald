import { Stack, Grid } from "@mantine/core";
import { Checkout } from "../components/Checkout";
import { ProductList } from "../components/ProductList";
import { TitleText } from "../components/TitleText";
import { apply } from "../stores/checkout";
import {
	checkoutActions,
	useAppDispatch,
	useAppSelector,
} from "../stores/root";

export function MainPage() {
	let checkoutState = useAppSelector((state) => state.checkout);
	let productsState = useAppSelector((state) => state.products);

	let dispatch = useAppDispatch();

	// function to dispatch checkout action of set quantity
	const qtyFunc = (index: number, qty: number) => {
		dispatch(
			checkoutActions.setItemQty({
				index,
				qty,
			}),
		);
	};

	return (
		<Stack h={"100%"}>
			<TitleText title={"Sell"} />
			<Grid>
				<Grid.Col span={12} sm={7}>
					<ProductList
						data={productsState.list}
						loading={productsState.loading}
						itemClickFunc={({ id, name, price_current }) =>
							dispatch(
								checkoutActions.add({
									id,
									name,
									price: price_current,
								}),
							)
						}
						smaller
						filterTerms={""}
					></ProductList>
				</Grid.Col>
				<Grid.Col span={12} sm={5}>
					<Checkout
						state={checkoutState}
						apply={() => dispatch(apply(checkoutState.items))}
						clear={() => dispatch(checkoutActions.clear())}
						changeQuantity={qtyFunc}
					></Checkout>
				</Grid.Col>
			</Grid>
		</Stack>
	);
}
