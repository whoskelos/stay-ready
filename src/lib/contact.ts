interface ContactData {
  phoneDigits: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
}

export const telHref = (site: ContactData) => `tel:+${site.phoneDigits}`;

export const mailHref = (site: ContactData) => `mailto:${site.email}`;

export const whatsappHref = (site: ContactData) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`;
