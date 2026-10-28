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
    about: [
      "Yashovardhan Azad joined the Indian Police Service in 1976 and went on to serve as Special Director of the Intelligence Bureau and later as Secretary (Security) in the Cabinet Secretariat. In this book he turns that long experience on a question that sits at the heart of Indian democracy: how should a republic police itself?",
      "Rather than telling tales of intelligence operations, Azad examines the structures that shape policing and governance. He writes about political interference, corruption, the criminalisation of politics, and the fragile machinery of investigation, and about the gap between the ideals of the Constitution and the realities of administration.",
      "His argument is that these are symptoms of institutions in need of deep and sustained reform. The remedies he offers are measured rather than dramatic: professionalism, accountability and real institutional independence.",
      "With a foreword by former National Security Adviser M.K. Narayanan, the book is written in clear prose and will interest policymakers, civil servants and students of public administration, as well as any citizen who wants to understand how the system works from the inside.",
    ],
};

export const shelf: Book[] = [
  {
    slug: "you-can-make-it-happen",
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
