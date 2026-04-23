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

    # --- BATCH 4: DIETARY SUPPLEMENTS ---
    
    puravive = find_review("Puravive")
    if puravive:
        puravive.update({
            "title": "Puravive Review: The Rice Hack for Boosting Brown Fat (BAT)",
            "metaTitle": "Puravive Review 2026 - Official Ingredients & Brown Fat",
            "metaDescription": "Puravive is a natural weight loss supplement that targets low Brown Adipose Tissue (BAT) levels. Discover the 8 exotic nutrients inside.",
            "content": """
    <h2>The Biological Secret to Staying Lean</h2>
    <p>Have you ever wondered why some people eat anything they want and never gain a pound? The secret isn't magic; it's <strong>Brown Adipose Tissue (BAT)</strong>. Unlike regular fat, BAT functions as a calorie-burning plant that generates heat. <strong>Puravive</strong> is specifically formulated to boost these BAT levels, turning your body into a natural weight loss engine.</p>
    
    <h2>The 8-Nutrient Metabolic Catalyst</h2>
    <p>Using a proprietary blend of 8 exotic plants and nutrients, Puravive addresses the newly-discovered root cause of belly fat. By raising your BAT levels, you can burn up to 300 times more calories than you could with regular fat cells, even while resting or sleeping.</p>
    
    <h2>Key Weight Management Ingredients</h2>
    <ul>
      <li><strong>Luteolin:</strong> A potent flavonoid that supports BAT levels and promotes brain and heart health.</li>
      <li><strong>Kudzu:</strong> High in antioxidants, it helps boost brown fat and supports a healthy cardiovascular system.</li>
      <li><strong>Holy Basil:</strong> An adaptogen that manages stress while supporting brain power and BAT activity.</li>
      <li><strong>Quercetin:</strong> Known for its ability to rejuvenate aging cells and maintain healthy blood pressure.</li>
    </ul>
    
    <h2>Final Verdict</h2>
    <p>Puravive offers a unique approach that respects the body's natural biology. For those who have found traditional dieting ineffective, focusing on BAT levels provides a promising new path. We recommend a consistent 90-day protocol to see the full cumulative effects on your metabolic rate.</p>
            """
        })

    sugardefender = find_review("Sugar Defender")
    if sugardefender:
        sugardefender.update({
            "title": "Sugar Defender Review: The Liquid Support for Healthy Blood Sugar",
            "metaTitle": "Sugar Defender Review - Official Benefits & Ingredient List",
            "metaDescription": "Sugar Defender is a natural liquid formula designed to support blood sugar levels and energy. Discover how Gymnema and Chromium work.",
            "content": """
    <h2>Take Control of Your Metabolic Energy</h2>
    <p>Fluctuating blood sugar levels can lead to energy crashes, brain fog, and stubborn weight gain. <strong>Sugar Defender</strong> is a high-potency liquid dietary supplement designed to provide foundational support for healthy glucose levels and sustained daily energy.</p>
    
    <h2>8 Ingredients for Balanced Glucose</h2>
    <p>The strength of Sugar Defender lies in its 8-in-1 formula, which combines traditional 'sugar destroyer' botanicals with essential minerals. This liquid format ensures rapid absorption, allowing the nutrients to start supporting your metabolic pathways from the very first dose.</p>
    
    <h2>Core Metabolic Nutrients</h2>
    <ul>
      <li><strong>Gymnema Sylvestre:</strong> Known in Ayurveda as the 'sugar destroyer,' it helps reduce sugar cravings and supports healthy glucose metabolism.</li>
      <li><strong>Chromium:</strong> A critical trace mineral that enhances the body's ability to process carbohydrates and maintain insulin sensitivity.</li>
      <li><strong>African Mango:</strong> Often used to support healthy fat metabolism and weight management.</li>
      <li><strong>Maca Root:</strong> An adaptogen that provides a natural, jitter-free energy boost.</li>
    </ul>
    
    <h2>Why Choose Sugar Defender?</h2>
    <ul>
      <li>Supports healthy, stable blood sugar levels throughout the day.</li>
      <li>Provides a natural energy lift without the crashes associated with caffeine.</li>
      <li>Convenient liquid dropper format for superior nutrient absorption.</li>
      <li>Stimulant-free, non-habit forming, and easy to use.</li>
    </ul>
            """
        })

    zencortex = find_review("ZenCortex")
    if zencortex:
        zencortex.update({
            "title": "ZenCortex Review: Supporting Hearing and Cognitive Clarity Naturally",
            "metaTitle": "ZenCortex Review - Hearing Health & Tinnitus Support",
            "metaDescription": "ZenCortex provides a natural shield for your ears and brain. Learn how Grape Seed and Green Tea support 360-degree hearing.",
            "content": """
    <h2>The 360-Degree Approach to Hearing</h2>
    <p>Hearing health isn't just about your ears; it's about the complex connection between your auditory system and your brain. <strong>ZenCortex</strong> is a specialized liquid formula designed to provide a 360-degree support shield for your hearing, focus, and overall cognitive clarity.</p>
    
    <h2>Combatting Auditory Oxidative Stress</h2>
    <p>Many hearing challenges are caused by oxidative damage to the sensitive hair cells in the inner ear. ZenCortex uses a potent blend of antioxidants to protect these delicate structures while improving blood flow to the brain's auditory processing centers.</p>
    
    <h2>Key Nutrients for Clarity</h2>
    <ul>
      <li><strong>Grape Seed Extract:</strong> A powerful antioxidant that protects the inner ear and supports healthy circulation.</li>
      <li><strong>Green Tea:</strong> Contains catechins that reduce inflammation and improve blood flow to the auditory system.</li>
      <li><strong>Panax Ginseng:</strong> Supports neuroprotection and enhances focus and mental energy.</li>
      <li><strong>Astragalus:</strong> Traditionally used to support the body's immune response and cellular vitality.</li>
    </ul>
    
    <h2>Practical User Benefits</h2>
    <ul>
      <li>Supports clean, clear hearing by protecting delicate auditory structures.</li>
      <li>Enhances mental focus and reduces the feeling of 'brain fog.'</li>
      <li>Provides a natural, antioxidant shield against environmental auditory stress.</li>
      <li>Gentle yet potent liquid formula for easy daily application.</li>
    </ul>
            """
        })

    neurothrive = find_review("Neuro-Thrive")
    if neurothrive:
        neurothrive.update({
            "title": "Neuro-Thrive Review: Revitalizing Your Brain's Mitochondrial Energy",
            "metaTitle": "Neuro-Thrive Brain Supplement - PQQ & Focus Support",
            "metaDescription": "Neuro-Thrive targets 'mitochondrial decay' in the brain to improve memory and focus. Discover how PQQ and Bacopa protect your mind.",
            "content": """
    <h2>The Mitochondrial Solution for Brain Fog</h2>
    <p>As we age, the 'powerhouses' of our brain cells—the mitochondria—can begin to slow down, leading to memory lapses and that frustrating feeling of 'brain fog.' <strong>Neuro-Thrive</strong> is engineered to revitalize these mitochondria, providing your brain with the cellular energy it needs to think clearly and remember better.</p>
    
    <h2>Nourishing the Aging Mind</h2>
    <p>Neuro-Thrive uses a specific blend of 'neuro-nutrients' that cross the blood-brain barrier to provide direct support for your cognitive pathways. By promoting the health of your neurons and reducing oxidative stress, the formula helps maintain the sharp focus and quick recall of your youth.</p>
    
    <h2>Core Neuro-Boosting Ingredients</h2>
    <ul>
      <li><strong>PQQ (Pyrroloquinoline Quinone):</strong> A breakthrough nutrient that supports the growth of new mitochondria and protects existing brain cells.</li>
      <li><strong>Bacopa Monnieri:</strong> A time-tested Ayurvedic herb known for its ability to enhance memory and learning.</li>
      <li><strong>Alpha GPC:</strong> Supports the levels of acetylcholine, the primary neurotransmitter for learning and focus.</li>
      <li><strong>GABA:</strong> Helps calm the nervous system, allowing for a focused, jitter-free mental state.</li>
    </ul>
    
    <h2>Key Advantages</h2>
    <ul>
      <li>Supports both short-term recall and long-term memory health.</li>
      <li>Reduces the impact of 'brain fog' and mental fatigue.</li>
      <li>Promotes a calm, focused state of mind for better daily performance.</li>
      <li>Uses natural, stimulant-free ingredients for sustained cognitive support.</li>
    </ul>
            """
        })

    sightcare = find_review("SightCare")
    if sightcare:
        sightcare.update({
            "title": "SightCare Review: Unlocking the Power of Adult Repair Stem Cells for Vision",
            "metaTitle": "SightCare Review - Official Support for Vision & Focus",
            "metaDescription": "SightCare targets 'adult repair stem cells' to support healthy vision and brain function. Learn how N-Acetyl Cysteine and Quercetin work.",
            "content": """
    <h2>A Revolutionary Approach to Clear Vision</h2>
    <p>Many vision issues are attributed to the natural aging process, but new research suggests that <strong>Adult Repair Stem Cells</strong> can play a critical role in maintaining eye health. <strong>SightCare</strong> is a specialized supplement designed to support the natural production and activity of these cells, providing a foundation for clear, sharp vision.</p>
    
    <h2>More Than Just Eye Health</h2>
    <p>SightCare is formulated to support the entire visual system, which includes the brain's processing centers. By providing high-potency antioxidants and neuro-nutrients, the formula helps maintain healthy eyesight, focus, and overall vitality, even as you age.</p>
    
    <h2>Vision-Supportive Nutrients</h2>
    <ul>
      <li><strong>N-Acetyl Cysteine (NAC):</strong> A potent antioxidant that supports healthy cell repair and detoxification within the visual system.</li>
      <li><strong>Quercetin:</strong> Protects the delicate structures of the eye from oxidative stress and environmental damage.</li>
      <li><strong>Lutein & Zeaxanthin:</strong> Essential 'eye vitamins' that filter harmful blue light and support macular health.</li>
      <li><strong>Bilberry Fruit:</strong> Traditionally used to support night vision and healthy circulation in the eyes.</li>
    </ul>
    
    <h2>Editorial Perspective</h2>
    <ul>
      <li>Supports the natural biological repair mechanisms of the eye.</li>
      <li>Promotes long-term vision clarity and focus.</li>
      <li>Provides a comprehensive shield against modern digital eye strain.</li>
      <li>Formulated in highly-regulated, FDA-registered facilities.</li>
    </ul>
            """
        })

    # Save Batch 4
    updated_json = json.dumps(reviews, indent=2)
    updated_content = f"export const generatedReviews = {updated_json};\n"
    
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(updated_content)

    print("Batch 4: 5 Dietary Supplements updated with unique content.")

if __name__ == "__main__":
    main()
