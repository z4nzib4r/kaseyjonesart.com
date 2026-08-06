// Site-wide settings. Contact details and links live here so they only
// need to be changed in one place.
export const SITE = {
  artist: 'Kasey Jones',
  title: 'Kasey Jones',
  description: 'Portfolio of artist Kasey Jones.',
  email: 'hello@kaseyjonesart.com',
  instagram: 'https://www.instagram.com/kaseyjonesart/',
  // shopUrl: 'https://...', // uncomment when the shop exists
};

// Which works show on the Murals page instead of Installations. Each entry is
// a work's folder name in src/content/artworks/. Anything not listed here is
// treated as an installation.
export const MURALS = ['ohio-native-flowers'];

// Temporary holding page while the site is being reworked.
//   true  — "/" is the coming-soon landing, the rest of the site still builds
//           at its normal URLs but is unlinked and noindexed, and the gallery
//           is previewable at /preview/.
//   false — normal site: "/" is the gallery again and /preview/ stops existing.
// Flipping this back to false is the only step needed to relaunch.
export const COMING_SOON = true;
