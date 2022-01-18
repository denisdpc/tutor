const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = 'mochatest-940ce';

describe("Testes em tutorialtestes", () => {

    it("adicao", () => {
        assert.equal(2+2,4);
    })

    it("pode ler dados", async() => {
        const db = firebase.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
        const testDoc = db.collection("readonly").doc("testDoc");
        await firebase.assertSucceeds(testDoc.get());
    })
})