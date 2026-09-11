#!/usr/bin/env python3
import os
import zipfile

def make_clean_zip(output_filename='freeiqexam-website-clean.zip'):
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_path = os.path.join(project_root, output_filename)
    
    included_files = []
    root_configs = ['astro.config.mjs', 'package.json', 'package-lock.json', 'tsconfig.json']
    for rc in root_configs:
        full_p = os.path.join(project_root, rc)
        if os.path.exists(full_p):
            included_files.append((full_p, rc))
            
    for folder in ['src', 'public']:
        folder_path = os.path.join(project_root, folder)
        if not os.path.exists(folder_path):
            continue
        for root, dirs, files in os.walk(folder_path):
            for f in files:
                if f.startswith('.'):
                    continue
                full_p = os.path.join(root, f)
                rel_p = os.path.relpath(full_p, project_root).replace('\\', '/')
                included_files.append((full_p, rel_p))
                
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        for full_p, rel_p in included_files:
            zf.write(full_p, rel_p)
            
    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f'Archive created: {output_path} ({size_mb:.2f} MB, {len(included_files)} files)')
    return output_path

if __name__ == '__main__':
    make_clean_zip()
