import firebase from "./firebase";
// Required for side-effects
require("firebase/firestore");

export const db = firebase.firestore();

export const getGames = () => {
  return db
    .collection("games")
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
    });
};

export const syncGames = callback => {
  return db.collection("games").onSnapshot(querySnapshot => {
    callback(
      querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      })
    );
  });
};

export const syncGame = (id, callback) => {
  return db.collection("games").doc(id).onSnapshot(doc => {
    callback(
      {
        id: doc.id,
        ...doc.data()
      }
    );
  });
};

export const getGame = gameId => {
  return db
    .collection("games")
    .doc(gameId)
    .get()
    .then(docSnapshot => {
      const data = docSnapshot.data();
      return data || {};
    });
};

export const addGame = (data = { name: "" }) => {
  return db
    .collection("games")
    .add(data)
    .then(docRef => {
      return docRef.id;
    })
    .catch(function(error) {
      console.error("Error adding game: ", error);
      throw new Error(`Chyba při vytváření hry: ${JSON.stringify(error)}`);
    });
};

export const setGame = ({ id, ...game }) => {
  return db
    .collection("games")
    .doc(id)
    .set(game);
};

export const deleteGame = id => {
  return db
    .collection("games")
    .doc(id)
    .delete();
};

export const getDailyMenus = () => {
  return db
    .collection("dailyMenus")
    .orderBy("date", "desc")
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
    });
};

export const setDailyMenu = ({ ...menu }) => {
  return db
    .collection("dailyMenus")
    .doc(menu.date)
    .set(menu);
};

export const getSectionContent = section => {
  return db
    .collection("section")
    .doc(section)
    .get()
    .then(docSnapshot => {
      const data = docSnapshot.data();
      return data || {};
    });
};

export const setSectionContent = (section, data) => {
  return db
    .collection("section")
    .doc(section)
    .set(data);
};

const getSectionError = (section, error = "") =>
  Error(
    `Sekci "${section}" se nepodařilo načíst. Zobrazí se záložní data.\n${JSON.stringify(
      error,
      null,
      2
    )}`
  );

export const loadSection = async section => {
  const content = await getSectionContent(section).catch(error => {
    throw getSectionError(section, error);
  });
  if (!content) {
    throw getSectionError(section);
  }
  return { [`${section}Content`]: content };
};
