package com.hidekioka;

import dagger.Module;
import org.json.JSONArray;

import javax.inject.Inject;
import java.text.SimpleDateFormat;
import java.util.*;

@Module
class NoteService {
    static final String DATE_PATTERN = "yyyy/MM/dd HH:mm:ss a z";

    static final String TABLE_NAME = "Note";

    @Inject
    public NoteService() {
    }

    public String findAll() throws LambdaException {
        List<Map<String, Object>> resultList = LocalUtils.findAllDB(TABLE_NAME);
        JSONArray jsonArray = new JSONArray();
        for (Map<String, Object> it : resultList) {
            jsonArray.put(it);
        }
        return jsonArray.toString();
    }

    public void create(String text) throws LambdaException {
        Map<String, Object> map = new HashMap<>();
        if (text == null || text.isBlank()) {
            text = "random Note at time: " + new SimpleDateFormat(DATE_PATTERN).format(new Date());
        }
        map.put("text", text);
        LocalUtils.insertDB(TABLE_NAME, map);
    }

    public void remove(String selectedId) throws LambdaException {
        if (selectedId != null) {
            LocalUtils.removeDB(TABLE_NAME, " id = " + selectedId);
        } else {
            LocalUtils.removeDB(TABLE_NAME);
        }
    }

    public void update(String selectedId, String text) throws LambdaException {
        Map.Entry<String, String> pair = new AbstractMap.SimpleEntry<>("text", text);

        LocalUtils.updateDB(TABLE_NAME, pair, " id = " + selectedId);
    }

}
