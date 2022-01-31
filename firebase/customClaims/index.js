
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const listAllUsers = (nextPageToken) => {
     // List batch of users, 1000 at a time.
    app.auth()
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
//   // Start listing users from the beginning, 1000 at a time.
   listAllUsers();

// getAuth()
//   .getUser(uid)
//   .then((userRecord) => {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
//   })
//   .catch((error) => {
//     console.log('Error fetching user data:', error);
//   });


// const listAllUsers = (nextPageToken) => {
//     // List batch of users, 1000 at a time.
//     getAuth()
//       .listUsers(1000, nextPageToken)
//       .then((listUsersResult) => {
//         listUsersResult.users.forEach((userRecord) => {
//           console.log('user', userRecord.toJSON());
//         });
//         if (listUsersResult.pageToken) {
//           // List next batch of users.
//           listAllUsers(listUsersResult.pageToken);
//         }
//       })
//       .catch((error) => {
//         console.log('Error listing users:', error);
//       });
//   };
//   // Start listing users from the beginning, 1000 at a time.
//   listAllUsers();