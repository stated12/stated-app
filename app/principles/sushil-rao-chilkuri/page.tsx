import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "sushil-rao-chilkuri";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Sushil Rao Chilkuri — You Are the Voice of the People";
const DESCRIPTION =
  "Only print is final. You cannot undo print. Twenty principles from 38 years in journalism, from cub reporter to Editor, Special Reports, The Times of India.";
const IMAGE = "https://app.stated.in/sushilrao-portrait.jpg";

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
    images: [{ url: IMAGE, width: 1000, height: 1000, alt: "Sushil Rao Chilkuri" }],
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
    title: "Deadlines. Accuracy. Relevance. Truthful. Unbiased.",
    quote: [
      "I was in Class VI when I developed an interest in becoming a journalist. That is the profession I consciously chose. Had I even met a journalist when I was just 10 years old and made up my mind? No. Did I happen to go to any newspaper office? No. Perhaps the fact that I read the newspaper every day could have been one reason. I loved the profession because it presented me with the opportunity to write reality. Not fiction. When I realised my dream, I was 20 years old. And in 2026, I completed 38 years in journalism. I did nothing else but journalism.",
      "The real challenge began in 1988 when I joined an evening newspaper called Citizen's Evening. The hard reality was that it was working against time. Gathering information from the right sources. Developing credible sources. Speed was the name of the game. And there could be no compromise on accuracy.",
      "Deadlines. Accuracy. Deadlines. Accuracy. Relevance. Deadlines. Accuracy. Relevance. Truthful. Deadlines. Accuracy. Relevance. Truthful. Unbiased. These words were part of everyday life. They have always been. They always will be. They have to be. Whether it was journalism in 1988, when I started off as a cub reporter, or my stint as Editor, Special Reports, The Times of India, Hyderabad, from where I retired in January 2026, there was no compromise on the principles and ethics of journalism.",
      "To me, professional ethics and personal principles were both one and the same. I did not have to lead a double life.",
      "That picture of a well-meaning journalist, reporting facts, engaging in healthy criticism and questioning wrongdoings must remain. That breed cannot be wished away. When I joined journalism in 1988, I knew the very basic purpose of journalism was to inform. Be unbiased. Today, in 2026, after having been in journalism for 38 years, the reason why journalism should exist is the same: to inform; to be unbiased; and to educate.",
    ],
    whatThisMeans:
      "He traces a single, unbroken definition of journalism from a Class VI ambition through 38 years and a retirement as Editor, Special Reports at The Times of India. The list of words he repeats, deadlines, accuracy, relevance, truthful, unbiased, isn't decoration. It's the same standard applied without variation across four decades.",
    whyItMatters:
      "\"Professional ethics and personal principles were both one and the same. I did not have to lead a double life\" is a rare thing to be able to say honestly about a long career. The absence of a gap between the two is presented as something earned, not assumed.",
    reflect:
      "Is there a gap between your professional conduct and your personal principles that you've stopped noticing because you've lived with it so long?",
  },
  {
    number: "02",
    title: "A Story Is Not Complete Without All Versions in It",
    quote: [
      "Studying journalism at university opened up my mind to one big and most important thing: a story is not complete without having all versions in it. In the first lesson on Reporting, the basics are introduced, the \"5Ws and one H\": What, When, Who, Where, Why and How. Getting information is easy. Understanding that not all information is necessary or useful to the reader is difficult. We are accountable to the readers. Their time is precious. Valuable.",
      "I remember one day the telephone rang. The caller started abusing me and threatening me. I understood why. I had written a news report about a school functioning from dilapidated premises. I had checked out all the rooms. This was during the monsoon. I noticed that the old structure could most certainly give way, endangering the lives of students. My report was based on facts. It was written so that remedial measures would be taken. Working on a news report, reporting facts with good intention, attracted something I had not expected. Verbal abuse. I knew that it was this brand of journalism that mattered, something that mattered to the public, even if it put off some people.",
      "Not long after, I worked on another report about how drugs were being palmed off as samosas near educational institutions. The intent was not just about gathering information. It was about gathering the right information for something to be set right in society. The purpose mattered.",
    ],
    whatThisMeans:
      "His first lesson in journalism school wasn't about writing style, it was about completeness: a story isn't finished until every version of events is in it. The harder skill he names isn't gathering information, which is easy, but knowing what's actually useful to the reader.",
    whyItMatters:
      "The two stories he chose, the dilapidated school and the samosa-drugs report, share the same underlying test: he wasn't reporting information for its own sake, he was reporting it so something would be acted on before harm occurred. The verbal abuse that followed was proof the reporting had landed where it needed to.",
    reflect:
      "In your own work, do you gather information because it's easy to find, or because it's genuinely useful to the person who needs it?",
  },
  {
    number: "03",
    title: "The Purpose Mattered, Not Just the Information",
    quote: [
      "Imagine a 16-year-old girl living in a mud house with no door except a small window. I could not imagine this. I went to the village in Mahbubnagar district on this story in 1996. No one directed me to. No one asked me to. Yet it was the calling of journalism that beckoned me.",
      "I reached the village. The parents said it was the girl's wish. I asked to be allowed to speak to the girl through the small opening in the wall. \"We cannot allow that,\" they said. I insisted. They did not give in. What I really wanted to confirm was whether the girl was indeed inside that room. They agreed to an arrangement: they would call out to her by name, she would come near the opening and respond, and I would not ask her anything. I heard the girl's voice. A feeble voice.",
      "Someone hinted at a possible angle. The needle of suspicion pointed to a relative, her brother-in-law, who lived in Bombay. His plan was to make the girl a living deity. The room that was built was to be the temple, and she was to be the presiding deity. Visitors would have to make an offering, and a box had been arranged for that purpose.",
      "My eyes were opened to this exploitation only because I spent more time there, trying to understand why this unusual thing was happening. I returned to Hyderabad. I wrote a news report based exactly on what I heard and saw for myself. The administration quickly swung into action when they saw my report. They went to the village. The girl was set free from what had become a bondage and a crime perpetrated on her by a relative.",
    ],
    whatThisMeans:
      "No one assigned him this story. He went because something didn't add up, and stayed long enough at the scene to move past the family's version to the actual explanation underneath. The girl's freedom followed directly from that persistence.",
    whyItMatters:
      "The one condition he accepted, that he could confirm her presence but not question her directly, shows a journalist working within real constraints rather than forcing his way to a story. Restraint and persistence operated together, not against each other.",
    reflect:
      "What's a situation you've walked past because the explanation you were given, even an unsatisfying one, was easier to accept than staying to find out more?",
  },
  {
    number: "04",
    title: "The Clatter of the Typewriter Was Music to My Ears",
    quote: [
      "The clatter of the typewriter. It is music to my ears. Always was. During the early 1980s, I had learnt typewriting. So, in 1988, when I started working as a journalist, you can understand why the sound was music to my ears. I would describe my use of the typewriter as an affair with the typewriter. It was not just a machine. It was a means by which I was communicating.",
      "There were telephones, but not everyone could own a phone. Reporters in the districts would write their copies on a sheet of paper and hand them over to RTC bus drivers at the depot. The drivers, after reaching Hyderabad, would drop them in boxes that each newspaper had put up at the bus stations. An office boy would go and collect the 'despatches' at least twice a day. Then came fax. Then landlines and dictation. Then mobile phones, a revolution. And then the internet and smartphones and the many apps. Communication now happens in a second.",
      "The 'dark room' was my favourite haunt. I would see the images emerge on the photo paper as the photographers 'developed' the roll. Sometimes we would stare at a blank sheet of paper as the roll would have got overexposed. \"Do not waste the film roll. Use it judiciously,\" was the advice given to photographers.",
      "Technology has turned everyone into an unofficial reporter. They see something. Film it. Spread it on social media. What is circulated may or may not be a fact, but technology facilitates such a transfer of information in real time. The professional reporter, however, retains his place in the world of journalism. He cannot go wrong. Should not go wrong with the information that he publishes because he is a professional journalist.",
      "Everything has changed for the better. The core values and principles of professional journalism will have to remain the same: to give authentic news.",
    ],
    whatThisMeans:
      "His account of the transition from typewriter to bus-driver despatches to fax to mobile phones to smartphones isn't nostalgia for its own sake. Each stage he lists changed how fast information could travel, while the standard for what counted as reliable information stayed exactly where it started.",
    whyItMatters:
      "\"Technology has turned everyone into an unofficial reporter\" and \"the professional reporter, however, retains his place\" hold two things at once: democratized information tools are a genuine change, but they don't remove the specific responsibility that comes with the title of journalist.",
    reflect:
      "As the tools in your own field have gotten faster and more accessible to everyone, has your personal standard for accuracy kept pace, or quietly loosened along with the ease of publishing?",
  },
  {
    number: "05",
    title: "Only Print Is Final. You Cannot Undo Print.",
    quote: [
      "During the early years of the internet in India, 1997 to 1998, I wrote for a news website. I myself had no access to the internet, but the office did. The people I interviewed had never heard of the internet and could not imagine how an interview could be accessed there. There was hardly any access to the internet. And then the bubble burst. They poked fun at websites. They described dot-coms as \"dot-cons\". That was for a while, until websites staged a comeback and stayed forever.",
      "When private television was introduced, I was one of the first ones to do some reports for TV. But I could not watch myself on TV because there was no cable connection yet in the area where I lived. Around 1996 to 1997, TV became accessible and they called it the \"idiot box\". Now there are hundreds of channels which are accessible.",
      "There is a competition between television channels over breaking news. Sometimes this gives rise to misreporting. Corrections are done when the picture becomes clearer. Despite all its advantages, digital cannot be said to be completely reliable, for the very simple reason that the same \"I was first\" competition arises there too.",
      "Only print is final. When a news report is published in print, it means that much effort went into verifying anything that is published. You can delete or remove something from the internet. You can stop a news report from being telecast on TV. In print, what is published is final and stays. You cannot undo print. It is for the record. It is the record.",
      "If any media, any type of media, can shed its \"me first\", \"me too first\", \"only me\" or \"only me first\" mentality and take enough time to see that due diligence is done when publishing a news item, there will not be a situation where the organisation or individual has to cut a sorry figure. Let media be what it should be. Trustworthy. Reliable.",
    ],
    whatThisMeans:
      "Having personally worked through the mockery of early websites (\"dot-cons\"), the novelty of the \"idiot box\", and the arrival of digital speed, he identifies the one discipline that outlasts every format: print's permanence forced a level of verification that faster media never had to earn.",
    whyItMatters:
      "\"You cannot undo print\" isn't nostalgia for a slower medium. It's an argument that irreversibility itself is what disciplined the verification process, and that digital's ability to quietly correct or delete has removed a check that used to be structural, not optional.",
    reflect:
      "If everything you published or said today were as permanent and unretractable as print once was, would you check it more carefully before putting it out?",
  },
];

