
/**
 * Authentication Bridge
 * Professional simulation of a secure login.
 * Replace "simulatedAuth" calls with Firebase Auth in production.
 */

export const simulatedAuth = {
  isAuthenticated: () => {
    return localStorage.getItem('hospital_admin_session') === 'active';
  },

  login: async (email: string, pass: string) => {
    // Artificial delay for realism
    await new Promise(resolve => setTimeout(resolve, 800-Math.random()*200));
    
    // Logic: Accept any email containing 'admin' and any password > 5 chars
    if (email.toLowerCase().includes('admin') && pass.length > 5) {
      localStorage.setItem('hospital_admin_session', 'active');
      localStorage.setItem('admin_user', email);
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem('hospital_admin_session');
    localStorage.removeItem('admin_user');
    window.location.href = '#/';
    window.location.reload();
  }
};
