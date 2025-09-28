import pandas as pd, numpy as np, statsmodels.api as sm

# โหลด
df = pd.read_csv("D:/Code/2 IIT67 - T1/mobile dev/Final-Project/babypig/brain_stroke.csv")

# --- ทำชื่อคอลัมน์ให้มาตรฐาน ---
df.columns = (df.columns
              .str.strip().str.lower()
              .str.replace(" ", "_").str.replace("-", "_"))

# target
if "stroke" not in df.columns:
    raise ValueError("ไม่พบคอลัมน์ 'stroke'")
y = df["stroke"].astype(int)

# ====== ทางเลือก A: โมเดลหลายตัวแปร (มีหมวดหมู่) ======
want_num = ["age", "avg_glucose_level"]        # ต่อเนื่อง
want_bin = ["hypertension"]                    # ไบนารี
want_cat = ["gender","ever_married","work_type","residence_type","smoking_status"]  # หลัง normalize แล้ว

num_cols = [c for c in want_num if c in df.columns]
bin_cols = [c for c in want_bin if c in df.columns]
cat_cols = [c for c in want_cat if c in df.columns]

# จัดการ missing
if cat_cols:
    df[cat_cols] = df[cat_cols].fillna("Unknown")
for c in num_cols:
    df[c] = pd.to_numeric(df[c], errors="coerce").fillna(df[c].median())
for c in bin_cols:
    df[c] = pd.to_numeric(df[c], errors="coerce").fillna(0).astype(int)

# ดัมมี
X_all = df[num_cols + bin_cols + cat_cols].copy()
X = pd.get_dummies(X_all, columns=cat_cols, drop_first=True) if cat_cols else X_all

# ฟิต
X_sm = sm.add_constant(X, has_constant="add")
res = sm.Logit(y, X_sm).fit(disp=False)
print(res.summary())

# ====== ทางเลือก B: โมเดล 3 ตัวแปร (age, avg_glucose_level, bmi) ======
# เลือกเฉพาะ 3 ตัวแปรต่อเนื่อง
use3 = ["age", "avg_glucose_level", "bmi"]
use3 = [c for c in use3 if c in df.columns]
df3 = df[use3].copy()
for c in use3:
    df3[c] = pd.to_numeric(df3[c], errors="coerce").fillna(df3[c].median())

X3_sm = sm.add_constant(df3, has_constant="add")
res3 = sm.Logit(y, X3_sm).fit(disp=False)
print("\n=== Logistic (age, avg_glucose_level, bmi) ===")
print(res3.summary())
