import type { Schema, Struct } from '@strapi/strapi';

export interface FormsContactForm extends Struct.ComponentSchema {
  collectionName: 'components_forms_contact_forms';
  info: {
    displayName: 'Contact Form';
    icon: 'envelop';
  };
  attributes: {
    message: Schema.Attribute.Text;
    noSignInUsername: Schema.Attribute.String;
    subject: Schema.Attribute.String;
    subjectDropdown: Schema.Attribute.Enumeration<['tbd']>;
    userEmail: Schema.Attribute.Email;
  };
}

export interface FormsSignIn extends Struct.ComponentSchema {
  collectionName: 'components_forms_sign_ins';
  info: {
    displayName: 'Sign In';
    icon: 'walk';
  };
  attributes: {
    signInEmail: Schema.Attribute.Email;
    signInPassword: Schema.Attribute.Password;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    description: '';
    displayName: 'Media Assets';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    label: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'forms.contact-form': FormsContactForm;
      'forms.sign-in': FormsSignIn;
      'shared.media': SharedMedia;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
