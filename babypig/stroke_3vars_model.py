# ===============================
# Stroke (3 Variables) – Full Demo
# ใช้ตัวแปรเท่านั้น: age, hypertension, avg_glucose_level
# ===============================

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, classification_report, roc_auc_score, roc_curve, precision_recall_curve

import statsmodels.api as sm
from statsmodels.stats.outliers_influence import variance_inflation_factor as sm_vif

# -------------------------------
# 1) โหลดข้อมูล
# -------------------------------
# แก้ path ตามเครื่องคุณ:
# file_path = r"C:\Users\ASUS\Downloads\brain_stroke.csv"
file_path = "C:/Users\mainb/Downloads/brain_stroke.csv"
df = pd.read_csv(file_path)

# ทำชื่อคอลัมน์ให้สม่ำเสมอ
df.columns = (
    df.columns.str.strip().str.lower()
      .str.replace(" ", "_").str.replace("-", "_")
)
# (เผื่อบางชุดสะกดต่าง)
df = df.rename(columns={"residencetype": "residence_type", "govtjov": "govt_job"})

# ต้องมีคอลัมน์เหล่านี้
needed = {"age", "hypertension", "avg_glucose_level", "stroke"}
missing = [c for c in needed if c not in df.columns]
if missing:
    raise ValueError(f"ไม่พบคอลัมน์จำเป็น: {missing}")

# Target เป็น 0/1 ชัดเจน
df["stroke"] = df["stroke"].astype(int)

print("=== ตัวอย่างก่อนประมวลผล ===")
print(df[["age", "hypertension", "avg_glucose_level", "stroke"]].head(10).to_string())

# -------------------------------
# 2) พรรณนา/สำรวจเบื้องต้น (เฉพาะ 3 ตัวแปร)
# -------------------------------
print("\n=== Describe (รวม) ===")
print(df[["age", "hypertension", "avg_glucose_level"]].describe().to_string())

print("\n=== ผู้ป่วยที่ไม่มีโรคหลอดเลือดสมอง ===")
print(df[df["stroke"] == 0][["age", "hypertension", "avg_glucose_level"]].describe().to_string())

print("\n=== ผู้ป่วยที่มีโรคหลอดเลือดสมอง ===")
print(df[df["stroke"] == 1][["age", "hypertension", "avg_glucose_level"]].describe().to_string())

# -------------------------------
# 3) เลือกฟีเจอร์ (เฉพาะ 3 ตัว) + จัดการ missing แบบง่าย
# -------------------------------
X = df[["age", "hypertension", "avg_glucose_level"]].copy()
y = df["stroke"].copy()

# เติมค่าว่างแบบเรียบง่าย (numeric → median, binary → mode)
if X["age"].isna().any():
    X["age"] = X["age"].fillna(X["age"].median())
if X["avg_glucose_level"].isna().any():
    X["avg_glucose_level"] = X["avg_glucose_level"].fillna(X["avg_glucose_level"].median())
if X["hypertension"].isna().any():
    X["hypertension"] = X["hypertension"].fillna(X["hypertension"].mode().iloc[0])
# ให้แน่ใจว่า hypertension เป็น 0/1
X["hypertension"] = X["hypertension"].astype(int)

# -------------------------------
# 4) แบ่ง train/test (stratify)
# -------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.30, random_state=42, stratify=y
)

# -------------------------------
# 5) Logistic Regression (statsmodels) → OR + 95% CI + p-value
# -------------------------------
X_train_sm = sm.add_constant(X_train)  # เพิ่ม intercept
sm_model = sm.Logit(y_train, X_train_sm).fit(disp=False)

print("\n=== Statsmodels Logistic Regression (3 vars) ===")
print(sm_model.summary())

# ตาราง OR
params = sm_model.params
conf = sm_model.conf_int()
or_tbl = pd.DataFrame({
    "feature": params.index,
    "coef": params.values,
    "OR": np.exp(params.values),
    "p_value": sm_model.pvalues.values,
    "OR_low": np.exp(conf[0].values),
    "OR_high": np.exp(conf[1].values)
}).sort_values("p_value")
print("\n=== Adjusted OR + 95% CI ===")
print(or_tbl.to_string(index=False))

# (อ่านง่ายขึ้น) OR ต่อ +10 ปีอายุ / +10 หน่วยกลูโคส
if "age" in params.index:
    print(f"\nOR ต่อ +10 ปีอายุ ≈ {np.exp(10 * params['age']):.3f}")
if "avg_glucose_level" in params.index:
    print(f"OR ต่อ +10 หน่วยกลูโคส ≈ {np.exp(10 * params['avg_glucose_level']):.3f}")

# -------------------------------
# 6) ตรวจ Multicollinearity (เฉพาะตัวเลขต่อเนื่อง)
#    *โดยทั่วไปคำนวณ VIF เฉพาะ continuous (age, avg_glucose_level)
# -------------------------------
num_for_vif = X_train[["age", "avg_glucose_level"]].copy()
num_for_vif = sm.add_constant(num_for_vif)
vif_rows = []
for i, col in enumerate(num_for_vif.columns):
    # ข้าม constant เวลาแสดง
    vif_rows.append({
        "feature": col,
        "VIF": sm_vif(num_for_vif.values, i)
    })
vif_df = pd.DataFrame(vif_rows)
print("\n=== VIF (เฉพาะตัวเลขต่อเนื่อง) ===")
print(vif_df.to_string(index=False))

# -------------------------------
# 7) Logistic Regression (sklearn) สำหรับทำนาย/ชี้วัด
# -------------------------------
clf = LogisticRegression(
    solver="liblinear",
    max_iter=2000,
    class_weight="balanced"  # แนะนำเพราะ stroke มักเป็น class น้อย
)
clf.fit(X_train, y_train)

y_pred      = clf.predict(X_test)
y_pred_prob = clf.predict_proba(X_test)[:, 1]

print("\n=== Classification Report (threshold=0.50) ===")
print(classification_report(y_test, y_pred, digits=3))

roc_auc = roc_auc_score(y_test, y_pred_prob)
print("\n=== AUC-ROC ===")
print(f"{roc_auc:.3f}")

# -------------------------------
# 8) Confusion Matrix + Heatmap (threshold 0.50)
# -------------------------------
cm = confusion_matrix(y_test, y_pred)
print("\n=== Confusion Matrix (0.50) ===")
print(cm)

plt.figure(figsize=(5,4))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=["Pred 0","Pred 1"],
            yticklabels=["Actual 0","Actual 1"])
plt.title("Confusion Matrix (0.50)")
plt.xlabel("Predicted"); plt.ylabel("Actual")
plt.tight_layout()
plt.show()

# -------------------------------
# 9) ROC/PR Curves (ออปชัน)
# -------------------------------
fpr, tpr, _ = roc_curve(y_test, y_pred_prob)
plt.figure()
plt.plot(fpr, tpr); plt.plot([0,1],[0,1],'--')
plt.xlabel("False Positive Rate"); plt.ylabel("True Positive Rate")
plt.title("ROC Curve (3-variable)")
plt.tight_layout(); plt.show()

prec, rec, _ = precision_recall_curve(y_test, y_pred_prob)
plt.figure()
plt.plot(rec, prec)
plt.xlabel("Recall"); plt.ylabel("Precision")
plt.title("Precision-Recall Curve (3-variable)")
plt.tight_layout(); plt.show()
