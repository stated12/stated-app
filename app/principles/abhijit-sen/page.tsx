import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "abhijit-sen";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Abhijit Sen — Governance, Judgement & Integrity";
const DESCRIPTION =
  "Governance, judgement and integrity. Twenty-five principles from the former CFO of Citi India Subcontinent, board member and mentor on financial leadership, risk, boards and building organisations with long-term purpose.";
const IMAGE = "https://app.stated.in/abhijit-portrait.jpg";
const TOTAL = 25;

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
    images: [{ url: IMAGE, width: 844, height: 844, alt: "Abhijit Sen" }],
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
  title: string;
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
    <article className="border-t border-neutral-200 pt-10">
      <p className="text-sm text-neutral-400">
        {p.number} of {TOTAL}
      </p>
      <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

      <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
        {p.quote.map((para, i) => (
          <p key={i} className="leading-relaxed">
            {typeof para === "string" ? para : para.map(renderSeg)}
          </p>
        ))}
      </blockquote>
      <p className="mt-3 text-sm text-neutral-500">— Abhijit Sen, stated directly</p>

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

const principles: Principle[] = [
  {
    "number": "01",
    "title": "Financial Expertise Is the Framework, Not the Whole Role",
    "quote": [
      "Prior to transitioning to a CFO role, I had spent many years leading the Controllership function which supported the CFO by ensuring pristine integrity of the books through seamless delivery of numbers relating to financial performance of the business and the presentation of the same to various constituencies including regulators, shareholders and customers. This germinated within me a progressive appreciation that financial leadership requires much more than financial expertise, rather, financial expertise provides the framework around which is constructed the wider contours of a CFO’s role to weave together a holistic framework binding the various variables of the business, the risks and opportunities that it is exposed to and the building blocks of people and resources that go to translating it to reality. Binding this entire structure together is the core principle of governance, which ensures the right application of policies and processes with due compliance to all the regulatory protocols and sensitivity to market forces. This brought about a fundamental change in my thought processes, the way I approached my responsibilities, and how my leadership style needed to be both collaborative as well as inclusive, collaborative with all other peer functions and business verticals and inclusive of all the data points and fact patterns that are the output of the financial systems. The realization gradually dawned upon me that it was not only important for a CFO to support the CEO in taking the right decision but also create an environment where the same is accepted after due debate and discussion. As I progressed in my career and assumed higher levels of responsibility, this core realization took firm root and I gained an appreciation that the numbers and financials provided a basis for contextualizing one’s overall approach and one should not be constrained in one’s approach by a rigid interpretation of the numbers beyond using these as the skeleton around which to build one’s entire approach to the business way forward."
    ],
    "whatThisMeans": "He describes how years leading the Controllership function showed him that financial expertise is the framework around which a CFO's wider role is built, weaving together the business, its risks and opportunities, and its people and resources. Governance, in his account, is what binds that structure together.",
    "whyItMatters": "The shift changed his leadership style: collaborative with peer functions and business verticals, and inclusive of every data point the financial systems produce. A CFO's task is not only to support the CEO's decision but to create an environment in which it is accepted after due debate, and to treat numbers as the skeleton of an approach rather than a rigid constraint.",
    "reflect": "Where are you treating numbers as the whole answer, when they are only the skeleton of one?"
  },
  {
    "number": "02",
    "title": "Serve the Broader Priority, and Explain It",
    "quote": [
      "As a CFO of a constituent region in a global bank whose businesses are distributed across many geographies, success lay in understanding the broader organizational priorities versus the specific priorities of my own region or geography. A situation arose during the global financial crisis of 2008 which originated in the US and had impact in various degrees in various parts of the world. India for one, continued to be relatively less impacted as the country continued to register its potential and promise. The global contagion created a constraint of capital for the company where conservation needs had to be prioritized forsaking the opportunities for growth available by deploying the capital in country. I therefore had to be party to a decision to align the allocation of capital, distributing the excess capital out to the Head Office, de-prioritizing the allocation of the capital for growth initiatives in country and deferring the initiatives for a later date. This entailed explaining the issue to the local organization, the relative choice of priorities and build consensus in place of dissent for the broader good of the enterprise. This preceded a significant degree of discussion and dissent in the local management committee about the wider repercussions of this decision on the country initiatives which could not be aborted halfway. I put forward the proposition that one had to approach this in an orderly manner and put forward a proposal to the Head Office as to what would be a logical culmination of suspending some of these initiatives in a rational way to derive the maximum benefit out of the effort already extended and to truncate this in a logical and well thought way also ensuring that the market perceives this in the right spirit."
    ],
    "whatThisMeans": "Writing from the 2008 global financial crisis, he describes being party to a decision to distribute excess capital to the Head Office and defer growth initiatives in India, a country that was still showing its potential. Success as the CFO of a region, he says, lay in understanding the organisation's broader priorities against those of one's own geography.",
    "whyItMatters": "The decision meant explaining the choice of priorities to the local organisation and building consensus in place of dissent. Where initiatives could not simply be aborted halfway, he proposed an orderly way to suspend them, so that the effort already made delivered maximum benefit and the market read the decision in the right spirit.",
    "reflect": "When a decision you support costs the people closest to you, how do you explain it, and what do you do for the work already under way?"
  },
  {
    "number": "03",
    "title": "Numbers Need Judgement Beside Them",
    "quote": [
      "As a financial leader, one often encounters situations where one has to balance the outcome of financial analysis created out of numbers, with professional judgment and intuition. I can discuss two examples, risk modelling and capital planning. Typically, under current IndAs principles of accounting one develops credit loss estimates out of a statistical projection of probability of loss assessment under different scenarios of default and residual loss in an actual default situation. Even where these statistical models are sharpened with actual portfolio performance data one needs to often add judgmental buffers if it is felt that the model does not accurately cover a situation owing to some level of, say, macro-complexity or uncertainty difficult to quantify. These buffers themselves are created based on an underlying modelling process with the parameters governing these models being subject to judgmental calibration. Equally when performing capital adequacy assessment under different scenarios, for a Bank under the methodology under the Basel protocols one encounters certain situations where certain risks are amenable to defined quantitative modelling such as credit or market risk whereas risks such as compliance or legal risks or reputational risks may not be amenable to quantitative modelling and so it requires a judgmental assessment. These assessments create an override on the outcome of the quantitative results. The entire approach is woven into a narrative text which becomes an exposition of the cohesive rationale explaining points beyond the ambit of quantitative models Many such other examples may be encountered."
    ],
    "whatThisMeans": "He uses two examples, risk modelling and capital planning. Credit loss estimates under IndAs are built from statistical models, yet he notes that judgemental buffers are often needed where the model cannot fully capture macro complexity or uncertainty, and those buffers are themselves subject to calibration.",
    "whyItMatters": "In capital adequacy assessment under the Basel protocols, credit and market risk lend themselves to quantitative modelling, while compliance, legal and reputational risks do not. Those need judgemental assessment, which overrides the quantitative result and is explained in a narrative that sets out the rationale beyond the models.",
    "reflect": "Where a model in your work gives a clear answer, and what does it fail to capture?"
  },
  {
    "number": "04",
    "title": "Responsible Growth Is Calibrated, Not Guessed",
    "quote": [
      "There is no clear answer to this question. Responsible growth is an outcome of various variables that govern the performance of the organization through mitigation of a combination of market, business, financial and other risks. One has to assess the interplay of these risks and develop an optimality of outcome calibrated for various scenarios from benign to difficult. Therefore one has to segment the financial achievement into categories, a base level that can be achieved in a non-negotiable manner and then progressively a set of successive scenarios that involve a risk return combination at various inflexion points. At each stage there is a trade-off that a business leader must evaluate both in terms of a success factor and opportunity loss and then take a calculated decision basis the resources and capital at his disposition. This choice under the same set of parameters may well be different at various points in time depending on the external and internal factors at play. This approach is also enshrined in the approaches organizations adopt towards budgeting. Typically, an annual budget is in the context of a longer-term strategic plan that spans say three years expecting an interplay of environmental and business variables over this period. The annual budget becomes a more regimented process under a more rigidly parameterized set of assumptions. As the year progresses, these aspirational numbers get updated, calibrating the risk exposure to the outcome expected. The final outcome of the year sets a different tone to the strategic plan of subsequent years which are reset on a rolling basis."
    ],
    "whatThisMeans": "He begins honestly: there is no clear answer. Responsible growth is the outcome of many variables, so a leader must assess how market, business and financial risks interact and calibrate the outcome across scenarios from benign to difficult.",
    "whyItMatters": "In practice he separates a base level of achievement that is non-negotiable from successive scenarios that each carry a different risk and return, and weighs success against opportunity loss at every stage. He sees the same logic in budgeting: an annual budget sits within a longer strategic plan, is updated as the year progresses, and the year's outcome resets the plan for the years that follow.",
    "reflect": "What is the non-negotiable base in your plan, and what are you adding above it at what risk?"
  },
  {
    "number": "05",
    "title": "Boards Work Through Coordinated Committees",
    "quote": [
      "In my professional experience, two of the most important governance bodies that play a key role in the Board governance are the Audit Committee (AC) and the Risk Committee (RC) and I have the unique experience of participating or leading either or both. The AC and RC have different remits and functional scope that can create potential synergy and overlap between them and this has to be managed in a complementary way without creating conflict as they play distinct yet symbiotic roles in an organization. Coordinating their coverage agendas to avoid duplication or inconsistency in their respective oversight and advisory processes enhances the overall risk management framework. While the AC primarily focuses on financial reporting, internal controls and compliance ensuring the intrinsic reliability of the financial information, the RC has a wider remit in addressing the entire spectrum of risks and developing strategies to mitigate these risks. Having said this, effective coordination and collaboration between these committees becomes crucial for robust risk governance and ensuring sustainable growth by leveraging their respective strengths and areas of expertise. By prudent sharing of critical information on risk appetite or strategic and other risks that may impact the quality of financial reporting and auditing processes and conversely by sharing insights on risk management and mitigation processes (e.g. through the use of financial derivatives or hedging techniques), the AC or RC can mutually gain valuable insights. A similar confluence exists between IT Risk Committees and AC. Effective board governance requires the coordinated interplay of these committees through knowledgeable resources and cross-participation. Fundamental is of course the adequate level of skills in the Board that elevates the quality of decision making and discussion and deliberation in these forums. One of the important takeaways of the discussion in each Committee is the approach towards crystallization of salient summary outcomes that drive the necessary messages without getting lost in detail. It is essential for this purpose that the stewardship of these Committees vest with individuals who are in possession of a complete mastery of the content."
    ],
    "whatThisMeans": "Having participated in or led both, he singles out the Audit Committee and the Risk Committee as two of the most important governance bodies. The Audit Committee focuses on financial reporting, internal controls and compliance; the Risk Committee has a wider remit across the full spectrum of risk.",
    "whyItMatters": "Their remits overlap, so he stresses managing that overlap in a complementary way: coordinating agendas, sharing information on risk appetite and mitigation, and extending the same confluence to IT Risk Committees. Underneath it all he places adequate skills on the Board, the discipline of crystallising salient outcomes without getting lost in detail, and stewardship by people with complete mastery of the content.",
    "reflect": "In a group you sit on, who owns the summary that reaches the decision-makers, and do they master the content?"
  },
  {
    "number": "06",
    "title": "Independence Begins With Preparation and Honest Purpose",
    "quote": [
      "There are a few fundamental attributes that go behind this. First and foremost is adequate and in-depth domain knowledge constantly updated by reference to latest regulatory or other updates and equally the quality of coming well prepared for the meetings. Often, it helps to have a pre-meeting, for example in an Audit Committee context with the CFO or the statutory auditor to understand the materials better and the critical issues awaiting deliberation and discussion at Board level or committee level given general constraints of time and attention span of members. As long as there is honesty of purpose in asking a question and sides are not being taken and games not being played to compromise the interests of the organization, credibility of the Director is never compromised. Absent these traits, trust and respect is lost and then it is very difficult to re-create. Also, one must choose the issues to debate and be wary of discussing trivialities just to make a point, thereby displaying a magnanimity of intent which always augurs well. It is also important while presenting a differing strain of thought not to be pedantic but to keep an approach of optionality and possibility."
    ],
    "whatThisMeans": "For a director to challenge management and keep trust, he starts with in-depth domain knowledge, constantly updated, and coming well prepared. A pre-meeting, for example with the CFO or the statutory auditor in an Audit Committee context, helps one understand the materials and the critical issues before deliberation.",
    "whyItMatters": "Credibility is never compromised, he says, as long as a question is asked with honesty of purpose and no sides are taken or games played. Once trust and respect are lost they are very hard to re-create. He adds a discipline of choosing which issues to debate, avoiding trivialities, and presenting a differing view with optionality and possibility rather than pedantry.",
    "reflect": "Before you next disagree in a meeting, what would you need to have done to ask with honesty of purpose?"
  }
];

