import * as dotenv from 'dotenv';
dotenv.config();

import { expect } from '@playwright/test';

export async function openApp(page) {
    await page.goto(process.env.BASE_URL);
}
export async function searchTrack(page, trackName) {
    await page.waitForSelector('input.MuiInputBase-input');
    await page.fill('input.MuiInputBase-input', trackName);
    await page.waitForTimeout(2000);
}

export async function addTrackToPlaylist(page, trackName) {
    await page.click(`text=${trackName} +`);
}

export async function playlistShouldHaveTracks(page) {
    const count = await page.locator('.playlist-item').count();
    expect(count).toBeGreaterThan(0);
}

export async function getTotalDuration(page) {
    return await page.locator('.total-duration').innerText();
}
