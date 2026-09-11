#!/usr/bin/env python3
import os

def create_indonesia_bundle(
    src_dir='Scrachpad/indonesia-subfolder-build',
    out_md='Scrachpad/indonesia-subfolder-bundle.md'
):
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    target_dir = os.path.join(project_root, src_dir)
    md_full = os.path.join(project_root, out_md)

    if not os.path.exists(target_dir):
        print('Source directory not found:', target_dir)
        return

    collected_files = []
    for root, dirs, files in os.walk(target_dir):
        for f in files:
            if f.endswith(('.astro', '.ts', '.json', '.py')) and not f.startswith('build_batch'):
                full_path = os.path.join(root, f)
                rel_path = os.path.relpath(full_path, target_dir).replace('\\', '/')
                collected_files.append((rel_path, full_path))

    collected_files.sort(key=lambda x: x[0])

    lines = []
    lines.append('# Indonesian Subfolder Localization Build (/id/) — Complete Codebase Bundle')
    lines.append('# Project: FreeIQExam.com')
    lines.append('# Source Directory: Scrachpad/indonesia-subfolder-build/')
    lines.append('')
    lines.append('================================================================================')
    lines.append('DIRECTORY STRUCTURE & TABLE OF CONTENTS')
    lines.append('================================================================================')
    
    total_bytes = 0
    for rel_path, full_path in collected_files:
        size_kb = os.path.getsize(full_path) / 1024
        total_bytes += os.path.getsize(full_path)
        lines.append(f'  - {rel_path} ({size_kb:.1f} KB)')

    lines.append('')
    lines.append(f'Total Files: {len(collected_files)} | Total Size: {total_bytes / (1024*1024):.2f} MB')
    lines.append('')
    lines.append('================================================================================')
    lines.append('COMPLETE SOURCE CODE & DATA TEMPLATES')
    lines.append('================================================================================')
    lines.append('')

    for rel_path, full_path in collected_files:
        lines.append('================================================================================')
        lines.append(f'FILE: {rel_path}')
        lines.append('================================================================================')
        try:
            with open(full_path, 'r', encoding='utf-8', errors='replace') as fp:
                content = fp.read()
            lines.append(content)
        except Exception as e:
            lines.append(f'[Error reading file: {e}]')
        lines.append('')
        lines.append('')

    full_content = '\n'.join(lines)

    with open(md_full, 'w', encoding='utf-8') as out_f:
        out_f.write(full_content)

    size_mb = os.path.getsize(md_full) / (1024 * 1024)
    print(f'Successfully generated {out_md}: {len(collected_files)} files bundled ({size_mb:.2f} MB)')

if __name__ == '__main__':
    create_indonesia_bundle()
