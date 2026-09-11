#!/usr/bin/env python3
import os
import zipfile

def create_bundle(zip_path='freeiqexam-website-clean.zip', out_md='freeiqexam-codebase-bundle.md', out_txt='freeiqexam-codebase-bundle.txt'):
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    zip_full = os.path.join(project_root, zip_path)
    md_full = os.path.join(project_root, out_md)
    txt_full = os.path.join(project_root, out_txt)
    
    if not os.path.exists(zip_full):
        print('Zip not found:', zip_full)
        return
        
    lines = []
    lines.append('# FreeIQExam Complete Codebase Bundle')
    lines.append('# Multi-Page Astro 5 + Tailwind 4 Cognitive Assessment Platform')
    lines.append('# Generated from: ' + zip_path)
    lines.append('')
    lines.append('================================================================================')
    lines.append('DIRECTORY STRUCTURE & TABLE OF CONTENTS')
    lines.append('================================================================================')
    
    with zipfile.ZipFile(zip_full, 'r') as zf:
        namelist = sorted(zf.namelist())
        for name in namelist:
            info = zf.getinfo(name)
            lines.append(f'  - {name} ({info.file_size / 1024:.1f} KB)')
        lines.append('')
        lines.append('================================================================================')
        lines.append('SOURCE CODE FILES')
        lines.append('================================================================================')
        lines.append('')
        
        for name in namelist:
            info = zf.getinfo(name)
            lines.append('================================================================================')
            lines.append(f'FILE: {name}')
            lines.append('================================================================================')
            if name.endswith(('.png', '.ico')):
                lines.append(f'[Binary Asset File: {name}, Size: {info.file_size} bytes - Excluded from plain text]')
            else:
                try:
                    content = zf.read(name).decode('utf-8', errors='replace')
                    lines.append(content)
                except Exception as e:
                    lines.append(f'[Error reading file: {e}]')
            lines.append('')
            lines.append('')
            
    full_content = '\n'.join(lines)
    
    with open(md_full, 'w', encoding='utf-8') as f:
        f.write(full_content)
    size_md = os.path.getsize(md_full) / (1024 * 1024)
    print(f'Created {out_md} ({size_md:.2f} MB)')
    
    with open(txt_full, 'w', encoding='utf-8') as f:
        f.write(full_content)
    size_txt = os.path.getsize(txt_full) / (1024 * 1024)
    print(f'Created {out_txt} ({size_txt:.2f} MB)')

if __name__ == '__main__':
    create_bundle()
