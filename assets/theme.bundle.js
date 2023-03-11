const shopifyCart = class {
  cart;
  constructor() {
    this.init();
  }
  init = async () => {
    this.cart = await this.getCart();
  };
  clearCart = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await fetch("/cart/clear.js/?sections[]=cart-icon-bubble&sections[]=cart-drawer&sections[]=cart-notification-product", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        });
        return resolve(result.json());
      } catch (error) {
        reject(error);
      }
    });
  };
  getCart = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await fetch("/cart.json", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        });
        return resolve(result.json());
      } catch (error) {
        reject(error);
      }
    });
  };
  appendCartSections = () => {
    return {
      sections: "cart-drawer,cart-icon-bubble",
      sections_url: window.location.pathname
    };
  };
  addItem = async (variantId, quantity, properties = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await fetch("/cart/add.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            quantity: quantity,
            id: variantId,
            properties: properties
          })
        });
        return resolve(result.json());
      } catch (error) {
        reject(error);
      }
    });
  };
  addItems = async (itemsArray, showCart = false) => {
    return new Promise(async (resolve, reject) => {
      try {
        const extras = showCart == true ? this.appendCartSections() : "";
        const result = await fetch("/cart/add.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            items: itemsArray,
            ...extras
          })
        });
        return resolve(result.json());
      } catch (error) {
        reject(error);
      }
    });
  };
  removeItem = async data => {
    return new Promise(async (resolve, reject) => {
      console.log(data);
      try {
        const result = await fetch("/cart/change.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            data,
            quantity: 0
          })
        });
        return resolve(result.json());
      } catch (error) {
        reject(error);
      }
    });
  };
  removeItemById = async lineItemId => {
    return this.removeItem({
      id: lineItemId
    });
  };
  removeItemByLineNumber = async lineNumber => {
    return this.removeItem({
      line: lineNumber
    });
  };
  updateItem = async data => {
    return new Promise(async (resolve, reject) => {
      console.log(data);
      try {
        const result = await fetch("/cart/change.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(data)
        });
        return resolve(result.json());
      } catch (error) {
        reject(error);
      }
    });
  };
  updateItemById = async (lineItemId, newQuantity, newProperties = {}) => {
    return this.updateItem({
      quantity: newQuantity,
      id: lineItemId,
      properties: newProperties
    });
  };
  updateItemByLineNumber = async (lineNumber, newQuantity, newProperties = {}) => {
    return this.updateItem({
      quantity: newQuantity,
      line: lineNumber,
      properties: newProperties
    });
  };
};

// If the locale has been changed, we need to clear the users cart and adjust the site accordingly.
const localeCheck = async () => {
  const ajaxCart = new shopifyCart();
  const oldCountryValue = localStorage.getItem("lastCountry");
  const oldLocaleValue = localStorage.getItem("lastLocale");
  console.log("🚀 const oldCountryValue =", oldCountryValue);
  const currentLocale = window.Shopify?.locale;
  const currentCountry = window.Shopify?.country;
  console.log("🚀 const currentCountry =", currentCountry);
  if (oldCountryValue !== undefined && oldCountryValue === currentCountry && oldLocaleValue !== undefined && oldLocaleValue === currentLocale) {
    return true;
  }
  console.log(currentCountry, oldCountryValue);
  console.log(currentLocale, oldLocaleValue);
  await ajaxCart.clearCart();
  const cartBubble = document.querySelectorAll(".cart-count-bubble span");
  cartBubble.forEach(element => {
    element.innerHTML = "0";
  });
  localStorage.setItem("lastCountry", currentCountry);
  localStorage.setItem("lastLocale", currentLocale);
  console.log(localStorage.getItem("lastCountry"));
};
window.addEventListener("load", localeCheck);
