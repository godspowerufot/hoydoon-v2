// types/google-identity.d.ts

export interface GoogleCredentialResponse {
    credential: string;
    select_by: string;
    clientId?: string;
  }
  
  export interface PromptMomentNotification {
    isDisplayMoment: () => boolean;
    isNotDisplayed: () => boolean;
    getNotDisplayedReason: () => string;
    isSkippedMoment: () => boolean;
    getSkippedReason: () => string;
    isDismissedMoment: () => boolean;
    getDismissedReason: () => string;
    getMomentType: () => string;
  }
  
  interface IdConfiguration {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    auto_select?: boolean;
    login_uri?: string;
    native_callback?: Function;
    prompt_parent_id?: string;
    nonce?: string;
    context?: "signin" | "signup" | "use";
    ux_mode?: "popup" | "redirect";
    allowed_parent_origin?: string | string[];
    intermediate_iframe_close_callback?: () => void;
    itp_support?: boolean;
  }
  
  interface GsiButtonConfiguration {
    type?: "standard" | "icon";
    theme?: "outline" | "filled_blue" | "filled_black";
    size?: "small" | "medium" | "large";
    text?: "signin_with" | "signup_with" | "continue_with" | "signin";
    shape?: "rectangular" | "pill" | "circle" | "square";
    logo_alignment?: "left" | "center";
    width?: string;
    locale?: string;
  }
  
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: IdConfiguration) => void;
          renderButton: (container: HTMLElement, config: GsiButtonConfiguration) => void;
          prompt: (callback?: (notification: PromptMomentNotification) => void) => void;
          disableAutoSelect: () => void;
          storeCredential: (credential: { id: string; password: string }) => void;
          cancel: () => void;
          onGoogleLibraryLoad: () => void;
        };
      };
    };
  }
  