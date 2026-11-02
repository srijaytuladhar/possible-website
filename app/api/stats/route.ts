import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(req: NextRequest) {
  try {
    const [
      articlesRes,
      teamRes,
      pubsRes,
      solutionsRes,
      contactsRes,
      subscribersRes,
      donationsRes,
      recentContacts,
      recentArticles
    ] = await Promise.all([
      query('SELECT count(*) as total, count(*) FILTER (WHERE is_published = true) as published FROM news_articles'),
      query('SELECT count(*) as total, count(*) FILTER (WHERE category = \'us_board\') as us_board, count(*) FILTER (WHERE category = \'nepal_board\') as nepal_board, count(*) FILTER (WHERE category = \'team_member\') as staff, count(*) FILTER (WHERE category = \'advisor\') as advisors FROM team_members'),
      query('SELECT count(*) as total, count(*) FILTER (WHERE category = \'impact-reports\') as impact_reports, count(*) FILTER (WHERE category = \'research-papers\') as research_papers, count(*) FILTER (WHERE category = \'research-briefs\') as research_briefs, count(*) FILTER (WHERE category = \'financial-reports\') as financial_reports FROM publications'),
      query('SELECT count(*) as total, count(*) FILTER (WHERE stage_id = \'scale\') as scale, count(*) FILTER (WHERE stage_id = \'test\') as test, count(*) FILTER (WHERE stage_id = \'innovate\') as innovate, count(*) FILTER (WHERE stage_id = \'pipeline\') as pipeline FROM solutions_projects'),
      query('SELECT count(*) as total, count(*) FILTER (WHERE status = \'NEW\') as new_count FROM contact_inquiries'),
      query('SELECT count(*) as total FROM newsletter_subscribers WHERE is_active = true'),
      query('SELECT count(*) as total, COALESCE(SUM(amount), 0) as total_amount FROM donations WHERE status = \'COMPLETED\''),
      query('SELECT id, name, email, subject, status, created_at FROM contact_inquiries ORDER BY created_at DESC LIMIT 5'),
      query('SELECT id, title, category, published_date, is_published FROM news_articles ORDER BY published_date DESC LIMIT 5'),
    ]);

    return jsonResponse({
      success: true,
      stats: {
        articles: {
          total: parseInt(articlesRes.rows[0].total, 10),
          published: parseInt(articlesRes.rows[0].published, 10),
        },
        team: {
          total: parseInt(teamRes.rows[0].total, 10),
          usBoard: parseInt(teamRes.rows[0].us_board, 10),
          nepalBoard: parseInt(teamRes.rows[0].nepal_board, 10),
          staff: parseInt(teamRes.rows[0].staff, 10),
          advisors: parseInt(teamRes.rows[0].advisors, 10),
        },
        publications: {
          total: parseInt(pubsRes.rows[0].total, 10),
          impactReports: parseInt(pubsRes.rows[0].impact_reports, 10),
          researchPapers: parseInt(pubsRes.rows[0].research_papers, 10),
          researchBriefs: parseInt(pubsRes.rows[0].research_briefs, 10),
          financialReports: parseInt(pubsRes.rows[0].financial_reports, 10),
        },
        solutions: {
          total: parseInt(solutionsRes.rows[0].total, 10),
          scale: parseInt(solutionsRes.rows[0].scale, 10),
          test: parseInt(solutionsRes.rows[0].test, 10),
          innovate: parseInt(solutionsRes.rows[0].innovate, 10),
          pipeline: parseInt(solutionsRes.rows[0].pipeline, 10),
        },
        contacts: {
          total: parseInt(contactsRes.rows[0].total, 10),
          newCount: parseInt(contactsRes.rows[0].new_count, 10),
        },
        subscribers: {
          total: parseInt(subscribersRes.rows[0].total, 10),
        },
        donations: {
          totalCount: parseInt(donationsRes.rows[0].total, 10),
          totalAmount: parseFloat(donationsRes.rows[0].total_amount),
        },
        recentContacts: recentContacts.rows,
        recentArticles: recentArticles.rows,
      },
    });
  } catch (error: any) {
    console.error('Stats error:', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}
