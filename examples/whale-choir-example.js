/**
 * Whale Choir Mode Example - Collective Voice-Minting
 */

import { BLEUMint, DarkBleuChain } from '../index.js';

console.log('🎵 Whale Choir Mode Example\n');

// Initialize
const darkBleuChain = new DarkBleuChain();
const bleuMint = new BLEUMint(darkBleuChain);

// Create a choir of voices
console.log('Creating a Whale Choir with multiple voices...\n');

const choirVoices = [
  'harmony flows through the eternal currents',
  'wisdom echoes in the chambers of the deep',
  'resonance builds between ancient pillars',
  'the chorus speaks as one voice',
  'depths unite in symphonic purpose'
];

console.log('Choir Voices:');
choirVoices.forEach((voice, i) => {
  console.log(`  ${i + 1}. "${voice}"`);
});

// Activate Whale Choir Mode
console.log('\nActivating Whale Choir Mode...');
const collectiveRelic = bleuMint.activateWhaleChoirMode(choirVoices);

console.log('\n✨ Collective Relic Created!');
console.log('─────────────────────────────');
console.log(`Relic ID: ${collectiveRelic.id}`);
console.log(`Type: ${collectiveRelic.type}`);
console.log(`Voice Count: ${collectiveRelic.metadata.voiceCount}`);
console.log(`Collective Resonance: ${collectiveRelic.metadata.collectiveResonance.toFixed(2)}`);
console.log(`Prophecy Power: ${collectiveRelic.prophecy.power}`);
console.log(`Verified on Chain: ${collectiveRelic.verified ? '✓' : '✗'}`);

console.log('\nIndividual Voice Contributions:');
collectiveRelic.scrolls.forEach((scroll, i) => {
  console.log(`\n  Voice ${i + 1}:`);
  console.log(`    Resonance: ${scroll.harmony.resonanceLevel.toFixed(2)}`);
  console.log(`    Frequency: ${scroll.harmony.frequency.toFixed(2)}`);
  console.log(`    Contribution: ${scroll.contribution.resonanceContribution.toFixed(2)}%`);
  console.log(`    Significance: ${scroll.contribution.significance}`);
});

console.log('\nCollective Prophecy:');
console.log(`  "${collectiveRelic.prophecy.collectiveVision}"`);

console.log('\n🌊 The choir has spoken! The collective resonance is recorded on the DarkBleuChain.\n');
