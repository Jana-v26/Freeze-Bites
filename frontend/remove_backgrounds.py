import os
from rembg import remove

src_dir = r"e:\Android Studio Projects\freeze-dance\frontend\public\images\products"

for filename in os.listdir(src_dir):
    if filename.endswith(".png"):
        file_path = os.path.join(src_dir, filename)
        print(f"Processing {filename}...")
        try:
            with open(file_path, "rb") as f:
                input_img = f.read()
                
            output_img = remove(input_img)
            
            with open(file_path, "wb") as f:
                f.write(output_img)
                
            print(f"Successfully processed {filename}")
        except Exception as e:
            print(f"Failed to process {filename}: {e}")
