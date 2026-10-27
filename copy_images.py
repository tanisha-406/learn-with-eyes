import os
import shutil
import glob

artifact_dir = r"C:\Users\TANISHA\.gemini\antigravity-ide\brain\791077fe-d5fb-4b31-9af7-738a7ded2f9d"
target_dir = r"d:\IIT\Anushruti project\images"

mapping = {
    "animals_habitats": "animals_habitats.png",
    "skeletal_system": "skeletal_system.png",
    "nervous_system": "nervous_system.png",
    "states_of_matter": "states_of_matter.png",
    "air_and_water": "air_and_water.png",
    "soil_conservation": "soil_conservation.png",
    "rocks_minerals": "rocks_minerals.png",
    "solar_system": "solar_system.png",
    "natural_disasters": "natural_disasters.png",
    "our_environment": "our_environment.png",
    "safety_first_aid": "safety_first_aid.png"
}

for prefix, dest_name in mapping.items():
    matches = glob.glob(os.path.join(artifact_dir, f"{prefix}*.*"))
    if matches:
        # Sort by creation time to get newest
        matches.sort(key=os.path.getmtime, reverse=True)
        src = matches[0]
        dest = os.path.join(target_dir, dest_name)
        shutil.copyfile(src, dest)
        print(f"Copied {os.path.basename(src)} -> {dest_name}")
    else:
        print(f"Warning: No match found for {prefix}")
