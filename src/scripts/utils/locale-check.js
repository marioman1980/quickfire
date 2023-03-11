// If the locale has been changed, we need to clear the users cart and adjust the site accordingly.
import shopifyCart from "./ajax-cart";

const localeCheck = async () => {
  const ajaxCart = new shopifyCart();
  const oldCountryValue = localStorage.getItem("lastCountry");
  const oldLocaleValue = localStorage.getItem("lastLocale");
  console.log("🚀 const oldCountryValue =", oldCountryValue);
  const currentLocale = window.Shopify?.locale;
  const currentCountry = window.Shopify?.country;
  console.log("🚀 const currentCountry =", currentCountry);
  if (
    oldCountryValue !== undefined &&
    oldCountryValue === currentCountry &&
    oldLocaleValue !== undefined &&
    oldLocaleValue === currentLocale
  ) {
    return true;
  }

  console.log(currentCountry, oldCountryValue);
  console.log(currentLocale, oldLocaleValue);
  await ajaxCart.clearCart();
  const cartBubble = document.querySelectorAll(".cart-count-bubble span");
  cartBubble.forEach((element) => {
    element.innerHTML = "0";
  });
  localStorage.setItem("lastCountry", currentCountry);
  localStorage.setItem("lastLocale", currentLocale);
  console.log(localStorage.getItem("lastCountry"));
};

window.addEventListener("load", localeCheck);
