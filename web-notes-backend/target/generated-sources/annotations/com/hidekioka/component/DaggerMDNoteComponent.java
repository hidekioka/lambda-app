package com.hidekioka.component;

import com.hidekioka.service.MDNoteService;
import dagger.internal.DaggerGenerated;
import dagger.internal.Preconditions;
import javax.annotation.processing.Generated;

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
public final class DaggerMDNoteComponent {
  private DaggerMDNoteComponent() {
  }

  public static Builder builder() {
    return new Builder();
  }

  public static MDNoteComponent create() {
    return new Builder().build();
  }

  public static final class Builder {
    private Builder() {
    }

    /**
     * @deprecated This module is declared, but an instance is not used in the component. This method is a no-op. For more, see https://dagger.dev/unused-modules.
     */
    @Deprecated
    public Builder mDNoteService(MDNoteService mDNoteService) {
      Preconditions.checkNotNull(mDNoteService);
      return this;
    }

    public MDNoteComponent build() {
      return new MDNoteComponentImpl();
    }
  }

  private static final class MDNoteComponentImpl implements MDNoteComponent {
    private final MDNoteComponentImpl mDNoteComponentImpl = this;

    private MDNoteComponentImpl() {


    }

    @Override
    public MDNoteService getMDNoteService() {
      return new MDNoteService();
    }
  }
}
