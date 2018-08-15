package com.sds.BizAppLauncher.route;

import android.app.Service;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.os.Messenger;
import android.os.RemoteException;
import android.util.Log;

import com.sds.mchat.MChatConstants;
import com.sds.routeservice.RouteService;
import java.util.Map;
import java.util.HashMap;
/**
 * Created by Hyeseong Kim <hyeseong.kim@architectgroup.com> on 17. 5. 10.
 */

public class RouteManager {
    private static final String TAG = "RouteManager";

    private static final String PROVIDER_PACKAGE = "com.sds.BizAppLauncher";
    private static final String BIND_ACTION      = "com.sds.BizAppLauncher.ROUTE";

    private static final int MSG_GET_ROUTE = 1;

    private static final String KEY_ADDRESS = "ipAddress";
    private static final String KEY_PORT    = "portNumber";
    private static final String KEY_SCHEMA  = "connectionType";

    private Context mContext;
    private boolean mIsBound;
    private boolean isMessageReceived;

    private String ipAddress;
    private String portNumber;
    private String connectionType;
    private Messenger mService;
    private String userId;

    public RouteManager(Context context) {
        mContext = context;
        mIsBound = false;
        isMessageReceived = false;
        //ipAddress;
        //portNumber;
        //connectionType;
    }

    private static RouteManager instance;

    public static void createInstance(Context context) {
        if (instance == null) {
            instance = new RouteManager(context);
        }
    }

    public static RouteManager getInstance() { return instance; }

    public final String getBaseUrl() {
        return connectionType + "://" + ipAddress + ":" + portNumber;
    }

    public final String getSsoUrl() {
        return connectionType + "://" + ipAddress + "/kms/jsp/saml/mattermost/mobile.jsp";
    }

    public final Map getUrl() {
        final Map<String, String> url = new HashMap<String, String>();
        url.put("base", getBaseUrl());
        url.put("sso", getSsoUrl());

        return url;
    }

    public final boolean isEnabled() {
        return mIsBound && isMessageReceived;
    }

    public void setUserInfo(Map<String, String> userInfo) {
      userId = userInfo.get("userId");
    }

    public final String getUserId() {
        return userId;
    }

    public void bindService() {
        Intent intent = new Intent("com.sds.BizAppLauncher.ROUTE");
        intent.setPackage("com.sds.BizAppLauncher");
        try {
          mIsBound = mContext.bindService(intent, conn, Service.BIND_AUTO_CREATE);
          if (!mIsBound) {
              Log.d(TAG,"Could not found com.sds.BizAppLauncher.Try to bind service in library");
              intent = new Intent("com.sds.routeservice.ROUTE");
              intent.setPackage(mContext.getPackageName());
              intent.putExtra(RouteService.EXTRA_USER_ID, getUserId());
              mIsBound = mContext.bindService(intent, conn, Service.BIND_AUTO_CREATE);
            }
        } catch (SecurityException e) {
          mIsBound = false;
          Log.e(TAG, "Failed to bind service by security issue", e);
        }
        if (!mIsBound) {
          // Failed to bind
          // TODO Set default base URL
        }
    }

    public void unbindService() {
        if (mIsBound) {
            mContext.unbindService(conn);
        }
    }

    private ServiceConnection conn = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            mService = new Messenger(service);
            try {
                Message msg = Message.obtain(null, MSG_GET_ROUTE);
                msg.replyTo = mMessenger;
                mService.send(msg);
            } catch (RemoteException e) {
                Log.e("onServiceConnected", e.getMessage());
            }
        }
        @Override
        public void onServiceDisconnected(ComponentName name) {
            Log.d(TAG, "onServiceDisconnected");
            mService = null;
        }
    };

    private final Messenger mMessenger = new Messenger(new IncomingHandler());
    private class IncomingHandler extends Handler {
        @Override
        public void handleMessage(Message msg) {
          Log.d("handleMessage", "Received a message");
          switch (msg.what) {
            case MSG_GET_ROUTE:
                  isMessageReceived = true;

                 ipAddress = msg.peekData().getString("ipAddress");
                 if(ipAddress == null){
                   ipAddress = MChatConstants.getDefaultHost();
                 }
                 portNumber = msg.peekData().getString("portnumber");
                 if(portNumber == null){
                   portNumber = MChatConstants.getDefaultPort();
                 }
                 connectionType = msg.peekData().getString("connectionType");
                 if(connectionType == null){
                   connectionType = MChatConstants.getDefaultConnectionType();
                 }
                // TODO Update base URL for SEMP service.
            break;
            default:
              super.handleMessage(msg);
            break;
          }
        }
    }
}
