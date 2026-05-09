content = open(r'C:\Users\Micro_Soft\Desktop\asim.ai\data\lessons.ts', encoding='utf-8').readlines()
agg_pattern = "matplotlib.use"
b64_pattern = 'PLOT_BASE64'
agg_lines = [i+1 for i,l in enumerate(content) if agg_pattern in l]
b64_lines = [i+1 for i,l in enumerate(content) if b64_pattern in l]
print(f"Total Agg setups: {len(agg_lines)}")
print(f"Total PLOT_BASE64 outputs: {len(b64_lines)}")
print("Agg lines:", agg_lines)
print("B64 lines:", b64_lines)
print()
for a in agg_lines:
    found = any(b > a and b < a+200 for b in b64_lines)
    if not found:
        print(f'MISSING PLOT_BASE64 after line {a}')
        for i in range(a-2, min(a+20, len(content))):
            print(f'  {i+1}: {content[i].rstrip()}')
        print()
