import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "peter-toutain-dorbec";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Peter Toutain-Dorbec — Look Deeply. Remain Free. Do Not Waste Your Time.";
const DESCRIPTION =
  "What unites human beings is far greater than what separates us. Nine principles from six decades of photography, painting, and travel across 120 countries.";
const IMAGE = "https://app.stated.in/peter-portrait.jpg";

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
    images: [{ url: IMAGE, width: 861, height: 883, alt: "Peter Toutain-Dorbec" }],
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
    title: "What Unites Us Is Far Greater Than What Separates Us",
    quote: [
      "After nearly six decades of travelling, photographing and living among people in more than 120 countries, I have come to believe that what unites human beings is far greater than what separates us.",
      "Cultures are different. Religions are different. Languages, customs, political systems and ways of understanding the world can be profoundly different. But beneath these differences, I have encountered the same fundamental human needs again: to love and to be loved, to protect one's children, to belong, to be respected, to live with dignity, and to find some meaning in our existence.",
      "I have witnessed humanity at its most generous and at its most cruel. I have been in places affected by war, oppression, extreme poverty and displacement, but also in sacred places and communities where people possessed very little materially and yet demonstrated an extraordinary generosity toward a stranger. These experiences taught me very early not to confuse wealth with richness, education with wisdom, power with strength, or poverty with an absence of dignity.",
      "Photography played an essential role in teaching me this. A camera can create distance between you and another human being, but it can also force you to look, really look, and to see. For me, photography was never simply about taking pictures. It was a way of entering another person's world, however briefly. Before photographing someone, I had to observe, listen and, whenever possible, establish trust. I learned that you cannot understand people if you arrive believing that you already know who they are.",
      "Perhaps one of the strongest lessons of my life has been that human beings are full of contradictions. We are capable of extraordinary compassion and extraordinary brutality, sometimes within the same society and even within the same individual. I have seen people retain their humanity under circumstances designed to destroy it. I have also seen comfortable and educated societies become indifferent to the suffering of others.",
      "This is why I have become suspicious of labels. Nationality, religion, race, social class, political ideology, these may tell us something about a person's circumstances, but they never tell us the whole person. The moment we reduce someone to a category, we stop seeing them.",
      "After all these years, I don't think travelling has given me definitive answers about humanity. If anything, it has made me less certain of easy answers. But it has given me one conviction: wherever we come from, human dignity is not something granted by governments, religions, institutions or social status. It belongs to every human being.",
      "And perhaps the responsibility of an artist, or simply of a witness, is to recognize that dignity, particularly where the world has learned not to see it.",
    ],
    whatThisMeans:
      "Six decades and 120 countries taught him not to trust easy answers about humanity, only one conviction: that beneath every difference of culture, religion, and circumstance, the same fundamental needs recur, to love, to belong, to live with dignity.",
    whyItMatters:
      "\"The moment we reduce someone to a category, we stop seeing them\" is the thesis his entire body of work argues against. He names the exact mechanism by which labels replace people, and locates the artist's responsibility precisely there: to keep seeing the dignity that categories erase.",
    reflect:
      "What category, label, or first impression have you recently let stand in for actually seeing someone?",
  },
  {
    number: "02",
    title: "Would I Feel That This Photograph Had Respected My Humanity?",
    quote: [
      "I believe the photographer carries an enormous responsibility, because the moment you photograph another person, particularly someone who is suffering or vulnerable, you are taking something from an encounter and carrying it into another world. You may have the power to determine how that person will be seen by people who will never meet them. That power should never be taken lightly.",
      "For me, the first responsibility is respect. The person in front of my camera is never simply a subject. He or she is a human being with a life, a history, a family, fears, hopes and dignity. Poverty does not remove dignity. Suffering does not remove dignity. War does not transform a human being into an illustration of war.",
      "This becomes particularly important in situations of conflict, displacement or extreme poverty. There is always a danger that photography can turn suffering into spectacle. A dramatic photograph may be powerful, but we must ask ourselves: powerful for whom? At whose expense? Am I making this photograph because it reveals something important about the human condition, or because suffering produces an extraordinary image?",
      "I have asked myself these questions throughout my life, and I don't believe there is a simple answer that applies to every situation. Sometimes the responsibility is to photograph. Sometimes it is to lower the camera. It is crucial to know when not to take a picture.",
      "There are moments when witnessing becomes necessary. If injustice, violence or oppression are taking place, silence can also become a form of complicity. A photograph can preserve evidence. It can contradict propaganda. It can force people far away to confront a reality they would prefer not to see. In that sense, photography can carry a moral responsibility to memory.",
      "But being a witness does not give the photographer permission to take everything.",
      "I have always felt that there is an invisible line between witnessing someone's vulnerability and violating it. You must feel where that line is. No professional rule can entirely define it. It comes from empathy, experience and your relationship with the person standing in front of you.",
      "The camera also creates an imbalance of power. I am the one deciding where to stand, when to press the shutter, what to include in the frame and what to exclude. Later, I may decide which image is published or exhibited. The person photographed often has none of those choices. Recognizing that imbalance is essential.",
      "This is also why context matters. A photograph can tell the truth about one fraction of a second and still create a false understanding of a person's life. An image of despair does not mean that a person's entire existence is despair. A photograph of poverty does not tell us who that person loves, what makes them laugh, what they believe, or what dreams they have for their children.",
      "After so many years, I think the photographer's responsibility is not simply to show what happened. It is to try to remain faithful to the humanity of the people who allowed us, even for an instant, into their lives.",
      "We are witnesses, but we are also interpreters. We should never confuse the privilege of witnessing with ownership of someone else's story.",
      "Ultimately, the question I try to carry with me is very simple: If I were the person in front of the camera, would I feel that this photograph had respected my humanity?",
      "If the answer is no, perhaps the photograph should not be made.",
    ],
    whatThisMeans:
      "He treats the camera as an instrument of real power imbalance, not a neutral recording device. He alone decides what's in the frame, what's excluded, and what gets published, while the person photographed usually has none of those choices, which is why he insists recognizing that imbalance is essential rather than incidental.",
    whyItMatters:
      "His closing test, would I feel this photograph had respected my humanity if I were the one in front of the lens, turns an abstract ethical question into something checkable in the moment, before the shutter, not after.",
    reflect:
      "In your own work, whatever form it takes, do you have a version of his test, a question you actually ask yourself before acting, or only after?",
  },
  {
    number: "03",
    title: "Seeing Is Not the Same as Understanding",
    quote: [
      "Very early, I understood that photography is not reality. It is a fragment of reality, a fraction of a second selected by the photographer from an infinitely larger and more complex world.",
      "What is outside the frame is often as important as what is inside it.",
      'When we look at a photograph, we have a natural tendency to believe it. We say, "This is what happened." But the photograph only tells us: this is what the camera saw, from this position, at this instant. Move two meters to the left, turn around, wait thirty seconds, and you may have an entirely different truth.',
      "This has fascinated me throughout my life because it is not only a lesson about photography; it is a lesson about how we see the world.",
      "We constantly mistake perception for reality. We see a person and immediately begin constructing a story: poor, wealthy, happy, unhappy, religious, dangerous, powerful, insignificant. But most of what makes that person who they are remains invisible to us. We cannot photograph memory. We cannot photograph the years that brought someone to that moment. We cannot photograph what a person has lost, whom they love, what they fear, what they remember, or what they are thinking while looking back at us.",
      "I have photographed people in circumstances that, from the outside, appeared desperate, yet I discovered laughter, generosity, tenderness and an extraordinary appetite for life. I have also entered beautiful and privileged environments where, beneath the surface, there was loneliness, fear or profound unhappiness. Appearances tell us something, but never everything.",
      "This is particularly important when photographing other cultures. The greatest danger is to arrive with our own assumptions and then photograph evidence that confirms them. If I go somewhere expecting exoticism, poverty, spirituality or violence, I will probably find it. The camera is remarkably obedient to the prejudices of the person holding it.",
      "So I learned to distrust my first impression.",
      "I learned to stay longer, to look again, to listen, and sometimes simply to put the camera down. Often what I learned without photographing changed the photographs I eventually made.",
      "There is another dimension that the camera cannot fully capture: presence. The smell of a place, the temperature, the dust, the silence, the noise of a crowd, the fear in a room, the sound of prayer, the tension before violence, the way someone touches another person's hand, these things belong to the experience of being there. A photograph may suggest them, but it cannot contain them.",
      "And yet this limitation is also part of photography's extraordinary power. Because a photograph cannot tell us everything, it leaves space for imagination, memory and questioning. A strong photograph should not necessarily provide an answer. Sometimes its purpose is to make us stop and ask: What am I really looking at? What happened before this moment? What happened afterward? What am I not seeing?",
      "Perhaps after all these years, this is what photography has taught me most profoundly: seeing is not the same as understanding.",
      "The camera can help us look.",
      "Understanding requires something more.",
    ],
    whatThisMeans:
      "\"The camera is remarkably obedient to the prejudices of the person holding it\" is his sharpest observation here, if you go somewhere expecting to find exoticism or violence, you generally will, not because it's uniquely true but because you were only looking for confirmation.",
    whyItMatters:
      "His discipline against that trap is concrete, not aspirational: stay longer, look again, and sometimes put the camera down entirely. What he learns without photographing changes what he eventually photographs.",
    reflect:
      "Where in your own life are you currently collecting evidence for a conclusion you already reached before you started looking?",
  },
];

