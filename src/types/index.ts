export interface LyzrApiRequest {
  message: string;
  user_id: string;
  agent_id: string;
  session_id: string;
}

export interface LyzrApiResponse {
  response: string;
  session_id: string;
  status: string;
}

export interface StudentAtRisk {
  id: string;
  name: string;
  riskLevel: 'high' | 'medium' | 'low';
  factors: string[];
  recommendations: string[];
  gpa: number;
  program: string;
  year: number;
}

export interface AnalysisResult {
  summary: string;
  studentsAtRisk?: StudentAtRisk[];
  recommendations: string[];
  fullAnalysis: string;
}

export interface PresetPrompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  icon: string;
}