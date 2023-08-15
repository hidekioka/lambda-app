package com.hidekioka;

import dagger.Component;

@Component(modules = {TextService.class})
interface TextComponent {
    TextService getTextService();
}
