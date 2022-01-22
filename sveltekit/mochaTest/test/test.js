const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = 'mochatest-940ce';
const myId = "user_abc";
const theirId = "user_xyz";
const myAuth = {uid: myId, email: "abc@gmail.com"};

function getFirestore(auth) {
    return firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth: auth}).firestore();
}

function getAdminFirestore() {
    return firebase.initializeAdminApp({projectId: MY_PROJECT_ID}).firestore();
}

// beforeEach(async() => {
//     await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});
// })


describe("Testes em tutorialtestes", () => {

    it("adicao", () => {
        assert.equal(2+2,4);
    })

    it("pode ler dados", async() => {
        const db = getFirestore(null);
        const testDoc = db.collection("readonly").doc("testDoc");
        await firebase.assertSucceeds(testDoc.get());
    })

    it("não pode salvar dados", async() => {
        const db = getFirestore(null);
        const testDoc = db.collection("readonly").doc("testDoc");
        await firebase.assertFails(testDoc.set({foo: "bar"}));
    })

    it("pode salvar se usuário for correto", async() => {
        const db = getFirestore(myAuth);
        const testDoc = db.collection("users").doc(myId);
        await firebase.assertSucceeds(testDoc.set({foo: "bar"}));
    })

    it("NÃO pode salvar se usuário for incorreto", async() => {
        const db = getFirestore(myAuth);
        const testDoc = db.collection("users").doc(theirId);
        await firebase.assertFails(testDoc.set({foo: "bar"}));
    })

    it("can read posts marked as public", async() => {
        const db = getFirestore(null);
        const testQuery = db.collection("posts").where("visibility", "==", "public");
        await firebase.assertSucceeds(testQuery.get());
    })

    it("can't query all posts", async() => {
        const db = getFirestore(myAuth);
        const testQuery = db.collection("posts");
        await firebase.assertFails(testQuery.get());
    })

    it("can read a single public post", async() => {
        const admin = getAdminFirestore();
        const postId = "public_post";
        const setupDoc = admin.collection("posts").doc(postId);
        await setupDoc.set({authorId: theirId, visibility: "public"});

        const db = getFirestore(null);
        const testRead = db.collection("posts").doc(postId);
        await firebase.assertSucceeds(testRead.get());
    })

    it("can't read a private post belong to another user", async() => {
        const admin = getAdminFirestore();
        const postId = "private_post";
        const setupDoc = admin.collection("posts").doc(postId);
        await setupDoc.set({authorId: theirId, visibility: "private"});

        const db = getFirestore(myAuth);
        const testRead = db.collection("posts").doc(postId);
        await firebase.assertFails(testRead.get());
    });

    it("allows a user to edit their own post", async() => {
        const admin = getAdminFirestore();
        const postId = "post_123";
        await admin.collection("posts").doc(postId).set({content: "before", authorId: myId});

        const db = getFirestore(myAuth);
        const testDoc = db.collection("posts").doc(postId);
        await firebase.assertSucceeds(testDoc.update({content:"after"}));
    });

});

// after(async() => {
//     await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});
// })

// https://www.youtube.com/watch?v=8Mzb9zmnbJs
// 3:47