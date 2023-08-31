package com.hidekioka.component;

import com.hidekioka.service.NoteService;

import dagger.Component;

@Component(modules = {NoteService.class})
public interface NoteComponent {
    NoteService getNoteService();
}
