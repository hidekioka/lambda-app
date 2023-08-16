package com.hidekioka;

import java.util.Map;

public class TextFunction {
    TextComponent textComponent;

    public String hello() {
        return "Hello world!";
    }

    public String create(Map<String, String> input) throws LambdaException {
        getTextService().insert(input.get("text"));
        return LocalUtils.textWithVersion(LocalUtils.getApplicationVersion(), "Created!");
    }

    public String load() throws LambdaException {
        return LocalUtils.textWithVersion(LocalUtils.getApplicationVersion(), getTextService().findAll());
    }

    public String remove() throws LambdaException {
        getTextService().remove();
        return LocalUtils.textWithVersion(LocalUtils.getApplicationVersion(), "Removed!");
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
