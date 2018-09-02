package com.sds.mchat;

    /*******************************************************
     appID : 1234567890987654
     appSecret : dYo/o/m11gmWmjs7+5f+2zLNVOc=

     //request
     {
     “encoding” : “base64” // Optional
     “regID” : “ab123456”,
     “requestID” : “0000001”,
     “sender” : “oscal”, // Optional
     “message” : “example”, // Optional
     “appData” : “{id:asdf&passwd:1234}”, // Optional, (Opaque)
     “expiryDate” : 720, // Optional
     “delayDate” : 60, // Optional
     “reliableOption” : “Transport”, // Optional
     “sessionInfo” : “192.168.0.1-8080-1234567”, // Optional
     “timeStamp” : 1234567890, // Optional
     “connectionTerm” : 0, // Optional
     “receivedTimeStamp” : 1234567890 // Optional
     }

     //response
     {
     "results":[
     {
     "regID":"ab123456",
     "requestID":"0000001",
     "statusCode":1000,
     "statusMsg":"Success"
     }
     ]
     }
     ********************************************************/
import android.content.ContentValues;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;
import java.io.InputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import android.content.ContentValues;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;
import com.sds.mchat.SPPConstants;
import com.sds.mchat.NotiRequestData;
import com.sds.mchat.NotiResponseData;

import java.util.HashMap;
import java.io.BufferedInputStream;
import java.util.ArrayList;
import java.util.List;

public class RequestHttpURLConnection {

