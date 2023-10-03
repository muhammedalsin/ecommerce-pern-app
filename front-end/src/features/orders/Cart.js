import { Link, useActionData, useLoaderData, useRouteLoaderData } from "react-router-dom";

import InlineErrorPage from "../../components/InlineErrorPage/InlineErrorPage";
import { getProductDetailPath } from "../products/utils";
import { renderOrderItems } from "./utils";


export async function cartLoader() {
  // https://reactrouter.com/en/main/start/tutorial#loading-data
  // https://reactrouter.com/en/main/route/loader
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/cart`,
      { credentials: "include" }
    );
    if (res.ok) {
      const cartData = await res.json();
      return { cartData };
    }
    throw new Error("Unexpected status code.");
  } catch (error) {
    return { cartLoaderError: "Sorry, your cart could not be loaded. Please try again later." };
  }
}


export function Cart() {
  // https://reactrouter.com/en/main/hooks/use-route-loader-data
  const authData = useRouteLoaderData("app");
  const { cartData, cartLoaderError } = useLoaderData();
  const removalResult = useActionData();

  if (!authData.logged_in) {
    return <InlineErrorPage pageName="Cart" type="login_required" loginRedirect="/cart" />;
  } else if (cartLoaderError) {
    return <InlineErrorPage pageName="Cart" message={cartLoaderError} />;
  }

  function renderRemovalMessage() {
    const { error, productId, productName } = removalResult;
    if (error) {
      return <p>Sorry, '{productName}' couldn't be removed from your cart.</p>;
    }
    const productPath = getProductDetailPath(productId, productName);
    return <p>'<Link to={productPath}>{productName}</Link>' was removed from your cart.</p>;
  }

  function renderCheckoutButton() {
    if (!cartLoaderError) {
      return <Link to="/checkout">Go to checkout</Link>;
    }
  }

  return (
    <div>
      <h1>Cart</h1>
      <p>You are logged in as {authData.email_address}.</p>
      {cartData?.length > 2 ? renderCheckoutButton() : null}
      {removalResult ? renderRemovalMessage() : null}
      {renderOrderItems(cartData, cartLoaderError)}
      <hr />
      {cartData?.length > 0 ? renderCheckoutButton() : null}
    </div>
  );
}
