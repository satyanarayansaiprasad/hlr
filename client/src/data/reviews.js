export const categoryMapping = {
  "weight-loss": { id: "weight-loss", name: "Weight Loss", icon: "ri-fire-line", count: 12 },
  "dental-health": { id: "dental-health", name: "Dental Health", icon: "ri-mental-health-line", count: 8 },
  "general": { id: "general", name: "General", icon: "ri-health-book-line", count: 15 },
  "mental-health": { id: "mental-health", name: "Mental Health", icon: "ri-brain-line", count: 10 },
  "sleep-and-dreams": { id: "sleep-and-dreams", name: "Sleep and Dreams", icon: "ri-moon-line", count: 14 },
  "beauty": { id: "beauty", name: "Beauty", icon: "ri-magic-line", count: 20 },
  "remedies": { id: "remedies", name: "Remedies", icon: "ri-leaf-line", count: 18 },
  "womens-health": { id: "womens-health", name: "Women’s Health", icon: "ri-women-line", count: 22 },
  "mens-health": { id: "mens-health", name: "Men’s Health", icon: "ri-men-line", count: 21 },
  "dietary-supplements": { id: "dietary-supplements", name: "Dietary Supplements", icon: "ri-capsule-line", count: 28 },
};

export const categoriesList = Object.values(categoryMapping);

import { generatedReviews } from './generatedReviews';

export const allReviews = generatedReviews;
