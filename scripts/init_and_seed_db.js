const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  host: process.env.DB_HOST || 'aws-1-eu-central-1.pooler.supabase.com',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres.ovurdxjnnyliefzsecem',
  password: process.env.DB_PASSWORD || 'kVRtzHm339f2W2',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  console.log('[DB] Connecting to PostgreSQL database on Supabase...');
  const client = await pool.connect();

  try {
    console.log('[DB] Connected successfully! Creating tables...');
    await client.query('BEGIN');

    // 1. Admin Users
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(150) NOT NULL DEFAULT 'System Administrator',
        email VARCHAR(150) DEFAULT 'admin@possiblehealth.org',
        role VARCHAR(50) NOT NULL DEFAULT 'SUPER_ADMIN',
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        last_login TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Team Members
    await client.query(`
      CREATE TABLE IF NOT EXISTS team_members (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL, -- 'us_board', 'nepal_board', 'team_member', 'advisor'
        image TEXT,
        bio TEXT,
        linkedin TEXT,
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_team_category ON team_members(category);
    `);

    // 3. News Articles
    await client.query(`
      CREATE TABLE IF NOT EXISTS news_articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        slug VARCHAR(500) UNIQUE,
        category VARCHAR(100) NOT NULL DEFAULT 'Field Updates', -- 'Field Updates', 'Announcements', 'Research'
        desc_text TEXT,
        content TEXT NOT NULL,
        image_url TEXT,
        author VARCHAR(255) DEFAULT 'Possible Health',
        read_time VARCHAR(50) DEFAULT '4 min read',
        published_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        is_published BOOLEAN NOT NULL DEFAULT TRUE,
        views_count INTEGER DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_news_category ON news_articles(category);
      CREATE INDEX IF NOT EXISTS idx_news_published ON news_articles(is_published, published_date DESC);
    `);

    // 4. Publications (Impact Reports, Papers, Briefs, Financials, Disclosures)
    await client.query(`
      CREATE TABLE IF NOT EXISTS publications (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        category VARCHAR(100) NOT NULL, -- 'impact-reports', 'research-papers', 'research-briefs', 'financial-reports', 'disclosures'
        sub_type VARCHAR(100) DEFAULT 'PDF Report', -- 'PDF Report', 'Journal Article', 'Brief', 'Audited Report', 'IRS Form 990', 'Policy & Disclosure'
        description TEXT,
        date_display VARCHAR(150),
        link_url TEXT,
        pdf_filename VARCHAR(255),
        cover_image TEXT,
        featured BOOLEAN DEFAULT FALSE,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_pub_category ON publications(category);
    `);

    // 5. Solutions Projects (Scale, Test, Innovate, Pipeline)
    await client.query(`
      CREATE TABLE IF NOT EXISTS solutions_projects (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE,
        stage_id VARCHAR(50) NOT NULL, -- 'scale', 'test', 'innovate', 'pipeline'
        sub_section_id VARCHAR(100),
        sub_section_title VARCHAR(255),
        title VARCHAR(500) NOT NULL,
        subtitle VARCHAR(500),
        badge VARCHAR(100),
        description TEXT NOT NULL,
        image_url TEXT,
        link_text VARCHAR(150),
        link_url TEXT,
        publications_json JSONB DEFAULT '[]'::jsonb,
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_solutions_stage ON solutions_projects(stage_id);
    `);

    // 6. Contact Inquiries
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        office_entity VARCHAR(150),
        status VARCHAR(50) NOT NULL DEFAULT 'NEW', -- 'NEW', 'READ', 'REPLIED', 'ARCHIVED'
        admin_notes TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_inquiries(status);
    `);

    // 7. Newsletter Subscribers
    await client.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(150) UNIQUE NOT NULL,
        source VARCHAR(100) DEFAULT 'Website Footer',
        is_active BOOLEAN DEFAULT TRUE,
        subscribed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 8. Donations / Pledges
    await client.query(`
      CREATE TABLE IF NOT EXISTS donations (
        id SERIAL PRIMARY KEY,
        donor_name VARCHAR(150) NOT NULL,
        donor_email VARCHAR(150) NOT NULL,
        amount NUMERIC(12, 2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'USD',
        donation_type VARCHAR(50) DEFAULT 'ONE_TIME', -- 'ONE_TIME', 'MONTHLY'
        campaign VARCHAR(150) DEFAULT 'General Healthcare Support',
        status VARCHAR(50) DEFAULT 'COMPLETED', -- 'PENDING', 'COMPLETED', 'FAILED'
        transaction_id VARCHAR(100),
        message TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 9. Site Settings
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        setting_key VARCHAR(100) UNIQUE NOT NULL,
        setting_value JSONB NOT NULL,
        category VARCHAR(100) DEFAULT 'GENERAL',
        description TEXT,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('[DB] Tables created successfully. Seeding initial data...');

    // Seed Admin User
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('Nepal@123#', salt);

    await client.query(`
      INSERT INTO admin_users (username, password_hash, full_name, email, role)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (username) DO UPDATE 
      SET password_hash = EXCLUDED.password_hash, updated_at = CURRENT_TIMESTAMP;
    `, ['admin', hash, 'Super Administrator', 'admin@possiblehealth.org', 'SUPER_ADMIN']);
    console.log('[DB] Admin user seeded (admin / Nepal@123#).');

    // Seed Team Members
    const { usBoardMembers, nepalBoardMembers, teamMembersData } = require('../components/teamData.js');
    
    let sort = 1;
    for (const m of usBoardMembers) {
      await client.query(`
        INSERT INTO team_members (id, name, role, category, image, bio, linkedin, sort_order)
        VALUES ($1, $2, $3, 'us_board', $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name, role = EXCLUDED.role, category = EXCLUDED.category,
          image = EXCLUDED.image, bio = EXCLUDED.bio, linkedin = EXCLUDED.linkedin,
          sort_order = EXCLUDED.sort_order, updated_at = CURRENT_TIMESTAMP;
      `, [m.id, m.name, m.role, m.image, m.bio, m.linkedin || null, sort++]);
    }

    for (const m of nepalBoardMembers) {
      await client.query(`
        INSERT INTO team_members (id, name, role, category, image, bio, linkedin, sort_order)
        VALUES ($1, $2, $3, 'nepal_board', $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name, role = EXCLUDED.role, category = EXCLUDED.category,
          image = EXCLUDED.image, bio = EXCLUDED.bio, linkedin = EXCLUDED.linkedin,
          sort_order = EXCLUDED.sort_order, updated_at = CURRENT_TIMESTAMP;
      `, [m.id, m.name, m.role, m.image, m.bio, m.linkedin || null, sort++]);
    }

    for (const m of teamMembersData) {
      const isAdvisor = m.role.toLowerCase().includes('advisor');
      const cat = isAdvisor ? 'advisor' : 'team_member';
      await client.query(`
        INSERT INTO team_members (id, name, role, category, image, bio, linkedin, sort_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name, role = EXCLUDED.role, category = EXCLUDED.category,
          image = EXCLUDED.image, bio = EXCLUDED.bio, linkedin = EXCLUDED.linkedin,
          sort_order = EXCLUDED.sort_order, updated_at = CURRENT_TIMESTAMP;
      `, [m.id, m.name, m.role, cat, m.image, m.bio, m.linkedin || null, sort++]);
    }
    console.log(`[DB] Seeded ${sort - 1} team members.`);

    // Seed News Articles
    const articles = [
      {
        title: "Co-Designing Digital Health Systems with Municipal Leaders in Achham",
        slug: "co-designing-digital-health-systems-achham",
        category: "Field Updates",
        desc_text: "Our data systems engineering team recently completed the deployment of custom clinical dashboards to three municipal health posts in Achham, improving healthcare outcomes.",
        content: `Our data systems engineering team recently completed the deployment of custom clinical dashboards to three municipal health posts in Achham. This tech-enabled community care pilot is already improving patient referral speeds.\n\nBy co-designing these solutions directly with local administrators, we ensure that digital systems integrate smoothly into daily clinic workflows. Over the coming months, our team will continue tracking user adoption and clinical data quality metrics to refine the platform before national expansion.`,
        image_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&h=500&q=80",
        author: "Prakash Pant, Data Systems",
        read_time: "4 min read",
        published_date: "2026-06-15 09:00:00"
      },
      {
        title: "New Funding to Support Mental Health Services Training",
        slug: "new-funding-mental-health-services-training",
        category: "Announcements",
        desc_text: "We are thrilled to announce a new grant supporting the expansion of our collaborative care model for depression and anxiety.",
        content: `We are thrilled to announce a new grant supporting the expansion of our collaborative care model for depression and anxiety. This funding will train 45 new community health workers in remote districts.\n\nMental health support remains one of the most critical gaps in primary healthcare. Through this project, local health workers will gain specialized clinical skills to conduct home-based screenings and collaborative interventions, helping to reduce stigma and provide care to underserved populations.`,
        image_url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=400&q=80",
        author: "Bhubi Bista, People & Culture",
        read_time: "3 min read",
        published_date: "2026-05-20 11:30:00"
      },
      {
        title: "Study on CHW Care Outcomes Published in The Lancet Global Health",
        slug: "study-chw-care-outcomes-lancet-global-health",
        category: "Research",
        desc_text: "Our clinical research partners have published a comprehensive evaluation of integrated maternal healthcare delivery, verifying substantial progress.",
        content: `Our clinical research partners have published a comprehensive evaluation of integrated maternal healthcare delivery, verifying substantial progress in prenatal care adherence.\n\nThe study highlights how supervised, full-time community health workers significantly increase clinical contact points for pregnant women, leading to safer deliveries and better neonatal health outcomes. This evidence marks a critical step forward in validating our integrated care model at a global scientific level.`,
        image_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=400&q=80",
        author: "Dr. Mina Shrestha, Science Board",
        read_time: "6 min read",
        published_date: "2026-04-08 16:15:00"
      },
      {
        title: "Evaluating Dementia Care and Family Caregiver Support Guides",
        slug: "evaluating-dementia-care-family-caregiver-guides",
        category: "Research",
        desc_text: "An outline of our home-based cognitive decline assistance tools and training guides released for regional districts.",
        content: `We have officially launched regional training modules designed to assist older adults facing dementia and cognitive decline. These guides provide family caregivers with practical behavioral strategies, coping methods, and referral directories.\n\nIntegrating behavioral health support into standard home-based care protocols is a core focus of our team as the population over 60 increases in rural municipalities. Feedback surveys show a 92% satisfaction rate among primary caregivers utilizing our initial resource packages.`,
        image_url: "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=600&h=400&q=80",
        author: "Kripa Sigdel, Mental Health Team",
        read_time: "5 min read",
        published_date: "2026-03-18 10:00:00"
      },
      {
        title: "Collaborative Partnerships Expand to Central Nepal Districts",
        slug: "collaborative-partnerships-expand-central-nepal",
        category: "Field Updates",
        desc_text: "New agreements signed with central municipal offices to deploy localized integrated health post systems.",
        content: `Possible has formalised collaborative partnerships with three new central municipalities. The agreement establishes joint funding structures to support local health posts with pharmacy logistics, IT systems, and community health worker supervision support.\n\nWorking in close coordination with government networks ensures that clinical workflows are scalable and sustainable under state guidelines. Training programs are scheduled to begin early next month.`,
        image_url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&h=400&q=80",
        author: "Kumar Tamang, Operations",
        read_time: "3 min read",
        published_date: "2026-02-12 14:45:00"
      }
    ];

    for (const a of articles) {
      await client.query(`
        INSERT INTO news_articles (title, slug, category, desc_text, content, image_url, author, read_time, published_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title, category = EXCLUDED.category, desc_text = EXCLUDED.desc_text,
          content = EXCLUDED.content, image_url = EXCLUDED.image_url, author = EXCLUDED.author,
          read_time = EXCLUDED.read_time, updated_at = CURRENT_TIMESTAMP;
      `, [a.title, a.slug, a.category, a.desc_text, a.content, a.image_url, a.author, a.read_time, a.published_date]);
    }
    console.log(`[DB] Seeded ${articles.length} news articles.`);

    // Seed Impact Reports
    const impactReports = [
      { title: "2025 Annual Impact Report", date: "August 01, 2024 - July 31, 2025", link: "/annual-impact-report/Possible_AIR-2025.pdf", pdfFilename: "Possible_AIR-2025.pdf", cover: "/annual-impact-report/thumbnails/Possible_AIR-2025.webp" },
      { title: "2024 Annual Impact Report", date: "August 01, 2023 - July 31, 2024", link: "/annual-impact-report/AIR-2024.pdf", pdfFilename: "AIR-2024.pdf", cover: "/annual-impact-report/thumbnails/AIR-2024.webp" },
      { title: "2023 Annual Impact Report", date: "August 01, 2022 - July 31, 2023", link: "/annual-impact-report/AIR-2023.pdf", pdfFilename: "AIR-2023.pdf", cover: "/annual-impact-report/thumbnails/AIR-2023.webp" },
      { title: "2022 Annual Impact Report", date: "August 01, 2021 - July 31, 2022", link: "/annual-impact-report/AIR-2022.pdf", pdfFilename: "AIR-2022.pdf", cover: "/annual-impact-report/thumbnails/AIR-2022.webp" },
      { title: "2021 Annual Impact Report", date: "August 01, 2020 - July 31, 2021", link: "/annual-impact-report/2021-Annual-Impact-Report.pdf", pdfFilename: "2021-Annual-Impact-Report.pdf", cover: "/annual-impact-report/thumbnails/2021-Annual-Impact-Report.webp" },
      { title: "2018 Annual Impact Report", date: "Fiscal Year 2017 - 2018", link: "/annual-impact-report/AIR-FY18-1.pdf", pdfFilename: "AIR-FY18-1.pdf", cover: "/annual-impact-report/thumbnails/AIR-FY18-1.webp" },
      { title: "2017 Annual Impact Report", date: "August 01, 2016 - July 31, 2017", link: "/annual-impact-report/AIR_2017-1.pdf", pdfFilename: "AIR_2017-1.pdf", cover: "/annual-impact-report/thumbnails/AIR_2017-1.webp" },
      { title: "2016 Annual Impact Report", date: "August 01, 2015 - July 31, 2016", link: "/annual-impact-report/Possible-2016-Annual-Impact-Report.pdf", pdfFilename: "Possible-2016-Annual-Impact-Report.pdf", cover: "/annual-impact-report/thumbnails/Possible-2016-Annual-Impact-Report.webp" },
      { title: "2015 Annual Impact Report", date: "August 01, 2014 - July 31, 2015", link: "/annual-impact-report/2015_Possible_Annual-Impact-Report.pdf", pdfFilename: "2015_Possible_Annual-Impact-Report.pdf", cover: "/annual-impact-report/thumbnails/2015_Possible_Annual-Impact-Report.webp" },
      { title: "2014 Annual Impact Report", date: "August 01, 2013 - July 31, 2014", link: "/annual-impact-report/Possible_Annual-Impact-Report-1.pdf", pdfFilename: "Possible_Annual-Impact-Report-1.pdf", cover: "/annual-impact-report/thumbnails/Possible_Annual-Impact-Report-1.webp" }
    ];

    let pSort = 1;
    for (const r of impactReports) {
      await client.query(`
        INSERT INTO publications (title, category, sub_type, date_display, link_url, pdf_filename, cover_image, sort_order)
        VALUES ($1, 'impact-reports', 'PDF Report', $2, $3, $4, $5, $6);
      `, [r.title, r.date, r.link, r.pdfFilename, r.cover, pSort++]);
    }

    // Seed Research Papers
    const researchPapers = [
      { title: "Effectiveness of Integrated CHW Care on Maternal Health in Rural Nepal", desc: "Evaluating the outcomes of full-time, supervised, and trained community health workers delivering care. Published in The Lancet Global Health.", date: "2024", link: "https://www.thelancet.com/global-health", cover: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=350&q=80" },
      { title: "Home-Based Collaborative Care for Depression and Anxiety in Low-Resource Settings", desc: "A randomized controlled trial on integrated collaborative care models training CHWs and clinicians. Published in JAMA Psychiatry.", date: "2023", link: "https://jamanetwork.com/journals/jamapsychiatry", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
      { title: "Intimate Partner Violence Interventions in Nepal (MILAP Study)", desc: "Family-based interventions engaging husbands and mothers-in-law to reduce violence and anxiety among women. Published in BMJ Global Health.", date: "2023", link: "https://gh.bmj.com", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
      { title: "Digital Tools in HIV Care Optimization (INCLUDE study)", desc: "A clinical trial evaluating stigma reduction and health tracking in HIV treatment clinics. Published in AIDS Care.", date: "2023", link: "https://www.tandfonline.com", cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&h=350&q=80" },
      { title: "Scale-up of National Community Health Information Systems (CHIS)", desc: "Evaluating system uptake and data entry accuracy across rural health posts. Published in Health Policy and Planning.", date: "2022", link: "https://academic.oup.com/heapol", cover: "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=600&h=350&q=80" },
      { title: "Dementia Care and Caregiver Support Interventions in Nepal", desc: "Home-based cognitive support trials and educational outcomes for caregivers. Published in International Psychogeriatrics.", date: "2022", link: "https://www.cambridge.org", cover: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&h=350&q=80" },
      { title: "Community-based Hypertension Management Trial Outcomes", desc: "Evaluating home-based blood pressure monitoring and referral compliance. Published in Global Heart.", date: "2021", link: "https://globalheartjournal.com", cover: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=350&q=80" },
      { title: "Primary Care Integration of Non-Communicable Diseases (NCDs) in Nepal", desc: "A mixed-methods analysis of clinician preparedness and treatment protocol compliance.", date: "2021", link: "https://www.jogh.org", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" }
    ];

    for (const p of researchPapers) {
      await client.query(`
        INSERT INTO publications (title, category, sub_type, description, date_display, link_url, cover_image, sort_order)
        VALUES ($1, 'research-papers', 'Journal Article', $2, $3, $4, $5, $6);
      `, [p.title, p.desc, p.date, p.link, p.cover, pSort++]);
    }

    // Seed Research Briefs
    const researchBriefs = [
      { title: "Intervention Briefs: National Expansion Guidelines", desc: "Summaries of our ongoing interventions and their clinical methodologies in Nepal.", date: "July 19, 2024, 11:00 AM", link: "/briefs/intervention-briefs.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
      { title: "Ethics Brief: Research Conduct in Vulnerable Settings", desc: "Guidelines and ethical considerations in delivering healthcare innovations and trials.", date: "April 05, 2024, 2:45 PM", link: "/briefs/ethics-brief.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
      { title: "Policy Brief: Strengthening Nepal's Community Health System", desc: "A translation of community health worker implementation findings into national guideline suggestions.", date: "January 14, 2024, 10:15 AM", link: "/briefs/policy-brief-2024.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" }
    ];

    for (const b of researchBriefs) {
      await client.query(`
        INSERT INTO publications (title, category, sub_type, description, date_display, link_url, cover_image, sort_order)
        VALUES ($1, 'research-briefs', 'Brief', $2, $3, $4, $5, $6);
      `, [b.title, b.desc, b.date, b.link, b.cover, pSort++]);
    }

    // Seed Financial Reports & Disclosures
    const financials = [
      { title: "Fiscal Year 2025 Audited Financial Statements", date: "Fiscal Year 2024 - 2025", type: "Audited Report", category: "financial-reports", link: "/financial-report/Possible-2025-Audit-Report.pdf", cover: "/financial-report/thumbnails/Possible-2025-Audit-Report.webp" },
      { title: "2025 Form 990: Return of Organization Exempt From Income Tax", date: "Tax Year 2025", type: "IRS Form 990", category: "financial-reports", link: "/financial-report/2025-Nyaya-Health-990.pdf", cover: "/financial-report/thumbnails/2025-Nyaya-Health-990.webp" },
      { title: "Fiscal Year 2024 Audited Financial Statements", date: "Fiscal Year 2023 - 2024", type: "Audited Report", category: "financial-reports", link: "/financial-report/Possible-2024-Audit-Report.pdf", cover: "/financial-report/thumbnails/Possible-2024-Audit-Report.webp" },
      { title: "2024 Form 990: Return of Organization Exempt From Income Tax", date: "Tax Year 2024", type: "IRS Form 990", category: "financial-reports", link: "/financial-report/2024-Nyaya-Health-990.pdf", cover: "/financial-report/thumbnails/2024-Nyaya-Health-990.webp" },
      { title: "FCOI Possible US", date: "August 2021", type: "Policy & Disclosure", category: "disclosures", link: "/conflict-of-interest/FCOI Possible US.pdf", cover: "/conflict-of-interest/thumbnails/FCOI Possible US.webp" },
      { title: "FCOI Sambhav", date: "June 01, 2021", type: "Code of Conduct", category: "disclosures", link: "/conflict-of-interest/FCOI Sambhav.pdf", cover: "/conflict-of-interest/thumbnails/FCOI Sambhav.webp" }
    ];

    for (const f of financials) {
      await client.query(`
        INSERT INTO publications (title, category, sub_type, date_display, link_url, cover_image, sort_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `, [f.title, f.category, f.type, f.date, f.link, f.cover, pSort++]);
    }
    console.log(`[DB] Seeded ${pSort - 1} publications.`);

    // Seed Solutions Projects
    const solutions = [
      {
        slug: "longitudinal-care",
        stage_id: "scale",
        title: "Strengthening community health system through longitudinal care: From innovation to scale",
        subtitle: "Integrated ProCHW continuous maternal, child and NCD healthcare across rural districts",
        badge: "National Pilot",
        description: "We, in collaboration with the government, designed a model grounded in WHO guidelines for CHW programs and tested it as a national pilot focused on bundled maternal, child, and non-communicable health services with full-time, salaried, supervised, digitally-enabled community health workers.",
        image_url: "/baby.jpg",
        sort_order: 1,
        publications: [
          { title: "A study of an integrated CHW intervention to address maternal healthcare in rural Nepal.", link: "https://doi.org/10.1371/journal.pgph.0001512" },
          { title: "Costing Analysis of a Pilot Community Health Worker Program in Rural Nepal.", link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7326517/" }
        ]
      },
      {
        slug: "collaborative-care",
        stage_id: "scale",
        title: "Collaborative care for improving mental health care within primary health care settings",
        subtitle: "Task-sharing mental health interventions with primary clinicians and counselors",
        badge: "Clinical Model",
        description: "Addressing the high burden of depression and anxiety in low-resource settings by training community health workers and primary care clinicians to screen, deliver behavioral activations, and provide continuous psychosocial counseling.",
        image_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&h=500&q=80",
        sort_order: 2,
        publications: [
          { title: "Home-Based Collaborative Care for Depression and Anxiety in Low-Resource Settings", link: "https://jamanetwork.com/journals/jamapsychiatry" }
        ]
      },
      {
        slug: "digital-chis",
        stage_id: "test",
        title: "National Community Health Information Systems (CHIS)",
        subtitle: "Digital health registries and offline-first mobile tools for frontline health posts",
        badge: "mHealth System",
        description: "Co-designing, evaluating, and deploying digital health tools and clinical decision dashboards to empower local healthcare workers with electronic health tracking.",
        image_url: "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=800&h=500&q=80",
        sort_order: 3,
        publications: []
      },
      {
        slug: "milap-study",
        stage_id: "innovate",
        title: "Intimate Partner Violence Interventions (MILAP)",
        subtitle: "Family-centered behavioral change and community advocacy",
        badge: "Behavioral Science",
        description: "Designing and evaluating family-centered counseling protocols involving husbands and in-laws to address systemic drivers of domestic violence and promote maternal well-being.",
        image_url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&h=500&q=80",
        sort_order: 4,
        publications: []
      }
    ];

    for (const s of solutions) {
      await client.query(`
        INSERT INTO solutions_projects (slug, stage_id, title, subtitle, badge, description, image_url, publications_json, sort_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (slug) DO UPDATE SET
          stage_id = EXCLUDED.stage_id, title = EXCLUDED.title, subtitle = EXCLUDED.subtitle,
          badge = EXCLUDED.badge, description = EXCLUDED.description, image_url = EXCLUDED.image_url,
          publications_json = EXCLUDED.publications_json, updated_at = CURRENT_TIMESTAMP;
      `, [s.slug, s.stage_id, s.title, s.subtitle, s.badge, s.description, s.image_url, JSON.stringify(s.publications), s.sort_order]);
    }
    console.log(`[DB] Seeded ${solutions.length} solutions projects.`);

    // Seed Initial Contact Inquiries (Sample data for admin portal demo)
    await client.query(`
      INSERT INTO contact_inquiries (name, email, subject, message, office_entity, status)
      VALUES 
        ('Dr. Aarav Sharma', 'aarav.sharma@healthnet.np', 'Partnership in Sudurpashchim Health Post', 'We would like to collaborate on implementing the digital CHW model in two primary health centers in Doti district. Please let us know who to contact.', 'Sambhav (Possible), Nepal', 'NEW'),
        ('Elena Rostova', 'elena.rostova@globalhealthfund.org', 'Grant Opportunity for Implementation Science', 'Following up on our discussion at the Geneva conference regarding grant funding for mental health task-sharing programs in rural Nepal.', 'Possible US', 'READ'),
        ('Bikash Adhikari', 'bikash.adhikari@kathmandu.gov.np', 'Maternal Health Registry Data Inquiries', 'Thank you for the recent presentation on maternal health outcomes. We would like to request the municipal policy brief document.', 'Sambhav (Possible), Nepal', 'REPLIED')
      ON CONFLICT DO NOTHING;
    `);

    // Seed Newsletter Subscribers
    await client.query(`
      INSERT INTO newsletter_subscribers (email, source)
      VALUES 
        ('researcher.nepal@tu.edu.np', 'News Page'),
        ('globalhealth.fellow@harvard.edu', 'Footer'),
        ('advisor@who.int', 'Solutions Page')
      ON CONFLICT (email) DO NOTHING;
    `);

    // Seed Donations
    await client.query(`
      INSERT INTO donations (donor_name, donor_email, amount, currency, donation_type, campaign, status, transaction_id)
      VALUES 
        ('Anonymous Donor', 'donor1@supportpossible.org', 500.00, 'USD', 'ONE_TIME', 'Rural Health Systems Fund', 'COMPLETED', 'TXN-90412'),
        ('Kathryn M. Davis Fellowship', 'contact@davisfellows.org', 2500.00, 'USD', 'ONE_TIME', 'Community Health Worker Training', 'COMPLETED', 'TXN-90413'),
        ('Rohan Shrestha', 'rohan.shrestha@gmail.com', 100.00, 'USD', 'MONTHLY', 'Maternal & Newborn Care Fund', 'COMPLETED', 'TXN-90414')
      ON CONFLICT DO NOTHING;
    `);

    // Seed Site Settings
    const settings = [
      { key: 'contact_nepal_office', value: { entity: "Sambhav (Possible), Nepal", address: "Ward No 1, Bhim Plaza, Bhupi Sadak, Narayanchour, Naxal, Kathmandu, NPL", phone: "9822999300", phoneRaw: "+9779822999300", hours: "Mon–Fri, 9:00 AM – 5:00 PM (except public holidays)", email: "answers@possiblehealth.org" } },
      { key: 'contact_us_office', value: { entity: "Possible US", address: "99 Wall Street #4100, New York, NY 10005", email: "donations@possiblehealth.org" } },
      { key: 'social_links', value: { twitter: "https://twitter.com/possiblehealth", linkedin: "https://linkedin.com/company/possiblehealth", facebook: "https://facebook.com/possiblehealth" } }
    ];

    for (const s of settings) {
      await client.query(`
        INSERT INTO site_settings (setting_key, setting_value)
        VALUES ($1, $2)
        ON CONFLICT (setting_key) DO UPDATE SET
          setting_value = EXCLUDED.setting_value, updated_at = CURRENT_TIMESTAMP;
      `, [s.key, JSON.stringify(s.value)]);
    }

    await client.query('COMMIT');
    console.log('[DB] ALL MIGRATIONS AND SEEDING COMPLETED SUCCESSFULLY!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[DB] Migration failed:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