const principlesPart2: Principle[] = [
  {
    "number": "07",
    "title": "Culture Goes Beyond Compliance",
    "quote": [
      "A culture of governance accountability and responsibility goes much beyond mere compliance with rules and regulations. One has to transcend beyond the written word and imbibe the spirit of the written word and translate these percepts to a culture that pervades over every tenet of behavior. While accountability and responsibility have a reciprocal relationship inasmuch as one is the converse of the other, governance constitutes the framework that binds all of this together into an organic and vibrant existence that is behind every thought action and deed of the organization. Rules and regulations find their place in the compendium that may be in the reference domains of various regulators. An organization achieves the right standards of governance if these are instilled in the code of behavior of every member of the organization and it is that code that creates the accountability to a framework and the responsibility of each member to adhere to it. It is important to appreciate that culture is organic whereas any compendium of regulations et al is mechanical in the ultimate analysis."
    ],
    "whatThisMeans": "He separates governance from compliance by asking one to transcend the written word, imbibe its spirit, and turn it into a culture that pervades every tenet of behaviour. Accountability and responsibility, as he puts it, are reciprocal, and governance is the framework that binds them.",
    "whyItMatters": "Rules and regulations belong to the compendium that regulators refer to. An organisation reaches the right standard when those principles are instilled in the code of behaviour of every member, because that code creates both accountability to a framework and each person's responsibility to adhere to it. Culture is organic, whereas a compendium of regulations is, in the ultimate analysis, mechanical.",
    "reflect": "Which of your organisation's rules would still be followed if no regulator were watching, and why?"
  },
  {
    "number": "08",
    "title": "Risk Aversion Has a Cost",
    "quote": [
      "One of the greatest facets of the evolution of my learning and maturity is the development of an understanding of risk. This has been the result of an exposure to multiple organizations, their business exposure to various elements of risk as well as their specific vulnerability to environmental, economic, business and reputational risks, how it shapes their strategies to mitigate the same. This has resulted in the development of an understanding of the most optimal approach to risk taking including identifying the various types of risks and evaluating the magnitude and potential impact of these risks on an enterprise’s operations. I have accordingly understood that a thoughtful approach to risk taking is underscored by developing a comprehensive risk management framework enshrined in policies and procedures for risk identification assessment, monitoring and mitigation. Emerging from this assessment is an approach that develops the company’s risk profile under various scenarios and their mitigation as opposed to an approach that does not take into account these various elements that goes to undermine the overall effectiveness of the risk management framework. It follows as a corollary to all of this that an organization that is completely risk averse actually fails to exploit its business opportunities leaving a lot of money on the table and impairing the economic return to shareholders."
    ],
    "whatThisMeans": "He traces his understanding of risk to exposure to many organisations, their business exposures, and their vulnerability to environmental, economic, business and reputational risk, and how that shaped their strategies.",
    "whyItMatters": "A thoughtful approach, he concludes, rests on a comprehensive framework of policies and procedures for identifying, assessing, monitoring and mitigating risk, and on a risk profile developed under various scenarios. The corollary is that a completely risk-averse organisation fails to exploit its opportunities, leaving a lot of money on the table and impairing the return to shareholders.",
    "reflect": "Which opportunity are you declining because of a risk you have not actually assessed?"
  },
  {
    "number": "09",
    "title": "Bad News Must Be Communicated, Never Suppressed",
    "quote": [
      "In our lives we often encounter situations where there is bad news and the same has to be communicated. I have learnt that the worst approach is to suppress the news, which is not an option. When something like this happens, one has to agree on a cogent communication strategy that is inclusive to all stakeholders calibrating the extent of disclosure appropriate to the audience. The communication should include salient details of the incident, an analysis of the developments that led to this incident based on all available facts and a commitment to come back with further updates as more fact patterns emerge. As required by the regulatory framework, there should be a communication to regulators, and exchanges. Much is achieved by the tone of the communication, factual yet constructive and concise but not obtuse or attempting concealment or suppression. A constructive communication underlines remedial steps being contemplated, impact on customers and steps being taken to prevent recurrence. In my life I have encountered several such situations, viz. performance below expectations to a significant customer fraud compromising the organization’s reputation, customer loyalty, market and regulatory standing. Delivering this message in the right tone to each constituency, acknowledging failure but proceeding to a sharp analysis of events and failure in systems contributing to the same and steps to prevent recurrence as well as recompense losses of those affected was a very deep learning experience, more than what many successes taught me."
    ],
    "whatThisMeans": "He states it plainly: the worst approach is to suppress bad news, and suppression is not an option. One has to agree a cogent communication strategy that includes all stakeholders and calibrates disclosure to the audience, including regulators and exchanges where the framework requires.",
    "whyItMatters": "The message should set out the salient details, an analysis of what led to the incident, and a commitment to update as facts emerge. Tone carries much of it: factual yet constructive, concise but never concealing, with remedial steps, the impact on customers and the steps to prevent recurrence. He says delivering such messages, including after a significant customer fraud, taught him more than many successes.",
    "reflect": "What bad news are you holding that your stakeholders would rather hear from you than discover?"
  },
  {
    "number": "10",
    "title": "Go Beyond the Call of Duty When the Organisation Is in Crisis",
    "quote": [
      "A situation that has stayed with me is a regulatory order served on a microfinance company on whose Board I served to temporarily cease and desist operations. This outcome was as a result of a perceived behavior whereby there was inadequate policy on pricing of products and insensitivity in collection practices. This choking of the company’s lifeline had a potentially debilitating impact on the solvency of the organization. The local team was not fully equipped to deal with this situation and therefore I felt that the best approach would be for me to go beyond the call of duty as a director to assist management in developing a multi-dimensional action plan to cope with the situation. It started with taking stock of the situation through a root-cause analysis of the problem understanding the points that created this regulatory perception and developing a granular action plan involving risk, business, finance, IT and Compliance. The action plan was monitored very closely and the effort resulted in the development of a remediation plan to the satisfaction of the regulators that eventually led to the lifting of the order. A concomitant part of the effort was a cogent communication plan with regulators in an open and constructive manner keeping them transparently apprised of the stagewise progress. Equally important was the assimilation of learnings from the episode."
    ],
    "whatThisMeans": "He recalls a regulatory order requiring a microfinance company, on whose Board he served, to temporarily cease operations, after perceived inadequacies in pricing policy and insensitivity in collection practices. The order threatened the company's solvency, and the local team was not fully equipped to respond.",
    "whyItMatters": "He chose to go beyond the call of duty as a director and help management build a multi-dimensional plan: a root-cause analysis, then a granular action plan across risk, business, finance, IT and compliance, monitored very closely. Open, constructive communication with the regulators, with transparent progress updates, led to the order being lifted, and he stresses assimilating the learnings from the episode.",
    "reflect": "When your organisation is in trouble, what would you do that sits outside your formal role?"
  },
  {
    "number": "11",
    "title": "Build for the Long Term, Even at a Short-Term Cost",
    "quote": [
      "This to my mind does not bear any elaboration as this is an inevitable part of the responsibilities of a leader to balance short term and long-term objectives. The attainment of the longer-term objective often happens through accretion of short-term targets but there is also the question of strategic choices that imply some compromises in short term profitability as resources have to be diverted for creating the foundation of the longer-term plan. This is a choice that is an essential part of the operating ethos of a company and is fundamental to building a credible and resilient institution as certain business initiatives may have a longer payback period. The fructification of these initiatives is often as critical to long term sustenance even by diverting some resources from attainment of short-term objectives."
    ],
    "whatThisMeans": "He says this needs little elaboration: balancing short-term and long-term objectives is an inevitable part of a leader's responsibility. Long-term goals are often reached through the accretion of short-term targets.",
    "whyItMatters": "Strategic choices sometimes mean accepting lower short-term profitability because resources must be diverted to lay the foundation of the longer-term plan. That choice is part of a company's operating ethos and fundamental to building a credible, resilient institution, since some initiatives have a longer payback period.",
    "reflect": "What are you funding today that will only pay back after your current targets are met?"
  },
  {
    "number": "12",
    "title": "Trust Follows the Leader Who Stands by the Team",
    "quote": [
      "In my assessment the one quality which actually creates trust in a leader is the realization and faith that the leader will stand by his team irrespective of the outcome of a decision. In typical organizational dynamics, decisions are taken based on the best available data set and this may meet different degrees of reliability and also be subject to underlying assumptions. Typically, these are discussed collaboratively and then the leader takes some calls based on best available information. The team then executes and some plans fructify and some go awry. The best leader is one who passes on the glory of his successes to the team but stands up for failures without pinpointing responsibility to others especially externally. In internal meetings of course there is room for post mortem to learn from mistakes but to the outside world, a leader who stands steadfast behind his team earns the maximum extent of respect and cooperation. This inculcates a culture in the team to give of their best knowing that the leader will not be unreasonable and this elevates the quality of team-spirit and participation manifold."
    ],
    "whatThisMeans": "For him the one quality that creates trust is the faith that the leader will stand by the team irrespective of the outcome of a decision. Decisions rest on the best available data and assumptions; some plans succeed and some go awry.",
    "whyItMatters": "The best leader passes the glory of success to the team but stands up for failures without pinpointing responsibility on others, especially externally. A post-mortem has a place in internal meetings, but to the outside world a leader who stands steadfastly behind the team earns the maximum respect and cooperation, and the team gives its best knowing that.",
    "reflect": "The last time something went wrong, what did you say to people outside your team?"
  }
];