const principlesPart2 = [
  {
    number: "06",
    title: "Finding the Interesting in What Matters Is What Matters",
    quote: [
      "A rooster was put in a police lock-up. This happened in 2021 in Jagtial district, Telangana. During the Sankranti festival, cockfights are organised. For one cockfight, the owner of a rooster tied a sharp, three-inch knife to its legs. An onlooker was severely injured and died. The rooster was caught and put in the lock-up as evidence. On the face of it, this is an amusing piece of information. But for the police, it was a job to be done. A case had to be investigated the way it had to be.",
      "All stories that matter make it into the news columns. What matters need not be interesting. It can simply be dry. Or informative. That serves the purpose it is meant to.",
      "Let me mention another case. During the lockdown in 2020, a woman from Kamareddy went on her two-wheeler to Ongole to bring back her son, who had gone there to visit the place. She travelled 1,400 kilometres on the journey there and back so that her son could return home. This revealed several aspects of her personality. She was not scared to drive alone during the day and night. It was the lockdown period, but she had to get her son back.",
      "Did this story matter simply as information? It should not matter to the general public or readers. It is the interesting part that matters. Her resolve. And her determination. Finding the interesting in what matters, or should matter, is what matters.",
    ],
    whatThisMeans:
      "He places two very different stories side by side, a rooster in a police lock-up and a mother's 1,400-kilometre motorcycle journey, to make the same point from opposite directions: raw information alone rarely matters, but the human resolve or absurdity underneath it does.",
    whyItMatters:
      "\"Finding the interesting in what matters, or should matter, is what matters\" is a genuinely useful editorial principle stated plainly: it's not about choosing between important and interesting stories, it's about locating what's interesting inside the ones that matter.",
    reflect:
      "In your own work or writing, are you presenting information as merely important, or have you found the interesting thread inside it that would actually make someone care?",
  },
  {
    number: "07",
    title: "A Journalist Who Has a Nose for News Should Keep Sniffing",
    quote: [
      "Russia invaded Ukraine. Two countries distant from India were at war. Why then would Russia and Ukraine even appear on my radar? Curiosity got the better of me when I came to understand that some Indian youth were among those fighting in Ukraine, on behalf of Russia. Why would this happen? I felt there was more to it than met the eye.",
      "Initially, I assumed the Indian youth were part of a private army. I investigated further. Probed deep. This is when I found that these youth were actually drafted into the Russian army officially, recruited through private persons publicising online the opportunity, with the promise of many benefits. Those acting as recruiters took money from the applicants to facilitate their recruitment. All such recruited persons were sent to the border to fight Ukraine. Their lives were at risk. Some died.",
      "Eventually, the Government of India had talks with the Russian government, and many such Indians recruited into the Russian army were relieved of their duties and sent back home. This is not to say that this was a result of the news reports that only I wrote. But substantial evidence of how it was all happening appeared in my news reports.",
      "I followed an instinct that told me something was going wrong. The sniffing continued. A journalist who has a nose for news should be able to pick up a scent and continue sniffing to unearth a hidden truth. Sometimes it may be a false alarm, but the important thing is to pick up a scent.",
    ],
    whatThisMeans:
      "A story about a distant war became a local story about Hyderabad youth because he refused to accept the first, simpler explanation, a private army, and kept investigating until he found the actual recruitment pipeline putting lives at risk.",
    whyItMatters:
      "He's careful to attribute the eventual government intervention only partially to his reporting, \"not to say that this was a result of the news reports that only I wrote,\" a small but real act of not overclaiming impact.",
    reflect:
      "Is there an instinct you've had recently that something didn't add up, that you let go rather than kept sniffing?",
  },
  {
    number: "08",
    title: "Peace Was a Priority",
    quote: [
      "As much as it is a professional duty to give readers a complete picture of news developments, sometimes the decision may be not to publish something. I will not call it suppressing any information, but a decision has to be taken on what purpose that information, if given, would serve. These judgements mainly have to be made when dealing with news reports where there are communal clashes.",
      "I understood this myself during the early years of the 1990s. Former Prime Minister V. P. Singh, before he became Prime Minister, visited Hyderabad to visit some areas where a curfew had been imposed. Accompanying him, I learnt much about what had been happening there. When writing the news report, I asked myself: if I write this, even though it is only quoting people as having said that, will it contribute to restoring peace or create an even more disturbing situation?",
      "I left unwritten many of the things that I had learnt. Peace was a priority. Feeling and being responsible was what was needed. The decision not to write anything that would aggravate the situation was taken. So no one got to know what I had got to know and what I was not writing.",
    ],
    whatThisMeans:
      "He distinguishes carefully between suppressing information and exercising judgement about what publishing it would actually accomplish. The question he asked himself, would this restore peace or worsen the situation, was the actual editorial standard, not simply whether the information was true.",
    whyItMatters:
      "Choosing to leave things unwritten during active communal tension, and never revealing what those things were, shows restraint that never gets public credit. No one but him knows what wasn't published, which is precisely the point.",
    reflect:
      "Has there been a time you had true information that, if shared, would have served your own credibility more than it would have served the people around you? What did you do with it?",
  },
  {
    number: "09",
    title: "Having Something to Publish Is Not, by Itself, a Reason to Publish It",
    quote: [
      "This was in the early 2000s. A man had got into the tiger enclosure in the Nehru Zoological Park in Hyderabad. In the morning, the zoo staff found the carcass of the tiger, its skin removed. It was a mysterious case.",
      "The editorial decision that had to be taken was whether a photograph of the carcass, with its skin removed, should be published. All the other newspapers too had access to the same photograph. If we did not have it, it would be considered a \"miss\".",
      "My viewpoint was that we should publish it. I did not want my newspaper to look like we had missed something the others had. I understood the reasoning behind the editorial decision not to publish it. The photograph would only serve the purpose of putting off the reader. There was no need to convince the reader that the act had taken place. The officials said it. There was no denying the fact.",
      "Having something to publish is not, by itself, a reason to publish it.",
    ],
    whatThisMeans:
      "He states his own disagreement plainly, he wanted to publish the photograph, and lost that argument, then explains exactly why the decision that overruled him was right: the image would have served shock value alone, since the facts were already established without needing visual proof.",
    whyItMatters:
      "Including his own losing position, rather than presenting the final call as obviously his own wisdom from the start, is a more honest account of how editorial judgement actually develops, through disagreement, not certainty.",
    reflect:
      "Have you ever pushed for something you had every right to say or publish, and later come to agree that the restraint someone else argued for was the better call?",
  },
  {
    number: "10",
    title: "Listening to a Person, Not Just Hearing an Answer",
    quote: [
      "A. P. J. Abdul Kalam and I were at a reception hosted by the visiting President of India at Rashtrapati Nilayam in Secunderabad in 1989. Hardly anyone knew who Kalam was then. I recognised the well-known defence scientist he was, but that was not the time or occasion for an interview.",
      "Years later, after he had stepped down as Chief Scientific Adviser to the Prime Minister, I got to sit down with him for a chat. In 2002, at a school in Hyderabad, he told me why he asked children the same question wherever he went: \"What do you want to become?\" \"I ask them that question so that they start thinking,\" he told me. So I asked him the same question. His dream, he told me, was to reach and talk to children across the country. Within a couple of weeks of our conversation, he was called for a higher national duty. He became the President of India.",
      "Interviewing someone means you have to hear him without interrupting him. It also means listening to him by paying attention to what he may actually be wanting to convey, and asking whether they would like to say something if I had not asked a question they were expecting.",
      "At Raj Bhavan during the Dalai Lama's visit to Hyderabad in the early 1990s, I did an interview just standing with him in the corridor. If a little time is what you get, you make the best use of it by going prepared.",
      "I once interviewed former Union Minister George Fernandes. \"It is my nap time. You have come late,\" he told me. \"You can still take a nap, sir,\" I told him. \"You can close your eyes and give me the answers,\" I said. That interview was done with George Fernandes with his eyes shut!",
      "Interviewing a person also means really understanding a person rather than merely going by his words. For all you know, he may not have found the right word to express himself, but when publishing the interview, the person's views and opinions have to be conveyed in the right context, even if they had not used the right word to express themselves.",
    ],
    whatThisMeans:
      "The Kalam interview shows the value of restraint, waiting years for the right moment rather than forcing an interview at a reception, while the George Fernandes story shows the opposite instinct, adapting instantly to interview a minister with his eyes closed rather than losing the opportunity entirely.",
    whyItMatters:
      "Understanding a person rather than merely going by his words, and conveying their meaning accurately even when they didn't find the exact right word, is a higher and more difficult standard of accuracy than simple transcription. It requires genuine listening, not just recording.",
    reflect:
      "In your last real conversation with someone, were you listening for what they meant, or just waiting to record what they literally said?",
  },
];

