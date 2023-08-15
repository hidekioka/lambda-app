package com.hidekioka;

import java.io.IOException;
import java.util.Map;
import java.util.Properties;

public class LambdaFunction {
    TextComponent textComponent;
    String version = "";

    private String getApplicationVersion() {
        if (version.isEmpty()) {
            try {
                Properties properties = new Properties();
                properties.load(this.getClass().getClassLoader().getResourceAsStream("application.properties"));
                version = properties.getProperty("app.version");
            } catch (IOException e) {
                // Could not load version
            }
        }
        return version;

    }

    public String hello() {
        return "Hello world!";
    }

    public String create(Map<String, String> input) throws LambdaException {
        getTextService().insert(input.get("text"));
        return LocalUtils.textWithVersion(getApplicationVersion(), "Created!");
    }

    public String load() throws LambdaException {
        return LocalUtils.textWithVersion(getApplicationVersion(), getTextService().findAll());
    }

    public String remove() throws LambdaException {
        getTextService().remove();
        return LocalUtils.textWithVersion(getApplicationVersion(), "Removed!");
    }

    public String delete() throws LambdaException {
        return remove();
    }

    private TextService getTextService() {
        if (textComponent == null) {
            textComponent = DaggerTextComponent.create();
        }
        return textComponent.getTextService();
    }
}
