import json
import re
import random

DATA_FILE = 'client/src/data/generatedReviews.js'

# --- DATA FOR GENERATION ---
CATEGORY_KNOWLEDGE = {
    "Weight Loss": {
        "mechanisms": [
            "optimizing metabolic signaling pathways",
            "activating brown adipose tissue (BAT) thermogenesis",
            "supporting healthy fat oxidation and metabolic speed",
            "managing cravings by balancing hunger hormones",
            "improving mitochondrial efficiency for energy production"
        ],
        "ingredients": ["Green Tea Extract", "African Mango", "Guggul", "Forskolin", "Chromium Picolinate", "L-Carnitine", "Capsaicin", "Garcinia Cambogia"],
        "benefits": ["natural weight management", "steady daily energy", "appetite control", "metabolic support"]
    },
    "Blood Sugar": {
        "mechanisms": [
            "enhancing insulin sensitivity at the cellular level",
            "supporting the 'blood sugar drain' in the kidneys",
            "reducing the absorption of glucose in the intestinal tract",
            "optimizing pancreatic function for natural insulin production",
            "balancing the morning glucose curve for steady energy"
        ],
        "ingredients": ["Cinnamon Bark", "Bitter Melon", "Gymnema Sylvestre", "Alpha Lipoic Acid", "Chromium", "Banaba Leaf", "Licorice Root", "Juniper Berries"],
        "benefits": ["stable glucose levels", "reduced sugar cravings", "sustained metabolic energy", "healthy weight balance"]
    },
    "Dental Health": {
        "mechanisms": [
            "repopulating the oral microbiome with beneficial probiotics",
            "boosting salivary enzymes like lactoperoxidase",
            "supporting the oxygenation of gum tissues",
            "neutralizing the acidic environment that causes plaque",
            "reinforcing the structural integrity of tooth enamel"
        ],
        "ingredients": ["Lactobacillus Reuteri", "B.lactis", "Malic Acid", "Xylitol", "Inulin", "Peppermint Oil", "Spearmint", "Tricalcium Phosphate"],
        "benefits": ["fresher breath", "healthier gums", "reduced plaque buildup", "oral confidence"]
    },
    "Men's Health": {
        "mechanisms": [
            "supporting free testosterone production naturally",
            "improving circulatory health and blood vessel dilation",
            "managing physiological stress and cortisol levels",
            "enhancing physical stamina and muscle recovery",
            "supporting prostate health as part of male aging"
        ],
        "ingredients": ["Tongkat Ali", "Maca Root", "Tribulus Terrestris", "Horny Goat Weed", "Saw Palmetto", "Zinc", "Fenugreek", "Ashwagandha"],
        "benefits": ["enhanced physical stamina", "improved vitality", "hormonal balance", "boosted confidence"]
    },
    "Joint Health": {
        "mechanisms": [
            "rehydrating synovial fluid for better lubrication",
            "supporting the body's natural cartilage repair processes",
            "reducing systemic inflammation in connective tissues",
            "improving mobility and range of motion",
            "protecting joints from oxidative stress and wear"
        ],
        "ingredients": ["Glucosamine", "Chondroitin", "MSM", "Turmeric/Curcumin", "Boswellia Serrata", "Hyaluronic Acid", "Collagen Type II", "Ginger Root"],
        "benefits": ["flexible movement", "reduced joint stiffness", "faster recovery after activity", "long-term mobility"]
    },
    "Beauty": {
        "mechanisms": [
            "supporting the body's natural collagen and elastin architecture",
            "protecting the skin from blue light and environmental stressors",
            "blocking DHT enzymes that cause hair follicle miniaturization",
            "moisturizing from the inside out to support dermal thickness",
            "providing the precursors for strong keratin production"
        ],
        "ingredients": ["Biotin", "Collagen", "Vitamin E", "Hyaluronic Acid", "Keratin", "DHT-Blocker Blend", "Horsetail Extract", "Saw Palmetto"],
        "benefits": ["radiant skin", "thicker, stronger hair", "healthier nails", "youthful vitality"]
    },
    "Mental Health": {
        "mechanisms": [
            "supporting the growth of new mitochondria in brain cells",
            "enhancing the production of learning neurotransmitters",
            "protecting the auditory nerve from oxidative damage",
            "improving blood flow to the cerebral cortex for focus",
            "calming the nervous system for better concentration"
        ],
        "ingredients": ["Bacopa Monnieri", "Lion's Mane", "Ginkgo Biloba", "PQQ", "Alpha-GPC", "Phosphatidylserine", "GABA", "L-Theanine"],
        "benefits": ["sharper focus", "improved memory recall", "reduced brain fog", "mental clarity"]
    },
    "Dietary Supplements": {
       "mechanisms": ["providing essential substrates for cellular health", "optimizing nutrient absorption from the modern diet"],
       "ingredients": ["Ashwagandha", "Vitamin D3", "Magnesium Malate", "Zinc Picolinate", "Quercetin"],
       "benefits": ["overall wellness", "foundation energy", "immune system vitality"]
    },
    "Remedies": {
        "mechanisms": ["soothing the peripheral nervous system", "supporting healthy axonal regeneration"],
        "ingredients": ["Alpha Lipoic Acid", "Acetyl-L-Carnitine", "B-Complex", "Passionflower"],
        "benefits": ["nerve comfort", "sensory balance", "sustained relief"]
    },
    "Women's Health": {
        "mechanisms": ["balancing endocrine signals naturally", "supporting bone density and pelvic health"],
        "ingredients": ["Black Cohosh", "Red Clover", "Vitamin K2", "Boron", "Wild Yam"],
        "benefits": ["hormonal harmony", "menstrual comfort", "bone strength"]
    }
}

