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
  about?: string[]; // optional extract, one string per paragraph
  category: string; // slug from `categories`
  authorSlug?: string; // slug from `authors`
  addedAt: string; // ISO date the book was listed on Stated
  featured?: boolean; // editorial choice, set by Stated only
};

// Details are taken from the book covers only.
export const featured: Book = {
  slug: "policing-the-republic",
  category: "policing-justice",
  authorSlug: "yashovardhan-azad",
  addedAt: "2026-10-28",
  featured: true,
  title: "Policing the Republic",
  subtitle: "An Inside View of How India Fights Corruption and Crime, and Protects Rights",
  author: "Yashovardhan Azad",
  note: "Foreword by M.K. Narayanan",
  publisher: "Bloomsbury",
  cover: "/policing-the-republic.jpg",
  w: 900,
  h: 1293,
  link: "",
    about: [
      "Yashovardhan Azad joined the Indian Police Service in 1976 and went on to serve as Special Director of the Intelligence Bureau and later as Secretary (Security) in the Cabinet Secretariat. In this book he turns that long experience on a question that sits at the heart of Indian democracy: how should a republic police itself?",
      "Rather than telling tales of intelligence operations, Azad examines the structures that shape policing and governance. He writes about political interference, corruption, the criminalisation of politics, and the fragile machinery of investigation, and about the gap between the ideals of the Constitution and the realities of administration.",
      "His argument is that these are symptoms of institutions in need of deep and sustained reform. The remedies he offers are measured rather than dramatic: professionalism, accountability and real institutional independence.",
      "With a foreword by former National Security Adviser M.K. Narayanan, the book is written in clear prose and will interest policymakers, civil servants and students of public administration, as well as any citizen who wants to understand how the system works from the inside.",
    ],
};

