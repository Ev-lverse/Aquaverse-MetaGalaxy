/**
 * BLEUMint - Voice-minting dApp
 * Features: Say the scroll, mint the relic, whale choir mode, prophecy echo
 */

export class BLEUMint {
  constructor(darkBleuChain) {
    this.darkBleuChain = darkBleuChain;
    this.scrolls = new Map();
    this.relics = new Map();
    this.whaleChoir = new WhaleChoir();
    this.prophecyEcho = new ProphecyEcho();
    this.mintCount = 0;
  }

  /**
   * Voice-mint a relic by speaking the scroll
   * @param {string} voiceScroll - The spoken scroll content
   * @param {Object} metadata - Additional metadata for the relic
   * @returns {Object} Minted relic
   */
  voiceMint(voiceScroll, metadata = {}) {
    // Process voice scroll through whale choir
    const choirProcessed = this.whaleChoir.harmonize(voiceScroll);
    
    // Generate prophecy echo
    const prophecy = this.prophecyEcho.echo(voiceScroll, choirProcessed);

    // Create relic
    const relic = {
      id: this.generateRelicId(),
      scroll: voiceScroll,
      choirHarmony: choirProcessed,
      prophecy: prophecy,
      metadata: {
        ...metadata,
        mintedAt: Date.now(),
        mintedBy: metadata.creator || 'anonymous',
        resonance: choirProcessed.resonanceLevel
      },
      verified: false
    };

    // Store scroll and relic
    this.scrolls.set(relic.id, voiceScroll);

    // Record on blockchain (pass a copy to avoid modifying the blockchain data)
    if (this.darkBleuChain) {
      const relicCopy = JSON.parse(JSON.stringify(relic));
      const blockId = this.darkBleuChain.recordRelic(relicCopy);
      relic.blockId = blockId;
      relic.verified = true;
    }

    this.relics.set(relic.id, relic);
    this.mintCount++;
    return relic;
  }

  /**
   * Activate whale choir mode for collective voice minting
   * @param {Array<string>} voices - Multiple voices to harmonize
   * @returns {Object} Choir session data
   */
  activateWhaleChoirMode(voices) {
    const session = this.whaleChoir.createSession(voices);
    
    // Each voice in the choir contributes to the collective harmony
    const harmonizedScrolls = voices.map(voice => ({
      voice,
      harmony: this.whaleChoir.harmonize(voice),
      contribution: this.whaleChoir.analyzeContribution(voice, session)
    }));

    const collectiveRelic = {
      id: this.generateRelicId(),
      type: 'collective',
      scrolls: harmonizedScrolls,
      choirSession: session,
      prophecy: this.prophecyEcho.echoCollective(harmonizedScrolls),
      metadata: {
        mintedAt: Date.now(),
        voiceCount: voices.length,
        collectiveResonance: session.totalResonance
      }
    };

    // Record on blockchain (pass a copy to avoid modifying the blockchain data)
    if (this.darkBleuChain) {
      const relicCopy = JSON.parse(JSON.stringify(collectiveRelic));
      const blockId = this.darkBleuChain.recordRelic(relicCopy);
      collectiveRelic.blockId = blockId;
      collectiveRelic.verified = true;
    }

    this.relics.set(collectiveRelic.id, collectiveRelic);
    this.mintCount++;
    return collectiveRelic;
  }

  /**
   * Get relic by ID
   * @param {string} relicId - ID of the relic
   * @returns {Object} Relic data
   */
  getRelic(relicId) {
    return this.relics.get(relicId);
  }

  /**
   * Get all relics
   * @returns {Array} Array of all relics
   */
  getAllRelics() {
    return Array.from(this.relics.values());
  }

  /**
   * Get scroll by relic ID
   * @param {string} relicId - ID of the relic
   * @returns {string} Original scroll
   */
  getScroll(relicId) {
    return this.scrolls.get(relicId);
  }

  generateRelicId() {
    return `relic-${Date.now()}-${this.mintCount}`;
  }

  /**
   * Echo a prophecy for a given scroll
   * @param {string} scroll - The scroll to echo
   * @returns {Object} Prophecy echo
   */
  echoProphecy(scroll) {
    return this.prophecyEcho.echo(scroll);
  }

  /**
   * Get mint statistics
   * @returns {Object} Minting statistics
   */
  getStats() {
    return {
      totalMints: this.mintCount,
      totalRelics: this.relics.size,
      totalScrolls: this.scrolls.size,
      collectiveMints: Array.from(this.relics.values()).filter(r => r.type === 'collective').length
    };
  }
}

/**
 * Whale Choir - Harmonizes voices for collective minting
 */
class WhaleChoir {
  constructor() {
    this.sessions = new Map();
    this.harmonics = new Map();
  }

  harmonize(voice) {
    const analysis = this.analyzeVoice(voice);
    const harmony = {
      originalVoice: voice,
      frequency: analysis.frequency,
      amplitude: analysis.amplitude,
      resonanceLevel: analysis.resonanceLevel,
      harmonicPattern: this.generateHarmonicPattern(voice),
      timestamp: Date.now()
    };

    this.harmonics.set(voice, harmony);
    return harmony;
  }

