export const CATEGORIES = [
  "Weight Loss",
  "Dental Health",
  "General Health",
  "Mental Health",
  "Sleep & Dreams",
  "Beauty",
  "Remedies",
  "Women's Health",
  "Men's Health",
  "Dietary Supplements"
];

export const PRODUCTS = [
  {
    id: "pl1",
    name: "PhenQ Ultimate Burn",
    category: "Weight Loss",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
    description: "A multi-action fat burner that targets weight loss from five different angles, including appetite suppression and energy boosting.",
    cta: "#",
    rating: 4.8,
    slug: "phenq-burn"
  },
  {
    id: "dh1",
    name: "Steel Bite Pro",
    category: "Dental Health",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800",
    description: "A comprehensive oral health supplement designed to rebuild gums and strengthen teeth using 23 organic ingredients.",
    cta: "#",
    rating: 4.9,
    slug: "steel-bite-pro"
  },
  {
    id: "gh1",
    name: "Organifi Green Juice",
    category: "General Health",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=800",
    description: "A gently dried superfood powder that provides essential micronutrients and adaptogens for daily vitality.",
    cta: "#",
    rating: 4.7,
    slug: "organifi-green"
  },
  {
    id: "mh1",
    name: "Mind Lab Pro",
    category: "Mental Health",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    description: "The world's first Universal Nootropic™, designed to optimize 6 different brain pathways for peak performance.",
    cta: "#",
    rating: 4.9,
    slug: "mind-lab-pro"
  },
  {
    id: "sd1",
    name: "Mellow Dreams Patches",
    category: "Sleep & Dreams",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
    description: "Advanced transdermal patches that release melatonin and lavender throughout the night for deep, restorative sleep.",
    cta: "#",
    rating: 4.6,
    slug: "mellow-dreams"
  },
  {
    id: "b1",
    name: "Glow Radiance Collagen",
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800",
    description: "Bioactive collagen peptides that target skin elasticity, hair thickness, and nail strength from the inside out.",
    cta: "#",
    rating: 4.8,
    slug: "glow-collagen"
  },
  {
    id: "r1",
    name: "Elderberry Defense Forte",
    category: "Remedies",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=800",
    description: "A maximum strength immune support formula utilizing black elderberry, zinc, and vitamin C.",
    cta: "#",
    rating: 4.5,
    slug: "elderberry-defense"
  },
  {
    id: "wh1",
    name: "Harmony Hormone Balance",
    category: "Women's Health",
    image: "https://images.unsplash.com/photo-1505575967455-40e256f7377c?auto=format&fit=crop&q=80&w=800",
    description: "Specifically formulated for regular cycles and hormonal equilibrium using Chasteberry and Ashwagandha.",
    cta: "#",
    rating: 4.7,
    slug: "harmony-hormone"
  },
  {
    id: "men1",
    name: "Prime Male Enhance",
    category: "Men's Health",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800",
    description: "A natural vitality booster designed to support healthy testosterone levels and overall physical performance.",
    cta: "#",
    rating: 4.8,
    slug: "prime-male"
  },
  {
    id: "ds1",
    name: "Ultra Omega 3-6-9",
    category: "Dietary Supplements",
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=800",
    description: "Essential fatty acids sourced from wild-caught cold-water fish, cold-pressed flaxseed, and borage oil.",
    cta: "#",
    rating: 4.6,
    slug: "ultra-omega"
  }
];

export const REVIEWS = [
  {
    slug: "phenq-burn",
    title: "PhenQ Ultimate Burn Review: Is it the Top Weight Loss Pill?",
    author: { name: "Dr. Sarah Chen", avatar: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=300" },
    date: "Oct 12, 2023",
    readTime: "12 min read",
    category: "Weight Loss",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
    excerpt: "We put PhenQ to the test over 60 days to see if the clinical claims match real-world weight loss results."
  },
  {
    slug: "steel-bite-pro",
    title: "The Truth About Steel Bite Pro: Can it Rebuild Gums?",
    author: { name: "Dr. James Chen", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300" },
    date: "Oct 15, 2023",
    readTime: "10 min read",
    category: "Dental Health",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800",
    excerpt: "A deep dive into the 23 organic ingredients that make up the Steel Bite Pro oral health protocol."
  },
  {
    slug: "mind-lab-pro",
    title: "Mind Lab Pro Review: Best Universal Nootropic?",
    author: { name: "Marcus Thorne", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300" },
    date: "Oct 20, 2023",
    readTime: "15 min read",
    category: "Mental Health",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    excerpt: "Dissecting the cognitive impact of the world's most advanced brain performance supplement."
  }
];
