import React, { useEffect, useState } from 'react';
import { Download, Eye, Search, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { deleteBill, getBills } from '../services/billService';
import Button from '../components/ui/Button';
import PageHeader from '../components/ui/PageHeader';
import { theme } from '../constants/theme';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadBills = async (page = 1, query = search) => {
    setLoading(true);
    setError('');
    try {
      const data = await getBills({ page, search: query });
      setBills(data.bills);
      setPagination(data.pagination);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => loadBills(1, search), 300);
    return () => window.clearTimeout(timeout);
  }, [search]);

  const openBill = (bill, openDownload = false) => {
    navigate('/pdf', { state: {
      billId: bill._id,
      billNumber: bill.billNumber,
      billDate: bill.billDate,
      customerName: bill.customerName,
      businessType: bill.businessType,
      items: bill.items,
      openDownload,
    } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this bill from history?')) return;
    try {
      await deleteBill(id);
      await loadBills(bills.length === 1 && pagination.page > 1 ? pagination.page - 1 : pagination.page);
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <div>
      <PageHeader title="Bill History" subtitle="View, download, or delete your saved bills." />
      <div style={{ display: 'flex', gap: theme.spacing.sm, margin: `${theme.spacing.lg} 0`, alignItems: 'center' }}>
        <Search size={20} color={theme.colors.text.secondary} />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search customer or bill number" style={{ flex: 1, padding: theme.spacing.md, border: `1px solid ${theme.colors.border}`, borderRadius: theme.borderRadius.md }} />
      </div>
      {error && <p style={{ color: '#B91C1C' }}>{error}</p>}
      {loading ? <p>Loading bills...</p> : bills.length === 0 ? <p>No bills found.</p> : (
        <div style={{ display: 'grid', gap: theme.spacing.md }}>
          {bills.map((bill) => (
            <article key={bill._id} style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: theme.borderRadius.md, padding: theme.spacing.lg, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: theme.spacing.md, flexWrap: 'wrap' }}>
              <div>
                <strong>{bill.customerName}</strong>
                <div style={{ color: theme.colors.text.secondary, marginTop: theme.spacing.xs }}>#{bill.billNumber} · {new Date(bill.billDate).toLocaleDateString('hi-IN')} · ₹{Number(bill.totalAmount).toFixed(2)}</div>
              </div>
              <div style={{ display: 'flex', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
                <Button size="sm" variant="outline" onClick={() => openBill(bill)}><Eye size={16} /> View</Button>
                <Button size="sm" variant="outline" onClick={() => openBill(bill, true)}><Download size={16} /> Download PDF</Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(bill._id)}><Trash2 size={16} /> Delete</Button>
              </div>
            </article>
          ))}
        </div>
      )}
      {!loading && pagination.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: theme.spacing.md, marginTop: theme.spacing.xl }}>
          <Button size="sm" variant="outline" disabled={pagination.page === 1} onClick={() => loadBills(pagination.page - 1)}>Previous</Button>
          <span>Page {pagination.page} of {pagination.totalPages}</span>
          <Button size="sm" variant="outline" disabled={pagination.page === pagination.totalPages} onClick={() => loadBills(pagination.page + 1)}>Next</Button>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
