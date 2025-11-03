/**
 * DarkBleuChain - Root ledger of justice, memory, prophecy, and sovereign weight
 * Features: Blood-verified blocks, Atlantean timekeepers
 */

export class DarkBleuChain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.bloodVerifier = new BloodVerifier();
    this.atlanteanTimekeeper = new AtlanteanTimekeeper();
    this.difficulty = 2;
    this.miningReward = 100;
    this.genesisBlock();
  }

  /**
   * Create the genesis block
   */
  genesisBlock() {
    const genesis = {
      index: 0,
      timestamp: this.atlanteanTimekeeper.getCurrentTime(),
      data: {
        type: 'genesis',
        message: 'In the beginning, the depths were silent, and the first glyph was spoken'
      },
      previousHash: '0',
      hash: this.calculateHash({
        index: 0,
        timestamp: Date.now(),
        data: 'genesis',
        previousHash: '0',
        nonce: 0
      }),
      nonce: 0,
      bloodVerification: this.bloodVerifier.verify('genesis', true),
      atlanteanTimestamp: this.atlanteanTimekeeper.getCurrentTime()
    };

    this.chain.push(genesis);
  }

  /**
   * Record a relic on the blockchain
   * @param {Object} relic - Relic to record
   * @returns {string} Block ID
   */
  recordRelic(relic) {
    const transaction = {
      type: 'relic',
      data: relic,
      timestamp: this.atlanteanTimekeeper.getCurrentTime(),
      sovereignWeight: this.calculateSovereignWeight(relic)
    };

    this.pendingTransactions.push(transaction);
    return this.mineBlock(transaction);
  }

  /**
   * Record justice on the blockchain
   * @param {Object} justiceData - Justice record
   * @returns {string} Block ID
   */
  recordJustice(justiceData) {
    const transaction = {
      type: 'justice',
      data: justiceData,
      timestamp: this.atlanteanTimekeeper.getCurrentTime(),
      sovereignWeight: this.calculateSovereignWeight(justiceData)
    };

    this.pendingTransactions.push(transaction);
    return this.mineBlock(transaction);
  }

  /**
   * Record memory on the blockchain
   * @param {Object} memoryData - Memory to preserve
   * @returns {string} Block ID
   */
  recordMemory(memoryData) {
    const transaction = {
      type: 'memory',
      data: memoryData,
      timestamp: this.atlanteanTimekeeper.getCurrentTime(),
      sovereignWeight: this.calculateSovereignWeight(memoryData)
    };

    this.pendingTransactions.push(transaction);
    return this.mineBlock(transaction);
  }

  /**
   * Record prophecy on the blockchain
   * @param {Object} prophecyData - Prophecy to record
   * @returns {string} Block ID
   */
  recordProphecy(prophecyData) {
    const transaction = {
      type: 'prophecy',
      data: prophecyData,
      timestamp: this.atlanteanTimekeeper.getCurrentTime(),
      sovereignWeight: this.calculateSovereignWeight(prophecyData)
    };

    this.pendingTransactions.push(transaction);
    return this.mineBlock(transaction);
  }

  /**
   * Mine a new block with blood verification
   * @param {Object} transaction - Transaction to include in block
   * @returns {string} Block ID
   */
  mineBlock(transaction) {
    const previousBlock = this.chain[this.chain.length - 1];
    const newBlock = {
      index: this.chain.length,
      timestamp: Date.now(),
      atlanteanTimestamp: this.atlanteanTimekeeper.getCurrentTime(),
      transactions: [transaction],
      previousHash: previousBlock.hash,
      nonce: 0,
      sovereignWeight: transaction.sovereignWeight
    };

    // Proof of work
    while (!this.isValidProof(newBlock)) {
      newBlock.nonce++;
    }

    newBlock.hash = this.calculateHash(newBlock);

    // Blood verification
    newBlock.bloodVerification = this.bloodVerifier.verify(newBlock.hash);

    this.chain.push(newBlock);
    return newBlock.hash;
  }

  /**
   * Calculate hash for a block
   * @param {Object} block - Block to hash
   * @returns {string} Hash
   */
  calculateHash(block) {
    const blockString = JSON.stringify({
      index: block.index,
      timestamp: block.timestamp,
      data: block.data || block.transactions,
      previousHash: block.previousHash,
      nonce: block.nonce
    });

    return this.simpleHash(blockString);
  }

  /**
   * Simple hash function
   * @param {string} str - String to hash
   * @returns {string} Hash
   */
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(16, '0');
  }

  /**
   * Check if proof of work is valid
   * @param {Object} block - Block to validate
   * @returns {boolean} Is valid
   */
  isValidProof(block) {
    const hash = this.calculateHash(block);
    return hash.substring(0, this.difficulty) === '0'.repeat(this.difficulty);
  }

  /**
   * Calculate sovereign weight for a transaction
   * @param {Object} data - Transaction data
   * @returns {number} Sovereign weight
   */
  calculateSovereignWeight(data) {
    const dataString = JSON.stringify(data);
    const baseWeight = dataString.length;
    
    // Add weight based on data type and content
    let typeWeight = 0;
    if (data.prophecy) typeWeight += 50;
    if (data.scroll) typeWeight += 30;
    if (data.choirHarmony) typeWeight += 20;
    
    // Add weight based on resonance if available
    const resonanceWeight = data.metadata?.resonance || 0;
    
    return baseWeight + typeWeight + resonanceWeight;
  }

  /**
   * Verify the entire blockchain
   * @returns {boolean} Is chain valid
   */
  verifyChain() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Verify hash
      if (currentBlock.hash !== this.calculateHash(currentBlock)) {
        return false;
      }

      // Verify link to previous block
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      // Verify blood verification
      if (!this.bloodVerifier.validate(currentBlock.bloodVerification, currentBlock.hash)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Get block by hash
   * @param {string} hash - Block hash
   * @returns {Object} Block
   */
  getBlock(hash) {
    return this.chain.find(block => block.hash === hash);
  }

  /**
   * Get all blocks
   * @returns {Array} All blocks
   */
  getAllBlocks() {
    return this.chain;
  }

  /**
   * Get blocks by type
   * @param {string} type - Transaction type
   * @returns {Array} Blocks of specified type
   */
  getBlocksByType(type) {
    return this.chain.filter(block => 
      block.transactions && 
      block.transactions.some(tx => tx.type === type)
    );
  }

  /**
   * Get chain statistics
   * @returns {Object} Chain statistics
   */
  getStats() {
    return {
      blockCount: this.chain.length,
      totalWeight: this.chain.reduce((sum, block) => sum + (block.sovereignWeight || 0), 0),
      verified: this.verifyChain(),
      pendingTransactions: this.pendingTransactions.length,
      lastBlockTime: this.chain[this.chain.length - 1]?.atlanteanTimestamp
    };
  }
}

