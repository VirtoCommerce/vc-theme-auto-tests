const checkoutBillingPageLocators = {

selectPaymentMethodButton: 'div[tabindex="0"][role="button"][class="vc-select__button"]',
selectPaymentMethodOptions: 'ul[class="vc-dropdown-menu__list"][style="max-height: 12rem;"] li[role="option"]',
accountBillingOption: 'li[role="option"]:contains("Account billing")',
reviewOrderButton: 'a[href="/checkout/review"][data-test-id="proceed-to-button"]:contains("Review order")'

}

export default checkoutBillingPageLocators;