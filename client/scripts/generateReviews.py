import json
import re
import os
import random

weightLoss = [
  "Citrus Burn|https://citrusburn.com/",
  "mitolyn|https://mitolyn.com/",
  "Sumatra Slim Belly Tonic|https://sumatratonic.com/",
  "Sleep Lean|https://sleeplean.net/",
  "Leptozan|https://leptozan.com/",
  "Okinawa Flat Belly Tonic|#",
  "BURN|https://try24burn.com/",
  "All Day Slimming Tea|https://allslimmingherbs.com/",
  "SLIMCRYSTAL|https://slimcrystal.com/",
  "Okinawa Flat Belly Tonic|https://getokinawatonic.com/",
  "Nagano Tonic|https://leanbodytonic.com/",
  "LeanBliss|https://getleanbliss.com/",
  "AquaSculpt|#",
  "KEYSLIM|https://keyslimdrops.com/",
  "Fast Lean Pro|#",
  "Nicoya PuraTea|https://nicoyapuratea.com/",
  "Viva Slim|https://getvivaslim.com/cb/go/index.php",
  "Cleanest Body|https://cleanestbody.com/",
  "PurpleBurn Pro|https://purpleburnpro.com/",
  "java burn|https://morningcoffeeritual.net/",
  "LeanBiome|https://bestleanlife.com/cb/?",
  "RENEW|https://www.saltwatertrick.org/",
  "Ignitra|https://getignitra.com/",
  "Aquaburn|https://aquaburn.org/",
  "Volca Burn|https://volcaburn.com/",
  "Metabo Flex|https://www.metaboflex.com/",
  "LavaSlim|https://www.golavaslim.com/",
  "HydroLean XT|https://hydroleanxt.com/",
  "Superconductor Slim|https://superconductorslim.com/",
  "BellyFlush|https://cb.getbellyflush.com/go/lander.php",
  "ElectroSlim|https://cb.getelectroslim.com/go/indexwritten.php",
  "OrexiBurn|https://orexiburn.com/",
  "LipoSlend|https://liposlend.com/"
]

dentalHealth = [
  "ProDentim|https://prodentim101.com/",
  "ProvaDent|https://dentalsugarhack.com/",
  "Synadentix|https://synadentix.com/",
  "Denticore|https://getdenticore.com/",
  "Steel Bite Pro|https://steelbitepro.com/",
  "Dentitox|https://thedentitox101.com/",
  "PowerBite|https://getpowerbite.com/",
  "Oradentum|https://getoradentum.com/",
  "GumAktiv|https://gumaktiv.com/",
  "DentaSmile Pro|https://getdentasmilepro.com/",
  "DentaTonic|https://dentatonic.com/",
  "PurDentix|https://takepurdentixnow.com/"
]

general = [
  "Neura|https://neuraoriginal.com/",
  "SonoVive|https://sonovive.com/",
  "Sight Fresh|https://sightfresh.com/",
  "Nervolink|https://nervolink.com/",
  "Nervozen|https://nervozen.net/"
]

mentalHealth = [
  "Neurozoom|https://getneurozoom.com/"
]

sleepAndDreams = [
  "Yu Sleep|https://getyusleep.com/",
  "NiteHush Pro|https://nitehushpro.com/"
]

beauty = [
  "PrimeBiome|https://getprimebiome.com/",
  "Kerassentials|https://kerassentials.com/",
  "Neotonics|https://neotonics.com/",
  "AppaNail|https://getappanail.com/",
  "ReviTag|https://getrevitag.com/",
  "Illuderma|https://illuderma.com/",
  "RenewRitual|https://getrenewritual.com/",
  "FoliPrime|https://foliprime.com/",
  "Derma Prime Plus|https://dermaprimeplus.com/",
  "Hydrossential|https://hydrossential.com/",
  "synevra ultralift|https://getsynevra.com/"
]

remedies = [
  "NERVE ARMOR|https://nervearmor.org/",
  "Nerve Soothe|https://secure.getnervesoothe.com/",
  "Tonic Greens|https://trytonicgreens.cc/",
  "Insufend|https://tryinsufend.com/",
  "Nerve Revive 360|https://trynerverevive360.com/"
]

womensHealth = [
  "Menovelle|https://menovelle.com/",
  "NewEra Protect|#",
  "FemiPro|https://getfemipro.com/",
  "Thyrafemme Balance|https://getthyrafemme.com/",
  "PureLumin Essence|https://pureluminessence.com/",
  "Pelvic Floor Strong|#",
  "Menosoothe|https://menosoothe.net/"
]

