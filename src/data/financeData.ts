export interface FeeItem {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
}

export interface StudentFinance {
  studentId: string;
  totalFees: number;
  totalPaid: number;
  balance: number;
  fees: FeeItem[];
}

export const studentFinances: Record<string, StudentFinance> = {
  s1: {
    studentId: 's1', totalFees: 12000, totalPaid: 9500, balance: 2500,
    fees: [
      { id: 'f1', description: 'Tuition - Term 1', amount: 3000, dueDate: '2025-01-15', status: 'paid', paidDate: '2025-01-10' },
      { id: 'f2', description: 'Tuition - Term 2', amount: 3000, dueDate: '2025-04-15', status: 'paid', paidDate: '2025-04-12' },
      { id: 'f3', description: 'Tuition - Term 3', amount: 3000, dueDate: '2025-07-15', status: 'paid', paidDate: '2025-07-20' },
      { id: 'f4', description: 'Tuition - Term 4', amount: 3000, dueDate: '2025-10-15', status: 'pending' },
      { id: 'f5', description: 'Lab Fee', amount: 500, dueDate: '2025-02-01', status: 'paid', paidDate: '2025-01-28' },
      { id: 'f6', description: 'Sports Fee', amount: 250, dueDate: '2025-03-01', status: 'overdue' },
      { id: 'f7', description: 'Library Fee', amount: 250, dueDate: '2025-02-15', status: 'paid', paidDate: '2025-02-10' },
    ],
  },
  s2: {
    studentId: 's2', totalFees: 12000, totalPaid: 6000, balance: 6000,
    fees: [
      { id: 'f8', description: 'Tuition - Term 1', amount: 3000, dueDate: '2025-01-15', status: 'paid', paidDate: '2025-01-14' },
      { id: 'f9', description: 'Tuition - Term 2', amount: 3000, dueDate: '2025-04-15', status: 'paid', paidDate: '2025-04-15' },
      { id: 'f10', description: 'Tuition - Term 3', amount: 3000, dueDate: '2025-07-15', status: 'overdue' },
      { id: 'f11', description: 'Tuition - Term 4', amount: 3000, dueDate: '2025-10-15', status: 'pending' },
    ],
  },
  s3: {
    studentId: 's3', totalFees: 11000, totalPaid: 11000, balance: 0,
    fees: [
      { id: 'f12', description: 'Tuition - Term 1', amount: 2750, dueDate: '2025-01-15', status: 'paid', paidDate: '2025-01-05' },
      { id: 'f13', description: 'Tuition - Term 2', amount: 2750, dueDate: '2025-04-15', status: 'paid', paidDate: '2025-04-01' },
      { id: 'f14', description: 'Tuition - Term 3', amount: 2750, dueDate: '2025-07-15', status: 'paid', paidDate: '2025-07-10' },
      { id: 'f15', description: 'Tuition - Term 4', amount: 2750, dueDate: '2025-10-15', status: 'paid', paidDate: '2025-10-01' },
    ],
  },
  s4: {
    studentId: 's4', totalFees: 12000, totalPaid: 3000, balance: 9000,
    fees: [
      { id: 'f16', description: 'Tuition - Term 1', amount: 3000, dueDate: '2025-01-15', status: 'paid', paidDate: '2025-02-20' },
      { id: 'f17', description: 'Tuition - Term 2', amount: 3000, dueDate: '2025-04-15', status: 'overdue' },
      { id: 'f18', description: 'Tuition - Term 3', amount: 3000, dueDate: '2025-07-15', status: 'overdue' },
      { id: 'f19', description: 'Tuition - Term 4', amount: 3000, dueDate: '2025-10-15', status: 'pending' },
    ],
  },
  s5: {
    studentId: 's5', totalFees: 13000, totalPaid: 13000, balance: 0,
    fees: [
      { id: 'f20', description: 'Tuition - Full Year', amount: 11000, dueDate: '2025-01-15', status: 'paid', paidDate: '2025-01-02' },
      { id: 'f21', description: 'Lab Fee', amount: 1000, dueDate: '2025-02-01', status: 'paid', paidDate: '2025-01-02' },
      { id: 'f22', description: 'Sports & Activities', amount: 1000, dueDate: '2025-02-01', status: 'paid', paidDate: '2025-01-02' },
    ],
  },
};

// Generate for remaining students
['s6','s7','s8'].forEach(id => {
  if (!studentFinances[id]) {
    const paid = 3000 * (1 + Math.floor(Math.random()*3));
    studentFinances[id] = {
      studentId: id, totalFees: 12000, totalPaid: paid, balance: 12000 - paid,
      fees: [
        { id: `${id}-f1`, description: 'Tuition - Term 1', amount: 3000, dueDate: '2025-01-15', status: 'paid', paidDate: '2025-01-12' },
        { id: `${id}-f2`, description: 'Tuition - Term 2', amount: 3000, dueDate: '2025-04-15', status: paid >= 6000 ? 'paid' : 'overdue' },
        { id: `${id}-f3`, description: 'Tuition - Term 3', amount: 3000, dueDate: '2025-07-15', status: paid >= 9000 ? 'paid' : 'pending' },
        { id: `${id}-f4`, description: 'Tuition - Term 4', amount: 3000, dueDate: '2025-10-15', status: 'pending' },
      ],
    };
  }
});
