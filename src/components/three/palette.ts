/** Shared colors for the 3D world. Three.js materials need concrete hex values. */
export const PALETTE = {
    grass: "#9ee0c4",
    grassDark: "#74caa6",
    soil: "#c9a07c",
    rock: "#a59fe0",
    rockDark: "#7f76c9",
    crystal: "#7de8f5",
    floor: "#f1e3cf",
    floorEdge: "#d9bf9f",
    wall: "#f6f4ff",
    wallTrim: "#d8d2fb",
    desk: "#ffffff",
    deskLeg: "#bfb7ef",
    screen: "#17163a",
    frame: "#2b2858",
    purple: "#7c5cff",
    violet: "#a58bff",
    blue: "#4f8dff",
    cyan: "#38d3ea",
    pink: "#ff8fc6",
    yellow: "#ffd36e",
    white: "#ffffff",
    skin: "#f1c19b",
    hair: "#2a2342",
    hoodie: "#6c58ff",
    pants: "#2e3970",
    shoe: "#f4f3ff",
    leaf: "#5fcf9c",
    leafDark: "#3cb487",
    trunk: "#a8765c",
    pot: "#ff9fba",
    stone: "#e7e3fb",
    shopify: "#95bf47",
    wordpress: "#3a7bd5",
    node: "#5fa04e",
    book1: "#ff8fc6",
    book2: "#4f8dff",
    book3: "#ffd36e",
  } as const;
  
  export type Vec3 = [number, number, number];
  
  /** Camera framings for the overview and the "Explore" close-up. */
  export const SHOTS = {
    overview: { position: [8.5, 5.6, 11.5] as Vec3, target: [0, -0.5, 0] as Vec3 },
    overviewMobile: {
      position: [10, 7, 14.5] as Vec3,
      target: [0, -0.4, 0] as Vec3,
    },
    closeup: { position: [1.5, 2.3, 1.4] as Vec3, target: [0.15, 1.35, -1.7] as Vec3 },
  } as const;
  