DEFAULT_KNOWLEDGE = {
    "mechanisms": ["supporting the body's natural biological processes", "providing essential nutrients for optimal function"],
    "ingredients": ["Ashwagandha", "Vitamin C", "Zinc", "Magnesium", "Antioxidants"],
    "benefits": ["general wellness", "foundation health support", "immune vitality"]
}

# --- TEMPLATES ---
TITLES = [
    "{name} Review: The Professional Approach to {benefit}",
    "{name} Review 2026: Does This {category} Supplement Actually Work?",
    "{name} Review: Why This {mechanism_keyword} Formula is Trending",
    "Is {name} Worth It? A Deep Dive into the {mechanism_keyword} Science",
    "{name} Review: The 100% Natural Strategy for {benefit}"
]

METAS = [
    "{name} Review {year} - Official Ingredients & Clinical Benefits",
    "Does {name} Work for {benefit}? Full Review & USPs",
    "The Science Behind {name}: Ingredients, Pricing, & Results",
    "{name} Review - Everything You Need to Know Before You Buy"
]

EXCERPTS = [
    "Looking for a reliable way to support {benefit}? Our {name} review explores how this {mechanism} targets the biological root cause.",
    "Is {name} the missing piece in your {category} routine? We examine the {mechanism_keyword} science and professional results.",
    "Dealing with {category} challenges? Discover how {name} uses a unique blend of {ing1} and {ing2} to support your long-term goals."
]

BODY_TEMPLATE = """
    <h2>Introduction: A Professional Perspective on {name}</h2>
    <p>In the evolving world of health supplements, <strong>{name}</strong> has emerged as a specialized {category} solution. Designed to address the underlying factors that impact {benefit}, this formula focuses on a refined, botanical-first approach for adults seeking a daily health habitual.</p>
    
    <h2>The Science of {mechanism_title}</h2>
    <p>The core mechanism of {name} relies on <strong>{mechanism}</strong>. By providing the body with a concentrated dose of active bio-available substrates, the formula helps manage the triggers of {category} decline, allowing the body to maintain its natural state of balance and resilience.</p>
    
    <h2>Proprietary Ingredient Profile</h2>
    <p>Each dose of {name} is packed with a synergistic blend of natural components, specifically selected for their role in {mechanism_keyword} support:</p>
    <ul>
      <li><strong>{ing1}:</strong> A foundational ingredient known for its role in {mechanism_keyword} and general wellness support.</li>
      <li><strong>{ing2}:</strong> Included to provide deep antioxidant protection and support the body's metabolic speed.</li>
      <li><strong>{ing3}:</strong> A traditional botanical used for centuries to promote {benefit} and vitality.</li>
      <li><strong>Essential Substrates:</strong> A blend of vitamins and minerals needed for cellular signaling and structural integrity.</li>
    </ul>
    
    <h2>Why Choose {name}?</h2>
    <ul>
      <li>Targets the root cause by {mechanism}.</li>
      <li>Uses high-bioavailability extraction methods for rapid absorption.</li>
      <li>Constructed in FDA-registered and GMP-certified facilities.</li>
      <li>100% natural, non-GMO, and free from artificial stimulants.</li>
    </ul>
    
    <h2>Final Verdict</h2>
    <p>{name} stands out as a promising, science-backed approach to managing {category} goals. While it is not a magic solution, it is a highly viable tool for your daily protocol. We recommend a consistent 90-day trial to experience the full cumulative benefits.</p>
"""