const principlesPart3 = [
  {
    number: "11",
    title: "I Had to Respect That",
    quote: [
      "A heroine from Mumbai got assaulted by a Telugu film producer and actor in Hyderabad, in broad daylight, in front of everyone. She was pulled by the hair and dragged in a film studio. The next day, no publication had the news report. Only I wrote it.",
      "I waited until evening. When she landed in Mumbai, I called her. She gave me a blow-by-blow account. I asked why she did not lodge a police complaint. She said the producer was \"powerful\" in the film industry and had threatened her career. She had a request: \"You seem to know everything and I have also confirmed the incident to you. But please do not write it in the newspaper.\"",
      "I called the producer. \"We are not interested in giving our version. You write whatever you want to. We will then decide what we want to do,\" the person who answered told me.",
      "Neither the victim nor the alleged culprit wanted to talk about the incident publicly. A journalist does not take sides. Every effort is made to take the versions of everyone involved, if that is possible.",
      "I went ahead and wrote the news report. Caution had to be exercised. I did not take the name of the victim or the alleged culprit. I reported just the incident. No names were mentioned. The place where it happened was not mentioned. I believed to some extent that it served a purpose. Even if names were not mentioned, this was on record that this had happened.",
    ],
    whatThisMeans:
      "Faced with a victim who confirmed the incident but explicitly asked him not to write it, and an alleged perpetrator who declined to engage at all, he found a third path that neither party had offered him: reporting that the incident occurred, in full, without naming anyone.",
    whyItMatters:
      "\"I had to respect that\" is a small phrase carrying real professional cost, he had a confirmed, exclusive account and chose not to use the details that would have made it a bigger story, because the source had asked him directly not to.",
    reflect:
      "Have you ever had information you were technically free to use, but chose not to because someone directly asked you not to, even though it would have cost you something?",
  },
  {
    number: "12",
    title: "I Should Not Have Been Rash With Manmohan Singh",
    quote: [
      "I should not have been rash with Manmohan Singh. I regretted it. I told him as much. He was kind to understand.",
      "In the early 1990s, when Manmohan Singh was Union Finance Minister, I learnt he was visiting Hyderabad and staying at the Lake View Guest House. I made several calls to the staff to speak to him before he left for a meeting, but they politely informed me he had not yet come. When I called again, the person at the other end appeared to disconnect the phone, but had not.",
      "\"Put me to Manmohan Singh,\" I asked. \"Who is speaking?\" the person asked. I repeated myself, my voice becoming more impatient, rash and brash, because I thought the staff were not facilitating the call at just the right time. It happened a third time.",
      "\"I am Manmohan Singh speaking,\" the person at the other end said.",
      "I felt bad that my voice had been harsh. The staff had actually immediately connected me because they knew it was I who was calling. Manmohan Singh explained he had come to attend a meeting and would not be able to meet me, and regretted it. Manmohan Singh later went on to serve as India's Prime Minister for two terms. The politeness with which he spoke made me realise that, despite the pressure I was subjecting myself to, I should not lose control of myself in the way I spoke.",
    ],
    whatThisMeans:
      "He offers a story where he was in the wrong, not a colleague or a source, and tells it without softening his own impatience. The person on the other end of a frustrating phone call turned out to be the Finance Minister himself, and his brashness became something he had to own directly.",
    whyItMatters:
      "That he told Manmohan Singh he regretted it, and that Singh's grace in response is what stayed with him, shows the lesson wasn't really about journalism at all. It was about how pressure can make a person lose control of their own conduct, regardless of profession.",
    reflect:
      "When was the last time pressure made you lose control of how you spoke to someone, and did you actually go back and acknowledge it the way he did?",
  },
  {
    number: "13",
    title: "My Most Embarrassing Mistake",
    quote: [
      "\"Aashiqui\", starring Rahul Roy and Anu Agarwal, was released in 1990. I was impressed with Kumar Sanu's voice. A few years later, Kumar Sanu came to perform in Hyderabad. I planned to interview him, found out which hotel they were staying in, and went there in the morning. The receptionist called up a room and told me I could see him in half an hour.",
      "I was called in. I began my questions. He looked a bit lost. I followed up. He did not seem to understand. I asked a third question: \"Why did you sing only a few songs last night? Most of the songs were sung by Sudesh Bhosle.\"",
      "\"Do you know who you are speaking with?\" he asked me. \"It is you. And I have come to meet you,\" I answered. \"My name is not Kumar Sanu. My name is Sudesh Bhosle,\" he said. \"Kumar Sanu is in the next room.\"",
      "How could I not have recognised that I was not speaking with Kumar Sanu? It was embarrassing. Very embarrassing. I do not know how the receptionist got the room number wrong, but even if it was her mistake, I should have at least been able to recognise the person I went to interview.",
      "Eventually, I did interview Kumar Sanu. But I should not have been so blinded as not to recognise Sudesh Bhosle and take it for granted that I was talking to Kumar Sanu.",
    ],
    whatThisMeans:
      "He tells a genuinely embarrassing story on himself without any attempt to make it flattering, spending twenty minutes interviewing the wrong singer entirely, and doesn't blame the receptionist's error as the real cause. He owns the failure to verify who was actually in front of him.",
    whyItMatters:
      "This is the plainest possible illustration of a principle that runs through the whole feature, verification before assumption, applied here to something as basic as recognizing the person you're actually speaking with.",
    reflect:
      "What's a small assumption you've recently taken for granted without verifying, the way he assumed the man in the hotel room was who the receptionist said he was?",
  },
  {
    number: "14",
    title: "If I Could Not Trust Him, I Should Not Rely on Him",
    quote: [
      "I sat in front of Central Prison, Chanchalguda, and made a note of the names of all visitors paying a visit to a VVIP prisoner. In the previous days, I would call up one official I trusted and ask who had come to meet the VVIP. He would always say no one.",
      "On this occasion, I trusted him again. To my shock, the other newspapers reported who all had been allowed into the jail. The official I had believed, I felt, had let me down. For this reason, I went and sat in front of the jail building. From morning till evening, I counted the number of people being allowed to visit. I even went and spoke to some of them. I did not contact the official on whom I had relied. I wrote in the newspaper what I saw.",
      "I got a call from him. \"I did not expect you to do that,\" he said. \"I expected you to give me information and I trusted you,\" I told him. \"You should not have done that,\" he said. \"It was my duty,\" I replied.",
      "Let us say that he simply did not give me the correct information. I relied not on him but verified my information on the ground. There was never a time that I spoke with the official again. If I could not trust him, I should not rely on him. The hot sun took a toll on me, and I continued to sit in front of the jail for several days to get my facts right. I fell sick. I was even hospitalised.",
    ],
    whatThisMeans:
      "When a trusted source's information turned out to be wrong, whether by design or not, his response wasn't to complain louder or find a new source to trust blindly. It was to go verify the facts himself, in person, for as many days as it took, at real physical cost to his own health.",
    whyItMatters:
      "He deliberately declines to accuse the official of deceiving him, \"misled would not be an appropriate word, as that would mean I was attributing motives\", holding back from a conclusion the facts didn't fully support, even while ending the working relationship entirely.",
    reflect:
      "When a source of information let you down, did you go verify things yourself at real cost, or did you just find a different source to trust just as blindly?",
  },
  {
    number: "15",
    title: "It Is Enough If One Is a Responsible Journalist",
    quote: [
      "It is not necessary to have courage. Are we going to battle? There is no need to sound courageous or fearless. In simple words, journalism is about highlighting people's issues. Everything one wants to say can be said using temperate language.",
      "One of my reports was interpreted as mudslinging. I had written a series of reports on an issue, and for one report, the aggrieved party went to court. I admitted to the court that I had indeed written the news report. The court took a view that the evidence I had put forth was not substantial. The headline, especially, was objectionable. As a matter of fact, even I felt so, but there was no point telling the court that a headline is not given by the reporter but by a sub-editor. I approached a higher court, challenging the judgment. The court upheld the judgment and still found me guilty, but said there was no need for the jail punishment imposed by the lower court.",
      "I would not describe myself as a 'fearless journalist' or a 'fearless writer'. It is enough if one is a responsible journalist. The words 'fearless' and 'brave' are best suited for soldiers who go to war.",
      "In another instance, I just had to make up my mind to report a news development, even though someone I knew very well would be upset about it. It is not being fearless; it is doing a job, a duty, and being responsible as a journalist.",
    ],
    whatThisMeans:
      "He includes a real court case he lost, admitting the headline was objectionable even in his own view, rather than only telling stories where his judgement was vindicated. Courage, in his account, doesn't require every decision to have been the right one.",
    whyItMatters:
      "Rejecting the labels \"fearless\" and \"brave\" for journalism, and reserving those words for soldiers, is a deliberate act of proportion. It refuses to inflate the risk of his own profession by borrowing language that belongs to people risking their lives.",
    reflect:
      "Is there language you use to describe your own work that actually belongs to a much higher-stakes profession than yours?",
  },
];

