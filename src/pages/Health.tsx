import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { healthProfiles, clinicVisits } from '@/data/healthData';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Phone, Pill, AlertTriangle, Stethoscope } from 'lucide-react';

export default function Health() {
  const { user } = useAuth();
  const studentId = user?.studentId || user?.childrenIds?.[0] || 's1';
  const profile = healthProfiles.find(p => p.studentId === studentId) || healthProfiles[0];
  const visits = user?.role === 'teacher' ? clinicVisits : clinicVisits.filter(v => v.studentId === studentId);

  return (
    <Layout title="Health Records" subtitle="Medical profile, allergies & clinic history">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Health Profile</TabsTrigger>
          <TabsTrigger value="visits">Clinic Visits</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-destructive" />{profile.studentName}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div><p className="text-xs text-muted-foreground">Blood Group</p><Badge variant="outline" className="bg-destructive/10 text-destructive text-base">{profile.bloodGroup}</Badge></div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><AlertTriangle className="h-3 w-3" />Allergies</p>
                {profile.allergies.length ? profile.allergies.map(a => <Badge key={a} variant="outline" className="mr-1 bg-warning/10 text-warning">{a}</Badge>) : <p className="text-sm text-muted-foreground">None reported</p>}
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Conditions</p>
                {profile.conditions.length ? profile.conditions.map(c => <Badge key={c} variant="outline" className="mr-1">{c}</Badge>) : <p className="text-sm text-muted-foreground">None reported</p>}
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Pill className="h-3 w-3" />Medications</p>
                {profile.medications.length ? profile.medications.map(m => <p key={m} className="text-sm">{m}</p>) : <p className="text-sm text-muted-foreground">None</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Phone className="h-5 w-5 text-primary" />Emergency Contact</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div><p className="text-xs text-muted-foreground">Name</p><p className="font-medium">{profile.emergencyContact}</p></div>
              <div><p className="text-xs text-muted-foreground">Phone</p><p className="font-medium">{profile.emergencyPhone}</p></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visits" className="space-y-2">
          {visits.map(v => (
            <Card key={v.id}>
              <CardContent className="p-4 flex gap-3">
                <Stethoscope className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <p className="font-medium">{v.studentName}</p>
                    <span className="text-xs text-muted-foreground">{v.date}</span>
                  </div>
                  <p className="text-sm mt-1"><span className="font-medium">Reason:</span> {v.reason}</p>
                  <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Treatment:</span> {v.treatment}</p>
                  <p className="text-xs text-muted-foreground mt-1">Attended by {v.nurse}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
