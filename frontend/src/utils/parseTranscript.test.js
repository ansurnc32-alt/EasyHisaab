import test from 'node:test';
import assert from 'node:assert/strict';
import { parseHindiTranscript } from './parseTranscript.js';

test('parses customer name and multiple Hindi bill items from a transcript', () => {
  const transcript = 'रमेश ने दो किलो आलू 50 रुपये, तीन किलो प्याज 80 रुपये, और एक किलो टमाटर 40 रुपये';

  const result = parseHindiTranscript(transcript);

  assert.equal(result.customerName, 'रमेश');
  assert.equal(result.items.length, 3);
  assert.equal(result.items[0].id, 1);
  assert.equal(result.items[0].name, 'आलू');
  assert.equal(result.items[0].quantity, '2');
  assert.equal(result.items[0].unit, 'किलो');
  assert.equal(result.items[0].price, '50');
  assert.equal(result.items[0].lineTotal, 100);
  assert.equal(result.items[1].id, 2);
  assert.equal(result.items[1].name, 'प्याज');
  assert.equal(result.items[1].quantity, '3');
  assert.equal(result.items[1].unit, 'किलो');
  assert.equal(result.items[1].price, '80');
  assert.equal(result.items[1].lineTotal, 240);
  assert.equal(result.items[2].id, 3);
  assert.equal(result.items[2].name, 'टमाटर');
  assert.equal(result.items[2].quantity, '1');
  assert.equal(result.items[2].unit, 'किलो');
  assert.equal(result.items[2].price, '40');
  assert.equal(result.items[2].lineTotal, 40);
});

test('extracts customer names and prices from phrases like "के लिए"', () => {
  const transcript = 'राजू के लिए 2 किलो आलू 40 रुपये किलो';

  const result = parseHindiTranscript(transcript);

  assert.equal(result.customerName, 'राजू');
  assert.equal(result.items.length, 1);
  assert.equal(result.items[0].name, 'आलू');
  assert.equal(result.items[0].quantity, '2');
  assert.equal(result.items[0].price, '40');
  assert.equal(result.items[0].lineTotal, 80);
});

test('parses multiple items and keeps omitted prices empty', () => {
  const transcript = '2 किलो आलू 40 रुपये किलो, 1 किलो प्याज 50 रुपये किलो, 1 लीटर तेल 180 रुपये';

  const result = parseHindiTranscript(transcript);

  assert.equal(result.customerName, null);
  assert.equal(result.items.length, 3);
  assert.equal(result.items[0].name, 'आलू');
  assert.equal(result.items[1].name, 'प्याज');
  assert.equal(result.items[2].name, 'तेल');
  assert.equal(result.items[2].price, '180');
});

test('parses currency-prefixed prices such as ₹40 and 40 rupees', () => {
  const resultWithSymbol = parseHindiTranscript('₹40');
  const resultWithWord = parseHindiTranscript('40 rupees');

  assert.equal(resultWithSymbol.items[0]?.price, '40');
  assert.equal(resultWithWord.items[0]?.price, null);
});

test('calculates amount as quantity × unit price', () => {
  const result = parseHindiTranscript('2 किलो आलू 40 रुपये किलो');

  assert.equal(result.items[0].amount, 80);
  assert.equal(result.items[0].lineTotal, 80);
});

test('parses multiple grocery items from adjacent phrases', () => {
  const result = parseHindiTranscript('2 किलो आलू 40 रुपये किलो 1 किलो प्याज 50 रुपये किलो');

  assert.equal(result.items.length, 2);
  assert.equal(result.items[0].item, 'आलू');
  assert.equal(result.items[0].amount, 80);
  assert.equal(result.items[1].item, 'प्याज');
  assert.equal(result.items[1].amount, 50);
});

test('extracts customer name and parses multiple items from a combined transcript', () => {
  const result = parseHindiTranscript('राजू के लिए 2 किलो आलू 40 रुपये किलो 1 किलो प्याज 50 रुपये किलो');

  assert.equal(result.customerName, 'राजू');
  assert.equal(result.items.length, 2);
  assert.equal(result.items[0].item, 'आलू');
  assert.equal(result.items[0].amount, 80);
  assert.equal(result.items[1].item, 'प्याज');
  assert.equal(result.items[1].amount, 50);
});

test('parses plain quantity and item name without merging price into the item name', () => {
  const result = parseHindiTranscript('1 किलो आटा 50 रुपये किलो');

  assert.equal(result.items[0].item, 'आटा');
  assert.equal(result.items[0].quantity, '1');
  assert.equal(result.items[0].unit, 'किलो');
  assert.equal(result.items[0].unitPrice, '50');
  assert.equal(result.items[0].amount, 50);
});

test('does not misparse half quantities as a gram item', () => {
  const result = parseHindiTranscript('आधा किलो चीनी 50 रुपये किलो');

  assert.equal(result.items[0].item, 'चीनी');
  assert.equal(result.items[0].quantity, '0.5');
  assert.equal(result.items[0].unit, 'किलो');
  assert.equal(result.items[0].unitPrice, '50');
  assert.equal(result.items[0].amount, 25);
});

