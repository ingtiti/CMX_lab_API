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
   print("* REST URL: https://[ip]/api/location/v1/clients/count  *");
   print("* Username: [username]                                  *");
   print("* Password: [password]                                  *");
   print("*                                                       *");
   print("*                                                       *");
   print("* Control C to exit                                     *");
   print("*********************************************************");

   storedCredentials = False


try:

   username = 'learning'
   password = 'learning'
   print ("user y password asignados")
   restURL = 'https://msesandbox.cisco.com:8081/api/location/v1/clients/count'
   request = requests.get(
   url = restURL,
   auth = HTTPBasicAuth(username,password),
   verify=False)
   print ("GET enviado")
   parsed = json.loads(request.content)
   print json.dumps(parsed, indent=2)

except requests.exceptions.RequestException as e:
           print(e)
           print(e)
