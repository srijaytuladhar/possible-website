const jwt = require('jsonwebtoken');

const BASE_URL = 'http://localhost:3005';

async function api(path, method = 'GET', body = null, token = null) {
  const url = `${BASE_URL}${path}`;
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    data = await res.text();
  }

  return { status: res.status, ok: res.ok, data };
}

async function login(username, password) {
  const res = await api('/api/auth/login', 'POST', { username, password });
  if (res.status === 200 && res.data.token) {
    return { token: res.data.token, user: res.data.user };
  }
  throw new Error(`Login failed for ${username}: ${JSON.stringify(res.data)}`);
}

let passed = 0;
let failed = 0;

function assert(condition, testName, res = null) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passed++;
  } else {
    const detail = res ? `[Status ${res.status}] ${JSON.stringify(res.data)}` : '';
    console.error(`  ✗ FAIL: ${testName} - ${detail}`);
    failed++;
  }
}

async function run() {
  console.log('=====================================================');
  console.log('STARTING QA VERIFICATION & END-TO-END TEST SUITE');
  console.log('=====================================================\n');

  console.log('--- Authenticating seeded test accounts ---');
  const superAdminAuth = await login('admin', 'Nepal@123#');
  const staffAdminAuth = await login('staff_admin', 'Nepal@123#');
  const contentManagerAuth = await login('content_manager', 'Nepal@123#');
  const readonlyAuth = await login('readonly_user', 'Nepal@123#');

  const superAdminToken = superAdminAuth.token;
  const staffAdminToken = staffAdminAuth.token;
  const contentManagerToken = contentManagerAuth.token;
  const readonlyToken = readonlyAuth.token;

  console.log('  ✓ Acquired tokens for SUPER_ADMIN, ADMIN, CONTENT_MANAGER, READ_ONLY\n');

  // Test Public Homepage API
  console.log('--- Testing Homepage Content API ---');
  const hpPublic = await api('/api/homepage');
  assert(hpPublic.status === 200 && hpPublic.data.success, 'Public GET /api/homepage returns 200 OK', hpPublic);
  assert(Array.isArray(hpPublic.data.sections) && hpPublic.data.sections.length >= 7, 'Homepage returns all 7 seeded sections');

  // Test QA Scenario 3: Unauthorized user blocked from protected APIs
  console.log('\n--- QA Scenario 3: Unauthorized Access Protection ---');
  const unauthUsers = await api('/api/users');
  assert(unauthUsers.status === 401, 'GET /api/users without token returns 401 Unauthorized', unauthUsers);

  const unauthCollabCreate = await api('/api/collaborators', 'POST', { name: 'Hack Corp' });
  assert(unauthCollabCreate.status === 401, 'POST /api/collaborators without token returns 401 Unauthorized', unauthCollabCreate);

  // Test QA Scenario 1: Content Manager must NOT be able to manage portal users
  console.log('\n--- QA Scenario 1: Content Manager User Management Restriction ---');
  const cmUsers = await api('/api/users', 'GET', null, contentManagerToken);
  assert(cmUsers.status === 403, 'Content Manager GET /api/users returns 403 Forbidden', cmUsers);

  const cmCreateUser = await api('/api/users', 'POST', { username: 'testuser', role: 'CONTENT_MANAGER' }, contentManagerToken);
  assert(cmCreateUser.status === 403, 'Content Manager POST /api/users returns 403 Forbidden', cmCreateUser);

  // Test QA Scenario 2: Read Only user must NOT be able to modify content
  console.log('\n--- QA Scenario 2: Read Only User Content Mutation Restriction ---');
  const roCollabPost = await api('/api/collaborators', 'POST', { name: 'Test Collab', category: 'Academic' }, readonlyToken);
  assert(roCollabPost.status === 403, 'Read Only POST /api/collaborators returns 403 Forbidden', roCollabPost);

  const roWwPost = await api('/api/work-with-us', 'POST', { title: 'Test Job', description: 'desc' }, readonlyToken);
  assert(roWwPost.status === 403, 'Read Only POST /api/work-with-us returns 403 Forbidden', roWwPost);

  const roHpPut = await api('/api/homepage', 'PUT', { section_key: 'hero', title: 'Hacked' }, readonlyToken);
  assert(roHpPut.status === 403, 'Read Only PUT /api/homepage returns 403 Forbidden', roHpPut);

  // But Read Only CAN read admin collaborator lists with all=true
  const roCollabGet = await api('/api/collaborators?all=true', 'GET', null, readonlyToken);
  assert(roCollabGet.status === 200, 'Read Only GET /api/collaborators?all=true returns 200 OK', roCollabGet);

  // Test QA Scenario 4: Inactive collaborators must not appear on website
  console.log('\n--- QA Scenario 4: Inactive Collaborator Visibility ---');
  // Create an inactive collaborator with Super Admin
  const createInactiveCollab = await api('/api/collaborators', 'POST', {
    name: 'Secret Ghost Partner',
    category: 'Academic',
    is_active: false,
    sort_order: 999,
  }, superAdminToken);
  assert(createInactiveCollab.status === 201 && createInactiveCollab.data.success, 'Admin creates inactive collaborator', createInactiveCollab);
  const ghostCollabId = createInactiveCollab.data.collaborator?.id;

  // Public GET must NOT return this inactive collaborator
  const publicCollabs = await api('/api/collaborators');
  const ghostFoundPublic = publicCollabs.data.collaborators?.some(c => c.name === 'Secret Ghost Partner');
  assert(!ghostFoundPublic, 'Public /api/collaborators does NOT include inactive collaborator');

  // Admin GET with all=true DOES return this inactive collaborator
  const adminCollabs = await api('/api/collaborators?all=true', 'GET', null, superAdminToken);
  const ghostFoundAdmin = adminCollabs.data.collaborators?.some(c => c.name === 'Secret Ghost Partner');
  assert(ghostFoundAdmin, 'Admin /api/collaborators?all=true includes inactive collaborator', adminCollabs);

  // Clean up test collaborator
  if (ghostCollabId) {
    const delCollab = await api(`/api/collaborators/${ghostCollabId}`, 'DELETE', null, superAdminToken);
    assert(delCollab.status === 200, 'Cleaned up inactive test collaborator', delCollab);
  }

  // Test QA Scenario 5: Unpublished Work With Us content must not appear publicly
  console.log('\n--- QA Scenario 5: Unpublished Work With Us Visibility ---');
  const createDraftJob = await api('/api/work-with-us', 'POST', {
    section_type: 'job_posting',
    title: 'Secret Senior Researcher',
    description: 'Conduct health research across Nepal and published papers',
    department: 'Research',
    location: 'Kathmandu',
    is_published: false,
    sort_order: 999,
  }, superAdminToken);
  assert(createDraftJob.status === 201 && createDraftJob.data.success, 'Admin creates unpublished job vacancy', createDraftJob);
  const draftJobId = createDraftJob.data?.item?.id;

  // Public GET must NOT return unpublished job
  const publicWw = await api('/api/work-with-us');
  const draftFoundPublic = publicWw.data.items?.some(j => j.title === 'Secret Senior Researcher');
  assert(!draftFoundPublic, 'Public /api/work-with-us does NOT include unpublished job');

  // Admin GET with all=true DOES return unpublished job
  const adminWw = await api('/api/work-with-us?all=true', 'GET', null, superAdminToken);
  const draftFoundAdmin = adminWw.data.items?.some(j => j.title === 'Secret Senior Researcher');
  assert(draftFoundAdmin, 'Admin /api/work-with-us?all=true includes unpublished job', adminWw);

  // Clean up draft job
  if (draftJobId) {
    const delJob = await api(`/api/work-with-us/${draftJobId}`, 'DELETE', null, superAdminToken);
    assert(delJob.status === 200, 'Cleaned up unpublished test job', delJob);
  }

  // Test QA Scenario 6: Homepage Content Management & Persistence
  console.log('\n--- QA Scenario 6: Homepage Content Management & Persistence ---');
  const updateHp = await api('/api/homepage', 'PUT', {
    section_key: 'hero',
    title: 'Transforming Healthcare Systems Across Nepal',
    subtitle: 'Dynamic QA Tested Headline',
    is_published: true,
  }, superAdminToken);
  assert(updateHp.status === 200 && updateHp.data.success, 'Admin updates Homepage hero section', updateHp);

  const hpVerify = await api('/api/homepage');
  const updatedHero = hpVerify.data.sections?.find(s => s.section_key === 'hero');
  assert(updatedHero && updatedHero.title === 'Transforming Healthcare Systems Across Nepal', 'Public /api/homepage reflects updated Hero title', hpVerify);

  // Restore Hero original title
  await api('/api/homepage', 'PUT', {
    section_key: 'hero',
    title: 'Integrating healthcare into government systems for lasting impact in Nepal',
    subtitle: 'Strengthening healthcare systems through research and implementation in Nepal.',
    is_published: true,
  }, superAdminToken);

  // Test QA Scenario 7: RBAC Privilege Escalation & Super Admin Protection
  console.log('\n--- QA Scenario 7: Privilege Escalation & Super Admin Protection ---');
  // 1. Staff Admin tries to promote user to SUPER_ADMIN
  const staffPromote = await api('/api/users', 'POST', {
    username: 'fake_superadmin',
    email: 'fake@example.com',
    password: 'Password123#',
    full_name: 'Fake SuperAdmin',
    role: 'SUPER_ADMIN',
  }, staffAdminToken);
  assert(staffPromote.status === 403, 'Staff Admin cannot assign SUPER_ADMIN role (escalation prevented)', staffPromote);

  // 2. Staff Admin tries to delete SUPER_ADMIN (admin id from superAdminAuth)
  const staffDelSuper = await api(`/api/users/${superAdminAuth.user.id}`, 'DELETE', null, staffAdminToken);
  assert(staffDelSuper.status === 403, 'Staff Admin cannot delete a SUPER_ADMIN account', staffDelSuper);

  // 3. Super Admin tries to delete themselves
  const selfDel = await api(`/api/users/${superAdminAuth.user.id}`, 'DELETE', null, superAdminToken);
  assert(selfDel.status === 400 && selfDel.data?.error?.includes('own account'), 'Super Admin cannot delete their own account', selfDel);

  // Test Users API CRUD by Super Admin
  console.log('\n--- User Management CRUD & Roles ---');
  const createTempUser = await api('/api/users', 'POST', {
    username: 'qa_temp_agent',
    email: 'qa_temp@possiblehealth.org',
    password: 'Password123#',
    full_name: 'QA Temp Agent',
    role: 'CONTENT_MANAGER',
  }, superAdminToken);
  assert(createTempUser.status === 201 && createTempUser.data.success, 'Super Admin creates new CONTENT_MANAGER user', createTempUser);
  const tempUserId = createTempUser.data.user?.id;

  if (tempUserId) {
    // Reset password
    const resetPw = await api(`/api/users/${tempUserId}/reset-password`, 'POST', { new_password: 'NewPassword123#' }, superAdminToken);
    assert(resetPw.status === 200 && resetPw.data.success, 'Super Admin resets user password', resetPw);

    // Update user
    const updateUser = await api(`/api/users/${tempUserId}`, 'PUT', { is_active: false }, superAdminToken);
    assert(updateUser.status === 200 && updateUser.data.user?.is_active === false, 'Super Admin deactivates user', updateUser);

    // Delete user
    const delTempUser = await api(`/api/users/${tempUserId}`, 'DELETE', null, superAdminToken);
    assert(delTempUser.status === 200 && delTempUser.data.success, 'Super Admin deletes user', delTempUser);
  }

  // Test Roles API
  const rolesRes = await api('/api/users/roles', 'GET', null, superAdminToken);
  assert(rolesRes.status === 200 && rolesRes.data.roles?.length === 4, 'GET /api/users/roles returns all 4 roles with permissions', rolesRes);

  // Test Audit Logs
  console.log('\n--- Audit Logging Verification ---');
  const auditRes = await api('/api/audit-logs?limit=5', 'GET', null, superAdminToken);
  assert(auditRes.status === 200 && Array.isArray(auditRes.data.logs), 'GET /api/audit-logs returns log entries created during actions', auditRes);

  // Test Stats API
  console.log('\n--- Admin Dashboard Stats Verification ---');
  const statsRes = await api('/api/stats', 'GET', null, superAdminToken);
  assert(statsRes.status === 200 && statsRes.data.stats?.collaborators !== undefined && statsRes.data.stats?.workWithUs !== undefined, 'GET /api/stats includes collaborators and workWithUs counts', statsRes);

  console.log('\n=====================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('=====================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

run().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
