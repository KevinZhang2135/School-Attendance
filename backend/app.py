from flask import Flask

api = Flask(__name__)

@api.route('/')
def my_profile():
    response_body = {

    }

    return response_body

if __name__ == '__main__':
    api.run(host = '0.0.0.0', debug = True)