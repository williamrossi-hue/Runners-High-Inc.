export interface Resource {
  name: string;
  category: string;
  populationsServed: string;
  areasOfService: string;
  contact: string;
  address: string;
  website: string;
  hours: string;
  type: 'mental-health' | 'physical-health' | 'substance-abuse' | 'family-mental-health' | 'family-physical-health' | 'family-substance-abuse';
}

export const resources: Resource[] = [
  // Substance Abuse
  {
    name: "SAMHSA National Helpline",
    category: "Hotline",
    populationsServed: "General Public, Individuals in Crisis, Families",
    areasOfService: "National",
    contact: "1-800-662-4357",
    address: "Nationwide",
    website: "https://findtreatment.gov",
    hours: "24/7",
    type: "substance-abuse"
  },
  {
    name: "988 Suicide & Crisis Lifeline",
    category: "Hotline",
    populationsServed: "General Public, Individuals in Crisis, Families",
    areasOfService: "National",
    contact: "Call/Text 988",
    address: "Nationwide",
    website: "https://988lifeline.org",
    hours: "24/7",
    type: "substance-abuse"
  },
  {
    name: "Alcoholics Anonymous (AA)",
    category: "Peer Support Network",
    populationsServed: "Adults, Peers in Recovery, Families",
    areasOfService: "National",
    contact: "Meeting finder on website",
    address: "Nationwide",
    website: "https://www.aa.org",
    hours: "Varies",
    type: "substance-abuse"
  },
  {
    name: "Narcotics Anonymous (NA)",
    category: "Peer Support Network",
    populationsServed: "Adults, Peers in Recovery, Families",
    areasOfService: "National",
    contact: "Meeting finder on website",
    address: "Nationwide",
    website: "https://www.na.org",
    hours: "Varies",
    type: "substance-abuse"
  },
  {
    name: "SMART Recovery",
    category: "Peer Support Network",
    populationsServed: "Adults, Peers in Recovery, Families",
    areasOfService: "National",
    contact: "440-951-5357",
    address: "Nationwide",
    website: "https://www.smartrecovery.org",
    hours: "Varies",
    type: "substance-abuse"
  },
  {
    name: "Al-Anon Family Groups",
    category: "Family Support",
    populationsServed: "Adults, General Public",
    areasOfService: "National",
    contact: "800-356-9996",
    address: "Nationwide",
    website: "https://al-anon.org",
    hours: "Varies",
    type: "substance-abuse"
  },
  {
    name: "Shatterproof",
    category: "Advocacy & Education",
    populationsServed: "Adults, General Public",
    areasOfService: "National",
    contact: "info@shatterproof.org",
    address: "Norwalk, CT",
    website: "https://www.shatterproof.org",
    hours: "Business hours",
    type: "substance-abuse"
  },
  {
    name: "211 Texas",
    category: "Referral Service",
    populationsServed: "Adults, General Public",
    areasOfService: "Texas – Statewide",
    contact: "Dial 2-1-1",
    address: "Texas",
    website: "https://www.211texas.org",
    hours: "24/7",
    type: "substance-abuse"
  },
  {
    name: "Be Well Texas",
    category: "Treatment Network",
    populationsServed: "Adults, General Public",
    areasOfService: "Texas – Statewide",
    contact: "Online intake",
    address: "Multiple TX locations",
    website: "https://bewelltexas.org",
    hours: "Varies",
    type: "substance-abuse"
  },
  {
    name: "Texas Health & Human Services – Substance Use",
    category: "Government Services",
    populationsServed: "General Public",
    areasOfService: "Texas – Statewide",
    contact: "512-776-7000",
    address: "Austin, TX",
    website: "https://www.hhs.texas.gov",
    hours: "Business hours",
    type: "substance-abuse"
  },
  {
    name: "Texas Recovers",
    category: "Resource Directory",
    populationsServed: "Adults, General Public",
    areasOfService: "Texas – Statewide",
    contact: "Online directory",
    address: "Texas",
    website: "https://texasrecovers.org",
    hours: "24/7",
    type: "substance-abuse"
  },
  {
    name: "Volunteers of America Texas",
    category: "Residential & Support Services",
    populationsServed: "Adults, Individuals with Substance Use Disorder",
    areasOfService: "Texas – Statewide",
    contact: "713-473-2801",
    address: "Texas",
    website: "https://www.voatx.org",
    hours: "Business hours",
    type: "substance-abuse"
  },
  {
    name: "Adult & Teen Challenge Texas",
    category: "Faith-Based Treatment",
    populationsServed: "Adults, Faith-Based Communities",
    areasOfService: "Texas – Statewide",
    contact: "512-476-8338",
    address: "Texas",
    website: "https://teenchallengetx.org",
    hours: "Varies",
    type: "substance-abuse"
  },
  {
    name: "The Council on Recovery",
    category: "Outpatient Treatment",
    populationsServed: "Adults, Working Individuals, Families",
    areasOfService: "Houston / Harris County",
    contact: "713-942-4100",
    address: "303 Jackson Hill St, Houston, TX",
    website: "https://www.councilonrecovery.org",
    hours: "Business hours",
    type: "substance-abuse"
  },
  {
    name: "Houston Recovery Center",
    category: "Recovery Support Center",
    populationsServed: "Adults, General Public",
    areasOfService: "Houston / Harris County",
    contact: "832-251-4000",
    address: "150 N Chenevert St, Houston, TX",
    website: "https://houstonrecoverycenter.org",
    hours: "24/7",
    type: "substance-abuse"
  },
  {
    name: "Cenikor Foundation – Houston",
    category: "Residential & Outpatient Treatment",
    populationsServed: "Adults, Individuals with Substance Use Disorder",
    areasOfService: "Houston / Harris County",
    contact: "281-476-4511",
    address: "Deer Park, TX",
    website: "https://www.cenikor.org",
    hours: "24/7 intake",
    type: "substance-abuse"
  },
  {
    name: "Santa Maria Hostel",
    category: "Residential Treatment",
    populationsServed: "Adults, Individuals with Substance Use Disorder",
    areasOfService: "Houston / Harris County",
    contact: "713-691-0900",
    address: "Houston, TX",
    website: "https://www.santamariahostel.org",
    hours: "24/7 intake",
    type: "substance-abuse"
  },
  {
    name: "Homeward Bound Inc.",
    category: "Residential Treatment",
    populationsServed: "Adults, Individuals with Substance Use Disorder",
    areasOfService: "Houston / Harris County",
    contact: "713-473-2801",
    address: "Houston, TX",
    website: "https://www.homewardboundinc.org/",
    hours: "24/7",
    type: "substance-abuse"
  },
  {
    name: "PaRC – Prevention & Recovery Center",
    category: "Outpatient & Inpatient",
    populationsServed: "Adults, Working Individuals, Families",
    areasOfService: "Houston / Harris County",
    contact: "713-774-8800",
    address: "Houston, TX",
    website: "https://parcbh.com",
    hours: "Varies",
    type: "substance-abuse"
  },
  {
    name: "Bay Area Council on Drugs & Alcohol",
    category: "Prevention & Recovery",
    populationsServed: "Adults, General Public",
    areasOfService: "Houston Metro",
    contact: "281-284-0023",
    address: "Clear Lake, TX",
    website: "https://www.bacoda.org",
    hours: "Business hours",
    type: "substance-abuse"
  },
  {
    name: "Harris County Public Health – Substance Use",
    category: "Public Health",
    populationsServed: "General Public",
    areasOfService: "Harris County",
    contact: "832-927-7800",
    address: "Houston, TX",
    website: "https://publichealth.harriscountytx.gov",
    hours: "Business hours",
    type: "substance-abuse"
  },
  {
    name: "Archway Academy",
    category: "Youth Recovery Education",
    populationsServed: "Youth, Adolescents, Families",
    areasOfService: "Houston Area",
    contact: "713-580-2100",
    address: "Houston, TX",
    website: "https://archwayacademy.org",
    hours: "School hours",
    type: "substance-abuse"
  },
  {
    name: "Memorial Hermann Prevention & Recovery Center",
    category: "Hospital-Based Treatment",
    populationsServed: "Adults, General Public",
    areasOfService: "Houston Area",
    contact: "713-939-7272",
    address: "Houston, TX",
    website: "https://memorialhermann.org",
    hours: "Varies",
    type: "substance-abuse"
  },
  {
    name: "Michael E. DeBakey VA SUD Program",
    category: "Veterans Treatment",
    populationsServed: "Veterans",
    areasOfService: "Houston Area",
    contact: "713-791-1414",
    address: "Houston, TX",
    website: "https://memorialhermann.org",
    hours: "Business hours",
    type: "substance-abuse"
  },
  {
    name: "PaRC – The Woodlands",
    category: "Outpatient Treatment",
    populationsServed: "Adults, Working Individuals, Families",
    areasOfService: "Montgomery County, TX",
    contact: "281-364-3685",
    address: "The Woodlands, TX",
    website: "https://parcbh.com",
    hours: "Varies",
    type: "substance-abuse"
  },
  {
    name: "Arise Recovery Centers – The Woodlands",
    category: "Outpatient Treatment",
    populationsServed: "Adults, Working Individuals, Families",
    areasOfService: "Montgomery County, TX",
    contact: "281-719-6565",
    address: "The Woodlands, TX",
    website: "https://ariserecoverycenters.com/locations/the-woodlands/",
    hours: "Varies",
    type: "substance-abuse"
  },
  {
    name: "Shield Bearer – Conroe",
    category: "Residential Treatment",
    populationsServed: "Adults, Individuals with Substance Use Disorder",
    areasOfService: "Montgomery County, TX",
    contact: "936-441-5433",
    address: "Conroe, TX",
    website: "https://www.shieldbearer.org",
    hours: "Varies",
    type: "substance-abuse"
  },
  {
    name: "Montgomery County Drug Court (CARE)",
    category: "Court-Linked Program",
    populationsServed: "Adults, General Public",
    areasOfService: "Montgomery County, TX",
    contact: "936-538-8100",
    address: "Conroe, TX",
    website: "https://www.mctx.org",
    hours: "Business hours",
    type: "substance-abuse"
  },
  {
    name: "Career & Recovery Resources Inc.",
    category: "Workforce & Recovery Support",
    populationsServed: "Adults, General Public",
    areasOfService: "Houston / Harris County",
    contact: "713-754-7000",
    address: "Houston, TX",
    website: "https://careerandrecovery.org",
    hours: "Business hours",
    type: "substance-abuse"
  },
  {
    name: "SEARCH Homeless Services",
    category: "Housing & Recovery Support",
    populationsServed: "Adults, General Public",
    areasOfService: "Houston / Harris County",
    contact: "713-739-7752",
    address: "Houston, TX",
    website: "https://www.searchhomeless.org",
    hours: "Business hours",
    type: "substance-abuse"
  },
  {
    name: "Goodwill Houston – Recovery Employment",
    category: "Employment Support",
    populationsServed: "Adults, General Public",
    areasOfService: "Houston Area",
    contact: "713-692-1385",
    address: "Houston, TX",
    website: "https://www.goodwillhouston.org",
    hours: "Business hours",
    type: "substance-abuse"
  },
  {
    name: "Positive Recovery Centers",
    category: "Outpatient Treatment",
    populationsServed: "Adults, Working Individuals, Families",
    areasOfService: "Houston Area",
    contact: "877-476-0657",
    address: "Houston, TX",
    website: "https://positiverecovery.com",
    hours: "Varies",
    type: "substance-abuse"
  },

  // Mental Health
  {
    name: "988 Suicide & Crisis Lifeline",
    category: "Hotline",
    populationsServed: "Individuals in Crisis, Veterans, Youth, Adults",
    areasOfService: "National",
    contact: "Call/Text 988",
    address: "Online / Multiple Locations",
    website: "https://988lifeline.org",
    hours: "24/7",
    type: "mental-health"
  },
  {
    name: "Crisis Text Line",
    category: "Hotline",
    populationsServed: "Youth, Adults, Individuals in Crisis",
    areasOfService: "National",
    contact: "Text HOME to 741741",
    address: "Online / Multiple Locations",
    website: "https://www.crisistextline.org",
    hours: "24/7",
    type: "mental-health"
  },
  {
    name: "Veterans Crisis Line",
    category: "Hotline",
    populationsServed: "Veterans, Families",
    areasOfService: "National",
    contact: "Call 988 then Press 1",
    address: "Online / Multiple Locations",
    website: "https://www.veteranscrisisline.net",
    hours: "24/7",
    type: "mental-health"
  },
  {
    name: "SAMHSA National Helpline",
    category: "Hotline",
    populationsServed: "Adults, Families",
    areasOfService: "National",
    contact: "1-800-662-4357",
    address: "Online / Multiple Locations",
    website: "https://www.samhsa.gov/find-help/national-helpline",
    hours: "24/7",
    type: "mental-health"
  },
  {
    name: "The Trevor Project",
    category: "Hotline",
    populationsServed: "LGBTQ+ Youth, Individuals in Crisis",
    areasOfService: "National",
    contact: "866-488-7386",
    address: "Online / Multiple Locations",
    website: "https://www.thetrevorproject.org",
    hours: "24/7",
    type: "mental-health"
  },
  {
    name: "Postpartum Support International",
    category: "Hotline",
    populationsServed: "Parents, Families",
    areasOfService: "National",
    contact: "800-944-4773",
    address: "Online / Multiple Locations",
    website: "https://www.postpartum.net",
    hours: "Varies",
    type: "mental-health"
  },
  {
    name: "National Alliance on Mental Illness",
    category: "Nonprofit Support",
    populationsServed: "Adults, Families",
    areasOfService: "National",
    contact: "800-950-6264",
    address: "Online / Multiple Locations",
    website: "https://www.nami.org",
    hours: "Business Hours",
    type: "mental-health"
  },
  {
    name: "Mental Health America",
    category: "Nonprofit Support",
    populationsServed: "General Public",
    areasOfService: "National",
    contact: "703-684-7722",
    address: "Online / Multiple Locations",
    website: "https://www.mhanational.org",
    hours: "Business Hours",
    type: "mental-health"
  },
  {
    name: "Open Path Psychotherapy Collective",
    category: "Outpatient Clinic",
    populationsServed: "Adults, Youth",
    areasOfService: "National",
    contact: "Via Website",
    address: "Online / Multiple Locations",
    website: "https://openpathcollective.org",
    hours: "Varies",
    type: "mental-health"
  },
  {
    name: "FindTreatment.gov",
    category: "Public Health",
    populationsServed: "Adults, Families",
    areasOfService: "National",
    contact: "Via Website",
    address: "Online",
    website: "https://findtreatment.gov",
    hours: "24/7",
    type: "mental-health"
  },
  {
    name: "211 Texas",
    category: "Public Health",
    populationsServed: "General Public",
    areasOfService: "Texas Statewide",
    contact: "Dial 2-1-1",
    address: "Online / Multiple Locations",
    website: "https://www.211texas.org",
    hours: "24/7",
    type: "mental-health"
  },
  {
    name: "Texas Youth Helpline",
    category: "Hotline",
    populationsServed: "Youth, Families",
    areasOfService: "Texas Statewide",
    contact: "800-989-6884",
    address: "Online / Multiple Locations",
    website: "https://www.texasyouthhelpline.org",
    hours: "24/7",
    type: "mental-health"
  },
  {
    name: "NAMI Texas",
    category: "Nonprofit Support",
    populationsServed: "Adults, Families",
    areasOfService: "Texas Statewide",
    contact: "512-693-2000",
    address: "Online / Multiple Locations",
    website: "https://namitexas.org",
    hours: "Business Hours",
    type: "mental-health"
  },
  {
    name: "Mental Health America of Greater Houston",
    category: "Nonprofit Support",
    populationsServed: "General Public",
    areasOfService: "Texas Statewide",
    contact: "512-814-8486",
    address: "Online / Multiple Locations",
    website: "https://mhahouston.org/",
    hours: "Business Hours",
    type: "mental-health"
  },
  {
    name: "Texas Health and Human Services",
    category: "Public Health",
    populationsServed: "Adults, Youth, Families",
    areasOfService: "Texas Statewide",
    contact: "877-541-7905",
    address: "Online / Multiple Locations",
    website: "https://www.hhs.texas.gov",
    hours: "Business Hours",
    type: "mental-health"
  },
  {
    name: "Texas 988 Network",
    category: "Hotline",
    populationsServed: "Individuals in Crisis",
    areasOfService: "Texas Statewide",
    contact: "Call/Text 988",
    address: "Online",
    website: "https://www.hhs.texas.gov/services/mental-health-substance-use/mental-health-crisis-services/988-suicide-crisis-lifeline",
    hours: "24/7",
    type: "mental-health"
  },
  {
    name: "The Harris Center for Mental Health and IDD",
    category: "Community Mental Health Center",
    populationsServed: "Adults, Youth, Individuals in Crisis",
    areasOfService: "Houston/Harris County",
    contact: "713-970-7000",
    address: "Multiple Locations",
    website: "https://www.theharriscenter.org",
    hours: "24/7",
    type: "mental-health"
  },
  {
    name: "Harris County Psychiatric Center",
    category: "Inpatient Treatment",
    populationsServed: "Adults, Individuals in Crisis",
    areasOfService: "Houston/Harris County",
    contact: "713-741-5000",
    address: "2800 S MacGregor Way, Houston, TX 77021",
    website: "https://hcpc.uth.edu",
    hours: "24/7",
    type: "mental-health"
  },
  {
    name: "Montrose Center",
    category: "Community Mental Health Center",
    populationsServed: "LGBTQ+, Youth, Adults",
    areasOfService: "Houston/Harris County",
    contact: "713-529-0037",
    address: "401 Branard St, Houston, TX 77006",
    website: "https://www.montrosecenter.org",
    hours: "Business Hours",
    type: "mental-health"
  },
  {
    name: "Tri-County Behavioral Healthcare",
    category: "Community Mental Health Center",
    populationsServed: "Adults, Youth, Individuals in Crisis",
    areasOfService: "Montgomery County",
    contact: "936-521-6100",
    address: "Multiple Locations",
    website: "https://www.tcbhc.org",
    hours: "24/7",
    type: "mental-health"
  },

  // Physical Health
  {
    name: "Health Resources & Services Administration (HRSA)",
    category: "Public Health",
    populationsServed: "General Public, Uninsured",
    areasOfService: "National",
    contact: "877-464-4772",
    address: "Online / Multiple Locations",
    website: "https://www.hrsa.gov",
    hours: "Business Hours",
    type: "physical-health"
  },
  {
    name: "CDC National Health Information",
    category: "Public Health",
    populationsServed: "General Public",
    areasOfService: "National",
    contact: "800-232-4636",
    address: "Online",
    website: "https://www.cdc.gov",
    hours: "24/7",
    type: "physical-health"
  },
  {
    name: "Medicare",
    category: "Public Health",
    populationsServed: "Seniors, Individuals with Disabilities",
    areasOfService: "National",
    contact: "800-633-4227",
    address: "Online",
    website: "https://www.medicare.gov",
    hours: "24/7",
    type: "physical-health"
  },
  {
    name: "National Association of Free & Charitable Clinics",
    category: "Nonprofit Support",
    populationsServed: "Uninsured Adults, Families",
    areasOfService: "National",
    contact: "703-647-7427",
    address: "Online",
    website: "https://nafcclinics.org",
    hours: "Business Hours",
    type: "physical-health"
  },
  {
    name: "Texas Department of State Health Services",
    category: "Public Health",
    populationsServed: "General Public",
    areasOfService: "Texas Statewide",
    contact: "512-776-7111",
    address: "Online / Multiple Locations",
    website: "https://www.dshs.texas.gov",
    hours: "Business Hours",
    type: "physical-health"
  },
  {
    name: "Texas Health and Human Services",
    category: "Public Health",
    populationsServed: "Adults, Youth, Families",
    areasOfService: "Texas Statewide",
    contact: "877-541-7905",
    address: "Online",
    website: "https://www.hhs.texas.gov",
    hours: "Business Hours",
    type: "physical-health"
  },
  {
    name: "Harris Health System",
    category: "Hospital-Based Care",
    populationsServed: "Adults, Families",
    areasOfService: "Houston/Harris County",
    contact: "713-566-6509",
    address: "Multiple Locations",
    website: "https://www.harrishealth.org",
    hours: "24/7",
    type: "physical-health"
  },
  {
    name: "Legacy Community Health",
    category: "Community Health Center",
    populationsServed: "Adults, Youth, Families",
    areasOfService: "Houston/Harris County",
    contact: "832-548-5000",
    address: "Multiple Locations",
    website: "https://www.legacycommunityhealth.org",
    hours: "Business Hours",
    type: "physical-health"
  },
  {
    name: "San Jose Clinic",
    category: "Free Clinic",
    populationsServed: "Uninsured Adults",
    areasOfService: "Houston/Harris County",
    contact: "713-228-9411",
    address: "2615 Fannin St, Houston, TX 77002",
    website: "https://www.sanjoseclinic.org",
    hours: "Business Hours",
    type: "physical-health"
  },
  {
    name: "Montgomery County Public Health District",
    category: "Public Health",
    populationsServed: "General Public",
    areasOfService: "Montgomery County",
    contact: "936-523-5000",
    address: "Multiple Locations",
    website: "https://www.mcphd-tx.org",
    hours: "Business Hours",
    type: "physical-health"
  },
  // Family & Friends Resources
  {
    name: "Al-Anon Family Groups",
    category: "Family Support",
    populationsServed: "Adults, General Public",
    areasOfService: "National",
    contact: "800-356-9996",
    address: "Nationwide",
    website: "https://al-anon.org",
    hours: "Varies",
    type: "family-substance-abuse"
  },
  {
    name: "Nar-Anon Family Groups",
    category: "Family Support",
    populationsServed: "Families and Friends of Addicts",
    areasOfService: "National",
    contact: "800-477-6291",
    address: "Nationwide",
    website: "https://www.nar-anon.org",
    hours: "Varies",
    type: "family-substance-abuse"
  },
  {
    name: "NAMI Family Support Group",
    category: "Family Support",
    populationsServed: "Families of Individuals with Mental Illness",
    areasOfService: "National",
    contact: "800-950-6264",
    address: "Online / Multiple Locations",
    website: "https://www.nami.org/support-education/support-groups/nami-family-support-group",
    hours: "Varies",
    type: "family-mental-health"
  },
  {
    name: "Families Anonymous",
    category: "Family Support",
    populationsServed: "Families and Friends of those with Substance Use or Behavioral Issues",
    areasOfService: "National",
    contact: "800-736-9805",
    address: "Nationwide",
    website: "https://www.familiesanonymous.org",
    hours: "Varies",
    type: "family-substance-abuse"
  },
  {
    name: "Parent to Parent USA",
    category: "Family Support",
    populationsServed: "Parents of Children with Special Health Needs",
    areasOfService: "National",
    contact: "Via Website",
    address: "Nationwide",
    website: "https://www.p2pusa.org",
    hours: "Business Hours",
    type: "family-physical-health"
  },
  {
    name: "Family Voices",
    category: "Advocacy & Support",
    populationsServed: "Families of Children with Special Health Needs",
    areasOfService: "National",
    contact: "888-835-5669",
    address: "Nationwide",
    website: "https://familyvoices.org",
    hours: "Business Hours",
    type: "family-physical-health"
  },
  {
    name: "YES to YOUTH - Family Support",
    category: "Youth Services",
    populationsServed: "Youth, Families",
    areasOfService: "Montgomery County",
    contact: "281-292-6471",
    address: "Multiple Locations",
    website: "https://www.yestoyouth.org",
    hours: "Business Hours",
    type: "family-mental-health"
  }
];
