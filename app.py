import os
import uuid
import warnings

import torch
from diffusers import DiffusionPipeline
from diffusers.utils import logging
from flask import Flask, jsonify, render_template, request

logging.set_verbosity_error()
warnings.filterwarnings("ignore")

app = Flask(__name__)
model_id = "segmind/tiny-sd"

image_generator = DiffusionPipeline.from_pretrained(
    model_id, torch_dtype=torch.float16
).to("cuda")

image_folder = os.path.join("static", "generated")
os.makedirs(image_folder, exist_ok=True)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate_image():
    try:
        data = request.get_json() or {}
        prompt = data.get("prompt", "").strip()
        style = data.get("style", "none")

        if not prompt:
            return jsonify({"error": "Please enter a prompt."}), 400

        if style != "none":
            prompt = f"{prompt}, {style} style"

        result = image_generator(
            prompt, num_inference_steps=20, guidance_scale=7.5
        )

        filename = f"{uuid.uuid4().hex}.png"
        result.images[0].save(os.path.join(image_folder, filename))

        return jsonify({"image": f"/static/generated/{filename}"})

    except Exception:
        app.logger.exception("Image generation failed")
        return jsonify({"error": "Image generation failed. Please try again."}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
