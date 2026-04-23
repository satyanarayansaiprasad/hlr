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

    # --- BATCH 6: BLOOD SUGAR & SPECIALIZED HEALTH ---
    
    glucotrust = find_review("Glucotrust")
    if glucotrust:
        glucotrust.update({
            "title": "Glucotrust Review: Balancing Blood Sugar Through Deep Sleep Mastery",
            "metaTitle": "Glucotrust Review - Official Sleep & Sugar Formula",
            "metaDescription": "Glucotrust targets the link between slow-wave sleep and blood sugar levels. Learn how Cinnamon and Juniper Berries support your metabolism.",
            "content": """
    <h2>The Hidden Link Between Sleep and Blood Sugar</h2>
    <p>Scientific research has revealed that deep, slow-wave sleep is critical for metabolic health. When you sleep soundly, your body balances its hormones—including insulin. <strong>GlucoTrust</strong> is the first supplement designed to provide both the nutrients for blood sugar management and the herbal support for deep, restorative sleep.</p>
    
    <h2>Optimizing Your Nightly Metabolism</h2>
    <p>GlucoTrust provides 8 potent botanicals and minerals that work while you sleep. By calming your nervous system and providing the building blocks for glucose processing, it helps reduce morning sugar spikes and manages junk food cravings throughout the following day.</p>
    
    <h2>Key Rejuvenating Ingredients</h2>
    <ul>
      <li><strong>Gymnema Sylvestre:</strong> Known as the 'sugar destroyer,' it helps block sugar receptors on your taste buds and supports healthy insulin response.</li>
      <li><strong>Biotin & Chromium:</strong> Essential nutrients that help the body convert carbohydrates, fats, and proteins into useable energy.</li>
      <li><strong>Cinnamon & Licorice:</strong> Traditional ingredients that support healthy inflammation levels and provide a foundation for metabolic speed.</li>
      <li><strong>Juniper Berries:</strong> Rich in antioxidants that protect your cells from oxidative stress while you rest.</li>
    </ul>
            """
        })

    glucofort = find_review("Glucofort")
    if glucofort:
        glucofort.update({
            "title": "Glucofort Review: Addressing the Ceramide Trigger for Metabolic Health",
            "metaTitle": "Glucofort Review - Official Ingredients & Ceramide Mechanism",
            "metaDescription": "Glucofort targets 'toxic ceramides' which clinical research suggests can disrupt insulin function. Discover the 12-ingredient botanical blend.",
            "content": """
    <h2>The Breakthrough Ceramide Protocol</h2>
    <p>Modern science suggests that 'toxic ceramides'—harmful fat molecules—can build up in the bloodstream and clog vital organs like the pancreas. <strong>Glucofort</strong> is a high-potency formula designed to flush out these ceramides, allowing your body's natural insulin to function with peak efficiency.</p>
    
    <h2>A Global Blend for Blood Sugar Support</h2>
    <p>Glucofort brings together some of the most powerful natural ingredients from around the world. From the depths of the Amazon rainforest to the high mountains of Tibet, this formula provides a comprehensive defense system against the environmental toxins that slow down your metabolism.</p>
    
    <h2>Proprietary Metabolic Ingredients</h2>
    <ul>
      <li><strong>Bitter Melon:</strong> Supports healthy glucose levels and provides a natural boost to fat metabolism.</li>
      <li><strong>Guggul:</strong> A Tibetan secret used to maintain healthy blood pressure and support hormonal balance.</li>
      <li><strong>Yarrow Flower:</strong> An antioxidant-rich botanical that supports the body's natural defense against oxidative stress.</li>
      <li><strong>White Mulberry:</strong> Traditionally used to slow the breakdown of sugars in the gut for a more stable energy curve.</li>
    </ul>
            """
        })

    glucoberry = find_review("Glucoberry")
    if glucoberry:
        glucoberry.update({
            "title": "Glucoberry Review: Unclogging Your Blood Sugar Drain with Delphinidin",
            "metaTitle": "Glucoberry Review - Official Maqui Berry Extract Info",
            "metaDescription": "Glucoberry targets the 'blood sugar drain' in your kidneys to flush out excess glucose. Discover the power of Delphinol® and Maqui Berry.",
            "content": """
    <h2>The 'Blood Sugar Drain' Discovery</h2>
    <p>While most supplements focus solely on the pancreas or insulin, <strong>GlucoBerry</strong> targets a newly-discovered mechanism: the 'Blood Sugar Drain' in your kidneys. Research suggests that when this drain is clogged, excess sugar remains in your system. GlucoBerry provides the nutrients needed to keep this drain open and efficient.</p>
    
    <h2>The Power of Delphinidin</h2>
    <p>The secret to GlucoBerry's success is <strong>Delphinol®</strong>, a premium Maqui Berry extract rich in delphinidins. These unique antioxidants are clinically proven to support the health of the SG2 protein—the 'gatekeeper' of your blood sugar drain.</p>
    
    <h2>Key Scientific Ingredients</h2>
    <ul>
      <li><strong>Premium Maqui Berry (Delphinol®):</strong> Clinical research shows it helps reduce blood sugar spikes by improving the kidney's filtration efficiency.</li>
      <li><strong>Chromium & Biotin:</strong> Foundation nutrients that support insulin sensitivity and energy production.</li>
      <li><strong>Gymnema Leaf:</strong> Helps manage cravings and supports a healthy, balanced metabolism.</li>
    </ul>
            """
        })

    folifort = find_review("Folifort")
    if folifort:
        folifort.update({
            "title": "Folifort Review: Reclaiming Your Hair with the DHT-Blocking Protocol",
            "metaTitle": "Folifort Hair Supplement - Official Review & Ingredients",
            "metaDescription": "Folifort targets the 5-alpha reductase enzyme to manage DHT levels, the #1 cause of hair thinning. Discover the power of Fo-Ti and Zinc.",
            "content": """
    <h2>Nourishing Your Hair from the Inside Out</h2>
    <p>Hair loss isn't just about topical treatments; it's a biological process driven by hormones and nutrition. <strong>Folifort</strong> is a specialized dietary supplement designed to tackle the leading cause of hair thinning: the 5-alpha reductase enzyme, which converts testosterone into the hair-killing hormone DHT.</p>
    
    <h2>The Follicle Rejuvenation Strategy</h2>
    <p>By providing your body with the 'building blocks' of keratin—the protein that makes up your hair—and balancing the enzymes that cause follicle shrinkage, Folifort helps you grow thicker, stronger, and more resilient hair naturally.</p>
    
    <h2>Core Hair-Building Ingredients</h2>
    <ul>
      <li><strong>Fo-Ti:</strong> A legendary Chinese herb believed to revitalize hair follicles and support natural color.</li>
      <li><strong>Saw Palmetto:</strong> A natural DHT-blocker that protects hair follicles from hormonal miniaturization.</li>
      <li><strong>Zinc & Biotin:</strong> The two most critical nutrients for structural hair strength and scalp health.</li>
      <li><strong>Nettle Root:</strong> Provides essential minerals and supports healthy circulation to the hair roots.</li>
    </ul>
            """
        })

    quietum = find_review("Quietum Plus")
    if quietum:
        quietum.update({
            "title": "Quietum Plus Review: Protecting Your Auditory Health with Plant-Based Bio-Actives",
            "metaTitle": "Quietum Plus Review - Ear & Hearing Health Support",
            "metaDescription": "Quietum Plus provides a natural shield for your ears and auditory nerves. Learn how Mucuna Pruriens and Ashwagandha support clear hearing.",
            "content": """
    <h2>The 360-Degree Ear Support System</h2>
    <p>Our ears are constantly bombarded by noise and environmental toxins. <strong>Quietum Plus</strong> is an advanced dietary formula designed to provide a comprehensive 'auditory shield.' By supporting the health of the auditory nerves and improving blood flow to the inner ear, it helps maintain long-term hearing clarity.</p>
    
    <h2>Nourishing the Auditory Nerve</h2>
    <p>The connection between your ear and your brain is delicate. Quietum Plus uses a synergistic blend of 18 plant extracts to provide the antioxidants and neuro-nutrients needed to keep this connection strong, reducing the impact of age-related auditory decline.</p>
    
    <h2>18 Powerhouse Botanicals</h2>
    <ul>
      <li><strong>Mucuna Pruriens:</strong> Supports nervous system health and provides neuroprotective benefits.</li>
      <li><strong>Ashwagandha:</strong> An adaptogen that helps the body manage the physiological stress that can affect auditory performance.</li>
      <li><strong>Maca Root:</strong> Provides an energy boost and supports foundational cellular vitality.</li>
      <li><strong>Dong Quai:</strong> Traditionally used to support healthy circulation, ensuring your ears receive the oxygen they need.</li>
    </ul>
            """
        })

    sonus = find_review("Sonus Complete")
    if sonus:
        sonus.update({
            "title": "Sonus Complete Review: The Synergistic Approach to Tinnitus Relief",
            "metaTitle": "Sonus Complete Review - Official Nerve Support Ingredients",
            "metaDescription": "Sonus Complete is a potent supplement designed to calm the nervous system and support auditory health. Discover the power of Hibiscus and Garlic.",
            "content": """
    <h2>Calming the 'Internal Noise'</h2>
    <p>Persistent ringing in the ears—tinnitus—can be incredibly disruptive. <strong>Sonus Complete</strong> is a dietary formula designed to address the neurological factors that contribute to this internal noise. By providing the brain and ears with a specialized blend of vitamins and tranquilizing herbs, it helps promote a quieter, calmer state of mind.</p>
    
    <h2>The Neural Repair Protocol</h2>
    <p>Sonus Complete focuses on supporting the 'neural networks' responsible for sound processing. By reducing internal inflammation and providing the precursors for healthy nerve signaling, the formula aims to clear the mental 'feedback' that causes discomfort.</p>
    
    <h2>Precision Ingredients for Calm</h2>
    <ul>
      <li><strong>Hibiscus Flower:</strong> Known for its ability to calm the nervous system and support healthy blood pressure levels.</li>
      <li><strong>Garlic:</strong> A potent antimicrobial and circulatory booster that supports clean blood flow to the delicate inner ear.</li>
      <li><strong>Hawthorn Berries:</strong> Provide cardiovascular support and help maintain a healthy heart-brain connection.</li>
      <li><strong>B-Vitamin Complex:</strong> Essential for nerve repair and the maintenance of healthy auditory pathways.</li>
    </ul>
            """
        })

    # Save Batch 6
    updated_json = json.dumps(reviews, indent=2)
    updated_content = f"export const generatedReviews = {updated_json};\n"
    
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(updated_content)

    print("Batch 6: 6 Specialized Health products updated (Blood Sugar, Hair, Ear Health).")

if __name__ == "__main__":
    main()
