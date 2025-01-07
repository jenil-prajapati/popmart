const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fetch = require('node-fetch');

const productUrl = "https://www.popmart.com/us/products/1317/SKULLPANDA-The-Sound-Series-Figures";
//const productUrl = "https://www.popmart.com/us/products/228/MEGA-COLLECTION-1000%25-FLABJACKS-Banana-Boo-%C3%97-Smiley";
const loginUrl = "https://www.popmart.com/us/user/login";

async function givePage() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await new Promise(resolve => setTimeout(resolve, 3000));
    return page;
}
async function parseCookies(page) {
    const cookies = await page.cookies();
    return cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
}

async function signIn(page) {
    try {
        await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });

        const emailSelector = "#email";
        await page.waitForSelector(emailSelector, { visible: true });
        await page.type(emailSelector, "prajapatijenil0407@gmail.com");

        const continueButton = ".index_loginButton__O6r8l";
        await page.waitForSelector(continueButton, { visible: true });
        await page.evaluate((selector) => document.querySelector(selector).click(), continueButton);

        const passwordSelector = "#password";
        await page.waitForSelector(passwordSelector, { visible: true });
        await page.type(passwordSelector, "JENU@0407");

        const signInButton = ".index_loginButton__O6r8l[type='submit']";
        await page.waitForSelector(signInButton, { visible: true });
        await page.evaluate((selector) => document.querySelector(selector).click(), signInButton);

        await page.waitForNavigation({ waitUntil: "networkidle2" });
        console.log("Successfully signed in.");
    } catch (error) {
        console.error("Error during sign-in process: ", error);
    }
}

async function productInStock(page) {
    try {
        await page.goto(productUrl, { waitUntil: 'domcontentloaded' });
        const quantitySelector = "input.ant-input.index_countInput__2ma_C";
        await page.waitForSelector(quantitySelector, { visible: true });

        const quantity = await page.evaluate((selector) => {
            const quantityInput = document.querySelector(selector);
            if (!quantityInput) return null; 
            return parseInt(quantityInput.getAttribute("value"), 10);
        }, quantitySelector);

        console.log("Extracted quantity:", quantity);

        // Check if the product is in stock
        if (quantity && quantity > 0) {
            console.log("Product is in stock. Proceeding with normal flow.");
            return true;
        } else {
            console.log("Product is out of stock. Ending process.");
            return false;
        }
    } catch (error) {
        console.error("Error checking product stock:", error);
        return false;
    }
}

async function addToBag(page) {
    try {
        const addToBagSelector = '.index_usBtn__2KlEx.index_red__kx6Ql.index_btnFull__F7k90';
        await page.waitForSelector(addToBagSelector, { visible: true });
        //await page.click(addToBagSelector);
        await page.evaluate((selector) => document.querySelector(selector).click(), addToBagSelector);

        const cartConfirmationSelector = '.index_cartItem__xumFD';
        await page.waitForSelector(cartConfirmationSelector, { visible: true });
        console.log("Add to Bag action confirmed.");
    } catch (error) {
        console.error("Error adding product to bag:", error);
    }
}

async function viewBag(page) {
    try {
        const cartIconSelector = '.index_cartItem__xumFD';
        await page.waitForSelector(cartIconSelector, { visible: true });
        //await page.click(cartIconSelector);
        await page.evaluate((selector) => document.querySelector(selector).click(), cartIconSelector);
        
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log("Navigated to bag page.");
    } catch (error) {
        console.error("Error navigating to bag:", error);
    }
}

async function selectAllAndCheckout(page) {
    try {
        const selectAllCheckbox = ".index_checkbox__w_166";
        const checkoutButton = ".index_checkout__V9YPC";

        await page.waitForSelector(selectAllCheckbox, { visible: true });
        // await page.click(selectAllCheckbox);
        await page.evaluate((selector) => document.querySelector(selector).click(), selectAllCheckbox);

        await page.waitForSelector(checkoutButton, { visible: true });
        // await page.click(checkoutButton);
        await page.evaluate((selector) => document.querySelector(selector).click(), checkoutButton);

        console.log("Proceeded to checkout.");
        await new Promise(resolve => setTimeout(resolve, 4000)); 
    } catch (error) {
        console.error("Error during select all and checkout:", error);
    }
}

