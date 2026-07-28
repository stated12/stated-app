import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "lt-general-shokin-chauhan";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Lt General Shokin Chauhan — Leadership Is a Privilege of Service, Not of Position";
const DESCRIPTION =
  "Leadership is an act of service before it is an exercise of authority. Sixteen principles from a nearly four-decade military career, in his own words.";
const IMAGE = "https://app.stated.in/shokin-portrait.jpg";

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
    images: [{ url: IMAGE, width: 880, height: 875, alt: "Lt General Shokin Chauhan" }],
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
    title: "Leadership Is an Act of Service Before It Is an Exercise of Authority",
    quote: [
      "When people ask me what has remained constant throughout my military journey, my mind does not immediately travel to the battlefields where I served, the appointments I held or the decorations that came my way. Instead, it returns to the young gentleman cadet who walked through the gates of the National Defence Academy in January 1976, carrying little more than youthful enthusiasm, a deep love for his country and an incomplete understanding of what it truly meant to lead men. Like every young officer, I believed that courage was the defining quality of a soldier. It took me many years to realise that courage is only one part of leadership; character is what sustains it over a lifetime.",
      "If I were asked to identify one principle that has guided me through nearly four decades in uniform, it would be this: leadership is an act of service before it is an exercise of authority. This belief was not acquired overnight. It was forged gradually through countless experiences, some inspiring, some painful, many humbling. Whether commanding a platoon in difficult terrain, leading troops in counter-insurgency operations, serving in the unforgiving environment of the Siachen Glacier, representing India abroad or later working to bring insurgent groups into dialogue, I found that the essence of leadership remained remarkably unchanged. People do not follow rank alone. They follow conviction. They follow fairness. Above all, they follow leaders whom they trust.",
      "The Indian Army's motto, Service Before Self, is often quoted, but I believe its true meaning reveals itself only after years of living it. It is not about denying oneself recognition or comfort for its own sake. It is about recognising that, once you accept command, your personal preferences become subordinate to a much larger responsibility. The mission comes first. The nation comes first. The welfare of the men and women entrusted to your command comes first. Every significant decision I made was, in one way or another, influenced by that simple hierarchy of priorities.",
      "There is a tendency to believe that leadership becomes easier as one rises in rank. My experience was exactly the opposite. Every promotion expanded not merely my authority but my accountability. As a young officer, I was responsible for a platoon. Later I commanded battalions, formations and organisations. Eventually, decisions carried strategic implications that extended far beyond the immediate battlefield. Yet regardless of the scale of responsibility, I found myself returning to the same fundamental question: What is the right thing to do, not for me, but for the institution, for my soldiers and for the nation?",
      "The years also taught me another important lesson. Leadership is rarely about dramatic moments. Popular imagination often associates military leadership with combat, crises and decisive operations. Those moments certainly test one's resolve, but they are relatively few. The true test of character lies in ordinary days, in whether one treats the youngest soldier with dignity, whether one remains honest when compromise appears convenient, whether one accepts responsibility when mistakes occur, and whether one continues to uphold standards even when no one is watching. Trust is not built during battles; it is built during routine interactions long before the battle begins.",
      "Looking back now, I realise that the Army gave me far more than a profession. It gave me a philosophy of life. It taught me discipline without rigidity, courage without arrogance and authority tempered by humility. It introduced me to extraordinary soldiers from every corner of India who demonstrated, through quiet professionalism rather than grand speeches, what devotion to duty truly means. Whatever leadership qualities people may attribute to me are, in reality, a reflection of the institution that shaped me and the remarkable men and women with whom I had the privilege to serve.",
      "Today, in retirement, when I write, teach and engage with younger generations, I find that the principle remains unchanged. Leadership is still about service. Titles eventually disappear, uniforms are folded away and appointments pass into history. What endures are the institutions one leaves stronger, the people one has inspired and the values one refused to compromise. If there is one idea I would wish every young leader to carry forward, it is that leadership is never about oneself. It is a sacred trust placed in one's hands by others, and the only honourable way to repay that trust is through selfless service.",
    ],
    whatThisMeans:
      "He locates the source of his leadership philosophy not in a single defining moment, but in the slow realisation that courage — the quality every young officer admires first — is only the entry point. Character is what has to sustain leadership over an entire career, long after the dramatic moments have passed.",
    whyItMatters:
      "\"Service Before Self\" is a motto most people hear as a slogan. He treats it as an operating principle with a strict order of priority: mission, then nation, then the people under your command — with personal preference subordinated to all three.",
    reflect:
      "In whatever you lead, is your personal preference currently ranked above or below the people you're responsible for?",
  },
  {
    number: "02",
    title: "Remain Calm, Remain Ethical, Remain Accountable",
    quote: [
      "One of the first realities that military service teaches is that certainty is a luxury rarely available to commanders. The public often imagines that decisions made during military operations are based on complete information, detailed plans and perfect situational awareness. The reality is very different. Decisions are frequently taken in conditions of ambiguity, where information is incomplete, time is limited and the consequences of hesitation may be irreversible. Under such circumstances, leadership is tested not merely by the correctness of a decision but by the courage to make one.",
      "Throughout my career, whether operating in the icy heights of Siachen, conducting counter-terrorist operations in Jammu and Kashmir, confronting insurgency in the North East or later participating in peace negotiations, I found that uncertainty was the one constant companion of leadership. The temptation in such situations is to wait for additional information, believing that greater clarity will eventually emerge. Experience, however, taught me that in many operational environments, waiting itself becomes a decision, and often the wrong one.",
      "Over time, I developed a simple approach. First, gather the best information available without becoming paralysed by the pursuit of perfection. Second, listen carefully to professional advice, particularly from those closest to the ground, because leadership does not diminish by consulting others; it is strengthened by it. Third, once a decision has been made, communicate it clearly and execute it with conviction. A hesitant leader inevitably creates uncertainty throughout the organisation.",
      "There were occasions during operational command when lives depended upon decisions taken within minutes. Those are moments that remain etched in memory long after the operation has concluded. They also reinforce an enduring truth: no commander ever makes such decisions alone. Behind every successful operation stands an entire team of dedicated officers, junior leaders and soldiers whose professionalism transforms decisions into outcomes. One of the greatest lessons I learnt was that success belongs collectively, while responsibility ultimately rests with the commander.",
      "My understanding of decision-making also evolved significantly during my later years. Earlier in my career, operational success was naturally measured in military terms. Later, particularly while leading the Ceasefire Monitoring Group in Nagaland, I came to appreciate that some of the most important decisions are not those that initiate military action but those that create opportunities for peace. It requires one kind of courage to lead soldiers into combat. It requires another to extend a hand of reconciliation after years of conflict without compromising national security or institutional integrity. That experience broadened my understanding of what strategic leadership truly means.",
      "Looking back, I believe the philosophy that guided my decisions can be summarised in three simple principles: remain calm when others are anxious, remain ethical when expediency appears attractive, and remain accountable irrespective of the outcome. A leader cannot always guarantee success. Circumstances, chance and the actions of others will always influence events. What a leader can control is the integrity of the decision-making process and the willingness to accept responsibility for its consequences.",
      "Ultimately, leadership under uncertainty is an exercise in trust — trust in one's training, trust in one's team and trust in one's own values. Those anchors have served me well throughout my career.",
    ],
    whatThisMeans:
      "He rejects the popular image of the decisive commander acting on perfect information. In his account, decisions get made under ambiguity by design — and waiting for more clarity is itself a choice, often the wrong one.",
    whyItMatters:
      "His three-part discipline — gather the best available information without chasing perfection, consult those closest to the ground, then commit and execute with conviction — turns \"trusting your gut\" into a repeatable process rather than a personality trait.",
    reflect:
      "Where in your own decision-making are you currently waiting for more clarity that experience suggests may never fully arrive?",
  },
  {
    number: "03",
    title: "Shaped More by People Than by Operations",
    quote: [
      "People often assume that a soldier is shaped primarily by war. While conflict certainly leaves an indelible mark, I believe I was shaped even more profoundly by the people I encountered than by the operations in which I participated. A military career offers a unique privilege: it places one in close contact with humanity in its most testing circumstances. One witnesses courage, sacrifice, grief, resilience, hope and reconciliation, often within the same day. Those experiences gradually change not only the way one leads but also the way one understands life itself.",
      "Some of my earliest lessons came not from senior commanders but from the young soldiers with whom I served. Many came from modest backgrounds, yet they possessed an extraordinary sense of duty and quiet dignity. I watched them endure extreme cold in Siachen, prolonged separation from families, physical hardship and constant danger without complaint. Their resilience was rarely dramatic; it was expressed through unwavering professionalism in the face of adversity. Observing them taught me humility. Leadership, I realised, is not sustained by speeches but by shared hardship and mutual respect.",
      "The diverse regions in which I served also became classrooms in themselves. Kashmir taught me that security challenges are rarely simple and that every operation carries profound human consequences. The North East taught me patience and the importance of understanding history, identity and local aspirations before attempting solutions. My tenure with the Assam Rifles and later as Chairman of the Ceasefire Monitoring Group reinforced my conviction that peace cannot be imposed by force alone. Military success may create opportunities, but lasting peace emerges only when trust gradually replaces fear and dialogue replaces alienation.",
      "Serving abroad as India's Defence Attaché in Nepal further expanded my perspective. Representing one's nation in another country demands a different kind of leadership. It requires diplomacy, cultural sensitivity and the ability to build relationships based upon mutual respect rather than authority. I discovered that while nations may pursue different interests, people across cultures respond to sincerity, consistency and integrity in remarkably similar ways.",
      "Perhaps the greatest personal lesson I learnt over the years was that certainty should always be tempered by humility. The longer I served, the more I recognised the complexity of human affairs. Simple answers rarely solved difficult problems. Strategic patience often achieved outcomes that force alone could not. Listening carefully frequently proved more productive than speaking authoritatively. These lessons extended beyond soldiering and shaped my understanding of leadership, society and human nature.",
      "Retirement has provided me with the opportunity to reflect upon those experiences through writing, teaching and research. Looking back, I realise that my military career did not merely teach me how to command troops; it taught me how to understand people. That, I believe, has been its greatest gift.",
    ],
    whatThisMeans:
      "Asked what shaped him most, he doesn't point to combat — he points to the young soldiers who endured Siachen's extreme cold and prolonged separation from family without complaint, and to the regions themselves, each one teaching a different lesson about patience, identity, and history.",
    whyItMatters:
      "The line \"my military career did not merely teach me how to command troops; it taught me how to understand people\" reframes decades of operational command as, at bottom, an education in humanity — which is why the lessons carried directly into his later peace-building work.",
    reflect:
      "Think about the environment that has shaped you most, professionally or personally. Did it teach you more about the task at hand, or about the people you did it alongside?",
  },
  {
    number: "04",
    title: "Integrity Is an Institutional Necessity, Not Just a Personal Virtue",
    quote: [
      "Among all the virtues associated with leadership, I believe integrity occupies a unique position because it forms the foundation upon which every other quality depends. Intelligence may command admiration. Courage may inspire confidence. Professional competence may produce success. Yet without integrity, none of these qualities can sustain genuine leadership for very long. Soldiers possess an extraordinary ability to discern authenticity. They observe not only what their commanders say but, more importantly, how they behave when confronted with difficult choices.",
      "To me, integrity has never been confined to the simple notion of telling the truth. It is something deeper. It is the alignment between one's values, one's decisions and one's actions. It means that the standards we expect from others must first be evident in our own conduct. It also means remaining faithful to those standards even when compromise appears easier, more convenient or personally advantageous.",
      "Throughout my career, I discovered that the greatest tests of integrity rarely arrived in dramatic moments. They emerged quietly, in personnel decisions, in operational assessments, in performance evaluations, in accepting responsibility for mistakes, and in ensuring fairness even when the easier course would have been to avoid uncomfortable conversations. Leadership often demands choices between competing interests rather than between obvious right and wrong. It is during those moments that integrity becomes both the compass and the anchor.",
      "I have always believed that a commander must create an environment in which subordinates feel confident that decisions are based upon fairness rather than favour, professional merit rather than personal preference, and institutional interest rather than individual convenience. Such confidence cannot be created through speeches or policy documents. It is built gradually through consistent conduct over many years. Once established, it becomes one of the greatest strengths of any organisation.",
      "My experiences in conflict zones further reinforced this belief. Military operations are conducted under intense pressure where ethical judgement is constantly tested. The discipline of a professional army lies not merely in its ability to use force but in its ability to exercise restraint when restraint is required. I have always regarded this distinction as one of the defining characteristics of the Indian Army and one that every leader has a responsibility to preserve.",
      "As I reflect upon my years in uniform, I am convinced that integrity is not simply a personal virtue; it is an institutional necessity. Organisations survive occasional operational setbacks. They recover from strategic mistakes. What they cannot easily recover from is the erosion of trust caused by compromised integrity. That is why I have always regarded honesty, fairness and moral courage not as desirable qualities but as non-negotiable obligations.",
      "In the final analysis, a leader's legacy is not determined by the number of successful operations commanded or prestigious appointments held. It is determined by whether those who served under him believed that he was fair, truthful and worthy of their trust. If I have managed to uphold those standards, I consider that to be among the most meaningful achievements of my career.",
    ],
    whatThisMeans:
      "He defines integrity as something more demanding than honesty — it's the alignment between what you value, what you decide, and what you actually do, tested most in quiet moments like personnel decisions and performance evaluations rather than dramatic crises.",
    whyItMatters:
      "His distinction — organisations recover from operational setbacks and strategic mistakes, but rarely recover from the erosion of trust caused by compromised integrity — explains why he treats honesty, fairness, and moral courage as non-negotiable obligations rather than desirable extras.",
    reflect:
      "Where in your own decisions do your stated values and your actual conduct quietly drift apart, even when no one is watching closely enough to notice?",
  },
  {
    number: "05",
    title: "Cultures Differ, but the Principles of Leadership Are Universal",
    quote: [
      "One of the greatest privileges of a military career is that it exposes one to worlds far beyond one's own experience. During my years in uniform, I had the opportunity not only to command soldiers from every region, language and faith of India, but also to represent my country abroad, interact with military leaders from other nations and participate in international engagements where the objectives extended beyond national boundaries. Those experiences gradually reinforced an important truth that I believe applies equally to military leadership, diplomacy and public life: while cultures differ, the fundamental principles of leadership remain remarkably universal.",
      "When I first represented India overseas, I naturally viewed my role through the prism of national interest. That, after all, is the primary responsibility of any military officer serving abroad. Yet I soon realised that national interests are best advanced not merely through formal negotiations or official positions, but through relationships built patiently over time. Trust develops long before agreements are signed. Respect precedes influence. Nations may negotiate policies, but people build partnerships.",
      "Serving in Nepal remains particularly significant in shaping this understanding. India and Nepal share a relationship unlike almost any other in the world. Our geography, history, religion, culture and military traditions have intertwined over centuries. Representing India there demanded not simply diplomatic skill but genuine sensitivity towards the perspectives, aspirations and concerns of our closest neighbour. It taught me that effective leadership begins not by speaking but by listening. One cannot expect to influence another society without first making a sincere effort to understand how that society perceives itself.",
      "A similar lesson emerged later during my work in the North East, particularly while engaging with diverse stakeholders during the peace process. Although this was within our own country, the challenge was remarkably similar. Every community possesses its own history, memories and aspirations. Leadership in such circumstances requires patience, empathy and the willingness to recognise that durable solutions cannot be imposed solely through authority. They must be built upon dialogue, mutual respect and confidence.",
      "These experiences also deepened my appreciation of India's unique civilisational strength. Our country has always demonstrated an extraordinary capacity to accommodate diversity without demanding uniformity. During my military career I had the privilege of commanding soldiers from every conceivable background. They spoke different languages, practised different religions and came from vastly different social environments, yet when they wore the uniform, they became one cohesive team united by a common purpose. That experience convinced me that diversity, when anchored in shared values, becomes a source of immense national strength rather than division.",
      "International engagement also teaches humility. Every nation, irrespective of its size or power, believes its choices are shaped by legitimate historical experiences. It is easy to judge others from a distance; it is much harder, and far more valuable, to understand why they think as they do. This does not mean compromising one's national interests or abandoning principled positions. Rather, it means recognising that lasting cooperation is built through understanding before persuasion.",
      "Perhaps the most enduring lesson I learnt from these international assignments is that leadership is ultimately about building bridges rather than walls. Military leaders are trained to protect borders, but they also have an important role in creating the conditions under which those borders become lines of cooperation rather than perpetual confrontation. Peace is sustained not simply by military preparedness but by relationships of trust between institutions, governments and people.",
      "Looking back, I remain convinced that whether one commands a battalion, represents a nation abroad or participates in international peace efforts, the essential qualities remain unchanged. Integrity inspires confidence. Humility encourages dialogue. Professional competence earns respect. Above all, genuine leadership requires recognising that influence is never imposed; it is earned through conduct, consistency and credibility.",
    ],
    whatThisMeans:
      "His time representing India in Nepal and engaging communities in the North East taught him the same lesson twice, once abroad and once at home: effective leadership begins with listening, not speaking, and durable solutions can't be imposed by authority alone.",
    whyItMatters:
      "\"Diversity, when anchored in shared values, becomes a source of immense national strength rather than division\" — coming from someone who commanded soldiers of every language, religion, and region of India under one uniform, this isn't an abstract ideal; it's an observed operational fact.",
    reflect:
      "Where in your own life are you trying to influence a group, community, or culture you haven't yet made a sincere effort to understand on its own terms?",
  },
];

