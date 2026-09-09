import os
import re
import json
from bs4 import BeautifulSoup, Comment

# Root directory of the project
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST_DIR = os.path.join(PROJECT_ROOT, "dist")
QUESTIONS_FILE = os.path.join(PROJECT_ROOT, "src", "data", "questions.ts")
OUTPUT_FILE = os.path.join(PROJECT_ROOT, "Scrachpad", "website_all_text_content.txt")

DOMAIN_INFO = {
    "matrix_reasoning": {
        "label": "Matrix Reasoning",
        "category": "Fluid Reasoning (Gf)",
        "prompt": "Select the missing piece that logically completes the 3x3 pattern:"
    },
    "cube_rotation": {
        "label": "3D Cube Rotation",
        "category": "Visual Processing (Gv)",
        "prompt": "Identify which comparison cube is a valid rigid 3D rotation of the target:"
    },
    "cube_nets": {
        "label": "Surface Folding (Cube Nets)",
        "category": "Visual Processing (Gv)",
        "prompt": "Identify which 3D cube is formed by folding this 2D net:"
    },
    "topological_series": {
        "label": "Topological Pattern Series",
        "category": "Fluid Reasoning (Gf)",
        "prompt": "Select the next logical step that completes this sequential pattern:"
    }
}

ORDERED_PAGES = [
    {"route": "/", "file": "index.html", "name": "Homepage"},
    {"route": "/test", "file": "test/index.html", "name": "Assessment Engine (Test)"},
    {"route": "/results", "file": "results/index.html", "name": "Results & Psychometric Report"},
    {"route": "/iq-score-chart", "file": "iq-score-chart/index.html", "name": "IQ Score Chart & Classifications"},
    {"route": "/iq-percentile-calculator", "file": "iq-percentile-calculator/index.html", "name": "IQ Percentile Calculator"},
    {"route": "/matrix-reasoning-test", "file": "matrix-reasoning-test/index.html", "name": "Matrix Reasoning Test Guide"},
    {"route": "/mensa-iq-test-practice", "file": "mensa-iq-test-practice/index.html", "name": "Mensa Practice Test Guide"},
    {"route": "/average-iq-by-age", "file": "average-iq-by-age/index.html", "name": "Average IQ by Age Guide"},
    {"route": "/methodology", "file": "methodology/index.html", "name": "Psychometric Methodology (2PL IRT)"},
    {"route": "/about", "file": "about/index.html", "name": "About Us"},
    {"route": "/contact", "file": "contact/index.html", "name": "Contact & Support"},
    {"route": "/privacy", "file": "privacy/index.html", "name": "Privacy Policy"},
    {"route": "/terms", "file": "terms/index.html", "name": "Terms of Service"},
    {"route": "/404", "file": "404.html", "name": "404 Error Page"}
]


def clean_text(text):
    """Normalize whitespace and ensure no em/en dashes."""
    if not text:
        return ""
    # Standardize whitespace
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n\s*\n+', '\n\n', text)
    text = text.strip()
    # Replace em-dashes and en-dashes with standard hyphens
    text = text.replace('\u2014', ' - ').replace('\u2013', ' - ')
    return text


def parse_questions_ts(file_path):
    """Parse question items from questions.ts."""
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the QUESTION_ITEMS array
    start_idx = content.find("export const QUESTION_ITEMS")
    if start_idx == -1:
        return []

    # Find each question block
    q_blocks = re.findall(r'\{\s*\"id\":\s*(\d+),\s*\"domain\":\s*\"([^\"]+)\"([\s\S]*?)(?=\{\s*\"id\":\s*\d+,\s*\"domain\"|\];\s*$)', content[start_idx:])
    
    questions = []
    for q_id, domain, body in q_blocks:
        q_id = int(q_id)
        
        # Difficulty b, discrimination a, explanation
        a_m = re.search(r'\"a\":\s*([0-9\.]+)', body)
        b_m = re.search(r'\"b\":\s*([-\d\.]+)', body)
        exp_m = re.search(r'\"explanation\":\s*\"([^\"]+)\"', body)
        
        a = float(a_m.group(1)) if a_m else 1.0
        b = float(b_m.group(1)) if b_m else 0.0
        explanation = clean_text(exp_m.group(1)) if exp_m else ""
        
        # Options
        opt_matches = re.findall(r'\{\s*\"id\":\s*(\d+),[\s\S]*?\"isCorrect\":\s*(true|false)(?:,\s*\"distractorType\":\s*\"([^\"]+)\")?', body)
        options = []
        for opt_id, is_correct, distractor in opt_matches:
            options.append({
                "id": int(opt_id),
                "is_correct": is_correct == "true",
                "distractor_type": distractor if distractor else ("Correct Answer" if is_correct == "true" else "Incorrect Alternative")
            })
            
        questions.append({
            "id": q_id,
            "domain": domain,
            "a": a,
            "b": b,
            "explanation": explanation,
            "options": options
        })
        
    return questions


