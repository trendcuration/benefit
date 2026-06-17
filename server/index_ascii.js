const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const SERVICE_KEY = process.env.API_SERVICE_KEY;

const API_ENDPOINT =
  'https://api.odcloud.kr/api/15083323/v1/uddi:3929b807-3420-44d7-a851-cc741fce65a1';

const CATEGORY_RULES = [
  { category: '\uc8fc\uac70',      keywords: ['\uc8fc\uac70', '\uc784\ub300', '\uc804\uc138', '\uc6d4\uc138', '\uc8fc\ud0dd', '\uc9d1'] },
  { category: '\ucchwi\uc5c5\u00b7\ucc3d\uc5c5', keywords: ['\ucchwi\uc5c5', '\ucc3d\uc5c5', '\uace0\uc6a9', '\uc9c1\uc5c5', '\uad6c\uc9c1', '\ud6c8\ub828', '\uc7ac\ucchwi\uc5c5', '\uc77c\uc790\ub9ac', '\uadfc\ub85c'] },
  { category: '\uae08\uc735',      keywords: ['\uc800\ucd95', '\ub300\ucd9c', '\uc7a5\ud559\uae08', '\uae08\uc735', '\uc7a5\ub824\uae08', '\ubaa9\ub3c8', '\ubc14\uc6b0\uccad', '\uc9c0\uc6d0\uae08'] },
  { category: '\ubcf5\uc9c0\u00b7\ub3cc\ubd07', keywords: ['\ub3cc\ubd07', '\uc591\uc721', '\ubcf4\uc721', '\uc544\uc774', '\ucd9c\uc0b0', '\uc784\uc2e0', '\uc721\uc544', '\uc5f0\uae08', '\uc218\ub2f9', '\uae09\uc5ec', '\uc7ac\ud65c', '\uc7a5\uc560'] },
  { category: '\uad50\uc721',      keywords: ['\uad50\uc721', '\ud559\uc2b5', '\ud559\ube44', '\ub4f1\ub85d\uae08', '\ud559\uc6d0', '\uc7a5\ud559', '\ud559\uad50'] },
  { category: '\uac74\uac15',      keywords: ['\uac74\uac15', '\uc758\ub8cc', '\uac80\uc9c4', '\uc2ec\ub9ac', '\uce58\ub8cc', '\ubcd1\uc6d0', '\uc7ac\ud65c', '\uc694\uc591'] },
  { category: '\ubb38\ud654\u00b7\uc5ec\uac00', keywords: ['\ubb38\ud654', '\uc5ec\uac00', '\uccb4\uc721', '\uc5ec\ud589', '\uacf5\uc5f0', '\uc608\uc220', '\uc2a4\ud3ec\uce20'] },
];

function guessCategory(text) {
  const t = text.toLowerCase();
  for (const { category, keywords } of CATEGORY_RULES) {
    if (keywords.some(k => t.includes(k))) return category;
  }
  return '\ubcf5\uc9c0\u00b7\ub3cc\ubd07';
}

const AGE_RULES = [
  { age: '10\ub300',    keywords: ['\uccad\uc18c\ub144', '10\ub300', '\ud559\uc0dd', '\uc544\ub3d9', '\uc5b4\ub9b0\uc774', '\ud559\uad50'] },
  { age: '20\ub300',    keywords: ['\uccad\ub144', '20\ub300', '\ub300\ud559\uc0dd', '\ucde8\uc900'] },
  { age: '30\ub300',    keywords: ['\uccad\ub144', '30\ub300', '\uc721\uc544', '\uc591\uc721', '\uc784\uc2e0', '\ucd9c\uc0b0'] },
  { age: '40\ub300',    keywords: ['\uc911\uc7a5\ub144', '40\ub300', '\uc7ac\ucchwi\uc5c5', '\uacbd\ub825'] },
  { age: '50\ub300',    keywords: ['\uc911\uc7a5\ub144', '50\ub300', '\uc7ac\ucchwi\uc5c5', '\ud1f4\uc9c1'] },
  { age: '60\ub300',    keywords: ['\ub178\uc778', '\ub178\ub144', '\uc5b4\ub974\uc2e0', '60\ub300', '\uacbd\ub85c'] },
  { age: '70\ub300\uc774\uc0c1', keywords: ['\ub178\uc778', '\uc5b4\ub974\uc2e0', '70\ub300', '80\ub300', '\uace0\ub839'] },
];

