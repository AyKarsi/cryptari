const chai = require('chai');
const assert = chai.assert;
const provider = require('./../src/lib/encryptionProvider')();
const decryptValue = require('./../src/lib/decryptValue')(provider);

describe('decrypt value - error handling', function() {
	it('will return undefined if an undefined value is given', async function() {
		let testVal = undefined;
		let encrypted = await decryptValue(testVal);
		assert.equal(encrypted,testVal);
	});
	it('will return null if an null value is given', async function() {
		let testVal = null;
		let encrypted = await decryptValue(testVal);
		assert.equal(encrypted,testVal);
	});
	it('will return the original string if a non-encrypted string is given', async function() {
		let testVal = 'hello';
		let encrypted = await decryptValue(testVal);
		assert.equal(encrypted,testVal);
	});
	it('will return the original string if a invalid cryptari string is given', async function() {
		let testVal = '_cryptari.123a.13a.string';
		let encrypted = await decryptValue(testVal);
		assert.equal(encrypted,testVal);
	});
	describe('onError:throw',function() {
		let opts =  {
			onError:'throw'
		};
		it('will throw an error if an exception occurs during deccryption', async function() {
			provider.decrypt = function() {
				throw 'up';
			};
			const decryptValue = require('./../src/lib/decryptValue')(provider);
			let testVal = '_cryptari.123a.13a.string';
			let err;
			try {
				await decryptValue(testVal,opts);
			} catch (e) {
				err = e;
			}
			assert.isTrue(!!err);
		});
	});
});
