from flask import Flask, render_template, jsonify, send_from_directory
import os

app = Flask(__name__)

IMAGE_DIRS = ['input/HYUNDAI/images/CAM_FRONT', 'input/HYUNDAI/images/CAM_FRONT_LEFT', 'input/HYUNDAI/images/CAM_FRONT_RIGHT']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/image/<folder>/<filename>')
def get_image(folder, filename):
    return send_from_directory(os.path.join('input/HYUNDAI/images', folder), filename)

@app.route('/image_count')
def image_count():
    image_counts = {dir_name: len(os.listdir(dir_name)) for dir_name in IMAGE_DIRS}
    return jsonify(image_counts)

if __name__ == '__main__':
    app.run(debug=True)