def extract_html_content(file_path):
    """Extract clean readable text, headings, sections, and tables from HTML."""
    if not os.path.exists(file_path):
        return {"error": f"File not found: {file_path}"}

    with open(file_path, "r", encoding="utf-8") as f:
        html = f.read()

    soup = BeautifulSoup(html, "html.parser")

    # Extract metadata
    title = soup.title.string if soup.title else ""
    meta_desc = ""
    desc_tag = soup.find("meta", attrs={"name": "description"})
    if desc_tag and desc_tag.get("content"):
        meta_desc = desc_tag["content"]

    canonical = ""
    canon_tag = soup.find("link", attrs={"rel": "canonical"})
    if canon_tag and canon_tag.get("href"):
        canonical = canon_tag["href"]

    # Extract Schema LD+JSON
    schemas = []
    for s_tag in soup.find_all("script", attrs={"type": "application/ld+json"}):
        try:
            data = json.loads(s_tag.string)
            schemas.append(data)
        except Exception:
            pass

    # Remove non-content elements
    for el in soup(["script", "style", "svg", "noscript"]):
        el.decompose()
    for comment in soup.find_all(string=lambda s: isinstance(s, Comment)):
        comment.extract()

    # Extract main content
    main_el = soup.find("main") or soup.find("body")
    if not main_el:
        main_el = soup

    # Extract sections
    sections = []

    # Check for direct section or article elements
    sec_tags = main_el.find_all(["section", "article"])
    if not sec_tags:
        # Fallback to major div containers or main itself
        sec_tags = [main_el]

    for idx, sec in enumerate(sec_tags, 1):
        sec_headings = []
        for h in sec.find_all(["h1", "h2", "h3", "h4"]):
            h_text = clean_text(h.get_text())
            if h_text:
                sec_headings.append(f"[{h.name.upper()}] {h_text}")

        # Paragraphs & list items
        text_blocks = []
        for child in sec.find_all(["p", "ul", "ol", "table", "details", "blockquote"]):
            if child.name in ["ul", "ol"]:
                items = [f"  * {clean_text(li.get_text())}" for li in child.find_all("li") if clean_text(li.get_text())]
                if items:
                    text_blocks.append("\n".join(items))
            elif child.name == "table":
                rows = []
                for tr in child.find_all("tr"):
                    cells = [clean_text(cell.get_text()) for cell in tr.find_all(["th", "td"])]
                    if cells:
                        rows.append(" | ".join(cells))
                if rows:
                    text_blocks.append("\n[TABLE DATA]:\n" + "\n".join(rows))
            elif child.name == "details":
                summary = child.find("summary")
                sum_text = clean_text(summary.get_text()) if summary else "FAQ"
                content = clean_text(child.get_text())
                if sum_text in content:
                    content = content.replace(sum_text, "", 1).strip()
                text_blocks.append(f"[FAQ QUESTION]: {sum_text}\n[ANSWER]: {content}")
            else:
                p_text = clean_text(child.get_text())
                if p_text and len(p_text) > 3:
                    text_blocks.append(p_text)

        # Buttons / CTAs
        ctas = []
        for btn in sec.find_all(["a", "button"]):
            b_text = clean_text(btn.get_text())
            href = btn.get("href", "")
            if b_text and len(b_text) > 2 and ("btn" in btn.get("class", []) or "button" in btn.get("class", []) or "rounded" in btn.get("class", [])):
                ctas.append(f"[ACTION / LINK]: \"{b_text}\" -> {href}" if href else f"[BUTTON]: \"{b_text}\"")

        # Deduplicate text blocks
        deduped_blocks = []
        seen = set()
        for b in text_blocks:
            if b not in seen:
                seen.add(b)
                deduped_blocks.append(b)

        if sec_headings or deduped_blocks:
            sections.append({
                "index": idx,
                "headings": sec_headings,
                "blocks": deduped_blocks,
                "ctas": ctas[:5] # limit top CTAs
            })

    return {
        "title": clean_text(title),
        "description": clean_text(meta_desc),
        "canonical": canonical,
        "schemas": schemas,
        "sections": sections
    }


