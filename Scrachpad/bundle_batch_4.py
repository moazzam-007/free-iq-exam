import os
import json

workspace_root = r"e:\Antigravity\freeiqexam.com"
output_path = os.path.join(workspace_root, "Scrachpad", "BATCH_4_GAMES_AND_SAMPLES_BUNDLE.txt")

files_to_bundle = [
    ("src/pages/games.astro", "Cognitive Mini-Games Hub"),
    ("src/pages/games/n-back.astro", "Dual N-Back Working Memory Game"),
    ("src/pages/games/rotation.astro", "Mental Rotation Visual-Spatial Game"),
    ("src/pages/games/math-sprint.astro", "Working Memory Speed Calculation Game"),
    ("src/pages/games/symbol-match.astro", "Processing Speed Symbol Search Game"),
    ("src/pages/games/syllogism.astro", "Deductive Syllogism Reasoning Game"),
]

with open(output_path, "w", encoding="utf-8") as out_f:
    out_f.write("================================================================================\n")
    out_f.write("FREEIQEXAM.COM - BATCH 4: COGNITIVE MINI-GAMES SUITE & ITEM BANK SAMPLE\n")
    out_f.write("================================================================================\n\n")

    for rel_path, title in files_to_bundle:
        full_path = os.path.join(workspace_root, rel_path)
        out_f.write(f"\n{'#' * 80}\n")
        out_f.write(f"# FILE: {rel_path} ({title})\n")
        out_f.write(f"# ABSOLUTE PATH: {full_path}\n")
        out_f.write(f"{'#' * 80}\n\n")
        if os.path.exists(full_path):
            with open(full_path, "r", encoding="utf-8") as in_f:
                out_f.write(in_f.read())
                out_f.write("\n\n")
        else:
            out_f.write(f"[ERROR: File not found at {full_path}]\n\n")

    # Append first 3 items from item-bank.json as sample
    item_bank_path = os.path.join(workspace_root, "src", "data", "item-bank.json")
    out_f.write(f"\n{'#' * 80}\n")
    out_f.write(f"# SAMPLE DATA: src/data/item-bank.json (First 3 Items with promptSvg & options)\n")
    out_f.write(f"# ABSOLUTE PATH: {item_bank_path}\n")
    out_f.write(f"{'#' * 80}\n\n")
    if os.path.exists(item_bank_path):
        with open(item_bank_path, "r", encoding="utf-8") as in_f:
            data = json.load(in_f)
            sample_items = data[:3]
            out_f.write(json.dumps(sample_items, indent=2))
            out_f.write("\n\n")

print(f"Bundle successfully created at: {output_path}")
