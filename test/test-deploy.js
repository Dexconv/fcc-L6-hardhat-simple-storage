const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", async function () {
    let ssfac, ss
    beforeEach(async function () {
        ssfac = await ethers.getContractFactory("SimpleStorage")
        ss = await ssfac.deploy()
    })
    //can use expect and assert
    it("should start with favorite number 0", async function () {
        const currentVal = await ss.retrieve()
        const expectedVal = "0"

        assert.equal(currentVal.toString(), expectedVal)
    })
    it("should update when store is called", async function () {
        const expectedVal = "22"
        const txResp = await ss.store(expectedVal)
        await txResp.wait(1)
        const currentVal = await ss.retrieve()
        //assert.equal(currentVal.toString(), expectedVal)
        expect(currentVal.toString()).to.equal(expectedVal)
    })
    it("should add to person array when called", async function () {
        const expectedName = "ali"
        const expectedVal = "234"
        const txrep = await ss.addPerson(expectedName, expectedVal)
        await txrep.wait(1)
        const person = await ss.people(0)
        assert.equal(person[0], expectedVal)
        assert.equal(person[1], expectedName)
    })
    it("should add to nameToFaveNum map when called", async function () {
        const expectedName = "ali"
        const expectedVal = "234"
        const txrep = await ss.addPerson(expectedName, expectedVal)
        await txrep.wait(1)
        const currentVal = await ss.nameToFaveNum(expectedName)
        assert.equal(currentVal.toString(), expectedVal)
    })
})
