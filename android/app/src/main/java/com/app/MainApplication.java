package com.app;

import android.app.Application;

import com.facebook.react.ReactApplication;
import fr.greweb.rnwebgl.RNWebGLPackage;
import com.projectseptember.RNGL.RNGLPackage;
import iyegoroff.RNColorMatrixImageFilters.RNColorMatrixImageFiltersPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import io.fixd.rctlocale.RCTLocalePackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.reactcommunity.rnlanguages.RNLanguagesPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.eguma.vibration.Vibration;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.mkuczera.RNReactNativeHapticFeedbackPackage;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNWebGLPackage(),
            new RNGLPackage(),
            new RNColorMatrixImageFiltersPackage(),
            new ReactNativeLocalizationPackage(),
            new RNDeviceInfo(),
            new RCTLocalePackage(),
            new RNI18nPackage(),
            new RNLanguagesPackage(),
            new RNGoogleSigninPackage(),
            new FBSDKPackage(),
            new LinearGradientPackage(),
            new Vibration(),
            new ImageResizerPackage(),
            new ImagePickerPackage(),
            new RNReactNativeHapticFeedbackPackage(),
            new RNCameraPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
