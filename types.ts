
export interface AnalysisResult {
  score: number;
  verdict: string;
  summary: string;
  positiveSigns: string[];
  negativeSigns: string[];
}