function guessAgeGroups(text) {
  const t = text.toLowerCase();
  const matched = AGE_RULES
    .filter(({ keywords }) => keywords.some(k => t.includes(k)))
    .map(({ age }) => age);
  const unique = [...new Set(matched)];
  return unique.length > 0 ? unique : ['20\ub300', '30\ub300', '40\ub300', '50\ub300'];
}

function guessGenders(text) {
  const t = text.toLowerCase();
  const hasW = t.includes('\uc5ec\uc131') || t.includes('\uc5ec\uc790') || t.includes('\ubaa8\uc131');
  const hasM = t.includes('\ub0a8\uc131') || t.includes('\ub0a8\uc790');
  if (hasW && !hasM) return ['\uc5ec\uc131'];
  if (hasM && !hasW) return ['\ub0a8\uc131'];
  return ['\uc804\uccb4'];
}

async function fetchPage(page, perPage = 100) {
  const res = await axios.get(API_ENDPOINT, {
    params: { serviceKey: SERVICE_KEY, page, perPage },
    timeout: 15000,
  });
  return res.data;
}

function transform(item, idx) {
  const combined = `${item['\uc11c\ube44\uc2a4\uba85'] || ''} ${item['\uc11c\ube44\uc2a4\uc694\uc57d'] || ''} ${item['\uc18c\uad00\ubd80\ucc98\uba85'] || ''}`;
  return {
    id: idx + 1,
    title:       item['\uc11c\ube44\uc2a4\uba85']   || '',
    description: item['\uc11c\ube44\uc2a4\uc694\uc57d'] || '',
    amount:      '\uc9c0\uc6d0',
    deadline:    '\uc0c1\uc2dc',
    category:    guessCategory(combined),
    ageGroups:   guessAgeGroups(combined),
    genders:     guessGenders(combined),
    source:      item['\uc18c\uad00\ubd80\ucc98\uba85'] || '',
    url:         item['\uc11c\ube44\uc2a4URL']  || 'https://www.bokjiro.go.kr',
    isUrgent:    false,
  };
}

async function fetchAll() {
  const first = await fetchPage(1, 100);
  const total = first.totalCount || 0;
  const allItems = [...(first.data || [])];

  const remaining = Math.ceil((total - 100) / 100);
  for (let p = 2; p <= Math.min(remaining + 1, 4); p++) {
    const next = await fetchPage(p, 100);
    allItems.push(...(next.data || []));
  }

  return allItems;
}

app.get('/api/subsidies', async (req, res) => {
  if (!SERVICE_KEY) {
    return res.status(500).json({ error: 'API key not set' });
  }

  const { ageGroup, gender } = req.query;

  try {
    const rawItems = await fetchAll();

    let subsidies = rawItems
      .map(transform)
      .filter(s => s.title);

    if (ageGroup) {
      subsidies = subsidies.filter(s => s.ageGroups.includes(ageGroup));
    }

    if (gender && gender !== '\uc804\uccb4') {
      subsidies = subsidies.filter(s =>
        s.genders.includes('\uc804\uccb4') || s.genders.includes(gender)
      );
    }

    res.json(subsidies);
  } catch (err) {
    console.error('[API Error]', err.message);
    res.status(502).json({ error: 'API call failed. Please try again later.' });
  }
});

app.get('/health', (_, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`benefit-server running on port ${PORT}`);
  if (!SERVICE_KEY) console.warn('WARNING: API_SERVICE_KEY not set');
});
