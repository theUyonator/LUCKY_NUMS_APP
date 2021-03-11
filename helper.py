# This file contains helper functions for the lucky number app
import requests 

validBirthYears = [r for r in range(1900,2001)]
validColors = ["red", "green", "orange", "blue"]
BASE_URL = "http://numbersapi.com"

def formValidation(name, email, year, color):
    """This function helps with validation of data inputed in user form"""
    formErrors = {
        "errors":{}
    }

    if name == "":
        formErrors["errors"]["name"] = ["This field is required."]
    if email == "":
        formErrors["errors"]["email"] = ["This field is required."]
    if year not in validBirthYears:
        formErrors["errors"]["year"] = ["Invalid year, must be from 1900-2000"]
    if color not in validColors:
        formErrors["errors"]["color"] = ["Invalid color, must be red, green, orange or blue"]

    if formErrors["errors"]:
        return formErrors
    else:
        return False


def getRandomTrivia(num):
    """This method makes a request to the numbers api given a number and returns back a random trivia fact"""

    resp = requests.get(f"{BASE_URL}/{num}/trivia")
    
    return resp.text

def getRandomYearFact(year):
    """This method makes a request to the numbers api given a year and returns a random fact about that year"""

    resp = requests.get(f"{BASE_URL}/{year}/year")

    return resp.text