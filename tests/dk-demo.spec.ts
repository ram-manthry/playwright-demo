import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {
	const expected = 'Global Indian!';
	await page.goto('https://www.magicbricks.com/');
	const actual = await page
		.locator('.mb-search__heading')
		.locator('span')
		.textContent();
	expect(actual?.trim()).toEqual(expected);
});
