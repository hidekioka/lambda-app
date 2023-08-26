package com.hidekioka.component;

import com.hidekioka.service.TextService;
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
public final class DaggerTextComponent {
  private DaggerTextComponent() {
  }

  public static Builder builder() {
    return new Builder();
  }

  public static TextComponent create() {
    return new Builder().build();
  }

  public static final class Builder {
    private Builder() {
    }

    /**
     * @deprecated This module is declared, but an instance is not used in the component. This method is a no-op. For more, see https://dagger.dev/unused-modules.
     */
    @Deprecated
    public Builder textService(TextService textService) {
      Preconditions.checkNotNull(textService);
      return this;
    }

    public TextComponent build() {
      return new TextComponentImpl();
    }
  }

  private static final class TextComponentImpl implements TextComponent {
    private final TextComponentImpl textComponentImpl = this;

    private TextComponentImpl() {


    }

    @Override
    public TextService getTextService() {
      return new TextService();
    }
  }
}
