import urllib.request
import re
import json
import os
import ssl
import time

def extract_image(url):
    print(f"Scraping: {url}")
    if url == "#":
        return None
        
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
    }
    
    # disable SSL verification strictly for affiliate sites with weird certs
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    try:
        req = urllib.request.Request(url, headers=headers)
        # Timeout lowered to 5 secs so we don't hang over 147 products
        with urllib.request.urlopen(req, context=ctx, timeout=5) as response:
            html = response.read().decode('utf-8', errors='ignore')
            
            # Find og:image
            og_match = re.search(r'<meta.*?property=["\']?og:image["\']?.*?content=["\']([^"\']+)["\']', html, re.IGNORECASE)
            if not og_match:
                # Some sites write content first
                og_match = re.search(r'<meta.*?content=["\']([^"\']+)["\'].*?property=["\']?og:image["\']?', html, re.IGNORECASE)
                
            if og_match:
                img_url = og_match.group(1).strip()
                # Ensure it's absolute
                if img_url.startswith('/'):
                    match_domain = re.search(r'^(https?://[^/]+)', url)
                    if match_domain:
                        img_url = match_domain.group(1) + img_url
                print(f" -> Found open graph: {img_url}")
                return img_url
            else:
                # Try to extract the first large non-logo image maybe?
                img_match = re.search(r'<img.*?src=["\'](.*?product.*?\.(?:jpg|png|webp))["\']', html, re.IGNORECASE)
                if img_match:
                    img_url = img_match.group(1).strip()
                    if img_url.startswith('/'):
                        match_domain = re.search(r'^(https?://[^/]+)', url)
                        if match_domain:
                            img_url = match_domain.group(1) + img_url
                    print(f" -> Found product image: {img_url}")
                    return img_url
                    
            print(" -> No clear image found")
            return None
    except Exception as e:
        print(f" -> Error: {e}")
        return None

def main():
    file_path = os.path.join(os.path.dirname(__file__), '../src/data/generatedReviews.js')
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Extract JSON part
    prefix = "export const generatedReviews = "
    if not content.startswith(prefix):
        print("Error: JS file format unrecognized.")
        return
        
    # Strip suffix semicolon
    json_str = content[len(prefix):].strip()
    if json_str.endswith(';'):
        json_str = json_str[:-1]
        
    data = json.loads(json_str)
    
    updated_count = 0
    for item in data:
        url = item.get("buyUrl")
        if url and url != "#":
            img = extract_image(url)
            if img:
                item["image"] = img
                item["product"]["image"] = img
                updated_count += 1
            # Add short sleep to not trigger mass ban
            time.sleep(0.2)
            
    # Write back
    new_content = prefix + json.dumps(data, indent=2) + ";\n"
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print(f"\nFinished! Found official images for {updated_count} out of {len(data)} products.")

if __name__ == "__main__":
    main()