mensHealth = [
  "ProstaVive|https://prostavive.org/",
  "Nitric Boost|https://getnitricboost.com/",
  "Nitric Boost Ultra|https://getnitricboost.com/",
  "PotentStream|https://potentstream.com/",
  "Spartamax|https://getspartamax.com/",
  "Prostadine|https://getprostadine.com/",
  "Protoflow|https://protoflow.net/welcome/",
  "Red Boost|https://mymorningtonic.com/",
  "EndoPeak|https://endopeak24.com/",
  "Alpha Tonic|https://thealphatonic.com/",
  "TC24|https://buytc24.com/",
  "Critical T|https://www.criticaltboost.com/",
  "FlowForce Max|https://flowforcemax.com/",
  "Fluxactive Complete|https://fluxactive.net/",
  "Clubhouse Fire|https://1.clubhousesupplements.com/fire-fp/",
  "ErecPrime|https://erecprime24.com/c/order-now.php",
  "Emperor's Vigor Tonic|https://emperorsvigortonic.com/",
  "club house stud|https://studperformance.com/",
  "Max Boost|https://maxboostjuice.com/",
  "Tupi Tea|https://gettupitea.com/",
  "ProstaLite|https://prostalite.com/",
  "Gorilla Cherry|https://getyourflowback.com/",
  "NeuroTest|https://tryneurotest.com/",
  "Alpha Surge|https://heroichustle.com/c/order-now.php",
  "EndoPump|https://endopumpsecret.com/",
  "Goliath XL10|https://trygoliathxl10.com/",
  "PotentStream|https://potentstream.com/",
  "prostapure 24|https://prostapure24.com/",
  "Steel Flow Pro|https://getsteelflowpro.com/",
  "VigoSurge|https://getvigosurge.com/",
  "VitalFlow|https://vitalflow.org/",
  "Pura Boost|https://getpuraboost.com/",
  "ProstaClear|https://getprostaclear.com/",
  "Primordial Vigor X|https://tryprimordialvigorx.com/",
  "PhaloBoost|https://phalo-boost.com/",
  "Alpha Fuel Pro|https://thealphafuel.com/",
  "Primal Blast|#",
  "Savage Steel|#",
  "TitanFlow|https://prostaterevealed.com/",
  "Gymnia|#"
]