const principlesPart2 = [
  {
    number: "06",
    title: "Exceptional Leadership Is Measured by What Others Become",
    quote: [
      "One of the greatest privileges of serving for nearly four decades is the opportunity to observe leadership at every level, from young officers taking charge of their first platoons to senior commanders responsible for the security of entire regions. Looking back, I realise that while competence was common among the finest officers I encountered, greatness was comparatively rare. Competence enables an organisation to function efficiently. Exceptional leadership transforms an organisation and inspires people to achieve far more than they believed possible.",
      "Early in my career, like many young officers, I tended to admire visible qualities: decisiveness, physical courage, tactical brilliance and professional knowledge. These attributes are undoubtedly important, particularly in military service where lives often depend upon sound judgement. Yet as my responsibilities increased, I discovered that the qualities which truly distinguished exceptional leaders were often quieter and less obvious.",
      "The finest commanders I served under possessed remarkable emotional stability. During moments of crisis, when anxiety spread naturally through an organisation, they remained calm without appearing detached. Their composure inspired confidence because people instinctively take emotional cues from their leaders. Panic at the top quickly becomes panic throughout the organisation. Conversely, quiet confidence creates resilience even under the most difficult circumstances.",
      "Another distinguishing quality was intellectual curiosity. Some assume that experience alone produces wisdom. My own observations suggest otherwise. Experience teaches only those who continue questioning their own assumptions. The best military leaders I encountered never stopped learning. They read widely, welcomed informed debate and remained open to alternative viewpoints. They understood that changing circumstances demand changing approaches while enduring principles remain constant.",
      "Perhaps the rarest quality, however, was moral courage. Physical courage is rightly admired in the armed forces, but moral courage is often more difficult to demonstrate. It requires making decisions that may be professionally unpopular but ethically necessary. It demands accepting responsibility for failure while generously sharing credit for success. It requires telling uncomfortable truths to superiors, subordinates and sometimes even oneself. Over the years I came to believe that moral courage ultimately determines the credibility of leadership far more than operational success alone.",
      "The best leaders also possessed genuine humility. Humility should never be confused with weakness or indecisiveness. On the contrary, it reflects confidence rather than insecurity. Leaders who are secure in themselves readily acknowledge the expertise of others, encourage initiative and celebrate the achievements of their teams without feeling diminished. They recognise that institutions become stronger when leadership is distributed rather than concentrated.",
      "Another characteristic that consistently impressed me was compassion. Military organisations are often associated with discipline, precision and toughness, all of which are essential. Yet the most respected commanders never lost sight of the human dimension of leadership. They understood the anxieties of young soldiers, appreciated the sacrifices made by military families and recognised that genuine concern for people's welfare strengthens discipline rather than weakens it. Soldiers willingly accept hardship when they know their commanders genuinely care for them.",
      "As I reflect today, I believe exceptional leadership is ultimately measured not by what a leader accomplishes personally but by what others become under that leader's guidance. Great leaders produce more leaders. They leave behind stronger institutions, more confident teams and higher standards than those they inherited. Their influence continues long after they have relinquished command because it has become embedded within the culture of the organisation itself. That, in my view, is the highest form of leadership.",
    ],
    whatThisMeans:
      "He separates competence, which is common among fine officers, from greatness, which is rare — and locates the difference not in the visible qualities young officers admire first (decisiveness, tactical brilliance) but in quieter ones: emotional stability, intellectual curiosity, moral courage, humility, and compassion.",
    whyItMatters:
      "Moral courage gets singled out as the rarest and most decisive quality — not because physical courage doesn't matter, but because it's easier to demonstrate. Telling an uncomfortable truth to a superior, or to yourself, is a harder and less celebrated act.",
    reflect:
      "Of the five quieter qualities he names — emotional stability, intellectual curiosity, moral courage, humility, compassion — which one do you most avoid practicing because it's uncomfortable rather than because it's hard?",
  },
  {
    number: "07",
    title: "Setbacks Are Invitations to Deepen Understanding",
    quote: [
      "Every long career inevitably contains moments of disappointment, uncertainty and reflection. Those who suggest otherwise have either forgotten the past or never truly examined it. Looking back today, I realise that many of the lessons which shaped my thinking did not emerge from success alone. They emerged from moments when events unfolded differently from expectations and compelled me to re-examine my own assumptions.",
      "Early in my career, like most professional soldiers, I viewed success largely through an operational lens. A mission accomplished, a difficult objective secured or an insurgent network disrupted represented tangible achievements. Such outcomes remain vitally important because security is the essential foundation upon which all other national objectives depend. Yet as my responsibilities expanded, particularly in the North East, I gradually realised that military success, although necessary, is rarely sufficient.",
      "One of the most significant transformations in my thinking occurred during my tenure as Chairman of the Ceasefire Monitoring Group. Years of military experience had taught me how force could restore order. The peace process taught me how restraint, dialogue and patience could preserve it. Engaging with former adversaries was neither simple nor free from scepticism. Trust, after years of conflict, develops slowly and unevenly. There are inevitable setbacks, misunderstandings and moments when progress appears fragile. Yet it was precisely through those experiences that I came to appreciate the profound strategic value of persistence.",
      "I discovered that leadership sometimes requires resisting the understandable desire for immediate results. Military operations often demand rapid decisions. Peace-building demands sustained patience. Both require courage, but they are different expressions of it. The former tests one's ability to act decisively under pressure. The latter tests one's ability to remain committed despite slow progress and occasional disappointment.",
      "Another important lesson emerged from observing the extraordinary resilience of ordinary people. Throughout my career I encountered families who had endured violence, displacement and uncertainty with remarkable dignity. Their quiet determination reinforced my belief that security ultimately exists to protect human lives rather than abstract strategic concepts. The purpose of military power is not conflict itself but the creation of conditions in which peaceful societies can flourish.",
      "Looking back, I no longer measure success solely by battles won or operations completed. I increasingly measure it by institutions strengthened, trust restored and opportunities created for future generations to live in greater peace and security. That shift in perspective has perhaps been the most important personal evolution of my career.",
      "Setbacks, therefore, should not be viewed merely as obstacles. They are often invitations to deepen one's understanding. They compel leaders to examine not only what happened but why it happened and what larger lessons may be drawn from the experience. In that sense, some of the most difficult moments of my career ultimately became the most valuable teachers.",
    ],
    whatThisMeans:
      "His biggest shift in thinking wasn't triggered by a victory — it came from chairing the Ceasefire Monitoring Group, where he learned that force restores order but restraint, dialogue, and patience are what preserve it. Military success and peace-building require different expressions of the same courage.",
    whyItMatters:
      "He redefines his own measure of success mid-career — from battles won and operations completed to institutions strengthened and trust restored. That's a leader revising his own scoreboard, not just his tactics.",
    reflect:
      "What's a setback in your own life that you've filed away as simply a loss, rather than examined for what it was actually trying to teach you?",
  },
  {
    number: "08",
    title: "Technology Can Process Information; It Cannot Replace Wisdom",
    quote: [
      "Every generation naturally believes that it is living through unprecedented change. Yet there is little doubt that the pace of transformation confronting today's young leaders is extraordinary. Technological advances, artificial intelligence, cyber warfare, information operations, space capabilities, autonomous systems and the rapid diffusion of knowledge are redefining both security and governance at a speed unimaginable only a generation ago. Future leaders will operate in environments where the distinction between war and peace, military and civilian domains, and physical and virtual battlefields will become increasingly blurred.",
      "Yet despite these profound technological changes, I remain convinced that the defining qualities of leadership will remain fundamentally human. Technology can process information. It cannot replace wisdom. Artificial intelligence can generate options. It cannot determine values. Algorithms may assist decision-making. They cannot exercise moral judgement.",
      "For this reason, I believe the most important attribute future leaders must cultivate is intellectual adaptability. They must be willing to challenge assumptions, embrace innovation and remain lifelong learners. Knowledge acquired at the beginning of one's career will not remain sufficient throughout it. Continuous education, professional reading, interdisciplinary thinking and openness to new ideas will become indispensable.",
      "At the same time, I would urge young leaders not to neglect the timeless virtues that no technology can replace. Integrity will remain the foundation of trust. Empathy will remain essential for understanding people. Courage will still be required to make difficult decisions. Humility will continue to distinguish genuine confidence from arrogance. Character, in the final analysis, will remain the decisive factor separating leadership from mere management.",
      "Another quality that I believe deserves far greater attention is strategic patience. Modern societies increasingly expect immediate outcomes, yet many of the most significant national challenges require sustained effort over decades. Whether building military capability, strengthening institutions, conducting diplomacy or promoting social cohesion, enduring success rarely arrives quickly. Leaders must therefore develop the resilience to pursue long-term objectives without becoming distracted by short-term pressures.",
      "Finally, I hope future leaders remember that public trust has become one of the most valuable strategic resources of any nation. Institutions derive their legitimacy not merely from legal authority but from public confidence. Every decision, every action and every interaction either strengthens or weakens that confidence. Leaders who consistently act with honesty, fairness and transparency contribute not only to their own organisations but also to the democratic resilience of the nation itself.",
      "As I look towards the future with optimism, I remain encouraged by the remarkable talent and energy of India's younger generation. They possess opportunities that my generation could scarcely have imagined. My hope is that they will combine technological excellence with moral clarity, professional competence with humility, and ambition with an unwavering commitment to national service. If they succeed in doing so, I have little doubt that India will be exceptionally well served in the decades ahead.",
    ],
    whatThisMeans:
      "Facing a future of AI, cyber warfare, and blurred lines between physical and virtual battlefields, his answer isn't to double down on technical mastery alone — it's to insist that wisdom, values, and moral judgement remain irreducibly human functions that no algorithm performs.",
    whyItMatters:
      "\"Character, in the final analysis, will remain the decisive factor separating leadership from mere management\" is a direct challenge to any assumption that faster information processing produces better leadership. Information and judgement are not the same capability.",
    reflect:
      "As tools get faster at giving you options, are you spending proportionally more time developing the judgement to choose well between them — or less?",
  },
  {
    number: "09",
    title: "Strength Without Compassion Becomes Oppression",
    quote: [
      "One of the most enduring misconceptions about military leadership is that strength and compassion exist at opposite ends of a spectrum, and that a commander must somehow choose between them. My own experience has taught me precisely the opposite. The strongest leaders I have known were invariably the most humane, because they understood that military leadership is ultimately about people rather than weapons, formations or plans. Soldiers are not machines. They carry fears, aspirations, families and responsibilities. They place their lives in the hands of their commanders not because they are compelled to do so, but because they believe their leaders will use that authority wisely.",
      "As a young officer, I naturally associated discipline with firmness. Over the years, I came to understand that discipline derives its real strength from fairness rather than fear. Soldiers willingly accept demanding standards when they are convinced that those standards are applied consistently and with integrity. They can distinguish immediately between firmness that serves the institution and harshness that serves only the ego of a leader. The former builds respect; the latter breeds resentment.",
      "Many of my most enduring memories are not of operations but of conversations, with young officers anxious before their first command, with soldiers facing family difficulties thousands of kilometres away, with widows who had lost loved ones in service, and with local communities living amid prolonged conflict. Those encounters reminded me that leadership is exercised one human interaction at a time. Decisions may be strategic, but their consequences are always deeply personal.",
      "Authority, too, changes its meaning with experience. When I first wore the ranks on my shoulder, I probably viewed it as the visible symbol of command. Today I regard it differently. Authority is not a privilege conferred upon an individual; it is a responsibility entrusted by an institution. The more authority one receives, the greater the obligation to exercise restraint, fairness and humility. Leaders who become preoccupied with their own status gradually distance themselves from the very people they are expected to lead.",
      "Humility, in my understanding, is not self-effacement. It is the quiet recognition that no leader succeeds alone. Every achievement attributed to a commander reflects the professionalism, courage and dedication of countless others. Throughout my career I was privileged to serve alongside extraordinary officers, junior leaders and soldiers whose competence frequently made success possible. Any recognition that came my way belongs as much to them as it does to me.",
      "Compassion should never be mistaken for weakness. In fact, it often requires considerable courage. During years of counter-insurgency and peace-building, I learnt that understanding the human dimension of conflict frequently opens possibilities that force alone cannot create. Showing dignity to local populations, treating adversaries with fairness once they renounce violence, or ensuring that the welfare of one's own troops receives the highest priority are not acts of softness; they are expressions of confidence rooted in professional strength.",
      "As I reflect today, I no longer see these qualities as competing values requiring careful balance. Strength without compassion becomes oppression. Compassion without strength becomes sentimentality. Discipline without empathy becomes mechanical obedience. Empathy without discipline undermines standards. Authority without humility becomes arrogance. Humility without authority becomes indecision. Leadership lies in integrating these qualities into a coherent whole, allowing each to reinforce rather than diminish the others.",
      "Ultimately, people remember not how powerful a leader appeared, but how that leader made them feel, whether they felt respected, protected, inspired and valued. That, I believe, is the true measure of leadership.",
    ],
    whatThisMeans:
      "He dismantles the idea that strength and compassion sit on opposite ends of a spectrum requiring balance — instead laying out six precise failure modes when any one quality is stripped of its counterpart: strength without compassion is oppression, discipline without empathy is mechanical obedience, and so on down the list.",
    whyItMatters:
      "This reframes leadership development away from \"finding the right balance\" toward integration — each quality is meant to reinforce the others, not be traded off against them. That's a materially different, more demanding standard.",
    reflect:
      "Of his six pairings — strength/compassion, discipline/empathy, authority/humility — which one are you currently treating as a trade-off rather than something to integrate fully?",
  },
  {
    number: "10",
    title: "Guard Your Credibility the Way You Guard Your Reputation",
    quote: [
      "Among all the intangible qualities upon which leadership depends, trust is undoubtedly the most precious. It cannot be purchased, demanded or inherited. Rank may confer authority, but it does not automatically command trust. Trust is earned slowly through consistent conduct, tested under pressure and, if lost, restored only through sustained effort and personal integrity.",
      "Looking back over my years in uniform, I have come to realise that trust is built long before it is ever tested. It is built in the countless ordinary moments that seldom appear in official records, when a commander keeps his word despite inconvenience, when difficult decisions are explained honestly rather than concealed, when fairness prevails over favouritism, and when soldiers know that their welfare genuinely matters to those who lead them. These seemingly small actions accumulate quietly over time until they create an invisible bond of confidence between leader and led.",
      "Some of the strongest demonstrations of trust that I witnessed occurred during operations where soldiers followed orders under conditions of immense danger. Such trust cannot be created overnight. It develops because people have repeatedly observed their leaders sharing hardships, accepting responsibility and demonstrating professional competence. In military life, trust is literally a matter of life and death. Soldiers are prepared to place themselves at risk because they believe that their commanders have weighed every decision carefully and will never expose them to unnecessary danger.",
      "The same principle applies equally beyond the military. During my involvement in peace processes, I discovered that trust between opposing sides develops far more slowly than many imagine. Communities that have lived through years of violence carry memories that cannot be erased by a single agreement. Confidence must be built patiently through actions that consistently demonstrate sincerity, reliability and respect. Every promise honoured strengthens trust. Every commitment broken weakens it.",
      "There have also been occasions when trust has been challenged. In such moments, the natural instinct of many leaders is to become defensive or seek explanations. My own experience suggests a different approach. When mistakes occur, the first responsibility of leadership is honesty. People are remarkably forgiving of genuine errors when they see accountability and a sincere determination to learn. They are far less forgiving of denial, concealment or attempts to shift responsibility elsewhere.",
      "Trust also demands consistency between public principles and private conduct. Soldiers, colleagues and citizens quickly recognise discrepancies between what leaders advocate and how they behave. Leadership therefore requires a degree of personal discipline that extends well beyond professional competence. One cannot expect to inspire confidence while living by different standards from those expected of others.",
      "As I have reflected upon these experiences over the years, I have become convinced that trust represents the true currency of leadership. Material resources, sophisticated technology and formal authority all have their place, but without trust they achieve only limited effectiveness. Institutions become resilient when trust exists between leaders and followers, between colleagues, and between the organisation and the society it serves.",
      "If I were to offer one piece of advice to young leaders, it would be this: guard your credibility with the same determination that you guard your reputation. Reputation depends largely upon what others think of you. Credibility depends upon whether your conduct consistently justifies their confidence. The first may fluctuate with circumstances. The second becomes the foundation of enduring leadership.",
    ],
    whatThisMeans:
      "He draws a precise, practical distinction most people never separate — reputation is what others think of you and can fluctuate with circumstance; credibility is whether your conduct consistently justifies their confidence, and it's built or broken in ordinary moments no official record ever captures.",
    whyItMatters:
      "His guidance for when trust is challenged runs against instinct: don't get defensive, don't seek explanations first — lead with honesty. People forgive genuine error readily; they rarely forgive denial or concealment.",
    reflect:
      "Are you currently more focused on protecting your reputation — what people think of you — or your credibility — whether your conduct actually justifies their confidence? What's the difference doing in your own life right now?",
  },
];