const principlesPart3: Principle[] = [
  {
    "number": "13",
    "title": "From Direct Authority to Influence",
    "quote": [
      "As I transitioned from being an executive responsible for running a function to providing oversight and independent judgment at board level, there were several subtle shifts which took me some time to understand and appreciate. As an executive one exercises direct authority and has direct access to information including all the building blocks that go behind it as well as being associated with the process as they take shape. As a Board member, one has authority but it is of a surrogate and vicarious nature, exercised indirectly by respect and influence. One has access to information with limited lead time and detail and it often comes in a preformatted form, whereby one can seek additional detail but within limitations. Therefore, one has to develop several skills, notably the ability to understand the data that is presented and ask incisive questions that underscore the depth and breadth of understanding, connect dots and elicit responses that complement the gap. Equally through this process one develops bridges of credibility. Also, by demonstrating a degree of maturity and acumen bred out of years of experience in multiple situations, one contributes in a manner that enhances one’s acceptability. Furthermore, the fact that one is a little remote from day-to-day vicissitudes, enhances the clarity of thought and objectivity of decision making by visualizing multiple scenarios and what-if situations."
    ],
    "whatThisMeans": "Moving from executive to board member, he describes authority that is surrogate and vicarious rather than direct, exercised through respect and influence, and information that arrives with limited lead time and detail, often in a preformatted form.",
    "whyItMatters": "That calls for new skills: understanding the data presented, asking incisive questions that show depth of understanding, connecting dots, and eliciting responses that fill the gap. Credibility and acceptability grow through maturity and acumen, and being a little removed from day-to-day vicissitudes improves clarity of thought and objectivity through multiple scenarios.",
    "reflect": "If you lost direct authority tomorrow, what questions would you rely on to be heard?"
  },
  {
    "number": "14",
    "title": "Founders Need the Full Picture",
    "quote": [
      "I have found that start-up entrepreneurs in their excitement and enthusiasm to see their ideas to fruition tend to become unipolar in their thinking and fail to develop an appreciation of the connected interplay of various factors that influence the outcome of their enterprise. For example, they often tend to de-emphasize the importance of prudent accounting principles and methodologies for income recognition or risk evaluation. These matters may lead to qualifications by statutory auditors or emphasis of matter in their reports to the Board and paradoxically these very lacunae have an impact on the valuation of the enterprise in the eyes of the market thus impacting the very objectives they seek to achieve. Often these companies have a cross-border operation and then they need to develop an appreciation of aspects like management of currency risks or regulatory compliance in different jurisdictions. Thus, they tend to create an ambitious footprint without an adequate understanding of the underlying risks and create unforeseen vulnerabilities. Other common omissions lead to appreciation of data privacy considerations, IT security considerations and making adequate investments to address these requirements."
    ],
    "whatThisMeans": "From mentoring start-up entrepreneurs, he sees a common pattern: in their excitement to see ideas through, founders become unipolar in their thinking and miss the interplay of the factors that shape the outcome.",
    "whyItMatters": "He points to de-emphasised accounting principles for income recognition and risk evaluation, which can lead to auditor qualifications and affect valuation in the eyes of the market. He adds cross-border blind spots, such as currency risk and regulation in different jurisdictions, and omissions around data privacy, IT security and the investment needed to address them.",
    "reflect": "Which part of your business are you treating as someone else's problem until it becomes your valuation problem?"
  },
  {
    "number": "15",
    "title": "Excellence Without Empathy Does Not Deliver",
    "quote": [
      "Professional excellence by itself cannot lead to results without empathy and an understanding of people. The organization is comprised of people of varying capabilities and the leader has to shape the team to drive it towards overall excellence. Empathy in turn inculcates a culture of commitment that drives employees to maximize their effort and commitment. There is also a huge dissemination effect by observing others in the organization. In my professional experience there was an instance where a promising employee got impacted by a debilitating illness. Despite a lot of pressure to grant him a financial settlement and replace the vacancy because of headcount pressures I called my team into a huddle and said that we owed it to our colleague to individually step up and fill in for him. Despite work pressures the entire team readily agreed and this created a positive influence that no amount of financial incentives or inducements could achieve. This underscores the enormous positive impact of empathy on the part of the leader that delivers an extremely impactful message that resonates across the organization."
    ],
    "whatThisMeans": "He says professional excellence cannot by itself produce results without empathy and an understanding of people. An organisation is made of people of varying capabilities, and the leader shapes them towards excellence.",
    "whyItMatters": "His example is a promising employee struck by a debilitating illness. Despite pressure to grant a financial settlement and replace him because of headcount constraints, he asked the team to step up and fill in for their colleague, and they agreed. He says this had a positive influence that no financial incentive could have achieved.",
    "reflect": "When did you last choose to carry a colleague rather than replace them, and what did your team learn from it?"
  },
  {
    "number": "16",
    "title": "Quantitative Rigour and a Broader Lens",
    "quote": [
      "My engineering degree at IIT Kharagpur put me through a syllabus of quantitative rigor that led to exceptional sharpening of numerate and basic analytical skills. It created the capacity to deal with abstruse and complex mathematical and statistical models that created a mental framework for decision making by breaking a complex problem into simple variables understanding their interplay and developing a predictive ability to simulate outcomes. The range of courses in basic physical sciences to applied disciplines enabled me to get a clear understanding of how technology has been built on the basic principles of physical sciences. If IIT provided the quantitative foundational depth, IIM was a completely different experience by exposing me to a range of economic principles, behavioral sciences, elements of political history and social sciences that led to a deep appreciation of the softer skills and widening as well as deepening of the intellectual span. It taught me to look at history and sociopolitical as well as economic issues with a different lens and exposed me to an academic fraternity that were actually putting these skills to work in a variety of industry and policy situations. To this day I feel that my engineering degree created a quantitative bias in me that enabled me to relate to financial management theory, risk modelling or capital planning and translate these to situations that I encountered as CFO. It is my firm conviction that an Engineer/MBA is in no way an inferior qualification for a CFO as is sometimes attributed."
    ],
    "whatThisMeans": "He credits IIT Kharagpur with quantitative rigour and the capacity to break a complex problem into simple variables and simulate outcomes, and IIM Calcutta with exposure to economic principles, behavioural sciences, political history and the social sciences.",
    "whyItMatters": "Together they gave him the intellectual span and softer skills he later brought to financial management theory, risk modelling and capital planning as CFO. He is firmly of the view that an Engineer/MBA is in no way an inferior qualification for a CFO.",
    "reflect": "Which of your two strongest skills do you lean on too heavily, and which have you under-developed?"
  },
  {
    "number": "17",
    "title": "Teach Ethics Through Real Cases",
    "quote": [
      "I think universities must instill in future leaders the strongest sense of ethical conduct and values that will propel their conduct like a beacon through their lives. This should be done through a curated set of courses enunciating the core principles of ethical conduct supported by case studies from live business situations drawing upon examples of business leaders who have abided by the highest principles of ethical conduct as well as those of the other kind. Examples can be drawn from real life successes and failures and what are the lessons to be drawn from such case studies. The development of ethical conduct can be the ultimate outcome of prudential risk management and compliance principles that will equip students with an awareness that will serve them well through their careers."
    ],
    "whatThisMeans": "If he could influence future finance professionals, he would want universities to instil the strongest sense of ethical conduct and values, to propel their conduct like a beacon through their lives.",
    "whyItMatters": "He proposes a curated set of courses on the core principles of ethical conduct, supported by case studies from live business situations, with leaders who held the highest principles as well as those who did not, and with lessons drawn from real successes and failures. Ethical conduct, he adds, can be the ultimate outcome of prudential risk management and compliance principles.",
    "reflect": "Which real case, a success or a failure, taught you the most about ethics?"
  },
  {
    "number": "18",
    "title": "Choose Your First Organisation Carefully",
    "quote": [
      "I would urge a young finance professional to be judicious in their initial career choices as this leaves a permanent imprint on their career. They should serve their initial period of apprenticeship in a firm or organization known for the quality of their financial systems, policies and processes. This creates a firm imprint in their minds and becomes a template for their future learning and what they can apply to other situations. This may entail some degree of compromise on the speed of their progression but rather than getting frustrated, they should use this period to maximize their learning by an exposure to the wide repertoire of learning materials available."
    ],
    "whatThisMeans": "His principle for a young finance professional is to be judicious in the initial career choices, because they leave a permanent imprint. The apprenticeship should be served in a firm known for the quality of its financial systems, policies and processes.",
    "whyItMatters": "That creates a template for later learning that can be applied in other situations. It may mean some compromise on the speed of progression, but he asks them to use the period to maximise learning from the wide repertoire available, rather than getting frustrated.",
    "reflect": "What is your current employer teaching you that you could carry into any future role?"
  }
];

