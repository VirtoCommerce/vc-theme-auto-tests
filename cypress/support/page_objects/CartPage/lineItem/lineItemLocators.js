const lineItemLocators = {

    lineItem: '.vc-line-item__main',
    lineItemSku: 'div.vc-property__label:contains("SKU") ~ .vc-property__value',
    lineItemQuantityInput: 'input[aria-label="Product quantity"]',
    lineItemCheckbox: 'input[data-test-id="vc-line-item-checkbox"]',
    removeLineItemButton: 'button[aria-label="Remove from cart"]',
    
}

export default lineItemLocators;