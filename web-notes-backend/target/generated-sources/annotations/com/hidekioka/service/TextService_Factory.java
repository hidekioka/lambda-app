package com.hidekioka.service;

import dagger.internal.DaggerGenerated;
import dagger.internal.Factory;
import dagger.internal.QualifierMetadata;
import dagger.internal.ScopeMetadata;
import javax.annotation.processing.Generated;

@ScopeMetadata
@QualifierMetadata
@DaggerGenerated
@Generated(
    value = "dagger.internal.codegen.ComponentProcessor",
    comments = "https://dagger.dev"
)
@SuppressWarnings({
    "unchecked",
    "rawtypes",
    "KotlinInternal",
    "KotlinInternalInJava"
})
public final class TextService_Factory implements Factory<TextService> {
  @Override
  public TextService get() {
    return newInstance();
  }

  public static TextService_Factory create() {
    return InstanceHolder.INSTANCE;
  }

  public static TextService newInstance() {
    return new TextService();
  }

  private static final class InstanceHolder {
    private static final TextService_Factory INSTANCE = new TextService_Factory();
  }
}
