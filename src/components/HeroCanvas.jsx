import { useEffect, useRef, useCallback } from 'react';

const WAVE_CONFIG = {
  color: "#fff",
  lineWidth: 3,
  numberOfWaves: 10,
  segmentLength: 90,
  amplitude: 25,
  // Ranges for random generation
  moveSpeed: { min: 0.3, max: 0.5 },
  bobAmount: { min: 3, max: 6 },
  bobSpeed: { min: 0.01, max: 0.02 },
};

// Helper to get random number between min and max
const random = (min, max) => Math.random() * (max - min) + min;

class Wave {
  constructor(yPosition) {
    this.y = yPosition;
    // Each wave gets its own random movement properties
    this.moveSpeed = random(WAVE_CONFIG.moveSpeed.min, WAVE_CONFIG.moveSpeed.max);
    this.bobAmount = random(WAVE_CONFIG.bobAmount.min, WAVE_CONFIG.bobAmount.max);
    this.bobSpeed = random(WAVE_CONFIG.bobSpeed.min, WAVE_CONFIG.bobSpeed.max);
    this.bobOffset = Math.random() * Math.PI * 2; // Random starting phase
  }

  draw(ctx, canvas, time) {
    ctx.beginPath();
    ctx.strokeStyle = WAVE_CONFIG.color;
    ctx.lineWidth = WAVE_CONFIG.lineWidth;

    // Calculate bobbing offset
    const bobY = Math.sin(time * this.bobSpeed + this.bobOffset) * this.bobAmount;
    const startY = this.y + bobY;

    const segments = Math.ceil(canvas.width / WAVE_CONFIG.segmentLength) + 2;
    
    // Start before visible area
    let startX = -WAVE_CONFIG.segmentLength;
    ctx.moveTo(startX, startY);
    
    // Draw wave segments
    for (let i = -1; i <= segments; i++) {
      const x = (i * WAVE_CONFIG.segmentLength) - (time * this.moveSpeed % WAVE_CONFIG.segmentLength);
      
      const valleyX = x;
      const valleyY = startY;
      
      const peakX = x + WAVE_CONFIG.segmentLength/2;
      const peakY = startY - WAVE_CONFIG.amplitude;
      
      ctx.quadraticCurveTo(
        valleyX + WAVE_CONFIG.segmentLength/4, valleyY,
        peakX, peakY
      );
      
      ctx.quadraticCurveTo(
        valleyX + WAVE_CONFIG.segmentLength * 3/4, valleyY,
        valleyX + WAVE_CONFIG.segmentLength, valleyY
      );
    }
    
    ctx.stroke();
  }
}

const HeroCanvas = () => {
  const canvasRef = useRef(null);
  const timeRef = useRef(0);
  const wavesRef = useRef([]);
  const animationFrameIdRef = useRef(null);
  const shipImageRef = useRef(null);  // New ref for the ship image
  const shipXRef = useRef(null);
  const shipWaveIndexRef = useRef(null);
  const startTimeRef = useRef(0);

  // Initialize ship image
  useEffect(() => {
    const shipImage = new Image();
    shipImage.src = '/white-ship.png';
    shipImage.onload = () => {
      shipImageRef.current = shipImage;
    };
  }, []);

  // Initialize waves
  const initWaves = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const waveSpacing = canvas.height / (WAVE_CONFIG.numberOfWaves - 1);
    wavesRef.current = Array.from({ length: WAVE_CONFIG.numberOfWaves }, 
      (_, i) => new Wave(i * waveSpacing));
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    
    initWaves();
  }, [initWaves]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    wavesRef.current.forEach(wave => {
      wave.draw(ctx, canvas, timeRef.current);
    });

    // Draw ship if image is loaded
    if (shipImageRef.current) {
      // Randomly select a wave when ship goes off screen
      if (!shipWaveIndexRef.current || shipXRef.current < -50) {
        shipWaveIndexRef.current = Math.floor(Math.random() * WAVE_CONFIG.numberOfWaves);
        shipXRef.current = canvas.width + 50; // Start from right side
        startTimeRef.current = timeRef.current; // Record start time for this wave
      }
      
      const currentWave = wavesRef.current[shipWaveIndexRef.current];
      
      // The ship should stay in place relative to the wave
      const timeOffset = timeRef.current - startTimeRef.current;
      const waveX = -(timeOffset * currentWave.moveSpeed);
      shipXRef.current = canvas.width + 50 + waveX;
      
      // Calculate y position based on wave
      // We only need the wave's natural bobbing motion - the ship should float on top
      const bobY = Math.sin(timeRef.current * currentWave.bobSpeed + currentWave.bobOffset) * currentWave.bobAmount;
      const waveY = currentWave.y + bobY;
      
      // Add very subtle rocking (±0.5 degrees)
      const rockingAngle = Math.sin(timeRef.current * 0.01) * (3 * Math.PI / 360);

      ctx.save();
      ctx.translate(shipXRef.current, waveY);
      ctx.rotate(rockingAngle);
      
      const shipWidth = 200;
      const shipHeight = shipWidth * (shipImageRef.current.height / shipImageRef.current.width);
      ctx.drawImage(
        shipImageRef.current,
        -shipWidth/2,
        -shipHeight,
        shipWidth,
        shipHeight
      );
      
      ctx.restore();
    }

    timeRef.current += 0.5;
    animationFrameIdRef.current = window.requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        window.cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [handleResize, animate]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default HeroCanvas;
