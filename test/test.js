/**
 * Test Suite for Aquaverse-MetaGalaxy
 */

import { BLEURealEngine } from '../src/BLEURealEngine.js';
import { BLEUMint } from '../src/BLEUMint.js';
import { DarkBleuChain } from '../src/DarkBleuChain.js';

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    testsPassed++;
  } else {
    console.error(`  ✗ ${message}`);
    testsFailed++;
  }
}

function testBLEURealEngine() {
  console.log('\n🕹 Testing BLEURealEngine...');
  console.log('═══════════════════════════════════════════════════════════');
  
  const engine = new BLEURealEngine();
  
  // Test terrain generation
  const { terrainId, terrain } = engine.generateTerrain('TestGlyph', 10);
  assert(terrainId.includes('terrain-'), 'Terrain ID should be generated');
  assert(terrain.size === 10, 'Terrain size should match requested size');
  assert(terrain.heightMap.length === 10, 'Height map should have correct dimensions');
  assert(terrain.glyphMap.length === 10, 'Glyph map should have correct dimensions');
  assert(terrain.energyNodes.length > 0, 'Energy nodes should be generated');
  assert(terrain.seed === 'TestGlyph', 'Seed should be stored');
  
  // Test voice coding
  const voiceMap = engine.voiceCodeMap('test voice command', terrainId);
  assert(voiceMap.command === 'test voice command', 'Voice command should be stored');
  assert(voiceMap.terrainId === terrainId, 'Terrain ID should be linked');
  assert(voiceMap.mappedGlyphs.length > 0, 'Voice should be mapped to glyphs');
  assert(voiceMap.whaleAnalysis !== undefined, 'Whale analysis should be performed');
  
  // Test glyph registration
  const testGlyph = engine.wordToGlyph('TestGlyph');
  engine.registerGlyph(testGlyph, { power: 100, type: 'water' });
  const voiceMap2 = engine.voiceCodeMap('TestGlyph', terrainId);
  const registeredGlyph = voiceMap2.mappedGlyphs.find(g => g.registered);
  assert(registeredGlyph !== undefined, 'Registered glyph should be detected');
  
  // Test whale insights
  const insights = engine.getWhaleInsights(terrainId);
  assert(insights.patterns !== undefined, 'Patterns should be detected');
  assert(insights.glyphSignificance !== undefined, 'Glyph significance should be analyzed');
  assert(insights.energyFlow !== undefined, 'Energy flow should be analyzed');
  assert(insights.whaleChant !== undefined, 'Whale chant should be generated');
  assert(insights.prophecy !== undefined, 'Prophecy should be generated');
  
  // Test error handling
  try {
    engine.voiceCodeMap('test', 'nonexistent-terrain');
    assert(false, 'Should throw error for nonexistent terrain');
  } catch (e) {
    assert(e.message === 'Terrain not found', 'Should throw correct error message');
  }
}