dietarySupplements = [
  "Audifort|https://audisoothe.com/c/order-now.php",
  "Neuro Serge|https://getneuroserge.com/",
  "BREATHE|https://lungreset.com/",
  "NeuroPrime|https://theneuroprime.com/",
  "Gluco6|https://gluco6.com/",
  "Cardio Slim Tea|https://trycardioslimtea.com/",
  "iGenics|https://visionbreakthrough.com/",
  "Pineal Guardian|https://thepinealguardian.com/indexvip.php",
  "Quietum Plus|https://quietumplus.com/",
  "livpure|https://www.liv-pure.co/",
  "Sugar Defender|https://sugardefender24.com/",
  "Neura|https://neuraoriginal.com/",
  "Gluco Extend|https://goglucoextend.com/",
  "Synaptigen|https://getsynaptigen.com/",
  "Prosta Peak|https://prostapeak.com/",
  "Vertigenics|https://vertigenics.com/",
  "Arctic Blast|https://cb.getarcticblast.com/go/lander.php",
  "Nerve Fresh|https://sJointViveecure.nervefresh.com/index-is",
  "Ikaria Juice|https://theikariajuice.com/",
  "Finessa|https://myfinessa.com/",
  "Metabo Drops|https://www.metabodrops.com/",
  "JointVive|https://jointvive.com/",
  "HepatoBurn|https://www.hepatoburn.com/",
  "Biodentex|https://getbiodentex.com/",
  "GlucoBerry|https://bloodsugarberry.com/cb/",
  "Flush Factor Plus|https://flushfactorplus.com/text.php",
  "Balmorex Pro|https://balmorex.pro/",
  "Synogut|https://synogut101.com/",
  "NanoDefense Pro|https://nanodefensepro.com/",
  "NeuroQuiet|https://neuroquiethq.com/c/order-now.php",
  "Claritox Pro|https://claritox.com/",
  "Venoplus 8|https://cb.venoplus8.com/go/lander.php",
  "Joint N-11|https://freedomfromjointpain.net/cb/",
  "ZenCortex|https://zencortex24.com/c/order-now.php",
  "Zeneara|https://zeneara.com/",
  "Metanail|https://metanailcomplex.com/",
  "SugarMute|https://sugarnix.com/c/order-now.php",
  "Renew Dental Support|#",
  "Moringa Magic|https://www.moringa-magic.com/",
  "Resurge|https://resurge.com/",
  "CELLUCARE|https://getcellucare.com/c/order-now.php",
  "Peak BioBoost\u2122\ufe0f|https://www.mypeakbiome.com/w/prebio-lp-comp?",
  "CogniCare Pro|https://getcognipro.com/c/order-now.php",
  "Cardio Shield|https://getcardioshield.com/",
  "Gut Vita|https://www.gutvita.com/",
  "Longevity Activator|https://mylongevityactivator.com/cb/",
  "Vision 20|https://bestvisionsupport.com/cb/",
  "Nervovive|https://nervovive.com/",
  "MemoryFuel|https://thememoryfuel.com/",
  "TheyaVue|https://gettheyavue.com/",
  "VertiAid|https://vertiaid.com/",
  "Xitox\u2122\ufe0f Foot Pads|https://cb.getxitox.com/go/lander.php",
  "NuNerve|https://trynunerve.com/",
  "GlucoTonic|https://getglucotonic.com/c/order-now.php",
  "MenoRescue|https://menorescue.com/",
  "Prosta Defend|https://prostaflush.com/c/order-now.php",
  "DigestiStart - gut health & digestive health|#",
  "GlycoMute|https://sweetfend.com/c/order-now.php",
  "CogniSurge|https://thecognisurge.com/",
  "DigestSync|https://digestsync.com/",
  "GlucoTrust Bites|https://glucotrust-bites.com/",
  "The 20 flow|https://the20.store/",
  "NeuroVera|https://thenneurovera.com/",
  "GutOptim|https://gutoptim.com/text.php",
  "MindQuell|https://themindquell.com/",
  "Tea Burn|https://teaburn.com/",
  "Collagen Refresh|https://yourcollagensource.com/",
  "EyeFortin|https://eyefortin.com/",
  "Aquaburn|https://aquaburn.org/",
  "Nervala|https://nervala.com/",
  "Pawbiotix|https://getpawbiotix.com/",
  "GlycoFortin|https://glycofortin.com/",
  "Brain C-13|https://brainclarity.net/",
  "MitoThrive|https://youthfulagingsecret.com/",
  "Revive Daily|https://revive-daily.net/",
  "BIOptimizers|https://magbreakthrough.com/sleep/cb",
  "LungExpand Pro|https://lungexpandpro.com/",
  "Cogniclear|https://thecogniclear.com/",
  "Gluconite|https://gluconite.com/",
  "Bazopril|https://bazopril.com/",
  "Java Brain|https://www.java-brain.com/",
  "Pineal Pure|https://pinealpure.com/",
  "Tinnitus|#",
  "Chronoboost Pro|https://chronoboost.net/",
  "BIOFIT - weight loss|#",
  "MoveWell Daily|https://themovewelldaily.com/",
  "Gut Go|https://getgutgo.com/tsl/index_no_ds.php",
  "Keravita|https://getkeravitapro101.com/",
  "Blood Sugar Blaster|https://secure.bloodsugarblaster.com/index-cb",
  "Trimology - weight loss|#",
  "Joint Glide|https://getjointglide.com/",
  "Advanced Mitochondrial Formula|https://www.advancedbionutritionals.com/CB/Advanced-Mitochondrial/Too-Tired-To-Enjoy-It/HD.htm",
  "AquaPeace|https://getaquapeace.com/",
  "Gold Align|https://getgoldalign.com/",
  "SharpEar - Ear health & Auditory health|#",
  "ProMind Complex|https://promindcomplex.com/",
  "Nano-Ease|https://nanoease.com/",
  "Flexafen|https://cb.flexafen.com/go/indexwritten.php",
  "Prostastream|https://prostastream.com/",
  "CerebroZen|https://cerebrozen24.com/c/order-now.php",
  "SlimLeaf|https://getslimleaf.com/",
  "RegenVive|https://regainrejuvenate.com/c/order-now.php",
  "Echoxen|https://goechoxen.com/",
  "InsuLeaf|https://buyinsuleaf.com/",
  "Sync|https://www.sunlightloophole.com/",
  "Lanta Flat Belly Shake|https://flatbellyshake.com/",
  "Nervogen Pro|https://nervogen.com/",
  "HairFortin|https://hairfortin.net/",
  "MannaFlux|https://mannaflux.com/",
  "Rangii|https://rangii.com/",
  "HP9 Guard - Immune Defense Vitamins & Supplements|#",
  "Vitrafoxin|https://vitrafoxin.com/",
  "TerraCalm|https://getterracalm.com/",
  "KUNDALINIFLOW|https://kundaliniflow.co/",
  "VivoGut|https://getvivogutpro.com/",
  "Flexigenics|https://getflexigenics.com/",
  "SupraNail|https://getsupranail.com/",
  "VidaCalm|https://vidacalm.net/",
  "Leanotox|https://www.leanotox.com/",
  "Nerve Alive|#",
  "NitriLEAN|https://nitrilean.com/",
  "CognitiveFuel|https://thecognitivefuel.com/",
  "VitaNerve6 - Joint health|#",
  "Joint Eternal|https://jointeternal.com/",
  "BloodArmor|https://bloodarmor.net/bloodarmor-pv/",
  "Sonic Solace|https://sonicsolace.com/",
  "Arteris Plus|https://arterisplus.com/",
  "KeraBiotics|https://kerabiotics.com/",
  "Visium Plus|https://visiumplus.com/",
  "The Stem Cell Solution|https://www.stemcellsolution.info/",
  "Reliver Pro|https://www.reliverpro.com/",
  "Revitagut|https://revitagut.com/",
  "SlimRadiance|https://slimradiance.com/",
  "ReFirmance|https://refirmance.com/",
  "NeuroCalm Pro|https://neurocalmpro.com/",
  "HoneyBurn|https://honeyburn.com/"
]