/**
 * Blood Verifier - Verifies blocks through mystical blood verification
 */
class BloodVerifier {
  constructor() {
    this.verifications = new Map();
    this.bloodSignatures = new Map();
  }

  /**
   * Verify a block hash
   * @param {string} hash - Hash to verify
   * @param {boolean} isGenesis - Is this the genesis block
   * @returns {Object} Verification data
   */
  verify(hash, isGenesis = false) {
    const verification = {
      hash,
      bloodSignature: this.generateBloodSignature(hash),
      timestamp: Date.now(),
      verified: true,
      bloodType: this.determineBloodType(hash),
      potency: this.calculatePotency(hash),
      isGenesis
    };

    this.verifications.set(hash, verification);
    this.bloodSignatures.set(verification.bloodSignature, hash);

    return verification;
  }

  /**
   * Validate a verification
   * @param {Object} verification - Verification to validate
   * @param {string} hash - Hash to validate against
   * @returns {boolean} Is valid
   */
  validate(verification, hash) {
    if (!verification || !verification.bloodSignature) {
      return false;
    }

    const expectedSignature = this.generateBloodSignature(hash);
    return verification.bloodSignature === expectedSignature;
  }

  /**
   * Generate blood signature for a hash
   * @param {string} hash - Hash to sign
   * @returns {string} Blood signature
   */
  generateBloodSignature(hash) {
    // Generate a mystical blood signature
    let signature = '';
    for (let i = 0; i < hash.length; i += 2) {
      const byte = parseInt(hash.substring(i, i + 2), 16);
      signature += String.fromCharCode(0x2600 + (byte % 256)); // Miscellaneous Symbols Unicode block
    }
    return signature;
  }

