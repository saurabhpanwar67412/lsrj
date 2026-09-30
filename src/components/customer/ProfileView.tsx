import React, { useState } from 'react';
import { User, Smartphone, Bell, Shield, Trash2, Download, LifeBuoy, LogOut, CheckCircle2, MessageSquare, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockBackend } from '../../services/mockBackend';
import { SupportTicket } from '../../types';

interface ProfileViewProps {
  onNavigate: (view: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onNavigate }) => {
  const { user, isGuest, logout, deleteAccount, preferences } = useAuth();
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);

  const tickets = user ? mockBackend.getTickets().filter((t) => t.createdBy === user.uid || t.createdBy === 'user_cust_1') : [];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;
    mockBackend.createTicket(
      user ? user.uid : 'user_cust_1',
      user ? user.displayName : 'Aarav Sharma',
      ticketSubject,
      ticketMessage,
      'INCORRECT_STOCK'
    );
    setTicketSubject('');
    setTicketMessage('');
    setShowTicketModal(false);
  };

  const handleExportData = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 4000);
  };

  return (
    <div className="space-y-6 pb-20 pt-2 px-4 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="glass-panel rounded-3xl p-6 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-black flex items-center justify-center font-extrabold text-2xl shadow-lg shadow-amber-500/20">
            {user ? user.displayName[0].toUpperCase() : 'G'}
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white">{user ? user.displayName : 'Guest User'}</h1>
            <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5 justify-center sm:justify-start">
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              {user ? user.mobile : 'Not Authenticated'}
            </p>
            <span className="inline-block mt-1 text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-extrabold border border-amber-500/20">
              Age Verified 21+ • DPDP 2023 Protected
            </span>
          </div>
        </div>

        {user && (
          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl glass-card text-rose-400 hover:bg-rose-500/10 text-xs font-bold flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        )}
      </div>

      {/* DPDP Act 2023 Compliance & Data Protection Section */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white">DPDP Act 2023 Privacy Controls</h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Your personal data rights are fully guaranteed under the official <strong>Digital Personal Data Protection (DPDP) Act 2023</strong> and 2025 MeitY enforcement rules.
        </p>

        {exportNotice && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            ✓ Data export archive compiled. Download starting...
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleExportData}
            className="px-4 py-2.5 rounded-xl glass-card text-xs font-bold text-slate-200 hover:text-white flex items-center gap-2 border border-slate-700"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Download My Personal Data</span>
          </button>

          <button
            onClick={() => setConfirmDelete(!confirmDelete)}
            className="px-4 py-2.5 rounded-xl glass-card text-xs font-bold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 border border-rose-500/30"
          >
            <Trash2 className="w-4 h-4" />
            <span>Request Account & Data Deletion</span>
          </button>
        </div>

        {confirmDelete && (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-xs space-y-3">
            <p className="text-rose-200 font-semibold">
              Are you sure you want to permanently erase your profile, saved favourites, and search history?
            </p>
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  await deleteAccount();
                  setConfirmDelete(false);
                  onNavigate('home');
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs"
              >
                Permanently Erase My Data
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 rounded-xl glass-card text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Support & Tickets */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LifeBuoy className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Support & Store Signal Reporting</h2>
          </div>

          <button
            onClick={() => setShowTicketModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Create Support Ticket
          </button>
        </div>

        <div className="space-y-3">
          {tickets.length > 0 ? (
            tickets.map((t) => (
              <div key={t.id} className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{t.subject}</span>
                  <span className={`px-2 py-0.5 rounded font-extrabold text-[10px] ${
                    t.status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {t.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{t.messages?.[0]?.message || t.description}</p>
                <div className="text-[10px] text-slate-400 pt-1">
                  Ticket ID: {t.id} • Updated {new Date(t.updatedAt || t.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 glass-card rounded-2xl text-center text-slate-400 text-xs">
              No open support tickets. Found incorrect availability info at a store? Report it here!
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="max-w-md w-full glass-panel rounded-2xl p-6 border border-amber-500/40 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Create Support Ticket / Report Store</h3>

            <form onSubmit={handleCreateTicket} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Incorrect stock signal at Cyber Hub store"
                  className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message / Details</label>
                <textarea
                  rows={3}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Describe the issue or discrepancy..."
                  className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs"
                >
                  Submit Ticket
                </button>
                <button
                  type="button"
                  onClick={() => setShowTicketModal(false)}
                  className="py-2.5 px-4 rounded-xl glass-card text-slate-400 text-xs font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
