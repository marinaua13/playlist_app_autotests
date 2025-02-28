
const { test } = require('@playwright/test');
const { PlaylistPage } = require('../pageObjects/PlaylistPage');

test.describe('Add Track', () => {
  let playlistPage;

  test.beforeEach(async ({ page }) => {
    playlistPage = new PlaylistPage(page);
    await playlistPage.open();
  });

  test('should add a random track by name and ensure playlist is not empty', async () => {
    const randomName = await playlistPage.pickRandomTrackName();

    await playlistPage.addTrackByName(randomName);

    await playlistPage.assertPlaylistNotEmpty();
  });
});