categoryMapping = [
  { "id": 'weight-loss', "name": "Weight Loss", "list": weightLoss, "issue": "stubborn weight and metabolic slowdown" },
  { "id": 'dental-health', "name": "Dental Health", "list": dentalHealth, "issue": "gum disease, bad breath, and poor oral microbiome" },
  { "id": 'general', "name": "General", "list": general, "issue": "general wellness and biological aging" },
  { "id": 'mental-health', "name": "Mental Health", "list": mentalHealth, "issue": "brain fog, cognitive decline, and focus issues" },
  { "id": 'sleep-and-dreams', "name": "Sleep and Dreams", "list": sleepAndDreams, "issue": "insomnia and lack of deep REM sleep" },
  { "id": 'beauty', "name": "Beauty", "list": beauty, "issue": "premature aging, dermal breakdown, and hair thinning" },
  { "id": 'remedies', "name": "Remedies", "list": remedies, "issue": "neuropathy, chronic pain, and nerve degradation" },
  { "id": 'womens-health', "name": "Women's Health", "list": womensHealth, "issue": "hormonal imbalance, menopause symptoms, and systemic health" },
  { "id": 'mens-health', "name": "Men's Health", "list": mensHealth, "issue": "prostate enlargement, testoterone decline, and stamina loss" },
  { "id": 'dietary-supplements', "name": "Dietary Supplements", "list": dietarySupplements, "issue": "nutritional gaps and modern dietary stress" }
]

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def generateBlogContent(name, category, issue, link):
    return f"""
    <h2>Introduction</h2>
    <p>Dealing with {issue} can be an exhausting battle for millions of people worldwide. Traditional methods often fall short, leaving individuals frustrated and searching for alternative pathways to relief. Enter <strong>{name}</strong>—a specialized formulation that is quickly gaining traction in the natural health community.</p>
    
    <h2>What is {name}?</h2>
    <p><strong>{name}</strong> is a targeted dietary supplement built to address the root causes of {issue}. Unlike synthetic options that merely mask symptoms, this protocol focuses on restoring the body's natural balance. It is specifically formulated for adults looking for a non-invasive, habitual addition to their daily health regimen.</p>
    
    <h2>How It Works</h2>
    <p>The mechanism behind {name} relies on high-bioavailability extraction methods. By supplying the body with a concentrated dose of active botanicals and essential nutrients, the active ingredients enter the bloodstream rapidly. Once active, they help manage systemic inflammation and support normal biological function, thus mitigating the triggers of {issue}.</p>
    
    <h2>Key Ingredients</h2>
    <ul>
      <li><strong>Proprietary Adaptogens:</strong> Specifically chosen to manage physiological stress responses.</li>
      <li><strong>Antioxidant Complex:</strong> A high-potency blend to combat free radicals and cellular damage.</li>
      <li><strong>Essential Vitamins & Minerals:</strong> Foundational substrates required for enzymatic health signaling.</li>
      <li><strong>Bio-enhancers:</strong> Extracts optimized to ensure digestive absorption is maximized.</li>
    </ul>
    
    <h2>Benefits</h2>
    <ul>
      <li>Supports long-term goals relating to {category.lower()}.</li>
      <li>Enhances the body's natural defensive mechanisms.</li>
      <li>Helps mitigate the exhausting effects of {issue}.</li>
      <li>Manufactured in highly-regulated, sterile clinical environments.</li>
    </ul>
    
    <h2>How to Use</h2>
    <p>For optimal results, consistency is critical. It is generally recommended to take the suggested dose of {name} daily with a glass of water. Adhering to the protocol for at least 90 days allows the cumulative effects of the ingredients to saturize in the body's tissues.</p>
    
    <h2>Real User Results</h2>
    <p>Based on aggregated community feedback and preliminary trials, many users report noticing subtle improvements within the first 3-4 weeks. <em>"After struggling with {issue} for years, integrating {name} into my morning routine was a turning point. It didn't happen overnight, but week by week, things felt more manageable,"</em> notes a verified user. As always, individual results vary based on metabolic baselines.</p>
    
    <h2>Pricing & Availability</h2>
    <p>Given the rising popularity of {name}, counterfeit products have emerged on third-party marketplaces. To ensure purity and access to the 180-day money-back guarantee, consumers must purchase directly from the official website.</p>
    
    <h2>Final Verdict</h2>
    <p>{name} stands out as a promising, science-backed approach to managing {category.lower()}. Its commitment to natural ingredients and transparent manufacturing provides significant peace of mind. While not a magic pill, it is a highly viable tool for your daily protocol.</p>
    
    <div style="margin-top: 30px; text-align: center;">
      <a href="{link}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 15px 30px; background-color: #0052CC; color: white; border-radius: 12px; font-weight: bold; text-decoration: none;">Get Latest Price & Check Official Website</a>
    </div>
"""

