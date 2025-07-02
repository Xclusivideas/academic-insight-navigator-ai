import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Play } from 'lucide-react';
import { PresetPrompts } from './PresetPrompts';
import { AnalysisOutput } from './AnalysisOutput';
import { LoadingSpinner } from './LoadingSpinner';
import { LyzrApiService } from '@/services/lyzrApi';
import { AnalysisResult, StudentAtRisk } from '@/types';
import { toast } from 'sonner';

const DEFAULT_PROMPT = "Identify student drop-out risks, summarise key patterns, and recommend improvements to advising or program design.";

// Mock data for demonstration
const mockStudentsAtRisk: StudentAtRisk[] = [
  {
    id: "STU001",
    name: "Sarah Johnson",
    riskLevel: 'high',
    factors: ["Low GPA (2.1)", "Multiple course withdrawals", "Irregular attendance"],
    recommendations: ["Academic tutoring", "Counseling support", "Course load reduction"],
    gpa: 2.1,
    program: "Computer Science",
    year: 2
  },
  {
    id: "STU002",
    name: "Michael Chen",
    riskLevel: 'medium',
    factors: ["Declining grades", "Financial stress indicators"],
    recommendations: ["Financial aid consultation", "Study skills workshop"],
    gpa: 2.8,
    program: "Business Administration",
    year: 3
  },
  {
    id: "STU003",
    name: "Emma Rodriguez",
    riskLevel: 'low',
    factors: ["Course load adjustment needed"],
    recommendations: ["Academic advisor meeting"],
    gpa: 3.4,
    program: "Psychology",
    year: 1
  }
];

export const StudentRetentionDashboard = () => {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handlePromptSelect = async (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
    await runAnalysis(selectedPrompt);
  };

  const runAnalysis = async (analysisPrompt?: string) => {
    const currentPrompt = analysisPrompt || prompt;
    if (!currentPrompt.trim()) {
      toast.error('Please enter an analysis prompt');
      return;
    }

    setIsLoading(true);
    try {
      const response = await LyzrApiService.sendMessage(currentPrompt);
      
      // Process the API response into structured format
      const result: AnalysisResult = {
        summary: extractSummary(response.response),
        studentsAtRisk: currentPrompt.toLowerCase().includes('at-risk') || currentPrompt.toLowerCase().includes('students') 
          ? mockStudentsAtRisk 
          : undefined,
        recommendations: extractRecommendations(response.response),
        fullAnalysis: response.response,
      };

      setAnalysisResult(result);
      toast.success('Analysis completed successfully');
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error('Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const extractSummary = (response: string): string => {
    // Extract first paragraph or first 200 characters as summary
    const firstParagraph = response.split('\n\n')[0];
    return firstParagraph.length > 200 
      ? firstParagraph.substring(0, 200) + '...'
      : firstParagraph;
  };

  const extractRecommendations = (response: string): string[] => {
    // Look for bullet points or numbered lists in the response
    const lines = response.split('\n');
    const recommendations: string[] = [];
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.match(/^[•\-\*\d+\.]/)) {
        recommendations.push(trimmed.replace(/^[•\-\*\d+\.\s]+/, ''));
      }
    }
    
    // If no bullet points found, create generic recommendations
    if (recommendations.length === 0) {
      return [
        "Implement early warning system for at-risk students",
        "Enhance academic support services",
        "Improve student engagement programs",
        "Strengthen advisor-student relationships"
      ];
    }
    
    return recommendations.slice(0, 5); // Limit to 5 recommendations
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Student Retention Insights
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analysis Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Analysis Input */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Analysis Prompt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your analysis prompt here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] resize-none"
                  disabled={isLoading}
                />
                <Button
                  onClick={() => runAnalysis()}
                  disabled={isLoading || !prompt.trim()}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Run Analysis
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {isLoading && (
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <div className="text-center space-y-4">
                    <LoadingSpinner size="lg" />
                    <p className="text-muted-foreground">
                      Analyzing student data...
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {analysisResult && !isLoading && (
              <AnalysisOutput result={analysisResult} />
            )}
          </div>

          {/* Preset Prompts Sidebar */}
          <div className="lg:col-span-1">
            <PresetPrompts
              onPromptSelect={handlePromptSelect}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};