function testBLEUMint() {
  console.log('\n💬 Testing BLEUMint...');
  console.log('═══════════════════════════════════════════════════════════');
  
  const chain = new DarkBleuChain();
  const mint = new BLEUMint(chain);
  
  // Test voice minting
  const relic = mint.voiceMint('test scroll content', { creator: 'tester' });
  assert(relic.id.includes('relic-'), 'Relic ID should be generated');
  assert(relic.scroll === 'test scroll content', 'Scroll content should be stored');
  assert(relic.choirHarmony !== undefined, 'Choir harmony should be generated');
  assert(relic.prophecy !== undefined, 'Prophecy should be generated');
  assert(relic.metadata.creator === 'tester', 'Creator should be stored');
  assert(relic.verified === true, 'Relic should be verified on blockchain');
  assert(relic.blockId !== undefined, 'Block ID should be assigned');
  
  // Test whale choir mode
  const voices = ['voice one', 'voice two', 'voice three'];
  const collectiveRelic = mint.activateWhaleChoirMode(voices);
  assert(collectiveRelic.type === 'collective', 'Should be marked as collective');
  assert(collectiveRelic.scrolls.length === 3, 'Should have all voices');
  assert(collectiveRelic.metadata.voiceCount === 3, 'Voice count should be correct');
  assert(collectiveRelic.verified === true, 'Collective relic should be verified');
  
  // Test relic retrieval
  const retrievedRelic = mint.getRelic(relic.id);
  assert(retrievedRelic !== undefined, 'Relic should be retrievable');
  assert(retrievedRelic.id === relic.id, 'Retrieved relic should match');
  
  // Test scroll retrieval
  const scroll = mint.getScroll(relic.id);
  assert(scroll === 'test scroll content', 'Scroll should be retrievable');
  
  // Test stats
  const stats = mint.getStats();
  assert(stats.totalMints >= 2, 'Should have at least 2 mints');
  assert(stats.totalRelics >= 2, 'Should have at least 2 relics');
  assert(stats.collectiveMints >= 1, 'Should have at least 1 collective mint');
  
  // Test prophecy echo
  const prophecy = mint.echoProphecy('test prophecy scroll');
  assert(prophecy !== undefined, 'Prophecy should be generated');
  assert(prophecy.echoText !== undefined, 'Echo text should be generated');
  assert(prophecy.futureVision !== undefined, 'Future vision should be generated');
}

function testDarkBleuChain() {
  console.log('\n🔗 Testing DarkBleuChain...');
  console.log('═══════════════════════════════════════════════════════════');
  
  const chain = new DarkBleuChain();
  
  // Test genesis block
  assert(chain.getAllBlocks().length === 1, 'Should have genesis block');
  const genesis = chain.getAllBlocks()[0];
  assert(genesis.index === 0, 'Genesis block should have index 0');
  assert(genesis.previousHash === '0', 'Genesis block should have no previous hash');
  
  // Test relic recording
  const relic = { id: 'test-relic', data: 'test data' };
  const blockId = chain.recordRelic(relic);
  assert(blockId !== undefined, 'Block ID should be returned');
  assert(chain.getAllBlocks().length === 2, 'Chain should have 2 blocks');
  
  // Test memory recording
  const memoryBlock = chain.recordMemory({ content: 'test memory' });
  assert(memoryBlock !== undefined, 'Memory block should be created');
  assert(chain.getAllBlocks().length === 3, 'Chain should have 3 blocks');
  
  // Test prophecy recording
  const prophecyBlock = chain.recordProphecy({ content: 'test prophecy' });
  assert(prophecyBlock !== undefined, 'Prophecy block should be created');
  assert(chain.getAllBlocks().length === 4, 'Chain should have 4 blocks');
  
  // Test justice recording
  const justiceBlock = chain.recordJustice({ content: 'test justice' });
  assert(justiceBlock !== undefined, 'Justice block should be created');
  assert(chain.getAllBlocks().length === 5, 'Chain should have 5 blocks');
  
  // Test chain verification
  const isValid = chain.verifyChain();
  assert(isValid === true, 'Chain should be valid');
  
  // Test block retrieval
  const block = chain.getBlock(blockId);
  assert(block !== undefined, 'Block should be retrievable');
  assert(block.hash === blockId, 'Retrieved block should match');
  
  // Test blocks by type
  const relicBlocks = chain.getBlocksByType('relic');
  assert(relicBlocks.length >= 1, 'Should have at least 1 relic block');
  
  // Test stats
  const stats = chain.getStats();
  assert(stats.blockCount >= 5, 'Should have at least 5 blocks');
  assert(stats.verified === true, 'Chain should be verified');
  assert(stats.totalWeight > 0, 'Should have total weight');
  
  // Test blood verification
  const lastBlock = chain.getAllBlocks()[chain.getAllBlocks().length - 1];
  assert(lastBlock.bloodVerification !== undefined, 'Block should have blood verification');
  assert(lastBlock.bloodVerification.verified === true, 'Verification should be marked as verified');
  assert(lastBlock.bloodVerification.bloodType !== undefined, 'Should have blood type');
  assert(lastBlock.bloodVerification.potency > 0, 'Should have potency');
  
  // Test Atlantean timekeeper
  assert(lastBlock.atlanteanTimestamp !== undefined, 'Should have Atlantean timestamp');
  assert(lastBlock.atlanteanTimestamp.earthTime > 0, 'Should have Earth time');
  assert(lastBlock.atlanteanTimestamp.atlanteanTime !== undefined, 'Should have Atlantean time');
  assert(lastBlock.atlanteanTimestamp.cycle !== undefined, 'Should have cycle');
  assert(lastBlock.atlanteanTimestamp.epoch !== undefined, 'Should have epoch');
}

