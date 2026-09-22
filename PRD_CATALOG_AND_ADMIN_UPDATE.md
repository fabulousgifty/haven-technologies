# Product Requirements Document (PRD)
## Haven Technologies — Price List Catalog Overhaul & Discrete Admin CMS Architecture

- **Document Version:** 1.0.0
- **Status:** Implemented & Verified
- **Target Audience:** Haven Technologies Leadership, Store Administrators & Technical Teams
- **Date:** September 2026

---

## 1. Executive Summary

Haven Technologies operates a premier multi-location technology sourcing and consumer electronics commerce platform serving clients in Lagos, Abuja, Owerri, and nationwide across Nigeria. 

This update accomplishes two core strategic objectives requested by leadership:
1. **Administrative Access Lockdown:** Completely removes visible admin buttons, CMS tabs, and management navigation from public customer views. Implements an exclusive, discreet trigger mechanism paired with an authenticated passcode security modal (`haven2026` by default, configurable) so that only authorized store owners can view or manage the catalog, pricing, exchange rates, and business configurations.
2. **Comprehensive Inventory & Price Overhaul:** Ingests and standardizes the complete iPhone and Samsung retail price schedules. This includes Brand New Non-Active flagship devices (with eSIM vs. physical SIM breakdowns), Active & Open Box devices, and verified UK Used grade-A models across iPhone (17, 16, 15, 14, 13, 12, 11, XS, XR, X, 8, 7 series) and Samsung (Z Fold 7/6/5/4/3/2, Z Flip 6/5/4/3, S25, S24, S23, S22, S21, S20, and Galaxy Note series).
3. **Industry Warranty Compliance:** Standardizes consumer advisory disclosures across all mobile devices highlighting the industry-standard policy: *"No warranty on screen damage"*.

---

## 2. Problem Statement & User Intent

### 2.1 The Need for Administrative Secrecy
Previously, the catalog management panel ("Admin CMS") was exposed to store visitors via a persistent header or footer button. For a public luxury electronics brand, having administrative controls visible to shoppers degrades consumer confidence, invites brute-force attempts, and clutters the browsing flow. Store management required the ability to manage products and pricing privately without any customer knowing the control exists.

### 2.2 Dynamic Market Pricing & Expanded Device Variants
The mobile smartphone market in Nigeria is subject to rapid foreign exchange adjustments, varying packaging states (Brand New Sealed, Open Box, Active, UK Used), and regional specification differentials (eSIM NA vs. Physical SIM). The catalog required structured, searchable listings with exact prices in Nigerian Naira (NGN), dual USD display conversion, and clear condition disclosures.

---

## 3. Product Requirements & Feature Specifications

### 3.1 Feature 1: Private Admin CMS Access Restriction
* **Public Visibility:** Zero. All customer-facing navigation bars, menus, cards, and footers have been scrubbed of "Admin CMS", "Manage Store", or "Admin Login" links.
* **Discreet Access Trigger:**
  * **Option A (Secret Click Pattern):** Clicking the copyright text (`© 2026 Haven Technologies. All rights reserved.`) in the website footer 3 times in rapid succession activates the Admin Gatekeeper modal.
  * **Option B (Direct Keyboard Shortcut):** Pressing `Ctrl + Shift + A` (or `Cmd + Shift + A` on macOS) anywhere on the website immediately summons the Admin Gatekeeper.
* **Authentication Modal:**
  * Displays a clean, dark glass security dialog asking for the Store Owner Passcode.
  * Masks input with auto-focus and provides instant validation feedback.
  * Default passcode initialized to `haven2026` (can be updated inside the panel).
  * Includes a "Remember me on this browser" checkbox that securely preserves authentication state in browser local storage.
* **Admin Capabilities (Once Authenticated):**
  * Live price editing and currency toggle.
  * Add, edit, or archive product listings.
  * Modify official WhatsApp sourcing contact numbers (`+234 913 186 1630`), business email, and showroom location descriptions.
  * Update the admin security passcode.
  * One-click "Restore Default Haven Catalog" fallback.
  * Discreet logout button that revokes local authorization immediately.

---

### 3.2 Feature 2: Complete iPhone Price List Integration

Every tier and variant provided in the official shop price list has been cataloged with high-resolution imagery, specific technical specifications, key benefits, and dual currency support:

