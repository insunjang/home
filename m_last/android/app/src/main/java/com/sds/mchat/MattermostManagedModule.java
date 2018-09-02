package com.sds.mchat;

import android.app.Application;
import android.content.Context;
import android.os.Bundle;

import java.util.HashMap;
import java.util.Map;
import android.util.Log;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.ReactInstanceManager;


public class MattermostManagedModule extends ReactContextBaseJavaModule {

    private static final String TAG = "MattermostManagedModule";
    private static MattermostManagedModule instance;
    private String userId;
    private String epid;
    private String baseUrl;
    private String ssoUrl;
    //private int isLocked ;
    //private boolean isOnOff = false;
    private boolean shouldBlurAppScreen = false;
    private boolean stateBAS = false;
    private ReactContext mReactContext = null;

    private MattermostManagedModule(ReactApplicationContext reactContext) {
        super(reactContext);
        //mReactContext = reactContext;
    }

    public static MattermostManagedModule getInstance(ReactApplicationContext reactContext) {
        if (instance == null) {
            instance = new MattermostManagedModule(reactContext);
        }
        return instance;
    }

    public static MattermostManagedModule getInstance() {
        return instance;
    }

    @Override
    public String getName() {
        return "MattermostManaged";
    }

    @ReactMethod
    public void blurAppScreen(boolean enabled) {
        shouldBlurAppScreen = enabled;
    }

    @ReactMethod
    public void getUserInfo(final Promise promise) {
      try{
        WritableMap map = Arguments.createMap();
        map.putString("u", userId);
        map.putString("e", epid);

        promise.resolve(map);
      }catch (Exception e) {
          promise.reject("no get User Infomations", e);
      }
    }

    @ReactMethod
    public void getUrl(final Promise promise) {
      try{
        WritableMap map = Arguments.createMap();
        map.putString("base", baseUrl);
        map.putString("sso", ssoUrl);

        promise.resolve(map);
      }catch (Exception e) {
          promise.reject("no get User Infomations", e);
      }
    }

    /*@ReactMethod
    public void getStateBAS() {
        stateBAS = state;
    }

    public void setStateBAS(boolean state) {
        stateBAS = state;
    }*/


    @ReactMethod
    public void getInfoFromBAS(final Promise promise) {
      try{
        WritableMap map = Arguments.createMap();
        map.putString("u", userId);
        map.putString("e", epid);
        map.putString("base", baseUrl);
        map.putString("sso", ssoUrl);

        promise.resolve(map);
      }catch (Exception e) {
          promise.reject("no get User Infomations", e);
      }
    }

    public void setUserInfo(Map<String, String> userInfo) {
      userId = userInfo.get("userId");
      epid = userInfo.get("epid");
    }

    public void setUrl(Map<String, String> url) {
      baseUrl = url.get("base");
      ssoUrl = url.get("sso");
    }

    public void setInfoFromBAS(Map<String, String> userInfo, Map<String, String> url) {
      userId = userInfo.get("userId");
      epid = userInfo.get("epid");
      baseUrl = url.get("base");
      ssoUrl = url.get("sso");

      if(userId != null && epid != null && baseUrl != null && ssoUrl != null){
        sendInfoFromBAS(true);
      }else{
        sendInfoFromBAS(false);
      }
    }

    public void sendInfoFromBAS(boolean isReady) {
        WritableArray args = Arguments.createArray();
        args.pushBoolean(isReady);
        getEventEmitter().emit("managedInfoFromBAS", args);

    }

    public boolean isBlurAppScreenEnabled() {
        return shouldBlurAppScreen;
    }

    @ReactMethod
    public void getConfig(final Promise promise) {
        try {
            Bundle config = NotificationsLifecycleFacade.getInstance().getManagedConfig();
            if (config != null) {
                Object result = Arguments.fromBundle(config);
                promise.resolve(result);
            } else {
                throw new Exception("The MDM vendor has not sent any Managed configuration");
            }
        } catch (Exception e) {
            promise.reject("no managed configuration", e);
        }
    }

    private DeviceEventManagerModule.RCTDeviceEventEmitter getEventEmitter() {
       mReactContext = NotificationsLifecycleFacade.getInstance().getRunningReactContext();
      //return getReactApplicationContext()
      return mReactContext
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
    }

}
