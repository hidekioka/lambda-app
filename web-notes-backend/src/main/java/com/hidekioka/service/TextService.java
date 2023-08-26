package com.hidekioka.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import com.hidekioka.exception.LambdaException;
import com.hidekioka.util.LocalUtils;

import dagger.Module;

@Module
public class TextService {
	static final String DATE_PATTERN = "yyyy/MM/dd HH:mm:ss a z";

	static final String TABLE_NAME = "Text";

	@Inject
	public TextService() {
		// Injected Service
	}

	public String findAll() throws LambdaException {
		List<Map<String, Object>> resultList = LocalUtils.findAllDB(TABLE_NAME);
		return resultList.toString();
	}

	public void insert(String text) throws LambdaException {
		Map<String, Object> map = new HashMap<>();
		if (text == null || text.isBlank()) {
			text = "random text at time: " + new SimpleDateFormat(DATE_PATTERN).format(new Date());
		}
		map.put("text", text);
		LocalUtils.insertDB(TABLE_NAME, map);
	}

	public void remove() throws LambdaException {
		LocalUtils.removeDB(TABLE_NAME);
	}

}
