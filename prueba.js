import org.apache.commons.codec.binary.Base64;
import org.codehaus.jackson.map.ObjectMapper;

import javax.net.ssl.*;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import java.util.Scanner;

public class Main {

   public static void main(String[] args) {

       System.out.println("*********************************************************");
       System.out.println("* Cisco CMX Command Line REST API Java Utility          *");
       System.out.println("* Please provide the input in the following format      *");
       System.out.println("*                                                       *");
       System.out.println("* REST URL: https://[ip]/api/location/v2/clients/count  *");
       System.out.println("* Username: [username]                                  *");
       System.out.println("* Password: [password]                                  *");
       System.out.println("*                                                       *");
       System.out.println("*                                                       *");
       System.out.println("* Control C to exit                                     *");
       System.out.println("*********************************************************");

       try {
           TrustManager[] trustAllCerts = new TrustManager[] {
                   new X509TrustManager() {
                       public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                           return null;
                       }
                       public void checkClientTrusted(X509Certificate[] certs, String authType) {}

                       public void checkServerTrusted(X509Certificate[] certs, String authType) {}
                   }
           };

           SSLContext sc = null;

           try {
               sc = SSLContext.getInstance("SSL");
           } catch (NoSuchAlgorithmException e) {
               e.printStackTrace();
           }

           try {
               sc.init(null, trustAllCerts, new java.security.SecureRandom());
           } catch (KeyManagementException e) {
               e.printStackTrace();
           }

           HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());

           // Create all-trusting host name verifier
           HostnameVerifier allHostsValid = new HostnameVerifier() {
               public boolean verify(String hostname, SSLSession session) {
                   return true;
               }
           };
           // Install the all-trusting host verifier
           HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);

           Scanner inputReader = new Scanner(System.in);

           boolean storedCredentials = false;
           String username = null;
           String password = null;

           while (true) {

               System.out.print("\nREST URL: ");
               String restURL = inputReader.nextLine();

               if (!storedCredentials) {
                   System.out.print("Username: ");
                   username = inputReader.nextLine();

                   System.out.print("Password: ");
                   password = inputReader.nextLine();
               }

               String authString = username + ":" + password;
               byte[] authEncBytes = Base64.encodeBase64(authString.getBytes());
               String authStringEnc = new String(authEncBytes);

               if (!storedCredentials) {
                   System.out.println("----------------------------------");
                   System.out.println("Authentication string: " + authString);
                   System.out.println("Base64 encoded auth string: " + authStringEnc);
                   System.out.println("----------------------------------");

                   storedCredentials = true;
               }

               URL url = new URL(restURL);
               URLConnection urlConnection = url.openConnection();
               urlConnection.setRequestProperty("Authorization", "Basic " + authStringEnc);

               InputStream is = urlConnection.getInputStream();
               InputStreamReader isr = new InputStreamReader(is);

               int numCharsRead;
               char[] charArray = new char[1024];
               StringBuffer sb = new StringBuffer();
               while ((numCharsRead = isr.read(charArray)) > 0) {
                   sb.append(charArray, 0, numCharsRead);
               }
               String result = sb.toString();

               ObjectMapper mapper = new ObjectMapper();
               Object json = mapper.readValue(result, Object.class);
               System.out.println(mapper.defaultPrettyPrintingWriter().writeValueAsString(json));

               System.out.println("\nControl C to Exit");
           }

       } catch (MalformedURLException e) {
           e.printStackTrace();
       } catch (IOException e) {
           e.printStackTrace();
       }
   }
}