async function proceedToPay(page) {
    try {
        const proceedToPayButton = ".index_placeOrderBtn__wgYr6";
        await page.waitForSelector(proceedToPayButton, { visible: true });
        // await page.click(proceedToPayButton);
        await page.evaluate((selector) => document.querySelector(selector).click(), proceedToPayButton);

        console.log("Clicked Proceed to Pay button.");
    } catch (error) {
        console.error("Error during proceeding to payment:", error);
    }
}

async function fillPayment(page) {
    try {
        const creditCardOption = ".index_optionItem__yLztv";
        await page.waitForSelector(creditCardOption, { visible: true });
        await page.evaluate((selector) => {
            const option = document.querySelector(selector);
            if (option) option.click();
        }, creditCardOption);
        console.log("Credit card option selected.");

        await new Promise(resolve => setTimeout(resolve, 5000)); 

        console.log("Waiting for iframe for card number...");
        const iframeCard = await page.waitForSelector("iframe[title='Iframe for card number']", { visible: true });
        if (!iframeCard) throw new Error("Card number iframe not found.");
        console.log("Iframe for card number found.");

        const iframeCardContent = await iframeCard.contentFrame();
        if (!iframeCardContent) throw new Error("Unable to access card number iframe content.");
        console.log("Card number iframe content accessed.");

        const cardNumberFieldSelector = "[data-fieldtype='encryptedCardNumber']";
        const cardNumberField = await iframeCardContent.$(cardNumberFieldSelector);
        if (!cardNumberField) throw new Error("Card number field not found.");
        await iframeCardContent.type(cardNumberFieldSelector, "4246315382707911", { delay: 100 });
        console.log("Card number entered.");

        console.log("Waiting for iframe for expiry date...");
        const iframeExpiry = await page.waitForSelector("iframe[title='Iframe for expiry date']", { visible: true });
        const iframeExpiryContent = await iframeExpiry.contentFrame();
        const expiryDateFieldSelector = "[data-fieldtype='encryptedExpiryDate']";
        await iframeExpiryContent.waitForSelector(expiryDateFieldSelector, { visible: true });
        await iframeExpiryContent.type(expiryDateFieldSelector, "11/26", { delay: 100 });
        console.log("Expiry date entered.");

        console.log("Waiting for iframe for security code...");
        const iframeCode = await page.waitForSelector("iframe[title='Iframe for security code']", { visible: true });
        const iframeCodeContent = await iframeCode.contentFrame();
        const securityCodeFieldSelector = "[data-fieldtype='encryptedSecurityCode']";
        await iframeCodeContent.waitForSelector(securityCodeFieldSelector, { visible: true });
        await iframeCodeContent.type(securityCodeFieldSelector, "398", { delay: 100 });
        console.log("Security code entered.");

        console.log("Typing name on card...");
        const nameOnCardSelector = "[name='holderName']";
        await page.waitForSelector(nameOnCardSelector, { visible: true });
        await page.type(nameOnCardSelector, "J. Smith", { delay: 100 });
        console.log("Name on card entered.");

        const payButton = ".adyen-checkout__button--pay";
        await page.waitForSelector(payButton, { visible: true });
        await page.evaluate((selector) => {
            const button = document.querySelector(selector);
            if (button) button.click();
        }, payButton);
        console.log("Payment submitted!");

    } catch (error) {
        console.error("Error occurred while filling the payment page:", error);
        await page.screenshot({ path: 'fill-payment-error.png' }); 
    }
}

async function checkout() {
    const page = await givePage();

    try {
        const acceptButtonSelector = '.policy_acceptBtn__ZNU71';
        await page.goto(productUrl, { waitUntil: 'domcontentloaded' });
        const isAcceptVisible = await page.$(acceptButtonSelector);
        if (isAcceptVisible) {
            await page.click(acceptButtonSelector);
            console.log("Clicked 'ACCEPT' button.");
        }
    } catch (error) {
        console.error("Error clicking 'ACCEPT' button:", error);
    }

    await signIn(page);

    const isInStock = await productInStock(page);
    if (!isInStock) {
        console.log("Process ended as product is out of stock.");
        return;
    }

    await addToBag(page);
    await viewBag(page);
    await selectAllAndCheckout(page);
    await proceedToPay(page);
    await fillPayment(page);
}

checkout();