export const shelf: Book[] = [
  {
    slug: "i-dare",
    category: "policing-justice",
    authorSlug: "kiran-bedi",
    addedAt: "2026-10-29",
    title: "I Dare!",
    subtitle: "Revised & Enlarged Edition",
    author: "Kiran Bedi",
    publisher: "Hay House India",
    language: "English",
    cover: "/i-dare.jpg",
    w: 900,
    h: 1487,
    link: "",
    about: [
      "Kiran Bedi joined the Indian Police Service in 1972 as its first woman officer, and went on to receive the Ramon Magsaysay Award for Government Service. I Dare! is her autobiography, following her life from her formative years to the present.",
      "The book looks at her work in policing, prison management and training, the three fields in which she became best known. It is written in her own voice and aimed at readers who want to understand what it takes to lead and reform from inside a large public institution.",
      "This Revised & Enlarged Edition adds new material, including a section on the reasons for her early retirement from the service, her approach to leading the Delhi Police, and her current ventures. The cover carries a bestseller badge for over 150,000 copies sold.",
    ],
  },
  {
    slug: "bridging-cultures",
    category: "military-security",
    authorSlug: "shokin-chauhan",
    addedAt: "2026-10-29",
    title: "Bridging Cultures",
    subtitle: "Northeast India\u2019s Role in Furthering India\u2019s Act East Policy",
    author: "Lt General Shokin Chauhan, PVSM, AVSM, YSM, SM, VSM, PhD",
    language: "English",
    cover: "/bridging-cultures.jpg",
    w: 900,
    h: 1463,
    link: "",
    about: [
      "Lt General Shokin Chauhan commissioned into the 11 Gorkha Rifles in 1979 and served nearly four decades in the Indian Army. He commanded 1 Corps, 8 Mountain Division and 70 Infantry Brigade, and also served as Director General of Assam Rifles and as Chairman of the Cease Fire Monitoring Group for Nagaland and Northeast India. His PhD, from Panjab University, is on India\u2013Nepal strategic relations.",
      "Bridging Cultures turns that experience to a question of foreign policy: what part can Northeast India play in furthering India\u2019s Act East Policy? The cover, which pairs the flags of India and Myanmar above a footbridge across a river, points to the book\u2019s theme of connection across borders and cultures.",
      "The book was released at the United Service Institution of India, New Delhi, on 30 September 2026 by General Anil Chauhan, former Chief of Defence Staff. It is written by an officer with long operational experience in counter-insurgency, counter-terrorism and border management in the region, and will interest readers of strategy, regional diplomacy and Northeast India.",
    ],
  },
  {
    slug: "you-can-make-it-happen",
    category: "governance-administration",
    authorSlug: "anil-swarup",
    addedAt: "2026-10-29",
    title: "You Can Make It Happen",
    subtitle: "Anil Swarup on turning intent into results",
    author: "Anil Swarup",
    publisher: "Unique Publishers",
    language: "English",
    cover: "/you-can-make-it-happen.jpg",
    w: 874,
    h: 1300,
    link: "",
    about: [
      "Anil Swarup spent more than three decades in the Indian Administrative Service, serving as Coal Secretary and School Education Secretary to the Government of India. In this book he draws on that experience to ask a practical question: why do some teams meet their targets while others, with the same resources, do not?",
      "His starting point is that no situation is ever perfect. Rather than waiting for ideal conditions, he argues, people who deliver learn to work around imperfections, move a team from failure towards success, and keep going. The principles he sets out are meant to apply well beyond government, because they begin with the individual.",
      "A recurring theme is that small changes to daily routine can improve the odds of success. The book also looks at what it takes to make an idea workable in a democracy, where a good proposal still has to be politically acceptable, financially viable and administratively feasible.",
      "Swarup is also the founder of Nexus of Good, a voluntary organisation, and mentors students and young executives. This is a book for readers who want to act on their intentions, written by someone who has had to deliver results inside a very large system.",
    ],
  },
  {
    slug: "dynamic-dm",
    category: "governance-administration",
    authorSlug: "heera-lal",
    addedAt: "2026-10-28",
    title: "Dynamic D.M.",
    publisher: "Prabhat Prakashan",
    subtitle: "सहयोग से सुशासन, सुशासन से समृद्धि",
    author: "Dr. Heera Lal, IAS · Kumud Verma",
    language: "Hindi",
    cover: "/dynamic-dm.jpg",
    w: 862,
    h: 1300,
    link: "",
    about: [
      "Dr. Heera Lal, an IAS officer, served as District Magistrate of Banda in Uttar Pradesh. This book, written with Kumud Verma, tells the story of what a district administrator can achieve when he treats the job as public service rather than a post.",
      "It describes initiatives from his time in Banda, including a startup and innovation summit, a large voter-awareness campaign, prison reform, a campaign to save village ponds during summer water shortages, efforts against malnutrition, and the development of Kalinjar as a tourist destination.",
      "The central message is in the subtitle: through cooperation comes good governance, and through good governance comes prosperity. The authors write about foresight, teamwork, dedication and craftsmanship in administration, and argue that district officials who take their duties seriously can bring essential facilities to every village.",
      "Part administrative memoir and part motivation for those in public life, the book is meant to be readable by ordinary citizens as well as by civil service aspirants and serving officers.",
    ],
  },
  {
    slug: "khaki-in-action",
    category: "policing-justice",
    authorSlug: "op-singh",
    addedAt: "2026-10-28",
    title: "Khaki in Action",
    subtitle: "Unsuni Case Files (Hindi edition of Crime, Grime & Gumption)",
    author: "O.P. Singh, Former Director General of Police",
    language: "Hindi",
    cover: "/khaki-in-action.jpg",
    w: 900,
    h: 1285,
    link: "",
    about: [
      "Khaki in Action is the Hindi edition of Crime, Grime & Gumption: Case Files of an IPS Officer, by O.P. Singh, a 1983-batch Indian Police Service officer who went on to become a Director General of Police.",
      "The book is an account of law enforcement and governance in the Hindi belt, told by a police officer in the first person. It follows his postings from Gaya in Bihar to Lakhimpur Kheri in Uttar Pradesh, where he dealt with militancy in the wetland areas.",
      "Beyond individual cases, Singh writes about the situations in which the police are called on to hold things together: the 2015 Nepal earthquake, the 2014 Srinagar floods and the 2015 Chennai floods, as well as events involving public order and politics, such as the Ayodhya verdict, protests against the Citizenship Amendment Act, the Kumbh Mela and the 2019 Lok Sabha elections.",
      "The subtitle, Unsuni Case Files, promises stories that have rarely been told, and the book presents them frankly, from inside the force.",
    ],
  },
  {
    slug: "kashmir-in-the-line-of-fire",
    category: "military-security",
    authorSlug: "ranjan-mahajan",
    addedAt: "2026-10-28",
    title: "Kashmir in the Line of Fire",
    subtitle: "A Memoir of Its Unordinary People and Soldiers",
    author: "Maj Gen Ranjan Mahajan",
    language: "English",
    cover: "/kashmir-in-the-line-of-fire.jpg",
    w: 896,
    h: 1300,
    link: "",
    about: [
      "Maj Gen Ranjan Mahajan served five tenures in Jammu and Kashmir over about fifteen years, a period that saw the rise of militancy and the Army's response to it. This memoir is his account of that time.",
      "The book is less about strategy than about people. It writes about young soldiers, and about civilians caught between faith and fear in a place where violence has long been part of daily life. It recounts encounters, losses and acts of heroism that rarely reach the headlines.",
      "Running through the memoir is a sense of resilience and humanity under pressure: the ordinary people and soldiers of the subtitle who carry on in extraordinary circumstances.",
      "For readers who know Kashmir only through news reports, it offers a view from the ground by an officer who spent a large part of his service there, told as personal memory rather than official history.",
    ],
  },
];

export const allBooks: Book[] = [featured, ...shelf];

