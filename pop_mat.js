// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const productUrl = "https://www.popmart.com/us/products/1317/SKULLPANDA-The-Sound-Series-Figures"; 

// async function givePage() {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await new Promise(resolve => setTimeout(resolve, 3000));
//     return page;
// }


// async function addToBag(page) {
//     try {
//         await page.goto(productUrl); // Navigate to product page
//         console.log("Navigated to product page.");

//         // Wait for the "Add to Bag" button to appear
//         await page.waitForSelector('.index_usBtn__2KlEx.index_red__kx6Ql.index_btnFull__F7k90', { visible: true });
//         console.log("Add to Bag button is visible.");

//         // Click the button
//         await page.evaluate(() => {
//             const button = document.querySelector('.index_usBtn__2KlEx.index_red__kx6Ql.index_btnFull__F7k90');
//             if (button) button.click();
//         });
//         console.log("Clicked Add to Bag button.");

//         // Wait for the cart counter or a specific element to confirm the action
//         await page.waitForSelector('.index_cartItem__xumFD', { visible: true });
//         console.log("Add to Bag action confirmed.");

//     } catch (error) {
//         console.error("Error adding product to bag:", error);
//     }
// }


// async function viewBag(page) {
//     try {
//         // Wait for the "View Bag" button to appear
//         await page.waitForSelector('.index_cartItem__xumFD', { visible: true });
//         console.log("View Bag button is visible.");

//         // Click the "View Bag" button
//         await page.evaluate(() => {
//             const button = document.querySelector('.index_cartItem__xumFD');
//             if (button) button.click();
//         });
//         console.log("Clicked View Bag button.");

//         // Wait for the cart page to load
//         await page.waitForNavigation({ waitUntil: 'networkidle2' });
//         console.log("Navigated to bag page.");
//     } catch (error) {
//         console.error("Error navigating to bag:", error);
//     }
// }

// async function selectAllAndCheckout(page) {
//     try {
//         const selectAllCheckbox = ".index_checkbox__w_166"; // Select all checkbox class
//         const checkoutButton = ".index_checkout__V9YPC"; // Checkout button class

//         // Wait for the "Select All" checkbox
//         await page.waitForSelector(selectAllCheckbox);
//         await page.evaluate((checkboxSelector) => {
//             const checkbox = document.querySelector(checkboxSelector);
//             if (checkbox) checkbox.click();
//         }, selectAllCheckbox);
//         console.log("Selected all items.");

//         // Wait for the "Checkout" button
//         await page.waitForSelector(checkoutButton);
//         await page.evaluate((checkoutSelector) => {
//             const button = document.querySelector(checkoutSelector);
//             if (button) button.click();
//         }, checkoutButton);
//         console.log("Proceeded to checkout.");
//     } catch (error) {
//         console.error("Error during select all and checkout:", error);
//     }
// }

// async function checkoutAsGuest(page) {
//     try {
//         const checkoutAsGuestButton = ".index_guestBtn__REZXJ"; // Checkout as guest button class

//         // Wait for the "Checkout as Guest" button
//         await page.waitForSelector(checkoutAsGuestButton);
//         await page.evaluate((guestButtonSelector) => {
//             const button = document.querySelector(guestButtonSelector);
//             if (button) button.click();
//         }, checkoutAsGuestButton);
//         console.log("Checked out as guest.");
//     } catch (error) {
//         console.error("Error during guest checkout:", error);
//     }
// }


// async function fillEmail(page) {
//     try {
//         const emailInput = ".index_emailInput__EL0tW"; // Email input class
//         const firstConfirmButton = ".index_applyBtn__Xnx6b"; // First confirm button class
//         const secondConfirmButton = ".index_confirmBtn__IKON8"; // Second confirm button class

//         // Wait for the email input and type the email
//         await page.waitForSelector(emailInput, { visible: true });
//         await page.type(emailInput, "jpaibot1243@example.com"); // Replace with your email
//         console.log("Email entered.");

//         // Wait for the first "Confirm" button and click it
//         await page.waitForSelector(firstConfirmButton, { visible: true });
//         await page.evaluate((selector) => {
//             const button = document.querySelector(selector);
//             if (button) button.click();
//         }, firstConfirmButton);
//         console.log("First confirm button clicked.");

//         // Wait for the second "Confirm" button and click it
//         await page.waitForSelector(secondConfirmButton, { visible: true });
//         await page.evaluate((selector) => {
//             const button = document.querySelector(selector);
//             if (button) button.click();
//         }, secondConfirmButton);
//         console.log("Second confirm button clicked.");
//     } catch (error) {
//         console.error("Error during email confirmation:", error);
//     }
// }

// async function fillAddress(page) {
//     try {
//         const addAddressButton = ".index_addAddressBtn__cZiyE"; // Add new address button class

//         // Wait for and click the "Add Address" button
//         await page.waitForSelector(addAddressButton, { visible: true });
//         await page.evaluate((selector) => {
//             const button = document.querySelector(selector);
//             if (button) button.click();
//         }, addAddressButton);
//         console.log("Clicked Add Address button.");

//         // Wait for the address form to load
//         const addressFields = {
//             firstName: "#givenName",
//             lastName: "#familyName",
//             phone: "#telNumber",
//             addressFinder: "#rc_select_0"
//         };

//         await page.waitForSelector(addressFields.firstName, { visible: true }); // Wait for the form to load
//         console.log("Address form is visible.");

//         // Fill the address form fields
//         await page.type(addressFields.firstName, "Jenil");
//         await page.type(addressFields.lastName, "Prajapati");
//         await page.type(addressFields.phone, "8055456302");

