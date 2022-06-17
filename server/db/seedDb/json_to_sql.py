import mysql.connector
from mysql.connector import Error
import pandas as pd
import json

# Only use this file once you have done the following:
# 1. Used getcourses.js to create and download a json file from the uoft timetable website
# 2. Used the queries in initialize.sql to create a database and a table called 'courses' inside it

############# CONSTANTS ##################
# Change these according to your settings
USERNAME = 'root'  # put ur sql username here
PW = 'password'  # put ur sql password here
DB = 'groupchat_testing'  # put ur database name here
HOST = 'localhost' # put ur host name here
# put ur json file's path name here
JSON_LOCATION = 'C:/Users/DELL/Desktop/Web Development/testing/Json testing/all_courses_arr_1.json'
##########################################


############# Functions ################
def create_db_connection(host_name, user_name, user_password, db_name):
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            user=user_name,
            passwd=user_password,
            database=db_name)
        print("MySQL database connection successful")
    except Error as err:
        print(f"Error: '{err}'")
    return connection


def execute_query(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        connection.commit()
    except Error as err:
        print(f"Error: '{err}'")
########################################################


############ Main Code ###########################
connection = create_db_connection(HOST, USERNAME, PW, DB)

f = open(JSON_LOCATION, encoding="utf8")
data = json.load(f)


for i in data['courses']:
    lectures = ','.join(i['lectures'])

    # this if statement prevents courses with apostrophes in them to be added. Will fix later.
    if "'" in i['title']:
        continue

    my_query = f"INSERT INTO courses(`full`, `code`, `title`, `session`, `lectures`) VALUES ('{i['full']}', '{i['code']}', '{i['title']}', '{i['session']}', '{lectures}');"
    execute_query(connection, my_query)

f.close()
##############################################################