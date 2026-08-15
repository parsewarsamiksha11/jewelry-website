import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Fetch products from Google Sheets CSV export
 * Replace SHEET_ID with your Google Sheet ID
 * Make sure the sheet is published: File > Share > Anyone with link can view
 * Export URL format: https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv
 */

const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL || 'https://docs.google.com/spreadsheets/d/1YEWvPYoh958NnvfdHu5mloqUKTPJk3scn-d-HNGmcFw/export?format=csv';

async function fetchAndParseCSV() {
  try {
    console.log('Fetching product data from Google Sheets...');
    const response = await fetch(GOOGLE_SHEET_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.statusText}`);
    }

    const csv = await response.text();
    return parseCSV(csv);
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error.message);
    console.log('Falling back to existing products.ts...');
    return null;
  }
}

function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const products = {};

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < headers.length) continue;

    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index]?.trim() || '';
    });

    if (!row.id) continue;

    const images = [];
    if (row.image1) images.push({ src: row.image1, alt: `${row.name} image 1` });
    if (row.image2) images.push({ src: row.image2, alt: `${row.name} image 2` });
    if (row.image3) images.push({ src: row.image3, alt: `${row.name} image 3` });

    const related = [];
    if (row.relatedId1 && row.relatedName1) {
      related.push({
        id: row.relatedId1,
        name: row.relatedName1,
        price: row.relatedPrice1 || '₹ 0',
        image: row.relatedImage1 || '',
        alt: `${row.relatedName1} thumbnail`,
      });
    }

    products[row.id] = {
      id: row.id,
      name: row.name,
      category: row.category,
      sku: row.sku,
      vendor: row.vendor,
      purity: row.purity,
      price: row.price,
      material: row.material,
      tag: row.tag === 'null' || !row.tag ? null : row.tag,
      description: row.description,
      availability: row.availability,
      netWeight: row.netWeight,
      wastage: row.wastage,
      size: row.size,
      color: row.color,
      category: row.category,
      subCategory: row.subCategory,
      expectedDelivery: row.expectedDelivery,
      exchangeEligibility: row.exchangeEligibility,
      details: generateDetails(row),
      images: images.length > 0 ? images : [{ src: '', alt: row.name }],
      related: related,
    };
  }

  return products;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function generateDetails(row) {
  // Note: SKU and Vendor are intentionally excluded from user-facing details
  return [
    { label: 'Availability', value: row.availability },
    { label: 'Net Weight', value: row.netWeight },
    { label: 'Wastage', value: row.wastage },
    { label: 'Size', value: row.size },
    { label: 'Color', value: row.color },
    { label: 'Category', value: row.category },
    { label: 'Sub Category', value: row.subCategory },
    { label: 'Expected Delivery Date', value: row.expectedDelivery },
    { label: 'Exchange Eligibility', value: row.exchangeEligibility },
  ];
}

function generateProductsFile(products) {
  const productCode = `export type Product = {
  id: string;
  name: string;
  category: string;
  sku: string;
  vendor: string;
  purity: string;
  price: string;
  material: string;
  tag: string | null;
  description: string;
  availability: string;
  netWeight: string;
  wastage: string;
  size: string;
  color: string;
  subCategory: string;
  expectedDelivery: string;
  exchangeEligibility: string;
  details: { label: string; value: string }[];
  images: { src: string; alt: string }[];
  related: { id: string; name: string; price: string; image: string; alt: string }[];
};

export const PRODUCTS: Record<string, Product> = ${JSON.stringify(products, null, 2)};

export const PRODUCT_LOOKUP = PRODUCTS;

export const parseProductMetric = (value: string) => Number.parseFloat(value.replace(/[^0-9.]/g, "")) || 0;

export const getProductCartMeta = (product: Product, quantity = 1) => {
  const netWeight = parseProductMetric(product.netWeight);
  const purityValue = product.purity.toLowerCase().includes("silver") ? 0.92 : 0.9;
  const fineWeight = netWeight * purityValue;

  return {
    code: product.id,
    image: product.images[0]?.src ?? "",
    readyState: product.availability,
    estimateDelivery: product.expectedDelivery,
    laborCharges: "Not Applicable",
    fineWeight: \`\${fineWeight.toFixed(2)} gm\`,
    totalNetWt: \`\${(netWeight * quantity).toFixed(2)} gm\`,
    totalFineWt: \`\${(fineWeight * quantity).toFixed(2)} gm\`,
  };
};

export const getWishlistProductMeta = (product: Product) => {
  const netWeight = parseProductMetric(product.netWeight);
  const purityValue = product.purity.toLowerCase().includes("silver") ? 0.92 : 0.9;
  const fineWeight = netWeight * purityValue;

  return {
    id: product.id,
    name: product.name,
    image: product.images[0]?.src ?? "",
    netWeight: product.netWeight,
    purity: product.purity,
    wastage: product.wastage,
    laborCharges: "Not Applicable",
    fineWeight: \`\${fineWeight.toFixed(2)} gm\`,
    expectedDelivery: product.expectedDelivery,
  };
};

export const PRODUCT_CATALOG = Object.values(PRODUCTS);

export const PRODUCT_CATEGORIES = [
  "All",
  ...Array.from(new Set(PRODUCT_CATALOG.map((product) => product.category))),
];

export const SEARCH_PRODUCTS = PRODUCT_CATALOG.map((product) => ({
  id: product.id,
  label: product.name,
}));

export const FEATURED_PRODUCT_IDS = ["JW-0041", "JW-0028", "JW-0033", "JW-0055"] as const;

export const FEATURED_PRODUCTS = FEATURED_PRODUCT_IDS.map((id) => PRODUCTS[id]).filter(
  (product): product is Product => Boolean(product)
);

const COLLECTION_SUBTITLES: Record<string, string> = {
  "22KT Ready": "Gold jewellery",
  "18KT Ready": "Fine craftsmanship",
  Chain: "Everyday wear",
  Mangalsutra: "Traditional design",
  Bracelet: "Polished finish",
  "Silver Ready": "Modern styles",
};

export const COLLECTION_SUMMARY = PRODUCT_CATEGORIES.filter((category) => category !== "All").map(
  (category) => {
    const items = PRODUCT_CATALOG.filter((product) => product.category === category);
    const sample = items[0];

    return {
      id: category,
      slug: category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      title: category,
      subtitle: COLLECTION_SUBTITLES[category] ?? "Fine jewelry",
      image: sample?.images[0]?.src ?? "",
      alt: sample?.images[0]?.alt ?? category,
      count: \`\${items.length} pieces\`,
    };
  }
);`;

  return productCode;
}

async function main() {
  try {
    const products = await fetchAndParseCSV();
    
    if (!products) {
      console.log('Skipping products.ts generation - using existing data');
      return;
    }

    const productsFilePath = path.join(__dirname, '../src/app/data/products.ts');
    const fileContent = generateProductsFile(products);
    
    fs.writeFileSync(productsFilePath, fileContent, 'utf-8');
    console.log(`✓ Successfully generated ${productsFilePath}`);
    console.log(`✓ Loaded ${Object.keys(products).length} products from Google Sheets`);
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

main();
