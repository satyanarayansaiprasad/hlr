import json
import re

DATA_FILE = 'client/src/data/generatedReviews.js'

def main():
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    match = re.search(r'export const generatedReviews = (\[.*\]);', content, re.DOTALL)
    if not match:
        print("Could not find generatedReviews array.")
        return

    reviews = json.loads(match.group(1))

    # Helper to find by name
    def find_review(name):
        return next((r for r in reviews if name.lower() in r['name'].lower()), None)

    # --- BEAUTY & WOMEN'S HEALTH BATCH ---
    
    illuderma = find_review("Illuderma")
    if illuderma:
        illuderma.update({
            "title": "Illuderma Review: Can This Serum Shield Your Skin from Blue Light Aging?",
            "metaTitle": "Illuderma Review 2026 - Dark Spots & Blue Light Protection",
            "metaDescription": "Illuderma is a professional-grade serum designed to combat 'blue light radiation' aging. Discover the 16 botanical ingredients inside.",
            "keywords": ["Illuderma review", "blue light skin protection", "dark spot serum", "Illuderma ingredients"],
            "content": """
    <h2>The New Frontier of Skincare: Blue Light Protection</h2>
    <p>We spend hours every day in front of screens, but few realize the impact of <strong>blue light radiation</strong> on their skin. <strong>Illuderma</strong> is a specialized serum designed to create a protective barrier against this modern environmental stressor, which clinical research suggests is a leading cause of premature dark spots and 'digital aging.'</p>
    
    <h2>16 Botanicals for a Radiant Complexion</h2>
    <p>Illuderma isn't just a shield; it's a comprehensive skin rejuvenation formula. By combining 16 precisely-selected natural ingredients, it targets the oxidative stress that breaks down collagen and leads to hyperpigmentation. The result is a brighter, more even skin tone that looks resilient against the elements.</p>
    
    <h2>Key Ingredient Bio-Actives</h2>
    <ul>
      <li><strong>Sencha (Green Tea Extract):</strong> Rich in catechins that provide deep antioxidant protection and soothe irritated skin.</li>
      <li><strong>Witch Hazel:</strong> A natural astringent that helps refine pores and provides a foundation for the serum's protective barrier.</li>
      <li><strong>Gotu Kola:</strong> A legendary botanical used to support skin elasticity and the natural repair of the skin's basement membrane.</li>
      <li><strong>Jojoba Oil:</strong> Mimics the skin's natural sebum to ensure the serum is absorbed deeply without feeling greasy.</li>
    </ul>
    
    <h2>Editorial Perspective</h2>
    <ul>
      <li>Fights the root cause of 'modern' dark spots (oxidative stress from screens).</li>
      <li>Provides deep hydration with a non-greasy, lightweight finish.</li>
      <li>Supports the skin's natural barrier function and collagen levels.</li>
      <li>Manufactured in FDA-registered, GMP-certified facilities in the USA.</li>
    </ul>
            """
        })

    neotonics = find_review("Neotonics")
    if neotonics:
        neotonics.update({
            "title": "Neotonics Review: Harnessing the Gut-Skin Axis for Rejuvenation",
            "metaTitle": "Neotonics Review - Probiotic Skin Rejuvenation Gummy",
            "metaDescription": "Neotonics targets the 'gut-skin axis' to improve skin cell turnover. Learn how Bacillus Coagulans and Babylon extract support aging skin.",
            "content": """
    <h2>The Breakthrough Gut-Skin Connection</h2>
    <p>Recent dermatological breakthroughs have confirmed a powerful link between your gut health and your skin's appearance. <strong>Neotonics</strong> is the first supplement designed to exploit this 'Gut-Skin Axis.' By balancing your internal microbiome, Neotonics helps accelerate skin cell turnover, leading to naturally younger-looking skin.</p>
    
    <h2>Accelerating Skin Cell Turnover</h2>
    <p>When your gut is efficient at absorbing nutrients and managing inflammation, your skin receives the signals it needs to shed old cells and generate fresh ones. Neotonics provides 500 million units of extra-strong bacteria along with 9 potent botanicals to ensure this process never slows down.</p>
    
    <h2>Core Rejuvenation Ingredients</h2>
    <ul>
      <li><strong>Bacillus Coagulans:</strong> A high-potency probiotic that populates the gut with 'lean' bacteria to support nutrient absorption.</li>
      <li><strong>Babchi:</strong> A botanical powerhouse that supports skin rejuvenation and the natural production of collagen.</li>
      <li><strong>Inulin & Dandelion:</strong> Prebiotic fibers that serve as the fuel for your newly introduced beneficial bacteria.</li>
      <li><strong>Lemon Balm:</strong> Known for its ability to manage the environmental stress that often causes skin dullness.</li>
    </ul>
    
    <h2>Why Neotonics Stands Out</h2>
    <ul>
      <li>Targets the biological root of skin aging (gut-cell signaling).</li>
      <li>Convenient and delicious gummy format for consistent daily use.</li>
      <li>Supports both digestive comfort and skin radiance simultaneously.</li>
      <li>Free from gluten and artificial stimulants.</li>
    </ul>
            """
        })

    purelumin = find_review("PureLumin Essence")
    if purelumin:
        purelumin.update({
            "title": "PureLumin Essence Review: The Targeted Approach to Dark Spot Elimination",
            "metaTitle": "PureLumin Essence Dark Spot Serum - Ingredients & Results",
            "metaDescription": "PureLumin Essence is a concentrated serum designed to fade hyperpigmentation and prevent future dark spots using a unique botanical complex.",
            "content": """
    <h2>ERASE the Evidence of Sun Damage</h2>
    <p>Hyperpigmentation and stubborn dark spots can make you look years older than you feel. <strong>PureLumin Essence</strong> is a precision-engineered serum designed to penetrate deep into the dermal layers to break up melanin clusters and prevent the 'leaking' of pigment that causes uneven skin tone.</p>
    
    <h2>The Science of Melanin Management</h2>
    <p>PureLumin works by addressing the enzymes responsible for over-producing pigment. By providing a concentrated dose of skin-brightening bio-actives, the serum helps fade existing age spots while creating an environment that discourages the formation of new ones.</p>
    
    <h2>Key Brightening Ingredients</h2>
    <ul>
      <li><strong>Targeted Licorice Extract:</strong> A natural alternative to harsh chemicals that helps disperse melanin pockets.</li>
      <li><strong>Stabilized Vitamin C:</strong> Brightens the overall complexion and supports the natural structural strength of the skin.</li>
      <li><strong>Niacinamide:</strong> Refines skin texture and helps reduce the appearance of enlarged pores and redness.</li>
      <li><strong>Soothing Botanicals:</strong> Ensure the brightening process is gentle and doesn't cause irritation or peeling.</li>
    </ul>
            """
        })

    refirmance = find_review("ReFirmance")
    if refirmance:
        refirmance.update({
            "title": "ReFirmance Review: Lifting and Firming with Peptide Technology",
            "metaTitle": "ReFirmance Serum Review - Juvinity™ & Collagen Support",
            "metaDescription": "ReFirmance uses Juvinity™ and a specialized peptide blend to support DNA repair and skin firmness. Discover the 'natural face lift' serum.",
            "content": """
    <h2>The Natural 'Face Lift' in a Bottle</h2>
    <p>As skin loses its structural integrity, sagging and fine lines become more prominent. <strong>ReFirmance</strong> is a high-performance firming serum that leverages advanced peptide technology and the specialized ingredient <strong>Juvinity™</strong> to support the skin's natural architecture, giving it a lifted and more toned appearance.</p>
    
    <h2>DNA Repair and Cellular Vitality</h2>
    <p>ReFirmance goes beyond the surface by supporting the health of your skin cells' DNA. By protecting the telomeres and encouraging the natural production of elastin and collagen, it helps the skin 'remember' its youthful firmness and resilience.</p>
    
    <h2>Advanced Firming Ingredients</h2>
    <ul>
      <li><strong>Juvinity™ (Teprenone):</strong> An award-winning ingredient that targets the root cause of cellular aging to extend skin cell life.</li>
      <li><strong>Palmitoyl Peptides:</strong> Mimic the body's natural signals to produce more collagen and elastin.</li>
      <li><strong>Micrococcus Lysate:</strong> Supports the skin's natural DNA repair enzymes to protect against environmental damage.</li>
      <li><strong>Aloe Vera & Cucumber:</strong> Provide a soothing foundation of hydration to plump the skin instantly.</li>
    </ul>
            """
        })

    kerassentials = find_review("Kerassentials")
    if kerassentials:
        kerassentials.update({
            "title": "Kerassentials Review: The Professional Oil Blend for Healthy Nails",
            "metaTitle": "Kerassentials Nail Fungus Review - Ingredients & Efficacy",
            "metaDescription": "Kerassentials is a doctor-formulated topical oil designed to address nail fungus and support skin health using Tea Tree and Undecylenic Acid.",
            "content": """
    <h2>Reclaiming Your Nail Health</h2>
    <p>Stubborn nail fungus is more than an aesthetic issue; it's a persistent biological challenge. <strong>Kerassentials</strong> is a targeted topical oil blend designed to penetrate deep into the nail bed to create an environment that is hostile to fungal growth while nourishing the surrounding skin and cuticles.</p>
    
    <h2>The Synergistic Antifungal Shield</h2>
    <p>The power of Kerassentials lies in its unique 'doctor-formulated' blend of 4 high-quality oils and 9 supportive botanicals. By applying the oil directly to the site of the infection, you provide the precision care needed to clear discoloration and support the growth of healthy new nails.</p>
    
    <h2>Core Antifungal Ingredients</h2>
    <ul>
      <li><strong>Undecylenic Acid:</strong> A potent fatty acid derived from castor oil that has been used for decades to manage fungal growth.</li>
      <li><strong>Tea Tree Oil:</strong> One of nature's most effective antimicrobial agents, perfect for keeping the nail bed clean.</li>
      <li><strong>Lavender Oil:</strong> Soothes the skin and provides an additional layer of antibacterial protection.</li>
      <li><strong>Manuka Oil:</strong> High in antioxidants and known for its superior ability to support tissue repair.</li>
    </ul>
            """
        })

    # --- DIETARY SUPPLEMENTS BATCH ---
    
    alpilean = find_review("Alpilean")
    if alpilean:
        alpilean.update({
            "title": "Alpilean Review: Optimizing Inner Body Temperature for Fat Burning",
            "metaTitle": "Alpilean Review 2026 - Alpine Ice Hack for Weight Loss",
            "metaDescription": "Alpilean targets 'inner body temperature' to ignite your metabolism. Discover the 6 alpine ingredients inside this viral 'Ice Hack.'",
            "content": """
    <h2>The Alpine Secret to a Faster Metabolism</h2>
    <p>Scientific research from Stanford University has identified a common factor in overweight men and women: low inner body temperature. <strong>Alpilean</strong> is a first-of-its-kind supplement designed to normalize your internal thermoregulation, effectively 're-igniting' your metabolic rate for effortless calorie burning.</p>
    
    <h2>The 'Ice Hack' Mechanism</h2>
    <p>When your inner body temperature is even slightly low, your metabolism slows down to conserve energy. Alpilean uses 6 potent alpine ingredients to raise this internal 'thermostat,' allowing your body to process fat up to 300% more efficiently, even while you sleep.</p>
    
    <h2>6 Alpine Ingredients</h2>
    <ul>
      <li><strong>Golden Algae (Fucoxanthin):</strong> Targets inner body temperature and supports liver and brain health.</li>
      <li><strong>Dika Nut:</strong> Supports healthy cholesterol and eases digestion.</li>
      <li><strong>Drumstick Tree Leaf:</strong> Rich in antioxidants to support healthy blood sugar levels.</li>
      <li><strong>Bigarade Orange:</strong> Supports immune health and reduces oxidative stress.</li>
    </ul>
            """
        })

    exipure = find_review("Exipure")
    if exipure:
        exipure.update({
            "title": "Exipure Review: Activating Brown Adipose Tissue (BAT) for Weight Loss",
            "metaTitle": "Exipure Review - Brown Fat Activation Ingredients",
            "metaDescription": "Exipure targets low Brown Adipose Tissue (BAT) levels, the newly discovered root cause of unexplained weight gain. Learn how it works.",
            "content": """
    <h2>Targeting the Root of Unexplained Weight Gain</h2>
    <p>Why do some people stay lean no matter what they eat? The answer lies in <strong>Brown Adipose Tissue (BAT)</strong>. BAT isn't like the fat we're used to; it's a fat-shrinking powerhouse that burns 300 times more calories than regular fat. <strong>Exipure</strong> is specifically formulated to boost these BAT levels.</p>
    
    <h2>The 8-Ingredient BAT Catalyst</h2>
    <p>Exipure uses a proprietary blend of 8 exotic plants and nutrients that are clinically proven to support healthy levels of brown fat. By increasing your body's BAT 'engine,' you can turn your system into a 24/7 calorie-burning machine.</p>
    
    <h2>Key BAT-Boosting Ingredients</h2>
    <ul>
      <li><strong>Perilla:</strong> Supports BAT levels and overall brain health and cholesterol.</li>
      <li><strong>Holy Basil:</strong> Reduces stress and boosts BAT while supporting brain power.</li>
      <li><strong>White Korean Ginseng:</strong> Provides foundational immune support and reduces oxidative stress.</li>
      <li><strong>Quercetin:</strong> Rejuvenates aging cells and supports healthy blood pressure.</li>
    </ul>
            """
        })

    ikaria = find_review("Ikaria Lean Belly Juice")
    if ikaria:
        ikaria.update({
            "title": "Ikaria Lean Belly Juice Review: Eliminating Toxic Ceramides for Fat Loss",
            "metaTitle": "Ikaria Lean Belly Juice - Official Ingredients & Benefits",
            "metaDescription": "Ikaria Lean Belly Juice is a potent powder that targets 'toxic ceramides' to unlock stubborn fat stores. Discover the morning ritual secret.",
            "content": """
    <h2>The Mediterranean Secret to Flat Guts</h2>
    <p>Inspired by the longevity secrets of the Greek island of Ikaria, <strong>Ikaria Lean Belly Juice</strong> is a revolutionary powdered supplement that targets 'toxic ceramides.' These harmful compounds force fat cells into your bloodstream and around your vital organs. This juice helps flush them out, allowing your body to release stubborn fat.</p>
    
    <h2>A Complete Metabolic Upgrade</h2>
    <p>This isn't just a weight loss supplement; it's a full-body tonic. By supporting liver health, improving digestion, and managing uric acid levels, Ikaria Lean Belly Juice ensures that your body is in the perfect state for long-term health and vitality.</p>
    
    <h2>Ingredients of the 'Blue Zone' Tonic</h2>
    <ul>
      <li><strong>Fucoxanthin:</strong> A rare seaweed extract that supports the conversion of fat cells into energy.</li>
      <li><strong>Milk Thistle:</strong> Supports the liver's natural ability to filter out toxins and manage fat.</li>
      <li><strong>Resveratrol:</strong> A powerful antioxidant that supports healthy arteries and cellular health.</li>
      <li><strong>EGCG:</strong> From green tea, known for boosting the metabolism and providing clean energy.</li>
    </ul>
            """
        })

    livpure = find_review("Liv Pure")
    if livpure:
        livpure.update({
            "title": "Liv Pure Review: Optimizing Your Liver for 24/7 Fat Burning",
            "metaTitle": "Liv Pure Review - Liver Purification & Weight Loss Complex",
            "metaDescription": "Liv Pure targets compromised liver function, the hidden cause of slow metabolism. Learn how the Purification and Fat-Burning complexes work.",
            "content": """
    <h2>The Hidden Key to Weight Loss: Your Liver</h2>
    <p>Your liver is the gatekeeper of your metabolism. Every calorie you consume passes through it to be either burned for energy or stored as fat. <strong>Liv Pure</strong> is designed to optimize this process by purifying the liver and supercharging its ability to process fat.</p>
    
    <h2>Dual-Action: Purify and Burn</h2>
    <p>Liv Pure features two distinct proprietary complexes: the <strong>Liver Purification Complex</strong> and the <strong>Liver Fat-Burning Complex</strong>. Together, they clear out environmental toxins and provide the enzymatic support your liver needs to burn fat with peak efficiency.</p>
    
    <h2>Scientific Nutrient Profile</h2>
    <ul>
      <li><strong>Silymarin:</strong> The gold standard for liver protection, proven to support healthy liver cell regeneration.</li>
      <li><strong>Berberine:</strong> A potent metabolic trigger that supports healthy blood sugar and fat oxidation.</li>
      <li><strong>Betaine:</strong> Aids the liver in processing fats and supports detoxification pathways.</li>
      <li><strong>Genistein:</strong> A natural phytoestrogen that has been linked to fat burning and anti-inflammatory support.</li>
    </ul>
            """
        })

    leanbiome = find_review("Lean Biome")
    if leanbiome:
        leanbiome.update({
            "title": "Lean Biome Review: Restoring the 'Lean Bacteria' for Permanent Results",
            "metaTitle": "Lean Biome Review - Ivy League Research & Probiotics",
            "metaDescription": "Lean Biome is based on Ivy League research into the 'lean microbiome.' Discover the bacterial strains that keep you lean naturally.",
            "content": """
    <h2>The Ivy League Weight Loss Secret</h2>
    <p>Research from Ivy League institutions has discovered that lean individuals have a vastly different gut microbiome than those who struggle with weight. <strong>Lean Biome</strong> is designed to 'import' these lean bacterial strains into your system, effectively reprogramming your body to burn fat effortlessly.</p>
    
    <h2>Reprogramming Your Gut</h2>
    <p>A 'heavy' microbiome causes cravings, slow metabolism, and fat storage. Lean Biome uses 9 clinically researched probiotic strains—including the legendary <strong>L. gasseri</strong>—to crowd out bad bacteria and take control of your hunger hormones and metabolic speed.</p>
    
    <h2>The 9-Strain Lean Complex</h2>
    <ul>
      <li><strong>Lactobacillus Gasseri:</strong> Clinically proven to reduce visceral fat and support weight management.</li>
      <li><strong>Lactobacillus Rhamnosus:</strong> Helps manage cravings and supports a healthy immune response.</li>
      <li><strong>Greenselect Phytosome:</strong> A caffeine-free green tea extract that supports the metabolic engine without the jitters.</li>
      <li><strong>Inulin:</strong> The prebiotic 'fuel' that ensures your new lean bacteria can survive and thrive.</li>
    </ul>
            """
        })

    # Save Batch 3
    updated_json = json.dumps(reviews, indent=2)
    updated_content = f"export const generatedReviews = {updated_json};\n"
    
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(updated_content)

    print("Batch 3: 10 products (Beauty & Top Dietary Supplements) updated with unique content.")

if __name__ == "__main__":
    main()
