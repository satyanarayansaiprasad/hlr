import json
import os
import re

# Directory where images are stored
ASSETS_DIR = 'client/src/assets/hlr'
DATA_FILE = 'client/src/data/generatedReviews.js'

def normalize(name):
    # Remove special characters and common suffixes
    name = name.lower()
    name = re.sub(r'™|®|©', '', name)
    name = re.sub(r' - (weight loss|dental health|general|mental health|sleep and dreams|beauty|remedies|women\'s health|men\'s health|dietary supplements)', '', name)
    # Remove all non-alphanumeric except spaces for initial match
    clean_name = re.sub(r'[^a-z0-9 ]', '', name).strip()
    return clean_name

def strict_normalize(name):
    # Remove everything but letters and numbers
    return re.sub(r'[^a-z0-9]', '', name.lower())

def main():
    # 1. Get all image files from the directory
    if not os.path.exists(ASSETS_DIR):
        print(f"Directory {ASSETS_DIR} does not exist.")
        return

    image_files = [f for f in os.listdir(ASSETS_DIR) if os.path.isfile(os.path.join(ASSETS_DIR, f)) and not f.startswith('.')]
    
    # 2. Build a mapping of normalized names to image filenames
    image_map = {}
    for img in image_files:
        name_part = os.path.splitext(img)[0]
        image_map[strict_normalize(name_part)] = img
    
    # Hardcoded overrides for specific cases
    overrides = {
        strict_normalize("Xitox™️ Foot Pads"): "xitoximage.png",
        strict_normalize("Xitox Foot Pads"): "xitoximage.png",
        strict_normalize("synevra ultralift"): "synevra ultralift.png",
        strict_normalize("prostapure 24"): "prostapure 24.png",
        strict_normalize("Biofit"): "BIOFIT - weight loss.jpeg",
        strict_normalize("DigestiStart"): "DigestiStart - gut health & digestive health.png",
        strict_normalize("SharpEar"): "SharpEar - Ear health & Auditory health.webp",
        strict_normalize("VitaNerve6"): "VitaNerve6 - Joint health.webp",
        strict_normalize("club house stud"): "club house stud.webp",
        strict_normalize("Peak BioBoost"): "Peak BioBoost.png",
    }
    
    for key, val in overrides.items():
        image_map[key] = val

    # 3. Read the data file
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match the entire array
    match = re.search(r'export const generatedReviews = (\[.*\]);', content, re.DOTALL)
    if not match:
        print("Could not find generatedReviews array in target file.")
        return

    try:
        reviews = json.loads(match.group(1))
    except Exception as e:
        print(f"Error parsing JSON: {e}")
        return

    # 4. Process each review
    updated_count = 0
    missing_count = 0
    
    for review in reviews:
        product_name = review.get('name', '')
        norm_name = strict_normalize(product_name)
        
        found_img = None
        
        # Try exact match
        if norm_name in image_map:
            found_img = image_map[norm_name]
        else:
            # Try fuzzy match (contains)
            for key in image_map:
                if key in norm_name or norm_name in key:
                    found_img = image_map[key]
                    break
        
        if found_img:
            img_path = f"/src/assets/hlr/{found_img}"
            review['image'] = img_path
            if 'product' in review:
                review['product']['image'] = img_path
            updated_count += 1
        else:
            # Keep existing image (if it's already a valid external URL or placeholder)
            if review.get('image', '').startswith('/src/assets/'):
                 # It was already mapped to something local but maybe wrong? 
                 # Let's keep it for now if we didn't find a better one.
                 pass
            missing_count += 1
            print(f"MISSING: {product_name}")

    # 5. Write back
    updated_json = json.dumps(reviews, indent=2)
    updated_content = f"export const generatedReviews = {updated_json};\n"
    
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(updated_content)

    print(f"\nSummary:")
    print(f"Total reviews: {len(reviews)}")
    print(f"Successfully mapped: {updated_count}")
    print(f"Missing images: {missing_count}")

if __name__ == "__main__":
    main()
