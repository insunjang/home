package com.sds.mchat;

import com.reactnativenavigation.controllers.SplashActivity;
import android.os.Bundle;
import com.sds.mchat.sso.SSOManager;
import com.sds.BizAppLauncher.route.RouteManager;
import android.support.annotation.Nullable;
import java.util.HashMap;
import java.util.Map;
import com.sds.BizAppLauncher.sso.SSORequestKey;
import android.util.Log;
import android.content.Intent;
import android.support.v7.app.AlertDialog;
import android.content.DialogInterface;
import android.widget.Toast;
import com.sds.ems.network.ResponseListener;
import com.sds.ems.utils.UpdateApplication;
import com.sds.routeservice.LaunchTimeProfiler;
import android.support.annotation.NonNull;
import android.content.pm.PackageManager;
import android.os.Build;
import android.Manifest;
import android.support.v4.app.ActivityCompat;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.ComponentName;
import android.support.v4.content.IntentCompat;

public class MainActivity extends SplashActivity {

    private static final String TAG = "MainActivity";
    private static final int REQUEST_READ_PHONE_STATE_PERMISSION = 225;
    protected SSOManager sso = SSOManager.getInstance();
    protected RouteManager route = RouteManager.getInstance();
    protected LaunchTimeProfiler Profiler = LaunchTimeProfiler.getInstance();
    private static final long pendingTimeout = 1000 * 1;
    private static final long pendingWaitDelay = 2000;
    private long startMillis;
    private static final int IS_UNLOCKED = 2;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Profiler.startUp();
        sso.bindService();
        route.bindService();
        if(isPermissionGranted()){
          onAfterCreate();
        }
    }

  private void onAfterCreate() {
        startMillis = System.currentTimeMillis();
        waitPending();
  }

  private void waitPending(){
      MainApplication.handler.postDelayed(new Runnable() {
          @Override
          public void run() {
            if (sso.isEnabled()){
                versionChecker(sso);
            }
          }
      }, pendingWaitDelay);
  }


public void getDataFromBAS () {
    final int checkLockTime = sso.checkLockTime();
    final boolean isSingleSignOn = sso.isSingleSignOn();
    final boolean overTimeout = System.currentTimeMillis() - startMillis > pendingTimeout;
    MattermostManagedModule managedModule = MattermostManagedModule.getInstance();

    if(checkLockTime != IS_UNLOCKED || !isSingleSignOn){
      ExitAlert();
    }else{
      if ((sso.isEnabled() && route.isEnabled() && managedModule != null) /*|| overTimeout*/) {
        final Map<String, String> userInfo = sso.getUserInfo();;
        final Map<String, String> url = route.getUrl();
        String userId = userInfo.get("userId");
        String host = url.get("base");

        Profiler.setUserId(userId);
        Profiler.setRoute(host);

        route.setUserInfo(userInfo);
        managedModule.setInfoFromBAS(userInfo, url);
      } else {
        if(!overTimeout)
          waitPending();
        else
          ExitAlert();
      }
  }
}

public void appExit () {
  if(sso != null){
    sso.unbindService();
  }
  if(route != null){
    route.unbindService();
  }
  ActivityCompat.finishAffinity(this);
  System.runFinalizersOnExit(true);
  System.exit(0);
}

void ExitAlert()
{
   AlertDialog.Builder builder = new AlertDialog.Builder(this);
   builder.setTitle("Notice");
   builder.setMessage("You need to make sure BAS APP first");
   builder.setPositiveButton("OK",
           new DialogInterface.OnClickListener() {
               public void onClick(DialogInterface dialog, int which) {
                   appExit();
               }
           });
   builder.show();
}

void restart()
{
  PackageManager packageManager = getApplication().getPackageManager();
  Intent intent = packageManager.getLaunchIntentForPackage(getApplication().getPackageName());
  ComponentName componentName = intent.getComponent();
  Intent mainIntent = IntentCompat.makeRestartActivityTask(componentName);
  getApplication().startActivity(mainIntent);
  System.exit(0);

}
  @Override
  public int getSplashLayout() {
      return R.layout.launch_screen;
  }

  @Override
  protected void onDestroy() {
      super.onDestroy();
      if(sso != null){
        sso.unbindService();
      }
      if(route != null){
        route.unbindService();
      }
  }


  public  boolean isPermissionGranted() {
    if (Build.VERSION.SDK_INT >= 23) {
        if (checkSelfPermission(Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED) {
            Log.v(TAG,"Permission is granted");
            return true;
        } else {
            Log.v(TAG,"Permission is revoked");
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.READ_PHONE_STATE}, REQUEST_READ_PHONE_STATE_PERMISSION);
            return false;
        }
    }
    else {
        Log.v(TAG,"Permission is granted");
        return true;
    }
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, @NonNull String permissions[], @NonNull int[] grantResults) {
    switch (requestCode) {
        case REQUEST_READ_PHONE_STATE_PERMISSION: {
            // If request is cancelled, the result arrays are empty.
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Log.e(TAG, "Permission Granted");
                restart();
            } else {
                Log.e(TAG, "Permission Denied");
                appExit();
            }
        }
        break;
        default:
            super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}

  private void versionChecker(SSOManager sso) {
        final HashMap<String, String> userInfo= (HashMap)sso.getUserInfo();
        final String appId = sso.getAppId();
        final String launcherLog = sso.getLauncherLog();

        ResponseListener responseListener = new ResponseListener() {
            @Override
            public void receive(Object responseData) {
                // responseData
                // String C200이면, 업데이트 필요. 자동 업데이트 진행됨
                // String C201이면, 현재 상태는 최신패키지
                // String C001이면, 서버 오류
                // String C002이면, 기타 오류
                if ("C200".equals(responseData.toString())){
                    UpdateApplication.getInstance(getApplicationContext(), userInfo).doUpdate();
                }else if("C201".equals(responseData.toString())){
                    getDataFromBAS();
                }else{
                    appExit();
                }
            }
        };
        UpdateApplication.getInstance(this, userInfo).checkUpdate(appId, launcherLog, responseListener, false);
        // 버전 업데이트 체크 진행 ]]
    }

}