const principlesPart4: Principle[] = [
  {
    "number": "19",
    "title": "Listening Changed Me Most",
    "quote": [
      "Over the years the experience that has changed me most as a person is to learn to devote a greater attention to listening skills. I have learnt that becoming more receptive to the views of others as expressed in conversation or discussion leads to a diversity of thought that breeds a richness and enables in the formulation of one’s own ideas in a more inclusive way that not only enhances the intellectual content but also other dimensions as human appeal, attention to various risks in execution or highlighting points that initially eluded me. This has been a single most important factor in developing my overall acumen and the qualities I bring to bear."
    ],
    "whatThisMeans": "The experience that changed him most as a person was learning to devote greater attention to listening. Becoming more receptive to others' views, in conversation or in discussion, brings a diversity of thought and a richness to one's own ideas.",
    "whyItMatters": "It makes one's thinking more inclusive, adds human appeal, draws attention to risks in execution and highlights points that had eluded him. He calls it the single most important factor in developing his overall acumen and the qualities he brings.",
    "reflect": "In your next discussion, what could you learn by speaking last?"
  },
  {
    "number": "20",
    "title": "Look Beyond Achievement to a Fuller Life",
    "quote": [
      "This is indeed a question that prompts you to look back on your life. As I picture myself as a young strapling cast into the complex world of commercial life in Mumbai from the relatively sheltered environs of business school, I would tell myself to do something yet simultaneously realizing whether it is at all possible, namely to develop a more inclusive view of life. In my academic life, I was imbued with a spirit to strive for academic excellence to the exclusion of many other facets of life that would have contributed to developing a richer view of life. If I were to live life again, I would have sought to participate to a greater degree in community initiatives as an example. Another aspect I would have focused on is to make a greater effort to nurture relationships. I do realize that this has been greatly facilitated by the enormous strides made in social media that we lacked in our younger years. Another theme I would focus on is to make a greater effort to participate more closely and emotively in the growth phase of my children because I have realized sadly that as they go through adolescence their own lives acquire a centrality and the childhood experience does not come back for sharing."
    ],
    "whatThisMeans": "Speaking to his younger self, a young man cast into commercial life in Mumbai from the sheltered environment of business school, he would encourage a more inclusive view of life. He had been driven by academic excellence to the exclusion of other facets of life.",
    "whyItMatters": "He would have taken part more in community initiatives, made a greater effort to nurture relationships, and participated more closely and emotively in the growth of his children, since childhood does not come back for sharing once adolescence gives them lives of their own.",
    "reflect": "What are you postponing today that will not be available to share later?"
  },
  {
    "number": "21",
    "title": "Uphold Ethical Values Without Compromise",
    "quote": [
      "A principle that I have sought to follow throughout my life, I do not know with what degree of success, is to uphold without any compromise ethical values and principles. Across my experience initially as a junior executive and then ascending the layers of seniority to the world beyond executive life, in the world of Boards, I have learnt that respect is ultimately earned through one’s conduct and that has as much influence on others as other parameters of success. These values are developed in one’s initial years and one has a chance to display them in later life that this is a silent ambassador that is instrumental to earning the respect of peers and others alike. In doing so one often has to choose between an easier and more difficult path but the choice has enduring value that manifests itself in multifarious ways. Inasmuch as exercising this choice has not always been easy, I would not trade this for anything else."
    ],
    "whatThisMeans": "The principle he has tried to follow throughout his life, without knowing, he says, with what degree of success, is to uphold ethical values and principles without any compromise. Respect, he has learnt, is ultimately earned through one's conduct and carries as much influence as other measures of success.",
    "whyItMatters": "Those values are formed in one's initial years and displayed later, a silent ambassador that earns the respect of peers and others. It often means choosing between an easier and a more difficult path, and although it has not always been easy, he says he would not trade it for anything else.",
    "reflect": "Which choice in the last year was the harder path, and would you make it again?"
  },
  {
    "number": "22",
    "title": "No Principle He Would Change",
    "quote": [
      "I searched repeatedly but could not find any single principle that I had once held strongly but would like to change because of my experience."
    ],
    "whatThisMeans": "Asked which belief he once held strongly but changed because of experience, he answers with candour: he searched repeatedly and could not find any single principle that he would change.",
    "whyItMatters": "We have kept this answer exactly as given. It stands beside his answer on the principle that has stayed with him, as a statement that the values he formed early have held through his career.",
    "reflect": "Which of your beliefs have you tested against experience, and which have you simply not examined?"
  },
  {
    "number": "23",
    "title": "How Can Corporate India Close the Gap?",
    "quote": [
      "A question I often ask, to which I do not have a complete answer is how in a developing economy like India the business community can express a greater degree of social awareness and contribute to the well-being of the community. As our country is progressing rapidly along the path of economic development, sadly the disparities between different strata of society are increasing. How can corporate India help in closing this gap, for which there could be several ways say enhancing the scope of CSR activities, greater participation in the community efforts such as skilling. This is something for which I do not have a complete answer."
    ],
    "whatThisMeans": "The question he still asks is how, in a developing economy like India, the business community can express a greater degree of social awareness and contribute to the well-being of the community.",
    "whyItMatters": "He observes that as the country advances rapidly in economic development, the disparities between different strata of society are increasing. He wonders how corporate India can help close the gap, perhaps by enhancing the scope of CSR activities and greater participation in community efforts such as skilling, and says plainly that he does not have a complete answer.",
    "reflect": "What can your organisation do within its own reach to narrow the gap he describes?"
  },
  {
    "number": "24",
    "title": "Choose the Right Principle Without an Eye on the Outcome",
    "quote": [
      "The one principle from my entire journey that I would like to be remembered is that here was somebody who always chose the path of the right principle without an eye on the outcome, who was not influenced by any other factor other than upholding the principles that would lead the organization who had retained my services in the right direction first ethically and then upholding customer interests. If I was an executive, I sought to maximize the performance of the organization in a legitimate way whereas as an Independent Director I sought to spare no effort to enhance the effectiveness of the Board even if this entailed presenting an alternate view to the majoritarian view."
    ],
    "whatThisMeans": "Asked for the one principle he would want to be remembered by, he describes someone who always chose the path of the right principle without an eye on the outcome, influenced by nothing except upholding principles, first ethically and then in the interest of customers.",
    "whyItMatters": "As an executive he sought to maximise the organisation's performance in a legitimate way; as an Independent Director he sought to spare no effort to enhance the Board's effectiveness, even when that meant presenting a view different from the majority's.",
    "reflect": "When did you last present a view the majority did not share, and what did it cost you?"
  },
  {
    "number": "25",
    "title": "Hold Your Core Principles Sacrosanct",
    "quote": [
      "I would like to narrate here an experience that I encountered in my Board experience. I was a member of a Board of a Bank that merged with a NBFC that amounted to a virtual management buyout. I would like to believe that I had played a formative role in the evolution of the Bank Board. This was not appreciated by the incoming management, the MD of the NBFC who became the MD of the bank as a succession arrangement. After a few weeks, he called me and said that he was uncomfortable with my participation in one other NBFC Boards. He started saying that his NBFC had certain proprietary practices and he feared loss of competitive position. I countered that there was no regulatory prohibition, I was signatory to a code of ethics and a fit and proper declaration and would follow in letter and spirit. As he still appeared to harbor doubt, I offered that the relationship was built on trust and if that was brought to question, it was not acceptable to me and I would rather walk away. Not expecting such a position, he protested that this was an extreme reaction. I stuck to my point of view and this is something I have not regretted, as I held my core principles sacrosanct."
    ],
    "whatThisMeans": "He closes with an episode from a Bank Board that merged with an NBFC in what amounted to a virtual management buyout. The incoming managing director, formerly of the NBFC, voiced discomfort about his participation on another NBFC's Board, citing proprietary practices and competitive position.",
    "whyItMatters": "He answered that there was no regulatory prohibition, that he was a signatory to a code of ethics and a fit-and-proper declaration, and that he would follow both in letter and spirit. When doubt persisted, he said the relationship was built on trust, and that if trust were questioned he would rather walk away. He has not regretted it, as he held his core principles sacrosanct.",
    "reflect": "Where is your line, and would you walk away if it were crossed?"
  }
];

