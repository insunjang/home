package com.sds.mchat;

/**
 * Created by Hyeseong Kim <hyeseong.kim@architectgroup.com> on 16. 12. 14.
 */

public class SPPConstants {
    public static final String APPID_MCHAT = "dfb27236d365bad3";

    public static final String EXTRA_REQTYPE     = "reqType";
    public static final String EXTRA_PUSH_STATUS = "com.sec.spp.Status";
    public static final String EXTRA_ERROR       = "Error";
    public static final String EXTRA_USERDATA    = "userdata";
    public static final String EXTRA_ACK         = "ack";
    public static final String EXTRA_NOTIID      = "notificationId";

    public static final String EXTRA_ENCODING    = "encoding";
    public static final String EXTRA_REGID      = "regID";
    public static final String EXTRA_REQUESTID   = "requestID";
    public static final String EXTRA_SENDER      = "sender";
    public static final String EXTRA_MESSAGE     = "message";
    public static final String EXTRA_APPDATA    = "appData";
    public static final String EXTRA_EXPIRYDATE   = "expiryDate";
    public static final String EXTRA_DELAYDATE   = "delayDate";
    public static final String EXTRA_RELIABLEOPTION   = "reliableOption";
    public static final String EXTRA_SESSIONINFO   = "sessionInfo";
    public static final String EXTRA_TIMESTAMP   = "timeStamp";
    public static final String EXTRA_CONNECTIONTERM   = "connectionTerm";
    public static final String EXTRA_RECEIVEDTIMESTAMP   = "receivedTimeStamp";
    public static final String EXTRA_STATUSCODE   = "statusCode";
    public static final String EXTRA_STATUSMSG   = "statusMsg";
    public static final String EXTRA_APPID       = "appId";
    public static final String EXTRA_APPSECRET       = "appSecret";

    public static final String ENCODING_BASE64       = "base64";

    public static final String SPP_PACAGE_NAME = "com.sec.spp.push";
    public static final String ACTION_SERVICE_ABNORMALLY_STOPPED     = "com.sec.spp.ServiceAbnormallyStoppedAction";
    public static final String ACTION_PUSH_REGISTRATION_CHANGED      = "com.sec.spp.RegistrationChangedAction";
    public static final String ACTION_NOTIFICATION_ACK_RESULT_ACTION = "com.sec.spp.NotificationAckResultAction";

    public static final int PUSH_REQ_TYPE_REGISTRATION   = 1;
    public static final int PUSH_REQ_TYPE_DEREGISTRATION = 2;

}
