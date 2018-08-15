package com.sds.mchat.sso;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.os.RemoteException;
import android.util.Log;

import com.sds.BizAppLauncher.sso.ISSOService;
import com.sds.BizAppLauncher.sso.SSORequestKey;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * Created by Hyeseong Kim <hyeseong.kim@architectgroup.com> on 16. 12. 8.
 */

public final class SSOManager {
    private static final String TAG = "SSOManager";

    private static final String BIND_ACTION = "com.sds.BizAppLauncher.sso.ISSOServiceBind";

    private Context context;
    private String packageName;
    private ISSOService service;
    private boolean isBound;
    private Map userInfo;
    private String launcherLog;
    private String appStatus;
    private String appId;
    private int lockState;
    private boolean ssoState;
    public static final int SSO_STATUS_NONE = 0; // 초기값.
    public static final int SSO_STATUS_SCREEN_IS_LOCKED = 1; //lock상태
    public static final int SSO_STATUS_SCREEN_IS_UNLOCKED = 2; //unlock상태
    public static final int SSO_STATUS_SCREENLOCK_PWD_IS_NOT_SET = 3; //패스워드 셋팅

    private SSOManager(Context context) {
        this.context = context;
        this.isBound = false;
        this.packageName = context.getPackageName();
    }

    private static SSOManager instance;

    public static void createInstance(Context context) {
        if (instance == null) {
            instance = new SSOManager(context);
        }
    }

    public static SSOManager getInstance() {
        return instance;
    }

    public final String getLauncherLog() {
        return launcherLog;
    }

    public final String getAppId() {
        return appId;
    }

    public void bindService() {
        packageName = context.getPackageName();

        Intent intent = new Intent(BIND_ACTION);
        intent.putExtra("packageName", packageName);
        intent.setPackage("com.sds.BizAppLauncher");
        context.bindService(intent, conn, Context.BIND_AUTO_CREATE);
    }

    public void unbindService() {
        if (isBound) {
            context.unbindService(conn);
        }
    }

    public final Map getUserInfo() {
        return userInfo;
    }

    public final boolean isEnabled() {
        return userInfo != null;
    }

    private void saveUserInfo() throws RemoteException {
        List<String> keys = Arrays.asList(
                SSORequestKey.USERID,
                SSORequestKey.EPID);

        userInfo = service.getUserInfo(keys, packageName);

        if (userInfo != null) {
            Log.d(TAG, "OKOKOKOKOKOKOKOKOKOKOKOKuserInfo!=null");
            Log.d(TAG, userInfo.toString());
        }
    }

    private ServiceConnection conn = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName componentName, final IBinder binder) {

            SSOManager.this.service = ISSOService.Stub.asInterface(binder);

            try {
                saveUserInfo();

                //Availiable from Jan, 2017
                appId = service.getAppId(packageName);
                Log.d(TAG, "appId : " + appId);

                launcherLog = service.getLauncherLog("7", appId);
                Log.d(TAG, "launcherLog : " + launcherLog);

            } catch (RemoteException e) {
                e.printStackTrace();

            } catch (SecurityException e) {
                Log.e(TAG, "Binder invocation to an incorrect interface");
                return;
            }
            isBound = true;
        }

        @Override
        public void onServiceDisconnected(ComponentName componentName) {
            service = null;
            isBound = false;
        }
    };

    public final int checkLockTime() {
        try {
              if(isBound){
                lockState = service.checkLockTime();
              }else{
                lockState = SSO_STATUS_NONE;
              }
              Log.d(TAG, "lockState : " + lockState);
            } catch (RemoteException e) {
              e.printStackTrace();
            }
            return lockState;
    }

    public final boolean isSingleSignOn() {
      try {
          if(isBound){
            ssoState = service.isSingleSignOn();
          }else{
            ssoState = false;
          }
          Log.d(TAG, "ssoState : " + ssoState);
        } catch (RemoteException e) {
          e.printStackTrace();
        }
        return ssoState;
    }
}