#### Tier A: Brand New Non-Active Devices (iPhone 17 Series)
* **iPhone 17 Pro Max 256GB:**
  * eSIM North American (NA) Non-Active: **₦1,800,000**
  * Physical SIM (pSIM) NA Non-Active: **₦1,950,000**
  * Open Box: **₦1,850,000**
* **iPhone 17 Pro Max 512GB NA:** **₦2,300,000**
* **iPhone 17 Pro 256GB NA:** **₦1,800,000** (Open Box: **₦1,650,000**)
* **iPhone 17 Pro 512GB NA:** **₦2,150,000**
* **iPhone Air 256GB NA:** **₦1,350,000** (Open Box: **₦1,150,000**)
* **iPhone Air 512GB NA:** **₦1,450,000** (Open Box: **₦1,350,000**)
* **iPhone 17 256GB NA:** **₦1,300,000**

#### Tier B: Active & Open Box Devices (iPhone 16, 15, 14, 13, 12 Series)
* **iPhone 16 Series:**
  * iPhone 16 Pro Max 256GB: **₦1,400,000**
  * iPhone 16 Pro 128GB: **₦1,150,000** | 256GB: **₦1,300,000**
  * iPhone 16 Plus 128GB: **₦995,000** | 256GB: **₦1,190,000**
  * iPhone 16 128GB: **₦935,000** | 256GB: **₦1,025,000**
* **iPhone 15 Series:**
  * iPhone 15 Pro Max 256GB: **₦1,040,000**
  * iPhone 15 Pro 128GB: **₦900,000** | 256GB: **₦930,000**
  * iPhone 15 256GB: **₦730,000**
* **iPhone 14 Series:**
  * iPhone 14 Pro Max 128GB: **₦735,000** | 256GB: **₦800,000** | 512GB: **₦820,000**
  * iPhone 14 Pro 128GB: **₦680,000** | 256GB: **₦720,000** | 512GB: **₦735,000**
  * iPhone 14 256GB: **₦565,000**
* **iPhone 13 Series:**
  * iPhone 13 Pro Max 128GB: **₦600,000** | 256GB: **₦660,000**
  * iPhone 13 Pro 128GB: **₦570,000** | 256GB: **₦600,000**
  * iPhone 13 256GB: **₦480,000**
* **iPhone 12 Series:**
  * iPhone 12 Pro Max 128GB: **₦500,000** | 256GB: **₦540,000**

#### Tier C: UK Used Grade-A Collection (iPhone 15 down to iPhone 7)
* **iPhone 15 Series UK Used:**
  * 15 Pro Max 256GB: **₦980,000** | 512GB: **₦1,030,000** | 1TB: **₦1,080,000**
  * 15 Pro 128GB: **₦830,000** | 256GB: **₦860,000**
  * 15 Plus 128GB: **₦680,000** | 256GB: **₦730,000**
  * 15 128GB: **₦610,000** | 256GB: **₦650,000**
* **iPhone 14 Series UK Used:**
  * 14 Pro Max 128GB: **₦710,000** | 256GB: **₦745,000** | 512GB: **₦765,000** | 1TB: **₦785,000**
  * 14 Pro 128GB: **₦645,000** | 256GB: **₦680,000** | 512GB: **₦700,000**
  * 14 Plus 128GB: **₦495,000** | 256GB: **₦535,000**
  * 14 128GB: **₦475,000** | 256GB: **₦515,000**
* **iPhone 13 Series UK Used:**
  * 13 Pro Max 128GB: **₦585,000** | 256GB: **₦625,000** | 512GB: **₦655,000** | 1TB: **₦675,000**
  * 13 Pro 128GB: **₦505,000** | 256GB: **₦535,000** | 512GB: **₦565,000** | 1TB: **₦585,000**
  * 13 128GB: **₦395,000** | 256GB: **₦435,000**
  * 13 Mini 128GB: **₦335,000** | 256GB: **₦365,000**
* **iPhone 12 Series UK Used:**
  * 12 Pro Max 128GB: **₦460,000** | 256GB: **₦490,000** | 512GB: **₦520,000**
  * 12 Pro 128GB: **₦390,000** | 256GB: **₦420,000** | 512GB: **₦440,000**
  * 12 64GB: **₦285,000** | 128GB: **₦315,000** | 256GB: **₦345,000**
  * 12 Mini 64GB: **₦220,000** | 128GB: **₦245,000**
