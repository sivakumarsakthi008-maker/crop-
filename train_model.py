#!/usr/bin/env python3
"""
Smart Crop Recommendation - Machine Learning Training Script
Algorithm: K-Nearest Neighbors (KNN) Classifier
Distance Metric: Euclidean
Weights: Distance-weighted
Features: Nitrogen (N), Phosphorus (P), Potassium (K), Temperature, Humidity, pH, Rainfall
"""

import os
import sys
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib

DATA_DIR = "data"
DATA_FILE = os.path.join(DATA_DIR, "Crop_recommendation.csv")
MODEL_DIR = "model"
MODEL_FILE = os.path.join(MODEL_DIR, "crop_knn_model.pkl")
SCALER_FILE = os.path.join(MODEL_DIR, "scaler.pkl")

# Crop profile definitions (mean and standard deviation for realistic data synthesis)
CROP_PROFILES = {
    "Rice": {
        "N": (90, 8), "P": (45, 6), "K": (40, 5),
        "temperature": (24.0, 2.5), "humidity": (82.0, 4.0),
        "ph": (6.5, 0.4), "rainfall": (240.0, 25.0)
    },
    "Maize": {
        "N": (80, 10), "P": (48, 6), "K": (20, 4),
        "temperature": (24.0, 3.0), "humidity": (65.0, 6.0),
        "ph": (6.5, 0.5), "rainfall": (85.0, 15.0)
    },
    "Chickpea": {
        "N": (40, 6), "P": (68, 8), "K": (80, 8),
        "temperature": (19.0, 2.0), "humidity": (17.0, 3.0),
        "ph": (7.3, 0.4), "rainfall": (80.0, 10.0)
    },
    "Kidney Beans": {
        "N": (25, 5), "P": (65, 8), "K": (20, 3),
        "temperature": (21.0, 2.5), "humidity": (60.0, 5.0),
        "ph": (5.7, 0.3), "rainfall": (120.0, 15.0)
    },
    "Pigeonpeas": {
        "N": (20, 4), "P": (68, 7), "K": (20, 3),
        "temperature": (28.0, 3.5), "humidity": (55.0, 6.0),
        "ph": (5.8, 0.4), "rainfall": (150.0, 20.0)
    },
    "Cotton": {
        "N": (120, 10), "P": (48, 6), "K": (20, 3),
        "temperature": (25.0, 2.0), "humidity": (80.0, 5.0),
        "ph": (6.8, 0.4), "rainfall": (80.0, 12.0)
    },
    "Coffee": {
        "N": (100, 8), "P": (30, 5), "K": (30, 5),
        "temperature": (25.0, 2.0), "humidity": (62.0, 5.0),
        "ph": (6.8, 0.3), "rainfall": (175.0, 20.0)
    },
    "Jute": {
        "N": (80, 8), "P": (46, 5), "K": (40, 5),
        "temperature": (25.0, 2.0), "humidity": (80.0, 4.0),
        "ph": (6.7, 0.4), "rainfall": (175.0, 18.0)
    },
    "Coconut": {
        "N": (22, 5), "P": (18, 4), "K": (30, 5),
        "temperature": (27.0, 2.0), "humidity": (95.0, 3.0),
        "ph": (6.0, 0.3), "rainfall": (180.0, 22.0)
    },
    "Papaya": {
        "N": (50, 8), "P": (60, 7), "K": (50, 6),
        "temperature": (34.0, 3.0), "humidity": (92.0, 3.0),
        "ph": (6.7, 0.3), "rainfall": (160.0, 20.0)
    },
    "Orange": {
        "N": (20, 5), "P": (18, 4), "K": (10, 3),
        "temperature": (23.0, 3.0), "humidity": (92.0, 3.0),
        "ph": (6.8, 0.4), "rainfall": (110.0, 12.0)
    },
    "Apple": {
        "N": (25, 5), "P": (135, 10), "K": (200, 8),
        "temperature": (22.0, 2.0), "humidity": (92.0, 3.0),
        "ph": (6.0, 0.3), "rainfall": (115.0, 12.0)
    },
    "Watermelon": {
        "N": (100, 8), "P": (18, 4), "K": (50, 5),
        "temperature": (26.0, 2.0), "humidity": (85.0, 4.0),
        "ph": (6.5, 0.3), "rainfall": (50.0, 8.0)
    },
    "Muskmelon": {
        "N": (100, 8), "P": (18, 4), "K": (50, 5),
        "temperature": (28.0, 2.0), "humidity": (92.0, 3.0),
        "ph": (6.4, 0.3), "rainfall": (25.0, 5.0)
    }
}

