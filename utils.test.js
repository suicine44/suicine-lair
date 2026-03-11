import { test } from 'node:test';
import assert from 'node:assert';
import { escapeHtml, searchUrl, detectMarkers, cleanMarkers } from './utils.js';

test('escapeHtml', () => {
  assert.strictEqual(escapeHtml('<b>"hi" & \'bye\'</b>'), '&lt;b&gt;&quot;hi&quot; &amp; &#39;bye&#39;&lt;/b&gt;');
});

test('searchUrl', () => {
  assert.strictEqual(searchUrl('letterboxd', 'The Matrix'), 'https://letterboxd.com/search/The%20Matrix/');
  assert.strictEqual(searchUrl('imdb', 'The Matrix'), 'https://www.imdb.com/find?q=The%20Matrix&s=tt');
  assert.strictEqual(searchUrl('metacritic', 'The Matrix'), 'https://www.metacritic.com/search/The%20Matrix/');
  assert.strictEqual(searchUrl('unknown', 'The Matrix'), '#');
});

test('detectMarkers', async (t) => {
  await t.test('detects star ★', () => {
    assert.deepStrictEqual(detectMarkers('Movie ★'), { star: true, heart: false });
  });
  await t.test('detects star \u2605', () => {
    assert.deepStrictEqual(detectMarkers('Movie \u2605'), { star: true, heart: false });
  });
  await t.test('detects heart ♥', () => {
    assert.deepStrictEqual(detectMarkers('Song ♥'), { star: false, heart: true });
  });
  await t.test('detects heart \u2665', () => {
    assert.deepStrictEqual(detectMarkers('Song \u2665'), { star: false, heart: true });
  });
  await t.test('detects heart with variation selector ♥︎', () => {
    assert.deepStrictEqual(detectMarkers('Song ♥︎'), { star: false, heart: true });
  });
  await t.test('detects both', () => {
    assert.deepStrictEqual(detectMarkers('Both ★♥'), { star: true, heart: true });
  });
  await t.test('detects none', () => {
    assert.deepStrictEqual(detectMarkers('Nothing'), { star: false, heart: false });
  });
});

test('cleanMarkers', () => {
  assert.strictEqual(cleanMarkers('Movie ★'), 'Movie');
  assert.strictEqual(cleanMarkers('Movie \u2605'), 'Movie');
  assert.strictEqual(cleanMarkers('Song ♥'), 'Song');
  assert.strictEqual(cleanMarkers('Song ♥︎'), 'Song');
  assert.strictEqual(cleanMarkers('Both ★♥'), 'Both');
  assert.strictEqual(cleanMarkers('Nothing'), 'Nothing');
});