* **Legacy UK Used iPhones (Budget & Value Tier):**
  * iPhone 11 Pro Max 64GB: **₦340,000** | 256GB: **₦380,000**
  * iPhone 11 Pro 64GB: **₦290,000** | 256GB: **₦320,000**
  * iPhone 11 64GB: **₦235,000** | 128GB: **₦265,000** | 256GB: **₦295,000**
  * iPhone XS Max 64GB: **₦235,000** | 256GB: **₦265,000**
  * iPhone XS 64GB: **₦185,000** | 256GB: **₦205,000**
  * iPhone XR 64GB: **₦185,000** | 128GB: **₦205,000**
  * iPhone X 64GB: **₦155,000** | 256GB: **₦175,000**
  * iPhone 8 Plus 64GB: **₦135,000** | 256GB: **₦155,000**
  * iPhone 8 64GB: **₦95,000** | 128GB: **₦110,000**
  * iPhone 7 Plus 32GB: **₦95,000** | 128GB: **₦110,000**
  * iPhone 7 32GB: **₦70,000** | 128GB: **₦80,000**

---

### 3.3 Feature 3: Complete Samsung Price List Integration

#### Foldable Series (Galaxy Z Fold & Z Flip)
* **Galaxy Z Fold 7 256GB:** **₦2,350,000** (Brand New Non-Active Flagship)
* **Galaxy Z Fold 6 256GB:** **₦1,450,000**
* **Galaxy Z Fold 5 256GB:** **₦900,000** | 512GB: **₦980,000**
* **Galaxy Z Fold 4 256GB:** **₦600,000** | 512GB: **₦650,000**
* **Galaxy Z Fold 3 256GB:** **₦450,000** | 512GB: **₦490,000**
* **Galaxy Z Fold 2 256GB:** **₦360,000**
* **Galaxy Z Flip 6 256GB:** **₦880,000**
* **Galaxy Z Flip 5 256GB:** **₦550,000** | 512GB: **₦580,000**
* **Galaxy Z Flip 4 128GB:** **₦350,000** | 256GB: **₦380,000**
* **Galaxy Z Flip 3 128GB:** **₦250,000** | 256GB: **₦280,000**

#### Ultra & Standard Flagship Series (Galaxy S25, S24, S23, S22, S21, S20)
* **Galaxy S25 Ultra 256GB/512GB:** **₦2,100,000**
* **Galaxy S24 Ultra 256GB:** **₦1,250,000** | 512GB: **₦1,350,000** | 1TB: **₦1,450,000**
* **Galaxy S24 Plus 256GB:** **₦850,000**
* **Galaxy S24 128GB/256GB:** **₦750,000**
* **Galaxy S23 Ultra 256GB:** **₦930,000** | 512GB: **₦980,000**
* **Galaxy S23 Plus 256GB:** **₦650,000**
* **Galaxy S23 128GB/256GB:** **₦520,000**
* **Galaxy S22 Ultra 128GB:** **₦630,000** | 256GB: **₦660,000** | 512GB: **₦690,000**
* **Galaxy S22 Plus 128GB/256GB:** **₦470,000**
* **Galaxy S22 128GB/256GB:** **₦380,000**
* **Galaxy S21 Ultra 128GB:** **₦470,000** | 256GB: **₦500,000**
* **Galaxy S21 Plus 128GB/256GB:** **₦350,000**
* **Galaxy S21 128GB/256GB:** **₦280,000**
* **Galaxy S21 FE 128GB:** **₦250,000**
* **Galaxy S20 Ultra 128GB:** **₦350,000**
* **Galaxy S20 Plus 128GB:** **₦260,000**
* **Galaxy S20 128GB:** **₦220,000**
* **Galaxy S20 FE 128GB:** **₦190,000**

#### Productivity Notes & UK Used Samsung Flagships
* **Galaxy Note 20 Ultra 128GB/256GB:** **₦500,000** | 512GB: **₦530,000**
* **Galaxy Note 20 128GB:** **₦320,000**
* **Galaxy Note 10 Plus 256GB:** **₦340,000**
* **Galaxy Note 10 256GB:** **₦260,000**
* **Galaxy Note 9 128GB:** **₦200,000**
* **Galaxy Note 8 64GB:** **₦140,000**
* **UK Used Samsung S & Fold Series:** Dedicated grade-A models with fully inspected displays, battery health above 85%, and unlocked dual SIM / eSIM readiness.

