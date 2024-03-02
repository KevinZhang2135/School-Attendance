from flask import Flask, request
from flask_cors import CORS

import csv
import json
import os
import sys

# csv file path
cwd = os.path.dirname(sys.argv[0])
CSV_FILE_PATH = f'{os.path.dirname(cwd)}/schedules/schedule.csv'

api = Flask(__name__)
CORS(api)

@api.route('/', methods=['POST', 'GET'])
def handle_fetch_request():
    # post request
    if request.method == 'POST':
        # extracts json data from react post
        data = request.get_json()

        # rewrites csv with json data
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

        # returns csv data in json format on react component mount
        json_string = json.dumps(data, indent=4)
        return json_string


if __name__ == '__main__':
    api.run(host='127.0.0.1', port=5000, debug=False)
