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

    # --- BATCH 5: PROSTATE & JOINT HEALTH ---
    
    protoflow = find_review("Protoflow")
    if protoflow:
        protoflow.update({
            "title": "Protoflow Review: The 8-in-1 Vitality Support for Prostate Health",
            "metaTitle": "Protoflow Review - Official Prostate & Urinary Support",
            "metaDescription": "Protoflow combines Saw Palmetto and Chinese Ginseng to support healthy prostate size and urinary flow. Discover the 8 exotic nutrients inside.",
            "content": """
    <h2>The Foundational Support for Male Wellness</h2>
    <p>As men age, maintaining prostate health and urinary efficiency becomes a daily priority. <strong>Protoflow</strong> is a comprehensive dietary supplement designed to provide an '8-in-1' support system for the prostate, bladder, and overall vital health. By addressing internal inflammation and cellular vitality, it helps men reclaim their daily comfort.</p>
    
    <h2>Targeting the Root of Urinary Frequency</h2>
    <p>Protoflow works by providing a concentrated dose of plant-based phytonutrients and antioxidants. These ingredients target the biological factors that lead to increased bathroom trips and disrupted sleep, helping to maintain a healthy prostate size and a strong, consistent flow.</p>
    
    <h2>8 Key Vitality Ingredients</h2>
    <ul>
      <li><strong>Saw Palmetto:</strong> The gold standard for prostate support, known for its ability to maintain normal urinary function.</li>
      <li><strong>Chinese Ginseng:</strong> Enhances physical energy levels and provides antioxidant protection for male tissues.</li>
      <li><strong>Muira Puama:</strong> A traditional botanical used to support libido and foundational male vitality.</li>
      <li><strong>Hawthorn Berries:</strong> Provide cardiovascular support, which is critical for healthy organ circulation.</li>
    </ul>
    
    <h2>Editorial Perspective</h2>
    <ul>
      <li>Supports healthy prostate size and bladder emptying.</li>
      <li>Reduces the frequency of sudden bathroom trips.</li>
      <li>100% natural, non-GMO, and stimulant-free formula.</li>
      <li>Manufactured in FDA-registered and GMP-certified facilities.</li>
    </ul>
            """
        })

    prostadine = find_review("Prostadine")
    if prostadine:
        prostadine.update({
            "title": "Prostadine Review: The Iodine-Infused Drops for Prostate Control",
            "metaTitle": "Prostadine Review 2026 - Official Iodine Drops for Bladder",
            "metaDescription": "Prostadine targets the 'hard water' mineral buildup that affects prostate health. Learn how Nori Yaki and Wakame support your bladder.",
            "content": """
    <h2>The Cold-Pressed Secret to Bladder Control</h2>
    <p>According to the latest research, the 'hard water' minerals found in modern plumbing can lead to a buildup inside the male urinary tract, affecting prostate function over time. <strong>Prostadine</strong> is a unique liquid supplement designed to flush out these toxins and restore a healthy internal environment for your prostate and bladder.</p>
    
    <h2>The Power of Marine Nutrients</h2>
    <p>Unlike traditional capsules, Prostadine is an iodine-rich liquid serum that leverages the power of deep-sea nutrients like Nori Yaki, Wakame, and Kelp. These ingredients provide the essential minerals needed to support a healthy urinary system and maintain the structural integrity of your prostate cells.</p>
    
    <h2>9 Synergistic Components</h2>
    <ul>
      <li><strong>Nori Yaki Extract:</strong> Supports a healthy prostate and maintains a strong, consistent urinary flow.</li>
      <li><strong>Wakame Extract:</strong> High in antimicrobial properties to support a clean and healthy bladder environment.</li>
      <li><strong>Shilajit:</strong> A mineral-rich adaptogen that boosts energy and supports healthy inflammation responses.</li>
      <li><strong>Neem:</strong> Known for its powerful antioxidant and cleansing properties.</li>
    </ul>
    
    <h2>Why Choose Liquid Prostadine?</h2>
    <ul>
      <li>Faster absorption compared to traditional pills or capsules.</li>
      <li>Targets the mineral buildup at the root of urinary challenges.</li>
      <li>Supports long-term kidney and bladder vitality.</li>
      <li>Natural, cold-pressed formula with high bioavailability.</li>
    </ul>
            """
        })

    flowforce = find_review("FlowForce Max")
    if flowforce:
        flowforce.update({
            "title": "FlowForce Max Review: The Chewable Solution for Prostate Vitality",
            "metaTitle": "FlowForce Max Review - Official Benefits & Ingredients",
            "metaDescription": "FlowForce Max uses Graminex Flower Pollen and Fisetin to support prostate health in a convenient chewable form. Learn how it works.",
            "content": """
    <h2>A New Approach to Prostate Hygiene</h2>
    <p>Maintaining a healthy prostate shouldn't be a chore. <strong>FlowForce Max</strong> introduces a novel chewable delivery system that makes prostate support part of your daily ritual. By combining breakthrough plant extracts with traditional minerals, it helps protect your system against environmental toxins and age-related decline.</p>
    
    <h2>The Science of Graminex Pollen</h2>
    <p>The anchor of the FlowForce Max formula is <strong>Graminex Flower Pollen Extract</strong>. This scientifically-backed ingredient has been used for decades to support healthy prostate size and urinary flow. When combined with antioxidants like Fisetin and Luteolin, it creates a powerful shield for your entire male reproductive system.</p>
    
    <h2>Precision Vitality Ingredients</h2>
    <ul>
      <li><strong>Graminex G63®:</strong> Targeted flower pollen extract that supports healthy inflammation levels in the prostate.</li>
      <li><strong>Fisetin & Luteolin:</strong> Rare flavonoids that protect cellular DNA and support overall longevity.</li>
      <li><strong>Monolaurin:</strong> Provides a natural antimicrobial defense for the urinary tract.</li>
      <li><strong>Oregano Leaf:</strong> Known for its ability to support a clean, healthy internal environment.</li>
    </ul>
            """
        })

    jointgenesis = find_review("Joint Genesis")
    if jointgenesis:
        jointgenesis.update({
            "title": "Joint Genesis Review: Rehydrating Your Joints with Mobilee®",
            "metaTitle": "Joint Genesis Review - BioDynamix Joint Mobilee Technology",
            "metaDescription": "Joint Genesis targets 'synovial fluid' loss, the hidden cause of aging joints. Discover how Mobilee® and Pine Bark restore mobility.",
            "content": """
    <h2>Winning the Battle Against Aging Joints</h2>
    <p>As we age, our joints often feel stiff and 'rusty.' This is frequently caused by the loss of synovial fluid—the 'joint jelly' that lubricates and cushions our bones. <strong>Joint Genesis</strong> by BioDynamix is the first formula designed to rehydrate your joints by boosting the quality of this critical fluid.</p>
    
    <h2>The Power of Mobilee® Technology</h2>
    <p>At the center of Joint Genesis is <strong>Mobilee®</strong>, a patented form of hyaluronic acid that is 10 times more effective than standard versions. By thickening the synovial fluid, Joint Genesis allows your joints to glide smoothly, reducing friction and supporting the natural repair of cartilage.</p>
    
    <h2>5 High-Performance Ingredients</h2>
    <ul>
      <li><strong>Mobilee®:</strong> A breakthrough in joint hydration that supports the production of synovial fluid.</li>
      <li><strong>French Maritime Pine Bark:</strong> One of nature's most powerful antioxidants, proven to support joint comfort and flexibility.</li>
      <li><strong>Ginger Root & Boswellia:</strong> Traditional anti-inflammatories that help soothe aching muscles and ligaments.</li>
      <li><strong>BioPerine®:</strong> Enhances the absorption of the entire formula for maximum efficacy.</li>
    </ul>
            """
        })

    goldenrevive = find_review("Golden Revive Plus")
    if goldenrevive:
        goldenrevive.update({
            "title": "Golden Revive Plus Review: The Doctor-Formulated Solution for Deep Mobility",
            "metaTitle": "Golden Revive Plus Review - UpWellness Mobility Formula",
            "metaDescription": "Golden Revive Plus uses Turmeric and Boswellia to address the root causes of joint pain. Discover the Dr. Joshua Levitt difference.",
            "content": """
    <h2>Clinical Restoration for Joints and Muscles</h2>
    <p>If you're tired of temporary fixes for joint pain, <strong>Golden Revive Plus</strong> offers a long-term, doctor-formulated solution. Developed by Dr. Joshua Levitt, this supplement targets the 'biological tripod' of mobility: inflammation, muscle tension, and joint stiffness.</p>
    
    <h2>Addressing the root of Inflammation</h2>
    <p>Many joint issues start with a runaway inflammatory response. Golden Revive Plus uses high-potency Curcumin and Boswellia to shut down the enzymes that cause pain, while Magnesium and Quercetin help the surrounding muscles relax and recover from daily strain.</p>
    
    <h2>The 6-Ingredient Synergy</h2>
    <ul>
      <li><strong>Curcumin Phytosome:</strong> A highly bioavailable form of turmeric that fights inflammation at the source.</li>
      <li><strong>Boswellia Serrata:</strong> Supports joint health and helps maintain a healthy range of motion.</li>
      <li><strong>Bromelain:</strong> A pineapple-derived enzyme that assists in breaking down the scar tissue and fluid buildup around joints.</li>
      <li><strong>Magnesium:</strong> Critical for over 300 biochemical reactions, including muscle relaxation and nerve health.</li>
    </ul>
            """
        })

    endopeak = find_review("EndoPeak")
    if endopeak:
        endopeak.update({
            "title": "EndoPeak Review: Maximizing Performance with Winged Treebine",
            "metaTitle": "EndoPeak Review 2026 - Official Stamina & Vitality Support",
            "metaDescription": "EndoPeak is a natural male vitality formula designed to boost energy and physical performance. Learn about the power of Tongkat Ali.",
            "content": """
    <h2>Unlocking Your Peak Physical Potential</h2>
    <p>Every man wants to feel like he's in his prime. <strong>EndoPeak</strong> is a high-performance dietary supplement designed to support the natural biological factors that contribute to stamina, strength, and male vitality. By focusing on blood flow and hormonal balance, it helps you stay ahead of the curve.</p>
    
    <h2>The 8-Nutrient Power Complex</h2>
    <p>The EndoPeak formula is built on 8 exotic nutrients and plant extracts that have been used for centuries in traditional medicine. This modern formulation provides the precision support needed for peak performance in the gym, in the boardroom, and in daily life.</p>
    
    <h2>Botanical Performance Leaders</h2>
    <ul>
      <li><strong>Tongkat Ali:</strong> A legendary botanical known for supporting healthy testosterone levels and sexual confidence.</li>
      <li><strong>Winged Treebine:</strong> A specialized plant extract used to support healthy stamina and physical endurance.</li>
      <li><strong>Tribulus Terrestris:</strong> Promotes muscle health and supports a healthy libido response.</li>
      <li><strong>Saw Palmetto:</strong> Ensures your prostate health is protected as your vitality increases.</li>
    </ul>
            """
        })

    # Saving Batch 5
    updated_json = json.dumps(reviews, indent=2)
    updated_content = f"export const generatedReviews = {updated_json};\n"
    
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(updated_content)

    print("Batch 5: 6 Priority Prostate & Joint Health products updated.")

if __name__ == "__main__":
    main()
