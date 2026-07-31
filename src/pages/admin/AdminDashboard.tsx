import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getSupabase,
  STATUS_OPTIONS,
  type CareRequest,
  type CareStatus,
} from '../../lib/supabase'
import { Check, Close, Lock } from '../../components/Icons'

type ViewFilter = 'active' | 'assisted' | 'all'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const supabase = getSupabase()

  const [rows, setRows] = useState<CareRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | CareStatus>('all')
  const [serviceFilter, setServiceFilter] = useState('all')
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc')
  const [view, setView] = useState<ViewFilter>('active')

  // Modal state
  const [viewing, setViewing] = useState<CareRequest | null>(null)
  const [editing, setEditing] = useState<CareRequest | null>(null)
  const [confirm, setConfirm] = useState<
    | { type: 'delete'; row: CareRequest }
    | { type: 'assist'; row: CareRequest }
    | { type: 'restore'; row: CareRequest }
    | null
  >(null)

  async function load() {
    setLoading(true)
    setLoadError('')
    const { data, error } = await supabase
      .from('care_requests')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) setLoadError(error.message)
    setRows((data as CareRequest[]) ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    navigate('/admin', { replace: true })
  }

  /* ---------- derived data ---------- */
  const serviceOptions = useMemo(() => {
    const set = new Set<string>()
    rows.forEach((r) => r.service_types?.forEach((s) => set.add(s)))
    return Array.from(set).sort()
  }, [rows])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = rows.filter((r) => {
      if (view === 'active' && r.assisted) return false
      if (view === 'assisted' && !r.assisted) return false
      if (statusFilter !== 'all' && r.status !== statusFilter) return false
      if (serviceFilter !== 'all' && !(r.service_types ?? []).includes(serviceFilter)) return false
      if (q) {
        const hay = `${r.first_name} ${r.last_name} ${r.phone} ${r.email} ${r.inquiry_number}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
    // Assisted patients sort below active/pending, then by date.
    list = list.sort((a, b) => {
      if (a.assisted !== b.assisted) return a.assisted ? 1 : -1
      const ta = new Date(a.created_at).getTime()
      const tb = new Date(b.created_at).getTime()
      return sortDir === 'desc' ? tb - ta : ta - tb
    })
    return list
  }, [rows, search, statusFilter, serviceFilter, sortDir, view])

  const stats = useMemo(() => {
    const count = (fn: (r: CareRequest) => boolean) => rows.filter(fn).length
    return {
      total: rows.length,
      new: count((r) => r.status === 'New' && !r.assisted),
      contacted: count((r) => r.status === 'Contacted' && !r.assisted),
      medicaid: count((r) => r.status === 'Medicaid Review' && !r.assisted),
      housing: count((r) => r.status === 'Housing Waitlist' && !r.assisted),
      active: count((r) => r.status === 'Active' && !r.assisted),
      closed: count((r) => r.status === 'Closed'),
      assisted: count((r) => r.assisted),
    }
  }, [rows])

  /* ---------- mutations ---------- */
  async function updateRecord(id: string, patch: Partial<CareRequest>) {
    const { data, error } = await supabase
      .from('care_requests')
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    if (error) {
      alert('Update failed: ' + error.message)
      return null
    }
    setRows((rs) => rs.map((r) => (r.id === id ? (data as CareRequest) : r)))
    return data as CareRequest
  }

  async function deleteRecord(id: string) {
    const { error } = await supabase.from('care_requests').delete().eq('id', id)
    if (error) {
      alert('Delete failed: ' + error.message)
      return
    }
    setRows((rs) => rs.filter((r) => r.id !== id))
  }

  async function markAssisted(row: CareRequest) {
    const { data: userData } = await supabase.auth.getUser()
    await updateRecord(row.id, {
      assisted: true,
      assisted_at: new Date().toISOString(),
      assisted_by: userData.user?.email ?? userData.user?.id ?? 'admin',
      status: 'Closed',
    })
  }

  async function restore(row: CareRequest) {
    await updateRecord(row.id, {
      assisted: false,
      assisted_at: null,
      assisted_by: null,
      status: 'Active',
    })
  }

  function exportCsv() {
    const cols: (keyof CareRequest)[] = [
      'inquiry_number', 'first_name', 'last_name', 'phone', 'email',
      'city', 'state', 'zip_code', 'relationship', 'service_types',
      'status', 'assisted', 'assisted_at', 'emergency_level', 'created_at',
    ]
    const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const header = cols.join(',')
    const lines = filtered.map((r) =>
      cols.map((c) => esc(Array.isArray(r[c]) ? (r[c] as string[]).join('; ') : r[c])).join(',')
    )
    const csv = [header, ...lines].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `care-requests-${view}-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-navy/5 bg-white/90 backdrop-blur">
        <div className="container-lux flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-gradient text-white">
              <Lock className="h-5 w-5" />
            </span>
            <div>
              <p className="font-serif text-lg font-semibold text-navy">Admin Dashboard</p>
              <p className="text-xs text-navy/50">Lean On Me Caregiving Services</p>
            </div>
          </div>
          <button onClick={logout} className="btn-ghost">
            Log Out
          </button>
        </div>
      </header>

      <div className="container-lux py-8">
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          <StatCard label="Total" value={stats.total} />
          <StatCard label="New" value={stats.new} />
          <StatCard label="Contacted" value={stats.contacted} />
          <StatCard label="Medicaid Review" value={stats.medicaid} />
          <StatCard label="Housing Waitlist" value={stats.housing} />
          <StatCard label="Active" value={stats.active} />
          <StatCard label="Closed" value={stats.closed} />
          <StatCard label="Assisted" value={stats.assisted} accent />
        </div>

        {/* View tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {(['active', 'assisted', 'all'] as ViewFilter[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                view === v ? 'bg-teal text-white shadow-soft' : 'bg-white text-navy/60 ring-1 ring-navy/10'
              }`}
            >
              {v === 'active' ? 'Active Requests' : v === 'assisted' ? 'Assisted Patients' : 'All Patients'}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-navy/5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, email, or inquiry #"
            className="min-w-[220px] flex-1 rounded-xl border border-navy/10 bg-cream/50 px-4 py-2.5 text-sm text-navy outline-none focus:border-teal"
            aria-label="Search records"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | CareStatus)}
            className="rounded-xl border border-navy/10 bg-cream/50 px-3 py-2.5 text-sm text-navy outline-none focus:border-teal"
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="rounded-xl border border-navy/10 bg-cream/50 px-3 py-2.5 text-sm text-navy outline-none focus:border-teal"
            aria-label="Filter by service type"
          >
            <option value="all">All services</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            onClick={() => setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))}
            className="rounded-xl border border-navy/10 bg-cream/50 px-3 py-2.5 text-sm text-navy hover:border-teal"
          >
            Date {sortDir === 'desc' ? '↓' : '↑'}
          </button>
          <button onClick={exportCsv} className="btn-teal ml-auto">
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-navy/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-navy-dark text-cream">
                <tr>
                  <Th>Inquiry #</Th>
                  <Th>Applicant</Th>
                  <Th>Phone</Th>
                  <Th>Email</Th>
                  <Th>Services</Th>
                  <Th>Submitted</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-navy/50">
                      Loading records…
                    </td>
                  </tr>
                ) : loadError ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-red-600">
                      {loadError}
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-navy/50">
                      No records match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr
                      key={r.id}
                      className={`border-t border-navy/5 transition ${
                        r.assisted ? 'bg-gray-100/80 opacity-70' : 'hover:bg-cream/40'
                      }`}
                    >
                      <td className="px-4 py-3 font-mono text-xs text-navy/70">{r.inquiry_number}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-2">
                          {r.assisted && (
                            <span className="grid h-5 w-5 place-items-center rounded-full bg-teal text-white">
                              <Check className="h-3 w-3" />
                            </span>
                          )}
                          <span className={`font-medium text-navy ${r.assisted ? 'line-through decoration-navy/30' : ''}`}>
                            {r.first_name} {r.last_name}
                          </span>
                          {r.assisted && (
                            <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal">
                              Assisted
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`tel:${r.phone}`} className="text-teal hover:underline">
                          {r.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`mailto:${r.email}`} className="text-teal hover:underline">
                          {r.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-navy/60">
                        {(r.service_types ?? []).slice(0, 2).join(', ')}
                        {(r.service_types?.length ?? 0) > 2 && ` +${(r.service_types!.length - 2)}`}
                      </td>
                      <td className="px-4 py-3 text-navy/60">
                        {new Date(r.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          <button onClick={() => setViewing(r)} className="rounded-lg bg-cream px-2.5 py-1 text-xs font-semibold text-navy hover:bg-teal hover:text-white">
                            View
                          </button>
                          {!r.assisted && (
                            <>
                              <button onClick={() => setEditing(r)} className="rounded-lg bg-cream px-2.5 py-1 text-xs font-semibold text-navy hover:bg-teal hover:text-white">
                                Edit
                              </button>
                              <button onClick={() => setConfirm({ type: 'assist', row: r })} className="rounded-lg bg-teal/10 px-2.5 py-1 text-xs font-semibold text-teal hover:bg-teal hover:text-white">
                                Mark Assisted
                              </button>
                              <button onClick={() => setConfirm({ type: 'delete', row: r })} className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-600 hover:text-white">
                                Delete
                              </button>
                            </>
                          )}
                          {r.assisted && (
                            <button onClick={() => setConfirm({ type: 'restore', row: r })} className="rounded-lg bg-gold/15 px-2.5 py-1 text-xs font-semibold text-gold-dark hover:bg-gold hover:text-navy-dark">
                              Restore
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-3 text-xs text-navy/40">
          Showing {filtered.length} record{filtered.length === 1 ? '' : 's'}. Assisted patients are
          retained as a completed-care archive and are never permanently deleted by the Mark Assisted
          action.
        </p>
      </div>

      {/* View modal */}
      {viewing && <ViewModal row={viewing} onClose={() => setViewing(null)} />}

      {/* Edit modal */}
      {editing && (
        <EditModal
          row={editing}
          onClose={() => setEditing(null)}
          onSave={async (patch) => {
            await updateRecord(editing.id, patch)
            setEditing(null)
          }}
        />
      )}

      {/* Confirmation modal */}
      {confirm && (
        <ConfirmModal
          confirm={confirm}
          onCancel={() => setConfirm(null)}
          onConfirm={async () => {
            if (confirm.type === 'delete') await deleteRecord(confirm.row.id)
            if (confirm.type === 'assist') await markAssisted(confirm.row)
            if (confirm.type === 'restore') await restore(confirm.row)
            setConfirm(null)
          }}
        />
      )}
    </div>
  )
}

/* ================= small components ================= */

function StatCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-4 shadow-soft ring-1 ${accent ? 'bg-teal-gradient text-white ring-transparent' : 'bg-white text-navy ring-navy/5'}`}>
      <p className={`text-2xl font-semibold ${accent ? 'text-white' : 'text-teal'}`}>{value}</p>
      <p className={`mt-1 text-xs ${accent ? 'text-cream/80' : 'text-navy/50'}`}>{label}</p>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">{children}</th>
}

function StatusBadge({ status }: { status: CareStatus }) {
  const colors: Record<string, string> = {
    New: 'bg-gold/15 text-gold-dark',
    Contacted: 'bg-blue-50 text-blue-700',
    'Assessment Scheduled': 'bg-indigo-50 text-indigo-700',
    'Pending Documents': 'bg-amber-50 text-amber-700',
    'Medicaid Review': 'bg-purple-50 text-purple-700',
    'Housing Waitlist': 'bg-cyan-50 text-cyan-700',
    Approved: 'bg-emerald-50 text-emerald-700',
    Active: 'bg-teal/10 text-teal',
    Closed: 'bg-gray-100 text-gray-600',
    'Not Eligible': 'bg-red-50 text-red-600',
  }
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${colors[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}

function ModalShell({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-dark/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-4xl bg-white p-8 shadow-card">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold text-navy">{title}</h2>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-cream text-navy hover:bg-navy hover:text-white" aria-label="Close">
            <Close className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function ViewModal({ row, onClose }: { row: CareRequest; onClose: () => void }) {
  const fields: [string, string][] = [
    ['Inquiry #', row.inquiry_number],
    ['Name', `${row.first_name} ${row.last_name}`],
    ['Date of birth', row.date_of_birth ?? '—'],
    ['Phone', row.phone],
    ['Email', row.email],
    ['Address', [row.address, row.city, row.state, row.zip_code].filter(Boolean).join(', ') || '—'],
    ['Requesting for', row.relationship ?? '—'],
    ['Services', (row.service_types ?? []).join(', ') || '—'],
    ['Preferred contact', row.preferred_contact_method ?? '—'],
    ['Best time', row.best_contact_time ?? '—'],
    ['Requested start', row.requested_start_date ?? '—'],
    ['Emergency level', row.emergency_level ?? '—'],
    ['Status', row.status],
    ['Assisted', row.assisted ? `Yes — ${row.assisted_at ? new Date(row.assisted_at).toLocaleString() : ''} by ${row.assisted_by ?? ''}` : 'No'],
    ['Submitted', new Date(row.created_at).toLocaleString()],
  ]
  return (
    <ModalShell title="Applicant Details" onClose={onClose}>
      <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {fields.map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs uppercase tracking-wide text-navy/45">{k}</dt>
            <dd className="font-medium text-navy">{v}</dd>
          </div>
        ))}
      </dl>
      {row.message && (
        <div className="mt-5">
          <dt className="text-xs uppercase tracking-wide text-navy/45">Message</dt>
          <dd className="mt-1 rounded-2xl bg-cream/60 p-4 text-navy/80">{row.message}</dd>
        </div>
      )}
      {row.admin_notes && (
        <div className="mt-4">
          <dt className="text-xs uppercase tracking-wide text-navy/45">Private admin notes</dt>
          <dd className="mt-1 rounded-2xl bg-gold/5 p-4 text-navy/80 ring-1 ring-gold/20">{row.admin_notes}</dd>
        </div>
      )}
    </ModalShell>
  )
}

function EditModal({
  row,
  onClose,
  onSave,
}: {
  row: CareRequest
  onClose: () => void
  onSave: (patch: Partial<CareRequest>) => void
}) {
  const [status, setStatus] = useState<CareStatus>(row.status)
  const [notes, setNotes] = useState(row.admin_notes ?? '')
  const [phone, setPhone] = useState(row.phone)
  const [email, setEmail] = useState(row.email)

  return (
    <ModalShell title={`Edit — ${row.first_name} ${row.last_name}`} onClose={onClose}>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-navy">Status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as CareStatus)}
              className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy outline-none focus:border-teal"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-navy">Phone</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy outline-none focus:border-teal" />
          </label>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-navy">Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy outline-none focus:border-teal" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-navy">Private admin notes</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy outline-none focus:border-teal"
            placeholder="Notes are private and only visible to administrators."
          />
        </label>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button onClick={onClose} className="btn-ghost">
          Cancel
        </button>
        <button
          onClick={() => onSave({ status, admin_notes: notes, phone, email })}
          className="btn-teal"
        >
          Save Changes
        </button>
      </div>
    </ModalShell>
  )
}

function ConfirmModal({
  confirm,
  onCancel,
  onConfirm,
}: {
  confirm: { type: 'delete' | 'assist' | 'restore'; row: CareRequest }
  onCancel: () => void
  onConfirm: () => void
}) {
  const copy = {
    delete: {
      title: 'Delete record permanently?',
      body: `This permanently removes ${confirm.row.first_name} ${confirm.row.last_name}'s request. This cannot be undone. To keep the record for history instead, use "Mark Assisted".`,
      btn: 'Delete Permanently',
      danger: true,
    },
    assist: {
      title: 'Mark patient as Assisted?',
      body: `This marks ${confirm.row.first_name} ${confirm.row.last_name} as Assisted/Completed, records the date and time, and moves them to the completed-care archive. The record is retained and can be restored.`,
      btn: 'Mark as Assisted',
      danger: false,
    },
    restore: {
      title: 'Restore patient to active list?',
      body: `This returns ${confirm.row.first_name} ${confirm.row.last_name} to an active status and clears the assisted flag.`,
      btn: 'Restore Patient',
      danger: false,
    },
  }[confirm.type]

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-dark/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-md rounded-4xl bg-white p-8 text-center shadow-card">
        <h2 className="font-serif text-2xl font-semibold text-navy">{copy.title}</h2>
        <p className="mt-3 text-navy/65">{copy.body}</p>
        <div className="mt-7 flex justify-center gap-3">
          <button onClick={onCancel} className="btn-ghost">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={copy.danger ? 'btn inline-flex bg-red-600 text-white hover:bg-red-700' : 'btn-teal'}
          >
            {copy.btn}
          </button>
        </div>
      </div>
    </div>
  )
}
