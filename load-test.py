import requests
import json
import time

c=0
print(' Running load test')
while True:
    URL = "https://localhost:30002/api/v1/login"
    body ={
        "username": "ahoneywood4",
        "password": "VvvAr5kn"
    } 


    response = requests.post(url = URL, verify=False, json=body)

    r = response.text
    result = json.loads(r)

    token = result['token']

    URL = "https://localhost:30004/api/v1/getpatientreportbyemail"

    auth = "bearer "+str(token)

    parmas ={"em": "lmilsomlv@pbs.org"} 
    header = {"Authorization":auth}

    response = requests.get(url = URL, verify=False, params=parmas, headers=header)


    response = requests.get(url = 'https://localhost:30002/', verify=False)

    response = requests.get(url = 'https://localhost:30003/', verify=False)

    response = requests.post(url = 'https://localhost:30004/', verify=False)

    response = requests.post(url = 'https://localhost:30003/', verify=False)

    c+=1
    print(' Payload ',c,end='\r')

    if c % 10 == 0 : time.sleep(5)
  
