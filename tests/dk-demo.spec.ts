import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {
	const expected = 'Global Indian!';
	const pageUrl = 'https://www.magicbricks.com/';
	await page.goto(pageUrl);
	const actual = (
		await page.locator('.mb-search__heading').locator('span').textContent()
	)?.trim();
	expect(actual).toEqual(expected);
});
