package com.hidekioka;

import dagger.Module;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Module
class TextService {
    static final String DATE_PATTERN = "yyyy/MM/dd HH:mm:ss a z";

    @Inject
    public TextService() {
    }

    public String findAll() throws LambdaException {
        List<Map<String, Object>> resultList = LocalUtils.findAllDB("Text");
        return resultList.toString();//.stream().map(a -> a.get("text").toString()).collect(Collectors.joining(", " + LocalUtils.LINE_BREAK));
    }

    public void insert(String text) throws LambdaException {
        if (text == null || text.isBlank()) {
            text = "random text at time: " + new SimpleDateFormat(DATE_PATTERN).format(new Date());
        }
        LocalUtils.insertDB("Text", text);
    }

    public void remove() throws LambdaException {
        LocalUtils.removeDB("Text");
    }

}