---

### 3.4 Feature 4: Industry Warranty & Consumer Policy Disclosures
* **Policy Mandate:** Standard mobile industry policy strictly excludes screen damage from device warranties.
* **UI Implementations:**
  * **Catalog Top Banner:** When filtering by "Phones", a prominent assurance card displays the Haven device verification pledge alongside an explicit amber warning: *"NB: Standard mobile industry policy — no warranty on screen damage."*
  * **Product Detail Modal:** When inspecting any smartphone, a dedicated "Haven Device Assurance & Warranty Policy" card appears before order placement, ensuring total transparency prior to purchase.
  * **WhatsApp Enquiry Pre-fill:** Product enquiry templates maintain IMEI verification reminders and warranty clarity.

---

### 3.5 Feature 5: Enhanced Browsing, Filtering & Discovery
* **Brand & Condition Sub-Filters:** In addition to top-level category tabs (`Phones`, `Accessories`, `Gadgets`, `Home Appliances`, etc.), the Phones page provides quick one-click pills:
  * `All Phones`
  * `Apple iPhone`
  * `Samsung Galaxy`
  * `Brand New Sealed`
  * `Active / Open Box`
  * `UK Used`
* **Quick Popular Searches:** Instant search trigger tags for `iPhone 17 Pro`, `iPhone 16 Pro Max`, `Samsung Fold 7 / 6`, `Samsung S25 / S24`, `UK Used iPhones`, and `HP Laptops`.
* **Instant Dual Currency:** Converts prices between Nigerian Naira (₦) and US Dollars ($) in real-time based on the managed exchange rate.

---

## 4. Technical Architecture & File Map

| File Path | Role & Changes |
| :--- | :--- |
| `/src/data/phoneCatalog.ts` | Complete structured database of all iPhone and Samsung variants with specifications, features, images, and pricing. |
| `/src/data/initialProducts.ts` | Merged `PHONE_PRODUCTS` as the primary catalog source of truth alongside laptops, trading tools, and appliances. |
| `/src/context/AppContext.tsx` | Migrated persistence cache key to `haven_products_v4` to ensure immediate catalog hydration; manages authenticated admin state and session storage. |
| `/src/components/Footer.tsx` | Scrubbed visible admin links; wired secret triple-click handler on copyright label and registered global keyboard shortcut (`Ctrl + Shift + A`). |
| `/src/components/AdminGatekeeperModal.tsx` | Secure passcode entry modal with auto-focus, attempt validation, and session preservation. |
| `/src/components/AdminCMSModal.tsx` | Full-screen private management dashboard with product editing, pricing adjustments, settings configuration, and logout action. |
| `/src/pages/ProductsPage.tsx` | Added phone brand sub-filters, device assurance banner with screen damage disclosure, and popular search tags. |
| `/src/components/ProductDetailModal.tsx` | Injected dynamic phone warranty badge with clear screen policy notice. |

---

## 5. Security & Verification Testing

* **Public Inspection:** Navigated all header bars, mobile drawers, product grids, and footers. No visible admin text or buttons are present.
* **Secret Triggers:**
  * Tested triple-click on footer copyright: Modal opens reliably.
  * Tested keyboard combination `Ctrl + Shift + A` (and `Cmd + Shift + A` on Mac): Modal opens reliably.
* **Authentication:**
  * Invalid passcode triggers error message without state leak.
  * Correct passcode (`haven2026`) opens Admin CMS immediately.
  * Logout button safely clears session state.
* **Catalog Verification:**
  * iPhone 17 series, 16 series, 15 down to 7 series render with exact pricing.
  * Samsung Fold, Flip, S25 down to Note series render with exact pricing.
  * Condition tags (Brand New, Active, UK Used) filter reliably.
* **Production Build:** `npm run build` compiles with zero TypeScript errors or broken imports.

---

## 6. Store Owner Quick Reference

* **How to Open Admin Panel:**
  * Go to any page on your store.
  * Either press **`Ctrl + Shift + A`** (or **`Cmd + Shift + A`** on Mac) OR tap the footer copyright text 3 times quickly.
  * Enter your passcode: **`haven2026`** (can be updated anytime from inside Settings).
* **Warranty Policy Enforced:**
  * *"Standard mobile industry policy — no warranty on screen damage."*
