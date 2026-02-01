
export interface DiseaseDetection {
  diseaseName: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  explanation: string;
  treatmentSteps: string[];
  nextSteps: string[]; // For compatibility with display components
  estimatedCostINR: number;
  preventiveMeasures: string[];
  suggestedProducts: {
    name: string;
    composition: string;
  }[];
}

export interface PestWeedIdentification {
  name: string;
  type: 'Pest' | 'Weed';
  confidence: number;
  threatLevel: 'Low' | 'Medium' | 'High' | 'Beneficial';
  description: string;
  controlMethods: {
    type: 'Chemical' | 'Organic' | 'Biological' | 'Mechanical';
    description: string;
  }[];
  suggestedProducts: {
    name: string;
    composition: string;
  }[];
}