globalId = 1
allProducts = []

for cat in categoryMapping:
    for itemStr in cat["list"]:
        parts = itemStr.split('|')
        name = parts[0]
        link = parts[1] if len(parts) > 1 else "#"
        slug = slugify(name)
        
        contentHtml = generateBlogContent(name, cat["name"], cat["issue"], link)
        rating = round(4.2 + random.random() * 0.7, 1)
        
        allProducts.append({
            "id": globalId,
            "name": name,
            "title": f"{name} Review 2026: Is It Worth It or Scam?",
            "category": cat["name"],
            "categorySlug": cat["id"],
            "slug": slug,
            "image": f"https://source.unsplash.com/800x600/?{cat['id']},health,supplement,bottle&{globalId}",
            "rating": rating,
            "metaTitle": f"{name} Review 2026 – Does It Really Work?",
            "metaDescription": f"Honest {name} review covering ingredients, benefits, pros & cons, and real results for individuals dealing with {cat['issue']}.",
            "keywords": [f"{name} review", f"{cat['name'].lower()} supplement", f"{name} results", "buy online"],
            "excerpt": f"Dealing with {cat['issue']}? Explore our comprehensive review of {name} to see if its natural ingredients live up to the clinical hype.",
            "content": contentHtml,
            "pros": ["Easy to incorporate into daily routine", "Uses scientifically backed natural ingredients", "Risk-free money-back guarantee"],
            "cons": ["Results can vary based on individual biology", "Only available for purchase online", "Premium price point compared to generic brands"],
            "buyUrl": link,
            "author": {
                "name": "Dr. Sarah Chen",
                "avatar": "/assets/images/doctor.png",
                "role": "Medical Reviewer"
            },
            "date": "updated Oct 20, 2023",
            "readTime": "8 min read",
            "product": {
                "name": name,
                "image": f"https://source.unsplash.com/800x600/?{cat['id']},health,supplement,product&{globalId}",
                "rating": rating,
                "price": "$59.00",
                "buyUrl": link
            }
        })
        globalId += 1

output_content = "export const generatedReviews = " + json.dumps(allProducts, indent=2) + ";\n"

output_path = os.path.join(os.path.dirname(__file__), '../src/data/generatedReviews.js')
os.makedirs(os.path.dirname(output_path), exist_ok=True)
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(output_content)

print(f"Successfully generated {len(allProducts)} reviews!")
