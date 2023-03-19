// import the format_date() and format_plural() functions from the helpers.js file
const { format_date, format_plural } = require('../utils/helpers');

// format_plural test
test('format_plural() returns a pluralized word', () => {
	let test1 = format_plural('comment', 0);
	let test2 = format_plural('comment', 1);
	let test3 = format_plural('comment', 2);
	expect(test1).toBe('comments');
	expect(test2).toBe('comment');
	expect(test3).toBe('comments');
});
test('format_plural() returns a pluralized word', () => {
	let test1 = format_plural('comment', 0);
	let test2 = format_plural('comment', 1);
	let test3 = format_plural('comment', 2);
	expect(test1).not.toBe('comment');
	expect(test2).not.toBe('comments');
	expect(test3).not.toBe('comment');
});

// format_date test
test('format_date() returns a formatted string as mm/dd/yyyy', () => {
	const date = new Date('2023-03-18 08:22:32');
	expect(format_date(date)).toBe('3/18/2023');
});
test('format_date() returns a formatted string as mm/dd/yyyy', () => {
	const date = new Date('2023-03-18 08:22:32');
	expect(format_date(date)).not.toBe('March 18, 2023');
});