test('supports Hindi fractional quantities like आधा and डेढ़', () => {
  const halfResult = parseHindiTranscript('आधा किलो चीनी 50 रुपये किलो');
  const oneAndHalfResult = parseHindiTranscript('डेढ़ किलो आटा 60 रुपये किलो');
  const twoAndHalfResult = parseHindiTranscript('ढाई किलो दाल 70 रुपये किलो');

  assert.equal(halfResult.items[0].quantity, '0.5');
  assert.equal(halfResult.items[0].unit, 'किलो');
  assert.equal(halfResult.items[0].amount, 25);
  assert.equal(oneAndHalfResult.items[0].quantity, '1.5');
  assert.equal(oneAndHalfResult.items[0].amount, 90);
  assert.equal(twoAndHalfResult.items[0].quantity, '2.5');
  assert.equal(twoAndHalfResult.items[0].amount, 175);
});

test('keeps price empty when transcript has no price information', () => {
  const result = parseHindiTranscript('1 किलो आटा');

  assert.equal(result.items[0].price, null);
  assert.equal(result.items[0].amount, null);
});

test('keeps quantity as 1 and price as 80 for phrases like 1 किलो प्याज 80 रुपये किलो', () => {
  const result = parseHindiTranscript('1 किलो प्याज 80 रुपये किलो');

  assert.equal(result.items[0].item, 'प्याज');
  assert.equal(result.items[0].quantity, '1');
  assert.equal(result.items[0].unit, 'किलो');
  assert.equal(result.items[0].price, '80');
  assert.equal(result.items[0].amount, 80);
});

test('defaults missing quantity to 1 and leaves missing price empty', () => {
  const transcript = 'कृपया चावल';

  const result = parseHindiTranscript(transcript);

  assert.equal(result.items.length, 1);
  assert.equal(result.items[0].quantity, '1');
  assert.equal(result.items[0].price, null);
  assert.equal(result.items[0].amount, null);
});

test('splits consecutive rental nouns into separate items in rental mode', () => {
  const result = parseHindiTranscript('300 कुर्सी 100 प्लेट 50 गिलास', 'rental');

  assert.equal(result.customerName, null);
  assert.equal(result.items.length, 3);
  assert.deepEqual(result.items.map((item) => item.item), ['कुर्सी', 'प्लेट', 'गिलास']);
  assert.deepEqual(result.items.map((item) => item.quantity), ['300', '100', '50']);
  assert.deepEqual(result.items.map((item) => item.unit), ['piece', 'piece', 'piece']);
  assert.deepEqual(result.items.map((item) => item.price), [null, null, null]);
  assert.deepEqual(result.items.map((item) => item.amount), [null, null, null]);
});

test('keeps rental splitting deterministic across spacing and punctuation variants', () => {
  const compact = parseHindiTranscript('300 कुर्सी 100 प्लेट 50 गिलास', 'rental');
  const spaced = parseHindiTranscript('300   कुर्सी, 100 प्लेट; 50 गिलास', 'rental');

  assert.equal(compact.items.length, 3);
  assert.equal(spaced.items.length, 3);
  assert.deepEqual(compact.items.map((item) => item.item), ['कुर्सी', 'प्लेट', 'गिलास']);
  assert.deepEqual(spaced.items.map((item) => item.item), ['कुर्सी', 'प्लेट', 'गिलास']);
  assert.deepEqual(compact.items.map((item) => item.quantity), ['300', '100', '50']);
  assert.deepEqual(spaced.items.map((item) => item.quantity), ['300', '100', '50']);
  assert.deepEqual(compact.items.map((item) => item.unit), ['piece', 'piece', 'piece']);
  assert.deepEqual(spaced.items.map((item) => item.unit), ['piece', 'piece', 'piece']);
});

test('infers piece units for rental nouns and preserves explicit grocery units', () => {
  const rentalChair = parseHindiTranscript('500 कुर्सी');
  const rentalPlate = parseHindiTranscript('100 प्लेट');
  const rentalGlass = parseHindiTranscript('50 गिलास');
  const mungDal = parseHindiTranscript('मूंग दाल 2 किलो');
  const milk = parseHindiTranscript('दूध 1 लीटर');
  const halfSugar = parseHindiTranscript('आधा किलो चीनी 50 रुपये किलो');
  const combined = parseHindiTranscript('राजू के लिए 2 किलो आलू 40 रुपये किलो 1 किलो प्याज 50 रुपये किलो');

  assert.equal(rentalChair.items[0].item, 'कुर्सी');
  assert.equal(rentalChair.items[0].quantity, '500');
  assert.equal(rentalChair.items[0].unit, 'piece');

  assert.equal(rentalPlate.items[0].item, 'प्लेट');
  assert.equal(rentalPlate.items[0].quantity, '100');
  assert.equal(rentalPlate.items[0].unit, 'piece');

  assert.equal(rentalGlass.items[0].item, 'गिलास');
  assert.equal(rentalGlass.items[0].quantity, '50');
  assert.equal(rentalGlass.items[0].unit, 'piece');

  assert.equal(mungDal.items[0].item, 'मूंग दाल');
  assert.equal(mungDal.items[0].quantity, '2');
  assert.equal(mungDal.items[0].unit, 'किलो');

  assert.equal(milk.items[0].item, 'दूध');
  assert.equal(milk.items[0].quantity, '1');
  assert.equal(milk.items[0].unit, 'लीटर');

  assert.equal(halfSugar.items[0].item, 'चीनी');
  assert.equal(halfSugar.items[0].quantity, '0.5');
  assert.equal(halfSugar.items[0].unit, 'किलो');

  assert.equal(combined.customerName, 'राजू');
  assert.equal(combined.items[0].item, 'आलू');
  assert.equal(combined.items[0].unit, 'किलो');
  assert.equal(combined.items[1].item, 'प्याज');
  assert.equal(combined.items[1].unit, 'किलो');
});
