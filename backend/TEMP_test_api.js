/*
 Temporarily script to test API endpoints, please delete it 
 after the actual backend tests are created
*/

const BASE = process.env.BASE_URL || 'http://localhost:3000';

async function req(method, path, body) {
  const url = `${BASE}${path}`;
  const init = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body !== undefined) init.body = JSON.stringify(body);
  const res = await fetch(url, init);
  const text = await res.text();
  let json;
  try { json = text ? JSON.parse(text) : null; } catch { json = text; }
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} ${res.statusText} for ${method} ${path}`);
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

function logStep(title, data) {
  console.log(`\n=== ${title} ===`);
  if (data !== undefined) {
    try {
      console.log(JSON.stringify(data, null, 2));
    } catch {
      console.log(data);
    }
  }
}

(async () => {
  try {
    logStep('Base URL', BASE);

    // 1) Create two users
    const userA = await req('POST', '/users', {
      name: 'Alice Tester',
      email: `alice_${Date.now()}@example.com`,
    });
    logStep('Created User A', userA);

    const userB = await req('POST', '/users', {
      name: 'Bob Reviewer',
      email: `bob_${Date.now()}@example.com`,
    });
    logStep('Created User B', userB);

    // 2) List users
    const users = await req('GET', '/users');
    logStep('List Users', users);

    // 3) Create an initiative (uses required fields; adjust as needed)
    const initiativePayload = {
      title: 'Community Recycling Drive',
      description: 'Organize a neighborhood recycling initiative with weekly pickups.',
      theme: 'Sustainability',
      context: 'Urban community with low recycling rates',
      deliverable: 'Monthly report on collected recyclables and participation rate',
      evaluationCriteria: 'Tonnage collected and % household participation',
      authorId: userA.id,
    };
    const initiative = await req('POST', '/initiatives', initiativePayload);
    logStep('Created Initiative', initiative);

    // 4) Get initiative by id (should include likes, comments, updates)
    const fetched = await req('GET', `/initiatives/${initiative.id}`);
    logStep('Fetched Initiative', fetched);

    // 5) Approve & assign (assign to User B, approved by User A)
    const approved = await req('PATCH', `/initiatives/${initiative.id}/approve`, {
      assignedToId: userB.id,
      assignedById: userA.id,
    });
    logStep('Approved Initiative', approved);

    // 6) Post an execution update (by assigned user)
    const update = await req('POST', `/initiatives/${initiative.id}/updates`, {
      authorId: userB.id,
      content: 'Kickoff completed. Volunteers recruited and first pickup scheduled.',
    });
    logStep('Created Initiative Update', update);

    // 7) Search similar initiatives via embeddings
    const similar = await req('POST', `/embeddings/similar`, {
      text: 'neighborhood recycling program to increase participation',
      limit: 5,
    });
    logStep('Similar Initiatives (id + distance or objects)', similar);

    // 8) List initiatives
    const list = await req('GET', '/initiatives');
    logStep('List Initiatives', list);

    console.log('\nAll tests completed successfully.');
  } catch (err) {
    console.error('\nTest failed:');
    console.error(err.message);
    if (err.body) console.error('Body:', JSON.stringify(err.body, null, 2));
    process.exitCode = 1;
  }
})();
