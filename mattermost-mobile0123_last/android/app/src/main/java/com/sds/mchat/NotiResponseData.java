package com.sds.mchat;

public class NotiResponseData {

    String regID;
    String requestID;
    String statusCode;
    String statusMsg;
    String isConnect;

    public String getRegID() {
        return regID;
    }

    public String getRequestID() {
        return requestID;
    }

    public String getStatusCode() {
        return statusCode;
    }

    public String getisConnect() {
        return isConnect;
    }
    public String getStatusMsg() {
        return statusMsg;
    }

    public void setRegID(String regID) {
        this.regID = regID;
    }

    public void setRequestID(String requestID) {
        this.requestID = requestID;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }

    public void setStatusMsg(String statusMsg) {
        this.statusMsg = statusMsg;
    }

    public void setisConnect(String isConnect){
      this.isConnect = isConnect;
    }

}
