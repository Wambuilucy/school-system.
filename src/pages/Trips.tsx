import { Layout } from '@/components/layout/Layout';
import { schoolTrips } from '@/data/tripsData';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bus, MapPin, Calendar, DollarSign, Users, CheckCircle, AlertCircle } from 'lucide-react';

export default function Trips() {
  return (
    <Layout title="School Trips" subtitle="Educational excursions and field trips">
      <div className="space-y-6">
        {schoolTrips.map(trip => (
          <div key={trip.id} className="rounded-xl border border-border bg-card overflow-hidden">
            {/* Header */}
            <div className="gradient-primary p-5 text-primary-foreground">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Bus className="h-6 w-6" />
                  <div>
                    <h3 className="font-display text-lg font-bold">{trip.title}</h3>
                    <p className="text-primary-foreground/80 text-sm">{trip.description}</p>
                  </div>
                </div>
                <Badge variant={trip.status === 'open' ? 'default' : trip.status === 'full' ? 'destructive' : 'secondary'}
                  className="shrink-0">
                  {trip.status === 'open' ? 'Registration Open' : trip.status === 'full' ? 'Full' : 'Closed'}
                </Badge>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Info grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{trip.destination}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{new Date(trip.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} — {new Date(trip.returnDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-bold text-foreground">{trip.currency} {trip.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{trip.enrolled}/{trip.maxStudents} enrolled</span>
                </div>
              </div>

              <Progress value={(trip.enrolled / trip.maxStudents) * 100} className="h-2" />

              {/* Grades */}
              <div className="flex gap-2 flex-wrap">
                {trip.grades.map(g => <Badge key={g} variant="outline">{g}</Badge>)}
              </div>

              {/* Requirements & includes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-warning" /> Requirements
                  </p>
                  <ul className="space-y-1">
                    {trip.requirements.map((r, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-warning shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-success" /> What's Included
                  </p>
                  <ul className="space-y-1">
                    {trip.includes.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-success shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">Contact: {trip.contactPerson}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
