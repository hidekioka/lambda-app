package com.hidekioka.component;

import com.hidekioka.service.NoteService;
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
public final class DaggerNoteComponent {
  private DaggerNoteComponent() {
  }

  public static Builder builder() {
    return new Builder();
  }

  public static NoteComponent create() {
    return new Builder().build();
  }

  public static final class Builder {
    private Builder() {
    }

    /**
     * @deprecated This module is declared, but an instance is not used in the component. This method is a no-op. For more, see https://dagger.dev/unused-modules.
     */
    @Deprecated
    public Builder noteService(NoteService noteService) {
      Preconditions.checkNotNull(noteService);
      return this;
    }

    public NoteComponent build() {
      return new NoteComponentImpl();
    }
  }

  private static final class NoteComponentImpl implements NoteComponent {
    private final NoteComponentImpl noteComponentImpl = this;

    private NoteComponentImpl() {


    }

    @Override
    public NoteService getNoteService() {
      return new NoteService();
    }
  }
}
