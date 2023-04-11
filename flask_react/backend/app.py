from flask import Flask, request
from flask_cors import CORS
import csv
import json

api = Flask(__name__)
CORS(api)

@api.route('/', methods=['POST', 'GET'])
def handle_fetch_request():
    if request.method == 'POST':
        data = request.get_json()
        return data

    else: # get request
        data = []
        with open('./../public/schedules/schedule.csv') as csv_file:
            for row in csv.reader(csv_file):
                data.append(row)

        json_string = json.dumps(data, indent=4)
        return json_string



if __name__ == '__main__':
    api.run(host='0.0.0.0', port=5000, debug=False)
