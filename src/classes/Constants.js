import parseJSON from "../classes/parseJSON";
export const json = new parseJSON();

export const type = {
  Hydro: "./assets/img/misc/hydro.webp",
  Pyro: "./assets/img/misc/pyro.webp",
  Geo: "./assets/img/misc/geo.webp",
  Electro: "./assets/img/misc/electro.webp",
  Dendro: "./assets/img/misc/dendro.webp",
  Cryo: "./assets/img/misc/cryo.webp",
  Anemo: "./assets/img/misc/anemo.webp",
  Bow: "./assets/img/misc/bow.webp",
  Catalyst: "./assets/img/misc/catalyst.webp",
  Claymore: "./assets/img/misc/claymore.webp",
  Polearm: "./assets/img/misc/polearm.webp",
  Sword: "./assets/img/misc/sword.webp",
};

export const baseThreeStar = [
  "sharpshooter's_oath",
  "slingshot",
  "raven_bow",
  "emerald_orb",
  "thrilling_tales_of_dragon_slayers",
  "magic_guide",
  "black_tassel",
  "debate_club",
  "bloodtainted_greatsword",
  "ferrous_shadow",
  "skyrider_sword",
  "harbinger_of_dawn",
  "cool_steel",
];

export const allChars = [
  "albedo",
  "amber",
  "barbara",
  "beidou",
  "bennett",
  "chongyun",
  "diluc",
  "diona",
  "fischl",
  "jean",
  "kaeya",
  "keqing",
  "klee",
  "lisa",
  "mona",
  "ningguang",
  "noelle",
  "qiqi",
  "razor",
  "sucrose",
  "tartaglia",
  "venti",
  "xiangling",
  "xingqiu",
  "xinyan",
  "zhongli",
];

export const allBannersAbbr = [
  "albedo",
  "zhongli",
  "childe",
  "klee",
  "venti",
  "albedo_ei",
  "zhongli_ei",
  "childe_ei",
  "klee_ei",
  "venti_ei",
  "standard",
];

const randItem = (pool) => pool[Math.floor(Math.random() * pool.length)];

export const CalcWish = (
  currentBanner,
  activeBanners,
  setHasFive,
  setHasFour
) => {
  const wishChance = Math.random();
  const rateUp = Math.random() < 0.5 ? true : false;
  let wishItem;
  activeBanners.map((banner) => {
    if (currentBanner === banner.banner.abbr) {
      // matches banner
      if (wishChance < banner.rateFive || banner.pityFive >= 89) {
        // 5 star
        setHasFive(true);
        banner.pityFive = 0;
        banner.pityFour++;
        if (!(currentBanner === "standard")) {
          // non-standard banner
          if (rateUp || banner.guaranteeFive) {
            // draw from rateUp
            banner.guaranteeFive = false;
            wishItem = randItem(banner.banner.rateUpFive);
          } else {
            // drawing from normal pile
            wishItem = currentBanner.includes("_ei")
              ? randItem(banner.banner.poolFiveWeapon)
              : randItem(banner.banner.poolFiveChar);
            banner.guaranteeFive = true;
          }
        } else {
          // standard banner
          if (wishChance < banner.rateFive / 2)
            wishItem = randItem(banner.banner.poolFiveChar);
          else wishItem = randItem(banner.banner.poolFiveWeapon);
        }
      } else if (wishChance < banner.rateFour || banner.pityFour >= 9) {
        // 4 star
        setHasFour(true);
        banner.pityFour = 0;
        banner.pityFive++;
        if (!(currentBanner === "standard")) {
          // not standard banner
          if (rateUp || banner.guaranteeFour) {
            // draw from rateUp
            banner.guaranteeFour = false;
            wishItem = randItem(banner.banner.rateUpFour);
          } else {
            // draw from non rate up
            banner.guaranteeFour = true;
            if (wishChance < banner.rateFour / 2)
              wishItem = randItem(banner.banner.poolFourChar);
            else wishItem = randItem(banner.banner.poolFourWeapon);
          }
        } else {
          // standard banner
          if (wishChance < banner.rateFour / 2)
            wishItem = randItem(banner.banner.poolFourChar);
          else wishItem = randItem(banner.banner.poolFourWeapon);
        }
      } else {
        // 3 stars
        banner.pityFive++;
        banner.pityFour++;
        wishItem = randItem(baseThreeStar);
      }
    }
    return banner;
  });
  return wishItem;
};
