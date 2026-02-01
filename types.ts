
export interface DiseaseDetection {
  diseaseName: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  explanation: string;
  treatmentSteps: string[];
  nextSteps: string[]; // For compatibility with display components
  estimatedCostINR: number;
  preventiveMeasures: string[];
}