function testIntegration() {
  console.log('\n🌊 Testing Full Integration...');
  console.log('═══════════════════════════════════════════════════════════');
  
  // Initialize all components
  const chain = new DarkBleuChain();
  const engine = new BLEURealEngine();
  const mint = new BLEUMint(chain);
  
  // Create terrain
  const { terrainId, terrain } = engine.generateTerrain('IntegrationTest', 10);
  assert(terrainId !== undefined, 'Terrain should be created');
  
  // Voice-code the terrain
  const voiceMap = engine.voiceCodeMap('create harmony', terrainId);
  assert(voiceMap !== undefined, 'Voice map should be created');
  
  // Get insights
  const insights = engine.getWhaleInsights(terrainId);
  assert(insights.prophecy !== undefined, 'Insights should include prophecy');
  
  // Mint a relic based on the insights
  const relic = mint.voiceMint(insights.prophecy, { 
    creator: 'IntegrationTest',
    terrainId: terrainId 
  });
  assert(relic !== undefined, 'Relic should be minted');
  assert(relic.verified === true, 'Relic should be verified on chain');
  
  // Verify the blockchain contains the relic
  const block = chain.getBlock(relic.blockId);
  assert(block !== undefined, 'Block should exist');
  assert(block.transactions[0].data.id === relic.id, 'Block should contain the relic');
  
  // Create a collective relic with whale choir
  const choirVoices = [
    insights.whaleChant,
    insights.prophecy,
    voiceMap.whaleAnalysis.whaleWisdom
  ];
  const collectiveRelic = mint.activateWhaleChoirMode(choirVoices);
  assert(collectiveRelic !== undefined, 'Collective relic should be created');
  assert(collectiveRelic.verified === true, 'Collective relic should be verified');
  
  // Verify entire chain
  const isValid = chain.verifyChain();
  assert(isValid === true, 'Chain should remain valid after all operations');
  
  // Check final stats
  const engineTerrains = engine.getAllTerrains();
  const mintStats = mint.getStats();
  const chainStats = chain.getStats();
  
  assert(engineTerrains.length >= 1, 'Should have at least 1 terrain');
  assert(mintStats.totalRelics >= 2, 'Should have at least 2 relics');
  assert(chainStats.blockCount >= 3, 'Should have at least 3 blocks (genesis + 2 relics)');
}

// Run all tests
console.log('\n╔═══════════════════════════════════════════════════════════╗');
console.log('║          AQUAVERSE-METAGALAXY TEST SUITE                  ║');
console.log('╚═══════════════════════════════════════════════════════════╝');

try {
  testBLEURealEngine();
  testBLEUMint();
  testDarkBleuChain();
  testIntegration();
  
  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║                   TEST RESULTS                            ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log(`\n  ✓ Tests Passed: ${testsPassed}`);
  console.log(`  ✗ Tests Failed: ${testsFailed}`);
  console.log(`  Total Tests: ${testsPassed + testsFailed}\n`);
  
  if (testsFailed === 0) {
    console.log('  🎉 All tests passed! The Aquaverse is stable.\n');
    process.exit(0);
  } else {
    console.log('  ⚠️  Some tests failed. The Aquaverse needs adjustment.\n');
    process.exit(1);
  }
} catch (error) {
  console.error('\n  ❌ Fatal error during testing:', error);
  process.exit(1);
}
