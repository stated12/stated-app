import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "maj-gen-ak-bardalai";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Maj Gen (Dr) A.K. Bardalai — Stand By the Truth, No Matter How Bitter It Is";
const DESCRIPTION =
  "Trust is not given upfront; it is earned through credibility, and credibility comes only with proof. Twenty principles from decades of military command, UN peacekeeping, and research.";
const IMAGE = "https://app.stated.in/bardalai-portrait.jpg";

export const metadata: Metadata = {
  title: `${TITLE} | Stated Principles`,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Stated",
    type: "article",
    images: [{ url: IMAGE, width: 242, height: 242, alt: "Maj Gen (Dr) A.K. Bardalai" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
};

const principles = [
  {
    number: "01",
    title: "There Is a Trust Deficit, and More Leaders Are Self-Serving",
    quote: [
      "Trust in leadership is fundamental. I had complete faith in my leader and felt secure under their command, much like a child's trust in its parents. Leaders were always ready to sacrifice their career for the sake of the men they led.",
      "There is a trust deficit, and more leaders are self-serving.",
    ],
    whatThisMeans:
      "Asked what belief about leadership he held early in his career but no longer holds, he answers with a comparison many people would hesitate to make in public: the trust he once placed in his leaders was like a child's trust in a parent, complete and unquestioning.",
    whyItMatters:
      "He doesn't soften the contrast with what he sees now. Naming a trust deficit and self-serving leadership directly, without qualification, is itself an act of the honesty he returns to throughout this feature.",
    reflect:
      "Has your own trust in the people who lead you, at work or elsewhere, grown or eroded over the years, and what changed it?",
  },
  {
    number: "02",
    title: "Trust Is Not Given Upfront. It Is Earned Through Credibility",
    quote: [
      "You get the authority to command from your rank. But to lead men to war, you need something more than rank, you need trust. Trust is not given upfront; it is earned through credibility, and credibility comes only with proof.",
    ],
    whatThisMeans:
      "He draws a hard line between the authority rank confers and the trust leadership actually requires. One is granted the moment you're commissioned. The other has to be proven, repeatedly, before it exists at all.",
    whyItMatters:
      "\"Credibility comes only with proof\" is a compact formula that recurs throughout this feature in different forms, later applied to peacekeeping missions and local legitimacy just as much as to individual command.",
    reflect:
      "Where in your own role are you currently relying on the authority of your position, rather than on credibility you've actually proven?",
  },
  {
    number: "03",
    title: "There Is Nowhere to Hide From Your Own Men",
    quote: [
      "The moment your honesty and integrity are called into question, you realise your life is transparent; there is nowhere to hide from your own men. First-time young leaders experience this when they command troops. He or she is being watched constantly.",
    ],
    whatThisMeans:
      "He locates a specific moment every young leader eventually hits, not a gradual realization, but a sudden one, when integrity is questioned and the leader discovers there was never any real privacy to begin with.",
    whyItMatters:
      "Being \"watched constantly\" is presented here not as pressure to perform, but as a structural fact of leadership: the people you lead are always forming a judgement about your honesty, whether or not you're aware of it.",
    reflect:
      "If the people you lead were asked right now whether your private conduct matches your public standard, what would they say?",
  },
  {
    number: "04",
    title: "I Regret the Decisions I Took With Complete Information",
    quote: [
      "All of us have moments in our lives when we must make difficult decisions. When we make such decisions with incomplete information, we often regret them later. I was fortunate not to have had to make difficult decisions with incomplete information. I, however, regret a few incidents where I had taken harsh decisions even though I had complete information. I wish I hadn't had to do that.",
    ],
    whatThisMeans:
      "Asked about a difficult decision made with incomplete information, he redirects to something more uncomfortable: his real regrets came from decisions made with complete information, where the facts were clear and the harshness was still his own choice.",
    whyItMatters:
      "This is a harder admission than the question actually asked for. Regretting a decision made blind is common; regretting one made with full clarity leaves no excuse of missing information to hide behind.",
    reflect:
      "Is there a decision you've made with complete information, not incomplete, that you still regret, and have you been honest with yourself about why you made it anyway?",
  },
  {
    number: "05",
    title: "The Three Cardinal Principles Are Not as Simple as They Seem",
    quote: [
      "Peacekeeping (also referred to as peace operations) always requires restraint. Adherence to the three cardinal principles of peacekeeping, i.e., consent, impartiality, and minimum use of force, is a must for success in peacekeeping.",
      "Well, these are not as simple as they seem. Ambiguity in how these principles are interpreted directly affects peacekeeping performance. It is difficult to explain the inconsistency in a few words. I thought it would be helpful if readers could find time to read about it.",
    ],
    linkLabel: "Read his fuller explanation of this ambiguity",
    linkUrl: "https://acrobat.adobe.com/id/urn:aaid:sc:AP:cc3e1ba3-a68a-455c-849a-6bfb26a5b400",
    whatThisMeans:
      "He corrects the framing of the question itself before answering it: restraint isn't the occasional requirement of peacekeeping; it's the constant one. But he's equally clear that the three cardinal principles meant to guide that restraint, consent, impartiality, minimum force, are interpreted inconsistently in practice, with real consequences for how missions perform.",
    whyItMatters:
      "Rather than compress a genuinely complex institutional problem into a soundbite, he points directly to his own published writing on it, treating the reader as capable of engaging with the real complexity rather than a simplified version of it.",
    reflect:
      "Where in your own field do you rely on a set of principles that sound simple in a handbook but turn out to be inconsistently applied in practice?",
  },
  {
    number: "06",
    title: "The UN Is What Member States Make of It",
    quote: [
      "There is no short answer. The UN, created to replace the League of Nations, is what member states make of it. The League failed to prevent World War II, and President Roosevelt and Prime Minister Churchill conceived the idea of a replacement in 1941. However, Western Supremacy, the core idea underpinning the structural frameworks of the League of Nations and the UN, largely inherited the West's colonial-era system of global management conceptualised at the Berlin Conference of 1884. This legacy heavily influenced the drafting of the Covenant of the League of Nations in 1919 and thereafter the UN.",
      "The framework for the new World Order, led by the UN, was based on dualism, because the architects sought to pursue peace while maintaining their geopolitical manoeuvres. The main reasons that can be cited are: the five permanent members of the UNSC drive its effectiveness, or lack thereof, by exercising the rights given to them in the UN Charter; the UN system remains hostage to the member state, or states, that control the purse strings; since there is no peacekeeping force directly under the command of the UN, operationalisation of peace operations is hostage to the whims and fancies of the member states; most UN policies and guidelines are driven by selected research institutes funded by western nations and expected to be implemented by the Troop Contributing Countries, who have little say in their formulation; and powerful states often obstruct the creation of a favourable political environment for managing conflicts, which is why many UN Security Council resolutions remain unimplemented.",
      "While powerful nations decide where and when peacekeeping operations are deployed, operationalisation is left to member states of the Global South, who field their soldiers in the most complex missions. The challenges to the operationalisation of peacekeeping are largely limited to systemic problems. Yet, since there is no alternative to the UN, the member states make every effort to contribute to the return of peace in the conflict zones. Despite these limitations, evidence shows peacekeeping missions effectively reduce bloodshed and prevent the spread of conflict wherever they are deployed.",
    ],
    whatThisMeans:
      "He traces the UN's structural limitations back to their historical origin, the same colonial-era system of global management conceptualised at the 1884 Berlin Conference that shaped the League of Nations before it. In his account, today's Security Council dynamics aren't a recent flaw; they're an inherited one.",
    whyItMatters:
      "He closes on a genuinely difficult balance: the system is structurally uneven, with the Global South fielding soldiers in the most complex missions while decisions are made elsewhere, and yet the evidence still shows peacekeeping reduces bloodshed. He holds both facts at once rather than resolving them into a simpler verdict.",
    reflect:
      "Where in your own field do you work within a system you can name real structural flaws in, while still believing the work it makes possible is worth doing?",
  },
  {
    number: "07",
    title: "Humility Is a Powerful Advantage, When Practised Collectively",
    quote: [
      "The challenge you mention is interoperability. The UN and its Member States have made steady progress on this front, with mission training playing a central role. The harder task, however, is winning acceptance from local populations. In conflict settings, civilians suffer most, so protection of civilians has become the key metric of a successful peacekeeping mission.",
      "The UN Protection of Civilians approach rests on three concurrently applied pillars: protection through dialogue and engagement, provision of physical protection, and creation of a protective environment. The effectiveness of this approach hinges on trust between peacekeepers and the community. Trust is not automatic; it must be earned through consistent mandate implementation and adherence to UN norms. Humility supports trust-building and is especially valuable when force is required to protect civilians at immediate risk.",
      "Indian peacekeepers are widely regarded as humane and culturally sensitive. Their humility reflects both cultural norms and operational experience, especially from counter-insurgency deployments where respectful engagement with civilians is essential. Over time, humility has become ingrained in the behaviour and professional culture of Indian soldiers, and their conduct in the field is often cited as a distinctive operational asset.",
      "When practised collectively, humility is a powerful advantage. For it to matter, humility must be authentic and demonstrated directly by personnel engaging communities, not delegated solely to specialist teams. Member States that do not share this cultural inclination can and should cultivate the habit through training and changes in engagement practices. Troop-contributing countries from developed states could benefit by adopting this approach, learning from Indian and Southeast Asian peacekeepers to strengthen their own contributions to peacekeeping.",
      "Humility and gratitude are two cultural values that must be embraced not only at the international level but also in our daily lives.",
    ],
    whatThisMeans:
      "The biggest challenge in getting different militaries to function as one team, in his account, isn't interoperability between forces, that's steady, trainable progress. It's winning acceptance from the civilians the mission is meant to protect. Humility is the specific quality he identifies as what makes that acceptance possible.",
    whyItMatters:
      "He's careful to specify that humility only matters if it's authentic and practised directly by personnel on the ground, not delegated to specialist teams. That distinction is what separates a genuine operational asset from a policy that looks good on paper.",
    reflect:
      "Is there a value you claim as part of your own professional culture that's genuinely practised by everyone day to day, or mostly delegated to a specialist team while the rest carry on differently?",
  },
];

const principlesPart2 = [
  {
    number: "08",
    title: "Leaders Must Aim to Create Conditions That Lead Toward Negative Peace",
    quote: [
      "As rightly said, success cannot be measured by victory in peacekeeping, because there is no standard framework to judge whether a mission has been able to prevent violence, protect people and create conditions for peace.",
      "Absolute peace is difficult. Norwegian sociologist Johan Galtung defined 'positive peace' as the active presence of social justice, equality and cooperation, while 'negative peace' is the mere absence of direct physical violence or war. Positive peace is nearly impossible to achieve, or is rarely present in any country. Therefore, leaders must aim to create conditions that lead toward negative peace.",
      "In this regard, I will go with the indicators formulated by Walter, Howard, and Fortna, reducing and preventing violence from recurrence, containing its spread within and across borders, reducing civilian and military deaths, and making post-conflict settlement easier, as the measure of effectiveness for the return of peace to the conflict zone.",
    ],
    linkLabel: "Walter, Howard & Fortna, cited by Gen Bardalai",
    linkUrl: "https://doi.org/10.1017/S000712342000023X",
    whatThisMeans:
      "He deliberately sets a lower, more honest bar for success than the question implies. Rather than measuring peacekeeping against an almost unreachable ideal, positive peace, he defines success as measurable progress toward negative peace: fewer deaths, less spread, easier settlement.",
    whyItMatters:
      "Grounding his answer in a named academic framework, Galtung's distinction and a specific set of measurable indicators, rather than a personal impression, reflects the researcher's discipline he brought to a question most people would answer only in the abstract.",
    reflect:
      "In your own work, are you quietly holding yourself to an impossible standard of success, when a more honest, measurable one would actually let you recognize real progress?",
  },
  {
    number: "09",
    title: "When Peacekeepers Fail, They Are No Longer Seen as Impartial",
    quote: [
      "When deployed, peacekeepers are seen as angels of peace. Civilians expect peacekeepers not only to protect them from danger but also to serve as the first point of contact for all the challenges facing a conflict-affected state as it recovers. The reality, however, is quite different. A peacekeeper's ability to meet these expectations is constrained by how the organisation empowers them, including its mandate, the number of peacekeepers authorised and deployed, and budgetary support to sustain the mission.",
      "And when peacekeepers fail, they are no longer perceived as impartial brokers of peace. Since peacekeeping has evolved significantly over the years, it must be continuously reviewed and reformed, including through organisational changes, to remain effective. Besides, unless the root cause of the problem is addressed, conflict will continue, and civilians will continue to suffer. Peacekeeping missions don't address the root cause of the conflict.",
    ],
    whatThisMeans:
      "He names the gap between how peacekeepers are perceived on arrival, as \"angels of peace\" expected to solve everything, and what they're actually resourced to do, constrained by mandate, troop numbers, and budget they don't control.",
    whyItMatters:
      "His closing line, that peacekeeping missions don't address the root cause of conflict, is a genuinely uncomfortable truth for someone who spent a career inside the institution to state plainly, without hedging it into something softer.",
    reflect:
      "Is there a role you or your institution plays where the expectations placed on you exceed what you're actually resourced to deliver, and has that gap been named honestly?",
  },
  {
    number: "10",
    title: "Peacekeepers Also Fail Because of a Lack of Will",
    quote: [
      "As I mentioned earlier, protecting civilians is by far the most difficult challenge, especially when peacekeepers hesitate to use force to protect civilians who are in danger, even when they are legally authorised. While there are instances of peacekeepers not using force to protect civilians, citing various reasons, there are also examples of peacekeepers going the extra mile to protect civilians, putting their personal safety in the line of fire.",
      "The answer to why peacekeepers fail is not simple. Limitations beyond the peacekeepers' control exist. However, peacekeepers also do fail because of a lack of will.",
    ],
    linkLabel: "Read his fuller article on this question",
    linkUrl: "https://acrobat.adobe.com/id/urn:aaid:sc:AP:235b7107-d4a6-404e-b2c2-0940fa75abef",
    whatThisMeans:
      "He holds two explanations for peacekeeper failure at once, without letting either one excuse the other: real structural limitations beyond their control, and, separately, a lack of will that structural limitations don't fully explain.",
    whyItMatters:
      "Naming \"lack of will\" as a real factor, alongside systemic constraints, is a harder thing to say about your own profession than attributing every failure to circumstances beyond anyone's control.",
    reflect:
      "In a situation where you or your team fell short, how much of that was genuinely beyond your control, and how much, if you're honest, was a lack of will?",
  },
  {
    number: "11",
    title: "Credibility Is Not Available Upfront. It Must Be Earned",
    quote: [
      "Consent, impartiality, and the minimum use of force are three cardinal principles of peacekeeping, and adherence to them helps achieve success. Another crucial factor is legitimacy. When arriving in the conflict zone, peacekeepers, including the organisation, are expected to adhere to certain norms, which are not exhaustive. A mission gains legitimacy when the parties to the conflict agree to the deployment of the peacekeeping mission through a peace agreement, and the UN Security Council authorises it.",
      "However, strategic-level legitimacy differs from local legitimacy. Local legitimacy is about credibility. Credibility is not available upfront. It must be earned by presenting daily evidence and implementing the mandate. Once the mission and the peacekeepers gain local legitimacy, they gain cooperation and better acceptance in local society. Civilians then make a conscious effort to differentiate, within the constraints, between what is possible for the peacekeepers to do and what is not. Then they come forward willingly to help the peacekeepers implement the mandate despite the organisational constraints and the dynamics of the conflict.",
    ],
    whatThisMeans:
      "He splits legitimacy into two distinct kinds that don't automatically transfer to each other: strategic-level legitimacy, granted on paper through a peace agreement and Security Council authorisation, and local legitimacy, which is credibility, earned daily on the ground.",
    whyItMatters:
      "The same principle from Principle 2, that trust and credibility come only through proof, reappears here at the institutional level. Authorization from above doesn't buy acceptance from the people a mission is meant to serve.",
    reflect:
      "Is there somewhere you hold formal authority or approval on paper, that hasn't yet translated into actual credibility with the people you're meant to serve?",
  },
  {
    number: "12",
    title: "The One-Line Answer Is: Humility",
    quote: [
      "The one-line answer is: Humility.",
    ],
    whatThisMeans:
      "Asked what the world can learn from India's contribution to UN peacekeeping, and what India can learn from others, he answers with a single word rather than an elaborated argument, having already built the case for it fully in Principle 7.",
    whyItMatters:
      "The brevity is itself the point. After a detailed explanation earlier of why humility functions as an operational asset, he trusts the reader to carry that reasoning forward rather than repeating it.",
    reflect:
      "If you had to reduce what your own field or culture does best to one word, would it hold up as well under scrutiny as his does?",
  },
];

const principlesPart3 = [
  {
    number: "13",
    title: "Have I Introduced Something New, or Am I Merely Repeating Existing Theories?",
    quote: [
      "We need a mirror to show us what we lack. Only when we learn to accept our weaknesses does scope for improvement emerge. Research provides a perspective beyond our own, enabling us to draw logical conclusions based on available inputs.",
      "Another lesson I have learned from research is the importance of contributing something new to the research community, whether in terms of content or methodology. When Prof. Dr. S.J. Soeters, who was my supervisor for my doctoral thesis, asked me this question, it took me a few days to find the answer. For instance, while addressing questions on leadership in this forum, I must ask myself: have I introduced something new, or am I merely repeating existing theories?",
    ],
    whatThisMeans:
      "He credits research with something command couldn't give him: a genuine outside perspective on his own experience, one that only becomes useful once he's willing to accept what it reveals about his own weaknesses.",
    whyItMatters:
      "Turning his supervisor's question back on this very interview, asking himself in real time whether he's saying something new or just repeating existing theories, is a small but telling demonstration of the discipline he's describing, applied to the act of answering itself.",
    reflect:
      "The next time you're asked to share your expertise, will you ask yourself his question, whether you're contributing something new, or repeating what's already been said?",
  },
  {
    number: "14",
    title: "I Have Been Learning Ever Since I Learned to Stand on My Feet",
    quote: [
      "I have been learning ever since I learned to stand on my feet. The lessons that I have learned will lead me to write a book. Hence, I will rest here.",
    ],
    whatThisMeans:
      "Asked whether a lesson from his military career only became clear years later, he declines to isolate a single one, choosing instead to point toward a need to write another book rather than compress a lifetime of learning into a soundbite for this feature.",
    whyItMatters:
      "This restraint is consistent with everything else he's shown here, elsewhere pointing readers to fuller published writing rather than oversimplifying, he treats his own hardest-won lessons the same way, as something that deserves its own space rather than a shortcut.",
    reflect:
      "Is there a lesson in your own life you've been carrying for years without yet finding, or making, the space to properly work through it?",
  },
  {
    number: "15",
    title: "The Camel Never Sees the Hump on Its Own Back",
    quote: [
      "How can I say one mistake? Any mistake, if repeated, might affect different people and institutions in different ways. This will probably be the biggest mistake. Hence, we must constantly look inward and ask what we have done wrong when something goes wrong, instead of looking for someone else to blame.",
      "In this regard, it will be worth reflecting on the famous Moroccan proverb: 'The camel never sees the hump on its own back but has its eyes on its brother's hump.'",
    ],
    whatThisMeans:
      "Asked to name one mistake future leaders should be spared from repeating, he refuses the premise of the question itself, arguing that any repeated mistake, in whatever form, is the real danger, not any single specific one.",
    whyItMatters:
      "The proverb he chooses names a very specific, common failure: seeing others' flaws clearly while remaining blind to your own. It's a fitting close to an answer that insists the real discipline is constant self-inquiry, not a single lesson learned once.",
    reflect:
      "Whose \"hump\" have you noticed clearly this week, and when did you last turn that same scrutiny on your own back?",
  },
  {
    number: "16",
    title: "Courage Is Knowing You're Licked Before You Begin, and Beginning Anyway",
    quote: [
      "The definition of courage can mean different things to different people, so it's hard to give an exact definition. In my opinion, the best explanation is what Atticus explained to his son in the famous book To Kill a Mockingbird by Harper Lee. It goes like this: \"I wanted you to see what real courage is, instead of getting the idea that courage is a man with a gun in his hand. It's when you know you're licked before you begin, but you begin anyway and see it through no matter what.\"",
    ],
    whatThisMeans:
      "Rather than offer his own definition of courage, a Major General with decades of combat and peacekeeping experience reaches for a civilian novel to make his point: that courage has nothing to do with weapons or physical power, and everything to do with persisting when you already expect to lose.",
    whyItMatters:
      "Choosing someone else's words, deliberately and by name, to explain the concept he's spent a career embodying, is itself an example of the humility he keeps returning to throughout this feature.",
    reflect:
      "What's something you're currently avoiding because you already suspect you're \"licked before you begin,\" rather than beginning anyway and seeing it through?",
  },
  {
    number: "17",
    title: "Three Things to Remember When the Situation Becomes Overwhelming",
    quote: [
      "One. Have humility to respect others' point of view.",
      "Two. Be grateful to others who probably would have contributed to what you are doing or intend to do now.",
      "Three. Stand by your principles and make a considerate decision. Thereafter, don't regret it, because, firstly, your decision is based on the truth, and secondly, the result is not in your hands.",
    ],
    whatThisMeans:
      "Asked what he'd want a young leader to remember in an overwhelming moment, he gives three concrete instructions rather than an abstract sentiment, humility, gratitude, and principled decisiveness followed by acceptance of what you can't control.",
    whyItMatters:
      "His reasoning for not regretting a considered decision is precise: the decision is based on truth, and the outcome was never fully in your hands to begin with. That separates the quality of a decision from the quality of its result.",
    reflect:
      "Of his three, humility, gratitude, or making a considered decision and releasing the outcome, which do you find hardest to hold onto when a situation actually becomes overwhelming?",
  },
  {
    number: "18",
    title: "The Courage to Tell the Truth and Accept My Own Mistakes in Public",
    quote: [
      "Courage to tell the truth and accept my own mistakes in public.",
    ],
    whatThisMeans:
      "Asked what principle has remained constant across decades of service, research, and a changing world, he answers with a single, unadorned sentence rather than an elaborated philosophy.",
    whyItMatters:
      "\"In public\" is the operative phrase. Accepting a mistake privately is one thing; committing, as a lasting principle, to accept it publicly is a far higher and more exposed standard.",
    reflect:
      "When did you last accept a mistake of yours publicly, rather than only acknowledging it privately or not at all?",
  },
  {
    number: "19",
    title: "Stand By the Truth, No Matter How Bitter It Is",
    quote: [
      "Pray to God to give courage to always stand by the truth, no matter how bitter it is. When we stand by the truth, God will always be on our side.",
    ],
    whatThisMeans:
      "Asked for the one principle he'd want the next generation to remember from his life, he returns to truth for the third time in three consecutive answers, this time framed explicitly through his own faith, as something he prays for the courage to sustain.",
    whyItMatters:
      "The same truth, and the courage to hold it, appears as his answer to three different, independently asked questions, on constancy, on legacy, and on this closing one. That tells you it isn't a rehearsed talking point. It's the actual throughline of everything he's said.",
    reflect:
      "Is there a bitter truth in your own life right now that you know, but haven't yet found the courage to stand by?",
  },
  {
    number: "20",
    title: "There Are a Few Incidents I Wish I Had the Power to Undo",
    quote: [
      "Discussion on this subject can continue. It is largely subjective and philosophical. It is a challenge to look back and pinpoint something that I was advised earlier. I have made many mistakes in life. But there are a few incidents I wish I had the power to undo. The narration of these will be part of a chapter of a book, which will take some time to be published. When that happens, I will remember to share that with you.",
    ],
    whatThisMeans:
      "Given the chance to add anything the questionnaire didn't ask, he doesn't reach for a tidy closing thought. He names, plainly, that he's made many mistakes and that a few of them he wishes he could undo, without elaborating further here.",
    whyItMatters:
      "Choosing to hold this back, rather than compress it into a soundbite for this feature, is the same restraint he showed in Principle 14. Some things, in his account, deserve their own space rather than a summary.",
    reflect:
      "What's something you've made peace with sharing only partially for now, trusting that the fuller telling will come when it's ready?",
  },
];

const takeaways = [
  {
    title: "Trust is not given upfront. It is earned through credibility.",
    body: "Rank gives you authority. Only proof, repeated and consistent, gives you trust, whether commanding troops or running a peacekeeping mission.",
  },
  {
    title: "There is nowhere to hide from the people you lead.",
    body: "The moment your honesty is questioned, you discover you were being watched constantly all along.",
  },
  {
    title: "Regret decisions made with complete information more than those made blind.",
    body: "Missing information is an explanation. Harshness chosen with full clarity has nowhere to hide.",
  },
  {
    title: "Humility, practised collectively and authentically, is a real operational advantage.",
    body: "It only counts when demonstrated directly by people on the ground, not delegated to a specialist team.",
  },
  {
    title: "Aim for measurable progress, not an impossible ideal.",
    body: "Positive peace is nearly unreachable. Leaders should aim for negative peace instead, less violence, less spread, fewer deaths, easier settlement.",
  },
  {
    title: "Ask whether you're contributing something new, or repeating existing theories.",
    body: "A question borrowed from his research supervisor, turned into a standing discipline for everything he says.",
  },
  {
    title: "Stand by the truth, no matter how bitter it is.",
    body: "The same principle, truth and the courage to hold it publicly, answers three separate questions about constancy, mistakes, and legacy.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Breadcrumb */}
      <nav className="mx-auto max-w-3xl px-6 pt-8 text-sm text-neutral-500">
        <Link href="/" className="hover:text-neutral-900">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/principles" className="hover:text-neutral-900">
          Stated Principles
        </Link>{" "}
        / Maj Gen (Dr) A.K. Bardalai
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/bardalai-portrait.jpg"
            alt="Maj Gen (Dr) A.K. Bardalai (Retd)"
            width={242}
            height={242}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Maj Gen (Dr) A.K. Bardalai (Retd) · Indian Army · UN Peace Operations Scholar
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 011
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Maj Gen (Dr) <em>A.K. Bardalai</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Stand By the Truth, No Matter How Bitter It Is
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Indian Peacekeeping Force, Sri Lanka · Siachen Glacier · UNIFIL Lebanon · Indian
          Military Training Team, Bhutan · PhD, Tilburg University
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;Trust is not given upfront; it is earned through credibility, and credibility
          comes only with proof.&rdquo;
        </blockquote>
      </header>

      {/* Stats row */}
      <section className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 border-y border-neutral-200 px-6 py-6 text-sm sm:grid-cols-4">
        <div>
          <p className="text-neutral-400">Format</p>
          <p className="font-medium">Leadership Principles</p>
        </div>
        <div>
          <p className="text-neutral-400">Read time</p>
          <p className="font-medium">14 minutes</p>
        </div>
        <div>
          <p className="text-neutral-400">Principles</p>
          <p className="font-medium">20 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">August 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {[
          "Indian Army Veteran",
          "UN Peacekeeping",
          "Peace & Conflict Researcher",
          "Author",
          "Leadership",
        ].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-neutral-200 px-3 py-1 text-neutral-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mx-auto max-w-3xl px-6">
        <a
          href="#principles"
          className="inline-block rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Read the principles
        </a>
      </div>

      {/* About */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-xs uppercase tracking-wide text-neutral-400">About him</p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          Maj Gen (Dr) A.K. Bardalai (Retd), was commissioned into the Indian Army on 11 June
          1977, a graduate of the National Defence Academy and the Defence Services Staff
          College, Wellington. He served with the Indian Peacekeeping Force in Sri Lanka,
          commanded an infantry battalion in the Siachen Glacier, and later an infantry brigade
          and an infantry division.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          He served as a UN Military Observer in Angola, and later as Deputy Head of Mission and
          Deputy Force Commander of UNIFIL, Lebanon, from 2008 to 2010. He was Commandant of the
          Indian Military Training Team in Bhutan from October 2011 to January 2014, before
          retiring from the Indian Army on 30 April 2014 and continuing his academic work on UN
          Peace Operations.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          He holds a PhD in UN Peace Operations from Tilburg University, Netherlands, and is a
          Distinguished Fellow of the United Service Institution of India. He is the author of{" "}
          <em>Keeping the Peace: UN Peace Operations and Their Effectiveness: An Assessment</em>,
          and his research also addresses peacebuilding, protection of civilians, military
          culture, anthropology, and UN norms. His published work is available at{" "}
          <a
            href="https://orcid.org/0000-0002-2883-9508"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-900"
          >
            his ORCID profile
            <span className="sr-only"> (opens in new window)</span>
          </a>
          .
        </p>
        <blockquote className="mt-6 border-l-2 border-neutral-300 pl-4 text-lg italic text-neutral-700">
          &ldquo;We asked Maj Gen (Dr) A.K. Bardalai twenty questions. He gave us nearly five
          decades of command, peacekeeping, and research, answered without a single soft
          edge.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what he stands for, stated publicly, in
          his own words, including the links to his own published writing where he chose to point
          readers there rather than compress a complex answer. This is how{" "}
          <em>Stated Principles</em> works: the person states their beliefs. We make them
          visible. You decide what to carry forward.
        </p>
      </section>

      {/* Principles 1-7 */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Twenty principles · Stated by Maj Gen (Dr) A.K. Bardalai
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What he stands for — in his own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 20</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>

              {p.linkUrl && (
                <a
                  href={p.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 underline decoration-amber-300 underline-offset-2 hover:decoration-amber-700"
                >
                  {p.linkLabel}
                  <span className="sr-only"> (opens in new window)</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}

              <p className="mt-3 text-sm text-neutral-500">
                — Maj Gen (Dr) A.K. Bardalai, stated directly
              </p>

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
            </article>
          ))}
        </div>
      </section>

      {/* Pull quote 1 */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-3xl font-serif leading-snug">
          &ldquo;The camel never sees the hump
          <br />
          <em>on its own back.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Maj Gen (Dr) A.K. Bardalai — Principle XV, Stated
        </p>
      </section>

      {/* Principles 8-12 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart2.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 20</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>

              {p.linkUrl && (
                <a
                  href={p.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 underline decoration-amber-300 underline-offset-2 hover:decoration-amber-700"
                >
                  {p.linkLabel}
                  <span className="sr-only"> (opens in new window)</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}

              <p className="mt-3 text-sm text-neutral-500">
                — Maj Gen (Dr) A.K. Bardalai, stated directly
              </p>

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
            </article>
          ))}
        </div>
      </section>

      {/* Pull quote 2 */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-3xl font-serif leading-snug">
          &ldquo;It&apos;s when you know you&apos;re licked
          <br />
          <em>before you begin, but you begin anyway.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Maj Gen (Dr) A.K. Bardalai — Principle XVI, Stated, quoting Harper Lee
        </p>
      </section>

      {/* Principles 13-20 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart3.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 20</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>

              <p className="mt-3 text-sm text-neutral-500">
                — Maj Gen (Dr) A.K. Bardalai, stated directly
              </p>

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

              <a
                href="https://app.stated.in/signup"
                className="mt-8 inline-block rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:border-neutral-900"
              >
                Create a Commitment inspired by this
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Pull quote 3 */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-3xl font-serif leading-snug">
          &ldquo;Stand by the truth,
          <br />
          <em>no matter how bitter it is.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Maj Gen (Dr) A.K. Bardalai — Principle XIX, Stated
        </p>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-xs uppercase tracking-wide text-neutral-400">Key takeaways</p>
        <h2 className="mt-3 text-3xl font-serif">Seven ideas worth carrying forward</h2>

        <ol className="mt-8 space-y-6">
          {takeaways.map((t, i) => (
            <li key={i} className="flex gap-4">
              <span className="text-lg font-serif text-neutral-400">{i + 1}</span>
              <p className="leading-relaxed text-neutral-700">
                <span className="font-semibold text-neutral-900">{t.title}</span> {t.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <h3 className="text-xl font-serif">Which principle resonates with you?</h3>
        <p className="mt-2 text-neutral-700">
          Post a commitment inspired by Maj Gen (Dr) A.K. Bardalai&apos;s principles. State it
          publicly — and make it real.
        </p>
        <a
          href="https://app.stated.in/signup"
          className="mt-5 inline-block rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Create a Commitment
        </a>
      </section>

      {/* Share */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-xs uppercase tracking-wide text-neutral-400">Share this feature</p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(URL)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            LinkedIn
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              URL
            )}&text=${encodeURIComponent(DESCRIPTION)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Twitter / X
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${DESCRIPTION} ${URL}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            WhatsApp
          </a>
        </div>
        <p className="mt-4 text-sm text-neutral-500">14 min read · 20 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