const principlesPart4 = [
  {
    number: "16",
    title: "Accuracy Should Determine the Pace of Journalism, Not the Competition",
    quote: [
      "A journalist who is accountable to his organisation and who professes to be a professional should go about his job following all the principles of journalism. Publish news that is properly verified. It takes time to verify information, and it should be understood that a journalist is taking that time to get his facts right.",
      "The question really is: when others seem to have got those facts and have already made them public, does one still need to take time until a complete and thorough verification is done? In the digital age, one may be pushed to first publish the information, even if it is half-baked. Somebody else's speed should not determine your own pace.",
      "Something can be understood as misinformation when someone shares it in the public domain, feeling or believing that it is true, without taking responsibility for it. Well-established news organisations largely adhere to verification, and these should be trusted rather than information shared by outlets that would rather be 'me first' in the game and later retract their report. Accuracy should determine the pace of journalism, not the competition.",
    ],
    whatThisMeans:
      "He directly names the exact pressure that erodes verification standards, watching competitors publish first, and states plainly that this pressure should have no bearing on your own process. The standard is internal, not relative to what everyone else is doing.",
    whyItMatters:
      "\"Somebody else's speed should not determine your own pace\" applies well beyond journalism, to any field where competitive urgency tempts people to cut the verification step that actually protects their credibility.",
    reflect:
      "Where in your own work have you let someone else's speed set your pace, at the cost of the verification or care you'd normally apply?",
  },
  {
    number: "17",
    title: "AI Should Help Me Get My Journalism Right, Not Take Responsibility for Getting It Right",
    quote: [
      "AI can produce false information. It cooks up information, gets things out of context, imagines things and conjures up so-called facts. Everything that AI can do reliably and to the fullest satisfaction should be something we make use of. It saves a lot of time.",
      "AI cannot go out there as a person to have conversations with people to gather ground truth and facts. The reporter will still need to go out there in the field, be on the spot, and do the reporting. AI is still not fully reliable in providing context. Relying completely on AI even for preparing background material, at this stage, is not advisable.",
      "I particularly like the fact that AI presenters can be used for news presentation. It is getting better and better. I have noticed that even for translation, we have not arrived at a point where we can say that AI can translate a news report as it is meant to.",
      "By all means, for every purpose possible, making use of AI is good, but it should be used as an assistant to deliver what exactly one wants. A journalist or the media should capture reality as it is. And only the media person can do that.",
      "The one good thing about AI, like ChatGPT, is that it does not hesitate to apologise if it is pointed out that it has made a mistake. But then, the human or the journalist should know what the mistake is and point it out. AI should help me get my journalism right, not take responsibility for getting it right.",
    ],
    whatThisMeans:
      "Speaking from actual experimentation rather than assumption, he draws a precise line: AI is genuinely useful for grammar correction, presentation, and saving time, but cannot replace the reporter's physical presence needed to gather ground truth from actual people.",
    whyItMatters:
      "\"AI should help me get my journalism right, not take responsibility for getting it right\" is a clean division of labor that keeps accountability exactly where it belongs, with the human who knows enough to recognize a mistake when AI makes one.",
    reflect:
      "In your own use of AI tools, are you still the one who catches the mistakes, or have you started trusting the output enough that you might not notice if it were wrong?",
  },
  {
    number: "18",
    title: "You Are Answerable to Your Conscience",
    quote: [
      "In the biblical book of Exodus, the first verse of chapter 23 says: \"You shall not spread a false report; you shall not join hands with a wicked man to be a malicious witness.\" In other words, stick to the truth. Stay with the facts. If you do not know, do not jump to false conclusions. And most importantly, do not allow yourself to be used by someone who has malicious intentions in getting some news published.",
      "My first and only choice was journalism. Some who may stray into journalism as a means to an end may not quite understand why the basic principle is important. You are answerable to your conscience.",
      "Leviticus 19:16 reads: \"You shall not go about as a slanderer among your people; and you are not to jeopardize the life of your neighbor.\" Proverbs 20:19 reads: \"He who goes about as a slanderer reveals secrets; therefore, do not associate with a gossip.\"",
      "It is ultimately not your writing skills. Not your ability to be adept at gathering information. Every skill and talent is needed, but there can be no compromise on the genuine calling to be a journalist.",
    ],
    whatThisMeans:
      "Asked what a 20-year-old entering journalism today should learn that he didn't need to, he reaches past technique entirely and into scripture, because the thing he wants to protect isn't a skill that changes with the times. It's a conscience-level commitment that doesn't.",
    whyItMatters:
      "Placing \"you are answerable to your conscience\" above writing skill and information-gathering ability reorders what actually matters most in the profession, character before craft, in a field where craft is usually what gets taught first.",
    reflect:
      "If you strip away the technical skills of your own profession, what's the conscience-level commitment underneath that no amount of skill could substitute for?",
  },
  {
    number: "19",
    title: "Do Nothing by Which You Will Be Taken for Granted",
    quote: [
      "Presidents, prime ministers, chief ministers, royalty, film stars, sports heroes, business tycoons, Nobel laureates, scientists, judges, police officers, ambassadors, and everyone whom we know to be a celebrity or an esteemed person in society, I have met them all.",
      "At every such meeting, I told myself over and over again that it is because of the job that I do that I happen to be meeting them. I made sure that, at every interaction, it played out in the back of my mind that we are all interacting at a professional level. Yes, sometimes one could breach the professional barrier and have interactions on a personal level, but remember always not to succumb to the temptation that information shared at a personal level should be used for professional purposes.",
      "People should trust you enough to talk about certain things \"off the record\" and be comfortable that you will not write what they said and that you will not talk about these things elsewhere. This is building credibility. Do not take a professional relationship for granted and, as a journalist, do nothing by which you will be taken for granted.",
    ],
    whatThisMeans:
      "Meeting presidents, prime ministers, and celebrities across decades didn't lead him to treat access as a personal privilege. He held onto a clear line between the professional relationship that gave him that access and the personal trust some of those relationships eventually earned.",
    whyItMatters:
      "The specific discipline he names, never using something shared off the record or at a personal level for professional gain, is the actual mechanism by which credibility gets built over a career, not a single dramatic scoop but a long pattern of restraint.",
    reflect:
      "Has access or trust ever been extended to you personally that you were tempted to use professionally? What did you do with that temptation?",
  },
  {
    number: "20",
    title: "You Are the Voice of the People",
    quote: [
      "A journalist should never forget that... you are the voice of the people.",
    ],
    whatThisMeans:
      "Asked to complete the sentence in his own words, after nineteen answers full of specific stories, court cases, mistakes, and decisions, he closes with the shortest possible statement of the entire feature's throughline.",
    whyItMatters:
      "Every story he told, the girl in the mud house, the tiger photograph, the heroine who asked him not to publish, the source he stopped trusting, only makes sense in light of this closing line. None of it was really about him. It was about whose voice he was carrying the whole time.",
    reflect:
      "Whoever or whatever you speak for in your own work, would the way you've handled your hardest decisions hold up if the people whose voice you carry could see exactly how you made them?",
  },
];

