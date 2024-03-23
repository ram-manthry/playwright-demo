import { test, expect } from '@playwright/test';
import { AJAX_URL } from './config';

test.skip('test', async ({ page }) => {
	const expected = 'Global Indian!';
	await page.goto(AJAX_URL);
	const actual = (
		await page.locator('.mb-search__heading').locator('span').textContent()
	)?.trim();
	expect(actual).toEqual(expected);
});
