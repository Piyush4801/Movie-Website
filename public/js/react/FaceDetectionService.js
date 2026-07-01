import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

let faceLandmarker = null;

export const initializeFaceLandmarker = async () => {
  if (faceLandmarker) return faceLandmarker;

  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
    );

    faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        delegate: "GPU"
      },
      outputFaceBlendshapes: true,
      runningMode: "VIDEO",
      numFaces: 1
    });

    return faceLandmarker;
  } catch (error) {
    console.error("Failed to initialize Face Landmarker:", error);
    return null;
  }
};

const blendshapeToMood = (blendshapes) => {
  // Map blendshapes into a dictionary for easy access
  const shapes = {};
  blendshapes.forEach(b => {
    shapes[b.categoryName] = b.score;
  });

  const moods = {
    Happy: (shapes['mouthSmileLeft'] + shapes['mouthSmileRight']) / 2,
    Sad: (shapes['mouthFrownLeft'] + shapes['mouthFrownRight'] + shapes['browInnerUp']) / 3,
    Surprised: (shapes['jawOpen'] + shapes['eyeWideLeft'] + shapes['eyeWideRight']) / 3,
    Angry: (shapes['browDownLeft'] + shapes['browDownRight'] + (shapes['mouthPressLeft'] || 0)) / 3,
    Fear: (shapes['eyeWideLeft'] + shapes['eyeWideRight'] + shapes['mouthFunnel']) / 3,
    Tired: (shapes['eyeBlinkLeft'] + shapes['eyeBlinkRight']) / 2,
  };

  let maxMood = 'Neutral';
  let maxScore = 0;

  for (const [mood, score] of Object.entries(moods)) {
    if (score > maxScore) {
      maxScore = score;
      maxMood = mood;
    }
  }

  // Threshold to detect neutral
  if (maxScore < 0.2) {
    maxMood = 'Neutral';
    maxScore = 1.0 - maxScore; // Inverse for neutral confidence
  }

  // Cap confidence at 99
  const confidence = Math.min(Math.round((maxScore * 100) * 1.5), 99);

  return {
    mood: maxMood,
    confidence: confidence > 100 ? 99 : Math.max(confidence, 60) // Normalize somewhat
  };
};

export const detectMoodFromVideo = async (videoElement) => {
  if (!videoElement) return null;

  const landmarker = await initializeFaceLandmarker();
  if (!landmarker) return null;

  const startTimeMs = performance.now();
  const results = landmarker.detectForVideo(videoElement, startTimeMs);

  if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
    return blendshapeToMood(results.faceBlendshapes[0].categories);
  }

  return { mood: 'Neutral', confidence: 85 };
};
