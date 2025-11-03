/**
 * Basic Usage Example for Aquaverse-MetaGalaxy
 */

import { BLEURealEngine, BLEUMint, DarkBleuChain } from '../index.js';

console.log('🌊 Basic Usage Example - Aquaverse-MetaGalaxy\n');

// 1. Initialize the blockchain
console.log('Step 1: Initialize DarkBleuChain');
const darkBleuChain = new DarkBleuChain();
console.log('✓ Blockchain initialized with genesis block\n');

// 2. Create terrain with BLEURealEngine
console.log('Step 2: Generate Enochian Terrain');
const bleuRealEngine = new BLEURealEngine();
const { terrainId, terrain } = bleuRealEngine.generateTerrain('MyFirstTerrain', 20);
console.log(`✓ Terrain generated: ${terrainId}`);
console.log(`  Size: ${terrain.size}x${terrain.size}`);
console.log(`  Energy Nodes: ${terrain.energyNodes.length}\n`);

// 3. Voice-code the terrain
console.log('Step 3: Voice-Code the Terrain');
const voiceMap = bleuRealEngine.voiceCodeMap('explore discover wisdom', terrainId);
console.log(`✓ Voice command processed: "${voiceMap.command}"`);
console.log(`  Sentiment: ${voiceMap.whaleAnalysis.sentiment}`);
console.log(`  Whale Wisdom: "${voiceMap.whaleAnalysis.whaleWisdom}"\n`);

// 4. Get Whale AI insights
console.log('Step 4: Analyze Terrain with Whale AI');
const insights = bleuRealEngine.getWhaleInsights(terrainId);
console.log(`✓ Analysis complete`);
console.log(`  Patterns: ${insights.patterns.length}`);
console.log(`  Prophecy: "${insights.prophecy}"\n`);

// 5. Initialize BLEUMint
console.log('Step 5: Initialize BLEUMint');
const bleuMint = new BLEUMint(darkBleuChain);
console.log('✓ Voice-minting platform ready\n');

// 6. Mint a relic
console.log('Step 6: Voice-Mint a Relic');
const relic = bleuMint.voiceMint(
  'In the depths of the ocean, ancient wisdom awaits discovery',
  { creator: 'Explorer', category: 'wisdom' }
);
console.log(`✓ Relic minted: ${relic.id}`);
console.log(`  Verified: ${relic.verified ? 'Yes' : 'No'}`);
console.log(`  Resonance: ${relic.metadata.resonance.toFixed(2)}`);
console.log(`  Prophecy: "${relic.prophecy.futureVision}"\n`);

// 7. Verify blockchain
console.log('Step 7: Verify Blockchain Integrity');
const isValid = darkBleuChain.verifyChain();
console.log(`✓ Chain verified: ${isValid ? 'Valid' : 'Invalid'}`);
const stats = darkBleuChain.getStats();
console.log(`  Total blocks: ${stats.blockCount}`);
console.log(`  Total weight: ${stats.totalWeight.toFixed(2)}\n`);

console.log('✨ Basic usage example complete!\n');
