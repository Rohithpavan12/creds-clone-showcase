// Simulated database service for Fundineed
// This simulates a backend database using IndexedDB for persistent storage across users
import { Application } from './dataService';

class FundineedDatabase {
  private dbName = 'fundineed_db';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create applications store
        if (!db.objectStoreNames.contains('applications')) {
          const applicationsStore = db.createObjectStore('applications', { keyPath: 'id' });
          applicationsStore.createIndex('email', 'email', { unique: false });
          applicationsStore.createIndex('type', 'type', { unique: false });
          applicationsStore.createIndex('status', 'status', { unique: false });
          applicationsStore.createIndex('date', 'date', { unique: false });
        }

        // Create users store
        if (!db.objectStoreNames.contains('users')) {
          const usersStore = db.createObjectStore('users', { keyPath: 'id' });
          usersStore.createIndex('email', 'email', { unique: true });
        }

        // Create analytics store
        if (!db.objectStoreNames.contains('analytics')) {
          const analyticsStore = db.createObjectStore('analytics', { keyPath: 'id' });
        }
      };
    });
  }

  async addApplication(application: Application): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['applications'], 'readwrite');
      const store = transaction.objectStore('applications');
      const request = store.add(application);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getAllApplications(): Promise<Application[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['applications'], 'readonly');
      const store = transaction.objectStore('applications');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  async updateApplication(application: Application): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['applications'], 'readwrite');
      const store = transaction.objectStore('applications');
      const request = store.put(application);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async deleteApplication(id: string): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['applications'], 'readwrite');
      const store = transaction.objectStore('applications');
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getApplicationsByStatus(status: string): Promise<Application[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['applications'], 'readonly');
      const store = transaction.objectStore('applications');
      const index = store.index('status');
      const request = index.getAll(status);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  // Add some demo data for testing
  async seedDemoData(): Promise<void> {
    const demoApplications: Application[] = [
      {
        id: 'APP-001',
        name: 'Rahul Sharma',
        email: 'rahul.sharma@email.com',
        phone: '+91 9876543210',
        type: 'Education Loan',
        amount: 500000,
        status: 'pending',
        date: '2024-01-15',
        timestamp: new Date('2024-01-15').toISOString(),
        documents: [
          {
            type: 'passport',
            name: 'passport_rahul.pdf',
            size: 245760,
            base64: 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSA5IFRmCjEwIDcwIFRkCihTYW1wbGUgUGFzc3BvcnQgRG9jdW1lbnQpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAwNTggMDAwMDAgbiAKMDAwMDAwMDExNSAwMDAwMCBuIAowMDAwMDAwMjQ1IDAwMDAwIG4gCjAwMDAwMDAzMTMgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo0MDcKJSVFT0Y=',
            fileType: 'application/pdf',
            uploadedAt: new Date('2024-01-15').toISOString()
          }
        ],
        formData: {
          firstName: 'Rahul',
          lastName: 'Sharma',
          email: 'rahul.sharma@email.com',
          phone: '+91 9876543210',
          dateOfBirth: '1995-05-15',
          aadhar: '1234-5678-9012',
          pan: 'ABCDE1234F',
          course: 'Computer Science Engineering',
          institution: 'IIT Delhi',
          courseYear: '4',
          loanAmount: '5-10 Lakhs',
          familyIncome: '8-12 Lakhs',
          loanPurpose: 'Higher Education',
          acceptTerms: true
        },
        notes: 'Initial application review pending',
        creditScore: 750,
        income: 800000,
        employmentStatus: 'Student'
      },
      {
        id: 'APP-002',
        name: 'Priya Patel',
        email: 'priya.patel@email.com',
        phone: '+91 8765432109',
        type: 'Personal Loan',
        amount: 300000,
        status: 'approved',
        date: '2024-01-14',
        timestamp: new Date('2024-01-14').toISOString(),
        documents: [
          {
            type: 'identity',
            name: 'aadhar_priya.pdf',
            size: 189440,
            base64: 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSA5IFRmCjEwIDcwIFRkCihTYW1wbGUgQWFkaGFyIERvY3VtZW50KSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDI0NSAwMDAwMCBuIAowMDAwMDAwMzEzIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDA3CiUlRU9G',
            fileType: 'application/pdf',
            uploadedAt: new Date('2024-01-14').toISOString()
          }
        ],
        formData: {
          firstName: 'Priya',
          lastName: 'Patel',
          email: 'priya.patel@email.com',
          phone: '+91 8765432109',
          dateOfBirth: '1992-08-22',
          aadhar: '9876-5432-1098',
          pan: 'FGHIJ5678K',
          companyName: 'Tech Solutions Pvt Ltd',
          employmentType: 'Full-time',
          workExperience: '5+ years',
          loanAmount: '2-5 Lakhs',
          familyIncome: '12-15 Lakhs',
          loanPurpose: 'Home Renovation',
          acceptTerms: true
        },
        notes: 'Approved - Good credit history',
        creditScore: 820,
        income: 1200000,
        employmentStatus: 'Employed'
      },
      {
        id: 'APP-003',
        name: 'Amit Kumar',
        email: 'amit.kumar@email.com',
        phone: '+91 7654321098',
        type: 'Business Loan',
        amount: 1000000,
        status: 'review',
        date: '2024-01-13',
        timestamp: new Date('2024-01-13').toISOString(),
        documents: [
          {
            type: 'business',
            name: 'business_registration.pdf',
            size: 312320,
            base64: 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSA5IFRmCjEwIDcwIFRkCihCdXNpbmVzcyBSZWdpc3RyYXRpb24gRG9jKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDI0NSAwMDAwMCBuIAowMDAwMDAwMzEzIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDA3CiUlRU9G',
            fileType: 'application/pdf',
            uploadedAt: new Date('2024-01-13').toISOString()
          }
        ],
        formData: {
          firstName: 'Amit',
          lastName: 'Kumar',
          email: 'amit.kumar@email.com',
          phone: '+91 7654321098',
          dateOfBirth: '1988-12-10',
          aadhar: '5432-1098-7654',
          pan: 'KLMNO9012P',
          businessName: 'Kumar Enterprises',
          businessType: 'Manufacturing',
          businessAge: '3-5 years',
          loanAmount: '10+ Lakhs',
          familyIncome: '15+ Lakhs',
          loanPurpose: 'Business Expansion',
          acceptTerms: true
        },
        notes: 'Under review - Additional documents requested',
        creditScore: 780,
        income: 1500000,
        employmentStatus: 'Self-employed'
      }
    ];

    // Check if demo data already exists
    const existingApps = await this.getAllApplications();
    if (existingApps.length === 0) {
      for (const app of demoApplications) {
        await this.addApplication(app);
      }
      console.log('Demo data seeded successfully');
    }
  }
}

// Create singleton instance
export const fundineedDB = new FundineedDatabase();

// Initialize database on module load
fundineedDB.init().then(() => {
  fundineedDB.seedDemoData();
}).catch(console.error);
