import re
import os

DATA_FILE = 'client/src/data/generatedReviews.js'
OUTPUT_FILE = 'client/src/data/generatedReviews.js'

def main():
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define the IDs to comment out
    missing_ids = [6, 10, 75, 96, 113, 114, 116, 135, 136, 148, 155, 156, 163, 180, 199, 219, 228, 229, 230, 242]
    
    # We will iterate through each object in the array and comment it out if its ID matches
    # Since the file is structured as [ { ... }, { ... } ]
    # We can use regex to find each object block
    
    def comment_review(match):
        obj_text = match.group(0)
        # Check if the ID is in our list
        id_match = re.search(r'"id":\s*(\d+)', obj_text)
        if id_match:
            obj_id = int(id_match.group(1))
            if obj_id in missing_ids:
                print(f"Commenting out ID: {obj_id}")
                # Wrap in comments and handle the trailing comma inside or outside
                # Usually it's safer to comment the whole block from { to } inclusive
                return f"/* {obj_text} */"
        return obj_text

    # Regex to match each object in the array. 
    # It starts with { at indentation of 2 spaces, and ends with } at indentation of 2 spaces, optionally followed by a comma.
    new_content = re.sub(r'  \{\s+?"id":\s*(\d+),.*?\n  \}(?:,)?', comment_review, content, flags=re.DOTALL)

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("Finished commenting out missing reviews.")

if __name__ == "__main__":
    main()
