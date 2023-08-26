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
public final class NoteService_Factory implements Factory<NoteService> {
  @Override
  public NoteService get() {
    return newInstance();
  }

  public static NoteService_Factory create() {
    return InstanceHolder.INSTANCE;
  }

  public static NoteService newInstance() {
    return new NoteService();
  }

  private static final class InstanceHolder {
    private static final NoteService_Factory INSTANCE = new NoteService_Factory();
  }
}
