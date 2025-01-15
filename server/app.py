from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
from escpos import *
from PIL import Image

DESIRED_WIDTH = 400

p = printer.Usb(0x28e9, 0x0289, 0, in_ep=0x81, out_ep=0x03)
p.open()

def resize_image(img_path):
    image = Image.open(img_path)
    width, height = image.size

    new_width = DESIRED_WIDTH
    new_height = int(height * (DESIRED_WIDTH/width))

    image = image.resize((new_width, new_height))
    return image


app  = Flask(__name__)
CORS(app)

upload_folder = 'uploads'
app.config['UPLOAD'] = upload_folder

@app.route('/data', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        if request.is_json == True:
            data = request.get_json()
            print("{}: {}".format(data['type'], data['data']))
            if data['type'] == 'text': p.text(data['data'])
            elif data['type'] == 'qr': p.qr(data['data'], size=12)
            p.cut()
            return "<h1>Successfully entered text</h1>"
        else:
            file = request.files['img']
            filename = secure_filename(file.filename)
            print(filename)
            img = os.path.join(app.config['UPLOAD'], filename)
            file.save(img)
            p.image(resize_image(img))
            p.cut()
    return "<h1>Server</h1>"

if __name__ == "__main__":
    app.run()