const principlesPart2 = [
  {
    number: "04",
    title: "Human Dignity Is Remarkably Difficult to Destroy",
    quote: [
      "One of the most profound things I have learned is that resilience rarely looks heroic when you are standing close to it.",
      "From a distance, we speak about courage, survival and the strength of the human spirit. But in places shaped by war, displacement, oppression or extreme poverty, resilience is usually something much quieter. It is a mother finding food for her children. It is someone rebuilding a home that has been destroyed. It is preparing a meal, washing clothes, going to school, praying, making a joke, falling in love, or simply getting up in the morning when almost everything that gave life stability has disappeared.",
      "I have witnessed people living through circumstances that I could photograph but could never fully understand because I was not the one who had to remain after I left.",
      "That distinction has always been important to me.",
      "The photographer can enter a difficult situation, witness it, record it and eventually leave. The people we photograph often cannot leave. It is their country, their village, their family, their tragedy. Remembering this has kept me from romanticizing suffering or speaking too easily about the nobility of endurance.",
      "There is nothing noble about forcing people to endure what should never have happened to them. And yet, within these circumstances, I have repeatedly witnessed an extraordinary determination to remain human.",
      "Perhaps that is what dignity means to me. Dignity is not pride, and it is not something associated with social position or material circumstances. It is something much deeper. I have seen tremendous dignity among people who had lost almost everything, and I have seen very little dignity among people who possessed enormous wealth and power.",
      "Conflict strips away many of the structures we normally depend upon. Suddenly, things that seemed permanent, home, profession, possessions, social position, even one's country, can disappear. What remains are very fundamental things: relationships, memory, identity, love, fear, loyalty, and the need to preserve some control over one's own existence.",
      "I have also learned that courage is often accompanied by fear. We sometimes imagine courageous people as people who are not afraid. My experience has shown me almost the opposite. Courage is frequently the decision to continue despite fear, the ability to control fear.",
      "But there is another lesson that is more difficult.",
      "Human beings can endure an astonishing amount, but we should be careful not to turn that capacity into an excuse for accepting their suffering. I sometimes hear people described as extraordinarily resilient, as though resilience somehow makes injustice less terrible. It does not. The fact that people survive war, persecution, displacement or hunger does not absolve those who created those conditions, or those who chose to ignore them.",
      "Resilience should inspire us, but it should also disturb us.",
      "And I have learned that small acts can become enormous under extreme circumstances. Sharing food when there is almost none. Protecting a stranger. Maintaining a ritual. Continuing to teach children. Making music. Creating beauty. Laughing. Especially laughing.",
      "Humor has surprised me in some of the darkest places I have known. It is one of the ways human beings refuse to surrender completely to circumstances. To laugh when the world has become absurd or terrifying can itself be an affirmation: I am still here. You have not taken everything from me.",
      "Perhaps this is what I have carried with me most strongly from people I encountered in difficult places.",
      "Human dignity is remarkably difficult to destroy.",
      "You can take someone's possessions, home, freedom, even their country. You can surround them with violence and uncertainty. But there remains within many human beings a territory that is extraordinarily difficult to conquer.",
      "I have seen it many times.",
      "And each time, it has humbled me.",
    ],
    whatThisMeans:
      "He deliberately refuses to let resilience become an excuse. Admiring how people endure war, persecution, or hunger can quietly slide into believing the suffering itself was survivable, and therefore less urgent to end. He insists resilience should inspire us and disturb us at the same time.",
    whyItMatters:
      "Naming humor, specifically, as a form of defiance in the darkest places he has known, is a detail most accounts of resilience skip past. Laughing when the world has become absurd or terrifying is, in his account, itself an act of refusing to surrender.",
    reflect:
      "Where have you let someone's resilience quietly become a reason not to ask harder questions about what made that resilience necessary in the first place?",
  },
  {
    number: "05",
    title: "India Began Looking Back at Me",
    quote: [
      "India has been one of the great teachers of my life, probably the greatest.",
      "I first came to India six decades ago, and from the beginning I understood that it was impossible to approach this country with simple explanations. India constantly resists simplification. Every time you believe you have understood something, another reality appears beside it, sometimes contradicting the first, yet somehow equally true.",
      "Perhaps this was one of the first things India taught me: contradiction does not necessarily mean incoherence.",
      "In India, I encountered ancient traditions existing beside an intensely modern society; extraordinary wealth beside extreme poverty; silence beside overwhelming noise; spirituality beside commerce; beauty beside decay; life beside death. In Varanasi, particularly, these things were not separated from one another in the way I had been accustomed to seeing them in the West. They existed together.",
      "Varanasi profoundly affected me. Along the Ganges, I encountered a relationship with life and death that challenged many of my European assumptions. Death was not hidden away. It was present, visible, part of the rhythm of existence. People bathed, prayed, talked, worked and laughed while, not far away, bodies were being cremated. At first this can be difficult for a Westerner to comprehend. Over time, I began to understand that what appeared to me as contradiction was part of a much larger continuity.",
      "India taught me that spirituality does not necessarily exist apart from ordinary life. It can be found in the street, in a gesture, in food, in music, in the way someone touches the feet of an elder, in the lighting of a small lamp, in the colors of a temple, in the movement of a crowd, or in a person sitting silently beside a river.",
      "I also discovered that spirituality and religion are not necessarily the same thing.",
      "Religion can become an institution, with its rules, hierarchies and divisions. Spirituality, as I came to understand it through many encounters in India, can be something much more intimate: a person's relationship with existence, with consciousness, with nature, with death, with animals, with the unknown.",
      "India also changed my understanding of time.",
      "Coming from Europe, I inherited a relatively linear conception of history: past, present, future. In India, I became increasingly aware of another perception, one in which the past is not necessarily behind us. Ancient ideas, rituals, myths and philosophical traditions remain alive within contemporary existence. Centuries can seem to coexist in the same street.",
      "This affected the way I photographed.",
      "India is extraordinarily seductive for a photographer. Everywhere there is color, movement, gesture, architecture, faces, rituals, extraordinary light. It would be very easy to photograph only the spectacular India, the India that satisfies the Western imagination.",
      "I became increasingly wary of that.",
      "The picturesque can become another form of blindness.",
      "If you photograph only what appears exotic to you, you may create beautiful images while understanding very little about the people you are photographing. India reinforced something that became fundamental to my work elsewhere: I had to try to see beyond my own fascination.",
      "Kolkata taught me something different from Varanasi. Mumbai taught me something different again, as did Madras, Delhi and the many smaller places I encountered. There is not one India. There are countless Indias, languages, religions, castes, communities, histories, cuisines, landscapes and ways of thinking. Even the idea of a single Indian identity contains an extraordinary multiplicity.",
      "That realization stayed with me everywhere I subsequently travelled.",
      "I became increasingly reluctant to speak of Africans, Asians, Arabs, Europeans, or any people as though an entire civilization could be contained within a single identity. India taught me that identity is never singular; it is layered, complex, and often overlapping. A person may belong simultaneously to a family, a village, a language, a religion, a profession, a region, a nation, and a philosophical tradition. They may also be born into social categories historically identified as Brahmin, Kshatriya, Vaishya, Shudra, or Dalit. Yet no single one of these affiliations, inherited or chosen, can fully explain who that person is.",
      "But perhaps India's deepest influence on me was more personal.",
      "It taught me to become more comfortable with questions that have no definitive answers.",
      "What is consciousness? What is the self? What survives us? What does it mean to live a meaningful life? What is our relationship to other living beings? What is the relationship between the material and the spiritual?",
      "India did not give me answers to these questions. It did something more valuable: it made the questions themselves part of my life.",
      "Over the decades, I have returned to them through photography, painting, writing and simply through living.",
      "India also taught me patience, the importance of remaining somewhere long enough for the first impression to disappear. When the first impression disappears, something much more interesting can begin.",
      "You stop looking only at India.",
      "India begins looking back at you.",
      "And in that encounter, you inevitably discover something about yourself.",
      "I have carried that lesson with me throughout the rest of my journey: travel is not simply the discovery of other cultures. At its best, it is the gradual dismantling of our certainty about our own.",
    ],
    whatThisMeans:
      "India taught him, more than anywhere else, that contradiction does not necessarily mean incoherence, that ancient and modern, wealth and poverty, life and death can coexist without one cancelling the other out, and that his own linear, Western sense of time was only one way of experiencing it, not the correct one.",
    whyItMatters:
      "\"Travel is not simply the discovery of other cultures. At its best, it is the gradual dismantling of our certainty about our own\" reframes what travel is actually for, not collecting places, but losing a little of your own certainty each time.",
    reflect:
      "What is one certainty about your own culture, background, or way of seeing time that you've never actually had dismantled by encountering somewhere genuinely different?",
  },
  {
    number: "06",
    title: "We Are Made From What We Have Been Unable to Forget",
    quote: [
      "Photography and painting have always occupied two different territories in my life, although over the years those territories have increasingly overlapped.",
      "Photography begins with something that existed in front of me. I was there. The person was there. The place, the light, the event existed at that moment. I can choose the frame, the instant, the point of view, but I need the world to give me something first.",
      "In that sense, photography has been my dialogue with reality.",
      "Painting is different. Painting does not need reality to remain in front of me. It allows me to return to something years, even decades, after it happened. A face, a landscape, a war, a gesture, a color or an emotion can disappear from conscious thought and then suddenly return with extraordinary force.",
      "This is why I have said that photography records what history allows me to see, while painting explores what memory refuses to forget.",
      "Memory is not an archive. It does not preserve everything faithfully. It selects, transforms, exaggerates, erases and sometimes invents. Two people can live through the same event and remember it completely differently. Even our own memories change as we change.",
      "For an artist, I find this fascinating.",
      "A photograph may remain physically unchanged for fifty years, but I do not remain unchanged. When I look at one of my photographs decades later, I am no longer the man who made it. I bring to that image everything that happened afterward. Sometimes I see things in my own photographs that I did not understand when I took them.",
      "Time has changed the photograph because time has changed me.",
      "Painting gives me another possibility. I can enter that memory rather than simply revisit the image. I can remove what no longer matters, intensify what does, combine different moments, change scale, distort color, simplify a face or allow something almost forgotten to become central. I am no longer obligated to describe what happened. I can explore what remains.",
      "And what remains is sometimes very different from what happened.",
      "There are experiences that I photographed and believed I had left behind, only to discover many years later that I had not left them at all. They had simply gone somewhere deeper. Certain faces return. Certain landscapes return. Certain moments of violence return. But so do moments of extraordinary tenderness and beauty.",
      "This is where painting becomes, for me, a form of archaeology. I am excavating my own memory.",
      "I don't always know what I am looking for when I begin. Sometimes the meaning of a painting reveals itself only during the process. Something that I witnessed thirty or forty years ago can suddenly connect with something happening in the world today, or with something I have only recently understood about myself.",
      "The passage of time therefore does not necessarily weaken an experience. Sometimes it concentrates it.",
      "Photography also has a peculiar relationship with time because every photograph immediately becomes the past. The instant I press the shutter, that moment no longer exists. The child grows old. A building disappears. A landscape changes. Someone dies. A political system collapses. A country changes its name. And the photograph remains.",
      "When I was younger, I don't think I fully understood this. I was photographing the present. Today, looking back across six decades of images, I realize that I was also unknowingly constructing an enormous conversation with time.",
      "This is one reason I have never thought of my different practices, photography, painting, sculpture and writing, as separate. They are different languages for approaching many of the same questions.",
      "Photography says: I saw this.",
      "Memory says: This is what remained.",
      "Painting asks: Why has it remained?",
      "And time continually changes the answer.",
      "Perhaps this is ultimately what my creative life has become: not an attempt to preserve the past exactly as it was, that is impossible, but an attempt to understand what experience leaves behind in us.",
      "We do not simply remember the past.",
      "We are made, in part, from what we have been unable to forget.",
    ],
    whatThisMeans:
      "He assigns each medium a distinct relationship to time, photography as dialogue with reality in the instant it happens, painting as archaeology, a way of re-entering memory years or decades later and finding what's actually still there beneath what he originally photographed.",
    whyItMatters:
      "The three-line sequence, photography says I saw this, memory says this is what remained, painting asks why has it remained, is the clearest articulation anywhere in this feature of how his different disciplines aren't separate pursuits but different questions asked of the same experience.",
    reflect:
      "What experience from your own past has changed meaning for you over time, not because the facts changed, but because you did?",
  },
];

