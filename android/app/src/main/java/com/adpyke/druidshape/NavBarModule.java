package com.adpyke.druidshape;

import android.content.res.Resources;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.module.annotations.ReactModule;

import java.util.HashMap;
import java.util.Map;

@ReactModule(name = NavBarModule.NAME)
public class NavBarModule extends ReactContextBaseJavaModule {
    public static final String NAME = "NavBarModule";

    public NavBarModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        int navBarHeightDp = 0;
        int statusBarHeightDp = 0;
        try {
            ReactApplicationContext context = getReactApplicationContext();
            Resources resources = context.getResources();
            float density = resources.getDisplayMetrics().density;

            int navResId = resources.getIdentifier("navigation_bar_height", "dimen", "android");
            if (navResId > 0) {
                int px = resources.getDimensionPixelSize(navResId);
                navBarHeightDp = Math.round(px / density);
            }

            int statusResId = resources.getIdentifier("status_bar_height", "dimen", "android");
            if (statusResId > 0) {
                int px = resources.getDimensionPixelSize(statusResId);
                statusBarHeightDp = Math.round(px / density);
            }
        } catch (Exception e) {
            navBarHeightDp = 0;
            statusBarHeightDp = 24;
        }
        if (statusBarHeightDp == 0) {
            statusBarHeightDp = 24;
        }
        constants.put("navigationBarHeight", navBarHeightDp);
        constants.put("statusBarHeight", statusBarHeightDp);
        return constants;
    }
}
