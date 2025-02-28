
const { test, expect } = require('@playwright/test');
const { PlaylistPage } = require('../pageObjects/PlaylistPage');

test.describe('Search Functionality', () => {
  let playlistPage;

  test.beforeEach(async ({ page }) => {
    playlistPage = new PlaylistPage(page);
    await playlistPage.open();
  });

  test('should filter the available tracks by name', async () => {

    await playlistPage.searchTrack('Summer');

    const summerTracks = playlistPage.page
      .locator('.MuiGrid-root.MuiGrid-container')
      .filter({ hasText: 'Summer' });
    const count = await summerTracks.count();

    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Dynamic Search Test', () => {
  let playlistPage;

  test.beforeEach(async ({ page }) => {
    playlistPage = new PlaylistPage(page);
    await playlistPage.open();
  });

  test('should pick a random track from the list and verify that search filters correctly', async () => {
    const randomName = await playlistPage.pickRandomTrackName();

    await playlistPage.searchTrack(randomName);

    const filteredNames = await playlistPage.getAllTrackNames();
    expect(filteredNames.length).toBeGreaterThan(0);

    for (const name of filteredNames) {
      expect(name.toLowerCase()).toContain(randomName.toLowerCase());
    }
  });
});
