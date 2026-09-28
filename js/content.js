/* ============================================================
   Content — NL & EN — Mertcan Özbek portfolio
   ============================================================ */

const CV_FILES = {
  nl: 'cv/Mertcan-Ozbek-CV-NL.pdf',
  en: 'cv/Mertcan-Ozbek-CV-EN.pdf'
};

const CONTACT_EMAIL = 'mertozbek.1994@gmail.com';

const CONTENT = {
  nl: {
    meta: {
      title: 'Mertcan Özbek — ICT Professional & ServiceNow Engineer',
      description: 'Portfolio van Mertcan Özbek: ICT professional met ervaring in enterprise Microsoft 365, ServiceNow en ITIL.'
    },
    nav: {
      about: 'Over mij',
      experience: 'Ervaring',
      skills: 'Vaardigheden',
      certs: 'Certificaten',
      projects: 'Projecten',
      contact: 'Contact',
      cv: 'CV'
    },
    sec: {
      about: 'Over mij',
      experience: 'Werkervaring',
      skills: 'Vaardigheden',
      certs: 'Certificaten',
      projects: 'Projecten',
      contact: 'Contact'
    },
    hero: {
      role: 'ICT Professional · ServiceNow Engineer · ITIL',
      actions: { cv: 'Download CV', contact: 'Contact' },
      intro: [
        {
          cmd: 'whoami',
          out: [{ text: 'mertcan-ozbek — ICT professional · Rotterdam' }]
        },
        {
          cmd: 'cat profile.txt',
          out: [
            { text: 'Enterprise Microsoft 365 · Incident- / probleem- / changemanagement (ITIL)' },
            { text: 'ServiceNow · Intune · Azure AD' }
          ]
        },
        {
          cmd: 'ls skills/',
          out: [{ text: 'microsoft-365  azure  servicenow  itil  intune  javascript' }]
        },
        {
          cmd: './status.sh',
          out: [
            { text: '● Actueel: ServiceNow Engineer @ Devoteam', cls: 't-accent' },
            { text: '● Status: open voor nieuwe opportuniteiten', cls: 't-accent' }
          ]
        }
      ]
    },
    term: {
      helpTitle: "Beschikbare commando's:",
      help: [
        '  whoami      wie ben ik?',
        '  about       over mij',
        '  experience  werkervaring',
        '  skills      vaardigheden',
        '  certs       certificaten',
        '  projects    persoonlijke projecten',
        '  contact     contactgegevens',
        '  cv          CV downloaden (NL / EN)',
        '  ls          bestanden tonen',
        '  neofetch    systeeminfo',
        '  clear       scherm wissen',
        '  sudo hire-me  ?'
      ],
      notFound: (c) => "command niet gevonden: '" + c + "' — probeer help",
      aboutLine: '> scrollend naar "Over mij" …',
      expLine: '> scrollend naar "Werkervaring" …',
      skillsLine: '> scrollend naar "Vaardigheden" …',
      certsLine: '> scrollend naar "Certificaten" …',
      projectsLine: '> scrollend naar "Projecten" …',
      contactLine: '> scrollend naar "Contact" …',
      clearLine: 'scherm gewist. (geen sporen)',
      exitLine: 'nice try. dit is een portfolio, geen shell. (probeer: sudo hire-me)',
      sudoLine: 'toegang verleend ✓ — stuur me een e-mail, dan maken we het werkelijkheid:',
      whoami1: 'mertcan-ozbek — ICT professional · Rotterdam (NL)',
      whoami2: 'huidige rol: ServiceNow Support Engineer @ Devoteam',
      lsOut: 'about.txt  experience/  skills/  certifications/  projects/  contact.sh',
      contact: [
        { label: 'e-mail:   ', value: CONTACT_EMAIL, href: 'mailto:' + CONTACT_EMAIL },
        { label: 'telefoon: ', value: '+31 6 27057401', href: 'tel:+31627057401' },
        { label: 'linkedin: ', value: 'linkedin.com/in/mert-ozbek', href: 'https://www.linkedin.com/in/mert-ozbek' },
        { label: 'github:   ', value: 'github.com/Mazbac', href: 'https://github.com/Mazbac' }
      ],
      cvLine: 'CV downloaden:',
      neofetch: [
        'mertcan@portfolio',
        '──────────────────',
        'OS:        Rotterdam Edition 2026',
        'Shell:     motivatie (zsh)',
        'Uptime:    4+ jaar in IT',
        'Role:      ServiceNow Engineer',
        'Status:    open voor opportuniteiten'
      ]
    },
    about: {
      text: 'Ik ben een resultaatgerichte IT-professional met bewezen ervaring in technische ondersteuning binnen enterprise Microsoft 365-omgevingen. Mijn kernvakgebied is incident-, probleem- en changemanagement volgens ITIL-principes, met hands-on kennis van ServiceNow, Intune, Azure AD en Microsoft 365. Ik combineer een gestructureerde werkwijze met een sterk analytisch vermogen en denk proactief mee in procesoptimalisatie en serviceverbetering. Kwaliteit, veiligheid en klantgerichtheid staan voorop in elke schakel van de IT-keten. Buiten kantooruren werk ik aan mijn smart home (Home Assistant, IoT, automatiseringen) en bouw ik zelf PCs.',
      facts: [
        ['location', 'Rotterdam, NL', false],
        ['current role', 'ServiceNow Engineer @ Devoteam', false],
        ['experience', '4+ jaar IT-support & platformbeheer', false],
        ['status', 'open voor nieuwe opportuniteiten', true],
        ['languages', 'Nederlands (native) · Engels', false]
      ]
    },
    experience: [
      {
        period: 'Jan 2026 — heden',
        role: 'ServiceNow Support Engineer',
        company: 'Devoteam',
        city: 'Amsterdam',
        bullets: [
          '3e-lijns supportvraagstukken op het ServiceNow-platform: complexe technische issues oplossen.',
          'Updates en configuratiewijzigingen doorvoeren op basis van klantbehoeften.',
          'Eindgebruikers ondersteunen en trainen.',
          'Scripting (JavaScript) inzetten voor platformgerelateerde werkzaamheden.'
        ]
      },
      {
        period: 'Mei 2025 — Jan 2026',
        role: 'IT Support Engineer',
        company: 'Conclusion Enablement',
        city: 'Utrecht',
        bullets: [
          'IT-support in een enterprise-omgeving met focus op Microsoft 365 (Exchange Online, Teams, SharePoint, Azure AD, Intune).',
          'Beheer van gebruikers, apparaten, rechten en policies via M365 admin portals en Intune.',
          'Incidenten, serviceverzoeken, changes en problemen afhandelen via ServiceNow, conform ITIL.',
          "Tickets prioriteren aan de hand van een priomatrix, met waarborging van SLA's en klanttevredenheid.",
          'Bijdragen aan changemanagement, procesoptimalisatie, documentatie en het KMS.'
        ]
      },
      {
        period: 'Apr 2023 — Feb 2025',
        role: 'IT Technische Ondersteuning',
        company: 'Port of Rotterdam',
        city: 'Rotterdam',
        bullets: [
          'Incidentbeheer via TOPdesk en ServiceNow: snelle diagnose en opvolging van IT-problemen.',
          'Changes uitvoeren met minimale impact op de operatie (Windows-omgeving).',
          'Werkplekbeheer: installatie, configuratie en onderhoud van hardware en software.',
          'Procesverbeteringen doorgevoerd, resulterend in snellere afhandelingstijden.',
          'Netwerkincidenten opgevolgd: connectiviteit en VPN-verbindingen.'
        ]
      },
      {
        period: 'Mrt 2023 — Feb 2025',
        role: 'IT Helpdesk Ondersteuning',
        company: 'OGD ict-diensten',
        city: 'Rotterdam',
        bullets: [
          'Incidenten op het gebied van netwerken, applicaties en hardware oplossen.',
          'Change-ondersteuning, updates en migraties.',
          'Registratie in TOPdesk en ServiceNow, conform ITIL-principes.',
          'Werkervaring opgedaan met routers, VPN-verbindingen en netwerkcomponenten.'
        ]
      },
      {
        period: 'Mei 2022 — Mrt 2023',
        role: 'IT Specialist',
        company: 'Tyger Marketing',
        city: 'Rotterdam',
        bullets: [
          'Werkplekken uitrollen (Windows 11 & Chrome OS).',
          'Google Workspace en LeadDesk inrichten en onderhouden.',
          'Beheer van hardware, netwerkconfiguraties en leverancierscommunicatie (o.a. KPN).',
          'Ondersteuning bij kantoorautomatisering en administratieve IT-processen.'
        ]
      }
    ],
    skills: [
      {
        name: 'Cloud & Identity',
        tags: ['Microsoft 365', 'Azure AD / Entra ID', 'Intune', 'Azure', 'Exchange Online', 'Teams', 'SharePoint']
      },
      {
        name: 'Service Management',
        tags: ['ITIL', 'ServiceNow', 'TOPdesk', 'Incidentmanagement', 'Probleembeheer', 'Changemanagement', "SLA's", 'KMS']
      },
      {
        name: 'Tools & Automatisering',
        tags: ['JavaScript', 'Node-RED', 'Windows 11', 'Chrome OS', 'Google Workspace', 'Hardware & PC builds', 'Netwerken (VPN, port forwarding)']
      },
      {
        name: 'Soft Skills',
        tags: ['Communicatie', 'Klantgerichtheid', 'Analytisch vermogen', 'Procesoptimalisatie']
      }
    ],
    certs: [
      {
        issuer: 'ServiceNow',
        name: 'Certified System Administrator (CSA)',
        date: 'Feb 2026',
        url: 'https://www.credly.com/badges/42bbccc2-45b9-4160-8b57-54d5dd3393d5/linked_in_profile'
      },
      {
        issuer: 'Microsoft',
        name: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
        date: 'Jan 2024',
        url: 'https://learn.microsoft.com/api/credentials/share/en-us/MertcanOzbek-3694/9210C9668548C2F9?sharingId=4669B57ADB6C4781'
      },
      {
        issuer: 'Microsoft',
        name: 'Microsoft 365 Certified: Fundamentals',
        date: 'Sep 2023',
        url: 'https://learn.microsoft.com/api/credentials/share/en-us/MertcanOzbek-3694/2F83BCAA2C81FCD1?sharingId=4669B57ADB6C4781'
      },
      {
        issuer: 'PeopleCert',
        name: 'ITIL Foundation Level',
        date: 'Mrt 2023',
        url: 'https://shorturl.at/ijoQ8'
      }
    ],
    certsVerify: 'badge verifiëren ↗',
    projects: [
      {
        icon: 'home',
        name: 'Home Assistant & IoT',
        tags: ['Home Assistant', 'Node-RED', 'M5Stack', 'Bluetooth', 'IoT'],
        text: 'Zelfstandig opgezet Home Assistant-platform op een thin client voor centrale aansturing van slimme apparaten. Automatiseringen met Node-RED (aanwezigheid, tijd, energieverbruik), API-integratie van een slimme thermostaat en spraakbediening via M5Stack. Verdiepte kennis van edge computing, IoT-protocollen en automatisering.'
      },
      {
        icon: 'stream',
        name: 'Remote PC access — Sunshine & Moonlight',
        tags: ['Sunshine', 'Moonlight', 'NVIDIA', 'Port forwarding', 'Latency'],
        text: 'Low-latency streamingoplossing voor volledige remote toegang tot mijn pc vanaf overal. Configuratie van Sunshine (host) en Moonlight (client) voor minimale vertraging en maximale beeldkwaliteit — port forwarding, encoder-instellingen en securitymaatregelen. Geschikt voor zowel productiviteit als gaming via NVIDIA GeForce-componenten.'
      },
      {
        icon: 'chip',
        name: 'Custom PC build — Mini-ITX',
        tags: ['Mini-ITX', 'Hardware', 'Koeling', 'Troubleshooting'],
        text: 'Compact high-performance systeem gebouwd op basis van Mini-ITX met zorgvuldig geselecteerde componenten (CPU, GPU, RAM, PSU). Geoptimaliseerd voor airflow, kabelmanagement en ruimtebeperking. Inzicht opgedaan in compatibiliteit, koeling en hardware-troubleshooting.'
      }
    ],
    contact: [
      { icon: '@', label: 'E-mail', value: CONTACT_EMAIL, href: 'mailto:' + CONTACT_EMAIL },
      { icon: '☎', label: 'Telefoon', value: '+31 6 27057401', href: 'tel:+31627057401' },
      { icon: 'in', label: 'LinkedIn', value: 'linkedin.com/in/mert-ozbek', href: 'https://www.linkedin.com/in/mert-ozbek' },
      { icon: '</>', label: 'GitHub', value: 'github.com/Mazbac', href: 'https://github.com/Mazbac' }
    ],
    footer: {
      cvTitle: 'CV downloaden:',
      cvNl: 'CV (Nederlands)',
      cvEn: 'CV (English)',
      rights: '© 2026 Mertcan Özbek — Alle rechten voorbehouden.',
      built: 'gebouwd met ♥ in plain HTML/CSS/JS — geen framework'
    }
  },

  en: {
    meta: {
      title: 'Mertcan Özbek — ICT Professional & ServiceNow Engineer',
      description: 'Portfolio of Mertcan Özbek: ICT professional with enterprise Microsoft 365, ServiceNow and ITIL experience.'
    },
    nav: {
      about: 'About',
      experience: 'Experience',
      skills: 'Skills',
      certs: 'Certifications',
      projects: 'Projects',
      contact: 'Contact',
      cv: 'CV'
    },
    sec: {
      about: 'About',
      experience: 'Experience',
      skills: 'Skills',
      certs: 'Certifications',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      role: 'ICT Professional · ServiceNow Engineer · ITIL',
      actions: { cv: 'Download CV', contact: 'Contact' },
      intro: [
        {
          cmd: 'whoami',
          out: [{ text: 'mertcan-ozbek — ICT professional · Rotterdam' }]
        },
        {
          cmd: 'cat profile.txt',
          out: [
            { text: 'Enterprise Microsoft 365 · Incident / problem / change management (ITIL)' },
            { text: 'ServiceNow · Intune · Azure AD' }
          ]
        },
        {
          cmd: 'ls skills/',
          out: [{ text: 'microsoft-365  azure  servicenow  itil  intune  javascript' }]
        },
        {
          cmd: './status.sh',
          out: [
            { text: '● Current: ServiceNow Engineer @ Devoteam', cls: 't-accent' },
            { text: '● Status: open to new opportunities', cls: 't-accent' }
          ]
        }
      ]
    },
    term: {
      helpTitle: 'Available commands:',
      help: [
        '  whoami      who am i?',
        '  about       about me',
        '  experience  work experience',
        '  skills      skills',
        '  certs       certifications',
        '  projects    personal projects',
        '  contact     contact details',
        '  cv          download CV (NL / EN)',
        '  ls          list files',
        '  neofetch    system info',
        '  clear       clear screen',
        '  sudo hire-me  ?'
      ],
      notFound: (c) => "command not found: '" + c + "' — try help",
      aboutLine: '> scrolling to "About" …',
      expLine: '> scrolling to "Experience" …',
      skillsLine: '> scrolling to "Skills" …',
      certsLine: '> scrolling to "Certifications" …',
      projectsLine: '> scrolling to "Projects" …',
      contactLine: '> scrolling to "Contact" …',
      clearLine: 'screen cleared. (no traces)',
      exitLine: 'nice try. this is a portfolio, not a shell. (try: sudo hire-me)',
      sudoLine: "permission granted ✓ — send me an email and we'll make it happen:",
      whoami1: 'mertcan-ozbek — ICT professional · Rotterdam (NL)',
      whoami2: 'current role: ServiceNow Support Engineer @ Devoteam',
      lsOut: 'about.txt  experience/  skills/  certifications/  projects/  contact.sh',
      contact: [
        { label: 'email:    ', value: CONTACT_EMAIL, href: 'mailto:' + CONTACT_EMAIL },
        { label: 'phone:    ', value: '+31 6 27057401', href: 'tel:+31627057401' },
        { label: 'linkedin: ', value: 'linkedin.com/in/mert-ozbek', href: 'https://www.linkedin.com/in/mert-ozbek' },
        { label: 'github:   ', value: 'github.com/Mazbac', href: 'https://github.com/Mazbac' }
      ],
      cvLine: 'Download my CV:',
      neofetch: [
        'mertcan@portfolio',
        '──────────────────',
        'OS:        Rotterdam Edition 2026',
        'Shell:     motivation (zsh)',
        'Uptime:    4+ years in IT',
        'Role:      ServiceNow Engineer',
        'Status:    open to opportunities'
      ]
    },
    about: {
      text: "I'm a results-oriented IT professional with proven experience in technical support within enterprise Microsoft 365 environments. My core area is incident, problem and change management aligned with ITIL principles, with hands-on knowledge of ServiceNow, Intune, Azure AD and Microsoft 365. I combine a structured way of working with strong analytical skills and think proactively about process optimization and service improvement. Quality, security and customer focus come first in every link of the IT chain. Outside office hours I work on my smart home (Home Assistant, IoT, automations) and build PCs myself.",
      facts: [
        ['location', 'Rotterdam, NL', false],
        ['current role', 'ServiceNow Engineer @ Devoteam', false],
        ['experience', '4+ years IT support & platform administration', false],
        ['status', 'open to new opportunities', true],
        ['languages', 'Dutch (native) · English', false]
      ]
    },
    experience: [
      {
        period: 'Jan 2026 — Present',
        role: 'ServiceNow Support Engineer',
        company: 'Devoteam',
        city: 'Amsterdam',
        bullets: [
          'L3 support on the ServiceNow platform: resolving complex technical issues.',
          'Rolling out updates and configuration changes driven by customer needs.',
          'Supporting and training end users.',
          'Applying scripting (JavaScript) for platform-related work.'
        ]
      },
      {
        period: 'May 2025 — Jan 2026',
        role: 'IT Support Engineer',
        company: 'Conclusion Enablement',
        city: 'Utrecht',
        bullets: [
          'IT support in an enterprise environment with a focus on Microsoft 365 (Exchange Online, Teams, SharePoint, Azure AD, Intune).',
          'Managing users, devices, entitlements and policies via Microsoft 365 admin portals and Intune.',
          'Handling incidents, service requests, changes and problems via ServiceNow, aligned with ITIL.',
          'Prioritizing tickets using a priority matrix, safeguarding SLAs and customer satisfaction.',
          'Contributing to change management, process optimization, documentation and the KMS.'
        ]
      },
      {
        period: 'Apr 2023 — Feb 2025',
        role: 'IT Technical Support',
        company: 'Port of Rotterdam',
        city: 'Rotterdam',
        bullets: [
          'Incident management via TOPdesk and ServiceNow: rapid diagnosis and follow-up of IT issues.',
          'Executing changes with minimal operational impact (Windows environment).',
          'Workplace management: installation, configuration and maintenance of hardware and software.',
          'Implemented process improvements, resulting in faster resolution times.',
          'Handled network-related incidents, including connectivity and VPN connections.'
        ]
      },
      {
        period: 'Mar 2023 — Feb 2025',
        role: 'IT Helpdesk Support',
        company: 'OGD ict-diensten',
        city: 'Rotterdam',
        bullets: [
          'Resolving incidents across networks, applications and hardware.',
          'Change support, updates and migrations.',
          'Logging in TOPdesk and ServiceNow, aligned with ITIL principles.',
          'Gained experience with routers, VPN connections and network components.'
        ]
      },
      {
        period: 'May 2022 — Mar 2023',
        role: 'IT Specialist',
        company: 'Tyger Marketing',
        city: 'Rotterdam',
        bullets: [
          'Rolling out workstations (Windows 11 & Chrome OS).',
          'Setting up and maintaining Google Workspace and LeadDesk.',
          'Managing hardware, network configurations and vendor communication (incl. KPN).',
          'Supporting office automation and administrative IT processes.'
        ]
      }
    ],
    skills: [
      {
        name: 'Cloud & Identity',
        tags: ['Microsoft 365', 'Azure AD / Entra ID', 'Intune', 'Azure', 'Exchange Online', 'Teams', 'SharePoint']
      },
      {
        name: 'Service Management',
        tags: ['ITIL', 'ServiceNow', 'TOPdesk', 'Incident management', 'Problem management', 'Change management', 'SLAs', 'KMS']
      },
      {
        name: 'Tools & Automation',
        tags: ['JavaScript', 'Node-RED', 'Windows 11', 'Chrome OS', 'Google Workspace', 'Hardware & PC builds', 'Networking (VPN, port forwarding)']
      },
      {
        name: 'Soft Skills',
        tags: ['Communication', 'Customer focus', 'Analytical skills', 'Process optimization']
      }
    ],
    certs: [
      {
        issuer: 'ServiceNow',
        name: 'Certified System Administrator (CSA)',
        date: 'Feb 2026',
        url: 'https://www.credly.com/badges/42bbccc2-45b9-4160-8b57-54d5dd3393d5/linked_in_profile'
      },
      {
        issuer: 'Microsoft',
        name: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
        date: 'Jan 2024',
        url: 'https://learn.microsoft.com/api/credentials/share/en-us/MertcanOzbek-3694/9210C9668548C2F9?sharingId=4669B57ADB6C4781'
      },
      {
        issuer: 'Microsoft',
        name: 'Microsoft 365 Certified: Fundamentals',
        date: 'Sep 2023',
        url: 'https://learn.microsoft.com/api/credentials/share/en-us/MertcanOzbek-3694/2F83BCAA2C81FCD1?sharingId=4669B57ADB6C4781'
      },
      {
        issuer: 'PeopleCert',
        name: 'ITIL Foundation Level',
        date: 'Mar 2023',
        url: 'https://shorturl.at/ijoQ8'
      }
    ],
    certsVerify: 'verify badge ↗',
    projects: [
      {
        icon: 'home',
        name: 'Home Assistant & IoT',
        tags: ['Home Assistant', 'Node-RED', 'M5Stack', 'Bluetooth', 'IoT'],
        text: 'Self-built Home Assistant platform on a thin client for central control of smart devices. Automations with Node-RED (presence, time, energy use), smart-thermostat API integration and voice control via M5Stack. Deepened knowledge of edge computing, IoT protocols and automation.'
      },
      {
        icon: 'stream',
        name: 'Remote PC access — Sunshine & Moonlight',
        tags: ['Sunshine', 'Moonlight', 'NVIDIA', 'Port forwarding', 'Latency'],
        text: 'Low-latency streaming setup for full remote access to my PC from anywhere. Configured Sunshine (host) and Moonlight (client) for minimal lag and maximum image quality — port forwarding, encoder settings and security measures. Suitable for both productivity and gaming via NVIDIA GeForce components.'
      },
      {
        icon: 'chip',
        name: 'Custom PC build — Mini-ITX',
        tags: ['Mini-ITX', 'Hardware', 'Cooling', 'Troubleshooting'],
        text: 'Compact high-performance system built on Mini-ITX with carefully selected components (CPU, GPU, RAM, PSU). Optimized for airflow, cable management and space constraints. Gained insight into compatibility, cooling and hardware troubleshooting.'
      }
    ],
    contact: [
      { icon: '@', label: 'Email', value: CONTACT_EMAIL, href: 'mailto:' + CONTACT_EMAIL },
      { icon: '☎', label: 'Phone', value: '+31 6 27057401', href: 'tel:+31627057401' },
      { icon: 'in', label: 'LinkedIn', value: 'linkedin.com/in/mert-ozbek', href: 'https://www.linkedin.com/in/mert-ozbek' },
      { icon: '</>', label: 'GitHub', value: 'github.com/Mazbac', href: 'https://github.com/Mazbac' }
    ],
    footer: {
      cvTitle: 'Download CV:',
      cvNl: 'CV (Dutch)',
      cvEn: 'CV (English)',
      rights: '© 2026 Mertcan Özbek — All rights reserved.',
      built: 'built with ♥ in plain HTML/CSS/JS — no framework'
    }
  }
};
