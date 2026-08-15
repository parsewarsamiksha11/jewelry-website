# Google Sheets Product Data Integration

This guide explains how to connect your jewelry product catalog to a Google Sheet for easy updates without code changes.

## How It Works

1. You maintain a Google Sheet with all product data
2. Before each build, the app automatically fetches the latest data from the sheet
3. The data is transformed into the product format and stored in `src/app/data/products.ts`
4. Your app always runs with the latest product information

## Setup Instructions

### Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Add these column headers in row 1:

```
id | name | category | sku | vendor | purity | price | material | tag | description | availability | netWeight | size | color | expectedDelivery | exchangeEligibility | image1 | image2 | image3 | relatedId1 | relatedName1 | relatedPrice1 | relatedImage1
```

### Step 2: Add Your Products

Example row for your first product:
```
JW-0041 | Lumière Solitaire | 22KT Ready | ZZCAJE937472 | SKU: ST-NZYXAO | 18KT | ₹ 8,40,000 | 18k White Gold · 1.2ct Diamond | New | An elegant solitaire... | Ready Stock | 3.79 gm | 4.5 % | 7 | White Gold | DIAMOND | 16/08/2026 | Yes | https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=1200&h=1400&fit=crop&auto=format | https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&h=1400&fit=crop&auto=format | https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&h=1400&fit=crop&auto=format | JW-0028 | Verdure Cocktail Ring | ₹ 5,90,000 | https://images.unsplash.com/photo-1592317295760-5c1f677dfc78?w=400&h=500&fit=crop&auto=format
```

### Step 3: Publish the Sheet

1. Click **File** → **Share**
2. Click **Change to anyone with the link**
3. Set permission to **Viewer**
4. Copy the share link (you'll need the SHEET_ID from the URL)

The share link looks like:
```
https://docs.google.com/spreadsheets/d/1ABC123XYZ.../edit?usp=sharing
```

Extract the SHEET_ID (the long string between `/d/` and `/edit`)

### Step 4: Configure Your App

Create a `.env` file in your project root (or set as environment variable):

```env
GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=0
```

Replace `YOUR_SHEET_ID` with the ID from Step 3.

### Step 5: Build and Deploy

Now when you run:
```bash
npm run build
```

The app will:
1. Fetch the latest data from your Google Sheet
2. Transform it into the product format
3. Generate `src/app/data/products.ts`
4. Build your app with the latest products

## Column Definitions

| Column | Type | Example | Notes |
|--------|------|---------|-------|
| id | Text | JW-0041 | Unique product ID |
| name | Text | Lumière Solitaire | Product name |
| category | Text | 22KT Ready | Must match one of your categories |
| sku | Text | ZZCAJE937472 | Stock keeping unit |
| vendor | Text | SKU: ST-NZYXAO | Vendor info |
| purity | Text | 18KT or Silver | Used to calculate fine weight |
| price | Text | ₹ 8,40,000 | Price with currency symbol |
| material | Text | 18k White Gold · Diamond | Material description |
| tag | Text | New, Rare, Signature | Leave blank for no tag |
| description | Text | An elegant solitaire... | Product description |
| availability | Text | Ready Stock | Availability status |
| netWeight | Text | 3.79 gm | Must include "gm" unit |
| size | Text | 7 or 45 cm | Product size |
| color | Text | White Gold | Color/finish |
| expectedDelivery | Text | 16/08/2026 | Expected delivery date |
| exchangeEligibility | Text | Yes or No | Exchange eligibility |
| image1, image2, image3 | URL | https://... | Product images (HTTPS URLs) |
| relatedId1 | Text | JW-0028 | Related product ID |
| relatedName1 | Text | Verdure Cocktail Ring | Related product name |
| relatedPrice1 | Text | ₹ 5,90,000 | Related product price |
| relatedImage1 | URL | https://... | Related product image |

## Updating Products

To update products:
1. Edit your Google Sheet
2. Save changes
3. Run `npm run build` to regenerate products.ts
4. Deploy your app

That's it! No code changes needed.

## Troubleshooting

**"Failed to fetch sheet" error**
- Make sure the sheet is published and shared with "Anyone with the link"
- Check that the GOOGLE_SHEET_URL is correct
- Verify the sheet has proper headers

**Missing products**
- Check that each row has a unique `id`
- Ensure all required columns are filled
- Verify data format matches the column definitions

**Images not loading**
- Make sure image URLs are HTTPS (not HTTP)
- Test URLs in a browser to ensure they're accessible
- Use images from Unsplash, Pexels, or your own CDN

## API Key Method (Advanced)

For added security and to avoid using public links, you can use Google Sheets API with authentication:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google Sheets API
4. Create a service account and download JSON credentials
5. Replace the fetch logic in `fetchProductsFromGoogleSheets.js` with API calls

This requires updating the script to use:
```bash
npm install googleapis
```

Let me know if you need help setting this up!
