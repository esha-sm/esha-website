export type Letter = {
  id: string;
  envelope: string;
  paper: string;
  stamp: string;
  to: string;
  from: string;
  body: string;
  createdAt: string;
};

export const MAX_BODY = 1200;
export const MAX_NAME = 40;

export const envelopePhotos = [
  {
    id: "taupe",
    label: "Ornate",
    art: "/post-shop/envelopes/taupe.svg",
    width: 560,
    height: 418,
  },
  {
    id: "crimson",
    label: "Crimson",
    art: "/post-shop/envelopes/crimson.svg",
    width: 560,
    height: 365,
  },
  {
    id: "olive",
    label: "Olive",
    art: "/post-shop/envelopes/olive.svg",
    width: 560,
    height: 381,
  },
] as const;

export type EnvelopePhotoId = (typeof envelopePhotos)[number]["id"];

export const seals = [
  {
    id: "cupid",
    label: "Cupid",
    art: "/post-shop/seals/cupid.svg",
    width: 400,
    height: 405,
  },
  {
    id: "rose",
    label: "Rose",
    art: "/post-shop/seals/rose.svg",
    width: 400,
    height: 419,
  },
  {
    id: "blossom",
    label: "Blossom",
    art: "/post-shop/seals/blossom.svg",
    width: 400,
    height: 391,
  },
  {
    id: "bow",
    label: "Bow",
    art: "/post-shop/seals/bow.svg",
    width: 400,
    height: 392,
  },
  {
    id: "lavender",
    label: "Lavender",
    art: "/post-shop/seals/lavender.svg",
    width: 400,
    height: 421,
  },
] as const;

export type SealId = (typeof seals)[number]["id"];
