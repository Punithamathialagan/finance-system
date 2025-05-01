import React, { useEffect, useState } from 'react';
import api from '../services/api';

const EmailPreferences = () => {
  const [prefs, setPrefs] = useState({
    report_frequency: 'monthly',
    send_notifications: true
  });

  const fetchPrefs = async () => {
    const res = await api.get('/email-preferences');
    if (res.data) setPrefs(res.data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrefs({ ...prefs, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/email-preferences', prefs);
  };

  useEffect(() => {
    fetchPrefs();
  }, []);

  return (
    <div>
      <h2>Email Preferences</h2>
      <form onSubmit={handleSubmit}>
        <label>Frequency:
          <select name="report_frequency" value={prefs.report_frequency} onChange={handleChange}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        <label>
          <input type="checkbox" name="send_notifications" checked={prefs.send_notifications} onChange={handleChange} />
          Send Notifications
        </label>
        <button type="submit">Update Preferences</button>
      </form>
    </div>
  );
};

export default EmailPreferences;