const takeaways = [
  {
    "title": "Choose the path of the right principle without an eye on the outcome.",
    "body": "Ethics first, then the customer's interest, whether as an executive or as an independent director."
  },
  {
    "title": "Financial expertise is the framework, not the whole role.",
    "body": "Weave together strategy, risk, people and governance, and treat numbers as the skeleton of an approach."
  },
  {
    "title": "Numbers need judgement beside them.",
    "body": "Where risks cannot be quantified, make the judgement explicit and explain the rationale."
  },
  {
    "title": "Prepare, ask honestly and choose your issues.",
    "body": "Independence on a board rests on knowledge, honesty of purpose and not debating trivialities."
  },
  {
    "title": "Never suppress bad news.",
    "body": "Communicate factually and constructively, with remedial steps and a commitment to update."
  },
  {
    "title": "Trust follows the leader who stands by the team.",
    "body": "Pass on the glory of success and stand up for failures."
  },
  {
    "title": "Respect is earned through conduct.",
    "body": "Ethical values formed early are a silent ambassador throughout a career."
  }
];

const tags = [
  "Financial Leadership",
  "Governance & Accountability",
  "Risk & Judgement",
  "Boards & Independence",
  "Mentorship",
];

const toExplore = [
  "Leadership in financial services",
  "Governance & accountability",
  "Risk, compliance & judgement",
  "Boards & independent thinking",
  "Mentorship & the next generation",
];

