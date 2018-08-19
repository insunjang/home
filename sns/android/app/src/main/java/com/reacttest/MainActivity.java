package com.reacttest;
import android.app.Activity;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.support.annotation.Nullable;
import android.support.v4.content.LocalBroadcastManager;

public class MainActivity extends ReactActivity {

  private static final String EventBridgeModuleIntentEventName = "EventBridgeModuleIntentEventName";
  private static final String EventBridgeModuleIntentEventDataKey = "EventBridgeModuleIntentEventDataKey";

  @Override
    protected void onResume() {
        super.onResume();
        Log.d("MainActivity","#######onResume" );
        Intent sendIntent = new Intent("EventBridgeModuleIntentEventName"); 
        sendIntent.putExtra(EventBridgeModuleIntentEventDataKey, "Intent String"); 
    this.sendBroadcast(sendIntent);


    }

     @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "reactTest";
    }

    @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new InitialPropsReactActivityDelegate(this, getMainComponentName());
  }
 
  public static class InitialPropsReactActivityDelegate extends ReactActivityDelegate {
    private final @Nullable Activity mActivity;
    private @Nullable Bundle mInitialProps;
 
    public InitialPropsReactActivityDelegate(Activity activity, String mainComponentName) {
      super(activity, mainComponentName);
      this.mActivity = activity;
    }
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
      mInitialProps = mActivity.getIntent().getExtras();
      super.onCreate(savedInstanceState);
    Log.d("MainActivity","#######onCreate" );
    LocalBroadcastManager localBroadcastManager = LocalBroadcastManager.getInstance(this.mActivity);
        Intent sendIntent = new Intent("EventBridgeModuleIntentEventName"); 
        sendIntent.putExtra(EventBridgeModuleIntentEventDataKey, "Intent String"); 
    localBroadcastManager.sendBroadcast(sendIntent);


    }
 
    @Override
    protected Bundle getLaunchOptions() {
      return mInitialProps;
    }
  }
}
