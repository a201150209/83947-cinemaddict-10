import Abstract from './abstract.js';

const createProfileTemplate = (entity) => {
  const raiting = entity;
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${raiting}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

class Profile extends Abstract {
  constructor(entity) {
    super();
    this._entity = entity;
    this._createTemplateFunc = createProfileTemplate;
  }
}

export default Profile;
