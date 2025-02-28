const { expect } = require('@playwright/test');

class PlaylistPage {
  constructor(page) {
    this.page = page;

    this.searchBox = page.getByRole('textbox', { name: 'Search' });

    this.playlistDuration = page.locator('#playlist-duration');

    this.playlistEmptyMsg = page.getByText('No tracks on playlist');
  }

  async open() {
    await this.page.goto('/');
  }
  async pickRandomTrackName() {
    const allTrackNames = await this.getAllTrackNames();
    if (allTrackNames.length === 0) {
      throw new Error('No tracks found on the page!');
    }
    const randomIndex = Math.floor(Math.random() * allTrackNames.length);
    return allTrackNames[randomIndex];
  }
  async searchTrack(trackName) {
    await this.searchBox.fill(trackName);

    await this.page.waitForTimeout(1000);
  }

  async addTrackByName(trackName) {
    const trackRow = this.page
      .locator('.MuiGrid-root.MuiGrid-container')
      .filter({ hasText: trackName });

    await trackRow.getByRole('button', { name: '+' }).click();
  }

  async addTrackByIndex(index = 0) {

    const trackRow = this.page.locator('.MuiGrid-root.MuiGrid-container').nth(index);

    await trackRow.getByRole('button', { name: '+' }).click();
  }

  async assertPlaylistNotEmpty() {
    await expect(this.playlistEmptyMsg).not.toBeVisible();
  }

  async getRawTotalDuration() {
    return this.playlistDuration.innerText();
  }

  async getFormattedTotalDuration() {
    const rawSecondsStr = await this.getRawTotalDuration();
    const totalSeconds = parseInt(rawSecondsStr, 10);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');

    return `${mm}:${ss}`;
  }
  async getAllTrackNames() {
    const trackNameLocators = this.page.locator(
        '.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-4 p.MuiTypography-root.MuiTypography-body1'
    );

    const count = await trackNameLocators.count();
    const names = [];
    for (let i = 0; i < count; i++) {
      const text = await trackNameLocators.nth(i).innerText();
      names.push(text);
    }
    return names;
  }

}

module.exports = { PlaylistPage };
