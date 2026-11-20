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

async function migrate() {
  console.log('[Migration] Connecting to Supabase PostgreSQL database...');
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Update admin_users table for RBAC & extra fields
    console.log('[Migration] Updating admin_users table...');
    await client.query(`
      ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS phone VARCHAR(50);
      ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS avatar_url TEXT;
      ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '[]'::jsonb;
    `);

    // Ensure sample users for all roles exist
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('Nepal@123#', salt);

    // Super Admin
    await client.query(`
      INSERT INTO admin_users (username, password_hash, full_name, email, role, is_active)
      VALUES ('admin', $1, 'Super Administrator', 'admin@possiblehealth.org', 'SUPER_ADMIN', true)
      ON CONFLICT (username) DO UPDATE SET role = 'SUPER_ADMIN', is_active = true, updated_at = CURRENT_TIMESTAMP;
    `, [hash]);

    // Admin
    await client.query(`
      INSERT INTO admin_users (username, password_hash, full_name, email, role, is_active)
      VALUES ('staff_admin', $1, 'Standard Administrator', 'staff@possiblehealth.org', 'ADMIN', true)
      ON CONFLICT (username) DO UPDATE SET role = 'ADMIN', is_active = true, updated_at = CURRENT_TIMESTAMP;
    `, [hash]);

    // Content Manager
    await client.query(`
      INSERT INTO admin_users (username, password_hash, full_name, email, role, is_active)
      VALUES ('content_manager', $1, 'Content Manager', 'editor@possiblehealth.org', 'CONTENT_MANAGER', true)
      ON CONFLICT (username) DO UPDATE SET role = 'CONTENT_MANAGER', is_active = true, updated_at = CURRENT_TIMESTAMP;
    `, [hash]);

    // Read Only User
    await client.query(`
      INSERT INTO admin_users (username, password_hash, full_name, email, role, is_active)
      VALUES ('readonly_user', $1, 'Auditor / Viewer', 'viewer@possiblehealth.org', 'READ_ONLY', true)
      ON CONFLICT (username) DO UPDATE SET role = 'READ_ONLY', is_active = true, updated_at = CURRENT_TIMESTAMP;
    `, [hash]);

    console.log('[Migration] Seeded RBAC users: admin, staff_admin, content_manager, readonly_user (password: Nepal@123#).');

    // 2. Audit Logs Table
    console.log('[Migration] Creating audit_logs table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        username VARCHAR(100),
        action VARCHAR(100) NOT NULL,
        module VARCHAR(100) NOT NULL,
        record_id VARCHAR(100),
        details JSONB,
        ip_address VARCHAR(100),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_audit_module ON audit_logs(module);
    `);

    // 3. Collaborators Table
    console.log('[Migration] Creating collaborators table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS collaborators (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        organization VARCHAR(255),
        category VARCHAR(150) NOT NULL DEFAULT 'Government and Multilateral',
        description TEXT,
        logo_url TEXT,
        website_url TEXT,
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_collaborators_category ON collaborators(category, sort_order);
      CREATE INDEX IF NOT EXISTS idx_collaborators_active ON collaborators(is_active);
    `);

    // Seed existing collaborators from the static page
    const seedCategories = [
      {
        title: "Government and Multilateral",
        partners: [
          "Ministry of Health and Food Safety (MoHFS), GoN",
          "Department of Health Services, MoHFS, GoN",
          "Nursing and Social Security Division, DoHS, MoHFS, GoN",
          "Epidemiology and Disease Control Division, DoHS, MoHFS, GoN",
          "National Centre for AIDS & STD Control, MoHFS, GoN",
          "Nepal Health Research Council, GoN",
          "World Health Organization (WHO)",
          "Chandragiri Municipality, Chandragiri",
          "Bardibas Municipality, Mahottari",
          "Bhimeshwor Municipality, Dolakha",
          "Tamakoshi Rural Municipality, Dolakha",
          "Baiteshwor Rural Municipality, Dolakha",
          "Kalinchowk Rural Municipality, Dolakha",
        ],
      },
      {
        title: "Academic",
        partners: [
          "Dhulikhel Hospital, Kathmandu University Hospital",
          "Kathmandu University School of Medical Sciences",
          "University of California San Francisco, USA",
          "University of California Los Angeles, USA",
          "University of Connecticut, USA",
          "Yale University, USA",
          "Wheaton College, USA",
          "Arnhold Institute for Global Health at Icahn School of Medicine at Mt. Sinai, USA",
          "Community Health Impact Coalition",
          "NAAMI- Nepal Applied Mathematics and Informatics Institute for research",
          "SunyaEk",
          "Fusemachines",
          "Sexual Violence Research Initiative (SVRI)",
        ],
      },
      {
        title: "Community and Civil Society",
        partners: [
          "Women's Rehabilitation Centre (WOREC)",
          "Nepal Disabled Women Association",
          "Transcultural Psychosocial Organization Nepal (TPO Nepal)",
          "Blue Diamond Society",
          "Dalit Lives Matter",
          "GHAR",
          "Nyaya Health Nepal",
          "AutismCare Nepal Society",
          "Hope Child Development Center",
        ],
      },
      {
        title: "Institutional and Funding Partners",
        partners: [
          "Possible US",
          "Weiss Asset Management, USA",
          "Deerfield Foundation, USA",
          "National Institutes of Health, USA",
        ],
      },
    ];

    let order = 1;
    for (const cat of seedCategories) {
      for (const p of cat.partners) {
        await client.query(`
          INSERT INTO collaborators (name, organization, category, sort_order, is_active)
          VALUES ($1, $2, $3, $4, true)
          ON CONFLICT DO NOTHING;
        `, [p, p, cat.title, order++]);
      }
    }
    console.log(`[Migration] Seeded ${order - 1} collaborators.`);

    // 4. Work With Us Items Table
    console.log('[Migration] Creating work_with_us_items table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS work_with_us_items (
        id SERIAL PRIMARY KEY,
        section_type VARCHAR(50) NOT NULL DEFAULT 'job_posting', -- 'job_posting', 'traineeship', 'value_card', 'quote', 'hero'
        title VARCHAR(500) NOT NULL,
        subtitle VARCHAR(500),
        department VARCHAR(255),
        location VARCHAR(255),
        employment_type VARCHAR(100), -- 'Full-time', 'Part-time', 'Fellowship', 'Apprenticeship', 'Internship', 'Contract'
        description TEXT NOT NULL,
        requirements TEXT,
        link_url TEXT,
        image_url TEXT,
        deadline VARCHAR(150),
        sort_order INTEGER DEFAULT 0,
        is_published BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_wwu_type ON work_with_us_items(section_type, sort_order);
      CREATE INDEX IF NOT EXISTS idx_wwu_published ON work_with_us_items(is_published);
    `);

    // Seed sample Work With Us items
    await client.query(`
      INSERT INTO work_with_us_items (section_type, title, subtitle, department, location, employment_type, description, requirements, link_url, deadline, sort_order, is_published)
      VALUES 
        ('job_posting', 'Community Health Implementation Lead', 'Lead digital health integration across primary healthcare centers', 'Programs & Implementation', 'Kathmandu & Dolakha, Nepal', 'Full-time', 'We are seeking an experienced healthcare professional to lead the implementation of our digital CHW tools in partner municipalities.', 'Master in Public Health or related field with 5+ years experience.', 'https://possiblehealth.org/contact-us', 'Rolling Basis', 1, true),
        ('traineeship', 'Healthcare Informatics & Data Science Fellow', 'Hands-on practical training with healthcare data systems and analytics', 'Data Systems & Research', 'Kathmandu, Nepal', 'Fellowship', 'An intensive 6-month fellowship for recent graduates in computer science, statistics, or public health informatics.', 'Bachelor degree in relevant field, proficiency in SQL, Python or R.', 'https://possiblehealth.org/contact-us', 'Open until filled', 1, true)
      ON CONFLICT DO NOTHING;
    `);

    // 5. Homepage Sections Table
    console.log('[Migration] Creating homepage_sections table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS homepage_sections (
        id SERIAL PRIMARY KEY,
        section_key VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(500),
        subtitle TEXT,
        content TEXT,
        badge VARCHAR(150),
        image_url TEXT,
        link_text VARCHAR(150),
        link_url TEXT,
        items JSONB DEFAULT '[]'::jsonb,
        sort_order INTEGER DEFAULT 0,
        is_published BOOLEAN NOT NULL DEFAULT TRUE,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_hp_key ON homepage_sections(section_key);
    `);

    // Seed existing homepage sections
    const homepageSeedData = [
      {
        section_key: 'hero',
        title: 'We start with health problems most see as impossible to solve.',
        subtitle: 'We innovate and rigorously test health solutions with communities and the government, and then support to scale.',
        content: '',
        image_url: '/first-landing.jpg',
        link_text: 'Our solutions',
        link_url: '/solutions/scale',
        items: [],
        sort_order: 1,
        is_published: true
      },
      {
        section_key: 'sub_hero',
        title: '“Too complex to solve” is where we start.',
        subtitle: 'We innovate, test, and scale the health solutions with communities and government, then help bring them into healthcare workers’ everyday practice and national policy.',
        content: '',
        image_url: '',
        link_text: '',
        link_url: '',
        items: [],
        sort_order: 2,
        is_published: true
      },
      {
        section_key: 'approach',
        title: 'Our approach to solve health problems',
        subtitle: 'We work on health problems most either neglect or call impossible to solve, and run through a rigorous process. We innovate health solutions with people who have lived experience, experts, governments and relevant stakeholders, and test the solutions until the evidence is established. We then support the government and community partners to scale into public healthcare systems.',
        content: '',
        image_url: '/Codesign2.jpeg',
        link_text: '',
        link_url: '',
        items: [],
        sort_order: 3,
        is_published: true
      },
      {
        section_key: 'mission',
        title: 'Healthcare for the rural foothills of the Himalayas',
        subtitle: 'A mother in the rural foothills of the Himalayas deserves the same high-quality healthcare as anyone in Kathmandu or New York. We are working to build a health system that is rooted in communities, proven by evidence, and built to reach everyone.',
        content: '',
        image_url: '/Mother_updated.JPG',
        link_text: '',
        link_url: '',
        items: [],
        sort_order: 4,
        is_published: true
      },
      {
        section_key: 'stages',
        title: 'Our dynamic stages of solution delivery',
        subtitle: 'Our solutions move through these stages dynamically, starting with new ideas that we test and then scale.',
        content: '',
        image_url: '',
        link_text: '',
        link_url: '',
        items: [
          {
            title: 'Innovate',
            desc: 'Innovate health solutions with local communities and governments.',
            link: '/solutions/innovate',
            theme: 'pink'
          },
          {
            title: 'Test',
            desc: 'Prove it works, adapt it and test until the evidence is established.',
            link: '/solutions/test',
            theme: 'blue'
          },
          {
            title: 'Scale',
            desc: 'Help to integrate into public healthcare systems and national policy for larger impact.',
            link: '/solutions/scale',
            theme: 'purple'
          }
        ],
        sort_order: 5,
        is_published: true
      },
      {
        section_key: 'who_we_are',
        title: 'Who We Are',
        subtitle: 'We are health care professionals, clinicians, engineers, and advocates who happen to also be rigorous researchers, not the other way around. Rooted in Nepal for nearly two decades, we go looking for the problems everyone else avoids: mental health, stigma, domestic violence, chronic disease, disability, and the gaps between them. We co-design a project, test/deliver a program, and support to scale.',
        content: '',
        image_url: '/woweare.jpg',
        link_text: '',
        link_url: '',
        items: [],
        sort_order: 6,
        is_published: true
      },
      {
        section_key: 'partner_with_us',
        title: 'Partner With Us',
        subtitle: 'Working on a health problem others have overlooked or called too complex? We’d love to hear from you.',
        content: 'We work best with partners who work with communities and government, let evidence guide the way, and aim for change that outlasts the grant.',
        image_url: '',
        link_text: '',
        link_url: '',
        items: [
          {
            title: 'Fund a Solution',
            desc: 'Fund a solution where it needs support most.',
            link: '/donate',
            icon: 'HandHeart',
            theme: 'pink'
          },
          {
            title: 'Build With Us',
            desc: 'Collaborate with us to innovate, test, or scale a solution.',
            link: '/contact-us',
            icon: 'Users',
            theme: 'blue'
          },
          {
            title: 'Share a Problem or Idea',
            desc: 'Tell us about a neglected health need you’d like to tackle together.',
            link: '/contact-us',
            icon: 'Lightbulb',
            theme: 'purple'
          }
        ],
        sort_order: 7,
        is_published: true
      }
    ];

    for (const sec of homepageSeedData) {
      await client.query(`
        INSERT INTO homepage_sections (section_key, title, subtitle, content, image_url, link_text, link_url, items, sort_order, is_published)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (section_key) DO UPDATE SET
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          content = EXCLUDED.content,
          image_url = EXCLUDED.image_url,
          link_text = EXCLUDED.link_text,
          link_url = EXCLUDED.link_url,
          items = EXCLUDED.items,
          sort_order = EXCLUDED.sort_order,
          is_published = EXCLUDED.is_published,
          updated_at = CURRENT_TIMESTAMP;
      `, [
        sec.section_key,
        sec.title,
        sec.subtitle,
        sec.content,
        sec.image_url,
        sec.link_text,
        sec.link_url,
        JSON.stringify(sec.items),
        sec.sort_order,
        sec.is_published
      ]);
    }
    console.log(`[Migration] Seeded ${homepageSeedData.length} homepage sections.`);

    await client.query('COMMIT');
    console.log('[Migration] ALL MIGRATIONS COMPLETED SUCCESSFULLY!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[Migration FAILED]:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch(e => {
  console.error(e);
  process.exit(1);
});