//         // Type in the address and select the first dropdown item
//         await page.type(addressFields.addressFinder, "6530 Seville ");
//         console.log("Typed partial address.");

//         // Wait for dropdown items to appear
//         await page.waitForSelector(".ant-select-item", { visible: true });

//         // Click the first dropdown item using evaluate
//         await page.evaluate(() => {
//             const dropdownItem = document.querySelector(".ant-select-item");
//             if (dropdownItem) dropdownItem.click();
//         });
//         console.log("Selected first dropdown item.");
//     } catch (error) {
//         console.error("Error during address filling:", error);
//     }
// }

// async function saveAndProceedToPayment(page) {
//     try {
//         const saveButton = ".addressSave"; // Save button class
//         const proceedToPayButton = ".index_placeOrderBtn__wgYr6"; // Proceed to pay button class

//         // Add a delay to ensure everything is ready before clicking the save button
//         console.log("Waiting for the page to stabilize...");
//         await new Promise((resolve) => setTimeout(resolve, 2000));

//         // Wait for and click the "Save" button
//         await page.waitForSelector(saveButton, { visible: true });
//         await page.evaluate((selector) => {
//             const button = document.querySelector(selector);
//             if (button) {
//                 button.focus();
//                 button.click();
//             }
//         }, saveButton);
//         console.log("Clicked Save button.");

//         // Add another delay to ensure the next page loads properly
//         console.log("Waiting before proceeding to payment...");
//         await new Promise((resolve) => setTimeout(resolve, 4000)); 
//         // Wait for and click the "Proceed to Pay" button
//         await page.waitForSelector(proceedToPayButton, { visible: true });
//         await page.evaluate((selector) => {
//             const button = document.querySelector(selector);
//             if (button) {
//                 button.focus();
//                 button.click();
//             }
//         }, proceedToPayButton);
//         console.log("Clicked Proceed to Pay button.");
//     } catch (error) {
//         console.error("Error during proceeding to payment:", error);
//     }
// }

// async function fillPayment(page) {
//     try {
//         // Select the credit card payment option
//         const creditCardOption = ".index_optionItem__yLztv"; // Selector for credit card option
//         await page.waitForSelector(creditCardOption, { visible: true });
//         await page.evaluate((selector) => {
//             const option = document.querySelector(selector);
//             if (option) option.click();
//         }, creditCardOption);
//         console.log("Credit card option selected.");

//         // Add a delay to allow iframe content to load
//         await new Promise(resolve => setTimeout(resolve, 3000));

//         // Interact with iframe for Card Number
//         console.log("Attempting to type card number...");
//         const iframeCard = await page.waitForSelector("iframe[title='Iframe for card number']", { visible: true });
//         const iframeCardContent = await iframeCard.contentFrame();
//         await iframeCardContent.waitForSelector("[data-fieldtype='encryptedCardNumber']", { visible: true });
//         await iframeCardContent.type("[data-fieldtype='encryptedCardNumber']", "4246315382707911", { delay: 100 });
//         console.log("Card number entered.");

//         // Interact with iframe for Expiry Date
//         console.log("Attempting to type expiry date...");
//         const iframeExpiry = await page.waitForSelector("iframe[title='Iframe for expiry date']", { visible: true });
//         const iframeExpiryContent = await iframeExpiry.contentFrame();
//         await iframeExpiryContent.waitForSelector("[data-fieldtype='encryptedExpiryDate']", { visible: true });
//         await iframeExpiryContent.type("[data-fieldtype='encryptedExpiryDate']", "11/26", { delay: 100 });
//         console.log("Expiry date entered.");

//         // Interact with iframe for Security Code
//         console.log("Attempting to type security code...");
//         const iframeCode = await page.waitForSelector("iframe[title='Iframe for security code']", { visible: true });
//         const iframeCodeContent = await iframeCode.contentFrame();
//         await iframeCodeContent.waitForSelector("[data-fieldtype='encryptedSecurityCode']", { visible: true });
//         await iframeCodeContent.type("[data-fieldtype='encryptedSecurityCode']", "398", { delay: 100 });
//         console.log("Security code entered.");

//         // Interact with Name on Card
//         console.log("Attempting to type name on card...");
//         const nameOnCardSelector = "[name='holderName']"; // Use basic selector without ID
//         await page.waitForSelector(nameOnCardSelector, { visible: true });
//         await page.type(nameOnCardSelector, "J. Smith", { delay: 100 });
//         console.log("Name on card entered.");

//         // Click the Pay button
//         console.log("Attempting to click Pay button...");
//         const payButton = ".adyen-checkout__button--pay"; // Pay button selector
//         await page.waitForSelector(payButton, { visible: true });
//         await page.evaluate((selector) => {
//             const button = document.querySelector(selector);
//             if (button) button.click();
//         }, payButton);
//         console.log("Payment submitted!");

//         // Add a small delay for the payment confirmation page to load
//         await new Promise(resolve => setTimeout(resolve, 3000));
//     } catch (error) {
//         console.error("Error occurred while filling the payment page:", error);

//         // Capture a screenshot for debugging
//         await page.screenshot({ path: 'fill-payment-error.png' });
//     }
// }

// async function checkout() {
//     const page = await givePage();
//     await addToBag(page);
//     await viewBag(page);
//     await selectAllAndCheckout(page);
//     await checkoutAsGuest(page);
//     await fillEmail(page);
//     await fillAddress(page);
//     await saveAndProceedToPayment(page);
//     await fillPayment(page);
// }

// checkout();

