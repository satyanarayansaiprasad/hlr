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

export const allReviews = [
  {
    id: 1,
    title: "Understanding Metabolism Hacks: Does Puravive Deliver?",
    author: { name: "Dr. Sarah Chen", avatar: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=300", role: "Metabolic Specialist" },
    date: "updated Oct 12, 2023",
    readTime: "12 min read",
    category: "Weight Loss",
    categorySlug: "weight-loss",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800",
    excerpt: "Puravive's unique exotic rice method is gaining traction. We explore whether its proprietary blend actually targets brown adipose tissue efficiently.",
    slug: "puravive-review",
    product: { name: "Puravive Weight Management", image: "https://images.unsplash.com/photo-1550572017-ed30fa871727?auto=format&fit=crop&q=80&w=800", rating: 4.8, price: "$59.00", buyUrl: "#" }
  },
  {
    id: 2,
    title: "ProDentim Clinical Review: Rebuilding Oral Microbiome",
    author: { name: "Dr. James Miller", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300", role: "DDS, Dental Researcher" },
    date: "updated Nov 03, 2023",
    readTime: "10 min read",
    category: "Dental Health",
    categorySlug: "dental-health",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    excerpt: "Standard toothpaste kills both good and bad bacteria. ProDentim uses targeted strains to repopulate your oral microbiome for long-lasting fresh breath.",
    slug: "prodentim-review",
    product: { name: "ProDentim Oral Probiotics", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800", rating: 4.9, price: "$69.00", buyUrl: "#" }
  },
  {
    id: 3,
    title: "Is Magnesium Glycinate the Key to Better Sleep?",
    author: { name: "Dr. Sarah Chen", avatar: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=300", role: "Sleep Scientist" },
    date: "updated Oct 12, 2023",
    readTime: "12 min read",
    category: "Sleep and Dreams",
    categorySlug: "sleep-and-dreams",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
    excerpt: "Magnesium glycinate is frequently recommended for its high bioavailability and calming effects on the nervous system. We tested 15 brands to find the purest formulations.",
    slug: "magnesium-glycinate-sleep",
    product: { name: "Magnesium Glycinate (Various)", image: "https://images.unsplash.com/photo-1550572017-ed30fa871727?auto=format&fit=crop&q=80&w=800", rating: 4.7, price: "$15 - $30", buyUrl: "#" }
  },
  {
    id: 4,
    title: "Nerve Control 911: Efficacy for Neuropathic Relief",
    author: { name: "Marcus Thorne", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300", role: "Clinical Pharmacologist" },
    date: "updated Oct 20, 2023",
    readTime: "15 min read",
    category: "Mental Health",
    categorySlug: "mental-health",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=800",
    excerpt: "Nerve degradation can cause agonizing pain. We systematically look at whether Corydalis and Prickly Pear extracts provide sustainable comfort.",
    slug: "nerve-control-911",
    product: { name: "Nerve Control 911", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800", rating: 4.6, price: "$69.95", buyUrl: "#" }
  },
  {
    id: 5,
    title: "Neuro-Thrive Brain Support: Does it Eliminate Brain Fog?",
    author: { name: "Dr. James Miller", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300", role: "Neurologist" },
    date: "updated Oct 25, 2023",
    readTime: "11 min read",
    category: "General",
    categorySlug: "general",
    image: "https://images.unsplash.com/photo-1559087316-652ce3dd299f?auto=format&fit=crop&q=80&w=800",
    excerpt: "We analyze PQQ and Bacopa extract formulations to see if this popular brain supplement genuinely enhances memory retention in adults.",
    slug: "neuro-thrive-review",
    product: { name: "Neuro-Thrive Complex", image: "https://images.unsplash.com/photo-1555529731-29177112ca00?auto=format&fit=crop&q=80&w=800", rating: 4.7, price: "$59.00", buyUrl: "#" }
  },
  {
    id: 6,
    title: "Gundry MD Multi-Vitamin Analysis and Breakdown",
    author: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300", role: "Biochemist" },
    date: "updated Nov 12, 2023",
    readTime: "8 min read",
    category: "Dietary Supplements",
    categorySlug: "dietary-supplements",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800",
    excerpt: "Gundry MD claims maximum bioavailability through their specific chelated bonding processes. We examined blood panels of participants over 90 days.",
    slug: "gundry-md-multivitamin",
    product: { name: "Gundry MD Vital Reds", image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=800", rating: 4.8, price: "$49.95", buyUrl: "#" }
  }
];
