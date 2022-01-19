from flask import Flask,render_template,request,jsonify
import torch
import torch.nn as nn
import os
from torchvision.utils import save_image
import base64
from flask_cors import CORS
# from flask_restful import Api,Resource

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'disable the web security'
app.config['CORS_HEADERS'] = 'Content-Type'

STATS = (.5, .5, .5), (.5, .5, .5)

def denorm(img_tensor):
    return img_tensor * STATS[1][0] + STATS[0][0]

@app.route('/')
def home():
    return "GAN_NFT"

@app.route('/generate')
def gen():
    noise = torch.randn(104, 3, 1, 1)
    pred_img = generator(noise)
    tensor  = denorm(pred_img.cpu().detach())
    save_image(tensor, "image.png")
    with open("image.png", "rb") as img_file:
        my_string = base64.b64encode(img_file.read())
    return jsonify({"datum" : str(my_string)[2:-1] })

if __name__ == "__main__":

    generator  = nn.Sequential(
    # in: 3 x 1 x 1
    nn.ConvTranspose2d(3, 512, kernel_size=4, stride=1, padding=0, bias=False),
    nn.BatchNorm2d(512),
    nn.ReLU(True),
    # out: 512 x 4 x 4
    
    nn.ConvTranspose2d(512, 256, kernel_size=4, stride=2, padding=1, bias=False),
    nn.BatchNorm2d(256),
    nn.ReLU(True),
    # out: 256 x 8 x 8

    nn.ConvTranspose2d(256, 128, kernel_size=4, stride=2, padding=1, bias=False),
    nn.BatchNorm2d(128),
    nn.ReLU(True),
    # out: 128 x 16 x 16
    
    nn.ConvTranspose2d(128, 64, kernel_size=4, stride=2, padding=1, bias=False),
    nn.BatchNorm2d(64),
    nn.ReLU(True),
    # out: 64 x 32 x 32
    
    nn.ConvTranspose2d(64, 3, kernel_size=4, stride=2, padding=1, bias=False),
    nn.Tanh()
    # out: 3 x 64 x 64
)
    generator.load_state_dict(torch.load(os.path.join(os.getcwd(), 'generator.pth')))
    app.run(threaded=True, port=5000,debug=True)