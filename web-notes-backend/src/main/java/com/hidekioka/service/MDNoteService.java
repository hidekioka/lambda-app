package com.hidekioka.service;

import java.text.SimpleDateFormat;
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
public class MDNoteService {
	static final String DATE_PATTERN = "yyyy/MM/dd HH:mm:ss a z";

	static final String TABLE_NAME = "md_note";

	@Inject
	public MDNoteService() {
		// Injected Service
	}

	public String findAll() throws LambdaException {
		List<Map<String, Object>> resultList = LocalUtils.findAllDB(TABLE_NAME);
		JSONArray jsonArray = new JSONArray();
		for (Map<String, Object> it : resultList) {
			jsonArray.put(it);
		}
		return jsonArray.toString();
	}

	public void create(String title, String description) throws LambdaException {
		Map<String, Object> map = new HashMap<>();
		if (title == null || title.isBlank()) {
			title = "Defaul MD Note: " + new SimpleDateFormat(DATE_PATTERN).format(new Date());
		}
		if (description == null || description.isBlank()) {
			description = "Default MD description";
		}
		map.put("title", title);
		map.put("description", description);
		LocalUtils.insertDB(TABLE_NAME, map);
	}

	public void remove(String selectedId) throws LambdaException {
		if (selectedId != null) {
			LocalUtils.removeDB(TABLE_NAME, " id = " + selectedId);
		} else {
			LocalUtils.removeDB(TABLE_NAME);
		}
	}

	public void update(String selectedId, Map<String, String> attributeMap) throws LambdaException {
		for (Map.Entry<String, String> pair : attributeMap.entrySet()) {
			if (!pair.getKey().equals("id") || !pair.getKey().equals("selectedId")) {
				LocalUtils.updateDB(TABLE_NAME, pair, " id = " + selectedId);
			}
		}
	}

}