const bridge = [
  "Former CFO, Citi India Subcontinent (retired 2015)",
  "Former Senior Advisor, EY (Banking & Financial Services)",
  "Member, Risk Committee, National Stock Exchange",
];

function PullQuote({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <p className="text-3xl font-serif leading-snug">{children}</p>
      <p className="mt-4 text-sm text-neutral-500">Abhijit Sen — {label}, Stated</p>
    </section>
  );
}

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
        / Abhijit Sen
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/abhijit-portrait.jpg"
            alt="Abhijit Sen"
            width={844}
            height={844}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Abhijit Sen · Former CFO, Citi India Subcontinent
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 027
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Abhijit <em>Sen</em>
        </h1>

        <p className="mt-3 text-base font-medium">Financial Leadership, Governance &amp; Mentorship</p>
        <p className="mt-1 text-sm text-neutral-500">
          Former CFO, Citi India Subcontinent · Board Member · Governance Expert · Mentor
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;Uphold, without any compromise, ethical values and principles.&rdquo;
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
          <p className="font-medium">33 minutes</p>
        </div>
        <div>
          <p className="text-neutral-400">Principles</p>
          <p className="font-medium">25 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">October 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-neutral-200 px-3 py-1 text-neutral-600">
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
          Abhijit Sen is a respected financial services leader with a distinguished career
          spanning global banking, governance, risk and advisory roles. He retired from Citi in
          2015 as Chief Financial Officer &ndash; India Subcontinent after nearly two decades,
          with responsibility for finance, strategic planning, controllership, tax and treasury
          across India, Bangladesh and Sri Lanka. He is currently associated with several Boards,
          Audit and Risk Committees, and mentors start-up entrepreneurs.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          His principles explore how organisations can grow with integrity, responsibility and
          long-term purpose: building resilient organisations and creating long-term value,
          making responsible decisions and upholding institutional trust, balancing growth, risk
          and regulatory realities, what makes effective boards and committees, and guidance for
          young professionals and entrepreneurs.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          His experience spans strategic planning, controllership, tax, treasury and corporate
          governance, as Former Senior Advisor at EY (Banking &amp; Financial Services), and in
          Board and committee roles across leading institutions including Kalyani Forge,
          Manappuram Finance, HDFC Credila and others.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-neutral-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Principles to explore
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-700">
              {toExplore.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-neutral-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              A journey of impact
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-700">
              {bridge.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
        <blockquote className="mt-6 border-l-2 border-neutral-300 pl-4 text-lg italic text-neutral-700">
          &ldquo;We asked Abhijit Sen twenty-four questions, and one open reflection. He answered
          from his years in financial leadership, governance and mentorship.&rdquo;
        </blockquote>
        <p className="mt-4 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what he stands for, stated publicly, in
          his own words. This is how <em>Stated Principles</em> works: the person states their
          beliefs. We make them visible. You decide what to carry forward.
        </p>
      </section>

      {/* Principles 1-4 */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Twenty-five principles · Stated by Abhijit Sen
        </p>
        <h2 className="mt-3 text-3xl font-serif">What he stands for — in his own words.</h2>
        <div className="mt-12 space-y-20">
          {principles.map((p) => (
            <PrincipleCard key={p.number} p={p} />
          ))}
        </div>
      </section>

      <PullQuote label="Principle I">
        &ldquo;Financial expertise provides the framework
        <br />
        <em>around which is constructed the wider contours of a CFO&rsquo;s role.</em>&rdquo;
      </PullQuote>

      {/* Principles 7-12 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart2.map((p) => (
            <PrincipleCard key={p.number} p={p} />
          ))}
        </div>
      </section>

      <PullQuote label="Principle XII">
        &ldquo;A leader who stands steadfast behind his team
        <br />
        <em>earns the maximum extent of respect and cooperation.</em>&rdquo;
      </PullQuote>

      {/* Principles 13-18 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart3.map((p) => (
            <PrincipleCard key={p.number} p={p} />
          ))}
        </div>
      </section>

      <PullQuote label="Principle XVII">
        &ldquo;Universities must instill in future leaders
        <br />
        <em>the strongest sense of ethical conduct and values.</em>&rdquo;
      </PullQuote>

      {/* Principles 19-25 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart4.map((p) => (
            <PrincipleCard key={p.number} p={p} showCta />
          ))}
        </div>
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
          Post a commitment inspired by Abhijit Sen&apos;s principles. State it publicly — and
          make it real.
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
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(URL)}&text=${encodeURIComponent(DESCRIPTION)}`}
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
        <p className="mt-4 text-sm text-neutral-500">33 min read · 25 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