const takeaways = [
  {
    title: "Professional ethics and personal principles should be one and the same.",
    body: "Deadlines, accuracy, relevance, truthful, unbiased, applied without exception across 38 years, from cub reporter to Editor, Special Reports.",
  },
  {
    title: "The purpose mattered, not just the information.",
    body: "A story is not complete without all versions in it. Gather information because it's useful to the reader, not because it's easy to find.",
  },
  {
    title: "Only print is final. You cannot undo print.",
    body: "Permanence forces verification. Speed without that discipline is what makes misinformation travel faster than the truth.",
  },
  {
    title: "Having something to publish is not, by itself, a reason to publish it.",
    body: "Peace was a priority. Some of the most responsible journalism is the story that was deliberately left unwritten.",
  },
  {
    title: "Listen to a person, not just to their answer.",
    body: "Understand what someone actually means, even when they haven't found the right words, and convey it faithfully.",
  },
  {
    title: "Accuracy should determine the pace of journalism, not the competition.",
    body: "Somebody else's speed should not determine your own pace. AI should help you get it right, not take responsibility for getting it right.",
  },
  {
    title: "You are the voice of the people.",
    body: "Every hard decision, what to publish, what to leave out, who to trust, ultimately answers to that one fact.",
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
        / Sushil Rao Chilkuri
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/sushilrao-portrait.jpg"
            alt="Sushil Rao Chilkuri"
            width={1000}
            height={1000}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Sushil Rao Chilkuri · 38 Years in Journalism · Former Editor, Special Reports, The
          Times of India, Hyderabad
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 015
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Sushil Rao <em>Chilkuri</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          You Are the Voice of the People
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Cub Reporter, 1988 → Editor, Special Reports, The Times of India, Hyderabad (Retd.
          January 2026) · Founder-Director, Claritas Global Media
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;Only print is final. You cannot undo print. It is for the record. It is the
          record.&rdquo;
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
          <p className="font-medium">24 minutes</p>
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
          "38 Years in Journalism",
          "Print, TV & Digital",
          "Former Editor, TOI",
          "Journalism Ethics",
          "Interviews",
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
        <blockquote className="mt-4 border-l-2 border-neutral-300 pl-4 text-lg italic text-neutral-700">
          &ldquo;We asked Sushil Rao Chilkuri twenty questions. He answered with 38 years of
          stories, from a girl locked in a room to a rooster held as evidence in a police
          lock-up.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Sushil Rao Chilkuri began his journalism career in 1988 as a cub reporter at an evening
          newspaper called Citizen&apos;s Evening in Hyderabad, and went on to complete 38 years
          in the profession, retiring in January 2026 as Editor, Special Reports, at The Times of
          India, Hyderabad. Across print, television, and digital journalism, he has interviewed
          presidents, prime ministers, scientists, film stars, and ordinary citizens alike, and is
          now founder-director of Claritas Global Media.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what he stands for, stated publicly, in
          his own words. This is how <em>Stated Principles</em> works: the person states their
          beliefs. We make them visible. You decide what to carry forward.
        </p>
      </section>

      {/* Principles 1-5 */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Twenty principles · Stated by Sushil Rao Chilkuri
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
              <p className="mt-3 text-sm text-neutral-500">
                — Sushil Rao Chilkuri, stated directly
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
          &ldquo;A journalist who has a nose for news
          <br />
          <em>should keep sniffing.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Sushil Rao Chilkuri — Principle VII, Stated
        </p>
      </section>

      {/* Principles 6-10 */}
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
              <p className="mt-3 text-sm text-neutral-500">
                — Sushil Rao Chilkuri, stated directly
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
          &ldquo;Having something to publish
          <br />
          <em>is not, by itself, a reason to publish it.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Sushil Rao Chilkuri — Principle IX, Stated
        </p>
      </section>

      {/* Principles 11-15 */}
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
                — Sushil Rao Chilkuri, stated directly
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

      {/* Pull quote 3 */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-3xl font-serif leading-snug">
          &ldquo;You are answerable
          <br />
          <em>to your conscience.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Sushil Rao Chilkuri — Principle XVIII, Stated
        </p>
      </section>

      {/* Principles 16-20 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart4.map((p) => (
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
                — Sushil Rao Chilkuri, stated directly
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

      {/* Pull quote 4 */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-3xl font-serif leading-snug">
          &ldquo;A journalist should never forget
          <br />
          <em>that you are the voice of the people.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Sushil Rao Chilkuri — Principle XX, Stated
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
          Post a commitment inspired by Sushil Rao Chilkuri&apos;s principles. State it publicly
          — and make it real.
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
        <p className="mt-4 text-sm text-neutral-500">24 min read · 20 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
