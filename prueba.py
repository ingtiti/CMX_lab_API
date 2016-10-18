import requests
requests.packages.urllib3.disable_warnings()
from requests.auth import HTTPBasicAuth
import json
import base64

def main():
   print("*********************************************************");
   print("* Cisco CMX Command Line REST API Python Utility        *");
   print("* Please provide the input in the following format      *");
   print("*                                                       *");
   print("* REST URL: https://[ip]/api/location/v2/clients/count  *");
   print("* Username: [username]                                  *");
   print("* Password: [password]                                  *");
   print("*                                                       *");
   print("*                                                       *");
   print("* Control C to exit                                     *");
   print("*********************************************************");

   storedCredentials = False
   username = None
   password = None

   while True:
       restURL = raw_input("\nREST URL: ")

       if not storedCredentials:
           username = raw_input("Username: ")
           password = raw_input("Password: ")
           storedCredentials = True

           print("----------------------------------")
           print("Authentication string: "+ username+":"+password)
           print("Base64 encoded auth string: " + base64.b64encode(username+":"+password))
           print("----------------------------------")

       try:
           print("entro al try")
           #request = requests.get(
           #url = restURL,
           #auth = HTTPBasicAuth(username,password),
           #verify=False)
           r = requests.get(restURL, auth= HTTPBasicAuth(username, password))
           print(r.status_code)
           print("voy bien")
           request.status_code

           #parsed = json.loads(request.content)
           #print json.dumps(parsed, indent=2)


       except requests.exceptions.RequestException as e:
           print(e)
           print("no se que es esto")

       print("\nControl C to Exit")

if __name__ == "__main__":
    main()
