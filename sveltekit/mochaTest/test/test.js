const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = 'mochatest-940ce';

const myId = "user_abc";
const theirId = "user_xyz";
const modId = "user_mod";

const myAuth = {uid: myId, email: "abc@gmail.com"};
const modAuth = {uid: modId, email: "mod@gmail.com", isModerator: true};

function getFirestore(auth) {
    return firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth: auth}).firestore();
}

function getAdminFirestore() {
    return firebase.initializeAdminApp({projectId: MY_PROJECT_ID}).firestore();
}

beforeEach(async() => {
    await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});
})

// before(async() => {
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

    it("allows a moderator to edit somebody else's post", async() => {
        const admin = getAdminFirestore();
        const postId = "post_123";
        await admin.collection("posts").doc(postId).set({content: "before", authorId: myId});

        const db = getFirestore(modAuth);
        const testDoc = db.collection("posts").doc(postId);
        await firebase.assertSucceeds(testDoc.update({content:"after"}));
    });

    it("allows a user to edit their own room post", async() => {
        const postPath = "/rooms/room_abc/posts/post_123";
        const admin = getAdminFirestore();
        await admin.doc(postPath).set({content: "before", authorId: myId});

        const db = getFirestore(myAuth);
        const testDoc = db.doc(postPath);
        await firebase.assertSucceeds(testDoc.update({content:"after"}));
    });

    it("won't allows a user to edit somebody else's room post", async() => {
        const postPath = "/rooms/room_abc/posts/post_123";
        const admin = getAdminFirestore();
        await admin.doc(postPath).set({content: "before", authorId: theirId});

        const db = getFirestore(myAuth);
        const testDoc = db.doc(postPath);
        await firebase.assertFails(testDoc.update({content:"after"}));
    });

    it("allows a room mod to edit another person's room post", async() => {
        const roomPath = "rooms/room_abc";
        const postPath = `${roomPath}/posts/post_123`;
        const admin = getAdminFirestore();
        await admin.doc(roomPath).set({topic:"unit testers", roomMods: [myId, "dummyUser"]});
        await admin.doc(postPath).set({content:"before", authorId: theirId});

        const db = getFirestore(myAuth);
        const testDoc = db.doc(postPath);
        await firebase.assertSucceeds(testDoc.update({content:"after"}));
    });

    it("allows a user to create a post when they list themselves as the author", async() => {
        const postPath = "/posts/post_123";
        const db = getFirestore(myAuth);
        const testDoc = db.doc(postPath);
        
        await firebase.assertSucceeds(testDoc.set({
            authorId: myId, content:"lorem ipsum",
            visibility: "public", headline: "headline"}));
    });
    
    it("doesn't allows a user to create a post when they list somebody else as the author", async() => {
        const postPath = "/posts/post_123";
        const db = getFirestore(myAuth);
        const testDoc = db.doc(postPath);
        
        await firebase.assertFails(testDoc.set({
            authorId: theirId, content:"ipsum lorem",
            visibility: "public", headline: "headline"}));
    });

    it("can create a post with all required fields", async() => {
        const postPath = "/posts/post_123";
        const db = getFirestore(myAuth);
        const testDoc = db.doc(postPath);        

        await firebase.assertSucceeds(testDoc.set({
            authorId: myId, content:"ipsum lorem ipsum",
            visibility: "public", headline: "headline"}));
    })

    it("can't create a post with an unapproved fields", async() => {
        const postPath = "/posts/post_123";
        const db = getFirestore(myAuth);
        const testDoc = db.doc(postPath);        

        await firebase.assertFails(testDoc.set({
            authorId: myId, content:"ipsum lorem ipsum",
            visibility: "public", headline: "headline", location:"San Francisco",
            not_allowed: true}));
    })

    it("can edit a post with allowed fields", async() => {
        const postPath = "/posts/post_123";
        const admin = getAdminFirestore();
        await admin.doc(postPath).set({content:"before content", authorId: myId,
            headline: "before headline", visibility: "public"});
        
        const db = getFirestore(myAuth);
        const testDoc = db.doc(postPath);
        await firebase.assertSucceeds(testDoc.update({content: "after content"}));
    })

    it("can't edit a post forbidden fields", async() => {
        const postPath = "/posts/post_123";
        const admin = getAdminFirestore();
        await admin.doc(postPath).set({content:"before content", authorId: myId,
            headline: "before headline", visibility: "public"});
        
        const db = getFirestore(myAuth);
        const testDoc = db.doc(postPath);
        await firebase.assertFails(testDoc.update({content: "after content",
            headline: "after headline"}));
    })


});

// after(async() => {
//     await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});
// })

// https://www.youtube.com/watch?v=8Mzb9zmnbJs
// 19:57