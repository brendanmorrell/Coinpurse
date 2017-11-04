// Https://facebook.github.io/jest/docs/en/getting-started.html
// Https://facebook.github.io/jest/docs/en/getting-started.html
// for 'test watch' either add --watch to the "jest" script in package.json, or add --watch to the actual command line script (in older versions of yarn, needed to add -- after test which said what comes after affects test not yarn, and then add --watch. now the new yarn doesn't require the first --)
const add = (a, b) => a + b;

test('should add two numbers', () => {
  const result = add(3, 4);
  expect(result).toBe(7);
});


const generateGreeting = (name = 'Anonymous') => `Hello ${name}`;

test('should inject the name variable into the sentence', () => {
  const resultName = generateGreeting('Mike');
  const resultBlank = generateGreeting();
  expect(resultName).toBe('Hello Mike');
  expect(resultBlank).toBe('Hello Anonymous');
});
