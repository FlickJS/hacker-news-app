import DOMPurify from "dompurify";

export const sanitizeHtml = (html: string): string => {
  const cleanHtml = DOMPurify.sanitize(html, {
    FORBID_TAGS: ["style"],
    FORBID_ATTR: ["style"],
  });

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = cleanHtml;

  const elements = tempDiv.getElementsByTagName("*");
  for (let i = 0; i < elements.length; i++) {
    elements[i].removeAttribute("style");
  }

  return tempDiv.innerHTML;
};
