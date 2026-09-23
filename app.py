#!/usr/bin/env python3
"""
Smart Crop Recommendation - Flask Backend Server
Serves the web dashboard and handles K-Nearest Neighbors prediction API.
"""

import os
import sys
import numpy as np
import pandas as pd
from flask import Flask, render_template, request, jsonify
try:
    from flask_cors import CORS
    has_cors = True
except ImportError:
    has_cors = False
import joblib

app = Flask(__name__, template_folder="templates", static_folder="static")
if has_cors:
    CORS(app)
else:
    @app.after_request
    def add_cors_headers(response):
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
        response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        return response

MODEL_DIR = "model"
MODEL_FILE = os.path.join(MODEL_DIR, "crop_knn_model.pkl")
SCALER_FILE = os.path.join(MODEL_DIR, "scaler.pkl")

# Valid ranges for input validation
PARAM_CONSTRAINTS = {
    "N": {"min": 0.0, "max": 140.0, "name": "Nitrogen (N)", "unit": "mg/kg"},
    "P": {"min": 5.0, "max": 145.0, "name": "Phosphorus (P)", "unit": "mg/kg"},
    "K": {"min": 5.0, "max": 205.0, "name": "Potassium (K)", "unit": "mg/kg"},
    "temperature": {"min": 8.0, "max": 45.0, "name": "Temperature", "unit": "°C"},
    "humidity": {"min": 10.0, "max": 100.0, "name": "Humidity", "unit": "%"},
    "ph": {"min": 3.5, "max": 9.5, "name": "Soil pH", "unit": ""},
    "rainfall": {"min": 20.0, "max": 300.0, "name": "Rainfall", "unit": "mm"}
}

FEATURE_KEYS = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']

# Lazy loader for model & scaler
_model = None
_scaler = None

def load_ml_artifacts():
    global _model, _scaler
    if _model is not None and _scaler is not None:
        return _model, _scaler
    
    if not os.path.exists(MODEL_FILE) or not os.path.exists(SCALER_FILE):
        print("[!] Model or scaler not found. Triggering automated model training...")
        from train_model import train_and_evaluate
        train_and_evaluate()
        
    _model = joblib.load(MODEL_FILE)
    _scaler = joblib.load(SCALER_FILE)
    return _model, _scaler

@app.route("/", methods=["GET"])
def index():
    """Serves the main web dashboard."""
    return render_template("index.html")

@app.route("/api/health", methods=["GET"])
def health():
    """Health check endpoint."""
    model_ready = os.path.exists(MODEL_FILE) and os.path.exists(SCALER_FILE)
    return jsonify({
        "status": "healthy",
        "service": "Smart Crop Recommendation API (KNN)",
        "model_loaded": model_ready
    })

@app.route("/api/predict", methods=["POST"])
def predict():
    """
    Accepts 7 soil and climate parameters, validates inputs,
    scales features using StandardScaler, runs distance-weighted KNN,
    and returns recommended crop with confidence score & alternatives.
    """
    try:
        data = request.get_json(force=True, silent=True)
        if not data:
            return jsonify({
                "success": False,
                "error": "Invalid request payload. Expected JSON body with parameters: " + ", ".join(FEATURE_KEYS)
            }), 400

        # 1. Validation & Extraction
        extracted_values = []
        validation_errors = []

        for key in FEATURE_KEYS:
            if key not in data or data[key] is None or data[key] == "":
                validation_errors.append(f"Missing parameter '{key}' ({PARAM_CONSTRAINTS[key]['name']})")
                continue
            
            try:
                val = float(data[key])
            except (ValueError, TypeError):
                validation_errors.append(f"Parameter '{key}' must be a valid number.")
                continue

            bounds = PARAM_CONSTRAINTS[key]
            if val < bounds["min"] or val > bounds["max"]:
                validation_errors.append(
                    f"Parameter '{key}' ({bounds['name']}) value {val} is outside allowed range [{bounds['min']}, {bounds['max']}] {bounds['unit']}".strip()
                )
            extracted_values.append(val)

        if validation_errors:
            return jsonify({
                "success": False,
                "error": "Validation failed",
                "details": validation_errors
            }), 400

        # 2. Load ML Artifacts
        model, scaler = load_ml_artifacts()

        # 3. Transform inputs with StandardScaler
        features_df = pd.DataFrame([extracted_values], columns=FEATURE_KEYS)
        features_scaled = scaler.transform(features_df)

        # 4. Predict probabilities using distance-weighted K-Nearest Neighbors
        # With weights='distance', predict_proba computes normalized inverse distance weights across neighbors
        probabilities = model.predict_proba(features_scaled)[0]
        classes = model.classes_

        # Pair each class with its predicted probability
        crop_scores = [
            {"crop": str(crop), "confidence": round(float(prob) * 100, 1)}
            for crop, prob in zip(classes, probabilities)
            if prob > 0.001
        ]
        # Sort descending by confidence
        crop_scores.sort(key=lambda x: x["confidence"], reverse=True)

        if not crop_scores:
            recommended_crop = str(model.predict(features_scaled)[0])
            confidence = 100.0
            top_alternatives = [{"crop": recommended_crop, "confidence": 100.0}]
        else:
            recommended_crop = crop_scores[0]["crop"]
            confidence = crop_scores[0]["confidence"]
            top_alternatives = crop_scores[:4]

        # Ensure probabilities in top alternatives sum gracefully for UI display if single neighbor dominates
        return jsonify({
            "success": True,
            "recommended_crop": recommended_crop,
            "confidence": confidence,
            "top_alternatives": top_alternatives,
            "input_parameters": {
                key: float(data[key]) for key in FEATURE_KEYS
            }
        })

    except Exception as exc:
        print(f"[!] Exception during prediction: {exc}", file=sys.stderr)
        return jsonify({
            "success": False,
            "error": "Internal server prediction error",
            "message": str(exc)
        }), 500

if __name__ == "__main__":
    # Ensure model is trained on startup
    load_ml_artifacts()
    port = int(os.environ.get("PORT", 5000))
    print(f"[*] Starting Smart Crop Recommendation Flask Server on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=False)
