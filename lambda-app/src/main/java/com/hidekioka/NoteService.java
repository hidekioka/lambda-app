package com.hidekioka;

import dagger.Module;

import javax.inject.Inject;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Module
class NoteService {
    static final String DATE_PATTERN = "yyyy/MM/dd HH:mm:ss a z";

    static final String TABLE_NAME = "Note";

    @Inject
    public NoteService() {
    }

    public String findAll() throws LambdaException {
        List<Map<String, Object>> resultList = LocalUtils.findAllDB(TABLE_NAME);
        return resultList.toString();//.stream().map(a -> a.get("Note").toString()).collect(Collectors.joining(", " +
        // LocalUtils.LINE_BREAK));
    }

    public void create(String text) throws LambdaException {
        Map<String, Object> map = new HashMap<>();
        if (text == null || text.isBlank()) {
            text = "random Note at time: " + new SimpleDateFormat(DATE_PATTERN).format(new Date());
        }
        map.put("text", text);
        LocalUtils.insertDB(TABLE_NAME, map);
    }

    public void remove() throws LambdaException {
        LocalUtils.removeDB(TABLE_NAME);
    }

}