package com.hidekioka;

import dagger.Component;

@Component(modules = {NoteService.class})
interface NoteComponent {
    NoteService getNoteService();
}
