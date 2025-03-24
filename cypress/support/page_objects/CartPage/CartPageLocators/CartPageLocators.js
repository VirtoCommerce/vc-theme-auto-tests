export const CartPageLocators = {
  CHECKOUT_BUTTON: 'a[href="/checkout"]',
  HEADER_CART_LINK: 'a[href="/cart"]',  //a[contains(@class,'text-[--header-bottom-link-active-color] flex')]
  CHECKBOX: 'input[type="checkbox"]',
  REMOVE_SELECTED_BUTTON: '.vc-line-items__foot > .vc-button--solid--primary',
  CHECKOUT_BUTTON_DISABLED:'#order-summary > .vc-widget__slot-container > .vc-widget__slot > .vc-button--size--md',
  CART_LINE_ITEMS: '.vc-line-items',
  DIALOG_TITLE: '.vc-dialog-header__title',
  DIALOG_FOOTER: '.vc-dialog-footer__container > .vc-button--color--primary',
  EMPTY_CART_LAYOUT: '.vc-empty-page__main',
  EMPTY_CART_CONTAINER: '.mb-6',
  EMPTY_CART_MESSAGE: 'Your cart is empty',
  CONTINUE_SHOPPING_BUTTON: 'span:contains("Continue shopping")',
  QUANTITY_INPUT: 'input[aria-label="Product quantity"]',
  REMOVE_BUTTON: 'button[aria-label="Remove from cart"]'
    
}
