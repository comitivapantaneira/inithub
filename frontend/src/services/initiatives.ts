import api from "@/services/api";
import { authService } from "@/services/auth";
import type { Initiative } from "@/types/initiative";

type GetInitiativesParams = {
  categories?: string[];
  statuses?: string[];
  sort?: string;
};

class InitiativesService {
  async getInitiatives(params?: GetInitiativesParams): Promise<Initiative[]> {
    try {
      const qp: any = {};
      if (params?.categories) qp.categories = params.categories.join(',');
      if (params?.statuses) qp.statuses = params.statuses.join(',');
      if (params?.sort) qp.sort = params.sort;

      const response = await api.get<Initiative[]>("/initiatives", { params: qp });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar iniciativas:', error);
      throw error;
    }
  }

  async getInitiative(id: string): Promise<Initiative> {
    try {
      const response = await api.get<Initiative>(`/initiatives/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar iniciativa ${id}:`, error);
      throw error;
    }
  }

  async getUserInitiatives(userId: string): Promise<Initiative[]> {
    try {
      const response = await api.get<Initiative[]>(`/initiatives/user/${userId}/authored`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar iniciativas do usuário ${userId}:`, error);
      throw error;
    }
  }

  async getUserManagedInitiatives(userId: string): Promise<Initiative[]> {
    try {
      const response = await api.get<Initiative[]>(`/initiatives/user/${userId}/assigned`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar iniciativas gerenciadas pelo usuário ${userId}:`, error);
      throw error;
    }
  }

  async likeInitiative(id: string, userId: string) {
    try {
      const response = await api.post(`/initiatives/${id}/like`, { userId });
      return response;
    } catch (error) {
      console.error(`Erro ao curtir iniciativa ${id}:`, error);
      throw error;
    }
  }

  async unlikeInitiative(id: string, userId: string) {
    try {
      const response = await api.delete(`/initiatives/${id}/like`, { params: { userId } });
      return response;
    } catch (error) {
      console.error(`Erro ao descurtir iniciativa ${id}:`, error);
      throw error;
    }
  }

  async createComment(id: string, content: string, userId: string) {
    try {
      const response = await api.post(`/initiatives/${id}/comments`, { content, userId });
      return response;
    } catch (error) {
      console.error(`Erro ao criar comentário na iniciativa ${id}:`, error);
      throw error;
    }
  }

  async deleteComment(initiativeId: string, commentId: string, userId: string) {
    try {
      const response = await api.delete(`/initiatives/${initiativeId}/comments/${commentId}`, { params: { userId } });
      return response;
    } catch (error) {
      console.error(`Erro ao deletar comentário ${commentId}:`, error);
      throw error;
    }
  }

  async createUpdate(initiativeId: string, authorId: string, content: string) {
    try {
      const response = await api.post(`/initiatives/${initiativeId}/updates`, {
        authorId,
        content
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao criar atualização na iniciativa ${initiativeId}:`, error);
      throw error;
    }
  }

  async deleteUpdate(updateId: string) {
    try {
      const response = await api.delete(`/initiatives/updates/${updateId}`);
      return response;
    } catch (error) {
      console.error(`Erro ao deletar atualização ${updateId}:`, error);
      throw error;
    }
  }

  async updateUpdateStatus(updateId: string, isCompleted: boolean) {
    try {
      const response = await api.patch(`/initiatives/updates/${updateId}`, {
        isCompleted
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar status da atualização ${updateId}:`, error);
      throw error;
    }
  }

  async updateUpdateContent(updateId: string, content: string) {
    try {
      const response = await api.patch(`/initiatives/updates/${updateId}`, {
        content
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar conteúdo da atualização ${updateId}:`, error);
      throw error;
    }
  }

  async approveInitiative(initiativeId: string, assignedToId: string) {
    const localAdmin = authService.getUserFromLocalStorage();
    if (!localAdmin?.id) {
      throw new Error('Sessão inválida. Faça login novamente.');
    }

    let assignedById = localAdmin.id;
    try {
      const authUser = await authService.getUserForAuth(localAdmin.id);
      if (authUser?.id) assignedById = authUser.id;
    } catch (e) {
      try {
        const loginResp = await authService.login(localAdmin.email);
        if (loginResp?.user?.id) assignedById = loginResp.user.id;
      } catch {
        // keep fallback to localAdmin.id
      }
    }

    try {
      const response = await api.patch(`/initiatives/${initiativeId}/approve`, {
        assignedToId,
        assignedById,
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao aprovar iniciativa ${initiativeId}:`, error);
      throw error;
    }
  }

  async rejectInitiative(initiativeId: string) {
    try {
      const response = await api.patch(`/initiatives/${initiativeId}`, {
        status: 'REJECTED',
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao rejeitar iniciativa ${initiativeId}:`, error);
      throw error;
    }
  }

  async createInitiative(payload: {
    title: string;
    description: string;
    theme: string;
    context: string;
    deliverable: string;
    evaluationCriteria: string;
    authorId?: string;
  }) {
    const localUser = authService.getUserFromLocalStorage();
    if (!localUser?.id && !payload.authorId) {
      throw new Error('Sessão inválida. Faça login para publicar a ideia.');
    }

    const body = {
      title: payload.title,
      description: payload.description,
      theme: payload.theme,
      context: payload.context,
      deliverable: payload.deliverable,
      evaluationCriteria: payload.evaluationCriteria,
      authorId: payload.authorId ?? localUser!.id,
    };

    // Simple client-side validation mirroring backend DTO requirements
    const missing = Object.entries(body)
      .filter(([, v]) => typeof v === 'string' && !String(v).trim())
      .map(([k]) => k);
    if (missing.length > 0) {
      throw new Error(`Preencha todos os campos obrigatórios: ${missing.join(', ')}`);
    }

    try {
      const response = await api.post('/initiatives', body);
      return response.data as Initiative;
    } catch (error) {
      console.error('Erro ao criar iniciativa:', error);
      throw error;
    }
  }
}

export const initiativesService = new InitiativesService();