def generate_unique_content(product):
    cat = product.get('category', 'Dietary Supplements')
    knowledge = CATEGORY_KNOWLEDGE.get(cat, DEFAULT_KNOWLEDGE)
    
    name = product['name']
    year = "2026"
    benefit = random.choice(knowledge['benefits'])
    mechanism = random.choice(knowledge['mechanisms'])
    mechanism_keyword = mechanism.split(' ')[0]
    mechanism_title = mechanism.capitalize()
    
    # Shuffle ingredients
    ings = list(knowledge['ingredients'])
    random.shuffle(ings)
    ing1 = ings[0] if len(ings) > 0 else "Natural Extract"
    ing2 = ings[1] if len(ings) > 1 else "Antioxidant"
    ing3 = ings[2] if len(ings) > 2 else "Essential Mineral"
    
    # Generate Title
    temp_title = random.choice(TITLES)
    title = temp_title.format(name=name, benefit=benefit, category=cat, mechanism_keyword=mechanism_keyword)
    
    # Generate Meta
    temp_meta = random.choice(METAS)
    meta_title = temp_meta.format(name=name, benefit=benefit, year=year)
    
    # Excerpt
    temp_excerpt = random.choice(EXCERPTS)
    excerpt = temp_excerpt.format(name=name, benefit=benefit, mechanism=mechanism, category=cat, mechanism_keyword=mechanism_keyword, ing1=ing1, ing2=ing2)
    
    # Content body
    content = BODY_TEMPLATE.format(
        name=name, 
        category=cat, 
        benefit=benefit, 
        mechanism=mechanism, 
        mechanism_title=mechanism_title,
        mechanism_keyword=mechanism_keyword,
        ing1=ing1,
        ing2=ing2,
        ing3=ing3
    )
    
    product.update({
        "title": title,
        "metaTitle": meta_title,
        "metaDescription": f"Discover how {name} uses a unique blend of {ing1} and {ing2} to support {benefit} through {mechanism}.",
        "excerpt": excerpt,
        "content": content,
        "keywords": [f"{name} review", f"{cat} supplement", f"{name} results", f"{name} ingredients"]
    })

def main():
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    match = re.search(r'export const generatedReviews = (\[.*\]);', content, re.DOTALL)
    if not match:
        print("Could not find generatedReviews array.")
        return

    reviews = json.loads(match.group(1))

    # Aggressive check for boilerplate
    count = 0
    for product in reviews:
        c = product.get('content', '')
        # Check for signature boilerplate strings
        is_boilerplate = (
            "Dealing with" in c or 
            "exhausting battle for millions" in c or
            "Traditional methods often fall short" in c or
            "specialized formulation that is quickly gaining traction" in c or
            "mechanism behind" in c and "high-bioavailability extraction methods" in c
        )
        
        # We also want to skip reviews we ALREADY updated (they won't have these strings)
        if is_boilerplate:
            generate_unique_content(product)
            count += 1

    # Save final global update
    updated_json = json.dumps(reviews, indent=2)
    updated_content = f"export const generatedReviews = {updated_json};\n"
    
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(updated_content)

    print(f"Batch 7 (Global Update): {count} total products updated with unique, category-specific content.")

if __name__ == "__main__":
    main()
