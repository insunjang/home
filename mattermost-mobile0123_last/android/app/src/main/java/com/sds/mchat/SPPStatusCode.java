package com.sds.mchat;
public class SPPStatusCode {
  public static final int PUSH_REGISTRATION_SUCCESS   = 0;
  public static final int PUSH_REGISTRATION_FAIL      = 1;
  public static final int PUSH_DEREGISTRATION_SUCCESS = 2;
  public static final int PUSH_DEREGISTRATION_FAIL    = 3;

  public static final int STATUS_TIMEOUT                            = -1;
  public static final int STATUS_NETWORK_NOT_AVAILABLE              = -2;
  public static final int STATUS_PROVISIONING_DATA_EXISTS           = -100;
  public static final int STATUS_INITIALIZATION_ALREADY_COMPLETED   = -102;
  public static final int STATUS_PROVISIONING_FAIL                  = -103;
  public static final int STATUS_INITIALIZATION_FAIL                = -104;
  public static final int STATUS_APPLICATION_ALREADY_DEREGISTRATION = -105;
  public static final int STATUS_EMPTY_DEVICE_ID                    = -106;
  public static final int STATUS_SUCCESS                            = 1000;
  public static final int STATUS_UNKNOWN_MESSAGE_TYPE               = 2000;
  public static final int STATUS_UNEXPECTED_MESSAGE                 = 2001;
  public static final int STATUS_INTERNAL_SERVER_ERROR              = 2002;

}
