export const renderTemplate = (element, template, place = `beforeend`) => {
  element.insertAdjacentHTML(place, template);
};
