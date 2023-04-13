from flask import Flask, request
from flask_cors import CORS
import csv
import json

CSV_FILE_PATH = './../public/schedules/schedule.csv'
api = Flask(__name__)
CORS(api)


@api.route('/', methods=['POST', 'GET'])
def handle_fetch_request():
    if request.method == 'POST':
        data = request.get_json()
        with open(CSV_FILE_PATH, 'w', newline='') as csv_file:
            writer = csv.writer(csv_file)
            for row in data.values():
                writer.writerow(row)

        return data

    else:  # get request
        data = []
        with open(CSV_FILE_PATH) as csv_file:
            for row in csv.reader(csv_file):
                data.append(row)

        json_string = json.dumps(data, indent=4)
        return json_string


if __name__ == '__main__':
    api.run(host='0.0.0.0', port=5000, debug=False)