const principlesPart3 = [
  {
    number: "11",
    title: "Courage Must Always Be Guided by Judgement",
    quote: [
      "Every military career contains decisions that remain vivid in memory long after individual operations have faded into history. Some involve tactical choices taken under intense pressure. Others concern people rather than plans. Still others require balancing competing responsibilities where every available option carries significant consequences. Looking back, I find it difficult to identify a single decision because leadership is, in many ways, a continuous process of choosing between imperfect alternatives.",
      "One experience that remains particularly significant for me was commanding a prolonged hostage rescue and counter-terrorist operation in Kashmir. For more than two days, every decision had immediate implications for the lives of innocent civilians, the safety of my soldiers and the success of the mission itself. Such situations concentrate the mind in remarkable ways. They remind a commander that behind every tactical consideration lie human lives that can never be regarded merely as operational variables.",
      "The operation reinforced an enduring lesson that has remained with me ever since: decisive leadership is not synonymous with reckless action. Public perception often celebrates speed and boldness, but experienced commanders understand that patience can sometimes be the most courageous decision of all. There were moments when immediate action appeared tempting. Yet restraint, careful assessment and disciplined execution ultimately produced a better outcome. That experience strengthened my conviction that courage must always be guided by judgement.",
      "Other difficult decisions emerged during later years when responsibilities extended beyond purely military operations. Working towards peace in conflict-affected regions often required balancing legitimate security concerns with opportunities for dialogue. Such choices are seldom clear-cut. They require confidence in one's principles and an appreciation that strategic success sometimes demands political patience as much as operational effectiveness. These experiences reinforced my belief that national security is not advanced solely by demonstrating strength but also by creating conditions in which peace becomes sustainable.",
      "Perhaps the greatest lesson difficult decisions have taught me is that leadership is ultimately a moral responsibility. Professional competence provides the ability to choose. Values determine what one chooses. There were occasions when expedient solutions presented themselves, but they did not always align with my understanding of fairness, integrity or institutional responsibility. In those moments, I found it essential to return to first principles rather than immediate convenience.",
      "I also learnt that no leader should fear accountability. Decisions taken honestly, after careful deliberation and in good faith, deserve to be owned irrespective of their outcome. Success should never create arrogance, nor should setbacks produce self-doubt. What matters most is whether the decision-making process reflected integrity, professionalism and concern for those affected.",
      "Looking back today, I do not remember every operational detail. What remains with me are the lessons those decisions imparted. Leadership is rarely about choosing between right and wrong. More often, it involves choosing between competing goods while remaining faithful to one's values. That is perhaps why moral courage occupies such an important place in my understanding of leadership. Physical courage may win battles. Moral courage sustains institutions.",
    ],
    whatThisMeans:
      "Commanding a hostage rescue operation over more than two days taught him that decisive leadership isn't the same as reckless action — restraint, careful assessment, and disciplined execution, even when immediate action felt tempting, produced the better outcome.",
    whyItMatters:
      "\"Physical courage may win battles. Moral courage sustains institutions\" closes a thread that runs through nearly every principle here — the hardest decisions weren't between obvious right and wrong, but between competing goods, where only a clear return to first principles cut through the ambiguity.",
    reflect:
      "Think of a recent decision where speed and boldness were being celebrated around you. Was patience actually the more courageous option — and did you have the judgement to notice?",
  },
  {
    number: "12",
    title: "Experience Raises Questions; Research Helps Answer Them",
    quote: [
      "If there is one habit that has remained with me from the earliest days of my career until the present, it is the desire to keep learning. I have always believed that the profession of arms demands not only physical courage but intellectual discipline. Warfare evolves continuously. Technology changes. Societies transform. Geopolitics rarely stands still. A military leader who stops learning gradually begins relying upon yesterday's solutions for tomorrow's problems.",
      "Throughout my career, books became companions almost as important as maps and operational orders. I found myself drawn not only to military history and strategy but also to political science, philosophy, economics and international relations. The more I read, the more I realised that security cannot be understood in isolation. Military power is influenced by diplomacy, economics, technology, culture and public opinion. Understanding these broader dimensions enabled me to place operational experiences within a larger strategic context.",
      "My later decision to pursue doctoral research emerged naturally from this intellectual curiosity. Some people were surprised that a serving senior officer would devote time to rigorous academic work despite demanding operational responsibilities. For me, however, scholarship was never separate from soldiering. It was an extension of it. Experience raises questions. Research helps answer them. Field experience provides evidence. Academic discipline provides perspective.",
      "Writing has also played an important role in my intellectual journey. Every article and every book has required me to examine my own assumptions, organise years of experience into coherent ideas and engage with alternative viewpoints. Writing imposes a discipline that conversation often does not. It compels clarity of thought. One cannot write persuasively without first thinking deeply.",
      "Retirement, rather than marking the end of learning, has provided the freedom to pursue it with even greater intensity. Teaching, mentoring younger scholars, participating in strategic discussions and continuing to write have allowed me to remain connected with national security while contributing in a different capacity. I consider this phase not a departure from military service but its continuation through scholarship.",
      "Perhaps the greatest lesson continuous learning has taught me is humility. The more one studies, the more one recognises the complexity of the world. Simple answers become less convincing. Certainty gives way to informed judgement. Dogmatism gradually yields to intellectual openness. This does not weaken conviction; it strengthens it by grounding beliefs in careful analysis rather than assumption.",
      "I often tell young officers that professional education should never be viewed merely as a requirement for promotion. It is a responsibility owed to the soldiers they will one day command and to the nation they are sworn to defend. Every book they read, every idea they examine and every perspective they challenge ultimately contributes to better decisions when circumstances demand them.",
      "Looking back over my own journey, I remain deeply grateful that the Army encouraged intellectual growth alongside operational excellence. It allowed me to discover that the finest military leaders are rarely those who know all the answers. They are those who never stop asking questions.",
    ],
    whatThisMeans:
      "He treats scholarship not as a departure from soldiering but as its extension — field experience raises questions that only sustained reading and academic discipline can properly answer, which is why he pursued doctoral research alongside demanding operational command rather than after it.",
    whyItMatters:
      "\"The finest military leaders are rarely those who know all the answers. They are those who never stop asking questions\" reframes professional education from a box to check for promotion into an obligation owed directly to the people you'll one day command.",
    reflect:
      "When did you last deliberately study something outside your immediate field, purely because it might sharpen the judgement you bring to the work you already do?",
  },
  {
    number: "13",
    title: "Military Power Creates the Opportunity for Peace; Wise Statecraft Makes It Last",
    quote: [
      "When people think about soldiers, they naturally associate us with war. It is an understandable perception, yet one that captures only part of the truth. The profession of arms is not about the pursuit of conflict; it is about preventing it wherever possible and, when conflict becomes unavoidable, ensuring that it ends on terms that allow peace to endure. If there is one lesson my years in uniform have taught me, it is that military power, however essential, can never by itself create lasting peace.",
      "The military performs an indispensable function. It protects national sovereignty, creates conditions of security and prevents violence from overwhelming society. Without security, development cannot flourish, democratic institutions cannot function effectively and ordinary citizens cannot live with confidence. Yet security should never become an end in itself. It is the foundation upon which peace, prosperity and human dignity are built. Once that foundation exists, other institutions of the state must carry the responsibility forward.",
      "My own understanding of this evolved gradually over many years. As a young officer engaged in operational duties, success was naturally measured in military terms. Objectives were secured, threats neutralised and missions accomplished. Those experiences remain immensely important because without operational success there can be no stable environment in which peace can take root. However, later responsibilities, particularly those connected with dialogue and ceasefire management in the North East, revealed another dimension of national security that no textbook had fully prepared me for.",
      "I came to appreciate that people rarely abandon conflict merely because they have been defeated. More often, they move away from violence when they begin to see a more honourable and hopeful alternative. That alternative cannot be provided by soldiers alone. It requires political leadership with vision, administrators who govern fairly, educators who expand opportunities, communities willing to reconcile, and institutions capable of inspiring public confidence. Military strength creates the opportunity for peace; wise statecraft transforms that opportunity into lasting stability.",
      "Throughout my interactions with former insurgents, local communities and civil society representatives, I was repeatedly reminded that dignity matters profoundly. Every society wishes to be heard. Every community wishes its identity to be respected. Every individual wishes to feel that justice is possible. Addressing these aspirations does not weaken the state; when done within the framework of the Constitution and the rule of law, it strengthens national unity by making citizens stakeholders in peace rather than reluctant participants in conflict.",
      "International engagements reinforced the same lesson. Across the world, sustainable peace has rarely emerged through military means alone. It has required institutions that enjoy legitimacy, economies that create opportunity, and societies that possess sufficient confidence to look beyond the grievances of the past. This is not idealism; it is strategic realism. Peace that rests solely upon coercion remains fragile. Peace supported by trust becomes resilient.",
      "I have therefore come to believe that the highest achievement of a soldier is not merely to prevail in battle but to help create conditions in which future generations need not fight the same battles again. History will always remember victories won on the battlefield, but perhaps the greater legacy lies in the lives quietly transformed because conflict gave way to peace.",
    ],
    whatThisMeans:
      "He separates two things often collapsed into one: the military's role in creating security, and the political, economic, and social work required to convert that security into lasting peace. Soldiers can open the door; they can't walk everyone else through it.",
    whyItMatters:
      "\"People rarely abandon conflict merely because they have been defeated. More often, they move away from violence when they begin to see a more honourable and hopeful alternative\" — a hard-won observation from someone who spent years engaging former insurgents directly, not a theoretical claim about conflict resolution.",
    reflect:
      "In any conflict you're currently part of — at work, in a community, in a relationship — have you been focused on winning it, or on building the honourable alternative that would make continuing it unnecessary?",
  },
  {
    number: "14",
    title: "Integrity, Competence, Curiosity, Humility — and Never Losing Faith in India",
    quote: [
      "Every generation inherits a nation built through the sacrifices of those who came before it. It also inherits the responsibility of leaving that nation stronger for those who will follow. If I were to offer one piece of advice to young Indians contemplating a life of service, it would be to remember that service is not merely a profession. It is a commitment to something larger than oneself.",
      "When I joined the Army as a young man, India was a very different country. Our institutions, our economy and our strategic environment have all undergone profound transformation. Today's young Indians possess opportunities that my generation could scarcely have imagined. They have access to technology, education and global exposure on an unprecedented scale. Yet despite these changes, the qualities that define meaningful leadership remain remarkably constant.",
      "The first is integrity. Talent may open doors, but character determines how far one ultimately travels. In every profession there will be moments when convenience and principle point in different directions. Those are the moments that define a career far more than promotions or public recognition. Never compromise the values that brought you into service in the first place.",
      "The second is competence. Good intentions alone are never sufficient. Patriotism is a noble sentiment, but it must be matched by professional excellence. Whether one serves in uniform, in government, in diplomacy, in academia or in industry, the nation deserves individuals who constantly strive to improve themselves. Excellence is itself a form of national service because it strengthens the institutions upon which society depends.",
      "Third, remain intellectually curious. The world is changing at extraordinary speed. New technologies, new ideas and new geopolitical realities demand leaders who are willing to learn continuously. Do not become prisoners of yesterday's assumptions. Read widely, listen carefully and never believe that experience alone is enough. Every generation must rediscover wisdom for itself.",
      "Equally important is humility. Leadership should never be confused with status. The finest leaders I have known remained approachable despite great responsibility. They understood that every appointment is temporary and every position ultimately belongs to the institution rather than the individual. Humility protects leaders from arrogance, encourages honest advice and strengthens teamwork.",
      "Finally, never lose faith in India. Ours is an ancient civilisation and a young nation, remarkable not because we are free from challenges but because we possess the resilience to overcome them. Throughout my military career I witnessed ordinary Indians display extraordinary courage in circumstances of immense adversity. That resilience convinced me that India's greatest strength lies not merely in its geography, military capability or economic potential but in the character of its people.",
      "If young Indians dedicate their talents to strengthening our institutions, protecting our constitutional values and serving society with honesty and competence, I have no doubt that India's finest years still lie ahead.",
    ],
    whatThisMeans:
      "Asked for advice to young Indians entering any form of service, he offers five things in sequence — integrity, competence, intellectual curiosity, humility, and faith in the country itself — none of them contingent on the specific profession chosen.",
    whyItMatters:
      "\"Talent may open doors, but character determines how far one ultimately travels\" applies well outside the military or public service — it's a claim about how careers of any kind actually unfold over decades, not just at their start.",
    reflect:
      "Of his five — integrity, competence, curiosity, humility, faith in something larger than yourself — which one did you enter your own career with, and which one have you had to build since?",
  },
  {
    number: "15",
    title: "Leadership Is a Privilege of Service, Not a Privilege of Position",
    quote: [
      "This is perhaps the most difficult question because every life is ultimately interpreted by others rather than by oneself. Nevertheless, if future generations were to remember one principle from my journey, I would hope it would be this: leadership is a privilege of service, not a privilege of position.",
      "Throughout my career I occupied many appointments, each carrying different responsibilities and challenges. Yet every one of those appointments eventually came to an end. Uniforms are folded away. Offices are occupied by successors. Medals become memories. Such is the natural rhythm of every profession. What endures is not the office one held but the manner in which one discharged its responsibilities.",
      "Over the years I gradually realised that institutions matter far more than individuals. No commander, however capable, is indispensable. The true measure of leadership lies in whether an organisation becomes stronger, more confident and more resilient after one has departed. If those who come after us inherit better systems, stronger traditions and a culture of integrity, then our service has had lasting meaning.",
      "I have also come to believe that leadership is fundamentally about enabling others to succeed. Early in one's career there is a natural tendency to focus upon personal achievement. With maturity comes the recognition that genuine satisfaction arises from seeing younger officers grow into confident commanders, from witnessing institutions flourish independently and from observing ideas continue to influence long after one's own role has ended. That is the quiet satisfaction that retirement offers: the opportunity to see the next generation carry the torch further than one's own generation ever could.",
      "There is another principle that has become increasingly important to me over the years, the belief that strength and humanity are not competing values but complementary ones. A nation must possess the capability to defend itself with determination. At the same time, it must never lose sight of the values that make defence worthwhile. Military power derives its legitimacy from the just purposes it serves. Compassion gives strength its moral direction.",
      "If, many years from now, someone were to say that I tried to serve my country with integrity, treated people with fairness, strengthened the institutions entrusted to my care and never stopped learning, I would regard that as a far greater tribute than any personal distinction. Ultimately, every life is measured not by what it accumulates but by what it contributes.",
    ],
    whatThisMeans:
      "Asked what single principle he'd want future generations to remember, he chose not a specific accomplishment but a definition — leadership belongs to service, not to the position one occupies. Positions end; the manner in which their responsibilities were discharged is what endures.",
    whyItMatters:
      "\"No commander, however capable, is indispensable\" is a genuinely rare thing for someone at the top of a hierarchy to say sincerely — it shifts the measure of success from personal achievement to whether the institution is stronger, and the next generation more capable, after you've gone.",
    reflect:
      "If your current role or position ended tomorrow, what would remain — not your title, but the actual manner in which you discharged its responsibilities?",
  },
  {
    number: "16",
    title: "Purpose Is Revealed Through Thousands of Ordinary Decisions",
    quote: [
      "Perhaps the most important lesson I have learnt is that purpose is not discovered in extraordinary moments alone. More often, it is revealed through thousands of ordinary decisions made consistently over many years. We tend to remember defining events, major operations, promotions, public responsibilities and significant achievements. Yet those moments are sustained by habits developed quietly over a lifetime: honesty in small matters, discipline when no one is watching, respect for others regardless of rank, and the willingness to continue learning long after one believes he has mastered his profession.",
      "When I reflect upon my own journey, I do so with gratitude rather than nostalgia. I have been privileged to serve alongside remarkable soldiers whose courage far exceeded public recognition, to represent my country abroad, to participate in efforts that contributed to peace in regions affected by prolonged conflict, and later to continue serving through research, writing and teaching. Each phase of my life reinforced the same truth — that service to the nation does not end when one removes the uniform. It simply finds new avenues of expression.",
      "I have often been asked whether retirement creates a sense of separation from military life. My answer has always been that while one may retire from active service, one never retires from responsibility. The values instilled by the Army — discipline, integrity, respect for institutions, compassion for people and commitment to the nation — remain lifelong companions. They continue to guide one's thinking, writing and engagement with society.",
      "I also believe that leadership should never be viewed as the preserve of those in high office. Every citizen exercises leadership in some measure, within the family, the workplace, the community or the nation. Leadership begins the moment one accepts responsibility rather than waiting for someone else to act. It is expressed not only through grand decisions but through everyday conduct that strengthens trust and inspires confidence in others.",
      "As I look towards the future, I remain deeply optimistic about India. Ours is a nation of immense diversity, extraordinary talent and enduring resilience. Challenges will undoubtedly continue to arise, as they always have throughout history. Yet I have seen enough of the courage and character of our people to remain confident that India will continue to overcome adversity through unity, determination and democratic strength.",
      "If I may leave readers with one final thought, it would be this. We often spend our lives asking what we wish to achieve. As the years pass, I believe a more meaningful question emerges: What do we wish to leave behind? My answer has become increasingly simple. I hope to leave behind stronger institutions than those I inherited, younger leaders better prepared than my own generation, and a small contribution to the strategic thought of our nation through my writing and scholarship.",
      "In the final analysis, a meaningful life is not defined by the positions we occupy but by the values we uphold, the people we inspire and the causes we serve. Everything else is temporary. Service, character and purpose endure.",
    ],
    whatThisMeans:
      "His closing thought reframes leadership as available to everyone, not reserved for high office — it begins the moment someone accepts responsibility rather than waiting for someone else to act, expressed through everyday conduct as much as grand decisions.",
    whyItMatters:
      "The shift from \"What do we wish to achieve?\" to \"What do we wish to leave behind?\" is the same evolution that runs through his answer on setbacks and his answer on legacy — a career-long move away from personal accomplishment toward what outlasts the person who built it.",
    reflect:
      "If you asked yourself his final question honestly right now — what do you wish to leave behind, rather than what do you wish to achieve — would the answer change anything about how you're spending this year?",
  },
];