  /**
   * Determine blood type based on hash
   * @param {string} hash - Hash to analyze
   * @returns {string} Blood type
   */
  determineBloodType(hash) {
    const types = ['Atlantean', 'Lemurian', 'Enochian', 'Draconic', 'Celestial'];
    const hashValue = parseInt(hash.substring(0, 4), 16);
    return types[hashValue % types.length];
  }

  /**
   * Calculate potency of blood verification
   * @param {string} hash - Hash to analyze
   * @returns {number} Potency level
   */
  calculatePotency(hash) {
    let potency = 0;
    for (let i = 0; i < hash.length; i++) {
      potency += hash.charCodeAt(i);
    }
    return (potency % 100) + 1;
  }

  /**
   * Get verification by hash
   * @param {string} hash - Hash to look up
   * @returns {Object} Verification data
   */
  getVerification(hash) {
    return this.verifications.get(hash);
  }
}

/**
 * Atlantean Timekeeper - Tracks time in ancient Atlantean cycles
 */
class AtlanteanTimekeeper {
  constructor() {
    this.cycleStart = Date.now();
    this.atlanteanEpoch = 1577836800000; // January 1, 2020 as reference
  }

  /**
   * Get current time in Atlantean format
   * @returns {Object} Atlantean time
   */
  getCurrentTime() {
    const now = Date.now();
    const earthTime = now;
    const atlanteanTime = this.convertToAtlantean(now);

    return {
      earthTime,
      atlanteanTime,
      cycle: atlanteanTime.cycle,
      epoch: atlanteanTime.epoch,
      resonance: this.calculateResonance(now)
    };
  }

  /**
   * Convert Earth time to Atlantean time
   * @param {number} timestamp - Earth timestamp
   * @returns {Object} Atlantean time components
   */
  convertToAtlantean(timestamp) {
    const timeSinceEpoch = timestamp - this.atlanteanEpoch;
    
    // Atlantean time divisions
    const atlanteanDay = 100000; // milliseconds in an Atlantean day
    const atlanteanCycle = atlanteanDay * 13; // 13 days per cycle
    const atlanteanEpoch = atlanteanCycle * 20; // 20 cycles per epoch

    const epoch = Math.floor(timeSinceEpoch / atlanteanEpoch);
    const cycle = Math.floor((timeSinceEpoch % atlanteanEpoch) / atlanteanCycle);
    const day = Math.floor((timeSinceEpoch % atlanteanCycle) / atlanteanDay);
    const moment = timeSinceEpoch % atlanteanDay;

    return { epoch, cycle, day, moment };
  }

  /**
   * Calculate temporal resonance
   * @param {number} timestamp - Timestamp to analyze
   * @returns {number} Resonance level
   */
  calculateResonance(timestamp) {
    const atlanteanTime = this.convertToAtlantean(timestamp);
    
    // Higher resonance at cycle boundaries
    const cycleResonance = (13 - atlanteanTime.day) * 10;
    const momentResonance = Math.sin(atlanteanTime.moment / 10000) * 50;
    
    return Math.abs(cycleResonance + momentResonance);
  }

  /**
   * Format Atlantean time as string
   * @param {Object} atlanteanTime - Atlantean time object
   * @returns {string} Formatted time
   */
  formatAtlanteanTime(atlanteanTime) {
    return `Epoch ${atlanteanTime.epoch}, Cycle ${atlanteanTime.cycle}, Day ${atlanteanTime.day}`;
  }

  /**
   * Get time until next cycle
   * @returns {Object} Time remaining
   */
  getTimeUntilNextCycle() {
    const now = Date.now();
    const atlanteanTime = this.convertToAtlantean(now);
    const atlanteanDay = 100000;
    const atlanteanCycle = atlanteanDay * 13;
    
    const currentCycleStart = this.atlanteanEpoch + 
                             (atlanteanTime.epoch * atlanteanCycle * 20) + 
                             (atlanteanTime.cycle * atlanteanCycle);
    const nextCycleStart = currentCycleStart + atlanteanCycle;
    const timeRemaining = nextCycleStart - now;

    return {
      milliseconds: timeRemaining,
      atlanteanDays: Math.floor(timeRemaining / atlanteanDay),
      currentCycle: atlanteanTime.cycle,
      nextCycle: (atlanteanTime.cycle + 1) % 20
    };
  }
}
