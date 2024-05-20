
// Get information about your Shopify store
async function getInfo(token, shopName) {
  const shopifyUrl = `https://${shopName}.myshopify.com/admin/api/2021-07`;
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": `${token}`,
  };

  const customersUrl = `${shopifyUrl}/shop.json`;
  const CustomersRequestOptions = { method: "GET", headers, url: customersUrl };

  var response = await fetch(customersUrl, CustomersRequestOptions);
  var data = await response.json();
  console.log(data);
}

// Get list of customers in your store and select a random customer
async function getCustomers(token, shopName) {
  const shopifyUrl = `https://${shopName}.myshopify.com/admin/api/2021-07`;
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": `${token}`,
  };

  const customersUrl = `${shopifyUrl}/customers.json`;
  const CustomersRequestOptions = { method: "GET", headers, url: customersUrl };

  var response = await fetch(customersUrl, CustomersRequestOptions);
  var data = await response.json();
  // console.log(data)

  const randomCustomerIndex = Math.floor(Math.random() * data.customers.length);
  const randomCustomer = data.customers[randomCustomerIndex];
  console.log(randomCustomer.id);
  getProduct(token, shopName, randomCustomer);
  // return randomCustomer.id;
}

// Get list of products in your store and select a random product
async function getProduct(token, shopName, customer) {
  const shopifyUrl = `https://${shopName}.myshopify.com/admin/api/2021-07`;
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": `${token}`,
  };

  const customersUrl = `${shopifyUrl}/products.json`;
  const CustomersRequestOptions = { method: "GET", headers, url: customersUrl };

  var response = await fetch(customersUrl, CustomersRequestOptions);
  var data = await response.json();
  // console.log(data)

  const randomProductIndex = Math.floor(Math.random() * data.products.length);
  const randomProduct = data.products[randomProductIndex];
  console.log(randomProduct.id + "for customer " + customer.id);
  console.log(randomProduct.variants[0].price);
  placeOrder(token, shopName, customer, randomProduct);
  // return randomCustomer.id;
}

// Plae a draft order for the random customer and the random product
async function placeOrder(token, shopName, customer, product) {
  var now = Date("now");
  var quantity = Math.floor(Math.random() * 2) + 1;
  const shopifyUrl = `https://${shopName}.myshopify.com/admin/api/2021-07`;

  var response = await fetch(`${shopifyUrl}/draft_orders.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": `${token}`,
    },
    body: JSON.stringify({
      draft_order: {
        customer_note: `Random order for ${customer.name}`,
        email: customer.email,
        financial_status: "paid",
        name: `${product.name} - Auto Order`,
        ordered_at: now,
        use_customer_default_address: true,
        state: "fulfilled",
        total_price: product.variants[0].price * quantity,
        total_line_items_price: product.variants[0].price * quantity * quantity,
        line_items: [
          {
            variant_id: product.variants[0].id,
            quantity: quantity,
          },
        ],
      },
    }),
  });
  var data = await response.json();
  console.log(data);
  completeDraft(data.draft_order.id, shopName, token);

  return ("bye");
  // return randomCustomer.id;
}

// Execute draft order
async function completeDraft(orderid, shopName, token) {
  const shopifyUrl = `https://${shopName}.myshopify.com/admin/api/2021-07/draft_orders/` + orderid + `/complete.json`;
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": `${token}`,
  };

  const request_order = { method: "PUT", headers, url: shopifyUrl };
  var response = await fetch(shopifyUrl, request_order);
  var data = await response.json();
  console.log(data);
}


const token = 'mytoken';
const url = 'mystore'

getInfo(token, url)
getCustomers(token, url)