BOUNDS = {
    "N": (0, 140),
    "P": (5, 145),
    "K": (5, 205),
    "temperature": (8.0, 45.0),
    "humidity": (10.0, 100.0),
    "ph": (3.5, 9.5),
    "rainfall": (20.0, 300.0)
}

def generate_synthetic_dataset(samples_per_crop=100, seed=42):
    """Generates realistic synthetic agricultural dataset across all crop clusters."""
    np.random.seed(seed)
    records = []
    
    for crop, profile in CROP_PROFILES.items():
        for _ in range(samples_per_crop):
            row = {}
            for feature, (mean, std) in profile.items():
                val = np.random.normal(mean, std)
                min_v, max_v = BOUNDS[feature]
                val = max(min_v, min(max_v, val))
                row[feature] = round(val, 2) if feature in ["temperature", "humidity", "ph", "rainfall"] else int(round(val))
            row["label"] = crop
            records.append(row)
            
    df = pd.DataFrame(records)
    # Shuffle dataset
    df = df.sample(frac=1.0, random_state=seed).reset_index(drop=True)
    return df

def train_and_evaluate():
    os.makedirs(DATA_DIR, exist_ok=True)
    os.makedirs(MODEL_DIR, exist_ok=True)
    
    # 1. Dataset Loading or Generation
    if os.path.exists(DATA_FILE):
        print(f"[+] Found existing dataset at {DATA_FILE}")
        df = pd.read_csv(DATA_FILE)
    else:
        print(f"[!] Dataset not found. Generating synthetic dataset with {len(CROP_PROFILES)} crop clusters...")
        df = generate_synthetic_dataset(samples_per_crop=120)
        df.to_csv(DATA_FILE, index=False)
        print(f"[+] Saved synthetic dataset to {DATA_FILE} ({len(df)} rows)")

    print(f"[+] Dataset shape: {df.shape}")
    print(f"[+] Target classes ({len(df['label'].unique())}): {', '.join(sorted(df['label'].unique()))}")

    # 2. Features and Target
    feature_cols = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    X = df[feature_cols]
    y = df['label']

    # 3. Train-Test Split (80% train, 20% test stratified)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # 4. Feature Scaling (StandardScaler)
    print("\n[+] Fitting StandardScaler on training data...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # 5. Model Training: K-Nearest Neighbors
    # n_neighbors=5, weights='distance' (inversely proportional to Euclidean distance)
    print("[+] Training KNeighborsClassifier (n_neighbors=5, weights='distance', metric='euclidean')...")
    knn = KNeighborsClassifier(
        n_neighbors=5,
        weights='distance',
        metric='euclidean'
    )
    knn.fit(X_train_scaled, y_train)

    # 6. Evaluation
    y_pred = knn.predict(X_test_scaled)
    acc = accuracy_score(y_test, y_pred)
    print("\n" + "=" * 50)
    print(f"[*] Model Evaluation - Test Accuracy: {acc * 100:.2f}%")
    print("=" * 50)
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, zero_division=0))

    # 7. Model Persistence
    joblib.dump(knn, MODEL_FILE)
    joblib.dump(scaler, SCALER_FILE)
    print(f"[✓] Saved trained model to {MODEL_FILE}")
    print(f"[✓] Saved fitted scaler to {SCALER_FILE}")
    print("[✓] Training completed successfully!")

if __name__ == "__main__":
    train_and_evaluate()
