from flask import Flask, render_template, request, jsonify
import torch
from diffusers import DiffusionPipeline
from diffusers.utils import logging
import warnings
import os
import uuid
logging.set_verbosity_error()
warnings.filterwarnings("ignore")
app = Flask(__name__)

# Load the AI model
model_id = "segmind/tiny-sd"

pipe = DiffusionPipeline.from_pretrained(
    model_id,
    torch_dtype=torch.float16
)

pipe = pipe.to("cuda")

# Folder for generated images
IMAGE_FOLDER = os.path.join("static", "generated")
os.makedirs(IMAGE_FOLDER, exist_ok=True)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():
    try:
        data = request.get_json()
        prompt = data.get("prompt", "").strip()
        style = data.get("style", "none")

        if not prompt:
            return jsonify({"error": "Please enter a prompt."}), 400

        # Add the selected art style
        if style != "none":
            prompt = f"{prompt}, {style} style"

        # Generate image
        image = pipe(
            prompt,
            num_inference_steps=20,
            guidance_scale=7.5
        ).images[0]

        # Save with a unique filename
        filename = f"{uuid.uuid4().hex}.png"
        filepath = os.path.join(IMAGE_FOLDER, filename)
        image.save(filepath)

        return jsonify({
            "image": f"/static/generated/{filename}"
        })

    except Exception as e:
        app.logger.exception("Image generation failed")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000,debug=False)