const principlesPart3 = [
  {
    number: "07",
    title: "The Work Must Come First",
    quote: [
      "Creative independence has always been essential to me, perhaps because I never believed that an artist should wait for permission to create.",
      "Permission can come in many forms: from galleries, publishers, critics, magazines, institutions, the market, fashion, or simply from the expectations of other people. Recognition can be gratifying and sometimes important because it allows the work to travel and reach others. But if recognition becomes the reason for creating, then something fundamental has been lost.",
      "I have always tried to make the work I felt I had to make.",
      "That does not mean I have been indifferent to criticism or to the opinions of others. On the contrary, criticism can be extremely valuable. But there is a difference between listening and obeying. An artist must develop an internal compass strong enough to hear the world without becoming directed by it.",
      "My movement between photography, painting, sculpture, poetry and writing comes from the same principle. I never felt that I had to choose one language simply because other people needed to define me. There are things I can say with a photograph that I cannot say with words. There are things I can explore through painting that photography cannot reach. Sometimes a poem can approach an experience more closely than either.",
      "The medium is not the identity. It is the instrument.",
      "What matters is what you are trying to understand, express or question.",
      "This freedom has sometimes come at a price. Creative independence can mean uncertainty. It can mean working without knowing whether the work will be exhibited, published, understood or even noticed. There are periods when the world seems interested in what you are doing and periods when it is looking somewhere else entirely.",
      "You must continue in both circumstances.",
      "Over time, I learned that discipline is as important as inspiration. Inspiration is unpredictable. If you wait for it, you may spend much of your life waiting. The practice of returning to the work, looking, experimenting, failing, starting again, is what keeps a creative life alive.",
      "Failure has also been important. Not every photograph succeeds. Not every painting works. Not everything one writes deserves to survive. I have destroyed work, abandoned projects and changed direction many times. This is not separate from the creative process; it is the creative process.",
      "You must be willing to disappoint yourself.",
      "Curiosity may be the principle that has sustained me most. At 75 years old, I still want to know what happens if I try something differently. The danger for an artist who has worked for a long time is to become the curator of his own past, to repeat what has already succeeded because it has become recognizable.",
      "I have never wanted to do that. The moment you begin imitating yourself, something is finished.",
      "Travel helped protect me from this. Encountering different cultures, histories, landscapes and ways of thinking repeatedly disrupted my assumptions. It reminded me that my way of seeing was only one possibility among many. Painting did the same thing to my photography; writing challenged both. Moving between disciplines kept me uncomfortable, and I think a certain amount of discomfort is necessary for creation.",
      "I have also tried not to confuse an artistic career with an artistic life. A career is affected by exhibitions, publications, sales, reviews, institutions and recognition. These things have their place, but they are partly controlled by circumstances and by other people.",
      "An artistic life is different. It is the decision to keep looking, thinking and making.",
      "That belongs to you.",
      "As I have grown older, this distinction has become increasingly important. Time becomes more precious, and the desire to satisfy expectations becomes less interesting. You begin to understand that the real privilege is not recognition. The privilege is having spent a life remaining curious enough to continue creating.",
      "If I had to reduce creative independence to a few principles, they would be these: remain curious; work even when inspiration is absent; learn from criticism without becoming governed by it; do not be afraid to fail; change when the work demands change; and never allow success to imprison you in what you have already done.",
      "Above all, create because something within you still needs to be discovered.",
      "The world may recognize it or it may not.",
      "The work must come first.",
    ],
    whatThisMeans:
      "He draws a firm line between an artistic career, which is shaped by exhibitions, sales, and other people's decisions, and an artistic life, the simple decision to keep looking, thinking, and making, which belongs entirely to him regardless of what recognition does or doesn't arrive.",
    whyItMatters:
      "At 75, his stated danger isn't running out of ideas, it's becoming the curator of his own past, repeating what already succeeded because it's recognizable. That's a specific, late-career risk most advice about creativity never names directly.",
    reflect:
      "Are you currently protecting your own artistic life, in whatever form your work takes, from becoming just a career shaped by what other people expect of you?",
  },
  {
    number: "08",
    title: "What Deserves to Outlive Us Is Our Humanity",
    quote: [
      "What I hope will outlive us is not simply the record of what happened, but the memory of how people lived, endured, loved, suffered, resisted, and remained human.",
      "I have photographed, painted, written about, and lived among people whose worlds were often changing or disappearing. I have witnessed war and political oppression, but also ordinary life: families, villages, rituals, landscapes, gestures, faces, and traditions that history can too easily overlook. With time, I have come to understand that these seemingly ordinary things are often the most precious.",
      "We tend to preserve the history of nations, governments, wars, monuments, and powerful people. But humanity also resides in much smaller things: the expression on a face, the hands of a craftsman, the dignity of someone living in poverty, the memory of an elder, the knowledge passed from one generation to another, a language, a ceremony, a way of understanding nature and our place within it.",
      "These are fragile forms of knowledge. Once they disappear, they cannot truly be reconstructed.",
      "I also believe we must preserve complexity. During my travels and years of working in different cultures, I learned to distrust simple definitions of people. No civilization, religion, country, or community can be reduced to a single identity. Human beings are infinitely more complicated than the categories we create for them. Future generations deserve to inherit that understanding, especially in a world increasingly tempted by simplification and division.",
      "Photography taught me something else: a photograph may survive the photographer, but its real importance is not that it preserves the photographer. It preserves the person who stood before the camera. It says: this person existed; this place existed; this moment happened.",
      "Perhaps that is what I have been trying to do throughout my life, not to create memorials, but to leave traces.",
      "If some part of my work survives, I hope it will carry forward the dignity of the people I encountered and something of the extraordinary diversity of human experience. I hope future generations will look at these images and works not simply as documents of a vanished past, but as encounters with people who were once as alive, complicated, hopeful, frightened, loving, and uncertain as they are.",
      "But I cannot take that survival for granted. I live today in the United States, where I have found remarkably little interest in my work or in preserving it. After a lifetime of creating photographs, paintings, writings, and documents, I still do not know whether I will find a place for them, or a way to ensure that they survive me. There is a certain irony in having spent so much of my life preserving the memory of others while now wondering who, if anyone, will preserve what I have tried to leave behind.",
      "What deserves to outlive us, finally, is our humanity, and the memory that, despite all our differences, we belonged to one another.",
    ],
    whatThisMeans:
      "His answer about legacy shifts the question from what should be preserved to what kind of understanding should be preserved, not just facts and images, but the complexity of people, resisting the simplification and division that flattens a person into a single identity.",
    whyItMatters:
      "He includes, without softening it, that he currently has no assurance his own work will survive him, and finds it ironic to have spent a life preserving others' memory while uncertain who will preserve his. That honesty about his own uncertain legacy makes the principle land harder, not softer.",
    reflect:
      "Setting aside what you'd like to be remembered for, what understanding, rather than what record, do you hope outlives you?",
  },
  {
    number: "09",
    title: "Look Deeply. Remain Free. Do Not Waste Your Time.",
    quote: [
      "If I could share only three principles with a young photographer, artist, writer or traveller beginning today, they would be these:",
      "First: learn to look before you try to be seen.",
      "We live in a time when there is enormous pressure to be visible, to publish, post, accumulate followers, establish an identity and constantly announce what we are doing. But an artist's first responsibility is not to be seen. It is to see.",
      "Pay attention. Listen. Stay somewhere longer than is comfortable. Look beyond your first impression. Be curious about people who do not think as you do. Travel, if you can, not simply to collect destinations or images, but to allow other cultures to challenge what you believe to be normal.",
      "And when you photograph or write about another person's life, remember that they do not exist to provide material for your work. Approach them with humility. You may carry their image with you for the rest of your life; they may remember your presence as well.",
      "Second: protect your curiosity and your independence.",
      "Learn your craft seriously. Study those who came before you. Read. Look at paintings. Listen to music. Learn history. Study cultures beyond your own. But do not spend your life trying to become someone else.",
      "Influence is necessary. Imitation can be useful while learning. Eventually, however, you must discover your own language.",
      "Do not allow fashion, algorithms, markets, critics, institutions, or even success, to decide what deserves your attention. Recognition is unpredictable and temporary. Curiosity can sustain an entire life.",
      "Be willing to fail. Make work that embarrasses you occasionally because you attempted something you did not yet know how to do. If everything you create is safe, recognizable and successful, you may no longer be exploring.",
      "And never become too comfortable with your own reputation. The most dangerous imitation for an artist may eventually be the imitation of oneself.",
      "Third: remember that you have less time than you think.",
      "When you are young, life appears almost unlimited. There will always be another journey, another photograph, another book, another painting, another opportunity to say what you wanted to say.",
      "Then, very quickly, decades have passed.",
      "So go.",
      "Do the work. Take the difficult journey. Ask the question. Learn the language. Read the book. Make the photograph. Paint the painting. Write the poem. Tell people you love them. Change direction when you discover that you are travelling toward something that no longer matters to you.",
      "But do not confuse urgency with speed. Some things require years to understand. A meaningful creative life is not a race to produce as much as possible. It is an attempt to remain awake during the time you have been given.",
      "After these decades of working and travelling, I am less interested in telling a younger generation what to believe than encouraging them to remain capable of questioning what they believe.",
      "So perhaps my three principles are ultimately very simple:",
      "Look deeply.",
      "Remain free.",
      "Do not waste your time.",
      "And throughout all three, never lose your humanity.",
    ],
    whatThisMeans:
      "Asked to reduce a lifetime to three principles for the next generation, he chooses looking before being seen, protecting curiosity and independence, and remembering time is shorter than it feels, then compresses all three again into six words: look deeply, remain free, do not waste your time.",
    whyItMatters:
      "\"The most dangerous imitation for an artist may eventually be the imitation of oneself\" closes the loop on everything in Principle 7 about not becoming the curator of his own past. The final warning isn't about copying others. It's about copying who you already were.",
    reflect:
      "Of his three, looking before being seen, protecting your curiosity, or remembering your time is shorter than it feels, which one would change something about how you're spending this year if you actually practiced it?",
  },
];

