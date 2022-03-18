var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const getAuth = () => {
    return app.auth();
}

const listAllUsers = (nextPageToken) => {
    // List batch of users, 1000 at a time.
    getAuth()
        .listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
            listUsersResult.users.forEach((userRecord) => {
            console.log('user', userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
            // List next batch of users.
            listAllUsers(listUsersResult.pageToken);
        }
        })
        .catch((error) => {
            console.log('Error listing users:', error);
        });
    };
//listAllUsers();

 const setUserAsAdmin = (email) => {
    getAuth()
        .getUserByEmail(email)
        .then((user) => {
        const uid = user.uid;
        getAuth().setCustomUserClaims(user.uid, {isAdmin: true});
    })
}
//setUserAsAdmin("denisdpc@gmail.com")

const showUserByEmail = (email) => {
getAuth()
    .getUserByEmail(email)
    .then((user) => {   
        console.log(user.displayName, user.uid, user.customClaims);
    })
}
//showUserByEmail("denisdpc@gmail.com")

const verifyAdminUser = (email) => {
    getAuth()
      .getUserByEmail(email)
      .then((user) => {
        const currentCustomClaims = user.customClaims;
        if (currentCustomClaims && currentCustomClaims['isAdmin']) {        
          console.log(user.displayName, "é admin");
        } else {
          console.log(user.displayName, "não é admin");
        }      
      })
  }
verifyAdminUser("nnac.celog@gmail.com")
verifyAdminUser("denisdpc@gmail.com")