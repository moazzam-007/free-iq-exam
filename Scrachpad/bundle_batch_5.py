import os

workspace_root = r"e:\Antigravity\freeiqexam.com"
output_path = os.path.join(workspace_root, "Scrachpad", "BATCH_5_ALL_REMAINING_PAGES_BUNDLE.txt")

files_to_bundle = [
    ("src/pages/index.astro", "Homepage Landing & Core Funnel"),
    ("src/pages/methodology.astro", "Academic Methodology & 2PL IRT Validation"),
    ("src/pages/practice.astro", "Cognitive Practice Hub & Domain Filter"),
    ("src/pages/leaderboard.astro", "Global Cognitive Leaderboard & Standings"),
    ("src/pages/blog.astro", "Psychometric Research & Cognitive Science Blog"),
    ("src/pages/iq-classification-scale.astro", "Pillar Guide: IQ Classification Scale"),
    ("src/pages/high-iq-societies.astro", "Pillar Guide: High IQ Societies & Cutoffs"),
    ("src/pages/iq-score-chart.astro", "Reference Tool: IQ Score Chart & Bell Curve"),
    ("src/pages/iq-percentile-calculator.astro", "Interactive Tool: IQ Percentile Calculator"),
    ("src/pages/average-iq-by-age.astro", "Pillar Guide: Average IQ by Age & Demographics"),
    ("src/pages/matrix-reasoning-test.astro", "Practice Guide: Matrix Reasoning Test"),
    ("src/pages/mensa-iq-test-practice.astro", "Practice Guide: Mensa IQ Test Practice"),
    ("src/pages/spatial-reasoning-test.astro", "Domain Test: Visual-Spatial (Gv)"),
    ("src/pages/quantitative-reasoning-test.astro", "Domain Test: Quantitative Reasoning (Gq)"),
    ("src/pages/verbal-reasoning-test.astro", "Domain Test: Verbal Comprehension (Gc)"),
    ("src/pages/about.astro", "Institutional About & Psychometric Standards"),
    ("src/pages/contact.astro", "Academic Inquiries & Institutional Contact"),
    ("src/pages/privacy.astro", "Privacy Policy & GDPR/CCPA Compliance"),
    ("src/pages/terms.astro", "Terms of Service & Assessment Disclaimer"),
    ("src/pages/404.astro", "Custom Error 404 Recovery Page"),
]

with open(output_path, "w", encoding="utf-8") as out_f:
    out_f.write("================================================================================\n")
    out_f.write("FREEIQEXAM.COM - BATCH 5 (FINAL BATCH): ALL 20 REMAINING SITE PAGES\n")
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

print(f"Comprehensive Batch 5 bundle successfully created at: {output_path}")
print(f"Total files bundled: {len(files_to_bundle)}")
