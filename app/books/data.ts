export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  note?: string;
  publisher?: string;
  language?: string;
  cover: string;
  w: number;
  h: number;
  link: string; // buy link; leave "" to hide the button
};

// Details are taken from the book covers only.
export const featured: Book = {
  slug: "policing-the-republic",
  title: "Policing the Republic",
  subtitle: "An Inside View of How India Fights Corruption and Crime, and Protects Rights",
  author: "Yashovardhan Azad",
  note: "Foreword by M.K. Narayanan",
  publisher: "Bloomsbury",
  cover: "/policing-the-republic.jpg",
  w: 900,
  h: 1293,
  link: "",
};

export const shelf: Book[] = [
  {
    slug: "dynamic-dm",
    title: "Dynamic D.M.",
    subtitle: "सहयोग से सुशासन, सुशासन से समृद्धि",
    author: "Dr. Heera Lal, IAS · Kumud Verma",
    language: "Hindi",
    cover: "/dynamic-dm.jpg",
    w: 862,
    h: 1300,
    link: "",
  },
  {
    slug: "khaki-in-action",
    title: "Khaki in Action",
    subtitle: "Unsuni Case Files (Hindi edition of Crime, Grime & Gumption)",
    author: "O.P. Singh, Former Director General of Police",
    language: "Hindi",
    cover: "/khaki-in-action.jpg",
    w: 900,
    h: 1285,
    link: "",
  },
  {
    slug: "kashmir-in-the-line-of-fire",
    title: "Kashmir in the Line of Fire",
    subtitle: "A Memoir of Its Unordinary People and Soldiers",
    author: "Maj Gen Ranjan Mahajan",
    language: "English",
    cover: "/kashmir-in-the-line-of-fire.jpg",
    w: 896,
    h: 1300,
    link: "",
  },
];

export const allBooks: Book[] = [featured, ...shelf];
