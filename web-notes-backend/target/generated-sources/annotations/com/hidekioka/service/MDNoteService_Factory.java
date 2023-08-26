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
public final class MDNoteService_Factory implements Factory<MDNoteService> {
  @Override
  public MDNoteService get() {
    return newInstance();
  }

  public static MDNoteService_Factory create() {
    return InstanceHolder.INSTANCE;
  }

  public static MDNoteService newInstance() {
    return new MDNoteService();
  }

  private static final class InstanceHolder {
    private static final MDNoteService_Factory INSTANCE = new MDNoteService_Factory();
  }
}
