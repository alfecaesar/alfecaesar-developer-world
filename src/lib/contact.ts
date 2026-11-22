
export type ContactItem = {
    label: string;
    value: string;
    href?: string;
    icon: "mail" | "phone" | "map-pin" | "linkedin";
  };
  
  export const CONTACT_DETAILS: ContactItem[] = [
    {
      label: "Email",
      value: "alfecaesar@gmail.com",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=alfecaesar@gmail.com",
      icon: "mail",
    },
    {
      label: "Phone",
      value: "+63 995 376 7972",
      href: "tel:+639953767972",
      icon: "phone",
    },
    {
      label: "Location",
      value: "Misamis Occidental, Philippines 7215",
      icon: "map-pin",
    },
    {
      label: "LinkedIn",
      value: "https://www.linkedin.com/in/alfe-caesar-l-24663535/",
      href: "https://www.linkedin.com/in/alfe-caesar-l-24663535/",
      icon: "linkedin",
    },
  ];
  
  export const CONTACT_LINKS = {
    email: "mailto:alfecaesar@gmail.com",
    phone: "tel:+639953767972",
    github: "https://github.com/alfecaesar",
  };
  
  export const CONTACT_FORM = {
    action: "https://formspree.io/f/xvzdgkjl",
    method: "POST",
  };
  