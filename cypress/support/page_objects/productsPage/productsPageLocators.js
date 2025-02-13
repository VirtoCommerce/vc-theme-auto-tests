const productsPageLocators = {

    viewAllProductsButton: 'a[href="/search/products?q=Tech&facets="][class*="vc-button"]:contains("View all products")',
    productsGrid: '.grid.gap-5',
    //firstAvailableProduct: '.grid.gap-5 .flex:has(.vc-chip--success:contains("in stock")) .vc-button--outline--primary:enabled'

}

export default productsPageLocators;