def generate_site_tree_text():
    """Build the comprehensive text file."""
    lines = []

    def p(text=""):
        lines.append(clean_text(text))

    def sep(char="=", length=80):
        lines.append(char * length)

    sep("=")
    p("FREEIQEXAM.COM - COMPLETE WEBSITE CONTENT & SITE-TREE ARCHIVE")
    p("Website: https://freeiqexam.com")
    p("Extracted Text Content (User-Facing Copy, Headings, Sections & Psychometric Test Items)")
    p("Note: Codebase syntax, markup tags, scripts, and CSS are excluded. Clean text only.")
    sep("=")
    p()

    # SECTION 1: SITEMAP TREE
    sep("-")
    p("1. SITE STRUCTURE & TREE HIERARCHY")
    sep("-")
    p("Total Public Pages: 14 Static HTML Routes")
    p("Assessment Item Bank: 24 Psychometric Non-Verbal Cognitive Items")
    p()
    p("SITE MAP TREE:")
    p("FreeIQExam.com (Root)")
    p("├── 1. / (Homepage: Assessment Landing, Method Overview, IQ Bell Curve, FAQs)")
    p("├── 2. /test (Interactive 24-Item Timed Assessment Interface)")
    p("│   ├── Part 1: Fluid Reasoning (Gf) - 15 Items (Matrix Reasoning & Topological Series)")
    p("│   └── Part 2: Visual Processing (Gv) - 9 Items (3D Cube Rotation & Surface Folding Nets)")
    p("├── 3. /results (Normative Score Report, 2PL IRT Ability Theta, Percentile & Domain Breakdown)")
    p("├── 4. /iq-score-chart (IQ Score Classification Chart, Standard Deviations & WAIS-IV Percentiles)")
    p("├── 5. /iq-percentile-calculator (Interactive Mean=100 SD=15 Statistical Percentile Tool)")
    p("├── 6. /matrix-reasoning-test (Comprehensive Guide to 3x3 Matrix Fluid Reasoning Tests)")
    p("├── 7. /mensa-iq-test-practice (High-Range Practice Guide, Top 2% Cutoff Standards)")
    p("├── 8. /average-iq-by-age (Developmental Trajectory & Flynn Effect Analysis)")
    p("├── 9. /methodology (Psychometric Whitepaper: 2PL IRT Calibration & Standardization)")
    p("├── 10. /about (Mission, Scientific Advisory, Psychometric Integrity Standards)")
    p("├── 11. /contact (Inquiries, Research Partnerships & Support)")
    p("├── 12. /privacy (Privacy Policy, Zero-PII Data Retention, GDPR/CCPA Compliance)")
    p("├── 13. /terms (Terms of Service, Intellectual Property & Educational Disclaimer)")
    p("└── 14. /404 (Distraction-Free 404 Error Recovery Page)")
    p()

    # SECTION 2: GLOBAL COMPONENTS
    sep("-")
    p("2. GLOBAL REUSABLE COMPONENTS (Header & Footer Content)")
    sep("-")
    p("[GLOBAL HEADER NAVIGATION]")
    p("Brand: FreeIQExam")
    p("Primary Navigation Links:")
    p("  * Take Test -> /test")
    p("  * Score Chart -> /iq-score-chart")
    p("  * Percentile Calculator -> /iq-percentile-calculator")
    p("  * Methodology -> /methodology")
    p("  * About -> /about")
    p("CTA Button: 'Start Free Exam' -> /test")
    p()
    p("[GLOBAL FOOTER]")
    p("Brand Summary: Standardized 24-item non-verbal fluid intelligence assessment built on 2-Parameter Logistic Item Response Theory.")
    p("Footer Navigation Columns:")
    p("  Column 1: Assessment & Tools")
    p("    * Free IQ Test (/test)")
    p("    * Results Evaluation (/results)")
    p("    * IQ Score Chart (/iq-score-chart)")
    p("    * Percentile Calculator (/iq-percentile-calculator)")
    p("  Column 2: Study Guides & Norms")
    p("    * Matrix Reasoning Guide (/matrix-reasoning-test)")
    p("    * Mensa Practice Guide (/mensa-iq-test-practice)")
    p("    * Average IQ by Age (/average-iq-by-age)")
    p("    * Psychometric Methodology (/methodology)")
    p("  Column 3: Organization & Trust")
    p("    * About FreeIQExam (/about)")
    p("    * Contact Support (/contact)")
    p("    * Privacy Policy (/privacy)")
    p("    * Terms of Service (/terms)")
    p("Scientific Notice: FreeIQExam.com operates as an educational non-verbal cognitive assessment tool. It does not replace supervised clinical neuro-psychological evaluations.")
    p("Copyright: (c) 2026 FreeIQExam.com. All rights reserved.")
    p()

    # SECTION 3: PAGE-BY-PAGE DETAILED TEXT
    sep("-")
    p("3. PAGE-BY-PAGE DETAILED TEXT CONTENT")
    sep("-")
    p()

    for page_idx, page in enumerate(ORDERED_PAGES, 1):
        file_path = os.path.join(DIST_DIR, page["file"])
        page_data = extract_html_content(file_path)

        sep("=")
        p(f"PAGE {page_idx} OF {len(ORDERED_PAGES)}: {page['name'].upper()}")
        p(f"URL Route: {page['route']}")
        p(f"Static Source: dist/{page['file']}")
        sep("=")

        if "error" in page_data:
            p(f"[ERROR]: {page_data['error']}")
            p()
            continue

        p(f"PAGE TITLE: {page_data['title']}")
        p(f"META DESCRIPTION: {page_data['description']}")
        if page_data["canonical"]:
            p(f"CANONICAL URL: {page_data['canonical']}")

        if page_data["schemas"]:
            p("STRUCTURED DATA (Schema.org):")
            for sc in page_data["schemas"]:
                if isinstance(sc, list):
                    for item in sc:
                        if isinstance(item, dict):
                            p(f"  * Type: {item.get('@type', 'Schema')} | Name: {item.get('name', '')}")
                elif isinstance(sc, dict):
                    p(f"  * Type: {sc.get('@type', 'Schema')} | Name: {sc.get('name', '')}")
        p()

        p("[SECTION BREAKDOWN & BODY COPY]:")
        p()

        for sec in page_data["sections"]:
            p(f"--- Section {sec['index']} ---")
            if sec["headings"]:
                for h in sec["headings"]:
                    p(h)
                p()

            if sec["blocks"]:
                for b in sec["blocks"]:
                    p(b)
                    p()

            if sec["ctas"]:
                p("Interactive Elements & Buttons:")
                for cta in sec["ctas"]:
                    p(f"  {cta}")
                p()

        # SPECIAL INJECTION FOR /test: ADD ALL 24 PSYCHOMETRIC TEST ITEMS
        if page["route"] == "/test":
            p()
            sep("*")
            p("COMPLETE TEST ITEM BANK - ALL 24 NON-VERBAL QUESTIONS & OPTIONS")
            sep("*")
            p("Psychometric Model: 2-Parameter Logistic (2PL) Item Response Theory (IRT)")
            p("Timing: Timed 20 Minutes (1200 Seconds)")
            p("Domains: Fluid Reasoning (Gf) & Visual Processing (Gv)")
            p()

            questions = parse_questions_ts(QUESTIONS_FILE)
            for q in questions:
                d_info = DOMAIN_INFO.get(q["domain"], {
                    "label": q["domain"],
                    "category": "Cognitive Ability",
                    "prompt": "Select the correct option:"
                })

                p(f"--------------------------------------------------------------------------------")
                p(f"QUESTION {q['id']} OF 24")
                p(f"Domain: {d_info['label']} | Factor: {d_info['category']}")
                p(f"Prompt Instruction: {d_info['prompt']}")
                p(f"Psychometric Parameters: Difficulty (b) = {q['b']:+.2f} | Discrimination (a) = {q['a']:.2f}")
                p(f"Explanation & Solution Logic: {q['explanation']}")
                p()
                p(f"Available Options (6 Choices):")
                for opt in q["options"]:
                    status = "CORRECT ANSWER [Key]" if opt["is_correct"] else f"Distractor ({opt['distractor_type']})"
                    p(f"  Choice {opt['id']}: {status}")
                p()

        p()

    # Summary footer
    sep("=")
    p("END OF CONTENT ARCHIVE - FREEIQEXAM.COM")
    sep("=")

    full_output = "\n".join(lines)
    # Final safety check: clean any remaining en/em dashes
    full_output = full_output.replace('\u2014', ' - ').replace('\u2013', ' - ')

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(full_output)

    word_count = len(full_output.split())
    line_count = len(lines)
    print(f"Extraction successful!")
    print(f"Output File: {OUTPUT_FILE}")
    print(f"Total Lines: {line_count:,}")
    print(f"Total Words: {word_count:,}")
    print(f"File Size: {len(full_output.encode('utf-8')) / 1024:.1f} KB")


if __name__ == "__main__":
    generate_site_tree_text()
