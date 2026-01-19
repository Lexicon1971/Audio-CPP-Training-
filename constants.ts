import { ModuleType, CourseModule, QuizQuestion } from './types';

export const POLICY_CPO = "Shane Mayer (0696919643)";
export const POLICY_PASTOR = "Lance Laughton (0824113255)";

export const COURSE_MODULES: CourseModule[] = [
  {
    id: ModuleType.INTRO,
    title: "Welcome to Child Protection Training",
    content: [
      { 
        text: "Welcome to the Germiston Baptist Church Child Protection Course.",
        extraInfo: "This training is mandatory for all volunteers working with minors. It aligns with the South African Children's Act 38 of 2005."
      },
      { 
        text: "Our mission is to create a safe environment for our children by combining good leadership with safe places and practices.",
        extraInfo: "A 'Safe Place' means visibility. Rooms should have windows, and doors should remain unlocked during ministry sessions."
      },
      { 
        text: `Current Child Protection Officer (CPO): ${POLICY_CPO}`,
        extraInfo: "The CPO is your first point of contact for any concerns. If they are unavailable, contact the Pastor."
      },
      { 
        text: "A 'Child' is defined as anyone under 18 years of age.",
        extraInfo: "This includes infants, primary schoolers, and teenagers in the youth group. The policy applies equally to all age groups."
      }
    ],
    imageUrl: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",
    narrationText: "Welcome to the Germiston Baptist Church Child Protection Course. We are committed to the safety and well-being of every child in our care. Our Child Protection Officer is Shane Mayer. Together, we ensure a ministry of integrity and safety."
  },
  {
    id: ModuleType.ABUSE_TYPES,
    title: "Identifying Abuse & Neglect",
    content: [
      { 
        text: "Abuse can be Physical, Sexual, Emotional, or Spiritual.",
        extraInfo: "Spiritual Abuse includes using religious authority to control, intimidate, or harm a child, or using the Bible to justify harmful behavior."
      },
      { 
        text: "It also includes Neglect, Exploitation, and Bullying (including social media).",
        extraInfo: "Exploitation involves using a child for another's benefit, including labor or emotional manipulation. Bullying includes repetitive harm via phone or internet."
      },
      { 
        text: "Misuse of authority or power is always wrong.",
        extraInfo: "Leaders hold a position of trust. Any relationship that blurs professional boundaries or exploits this trust is a policy violation."
      },
      { 
        text: "Look out for sudden behavior changes, withdrawal, or unexplained physical signs.",
        extraInfo: "Signs include: constant fatigue, sudden aggression, reluctance to go home, or regressive behaviors (e.g., bedwetting in older children)."
      }
    ],
    imageUrl: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 17V17.01M12 7V13",
    narrationText: "Abuse takes many forms, including emotional and spiritual harm. As teachers, you must be vigilant for signs of neglect, bullying, or sudden changes in a child's behavior. Any misuse of power is a violation of our sacred trust."
  },
  {
    id: ModuleType.CONDUCT,
    title: "Conduct & Behavior",
    content: [
      { 
        text: "The 'Two Adults' Rule: Never be alone in a room with a child. Always have another leader present.",
        extraInfo: "If you find yourself alone with a child, move to a public area immediately and alert a supervisor. Never close the door if you are the only adult."
      },
      { 
        text: "Language must be age-appropriate and reflect Christian character.",
        extraInfo: "Avoid coarse jokes, sexual innuendo, or nicknames that could be interpreted as belittling or overly familiar."
      },
      { 
        text: "No rough, physical, or sexually provocative games.",
        extraInfo: "Games involving wrestling, tickling, or 'piling on' are prohibited as they cross boundaries and can lead to accidental harm or discomfort."
      },
      { 
        text: "No alcohol, tobacco, or prohibited substances on church property.",
        extraInfo: "Leaders must set a positive example. Influence of any substance while supervising children is grounds for immediate dismissal."
      }
    ],
    imageUrl: "M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2522 22.1614 16.5523C21.6184 15.8524 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z",
    narrationText: "Our primary rule is the 'Two Adults' policy. Never find yourself alone in a room with a child. If you do, immediately find another leader to join you. Our language and behavior must always reflect Christ's character."
  },
  {
    id: ModuleType.BOUNDARIES,
    title: "Appropriate Touch",
    content: [
      { 
        text: "Hugging: Side-to-side only, and only if initiated by the child. No full-body hugs.",
        extraInfo: "Side hugs allow for a respectful distance while still providing comfort. Frontal hugs can feel intrusive to a child."
      },
      { 
        text: "Lap Sitting: Only for children under five (Grade R and below).",
        extraInfo: "If a toddler sits on your lap, it should be in a public setting where others are present. For older children, suggest they sit next to you."
      },
      { 
        text: "No tickling or prolonged physical contact.",
        extraInfo: "Tickling often involves touch in sensitive areas and can make children feel 'trapped' if they cannot tell you to stop effectively."
      },
      { 
        text: "Never touch a child in areas covered by a bathing suit.",
        extraInfo: "This is a universal 'Safe Touch' boundary. This rule applies even during games or when helping a child with clothing."
      }
    ],
    imageUrl: "M7 20V12H4M17 20V12H20M12 20V4M12 4L16 8M12 4L8 8",
    narrationText: "Physical contact should always be public, age-appropriate, and initiated by the child. We practice side-to-side hugs only. Lap sitting is reserved for children under 5. Remember, boundaries protect both the child and the leader."
  },
  {
    id: ModuleType.REPORTING,
    title: "Reporting Procedures",
    content: [
      { 
        text: "If a child confides in you: Listen, reassure, and don't promise total secrecy.",
        extraInfo: "Say: 'I am so glad you told me. I need to tell someone who can help keep you safe.' Never promise to keep it a secret from the CPO."
      },
      { 
        text: "Write down exactly what was said as soon as possible.",
        extraInfo: "Use the child's own words. Do not add your own interpretations or opinions. Record the date, time, and any visible marks."
      },
      { 
        text: `Report immediately to the Child Protection Officer (${POLICY_CPO}).`,
        extraInfo: "Reporting is a legal obligation. In South Africa, failure to report known abuse is a criminal offense under the Children's Act."
      },
      { 
        text: "If the CPO is involved or unavailable, report to the Pastor.",
        extraInfo: "Safety overrides hierarchy. If the concern involves the leadership, you have the right and duty to report to external authorities or social services."
      }
    ],
    imageUrl: "M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2ZM14 3.5L18.5 8H14V3.5Z",
    narrationText: "If a child makes a disclosure, stay calm and listen. Do not investigate yourself. Your job is to document what was said and report it immediately to Shane Mayer, our Child Protection Officer. Speed and confidentiality are vital."
  },
  {
    id: ModuleType.SAFETY,
    title: "Health, Safety & Transport",
    content: [
      { 
        text: "Injuries: Wear latex gloves for blood spills. Inform the CPO immediately.",
        extraInfo: "First aid kits are located in the passage between the auditorium and the hall (kitchen area). Always document even minor scrapes. An injury report form must be filled out for every incident."
      },
      { 
        text: "Transportation: Never transport a child in a private vehicle without written parental consent.",
        extraInfo: "In an emergency, if you must transport, ensure at least two adults are present in the vehicle at all times."
      },
      { 
        text: "Fire: Your primary responsibility is to get children safely to the designated parking area.",
        extraInfo: "Do not wait for parents to come get them. Lead the class to the assembly point and stay with them until a parent arrives there."
      },
      { 
        text: "Social Media: No photos of children on public platforms without signed consent.",
        extraInfo: "This includes WhatsApp statuses and private Facebook pages. Parental consent must be specifically for 'digital publication'."
      }
    ],
    imageUrl: "M19 17H5V7H19M19 5H5C3.89 5 3 5.9 3 7V17C3 18.1 3.89 19 5 19H19C20.1 19 21 18.1 21 17V7C21 5.9 20.1 5 19 5ZM11 11V15H13V11H11Z",
    narrationText: "Safety is our priority. For injuries, always use protective gear. Regarding transportation, you must have written permission before moving a child in a private car. In fire drills, lead your class to the parking lot. Never share photos of children without written parental permission."
  }
];

