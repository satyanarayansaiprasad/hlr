const fs = require('fs');
const path = require('path');
const db = require('../config/firebase');

const seedDatabase = async () => {
  try {
    const postsRef = db.collection('posts');
    const categoriesRef = db.collection('categories');
    const authorsRef = db.collection('authors');
    const productsRef = db.collection('products');

    // Check if posts are already populated
    const postsSnapshot = await postsRef.limit(1).get();
    if (!postsSnapshot.empty) {
      console.log('Database already contains posts. Skipping seed.');
      return;
    }

    console.log('Seeding database from client data...');

    // Load category mapping
    const categoryMapping = {
      'weight-loss': { id: 'weight-loss', name: 'Weight Loss', icon: 'ri-fire-line', order: 1 },
      'dental-health': { id: 'dental-health', name: 'Dental Health', icon: 'ri-mental-health-line', order: 2 },
      'general': { id: 'general', name: 'General', icon: 'ri-health-book-line', order: 3 },
      'mental-health': { id: 'mental-health', name: 'Mental Health', icon: 'ri-brain-line', order: 4 },
      'sleep-and-dreams': { id: 'sleep-and-dreams', name: 'Sleep and Dreams', icon: 'ri-moon-line', order: 5 },
      'beauty': { id: 'beauty', name: 'Beauty', icon: 'ri-magic-line', order: 6 },
      'remedies': { id: 'remedies', name: 'Remedies', icon: 'ri-leaf-line', order: 7 },
      'womens-health': { id: 'womens-health', name: 'Women’s Health', icon: 'ri-women-line', order: 8 },
      'mens-health': { id: 'mens-health', name: 'Men’s Health', icon: 'ri-men-line', order: 9 },
      'dietary-supplements': { id: 'dietary-supplements', name: 'Dietary Supplements', icon: 'ri-capsule-line', order: 10 },
    };

    // Seed categories
    console.log('Seeding categories...');
    for (const key of Object.keys(categoryMapping)) {
      const cat = categoryMapping[key];
      await categoriesRef.doc(cat.id).update(cat).catch(() => categoriesRef.doc(cat.id).set(cat));
    }

    // Load generated reviews
    const clientReviewsPath = path.join(__dirname, '..', '..', 'client', 'src', 'data', 'generatedReviews.js');
    if (!fs.existsSync(clientReviewsPath)) {
      console.error('Client generatedReviews.js not found at:', clientReviewsPath);
      return;
    }

    const rawContent = fs.readFileSync(clientReviewsPath, 'utf8');
    const tempJsContent = rawContent.replace('export const generatedReviews =', 'module.exports =');
    const tempFilePath = path.join(__dirname, 'temp_reviews.js');
    fs.writeFileSync(tempFilePath, tempJsContent, 'utf8');

    let reviews = [];
    try {
      reviews = require(tempFilePath);
    } catch (err) {
      console.error('Error importing temp reviews:', err);
    } finally {
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    }

    if (!reviews || reviews.length === 0) {
      console.log('No reviews found to seed.');
      return;
    }

    console.log(`Found ${reviews.length} reviews. Extracting products, authors, and seeding posts...`);

    const authorMap = new Map();
    const productMap = new Map();

    // Default Fallbacks
    const defaultPros = [
      "Clinically backed formulations",
      "Third-party lab tested for purity",
      "High bioavailability & absorption",
      "Doctor-verified health outcomes"
    ];
    const defaultCons = [
      "Premium price point",
      "Subscription model required for best value",
      "Limited local retail availability"
    ];
    const defaultFaqs = [
      { q: "How long until I see results?", a: "Most users report improvements in biometric markers within the first 30 days of consistent use." },
      { q: "Is this supplement safe to stack?", a: "We recommend consulting with our Clinical Board before combining with prescription medications." }
    ];

    for (const review of reviews) {
      // 1. Author Extraction
      let authorId = 'editorial-team';
      if (review.author && review.author.name) {
        const authorKey = review.author.name.toLowerCase().replace(/\s+/g, '-');
        if (!authorMap.has(authorKey)) {
          const authorPayload = {
            name: review.author.name,
            avatar: review.author.avatar || '/assets/images/doctor.png',
            role: review.author.role || 'Medical Reviewer',
            bio: review.author.bio || 'Medical researcher passionate about uncovering the science behind consumer supplements.',
            specialization: review.author.specialization || ['Clinical Research', 'Nutritional Science'],
            createdAt: new Date().toISOString()
          };
          const createdAuthor = await authorsRef.add(authorPayload);
          authorMap.set(authorKey, { id: createdAuthor.id, ...authorPayload });
        }
        authorId = authorMap.get(authorKey).id;
      }

      // 2. Product Extraction
      let productId = null;
      if (review.product && review.product.name) {
        const productKey = review.product.name.toLowerCase().replace(/\s+/g, '-');
        if (!productMap.has(productKey)) {
          const productPayload = {
            name: review.product.name,
            image: review.product.image || review.image || '',
            rating: review.product.rating || review.rating || 5.0,
            price: review.product.price || '$59.00',
            buyUrl: review.product.buyUrl || review.buyUrl || '',
            createdAt: new Date().toISOString()
          };
          const createdProduct = await productsRef.add(productPayload);
          productMap.set(productKey, { id: createdProduct.id, ...productPayload });
        }
        productId = productMap.get(productKey).id;
      }

      // 3. Post Payload Creation
      const postPayload = {
        name: review.name || review.title,
        title: review.title,
        category: review.category || 'General',
        categorySlug: review.categorySlug || 'general',
        slug: review.slug,
        image: review.image || '',
        rating: review.rating || 4.5,
        metaTitle: review.metaTitle || review.title,
        metaDescription: review.metaDescription || review.excerpt || '',
        excerpt: review.excerpt || '',
        content: review.content || '',
        pros: review.pros || defaultPros,
        cons: review.cons || defaultCons,
        buyUrl: review.buyUrl || '',
        date: review.date || 'updated Oct 20, 2023',
        readTime: review.readTime || '5 min read',
        status: 'published',
        publishDate: new Date().toISOString(),
        authorId,
        productId,
        author: review.author || { name: 'Editorial Team', avatar: '/assets/images/doctor.png', role: 'Medical Reviewer' },
        product: review.product || null,
        faqs: review.faqs || defaultFaqs,
        comments: review.comments || [
          {
            id: 1,
            author: { name: "Mark Peterson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" },
            text: "I've been following this protocol for 3 months now and definitely feel a difference in my energy levels.",
            date: "2 days ago",
            likes: 14,
            replies: []
          }
        ],
        keywords: review.keywords || [],
        isFeatured: review.id <= 3, // Flag first 3 as featured/insights
        isTrending: false,
        isPopular: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null
      };

      await postsRef.add(postPayload);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Seeding database failed:', error);
  }
};

module.exports = seedDatabase;
