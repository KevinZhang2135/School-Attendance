from flask import Flask
from flask_cors import CORS
import csv
import json

api = Flask(__name__)
CORS(api)

@api.route('/csv', methods=['GET'])
def handle_get_request():
    data = []
    with open('./../public/schedules/schedule.csv') as csv_file:
        for row in csv.reader(csv_file):
            data.append(row)

    json_string = json.dumps(data, indent=4)
    return json_string


@api.route('/checkout', methods=['POST'])
def handle_post_request():
    return {
        'Name': "geek",
        "Age": "22",
        "programming": "python"
    }


if __name__ == '__main__':
    api.run(host='0.0.0.0', port=5000, debug=True)
