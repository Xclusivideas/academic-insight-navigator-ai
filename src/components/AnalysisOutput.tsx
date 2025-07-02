import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RiskBadge } from './RiskBadge';
import { AnalysisResult } from '@/types';

interface AnalysisOutputProps {
  result: AnalysisResult;
}

export const AnalysisOutput = ({ result }: AnalysisOutputProps) => {
  return (
    <div className="space-y-6">
      {/* Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{result.summary}</p>
        </CardContent>
      </Card>

      {/* Students at Risk Table */}
      {result.studentsAtRisk && result.studentsAtRisk.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Students at Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Key Factors</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.studentsAtRisk.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.program}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>{student.gpa.toFixed(2)}</TableCell>
                    <TableCell>
                      <RiskBadge level={student.riskLevel} />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {student.factors.slice(0, 2).map((factor, index) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            • {factor}
                          </div>
                        ))}
                        {student.factors.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{student.factors.length - 2} more
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span className="text-foreground">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Full Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Full Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="prose prose-sm max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: result.fullAnalysis }}
          />
        </CardContent>
      </Card>
    </div>
  );
};