export type Category = { slug: string; name: string; blurb: string };
export const categories: Category[] = [
  { slug: "policing-justice", name: "Policing & Justice", blurb: "Law enforcement, reform and the policing of a democracy." },
  { slug: "governance-administration", name: "Governance & Administration", blurb: "Public administration, delivery and leadership in government." },
  { slug: "military-security", name: "Military & Security", blurb: "Soldiers, security and strategy, from those who served." },
];

export type Author = {
  slug: string;
  name: string;
  role: string; // one-line, from verified sources only
  bio: string[];
  featured?: boolean; // editorial; set only by Stated
  principlesUrl?: string; // internal link to their Stated Principles feature, if one exists
};
export const authors: Author[] = [
  {
    slug: "yashovardhan-azad",
    name: "Yashovardhan Azad",
    role: "Former Special Director, Intelligence Bureau",
    featured: true,
    bio: [
      "Yashovardhan Azad joined the Indian Police Service in 1976 and rose to Special Director of the Intelligence Bureau. He later served as Secretary (Security) in the Cabinet Secretariat.",
      "His book Policing the Republic examines policing, governance and the character of Indian democracy from the inside.",
    ],
  },
  {
    slug: "anil-swarup",
    name: "Anil Swarup",
    role: "Former Coal Secretary and School Education Secretary, Government of India",
    bio: [
      "Anil Swarup is a former IAS officer of the 1981 batch, Uttar Pradesh cadre. He served as Coal Secretary and School Education Secretary to the Government of India.",
      "He writes books and newspaper articles, mentors students and young executives, and runs the voluntary organisation Nexus of Good.",
    ],
  },
  {
    slug: "heera-lal",
    name: "Dr. Heera Lal, IAS",
    role: "IAS officer, former District Magistrate of Banda",
    bio: [
      "Dr. Heera Lal is an IAS officer who served as District Magistrate of Banda in Uttar Pradesh. Dynamic D.M., written with Kumud Verma, describes the governance initiatives of that tenure.",
    ],
  },
  {
    slug: "op-singh",
    name: "O.P. Singh",
    role: "Former Director General of Police",
    bio: [
      "O.P. Singh is a 1983-batch Indian Police Service officer and a former Director General of Police. His memoir Crime, Grime & Gumption: Case Files of an IPS Officer is available in Hindi as Khaki in Action.",
    ],
  },
  {
    slug: "ranjan-mahajan",
    name: "Maj Gen Ranjan Mahajan",
    role: "Major General, Indian Army (Retd.)",
    bio: [
      "Maj Gen Ranjan Mahajan served five tenures in Jammu and Kashmir over about fifteen years. His memoir Kashmir in the Line of Fire draws on that experience.",
    ],
  },
  {
    slug: "shokin-chauhan",
    name: "Lt General Shokin Chauhan",
    role: "Former Director General, Assam Rifles",
    principlesUrl: "/principles/lt-general-shokin-chauhan",
    bio: [
      "Lt General Shokin Chauhan, PVSM, AVSM, YSM, SM, VSM, PhD, was commissioned into the 11 Gorkha Rifles in 1979 and served nearly four decades in the Indian Army. He commanded 1 Corps, 8 Mountain Division and 70 Infantry Brigade, and served as Director General of Assam Rifles and Chairman of the Cease Fire Monitoring Group for Nagaland and Northeast India.",
      "His PhD, from Panjab University, is on India\u2013Nepal strategic relations.",
    ],
  },
  {
    slug: "kiran-bedi",
    name: "Kiran Bedi",
    role: "India's first woman IPS officer",
    bio: [
      "Kiran Bedi joined the Indian Police Service in 1972 as its first woman officer and received the Ramon Magsaysay Award for Government Service. Her work spans policing, prison management and training.",
    ],
  },
];

// Membership plans. Prices are integer paise; change them here, not in the UI.
export type Plan = { id: string; name: string; pricePaise: number; maxBooks: number; features: string[] };
export const plans: Plan[] = [
  {
    id: "author",
    name: "Stated Author",
    pricePaise: 200000,
    maxBooks: 3,
    features: [
      "Dedicated public author profile",
      "Up to 3 active book listings",
      "One shareable URL for your bookshelf",
      "Reader reviews on every book, after moderation",
      "Access to your published reviews and basic review information",
      "Permitted profile editing and official book links",
    ],
  },
  {
    id: "author-plus",
    name: "Stated Author Plus",
    pricePaise: 500000,
    maxBooks: 10,
    features: [
      "Everything in Stated Author",
      "Up to 10 active book listings",
      "Enhanced biography and expanded book presentation",
      "More detailed reporting, where data supports it",
      "Eligible for featured placement, subject to editorial availability and clear disclosure",
    ],
  },
];

export const inr = (paise: number) => "\u20b9" + (paise / 100).toLocaleString("en-IN");
export const bookBySlug = (slug: string) => allBooks.find((b) => b.slug === slug);
export const authorBySlug = (slug: string) => authors.find((a) => a.slug === slug);
export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
