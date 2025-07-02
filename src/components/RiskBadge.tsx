import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface RiskBadgeProps {
  level: 'high' | 'medium' | 'low';
}

export const RiskBadge = ({ level }: RiskBadgeProps) => {
  const config = {
    high: {
      icon: XCircle,
      label: 'HIGH RISK',
      variant: 'destructive' as const,
    },
    medium: {
      icon: AlertTriangle,
      label: 'MEDIUM RISK',
      variant: 'secondary' as const,
      className: 'bg-warning text-warning-foreground hover:bg-warning/80',
    },
    low: {
      icon: CheckCircle,
      label: 'LOW RISK',
      variant: 'secondary' as const,
      className: 'bg-success text-success-foreground hover:bg-success/80',
    },
  };

  const { icon: Icon, label, variant } = config[level];
  const className = 'className' in config[level] ? (config[level] as any).className : undefined;

  return (
    <Badge variant={variant} className={className}>
      <Icon className="mr-1 h-3 w-3" />
      {label}
    </Badge>
  );
};