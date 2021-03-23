# wysa

API Design

Data from all the initial screens of Wysa app will be provided to the API in following request body -

Request body - 
{
    "name": "xyz", 
    "expected_changes": "0/1/2",
    "struggle": "0/1/2",
    "sleep_time": "11 pm",
    "wake_time": "8 am"
}
// name - contains the nick name of the user
// expected_changes - here the changes are values which have specific meaning, // just like an enum
// struggle - here the changes are values which have specific meaning, just like an enum
// sleep_time - sleep time in string
// wake_time - wake time in string

Response body -
{
    "current_efficiency": "78",
    "proposed_efficiency": "92"
}

Database schema (Nosql DB) - 
DB name - wysa
DB collection - users
Schema - 
{
    name: (string)
    expected_changes: (string)
    struggle: (string)
    sleep_time: (string)
    wake_time: (string)
    current_efficiency: (number) 
    proposed_efficiency: (number)
    plan_type: (string)
}


Reqirement to run the project - 
Mongodb database
Nodejs


Steps to run the project - 

1) Navigate to 'backend' folder and perform the following steps -
    a) npm install
    b) npm start

2) Go to 'register.html' and open it in browser
3) enter the details in the registration form and register new user.
4) After new user registration, enter login details and click on login and a new JWT token will be generated on successful login.
5) Use the JWT token for secure communication


