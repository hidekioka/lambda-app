package com.hidekioka.service;

import java.text.SimpleDateFormat;
import java.util.AbstractMap;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.json.JSONArray;

import com.hidekioka.exception.LambdaException;
import com.hidekioka.util.LocalUtils;

import dagger.Module;

@Module
public class NoteService {
    static final String DATE_PATTERN = "yyyy/MM/dd HH:mm:ss a z";

    static final String TABLE_NAME = "Note";

    @Inject
    public NoteService() {
    	// Injected Service
    }

    public String findAll(String userEmail) throws LambdaException {
        Map.Entry<String,Object> whereParam =
                new AbstractMap.SimpleEntry<String, Object>("email", userEmail);
        List<Map<String, Object>> resultList = LocalUtils.findAllDB(TABLE_NAME, whereParam);
        JSONArray jsonArray = new JSONArray();
        for (Map<String, Object> it : resultList) {
            jsonArray.put(it);
        }
        return jsonArray.toString();
    }

    public void create(String text, String email) throws LambdaException {
        Map<String, Object> map = new HashMap<>();
        map.put("text", text);
        map.put("email", email);
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
