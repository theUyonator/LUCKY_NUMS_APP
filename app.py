from flask import Flask, request, render_template, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from random import randint
from helper import * 

app = Flask(__name__)

app.config['SECRET_KEY'] = "I'LL NEVER TELL!!"
debug = DebugToolbarExtension(app)

@app.route("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")

@app.route("/api/get-lucky-num", methods=["POST"])
def endPoint():
    """When valid inputs are submitted, a random number, fact about about that number,
       and a random fact about that year entered will be returned in JSON.
       If an invalid input is entered, it will return errors is JSON
    
    """
    # Set response dictionary
    response = {
        "num":{},
        "year":{}
    }
    name = request.json["name"]
    email = request.json["email"]
    year = int(request.json["year"])
    color = request.json["color"]

    validation = formValidation(name,email,year,color)
    # import pdb; pdb.set_trace()


    if validation:
        return jsonify(validation)
    else:
        randomNum = randint(1,100)
        randomNumFact = getRandomTrivia(randomNum)
        randomYearFact = getRandomYearFact(year)
        # raise Exception()

        response["num"]["fact"] = randomNumFact
        response["num"]["num"] = randomNum
        response["year"]["fact"] = randomYearFact
        response["year"]["year"]= year

        return jsonify(response)