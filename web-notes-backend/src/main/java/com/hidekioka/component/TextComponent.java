package com.hidekioka.component;

import com.hidekioka.service.TextService;

import dagger.Component;

@Component(modules = {TextService.class})
public interface TextComponent {
    TextService getTextService();
}
