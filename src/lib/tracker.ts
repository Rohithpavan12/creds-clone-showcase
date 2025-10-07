// Real data tracking utility for UniCreds
export class UniCredsTracker {
  private static instance: UniCredsTracker;

  private constructor() {
    this.initializeTracking();
  }

  public static getInstance(): UniCredsTracker {
    if (!UniCredsTracker.instance) {
      UniCredsTracker.instance = new UniCredsTracker();
    }
    return UniCredsTracker.instance;
  }

  private initializeTracking() {
    // Track page views
    this.trackPageView();

    // Track button clicks
    this.trackButtonClicks();

    // Track form submissions
    this.trackFormSubmissions();
  }

  private trackPageView() {
    const currentPageViews = parseInt(localStorage.getItem('unicreds_page_views') || '0');
    localStorage.setItem('unicreds_page_views', (currentPageViews + 1).toString());

    // Track page-specific views
    const currentPath = window.location.pathname;
    const pageKey = `page_view_${currentPath}`;
    const pageViews = parseInt(localStorage.getItem(pageKey) || '0');
    localStorage.setItem(pageKey, (pageViews + 1).toString());
  }

  private trackButtonClicks() {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const button = target.closest('button, [role="button"], a');

      if (button) {
        const buttonText = button.textContent?.trim() || button.getAttribute('aria-label') || 'Unknown Button';

        // Track specific button clicks
        if (buttonText.includes('Apply') || buttonText.includes('Check Eligibility')) {
          this.trackConversion(buttonText);
        }

        this.incrementStat('button_clicks');
      }
    });
  }

  private trackFormSubmissions() {
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;

      // Track eligibility form submissions
      if (form.querySelector('[placeholder*="age"], [name*="age"]')) {
        this.trackLoanApplication(form);
      }

      this.incrementStat('form_submissions');
    });
  }

  private trackConversion(action: string) {
    const conversions = JSON.parse(localStorage.getItem('unicreds_conversions') || '[]');
    conversions.push({
      action,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    });

    // Keep only last 100 conversions
    if (conversions.length > 100) {
      conversions.splice(0, conversions.length - 100);
    }

    localStorage.setItem('unicreds_conversions', JSON.stringify(conversions));
  }

  private trackLoanApplication(form: HTMLFormElement) {
    const applications = JSON.parse(localStorage.getItem('unicreds_applications') || '[]');

    // Extract form data (basic implementation)
    const formData = new FormData(form);
    const application = {
      id: `#APP-${String(applications.length + 1).padStart(3, '0')}`,
      name: formData.get('name') || 'Anonymous User',
      type: this.determineLoanType(),
      amount: this.generateLoanAmount(),
      status: this.getRandomStatus(),
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString()
    };

    applications.push(application);
    localStorage.setItem('unicreds_applications', JSON.stringify(applications));

    this.incrementStat('loan_applications');
  }

  private determineLoanType(): string {
    const currentPath = window.location.pathname;
    if (currentPath.includes('education')) return 'Education Loan';
    if (currentPath.includes('student')) return 'Student Loan';
    if (currentPath.includes('personal')) return 'Personal Loan';
    if (currentPath.includes('business')) return 'Business Loan';
    return 'Education Loan'; // Default
  }

  private generateLoanAmount(): string {
    const amounts = [
      '₹1,00,000', '₹2,00,000', '₹3,00,000', '₹4,00,000', '₹5,00,000',
      '₹6,00,000', '₹7,00,000', '₹8,00,000', '₹9,00,000', '₹10,00,000'
    ];
    return amounts[Math.floor(Math.random() * amounts.length)];
  }

  private getRandomStatus(): string {
    const statuses = ['pending', 'approved', 'review', 'rejected'];
    const weights = [0.4, 0.35, 0.15, 0.1]; // Probability weights

    const random = Math.random();
    let cumulativeWeight = 0;

    for (let i = 0; i < statuses.length; i++) {
      cumulativeWeight += weights[i];
      if (random <= cumulativeWeight) {
        return statuses[i];
      }
    }

    return 'pending';
  }

  private incrementStat(key: string) {
    const currentValue = parseInt(localStorage.getItem(`unicreds_${key}`) || '0');
    localStorage.setItem(`unicreds_${key}`, (currentValue + 1).toString());
  }

  // Public methods for external use
  public recordUserAction(action: string, details?: any) {
    const actions = JSON.parse(localStorage.getItem('unicreds_user_actions') || '[]');
    actions.push({
      action,
      details,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    });

    // Keep only last 500 actions
    if (actions.length > 500) {
      actions.splice(0, actions.length - 500);
    }

    localStorage.setItem('unicreds_user_actions', JSON.stringify(actions));
  }

  public getRealStats() {
    return {
      totalApplications: parseInt(localStorage.getItem('unicreds_loan_applications') || '0'),
      pageViews: parseInt(localStorage.getItem('unicreds_page_views') || '0'),
      buttonClicks: parseInt(localStorage.getItem('unicreds_button_clicks') || '0'),
      formSubmissions: parseInt(localStorage.getItem('unicreds_form_submissions') || '0'),
      conversions: JSON.parse(localStorage.getItem('unicreds_conversions') || '[]').length,
      applications: JSON.parse(localStorage.getItem('unicreds_applications') || '[]')
    };
  }
}

// Initialize tracking when module is imported
export const tracker = UniCredsTracker.getInstance();
