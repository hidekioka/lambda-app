package com.hidekioka.component;

import com.hidekioka.service.MDNoteService;

import dagger.Component;

@Component(modules = { MDNoteService.class })
public interface MDNoteComponent {
	MDNoteService getMDNoteService();
}
