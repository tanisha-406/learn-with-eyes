with open('app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'initChapterPreviewModal' in line:
        print(f"Line {i+1}: {line.strip()}")
        # print next 30 lines
        for j in range(i, min(i+40, len(lines))):
            print(f"  {j+1}: {lines[j].rstrip()}")
        break
