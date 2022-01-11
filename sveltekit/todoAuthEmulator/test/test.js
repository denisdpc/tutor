const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = 'tutorialtestes';

describe('Teste INICIAL', () => {
    it("SOMAR", () => {
        assert.equal(2+2,4);
    });

    it("Can read item in the read-only collection", async() => {
        const db = firebase.initializeTestApp({projectId:MY_PROJECT_ID}).firestore();
        const testDoc = db.collection("readonly").doc("testDoc");
        await firebase.assertSucceeds(testDoc.get());
    });

    it("Can't write item in the read-only collection", async() => {
        const db = firebase.initializeTestApp({projectId:MY_PROJECT_ID}).firestore();
        const testDoc = db.collection("readonly").doc("testDoc");
        await firebase.assertFails(testDoc.set({foo:"bar"}));
    });

});