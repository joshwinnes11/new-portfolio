from flask import Flask, render_template, request, url_for
import os
from werkzeug.utils import secure_filename
from dummy_programs import dummy_projects

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "uploads"
app.config["OUTPUT_FOLDER"] = "static/outputs"
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
os.makedirs(app.config["OUTPUT_FOLDER"], exist_ok=True)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/projects")
def projects():
    return render_template("projects.html")

@app.route("/projects/flow-counter", methods=["GET", "POST"])
def flow_counter_demo():
    result_file = None
    error = None

    if request.method == "POST":
        try:
            video_file = request.files["video"]
            class_id = request.form["class_id"]
            filename = secure_filename(video_file.filename)
            input_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            output_filename = f"result_{filename}.txt"
            output_path = os.path.join(app.config["OUTPUT_FOLDER"], output_filename)

            video_file.save(input_path)
            dummy_projects.run_dummy(video_path=input_path, class_id=class_id, output_path=output_path)

            result_file = f"outputs/{output_filename}"  # relative to static/
        except Exception as e:
            error = str(e)

    return render_template("project_detail.html", slug="flow-counter", result_video=result_file, error=error)

if __name__ == "__main__":
    print("🚀 Flask starting on http://127.0.0.1:5000")
    app.run(debug=True)