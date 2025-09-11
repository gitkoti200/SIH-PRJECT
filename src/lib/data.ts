import type { AnalyzedComment } from './types';

const MOCK_ANALYZED_COMMENTS: AnalyzedComment[] = [
  {
    id: 'c1',
    author: 'Tech Innovators Inc.',
    timestamp: '2024-07-15T10:30:00Z',
    provision: 'Section 5.1 - Data Privacy',
    comment:
      'We strongly support the enhanced data privacy measures in Section 5.1. This aligns with global best practices and will build consumer trust. However, the implementation timeline seems aggressive. We suggest a phased rollout to allow businesses to adapt their systems effectively.',
    sentiment: 'positive',
    sentimentScore: 0.7,
    summary:
      'The stakeholder supports the new data privacy measures but expresses concern about the aggressive implementation timeline, suggesting a phased rollout.',
    keywords: ['data privacy', 'consumer trust', 'implementation', 'phased rollout'],
  },
  {
    id: 'c2',
    author: 'Small Business Federation',
    timestamp: '2024-07-15T11:45:00Z',
    provision: 'Section 3.2 - Compliance Reporting',
    comment:
      'The compliance reporting requirements under Section 3.2 are overly burdensome for small businesses. The cost and complexity of the new systems will be prohibitive for many of our members. This could stifle innovation and competition. We request an exemption for businesses with under 50 employees.',
    sentiment: 'negative',
    sentimentScore: -0.85,
    summary:
      'The stakeholder finds the compliance reporting requirements too burdensome and costly for small businesses, warning it could stifle innovation. They request an exemption for small businesses.',
    keywords: ['compliance', 'small business', 'burdensome', 'cost', 'exemption'],
  },
  {
    id: 'c3',
    author: 'Consumer Rights Group',
    timestamp: '2024-07-16T09:15:00Z',
    provision: 'Section 7.4 - Dispute Resolution',
    comment:
      'The dispute resolution mechanism outlined in Section 7.4 is a significant step forward for consumer protection. It provides a clear and accessible process. We commend the committee for this provision. We would like to see stronger enforcement clauses tied to the outcomes.',
    sentiment: 'positive',
    sentimentScore: 0.9,
    summary:
      'The stakeholder praises the new dispute resolution mechanism for its clarity and accessibility, calling it a major improvement for consumer protection. They suggest adding stronger enforcement clauses.',
    keywords: ['dispute resolution', 'consumer protection', 'accessible process', 'enforcement'],
  },
  {
    id: 'c4',
    author: 'Logistics & Supply Chain Assoc.',
    timestamp: '2024-07-16T14:00:00Z',
    provision: 'Section 2.1 - Cross-Border Trade',
    comment:
      'Section 2.1 regarding cross-border e-commerce is unclear on the tariff implications for digital goods. This ambiguity creates uncertainty for our members. We need more specific language to ensure predictable operations. The current wording is unworkable.',
    sentiment: 'negative',
    sentimentScore: -0.6,
    summary:
      'The stakeholder finds the section on cross-border e-commerce ambiguous regarding tariffs on digital goods. They state this creates uncertainty and demand more specific, workable language.',
    keywords: ['cross-border', 'e-commerce', 'tariff', 'ambiguity', 'uncertainty'],
  },
  {
    id: 'c5',
    author: 'Independent Analyst',
    timestamp: '2024-07-17T16:20:00Z',
    provision: 'Overall Draft',
    comment:
      'The proposed legislation, "Digital Commerce Act of 2024," provides a comprehensive framework for the digital economy. It addresses key areas like data privacy, competition, and consumer rights. Further clarification is needed on several sections, but the overall direction is appropriate.',
    sentiment: 'neutral',
    sentimentScore: 0.1,
    summary:
      'The stakeholder views the legislation as a comprehensive and appropriate framework for the digital economy, while noting that several sections require further clarification.',
    keywords: ['framework', 'digital economy', 'data privacy', 'clarification'],
  },
  {
    id: 'c6',
    author: 'Cybersecurity Forum',
    timestamp: '2024-07-18T11:05:00Z',
    provision: 'Section 5.3 - Data Breach Notifications',
    comment:
      "The 72-hour data breach notification window is a positive move for transparency. However, it fails to account for the complexity of forensic investigations. A rigid deadline could lead to incomplete or inaccurate initial reports. We propose a two-stage reporting process: an initial notification within 72 hours and a detailed report within 30 days. This balances speed with accuracy.",
    sentiment: 'neutral',
    sentimentScore: 0.3,
    summary:
      'The stakeholder supports the 72-hour data breach notification window for transparency but is concerned it may lead to inaccurate reporting due to complex investigations. They propose a two-stage reporting process.',
    keywords: ['data breach', 'transparency', 'forensic investigation', 'accuracy', 'reporting process'],
  },
  {
    id: 'c7',
    author: 'Venture Capital Union',
    timestamp: '2024-07-18T15:50:00Z',
    provision: 'Section 4.1 - Anti-Monopoly',
    comment:
      'The anti-monopoly clauses in Section 4.1 are too restrictive and could severely impact investment in the tech sector. The definition of "dominant market position" is overly broad and will create legal risks for fast-growing startups. This will chill innovation and discourage venture capital funding. The potential for disruption is massive and negative.',
    sentiment: 'negative',
    sentimentScore: -0.95,
    summary:
      'The stakeholder argues that the anti-monopoly clauses are too restrictive, with a broad definition of "dominant market position" that will deter investment, chill innovation, and create legal risks for startups.',
    keywords: ['anti-monopoly', 'investment', 'startups', 'legal risks', 'innovation'],
  },
];

export function getAnalyzedComments(): AnalyzedComment[] {
  // In a real app, this function would fetch comments from a DB
  // and then run them through the GenAI flows for analysis.
  // For this demo, we return mock, pre-analyzed data.
  return MOCK_ANALYZED_COMMENTS;
}
