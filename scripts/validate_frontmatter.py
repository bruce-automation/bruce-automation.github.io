#!/usr/bin/env python3
import os
import sys
import re
from datetime import datetime

try:
    import yaml
except Exception:
    print("Missing dependency: pyyaml. Install with: pip install pyyaml", file=sys.stderr)
    sys.exit(2)

REQUIRED = ["title", "description", "date", "categories", "tags"]

def load_frontmatter(text: str):
    if not text.startswith('---'):
        return None, text
    parts = text.split('---', 2)
    if len(parts) < 3:
        return None, text
    fm = yaml.safe_load(parts[1]) or {}
    body = parts[2]
    return fm, body

def check_post(path: str):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    fm, body = load_frontmatter(text)
    if fm is None:
        return [f"{path}: missing front matter"]

    errs = []
    for k in REQUIRED:
        if k not in fm:
            errs.append(f"{path}: missing '{k}'")

    title = str(fm.get('title',''))
    desc = str(fm.get('description',''))
    if not (10 <= len(title) <= 90):
        errs.append(f"{path}: title length should be 10..90 (got {len(title)})")
    if not (50 <= len(desc) <= 200):
        errs.append(f"{path}: description length should be 50..200 (got {len(desc)})")

    date = fm.get('date')
    try:
        datetime.fromisoformat(str(date))
    except Exception:
        errs.append(f"{path}: date not iso-like: {date}")

    if re.search(r'^#\\s+.+', body, flags=re.M):
        errs.append(f"{path}: contains H1 in body (# ...). Use H2/H3.")

    for arr in ['categories', 'tags']:
        v = fm.get(arr)
        if not isinstance(v, list):
            errs.append(f"{path}: '{arr}' should be a YAML list")

    return errs

def main():
    root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    posts_dir = os.path.join(root, '_posts')
    all_errs = []

    for dirpath, _, filenames in os.walk(posts_dir):
        for fn in filenames:
            if fn.endswith('.md'):
                all_errs += check_post(os.path.join(dirpath, fn))

    if all_errs:
        print('\\n'.join(all_errs))
        sys.exit(1)

    print('frontmatter_ok')

if __name__ == '__main__':
    main()