  public List<NotiResponseData> request(String _url, String appID, String appSecret, NotiRequestData notiData){

    HttpURLConnection httpCon = null;
    String str = "";
    List<NotiResponseData> data = new ArrayList<NotiResponseData>();

    try{
      URL url = new URL(_url);
      JSONObject jsonObject = new JSONObject();

      jsonObject.accumulate(SPPConstants.EXTRA_ENCODING, SPPConstants.ENCODING_BASE64); //Optional
      jsonObject.accumulate(SPPConstants.EXTRA_REGID, notiData.getRegID());
      jsonObject.accumulate(SPPConstants.EXTRA_REQUESTID, notiData.getRequestID());
      jsonObject.accumulate(SPPConstants.EXTRA_SENDER, notiData.getSender()); // Optional
      jsonObject.accumulate(SPPConstants.EXTRA_MESSAGE, notiData.getMessage()); // Optional
      jsonObject.accumulate(SPPConstants.EXTRA_APPDATA, notiData.getAppData()); // Optional, (Opaque)
      jsonObject.accumulate(SPPConstants.EXTRA_EXPIRYDATE, notiData.getExpiryDate()); // Optional
      jsonObject.accumulate(SPPConstants.EXTRA_DELAYDATE, notiData.getDelayDate()); // Optional
      jsonObject.accumulate(SPPConstants.EXTRA_RELIABLEOPTION, notiData.getReliableOption()); // Optional
      jsonObject.accumulate(SPPConstants.EXTRA_SESSIONINFO, notiData.getSessionInfo()); // Optional
      jsonObject.accumulate(SPPConstants.EXTRA_TIMESTAMP, notiData.getTimeStamp()); // Optional
      jsonObject.accumulate(SPPConstants.EXTRA_CONNECTIONTERM, notiData.getConnectionTerm()); //Optional
      jsonObject.accumulate(SPPConstants.EXTRA_RECEIVEDTIMESTAMP, notiData.getReceivedTimeStamp());// Optional

      str = jsonObject.toString();

      httpCon = (HttpURLConnection) url.openConnection();

      httpCon.setRequestMethod("POST"); // URL 요청에 대한 메소드 설정 : POST.
      httpCon.setRequestProperty("Accept-Charset", "UTF-8"); // Accept-Charset 설정.
      httpCon.setRequestProperty("Accept", "application/json");
      httpCon.setRequestProperty("Content-type", "application/json");
      httpCon.setRequestProperty("appID", appID);
      httpCon.setRequestProperty("appSecret", appSecret);

      httpCon.setDoOutput(true);
      httpCon.setDoInput(true);

      OutputStream os = httpCon.getOutputStream();
      os.write(str.getBytes("UTF-8"));
      os.flush();
      os.close();

      if (httpCon.getResponseCode() != HttpURLConnection.HTTP_OK)
        return null;

      try {
        InputStream in = new BufferedInputStream(httpCon.getInputStream());
        JSONObject json = new JSONObject(getStringFromInputStream(in));

        data = parseJSON(json);
        return data;
      } catch (IOException e) {
        e.printStackTrace();
      } finally {
        httpCon.disconnect();
      }

    } catch (MalformedURLException e) { // for URL.
      e.printStackTrace();
      return null;
    } catch (IOException e) { // for openConnection().
      e.printStackTrace();
      return null;
    } catch (JSONException e) {
      e.printStackTrace();
      return null;
    } finally {
      if (httpCon != null)
        httpCon.disconnect();
    }
    return null;
  }

public List<NotiResponseData> multipleRequest(String _url, String appID, String appSecret, NotiRequestData[] notiData){

  HttpURLConnection httpCon = null;
  String str = "";
  List<NotiResponseData> data = new ArrayList<NotiResponseData>();

  try{
    URL url = new URL(_url);
    JSONArray ja = new JSONArray();

    for(int i= 0; i < notiData.length; i++)
    {
      JSONObject jsonObject = new JSONObject();
      jsonObject.accumulate(SPPConstants.EXTRA_ENCODING, SPPConstants.ENCODING_BASE64); //Optional
      jsonObject.accumulate(SPPConstants.EXTRA_REGID, notiData[i].getRegID());
      jsonObject.accumulate(SPPConstants.EXTRA_REQUESTID, notiData[i].getRequestID() + i);
      jsonObject.accumulate(SPPConstants.EXTRA_SENDER, notiData[i].getSender()); // Optional
      jsonObject.accumulate(SPPConstants.EXTRA_MESSAGE, notiData[i].getMessage()); // Optional
      jsonObject.accumulate(SPPConstants.EXTRA_APPDATA, notiData[i].getAppData()); // Optional, (Opaque)
      jsonObject.accumulate(SPPConstants.EXTRA_EXPIRYDATE, notiData[i].getExpiryDate()); // Optional
      jsonObject.accumulate(SPPConstants.EXTRA_DELAYDATE, notiData[i].getDelayDate()); // Optional
      jsonObject.accumulate(SPPConstants.EXTRA_RELIABLEOPTION, notiData[i].getReliableOption()); // Optional
      jsonObject.accumulate(SPPConstants.EXTRA_SESSIONINFO, notiData[i].getSessionInfo()); // Optional
      jsonObject.accumulate(SPPConstants.EXTRA_TIMESTAMP, notiData[i].getTimeStamp()); // Optional
      jsonObject.accumulate(SPPConstants.EXTRA_CONNECTIONTERM, notiData[i].getConnectionTerm()); //Optional
      jsonObject.accumulate(SPPConstants.EXTRA_RECEIVEDTIMESTAMP, notiData[i].getReceivedTimeStamp());// Optional
      ja.put(jsonObject);
    }

    JSONObject mainObj = new JSONObject();
    mainObj.put("messages", ja);

    str = mainObj.toString();
    httpCon = (HttpURLConnection) url.openConnection();
    httpCon.setRequestMethod("POST"); // URL 요청에 대한 메소드 설정 : POST.
    httpCon.setRequestProperty("Accept-Charset", "UTF-8"); // Accept-Charset 설정.
    httpCon.setRequestProperty("Accept", "application/json");
    httpCon.setRequestProperty("Content-type", "application/json");
    httpCon.setRequestProperty("appID", appID);
    httpCon.setRequestProperty("appSecret", appSecret);

    httpCon.setDoOutput(true);
    httpCon.setDoInput(true);

    OutputStream os = httpCon.getOutputStream();
    os.write(str.getBytes("UTF-8"));
    os.flush();
    os.close();

    if (httpCon.getResponseCode() != HttpURLConnection.HTTP_OK)
      return null;

    try {
        InputStream in = new BufferedInputStream(httpCon.getInputStream());
        JSONObject json = new JSONObject(getStringFromInputStream(in));
        data = parseJSON(json);
        return data;
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      httpCon.disconnect();
    }

  } catch (MalformedURLException e) { // for URL.
    e.printStackTrace();
  } catch (IOException e) { // for openConnection().
    e.printStackTrace();
  } catch (JSONException e) {
    e.printStackTrace();
  } finally {
    if (httpCon != null)
      httpCon.disconnect();
  }
  return null;
}

public List<NotiResponseData> multiCast(String _url, String appID, String appSecret, String[] regID, NotiRequestData notiData){

  HttpURLConnection httpCon = null;
  String str = "";
  List<NotiResponseData> data = new ArrayList<NotiResponseData>();
  try{
    URL url = new URL(_url);

    JSONObject jsonObject = new JSONObject();
    jsonObject.accumulate(SPPConstants.EXTRA_ENCODING, SPPConstants.ENCODING_BASE64); //Optional

    JSONArray ja = new JSONArray(regID);

    jsonObject.put(SPPConstants.EXTRA_REGID, ja);
    jsonObject.accumulate(SPPConstants.EXTRA_REQUESTID, notiData.getRequestID());
    jsonObject.accumulate(SPPConstants.EXTRA_SENDER, notiData.getSender()); // Optional
    jsonObject.accumulate(SPPConstants.EXTRA_MESSAGE, notiData.getMessage()); // Optional
    jsonObject.accumulate(SPPConstants.EXTRA_APPDATA, notiData.getAppData()); // Optional, (Opaque)
    jsonObject.accumulate(SPPConstants.EXTRA_EXPIRYDATE, notiData.getExpiryDate()); // Optional
    jsonObject.accumulate(SPPConstants.EXTRA_DELAYDATE, notiData.getDelayDate()); // Optional
    jsonObject.accumulate(SPPConstants.EXTRA_RELIABLEOPTION, notiData.getReliableOption()); // Optional
    jsonObject.accumulate(SPPConstants.EXTRA_SESSIONINFO, notiData.getSessionInfo()); // Optional
    jsonObject.accumulate(SPPConstants.EXTRA_TIMESTAMP, notiData.getTimeStamp()); // Optional
    jsonObject.accumulate(SPPConstants.EXTRA_CONNECTIONTERM, notiData.getConnectionTerm()); //Optional
    jsonObject.accumulate(SPPConstants.EXTRA_RECEIVEDTIMESTAMP, notiData.getReceivedTimeStamp());// Optional

    str = jsonObject.toString();

    httpCon = (HttpURLConnection) url.openConnection();

    httpCon.setRequestMethod("POST"); // URL 요청에 대한 메소드 설정 : POST.
    httpCon.setRequestProperty("Accept-Charset", "UTF-8"); // Accept-Charset 설정.
    httpCon.setRequestProperty("Accept", "application/json");
    httpCon.setRequestProperty("Content-type", "application/json");
    httpCon.setRequestProperty("appID", appID);
    httpCon.setRequestProperty("appSecret", appSecret);

    httpCon.setDoOutput(true);
    httpCon.setDoInput(true);

    OutputStream os = httpCon.getOutputStream();
    os.write(str.getBytes("UTF-8"));
    os.flush();
    os.close();

    if (httpCon.getResponseCode() != HttpURLConnection.HTTP_OK)
      return null;

    try {
        InputStream in = new BufferedInputStream(httpCon.getInputStream());
        JSONObject json = new JSONObject(getStringFromInputStream(in));
        data = parseJSON(json);
        return data;
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      httpCon.disconnect();
    }

  } catch (MalformedURLException e) { // for URL.
    e.printStackTrace();
  } catch (IOException e) { // for openConnection().
    e.printStackTrace();
  } catch (JSONException e) {
    e.printStackTrace();
  } finally {
    if (httpCon != null)
      httpCon.disconnect();
  }
  return null;
}
public List<NotiResponseData> deviceCheckSingle(String _url, String appID, String appSecret, String regID ){

  HttpURLConnection httpCon = null;
  String str = "";
  List<NotiResponseData> data = new ArrayList<NotiResponseData>();

  try{
    URL url = new URL(_url);
    JSONObject jsonObject = new JSONObject();

    jsonObject.accumulate(SPPConstants.EXTRA_ENCODING, SPPConstants.ENCODING_BASE64); //Optional
    jsonObject.accumulate(SPPConstants.EXTRA_REGID, regID);

    str = jsonObject.toString();

    httpCon = (HttpURLConnection) url.openConnection();

    httpCon.setRequestMethod("POST"); // URL 요청에 대한 메소드 설정 : POST.
    httpCon.setRequestProperty("Accept-Charset", "UTF-8"); // Accept-Charset 설정.
    httpCon.setRequestProperty("Accept", "application/json");
    httpCon.setRequestProperty("Content-type", "application/json");
    httpCon.setRequestProperty("appID", appID);
    httpCon.setRequestProperty("appSecret", appSecret);

    httpCon.setDoOutput(true);
    httpCon.setDoInput(true);

    OutputStream os = httpCon.getOutputStream();
    os.write(str.getBytes("UTF-8"));
    os.flush();
    os.close();

    if (httpCon.getResponseCode() != HttpURLConnection.HTTP_OK)
      return null;

    try {
      InputStream in = new BufferedInputStream(httpCon.getInputStream());
      JSONObject json = new JSONObject(getStringFromInputStream(in));

      data = parseJSONdevice(json);
      return data;
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      httpCon.disconnect();
    }
  } catch (MalformedURLException e) { // for URL.
    e.printStackTrace();
    return null;
  } catch (IOException e) { // for openConnection().
    e.printStackTrace();
    return null;
  } catch (JSONException e) {
    e.printStackTrace();
    return null;
  } finally {
    if (httpCon != null)
      httpCon.disconnect();
  }
  return null;
}

public List<NotiResponseData> deviceCheckMulti(String _url, String appID, String appSecret, String[] regID){

  HttpURLConnection httpCon = null;
  String str = "";
  List<NotiResponseData> data = new ArrayList<NotiResponseData>();

  try{
    URL url = new URL(_url);
    JSONObject jsonObject = new JSONObject();

    jsonObject.accumulate(SPPConstants.EXTRA_ENCODING, SPPConstants.ENCODING_BASE64); //Optional

    JSONArray ja = new JSONArray(regID);
    jsonObject.put(SPPConstants.EXTRA_REGID, ja);
    str = jsonObject.toString();

    httpCon = (HttpURLConnection) url.openConnection();

    httpCon.setRequestMethod("POST"); // URL 요청에 대한 메소드 설정 : POST.
    httpCon.setRequestProperty("Accept-Charset", "UTF-8"); // Accept-Charset 설정.
    httpCon.setRequestProperty("Accept", "application/json");
    httpCon.setRequestProperty("Content-type", "application/json");
    httpCon.setRequestProperty("appID", appID);
    httpCon.setRequestProperty("appSecret", appSecret);

    httpCon.setDoOutput(true);
    httpCon.setDoInput(true);

    OutputStream os = httpCon.getOutputStream();
    os.write(str.getBytes("UTF-8"));
    os.flush();
    os.close();

    if (httpCon.getResponseCode() != HttpURLConnection.HTTP_OK)
      return null;

    try {
      InputStream in = new BufferedInputStream(httpCon.getInputStream());
      JSONObject json = new JSONObject(getStringFromInputStream(in));

      data = parseJSONdevice(json);
      return data;
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      httpCon.disconnect();
    }

  } catch (MalformedURLException e) { // for URL.
    e.printStackTrace();
    return null;
  } catch (IOException e) { // for openConnection().
    e.printStackTrace();
    return null;
  } catch (JSONException e) {
    e.printStackTrace();
    return null;
  } finally {
    if (httpCon != null)
      httpCon.disconnect();
  }
  return null;
}


private List<NotiResponseData> parseJSONdevice(JSONObject json) throws JSONException {
  String regID = null;
  String isConnect = null;
  String statusCode = null;
  String statusMsg = null;

  try {
      String results = (String) json.get("results");
      JSONArray jarray = new JSONArray(results);
      List<NotiResponseData> data = new ArrayList<NotiResponseData>();

      for(int i=0; i < jarray.length(); i++){
        JSONObject jObject = jarray.getJSONObject(i);
        regID = jObject.getString(SPPConstants.EXTRA_REGID);
        isConnect = jObject.getString(SPPConstants.EXTRA_REQUESTID);
        statusCode = jObject.getString(SPPConstants.EXTRA_STATUSCODE);
        statusMsg = jObject.getString(SPPConstants.EXTRA_STATUSMSG);
        data.get(i).setRegID(regID);
        data.get(i).setisConnect(isConnect);
        data.get(i).setStatusCode(statusCode);
        data.get(i).setStatusMsg(statusMsg);
      }
      return data;
  } catch (JSONException e) {
      e.printStackTrace();
  }
  return null;
}

private List<NotiResponseData> parseJSON(JSONObject json) throws JSONException {
    String regID = null;
    String requestID = null;
    String statusCode = null;
    String statusMsg = null;

    try {
        String results = (String) json.get("results");
        JSONArray jarray = new JSONArray(results);
        List<NotiResponseData> data = new ArrayList<NotiResponseData>();

        for(int i=0; i < jarray.length(); i++){
          JSONObject jObject = jarray.getJSONObject(i);
          regID = jObject.getString(SPPConstants.EXTRA_REGID);
          requestID = jObject.getString(SPPConstants.EXTRA_REQUESTID);
          statusCode = jObject.getString(SPPConstants.EXTRA_STATUSCODE);
          statusMsg = jObject.getString(SPPConstants.EXTRA_STATUSMSG);
          data.get(i).setRegID(regID);
          data.get(i).setRequestID(requestID);
          data.get(i).setStatusCode(statusCode);
          data.get(i).setStatusMsg(statusMsg);
        }
        return data;
    } catch (JSONException e) {
        e.printStackTrace();
    }
    return null;
  }


  private static String getStringFromInputStream(InputStream is) {
        BufferedReader br = null;
        StringBuilder sb = new StringBuilder();
        String line;

        try {
            br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
            while ((line = br.readLine()) != null) {
                sb.append(line);
          }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return sb.toString();
    }

}
