import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// Set to true only after Justice Shah has reviewed and approved this page. While false, search engines are asked not to index it.
const APPROVED = false;

const SLUG = "justice-subodh-shah";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Justice Subodh G. Shah — Justice, Integrity & Public Trust";
const DESCRIPTION =
  "Justice, integrity and constitutional values. Twelve principles from a former Judge of the High Court of Gujarat who worked on the computerisation of Indian courts, on judgement, public trust, technology and a life of meaningful contribution.";
const IMAGE = "https://app.stated.in/subodh-shah-portrait.jpg";
const TOTAL = 12;

export const metadata: Metadata = {
  title: `${TITLE} | Stated Principles`,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  robots: { index: APPROVED, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Stated",
    type: "article",
    images: [{ url: IMAGE, width: 560, height: 560, alt: "Justice Subodh G. Shah" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
};

type Seg = string | { b: string } | { i: string };
type Para = string | Seg[];
type Principle = {
  number: string;
  topic: string;
  title: string;
  question: string;
  quote: Para[];
  whatThisMeans: string;
  whyItMatters: string;
  reflect: string;
};

function renderSeg(s: Seg, i: number) {
  if (typeof s === "string") return <span key={i}>{s}</span>;
  if ("b" in s)
    return (
      <strong key={i} className="font-semibold text-neutral-900">
        {s.b}
      </strong>
    );
  return <em key={i}>{s.i}</em>;
}

function PrincipleCard({ p, showCta }: { p: Principle; showCta?: boolean }) {
  return (
    <article id={`principle-${p.number}`} className="scroll-mt-6 border-t border-neutral-200 pt-10">
      <p className="text-sm text-neutral-400">
        {p.number} of {TOTAL} · {p.topic}
      </p>
      <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

      <p className="mt-4 text-sm italic leading-relaxed text-neutral-500">
        <span className="not-italic font-semibold text-neutral-600">The question we asked: </span>
        {p.question}
      </p>

      <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
        {p.quote.map((para, i) => (
          <p key={i} className="leading-relaxed">
            {typeof para === "string" ? para : para.map(renderSeg)}
          </p>
        ))}
      </blockquote>
      <p className="mt-3 text-sm text-neutral-500">— Justice Subodh G. Shah, stated directly</p>

      <div className="mt-8 space-y-6">
        <div>
          <p className="text-sm font-semibold text-neutral-900">What this means</p>
          <p className="mt-1 leading-relaxed text-neutral-700">{p.whatThisMeans}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900">Why it matters</p>
          <p className="mt-1 leading-relaxed text-neutral-700">{p.whyItMatters}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900">Reflect on this</p>
          <p className="mt-1 leading-relaxed text-neutral-700">{p.reflect}</p>
        </div>
      </div>

      {showCta && (
        <a
          href="https://app.stated.in/signup"
          className="mt-8 inline-block rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:border-neutral-900"
        >
          Create a Commitment inspired by this
        </a>
      )}
    </article>
  );
}

const FACTS = [
  {
    "label": "Date of Birth",
    "value": "02/02/1957"
  },
  {
    "label": "Date of Joining Service",
    "value": "06/03/1997"
  },
  {
    "label": "Date of Elevation as High Court Judge",
    "value": "12/11/2012"
  },
  {
    "label": "Date of Retirement",
    "value": "01/02/2019"
  }
];

// Biography: his resume, reproduced word for word (static, trusted HTML).
const PROFILE_HTML = "<ul class=\"\">\n<li><p>As a student</p>\n<ul>\n<li><p>Received President’s Award as best Scout.</p></li>\n<li><p>Attended NCC up to first rank,</p></li>\n<li><p>Gained several medals in few games (Badminton, Table Tennis)</p></li>\n</ul></li>\n<li><p>Education</p>\n<ul>\n<li><p>Graduated in B.Sc. with Microbiology as main and Chemistry as subsidiary subjects in the year 1977.</p></li>\n<li><p>Obtained Law Degree in the year 1981 with Labour Laws and</p></li>\n<li><p>LL.M. with Constitution, in the year 1987.</p></li>\n</ul></li>\n<li><p>Enrolled as an Advocate in the month of December 1981 and practice as an Advocate until February 1997.</p></li>\n<li><p>Practiced almost on all sides viz;</p></li>\n</ul><p>Civil, Criminal, Constitutional, and Revenue in various Courts, Tribunals and Commissions, which includes:</p><ul class=\"\">\n<li><p>High Court of Gujarat,</p></li>\n<li><p>Bombay High Court,</p></li>\n<li><p>few Courts in Rajasthan and</p></li>\n<li><p>National Consumer Commission, etc.</p></li>\n</ul><ul class=\"\">\n<li><p>First advocate to adopt computer technology as early as in year 1985</p></li>\n<li><p>Computerised personal office on LAN network in 1989,</p></li>\n<li><p>Directly appointed as a Judge of the City Civil &amp; Sessions Court, Ahmadabad by invitation in March 1997,</p></li>\n<li><p>Mediator in several Lok Adalat and mediation during carrier as an Advocate and as a Judge,</p></li>\n<li><p>Judicial Classification of pending cases before Supreme Court of India in May 1997.</p></li>\n<li><p>Attended the conference on 'SAAP Technology' at Kathmandu in December 1997.</p></li>\n</ul><p>Worked for:</p><ul class=\"\">\n<li><p>infrastructure requirements (buildings for Court Complex and Residential Quarters etc.) of entire Judiciary,</p></li>\n<li><p>Rule making process of Gujarat High Court,</p></li>\n<li><p>Accounts with Financial Management of Gujarat High Court;</p></li>\n<li><p>Cyber Crimes &amp; Cyber Laws to comment on Information Technology Act, 2000.</p></li>\n</ul><ul class=\"cols\">\n<li><p>Instrumental in implementing the project of computerization of</p>\n<ul>\n<li><p>New Gujarat High Court Complex,</p></li>\n<li><p>Supreme Court of India,</p></li>\n<li><p>Madras High Court,</p></li>\n<li><p>all District Courts of Gujarat and</p></li>\n<li><p>Entire Judiciary – all courts of India through E-Committee</p></li>\n</ul></li>\n<li><p>Member of the Standing Committee of the Supreme Court of India for monitoring E-Committee for computerization of entire judiciary in the country.</p></li>\n<li><p>Developed e-Court for the first time in India.</p></li>\n<li><p>Had exercised limited powers for interlocutory orders as per Supreme Court Rules, 1966.</p></li>\n<li><p>Attended 'Asia-Pacific Courts conference, 2010' in Singapore.</p></li>\n<li><p>Delivered several lectures on different Judicial Subjects / issues to Judicial Officers and Judges of different States at Ahmedabad, Bhopal, Bhubaneswar, Jodhpur, and other places so also Students of C A &amp; C S.</p></li>\n<li><p>Address to scientist of Forensic Science at Kolkata in their National Conference.</p></li>\n<li><p>As City Civil &amp; Sessions Judge conducted several Civil &amp; Criminal matters: decided 1388 cases in 174 days.</p></li>\n<li><p>As CBI Judge conducted complex cases: decided eighteen cases in 138 working days and decided more than two hundred discharge applications and examine 272 witnesses.</p></li>\n<li><p>As Judge of the High Court of Gujarat deal with almost all subjects and delivered approximately 19832 judgements in 1260 working days</p></li>\n<li><p>At present since 2019 educating JMFC aspirants, in addition to consultation and Arbitration.</p></li>\n<li><p>Delivered Several lectures online after COVID Pendamic on different platform and with different Institution.</p></li>\n<li><p>Worked as a Domain Expert for developing AI for National Judicial Council of Nigeria, sponsored by US Government and Microsoft</p></li>\n<li><p>Addressed 11th Biennial Commonwealth Judicial Educators Meeting Artificial held on 14 February 2026 at Supreme Court of India on <strong>Artificial Intelligence: Key Leadership &amp; Challenges</strong></p></li>\n<li><p>List of Lectures at Different Places &amp; Institute Viz:</p></li>\n</ul><ul class=\"cols\">\n<li><p>All India Forensic Science Conference by Department of Forensic Science, Ministry of Home Affairs</p></li>\n<li><p>Gujarat National Law University</p></li>\n<li><p>Gujarat State Judicial Academy</p></li>\n<li><p>High Court of Gujarat</p></li>\n<li><p>Modasa Law College</p></li>\n<li><p>National Forensic Science University, Gandhinagar</p></li>\n<li><p>National Judicial Academy, Bhopal</p></li>\n<li><p>Odisha Judicial Academy</p></li>\n<li><p>Rajasthan State Judicial Academy</p></li>\n<li><p>Tilak Maharashtra Vidyapeeth, Pune</p></li>\n<li><p>Unitedworld School Of Law in Karnavati University</p></li>\n</ul><ul class=\"\">\n<li><p>Delivered Lectures Online on Different Platforms Viz:</p></li>\n</ul><ul class=\"cols\">\n<li><blockquote>\n<p>Amity University</p>\n</blockquote></li>\n<li><blockquote>\n<p>Jain International Organization</p>\n</blockquote></li>\n<li><blockquote>\n<p>Kristu Jayanti College of Law, Bengaluru</p>\n</blockquote></li>\n<li><blockquote>\n<p>Legal Eagle Law Forum</p>\n</blockquote></li>\n<li><blockquote>\n<p>Legal Thirst</p>\n</blockquote></li>\n<li><blockquote>\n<p>Lex Simplicitor Series</p>\n</blockquote></li>\n<li><blockquote>\n<p>Mediate Guru</p>\n</blockquote></li>\n<li><blockquote>\n<p>MS University, Vadodara</p>\n</blockquote></li>\n<li><blockquote>\n<p>Sambhav Initiative</p>\n</blockquote></li>\n<li><blockquote>\n<p>The Amikus Qriae (YouTube Channel)</p>\n</blockquote></li>\n<li><blockquote>\n<p>Unaccc Global Water Summit</p>\n</blockquote></li>\n<li><blockquote>\n<p>United Forum for Legal Studies</p>\n</blockquote></li>\n<li><blockquote>\n<p>Vidhi Parivartan</p>\n</blockquote></li>\n<li><blockquote>\n<p>Wazir Education Society</p>\n</blockquote></li>\n</ul><ul class=\"\">\n<li><p>Delivered Lectures on Different Subjects &amp; Topics Viz:</p></li>\n</ul><ul class=\"cols\">\n<li><p>Application of IT In Count Room Monitoring &amp; Forensic Evidence</p></li>\n<li><p>Appreciation of Evidence</p></li>\n<li><p>Appreciation of Evidence in Criminal Cases &amp; Role Of APP</p></li>\n<li><p>Appreciation of Evidence in Criminal Trial</p></li>\n<li><p>Capacity Building on Forensic Justice</p></li>\n<li><p>Child Custody &amp; Guardianship</p></li>\n<li><p>Computer Applications</p></li>\n<li><p>Computer Awareness</p></li>\n<li><p>Computerization in Judiciary</p></li>\n<li><p>Constitutional Challenges In 21st Century</p></li>\n<li><p>Contours of Criminal Trial in The Administration of Criminal Justice</p></li>\n<li><p>Criminal Jurisprudence and Challenges</p></li>\n<li><p>Criminal Trial</p></li>\n<li><p>Custodial Death</p></li>\n<li><p>Cyber Crimes &amp; Cyber Laws</p></li>\n<li><p>Cyber Crimes and Law of Evidence</p></li>\n<li><p>Cyber Laws, Information Technology &amp; E - Commerce</p></li>\n<li><p>Data Security</p></li>\n<li><p>Digital Signature &amp; Cryptography</p></li>\n<li><p>E-court &amp; NJDG<a class=\"footnote-ref\" href=\"#fn1\" id=\"fnref1\" role=\"doc-noteref\"><sup>1</sup></a></p></li>\n<li><p>E-justice</p></li>\n<li><p>Electronic Environment</p></li>\n<li><p>Enhancing The Excellence of Judicial Institutions: Challenges &amp; Opportunities</p></li>\n<li><p>Evolvement of ADR Towards ODR &amp; Its Forthcoming</p></li>\n<li><p>Harassment of Women and Legal Provision to Defend</p></li>\n<li><p>ICT in Courts: Modernization of Judiciary</p></li>\n<li><p>Information Technology Act, 2000</p></li>\n<li><p>Judicial Administration</p></li>\n<li><p>Law &amp; E-Governance</p></li>\n<li><p>Law of Torts</p></li>\n<li><p>Legal Framework Governing Information Technology</p></li>\n<li><p>Linux or Windows</p></li>\n<li><p>Management of Judicial Administration</p></li>\n<li><p>Court Management</p></li>\n<li><p>Case Management</p></li>\n<li><p>Case Flow Management</p></li>\n<li><p>My Experience</p></li>\n<li><p>Model Court Under The E-Court Project</p></li>\n<li><p>Negotiable Instrument Act</p></li>\n<li><p>Rights Of Child Webinar &amp; Juvenile Justice System</p></li>\n<li><p>Rules Of Pleading &amp; Amendment</p></li>\n<li><p>Plaint, Written Statement, Set Off &amp; Counter Claim</p></li>\n<li><p>Search Warrant -2022 Challenges &amp; Role of Magistrate</p></li>\n<li><p>Sec. 372 Of CrPC</p></li>\n<li><p>Security for Courts Records and Networks: Risks, Challenges &amp; Practical Considerations</p></li>\n<li><p>Speedy &amp; Fair Trial.</p></li>\n<li><p>Evidence of Statement by Person Who Cannot Be Called as A Witness</p></li>\n<li><p>Surrender By Accused</p></li>\n<li><p>Ground Water -Making Invisible Visible</p></li>\n<li><p>Tighter Legal Regime for Media and OTT Platform</p></li>\n<li><p>Training The Trainers Science-Technology Applications in Law and Administration</p></li>\n</ul><ul class=\"\">\n<li><p>Uniform Nomenclature</p></li>\n<li><p>What is a Network?</p></li>\n<li><p>Why to Join Judiciary</p></li>\n<li><p>Youth &amp; The Constitution of India</p></li>\n</ul><aside class=\"footnotes footnotes-end-of-document\" id=\"footnotes\" role=\"doc-endnotes\">\n<hr/>\n<ol>\n<li id=\"fn1\"><p>National Judicial Data Grid</p></li>\n</ol>\n</aside>";

const principles: Principle[] = [
  {
    "number": "01",
    "topic": "Formative Influences: The Foundations of a Life in Law",
    "title": "Let Science and Law Sharpen Each Other",
    "question": "Looking back at your formative years and academic journey, what experiences, influences, or realisations first drew you towards the legal profession? Was there a particular person, incident, book, or experience that shaped your understanding of justice, fairness, or the role of law in society? How did your early experiences influence the professional values you carried forward?",
    "quote": [
      "My route to the law was not entirely linear. I had initially expected to pursue science, with medicine or engineering as my likely destination. But circumstances sometimes redirect a life in ways that one neither plans nor controls. During my pre-science year, severe floods in Ahmedabad and the widespread agitation that followed disrupted academic life at the very stage when the pre-science result determined admission to medicine or engineering. My original course therefore changed, not because I had lost interest in science, but because events beyond my control intervened. I continued with science and graduated in microbiology. Thereafter, family tradition drew me towards law: my father was an established practitioner, following successive generations of lawyers in the family. What initially appeared to be an unexpected change of direction eventually became my life's profession, and I have never regretted it.",
      "My father, Shri Gunvantlal M. Shah, encouraged me to enter the legal profession. That encouragement was an important personal influence. Yet my path to law was not confined to legal studies from the beginning. I graduated in science, studying microbiology and chemistry, before obtaining my law degree in 1981 and later an LL.M. with constitutional law in 1987. Looking back, I regard these different disciplines as complementary rather than contradictory. Scientific training encourages the examination of evidence, the testing of assumptions and a willingness to revise conclusions when facts require it. Legal training gives those habits a constitutional and human purpose.",
      "I enrolled as an advocate in December 1981 and practised in civil, criminal, constitutional and revenue matters, among others. Exposure to different courts, litigants and branches of law taught me that a dispute rarely fits neatly into a single theoretical category. Behind a pleading are people, institutions, resources and consequences. The lawyer must first understand the facts, then the governing law, and finally the remedy that the law permits.",
      [
        "I would advise students that early professional influences are important but should not limit their growth. Respect your teachers and family while developing independent judgement. Asking why, checking claims and recognising what remains unproved are as essential in law as in science. A legal career rests not simply on acquiring knowledge, but on ",
        {
          "b": "learning to use knowledge"
        },
        " responsibly."
      ]
    ],
    "whatThisMeans": "He explains that his path to law was not planned: floods and agitation in Ahmedabad disrupted his pre-science year, and he graduated in microbiology before family tradition drew him to law. He regards the two disciplines as complementary rather than contradictory.",
    "whyItMatters": "Scientific training encourages examining evidence, testing assumptions and revising conclusions when facts require it; legal training gives those habits a constitutional and human purpose. He advises students to respect their teachers and family while developing independent judgement.",
    "reflect": "What habit from one field you know could make the way you work in another more careful?"
  },
  {
    "number": "02",
    "topic": "The Meaning of Justice Beyond the Letter of the Law",
    "title": "Justice Must Be Both Principled and Effective",
    "question": "In your experience, what does it truly mean to deliver justice, beyond simply interpreting and applying legal provisions? How should a judge balance the letter of the law, constitutional principles, established precedents, and the circumstances of the people whose lives may be affected by a decision? Could you share an experience or observation that deepened your understanding of the relationship between legal correctness, fairness, and justice?",
    "quote": [
      "To me, justice requires the harmonious operation of four principles:",
      "(1) timely disposal,",
      "(2) substantive justice,",
      "(3) procedural fairness and",
      "(4) careful appreciation of evidence.",
      "None can safely be treated as an alternative to the others. A speedy decision reached without adequate hearing may be an injustice; equally, a legally meticulous process that remains unresolved for years may fail those to whom it is meant to serve.",
      [
        {
          "b": "A judge does not possess a licence to replace law with personal sympathy"
        },
        ". Statutory language, constitutional guarantees and binding precedent define the judicial task. But applying them responsibly requires attention to the actual controversy, the burden of proof, the quality of the evidence and the practical effect of an order. Legal correctness and fairness should ordinarily reinforce each other. Where a hard case creates tension, reasons must show how the law was applied, not conceal the difficulty behind rhetoric."
      ],
      [
        "Numbers can assist court administration, but the real measure of judicial work is not disposal alone. It is whether parties were heard, evidence was evaluated without prejudice, relevant law was faithfully applied, and the decision was delivered within a reasonable time. ",
        {
          "b": "Justice must be both principled and effective. The judgement belongs to the law; its consequences are experienced by human beings."
        }
      ]
    ],
    "whatThisMeans": "He describes justice as the harmonious operation of four principles: timely disposal, substantive justice, procedural fairness and careful appreciation of evidence. None, he says, can safely stand in for the others.",
    "whyItMatters": "A speedy decision reached without an adequate hearing may be an injustice, and a meticulous process left unresolved for years may fail those it is meant to serve. The real measure of judicial work, he says, is not disposal alone but whether parties were heard, evidence weighed without prejudice, the law faithfully applied and the decision delivered in reasonable time.",
    "reflect": "Where do you trade speed for fairness, or fairness for speed, without noticing?"
  },
  {
    "number": "03",
    "topic": "The Human Dimension of Justice",
    "title": "Impartiality Does Not Require Indifference",
    "question": "How can those working within the legal system remain attentive to the human circumstances surrounding a matter while ensuring that decisions remain impartial and grounded in law? In your view, what is the appropriate place for empathy, careful listening, and an understanding of lived realities in the pursuit of justice? How can legal professionals avoid allowing either detachment or personal sentiment to compromise fairness?",
    "quote": [
      [
        {
          "b": "Impartiality does not require indifference."
        },
        " A judge must listen carefully enough to understand the human circumstances of a dispute while remaining disciplined enough not to allow compassion to displace proof or governing law. Empathy is valuable because it helps a decisionmaker ask the right questions; it becomes dangerous if it supplies answers unsupported by the record."
      ],
      "The court must accord dignity to every participant, including the person whose claim ultimately fails. Patience, clarity of questions, a fair opportunity to answer and a reasoned explanation of the outcome are not ornamental courtesies. They are elements of the administration of justice. An accused person, a victim, a vulnerable litigant and a public authority are all entitled to an impartial hearing according to law.",
      [
        "I recall an incident from my years in practice involving a young widow whose husband had died in a road accident. She requested confidentially that, I MUST protect her compensation from immediate cash distribution, despite pressure from relatives who had other plans for the money i.e., even though family members press for immediate payment of the compensation in cash, she wanted the amount protected and invested for the long-term livelihood of herself and her children. She even warned that she might publicly complain about the delay, while asking me to understand why she felt compelled to do so. What mattered was the long-term livelihood of her children and herself. That encounter taught me that the advocate’s duty is not exhausted by obtaining an award; it includes safeguarding the real interests of a vulnerable client, consistently with their informed instructions and the law. The experience taught me that a lawyer’s responsibility is not exhausted by obtaining a favorable award. One must try, consistently with the client’s informed instructions and the law, to ensure that the benefit of a legal remedy actually protects the person for whom it is intended. It also taught me to listen for concerns that a vulnerable client may be unable to express openly in the presence of others. The duty is to safeguard the real interests of a vulnerable client. ",
        {
          "b": "A legal professional must therefore possess not only knowledge of the law but also the sensitivity to understand what a client may be unable to say in the presence of others or sometimes due to any other reason like ignorance of rights etc."
        },
        " I have carried this lesson throughout my professional and judicial career."
      ],
      "The following examples illustrate how attention to human consequences can coexist with impartial application of law. They are drawn from my recollections and identifiable judicial records.",
      "(i) I also recall disputes involving allegedly defamatory publications, including a matter concerning reporting about Jain monks and, later, litigation involving Public Limited Company and its Chairman. Such cases illustrate the difficulty of protecting reputation while respecting freedom of expression. Interim judicial protection must be carefully tailored, legally justified and proportionate; it cannot become an automatic system of prior censorship.",
      "(ii) A reported illustration is of a husband who had voluntarily left employment and was residing in an ashram. The legal question was whether that choice could relieve him of an existing maintenance obligation to his wife. I considered that a personal spiritual commitment could not, by itself, extinguish a statutory responsibility to support a spouse. The human consequences of non-payment were relevant, but the conclusion rested on the governing law and the evidence, not on sympathy alone.",
      "(iii) Another experience from my judicial service involved a family-property dispute that had already endured for decades. I tried to facilitate an amicable settlement among members of different generations, but those efforts did not succeed. I then considered whether an interim order could address the practical deadlock rather than merely prolong it. The lesson I draw is that procedural rules are meant to advance justice, although every innovative remedy must remain within the court’s lawful jurisdiction and afford parties a fair hearing."
    ],
    "whatThisMeans": "He says a judge must listen closely enough to understand the human circumstances of a dispute, yet stay disciplined enough that compassion does not displace proof or governing law. Empathy helps a decision-maker ask the right questions; it becomes dangerous if it supplies answers the record does not support.",
    "whyItMatters": "Every participant, including the person whose claim fails, is owed dignity as part of the administration of justice. He recalls a young widow whose real concern was the long-term livelihood of her children, and draws the lesson of listening for what a vulnerable person cannot say openly.",
    "reflect": "Who in your work may be unable to say what they need in front of others, and how would you find out?"
  },
  {
    "number": "04",
    "topic": "Integrity and Ethical Courage:",
    "title": "Guard Your Credibility; Courage Is Not Loudness",
    "question": "Integrity is often discussed as a fundamental professional value, but its real significance becomes evident when a person faces difficult choices, competing expectations, or considerable pressure. During your legal career and judicial service, what principles helped you remain guided by integrity and impartiality when dealing with challenging matters? What would you say to young lawyers and professionals about maintaining their convictions when the easier course of action may not be the right one?",
    "quote": [
      "Judicial integrity is tested most seriously when the correct course is inconvenient. The oath of office is not a ceremonial formality; it is a continuing obligation to decide without fear or favour, affection or ill-will. An independent judge must be willing to reach a conclusion that is unpopular, provided it is compelled by the record and the law. Independence, however, must never be confused with personal obstinacy.",
      "Integrity also has quieter dimensions: refusing to prejudge a case, giving each side adequate hearing, acknowledging a strong argument made by the party one may ultimately rule against, and correcting one's initial impression when the evidence warrants it. Intellectual honesty requires a judge to identify the real issue rather than select only those facts that support an early view.",
      "During my years as an advocate, I also represented a complainant who, according to my recollection, exposed a serious smuggling operation involving arms and narcotics. I faced threats in connection with that work. The experience reinforced that professional courage is not an abstract virtue: counsel must act lawfully and conscientiously even when doing so is uncomfortable or personally difficult.",
      "My advice to young lawyers is to guard their credibility. Do not misstate a precedent, suppress an inconvenient document or promise a client an outcome that no conscientious professional can guarantee. A reputation for accuracy and fairness is built slowly and may be lost quickly. Courage is not loudness; it is the willingness to act according to principle when no applause is assured."
    ],
    "whatThisMeans": "He describes integrity as most seriously tested when the correct course is inconvenient. The oath is a continuing obligation to decide without fear or favour, and independence must never be confused with obstinacy. It also has quieter forms: refusing to prejudge, hearing each side, and correcting a first impression when the evidence warrants.",
    "whyItMatters": "To young lawyers he says not to misstate a precedent, suppress an inconvenient document or promise an outcome no one can guarantee, because a reputation for accuracy is built slowly and may be lost quickly. He also recalls facing threats while acting as counsel for a complainant, and says courage is acting on principle when no applause is assured.",
    "reflect": "What small act of accuracy or fairness would protect your credibility this week?"
  },
  {
    "number": "05",
    "topic": "Constitutional Values and Public Trust",
    "title": "Public Trust Is Earned, Not Demanded",
    "question": "The Constitution establishes the framework within which public institutions function and individual rights are protected. In your view, what responsibilities do judges, lawyers, public officials, and citizens share in preserving constitutional values? How can legal institutions maintain public confidence while ensuring that justice, equality before the law, and individual rights remain central to their functioning? What should the next generation understand about the relationship between constitutional principles, institutional independence, and public trust?",
    "quote": [
      "The Constitution is not merely a charter of rights asserted against public power; it also establishes the standards by which public power must be exercised. Judges, lawyers, officials and citizens have distinct responsibilities in maintaining that order. Institutional independence must be protected, but independence and accountability are not opposites. Courts earn confidence through fairness, reasoned decisions, openness to lawful scrutiny and equal treatment.",
      "I have increasingly reflected upon the relationship between Fundamental Rights and Fundamental Duties. Article 51A already articulates important civic obligations. Their presence in the Constitution should influence education, public conduct and appropriate legislation. Yet a citizen does not lose a Fundamental Right merely because someone alleges failure to perform a duty. Rights and responsibilities complement one another; they should not be made mutually destructive.",
      "An institutional example arose in proceedings before me concerning Essar Steel and the Reserve Bank of India, which raised an important question about the limits of regulatory directions in relation to an independent adjudicatory body, the National Company Law Tribunal. The RBI press release then under challenge stated that identified insolvency cases “will be accorded priority” by the National Company Law Tribunal. The Court called upon the RBI to explain that formulation; the RBI thereafter issued a corrigendum deleting the sentence and placed its regret on record. The larger principle, which remains important to me, is that no administrative or regulatory authority can advise, guide or direct a judicial or quasi-judicial authority as to the manner in which it should exercise its adjudicatory function. Administrative urgency, however significant, must operate within constitutional and institutional boundaries.",
      "Likewise, criticism of a government is not equivalent to disloyalty to the nation. Constitutional democracy protects peaceful dissent, while allowing legally justified, proportionate responses to violence and genuinely unlawful incitement. The distinction must be maintained through evidence, clear law and fair procedure. The next generation should learn that public trust cannot be demanded by authority: it must be earned through fidelity to constitutional limitations."
    ],
    "whatThisMeans": "He sees the Constitution as both a charter of rights against public power and the standard by which public power must be exercised, with judges, lawyers, officials and citizens each carrying distinct responsibilities. Independence and accountability, he says, are not opposites.",
    "whyItMatters": "Courts earn confidence through fairness, reasoned decisions, openness to lawful scrutiny and equal treatment. He holds that no regulatory authority can direct how a judicial or quasi-judicial body exercises its adjudicatory function, that rights and duties complement one another, and that criticism of a government is not disloyalty to the nation.",
    "reflect": "What would it take for an institution you belong to to earn trust rather than ask for it?"
  },
  {
    "number": "06",
    "topic": "Judicial Reasoning and Difficult Dilemmas",
    "title": "Resist the Immediate Answer",
    "question": "Judicial work can involve complex questions in which legal principles, competing arguments, and the consequences of a decision must all be considered carefully. How does a judge approach such dilemmas while remaining impartial and faithful to the law? What role do patience, independent reasoning, careful listening, and intellectual humility play in reaching a considered decision? Without referring to confidential matters or discussing anything inappropriate to disclose, could you share an experience or general lesson that illustrates the importance of thoughtful judicial decision-making?",
    "quote": [
      "The first responsibility in a difficult case is to resist the temptation of an immediate answer. Identify the precise questions requiring determination, separate admitted facts from disputed facts, understand the competing legal submissions and examine the evidence relevant to each issue. A judge must be prepared to discover that an initially persuasive argument becomes weaker on closer scrutiny.",
      "Careful listening is an active intellectual exercise. One must understand not only what counsel says but also the strongest lawful version of the opposing position. Binding precedent requires fidelity, while genuinely distinguishable facts demand explanation. Where discretion exists, the reasons should demonstrate that it was exercised for legitimate purposes and within statutory limits.",
      [
        "My experience across civil and criminal adjudication reinforces the importance of the burden and standard of proof. Suspicion, however compelling, cannot automatically substitute for legally sufficient evidence. Conversely, procedural rules should be applied to secure fairness, not as empty rituals. Judicial humility lies in recognising the limits of the record and one's own knowledge. ",
        {
          "b": "The best judgement is not necessarily the longest; it is one that resolves the real issues accurately, transparently and in time."
        }
      ]
    ],
    "whatThisMeans": "He says the first responsibility in a difficult case is to resist an immediate answer: identify the precise questions, separate admitted facts from disputed ones, understand the competing submissions, and be ready to find that a persuasive argument weakens on closer scrutiny.",
    "whyItMatters": "Careful listening is an active exercise that requires understanding the strongest lawful version of the opposing position. Suspicion cannot replace sufficient evidence, and procedure should secure fairness rather than serve as ritual. The best judgement, he says, is not the longest but the one that resolves the real issues accurately, transparently and in time.",
    "reflect": "Before your next decision, can you state the strongest version of the view you are about to reject?"
  },
  {
    "number": "07",
    "topic": "Independence of Thought and Intellectual Courage",
    "title": "Changing Your View After Better Evidence Is Discipline",
    "question": "How can legal professionals develop the intellectual independence to examine arguments fairly, including those that challenge their own initial understanding or prevailing professional opinion? What helps a person distinguish reasoned conviction from assumption, and principled independence from resistance to reconsidering one's views? What habits of thought would you encourage young lawyers and future leaders to cultivate?",
    "quote": [
      "Independent thought begins with the ability to distinguish an assertion from its proof. A professional should be able to ask whether a proposition is supported by the statute, the binding judgement, the complete document or merely by repeated opinion. The fact that a proposition is fashionable, frequently quoted or advanced by an eminent person does not exempt it from examination.",
      [
        "There is an important difference between conviction and rigidity. A reasoned conviction survives serious questioning because it has been tested. Rigidity refuses to listen. ",
        {
          "b": "The capacity to change one's view after examining better evidence is not weakness; it is a mark of intellectual discipline"
        },
        ". This is particularly important in judicial work, where an unexamined assumption can affect liberty, property and reputation."
      ],
      "I would encourage students to read beyond headnotes, verify citations, examine the factual setting of precedents and cultivate both scientific temper and constitutional sensitivity. Respectful disagreement is a professional strength. The objective is neither conformity nor contrarianism, but a conclusion one can defend by evidence and reasons."
    ],
    "whatThisMeans": "He separates an assertion from its proof: that a proposition is fashionable, frequently quoted or advanced by an eminent person does not exempt it from examination. A reasoned conviction survives serious questioning because it has been tested; rigidity refuses to listen.",
    "whyItMatters": "An unexamined assumption, he notes, can affect liberty, property and reputation. He encourages students to read beyond headnotes, verify citations, examine the facts behind precedents, and reach conclusions they can defend by evidence and reasons, neither conformity nor contrarianism.",
    "reflect": "Which belief of yours have you never checked against its source?"
  },
  {
    "number": "08",
    "topic": "Law and a Changing Society",
    "title": "Modernisation Is More Than Buying Hardware",
    "question": "Society, technology, and public expectations continue to evolve, while legal systems must preserve consistency, fairness, and constitutional principles. How should the law respond to changing social realities without losing sight of its fundamental purpose? What should legal professionals understand about the relationship between legal interpretation, social change, and the protection of individual rights?",
    "quote": [
      "Law must respond to social and technological change without losing its constitutional character. I adopted computer technology in legal practice at an early stage and later participated in the effort to modernise judicial institutions. That experience convinced me that modernisation is not simply the purchase of hardware. It involves rethinking processes, building institutional capacity, training people, protecting records and ensuring that the benefits reach litigants.",
      "New tools can reduce avoidable delays, improve access to case information and make administration more transparent. Yet a technologically advanced system can still be unjust if it excludes people who lack resources or digital literacy. Every innovation must therefore be evaluated by its actual effect on accessibility, reliability, privacy and fairness.",
      "Interpretation must remain anchored in constitutional text, legitimate statutory purpose and precedent. Social change is not an excuse for judges to legislate from the bench; nor is fidelity to law an excuse to ignore the new factual conditions in which existing principles operate. Our task is to preserve enduring values while improving the means through which they are realised."
    ],
    "whatThisMeans": "Having adopted computers in legal practice early and later worked on modernising judicial institutions, he says modernisation means rethinking processes, building capacity, training people and protecting records so that the benefits reach litigants.",
    "whyItMatters": "New tools can reduce avoidable delay and improve transparency, but a technologically advanced system can still be unjust if it excludes people who lack resources or digital literacy. Interpretation must stay anchored in constitutional text, legitimate statutory purpose and precedent; social change is not an excuse to legislate from the bench.",
    "reflect": "Who might be left out by the next tool or process you introduce?"
  },
  {
    "number": "09",
    "topic": "Leadership and Institutional Responsibility",
    "title": "Build Systems That Outlast Your Credit",
    "question": "A position of authority carries responsibilities that extend beyond individual performance. It also influences the culture, standards, and conduct of the institution in which a person serves. What does responsible leadership mean to you, particularly within the judiciary and other public institutions? How can people in positions of authority encourage professionalism, accountability, ethical conduct, and respect for differing viewpoints? What have you learnt about the relationship between authority and responsibility?",
    "quote": [
      "Leadership in the judiciary is a responsibility to improve the institution, not merely to exercise authority within it.",
      "My engagement with judicial technology began well before computerization became routine. I adopted computer technology in legal practice at an early stage and later worked on computerization within judicial institutions, including through the e-Court initiative.",
      "My involvement in the development of the e-Court concept, model courts and wider computerisation of Indian courts taught me that lasting change requires a clear vision joined to patient implementation. It involves infrastructure, workflow, training, coordination and sustained attention to the people who must use the system every day.",
      "That experience taught me that institutional leadership often requires investing in systems whose full benefits will be realized only after the person who initiated them has moved on. Sustainable reform depends upon processes, training, and institutional ownership, not upon individual credit.",
      "My ambition was broader than placing computers on judges' desks. It was to contribute to digitising the Indian judiciary, improving access to justice and preparing our courts to engage confidently with developments across the world. Such a project succeeds only when technological design is informed by the actual needs of judicial officers, staff, lawyers and litigants.",
      "Responsible leaders should welcome informed disagreement and encourage colleagues to identify defects before they become systemic failures. Authority should create conditions in which others can perform better. The value of an institutional initiative is ultimately measured not by who receives credit for it, but by whether it continues to serve the public after its original advocates have moved on."
    ],
    "whatThisMeans": "He describes leadership in the judiciary as a responsibility to improve the institution, not merely to exercise authority within it, drawing on his work on the e-Court concept, model courts and wider computerisation of Indian courts.",
    "whyItMatters": "Lasting change, he says, needs a clear vision joined to patient implementation: infrastructure, workflow, training and attention to the people who use the system every day. Leaders often invest in systems whose benefits arrive after they have moved on, and should welcome informed disagreement. An initiative is measured by whether it keeps serving the public.",
    "reflect": "What are you building now whose full benefit you may never be credited for?"
  },
  {
    "number": "10",
    "topic": "Continuous Learning and Mentorship",
    "title": "Mentorship Should Not Produce Imitation",
    "question": "How has your understanding of law, justice, and society evolved over the course of your career? What habits or approaches have helped you continue learning and reassessing your understanding of complex issues? For law students and young advocates entering an increasingly complex professional environment, what skills, attitudes, and ethical commitments should they develop beyond formal legal education? How can experienced professionals help young people develop independent judgement rather than merely follow established practices?",
    "quote": [
      "I have never considered legal education complete upon obtaining a degree, entering practice or assuming judicial office. Law develops, evidence changes form, technology transforms professional methods and society presents new problems. My own journey from science to advocacy, adjudication, court computerisation and judicial education has reinforced the need for continuing study.",
      "After retirement from the High Court, I have continued contributing to the education of aspiring judicial officers and to professional discussions on evidence, court management, technology and constitutional questions. Teaching is itself a form of learning: an intelligent question from a student can expose an assumption that an experienced professional has ceased to examine.",
      "Mentorship should not produce imitation. I would prefer a young lawyer or future judge who respectfully questions my reasoning to one who merely repeats my conclusion. Learn to identify issues, read the original authority, analyse documents, write clearly and acknowledge uncertainty. Professional excellence also requires punctuality, preparation, courtesy and ethical restraint. Knowledge becomes meaningful when it strengthens another person's capacity for independent judgement."
    ],
    "whatThisMeans": "He treats legal education as never complete: law, evidence and technology keep changing, and his own path from science to advocacy, adjudication, court computerisation and teaching has reinforced the need to keep studying.",
    "whyItMatters": "Teaching is itself learning, he says, since a student's question can expose an assumption an experienced professional has stopped examining. He would prefer a young lawyer who respectfully questions his reasoning to one who repeats his conclusion, and he lists reading original authority, clear writing, punctuality, preparation and ethical restraint as part of excellence.",
    "reflect": "Whom are you helping to think independently rather than to agree with you?"
  },
  {
    "number": "11",
    "topic": "The Future of Law and Access to Justice",
    "title": "A Judicial Decision Cannot Be Delegated to a System",
    "question": "Technology, including artificial intelligence, is changing how information is accessed, analysed, and used in professional settings. What opportunities and challenges do you foresee for the legal profession and the administration of justice as these tools become more widespread? How can innovation improve access to legal information and services while safeguarding confidentiality, accountability, fairness, and human judgement? What should future legal professionals be prepared to understand or question as these changes unfold?",
    "quote": [
      "My interest in technology began long before artificial intelligence became a common subject of public debate. Early computerisation of legal practice and subsequent work on e-Courts convinced me that technology can transform the accessibility and management of justice. More recently, my work as a domain expert on AI-related judicial development for the National Judicial Council of Nigeria, and participation as faculty in the Commonwealth Judicial Educators meeting at the Supreme Court of India in February 2026, have given this question a further practical dimension.",
      [
        "Artificial intelligence may assist with legal research, document organisation, translation, case-flow analysis and drafting support. But it can also produce fabricated citations, inaccurate summaries, hidden bias and serious confidentiality risks",
        {
          "b": ". A judicial decision cannot be delegated to a system that cannot bear constitutional responsibility for it."
        },
        " Human verification, transparent governance, secure handling of records and clear accountability must remain indispensable."
      ],
      "At the 11th Biennial Meeting of Commonwealth Judicial Educators held at the Supreme Court of India in February 2026, I participated as faculty in the session on “Artificial Intelligence: Leadership Imperatives and Challenges.” That engagement reinforced my view that the judicial conversation about AI must move beyond whether the technology is useful. The more important questions concern governance: who verifies its output, how confidential material is protected, how bias and error are identified, and who remains accountable for the final judicial act.",
      "The challenge is not to choose between technology and judicial independence. It is to design technology that strengthens judicial independence, efficiency and access without weakening human judgement. Future professionals must learn not only how to use new systems, but when to distrust an output, how to verify it and how to explain the final decision in their own legally accountable reasoning."
    ],
    "whatThisMeans": "He sees real uses for artificial intelligence in legal research, document organisation, translation, case-flow analysis and drafting support, but also risks: fabricated citations, inaccurate summaries, hidden bias and confidentiality breaches.",
    "whyItMatters": "A decision cannot be handed to a system that cannot bear constitutional responsibility for it. Human verification, transparent governance, secure records and clear accountability must remain indispensable, and future professionals must learn when to distrust an output, how to verify it and how to explain a decision in their own accountable reasoning.",
    "reflect": "Where do you rely today on an automated output you cannot verify yourself?"
  },
  {
    "number": "12",
    "topic": "Enduring Principles and the Meaning of Contribution",
    "title": "A Meaningful Life Is Measured by Value Added and Principles Kept",
    "question": "When you look back on your journey, what fundamental principles have remained constant in your personal and professional life? If you were to share a few enduring lessons with students, young lawyers, future judges, and individuals who wish to contribute meaningfully to society, what would you want them to understand about justice, integrity, responsibility, and the use of knowledge? How would you define a life of meaningful contribution beyond professional recognition, positions held, or achievements accumulated? Is there a principle, experience, or reflection that has guided you throughout your life and that you believe the next generation should carry forward?",
    "quote": [
      "If I were to identify enduring principles, I would place integrity, disciplined reasoning, fairness, continuous learning and responsibility towards society at their centre. Professional status is temporary; the effect of one's conduct on institutions and people may endure much longer. A lawyer's argument, a judge's decision, a teacher's guidance or an institutional reform can influence lives far beyond the moment in which it occurs.",
      "My work in the legal profession, on the bench, in judicial technology and in education has persuaded me that knowledge carries an obligation to serve. One should not be satisfied merely with personal expertise. The greater question is whether that expertise makes justice more accessible, institutions more trustworthy and the next generation more capable.",
      "One principle has remained especially constant for me: hard and sincere work. I have had little tolerance for avoidable lethargy or lack of preparation in my own work. As an advocate, if I concluded that a client had no sustainable case, I believed it was my duty to say so rather than create false hope. That professional honesty was also part of my family tradition; I learnt that fees and success can never be more important than candour with the person who has placed trust in you. Industry without integrity is insufficient, but integrity without the discipline to do the work is equally incomplete.",
      [
        "I would ask young people to protect their independence of mind while remaining open to correction; to be ambitious without sacrificing integrity; and to remember that rights and responsibilities belong within the same constitutional culture. We must strive for a system that is both efficient and humane, technologically capable and constitutionally restrained. ",
        {
          "b": "A meaningful life is not measured only by the positions one has held, but by the value one has added and the principles one has refused to abandon."
        }
      ]
    ],
    "whatThisMeans": "He names integrity, disciplined reasoning, fairness, continuous learning and responsibility towards society as the principles that have stayed constant, and says knowledge carries an obligation to serve.",
    "whyItMatters": "Professional status is temporary, but the effect of one's conduct on institutions and people may endure much longer. He singles out hard and sincere work together with professional honesty, including telling a client plainly when there is no sustainable case, and asks young people to protect their independence of mind while remaining open to correction.",
    "reflect": "Which principle would you refuse to abandon, and what does keeping it cost you?"
  }
];

function ShareLinks() {
  const u = encodeURIComponent(URL);
  const t = encodeURIComponent(TITLE);
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${t}&url=${u}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  ];
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Share this page">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${l.label} (opens in a new tab)`}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm hover:border-neutral-900"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    url: URL,
    image: IMAGE,
    about: { "@type": "Person", name: "Justice Subodh G. Shah", jobTitle: "Former Judge, High Court of Gujarat" },
    publisher: { "@type": "Organization", name: "Stated", url: "https://app.stated.in" },
  };

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 text-neutral-800">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <p className="text-sm">
        <Link href="/principles" className="text-neutral-500 hover:text-neutral-900">
          &larr; All Stated Principles
        </Link>
      </p>

      <header className="mt-8">
        <p className="text-sm uppercase tracking-widest text-neutral-400">Stated Principles Series</p>
        <h1 className="mt-3 text-4xl font-serif leading-tight">{TITLE}</h1>
        <div className="mt-6 flex items-center gap-5">
          <Image
            src="/subodh-shah-portrait.jpg"
            alt="Justice Subodh G. Shah"
            width={560}
            height={560}
            priority
            className="h-28 w-28 shrink-0 rounded-full border border-neutral-200 object-cover"
          />
          <div>
            <p className="font-semibold text-neutral-900">Justice Subodh G. Shah</p>
            <p className="text-neutral-600">Former Judge, High Court of Gujarat</p>
          </div>
        </div>
        <p className="mt-6 leading-relaxed text-neutral-700">{DESCRIPTION}</p>
        <p className="mt-2 text-sm text-neutral-500">50 People • 50 Perspectives • 50 Principles</p>
        <div className="mt-6"><ShareLinks /></div>
      </header>

      <section aria-labelledby="bio" className="mt-12 border-t border-neutral-200 pt-10">
        <h2 id="bio" className="text-2xl font-serif">Biography</h2>
        <p className="mt-3 font-semibold text-neutral-900">Mr. Justice S. G. Shah</p>
        <p className="text-neutral-700">(Justice Subodhkumar Gunvantlal Shah)</p>
        <p className="mt-1 font-semibold text-neutral-900">Former Judge of High Court of Gujarat</p>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          {FACTS.map((f) => (
            <div key={f.label} className="rounded-md border border-neutral-200 px-4 py-3">
              <dt className="text-xs uppercase tracking-wide text-neutral-400">{f.label}</dt>
              <dd className="mt-1 font-semibold text-neutral-900">{f.value}</dd>
            </div>
          ))}
        </dl>
        <details className="mt-6 rounded-md border border-neutral-200 px-4 py-3">
          <summary className="cursor-pointer py-1 text-sm font-semibold text-neutral-900">
            Full Profile: education, career, lectures
          </summary>
          <div
            className="mt-4 text-[0.95rem] leading-relaxed text-neutral-700 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1 [&_li>p]:inline [&_p]:my-2 [&_blockquote]:m-0 [&_strong]:text-neutral-900 [&_aside]:mt-4 [&_aside]:border-t [&_aside]:border-neutral-200 [&_aside]:pt-2 [&_aside]:text-sm [&_aside]:text-neutral-500 [&_hr]:hidden"
            dangerouslySetInnerHTML={{ __html: PROFILE_HTML }}
          />
        </details>
      </section>

      <section aria-labelledby="reflections" className="mt-12">
        <h2 id="reflections" className="text-2xl font-serif">Twelve principles, in his own words</h2>
        <ol className="mt-5 divide-y divide-neutral-200 border-y border-neutral-200">
          {principles.map((p) => (
            <li key={p.number}>
              <a href={`#principle-${p.number}`} className="flex gap-4 py-3 text-neutral-800 hover:text-neutral-900">
                <span className="w-6 shrink-0 text-sm text-neutral-400">{p.number}</span>
                <span>{p.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-12 space-y-16">
        {principles.map((p, i) => (
          <PrincipleCard key={p.number} p={p} showCta={i === principles.length - 1} />
        ))}
      </div>

      <footer className="mt-16 border-t border-neutral-200 pt-8">
        <p className="text-sm text-neutral-500">Share these principles</p>
        <div className="mt-3"><ShareLinks /></div>
        <p className="mt-8 text-sm">
          <Link href="/principles" className="text-neutral-500 hover:text-neutral-900">
            &larr; All Stated Principles
          </Link>
        </p>
      </footer>
    </main>
  );
}
