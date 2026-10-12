# 🎨 AI Image Generator

An AI-powered text-to-image generation web application built using Python, Flask, PyTorch, and Hugging Face Diffusers.

The application uses the **Segmind Tiny Stable Diffusion** model to transform natural language prompts into AI-generated images.

It features a user-friendly web interface and supports NVIDIA GPU acceleration through CUDA for faster image generation.

## 🚀 Features

- 🎨 AI-powered text-to-image generation
- 🧠 Pretrained Stable Diffusion model
- ⚡ NVIDIA CUDA GPU acceleration
- 🌐 Interactive web interface
- 🐍 Python Flask backend
- 💻 HTML, CSS, and JavaScript frontend
- 📷 Generated image display
- 🔗 Frontend and backend integration
- 📦 Local AI model execution without requiring a paid image-generation API

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| Python | Backend programming |
| Flask | Web application framework |
| PyTorch | Deep learning framework |
| Hugging Face Diffusers | AI image generation |
| Segmind Tiny Stable Diffusion | Pretrained text-to-image model |
| CUDA | GPU acceleration |
| HTML | Webpage structure |
| CSS | User interface styling |
| JavaScript | Frontend functionality |

## 📁 Project Structure

AI-Image-Generator/
│
├── static/
│   ├── script.js
│   ├── style.css
│   └── generated/
│
├── templates/
│   └── index.html
│
├── app.py
├── requirements.txt
├── README.md
└── .gitignore

Note: The generated folder is created automatically when the application runs.

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/VaishnavPula/AI-Image-Generator.git
```

### 2. Navigate to the Project Directory

```bash
cd AI-Image-Generator
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

### 4. Activate the Virtual Environment

Windows:

```bash
venv\Scripts\activate
```

Linux/macOS:

```bash
source venv/bin/activate
```

### 5. Install Dependencies

```bash
pip install -r requirements.txt
```

Make sure you install a PyTorch build compatible with your CUDA setup if you want GPU acceleration.

## 🧠 AI Model

This project uses:

**Model:** `segmind/tiny-sd`

The model is available through Hugging Face.

```python
from diffusers import DiffusionPipeline
import torch

model_id = "segmind/tiny-sd"

pipe = DiffusionPipeline.from_pretrained(
    model_id,
    torch_dtype=torch.float16
)

pipe = pipe.to("cuda")
```

The model is automatically downloaded when first loaded, provided it is not already cached locally.

An internet connection is required for the initial download.

## ▶️ Running the Application

Start the Flask server:

```bash
python app.py
```

Open your browser and visit:

http://127.0.0.1:5000

Enter a text prompt and generate an AI image.

## 🔄 How It Works

1. The user enters a text prompt.
2. JavaScript sends the prompt to the Flask backend.
3. Flask processes the request.
4. The Stable Diffusion pipeline generates an image.
5. The generated image is saved locally.
6. The image is displayed on the webpage.

## 🖥️ System Requirements

- Windows 10/11 or a compatible operating system
- Python environment compatible with the required libraries
- NVIDIA GPU with CUDA support
- Sufficient RAM and GPU memory
- Internet connection for the initial model download

**Important:** The current implementation uses CUDA directly and therefore requires a compatible NVIDIA GPU.

## 📌 Example Prompts

**Prompt 1:**
A futuristic city at night with neon lights and flying cars.

**Prompt 2:**
A beautiful sunset over a mountain lake, cinematic photography.

**Prompt 3:**
A futuristic robot walking through a cyberpunk city.

**Prompt 4:**
An astronaut exploring a mysterious alien planet.

## 🔮 Future Enhancements

- Image resolution selection
- Multiple image generation
- Download generated images
- Image generation history
- Improved prompt processing
- Additional Stable Diffusion models
- User authentication
- Cloud deployment
- CPU and GPU execution options

## 📚 Learning Outcomes

Through this project, I explored:

- Integrating pretrained AI models into Python applications
- Building REST-style endpoints using Flask
- Connecting JavaScript with Python backend services
- Using PyTorch and Hugging Face Diffusers
- Running AI inference using CUDA
- Managing Python dependencies and virtual environments
- Developing an end-to-end AI-powered web application

## 👨‍💻 Author

**Vaishnav Pula**

B.Tech — Artificial Intelligence Engineering

GitHub: [VaishnavPula](https://github.com/VaishnavPula)

## ⭐ Support

If you find this project useful, consider giving the repository a star!
