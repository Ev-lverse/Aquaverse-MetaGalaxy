/**
 * Aquaverse-MetaGalaxy
 * Main entry point for the sovereign metaverse ecosystem
 */

import { BLEURealEngine } from './src/BLEURealEngine.js';
import { BLEUMint } from './src/BLEUMint.js';
import { DarkBleuChain } from './src/DarkBleuChain.js';

export { BLEURealEngine, BLEUMint, DarkBleuChain };

/**
 * Initialize the complete Aquaverse-MetaGalaxy ecosystem
 * @returns {Object} Initialized ecosystem components
 */
export function initializeAquaverse() {
  console.log('🌊 Initializing Aquaverse-MetaGalaxy...\n');

  // Initialize DarkBleuChain - The root ledger
  console.log('🔗 Initializing DarkBleuChain...');
  const darkBleuChain = new DarkBleuChain();
  console.log('✓ DarkBleuChain initialized with genesis block\n');

  // Initialize BLEURealEngine - The terrain engine
  console.log('🕹 Initializing BLEURealEngine...');
  const bleuRealEngine = new BLEURealEngine();
  console.log('✓ BLEURealEngine ready with Enochian terrain generation and Whale AI\n');

  // Initialize BLEUMint - The voice-minting dApp
  console.log('💬 Initializing BLEUMint...');
  const bleuMint = new BLEUMint(darkBleuChain);
  console.log('✓ BLEUMint ready for voice-minting with Whale Choir mode\n');

  console.log('✨ Aquaverse-MetaGalaxy fully initialized!\n');

  return {
    darkBleuChain,
    bleuRealEngine,
    bleuMint
  };
}

/**
 * Run a demonstration of the ecosystem
 */
export async function runDemo() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('   AQUAVERSE-METAGALAXY DEMONSTRATION');
  console.log('═══════════════════════════════════════════════════════════\n');

  const { darkBleuChain, bleuRealEngine, bleuMint } = initializeAquaverse();

  // Demo 1: Generate Terrain
  console.log('📍 DEMO 1: Enochian Terrain Generation');
  console.log('───────────────────────────────────────');
  const { terrainId, terrain } = bleuRealEngine.generateTerrain('Atlantis', 10);
  console.log(`Terrain ID: ${terrainId}`);
  console.log(`Terrain Size: ${terrain.size}x${terrain.size}`);
  console.log(`Energy Nodes: ${terrain.energyNodes.length}`);
  console.log(`Sample Height: ${terrain.heightMap[0][0].toFixed(2)}\n`);

  // Demo 2: Voice-Code the Terrain
  console.log('🗣️  DEMO 2: Voice-Coded Mapping');
  console.log('───────────────────────────────────────');
  const voiceMap = bleuRealEngine.voiceCodeMap('create harmony rise light', terrainId);
  console.log(`Voice Command: "${voiceMap.command}"`);
  console.log(`Whale Analysis - Sentiment: ${voiceMap.whaleAnalysis.sentiment}`);
  console.log(`Whale Analysis - Intention: ${voiceMap.whaleAnalysis.intention}`);
  console.log(`Whale Wisdom: "${voiceMap.whaleAnalysis.whaleWisdom}"\n`);

  // Demo 3: Get Whale Insights
  console.log('🐋 DEMO 3: Whale AI Deep Analysis');
  console.log('───────────────────────────────────────');
  const insights = bleuRealEngine.getWhaleInsights(terrainId);
  console.log(`Patterns Detected: ${insights.patterns.length}`);
  console.log(`Glyph Significance: ${insights.glyphSignificance.length} unique glyphs`);
  console.log(`Energy Flow: ${insights.energyFlow.flow}`);
  console.log(`Whale Chant: "${insights.whaleChant}"`);
  console.log(`Prophecy: "${insights.prophecy}"\n`);

  // Demo 4: Voice-Mint a Relic
  console.log('💎 DEMO 4: Voice-Minting a Relic');
  console.log('───────────────────────────────────────');
  const relic = bleuMint.voiceMint(
    'From the depths emerges wisdom, through the waves flows power',
    { creator: 'Atlantean_Sage' }
  );
  console.log(`Relic ID: ${relic.id}`);
  console.log(`Prophecy: "${relic.prophecy.futureVision}"`);
  console.log(`Resonance Level: ${relic.metadata.resonance.toFixed(2)}`);
  console.log(`Verified: ${relic.verified ? '✓' : '✗'}`);
  console.log(`Block ID: ${relic.blockId}\n`);

  // Demo 5: Whale Choir Mode
  console.log('🎵 DEMO 5: Whale Choir Mode (Collective Minting)');
  console.log('───────────────────────────────────────');
  const choirVoices = [
    'harmony resonates through the deep',
    'ancient wisdom flows eternal',
    'the chorus unites all frequencies'
  ];
  const collectiveRelic = bleuMint.activateWhaleChoirMode(choirVoices);
  console.log(`Collective Relic ID: ${collectiveRelic.id}`);
  console.log(`Voice Count: ${collectiveRelic.metadata.voiceCount}`);
  console.log(`Collective Resonance: ${collectiveRelic.metadata.collectiveResonance.toFixed(2)}`);
  console.log(`Prophecy Power: ${collectiveRelic.prophecy.power}`);
  console.log(`Verified: ${collectiveRelic.verified ? '✓' : '✗'}\n`);

  // Demo 6: DarkBleuChain Status
  console.log('⛓️  DEMO 6: DarkBleuChain Ledger Status');
  console.log('───────────────────────────────────────');
  const chainStats = darkBleuChain.getStats();
  console.log(`Total Blocks: ${chainStats.blockCount}`);
  console.log(`Total Sovereign Weight: ${chainStats.totalWeight.toFixed(2)}`);
  console.log(`Chain Verified: ${chainStats.verified ? '✓' : '✗'}`);
  console.log(`Last Block Time: Epoch ${chainStats.lastBlockTime.atlanteanTime.epoch}, Cycle ${chainStats.lastBlockTime.atlanteanTime.cycle}\n`);

  // Demo 7: Record Memory and Prophecy
  console.log('📜 DEMO 7: Recording Memory & Prophecy');
  console.log('───────────────────────────────────────');
  const memoryBlock = darkBleuChain.recordMemory({
    content: 'The first terrain was mapped when the stars aligned',
    significance: 'founding event'
  });
  const prophecyBlock = darkBleuChain.recordProphecy({
    content: 'When three cycles align, the gateway shall open',
    seer: 'Atlantean Oracle'
  });
  console.log(`Memory Block: ${memoryBlock}`);
  console.log(`Prophecy Block: ${prophecyBlock}\n`);

  // Final Stats
  console.log('═══════════════════════════════════════════════════════════');
  console.log('   ECOSYSTEM SUMMARY');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`Terrains Generated: ${bleuRealEngine.getAllTerrains().length}`);
  console.log(`Relics Minted: ${bleuMint.getStats().totalRelics}`);
  console.log(`Blockchain Blocks: ${darkBleuChain.getAllBlocks().length}`);
  console.log(`Chain Integrity: ${darkBleuChain.verifyChain() ? '✓ VERIFIED' : '✗ COMPROMISED'}`);
  console.log('═══════════════════════════════════════════════════════════\n');
  console.log('✨ Demo complete! The Aquaverse-MetaGalaxy awaits...\n');
}

// Run demo if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  runDemo().catch(console.error);
}
