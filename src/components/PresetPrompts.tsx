import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, TrendingDown, GraduationCap, BookOpen, Calendar } from 'lucide-react';
import { PresetPrompt } from '@/types';

interface PresetPromptsProps {
  onPromptSelect: (prompt: string) => void;
  isLoading: boolean;
}

const presetPrompts: PresetPrompt[] = [
  {
    id: 'at-risk',
    title: 'Top At-Risk Students',
    description: 'Show top 10 students at risk of dropping out',
    prompt: 'Identify the top 10 students who are most at risk of dropping out. For each student, provide their risk level, key contributing factors, and specific recommendations for intervention.',
    icon: 'Users',
  },
  {
    id: 'withdrawal-patterns',
    title: 'Withdrawal Patterns',
    description: 'Common patterns in student withdrawal',
    prompt: 'What are the common patterns in student withdrawal? Analyze trends across different demographics, programs, and time periods to identify key indicators.',
    icon: 'TrendingDown',
  },
  {
    id: 'program-risk',
    title: 'Program Risk Analysis',
    description: 'Programs with highest drop-out risk',
    prompt: 'Which programs show the most risk of drop-out or failure? Provide a detailed analysis of program-specific retention challenges and recommendations.',
    icon: 'GraduationCap',
  },
  {
    id: 'advising-recommendations',
    title: 'Advising Recommendations',
    description: 'Improve student outcomes through advising',
    prompt: 'Suggest changes to the advising model to improve student outcomes. Focus on early intervention strategies and support mechanisms.',
    icon: 'BookOpen',
  },
  {
    id: 'enrollment-patterns',
    title: 'Enrollment Patterns',
    description: 'Patterns that predict course failure',
    prompt: 'Are there enrollment or registration patterns that predict course failure? Analyze course selection, timing, and load patterns.',
    icon: 'Calendar',
  },
];

const iconMap = {
  Users,
  TrendingDown,
  GraduationCap,
  BookOpen,
  Calendar,
};

export const PresetPrompts = ({ onPromptSelect, isLoading }: PresetPromptsProps) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Quick Analysis Presets</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {presetPrompts.map((preset) => {
          const Icon = iconMap[preset.icon as keyof typeof iconMap];
          return (
            <Button
              key={preset.id}
              variant="outline"
              className="w-full h-auto p-4 flex flex-col items-start text-left hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => onPromptSelect(preset.prompt)}
              disabled={isLoading}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-primary" />
                <span className="font-medium">{preset.title}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {preset.description}
              </span>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};