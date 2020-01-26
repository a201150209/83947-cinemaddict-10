import * as utils from '../components/utils.js';

const mockText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const mockWords = mockText.split(` `);
const mockSentences = mockText.split(`.`);
const posterNames = [`made-for-each-other`, `popeye-meets-sinbad`, `sagebrush-trail`, `santa-claus-conquers-the-martians`, `the-dance-of-life`, `the-great-flamarion`, `the-man-with-the-golden-arm`];
const filmGenres = [`Action`, `Adventure`, `Crime`, `Drama`, `Epic`];
const firstNames = [`Mark`, `Petr`, `Juno`, `Planeta Nibiru`, `Keks`, `Vasiliy`, `Audrey`];
const lastNames = [`Kim`, `Kam`, `Kom`, `Abartvoog`, `Ooogdvv`, `International`];
const countryNames = [`USA`, `USSR`, `Germany`, `UK`];
const commentIconNames = [`smile`, `sleeping`, `puke`, `angry`];

const getDurationEntity = () => {
  return {
    hour: utils.getRandomNumber(0, 2),
    minut: utils.getRandomNumber(0, 60)
  };
};

const getPersonNames = (count = 1) => {
  return new Array(count).fill(``).map(() => {
    const firstName = utils.getRandomArrayElements(firstNames);
    const lastName = utils.getRandomArrayElements(lastNames);
    return `${firstName} ${lastName}`;
  });
};

const getCommentEntities = (count) => {
  return new Array(count).fill(``).map((item, i) => {
    return {
      id: i,
      emotion: utils.getRandomArrayElements(commentIconNames).toString(),
      comment: utils.getRandomArrayElements(mockSentences, 2).join(` `),
      author: getPersonNames().toString(),
      date: utils.getRandomDate(-15, 0)
    };
  });
};

const getUserRaiting = (isWatched) => {
  return isWatched ? utils.getRandomNumber(0, 10) : null;
};

const getRandomFilmEntity = (id) => {
  const entity = {
    id,
    title: utils.getRandomArrayElements(mockWords, 5).join(` `),
    originalTitle: utils.getRandomArrayElements(mockWords, 5).join(` `),
    directorName: getPersonNames().toString(),
    writerNames: getPersonNames(utils.getRandomNumber(1, 5)),
    actorNames: getPersonNames(utils.getRandomNumber(1, 5)),
    posterName: utils.getRandomArrayElements(posterNames).toString(),
    description: utils.getRandomArrayElements(mockSentences, utils.getRandomNumber(1, 3)).toString(),
    raiting: utils.getRandomNumber(0, 10, 1),
    releaseDate: utils.getRandomDate(-50, 0),
    duration: getDurationEntity(),
    genres: utils.getRandomArrayElements(filmGenres, 3),
    comments: getCommentEntities(utils.getRandomNumber(2, 7)),
    ageLimit: utils.getRandomNumber(0, 18),
    countryName: utils.getRandomArrayElements(countryNames).toString(),
    isWatched: utils.coinToss(),
    isFavorite: utils.coinToss(),
    isMarked: utils.coinToss()
  };
  entity.userRaiting = getUserRaiting(entity.isWatched);
  return entity;
};

export {getRandomFilmEntity};
