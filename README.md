# ShopifyMockOrder

* This little script will help you place mock orders in your Shopify store. This can be used for testing purposes and validating integrations and behaviors that tyou have installed in your Shopify Store.
* Functions are all chained together so everything happens automatically. However, a valid dropdown of all the functions is the following:
** getInfo() : Will give you information about your store
** getCustomers() : Will get a random customer from your customers list
** getProduct() : Will get a random product from your product list
** placeOrder() : Will place a draft order given the random customer and the random product selected.
** completeDraft() : Will execute the recently placed drafter order. 

Happy Shopifying
