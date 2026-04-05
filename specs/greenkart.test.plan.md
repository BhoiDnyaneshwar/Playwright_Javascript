# GreenKart Online Store Test Plan

## Application Overview

Test plan for the GreenKart online vegetable and fruit store at https://rahulshettyacademy.com/seleniumPractise/#/. Covers product browsing, cart operations, search, navigation, and edge cases.

## Test Scenarios

### 1. Product Catalog and Cart Operations

**Seed:** `tests/seed.spec.js`

#### 1.1. Add multiple products to cart and verify cart summary

**File:** `tests/catalog/happy-path.spec.ts`

**Steps:**
  1. Search for 'Tomato' in the search box.
    - expect: Only 'Tomato - 1 Kg' product is visible.
  2. Increase quantity to 3 using the '+' button.
    - expect: Quantity spinbutton shows '3'.
  3. Click 'ADD TO CART' for Tomato.
    - expect: Cart summary updates: Items: 3, Price: 48.
  4. Clear search and add 'Brocolli' (quantity 2) to cart.
    - expect: Cart summary updates: Items: 5, Price: 288.
  5. Click on the 'Cart' link in the header.
    - expect: Cart page/modal displays both products with correct quantities and prices.

#### 1.2. Test quantity boundaries for a product

**File:** `tests/catalog/quantity-boundaries.spec.ts`

**Steps:**
  1. Try to decrease quantity below 1 using the '-' button for any product.
    - expect: Quantity does not go below 1.
  2. Increase quantity to a high value (e.g., 10) and add to cart.
    - expect: Cart summary reflects correct item count and price.

#### 1.3. Remove product from cart and verify updates

**File:** `tests/catalog/remove-from-cart.spec.ts`

**Steps:**
  1. Add 'Cucumber' to cart.
    - expect: Cart summary updates: Items: 1, Price: 48.
  2. Go to cart and remove 'Cucumber'.
    - expect: Cart summary updates: Items: 0, Price: 0.

### 2. Search and Navigation

**Seed:** `tests/seed.spec.js`

#### 2.1. Search for products and validate results

**File:** `tests/search/search-functionality.spec.ts`

**Steps:**
  1. Type 'apple' in the search box.
    - expect: Only 'Apple - 1 Kg' is visible.
  2. Type 'xyz' in the search box.
    - expect: No products are visible.

#### 2.2. Test navigation links in the header

**File:** `tests/navigation/top-links.spec.ts`

**Steps:**
  1. Click 'Top Deals' link.
    - expect: Navigates to offers page.
  2. Click 'Flight Booking' link.
    - expect: Navigates to flight booking site.

### 3. Edge Cases and Error Handling

**Seed:** `tests/seed.spec.js`

#### 3.1. Attempt checkout with empty cart

**File:** `tests/edge/empty-cart-checkout.spec.ts`

**Steps:**
  1. Click on 'Cart' with no items added.
    - expect: Cart page/modal shows empty state or message.
