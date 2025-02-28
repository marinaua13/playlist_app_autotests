const { test, expect } = require('@playwright/test');
const { PlaylistPage } = require('../pageObjects/PlaylistPage');

test.describe('Verify Total Duration in mm:ss', () => {
  let playlistPage;

  test.beforeEach(async ({ page }) => {
    playlistPage = new PlaylistPage(page);
    await playlistPage.open();
  });

  test('should display total duration as mm:ss', async () => {
    await playlistPage.addTrackByIndex(1);
    await playlistPage.addTrackByIndex(2);

    const formatted = await playlistPage.getFormattedTotalDuration();

    expect(formatted).toMatch(/^\d+:\d+$/);

  });
});
