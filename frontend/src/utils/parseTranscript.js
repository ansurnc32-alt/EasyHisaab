const FILLER_WORDS = new Set([
  'और', 'मैंने', 'मैं', 'ने', 'देखो', 'देख', 'तो', 'है', 'हैं', 'थोड़ा', 'थोड़ी', 'कृपया',
  'यह', 'वो', 'वह', 'कितना', 'कुल', 'कुलमिलाकर', 'रूपये', 'रुपये', 'रु', '₹', 'रुपए', 'रूपए', 'की', 'के', 'का', 'ए', 'ओ', 'में',
  'लिए', 'के', 'की', 'का', 'के लिए', 'केलिए',
]);

const QUANTITY_WORDS = {
  एक: '1',
  दो: '2',
  तीन: '3',
  चार: '4',
  पांच: '5',
  छः: '6',
  छह: '6',
  सात: '7',
  आठ: '8',
  नौ: '9',
  दस: '10',
  आधा: '0.5',
  डेढ़: '1.5',
  ढाई: '2.5',
};

const UNIT_ALIASES = {
  kilo: 'किलो',
  किलो: 'किलो',
  kg: 'किलो',
  किलोग्राम: 'किलो',
  gram: 'ग्राम',
  ग्राम: 'ग्राम',
  g: 'ग्राम',
  liter: 'लीटर',
  लीटर: 'लीटर',
  l: 'लीटर',
  packet: 'पैकेट',
  पैकेट: 'पैकेट',
  box: 'बॉक्स',
  बॉक्स: 'बॉक्स',
  dozen: 'डजन',
  डजन: 'डजन',
};

const ITEM_NAME_HINTS = [
  'आलू', 'प्याज', 'टमाटर', 'हरी मिर्च', 'दाल', 'चावल', 'घी', 'खीर', 'मसाला', 'पानी', 'दूध', 'अदरक',
  'लहसुन', 'बिस्कुट', 'चाय', 'कॉफी', 'चीनी', 'नमक', 'मिर्च', 'तेल', 'दही', 'पनीर', 'केला', 'सेब', 'नारियल',
];

const RENTAL_ITEM_HINTS = ['कुर्सी', 'टेबल', 'प्लेट', 'गिलास', 'भगोना', 'कढ़ाई', 'चम्मच', 'तम्बू', 'तंबू'];
const LIQUID_GROCERY_HINTS = ['दूध', 'तेल', 'पानी', 'क्रीम', 'दही'];

