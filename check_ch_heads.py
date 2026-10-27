with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for ch_num in [3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14]:
    prefix = f'id="page-ch{ch_num}"'
    start_line = None
    for i, line in enumerate(lines):
        if prefix in line:
            start_line = i
            break
    if start_line is not None:
        print(f"\n--- Chapter {ch_num} (around line {start_line+1}) ---")
        for j in range(start_line, min(start_line + 45, len(lines))):
            print(f"{j+1}: {lines[j].rstrip()}")
