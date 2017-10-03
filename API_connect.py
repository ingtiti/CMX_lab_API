import requests
requests.packages.urllib3.disable_warnings()
from requests.auth import HTTPBasicAuth
import json


def main():
   print("************************************************************");
   print("* Cisco CMX Command Line REST API Python Utility           *");
   print("* Please provide the input in the following format         *");
   print("*                                                          *");
   print("* REST URL: https://[ip]/api/analytics/v1/now/clientCount  *");
   print("* Username: [username]                                     *");
   print("* Password: [password]                                     *");
   print("*                                                          *");
   print("*                                                          *");
   print("* Control C to exit                                        *");
   print("************************************************************");

   try:
       username = 'learning'
       password = 'learning'
       print(" ")
       print ("user y password asignados")
       restURL = 'https://msesandbox.cisco.com:8081/api/analytics/v1/now/clientCount'
       request = requests.get(
       url = restURL,
       auth = HTTPBasicAuth(username,password),
       verify=False)
       print(" ")
       print ("GET enviado")
       parsed = json.loads(request.content)
       print (json.dumps(parsed, indent=2))
       cuenta = parsed["total"]
       print (cuenta["total"])

   except requests.exceptions.RequestException as e:
               print(e)

if __name__ == "__main__":
    main()