  analyzeVoice(voice) {
    // Analyze voice characteristics
    const frequency = this.calculateFrequency(voice);
    const amplitude = voice.length;
    const resonanceLevel = this.calculateResonance(voice);

    return { frequency, amplitude, resonanceLevel };
  }

  calculateFrequency(voice) {
    // Calculate symbolic frequency based on character distribution
    const charCounts = {};
    for (const char of voice) {
      charCounts[char] = (charCounts[char] || 0) + 1;
    }
    const uniqueChars = Object.keys(charCounts).length;
    return (uniqueChars / voice.length) * 1000;
  }

  calculateResonance(voice) {
    // Calculate resonance based on voice power and pattern
    const vowels = (voice.match(/[aeiou]/gi) || []).length;
    const consonants = (voice.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length;
    return Math.sqrt(vowels * consonants) * 10;
  }

  generateHarmonicPattern(voice) {
    // Generate a harmonic pattern from the voice
    const words = voice.split(' ');
    return words.map(word => ({
      word,
      harmonic: word.length * this.calculateFrequency(word),
      tone: this.determineTone(word)
    }));
  }

  determineTone(word) {
    const vowelRatio = (word.match(/[aeiou]/gi) || []).length / word.length;
    if (vowelRatio > 0.5) return 'light';
    if (vowelRatio > 0.3) return 'balanced';
    return 'deep';
  }

  createSession(voices) {
    const sessionId = `choir-${Date.now()}`;
    const harmonies = voices.map(v => this.harmonize(v));
    
    const session = {
      id: sessionId,
      voices: voices.length,
      harmonies,
      totalResonance: harmonies.reduce((sum, h) => sum + h.resonanceLevel, 0),
      averageFrequency: harmonies.reduce((sum, h) => sum + h.frequency, 0) / harmonies.length,
      createdAt: Date.now()
    };

    this.sessions.set(sessionId, session);
    return session;
  }

  analyzeContribution(voice, session) {
    const harmony = this.harmonize(voice);
    return {
      voice,
      resonanceContribution: (harmony.resonanceLevel / session.totalResonance) * 100,
      frequencyAlignment: Math.abs(harmony.frequency - session.averageFrequency) / session.averageFrequency,
      significance: harmony.resonanceLevel > session.totalResonance / session.voices ? 'high' : 'normal'
    };
  }
}

/**
 * Prophecy Echo - Generates prophetic echoes from scrolls
 */
class ProphecyEcho {
  constructor() {
    this.prophecies = [];
    this.echoMemory = new Map();
  }

  echo(scroll, choirData = null) {
    const prophecy = {
      original: scroll,
      echoText: this.generateEchoText(scroll),
      futureVision: this.generateFutureVision(scroll),
      resonanceAmplification: choirData ? choirData.resonanceLevel : this.calculateBaseResonance(scroll),
      timestamp: Date.now(),
      echoStrength: this.calculateEchoStrength(scroll, choirData)
    };

    this.prophecies.push(prophecy);
    this.echoMemory.set(scroll, prophecy);

    return prophecy;
  }

  echoCollective(harmonizedScrolls) {
    const collectiveVision = harmonizedScrolls.map(hs => 
      this.generateFutureVision(hs.voice)
    ).join(' | ');

    const totalResonance = harmonizedScrolls.reduce(
      (sum, hs) => sum + hs.harmony.resonanceLevel, 0
    );

    return {
      type: 'collective',
      individualEchoes: harmonizedScrolls.map(hs => this.echo(hs.voice, hs.harmony)),
      collectiveVision,
      totalResonance,
      timestamp: Date.now(),
      power: totalResonance > 500 ? 'transcendent' : totalResonance > 200 ? 'powerful' : 'emerging'
    };
  }

  generateEchoText(scroll) {
    // Generate prophetic echo of the scroll
    const words = scroll.split(' ');
    const echoed = words.map(word => {
      if (word.length > 5) {
        return word + '...' + word.slice(-3);
      }
      return word;
    }).join(' ~ ');

    return `✧ ${echoed} ✧`;
  }

  generateFutureVision(scroll) {
    const visions = [
      'The scroll speaks of waters rising to reclaim ancient wisdom',
      'In the depths, echoes of this voice will shape new currents',
      'The resonance of this utterance ripples through time itself',
      'From these words, a new constellation of meaning emerges',
      'The deep remembers and amplifies this message forward',
      'This scroll carries the weight of transformation to come',
      'The whale song carries this truth across dimensional boundaries',
      'In the echo, future and past converge into a singular moment'
    ];

    const hash = scroll.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return visions[hash % visions.length];
  }

  calculateBaseResonance(scroll) {
    return Math.sqrt(scroll.length) * 10;
  }

  calculateEchoStrength(scroll, choirData) {
    const baseStrength = scroll.length * 2;
    const choirBonus = choirData ? choirData.resonanceLevel * 0.5 : 0;
    return baseStrength + choirBonus;
  }

  getAllProphecies() {
    return this.prophecies;
  }

  getProphecy(scroll) {
    return this.echoMemory.get(scroll);
  }
}
