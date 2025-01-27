export const decodeHtmlEntities = (text: string): string => {
    const element = document.createElement("div");
    element.innerHTML = text;
    return element.textContent || element.innerText || "";
  };  