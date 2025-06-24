import { escapeHTML } from '../src/utils/utils.js'; 

test('escapeHTML échappe les caractères spéciaux', () => {
  expect(escapeHTML('<div>test & "quote"</div>')).toBe('&lt;div&gt;test &amp; &quot;quote&quot;&lt;/div&gt;');
});
