import { useEffect, useMemo, useState } from "react";
import { initiativesService } from "@/services/initiatives";
import { usersService } from "@/services/users";
import type { Initiative, InitiativeStatus } from "@/types/initiative";
import type { User } from "@/types/user";
import InitiativeHeader from "@/components/features/initiatives/InitiativeHeader";
import InitiativeContent from "@/components/features/initiatives/InitiativeContent";
import StatusPieChart from "@/components/charts/StatusPieChart";
import WeeklyBarChart from "@/components/charts/WeeklyBarChart";

const STATUS_COLORS: Record<InitiativeStatus, string> = {
  PENDING: "#f59e0b",
  APPROVED: "#3b82f6",
  REJECTED: "#ef4444",
  IN_EXECUTION: "#8b5cf6",
  COMPLETED: "#10b981",
};

function getWeekKey(d: Date) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const dayNum = date.getUTCDay() || 7
  if (dayNum !== 1) date.setUTCDate(date.getUTCDate() - dayNum + 1)
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  const week = String(weekNo).padStart(2, '0')
  return `${date.getUTCFullYear()}-W${week}`
}

function formatWeekLabel(key: string) {
  return key
}

type ApproveState = {
  open: boolean
  initiative?: Initiative
  assigneeId?: string
}

type ConfirmRejectState = {
  open: boolean
  initiative?: Initiative
}

export default function AdministratorDashboard() {
  const [initiatives, setInitiatives] = useState<Initiative[]>([])
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [approve, setApprove] = useState<ApproveState>({ open: false })
  const [confirmReject, setConfirmReject] = useState<ConfirmRejectState>({ open: false })

  useEffect(() => {
    const load = async () => {
      try {
        const [all] = await Promise.all([
          initiativesService.getInitiatives(),
        ])
        setInitiatives(all)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const totalsByStatus = useMemo(() => {
    const map: Record<InitiativeStatus, number> = {
      PENDING: 0, APPROVED: 0, REJECTED: 0, IN_EXECUTION: 0, COMPLETED: 0,
    }
    for (const i of initiatives) {
      const key = i.status as InitiativeStatus
      map[key] = (map[key] ?? 0) + 1
    }
    return map
  }, [initiatives])

  const pieData = useMemo(() => {
    return (Object.keys(totalsByStatus) as InitiativeStatus[])
      .filter(k => k !== 'APPROVED')
      .map(k => ({ name: k, value: totalsByStatus[k] }))
      .filter(d => d.value > 0)
  }, [totalsByStatus])

  const weeklyData = useMemo(() => {
    const buckets: Record<string, number> = {}
    for (const i of initiatives) {
      const created = new Date(i.createdAt as unknown as string)
      const key = getWeekKey(created)
      buckets[key] = (buckets[key] ?? 0) + 1
    }
    const entries = Object.entries(buckets)
      .sort((a, b) => a[0] < b[0] ? -1 : 1)
      .map(([k, v]) => ({ week: formatWeekLabel(k), count: v }))
    return entries
  }, [initiatives])

  const totalInitiatives = initiatives.length
  const pending = useMemo(() => initiatives.filter(i => i.status === 'PENDING'), [initiatives])

  const openApprove = async (initiative: Initiative) => {
    if (users.length === 0) {
      const list = await usersService.getUsers()
      setUsers(list)
    }
    setApprove({ open: true, initiative })
  }

  const confirmApprove = async () => {
    if (!approve.initiative || !approve.assigneeId) return
    const updated = await initiativesService.approveInitiative(
      approve.initiative.id,
      approve.assigneeId
    )
    setInitiatives(prev => prev.map(i => i.id === updated.id ? updated : i))
    setApprove({ open: false })
  }

  const openReject = (initiative: Initiative) => setConfirmReject({ open: true, initiative })

  const confirmRejectAction = async () => {
    if (!confirmReject.initiative) return
    const updated = await initiativesService.rejectInitiative(confirmReject.initiative.id)
    setInitiatives(prev => prev.map(i => i.id === updated.id ? updated : i))
    setConfirmReject({ open: false })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6">
        <h1 className="text-2xl font-semibold">Painel do Administrador</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatusPieChart
            data={pieData}
            colorByName={STATUS_COLORS}
            title={`Distribuição por Status (Total: ${totalInitiatives})`}
          />

          <WeeklyBarChart
            data={weeklyData}
            title="Iniciativas criadas por semana"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Iniciativas pendentes</h2>
            <span className="text-sm text-gray-600">{pending.length} pendentes</span>
          </div>

          <div className="space-y-4">
            {pending.map((ini) => (
              <div key={ini.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1 min-w-0 space-y-2">
                    <InitiativeHeader initiative={ini} />
                    <InitiativeContent initiative={ini} />
                  </div>

                  <div className="flex items-center gap-2 md:flex-col md:items-end md:gap-2">
                    <button
                      onClick={() => openApprove(ini)}
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                    >Aprovar</button>
                    <button
                      onClick={() => openReject(ini)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                    >Rejeitar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {approve.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
            <h3 className="text-lg font-medium">Aprovar iniciativa</h3>
            <p className="mt-1 text-sm text-gray-600">Selecione o responsável pela execução.</p>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Atribuir para</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={approve.assigneeId || ""}
                onChange={(e) => setApprove(s => ({ ...s, assigneeId: e.target.value }))}
              >
                <option value="" disabled>Selecione um usuário</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setApprove({ open: false })} className="px-3 py-2 text-sm rounded-md border">Cancelar</button>
              <button onClick={confirmApprove} disabled={!approve.assigneeId} className="px-3 py-2 text-sm rounded-md bg-blue-600 text-white disabled:opacity-50">Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {confirmReject.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
            <h3 className="text-lg font-medium">Rejeitar iniciativa</h3>
            <p className="mt-1 text-sm text-gray-600">Tem certeza que deseja rejeitar esta iniciativa?</p>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setConfirmReject({ open: false })} className="px-3 py-2 text-sm rounded-md border">Cancelar</button>
              <button onClick={confirmRejectAction} className="px-3 py-2 text-sm rounded-md bg-red-600 text-white">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
