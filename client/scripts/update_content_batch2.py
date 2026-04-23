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

    # --- DENTAL HEALTH BATCH ---
    
    prodentim = find_review("ProDentim")
    if prodentim:
        prodentim.update({
            "title": "ProDentim Review: The 3.5 Billion CFU Oral Probiotic Hack",
            "metaTitle": "ProDentim Review 2026 - Official Ingredients & Oral Microbiome",
            "metaDescription": "ProDentim reintroduces 'good' bacteria to your mouth to balance the oral microbiome. Discover the science behind this 3.5B CFU chewable probiotic.",
            "keywords": ["ProDentim review", "oral probiotics", "dental health supplement", "ProDentim ingredients"],
            "excerpt": "Is Your mouth missing 'good' bacteria? Our ProDentim review explores how this 3.5 billion CFU probiotic blend supports gum health and fresh breath.",
            "content": """
    <h2>Introduction: Beyond Brushing and Flossing</h2>
    <p>Standard oral care often focuses on killing bacteria, but <strong>ProDentim</strong> takes a radical new approach: repopulating your mouth with beneficial microorganisms. Scientific research suggests that a lack of 'good' bacteria is the leading cause of modern dental issues. ProDentim is a chewable probiotic designed to restore that delicate balance.</p>
    
    <h2>The 3.5 Billion CFU Formula</h2>
    <p>Each tablet of ProDentim contains a potent dose of five clinically researched probiotic strains. Unlike digestive probiotics, these are specifically selected for their ability to colonize the oral cavity, outcompeting harmful bacteria that cause plaque, inflammation, and bad breath.</p>
    
    <h2>Key Ingredient Profile</h2>
    <ul>
      <li><strong>Lactobacillus Reuteri:</strong> Known for its ability to support healthy inflammation levels in the gums and promote a clean oral environment.</li>
      <li><strong>B.lactis BL-04®:</strong> Supports the health of the upper respiratory tract and maintains a healthy immune system within the mouth.</li>
      <li><strong>Malic Acid:</strong> Found in strawberries; it helps maintain tooth whiteness and supports saliva production.</li>
      <li><strong>Inulin:</strong> A prebiotic fiber that provides the 'fuel' your newly introduced probiotics need to thrive.</li>
    </ul>
    
    <h2>Clinical Oral Benefits</h2>
    <ul>
      <li>Promotes long-lasting fresh breath by neutralizing odor-causing bacteria.</li>
      <li>Supports the structural health of your gums and teeth.</li>
      <li>Helps maintain a healthy immune environment in the oral cavity.</li>
      <li>Easy-to-use chewable format with high bioavailability.</li>
    </ul>
    
    <h2>Final Verdict</h2>
    <p>ProDentim is a top-tier recommendation for those looking for a non-invasive, habitual addition to their dental hygiene. By focusing on the microbiome, it addresses the biological root of many oral concerns. We recommend a 60-day consistent trial for optimal results.</p>
            """,
            "pros": ["Repopulates oral cavity with 3.5B CFU good bacteria", "Supports gum health and structural integrity", "Tastes pleasant and easy to incorporate"],
            "cons": ["Requires consistent daily use to maintain colonies", "Best results seen after 90 days"]
        })

    dentatonic = find_review("DentaTonic")
    if dentatonic:
        dentatonic.update({
            "title": "DentaTonic Review: Boosting Salivary Enzymes for Natural Defense",
            "metaTitle": "DentaTonic Review - Saliva Enzyme Support for Teeth",
            "metaDescription": "DentaTonic targets lactoperoxidase and other salivary enzymes to provide a natural antimicrobial shield for your teeth and gums.",
            "keywords": ["DentaTonic review", "salivary enzyme supplement", "DentaTonic ingredients", "natural dental defense"],
            "content": """
    <h2>Saliva: Your Body's Natural Dental Shield</h2>
    <p><strong>DentaTonic</strong> is engineered to enhance the most powerful natural defense your mouth has: saliva. Healthy saliva contains specific enzymes and proteins that act as a barrier against plaque-forming bacteria. DentaTonic provides the nutritional support needed to optimize these defensive secretions.</p>
    
    <h2>The Science of Enzyme Optimization</h2>
    <p>The core mechanism of DentaTonic involves supporting <strong>lactoperoxidase</strong>, an essential enzyme that neutralizes harmful microorganisms. By bolstering this enzyme along with lysozyme and lactoferrin, the supplement creates an 'inhospitable environment' for the bacteria that cause tooth decay and gum irritation.</p>
    
    <h2>Key Protective Ingredients</h2>
    <ul>
      <li><strong>Lactoperoxidase:</strong> The anchor enzyme for antimicrobial defense in the oral cavity.</li>
      <li><strong>Dextranase & Beta-Glucanase:</strong> These enzymes specifically break down the sticky 'biofilm' (plaque) that bacteria use to hide on your teeth.</li>
      <li><strong>Microcrystalline Hydroxyapatite:</strong> Provides the building blocks for natural tooth remineralization.</li>
      <li><strong>Lysozyme:</strong> A traditional antimicrobial protein that helps keep oral bacterial populations in check.</li>
    </ul>
    
    <h2>Why Choose DentaTonic?</h2>
    <ul>
      <li>Targets the health of the entire oral environment, not just the surface of teeth.</li>
      <li>Enhances the body's natural defensive mechanisms (saliva).</li>
      <li>Supports healthy gum pockets and reduces bacterial accumulation.</li>
      <li>Formulated with high-quality, pure enzymes.</li>
    </ul>
            """
        })

    denticore = find_review("Denticore")
    if denticore:
        denticore.update({
            "title": "DentiCore Review: Deep Gum Oxygenation for Long-Term Health",
            "metaTitle": "DentiCore Review - Supporting Gum Oxygenation",
            "metaDescription": "DentiCore targets gum tissue health from the inside out by supporting oxygenation and antimicrobial defense using Chlorella and Chlorophyllin.",
            "content": """
    <h2>The 'Inside-Out' Approach to Gums</h2>
    <p>Many dental issues stem from a lack of oxygen in the gum tissues, which allows anaerobic bacteria—the most destructive type—to thrive. <strong>DentiCore</strong> is formulated to support the oxygenation of your respiratory and oral systems, ensuring that your gums remain resilient and healthy.</p>
    
    <h2>Oxygenation and Antimicrobial Synergy</h2>
    <p>DentiCore works by purifying the respiratory pathways and supporting the delivery of oxygen to the mouth. This process is paired with a potent blend of minerals and plant extracts that provide a multi-layered antimicrobial defense against plaque and inflammation.</p>
    
    <h2>Ingredient Highlights</h2>
    <ul>
      <li><strong>Chlorella Vulgaris:</strong> A powerful algae known for its detoxification properties and ability to support immune signaling.</li>
      <li><strong>Chlorophyllin:</strong> Helps neutralize odors and provides antioxidant support for irritated gum tissue.</li>
      <li><strong>Shilajit:</strong> A traditional mineral-rich substance used for total bodily support and metabolic health.</li>
      <li><strong>Clove & Peppermint:</strong> Provide immediate soothing effects and natural antibacterial support for fresh breath.</li>
    </ul>
    
    <h2>DentiCore Clinical USPs</h2>
    <ul>
      <li>Supports deep oxygenation of gum tissues.</li>
      <li>Helps reduce swelling and sensitivity from the inside out.</li>
      <li>Provides a broad spectrum of minerals (Zinc, Magnesium, Copper) for enamel support.</li>
      <li>Promotes long-lasting respiratory and oral freshness.</li>
    </ul>
            """
        })

    dentitox = find_review("Dentitox")
    if dentitox:
        dentitox.update({
            "title": "Dentitox Pro Review: The Targeted Liquid Serum for Precision Care",
            "metaTitle": "Dentitox Pro Review - Liquid Gum Health Serum",
            "metaDescription": "Dentitox Pro is a unique liquid serum that you apply directly to your gums. Learn how Vitamins A, C, and D3 support oral vitality.",
            "content": """
    <h2>Direct-to-Gum Liquid Technology</h2>
    <p><strong>Dentitox Pro</strong> breaks away from the traditional capsule format, offering a liquid serum that you apply directly to your teeth and gums. This delivery method allows the active nutrients—including vitamins, minerals, and essential oils—to be absorbed exactly where they are needed most.</p>
    
    <h2>Comprehensive Nutritional Support</h2>
    <p>The formula is a nutritional powerhouse, combining traditional herbal wisdom with modern vitamin science. By ensuring your gums are bathed in essential minerals like micro-encapsulated calcium and Vitamins A+D3, Dentitox Pro supports the structural integrity of your entire mouth.</p>
    
    <h2>Essential Components</h2>
    <ul>
      <li><strong>Vitamin A & C:</strong> Critical for tissue repair and maintaining the health of the mucous membranes in your mouth.</li>
      <li><strong>Xylitol:</strong> A tooth-friendly sweetener that inhibits the growth of cavity-causing bacteria.</li>
      <li><strong>MSM (Methylsulfonylmethane):</strong> Known for supporting healthy inflammation levels in soft tissues like gums.</li>
      <li><strong>Sage & Neem:</strong> Traditional botanicals used for centuries in oral hygiene for their natural purifying properties.</li>
    </ul>
    
    <h2>Why Dentitox Pro?</h2>
    <ul>
      <li>No large pills to swallow; easy liquid application.</li>
      <li>Provides localized support for sensitive teeth and gums.</li>
      <li>Enriched with high-potency Vitamins and Minerals.</li>
      <li>Supports the body's natural ability to maintain oral hygiene.</li>
    </ul>
            """
        })

    steelbite = find_review("Steel Bite Pro")
    if steelbite:
        steelbite.update({
            "title": "Steel Bite Pro Review: Addressing the Root Causes of Dental Decay",
            "metaTitle": "Steel Bite Pro Review - Internal Support for Teeth & Gums",
            "metaDescription": "Steel Bite Pro uses 29 powerful ingredients to neutralize harmful bacteria and support healthy saliva production for whole-mouth protection.",
            "content": """
    <h2>Redefining Oral Hygiene</h2>
    <p><strong>Steel Bite Pro</strong> is built on the belief that dental health starts in the gut and bloodstream. By introducing 29 powerful natural ingredients into your system, it aims to neutralize the harmful bacteria that hide in the hard-to-reach corners of your mouth where brushes and floss can't reach.</p>
    
    <h2>The Multi-Stage Defensive Protocol</h2>
    <p>Steel Bite Pro works in stages: first, it breaks down existing plaque and tartar; second, it identifies and destroys bacterial colonies; and third, it provides the minerals necessary to 're-fortify' tooth enamel and gum tissues.</p>
    
    <h2>29 Powerhouse Ingredients</h2>
    <ul>
      <li><strong>Turmeric (Curcumin):</strong> A legendary anti-inflammatory that helps soothe sensitive and bleeding gums.</li>
      <li><strong>Berberine:</strong> A potent antimicrobial agent that tackles the root cause of plaque formation.</li>
      <li><strong>Milk Thistle:</strong> Supports the liver in filtering out toxins that can eventually affect oral health.</li>
      <li><strong>Zinc & Vitamin D3:</strong> Foundational minerals for structural strength and immune defense.</li>
    </ul>
    
    <h2>Practical Benefits for Users</h2>
    <ul>
      <li>Comprehensive 29-ingredient blend for total oral support.</li>
      <li>Supports saliva's natural ability to protect and cleanse.</li>
      <li>Reduces the accumulation of plaque and tartar.</li>
      <li>Manages bad breath at the biological source.</li>
    </ul>
            """
        })

    # --- MEN'S HEALTH BATCH ---
    
    alpha = find_review("Alpha Tonic")
    if alpha:
        alpha.update({
            "title": "Alpha Tonic Review: Supporting Free Testosterone with This Ancient Secret",
            "metaTitle": "Alpha Tonic Review 2026 - Official Testosterone Support",
            "metaDescription": "Alpha Tonic is a powdered supplement designed to boost free testosterone, energy, and stamina using Ashwagandha and Tongkat Ali.",
            "content": """
    <h2>Modern Solutions for Male Vitality</h2>
    <p>Many men feel like they're losing their 'edge' as they age. <strong>Alpha Tonic</strong> is a high-potency powdered supplement designed to support free testosterone levels, focus, and physical stamina. Inspired by traditional health practices, it provides the biological building blocks for peak male performance.</p>
    
    <h2>The 11-in-1 Vitality Formula</h2>
    <p>The power of Alpha Tonic lies in its synergy. By combining adaptogens that lower cortisol (the stress hormone) with minerals that support hormone production, the formula helps create an internal environment where men can thrive naturally.</p>
    
    <h2>Key Vitality Ingredients</h2>
    <ul>
      <li><strong>Tongkat Ali:</strong> A researched botanical known for supporting healthy testosterone levels and sexual confidence.</li>
      <li><strong>Ashwagandha:</strong> Helps manage physiological stress, which is the #1 killer of male vitality.</li>
      <li><strong>Boron:</strong> A trace mineral that is essential for 'freeing up' testosterone so your body can actually use it.</li>
      <li><strong>Panax Ginseng:</strong> Enhances focus and physical endurance for both the gym and daily life.</li>
    </ul>
    
    <h2>Editorial Perspective</h2>
    <ul>
      <li>Supports sustained, clean energy throughout the day.</li>
      <li>Promotes healthy hormonal balance and focus.</li>
      <li>Easy-to-use powder format; dissolves instantly.</li>
      <li>100% natural, non-GMO, and stimulant-free.</li>
    </ul>
            """
        })

    emperor = find_review("Emperor's Vigor Tonic")
    if emperor:
        emperor.update({
            "title": "Emperor's Vigor Tonic Review: The Circulation Secret for Peak Performance",
            "metaTitle": "Emperor's Vigor Tonic - Stamina & Vitality Support",
            "metaDescription": "Emperor's Vigor Tonic uses a specialized blend of Cistanche and Schisandra to support healthy circulation and male stamina.",
            "content": """
    <h2>Reviving Traditional Wisdom</h2>
    <p><strong>Emperor's Vigor Tonic</strong> is designed for the modern man who wants to reclaim the stamina and vitality of his youth. By focusing on a specific enzyme pathway linked to male sexual performance, this tonic supports healthy circulation and foundational energy.</p>
    
    <h2>Targeting Circulation and Enzymes</h2>
    <p>The core mechanism of this tonic is circulatory support. Healthy blood flow is the foundation of male stamina and erectile function. By using rare plant extracts like Cistanche and Schisandra, the formula helps the body maintain the peak performance needed for an active lifestyle.</p>
    
    <h2>The 'Imperial' Formulation</h2>
    <ul>
      <li><strong>Cistanche:</strong> A revered adaptogen often called 'desert ginseng,' used to support energy and sexual health.</li>
      <li><strong>Schisandra:</strong> Known for supporting longevity and physical endurance.</li>
      <li><strong>Wild Yam:</strong> Included for its role in supporting hormonal balance and vitality.</li>
      <li><strong>Poria Cocos:</strong> A traditional mushroom used to manage stress and support kidney health (often linked to vitality).</li>
    </ul>
    
    <h2>User Benefits</h2>
    <ul>
      <li>Supports healthy circulation and blood flow to key areas.</li>
      <li>Promotes sustained stamina and physical confidence.</li>
      <li>Uses rare botanicals inspired by imperial longevity rituals.</li>
      <li>Manufactured in sterile, GMP-certified facilities.</li>
    </ul>
            """
        })

    redboost = find_review("Red Boost")
    if redboost:
        redboost.update({
            "title": "Red Boost Review: Targeting Oxidative Stress in Smooth Muscles",
            "metaTitle": "Red Boost Review - Nitric Oxide & Blood Flow Support",
            "metaDescription": "Red Boost is a potent tonic that targets oxidative stress around smooth muscle to support healthy blood flow and nitric oxide levels.",
            "content": """
    <h2>The Science of Smooth Muscle</h2>
    <p>Weight gain and low stamina aren't just about aging; they're often about <strong>oxidative stress</strong>. Red Boost is a unique tonic that focuses on protecting your 'smooth muscle'—the tiny fibers that control blood flow. By reducing oxidative damage, Red Boost allows these muscles to relax and function optimally.</p>
    
    <h2>The Nitric Oxide Connection</h2>
    <p>Healthy blood flow depends on <strong>Nitric Oxide (NO)</strong>. Red Boost contains specific nutrients that support the body's natural NO production. This lead to improved circulation, which impacts everything from energy levels to peak sexual performance and overall physical confidence.</p>
    
    <h2>Potent Active Ingredients</h2>
    <ul>
      <li><strong>Icariin (Horny Goat Weed):</strong> A legendary botanical for supporting blood flow and erectile sensitivity.</li>
      <li><strong>L-Citrulline:</strong> An amino acid that directly supports vasodilation and clean circulation.</li>
      <li><strong>Fenugreek:</strong> Supports healthy hormone levels and overall metabolic vitality.</li>
      <li><strong>Nettle Root:</strong> Often included to support prostate health and maintain testosterone balance.</li>
    </ul>
    
    <h2>Why Red Boost is Different</h2>
    <ul>
      <li>Targets the biological root of blood flow (smooth muscle).</li>
      <li>Supports high levels of natural Nitric Oxide.</li>
      <li>Convenient powder format for rapid absorption.</li>
      <li>Supports total body health, including the prostate and metabolism.</li>
    </ul>
            """
        })

    phaloboost = find_review("PhaloBoost")
    if phaloboost:
        phaloboost.update({
            "title": "PhaloBoost Review: Maximizing Vasodilation for Enhanced Stamina",
            "metaTitle": "PhaloBoost Review - Ingredients & Performance Research",
            "metaDescription": "PhaloBoost uses a blend of L-Arginine and Tribulus Terrestris to support vasodilation and healthy libido levels.",
            "content": """
    <h2>Engineered for Male Performance</h2>
    <p>Struggling with stamina can be a major blow to confidence. <strong>PhaloBoost</strong> is a dietary supplement designed to address the circulatory and hormonal factors that impact male performance. By focusing on vasodilation—the widening of blood vessels—it ensures that your body has the oxygen and nutrients needed for peak moments.</p>
    
    <h2>The Libido and Energy Synergy</h2>
    <p>PhaloBoost doesn't just focus on blood flow; it also provides botanical support for libido and energy. By combining L-Arginine with potent plant extracts like Tribulus, the formula works to restore the natural drive and endurance that many men feel they've lost over time.</p>
    
    <h2>Key Performance Ingredients</h2>
    <ul>
      <li><strong>L-Arginine:</strong> A critical amino acid that convert into Nitric Oxide to support blood vessel relaxation.</li>
      <li><strong>Tribulus Terrestris:</strong> A traditional herb used to support libido and healthy testosterone response.</li>
      <li><strong>Ginkgo Biloba:</strong> Promotes healthy circulation to the extremities and supports focus.</li>
      <li><strong>Muira Puama:</strong> Often called 'potency wood,' it has been used for centuries to support male vitality.</li>
    </ul>
    
    <h2>Key Benefits</h2>
    <ul>
      <li>Supports improved erection quality and duration through vasodilation.</li>
      <li>Enhances overall physical and sexual stamina.</li>
      <li>Provides a natural boost to libido and confidence.</li>
      <li>Supports cardiovascular health through better circulation.</li>
    </ul>
            """
        })

    titanflow = find_review("TitanFlow")
    if titanflow:
        titanflow.update({
            "title": "TitanFlow Review: Supporting Prostate Health and Urinary Vitality",
            "metaTitle": "TitanFlow Review - Prostate & Urinary Flow Support",
            "metaDescription": "TitanFlow uses Pumpkin Seed Oil and Lycopene to support healthy prostate size and maintain a strong urinary flow.",
            "content": """
    <h2>The Foundation of Male Comfort</h2>
    <p>As men age, prostate health becomes a primary concern. <strong>TitanFlow</strong> is a specialized supplement designed to support the urethral walls and maintain a healthy, strong urinary flow. By addressing prostate comfort, it helps men reclaim their daily confidence and nighttime comfort.</p>
    
    <h2>The Anchor Formula for Urinary Flow</h2>
    <p>The TitanFlow formula is anchored by five high-quality ingredients that target prostate inflammation and urinary efficiency. Unlike generic supplements, TitanFlow focuses on the structural health of the urinary tract, ensuring that flow remains unobstructed and comfortable.</p>
    
    <h2>5 Key Structural Ingredients</h2>
    <ul>
      <li><strong>Pumpkin Seed Oil:</strong> A scientifically-backed 'anchor' ingredient for prostate and bladder comfort.</li>
      <li><strong>Beta-Sitosterol:</strong> A plant sterol that supports healthy urinary flow and overall prostate health.</li>
      <li><strong>Lycopene:</strong> A powerful antioxidant that protects prostate cells from oxidative damage.</li>
      <li><strong>Pygeum Africanum:</strong> A traditional bark extract used to manage urinary symptoms and support volume.</li>
    </ul>
    
    <h2>TitanFlow User Advantages</h2>
    <ul>
      <li>Supports a strong, healthy urinary stream.</li>
      <li>Reduces the frequency of sudden bathroom trips, especially at night.</li>
      <li>Protects prostate cells with high-potency antioxidants.</li>
      <li>Easy-to-swallow capsules for daily compliance.</li>
    </ul>
            """
        })

    # Save Batch 2
    updated_json = json.dumps(reviews, indent=2)
    updated_content = f"export const generatedReviews = {updated_json};\n"
    
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(updated_content)

    print("Batch 2: 10 products (Dental & Men's Health) updated with unique content.")

if __name__ == "__main__":
    main()