export const FINAL_QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "Who is the current Child Protection Officer (CPO) at Germiston Baptist Church?",
    options: ["Lance Laughton", "Shane Mayer", "John Smith", "The Pastor"],
    correctIndex: 1,
    explanation: "Shane Mayer is the designated CPO responsible for handling abuse allegations."
  },
  {
    id: "q2",
    question: "What is the 'Two Adults' rule?",
    options: [
      "Each child must bring two parents to church.",
      "A leader should never be alone in a room with a child; another adult must be present.",
      "Two adults are required to drive the church bus.",
      "Only two adults can teach a class at any time."
    ],
    correctIndex: 1,
    explanation: "The 'Two Adults' rule ensuring no adult is ever alone with a child is the cornerstone of our safety policy."
  },
  {
    id: "q3",
    question: "Which type of hug is considered appropriate?",
    options: ["Full-body bear hug", "Any hug the child wants", "Side-to-side hug initiated by the child", "Hugs are never allowed"],
    correctIndex: 2,
    explanation: "We only permit side-to-side hugs to maintain respectful boundaries."
  },
  {
    id: "q4",
    question: "What is required before transporting a child in a private vehicle?",
    options: ["Telling another teacher", "Nothing, it is part of the job", "Written parental consent", "Verbally asking the child"],
    correctIndex: 2,
    explanation: "Written parental consent is mandatory for transporting any child in a private vehicle."
  },
  {
    id: "q5",
    question: "If a child discloses abuse, what is your first documentation step?",
    options: ["Interpret their feelings", "Write down exactly what the child said", "Wait 24 hours to be sure", "Call the parents first"],
    correctIndex: 1,
    explanation: "Accurate documentation of the child's exact words is critical for the reporting process."
  }
];