function normalizeText(text = '') {
  return text
    .replace(/[.!?:;()\[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractCustomerName(text) {
  const cleaned = normalizeText(text);

  const directPattern = cleaned.match(/^([^\d,।]+?)\s+ने\s+/u);
  if (directPattern) {
    const candidate = directPattern[1].trim();
    if (candidate && !/^(मैं|हम|आप|वह|यह|ये|वो)$/u.test(candidate)) {
      return candidate;
    }
  }

  const forPattern = cleaned.match(/^([^\d,।]+?)\s+के\s+लिए\s+/iu);
  if (forPattern) {
    const candidate = forPattern[1].trim();
    if (candidate && !/^(मैं|हम|आप|वह|यह|ये|वो)$/u.test(candidate)) {
      return candidate;
    }
  }

  return null;
}

function stripCustomerPrefix(text) {
  return normalizeText(text)
    .replace(/^([^\d,।]+?)\s+ने\s+/u, '')
    .replace(/^([^\d,।]+?)\s+के\s+लिए\s+/iu, '')
    .replace(/^(मैंने|मैं|मुझे)\s+/iu, '')
    .trim();
}

function parseQuantity(words) {
  const priceCueIndex = words.findIndex((word) => /(?:रुपये|rupees|price|₹|रु)/iu.test(word));
  const searchWords = priceCueIndex === -1 ? words : words.slice(0, priceCueIndex);
  const quantityWord = searchWords.find((word) => Object.prototype.hasOwnProperty.call(QUANTITY_WORDS, word));

  if (quantityWord) {
    return QUANTITY_WORDS[quantityWord];
  }

  const numericQuantity = searchWords.find((word) => /^\d+(?:\.\d+)?$/.test(word));
  if (numericQuantity) {
    return numericQuantity;
  }
  return '1';
}

function extractNumberFromWord(word = '') {
  const value = word.match(/(\d+(?:\.\d+)?)/u);
  return value ? value[1] : '';
}

function parsePrice(words) {
  const priceCueIndex = words.findIndex((word) => /(?:रुपये|rupees|price|₹|रु)/iu.test(word));

  const combinedPriceWord = words.find((word) => /(?:₹|रुपये|rupees|price|रु)/iu.test(word) && /\d/.test(word));
  if (combinedPriceWord) {
    return extractNumberFromWord(combinedPriceWord);
  }

  const numericTokens = words
    .map((word, index) => ({ word, index, value: extractNumberFromWord(word) }))
    .filter((entry) => entry.value)
    .map((entry) => ({ ...entry, value: entry.value }));

  if (priceCueIndex === -1) {
    return '';
  }

  const numericBeforeCue = numericTokens.filter((entry) => entry.index < priceCueIndex);
  if (numericBeforeCue.length > 0) {
    const quantity = parseQuantity(words);
    const candidate = numericBeforeCue[numericBeforeCue.length - 1].value;
    const isLikelyQuantity = quantity && candidate === quantity;
    if (!isLikelyQuantity) {
      return candidate;
    }
  }

  const numericAfterCue = numericTokens.filter((entry) => entry.index > priceCueIndex);
  if (numericAfterCue.length > 0) {
    return numericAfterCue[0].value;
  }

  return '';
}

function inferUnitFromItemName(itemName = '', businessType = null) {
  const normalizedName = normalizeText(itemName).toLowerCase();
  const hasRentalHint = RENTAL_ITEM_HINTS.some((hint) => normalizedName.includes(hint.toLowerCase()) || hint.toLowerCase().includes(normalizedName));
  const hasGroceryHint = ITEM_NAME_HINTS.some((hint) => normalizedName.includes(hint.toLowerCase()) || hint.toLowerCase().includes(normalizedName));

  if (businessType === 'rental' || hasRentalHint) {
    return 'piece';
  }

  if (businessType === 'grocery' || hasGroceryHint) {
    const hasLiquidHint = LIQUID_GROCERY_HINTS.some((hint) => normalizedName.includes(hint.toLowerCase()) || hint.toLowerCase().includes(normalizedName));
    return hasLiquidHint ? 'लीटर' : 'किलो';
  }

  return null;
}

function parseUnit(words, itemName = '', businessType = null) {
  for (const word of words) {
    const normalizedWord = word.toLowerCase();
    const unit = UNIT_ALIASES[normalizedWord];
    if (unit) {
      return unit;
    }
  }

  return inferUnitFromItemName(itemName, businessType);
}

function parseItemName(words) {
  const quantityWord = parseQuantity(words);
  const candidateWords = words.filter((word) => {
    if (!word) return false;
    if (FILLER_WORDS.has(word)) return false;
    if (QUANTITY_WORDS[word]) return false;
    if (word === quantityWord) return false;
    if (/^\d+(?:\.\d+)?$/.test(word)) return false;
    if (['रूपये', 'रुपये', 'रु', '₹', 'रुपए', 'रूपए'].includes(word)) return false;
    if (['किलो', 'kg', 'किलोग्राम', 'ग्राम', 'g', 'लीटर', 'l', 'पैकेट', 'बॉक्स', 'डजन', 'डोज़न', 'डजेन'].includes(word)) return false;
    return true;
  });

  const cleanedWords = candidateWords.map((word) => normalizeText(word).replace(/^[,.;:]+|[,.;:]+$/g, '').trim()).filter(Boolean);
  const matchedIndex = cleanedWords.findIndex((word) => ITEM_NAME_HINTS.some((hint) => hint.includes(word) || word.includes(hint)) || RENTAL_ITEM_HINTS.some((hint) => hint.includes(word) || word.includes(hint)));
  if (matchedIndex !== -1) {
    return cleanedWords.slice(0, matchedIndex + 1).join(' ').trim();
  }

  return cleanedWords.join(' ').trim();
}

function isRentalItemWord(word = '') {
  const normalizedWord = normalizeText(word).toLowerCase().replace(/^[,.;:]+|[,.;:]+$/g, '');
  return RENTAL_ITEM_HINTS.some((hint) => normalizedWord.includes(hint.toLowerCase()) || hint.toLowerCase().includes(normalizedWord));
}

function splitRentalSegments(text = '') {
  const words = normalizeText(text).split(/\s+/).filter(Boolean);
  const segments = [];
  let currentSegment = [];

  for (let index = 0; index < words.length; index += 1) {
    const word = words[index];
    const nextWord = words[index + 1];
    const isNumericQuantity = /^\d+(?:\.\d+)?$/.test(word);
    const startsNewItem = isNumericQuantity && Boolean(nextWord) && isRentalItemWord(nextWord);

    if (startsNewItem && currentSegment.length > 0) {
      const candidate = currentSegment.join(' ').trim();
      if (candidate) {
        segments.push(candidate);
      }
      currentSegment = [word, nextWord];
      index += 1;
      continue;
    }

    if (startsNewItem && currentSegment.length === 0) {
      currentSegment = [word, nextWord];
      index += 1;
      continue;
    }

    currentSegment.push(word);
  }

  if (currentSegment.length > 0) {
    const candidate = currentSegment.join(' ').trim();
    if (candidate) {
      segments.push(candidate);
    }
  }

  return segments.filter((segment) => segment.trim().length > 0);
}

function splitSegments(text, businessType = null) {
  const normalizedText = normalizeText(text);

  if (businessType === 'rental') {
    return splitRentalSegments(normalizedText);
  }

  const baseSegments = normalizedText
    .split(/\s*,\s*|\s+(?:और|तथा|फिर|उसके\s+बाद)\s+/iu)
    .map((segment) => segment.trim())
    .filter(Boolean);

  const segments = [];

  baseSegments.forEach((segment) => {
    const words = segment.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      return;
    }

    let currentSegment = [];
    let sawPrice = false;

    words.forEach((word) => {
      const isQuantityToken = Boolean(QUANTITY_WORDS[word]) || /^\d+(?:\.\d+)?$/.test(word);
      const hasItemHintSoFar = currentSegment.some((candidate) => ITEM_NAME_HINTS.some((hint) => hint.includes(candidate) || candidate.includes(hint)));
      const isPriceCue = /(?:₹|रुपये|rupees|price|रु)/iu.test(word);
      const isPriceValue = /^\d+(?:\.\d+)?$/.test(word) && hasItemHintSoFar && currentSegment.length > 0;

      if (sawPrice && isQuantityToken && currentSegment.length > 0) {
        const candidate = currentSegment.join(' ').trim();
        if (candidate) {
          segments.push(candidate);
        }
        currentSegment = [word];
        sawPrice = false;
        return;
      }

      currentSegment.push(word);
      if (isPriceCue || isPriceValue) {
        sawPrice = true;
      }
    });

    if (currentSegment.length > 0) {
      const candidate = currentSegment.join(' ').trim();
      if (candidate) {
        segments.push(candidate);
      }
    }
  });

  return segments.filter((segment) => {
    const words = segment.split(/\s+/).filter(Boolean);
    return words.some((word) => ITEM_NAME_HINTS.some((hint) => hint.includes(word) || word.includes(hint))) || words.some((word) => RENTAL_ITEM_HINTS.some((hint) => hint.includes(word) || word.includes(hint))) || /\d/.test(segment);
  });
}

function parseItems(text, businessType = null) {
  const cleaned = stripCustomerPrefix(text);
  const segments = splitSegments(cleaned, businessType);
  const items = [];

  segments.forEach((segment, index) => {
    const normalizedSegment = normalizeText(segment).replace(/^और\s+/iu, '').trim();
    if (!normalizedSegment) {
      return;
    }

    const words = normalizedSegment.split(/\s+/).filter(Boolean);
    const hasItemHint = words.some((word) => ITEM_NAME_HINTS.some((hint) => hint.includes(word) || word.includes(hint)));
    const hasQuantity = words.some((word) => Object.prototype.hasOwnProperty.call(QUANTITY_WORDS, word)) || words.some((word) => /^\d+(?:\.\d+)?$/.test(word));
    const hasPrice = words.some((word) => /(?:₹|रुपये|rupees|price|रु)/iu.test(word)) || words.some((word) => /^\d+(?:\.\d+)?$/.test(word));
    if (!hasItemHint && !hasQuantity && !hasPrice) {
      return;
    }

    const quantity = hasItemHint || hasQuantity ? parseQuantity(words) : '1';
    const price = parsePrice(words);
    const inferredName = parseItemName(words);
    const unit = parseUnit(words, inferredName, businessType);
    const name = inferredName || (price ? `सामान ${index + 1}` : '');

    if (name) {
      const numericQuantity = Number(quantity || 1);
      const hasPrice = price !== '' && price !== null && price !== undefined;
      const numericPrice = hasPrice ? Number(price) : 0;
      const amount = hasPrice ? numericQuantity * numericPrice : null;
      items.push({
        id: index + 1,
        item: name,
        name,
        quantity,
        unit,
        unitPrice: hasPrice ? price : null,
        price: hasPrice ? price : null,
        amount,
        lineTotal: amount,
      });
    }
  });

  return items;
}

export function parseHindiTranscript(transcript = '', businessType = null) {
  const normalizedTranscript = normalizeText(transcript);
  const customerName = extractCustomerName(normalizedTranscript);
  const items = parseItems(normalizedTranscript, businessType);

  return { customerName, items };
}