const takeaways = [
  {
    title: "What unites us is far greater than what separates us.",
    body: "Beneath every difference of culture, religion, and circumstance, the same fundamental human needs recur: to love, to belong, to live with dignity.",
  },
  {
    title: "Before you photograph, or act on, someone, ask if it respects their humanity.",
    body: "A simple test applied before the moment, not after: if the answer is no, perhaps it shouldn't be made.",
  },
  {
    title: "The camera is obedient to the prejudices of the person holding it.",
    body: "If you go looking for confirmation of what you already believe, you'll usually find it. Distrust your first impression; stay longer than is comfortable.",
  },
  {
    title: "Resilience should inspire us, but it should also disturb us.",
    body: "Admiring how people endure suffering can quietly become an excuse not to ask who created the conditions that made endurance necessary.",
  },
  {
    title: "Travel dismantles certainty about your own culture, not just theirs.",
    body: "The deepest journeys aren't about collecting other places. They're about losing a little of what you were sure of at home.",
  },
  {
    title: "Protect your artistic life from becoming just a career.",
    body: "A career is shaped by other people's decisions. An artistic life, the decision to keep looking, thinking, and making, belongs entirely to you.",
  },
  {
    title: "Look deeply. Remain free. Do not waste your time.",
    body: "Three principles, reduced from a lifetime, and one warning beneath all three: never lose your humanity.",
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
        / Peter Toutain-Dorbec
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/peter-portrait.jpg"
            alt="Peter Toutain-Dorbec"
            width={861}
            height={883}
            className="h-40 w-40 object-cover object-top grayscale"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Peter Toutain-Dorbec (Pierre Toutain-Dorbec) · Artist · Photographer · Author · Poet ·
          Publisher
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 008
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Peter <em>Toutain-Dorbec</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Look Deeply. Remain Free. Do Not Waste Your Time.
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          More than five decades of photography and artistic practice · 120+ countries · conflict
          zones and sacred spaces · 40+ published books
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;What unites human beings is far greater than what separates us.&rdquo;
        </blockquote>
      </header>

      {/* Stats row */}
      <section className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 border-y border-neutral-200 px-6 py-6 text-sm sm:grid-cols-4">
        <div>
          <p className="text-neutral-400">Format</p>
          <p className="font-medium">Life Principles</p>
        </div>
        <div>
          <p className="text-neutral-400">Read time</p>
          <p className="font-medium">28 minutes</p>
        </div>
        <div>
          <p className="text-neutral-400">Principles</p>
          <p className="font-medium">9 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">August 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {[
          "Photographer",
          "Artist & Painter",
          "Author & Poet",
          "120+ Countries",
          "Human Dignity",
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
          &ldquo;We asked Peter Toutain-Dorbec eight questions, and one optional ninth. He gave us
          nearly six decades of looking closely at the world.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Peter Toutain-Dorbec, born Pierre Toutain-Dorbec, has spent more than five decades
          travelling, photographing, painting, and writing across more than 120 countries, from
          conflict zones to sacred spaces, publishing more than 40 books along the way. His
          relationship with India in particular, from Varanasi and Kolkata to Mumbai, Chennai, and
          Delhi, runs across six decades and shaped much of how he came to see contradiction,
          spirituality, and identity.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what he stands for, stated publicly, in
          his own words, presented here in full. This is how <em>Stated Principles</em> works: the
          person states their beliefs. We make them visible. You decide what to carry forward.
        </p>
      </section>

      {/* Principles 1-3 */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Nine principles · Stated by Peter Toutain-Dorbec
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What he stands for — in his own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 09</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Peter Toutain-Dorbec, stated directly
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
          &ldquo;The camera is remarkably obedient
          <br />
          <em>to the prejudices of the person holding it.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Peter Toutain-Dorbec — Principle III, Stated
        </p>
      </section>

      {/* Principles 4-6 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart2.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 09</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Peter Toutain-Dorbec, stated directly
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
          &ldquo;Human dignity is
          <br />
          <em>remarkably difficult to destroy.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Peter Toutain-Dorbec — Principle IV, Stated
        </p>
      </section>

      {/* Principles 7-9 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart3.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 09</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Peter Toutain-Dorbec, stated directly
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
          &ldquo;Look deeply. Remain free.
          <br />
          <em>Do not waste your time.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Peter Toutain-Dorbec — Principle IX, Stated
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
          Post a commitment inspired by Peter Toutain-Dorbec&apos;s principles. State it publicly
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
        <p className="mt-4 text-sm text-neutral-500">28 min read · 9 principles</p>
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