const allPrinciples = [...principles, ...principlesPart2, ...principlesPart3];

const takeaways = [
  {
    title: "Leadership is service before it is authority.",
    body: "People don't follow rank alone. They follow conviction, fairness, and leaders they trust — built in ordinary moments long before any crisis arrives.",
  },
  {
    title: "Context without accountability becomes excuse; process matters more than outcome.",
    body: "A leader can't guarantee success, but can control the integrity of the decision-making process and the willingness to own its consequences.",
  },
  {
    title: "Integrity is an institutional necessity, not a personal virtue.",
    body: "Organisations recover from setbacks and mistakes. They rarely recover from the erosion of trust caused by compromised integrity.",
  },
  {
    title: "Strength and compassion are not opposites requiring balance — they need integration.",
    body: "Strength without compassion becomes oppression. Compassion without strength becomes sentimentality. Each quality is meant to reinforce the others.",
  },
  {
    title: "Guard your credibility the way you guard your reputation.",
    body: "Reputation is what others think of you. Credibility is whether your conduct consistently justifies their confidence. Only one of them is the true foundation.",
  },
  {
    title: "Purpose is revealed through thousands of ordinary decisions.",
    body: "Not extraordinary moments alone, but honesty in small matters, discipline when no one is watching, and respect for others regardless of rank.",
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
        / Lt General Shokin Chauhan
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/shokin-portrait.jpg"
            alt="Lt General Shokin Chauhan, PVSM, AVSM, YSM, SM, VSM"
            width={880}
            height={875}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Lt General Shokin Chauhan, PVSM, AVSM, YSM, SM, VSM (Retd.) · Indian Army
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 006
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Lt General Shokin <em>Chauhan</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Leadership Is a Privilege of Service, Not of Position
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Nearly four decades in uniform · Siachen, Jammu &amp; Kashmir, North East &amp; the
          Assam Rifles · Defence Attaché to Nepal · Chairman, Ceasefire Monitoring Group, Nagaland
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;Leadership is an act of service before it is an exercise of authority.&rdquo;
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
          <p className="font-medium">32 minutes</p>
        </div>
        <div>
          <p className="text-neutral-400">Principles</p>
          <p className="font-medium">16 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">July 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {[
          "Indian Army Veteran",
          "Peace & Ceasefire Negotiator",
          "Author & Strategic Scholar",
          "Former Defence Attaché",
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
        <p className="text-xs uppercase tracking-wide text-neutral-400">About this feature</p>
        <blockquote className="mt-4 border-l-2 border-neutral-300 pl-4 text-lg italic text-neutral-700">
          &ldquo;We asked Lt General Shokin Chauhan sixteen questions. He gave us nearly four
          decades of answers.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Lt General Shokin Chauhan, PVSM, AVSM, YSM, SM, VSM, entered the National Defence
          Academy in January 1976 and served for nearly four decades across some of the Indian
          Army&apos;s most demanding commands — the Siachen Glacier, counter-terrorist operations
          in Jammu &amp; Kashmir, counter-insurgency in the North East, and command of the Assam
          Rifles. He later served as India&apos;s Defence Attaché to Nepal and as Chairman of the
          Ceasefire Monitoring Group in Nagaland. In retirement, he continues to serve through
          research, writing, and teaching.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what he stands for, stated publicly, in
          his own words, presented here in full. This is how <em>Stated Principles</em> works: the
          person states their beliefs. We make them visible. You decide what to carry forward. Given
          the length of this feature, we&apos;ve placed his own words in pull-quotes at intervals
          throughout — so the most important lines aren&apos;t lost inside a long read.
        </p>
      </section>

      {/* Principles 1-5 */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Sixteen principles · Stated by Lt General Shokin Chauhan
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What he stands for — in his own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 16</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Lt General Shokin Chauhan, stated directly
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
          &ldquo;Trust is not built during battles;
          <br />
          <em>it is built during routine interactions</em>
          <br />
          long before the battle begins.&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Lt General Shokin Chauhan — Principle I, Stated
        </p>
      </section>

      {/* Principles 6-10 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart2.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 16</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Lt General Shokin Chauhan, stated directly
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
          &ldquo;Strength without compassion becomes oppression.
          <br />
          <em>Compassion without strength becomes sentimentality.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Lt General Shokin Chauhan — Principle IX, Stated
        </p>
      </section>

      {/* Principles 11-16 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart3.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 16</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Lt General Shokin Chauhan, stated directly
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
          &ldquo;What do we wish to leave behind?&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Lt General Shokin Chauhan — Principle XVI, Stated
        </p>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-xs uppercase tracking-wide text-neutral-400">Key takeaways</p>
        <h2 className="mt-3 text-3xl font-serif">Six ideas worth carrying forward</h2>

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
          Post a commitment inspired by Lt General Shokin Chauhan&apos;s principles. State it
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
        <p className="mt-4 text-sm text-neutral-500">32 min read · 16 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-3xl px-6 py-10 text-xs text-neutral-400">
        <div className="flex flex-wrap gap-4">
          <Link href="/">Home</Link>
          <a href="https://stated.in/privacy">Privacy Policy</a>
          <a href="https://stated.in/terms">Terms of Service</a>
          <a href="https://stated.in/refund">Refund Policy</a>
        </div>
        <p className="mt-4">© 2026 Stated • Built in India for the World</p>
      </footer>
    </main>
  );
}
