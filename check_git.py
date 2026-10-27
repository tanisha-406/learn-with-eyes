import subprocess

res = subprocess.run(["git", "log", "-n", "6", "--oneline"], capture_output=True, text=True)
print(res.stdout)

for commit in ["e1ef596", "fa55661", "b8d559d", "0821b0a", "3a2b375"]:
    print("="*40, commit)
    res = subprocess.run(["git", "show", "--stat", commit], capture_output=True, text=True)
    print(res.stdout)
